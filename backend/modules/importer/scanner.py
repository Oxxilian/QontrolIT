import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

CONFIG_FILE = BASE_DIR / "data" / "folder_mapping.json"


def load_mapping():
    with open(CONFIG_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


def scan_project_folder(project_path: str):

    mapping = load_mapping()

    path = Path(project_path)

    if not path.exists():
        raise FileNotFoundError("Projectmap bestaat niet.")

    if not path.is_dir():
        raise FileNotFoundError("Opgegeven pad is geen map.")

    folder_name = path.name.strip()

    parts = folder_name.split(maxsplit=1)

    project_number = ""
    project_name = folder_name

    if len(parts) == 2 and parts[0].isdigit():
        project_number = parts[0]
        project_name = parts[1]

    folders = []
    files = []

    for item in path.iterdir():

        if item.is_dir():
            folders.append(
                {
                    "name": item.name,
                    "known": item.name in mapping,
                    "type": mapping.get(item.name, {}).get("type"),
                }
            )

        elif item.is_file():
            files.append(item.name)

    folders.sort(key=lambda x: x["name"])
    files.sort()

    return {
        "project_number": project_number,
        "project_name": project_name,
        "project_path": str(path),
        "folders": folders,
        "files": files,
    }