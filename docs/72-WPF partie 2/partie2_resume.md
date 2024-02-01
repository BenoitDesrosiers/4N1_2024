---
sidebar_position: 90
draft: true
---

# Résumé de wpf Partie 2

le constructeur de App.xaml.cs est appelé <!-- (qui décide de l'appeler?) -->
- crée le builder 
- configure les services
  - met la classe MainWindow comme étant la fenêtre principale (23)
  - met SuperCarteContext en tant que context pour la bd
    - ce qui veut dire que si l'application demande un DbContext, c'est SuperCarteContext qui sera utilisé
    - va chercher la string de connection dans appsettings.json (DefaultConnection)
  - enregistre les services supplémentaires
    - les fonctions utilisées sont dans Extensions/ServiceCollections et sont dans des classes d'extensions de IServiceCollection
- Initialise le host
  - ce qui appel OnStartup

OnStartup est appelé par le host.Build()
- démarre le host
- va chercher les services requis pour MainWindow
  - 