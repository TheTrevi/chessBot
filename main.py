import tkinter as tk
from src.config import ConfigManager
from src.stockfish_engine import StockfishEngine
from src.lichess_bot import LichessBot
from src.gui import GUI
from src.bot_controller import BotController


def main():
    # Initialize configuration manager
    config_manager = ConfigManager()
    config_manager.load_settings("config/settings.json") # Load settings

    # Initialize Stockfish engine (path will be set via GUI/config)
    stockfish_path = config_manager.get_setting("stockfish_path")
    stockfish_engine = StockfishEngine(path=stockfish_path)

    # Initialize Lichess bot (driver path will be set via config if needed)
    # For now, driver_path is empty, assuming it will be handled by user or auto-detected
    lichess_bot = LichessBot(driver_path="")

    # Initialize Tkinter GUI
    root = tk.Tk()
    gui = GUI(root, None)  # Pass None for controller initially, will be set later

    # Initialize Bot Controller
    bot_controller = BotController(config_manager, lichess_bot, stockfish_engine, gui)
    gui.controller = bot_controller  # Set the controller reference in GUI

    # Load initial settings into GUI
    gui.load_initial_settings()

    # Start the Tkinter main loop
    root.mainloop()

    # Save settings on application close
    config_manager.save_settings("config/settings.json")


if __name__ == "__main__":
    main()
