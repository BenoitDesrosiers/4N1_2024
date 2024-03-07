---
sidebar_position: 215
draft: true
---

# Exécution du HelloWorld

```mermaid
sequenceDiagram
    participant System

    create participant App_xaml_cs as App.<br>xaml.cs
    System->>App_xaml_cs: new()
    activate App_xaml_cs
    participant serv as ServiceProvider
    Note right of App_xaml_cs: Enregistrement des services
    App_xaml_cs->>serv: AddSingleton<MainWindow>
    App_xaml_cs->>serv: SCViewModelExtensions <br/> AddTransient<MainWindowVM>()
    App_xaml_cs->>serv: SCViewModelExtensions <br/> AddTransient<HelloWorldVM>()
    deactivate App_xaml_cs
    System->>App_xaml_cs: OnStartup
    activate App_xaml_cs
    App_xaml_cs->>serv: GetRequiredService<MainWindow>
    create participant MainWindow_xaml_cs as MainWindow<br>.xaml.cs
    serv->>MainWindow_xaml_cs: Singleton new<br/>MainWindowVM
    activate MainWindow_xaml_cs
    create participant MainWindowVM_cs as MainWindowVM<br>.cs 
    MainWindow_xaml_cs->>MainWindowVM_cs: Injecté par<br>le constructeur
    MainWindowVM_cs->>serv: GetRequiredService<HelloWorldVM>
    create participant HelloWorldVM.cs
    serv->>HelloWorldVM.cs: Transient new()
    MainWindowVM_cs-->HelloWorldVM.cs: VMActif =
    create participant MainWindow_xaml as MainWindow<br>.xaml
    MainWindow_xaml_cs->>MainWindow_xaml:InitializeComponent()
    MainWindow_xaml-->>HelloWorldVM.cs: <DataTemplate <br>"{vm:HelloWorldVM}"><br><v:UcHelloWorld /> >
    MainWindow_xaml_cs-->MainWindowVM_cs: DataContext =
    deactivate MainWindow_xaml_cs

    App_xaml_cs->>MainWindow_xaml: Show()
    MainWindow_xaml-->MainWindow_xaml_cs:Content = Binding VMActif
    Note over MainWindow_xaml,HelloWorldVM.cs: VMactif = HelloWorldVM, <br/> donc c'est la view associée<br/>UcHelloWorld qui est affichée
    create participant UcHelloWorld_xaml_cs as UcHelloWorld<br>.xaml.cs
    MainWindow_xaml->>UcHelloWorld_xaml_cs:Transient new()
    create participant UcHelloWorld_xaml as UcHelloWorld<br>.xaml
    UcHelloWorld_xaml_cs->>UcHelloWorld_xaml:Initialize<br>Component()
    UcHelloWorld_xaml-->HelloWorldVM.cs: DateHeure, ValeurDecimal, ValeurBool

    deactivate App_xaml_cs
    
```

