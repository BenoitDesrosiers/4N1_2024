---
sidebar_position: 260
draft: true
---

# Exécution de la partie 2

Ce diagramme synthétise le processus d'exécution de ce que nous avons vue jusqu'à maintenant. 

```mermaid
sequenceDiagram
    autonumber
    participant System

    create participant App_xaml_cs as App.<br>xaml.cs
    System->>App_xaml_cs: new()
    activate App_xaml_cs
    participant serv as ServiceProvider
    Note right of App_xaml_cs: Enregistrement des services
    App_xaml_cs->>serv: AddSingleton<MainWindow>
    App_xaml_cs->>serv: SCRepositories<br>EnregistrerRepositories...
    App_xaml_cs->>serv: SCServiceExtensions<br>EnregistrerServices...
    App_xaml_cs->>serv: SCViewModelExtensions <br/> AddTransient<MainWindowVM>()
    App_xaml_cs->>serv: SCViewModelExtensions <br/> AddTransient<ListeCategoriesVM>()
    App_xaml_cs->>serv: SCViewModelExtensions <br/> AddTransient<ListeCartesVM>()
    Note right of App_xaml_cs: Enregistrement du dbcontext
    App_xaml_cs->>serv: AddDbContext<SuperCarteContext>
    deactivate App_xaml_cs
    System->>App_xaml_cs: OnStartup
    activate App_xaml_cs
    App_xaml_cs->>serv: GetRequiredService<MainWindow>
    create participant MainWindow_xaml_cs as WPF:<br>MainWindow<br>.xaml.cs
    serv->>MainWindow_xaml_cs: Singleton new<br/>MainWindowVM
    activate MainWindow_xaml_cs
    create participant MainWindowVM_cs as WPF:<br>MainWindowVM<br>.cs 
    MainWindow_xaml_cs->>MainWindowVM_cs: Injecté par<br>le constructeur
    MainWindowVM_cs->>serv: GetRequiredService<ListeCartesVM>
    create participant ListeCartesVM_cs as WPF:<br>ListeCartesVM.cs
    serv->>ListeCartesVM_cs: Transient new()
    create participant CarteService_cs as Core:<br>CarteService_cs
    ListeCartesVM_cs->>CarteService_cs: Injecté par<br>le constructeur
    create participant CarteRepo_cs as Core:<br>CarteRepo.cs
    CarteService_cs-->CarteRepo_cs: Injecté par<br>le constructeur
    MainWindowVM_cs--XListeCartesVM_cs: VMActif =
    create participant MainWindow_xaml as WPF:<br>MainWindow<br>.xaml
    MainWindow_xaml_cs->>MainWindow_xaml:InitializeComponent()
    MainWindow_xaml-->>ListeCartesVM_cs: <DataTemplate<br>{vm:ListeCartesVM}"><br><v:UcListeCartes/>><br><br>{vm:ListeCategoriesVM}"><br><v:UcListeCategories/>
    MainWindow_xaml_cs--XMainWindowVM_cs: DataContext =
    deactivate MainWindow_xaml_cs

    App_xaml_cs->>MainWindow_xaml: Show()
    MainWindow_xaml--XMainWindow_xaml_cs:Content = Binding VMActif
    Note over MainWindow_xaml,ListeCartesVM_cs: VMactif = ListeCartesVM, <br/> donc c'est la view associée<br/>UcListeCartes qui est affichée
    create participant UcListeCartes_xaml_cs as WPF:<br>UcListeCartes<br>.xaml.cs
    MainWindow_xaml->>UcListeCartes_xaml_cs:Transient new()
    create participant UcListeCartes_xaml as WPF:<br>UcListeCartes_xaml
    UcListeCartes_xaml_cs->>UcListeCartes_xaml:Initialize<br>Component()
    UcListeCartes_xaml_cs--XMainWindow_xaml: get vm associée <br>à cette vue 
    UcListeCartes_xaml_cs--XListeCartesVM_cs: DataContext =
    UcListeCartes_xaml->>UcListeCartes_xaml_cs: UserControl_Loaded
    UcListeCartes_xaml--XListeCartesVM_cs: ProgressBar Binding EstEnTravail
    UcListeCartes_xaml_cs-)ListeCartesVM_cs:ObtenirListeCommande
    ListeCartesVM_cs-)ListeCartesVM_cs: ObtenirListeAsync
    ListeCartesVM_cs->>ListeCartesVM_cs: EstEnTravail = true
    ListeCartesVM_cs->>ListeCartesVM_cs: setter de EstEnTravail
    ListeCartesVM_cs-->>UcListeCartes_xaml: affiche le ProgressBar 
    ListeCartesVM_cs-)CarteService_cs: ObtenirListeCarteDetailAsync()
    CarteService_cs-)CarteRepo_cs: ObtenirListeCarteDetailAsync()
    create participant CarteDetailModel_cs as Core:<br>CarteDetailModel.cs
    CarteRepo_cs->>CarteDetailModel_cs: new
    create participant Database
    CarteDetailModel_cs->>Database: charge CarteDetailModel
    ListeCartesVM_cs--XCarteDetailModel_cs: ListeCartes =
    ListeCartesVM_cs->>ListeCartesVM_cs: EstEnTravail = false
    ListeCartesVM_cs-->>UcListeCartes_xaml: arrête d'afficher le ProgressBar 
    ListeCartesVM_cs-->>UcListeCartes_xaml: via le binding
    UcListeCartes_xaml-->>UcListeCartes_xaml: DataGrid.ItemsSources ListeCartesVM.cs:ListeCartes<br>SelectedItem=VM.CarteSelection
    UcListeCartes_xaml-->>UcListeCartes_xaml: affiche la liste des cartes<br>highlight la carte sélectionnée
    actor Usager 
    Usager->>UcListeCartes_xaml: appuie sur Supprimer .... à suivre

    deactivate App_xaml_cs
```


