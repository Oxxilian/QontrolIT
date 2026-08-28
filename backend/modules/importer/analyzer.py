from .report import ImportReport


def analyze_scan(scan_result: dict):

    report = ImportReport()

    expected = {
        "drawings",
        "orders",
        "production",
        "quality",
        "conservation",
        "calculation",
    }

    found = set()

    for folder in scan_result["folders"]:

        if folder["known"]:

            found.add(folder["type"])

            report.info(f"Map gevonden: {folder['name']}")

    missing = expected - found

    for item in sorted(missing):
        report.warning(f"Map ontbreekt: {item}")

    scan_result["found"] = sorted(found)
    scan_result["missing"] = sorted(missing)
    scan_result["report"] = report.to_dict()

    return scan_result