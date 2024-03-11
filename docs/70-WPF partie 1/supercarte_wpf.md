---
sidebar_position: 140
draft: false
---

# SuperCarte.WPF

Nous avons maintenant le projet **.EF** servant à gérer la bd; le projet **.core** servant à faire le lien entre les objets du domaine et les objet de la bd. Il reste à faire l'interface de l'application. 

C'est ici que WPF entre en jeu. 

## Création du projet dans une solution existante

Il faut ajouter le projet **WPF** dans la solution.

Pour ce faire, sélectionnez la solution **SuperCarteApp** en haut de l'**Explorateur de solution** et choisissez **Ajouter -> Nouveau projet...** dans le menu contextuel.

Créez un projet de type **Application WPF**. 

:::warning attention
Il est important **de ne pas choisir** la version **.NET Framework**.
:::


- **Nom du projet** : SuperCarte.WPF
- **Infrastructure** : .NET 7

Pour le champ **Solution**, indiquez d'**Ajouter à la solution** et gardez SuperCarteApp. 

Ensuite, sélectionnez le projet **SuperCarte.WPF** dans l'**Explorateur de solution** et choisissez **Définir en tant que projet de démarrage** dans le menu contextuel.

### Ajout des dépendances de projet

Le projet **SuperCarte.WPF** aura besoin du projet **SuperCarte.EF** pour initialiser le contexte et **SuperCarte.Core**, car il utilisera des **services**.

Il faut l'ajouter dans les dépendances du projet.

Sélectionnez le dossier **Dépendances** du projet **SuperCarte.WPF** et choisissez **Ajouter une référence de projet** dans le menu contextuel.

Dans la fenêtre, il faut cocher **SuperCarte.EF** et **SuperCarte.Core**. Vous venez d'intégrer 2 librairies internes au projet.

### Fichier Usings.cs

Afin de réduire la taille des classes, les **using** qui seront beaucoup utilisés dans ce projet seront déclaré globalement.

Créez le fichier **Usings.cs** à la racine du projet **SuperCarte.WPF**.

```csharp
global using SuperCarte.WPF; //Les classes à la racine de l'application WPF
global using SuperCarte.EF.Data; //Les classes du modèle du contexte
global using SuperCarte.EF.Data.Context; // La classe du contexte
global using System;
global using System.Collections.Generic;
global using System.Threading.Tasks;
```

Au fur et à mesure que des classes s'ajouteront dans le projet, le fichier **Usings.cs** sera mis à jour.

Également, le fichier **Usings.cs** appartient uniquement au projet dans lequel il est créé.

### Fichier de configuration - appsettings.json

La librairie **Microsoft.Extensions.Configuration.Json** permet de lire un fichier de configuration en **json**.

Dans la **Console du Gestionnaire de package**, inscrivez cette ligne. Il est important que le **Projet par défaut** soit **SuperCarte.WPF** dans la console. La librairie s'installera dans le projet indiqué dans le champ **Projet par défaut**.

<img src="/4N1_2024/img/13_package_console_1.png"  />


```powershell
Install-Package Microsoft.Extensions.Configuration.Json
```

Créez le fichier **appsettings.json** à la racine du projet **SuperCarte.WPF**. Prenez le modèle **Fichier Texte**.

:::danger IMPORTANT
Pour que le fichier soit pris en compte par le compilateur, il faut indiquer dans ces propriétés qu'il doit être copié dans le dossier de compilation. Effectuez un **clic droit** sur le fichier **appsettings.json** et sélectionnez **Propriétés**. Pour le champ **Copier dans le répertoire de sortie**, il faut mettre la valeur **Copier si plus récent**.

<img src="/4N1_2024/img/12_appsettings_01.png"  />

:::
Copiez ce code **json** dans le fichier.

Utilisez cette version si vous n'avez pas le message d'erreur du certificat **SSL**. 

:::warning Attention
Vous devez modifier le nom de la base de données pour celui que vous avez utilisé.
:::
```powershell
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\SQLExpress;Database=eDA_4N1_SuperCarte;Trusted_Connection=True;"
  }
}
```

Utilisez cette version avec le paramètre **Trust Server Certificate=true;** si vous avez le message d'erreur du certificat **SSL**. Il faut également modifier le nom de la base de données pour celui que vous avez utilisé.

```csharp
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\SQLExpress;Database=eDA_4N1_SuperCarte;Trusted_Connection=True;Trust Server Certificate=true;"
  }
}
```

:::info
Dans le fichier **SuperCarteContext.cs**, la variable **chaineConnexion** ne sert plus à rien car une validation est faite à la ligne 34 afin de savoir si le fichier de configuration est utilisé. Nous verrons plus tard ce qui remplacera la connexion à la bd. 
:::

## Théorie: comment utiliser l'injection de dépendances

