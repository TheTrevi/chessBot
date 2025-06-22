import tkinter as tk
from loguru import logger
import os
import sys
import time

from src.bot_controller import BotController

def main():
    # Ensure logs directory exists
    if not os.path.exists("logs"):
        os.makedirs("logs")

    logger.add("logs/file.log", rotation="500 MB")

    controller = BotController()

    # Check if running in a headless environment or if a specific argument is passed
    if os.environ.get("DISPLAY"):
        logger.info("Running bot with GUI.")
        controller.initialize_gui()
        controller.run_gui()
    elif len(sys.argv) > 1 and sys.argv[1] == "--no-gui":
        logger.info("Running bot in headless mode (no GUI).")
        controller.start()
        try:
            while True:
                time.sleep(1) # Keep the script running
        except KeyboardInterrupt:
            logger.info("Headless bot stopped by user.")
            controller.stop()
    else:
        logger.error("No display found and --no-gui argument not provided. Cannot run GUI. Exiting.")
        sys.exit(1)

if __name__ == "__main__":
    main()


