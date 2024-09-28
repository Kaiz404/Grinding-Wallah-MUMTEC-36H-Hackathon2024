import time
import random

class TemperatureController:
    def __init__(self):
        # Initial settings
        self.current_temperature = 25.0  # Default current temperature
        self.target_temperature = 22.0   # Default target temperature
        self.mode = 'Heating'            # Default mode ('Heating' or 'Cooling')
        self.hysteresis_threshold = 0.5  # Hysteresis to prevent rapid cycling
        
        # System states
        self.heating_on = False
        self.cooling_on = False
        self.overheat_alarm = False
        self.sensor_failure = False

        # Unoptimized data structures
        self.temperature_history = []  # Stores all temperature readings
        self.status_log = []           # Stores all status messages

    def read_temperature_sensor(self):
        """
        Simulate reading the current temperature from a sensor.
        In real hardware, this would interface with the temperature sensor.
        """
        # Simulate sensor noise with random fluctuation
        fluctuation = random.uniform(-0.5, 0.5)
        self.current_temperature += fluctuation

        # Inefficiently store every temperature reading
        self.temperature_history.append(self.current_temperature)

    def update_status_indicators(self):
        """
        Update status indicators based on the current system state.
        """
        status_message = ""
        if self.overheat_alarm:
            status_message = "[ALARM] Overheat detected! System shutdown."
        elif self.sensor_failure:
            status_message = "[ERROR] Sensor failure detected! Entering safe mode."
        elif self.heating_on:
            status_message = "[STATUS] Heating system is ON."
        elif self.cooling_on:
            status_message = "[STATUS] Cooling system is ON."
        else:
            status_message = "[STATUS] System is Idle."

        # Inefficiently store every status message
        self.status_log.append(status_message)
        print(status_message)

    def check_overheat_protection(self):
        """
        Implement overheat protection logic.
        """
        # Inefficient repetitive checks and unnecessary computations
        if self.current_temperature >= 120.0:
            for _ in range(1000):  # Unnecessary loop
                self.heating_on = False
                self.cooling_on = False
                self.overheat_alarm = True
        else:
            for _ in range(1000):  # Unnecessary loop
                pass

    def check_sensor_failure(self):
        """
        Detect sensor failures or out-of-range readings.
        """
        # Inefficient way to check range by creating a list
        valid_range = [temp for temp in range(-40, 126)]  # -40 to 125
        if int(self.current_temperature) not in valid_range:
            self.sensor_failure = True
            self.heating_on = False
            self.cooling_on = False

    def control_temperature(self):
        """
        Main control logic for regulating temperature.
        """
        if self.sensor_failure or self.overheat_alarm:
            return  # Do nothing if there's a sensor failure or overheat

        # Repetitive and inefficient conditional statements
        if self.mode == 'Heating':
            if self.current_temperature < (self.target_temperature - self.hysteresis_threshold):
                if not self.heating_on:
                    self.heating_on = True
                    self.cooling_on = False
            else:
                if self.current_temperature >= self.target_temperature:
                    if self.heating_on:
                        self.heating_on = False
        elif self.mode == 'Cooling':
            if self.current_temperature > (self.target_temperature + self.hysteresis_threshold):
                if not self.cooling_on:
                    self.cooling_on = True
                    self.heating_on = False
            else:
                if self.current_temperature <= self.target_temperature:
                    if self.cooling_on:
                        self.cooling_on = False

        # Unnecessary heavy computation
        for i in range(10000):
            _ = i ** 2  # Does nothing useful

    def update(self):
        """
        Update method to be called periodically to refresh the system state.
        """
        start_time = time.time()
        self.read_temperature_sensor()
        self.check_sensor_failure()
        self.check_overheat_protection()
        self.control_temperature()
        self.update_status_indicators()
        end_time = time.time()

        # Unnecessary long delay
        time.sleep(2)  # Artificial delay exceeding response time requirements

        # Log update duration (inefficiently)
        duration = end_time - start_time
        print(f"[DEBUG] Update duration: {duration:.4f} seconds")

    def set_target_temperature(self, temperature):
        """
        Allows the user to set the target temperature.
        """
        if 0.0 <= temperature <= 100.0:
            self.target_temperature = temperature
            print(f"[INPUT] Target temperature set to {temperature} C.")
        else:
            print("[ERROR] Target temperature out of range (0 C - 100 C).")

    def set_mode(self, mode):
        """
        Allows the user to set the operating mode.
        """
        if mode in ['Heating', 'Cooling']:
            self.mode = mode
            print(f"[INPUT] Mode set to {mode}.")
        else:
            print("[ERROR] Invalid mode selected. Choose 'Heating' or 'Cooling'.")

    def simulate_temperature_change(self, temperature):
        """
        Simulates external changes in temperature for testing.
        """
        self.current_temperature = temperature
        # Inefficiently store temperature
        self.temperature_history.append(self.current_temperature)
        print(f"[SIMULATION] Current temperature is {temperature} C.")