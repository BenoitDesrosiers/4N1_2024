---
sidebar_position: 135
draft: true
---


# Injection de dépendances

Avant d'introduire la prochaine section, nous devons introduire l'injection de dépendances


https://learn.microsoft.com/fr-fr/dotnet/architecture/modern-web-apps-azure/architectural-principles#dependency-inversion

https://learn.microsoft.com/fr-fr/dotnet/core/extensions/dependency-injection

https://youtu.be/Hhpq7oYcpGE?si=uyluJ3V_JQtpRzX8



## Définition

L’injection de dépendances consiste, pour une classe, à déléguer la création de ses dépendances au code appelant qui va ensuite les injecter dans la classe correspondante. De ce fait, la création d’une instance de la dépendance est effectuée à l’extérieur de la classe dépendante et injectée dans la classe (le plus souvent dans le constructeur mais il existe d’autres possibilités). [source](https://www.softfluent.fr/blog/injection-de-dependances-a-quoi-ca-sert/#:~:text=L'injection%20de%20d%C3%A9pendances%20consiste,injecter%20dans%20la%20classe%20correspondante.)

## Qu'est-ce qu'une dépendance ?

Lorsqu'une fonction dans la classe A fait un new() d'un objet d'une clases B, la classe A devient *dépendante* de la classe B. Si, par exemple, on veut utiliser la classe A dans un autre projet, on doit obligatoirement introduire la classe B dans ce projet aussi. 

Une dépendance est donc toute classe externe utilisée pour créer une instance à l'intérieur de la classe active.

Le mécanisme d'injection de dépendances permet de briser cette relation directe de A vers B. Au lieu d'avoir une relation directe, on aura une relation indirecte permettant d'utiliser n'importe quelle classe qui répondra à la définition (l'interface) de B. Il sera donc possible d'utiliser autre chose que B avec A. 

## Pourquoi opter pour l’injection de dépendances ?

Il y a deux raisons principales : l’utilisation d’abstractions et les tests unitaires.

### Les abstractions
L’abstraction est un des principes fondamentaux de la programmation orientée objet. En suivant ce processus d’abstraction, le développeur masque toutes les informations non pertinentes d’un objet à des fins de simplification et d’efficacité.

Les abstractions sont généralement implémentées en tant que classes ou interfaces abstraites et permettent d’introduire la notion de contrat, dans la syntaxe C# ce sont les interfaces. Ce sont elles qui vont permettre la mise en œuvre du principe d'injection de dépendances.

Lorsque les modules de bas niveau implémentent des interfaces et que ce sont ces interfaces qui sont injectées dans les modules de haut niveau, on ne dépend plus des implémentations (des « détails ») et on peut dès lors « remplacer » une implémentation par une autre tant que la nouvelle implémentation respecte l’abstraction (c’est-à-dire qu’elle implémente l’interface).

On voit que grâce aux abstractions nous avons introduit un découplage des modules (on peut aussi parler de « couplage faible ») et que grâce à cela la modification ou le remplacement d’un module de bas niveau n’a pas d’impact sur les modules qui en dépendent (du moins tant que l’abstraction, le contrat, ne change pas).

### Les tests unitaires

Le deuxième bénéfice principal de l’injection de dépendances réside dans la facilité de rédiger des tests unitaires.

Les tests unitaires sont menés par le développeur lui-même, et consistent à vérifier la bonne exécution des fonctions dont il a la charge. Ces fonctions sont testées de manière indépendante, souvent avec des données réduites. Il est souhaitable de définir très tôt des jeux de tests représentatifs, car le développeur pourra réaliser les tests unitaires sur cette base et la qualité en sera améliorée.

L’objectif d’un test unitaire est donc de tester une « unité de code » dans une situation donnée. Un test unitaire n’a surtout pas pour vocation de tester toute une chaine d’implémentations et notamment les différentes implémentations des dépendances de la classe testée.

En l’absence d’un mécanisme d’injection de dépendances, une des principales difficultés pour écrire des tests unitaires corrects va être de s’affranchir des dépendances de la classe puisqu’elle les instancie elle-même.

[source](https://www.softfluent.fr/blog/injection-de-dependances-a-quoi-ca-sert/#:~:text=L'injection%20de%20d%C3%A9pendances%20consiste,injecter%20dans%20la%20classe%20correspondante.)


## Théorie: interfaces

Les interfaces sont utilisées afin de déconnecter encore plus l'application des classes qui réaliseront les opérations demandées. Une interface définie une suite d'opérations que devront implanter les classes qui respectent cette interface. De cette façon, il est possible de remplacer une classe par une autre, tant qu'elle respecte l'interface. Une interface est, en quelque sorte, un contrat. Les classes indiquent qu'elles implémentent toutes les fonctionnalités définies dans l'interface. Si une classe A utilisant une classe B respectant une interface C, alors A est assurée que toutes les fonctionnalités de C sont implantées dans B. En quelques sortes, une interface définie le **quoi**, alors que la classe qui l'implémente va définir le **comment**. 

:::tip
Il est possible de générer automatiquement l'interface à partir d'une classe avec une action rapide dans Visual Studio. Placez le curseur sur le nom de la classe, faites **CTRL+.** (CTRL et le point) et sélectionnez **Extraire l'interface**. (ou **CTRL+R, CTRL+I**, ou Edition/Refactoriser/Extraire interface)
:::

:::info
En **c#**, si un membre provient de l'interface, il faut seulement le documenter dans l'interface pour respecter le principe **DRY (Don't Repeate Yourself) ou Ne te répète pas.** 
:::


## Comment sera utilisée l'injection de dépendance dans ce projet

Il existe plusieurs façons d'intégrer l'injection de dépendance

Nous utiliserons un hôte générique .NET ([pour plus d'info](https://learn.microsoft.com/fr-fr/dotnet/core/extensions/generic-host?tabs=hostbuilder))

Plus précisément, nous utiliserons un **IHostBuilder**. 

Voici un extrait de la section **Paramètres du générateur d'hôte** de cette page. Nous verrons plus en détails les éléments en gras:

---
* La méthode **CreateDefaultBuilder** :

    * Définit le chemin retourné par GetCurrentDirectory() comme racine de contenu.
    * Charge la configuration de l’hôte à partir de :
      *  Variables d’environnement comportant le préfixe DOTNET_.
      * Arguments de ligne de commande
    * Charge la configuration de l’application à partir de :
      *  **appsettings.json**
      * appsettings.\{Environment}.json
      * Secret Manager quand l’application s’exécute dans l’environnement Development.
      * Variables d'environnement.
      * Arguments de ligne de commande
    * Ajoute les fournisseurs de journalisation suivants :
       * Console
       * Déboguer
       * EventSource
       * EventLog (uniquement en cas d’exécution sur Windows)
    * Active la validation de l’étendue et la validation de dépendances lorsque l’environnement est Development.


* Utilisez la méthode **ConfigureServices** pour ajouter des services à l’instance **Microsoft.Extensions.DependencyInjection.IServiceCollection**. Ces services permettent de créer un **IServiceProvider** utilisé avec l’injection de dépendances pour résoudre les services inscrits.

---

Afin de faire l'injection, nous allons enregistrer une interfaces (**I**) et lui associer une classe (**C**) à injecter. Dans le code, si une fonction requiert un objet du type **I**, alors un objet de la classe **C** sera fourni. Le new est fait par le système d'injection, il n'est donc pas visible dans le code de l'application. 

Par exemple, nous allons enregistrer des Services via leur interface:

```csharp title="Ne pas copier"
services.AddScoped<ICategorieService, CategorieService>();
```

Plus tard, nous définirons une classe pour gérer les catégories. Le constructeur de cette classe indiquera qu'il a besoin de qqchose qui répond à l'interface ICategorieService

```csharp title="Ne pas copier"
public GestionCategorieVM(ICategorieService categorieService)
```

Le système va générer une nouvelle instance (si nécessaire) de la classe qui est présentement associée à **ICategorieService**, c'est à dire: **CategorieService**.

Il est donc très facile de changer la classe associée à ICategorieService. Il suffit de changer la ligne d'association, et tout le code utilisera maintenant une nouvelle classe. (nous verrons que cette technique est utilisée pour faire des tests unitaires)


Dans la section suivante, nous allons mettre en place plusieurs interfaces/classes qui seront par la suite utilisées dans la section WPF. L'injection de dépendances ne sera donc pas directement utilisée dans la partie Core. Elle sera réellement utilisée dans la partie WPF du projet. Mais il faut mettre les choses en place. 

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
