import time
import unoptimized_firmware as uf
import optimized_firmware as of

def measure_update_duration(controller_class):
    controller = controller_class()
    durations = []

    for _ in range(10):  # Measure over 10 iterations
        start_time = time.time()
        controller.update()
        end_time = time.time()

        durations.append(end_time - start_time)

    average_duration = sum(durations) / len(durations)
    return average_duration

# Measure time for unoptimized firmware
unoptimized_duration = measure_update_duration(uf.TemperatureController)

# Measure time for optimized firmware
optimized_duration = measure_update_duration(of.TemperatureController)

# Calculate time difference
time_difference = unoptimized_duration - optimized_duration

print(f"Unoptimized Average Duration: {unoptimized_duration:.4f} seconds")
print(f"Optimized Average Duration: {optimized_duration:.4f} seconds")
print(f"Time Difference: {time_difference:.4f} seconds")