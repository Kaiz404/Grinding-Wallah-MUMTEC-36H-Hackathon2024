export const specSheet = `
Spec SheetDevice Name: Smart Temperature Controller
Description: A device designed to regulate the temperature of an environment by controlling
heating and cooling systems based on user-defined settings.
Specifications
Inputs:
● Current Temperature Sensor: Measures ambient temperature (Range: -40°C to
125°C).
● Target Temperature: User-defined setting (Range: 0°C to 100°C).
● Mode Selector: User can switch between Heating and Cooling modes.
Outputs:
● Heating System Control: Activates or deactivates the heating system.
● Cooling System Control: Activates or deactivates the cooling system.
● Status Indicators: LEDs or display indicators for system status:
○ Heating: Indicates heating system is active.
○ Cooling: Indicates cooling system is active.
○ Idle: Indicates no active heating or cooling.
Functional Requirements:
1. Temperature Regulation:
○ Heating Mode:
■ Activate heating when Current Temperature is at least 0.5°C below
Target Temperature.
■ Deactivate heating when Current Temperature reaches or exceeds
Target Temperature.
○ Cooling Mode:
■ Activate cooling when Current Temperature is at least 0.5°C above
Target Temperature.
■ Deactivate cooling when Current Temperature reaches or drops
below Target Temperature.
2. Hysteresis Threshold:
○ A default hysteresis of 0.5°C to prevent rapid on/off cycling.
3. Safety Features:
○ Overheat Protection:
■ If Current Temperature exceeds 120°C, shut down systems and
trigger an alarm.
○ Sensor Failure Detection:
■ Detect and handle out-of-range or erratic sensor readings by entering
a safe mode and notifying the user.
Non-Functional Requirements:
● Response Time: System must respond to input changes within 1 second.
● Power Efficiency: Minimize power consumption in Idle mode.
● User Interface: Provide a simple interface for setting the Target Temperature and
Mode.
● Communication Interface: Optional Wi-Fi module for remote monitoring and control.
`;

export const unoptimizedFileContent = `
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
        `;

export const testCases = `
import unittest
from src.unoptimized_firmware import TemperatureController

class TestTemperatureController(unittest.TestCase):

    def setUp(self):
        """Initialize a TemperatureController instance before each test."""
        self.controller = TemperatureController()

    def test_initial_settings(self):
        """Test the initial settings of the TemperatureController."""
        self.assertEqual(self.controller.current_temperature, 25.0)
        self.assertEqual(self.controller.target_temperature, 22.0)
        self.assertEqual(self.controller.mode, 'Heating')
        self.assertFalse(self.controller.heating_on)
        self.assertFalse(self.controller.cooling_on)
        self.assertFalse(self.controller.overheat_alarm)
        self.assertFalse(self.controller.sensor_failure)

    def test_set_target_temperature_valid(self):
        """Test setting a valid target temperature within the range."""
        self.controller.set_target_temperature(30.0)
        self.assertEqual(self.controller.target_temperature, 30.0)

    def test_set_target_temperature_invalid(self):
        """Test setting an invalid target temperature outside the range."""
        self.controller.set_target_temperature(150.0)
        self.assertNotEqual(self.controller.target_temperature, 150.0)

    def test_set_mode_valid(self):
        """Test setting a valid operating mode."""
        self.controller.set_mode('Cooling')
        self.assertEqual(self.controller.mode, 'Cooling')

    def test_set_mode_invalid(self):
        """Test setting an invalid operating mode."""
        self.controller.set_mode('Defrost')
        self.assertNotEqual(self.controller.mode, 'Defrost')

    def test_sensor_failure_detection(self):
        """Test the detection of a sensor failure with an out-of-range temperature."""
        self.controller.simulate_temperature_change(-50.0)
        self.controller.check_sensor_failure()
        self.assertTrue(self.controller.sensor_failure)

    def test_overheat_protection_activation(self):
        """Test the activation of overheat protection logic."""
        self.controller.simulate_temperature_change(125.0)
        self.controller.check_overheat_protection()
        self.assertTrue(self.controller.overheat_alarm)
        self.assertFalse(self.controller.heating_on)
        self.assertFalse(self.controller.cooling_on)

    def test_overheat_protection_no_activation(self):
        """Test that overheat protection does not activate under normal temperatures."""
        self.controller.simulate_temperature_change(70.0)
        self.controller.check_overheat_protection()
        self.assertFalse(self.controller.overheat_alarm)

    def test_heating_mode_activation(self):
        """Test the activation of the heating mode."""
        self.controller.set_mode('Heating')
        self.controller.simulate_temperature_change(18.0)
        self.controller.control_temperature()
        self.assertTrue(self.controller.heating_on)
        self.assertFalse(self.controller.cooling_on)

    def test_cooling_mode_activation(self):
        """Test the activation of the cooling mode."""
        self.controller.set_mode('Cooling')
        self.controller.simulate_temperature_change(28.0)
        self.controller.control_temperature()
        self.assertTrue(self.controller.cooling_on)
        self.assertFalse(self.controller.heating_on)

    def test_idle_status(self):
        """Test that the system enters idle state as expected."""
        self.controller.set_mode('Heating')
        self.controller.simulate_temperature_change(22.0)
        self.controller.control_temperature()
        self.assertFalse(self.controller.heating_on)
        self.assertFalse(self.controller.cooling_on)

    def test_update_status_indicators_heating(self):
        """Test status indicators during heating."""
        self.controller.set_mode('Heating')
        self.controller.simulate_temperature_change(18.0)
        self.controller.control_temperature()
        self.controller.update_status_indicators()
        self.assertIn("[STATUS] Heating system is ON.", self.controller.status_log)

    def test_update_status_indicators_cooling(self):
        """Test status indicators during cooling."""
        self.controller.set_mode('Cooling')
        self.controller.simulate_temperature_change(28.0)
        self.controller.control_temperature()
        self.controller.update_status_indicators()
        self.assertIn("[STATUS] Cooling system is ON.", self.controller.status_log)

    def test_update_duration(self):
        """Test the update cycle duration to ensure it is less than 1 second."""
        self.controller.update()
        self.assertLessEqual(self.controller.update(), 1.0)

if __name__ == '__main__':
    unittest.main()
`