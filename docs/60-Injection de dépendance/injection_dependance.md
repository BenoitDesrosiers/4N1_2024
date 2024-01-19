---
sidebar_position: 40
---


# Utilisation

L'application consiste à faire la gestion d'une base de données contenant des univers de personnages. 

Présentement, nos données sur l'Univers de superhéros sont entreposées dans une bd relationnel SQLServer. Mais rien n'empêche de mettre ces données dans une structure de liste, dans une bd sqlite, un API, ou encore une bd NoSQL. Il est courant dans un projet de ne pas connaitre la technologie exacte d'entreposage des données. Afin de s'isoler de celle-ci, il est courant d'utiliser une classe qui fera le lien entre l'entrepot de données et le reste du programme: un **Repository**. Il suffira alors de simplement changer cette classe afin de changer l'entrepot de donnés. 

Mais comment "isoler" le reste du code afin de rendre cette classe intermédiaire échangeable? C'est ici que l'injection de dépendance entre en jeu.

Cette classe intermédiaire nous fournira quelques fonctionnalités que nous désirons avoir. La connexion entre notre programme et la "bd" se fera selon la solution utilisée. L'injection de dépendances nous permettra de choisir le mode de connexion au moment de l'exécution. 

## Classe de coordination - Manager

Il faut maintenant ajouter la logique pour la gestion de l'affichage de l'univers. Cette logique ne doit pas être dans la classe **App**.

Afin de respecter le **S** de **SOLID**, les classes doivent avoir une seule responsabilité. La responsabilité de la classe **App** est de déterminer la tâche et d'appeler le bonne classe de coordination.

Il faut donc créer une classe qui s'occupe de la coordination entre l'utilisateur et l'utilisation des services. Ce type de classe sera un **Manager**. Plusieurs personnes appellent également ce type de classe un **contrôleur**, car son rôle est de faire le lien entre l'utilisateur et la logique de notre application. Dans un serveur Web MVC ou API Rest, le **contrôleur** a le même rôle. Afin de différencier le concept entre une application Web et une application console, la classe de coordination sera un **Manager** dans ce cours pour faire la coordination entre la console et la logique.

Il peut être difficile de déterminer le découpage des **Manager**. Il serait possible de créer un **AfficherUniversManager** et un **SupprimerUniversManager**. Par contre, la quantité de classe risque d'être assez énorme. Il serait plus intéressant de regrouper les tâches en fonction du modèle. Par exemple, **UniversManager**. Le **S** est encore respecté, car cette classe s'occupe uniquement de coordonner **Univers**.

Créez le dossier **Managers**. Dans ce dossier, créez la classe **UniversManager**.

```csharp
namespace GestionPersonnageApp.Managers;

/// <summary>
/// Classe qui s'occupe de la coordination du modèle Univers
/// </summary>
public class UniversManager
{
    public void AfficherListe()
    {
        Console.WriteLine("Afficher tout.");
    }

    public void AfficherParId()
    {
        Console.WriteLine("Entrer la clé de l'univers.");
        
        int universId = Int32.Parse(Console.ReadLine());

        Console.WriteLine($"Afficher univers #{universId}.");
    }
}
```

### Interface

Les interfaces sont utilisées afin de déconnecter encore plus l'application (App.cs) des classes qui réaliseront les opérations demandées (UniversManager). Une interface définie une suite d'opérations que devront implanter les classes qui respectent cette interface. De cette façon, il est possible d'injecter toute classe qui respectent l'interface. Une interface est, en quelque sorte, un contrat. Les classes indiquent qu'elles implémentent toutes les fonctionnalités définies dans l'interface. Si une classe A utilisant une classe B respectant une interface C, alors A est assurée que toutes les fonctionnalités de C sont implantées dans B. 


Générez automatiquement l'interface avec l'action rapide. Placez le curseur sur le nom de la classe, faites **CTRL+.** (CTRL et le point) et sélectionnez **Extraire l'interface**. (ou **CTRL-R, CTRL_I**, ou Edition/Refactoriser/Extraire interface)

N'oubliez pas de mettre des commentaires dans l'interface lorsque cette technique est utilisée.

Voici ce à quoi l'interface devrait ressembler une fois documentée.

```csharp
namespace GestionPersonnageApp.Managers;

/// <summary>
/// Interface qui s'occupe de la coordination du modèle Univers
/// </summary>
public interface IUniversManager
{
    /// <summary>
    /// Afficher tous les univers
    /// </summary>
    void AfficherListe();

    /// <summary>
    /// Afficher un univers en fonction de sa clé primaire
    /// </summary>        
    void AfficherParId();
}
```

