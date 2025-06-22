import asyncio
import websockets
import json
import threading
from loguru import logger


class SeleniumBridge:
    def __init__(self):
        self.callbacks = {}
        self.loop = None
        self.server_thread = None
        self.stop_event = asyncio.Event()
        self.websocket_server = None
    
    def on_fen_changed(self, callback):
        self.callbacks["fenChanged"] = callback
    
    async def handle_message(self, websocket):
        try:
            async for message in websocket:
                try:
                    data = json.loads(message)
                    event_type = data.get("type")
                    
                    if event_type in self.callbacks:
                        self.callbacks[event_type](data)
                        
                except Exception as e:
                    logger.error(f"Error processing WebSocket message: {e}")
        except websockets.exceptions.ConnectionClosedOK:
            logger.info("WebSocket connection closed gracefully.")
        except Exception as e:
            logger.error(f"Error in WebSocket handler: {e}")

    async def _start_websocket_server(self):
        self.websocket_server = await websockets.serve(self.handle_message, "localhost", 8765)
        logger.info("WebSocket server started on ws://localhost:8765")
        await self.stop_event.wait() # Wait for the stop event
        self.websocket_server.close()
        await self.websocket_server.wait_closed()
        logger.info("WebSocket server stopped.")
    
    def _run_server(self):
        self.loop = asyncio.new_event_loop()
        asyncio.set_event_loop(self.loop)
        try:
            self.loop.run_until_complete(self._start_websocket_server())
        except asyncio.CancelledError:
            logger.info("WebSocket server task cancelled.")
        finally:
            self.loop.close()
            logger.info("WebSocket server event loop closed.")

    def start_server(self):
        if self.server_thread and self.server_thread.is_alive():
            logger.info("WebSocket server is already running.")
            return
        self.stop_event.clear()
        self.server_thread = threading.Thread(target=self._run_server, daemon=True)
        self.server_thread.start()

    def stop_server(self):
        if self.server_thread and self.server_thread.is_alive():
            logger.info("Signaling WebSocket server to stop...")
            self.stop_event.set()
            # Give it a moment to shut down gracefully
            self.server_thread.join(timeout=5)
            if self.server_thread.is_alive():
                logger.warning("WebSocket server thread did not terminate gracefully.")
        else:
            logger.info("WebSocket server is not running.")


