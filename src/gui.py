import tkinter as tk
from tkinter import filedialog, ttk


class GUI:
    """
    Creates and manages the Tkinter graphical user interface for the chess bot.
    """

    def __init__(self, master: tk.Tk, controller):
        self.master = master
        self.controller = controller
        master.title("Chess Bot Control")
        master.geometry("400x600")

        self.create_widgets()
        self.load_initial_settings()

    def create_widgets(self):
        # Frame for settings
        settings_frame = ttk.LabelFrame(self.master, text="Engine Settings")
        settings_frame.pack(padx=10, pady=10, fill="x")

        # Stockfish Path
        ttk.Label(settings_frame, text="Stockfish Path:").grid(
            row=0, column=0, padx=5, pady=5, sticky="w"
        )
        self.stockfish_path_entry = ttk.Entry(settings_frame, width=40)
        self.stockfish_path_entry.grid(row=0, column=1, padx=5, pady=5, sticky="ew")
        ttk.Button(
            settings_frame, text="Browse", command=self.browse_stockfish_path
        ).grid(row=0, column=2, padx=5, pady=5)

        # CPU Threads
        ttk.Label(settings_frame, text="CPU Threads:").grid(
            row=1, column=0, padx=5, pady=5, sticky="w"
        )
        self.cpu_threads_slider = ttk.Scale(
            settings_frame,
            from_=1,
            to=16,
            orient="horizontal",
            command=self.update_cpu_threads_label,
        )
        self.cpu_threads_slider.grid(row=1, column=1, padx=5, pady=5, sticky="ew")
        self.cpu_threads_label = ttk.Label(settings_frame, text="1")
        self.cpu_threads_label.grid(row=1, column=2, padx=5, pady=5)
        self.cpu_threads_slider.set(1)

        # RAM Memory
        ttk.Label(settings_frame, text="RAM Memory (MB):").grid(
            row=2, column=0, padx=5, pady=5, sticky="w"
        )
        self.ram_memory_slider = ttk.Scale(
            settings_frame,
            from_=64,
            to=4096,
            orient="horizontal",
            command=self.update_ram_memory_label,
        )
        self.ram_memory_slider.grid(row=2, column=1, padx=5, pady=5, sticky="ew")
        self.ram_memory_label = ttk.Label(settings_frame, text="1024")
        self.ram_memory_label.grid(row=2, column=2, padx=5, pady=5)
        self.ram_memory_slider.set(1024)

        # Skill Level
        ttk.Label(settings_frame, text="Skill Level:").grid(
            row=3, column=0, padx=5, pady=5, sticky="w"
        )
        self.skill_level_slider = ttk.Scale(
            settings_frame,
            from_=0,
            to=20,
            orient="horizontal",
            command=self.update_skill_level_label,
        )
        self.skill_level_slider.grid(row=3, column=1, padx=5, pady=5, sticky="ew")
        self.skill_level_label = ttk.Label(settings_frame, text="1")
        self.skill_level_label.grid(row=3, column=2, padx=5, pady=5)
        self.skill_level_slider.set(1)

        # Window Stay on Top
        self.on_top_var = tk.BooleanVar()
        self.on_top_checkbox = ttk.Checkbutton(
            settings_frame,
            text="Window Stay on Top",
            variable=self.on_top_var,
            command=self.toggle_on_top,
        )
        self.on_top_checkbox.grid(
            row=4, column=0, columnspan=3, padx=5, pady=5, sticky="w"
        )

        # Delay Settings
        delay_frame = ttk.LabelFrame(self.master, text="Delay Settings")
        delay_frame.pack(padx=10, pady=10, fill="x")

        ttk.Label(delay_frame, text="Delay Type:").grid(
            row=0, column=0, padx=5, pady=5, sticky="w"
        )
        self.delay_type_var = tk.StringVar(value="fixed")
        ttk.Radiobutton(
            delay_frame, text="Fixed", variable=self.delay_type_var, value="fixed"
        ).grid(row=0, column=1, padx=5, pady=5, sticky="w")
        ttk.Radiobutton(
            delay_frame, text="Random", variable=self.delay_type_var, value="random"
        ).grid(row=0, column=2, padx=5, pady=5, sticky="w")

        ttk.Label(delay_frame, text="Delay Value (s):").grid(
            row=1, column=0, padx=5, pady=5, sticky="w"
        )
        self.delay_value_entry = ttk.Entry(delay_frame, width=10)
        self.delay_value_entry.grid(row=1, column=1, padx=5, pady=5, sticky="w")
        self.delay_value_entry.insert(0, "1.0")

        # Moves to Display
        ttk.Label(self.master, text="Moves to Display:").pack(
            padx=10, pady=5, anchor="w"
        )
        self.moves_to_display_entry = ttk.Entry(self.master, width=10)
        self.moves_to_display_entry.pack(padx=10, pady=5, anchor="w")
        self.moves_to_display_entry.insert(0, "3")

        # Control Buttons
        button_frame = ttk.Frame(self.master)
        button_frame.pack(padx=10, pady=10)

        ttk.Button(button_frame, text="Start Bot", command=self.start_bot).pack(
            side="left", padx=5
        )
        ttk.Button(button_frame, text="Stop Bot", command=self.stop_bot).pack(
            side="left", padx=5
        )

        # Status Bar
        self.status_label = ttk.Label(
            self.master, text="Ready", relief="sunken", anchor="w"
        )
        self.status_label.pack(side="bottom", fill="x", padx=0, pady=0)

    def load_initial_settings(self):
        if self.controller and self.controller.config:
            settings = self.controller.config.settings
            self.stockfish_path_entry.delete(0, tk.END)
            self.stockfish_path_entry.insert(0, settings.get("stockfish_path", ""))
            self.cpu_threads_slider.set(settings.get("cpu_threads", 1))
            self.ram_memory_slider.set(settings.get("ram_memory", 1024))
            self.skill_level_slider.set(settings.get("skill_level", 1))
            self.on_top_var.set(settings.get("window_on_top", False))
            self.delay_type_var.set(settings.get("delay_type", "fixed"))
            self.delay_value_entry.delete(0, tk.END)
            self.delay_value_entry.insert(0, str(settings.get("delay_value", 1.0)))
            self.moves_to_display_entry.delete(0, tk.END)
            self.moves_to_display_entry.insert(
                0, str(settings.get("moves_to_display", 3))
            )
            self.toggle_on_top()  # Apply initial setting

    def update_cpu_threads_label(self, val):
        self.cpu_threads_label.config(text=str(int(float(val))))

    def update_ram_memory_label(self, val):
        self.ram_memory_label.config(text=str(int(float(val))))

    def update_skill_level_label(self, val):
        self.skill_level_label.config(text=str(int(float(val))))

    def update_status(self, message: str):
        self.status_label.config(text=message)

    def browse_stockfish_path(self):
        file_path = filedialog.askopenfilename(title="Select Stockfish Executable")
        if file_path:
            self.stockfish_path_entry.delete(0, tk.END)
            self.stockfish_path_entry.insert(0, file_path)
            if self.controller:
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
        if self.controller:
            self.controller.update_settings()

    def start_bot(self):
        if self.controller:
            self.controller.start()

    def stop_bot(self):
        if self.controller:
            self.controller.stop()
