---
sidebar_position: 236
draft: false
---

# Résumé du code

Ce diagramme synthétise le processus de développement vue jusqu'à maintenant. 

```mermaid
sequenceDiagram
    autonumber
    actor prog as Programmeur

    note over prog:________WPF________
    
    box Projet.WPF<br>Application WPF<br>projet de démarrage
        participant wpf_vm as ViewModels
        participant wpf_vm
        participant wpf_mw as MainWindow.xaml
        participant wpf_serv as Extensions\<br>ServiceCollections
        participant wpf_view as Views
    end

    participant cgp as Console<br>Gestionnaire<br>package
    prog->>cgp:Install-Package CommunityToolkit.Mvvm
    prog->>wpf_vm:création

    prog->>wpf_vm:création Bases/BaseVM.cs
    note over wpf_vm:hérite de ObservableObject
    prog->>wpf_vm:création de MainWindowVM.cs
    note over wpf_vm:gère VMActif
    prog->>wpf_serv:SCViewModelExtensions<br>enregistrer MainWindowVM
    prog->>wpf_mw:ajouter le DataContext
    note over wpf_mw:Binding VMActif
    note over wpf_mw:dans MainWindow.xaml<br>ajouter les dépendances, le titre, et le binding à VMActif
    note over wpf_mw:dans MainWindow.xaml.cs<br>ajouter MainwindowVM dans le constructeur<br>et l'associer au DataContext<br>ajouter la langue

    
    note over prog: ________CRUD________

    note over prog: _______Core________
    box  Projet.Core<br>Bibliothèque de classes
    participant core_model as Models
    participant core_repo as Repositories
    participant core_serv as Services
    participant core_ext as Extensions
    end
    prog->>core_model:création des classes XyzModel.cs
    note over core_model: une Propriété pour<br>chaque champs utilisé
    prog->>core_ext:création des classes d'extension XyzMapExtensions.cs
    note over core_ext:méthodes pour conversion<br>du modèle de données vs <br>modèle du domaine<br>et vice-versa
    prog->>core_serv:création du service IXyzService.cs et XyzService.cs
    note over core_serv:injection du repo <br>dans le constructeur
    note over core_serv:obtient les données<br>à partir du repo<br>asynchrone


    note over prog:________WPF________
    prog->>wpf_serv: enregistrer XyzService (de core)
    note over prog:mettre à jour Usings.cs
    prog->>wpf_vm:création du VM pour lister Xyz<br>(ListeXyzVM.cs)
    note over wpf_vm:obtient les données<br>à partir du service<br>qui les obtient du repo
    prog->>wpf_serv:SCViewModelExtensions enregistrer ListeXyxVM
    prog->>wpf_view:création de UcListeXyz.xaml
    note over wpf_view: les vues sont des <br>Contrôle utilisateur (WPF)
    note over wpf_view:structure de la vue<br>Grid, TextBlock, WrapPanel<br>DataGrid..
    prog->>wpf_mw:DataTemplate pour faire le lien entre la view et le VM
    prog->>wpf_vm:MainWindowVM changer VMActif pour ListeXyzVM 
    prog->>wpf_view:ajouter Loaded
    note over wpf_view:ajouter la fonction associée à Loaded. 
    prog->>wpf_vm:ajouter la logique pour la barre d'activité
    prog->>wpf_view:ajouter le composant ProgressBar
    note over prog:Le program peut être démarré<br>pour afficher Xyz


  
```

Ce diagramme sur [Kroki!](https://mermaid.ink/img/pako:eNqdV-tO4zgUfhUrfwCpdFsuA0QrpAF2VyNRDRpuq1WlkZuctobEzthOC4N4l_lJ9_e-QV5sz7ETmtIE7WyFGmKfy-dz-Y77FEQqhiAMDHzLQUZwJvhE83QoGX54bpXM0xHo8j2ySrNMqwnjhl3gE0VTyHHbC0hlgakZeKHwa_m5vfi9-tfL-e-ReiAjd2C7KPHrSB9_zLJERNwKJVm5lDkBFgOLi0XKteYT8Or0ybi2IhIZl5bNs_HXWUrIbgTMB3iuxLwn2b6XzsnKgAt5K2Ss5t0Hnibt4gb0jBR-e7AgDWI3wyFBv8R1EcGpShKIrFtvh4OQK-ilGMi4imtdOppkJHiK5lQC5OcPMGRdcqHde8aj-9coUSK2j49RK_wkjeVJsn3h99FEmuZS2McrpZJ7YbuDWRWVUssHKox0sXBJecXTvM1OuAHzC33fDLqReVsUpfy0WGiBa5jTzyMKHh8l8Hl0h0F63zwqLJPynodJ8aKB3Qw-YtjHazbJZXh5-loly7xR9EBqmAhjNZqre1szk85Dfqdyi3IJsDNuOebEwoNtAoXCJ2hIyMkqrDWpmMu10iNYS1eGOiHD6uDYr6ZDzq1AuB2GfYIvo9JP8eN_uMKY1r3R7rwMAHPy6CDCSFmdRxY730UM3W5wY1QkUIXn9VisQOf4Jyc5VGXUSBqsoorTL9dnS9p4V_ZUaVhlGOKWilxol3CciFEilJ0WL8h1VExRgqjBNPQY2UupNhwR1KhkTUpDpkjoCz6NQH4UrQYrnih5oU0Mo_aGTZZ0UO_oV4wrHWKqU7E_H7875A1tUtNluQQKVKZFsbDFgmXKZzWacgoTPtLMsNyKRJhisQ4B4bYAiDegOoMDw7PlmdpAkbUUgUwVWSIsVG64TVoEK84ZAi9eEpfBGGmvWKDkzDDafd3KcSvF4oWyQCng22SGr5_A8UHtCDkzPkPsE8Ius4WAqb9WFhpP4KwJeecpn6y5EnHYGxqo3YYaWQHS-o4vz0lWsK9dzejKtusx8yijqVbSNdfPTeO31MjqFLg8MNuklkF4W43mU7CoQKxzR1m7NshByzS3UnqOJOXzjPVlvUM60OY5veKL4_mtFqL_TzEqs0nr33LhZCu9MoI_MSJWglNifGiYDjTQV0fXdVQdqXafeHMiUnIAZzl-GUUQwZc2Eaou_sHy8b3IqXrYJmZzq9WUr7Jcu15B-kWr7sKgRdxhV9hrJ4mK7jvsVvPsgktwk4bYmyS63aaRR7tXkGYJ-vd5G9O9g8o6wZBieKgKyBfdaPxEagpPGtaHK9GMnCD0cmJ5y8sSYM3xrSbLueIxxK1hqA2gsZK-L_28wnqhivX6XdYEsz691EQQJ_py5WyE11EM7Qbei8VM2DfsuO6e2ifFMUFU727PYMwJ143tdA7uiRdslkFuWfE3xbW8AxcLd88jGHw8FtHU981QBp0gBY3EF-Od_okMDwM7hRSGQYj_xjDmeWKHwVA-oyjd7y-RN4IQ6wQ6QZ7FmNXyJ0AQjnlicBViGmsD_zvB_VzoBDitgvApeAjCfn-3u9fr7x7u7O192Dk86n3oBI9BuNs76Pb6vf7RzuFBv3e0e7D_3Am-K4Vm-9393lHvYG9_Z69_1EddZ-4vt0c4nv8FkSaE0w?type=png)