Nous allons voir 3 façons d'insérer un repository dans **SuperCarte.WPF**

Afin de les démontrer, nous allons utiliser une classe qui n'est pas introduite encore, mais que nous utiliserons plus tard: la classe **CategorieService**. Cette classe devra utiliser le repository pour la classe **Categorie**. 

### 1) Création directe (à ne pas faire)

La bonne vieille technique de faire un new() lorsqu'on a besoin d'un objet. 

Il serait donc possible de créer notre repository directement dans le **constructeur** de la classe **CategorieService**:

```csharp title="NE PAS UTILISER"
public class CategorieService : ICategorieService
{
    private readonly CategorieRepo _categorieRepo;
    ...
    public CategorieService()
    {
        _categorieRepo = new CategorieRepo();
        ...
```

Une création directe rend la classe **CategorieService** entièrement dépendante de la classe **CategorieRepo**. Si nous voulions utiliser un autre type de repo, il faudrait modifier tous les emplacements appelant new. 

### 2) Injection de la classe (à ne pas faire)

La 2e technique serait de l'injecter par le constructeur, en utilisant la classe.

Premièrement, il faudrait enregistrer la classe **CategorieRepo**. 
à l'aide de ce code:

```csharp title="NE PAS UTILISER"
    services.AddTransient<CategorieRepo>();
```

Il serait maintenant possible d'injecter le repo dans le constructeur de la classe **CategorieService**:
```csharp title="NE PAS UTILISER"
public class CategorieService : ICategorieService
{
    private readonly CategorieRepo _categorieRepo;
    ...
    public CategorieService(CategorieRepo categorieRepo)
    {
        _categorieRepo = categorieRepo;
        ...
```

Cette approche utilise l'injection de dépendances, mais utilise la classe implémentée dans le constructeur. Si on désire changer de classe pour CategorieRepo (par exemple CategoriRepo2), il faudra changer tous les constructeurs qui l'utilise. 

### 3) Injection par interface (la bonne solution)

La meilleure approche est d'injecter l'interface par le constructeur. **CategorieService** n'est plus dépendant de la classe **CategorieRepo**, mais d'une interface. Il sera maintenant plus facile d'utiliser une 2e version du repo.

Premièrement, il faut enregistrer l'interface **ICategorieRepo**:

```csharp title="solution recommandée"
    services.AddTransient<ICategorieRepo, CategorieRepo>();
```

Et ensuite l'injecter dans le constructeur :

```csharp title="solution recommandée"
public class CategorieService : ICategorieService
{
    private readonly ICategorieRepo _categorieRepo;
    ...
    public CategorieService(ICategorieRepo categorieRepo)
    {
        _categorieRepo = categorieRepo;
        ...
```

Avec cette approche, il suffit de changer la classe sur la ligne d'enregistrement de l'interface et toutes les classes recevront maintenant ce nouveau type. 


## Ajout de la structure pour injection des dépendances

Le projet **WPF** n'a pas de fichier **program.cs**. Ce type de projet n'est pas conçu à la base pour être dans la structure du **hosting** de **.Net Core**. Il faut donc l'adapter.

Le fichier de démarrage de l'application est **App.xaml.cs**. Il est inclus dans le fichier **App.xaml**.

:::info
Remarquez la flèche à côté de App.xaml. Si vous cliquez sur celle-ci, vous y trouverez App.xaml.cs
:::

Remarquez que la classe est **partial**. 

```csharp
public partial class App : Application
{
}
```

Une classe partielle en **.NET** consiste à créer une classe dans plusieurs fichiers. Le fichier **App.xaml** est aussi une classe, sauf que le langage est **XAML**.

```xaml showLineNumbers title="NE PAS COPIER"
<Application x:Class="SuperCarte.WPF.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:SuperCarte.WPF"
             StartupUri="MainWindow.xaml">
    <Application.Resources>
         
    </Application.Resources>
</Application>
```

 À la ligne 1, le nom de la classe est indiqué.

C'est pour cette raison que le fichier **App.xaml.cs** est un sous-fichier de **App.xaml** dans l'**Explorateur de solutions**. Si la classe n'était pas partielle, il ne serait pas possible d'avoir 2 langages pour une même classe. La notion de classe partielle sert également à ajouter des fonctionnalités dans une classe générée automatiquement. Il aurait été possible d'ajouter un 2e fichier interne pour ajouter des éléments à la classe de base.

À la ligne 5, c'est la fenêtre de démarrage. Pour une application **WPF**, la classe **App** est le conteneur des fenêtres. Une fenêtre est l'équivalent d'une page.

L'application **WPF** de ce projet sera comme un **SPA** ou une **Application à page unique**. Dans le cas d'une application native, il serait possible de dire un **SWA** pour une **Application à fenêtre unique**.

