import json

def read_the_file(file_name):
    with open(file_name, "r", encoding="utf-8") as file:
        return json.load(file)
