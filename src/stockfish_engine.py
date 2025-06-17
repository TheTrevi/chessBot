import chess
import chess.engine

class StockfishEngine:
    """
    Manages communication with the Stockfish chess engine.
    """
    def __init__(self, path: str):
        self.engine = None
        self.path = path

    def connect_engine(self):
        try:
            self.engine = chess.engine.SimpleEngine.popen_uci(self.path)
        except Exception as e:
            print(f"Error connecting to Stockfish: {e}")
            self.engine = None

    def set_parameters(self, threads: int, memory: int, skill_level: int):
        # Set Stockfish engine parameters like CPU threads, RAM, and skill level
        if self.engine:
            self.engine.configure({
                "Threads": threads,
                "Hash": memory,
                "Skill Level": skill_level
            })

    def get_best_move(self, fen_position: str, time_limit_ms: int = 1000):
        # Get the best move from Stockfish for a given FEN position
        if not self.engine:
            if self.path:
                self.connect_engine()
            if not self.engine:
                return None

        board = chess.Board(fen_position)
        try:
            result = self.engine.play(board, chess.engine.Limit(time=time_limit_ms / 1000))
            return result.move.uci()
        except chess.engine.EngineError as e:
            print(f"Stockfish engine error: {e}")
            return None
        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            return None

    def quit(self):
        # Terminate the Stockfish engine process
        if self.engine:
            self.engine.quit()
            self.engine = None


