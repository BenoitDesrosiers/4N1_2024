---
sidebar_position: 260
draft: true
---

```mermaid
sequenceDiagram
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


%% rendu a afficher CarteDetailModel dans UcListeCartes_xaml
%% faudrait ajouter le transfert de repo a modèle de bd

    deactivate App_xaml_cs
```
