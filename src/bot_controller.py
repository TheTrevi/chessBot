import tkinter as tk
import asyncio
import threading
import time
from loguru import logger
import os

from src.config import ConfigManager
from src.stockfish_engine import StockfishEngine
from src.lichess_bot import LichessBot
from src.gui import GUI, BotStatus
from src.websocket import SeleniumBridge
from src.proxy_manager import ProxyManager
from src.utils import Utils


class BotController:
    def __init__(self):
        self.config_manager = ConfigManager()
        self.config_manager.load_settings("config/settings.json")

        self.stockfish_engine = StockfishEngine(path=self.config_manager.get_setting("stockfish_path"))
        self.lichess_bot = LichessBot()
        self.selenium_bridge = SeleniumBridge()
        self.proxy_manager = ProxyManager()

        self.root = None
        self.gui = None

        self.think_time = 1000
        self.bot_status = BotStatus.IDLE
        self.is_running = False

        # Register callback for FEN changes from WebSocket
        self.selenium_bridge.on_fen_changed(self.handle_fen_change)

    def initialize_gui(self):
        self.root = tk.Tk()
        self.gui = GUI(self.root, self.config_manager, self) # Pass self (controller) to GUI
        self.gui.load_initial_settings()

    def start(self):
        if self.is_running:
            logger.info("Bot is already running.")
            return

        logger.info("Starting bot...")
        if self.gui: # Only update GUI if it exists
            self.gui.update_status("Starting bot...")
        self.is_running = True

        try:
            # Start proxy
            self.proxy_manager.start_proxy()
            logger.info("Proxy started.")


            # Start WebSocket server
            self.selenium_bridge.start_server()
            logger.info("WebSocket server started.")

            # Start Selenium
            # Assuming extension path and user data dir are relative to Program directory
            extension_path = os.path.join(os.getcwd(), "extension")
            user_data_dir = os.path.join(os.getcwd(), "selenium_user_data")
            if not os.path.exists(user_data_dir):
                os.makedirs(user_data_dir)

            self.lichess_bot.start_selenium(
                proxy_port=self.proxy_manager.proxy_port,
                extension_path=extension_path,
                user_data_dir=user_data_dir
            )
            self.lichess_bot.open_lichess()
            logger.info("Selenium initialized and Lichess opened.")
   


            # Connect Stockfish engine
            stockfish_path = self.config_manager.get_setting("stockfish_path")
            if stockfish_path:
                self.stockfish_engine.path = stockfish_path
                self.stockfish_engine.connect_engine()
                self.update_stockfish_parameters()
                logger.info("Stockfish engine connected and parameters set.")
            else:
                logger.warning("Stockfish path not set. Please configure it in the GUI.")

            if self.gui: # Only update GUI if it exists
                self.gui.update_status("Bot started. Waiting for FEN changes...")

        except Exception as e:
            logger.critical(f"Error during bot startup: {e}")
            if self.gui: # Only update GUI if it exists
                self.gui.update_status(f"Startup failed: {e}")
            self.stop()

    def stop(self):
        if not self.is_running:
            logger.info("Bot is not running.")
            return

        logger.info("Stopping bot...")
        if self.gui: # Only update GUI if it exists
            self.gui.update_status("Stopping bot...")
        self.is_running = False

        # Shutdown components in reverse order of startup
        if self.stockfish_engine:
            self.stockfish_engine.quit()
            logger.info("Stockfish engine quit.")

        if self.lichess_bot:
            self.lichess_bot.quit_selenium()
            logger.info("Selenium quit.")

        if self.selenium_bridge:
            self.selenium_bridge.stop_server()
            logger.info("WebSocket server stopped.")

        if self.proxy_manager:
            self.proxy_manager.stop_proxy()
            logger.info("Proxy stopped.")

        self.config_manager.save_settings("config/settings.json")
        logger.info("Settings saved.")
        if self.gui: # Only update GUI if it exists
            self.gui.update_status("Bot stopped.")

    def handle_fen_change(self, data):
        logger.debug(f"FEN changed: {data}")
        fen = data.get("fen")
        is_my_turn = data.get("isMyTurn")
        last_move = data.get("lastMove")

        if not fen or not is_my_turn:
            logger.warning("Invalid FEN data received.")
            return

        if self.gui: # Only update GUI if it exists
            self.gui.update_status(f"FEN: {fen[:30]}... | My Turn: {is_my_turn}")

        if is_my_turn:
            if self.bot_status == BotStatus.AUTO_MOVE:
                self.perform_auto_move(fen)
            elif self.bot_status == BotStatus.HIGHLIGHT:
                self.perform_highlight(fen)
            else:
                logger.info("Bot is idle. No action taken.")
        else:
            logger.info("Not my turn. Waiting...")

    def perform_auto_move(self, fen):
        logger.info("Calculating best move for auto-move...")
        if self.gui: # Only update GUI if it exists
            self.gui.update_status("Calculating best move...")
        best_move = self.stockfish_engine.get_best_move(fen, self.think_time)
        if best_move:
            logger.info(f"Best move: {best_move}")
            if self.gui: # Only update GUI if it exists
                self.gui.update_status(f"Making move: {best_move}")
            delay_type = self.config_manager.get_setting("delay_type")
            delay_value = self.config_manager.get_setting("delay_value")
            Utils.apply_delay(delay_type, delay_value)
            self.lichess_bot.make_move(best_move)
            if self.gui: # Only update GUI if it exists
                self.gui.update_status(f"Move {best_move} made. Waiting for opponent...")
        else:
            logger.error("Could not get best move from Stockfish.")
            if self.gui: # Only update GUI if it exists
                self.gui.update_status("Error: Could not get best move.")

    def perform_highlight(self, fen):
        logger.info("Calculating best move for highlighting...")
        if self.gui: # Only update GUI if it exists
            self.gui.update_status("Calculating best move for highlighting...")
        best_move = self.stockfish_engine.get_best_move(fen, self.think_time)
        if best_move:
            logger.info(f"Highlighting move: {best_move}")
            if self.gui: # Only update GUI if it exists
                self.gui.update_status(f"Highlighting: {best_move}")
            self.lichess_bot.highlight(best_move)
        else:
            logger.error("Could not get best move from Stockfish for highlighting.")
            if self.gui: # Only update GUI if it exists
                self.gui.update_status("Error: Could not get best move for highlighting.")

    def update_settings(self):
        logger.info("Updating settings...")
        # Update Stockfish and bot settings based on GUI input
        if self.gui:
            stockfish_path = self.gui.get_stockfish_path()
            if stockfish_path and stockfish_path != self.stockfish_engine.path:
                self.stockfish_engine.path = stockfish_path
                self.stockfish_engine.connect_engine()

            self.config_manager.set_setting("stockfish_path", stockfish_path)
            self.config_manager.set_setting("cpu_threads", self.gui.get_cpu_threads())
            self.config_manager.set_setting("ram_memory", self.gui.get_ram_memory())
            self.config_manager.set_setting("skill_level", self.gui.get_skill_level())
            self.config_manager.set_setting("window_on_top", self.gui.on_top_var.get())
            self.config_manager.set_setting("delay_type", self.gui.get_delay_type())
            self.config_manager.set_setting("delay_value", self.gui.get_delay_value())
            self.config_manager.set_setting("moves_to_display", self.gui.get_moves_to_display())
        
        self.config_manager.save_settings("config/settings.json")
        self.update_stockfish_parameters()
        if self.gui: # Only update GUI if it exists
            self.gui.update_status("Settings updated.")

    def update_stockfish_parameters(self):
        logger.debug("Updating stockfish settings...")
        if self.stockfish_engine.engine:
            self.stockfish_engine.set_parameters(
                self.config_manager.get_setting("cpu_threads"),
                self.config_manager.get_setting("ram_memory"),
                self.config_manager.get_setting("skill_level")
            )

    def set_bot_status(self, status: BotStatus):
        self.bot_status = status
        logger.info(f"Bot status set to: {status.value}")
        if self.gui: # Only update GUI if it exists
            self.gui.update_status(f"Status: {status.value}")

    def set_thinkTime(self, val):
        self.think_time = int(val)

    def run_gui(self):
        if not self.root or not self.gui:
            self.initialize_gui()
        self.root.mainloop()


