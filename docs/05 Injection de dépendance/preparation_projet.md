---
sidebar_position: 3
---

# Structure de base de l'application

## Projet vs solution

Quelle est la différence entre un projet et une solution en **.Net** ?

Il est fréquent en **.Net** de séparer une application en plusieurs projets. Généralement, le projet consiste en une couche logicielle. Cette couche contient le code correspondant au rôle du projet dans l'application. Un projet peut être utilisé dans plusieurs applications.

La solution permet de regrouper plusieurs projets ensemble. La solution n'a pas de logique en soi. Elle permet d'avoir accès à plusieurs projets rapidement. Généralement, la solution contient tous les projets nécessaires à l'application.


Il est possible d'utiliser cette approche avec une application console avec **.NET 7**.

Les prochaines étapes préparent la structure de base du projet **Console** pour être en mesure d'utiliser l'injection de dépendances.

## Préparation du projet

L'application que nous allons construire consiste à la gestion d'une "bd" contenant des univers de personnages (Marvel, DC, TMNT, Power Rangers). 

Afin de structurer notre application console convenablement, il faut mettre en place certains éléments.

Créez un nouveau projet **Application Console**.
<img src="/4N1_2024/img/05_projet_1.png"  />


Nommez le projet **GestionPersonnageApp**.
<img src="/4N1_2024/img/05_projet_2.png"  />


Sélectionnez l'infrastructure **.NET 7.0** et décochez **N'utilisez pas d'instructions de niveau supérieur.**
<img src="/4N1_2024/img/05_projet_3.png"  />


## Installation des librairies

Il faut utiliser la librairie **Microsoft.Extensions.Hosting** pour être en mesure de créer une application avec l'enregistrement de services par injection de dépendances.

L'ajout des librairies se fait par **Nuget**. Il est plus convivial d'utiliser la **Console du Gestionnaire de package**. Elle se retrouve dans le bas de l'écran­. Si l'onglet n'est pas là, allez dans le menu **Affichage -> Autres fenêtres -> Console du Gestionnaire de package**.
<img src="/4N1_2024/img/05_package_console_1.png"  />


Dans la **Console du Gestionnaire de package**, incrivez cette ligne. 

```
Install-Package Microsoft.Extensions.Hosting
```
<img src="/4N1_2024/img/05_package_console_2.png"  />


Lorsque la librairie est installée, elle est maintenant visible dans le dossier **Dépendances -> Packages** du projet de l'**Explorateur de solutions**.

<img src="/4N1_2024/img/05_package_console_3.png"  />


## La classe App

La première partie de code à construire est la classe représentant l'application elle même. Cette classe sert de point de départ de l'application. Cette classe aura pour rôle de rediriger le choix d'une option passée en argument par l'usager vers la bonne fonctionnalité dans le code. 

Créez la classe **App.cs** à la racine du projet.

```csharp showLineNumbers
namespace GestionPersonnageApp;

/// <summary>
/// Classe qui représente la base de l'application console
/// </summary>
public class App
{
    private readonly IServiceProvider _serviceProvider;
    private readonly string[] _args;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="serviceProvider">Fournisser de service pour récuppérer les dépendances</param>
    public App(IServiceProvider serviceProvider)
    {   
        _serviceProvider = serviceProvider;
        
        //Verifie si le programme a des arguments spécifiques
        if(Environment.GetCommandLineArgs().Length > 1)
        {
            //Le programme a des arguments spécifiques
            //Récupère à partir du 2e argument, car le premier est la référence du programme
            _args = Environment.GetCommandLineArgs().ToList().GetRange(1, Environment.GetCommandLineArgs().Length - 1).ToArray();
        }
        else
        {
            //Il n'y a aucun argument spécifique
            //Crée un tableau vide
            _args = new string[0];
        }

    }

    
    /// <summary>
    /// Méthode qui s'occupe du démarrage de l'application
    /// </summary>
    /// <returns>Tâches</returns>
    public async Task DemarrerApplicationAsync()
    {
        //Le point de départ de la logique de l'application
        
    }
}
```

:::note
Remarquez que les variables private sont préfixées par **_**. Cette nomenclature est recommandée par MS
:::


Pour le test initial, insérez le code ci-dessous dans la méthode **`DemarrerApplicationAsync`**.

```csharp
Console.WriteLine("Appuyez sur ENTER pour quitter.");
			
//Demande une touche à l'utilisateur tant que ce n'est pas la touche ENTER
while (Console.ReadKey().Key != ConsoleKey.Enter)
{
    Console.Clear();
    Console.WriteLine("Mauvaise touche. Appuyez sur ENTER pour quitter.");
}

Console.WriteLine("Aurevoir !");
```

La classe **App** a le rôle d'initialiser l'application console en fonction des paramètres reçus. Une application console peut effectuer plusieurs tâches différentes, mais la coordination des tâches doivent se faire dans leur propre classe.

Cette approche permet de respecter le **S** de **SOLID**. Une classe doit avoir une seule responsabilité.

## Fichier Program.cs

Le fichier **Program.cs** sert à configurer et à préparer l'environnement de l'application. C'est aussi d'ici que sera démarrée l'application représentée par App.cs. 

Pour être en mesure de démarrer l'application, il faut ajouter le code ci-dessous dans le fichier **Program.cs**.

Le fichier programme sert à configurer l'application et à enregistrer les services (classes) disponibles pour l'injection de dépendances.

Voici la coquille du fichier.