Les applications **à fenêtres multiples** sont de plus en plus rares, car de nombreux appareils, tel que les tablettes, ne sont pas en mesure de les gérer correctement. L'approche multi-fenêtres est plutôt pour les systèmes d'exploitation d'ordinateur, comme Windows ou macOS, car ils sont en mesure de gérer ce type d'application. 

L'application aura une seule fenêtre, le classe **MainWindow.xaml**. À l'intérieur de cette classe, il y aura un **conteneur** qui aura un **contrôle utilisateur (user contrôle)** qui s'occupera d'une vue spécifique. Ce conteneur changera de **contrôle utilisateur** lorsqu'une nouvelle vue devra être affichée. Il s'agit de la même mécanique que Blazor ou Angular, mais pour une application native.

### Enregistrement des services

Des classes d'extensions seront utilisées pour gérer l'enregistrement des dépendances.

Créez le dossier **Extensions\ServiceCollections** à la racine du projet **SuperCarte.WPF**.

Créez la classe **SCRepositories.cs** dans le dossier.

Les Repositories ont déjà créés dans la section Core. Il faut maintenant les ajouter dans l'enregistrement. Remarquez que l'ajout est en **Scoped**. L'instance du dépot sera partagée entre les différents services qui l'utilisent.

```csharp
using Microsoft.Extensions.DependencyInjection;

namespace SuperCarte.WPF.Extensions.ServiceCollections;

/// <summary>
/// Classe d'extension qui permet d'enregistrer les classes de la catégorie Repository
/// </summary>
public static class SCRepositoryExtensions
{
    /// <summary>
    /// Méthode qui permet d'enregistrer les repositories de l'application
    /// </summary>
    /// <param name="services">La collection de services</param>
    public static void EnregistrerRepositories(this IServiceCollection services)
    {
        services.AddScoped<IRoleRepo, RoleRepo>();
        services.AddScoped<IEnsembleRepo, EnsembleRepo>();
        services.AddScoped<ICategorieRepo, CategorieRepo>();
        services.AddScoped<IUtilisateurRepo, UtilisateurRepo>();
        services.AddScoped<ICarteRepo, CarteRepo>();
        services.AddScoped<IUtilisateurCarteRepo, UtilisateurCarteRepo>();
    }
}
```

Créez la classe **SCServiceExtensions.cs** dans le dossier .

```csharp
using Microsoft.Extensions.DependencyInjection;

namespace SuperCarte.WPF.Extensions.ServiceCollections;

/// <summary>
/// Classe d'extension qui permet d'enregistrer les classes de la catégorie Service
/// </summary>
public static class SCServiceExtensions
{
    /// <summary>
    /// Méthode qui permet d'enregistrer les services de l'application
    /// </summary>
    /// <param name="services">La collection de services</param>
    public static void EnregistrerServices(this IServiceCollection services)
    {
                
    }
}
```
<!-- déplacer quand on en aura vraiment besoin -->
Créez la classe **SCValidateurExtensions.cs** dans le dossier . Cette classe s'occupera de l'enregistrement des **Validateurs**. Ce concept sera présenté dans un autre document.

```csharp
using Microsoft.Extensions.DependencyInjection;

namespace SuperCarte.WPF.Extensions.ServiceCollections;

/// <summary>
/// Classe d'extension qui permet d'enregistrer les classes de la catégorie Validateur
/// </summary>
public static class SCValidateurExtensions
{
    /// <summary>
    /// Méthode qui permet d'enregistrer les validateurs de l'application
    /// </summary>
    /// <param name="services">La collection de services</param>
    public static void EnregistrerValidateurs(this IServiceCollection services)
    {

    }
}
```
<!-- déplacer quand on en aura vraiment besoin -->

Créez la classe **SCViewModelExtensions.cs** dans le dossier . Cette classe s'occupera de l'enregistrement des **ViewModel**. Ce concept sera présenté dans le prochain document.

```csharp
using Microsoft.Extensions.DependencyInjection;

namespace SuperCarte.WPF.Extensions.ServiceCollections;

/// <summary>
/// Classe d'extension qui permet d'enregistrer les classes de la catégorie Service
/// </summary>
public static class SCViewModelExtensions
{
    /// <summary>
    /// Méthode qui permet d'enregistrer les ViewModels de l'application
    /// </summary>
    /// <param name="services">La collection de services</param>
    public static void EnregistrerViewModels(this IServiceCollection services)
    {

    }
}

```

## Création du Host - App.xaml.cs

