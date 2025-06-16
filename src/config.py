import json
import os


class ConfigManager:
    """
    Manages configuration settings for the chess bot.
    Settings include Stockfish path, engine parameters, GUI options, etc.
    """

    def __init__(self):
        self.settings = {
            "stockfish_path": "",
            "cpu_threads": 1,
            "ram_memory": 1024,
            "skill_level": 1,
            "window_on_top": False,
            "delay_type": "fixed",
            "delay_value": 1.0,
            "moves_to_display": 3,
        }

    def load_settings(self, file_path: str):
        # Load settings from a file (e.g., JSON or INI)
        if os.path.exists(file_path):
            with open(file_path, "r") as f:
                self.settings.update(json.load(f))

    def save_settings(self, file_path: str):
        # Save current settings to a file
        with open(file_path, "w") as f:
            json.dump(self.settings, f, indent=4)

    def get_setting(self, key: str):
        # Get a specific setting by key
        return self.settings.get(key)

    def set_setting(self, key: str, value):
        # Set a specific setting by key
        self.settings[key] = value
