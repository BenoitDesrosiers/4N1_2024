---
sidebar_position: 210
draft: true
---

# Intro à XAML et MVVM

Dans ce document,  l'application aura ses premières interfaces visuelles. Les interfaces seront des listes d'éléments.

Il sera possible de faire quelques opérations avec la base de données, dont la récupération des données et la suppression.

La coordination de l'interface graphique se fera avec le patron de conception **Model-View-ViewModel** ou **MVVM**. 

Finalement, l'interface graphique utilisera des fichiers ressources pour la traduction du logiciel. 

## XAML

**XAML** est un langage par balise pour créer des interfaces graphiques. Ce langage n'est pas utilisé uniquement par **WPF**. Par contre, même si d'autres plateformes comme **MAUI** utilise **XAML**, ce ne sont pas nécessairement les mêmes composants qui sont disponibles dans la librairie. Il faut s'assurer que le composant est disponible avec la librairie visuelle utilisée. Heuseureusement, les principaux composants fonctionnent de la même façon.

Plusieurs concepts sont inspirés du **HTML**, mais ce langage est tout de même très différent du **HTML**.

**Visual Studio** permet de créer l'interface graphique sans toucher au code **XAML**. Il est possible de faire du **drag and drop** des composants dans l'interface visuelle et de modifier les propriétés à partir de la fenêtre de propriétés.

Le site **WPF Tutorial** (https://wpf-tutorial.com/) explique le fonctionnement de plusieurs composants. Le site a une version en français qui est traduite par la communauté (https://wpf-tutorial.com/Localization/LanguageStatus/fr/) . Il y a beaucoup de publicité, mais c'est une très bonne source d'information.

## Patron MVVM

Le patron **Model-View-ViewModel** ou **MVVM** fait partie de la grande famille des patrons de conception pour la séparation de l'interface graphique et la logique applicative. **MVC** et **MVP** sont d'autres patrons de la même famille.

**MVVM** a été inventé par Microsoft  vers 2005 pour faciliter le développement des applications **WPF** et **Silverlight**. Aujourd'hui, le patron est utilisé avec d'autres technologies. Par exemple, il est possible de l'utiliser avec **Blazor**.

Le **MVVM** est séparé en 3 concepts.

- **Model** ou modèle

  Le modèle est la classe qui contient les données du logiciel qui doivent être affichées à l'utilisateur. Ce sont généralement les classes du modèle du domaine qui sont utilisées.

- **View** ou vue

  La vue consiste à l'interface utilisateur. Dans le concept **MVVM** pur, il ne devrait avoir aucun code dans la vue. Mais d'un point de vue pratique, il arrive parfois de mettre un peu de logique dans la vue pour faciliter l'interaction de l'interface utilisateur.

- **ViewModel** ou ModèleVue

  Le terme **ViewModel** sera utilisé dans ce cours. Il ne se traduit pas très bien en français.

  Le **ViewModel** contient la logique d'interaction de la vue. Il est dans la famille **contrôleur**. Son rôle est de coordonner l'interface utilisateur et de fournir les états et les valeurs aux composants visuels. Chaque **Vue** utilise un **ViewModel**

  Le **ViewModel** publie des propriétés que les composants visuels utilisent par liaison. 

  Lorsqu'une valeur d'un composant est modifiée dans l'interface visuelle, la liaison met automatiquement à jour le modèle. 

  Lorsqu'une valeur du modèle est modifiée, la liaison met automatiquement à jour l'interface visuelle par notification.

  Le principe de liaison est également utilisé par **Angular** et **Blazor**.

  Le **ViewModel** reçoit une commande, un événement ou un appel de méthodes pour effectuer des actions qui provient de l'interface utilisateur pour initier une action. Le **ViewModel** utilise les **Services** de l'application.

  Il y a beaucoup d'exemple sur internet que le **ViewModel** utilise directement le **Repository** et qu'il a y un peu plus de logique dans le **ViewModel**. Cette approche n'est pas mauvaise, car le **ViewModel** est facilement testable. Par contre, il est possible de modifier un même type d'enregistrement dans plusieurs **vues** différentes. Il faut s'assurer que la logique de modification est la même dans tous les **ViewModels**. En utilisant un **Service**, la logique est à un seul endroit.

En séparant la **Vue** et la logique de coordination, il est très facile de modifier l'interface visuelle sans trop de conséquences. Le **ViewModel** ne connait pas la **Vue**, donc la logique de coordination reste la même, peu importe si la **Vue** utilise un **ListView**, un **DataGrid** ou un composant maison.

De plus, le plus grand avantage est qu'il est possible des faires des tests automatisés avec le **ViewModel**. Par exemple, si aucun item n’est sélectionné dans la liste, il n'est pas possible de faire la suppression. Il est possible de tester ce cas, car la coordination se fait dans une classe indépendante.

Pour avoir une définition théorique, voici 2 liens Microsoft. Ce n'est pas pour **WPF**, mais les concepts restent les mêmes.

Pour UWP : https://learn.microsoft.com/fr-fr/windows/uwp/data-binding/data-binding-and-mvvm

Pour MAUI : https://learn.microsoft.com/fr-ca/dotnet/architecture/maui/mvvm

Wiki : https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel

### Modèle du domaine ou modèle de données

Il n'est pas recommandé d'utiliser un objet du modèle de données (EF) pour l'interaction utilisateur. Le **ViewModel** ne doit pas les utiliser. Il arrive souvent que le modèle de données soit pratiquement identique au modèle du domaine dans ses propriétés, il est donc tentant d'utiliser directement l'objet du modèle de données.

L'objet du modèle de données est surveillé par le contexte qui l'a créé tant que le contexte est actif. Si l'objet est modifié, l'objet sera pris en considération si son instance dans le contexte se met à jour par la méthode **SaveChanges()** et cela même s'il n'aurait pas du être modifié dans la bd.

Pour faciliter la conversion entre les différents types de **modèles**, il est possible d'utiliser une librairie **Mapper**. Pour ce projet, ce sera des **extensions** qui s'occuperont de faire la transition entre les 2 types de modèles.

