---
sidebar_position: 260
draft: true
---

# Résumé de la partie 2


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
    ListeCartesVM_cs-->>UcListeCartes_xaml: via le binding
    UcListeCartes_xaml-->>UcListeCartes_xaml: DataGrid.ItemsSources ListeCartesVM.cs:ListeCartes<br>SelectedItem=VM.CarteSelection
    UcListeCartes_xaml-->>UcListeCartes_xaml: affiche la liste des cartes<br>highlight la carte sélectionnée
    actor Usager 
    Usager->>UcListeCartes_xaml: appuie sur Supprimer .... à suivre

    deactivate App_xaml_cs
```


Pour ce diagramme en plus gros sur [Kroki!](https://kroki.io/mermaid/svg/eNqtV91u2zYUvs9TELvpAtTOveAISJOsCFCvRd26uQto6ljmIJEaSSnphr3LbrPX8IvtkJJtSqQcp1tukvCc7zv_h6KG32sQDG44zRUtzwj-VFQZznhFhSGL79pAeebOmQJqoCe-qqqHJ1oWD0wTqu2_09lKpfZoyrRDtQyTNPV0EyLg8edzJ6fM8MbyevLADQ2qsQYW-Jsz-KRkwzNQTu9XiWDF840hck16Vm6Fgpxro6AEZMlAOyZkaE14yuigFSXkKssWXOQFGClmc8rFNy4y-ZiOAhbXn6GSmhupOGgb_sGs8kXT6fQISRfa7ZMBobkUQ6ZO_gLLksPjXGZQHHgIEl2kNq4viuIRZsKLazlPu0L8J8IP6CRcYxlzF-r_y6qMz_iKetckWzEpDDyZY_W-WV23SrNFXYFyBruTtuwZjHZpvL0_ioVBlro63uIxf96D-YxDyRVkXcmDLowM4kHFn8dvn35JbBsdpPa_qT-e1ijaDvFYpt0Y2Gl11fHbph9ZiH_Z0-V81M3l3DmKYkcTsvdcdkQJuRO_ATPbZ2vOwgsgWHzshpoZqNWAyYGOZb3ffGPh9LQG8fRkg4QPcQnZt723HCMGHabzsbN3LRU4gwOZoxgaQtsDtdMyN-aK3XBRP6xgF_TA4mSS-tgfK93kPszhcn6FHbkmlyfOyQtDckrzucPkTnDDacH_wMVRVlJgGbsSDjQn0drPbqihX6CsCnTYmv-zKZOe2l8_pfZ81iRfmSe4SNvjPuSwhiOwnfAiHQtvch_MlvWvW4ldcr2dGBn-yHobpowsNvJxLEn3kYXk7GMNL8k7FOBy2pX7cC3IBtSQ7G2sTWjbJv3peNvdQZkUjLA3oA0pKGnwrsI-0ZLx7TM4jV4JCK4NYnXpes3ZBnXGmq8Hi-3pnkKwqodJStMoYXLiIgnBo6487IchajHqiTcSbiUMxiJOFNQ9ITkY0pSHAtgapdu_CQODATU1kKN8YfHDVg6xo7klX3F_W7SSxcMHSTPIxihitvHDNVeg9Tuq9k18q82twJo1lB_L8XnA9nGF48BVey7LkooM4is_xBIffKW_CzZ2WYRQ32EcIVzScDpY27Ip3B5h3AE-3lfdnAHBS8LP50jowWXXS5sV3oBBF1wSuuYcXlfn_dvqBIax27LVdJ--0UvTk_fuzs727vLu07jn1JhZ2-4rquHA1Qcj5U4lIWxDVQ6B2kh57qO--Kvx8oe7ak0LDa9rC6W2_2Dw2ZuuQdRpHTJC13Bq8at2SkeHPA62GX2veDa9w8eBXsha4cuNDL8Hk8G2X0CBX0GQWdAlanRtaA_xhfRKF_ZTgmFYoXv9sr2tDT6gCveIQgV3TPT2uTMldpcYXpNS4c6jOXTpa_8es1lVNUeiWhF8SVWKlwjDB-uU4MLWNW8UnB15UP0LLCXULg)



