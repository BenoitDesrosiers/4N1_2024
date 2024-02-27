---
sidebar_position: 10
draft : true
---

# Introduction 

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
