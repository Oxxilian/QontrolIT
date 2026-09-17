"""
Definities voor de Projects-module.

Hier staat alle kennis over herkenning van
productieonderdelen.

De scanner bevat géén hardcoded mapnamen.
"""

PRODUCTION_TYPES = {

    "plate_cutting": {
        "label": "Platen snijwerk",
        "keywords": [
            "snijwerk plaat",
            "plaat",
        ],
    },

    "profile_cutting": {
        "label": "Profielen snijwerk",
        "keywords": [
            "snijwerk koker",
            "snijwerk profiel",
            "koker",
            "profiel",
        ],
    },

    "profile_laser": {
        "label": "Profiellaser",
        "keywords": [
            "profiellaser",
            "profiel laser",
        ],
    },

    "sawing": {
        "label": "Zaagwerk",
        "keywords": [
            "zaagwerk",
        ],
    },

    "production_drawings": {
        "label": "Productietekeningen",
        "keywords": [
            "werkplaatstekening",
            "werkplaats tekening",
            "werkplaats tekeningen",
        ],
    },

    "assembly_drawings": {
        "label": "Montagetekeningen",
        "keywords": [
            "montagetekening",
            "montage tekening",
            "montage tekeningen",
        ],
    },

}