Pour ce diagramme en plus gros sur [Kroki!](https://kroki.io/mermaid/svg/eNqtV91u2zYUvs9TELvpAtTOveAISJOsCFCvRd26uQto6ljmIJEaSSnphr3LbrPX8IvtkJJtSSQdp1tvUvOc7zv_h6KG32sQDG44zRUtzwj-o7WRoi5XoNzPiirDGa-oMGTxXRsoz9w5U0ANDMRXVfXwRMvigWlCtf05na1Uao-mTDtUyzBJ055uQgQ8_nzeGmeGN5a3J_fc0KAaa2CBfzmDT0o2POvc_VUiWPF8Y4hck4GVW6Eg59ooKAFZMtCOCRlaEz1ldNCKEnKVZQsu8gIwJ7M55eIbF5l8TKOAxfVnqKTmRioO2oZ_MKv6oul0eoSkC-32yYDQXIoxUyd_gWXJ4XEuMygOPASJLlIb1xdF8Qgz0YtrOU-7Qvwnwg_oJFxjGXMX6v_Lqkyf8RX1rkm2YlIYeDLH6n2zum6VZou6AuUMdidt2TOIdmm4vT-KhUGWujre4iF_3oP5jDPKFWRdyb0uDAziQaU_j98-_ZLYNjpI7a9pfzytUbTt47FMuzGw0-qq02-bYWQ-_mVPl_Oom8u5cxTFjsZnH7jsiBJyJ34DZrbP1pyFF0Cw-NgNNTNQqxGTAx3L-rD5YuEMtEbxDGSjhI9xCdm3fW85Bgw6TOdjZ-9aKnAGRzJHMTaEtkdqp2Uu5ordcEE_rGAX9MjiZJL2sT9Wusm9n8Pl_Ao7ck0uT5yTF4bklOZzh8md4IbTgv-Bi6OspMAydiUcaU6CtZ_dUEO_QFkV6LA1_2dTJgO1v35K7fmsSb6ynuAibY-HkMMaDsB2wos0Ft7k3pst61-3Ervk9nZiYPgD622cMrLYyMdYku4DC8nZxxpekncowOW0K_fhWpANqDHZ21Cb0LZNhtPxtruDMikYYW9AG1JQ0uBdhX2iJePbZ3AagxIQXBvE6tL1mrMN6sSabwAL7emBgreqx0lK0yBhcuIi8cFRVx72wxC0GPSkNxJuJYzGIkzk1T0hORjSlIcC2Bql278JA4MBNTWQo3x-8f1W9rHR3JKvuL8tWsni4YOkGWQxipBt_HDNFWj9jqp9E99qcyuwZg3lx3J87rF9XOE4cNWey7KkIoPwyvexpA--0t8Fi10WPrTvMI4QLmk4Haxt2RRuDz9uDx_uq27OgOAl0c9nJHTvshukzQpvwKALLgldc46vq_PhbXUCQ-y2bDXdp2_w0uzJB3dnZ3t3eQ9p3HMqZta2-4pqOHANwUi5U0kI21CVg6cWKc990Jf-arz84a5a00LD69pCqe0_GHz2pmsQdVqHROgaTi1-1U5pdMjDYJvR94pn0zt8HOiFrBW-3Mj4ezAZbfsFFPgVBJkFXaJG14b2EF9Ir3RhPyUYhhW61y_b29rgA6pwjyhUcMdEb587U2J3ieE1KRXuPJpDl772_zGbVVVzJKoVwZdUpXiJMHywTgkubF3zRsHZkQfVv8Zo2Po)



