import tkinter as tk
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service as ChromeService
from src.config import ConfigManager
from src.stockfish_engine import StockfishEngine
from src.lichess_bot import LichessBot
from src.gui import GUI
from src.bot_controller import BotController

import subprocess
import signal
import time
import socket

def main():

    logfile = open("logs/mitmproxy.log", "w")

    mitmproxy_process = subprocess.Popen(
        ["mitmdump", "-s", "override.py", "--listen-port", "8000"],
        stdout=logfile,
        stderr=logfile
    )
    
    wait_for_proxy()
    print("mitproxy started")

    

    # Initialize configuration manager
    config_manager = ConfigManager()
    config_manager.load_settings("config/settings.json") # Load settings

    # Initialize Selenium WebDriver
    driver = None

    # Open Webdriver
    try:

        lichess_bot = LichessBot()
        lichess_bot.start_selenium()
        lichess_bot.open_lichess() # Open Lichess when the application starts


        # Initialize Stockfish engine (path will be set via GUI/config)
        stockfish_path = config_manager.get_setting("stockfish_path")
        stockfish_engine = StockfishEngine(path=stockfish_path)

        # Initialize Lichess bot with the external driver

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

    except Exception as e:
        print(f"An error occurred during bot initialization or execution: {e}")
    finally:
        # Save settings on application close
        config_manager.save_settings("config/settings.json")
        # Close the Selenium browser instance
        if driver:
            driver.quit()
        
        if mitmproxy_process:
            mitmproxy_process.send_signal(signal.SIGINT)  # Graceful shutdown
            mitmproxy_process.wait()


def wait_for_proxy(host="127.0.0.1", port=8000, timeout=10):
    start_time = time.time()
    while time.time() - start_time < timeout:
        try:
            with socket.create_connection((host, port), timeout=1):
                return True
        except (OSError, ConnectionRefusedError):
            time.sleep(0.1)
    raise RuntimeError(f"mitmproxy did not start within {timeout} seconds.")

if __name__ == "__main__":
    main()
