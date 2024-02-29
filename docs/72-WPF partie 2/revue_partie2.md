---
sidebar_position: 236
draft: true
---

# Résumé du code

Ce diagramme synthétise le processus de développement vue jusqu'à maintenant. 

```mermaid
sequenceDiagram
    autonumber
    actor prog as Programmeur

    note over prog:________WPF________
    create participant wpf_vm as ViewModels
    prog->>wpf_vm:création
    box Projet.WPF<br>Application WPF<br>projet de démarrage
    participant wpf_vm
    participant wpf_mw as MainWindow.xaml
    participant wpf_serv as Extensions\<br>ServiceCollections
    participant wpf_view as Views
    end
    participant cgp as Console<br>Gestionnaire<br>package

    prog->>cgp:Install-Package CommunityToolkit.Mvvm
    prog->>wpf_vm:création Bases/BaseVM.cs
    note over wpf_vm:hérite de ObservableObject
    prog->>wpf_vm:création de MainWindowVM.cs
    note over wpf_vm:gère VMActif
    prog->>wpf_serv:SCViewModelExtensions<br>enregistrer MainWindowVM
    prog->>wpf_mw:ajouter le DataContext
    note over wpf_mw:Binding VMActif
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
    note over prog:Le program peut être démarré<br>pour afficher Xyz


  
```

Ce diagramme sur [Kroki!](https://kroki.io/mermaid/svg/eNqVVstu2zgU3fcruGsCNJ69MQjQODODAjEatHl0MUBBU9cyHYpk-bCdfk2Xcdf9A_3Y3EtKtmzJQccwLEs8PDz3LQ_fImgB15KXjldvGH54DEbHagYu34pgHLPOlIx7dotXBFYQ3Zu0rE0AZlaQIeOvzefx9u_2b4IJBxyBlrsghbRcB7a286-rikgfJKynpgDlE5aILi4v8_pYuHrLgzQ6rc3MhjQsIYzwiD9n7vK9tUqKhGDNI5sArABW1NuKO8dLyMy94wcfV2tSNeVSP0pdmPVowys1iPTgVoT9axNAe5Tg_yUBn_GxFDAxSoEgZX74eLS7tT8jQBc9pCgtgSbIYhQQ_T_giVRz6dK95eKJTOx6D3eNP2gfuFIXt3kdKaoqahme74xRTzKMpqvWA8MuZ1fcg_-Dfh-mI-GPIt7AF_XWSXyG_v44I4_wmYKPsyWa_io54vc-foW_rF8csIfpe3Tl_JiRzht_nuxSaB8J8gxoB6X0wSFb96xjlmo95ksTA8IUsGseOLo7wCYMKELsFdJIXR5o6oEKrntJhDaSrPYsWl03kljC4-kCtQcXRcAaSzYEpt5y742QuIXHrrwumeL41WVs8mCoOllbk5NP99e7-nwNOTEODgqZCrCtQFokBVdypqQJi_oFuwmFVSjUC_2kF8RWUZhSgXVK_hjkwBrCfMKrl9iB5Cm6tgSbmjuBQl8d1ulhuTU1s5N3kKW-tYd9ef6eRPdTtbOVRQ3kIetkvQ31llmTAykWnPyDl8p6FoNU0tfbngCUeuL44i20-pMUbvf2nJBEZBXKWBgiIiWUX7hMm0hUERnKrl9UClyBXaXeInLlGa3uliIuVZit0GQkufqCaHhPf6rIjgGR-Rwa9gFFN2FCuQxpDh4M6U9kUi9zGyWylBlJ-UC9nKQwsyABk0GRGxsjiaT-kXPFtdSpovyzFgtnNJbS_xlyx22JddvP3lR2RiWC0s6HyCsIiGcobEnRuvfYaHbRPdlKI_aiHF5MqpCPI1PObugWb1J_PR9usL_lnCaI9PxblAnb7mtc9_ut-cAxjcJNvyvTfDycF_eitWc_k4_MoT1J3SrijzekD3I2U9N09S_MmVx8nFKGnWEYz08x5cyKLlUHdlgkTRPYyeIdu8PqulJGPL1jj47bW65B0So1aEKMRgNzhhbvoLIqvQ9RxOY0xymTFXoTXUPhp6Po7YCaP82-geh35xk1FV2i8GYiZeJ97Nmga9vJcWN4AcUpF3Tmy9zoXId5HGGeUJ7m7aPBiXMD6YqvjMxCDKz-SdY1r2X1Nr29kFQ-n0uxyHmbx1cqvf8ASHLIeg)