Pour voir ce diagramme plus gros sur [Kroki!](https://kroki.io/mermaid/svg/eNqlVcGO2jAQvfMV1l7aSkDvERtpF1bdHtJWzTZ7XHmdASw5dmqbQFv1g_od_bGODSxO4rBIzYVkPPPm-c2zMfB9A5LBgtOVptWI4FNTbTnjNZWW5D-MhWrk40wDtdBavqnrpx2txBMzhBr3OZ0969SFpsz4qj3CJE2D3IRI2L5959cps7xxuMF6j4YB3bgGOf5yBl-0angJ2ud9Ulis-WptiVqSVpc7qWHFjdVQAaKUYDwSIuxbBMlI0C0l5KYscy5XAqySs4xy-chlqbbpYEE-LzhsM1WCuNtZkIYraQjK8D51YA-aYgjbB2BFlh52_1-A9yCEelRalCfAEgYFjU_is8wtKr2pz08jRvQD2K_oH66hPAymJ1jEM6eU0DqnqDPQNHSQa4Y9-3Uo1XFSzlBeoVDk9o769a8zLLIevSLzBDHsy_uoLaoeICEvMwuM30k6p2pr0EOsw6SOdJ2l1_i87GTSryyyGxR0Sa4vHO_AbC_RzgeTj5JbTgX_CXNV1Uoi6TjhSWyjswW19AGqWjierv3Vr6ZKwrzfV6mLz5rkGzvFCR62dFiX3oRdn7mSFnb2oE1wEiPWixyq7s5Jvlbbwb1GjoPvjyO4Jre4gEfjOK3TPaka0F2wcWTIdD_klqnGhzuoVJIR9gaMJYKSBu8qHLJRjP_9Az6jpSM6mbhUulxytsaUIeOEVeHNEMZ7d0NXlzSNwSQxv19CYbC_R4i1ijEIPOwAuj7u5cfOHfoL7mGjYUwKKvBlAYxXVBw_b5USo3P_AP8ARcDBAg==)

le constructeur de App.xaml.cs est appelé   
- C'est toujours App.xaml qui est appelé pour démarrer l'application. 
- crée le builder 
- configure les services
  - met la classe MainWindow en tant que service disponible en singleton
    - l'avantage de mettre MainWindow en tant que service c'est que chaque fois qu'on en demande une, c'est toujours la même qui sera utilisée (singleton)
    - étant donné qu'on ne prévoit pas en avoir besoin pour le testing, donc de le "mocker", on a pas besoin d'interface. Mais on pourrait le faire avec interface aussi. 
  - met SuperCarteContext en tant que context pour la bd
    - ce qui veut dire que si l'application demande un DbContext, c'est SuperCarteContext qui sera utilisé
    - va chercher la string de connection dans appsettings.json (DefaultConnection)
  - enregistre les services supplémentaires
    - les fonctions utilisées sont dans Extensions/ServiceCollections et sont dans des classes d'extensions de IServiceCollection
- Initialise le host
  - ce qui appel OnStartup

OnStartup est appelé par le host.Build()
- démarre le host
- va chercher le singleton MainWindow
- affiche la fenêtre

Constructeur de MainWindow.xaml
- Dans MainWindow.xaml.cs
  - recoit un MainWindowVM  (pas d'injection, c'est pas une interface)
  - Initialise MainWindow.xaml (InitializeComponent())
  - set le DataContext au MainWindowVM recu en argument
  
  
- Dans MainWindow.xaml: 
  - la première ligne indique c'est une Window, et que le code behing sera dans SuperCarte.WPF.Mainwindow. C'est x:class qui indique ca. 
  - Le titre de la fenetre est set par Title=
  - Les caractérististique height, width, windowstate sont set
  - Dans la section DataTemplate
    - un DataTemplate sert a indique que si je veux afficher un HelloWorldVM, voici comme l'afficher. Ici, c'est en prenant la view UcHelloWorld. 
    - le vm (le quoi afficher) est set a HelloWorldVM
    - et la view (le comment l'afficher) est set a UcHelloWorld
  - Le Grid est le contenant dans lequel la sous-view sera affiché 
    - ici on indique d'utiliser celui qui est dans VMActif
      - VMActif provient du DataContext
        - Le DataContext est set dans le constructeur de MainWindow.xaml.cs
          - le DataContext est set à MainWindowVM (sous classe de BaseVM) qui a été créé dans le constructeur de MainWindow.xaml.cs
            - Dans MainWindowVM (qui est le DataContext) on déclare VMActif  
            - VMActif est set à HelloWorldVM, c'est donc la template pour afficher un HelloWorldVM qui sera affichée

Affichage de HelloWorldVM
- étant donné que VMActif indique d'afficher un HelloWorldVM, c'est la view UcHelloWorld qui sera affichée
  - UcHelloWorld.xaml.cs ne fait rien de spécial
  - UcHelloWorld.xaml affiche les 3 champs. 
  
  



## Liens

building a WPF application https://learn.microsoft.com/en-us/dotnet/desktop/wpf/app-development/building-a-wpf-application-wpf?view=netframeworkdesktop-4.8

code behind https://learn.microsoft.com/en-us/dotnet/desktop/wpf/advanced/code-behind-and-xaml-in-wpf?view=netframeworkdesktop-4.8