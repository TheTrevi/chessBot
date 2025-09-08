# Lichess Chess Bot

A powerful chess bot that integrates with Lichess.org using advanced techniques including proxy interception, JavaScript injection, and real-time game state analysis. This bot has demonstrated exceptional performance, capable of defeating even the strongest chess engines on Lichess.

**Test Profile:** [ProvaPerScacchi](https://lichess.org/@/ProvaPerScacchi) - Where this bot was tested and proven effective against top-tier opponents.

## 🏆 Features

- **Real-time Game Analysis**: Intercepts and analyzes Lichess game states in real-time
- **Stockfish Integration**: Uses the powerful Stockfish chess engine for move calculation
- **Multiple Operating Modes**:
    - Auto Move: Automatically plays the best move
    - Highlight: Shows the best move without playing it
    - Idle: Passive monitoring
- **Advanced Injection System**: Custom browser extension and proxy-based JavaScript injection
- **Customizable Settings**: Full control over engine parameters, delays, and behavior
- **Professional UI**: Modern CustomTkinter-based interface for easy configuration

## 🛠️ Architecture

The bot uses a sophisticated multi-layer architecture:

1. **Proxy Layer** (`override.py`): Intercepts Lichess JavaScript files and modifies them
2. **Browser Extension** (`extension/`): Injects custom JavaScript to monitor game state
3. **WebSocket Bridge** (`src/websocket.py`): Real-time communication between browser and bot
4. **Selenium Controller** (`src/lichess_bot.py`): Browser automation and move execution
5. **Stockfish Engine** (`src/stockfish_engine.py`): Chess move calculation
6. **GUI Controller** (`src/gui.py`): User interface for configuration and control

## 📋 Prerequisites

### Required Software

- **Python 3.8+**
- **Stockfish Chess Engine**: Download from [stockfishchess.org](https://stockfishchess.org/)
- **Chrome Browser**: Latest version recommended
- **mitmproxy**: For proxy functionality

### Python Dependencies

```bash
pip install -r requirements.txt
```

Required packages:

- `selenium`
- `websockets`
- `chess`
- `customtkinter`
- `webdriver-manager`
- `loguru`
- `mitmproxy`

## 🚀 Installation

1. **Clone the repository**:
    
    ```bash
    git clone https://github.com/TheTrevi/chessBot
    cd lichess-chess-bot
    ```
    
2. **Install dependencies**:
    
    ```bash
    pip install -r requirements.txt
    ```
    
3. **Download Stockfish**:
    
    - Download the appropriate Stockfish binary for your system
    - Note the path to the executable
4. **Setup directories**:
    
    ```bash
    mkdir -p logs config selenium_user_data
    ```
    

## 🎮 Usage

### GUI Mode (Recommended)

```bash
python main.py
```

### Headless Mode

```bash
python main.py --no-gui
```

## ⚙️ Configuration

### First-Time Setup

1. **Launch the application**
    
2. **Configure Stockfish Path**: Browse and select your Stockfish executable
    
3. **Adjust Engine Settings**:
    
    - CPU Threads: Number of threads for Stockfish (1-16)
    - RAM Memory: Memory allocation in MB (64-4096)
    - Skill Level: Engine strength (0-20, where 20 is maximum)
    - Think Time: Analysis time in milliseconds
4. **Set Bot Behavior**:
    
    - **Idle**: Monitor only, no actions
    - **Auto Move**: Automatically play calculated moves
    - **Highlight**: Show best moves without playing
5. **Configure Delays**: Add human-like delays to avoid detection
    
    - Fixed delay: Constant delay time
    - Random delay: Variable delay within range

### Configuration File

Settings are automatically saved to `config/settings.json`:

```json
{
    "stockfish_path": "/path/to/stockfish",
    "cpu_threads": 13,
    "ram_memory": 1676,
    "skill_level": 8,
    "window_on_top": false,
    "delay_type": "fixed",
    "delay_value": 0.0,
    "moves_to_display": 1
}
```

## 🎯 How It Works

### 1. Proxy Interception

The bot starts a mitmproxy server that intercepts specific Lichess JavaScript files:

- `lib.7N7EZUST.js`
- `puzzle.6XDC3NRX.js`
- `round.KBYFIJ2U.js`

These files are replaced with modified versions that expose game state information.

### 2. Browser Extension

A Chrome extension (`extension/`) injects JavaScript that:

- Monitors for game state changes
- Tracks FEN positions and move history
- Sends real-time updates via WebSocket

### 3. Game State Analysis

When a position change is detected:

1. The browser extension captures the current FEN
2. Data is sent to the Python backend via WebSocket
3. Stockfish analyzes the position
4. The best move is calculated and executed

### 4. Move Execution

Depending on the selected mode:

- **Auto Move**: The move is automatically played using Selenium
- **Highlight**: The best move squares are highlighted on the board
- **Idle**: No action is taken

## 🔧 Technical Details

### File Structure

```
├── main.py                 # Application entry point
├── config/
│   └── settings.json      # Configuration file
├── extension/             # Chrome extension files
│   ├── manifest.json     # Extension manifest
│   ├── extension.js      # Main extension script
│   ├── eventListeners.js # Game event handling
│   └── library.js        # Chess.js library
├── src/                  # Core application modules
│   ├── bot_controller.py # Main bot logic
│   ├── config.py         # Configuration management
│   ├── gui.py           # User interface
│   ├── lichess_bot.py   # Selenium automation
│   ├── proxy_manager.py # mitmproxy management
│   ├── stockfish_engine.py # Engine interface
│   ├── utils.py         # Utility functions
│   └── websocket.py     # WebSocket server
├── override.py          # Proxy script for JS injection
└── logs/               # Application logs
```

### Key Components

**BotController** (`src/bot_controller.py`):

- Orchestrates all components
- Manages bot lifecycle
- Handles FEN position updates

**StockfishEngine** (`src/stockfish_engine.py`):

- Interfaces with Stockfish binary
- Configures engine parameters
- Calculates best moves

**LichessBot** (`src/lichess_bot.py`):

- Selenium WebDriver management
- Browser automation
- Move execution on Lichess interface

**SeleniumBridge** (`src/websocket.py`):

- WebSocket server for browser communication
- Real-time data transfer
- Event handling

## ⚠️ Important Notes

### Legal and Ethical Considerations

- This bot is for educational purposes only
- Using bots on chess platforms may violate their terms of service
- Consider the impact on other players and the chess community
- Use responsibly and ethically

### Performance

- The bot can analyze positions and play moves in milliseconds
- Stockfish strength can be adjusted for different skill levels
- Delay settings help simulate human-like play patterns

### Compatibility

- Designed specifically for Lichess.org
- Requires Chrome browser
- Works on Windows, macOS, and Linux

## 🐛 Troubleshooting

### Common Issues

**Bot won't start:**

- Verify Stockfish path is correct
- Check that all dependencies are installed
- Ensure Chrome is installed and accessible

**No moves being made:**

- Check WebSocket connection (port 8765)
- Verify proxy is running (port 8000)
- Ensure browser extension is loaded

**Performance issues:**

- Adjust CPU threads and RAM allocation
- Reduce think time for faster moves
- Check system resources

### Logs

Check the `logs/` directory for detailed error information:

- `file.log`: General application logs
- `mitmproxy.log`: Proxy server logs

## 🤝 Contributing

Contributions are welcome! Please consider:

- Code improvements and optimizations
- Additional chess platform support
- Enhanced detection avoidance
- Better error handling

## 📄 License

This project is for educational purposes only. Please respect the terms of service of chess platforms and use responsibly.

## 🙏 Acknowledgments

- **Stockfish**: The powerful chess engine that powers the bot
- **Lichess**: The excellent chess platform
- **Chess.js**: JavaScript chess library used in the extension
- **mitmproxy**: For proxy functionality
- **Selenium**: For browser automation

---

**⚡ Performance Proven**: This bot has successfully competed against and defeated top-tier chess engines on Lichess, demonstrating its effectiveness and sophisticated implementation.

**🔗 Test Profile**: [ProvaPerScacchi](https://lichess.org/@/ProvaPerScacchi)