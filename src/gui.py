import customtkinter as ctk
from tkinter import filedialog

from src.utils import BotStatus

class GUI:
    """
    Creates and manages the CustomTkinter graphical user interface for the chess bot.
    """

    def __init__(self, master: ctk.CTk, configManager, controller):
        self.master = master
        self.config = configManager
        self.controller = controller
        
        # Set theme and color
        ctk.set_appearance_mode("dark")
        ctk.set_default_color_theme("blue")
        
        master.title("Chess Bot Control")
        master.geometry("1100x800")
        
        # Initialize status
        self.status = BotStatus.IDLE
        
        self.create_widgets()
        self.load_initial_settings()

    def create_widgets(self):
        # Main container with padding
        main_container = ctk.CTkFrame(self.master)
        main_container.pack(fill="both", expand=True, padx=0, pady=0)
        
        # Frame for settings
        settings_frame = ctk.CTkFrame(main_container, corner_radius=15)
        settings_frame.pack(fill="x", pady=(0, 15))
        
        settings_label = ctk.CTkLabel(
            settings_frame, 
            text="Engine Settings", 
            font=ctk.CTkFont(size=24, weight="bold")
        )
        settings_label.pack(pady=(15, 10))

        # Settings grid container
        settings_grid = ctk.CTkFrame(settings_frame)
        settings_grid.pack(fill="x", padx=0, pady=(0, 15))
        
        # Configure grid weights
        settings_grid.grid_columnconfigure(1, weight=1)

        # Stockfish Path
        ctk.CTkLabel(settings_grid, text="Stockfish Path:", font=ctk.CTkFont(size=20)).grid(
            row=0, column=0, padx=10, pady=10, sticky="w"
        )
        self.stockfish_path_entry = ctk.CTkEntry(
            settings_grid, 
            width=400,
            corner_radius=8,
            border_width=1
        )
        self.stockfish_path_entry.grid(row=0, column=1, padx=10, pady=10, sticky="ew")
        
        browse_btn = ctk.CTkButton(
            settings_grid, 
            text="Browse",
            command=self.browse_stockfish_path,
            width=80,
            corner_radius=8
        )
        browse_btn.grid(row=0, column=2, padx=10, pady=10)

        # CPU Threads
        ctk.CTkLabel(settings_grid, text="CPU Threads:", font=ctk.CTkFont(size=20)).grid(
            row=1, column=0, padx=10, pady=10, sticky="w"
        )
        
        cpu_frame = ctk.CTkFrame(settings_grid)
        cpu_frame.grid(row=1, column=1, padx=10, pady=10, sticky="ew")
        cpu_frame.grid_columnconfigure(0, weight=1)
        
        self.cpu_threads_slider = ctk.CTkSlider(
            cpu_frame,
            from_=1,
            to=16,
            number_of_steps=15,
            command=self.update_cpu_threads_label,
            button_corner_radius=8
        )
        self.cpu_threads_slider.grid(row=0, column=0, sticky="ew", padx=(0, 10))
        self.cpu_threads_slider.set(1)
        
        self.cpu_threads_label = ctk.CTkLabel(settings_grid, text="1", font=ctk.CTkFont(size=20))
        self.cpu_threads_label.grid(row=1, column=2, padx=10, pady=10)

        # RAM Memory
        ctk.CTkLabel(settings_grid, text="RAM Memory (MB):", font=ctk.CTkFont(size=20)).grid(
            row=2, column=0, padx=10, pady=10, sticky="w"
        )
        
        ram_frame = ctk.CTkFrame(settings_grid)
        ram_frame.grid(row=2, column=1, padx=10, pady=10, sticky="ew")
        ram_frame.grid_columnconfigure(0, weight=1)
        
        self.ram_memory_slider = ctk.CTkSlider(
            ram_frame,
            from_=64,
            to=4096,
            number_of_steps=50,
            command=self.update_ram_memory_label,
            button_corner_radius=8
        )
        self.ram_memory_slider.grid(row=0, column=0, sticky="ew", padx=(0, 10))
        self.ram_memory_slider.set(1024)
        
        self.ram_memory_label = ctk.CTkLabel(settings_grid, text="1024", font=ctk.CTkFont(size=20))
        self.ram_memory_label.grid(row=2, column=2, padx=10, pady=10)

        # Skill Level
        ctk.CTkLabel(settings_grid, text="Skill Level:", font=ctk.CTkFont(size=20)).grid(
            row=3, column=0, padx=10, pady=10, sticky="w"
        )
        
        skill_frame = ctk.CTkFrame(settings_grid)
        skill_frame.grid(row=3, column=1, padx=10, pady=10, sticky="ew")
        skill_frame.grid_columnconfigure(0, weight=1)
        
        self.skill_level_slider = ctk.CTkSlider(
            skill_frame,
            from_=0,
            to=20,
            number_of_steps=20,
            command=self.update_skill_level_label,
            button_corner_radius=8
        )
        self.skill_level_slider.grid(row=0, column=0, sticky="ew", padx=(0, 10))
        self.skill_level_slider.set(1)
        
        self.skill_level_label = ctk.CTkLabel(settings_grid, text="1", font=ctk.CTkFont(size=20))
        self.skill_level_label.grid(row=3, column=2, padx=10, pady=10)


        # Think time
        ctk.CTkLabel(settings_grid, text="Think Time (ms):", font=ctk.CTkFont(size=20)).grid(
            row=4, column=0, padx=10, pady=10, sticky="w"
        )
        
        ram_frame = ctk.CTkFrame(settings_grid)
        ram_frame.grid(row=4, column=1, padx=10, pady=10, sticky="ew")
        ram_frame.grid_columnconfigure(0, weight=1)
        
        self.think_time_slider = ctk.CTkSlider(
            ram_frame,
            from_=10,
            to=10000,
            number_of_steps=99990,
            command=self.update_thinkt_time,
            button_corner_radius=8
        )

        self.think_time_slider.grid(row=0, column=0, sticky="ew", padx=(0, 10))
        self.think_time_slider.set(1000)
        
        self.think_time_label = ctk.CTkLabel(settings_grid, text="1000", font=ctk.CTkFont(size=20))
        self.think_time_label.grid(row=4, column=2, padx=10, pady=10)


        # Window Stay on Top
        self.on_top_var = ctk.Variable(value=False)
        self.on_top_checkbox = ctk.CTkCheckBox(
            settings_grid,
            text="Window Stay on Top",
            variable=self.on_top_var,
            command=self.toggle_on_top,
            corner_radius=6
        )
        self.on_top_checkbox.grid(row=5, column=0, columnspan=3, padx=10, pady=10, sticky="w")

        # Bot Status Frame
        status_frame = ctk.CTkFrame(main_container, corner_radius=15)
        status_frame.pack(fill="x", pady=(0, 15))
        
        status_label = ctk.CTkLabel(
            status_frame, 
            text="Bot Status", 
            font=ctk.CTkFont(size=24, weight="bold")
        )
        status_label.pack(pady=(15, 10))
        
        # Status radio buttons
        status_radio_frame = ctk.CTkFrame(status_frame)
        status_radio_frame.pack(pady=(0, 15))
        
        self.status_var = ctk.Variable(value=BotStatus.IDLE.value)
        
        idle_radio = ctk.CTkRadioButton(
            status_radio_frame,
            text="Idle",
            variable=self.status_var,
            value=BotStatus.IDLE.value,
            command=self.update_status_enum
        )
        idle_radio.pack(side="left", padx=20)
        
        auto_radio = ctk.CTkRadioButton(
            status_radio_frame,
            text="Auto Move",
            variable=self.status_var,
            value=BotStatus.AUTO_MOVE.value,
            command=self.update_status_enum
        )
        auto_radio.pack(side="left", padx=20)
        
        highlight_radio = ctk.CTkRadioButton(
            status_radio_frame,
            text="Highlight",
            variable=self.status_var,
            value=BotStatus.HIGHLIGHT.value,
            command=self.update_status_enum
        )
        highlight_radio.pack(side="left", padx=20)

        # Delay Settings
        delay_frame = ctk.CTkFrame(main_container, corner_radius=15)
        delay_frame.pack(fill="x", pady=(0, 15))
        
        delay_label = ctk.CTkLabel(
            delay_frame, 
            text="Delay Settings", 
            font=ctk.CTkFont(size=24, weight="bold")
        )
        delay_label.pack(pady=(15, 10))
        
        delay_grid = ctk.CTkFrame(delay_frame)
        delay_grid.pack(fill="x", padx=20, pady=(0, 15))
        delay_grid.grid_columnconfigure(1, weight=1)

        ctk.CTkLabel(delay_grid, text="Delay Type:", font=ctk.CTkFont(size=20)).grid(
            row=0, column=0, padx=10, pady=10, sticky="w"
        )
        
        delay_radio_frame = ctk.CTkFrame(delay_grid)
        delay_radio_frame.grid(row=0, column=1, padx=10, pady=10, sticky="w")
        
        self.delay_type_var = ctk.Variable(value="fixed")
        
        fixed_radio = ctk.CTkRadioButton(
            delay_radio_frame, 
            text="Fixed", 
            variable=self.delay_type_var, 
            value="fixed"
        )
        fixed_radio.pack(side="left", padx=(0, 20))
        
        random_radio = ctk.CTkRadioButton(
            delay_radio_frame, 
            text="Random", 
            variable=self.delay_type_var, 
            value="random"
        )
        random_radio.pack(side="left")

        ctk.CTkLabel(delay_grid, text="Delay Value (s):", font=ctk.CTkFont(size=20)).grid(
            row=1, column=0, padx=10, pady=10, sticky="w"
        )
        self.delay_value_entry = ctk.CTkEntry(
            delay_grid, 
            width=120,
            corner_radius=8,
            border_width=1
        )
        self.delay_value_entry.grid(row=1, column=1, padx=10, pady=10, sticky="w")
        self.delay_value_entry.insert(0, "1.0")

        # Additional Settings Frame
        additional_frame = ctk.CTkFrame(main_container, corner_radius=15)
        additional_frame.pack(fill="x", pady=(0, 15))
        
        additional_label = ctk.CTkLabel(
            additional_frame, 
            text="Additional Settings", 
            font=ctk.CTkFont(size=24, weight="bold")
        )
        additional_label.pack(pady=(15, 10))
        
        moves_frame = ctk.CTkFrame(additional_frame)
        moves_frame.pack(padx=20, pady=(0, 15), fill="x")
        
        ctk.CTkLabel(moves_frame, text="Moves to Display:", font=ctk.CTkFont(size=20)).pack(
            side="left", padx=(0, 10)
        )
        self.moves_to_display_entry = ctk.CTkEntry(
            moves_frame, 
            width=80,
            corner_radius=8,
            border_width=1
        )
        self.moves_to_display_entry.pack(side="left")
        self.moves_to_display_entry.insert(0, "3")

        # Control Buttons
        button_frame = ctk.CTkFrame(main_container, corner_radius=15)
        button_frame.pack(fill="x", pady=(0, 15))
        
        button_container = ctk.CTkFrame(button_frame)
        button_container.pack(pady=20)

        start_btn = ctk.CTkButton(
            button_container, 
            text="Start Bot", 
            command=self.start_bot,
            width=120,
            height=40,
            corner_radius=10,
            font=ctk.CTkFont(size=14, weight="bold")
        )
        start_btn.pack(side="left", padx=10)
        
        stop_btn = ctk.CTkButton(
            button_container, 
            text="Stop Bot", 
            command=self.stop_bot,
            width=120,
            height=40,
            corner_radius=10,
            font=ctk.CTkFont(size=14, weight="bold"),
            fg_color="#dc3545",
            hover_color="#c82333"
        )
        stop_btn.pack(side="left", padx=10)

        # Status Bar
        self.status_label = ctk.CTkLabel(
            main_container, 
            text="Ready",
            font=ctk.CTkFont(size=20),
            corner_radius=8,
            height=30
        )
        self.status_label.pack(fill="x", pady=(0, 0))

    def update_status_enum(self):
        """Update the status enum based on radio button selection"""
        status_value = self.status_var.get()
        self.controller.set_bot_status(BotStatus(status_value))

    def load_initial_settings(self):
        settings = self.config.settings
        self.stockfish_path_entry.delete(0, "end")
        self.stockfish_path_entry.insert(0, settings.get("stockfish_path", ""))
        self.cpu_threads_slider.set(settings.get("cpu_threads", 1))
        self.ram_memory_slider.set(settings.get("ram_memory", 1024))
        self.skill_level_slider.set(settings.get("skill_level", 1))
        self.on_top_var.set(settings.get("window_on_top", False))
        self.delay_type_var.set(settings.get("delay_type", "fixed"))
        self.delay_value_entry.delete(0, "end")
        self.delay_value_entry.insert(0, str(settings.get("delay_value", 1.0)))
        self.moves_to_display_entry.delete(0, "end")
        self.moves_to_display_entry.insert(
            0, str(settings.get("moves_to_display", 3))
        )
        self.toggle_on_top()  # Apply initial setting

    def update_cpu_threads_label(self, val):
        self.cpu_threads_label.configure(text=str(int(float(val))))
        self.controller.update_settings()

    def update_ram_memory_label(self, val):
        self.ram_memory_label.configure(text=str(int(float(val))))
        self.controller.update_settings()

    def update_skill_level_label(self, val):
        self.skill_level_label.configure(text=str(int(float(val))))
        self.controller.update_settings()
    
    def update_thinkt_time(self, val):
        self.think_time_label.configure(text=str(int(float(val))))
        self.controller.set_thinkTime(int(val))



    def update_status(self, message: str):
        self.status_label.configure(text=message)

    def browse_stockfish_path(self):
        file_path = filedialog.askopenfilename(title="Select Stockfish Executable")
        if file_path:
            self.stockfish_path_entry.delete(0, "end")
            self.stockfish_path_entry.insert(0, file_path)
            self.controller.update_settings()

    def get_stockfish_path(self):
        return self.stockfish_path_entry.get()

    def get_cpu_threads(self):
        return int(self.cpu_threads_slider.get())

    def get_ram_memory(self):
        return int(self.ram_memory_slider.get())

    def get_skill_level(self):
        return int(self.skill_level_slider.get())

    def get_delay_type(self):
        return self.delay_type_var.get()

    def get_delay_value(self):
        try:
            return float(self.delay_value_entry.get())
        except ValueError:
            return 1.0  # Default value

    def get_moves_to_display(self):
        try:
            return int(self.moves_to_display_entry.get())
        except ValueError:
            return 3  # Default value

    def toggle_on_top(self):
        self.master.wm_attributes("-topmost", self.on_top_var.get())
        self.controller.update_settings()

    def start_bot(self):
        self.controller.start()

    def stop_bot(self):
        self.controller.stop()


