from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support import expected_conditions as EC
import os


class LichessBot:
    """
    Automates interactions with the Lichess website using Selenium.
    Works on Arch with Chromium by either:
      - Using Selenium Manager (default), which auto-resolves the correct driver.
      - Using the bundled chromedriver from the Chromium package.
    """

    def __init__(self, driver: webdriver.Chrome = None):
        self.driver = driver
        self.wait = WebDriverWait(self.driver, 10) if driver else None

    def start_selenium(
        self,
        proxy_port: int = 8000,
        extension_path: str | None = None,
        user_data_dir: str | None = None,
        chromium_binary: str = "/usr/bin/chromium",
        use_bundled_driver: bool = False,
        bundled_driver_path: str = "/usr/lib/chromium/chromedriver",
        headless: bool = False,
    ):
        # Configure Chrome/Chromium options
        chrome_options = Options()
        chrome_options.binary_location = chromium_binary  # Point to Arch's Chromium

        # Common flags (retain original behavior)
        chrome_options.add_argument(f"--proxy-server=http://127.0.0.1:{proxy_port}")
        chrome_options.add_experimental_option("excludeSwitches", ["enable-logging", "enable-automation"])
        chrome_options.add_argument("--disable-blink-features=AutomationControlled")
        chrome_options.add_experimental_option("useAutomationExtension", False)
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-web-security")
        chrome_options.add_argument("--disable-features=VizDisplayCompositor")
        chrome_options.add_argument("--allow-running-insecure-content")

        if headless:
            chrome_options.add_argument("--headless=new")

        if user_data_dir:
            chrome_options.add_argument(f"--user-data-dir={user_data_dir}")

        if extension_path:
            chrome_options.add_argument(f"--load-extension={extension_path}")

        # Option A (default): Selenium Manager resolves the correct driver automatically.
        # Option B: Use Arch's bundled chromedriver, which matches the system Chromium.
        if use_bundled_driver:
            service = Service(bundled_driver_path)
            driver = webdriver.Chrome(service=service, options=chrome_options)
        else:
            # No Service path: Selenium Manager will detect Chromium and fetch a matching driver
            driver = webdriver.Chrome(options=chrome_options)

        self.driver = driver
        self.wait = WebDriverWait(self.driver, 10)
        return driver

    def open_lichess(self, url: str = "https://lichess.org/"):
        if self.driver:
            self.driver.get(url)

    def _execute_js(self, script: str, *args):
        if self.driver:
            return self.driver.execute_script(script, *args)
        return None

    def make_move(self, move_uci: str):
        # Example: 'e2e4'
        try:
            from_square = move_uci[0:2]
            to_square = move_uci[2:4]
            self._execute_js(f"game.sendMove('{from_square}', '{to_square}', '', '')")
            print(f"Attempted to make move: {move_uci}")
        except Exception as e:
            print(f"Error making move {move_uci}: {e}")

    def highlight(self, move_uci: str):
        try:
            print(f"Attempting to highlight move: {move_uci}")
            self._execute_js("game.chessground.state.drawable.shapes = []; game.chessground.state.drawable.shapes = [{"+f"'orig': '{move_uci[0:2]}', 'dest': '{move_uci[2:4]}', 'brush': 'pink'"+"}]; game.chessground.redrawAll()")
        except Exception as e:
            print(f"Error highlighting move {move_uci}: {e}")

    def quit_selenium(self):
        if self.driver:
            self.driver.quit()
            self.driver = None

