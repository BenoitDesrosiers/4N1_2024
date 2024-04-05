---
sidebar_position: 810
draft: false
---

# Introduction

Pour s'assurer de la qualité du logiciel, il faut effectuer des tests.

Il existe plusieurs catégories de tests.

Les tests unitaires servent à vérifier une méthode précise d'une classe et de s'assurer que le résultat ou le comportement attendu est valide.

Les tests d'intégration servent à vérifier l'interaction entre plusieurs modules et fonctions et de s'assurer que le résultat final est valide.

Les tests bout en bout (end to end : e2e) servent à vérifier que le logiciel fonctionne de l'interface utilisateur à la base de données ou aux autres systèmes.

Les tests d'acceptation servent à vérifier que le logiciel répond aux spécifications logicielles énoncées par le client.


Voici un bon article de **Microsoft** pour les bonnes pratiques des tests : https://learn.microsoft.com/fr-ca/dotnet/core/testing/unit-testing-best-practices

Ce document est une référence théorique. La librairie présentée n'est pas celle utilisée.

## Librairies de test

L'utilisation d'outils de test n'est pas obligatoire, mais fortement conseillée.

Il est possible de faire des tests manuellement. Par contre, il faut faire les tests en suivant un guide précis et un humain doit faire les actions à chaque fois. Cette approche est très couteuse et le risque d'erreur est très élevé, car il est possible que le test #1 ne soit pas fait de la même façon à chaque fois.

L'avantage d'automatiser les tests avec une librairie est qu'ils sont facilement exécutables et permet de tester le logiciel sur demande.

Avant chaque déploiement, l'ensemble des tests sont exécutés. Il est possible de vérifier si le code a été altéré et que le comportement attendu n'est plus le même.

Le gros problème avec les tests automatisés est que le programmeur a tendance à faire de faux positifs. Le test programmé ne teste rien et est l'équivalent de s'assurer que **true == true**. Il faut s'assurer que le test a une valeur réelle.

Il existe 3 librairies populaires pour faire les tests dans un environnement **.Net**.

- **MSTest**
- **NUnit**
- **xUnit**

Dans le cours de **Native III**, ce sera l'outil **xUnit** qui sera utilisé. Il est déjà intégré à Visual Studio.

Pour plus d'information sur **xUnit** : https://xunit.net/

## Plan de test

Avant de débuter la conception des tests, il faut faire l'inventaire de ce qu'il faut tester.

Beaucoup d'éléments de la liste proviendront de l'analyse, car pour les tests d'intégration et e2e, c'est généralement des cas d'utilisation.

À cette étape, il ne faut pas penser comment le test sera effectué, mais de penser ce qu'il faut tester.

Il est important de prioriser les tests, car malheureusement, il arrive souvent que les tests ne soient pas l'élément le plus important dans un projet et que l'enveloppe budgétaire de celle-ci soit limitée.

Prenez par exemple un magasin en ligne.

Le logiciel permet de créer des catégories de produit, des produits, un inventaire sur les produits, d'ajouter des produits dans le panier d'achats et de faire un achat.

Si le budget est limité, le module d'inventaire, le panier d'achats et faire l'achat seront prioritaire, car ces fonctionnalités font partie du coeur du système.

Par la suite, pour chacun des items du plan, il faut déterminer comment il sera testé.

## Classe à tester

Il ne faut pas tester les librairies externes, car c'est la responsabilité du propriétaire de la librairie d'effectuer les tests.

Il n'est pas nécessaire de tester le **contexte** de **EntityFramework**, car **Microsoft** s'en occupe. Également, **FluentValidation** n'est pas à tester.

Par contre, il faut tester les classes qui les utilisent.

Dans cette application, il faudrait tester du **Repository** au **ViewModel**. Il ne faut pas oublier les extensions pour le **mappage** et les validateurs du modèle du domaine.

Il n'y a rien à tester dans le modèle du domaine et de données, car ce sont des classes qui contiennent uniquement des propriétés. Il n'y a aucune logique. S'il y avait des méthodes d'assignation, il faudrait les tester pour s'assurer que l'assignation se fait adéquatement.

## Test unitaire, Test d'intégration et Test bout en bout (e2e)

Un test unitaire consiste à tester un élément isolé d'une classe. Toutes les dépendances de la classe doivent être simulées pour s'assurer du comportement du test. Si la dépendance n'est pas simulée, il est possible qu'elle soit problématique. Donc le test pourrait être un faux positif ou un faux négatif.

Par exemple, il faut tester l'ajout d'un item dans un service. Le service doit valider l'objet avant de l'ajouter. L'objet de test créé par le testeur est considéré valide. Donc il n'est pas nécessaire de le valider, car il faut tester la séquence de l'ajout. Est-ce que la validation a eu lieu.  Dans le cas qu'il est valide, il doit appeler le **Repository**. Dans le cas qu'il n'est pas valide, il ne doit pas l'appeler. Donc si le vrai validateur est utilisé, il est possible qu'il y ait un bug. Ce sera le test unitaire du validateur qui déterminera si la validation fonctionne adéquatement. Pour le test unitaire du service, il faut tester le cas objet valide et objet non valide. Le simulacre du validateur sera configuré pour indiquer que l'objet est valide ou non selon le test.