:::note
En **c#**, si un membre provient de l'interface, il faut seulement le documenter dans l'interface pour respecter le principe **DRY (Don't Repeate Yourself) ou Ne te répète pas.** 
:::

### Enregistrement du Manager - program.cs

Remplacez la section de la configuration des services du fichier **Program.cs** par le code ci-dessous.

Dans le fichier **Program.cs**, il faut enregistrer le **Manager** comme indiqué à la ligne 7.

```csharp showLineNumbers
//Configuration des services
builder.ConfigureServices((context, services) =>
{
    services.AddTransient<App>(); //Application principale

    //Manager
    //highlight-next-line
    services.AddTransient<IUniversManager, UniversManager>();
});
```

Cette ligne indique que si le code demande qqchose qui implémente IUniversManager, l'injection de dépendances va fournir une instance de UniversManager. 


## IServiceProvider

Il serait possible d'injecter les **Manager** dans le constructeur comme l'exemple ci-dessous.

```csharp
public App(IUniversManager universManager, IPersonnageManager personnageManager)
```

Par contre, le programme risque d'avoir plusieurs **Manager**. Un seul **Manager** est nécessaire par exécution du programme. Si tous les **Manager** sont injectés automatiquement lors de la création de la classe **App**, beaucoup de mémoire sera utilisée inutilement. Si le programme nécessite uniquement **UniversManager**, la création de **PersonnageManager** sera inutile et consommera de la mémoire et des ressources inutiles.

Le service **IServiceProvider**, est en mesure de créer uniquement les classes nécessaires à l'application console. Si l'application peut effectuer plusieurs tâches selon la réception des paramètres, il est préférable d'injecter uniquement la classe qui s'occupera de la coordination de la tâche demandée. 

:::important
Il est recommandé de limiter l'utilisation du **IServiceProvider** au maximum. Il faut le mettre à un seul endroit dans le programme si c'est nécessaire. C'est une mauvaise pratique d'injecter partout le **IServiceProvider**.
:::

Il faut donc créer **UniversManager** par cette technique.

```csharp
IUniversManager universManager = _serviceProvider.GetRequiredService<IUniversManager>();
```

Dans la classe **App**, il faut modifier la méthode **DemarrerApplicationAsync**.

```csharp
public async Task DemarrerApplicationAsync()
{
    //Le point de départ de la logique de l'application

    switch (_args[0].ToLower())
    {
        case "-aide":
            AfficherAide();
            break;

        case "-univers":

            if (_args[1].ToLower() == "-afficher")
            {
                //highlight-start
                //Création du manager par le service d'injection de dépendances.
                IUniversManager universManager = _serviceProvider.GetRequiredService<IUniversManager>();

                universManager.AfficherParId();
                //highlight-end
            }

            break;

        default:
            Console.WriteLine("Argument non valide");
            break;
    }
    
    //highlight-start
    //Nécessaire, car il n'y a aucun await dans le code et la méthode est async
    await Task.CompletedTask;
    //highlight-end
}
```

Démarrez le programme pour tester.

## Le Repository

La technique d'injection de dépendances par interface permet de respecter le principe **D** de **SOLID**.

L'interface permet d'isoler la dépendance de la classe.

Pour démontrer l'utilité, nous allons créer un **Repository** pour interroger les données. Pour l'instant, les données seront uniquement en mémoire.

Créez un dossier **Data** et à l'intérieur de celui-ci, créez la classe **Univers**. Cette classe est un élément du modèle du domaine d'affaires. Le dossier **Data** contiendra les classes du modèle du domaine.

```csharp
namespace GestionPersonnageApp.Data;

/// <summary>
/// Classe qui contient l'information d'un univers pour les personnages
/// </summary>
public class Univers
{
    public int UniversId { get; set; }
    public string Nom { get;set; }
}
```

:::note
Selon la communauté **csharp**, il n'est pas nécessaire de documenter une propriété lorsque son nom est significatif.
:::


Créez un dossier **Repositories** et à l'intérieur de celui-ci, créez l'interface **IUniversRepo**. 

Le dossier **Repositories** accueillera les classes qui s'occupent d'interagir avec les données du système.

