import customtkinter as ctk
from tkinter import filedialog
import tkinter as tk

from src.utils import BotStatus

class GUI:
    """
    Creates and manages the CustomTkinter graphical user interface for the chess bot.
    """

    def __init__(self, master: ctk.CTk, configManager, controller):
        self.master = master
        self.config = configManager
        self.controller = controller
        
        # Set theme and color scheme
        ctk.set_appearance_mode("dark")
        ctk.set_default_color_theme("blue")
        
        # Define consistent colors for uniform appearance
        self.PRIMARY_COLOR = "#1f538d"
        self.SECONDARY_COLOR = "#14375e"
        self.ACCENT_COLOR = "#3b8ed0"
        self.DANGER_COLOR = "#c42b1c"
        self.SUCCESS_COLOR = "#0e7c0e"
        self.TEXT_COLOR = "#ffffff"
        self.FRAME_COLOR = "#212121"
        self.INPUT_COLOR = "#343638"
        
        # Consistent styling
        self.CORNER_RADIUS = 10
        self.PADDING = 15
        self.BUTTON_HEIGHT = 45
        self.LABEL_FONT = ctk.CTkFont(size=14, weight="normal")
        self.TITLE_FONT = ctk.CTkFont(size=18, weight="bold")
        self.VALUE_FONT = ctk.CTkFont(size=13)
        
        master.title("Chess Bot Control Panel")
        master.geometry("1200x850")
        master.resizable(True, True)
        
        # Initialize status
        self.status = BotStatus.IDLE
        
        self.create_widgets()
        self.load_initial_settings()

    def create_section_frame(self, parent, title):
        """Helper method to create consistent section frames"""
        frame = ctk.CTkFrame(parent, corner_radius=self.CORNER_RADIUS)
        frame.pack(fill="x", padx=self.PADDING, pady=(0, self.PADDING))
        
        title_label = ctk.CTkLabel(
            frame, 
            text=title, 
            font=self.TITLE_FONT
        )
        title_label.pack(pady=(self.PADDING, 10))
        
        return frame

    def create_widgets(self):
        # Create scrollable main container
        self.main_container = ctk.CTkScrollableFrame(self.master, corner_radius=0)
        self.main_container.pack(fill="both", expand=True)
        
        # Title Bar
        title_frame = ctk.CTkFrame(self.main_container, corner_radius=0, height=60)
        title_frame.pack(fill="x", pady=(0, self.PADDING))
        title_frame.pack_propagate(False)
        
        app_title = ctk.CTkLabel(
            title_frame,
            text="♟ CHESS BOT CONTROL PANEL",
            font=ctk.CTkFont(size=24, weight="bold")
        )
        app_title.pack(pady=15)
        
        # ENGINE SETTINGS SECTION
        engine_frame = self.create_section_frame(self.main_container, "⚙ Engine Settings")
        settings_content = ctk.CTkFrame(engine_frame)
        settings_content.pack(fill="x", padx=self.PADDING, pady=(0, self.PADDING))
        
        # Stockfish Path with improved layout
        path_container = ctk.CTkFrame(settings_content)
        path_container.pack(fill="x", pady=(0, 10))
        
        ctk.CTkLabel(
            path_container, 
            text="Stockfish Path:", 
            font=self.LABEL_FONT,
            width=150,
            anchor="w"
        ).pack(side="left", padx=(0, 10))
        
        self.stockfish_path_entry = ctk.CTkEntry(
            path_container,
            placeholder_text="Select Stockfish executable...",
            corner_radius=self.CORNER_RADIUS,
            border_width=2,
            height=35
        )
        self.stockfish_path_entry.pack(side="left", fill="x", expand=True)
        
        browse_btn = ctk.CTkButton(
            path_container,
            text="Browse",
            command=self.browse_stockfish_path,
            width=100,
            height=35,
            corner_radius=self.CORNER_RADIUS,
            font=self.LABEL_FONT
        )
        browse_btn.pack(side="left", padx=(10, 0))
        
        # Create two columns for sliders
        sliders_container = ctk.CTkFrame(settings_content)
        sliders_container.pack(fill="x", pady=10)
        
        # Left column
        left_column = ctk.CTkFrame(sliders_container)
        left_column.pack(side="left", fill="both", expand=True, padx=(0, 10))
        
        # Right column
        right_column = ctk.CTkFrame(sliders_container)
        right_column.pack(side="left", fill="both", expand=True)
        
        # CPU Threads (Left Column)
        self.create_slider_with_entry(
            left_column,
            "CPU Threads:",
            "cpu_threads",
            1, 16, 1,
            self.update_cpu_threads
        )
        
        # RAM Memory (Right Column)
        self.create_slider_with_entry(
            right_column,
            "RAM Memory (MB):",
            "ram_memory",
            64, 4096, 1024,
            self.update_ram_memory
        )
        
        # Skill Level (Left Column)
        self.create_slider_with_entry(
            left_column,
            "Skill Level:",
            "skill_level",
            0, 20, 1,
            self.update_skill_level
        )
        
        # Think Time (Right Column)
        self.create_slider_with_entry(
            right_column,
            "Think Time (ms):",
            "think_time",
            10, 10000, 1000,
            self.update_think_time
        )
        
        # Window Stay on Top
        checkbox_container = ctk.CTkFrame(settings_content)
        checkbox_container.pack(fill="x", pady=(10, 0))
        
        self.on_top_var = tk.BooleanVar(value=False)
        self.on_top_checkbox = ctk.CTkCheckBox(
            checkbox_container,
            text="Keep Window on Top",
            variable=self.on_top_var,
            command=self.toggle_on_top,
            corner_radius=6,
            font=self.LABEL_FONT,
            checkbox_width=24,
            checkbox_height=24
        )
        self.on_top_checkbox.pack(anchor="w")
        
        # BOT MODE SECTION
        mode_frame = self.create_section_frame(self.main_container, "🤖 Bot Mode")
        mode_content = ctk.CTkFrame(mode_frame)
        mode_content.pack(pady=(0, self.PADDING))
        
        self.status_var = tk.StringVar(value=BotStatus.IDLE.value)
        
        modes = [
            ("🔄 Idle", BotStatus.IDLE.value),
            ("⚡ Auto Move", BotStatus.AUTO_MOVE.value),
            ("✨ Highlight", BotStatus.HIGHLIGHT.value)
        ]
        
        for text, value in modes:
            radio = ctk.CTkRadioButton(
                mode_content,
                text=text,
                variable=self.status_var,
                value=value,
                command=self.update_status_enum,
                font=self.LABEL_FONT,
                radiobutton_width=20,
                radiobutton_height=20
            )
            radio.pack(side="left", padx=20)
        
        # DELAY SETTINGS SECTION
        delay_frame = self.create_section_frame(self.main_container, "⏱ Delay Settings")
        delay_content = ctk.CTkFrame(delay_frame)
        delay_content.pack(fill="x", padx=self.PADDING, pady=(0, self.PADDING))
        
        # Delay Type
        type_container = ctk.CTkFrame(delay_content)
        type_container.pack(fill="x", pady=(0, 10))
        
        ctk.CTkLabel(
            type_container,
            text="Delay Type:",
            font=self.LABEL_FONT,
            width=150,
            anchor="w"
        ).pack(side="left")
        
        self.delay_type_var = tk.StringVar(value="fixed")
        
        delay_types_frame = ctk.CTkFrame(type_container)
        delay_types_frame.pack(side="left")
        
        fixed_radio = ctk.CTkRadioButton(
            delay_types_frame,
            text="Fixed",
            variable=self.delay_type_var,
            value="fixed",
            font=self.LABEL_FONT
        )
        fixed_radio.pack(side="left", padx=(0, 20))
        
        random_radio = ctk.CTkRadioButton(
            delay_types_frame,
            text="Random",
            variable=self.delay_type_var,
            value="random",
            font=self.LABEL_FONT
        )
        random_radio.pack(side="left")
        
        # Delay Value
        value_container = ctk.CTkFrame(delay_content)
        value_container.pack(fill="x", pady=10)
        
        ctk.CTkLabel(
            value_container,
            text="Delay Value (s):",
            font=self.LABEL_FONT,
            width=150,
            anchor="w"
        ).pack(side="left")
        
        self.delay_value_entry = ctk.CTkEntry(
            value_container,
            width=150,
            height=35,
            corner_radius=self.CORNER_RADIUS,
            border_width=2,
            placeholder_text="1.0",
            font=self.VALUE_FONT
        )
        self.delay_value_entry.pack(side="left")
        
        # DISPLAY SETTINGS SECTION
        display_frame = self.create_section_frame(self.main_container, "📊 Display Settings")
        display_content = ctk.CTkFrame(display_frame)
        display_content.pack(fill="x", padx=self.PADDING, pady=(0, self.PADDING))
        
        moves_container = ctk.CTkFrame(display_content)
        moves_container.pack(fill="x")
        
        ctk.CTkLabel(
            moves_container,
            text="Moves to Display:",
            font=self.LABEL_FONT,
            width=150,
            anchor="w"
        ).pack(side="left")
        
        self.moves_to_display_entry = ctk.CTkEntry(
            moves_container,
            width=150,
            height=35,
            corner_radius=self.CORNER_RADIUS,
            border_width=2,
            placeholder_text="3",
            font=self.VALUE_FONT
        )
        self.moves_to_display_entry.pack(side="left")
        
        # CONTROL BUTTONS SECTION
        control_frame = self.create_section_frame(self.main_container, "🎮 Controls")
        button_container = ctk.CTkFrame(control_frame)
        button_container.pack(pady=(0, self.PADDING))
        
        start_btn = ctk.CTkButton(
            button_container,
            text="▶ START BOT",
            command=self.start_bot,
            width=180,
            height=self.BUTTON_HEIGHT,
            corner_radius=self.CORNER_RADIUS,
            font=ctk.CTkFont(size=15, weight="bold")
        )
        start_btn.pack(side="left", padx=10)
        
        stop_btn = ctk.CTkButton(
            button_container,
            text="⏸ STOP BOT",
            command=self.stop_bot,
            width=180,
            height=self.BUTTON_HEIGHT,
            corner_radius=self.CORNER_RADIUS,
            font=ctk.CTkFont(size=15, weight="bold"),
            fg_color=self.DANGER_COLOR,
            hover_color="#a42920"
        )
        stop_btn.pack(side="left", padx=10)
        
        # STATUS BAR
        status_frame = ctk.CTkFrame(
            self.master,
            corner_radius=0,
            height=40
        )
        status_frame.pack(fill="x", side="bottom")
        status_frame.pack_propagate(False)
        
        self.status_label = ctk.CTkLabel(
            status_frame,
            text="✓ Ready",
            font=ctk.CTkFont(size=14),
            text_color="#90EE90"
        )
        self.status_label.pack(pady=10)

    def create_slider_with_entry(self, parent, label, attr_name, min_val, max_val, default, callback):
        """Helper to create slider with accompanying entry for keyboard input"""
        container = ctk.CTkFrame(parent)
        container.pack(fill="x", pady=(0, 15))
        
        # Label
        ctk.CTkLabel(
            container,
            text=label,
            font=self.LABEL_FONT,
            anchor="w"
        ).pack(fill="x")
        
        # Slider and entry container
        controls = ctk.CTkFrame(container)
        controls.pack(fill="x", pady=(5, 0))
        
        # Create StringVar for linking slider and entry
        var = tk.StringVar()
        
        # Slider
        slider = ctk.CTkSlider(
            controls,
            from_=min_val,
            to=max_val,
            number_of_steps=int(max_val - min_val) if (max_val - min_val) <= 100 else 100,
            command=lambda v: self.update_linked_value(var, v, callback),
            corner_radius=self.CORNER_RADIUS
        )
        slider.pack(side="left", fill="x", expand=True, padx=(0, 10))
        slider.set(default)
        
        # Entry for manual input
        entry = ctk.CTkEntry(
            controls,
            width=80,
            height=32,
            corner_radius=self.CORNER_RADIUS,
            textvariable=var,
            font=self.VALUE_FONT,
            border_width=2
        )
        entry.pack(side="left")
        
        # Bind entry to update slider when typing
        entry.bind('<Return>', lambda e: self.update_slider_from_entry(slider, var, min_val, max_val, callback))
        entry.bind('<FocusOut>', lambda e: self.update_slider_from_entry(slider, var, min_val, max_val, callback))
        
        # Store references
        setattr(self, f"{attr_name}_slider", slider)
        setattr(self, f"{attr_name}_var", var)
        setattr(self, f"{attr_name}_entry", entry)
        
        # Set initial value
        var.set(str(int(default)))

    def update_linked_value(self, var, value, callback):
        """Update entry when slider moves"""
        var.set(str(int(float(value))))
        if callback:
            callback(value)

    def update_slider_from_entry(self, slider, var, min_val, max_val, callback):
        """Update slider when entry value changes"""
        try:
            value = float(var.get())
            value = max(min_val, min(value, max_val))
            slider.set(value)
            var.set(str(int(value)))
            if callback:
                callback(value)
        except ValueError:
            var.set(str(int(slider.get())))

    def update_cpu_threads(self, val=None):
        if val is None:
            val = self.cpu_threads_slider.get()
        self.controller.update_settings()

    def update_ram_memory(self, val=None):
        if val is None:
            val = self.ram_memory_slider.get()
        self.controller.update_settings()

    def update_skill_level(self, val=None):
        if val is None:
            val = self.skill_level_slider.get()
        self.controller.update_settings()

    def update_think_time(self, val=None):
        if val is None:
            val = self.think_time_slider.get()
        self.controller.set_thinkTime(int(float(val)))

    def update_status_enum(self):
        """Update the status enum based on radio button selection"""
        status_value = self.status_var.get()
        self.controller.set_bot_status(BotStatus(status_value))

    def load_initial_settings(self):
        """Load and display initial settings from config"""
        settings = self.config.settings
        
        # Stockfish path
        path = settings.get("stockfish_path", "")
        self.stockfish_path_entry.delete(0, "end")
        if path:
            self.stockfish_path_entry.insert(0, path)
        
        # Sliders with entries
        cpu = settings.get("cpu_threads", 1)
        self.cpu_threads_slider.set(cpu)
        self.cpu_threads_var.set(str(int(cpu)))
        
        ram = settings.get("ram_memory", 1024)
        self.ram_memory_slider.set(ram)
        self.ram_memory_var.set(str(int(ram)))
        
        skill = settings.get("skill_level", 1)
        self.skill_level_slider.set(skill)
        self.skill_level_var.set(str(int(skill)))
        
        think = settings.get("think_time", 1000)
        if hasattr(self, 'think_time_slider'):
            self.think_time_slider.set(think)
            self.think_time_var.set(str(int(think)))
        
        # Checkbox
        self.on_top_var.set(settings.get("window_on_top", False))
        self.toggle_on_top()
        
        # Radio buttons
        self.delay_type_var.set(settings.get("delay_type", "fixed"))
        
        # Text entries
        delay_val = str(settings.get("delay_value", 1.0))
        self.delay_value_entry.delete(0, "end")
        self.delay_value_entry.insert(0, delay_val)
        
        moves = str(settings.get("moves_to_display", 3))
        self.moves_to_display_entry.delete(0, "end")
        self.moves_to_display_entry.insert(0, moves)

    def update_status(self, message: str):
        """Update status bar message"""
        # Add color coding based on message content
        if "error" in message.lower():
            color = "#ff6b6b"
            symbol = "✗"
        elif "success" in message.lower() or "started" in message.lower():
            color = "#90EE90"
            symbol = "✓"
        elif "stopped" in message.lower():
            color = "#ffa500"
            symbol = "⏸"
        else:
            color = "#ffffff"
            symbol = "ℹ"
        
        self.status_label.configure(text=f"{symbol} {message}", text_color=color)

    def browse_stockfish_path(self):
        file_path = filedialog.askopenfilename(
            title="Select Stockfish Executable",
            filetypes=[("Executable files", "*.exe"), ("All files", "*.*")]
        )
        if file_path:
            self.stockfish_path_entry.delete(0, "end")
            self.stockfish_path_entry.insert(0, file_path)
            self.controller.update_settings()

    def get_stockfish_path(self):
        return self.stockfish_path_entry.get()

    def get_cpu_threads(self):
        return int(float(self.cpu_threads_slider.get()))

    def get_ram_memory(self):
        return int(float(self.ram_memory_slider.get()))

    def get_skill_level(self):
        return int(float(self.skill_level_slider.get()))

    def get_delay_type(self):
        return self.delay_type_var.get()

    def get_delay_value(self):
        try:
            return float(self.delay_value_entry.get())
        except ValueError:
            return 1.0

    def get_moves_to_display(self):
        try:
            return int(self.moves_to_display_entry.get())
        except ValueError:
            return 3

    def toggle_on_top(self):
        self.master.wm_attributes("-topmost", self.on_top_var.get())
        self.controller.update_settings()

    def start_bot(self):
        self.controller.start()
        self.update_status("Bot Started")

    def stop_bot(self):
        self.controller.stop()
        self.update_status("Bot Stopped")