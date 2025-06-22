import time
import random
from enum import Enum

class Utils:
    """
    Utility functions for the chess bot.
    """
    @staticmethod
    def apply_delay(delay_type: str, delay_value: float):
        # Apply a fixed or random delay
        if delay_type == "fixed":
            time.sleep(delay_value)
        elif delay_type == "random":
            time.sleep(random.uniform(0.5 * delay_value, 1.5 * delay_value))

    @staticmethod
    def convert_fen_to_board_state(fen: str):
        # Convert FEN string to a more usable board representation (if needed)
        pass

    @staticmethod
    def parse_stockfish_output(output: str):
        # Parse Stockfish engine output to extract best move
        pass

class BotStatus(Enum):
    IDLE = "idle"
    AUTO_MOVE = "autoMove"
    HIGHLIGHT = "highlight"