Pour un test d'intégration, il faut que les classes communiquent réellement entre elles pour s'assurer que la séquence fonctionne correctement. Il est possible d'utiliser des simulacres pour certains composants qui sont liés à l'interface visuelle. Un test d'intégration complet débute de la couche présentation à la base de données. Dans le cas d'une application **WPF**, la couche de présentation est le **ViewModel**. Le test doit communiquer avec une base de données. Il est important d'avoir un contrôle sur les données de la base de données, car il faut s'assurer du résultat du test. Les tests d'intégration sont généralement liés au cas d'utilisation. En effectuant une action, est-ce que tous les résultats attendus sont valides. Ces tests peuvent être très complexes à programmer et à valider. Il est important de faire les tests les plus granulaires possibles.

Un test bout en bout ou **e2e** est un test qui permet de simuler les interactions d'un utilisateur et de vérifier le comportement. Dans la mesure du possible, il est préférable de tester à partir de l'interface visuelle. Selon la technologie utilisée, il peut être plus ou moins facile de faire ces tests.

Il arrive parfois que le test d'intégration effectue un peu de **e2e** en même temps. Avec le **ViewModel**, il est possible de simuler des actions de l'utilisateur sans avoir besoin de l'interface visuelle. Un test d'intégration **pur** fait l'action le plus directement possible et valide uniquement le résultat dans la base de données. Les exemples des tests d'intégration de ce projet adoptent un peu de **e2e**, car il y aura des assertions sur le comportement des propriétés de liaison.

## Validité d'un test

Pour s'assurer que la vérification du résultat du test fonctionne, il doit détecter une erreur dans le résultat ou dans le comportement. Donc en principe, si on introduit volontairement un **bug** dans une méthode, au moins un des tests de cette méthode doit le détecter. Si aucun test ne le détecte, il est possible que l'affirmation ne soit pas adéquate ou qu'il manque un cas de test.

Dès qu'une méthode est modifiée, il faut s'assurer que la couverture de test est toujours adéquate.

Dans le cas d'un test comportemental, il est possible qu'un test soit en erreur après une modification, mais que la méthode soit correcte. Ceci indique au testeur qu'il y a eu une modification dans la méthode. Est-ce que le nouveau comportement est valide ou c'est une erreur du programmeur ? Il faut analyser le code et déterminer s'il faut mettre le test à jour ou non.

Par exemple, il faut envoyer un courriel au directeur à chaque fois qu'un étudiant échoue un cours. Il faut un test qui vérifie que l'envoi de courriel est bien exécuté dans le service. Le directeur considère qu'il a trop de courriel, il ne souhaite plus recevoir ce courriel. Le service est modifié pour retirer la méthode d'envoi de courriel. Le test va détecter que l'envoi de courriel n'est pas appelé, il sera donc en erreur. Mais il s'agit d'un nouveau comportement. Le test doit être mis à jour pour tenir compte de la nouvelle réalité. À l'inverse, l'équipe de développement a mis en commentaire cette ligne de code pour faire des tests du logiciel, car il ne souhaite pas envoyer un courriel dans les tests d'exécution. Mais cette ligne a été oubliée et elle est toujours en commentaire. Le test va le détecter.

### Caractéristiques d’un bon test

Voici ce que Microsoft recommande pour les tests.

- **Rapide** : il n’est pas rare que les projets matures aient des milliers de tests unitaires. L’exécution des tests unitaires doit prendre peu de temps. Millisecondes.
- **Isolé** : les tests unitaires sont autonomes, peuvent être exécutés isolément et n’ont aucune dépendance vis-à-vis de facteurs externes tels qu’un système de fichiers ou une base de données.
- **Reproductible** : l’exécution d’un test unitaire doit être cohérente avec ses résultats, c’est-à-dire qu’elle retourne toujours le même résultat si vous ne modifiez rien entre les exécutions.
- **Auto-vérification** : le test doit être en mesure de détecter automatiquement s’il a réussi ou échoué sans aucune interaction humaine.
- **Temps opportun** : l’écriture d’un test unitaire ne doit pas prendre beaucoup de temps par rapport au code testé. Si vous trouvez que le test du code prend beaucoup de temps par rapport à son écriture, optez pour une conception plus facile à tester.

> Source : https://learn.microsoft.com/fr-ca/dotnet/core/testing/unit-testing-best-practices#characteristics-of-a-good-unit-test

## Explorateur de tests dans Visual Studio

Pour avoir accès à la fenêtre **Explorateur de tests** dans Visual Studio, il fait aller dans le menu **Affichage -> Explorateur de tests** ou **CRTL+T,E**.

<!--img src="./image/19_explorateur_tests_1.png" style="zoom:200%;" / -->

Cette fenêtre permet de contrôler les tests.

Il est possible d'exécuter tous les tests, ou un à la fois.

Il est possible d'exécuter un test en mode **debug** pour être en mesure de visualiser les points d'arrêt et d'analyser le test.

Chaque test indique un résultat. S'il est en **rouge**, il est possible de voir l'assertion invalide ou l'exception générée dans le **Récapitulatif** du test.


