---
sidebar_position: 815
draft: true
---

# Structure d'un test

## Simulacres Mock, Stub et Fake

<!-- à revoir, pas très claire comme explication -->

Le simulacre est une partie essentielle dans les tests. Il permet de créer un faux objet et d'indiquer ce que ses fonctionnalités retourneront comme valeur. Il existe les **Mock** et **Stub**.

Les simulacres sont très pratiques pour les tests unitaires, car il faut prédire le résultat des dépendances de la fonctionnalité à tester.

Voici la différence entre les 2 selon Microsoft.

- **Mock** - Il s’agit d’un objet fictif du système qui détermine la réussite ou l’échec d’un test unitaire. Un simulacre commence comme un faux jusqu’à ce qu’il soit affirmé contre.

- **Stub** - Un stub permet de remplacer de manière contrôlée une dépendance existante (ou collaborateur) dans le système. À l’aide d’un stub, vous pouvez tester votre code sans avoir à gérer directement la dépendance. Par défaut, un stub commence comme un faux.

> Source : https://learn.microsoft.com/fr-ca/dotnet/core/testing/unit-testing-best-practices#lets-speak-the-same-language

Dans la pratique, le simulacre peut faire les 2 rôles en même temps. Il est possible qu'un comportement soit programmé dans le simulacre (**stub**) et de devoir valider (**mock**) des appels de méthodes pour déterminer si le test est un succès ou non. Le terme **Fake** permet d'indiquer que c'est un simulacre, soit un **mock**, soit un **stub** ou les 2 en même temps.

Pour faciliter la création d'un simulacre, il est conseillé d'utiliser des librairies. Sinon, il faudrait créer soi-même des classes simulacres.

Voici des librairies qui sont utiles pour créer des simulacres et vérifier.

- **Moq** 

  Cette librairie est l'une des plus populaires pour les projets **.NET**. Elle permet facilement de créer des simulacres. Elle permet de créer rapidement un objet à partir d'une interface. Dans le cas que l'objet soit créé à partir d'une classe, il faut que la classe soit conçue pour faciliter la réécriture des méthodes à simuler. C’est l'une des raisons que les injections des dépendances sont faites à partir d'une interface la majorité du temps. Même si la librairie s'appelle **Moq** et que l'objet est **Mock\<T\>**, elle permet de faire un **stub** et un **mock**.

  Pour plus d'information : https://github.com/moq/moq4

- **AutoFixture**

  Lorsqu'il faut créer des objets du modèle, il peut être pratique d'utiliser une librairie d'assignation automatique des valeurs aléatoires pour éviter les valeurs par défaut. La librairie **AutoFixture** permet de faire cette tâche pour nous. Cette librairie ne doit pas être utilisée pour de la validation ou pour les tests d'intégration, car il n'est pas possible de s'assurer que l'objet répondra aux critères d'exactitudes des données ou de la non-exactitude. Mais elle est pratique pour tester les méthodes de **mappage**.

  Pour plus d'information : https://github.com/AutoFixture/AutoFixture/
  
- **~~MockQueryable~~**

  Pour être en mesure de simuler le **contexte** de **Entity Framework**, il faut créer la mécanique de construction des requêtes pour que ce soit 		**queryable**. Dans le cas d'une requête asynchrone, il n'est pas possible de le faire directement avec **Moq**. Il faut utiliser une librairie additionnelle. 	Pour faciliter la création d'un objet **queryable**. La librairie **MockQueryable** est un complément à la librairie **Moq**. Cette librairie ne sera pas utilisée pour le **TP 3**, car il n'est plus nécessaire de faire le test unitaire du **repository**.

  Pour plus d'information : https://github.com/romantitov/MockQueryable

## Préparation du test - arrangement

La phase de préparation du test est souvent appelée **arrangement** ou **arrange** en anglais.

Cette phase permet de créer les données de test et les simulacres. 

Les simulacres sont également configurés pour simuler le comportement des méthodes.

Dans cette phase, il faut également créer les objets des résultats attendus si c'est nécessaire.

Pour les éléments répétitifs, il peut être intéressant d'utiliser des méthodes configurées.

## Exécution - action

La phase d'exécution consiste à exécuter les méthodes du test. Cette phase est souvent appelée **action** ou **act** en anglais.

Pour un test unitaire, il y a généralement un seul appel de méthode dans un test unitaire, car c'est la méthode à tester.

Pour un test d'intégration, il est possible d'avoir plusieurs appels de méthode. Par exemple, avant de supprimer un item d'une liste, il faut obtenir la liste, ensuite le sélectionner et finalement le supprimer.

## Résultat du test - assertion

La phase du résultat du test consiste à la logique qui détermine si le test est valide. Cette phase est souvent appelée **assertion** ou **assert** en anglais.

Dans cette phase, le résultat obtenu sera comparé avec le résultat attendu. 

Avec **xUnit**, il faut utiliser la classe **Assert** pour faire une assertion. Pour avoir la liste complète des méthodes d'assertion de **xUnit** : https://xunit.net/docs/comparisons#assertions

Il est possible de comparer un comportement avec **Moq**. La méthode **Verify()** de l'objet **Mock\<T\>** permet de déterminer si une méthode a été exécutée ou non. Pour plus d'information : https://github.com/Moq/moq4/wiki/Quickstart#verification

Pour faciliter la comparaison des objets, la librairie **FluentAssertions** sera utilisée. Cette librairie permet de comparer tout le contenu automatiquement d'un objet et non seulement les adresses des objets. Il manque des méthodes d'assertion utiles dans **xUnit**. Cette librairie permet d'augmenter les capacités d'assertion des tests. Pour plus d'information : https://fluentassertions.com/

## Structure du fichier de test

La librairie **xUnit** n'a pas besoin de mettre une **Annotation** sur la classe pour indiquer que c'est une classe de test.

Il faut nommer la classe avec le nom de la classe à tester et en ajoutant le suffixe **Test**.

Par contre, il faut mettre l'annotation **[Fact]** sur une méthode pour indiquer que c'est un test. Il existe d'autres annotations pour indiquer que la méthode est une méthode de tests. Elles seront présentées lors de la création des premiers tests.

Le nom de la méthode doit être séparé en 3 parties.

- Nom de la méthode à tester
- Nom du cas de test
- Résultat attendu

```c#
public class NomClasseTest
{
    [Fact]
    public void NomMethode_NomCas_Resultat()
    {
		//Arrangement (Arrange)
        /*Ici il faut créer les simulacres et préparer les données de tests*/
        
        //Action (Act)
        /*Ici on exécute la méthode à tester*/
        
        //Assertion (Assert)
        /*Ici on effectue les assertions pour déterminer si le test est un succès*/
    }
}
```
