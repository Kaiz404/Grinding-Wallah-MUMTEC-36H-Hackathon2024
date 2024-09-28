import asyncio
from openai import OpenAI
from markdown import markdown
from pypdf import PdfReader
from pdfquery import PDFQuery


client = OpenAI()

def generate_html(string):
    with open("output.html", "w") as file:
        file.write(markdown(string))


def get_spec_sheet(file_name):

    pdf = PDFQuery(file_name)
    pdf.load()
    text_elements = pdf.pq('LTTextLineHorizontal')

    # Extract the text from the elements
    text = [t.text for t in text_elements]
    output = ""

    for t in text:
        output += t
        output += "\n"

    return output


def generate_test_cases(file_name):
    print("\033[32mGenerating test cases...\033[0m")
    mock_code = open(file_name, "rb").read()
    prompt_for_test_generation = f"""
        Given the code below ({file_name}):
        ```
        {mock_code}\n
        ``` 
        As well as the specification sheet given:
        ```
        {get_spec_sheet("src/SpecSheet.pdf")}
        ```
        
        Generate unit test cases, do not add additional explanation before generating the code, 
        all documentation should be done in the code itself.
        Ample documentation should be provided for each test case.
        simply return the test cases code in perfect formatting. Do not include "python```" in front of the code.\n
    """

    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": prompt_for_test_generation},
    ]

    completion = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    )

    return completion.choices[0].message.content


def generate_optimized_code(unoptimized_code_path, test_cases_path, spec_sheet_path):

    print("\033[32mOptimizing code...\033[0m")

    unoptimized_code = open(unoptimized_code_path, "rb").read()
    test_cases = open(test_cases_path, "rb").read()
    spec_sheet = get_spec_sheet(spec_sheet_path)

    prompt_for_code_optimization = f"""
        Given the code below: \n
        ```
        {unoptimized_code}\n
        ```
        And the test cases below:\n
        ```
        {test_cases}\n
        ```
        As well as the specification sheet given:\n
        ```
        {spec_sheet}\n
        ```

        Generate an optimized version of the code that adheres to the specification sheet 
        and passes the test cases provided. 
        Make sure to not include any explanation before generating the code.
        All documentation should be done in the code itself.
        Do not include "python```" in front of the code.\n
    """

    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": prompt_for_code_optimization},
    ]

    completion = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    )

    return completion.choices[0].message.content

def generate_optimization_metrics():
    print("\033[32mGenerating optimization metrics...\033[0m")

    unoptimized_firmware = open("src/unoptimized_firmware.py", "rb").read()
    optimized_firmware = open("src/optimized_firmware.py", "rb").read()

    prompt_for_optimization_metrics = f"""
        Given the code below (unoptimized_firmware.py): \n
        ```
        {unoptimized_firmware}\n
        ``` 
        And the optimized code below (optimized_firmware.py): \n
        ```
        {optimized_firmware}\n
        ```

        Generate optimization metrics for the code provided to compute how much time different they take. 
        You can import the necessary libraries, like "unoptimized_firmware.py" and "optimized_firmware.py".
        Do not provide additional explanation before generating the code.
        Make it so that by the end of the code execution, the time difference between the two codes is computed, shown, and elavuated.
        Only generate one code block that computes the time difference between the two codes, you can import any necessary libraries.
        Make sure TO NOT include "python```" in front of the code.\n
    """

    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": prompt_for_optimization_metrics},
    ]

    completion = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    )

    return completion.choices[0].message.content


print("\033[43mWelcome to the Code Optimization Assistant!\033[0m")
print("\033[43mThis assistant will help you optimize your code.\033[0m")
print("\033[32m- If you already have test cases generated, enter 'y'/'Y' to proceed with code optimization.")
print("- If you want to generate test cases, enter 'r'/'R' to generate test cases.\033[0m")
response = input("> ")

while response.lower() == "r":

    generated_test_cases = generate_test_cases("src/unoptimized_firmware.py")
    open("src/generated_test_cases.py", "w").write(generated_test_cases)

    for line in open("src/generated_test_cases.py").readlines():
        print(line)

    print("\033[42mTest cases generated successfully!\033[0m")

    print("Please review the generated test cases in src/generated_test_cases.py")
    print("\033[32m- If approved, enter 'y'/'Y' to proceed with code optimization.")
    print("- If want to regenerate test cases, enter 'r'/'R' to regenerate test cases.")
    print("- If you want to exit, enter any other key.\033[0m")

    response = input("> ")

if response.lower() == "y":

    optimized_code = generate_optimized_code("src/unoptimized_firmware.py", "src/generated_test_cases.py", "src/SpecSheet.pdf")
    open("src/optimized_firmware.py", "w").write(optimized_code)

    print("\033[42mCode optimized successfully!")
    print("Please review the optimized code in src/optimized_firmware.py\033[0m")


    # Run optimisation metric to test the optimized code
    optimization_metrics = generate_optimization_metrics()
    open("src/optimization_metrics.py", "w").write(optimization_metrics)

    print("Optimization metrics generated successfully!")
    print("Please run the optimization_metrics.py file to view the results.")

else:
    print("Exiting...")