```csharp
using GestionPersonnageApp.Data;

namespace GestionPersonnageApp.Repositories;

public interface IUniversRepo
{
    Univers? ObtenirUnivers(int universId);
    
    List<Univers> ObtenirListe();
}
```

:::note
Remarquez également que la méthode retourne le type **Univers?**. Le **?** n'est pas obligatoire, mais si il n'est pas mis, le compilateur retournera un avertissement que l'objet peut être **null**. Le point d'interrogation permet d'indiquer au compilateur que la valeur **null** est possible dans notre logique. Si la méthode retourne **null**, c'est que l'univers n'a pas été trouvé.
:::

Créez la classe **UniversV1Repo**. 

Remarquez que la recherche de données n'est aucunement efficace.

```csharp
using GestionPersonnageApp.Data;

namespace GestionPersonnageApp.Repositories;

public class UniversV1Repo : IUniversRepo
{
    private List<Univers> _lstUnivers;
	
	public UniversV1Repo()
	{
        //Création d'une liste en mémoire
		_lstUnivers= new List<Univers>();
		_lstUnivers.Add(new Univers() { UniversId = 1, Nom = "Marvel"});
        _lstUnivers.Add(new Univers() { UniversId = 2, Nom = "DC Comics" });
        _lstUnivers.Add(new Univers() { UniversId = 3, Nom = "TMNT" });
        _lstUnivers.Add(new Univers() { UniversId = 4, Nom = "Power Rangers" });
    }

    public Univers? ObtenirUnivers(int universId)
    {
        //Affiche un message dans la console du développeur
        System.Diagnostics.Debug.WriteLine("Utilisation de UniversV1Repo.");
        Univers? univers = null;

        //Aucunement efficace. La liste est entièrement visitée
       for(int index = 0; index < _lstUnivers.Count; index++)
        {
            if(_lstUnivers[index].UniversId == universId)
            {
                univers = _lstUnivers[index];
            }
        }

        return univers;
    }
    
    public List<Univers> ObtenirListe()
    {
        return _lstUnivers;
    }
}
```

Créez la classe **UniversV2Repo**. Une requête **LINQ** en notation **Lambda** sera utilisée pour obtenir le bon univers.

```csharp
using GestionPersonnageApp.Data;

namespace GestionPersonnageApp.Repositories;

public class UniversV2Repo : IUniversRepo
{
    private List<Univers> _lstUnivers;

    public UniversV2Repo()
    {
        //Création d'une liste en mémoire
        _lstUnivers = new List<Univers>();
        _lstUnivers.Add(new Univers() { UniversId = 1, Nom = "Marvel" });
        _lstUnivers.Add(new Univers() { UniversId = 2, Nom = "DC Comics" });
        _lstUnivers.Add(new Univers() { UniversId = 3, Nom = "TMNT" });
        _lstUnivers.Add(new Univers() { UniversId = 4, Nom = "Power Rangers" });
    }

    public Univers? ObtenirUnivers(int universId)
    {
        //Affiche un message dans la console du développeur
        System.Diagnostics.Debug.WriteLine("Utilisation de UniversV2Repo.");
        return _lstUnivers.Where(u => u.UniversId == universId).FirstOrDefault();
    }
    
    public List<Univers> ObtenirListe()
    {
        return _lstUnivers;
    }
}
```

Vous pouvez mettre un **break point** à la ligne 22 des 2 classes UniversV1Repo et UniversV2Repo pour bien visualiser quelle classe sera utilisée. 

Également, le **System.Diagnostics.Debug.WriteLine** permet d'écrire dans la console de développement. Il y a beaucoup d'information dans cette console, mais le code de cette console est seulement pour le développeur.

<img src="/4N1_2024/img/05_debug_console_1.png"  />


Les 3 prochaines sections illustrent 3 façons pour utiliser le **repository** dans **UniversManager**.

:::important
La dernière technique devra être utilisée pour les travaux pratiques.
:::


## Création directe - new class (à ne pas faire)

Il faut modifier le **Manager** Univers pour utiliser le **Repository**. 

Il ne faut pas faire la création comme aux lignes 13 et 29.

