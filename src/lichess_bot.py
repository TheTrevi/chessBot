from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager



class LichessBot:
    """
    Automates interactions with the Lichess website using Selenium.
    """
    def __init__(self, driver: webdriver.Chrome = None, proxy_port=8000):
        self.proxy_port = proxy_port
        if (driver):
            self.driver = driver
            self.wait = WebDriverWait(self.driver, 10)


    def start_selenium(self,):
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument(f'--proxy-server=http://127.0.0.1:{self.proxy_port}')
        chrome_options.add_experimental_option("excludeSwitches", ["enable-logging", "enable-automation"])
        chrome_options.add_argument('--disable-blink-features=AutomationControlled')
        chrome_options.add_experimental_option('useAutomationExtension', False)
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-web-security')
        chrome_options.add_argument('--disable-features=VizDisplayCompositor')
        chrome_options.add_argument('--allow-running-insecure-content')
        chrome_options.add_argument(r"--user-data-dir=/home/trevi/temp/accountSelenium") 
        chrome_options.add_argument(r"--load-extension=/home/trevi/ilTrevi/programming/python/lichess-bot/extension")


        chrome_install = ChromeDriverManager().install()

        service = Service(chrome_install)

        driver = webdriver.Chrome(
            service=service,
            options=chrome_options
        )


        self.driver = driver
        self.wait = WebDriverWait(self.driver, 10)

        return driver

    

    def open_lichess(self, url: str = "https://lichess.org/" ):
        self.driver.get(url)



    def _execute_js(self, script: str, *args):
        # Helper to execute JavaScript in the browser
        return self.driver.execute_script(script, *args)

    def get_board_state(self):
        # Get the current FEN position from the Lichess board
        # Lichess uses a JavaScript variable or a data attribute to store the FEN.
        # We need to find the correct JavaScript variable or element attribute.
        # Example: return self._execute_js("return LichessTools.getFen();")
        # A more robust way might be to look for the board element and extract its data-fen attribute
        return self._execute_js("return game.data.steps[game.data.steps.length-1].fen")

    def isTurn(self):
        return self._execute_js("return game.canMove()")

    def make_move(self, move_uci: str):
        # Make a move on the Lichess board using JavaScript.
        try:
            from_square = move_uci[0:2]
            to_square = move_uci[2:4]

            self._execute_js(f"game.sendMove('{from_square}', '{to_square}', '', '')")

            print(f"Attempted to make move: {move_uci}")
        except Exception as e:
            print(f"Error making move {move_uci}: {e}")

    def draw_arrow(self, start_square: str, end_square: str, color: str):
        # Draw an arrow on the Lichess board (via JavaScript injection or CSS modification)
        print(f"Attempted to draw arrow from {start_square} to {end_square} with color {color}")
        pass

    def close_browser(self):
        # This method is now redundant as the driver is managed by main.py
        pass
