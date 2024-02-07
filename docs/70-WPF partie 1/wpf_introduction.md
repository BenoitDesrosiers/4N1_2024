---
sidebar_position: 110
draft: true
---

# WPF Introduction

Pour faire des applications natives Windows, **.Net** a 3 plateformes principales : **WinForm** , **Universal Windows Platforme (UWP)** et **Windows Presentation Form (WPF)**.

Malgré que **WPF** existe depuis 2006, la plateforme utilise le langage **XAML** pour réaliser les interfaces graphiques. 

Un premier avantage de **XAML** par rapport à **WinForm** est que **XAML** permet d'être facilement [**reactive**](https://fr.wikipedia.org/wiki/Site_web_r%C3%A9actif) (*responsive* en anglais). 

Un deuxième avantage est que les composants sont peuvent être liés (*bindables*) à des propriétés. Il est possible de séparer facilement les classes graphiques de la logique d'interaction.  Il est donc possible d'utiliser des patrons de conception comme **MVVM** facilement.

**XAML** est également utilisé pour la création des interfaces graphiques de **MAUI**, la nouvelle librairie **multiplateforme** de Microsoft.

## Présentation de l'application

L'application permet de gérer les cartes de jeux du style **[Heartstone](https://fr.wikipedia.org/wiki/Hearthstone)** pour des joueurs. Il s'agit du jeu **Super Carte**. Très original comme nom.

Les cartes ont des caractéristiques propres pour déterminer leur pointage de vie, d’armure et de force.

Chaque joueur possède des cartes qui lui permettront de jouer des parties. Les joueurs peuvent visualiser leurs propres cartes et également toutes les cartes du système.

Les administrateurs de l'application sont en mesure de créer de nouvelles cartes. Les cartes appartiennent à un ensemble de cartes. Périodiquement, les administrateurs créent un nouvel ensemble de cartes.

## Structure de l'application

L'application **SuperCarteApp** qui sera créée aura 3 projets.

- **SuperCarte.WPF**

  Ce projet consiste à l'interface visuelle **UI** de l'application. Il contient également la structure **MVVM** pour gérer les interactions avec l'interface graphique.

- **SuperCarte.Core**

  Ce projet consiste à la logique de l'application. Il contient les classes de type **Service**, de type **Repository**, de type **Validateur** et les classes du modèle du domaine.

- **SuperCarte.EF**

  Ce projet consiste à la communication avec la base de données. Il contient le **contexte** et les classes du modèle de données.

## Concepts présentés

Dans ce document, vous allez créer une base de données en **Code First** à partir du **contexte**.

Ensuite, vous allez créer un **Repository** générique pour optimiser la réutilisation de code.

Finalement, vous allez créer la base du projet **WPF** pour intégrer le fichier de configuration et l'injection de dépendances.

# Approche Code First du Contexte

Pour ce projet, l'approche **Code First** sera utilisée pour créer le contexte.

L'avantage du **Code First** est que la base de données se met à jour par **migration**. La **migration** consiste à générer des fichiers de création et de mise à jour de la base de données à partir du code de programmation. Dans ce projet, ce sera du **C#**. Ce code est facilement intégrable à **Git** et se partage facilement entre les membres de l'équipe. Un fichier de **migration** contient le code pour appliquer les modifications et le code pour les annuler. Il est donc facile de faire des retours en arrière et de se mettre rapidement à une version spécifique de la base de données. Il suffit d'exécuter la dernière version des fichiers de migration pour avoir la base de données à jour. Il est également possible de revenir à une ancienne version facilement en exécutant le fichier de migration correspondant.

Un autre avantage est qu'il est possible de créer le contexte selon des standards internes. Par exemple, la pluralisation ne fonctionne pas bien en français. Il est donc possible de mettre un préfixe ou un suffixe à des éléments pour différencier une référence unitaire ou une collection.

:::danger Attention
Il est important que **la base de données n'existe pas** dans votre **SQL Server** lors de l'exécution de la première migration.
:::

Le site **Entity Framework Tutorial** (anglais seulement) explique plusieurs éléments du fonctionnement du contexte. C'est un très bon tutoriel. **https://www.entityframeworktutorial.net/efcore/entity-framework-core.aspx** 

Voici le site officiel de Microsoft pour la migration de **Entity Framework Core**. **https://learn.microsoft.com/fr-ca/ef/core/managing-schemas/migrations/?tabs=vs** 

L'approche utilisée dans ce document pour gérer la migration est d'utiliser directement la librairie de classe. La migration sera indépendante du projet **exécutable** (WPF, WinForm, Console, ASP.NET MVC, Blazor...). Cette approche doit ajouter des configurations dans le contexte, mais permet d'être indépendant de l'exécutable. Il est possible pour un programmeur de gérer la base de données sans avoir accès à la solution complète. L'approche présentée dans ce document nécessite de spécifier **une chaine de connexion en mémoire**, mais elle ne nécessite pas un projet de démarrage.

Il est possible de gérer la migration à partir du projet **exécutable**. L'avantage d'avoir un projet exécutable lors de la mise en place de la migration est qu'il est possible d'utiliser le fichier de configuration du projet pour se synchroniser avec la base de données. **Par contre**, la mise en place d'un projet démarrable peut demander du temps. Si le projet démarrable est mal configuré, la migration ne fonctionnera pas. Il est possible que la solution possède plusieurs projets de démarrage (WPF et API). Il faut donc que chacun des projets soit en mesure de gérer la migration. 