```csharp showLineNumbers title="NE PAS UTILISER"
using GestionPersonnageApp.Data;
using GestionPersonnageApp.Repositories;

namespace GestionPersonnageApp.Managers;

/// <summary>
/// Classe qui s'occupe de la coordination de modèle Univers
/// </summary>
public class UniversManager : IUniversManager
{   
    public void AfficherListe()
    {
        //highlight-next-line
        UniversV1Repo universRepo = new UniversV1Repo();

        List<Univers> lstUnivers = universRepo.ObtenirListe();

        foreach(Univers univers in lstUnivers)
        {
            Console.WriteLine($"Id : {univers.UniversId}, Nom : {univers.Nom}");
        }
    }

    public void AfficherParId()
    {
        Console.WriteLine("Entrer la clé de l'univers.");

        int universId = Int32.Parse(Console.ReadLine());
        //highlight-next-line
        UniversV1Repo universRepo = new UniversV1Repo();

        Univers? univers = universRepo.ObtenirUnivers(universId);

        if (univers != null)
        {
            Console.WriteLine($"Id : {univers.UniversId}, Nom : {univers.Nom}");
        }
        else
        {
            Console.WriteLine("Univers non trouvé.");
        }
    }
}
```

Si vous exécutez le programme, le code fonctionnera.

Par contre, une création directe rend la classe entièrement dépendante de la classe **UniversV1Repo**. Si nous désirons utiliser **UniversV2Repo**, il faudra modifier dans tout le programme les emplacements appelant **new UniversV1Repo()** . Si cette classe est créée 1 million de fois, il faut le modifier 1 million de fois. Il existe des outils de refactorisation pour nous aider, mais ce n'est pas l'idéal. Seulement dans **UniversManager**, elle est créée 2 fois.

## Injection de la classe (à éviter)

La 2e technique serait de l'injecter par le constructeur, en utilisant la classe.

Premièrement, il faut enregistrer le service **UniversV1Repo**. Remplacez la section de la configuration des services du fichier **Program.cs** par le code ci-dessous.

```csharp showLineNumbers title="NE PAS UTILISER"
//Configuration des services
builder.ConfigureServices((context, services) =>
{
    services.AddTransient<App>(); //Application principale

    //Manager
    services.AddTransient<IUniversManager, UniversManager>();

    //Repo
    //highlight-next-line
    services.AddTransient<UniversV1Repo>();
});
```

La classe **UniversManager** serait comme ci-dessous.

```csharp title="NE PAS UTILISER"
using GestionPersonnageApp.Data;
using GestionPersonnageApp.Repositories;

namespace GestionPersonnageApp.Managers;

/// <summary>
/// Classe qui s'occupe de la coordination de modèle Univers
/// </summary>
public class UniversManager : IUniversManager
{
    //highlight-next-line
    private readonly UniversV1Repo _universRepo;

    //highlight-next-line
    public UniversManager(UniversV1Repo universRepo)
    {
        _universRepo = universRepo;
    }

    public void AfficherListe()
    {
        List<Univers> lstUnivers = _universRepo.ObtenirListe();

        foreach (Univers univers in lstUnivers)
        {
            Console.WriteLine($"Id : {univers.UniversId}, Nom : {univers.Nom}");
        }
    }

    public void AfficherParId()
    {
        Console.WriteLine("Entrer la clé de l'univers.");

        int universId = Int32.Parse(Console.ReadLine());

        Univers? univers = _universRepo.ObtenirUnivers(universId);

        if (univers != null)
        {
            Console.WriteLine(univers.Nom);
        }
        else
        {
            Console.WriteLine("Univers non trouvé.");
        }
    }
}
```

Cette approche utilise l'injection de dépendances, mais utilise la classe implémentée dans le constructeur. 

Lorsque l'enregistrement de la dépendance sera remplacé par la nouvelle version comme ci-dessous, il faudra modifier également tous les constructeurs qui utilisent **UniversV1Repo**.

Remplacez la section de la configuration des services du fichier **Program.cs** par le code ci-dessous.

```csharp title="NE PAS UTILISER"

//Configuration des services
builder.ConfigureServices((context, services) =>
{
    services.AddTransient<App>(); //Application principale

    //Manager
    services.AddTransient<IUniversManager, UniversManager>();

    //Repo
    //highlight-next-line
    services.AddTransient<UniversV2Repo>();
});
```

Démarrez le programme. Toutes les classes qui utilisent **UniversV1Repo** ne seront plus utilisables. Le programme aura cette exception lorsqu'il essayera de l'utiliser : **'Unable to resolve service for type 'GestionPersonnageApp.Repositories.UniversV1Repo' while attempting to activate 'GestionPersonnageApp.Managers.UniversManager'.'**.

