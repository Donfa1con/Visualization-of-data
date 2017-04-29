from app.modules.helpers import file


def get_subjects_info(subjects_json_path):
    return file.read_json_file(subjects_json_path)
