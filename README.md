# Endurance Elevation Website

Diese Website wurde für Endurance Elevation erstellt und bietet einen Überblick über Trainingsangebote, einen Shop und Informationen zum Team.

## Funktionen

- Responsives Design
- Mehrere Informationsseiten (Startseite, Angebote, Über Uns, Trainingsgestaltung, Kontakt)
- Shop mit Produktanzeige und Möglichkeit, neue Produkte hinzuzufügen
- Backend mit Flask für die Datenbankfunktionalität

## Installation

### 1. Flask installieren

Der Shop verwendet ein Flask-Backend als Datenbank. Um dieses zu installieren, benötigen Sie Python. Folgen Sie diesen Schritten:

1. Öffnen Sie die Eingabeaufforderung/PowerShell
2. Installieren Sie die benötigten Pakete:

```
pip install -r requirements.txt
```

### 2. Server starten

Um den Server zu starten und die Produktdatenbank zu aktivieren:

1. Navigieren Sie zum Projektverzeichnis:

```
cd c:\Projekte\onlineshop
```

2. Starten Sie den Flask-Server:

```
python app.py
```

Der Server wird standardmäßig auf Port 5000 starten (http://localhost:5000).

## Nutzung

- Die Website kann ohne Backend verwendet werden, aber zum Hinzufügen und Anzeigen von Produkten im Shop muss der Flask-Server laufen.
- Öffnen Sie index.html in einem Webbrowser, um die Website anzuzeigen.
- Um neue Produkte hinzuzufügen, besuchen Sie die Shop-Seite und nutzen Sie das Formular "Produkt hinzufügen".

## Kontakt

Bei Fragen wenden Sie sich an: info@endurance-elevation.de oder +49 176 51257905