```csharp showLineNumbers
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

//La variable args sont les arguments du programme. Ils seront accessibles en tout temps à partir de Environment.GetCommandLineArgs()
//À noter que l'index 0 est toujours le nom du DLL exécuté.

//Creation du configurateur de l'application

var builder = Host.CreateDefaultBuilder(args);

//Configuration des services
builder.ConfigureServices((context, services) =>
{
    services.AddTransient<App>(); //Application principale
});

//Création du host de l'application en fonction de sa configuration
var host = builder.Build();

//Démarrage de l'application
App application = host.Services.GetRequiredService<App>();
await application.DemarrerApplicationAsync();
```

:::note
sur la ligne services.AddTransientApp();

App réfère à la classe App
:::

Démarrez le programme pour tester votre code.

Pourquoi ne pas avoir fait ceci à la ligne 21 .

```csharp
App application = new App(host.Services);
```

En utilisant **`host.Services.GetRequiredService<App>();`**, ceci permet de d'injecter automatiquement toutes les dépendances dans le constructeur.

## Arguments du programme

Afin de permettre à l'application d'effectuer plusieurs tâches, il faut passer en arguments différents paramètres. 

Voici comment les arguments sont envoyés par l'invite de commandes. 

```powershell
c:\projet> monprog.exe -univers -afficher
```

Les arguments proviennent de la variable **args** du fichier **Program.cs**. Cette variable est un tableau. L'index 0 correspond à **`-univers`**, l'index 1 correspond  à **`-afficher`**.

La classe **App** dans son constructeur récupère les arguments du programme à la ligne 24. 

```csharp
        _args = Environment.GetCommandLineArgs().ToList().GetRange(1, Environment.GetCommandLineArgs().Length - 1).ToArray();
```

À cette étape, l'index 0 correspond au fichier compilé du programme. Il faut donc l'exclure.

Selon l'option choisie par l'utilisateur, la classe **App** choisira l’action à utiliser. Ce choix se fera dans la méthode **`DemarrerApplicationAsync`**.  Remplacez la méthode avec le code ci-dessous.

```csharp showLineNumbers
public async Task DemarrerApplicationAsync()
{
    //Le point de départ de la logique de l'application

    switch(_args[0].ToLower())
    {
        case "-univers":

            if (_args[1].ToLower() == "-afficher")
            {
                Console.WriteLine("J'affiche les univers.");
            }

            break;

        default:
            Console.WriteLine("Argument non valide");
            break;
    }
}
```

Exécutez l'application. Elle devrait générer une exception à la ligne 5 ci-dessus. La raison est que le programme n' a reçu aucun argument et que le code de sélection en attend. Il faut donc ajouter une vérification si la longueur des arguments n'est pas valide, et avoir une option par défaut si aucun argument n'est spécifié.

Dans notre cas, l'argument par défaut sera **`-aide`**.

Modifiez le constructeur par celui-ci. La ligne 16 sera modifiée pour appliquer le paramètre par défaut.

```csharp showLineNumbers
public App(IServiceProvider serviceProvider)
{
    _serviceProvider = serviceProvider;

    //Verifie si le programme a des arguments spécifiques
    if (Environment.GetCommandLineArgs().Length > 1)
    {
        //Le programme a des arguments spécifiques
        //Récupère à partir du 2e argument, car le premier est la référence du programme
        _args = Environment.GetCommandLineArgs().ToList().GetRange(1, Environment.GetCommandLineArgs().Length - 1).ToArray();
    }
    else
    {
        //Il n'y a aucun argument spécifique
        //Crée un tableau vide
        // highlight-next-line
        _args = new string[] { "-aide" };
    }

}
```

Ajoutez la méthode **`AfficherAide()`** dans la classe App.

```csharp
/// <summary>
/// Méthode qui affiche le message d'aide du programme
/// </summary>    
private void AfficherAide()
{
    Console.WriteLine("Voici les paramètres à utiliser.");
    Console.WriteLine("-aide        Affiche l'aide du programme.");
    Console.WriteLine("-[module] -[tâche]       Permet de sélectionner le module et appliquer une tâche.");
    Console.WriteLine("La liste des modules : univers.");
    Console.WriteLine("La liste des tâches : afficher.");
}
```

Modifiez la méthode **`DemarrerApplicationAsync`** pour ajouter l'option **`-aide`**.

```csharp
public async Task DemarrerApplicationAsync()
{
    //Le point de départ de la logique de l'application

    switch (_args[0].ToLower())
    {
        //highlight-start
        case "-aide":
            AfficherAide();
            break;
        //highlight-end
        case "-univers":

            if (_args[1].ToLower() == "-afficher")
            {
                Console.WriteLine("J'affiche les univers.");
            }

            break;

        default:
            Console.WriteLine("Argument non valide");
            break;
    }

    //Nécéssaire, car il n'y a aucun await dans le code et la méthode est async
    await Task.CompletedTask;
}
```

Démarrez de nouveau l'application. Le message d'aide s'affichera.

### Spécification des arguments en mode développement 
En développement, il est possible de spécifier les arguments. Appuyez sur le bouton **flèche vers le bas** à droite du bouton d'exécution. Ensuite, sélectionnez le menu **Propriétés de débogage de ...**.

<img src="/4N1_2024/img/05_argument_1.png"  />


Dans la zone de texte **Arguments de ligne de commande**, il faut mettre les arguments à utiliser. Appuyez sur le **X** de la fenêtre pour fermer. Il n'y a pas de bouton **OK**.

<img src="/4N1_2024/img/05_argument_2.png"  />


Démarrez le programme et le texte **J'affiche les univers.** s'affichera dans la console.