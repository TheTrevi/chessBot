import subprocess
import signal
import time
import socket
from loguru import logger

class ProxyManager:
    def __init__(self, proxy_script="override.py", listen_port=8000):
        self.proxy_script = proxy_script
        self.listen_port = listen_port
        self.mitmproxy_process = None
        self.logfile = None
        self.mitmdump_path = "mitmdump" # Full path to mitmdump

    def start_proxy(self):
        if self.mitmproxy_process:
            logger.info("Proxy already running.")
            return

        logger.info(f"Starting mitmproxy on port {self.listen_port}...")
        self.logfile = open("logs/mitmproxy.log", "w")
        # logger.info(f"Alredy Started on other terinal ...")

        self.mitmproxy_process = subprocess.Popen(
            [self.mitmdump_path, "-s", self.proxy_script, "--listen-port", str(self.listen_port)],
            stdout=self.logfile,
            stderr=self.logfile,
        )
        self._wait_for_proxy()
        logger.info("mitmproxy started successfully.")

    def stop_proxy(self):
        if self.mitmproxy_process:
            logger.info("Stopping mitmproxy...")
            self.mitmproxy_process.send_signal(signal.SIGINT)  # Graceful shutdown
            self.mitmproxy_process.wait(timeout=5)
            if self.mitmproxy_process.poll() is None:
                self.mitmproxy_process.terminate()
                self.mitmproxy_process.wait(timeout=5)
            if self.mitmproxy_process.poll() is None:
                self.mitmproxy_process.kill()
                self.mitmproxy_process.wait()
            self.mitmproxy_process = None
            if self.logfile:
                self.logfile.close()
                self.logfile = None
            logger.info("mitmproxy stopped.")
        else:
            logger.info("Proxy not running.")

    def _wait_for_proxy(self, host="127.0.0.1", timeout=10):
        start_time = time.time()
        while time.time() - start_time < timeout:
            try:
                with socket.create_connection((host, self.listen_port), timeout=1):
                    return True
            except (OSError, ConnectionRefusedError):
                time.sleep(0.1)
        raise RuntimeError(f"mitmproxy did not start within {timeout} seconds.")

    @property
    def proxy_port(self):
        return self.listen_port


