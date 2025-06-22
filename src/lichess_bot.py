from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.events import EventFiringWebDriver, AbstractEventListener
import os

class LichessBot:
    """
    Automates interactions with the Lichess website using Selenium.
    """
    def __init__(self, driver: webdriver.Chrome = None):
        self.driver = driver
        self.wait = None
        if driver:
            self.wait = WebDriverWait(self.driver, 10)

    def start_selenium(self, proxy_port=8000, extension_path=None, user_data_dir=None):
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument(f'--proxy-server=http://127.0.0.1:{proxy_port}')
        chrome_options.add_experimental_option("excludeSwitches", ["enable-logging", "enable-automation"])
        chrome_options.add_argument('--disable-blink-features=AutomationControlled')
        chrome_options.add_experimental_option('useAutomationExtension', False)
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-web-security')
        chrome_options.add_argument('--disable-features=VizDisplayCompositor')
        chrome_options.add_argument('--allow-running-insecure-content')
        
        if user_data_dir:
            chrome_options.add_argument(f"--user-data-dir={user_data_dir}")
        if extension_path:
            chrome_options.add_argument(f"--load-extension={extension_path}")

        chrome_install = ChromeDriverManager().install()
        service = Service(chrome_install)

        driver = webdriver.Chrome(
            service=service,
            options=chrome_options
        )

        self.driver = driver
        self.wait = WebDriverWait(self.driver, 10)

        return driver

    def open_lichess(self, url: str = "https://lichess.org/"):
        if self.driver:
            self.driver.get(url)
        
    def _execute_js(self, script: str, *args):
        # Helper to execute JavaScript in the browser
        if self.driver:
            return self.driver.execute_script(script, *args)
        return None

    def make_move(self, move_uci: str):
        # Make a move on the Lichess board using JavaScript.
        try:
            from_square = move_uci[0:2]
            to_square = move_uci[2:4]

            self._execute_js(f"game.sendMove('{from_square}', '{to_square}', '', '')")

            print(f"Attempted to make move: {move_uci}")
        except Exception as e:
            print(f"Error making move {move_uci}: {e}")

    def highlight(self, move_uci: str):
        # Placeholder for highlighting a move on the Lichess board using JavaScript.
        # This would typically involve injecting JavaScript to manipulate the DOM
        # to add visual cues for the given move_uci.
        try:
            print(f"Attempting to highlight move: {move_uci}")
            # Example: self._execute_js(f"highlightSquare('{move_uci}')")
            # You would need to implement the 'highlightSquare' function in your injected JavaScript.
        except Exception as e:
            print(f"Error highlighting move {move_uci}: {e}")

    def quit_selenium(self):
        if self.driver:
            self.driver.quit()
            self.driver = None