Pour simuler cette erreur, dans la classe **UniversManager**, conserver le constructeur **public UniversManager(UniversV1Repo universRepo)**.

> **ASTUCE :** Lorsque vous avez l'exception **Unable to resolve service for type**, la plupart du temps c'est que la classe n'est pas enregistrée dans les services disponibles par injection de dépendances.



## Injection par interface (approche recommandée)

La meilleure approche est d'injecter l'**interface** par le constructeur. Le **Manager** n'est plus dépendant d'une classe, mais d'une interface. Il sera maintenant plus efficace d'utiliser une 2e version du **repo**.

Modifiez le code de **UniversManager** pour celui-ci. Le constructeur reçoit l'interface **IUniversRepo** comme dépendance.

```csharp title="APPROCHE RECOMMANDÉE"
using GestionPersonnageApp.Data;
using GestionPersonnageApp.Repositories;

namespace GestionPersonnageApp.Managers;

/// <summary>
/// Classe qui s'occupe de la coordination de modèle Univers
/// </summary>
public class UniversManager : IUniversManager
{
    //highlight-next-line
    private readonly IUniversRepo _universRepo;
    //highlight-next-line
    public UniversManager(IUniversRepo universRepo)
    {
        _universRepo = universRepo;
    }
    public void AfficherListe()
    {
        Console.WriteLine("Afficher liste.");
    }

    public void AfficherParId()
    {
        Console.WriteLine("Entrer la clé de l'univers.");
        
        int universId = Int32.Parse(Console.ReadLine());        

        Univers? univers = _universRepo.ObtenirUnivers(universId);

        if(univers != null)
        {
            Console.WriteLine(univers.Nom);
        }
        else
        {
            Console.WriteLine("Univers non trouvé.");
        }
    }
}
```

Remplacez la section de la configuration des services du fichier **Program.cs** par le code ci-dessous. À la ligne 9, l'enregistrement se fait par l'interface.

```csharp title="APPROCHE RECOMMANDÉE"
//Configuration des services
builder.ConfigureServices((context, services) =>
{
    services.AddTransient<App>(); //Application principale

    //Manager
    services.AddTransient<IUniversManager, UniversManager>();

    //Repo
    //highlight-next-line
    services.AddTransient<IUniversRepo, UniversV1Repo>();
});
```

Démarrez le programme. Il sera fonctionnel et il utilisera la classe **UniversV1Repo** lorsque l'interface **IUniversRepo** sera injecté dans un constructeur.

Remplacez la section de la configuration des services du fichier **Program.cs** par le code ci-dessous pour que la classe soit maintenant **UniversV2Repo**.

```csharp title="APPROCHE RECOMMANDÉE"
//Configuration des services
builder.ConfigureServices((context, services) =>
{
    services.AddTransient<App>(); //Application principale

    //Manager
    services.AddTransient<IUniversManager, UniversManager>();

    //Repo
    //highlight-next-line
    services.AddTransient<IUniversRepo, UniversV2Repo>();
});
```

Démarrez le programme. Il sera fonctionnel et il utilisera la classe **UniversV2Repo** lorsque l'interface **IUniversRepo** sera injectée dans un constructeur. Si 1 million de classes utilisaient **IUniversRepo**, une seule ligne de code permet d'utiliser la nouvelle version dans tout le programme.

Un autre avantage d'utiliser les interfaces est lors des tests. Il est possible de remplacer les dépendances par des **simulacres**. Les tests seront présentés plus tard dans la session.

## Type d'enregistrement des dépendances

Il existe 3 types d'enregistrement pour les dépendances. Ces types d'enregistrement consistent à la durée de vie de l'instance de la classe qui sera créée lors de l'injection.

- **Transient**

  Une nouvelle instance est créée à chaque fois qu'un objet demande une injection de cette dépendance.

- **Scoped**

  Une seule instance est créée pour toute la durée de vie du **scope**. Tous les objets qui demandent une injection de ce service à l'intérieur du **scope** auront la même instance.

  En application console, le **scope** doit être créé manuellement.

  Par contre, dans le cas d'une application **Blazor Server**, un rafraichissement du navigateur ou un nouvel onglet consiste à un nouveau **scope**. Le changement de page sans rafraichissement du navigateur n'occasionne pas de changement de **scope**. Le **scope** consiste à la création de la requête initiale avec le serveur par le navigateur.

- **Singleton**

  Une seule instance est créée pour toute la durée de vie de l'application.

