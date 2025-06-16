import time
import threading
from src.utils import Utils


class BotController:
    """
    Coordinates the interaction between the Lichess bot, Stockfish engine, and GUI.
    Manages the overall logic for autoplay, move display, and bot state.
    """

    def __init__(self, config_manager, lichess_bot, stockfish_engine, gui):
        self.config = config_manager
        self.lichess = lichess_bot
        self.stockfish = stockfish_engine
        self.gui = gui
        self.is_running = False
        self.autoplay_enabled = False
        self.bot_thread = None

    def start(self):
        # Start the bot's main loop
        if not self.is_running:
            self.is_running = True
            self.gui.update_status("Bot started.")
            self.update_settings()
            self.bot_thread = threading.Thread(target=self.run_bot_loop)
            self.bot_thread.start()

    def stop(self):
        # Stop the bot's main loop
        if self.is_running:
            self.is_running = False
            self.gui.update_status("Bot stopped.")
            if self.bot_thread and self.bot_thread.is_alive():
                self.bot_thread.join(timeout=1)  # Wait for the thread to finish

    def toggle_autoplay(self):
        # Toggle autoplay mode
        self.autoplay_enabled = not self.autoplay_enabled
        self.gui.update_status(
            f"Autoplay: {'Enabled' if self.autoplay_enabled else 'Disabled'}"
        )

    def get_and_display_move(self):
        # Get best move from Stockfish and display it on Lichess board
        self.gui.update_status("Getting board state...")
        fen = self.lichess.get_board_state()
        if fen:
            self.gui.update_status(f"Analyzing position: {fen}")
            best_move = self.stockfish.get_best_move(fen)
            if best_move:
                self.gui.update_status(f"Best move: {best_move}")
                # Here you would call lichess.draw_arrow or similar to display the move
            else:
                self.gui.update_status("Could not get best move from Stockfish.")
        else:
            self.gui.update_status("Could not get board state from Lichess.")

    def auto_make_move(self):
        # Automatically make the best move on Lichess
        if self.autoplay_enabled:
            self.gui.update_status("Autoplay: Getting board state...")
            fen = self.lichess.get_board_state()
            if fen:
                self.gui.update_status(f"Autoplay: Analyzing position: {fen}")
                best_move = self.stockfish.get_best_move(fen)
                if best_move:
                    self.gui.update_status(f"Autoplay: Making move {best_move}")
                    self.lichess.make_move(best_move)
                else:
                    self.gui.update_status("Autoplay: Could not get best move.")
            else:
                self.gui.update_status("Autoplay: Could not get board state.")

    def update_settings(self):
        # Update Stockfish and bot settings based on GUI input
        stockfish_path = self.gui.get_stockfish_path()
        if stockfish_path and stockfish_path != self.stockfish.path:
            self.stockfish.path = stockfish_path
            self.stockfish.connect_engine()

        self.stockfish.set_parameters(
            self.gui.get_cpu_threads(),
            self.gui.get_ram_memory(),
            self.gui.get_skill_level(),
        )

        self.config.set_setting("stockfish_path", stockfish_path)
        self.config.set_setting("cpu_threads", self.gui.get_cpu_threads())
        self.config.set_setting("ram_memory", self.gui.get_ram_memory())
        self.config.set_setting("skill_level", self.gui.get_skill_level())
        self.config.set_setting("window_on_top", self.gui.on_top_var.get())
        self.config.set_setting("delay_type", self.gui.get_delay_type())
        self.config.set_setting("delay_value", self.gui.get_delay_value())
        self.config.set_setting("moves_to_display", self.gui.get_moves_to_display())
        self.config.save_settings("config/settings.json")

    def run_bot_loop(self):
        # Main loop for the bot's operation
        self.lichess.open_lichess()
        while self.is_running:
            self.update_settings()
            if self.autoplay_enabled:
                self.auto_make_move()
            else:
                self.get_and_display_move()

            delay_type = self.config.get_setting("delay_type")
            delay_value = self.config.get_setting("delay_value")
            Utils.apply_delay(delay_type, delay_value)

        self.lichess.close_browser()
