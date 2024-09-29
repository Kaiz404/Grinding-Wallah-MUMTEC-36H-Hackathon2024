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