[Pour en savoir plus sur le hosting](https://learn.microsoft.com/fr-fr/dotnet/core/extensions/generic-host?tabs=appbuilder)

Dans la **Console du Gestionnaire de package**, inscrivez cette ligne. 

:::warning attention
Il est important que le **Projet par défaut** soit **SuperCarte.WPF** dans la console. La librairie s'installera dans le projet indiqué dans le champ **Projet par défaut**.
:::

```
Install-Package Microsoft.Extensions.Hosting
```

Avec cette librairie, il sera possible de configurer l'application **WPF** avec le **hosting** d'application de **.NET Core**.


Voici le détail de la classe **App.xaml.cs**.


À la ligne 14 du bloc de code ci-dessous, il y a un attribut pour le **host** de l'application. Le **host**  doit être en attribut, car il sera utilisé dans plusieurs méthodes de la classe. 

Ensuite, le constructeur de la classe s'occupe de configurer le **host** comme il a été fait dans le fichier **Program.cs** de l'application console.

À la ligne 18, le constructeur par défaut du **host** est créé.

À la ligne 23, il faut enregistrer la fenêtre principale dans les dépendances de l'application.

À la ligne 26, le contexte est enregistré avec le fichier de configuration. C'est ici que la connexion à la bd est créée, remplacant celle qui était faite dans SuperCarteContext.cs. 

Aux lignes 29 à 32, le service utilise les méthodes d'extension pour enregistrer les différents concepts.

À la ligne 35, le **host** est construit en fonction de la configuration initiale.



La méthode **OnStartup()** est appelé au démarrage de l'application, après le constructeur. Elle démarre le **host** et ensuite indique au programme d'afficher la fenêtre principale de l'application.


Copiez ce code dans le fichier **App.xaml.cs**.

```csharp showLineNumbers
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SuperCarte.WPF.Extensions.ServiceCollections;
using System.Windows;

namespace SuperCarte.WPF;
/// <summary>
/// Interaction logic for App.xaml
/// </summary>
public partial class App : Application
{
    //highlight-next-line
    private IHost? _host;

	public App()
	{
        //highlight-next-line
        var builder = Host.CreateDefaultBuilder();

        //Enregistrement des services
        builder.ConfigureServices((context, services) =>
        {      
            //highlight-next-line      
            services.AddSingleton<MainWindow>(); //Fenêtre principale

            //Enregistrement du contexte    
            //highlight-next-line
            services.AddDbContext<SuperCarteContext>(options => options.UseSqlServer(context.Configuration.GetConnectionString("DefaultConnection")));

            //Appel des méthodes d'extension    
            //highlight-start                    
            services.EnregistrerRepositories();
            services.EnregistrerServices();            
            services.EnregistrerValidateurs();
            services.EnregistrerViewModels();
            //highlight-end
        });
//highlight-next-line
        _host = builder.Build();
    }

    /// <summary>
    /// Démarrage de l'application
    /// </summary>
    /// <param name="e"></param>
    protected override async void OnStartup(StartupEventArgs e)
    {
        await _host!.StartAsync();

        var fenetreInitiale = _host.Services.GetRequiredService<MainWindow>();
        fenetreInitiale.Show(); //Affiche la fenêtre initiale
        //highlight-next-line
        base.OnStartup(e);
    }

    /// <summary>
    /// Fermeture de l'application
    /// </summary>
    /// <param name="e"></param>
    protected override async void OnExit(ExitEventArgs e)
    {
        await _host!.StopAsync();
        base.OnExit(e);
    }
}
```



Démarrez l'application. Il y a 2 fenêtres.

Ouvrez le fichier **App.xaml**.

```xaml showLineNumbers title="Ne pas copier"
<Application x:Class="SuperCarte.WPF.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:SuperCarte.WPF"
			 //highlight-next-line
             StartupUri="MainWindow.xaml">
    <Application.Resources>
         
    </Application.Resources>
</Application>
```

À la ligne 5, il y a la propriété **StartupUri**. Cette propriété indique également la fenêtre de démarrage. Il faut retirer cette propriété pour ne pas interférer avec l'injection de dépendances.

Enlevez la ligne 5. 

Démarrez de nouveau l'application et il aura une seule fenêtre.

## Hello World

Pour avoir un premier contenu visuel, il faut modifier le fichier **MainWindow.xaml**.

```xaml showLineNumbers
<Window x:Class="SuperCarte.WPF.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:SuperCarte.WPF"
        mc:Ignorable="d"
        //highlight-next-line
        Title="Super Carte App" Height="450" Width="800">
    <Grid>
    //highlight-next-line
        <Label Content="Hello World!!!"></Label>
    </Grid>
</Window>
```

À la ligne 8, la propriété **Title** de la balise **\<Window\>** permet de mettre le titre de la fenêtre. 

À la ligne 10, il y a un **Label** pour afficher du texte statique.  L'intérieur de la balise **\<Grid\>**, c'est le contenu de la fenêtre.


<!-- le projet "SuperCarte_WPF_partie_1" correspond au code jusqu'ici -->