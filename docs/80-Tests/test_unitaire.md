---
sidebar_position: 820
draft: true
---

# Tests unitaires

Vous devez créer un nouveau projet de type **xUnit** dans votre solution.

Nommez le projet **SuperCarte.UTest** et utilisez **.NET 7**. Le **U** est pour **Unitaire**.

## Modification de la cible du projet

Il faut modifier la cible du projet. Le projet **UTest** utilisera le projet **.WPF** qui est disponible uniquement pour **Windows**.

Effectuez un double-clic sur l'entête du projet **SuperCarte.UTest** pour voir le **XML** de configuration.

Vous devez modifier la balise **` <TargetFramework>net7.0</TargetFramework>`** par **` <TargetFramework>net7.0-windows</TargetFramework>`**. Enregistrez le fichier.

Dans l'exemple ci-dessous, la balise est à la ligne 4.

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net7.0-windows</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>

    <IsPackable>false</IsPackable>
  </PropertyGroup>
  /* **** */
</Project>
```

Supprimez la classe **UnitTest1.cs**.

## Ajout des dépendances des projets

Effectuez un clic-droit sur le dossier **Dépendances** du projet **SuperCarte.UTest**. Sélectionnez **Ajouter une référence de projet...**.

Cochez **SuperCarte.WPF**, **SuperCarte.Core** et **SuperCarte.EF**.

Compilez le projet. Si vous avez les erreurs ci-dessous, l'étape 9.1 n'a pas été faite correctement.

```
Gravité	Code	Description	Projet	Fichier	Ligne	État de la suppression
Erreur	NETSDK1005	Le fichier de composants \SuperCarteApp\SuperCarte.ITest\obj\project.assets.json' n'a aucune cible pour 'net7.0'. Vérifiez que la restauration s'est exécutée et que vous avez inclus 'net7.0' dans TargetFrameworks pour votre projet.	SuperCarte.Test	C:\Program Files\dotnet\sdk\7.0.102\Sdks\Microsoft.NET.Sdk\targets\Microsoft.PackageDependencyResolution.targets	267	

Gravité	Code	Description	Projet	Fichier	Ligne	État de la suppression
Erreur		Le projet « ..\SuperCarte.WPF\SuperCarte.WPF.csproj » cible « net7.0-windows ». Il ne peut pas être référencé par un projet qui cible « .NETCoreApp,Version=v7.0 ».	SuperCarte.Test	C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Current\Bin\amd64\Microsoft.Common.CurrentVersion.targets	1830	
```

## Installation des librairies

Il faut installer les librairies qui seront utiles pour les tests.

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. Il est important que le **Projet par défaut** **.UTest** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.UTest**.

La librairie pour créer des simulacres **Moq**.

```
Install-Package Moq
```

La librairie **AutoFixture** pour créer des objets avec des valeurs.

```
Install-Package AutoFixture
```

La librairie pour faciliter les assertions **FluentAssertions**.

```
Install-Package FluentAssertions
```

## Structures des dossiers et fichiers

Afin de se retrouver dans les tests, il faut créer une structure de dossiers qui représentent les projets.

Créez la structure ci-dessous dans le projet **SuperCarte.UTest**.

```
Core
├── Extensions
├── Services
├── Validateurs
WPF
├── ViewModels
```

Il faudrait également créer un dossier **Core\Repositories** pour les tests unitaires des **repositories**. 

Par exemple, les tests unitaires de la classe **RoleService** dans être dans la classe **RoleServiceTest** et être dans le dossier **Unitaires\Core\Services**.

# Exemple de tests unitaires

**Vous ne pouvez pas reprendre la même méthode pour le TP 3**, à l'exception du validateur.

Pour chacune des classes testées unitairement, il faut créer une classe avec le même nom et en ajoutant le suffixe **Test**.

## Tester une extension

Il n'est pas demandé de tester une extension dans le **TP 3**. Cette exemple est pour comprendre le fonctionnement du test.

Créez la classe **UtilisateurMapExtensionTest.cs** dans le dossier **Core\Extensions**.

```c#
namespace SuperCarte.UTest.Unitaires.Core.Extensions;

/// <summary>
/// Tests unitaires pour la classe UtilisateurMapExtension
/// </summary>
public class UtilisateurMapExtensionTest
{
	
}
```

### Test VersUtilisateurModel - Version 1

Il faut s'assurer que toutes les propriétés identiques de la classe **Utilisateur** sont identiques dans le nouvel objet **UtilisateurModel**.

Le nom du test est **VersUtilisateurModel_CreerObjet_ValeursIdentiques**.

- La méthode : VersUtilisateurModel
- Le cas : CreerObjet
- Le résultat : ValeursIdentiques

```c#
[Fact]
public void VersUtilisateurModel_CreerObjet_ValeursIdentiques1()
{
	//Arrangement (Arrange)
    
    //Action (Act)
    
    //Assertion (Assert)
}
```

Premièrement, il faut créer l'objet **Utilisateur** à convertir et les constantes pour les valeurs. Il est préférable d'utiliser des constantes au lieu de recopier les valeurs pour éviter les erreurs de copie.

```c#
[Fact]
public void VersUtilisateurModel_CreerObjet_ValeursIdentiques1()
{
    //Arrangement (Arrange)
    const int utilisateurId = 9000;
    const string prenom = "TestPrenom";
    const string nom = "TestNom";
    const string nomUtilisateur = "TestNomUtilisateur";
    const string motPasseHash = "TestHash";
    const int roleId = 71;
    
    Utilisateur utilisateur = new Utilisateur()
    {
        UtilisateurId = utilisateurId,
        Prenom = prenom,
        Nom = nom,
        NomUtilisateur = nomUtilisateur,
        MotPasseHash = motPasseHash,
        RoleId = roleId
    };

    //Action (Act)

    //Assertion (Assert)
}
```

Ensuite, il faut appeler la méthode à tester. Le nom de la variable qui est retourné par le test possède le suffixe **Actuel** **(Actual)**.

```c#
[Fact]
public void VersUtilisateurModel_CreerObjet_ValeursIdentiques1()
{
    //Arrangement (Arrange)
    const int utilisateurId = 9000;
    const string prenom = "TestPrenom";
    const string nom = "TestNom";
    const string nomUtilisateur = "TestNomUtilisateur";
    const string motPasseHash = "TestHash";
    const int roleId = 71;
    
    Utilisateur utilisateur = new Utilisateur()
    {
        UtilisateurId = utilisateurId,
        Prenom = prenom,
        Nom = nom,
        NomUtilisateur = nomUtilisateur,
        MotPasseHash = motPasseHash,
        RoleId = roleId
    };

    //Action (Act)
    UtilisateurModel utilisateurModelActuel = utilisateur.VersUtilisateurModel();

    //Assertion (Assert)
}
```

Finalement, il faut mettre les assertions. Il faut comparer toutes les propriétés.

```c#
[Fact]
public void VersUtilisateurModel_CreerObjet_ValeursIdentiques1()
{
   //Arrangement (Arrange)
   const int utilisateurId = 9000;
   const string prenom = "TestPrenom";
   const string nom = "TestNom";
   const string nomUtilisateur = "TestNomUtilisateur";
   const string motPasseHash = "TestHash";
   const int roleId = 71;
   
   Utilisateur utilisateur = new Utilisateur()
   {
       UtilisateurId = utilisateurId,
       Prenom = prenom,
       Nom = nom,
       NomUtilisateur = nomUtilisateur,
       MotPasseHash = motPasseHash,
       RoleId = roleId
   };

   //Action (Act)
   UtilisateurModel utilisateurModelActuel = utilisateur.VersUtilisateurModel();

   //Assertion (Assert)
   Assert.Equal(utilisateurId, utilisateurModelActuel.UtilisateurId);
   Assert.Equal(prenom, utilisateurModelActuel.Prenom);
   Assert.Equal(nom, utilisateurModelActuel.Nom);
   Assert.Equal(nomUtilisateur, utilisateurModelActuel.NomUtilisateur);
   Assert.Equal(roleId, utilisateurModelActuel.RoleId);
}
```

Exécutez le test. Il sera réussi.

Pour s'assurer qu'il fonctionne bien, modifiez temporairement la méthode de **VersUtilisateurModel** la classe **UtilisateurMapExtension** pour le code ci-dessous. Il faut retirer la copie du champ **Prenom**.

```c#
public static UtilisateurModel VersUtilisateurModel(this Utilisateur item)
{
    return new UtilisateurModel()
    {
        UtilisateurId = item.UtilisateurId,
        //Prenom = item.Prenom,
        Nom = item.Nom,
        NomUtilisateur = item.NomUtilisateur,            
        RoleId = item.RoleId
    };
}
```

Exécutez le test. Il sera en échec. Le message est de l'échec est celui-ci.

```
Message: 
Assert.Equal() Failure
Expected: TestPrenom
Actual:   (null)
```

Remettez la méthode **VersUtilisateurModel** à son état original.

```c#
public static UtilisateurModel VersUtilisateurModel(this Utilisateur item)
{
    return new UtilisateurModel()
    {
        UtilisateurId = item.UtilisateurId,
        Prenom = item.Prenom,
        Nom = item.Nom,
        NomUtilisateur = item.NomUtilisateur,            
        RoleId = item.RoleId
    };
}
```

Mettez ce test en commantaire.

### Test VersUtilisateurModel - Version 2

Le problème avec la version précédente est si un nouveau champ est ajouté dans les modèles, mais qu'il n'est pas copié, le test va tout de même fonctionner.

Ajoutez la propriété ci-dessous dans la classe **Utilisateur** et **UtilisateurModel**.

```c#
public string PropTest { get; set; } = null!;
```

Exécutez de nouveau le test 1. Il sera un succès. La première raison qu'il est réussi est que la propriété n'a pas été assignée dans le test.

Modifiez la méthode par celle-ci. La nouvelle propriété a été ajoutée (lignes 11 et 21). Le test est maintenant en encore un succès lors de son exécution. La raison est qu'il manque une assertion sur ce champ.

```c#
[Fact]
public void VersUtilisateurModel_CreerObjet_ValeursIdentiques()
{
    //Arrangement (Arrange)
    const int utilisateurId = 9000;
    const string prenom = "TestPrenom";
    const string nom = "TestNom";
    const string nomUtilisateur = "TestNomUtilisateur";
    const string motPasseHash = "TestHash";        
    const int roleId = 71;
    const string propTest = "TestPropTest"; //Ajout
       
    Utilisateur utilisateur = new Utilisateur()
    {
        UtilisateurId = utilisateurId,
        Prenom = prenom,
        Nom = nom,
        NomUtilisateur = nomUtilisateur,
        MotPasseHash = motPasseHash,
        RoleId = roleId,
        PropTest = propTest //Ajout
    };

    //Action (Act)
    UtilisateurModel utilisateurModelActuel = utilisateur.VersUtilisateurModel();

    //Assertion (Assert)
    Assert.Equal(utilisateurId, utilisateurModelActuel.UtilisateurId);
    Assert.Equal(prenom, utilisateurModelActuel.Prenom);
    Assert.Equal(nom, utilisateurModelActuel.Nom);
    Assert.Equal(nomUtilisateur, utilisateurModelActuel.NomUtilisateur);
    Assert.Equal(roleId, utilisateurModelActuel.RoleId);
}
```

Modifiez la méthode par celle-ci. Il y a maintenant l'assertion à la ligne 33.

```c#
[Fact]
public void VersUtilisateurModel_CreerObjet_ValeursIdentiques()
{
    //Arrangement (Arrange)
    const int utilisateurId = 9000;
    const string prenom = "TestPrenom";
    const string nom = "TestNom";
    const string nomUtilisateur = "TestNomUtilisateur";
    const string motPasseHash = "TestHash";        
    const int roleId = 71;
    const string propTest = "TestPropTest"; //Ajout
       
    Utilisateur utilisateur = new Utilisateur()
    {
        UtilisateurId = utilisateurId,
        Prenom = prenom,
        Nom = nom,
        NomUtilisateur = nomUtilisateur,
        MotPasseHash = motPasseHash,
        RoleId = roleId,
        PropTest = propTest //Ajout
    };

    //Action (Act)
    UtilisateurModel utilisateurModelActuel = utilisateur.VersUtilisateurModel();

    //Assertion (Assert)
    Assert.Equal(utilisateurId, utilisateurModelActuel.UtilisateurId);
    Assert.Equal(prenom, utilisateurModelActuel.Prenom);
    Assert.Equal(nom, utilisateurModelActuel.Nom);
    Assert.Equal(nomUtilisateur, utilisateurModelActuel.NomUtilisateur);
    Assert.Equal(roleId, utilisateurModelActuel.RoleId);
    Assert.Equal(propTest, utilisateurModelActuel.PropTest);
}
```

Est-ce un bon test ? Il faut s'assurer à chaque fois que le modèle est modifié de se souvenir de modifier ce test. En cas d'oubli, le test indique que tout est beau, car la propriété n'est pas dans l'assertion, mais dans la réalité, il y a une problématique. Si la méthode **VersUtilisateurModel** a un bug, il est possible que ce ne soit pas détecté.

Créez la méthode version 2. Cette version du test sera automatiquement évolutive. En cas de modification du modèle, il sera toujours fonctionnel.

En premier lieu, la librairie **FluentAssertions** permet de comparer les propriétés de 2 objets pour vérifier qu'ils sont identiques. Il n'est pas nécessaire que les objets soient du même type, mais les propriétés doivent avoir le même nom.

À la ligne 26, la méthode **`utilisateurModelActuel.Should().BeEquivalentTo(utilisateur);`** permet de comparer un **UtilisateurModel** avec un **Utilisateur** comme référence. Par contre, la classe **Utilisateur** a des propriétés supplémentaires (Navigations et MotPasseHash). Il faut ajouter l'option **`options => options.ExcludingMissingMembers()`** pour faire la comparaison uniquement avec les propriétés identiques. Maintenant, l'assertion est évolutive. En ajoutant une propriété dans le modèle de données et du domaine, il ne sera pas nécessaire de l'ajouter.

```c#
[Fact]
public void VersUtilisateurModel_CreerObjet_ValeursIdentiques2()
{
    //Arrangement (Arrange)
    const int utilisateurId = 9000;
    const string prenom = "TestPrenom";
    const string nom = "TestNom";
    const string nomUtilisateur = "TestNomUtilisateur";
    const string motPasseHash = "TestHash";
    const int roleId = 71;

    Utilisateur utilisateur = new Utilisateur()
    {
        UtilisateurId = utilisateurId,
        Prenom = prenom,
        Nom = nom,
        NomUtilisateur = nomUtilisateur,
        MotPasseHash = motPasseHash,
        RoleId = roleId
    };

    //Action (Act)
    UtilisateurModel utilisateurModelActuel = utilisateur.VersUtilisateurModel();

    //Assertion (Assert)
    utilisateurModelActuel.Should().BeEquivalentTo(utilisateur, options => options.ExcludingMissingMembers());
}
```

Exécutez le test et c'est un succès. Il devrait échouer, car le correctif n'a pas été fait dans la méthode **`VersUtilisateurModel()`**.

La raison est que la propriété **PropTest** n'a pas été assignée dans l'arrangement. Donc, la propriété à la valeur par défaut. Et la comparaison est identique, car dans la méthode à tester, il n'y a pas d'assignation également. C'est donc une vérification de valeur par défaut à valeur par défaut, donc la comparaison est valide.

Modifiez la méthode par celle-ci. Les lignes 11 et 21 sont pour l'assignation de la propriété **PropTest**. 

```c#
[Fact]
public void VersUtilisateurModel_CreerObjet_ValeursIdentiques2()
{
    //Arrangement (Arrange)
    const int utilisateurId = 9000;
    const string prenom = "TestPrenom";
    const string nom = "TestNom";
    const string nomUtilisateur = "TestNomUtilisateur";
    const string motPasseHash = "TestHash";
    const int roleId = 71;
    const string propTest = "TestPropTest";

    Utilisateur utilisateur = new Utilisateur()
    {
        UtilisateurId = utilisateurId,
        Prenom = prenom,
        Nom = nom,
        NomUtilisateur = nomUtilisateur,
        MotPasseHash = motPasseHash,
        RoleId = roleId,
        PropTest = propTest
    };

    //Action (Act)
    UtilisateurModel utilisateurModelActuel = utilisateur.VersUtilisateurModel();

    //Assertion (Assert)
    utilisateurModelActuel.Should().BeEquivalentTo(utilisateur, options => options.ExcludingMissingMembers());
}
```

Exécutez le test et il sera maintenant en échec. Est-ce que le test est bon ? Plus ou moins, car il faut penser de mettre à jour le test à chaque modification du modèle, sinon la valeur par défaut sera utilisé pour la comparaison.

La librairie **AutoFixture** permet de créer des objets et que les propriétés ont des valeurs différentes de celles par défaut.

Modifiez la méthode par celle-ci.

À la ligne 5, il y a un objet **Fixture** qui permet de créer des objets.

À la ligne 6 à 10, c'est la mécanique de création. Il est possible d'exclure des propriétés avec la méthode **`Without()`**. Il est important d'exclure les propriétés de navigation ou du moins minimalement la propriété de navigation **1 à plusieurs (UtilisateurCarteListe)** . Il est important de faire ceci, car il y a une référence circulaire entre les classes du modèle de données avec **EntityFramework**. Si l'exclusion n'est pas faite, il y aura une exception, car l'objet sera toujours en création circulaire.

```c#
[Fact]
public void VersUtilisateurModel_CreerObjet_ValeursIdentiques2()
{
    //Arrangement (Arrange)
    var fixture = new Fixture();
    Utilisateur utilisateur =
        fixture.Build<Utilisateur>()
            .Without(u => u.Role)
            .Without(u => u.UtilisateurCarteListe)
            .Create();

    //Action (Act)
    UtilisateurModel utilisateurModelActuel = utilisateur.VersUtilisateurModel();

    //Assertion (Assert)
    utilisateurModelActuel.Should().BeEquivalentTo(utilisateur, options => options.ExcludingMissingMembers());
}
```

Exécutez de nouveau le test et il sera en échec.

Retirez la propriété **PropTest** de la classe **UtilisateurModel** uniquement. Exécutez le test et il sera positif. Il devrait toujours échouer. La raison est que la propriété **PropTest** n'est plus dans l'assertion, car elle est exclue par l'option **`ExcludingMissingMembers()`**.

Il serait idéal d'indiquer manuellement les propriétés à exclure. La méthode **`.Exlcluding()`** permet de spécifier une propriété à ignorer.

```
[Fact]
public void VersUtilisateurModel_CreerObjet_ValeursIdentiques2()
{
    //Arrangement (Arrange)
    var fixture = new Fixture();
    Utilisateur utilisateur =
        fixture.Build<Utilisateur>()
            .Without(u => u.Role)
            .Without(u => u.UtilisateurCarteListe)
            .Create();

    //Action (Act)
    UtilisateurModel utilisateurModelActuel = utilisateur.VersUtilisateurModel();

    //Assertion (Assert)
    utilisateurModelActuel.Should().BeEquivalentTo(utilisateur, 
        options => options.Excluding(x => x.MotPasseHash)
                          .Excluding(x => x.Role)
                          .Excluding(x => x.UtilisateurCarteListe));
}
```

Exécutez de nouveau le test. Le test sera un échec comme voulu.

Ajoutez de nouveau la propriété ** **PropTest** de la classe **UtilisateurModel** et testez de nouveau. Le test est toujours en échec comme voulu.

Retirez la propriété ** **PropTest** des classes **UtilisateurModel** et **Utilisateur**.

Testez de nouveau et le test sera un succès comme voulu.

Cette version du test est évolutive et teste réellement la copie.

Il n'est pas toujours possible de réaliser des tests évolutifs. Il est important que lorsqu'on modifie une classe, de s'assurer que les tests unitaires correspondants sont complets.

## Tester un validateur

Le validateur a seulement une seule méthode à tester, mais il faut s'assurer que tous les champs soient testés correctement.

Pour un validateur, il faut s'assure que la validation fonctionne bien lorsque les valeurs sont valides et que lorsque les valeurs sont invalides. Il faut tester les 2 possibilités. Il faut également tester tous les cas de validation pour une propriété.

Créez la classe **UtilisateurCarteValidateurTest.cs** dans le dossier **Core\Validateurs**.

```c#
namespace SuperCarte.UTest.Core.Validateurs;

/// <summary>
/// Tests unitaires pour la classe UtilisateurCarteValidateur
/// </summary>
public class UtilisateurCarteValidateurTest
{
}
```

Le validateur classique a seulement une méthode **`ValiderAsync()`**. 

Ce validateur possède 2 paramètres. Il n'y aura pas d'exemple pour l'utilisation du 2e paramètre.

Pour un validateur, il est important de tester une propriété à la fois, avec plusieurs valeurs. Les cas limites sont importants.

Par exemple, pour une chaine de caractères, il faut tester toutes les variations du champ obligatoire.

- Vide

- Null

- Uniquement espace. 

  Ce cas peut être considéré comme une valeur valide ou non selon la façon que vous

Pour une propriété qui a une valeur minimale ou maximale, il faut tester les cas limites.

Il faut également tester le cas valide et non valide. 

### Propriété Quantite

La propriété **Quantite** peut accepter une valeur entre 1 et 32 767 (valeur maximale du **`short`**).

Pour le test qui s'assure que le champ est valide, il faut tester les valeurs limites.

- 1
- 32 767 (**`short.MaxValue`**)
- Et une entre les 2

Pour le test qui s'assure que le champ est invalide, il faut tester les valeurs en dehors.

- 0
- -10

Si la propriété acceptait entre 1 et 250, il faudrait également tester 251. Mais pour ce validateur, il n'est pas possible de spécifier une valeur au-delà du maximum du type.

Afin d'éviter d'écrire plusieurs tests pour chacune des valeurs, il est possible d'utiliser l'annotation **`[Theory]`** au lieu de **`[Fact]`**. Cette nouvelle annotation permet de spécifier les paramètres pour le même test avec l'annotation **`[InlineData]`**.

Créez la méthode **`ValiderAsync_Quantite_Valide`**. Remarquez que la méthode possède un paramètre **`quantite`**.

La méthode a plusieurs annotations. Ce test sera exécuté 3 fois. La première fois, le paramètre **`quantite`** aura la valeur 1. La deuxième fois, la valeur sera 32 767 et la troisième fois, la valeur sera 15657.

La propriété **Quantite** de l'objet **utilisateurCarteModel** utilise la valeur du paramètre (ligne 10). 

```c#
[Theory]
[InlineData(1)] //Min
[InlineData(short.MaxValue)] //Max
[InlineData(15657)] //Entre les 2
public async Task ValiderAsync_Quantite_Valide(short quantite)
{
    //Arrangement (Arrange)
    UtilisateurCarteModel utilisateurCarteModel = new UtilisateurCarteModel()
    {
        Quantite = quantite
    };

    //Action (Act)

    //Assertion (Assert)         
}
```

Il faut ensuite créer les simulacres pour les dépendances. Il n'est pas nécessaire de les configurer, car pour ce test, elles ne seront pas utilisées (lignes 13 à 15).

À la ligne 17, il y a la création du service et à la ligne 23 il y a l'exécution.

```c#
[Theory]
[InlineData(1)] //Min
[InlineData(short.MaxValue)] //Max
[InlineData(15657)] //Entre les 2
public async Task ValiderAsync_Quantite_Valide(short quantite)
{
    //Arrangement (Arrange)
    UtilisateurCarteModel utilisateurCarteModel = new UtilisateurCarteModel()
    {
        Quantite = quantite
    };

    var utilisateurCarteRepo = new Mock<IUtilisateurCarteRepo>();
    var carteRepo = new Mock<ICarteRepo>();
    var utilisateurRepo = new Mock<IUtilisateurRepo>();
            
    UtilisateurCarteValidateur utilisateurCarteValidateur =
        new UtilisateurCarteValidateur(utilisateurCarteRepo.Object,
                                       utilisateurRepo.Object,
                                       carteRepo.Object);

    //Action (Act)
    ValidationModel validationModel = await utilisateurCarteValidateur.ValiderAsync(utilisateurCarteModel);

    //Assertion (Assert)            
}
```

Finalement, l'assertion doit se faire sur la propriété des messages d'erreur. Il n'est pas possible d'utiliser la propriété **`EstValide`**, car cette propriété considère toutes les erreurs. Les autres propriétés sont ignorées dans le test, donc elles ne sont pas contrôlées. Il n'est pas possible de prédire leur comportement. Donc, si le **dictionnaire** d'erreur ne contient pas la propriété **Quantite**, la propriété est valide.

```c#
[Theory]
[InlineData(1)] //Min
[InlineData(short.MaxValue)] //Max
[InlineData(15657)] //Entre les 2
public async Task ValiderAsync_Quantite_Valide(short quantite)
{
    //Arrangement (Arrange)
    UtilisateurCarteModel utilisateurCarteModel = new UtilisateurCarteModel()
    {
        Quantite = quantite
    };

    var utilisateurCarteRepo = new Mock<IUtilisateurCarteRepo>();
    var carteRepo = new Mock<ICarteRepo>();
    var utilisateurRepo = new Mock<IUtilisateurRepo>();
            
    UtilisateurCarteValidateur utilisateurCarteValidateur =
        new UtilisateurCarteValidateur(utilisateurCarteRepo.Object,
                                       utilisateurRepo.Object,
                                       carteRepo.Object);

    //Action (Act)
    ValidationModel validationModel = await utilisateurCarteValidateur.ValiderAsync(utilisateurCarteModel);

    //Assertion (Assert)        
    Assert.False(validationModel.ErreurParPropriete.ContainsKey(nameof(utilisateurCarteModel.Quantite)));
}
```

Voici le test pour le cas invalide. 

Le tout est identique, à l'exception des valeurs pour la quantité et l'assertion. Maintenant, pour que le test soit réussi, il faut que l'erreur soit présente.

```c#
[Theory]
[InlineData(0)] //Limite
[InlineData(-10)] //Négatif    
public async Task ValiderAsync_Quantite_NonValide(short quantite)
{
    //Arrangement (Arrange)
    UtilisateurCarteModel utilisateurCarteModel = new UtilisateurCarteModel()
    {
        Quantite = quantite
    };

    var utilisateurCarteRepo = new Mock<IUtilisateurCarteRepo>();
    var carteRepo = new Mock<ICarteRepo>();
    var utilisateurRepo = new Mock<IUtilisateurRepo>();

    UtilisateurCarteValidateur utilisateurCarteValidateur =
        new UtilisateurCarteValidateur(utilisateurCarteRepo.Object,
                                       utilisateurRepo.Object,
                                       carteRepo.Object);

    //Action (Act)
    ValidationModel validationModel = await utilisateurCarteValidateur.ValiderAsync(utilisateurCarteModel);

    //Assertion (Assert)        
    Assert.True(validationModel.ErreurParPropriete.ContainsKey(nameof(utilisateurCarteModel.Quantite)));
}
```

### Fichier ressource

Pour un validateur qui utilise un fichier ressource, il faut également créer un simulacre.

Dans le projet **SuperCarte.Core**, créez le fichier ressource **ResUtilisateurCarteValidateur.resx** dans le dossier **Resx**. N'oubliez pas de le mettre **public**.

Ajoutez la valeur ci-dessous.

| Nom                    | Valeur                                               |
| ---------------------- | ---------------------------------------------------- |
| Quantite_PlageInvalide | La valeur doit être entre 1 et 32 767 inclusivement. |

Modifiez la classe **UtilisateurCarteValidateur** pour recevoir la dépendance **`IStringLocalizer<ResUtilisateurCarteValidateur>`**(lignes 19, 30 et 35).

La règle pour la quantité utilise le texte du fichier ressource (ligne 38).

```c#
using FluentValidation;
using FluentValidation.Results;
using Microsoft.Extensions.Localization;
using SuperCarte.Core.Extensions;
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;
using SuperCarte.Core.Resx;

namespace SuperCarte.Core.Validateurs;

/// <summary>
/// Classe qui valide le modèle UtilisateurCarteModel
/// </summary>
public class UtilisateurCarteValidateur : AbstractValidator<UtilisateurCarteModel>, IValidateurPropriete<UtilisateurCarteModel>
{
    private readonly IUtilisateurCarteRepo _utilisateurCarteRepo;
    private readonly IUtilisateurRepo _utilisateurRepo;
    private readonly ICarteRepo _carteRepo;
    private readonly IStringLocalizer<ResUtilisateurCarteValidateur> _resUtilisateurCarteValidateur;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="utilisateurCarteRepo">Repository de UtilisateurCarte</param>
    /// <param name="utilisateurRepo">Repository de Utilisateur</param>
    /// <param name="carteRepo">Repository de Carte</param>
    /// <param name="resUtilisateurCarteValidateur">Fichier ressource ResUtilisateurCarteValidateur</param>
    public UtilisateurCarteValidateur(IUtilisateurCarteRepo utilisateurCarteRepo, 
        IUtilisateurRepo utilisateurRepo, ICarteRepo carteRepo, 
        IStringLocalizer<ResUtilisateurCarteValidateur> resUtilisateurCarteValidateur)
    {
        _utilisateurCarteRepo = utilisateurCarteRepo;
        _utilisateurRepo = utilisateurRepo;
        _carteRepo = carteRepo;
        _resUtilisateurCarteValidateur = resUtilisateurCarteValidateur;
        
        RuleFor(i => (int)i.Quantite).Cascade(CascadeMode.Stop)
            .InclusiveBetween(1, short.MaxValue).WithMessage(resUtilisateurCarteValidateur["Quantite_PlageInvalide"]);

        RuleFor(i => i.UtilisateurId).Cascade(CascadeMode.Stop)
            .Must(ValiderUtilisateurIdExiste).WithMessage("L'utilisateur sélectionné n'est pas valide.")
            .Must((i, p) => ValiderDoublon(p, i.CarteId)).WithMessage("L'utilisateur existe déjà pour cette carte.");

        RuleFor(i => i.CarteId).Cascade(CascadeMode.Stop)
            .Must(ValiderCarteIdExiste).WithMessage("La carte sélectionnée n'est pas valide.")
            .Must((i, p) => ValiderDoublon(i.UtilisateurId, p)).WithMessage("La carte existe déjà pour cet utilisateur.");
    }


    public async Task<ValidationModel> ValiderAsync(UtilisateurCarteModel modele, params string[] proprietesAValider)
    {
        ValidationResult validationResult;

        if (proprietesAValider?.Length > 0)
        {
            //Il y a des propriétés à valider
            validationResult = await this.ValidateAsync(modele, o => o.IncludeProperties(proprietesAValider));            
        }
        else
        {
            //Il n'y a aucune propriété à valider
            validationResult = await base.ValidateAsync(modele);
        }

        return validationResult.VersValidationModel();
    }

    /// <summary>
    /// Valider la clé primaire de l'utilisateur si elle existe
    /// </summary>
    /// <param name="utilisateurId">Clé primaire de l'utilisateur</param>
    /// <returns>Vrai si valide, faux si non valide</returns>
    private bool ValiderUtilisateurIdExiste(int utilisateurId)
    {
        return _utilisateurRepo.ObtenirParCle(utilisateurId) != null;
    }

    /// <summary>
    /// Valider la clé primaire de la carte si elle existe
    /// </summary>
    /// <param name="utilisateurId">Clé primaire de la carte</param>
    /// <returns>Vrai si valide, faux si non valide</returns>
    private bool ValiderCarteIdExiste(int carteId)
    {
        return _carteRepo.ObtenirParCle(carteId) != null;
    }

    /// <summary>
    /// Valider si la combinaison CarteId et UtilisateurId n'est pas déjà utilisée
    /// </summary>    
    /// <param name="utilisateurId">Clé primaire de l'utilisateur</param>
    /// <param name="carteId">Clé primaire de la carte</param>
    /// <returns>Vrai si valide, faux si non valide</returns>
    private bool ValiderDoublon(int utilisateurId, int carteId)
    {
        return _utilisateurCarteRepo.ObtenirParCle(utilisateurId, carteId) == null;
    }
}
```

Il faut maintenant créer un simulacre dans les tests pour le fichier ressource. 

Pour le test **valide**, il faut configurer le simulacre pour retourner un message d'erreur, peu importe la ressource demandée (ligne 17). Il n'est pas nécessaire de créer tous les messages, car ils ne servent pas à l'assertion.

```c#
[Theory]
[InlineData(1)] //Min
[InlineData(short.MaxValue)] //Max
[InlineData(15657)] //Entre les 2
public async Task ValiderAsync_Quantite_Valide(short quantite)
{
    //Arrangement (Arrange)
    UtilisateurCarteModel utilisateurCarteModel = new UtilisateurCarteModel()
    {
        Quantite = quantite
    };

    var utilisateurCarteRepo = new Mock<IUtilisateurCarteRepo>();
    var carteRepo = new Mock<ICarteRepo>();
    var utilisateurRepo = new Mock<IUtilisateurRepo>();
    var ressource = new Mock<IStringLocalizer<ResUtilisateurCarteValidateur>>();
    ressource.Setup(x => x[It.IsAny<string>()]).Returns(new LocalizedString("Test", "Message erreur Test"));

    UtilisateurCarteValidateur utilisateurCarteValidateur =
        new UtilisateurCarteValidateur(utilisateurCarteRepo.Object,
                                       utilisateurRepo.Object,
                                       carteRepo.Object,
                                       ressource.Object);

    //Action (Act)
    ValidationModel validationModel = await utilisateurCarteValidateur.ValiderAsync(utilisateurCarteModel);

    //Assertion (Assert)        
    Assert.False(validationModel.ErreurParPropriete.ContainsKey(nameof(utilisateurCarteModel.Quantite)));
}
```

Pour le test **non valide**, il faut configurer le message d'erreur et de vérifier dans l'assertion que c'est le bon message. Il y a un risque que le validateur n'utilise pas le bon message dans la ressource. Il faut donc le valider. Il est important de configurer le simulacre pour chacun des messages.

À la ligne 7, il faut créer la constante pour le message d'erreur attendu. Il est configuré dans le simulacre de la ressource à la ligne 18.

À la ligne 31, il y a une nouvelle assertion qui vérifie que le message d'erreur attendu est celui qui a été obtenu.

```c#
[Theory]
[InlineData(0)] //Limite
[InlineData(-10)] //Négatif    
public async Task ValiderAsync_Quantite_NonValide(short quantite)
{
    //Arrangement (Arrange)        
    const string messageErreurAttendu = "Quantite_PlageInvalide_Test";

    UtilisateurCarteModel utilisateurCarteModel = new UtilisateurCarteModel()
    {
        Quantite = quantite
    };

    var utilisateurCarteRepo = new Mock<IUtilisateurCarteRepo>();
    var carteRepo = new Mock<ICarteRepo>();
    var utilisateurRepo = new Mock<IUtilisateurRepo>();
    var ressource = new Mock<IStringLocalizer<ResUtilisateurCarteValidateur>>();
    ressource.Setup(x => x["Quantite_PlageInvalide"]).Returns(new LocalizedString("Quantite_PlageInvalide", messageErreurAttendu));       

    UtilisateurCarteValidateur utilisateurCarteValidateur =
        new UtilisateurCarteValidateur(utilisateurCarteRepo.Object,
                                       utilisateurRepo.Object,
                                       carteRepo.Object,
                                       ressource.Object);

    //Action (Act)
    ValidationModel validationModel = await utilisateurCarteValidateur.ValiderAsync(utilisateurCarteModel);

    //Assertion (Assert)        
    Assert.True(validationModel.ErreurParPropriete.ContainsKey(nameof(utilisateurCarteModel.Quantite)));
    Assert.Equal(messageErreurAttendu, validationModel.ErreurParPropriete[nameof(utilisateurCarteModel.Quantite)]);
}
```

## Tester un service - UtilisateurCarteService

Créez la classe **UtilisateurCarteServiceTest** dans le dossier **Core\Services**.

```c#
namespace SuperCarte.UTest.Core.Services;

/// <summary>
/// Tests unitaires pour la classe UtilisateurCarteService
/// </summary>
public class UtilisateurCarteServiceTest
{
}
```

### Test ObtenirCartesUtilisateurAsync

Est-ce qu'il y a quelque chose à tester dans cette méthode ?

```c#
public async Task<List<QuantiteCarteDetailModel>> ObtenirCartesUtilisateurAsync(int utilisateurId)
{
    return await _utilisateurCarteRepo.ObtenirCartesUtilisateurAsync(utilisateurId);
}
```

Cette méthode effectue uniquement un appel au **repository** sans aucune logique. Il n'est pas nécessaire de faire un test pour cette méthode.

Le seul test possible serait de s'assurer que la méthode retourne exactement la même chose de ce que le **repository** retourne. Les tests doivent avoir une valeur et celui-ci n’en donne pas réellement. Comment ce test s'appellerait-il ? S'il est difficile de nommer le test, c'est souvent un indicateur qu'il n'est pas utile.

### Test ObtenirDetail

Voici la méthode **`ObtenirAsync`**. 

```c#
public async Task<UtilisateurCarteModel?> ObtenirAsync(int utilisateurId, int carteId)
{
    UtilisateurCarte? utilisateurCarte = await _utilisateurCarteRepo.ObtenirParCleAsync(utilisateurId, carteId);

    return utilisateurCarte?.VersUtilisateurCarteModel();
}
```

Est-ce qu'il faut la tester ? Celle-ci à 2 cas de test.

#### Insertion des clés

Le premier test est de s'assurer que les paramètres ne sont pas inversés en appelant le **repository**.

Créez la méthode **`ObtenirAsync_ParametreRepo_BonOrdre()`**. Remarquez que la méthode est asynchrone, car celle à tester est asynchrone.

```c#
[Fact]
public async Task ObtenirAsync_ParametreRepo_BonOrdre()
{
    //Arrangement (Arrange)
    

    //Action (Act)
    

    //Assertion (Assert)
    
}
```

Il faut créer les constantes pour les clés (lignes 5 et 6).

Le service a 2 dépendances. Il faut créer les simulacres. Il n'est pas nécessaire de les configurer (lignes 8 et 9).

```c#
[Fact]
public async Task ObtenirAsync_ParametreRepo_BonOrdre()
{
    //Arrangement (Arrange)
    const int utilisateurId = 4;
    const int carteId = 5;

    var utilisateurCarteRepository = new Mock<IUtilisateurCarteRepo>();
    var utilisateurCarteValidateur = new Mock<IValidateurPropriete<UtilisateurCarteModel>>();

    UtilisateurCarteService utilisateurCarteService =
        new UtilisateurCarteService(utilisateurCarteRepository.Object,
                                    utilisateurCarteValidateur.Object);

    //Action (Act)


    //Assertion (Assert)

}
```

Ensuite, il faut exécuter la méthode (ligne 16). La méthode est asynchrone, il ne faut pas oublier le **`await`**. Il n'est pas nécessaire de récupérer l'objet de retour, car il n'est pas nécessaire à l'assertion.

```c#
[Fact]
public async Task ObtenirAsync_ParametreRepo_BonOrdre()
{
    //Arrangement (Arrange)
    const int utilisateurId = 4;
    const int carteId = 5;

    var utilisateurCarteRepository = new Mock<IUtilisateurCarteRepo>();
    var utilisateurCarteValidateur = new Mock<IValidateurPropriete<UtilisateurCarteModel>>();

    UtilisateurCarteService utilisateurCarteService =
        new UtilisateurCarteService(utilisateurCarteRepository.Object,
                                    utilisateurCarteValidateur.Object);

    //Action (Act)
    await utilisateurCarteService.ObtenirAsync(utilisateurId, carteId);

    //Assertion (Assert)

}
```

Finalement, l'assertion est sur le comportement.

Il est possible de vérifier si un appel a été fait sur une méthode d'un simulacre.

À la ligne 19, il est vérifié que la méthode est appelée seulement une fois avec les paramètres de l'arrangement. Il est important que les valeurs des clés soient différentes pour détecter leur inversion. À la ligne 20, l'assertion est que la méthode n'est jamais appelée avec une inversion.

```c#
[Fact]
public async Task ObtenirAsync_ParametreRepo_BonOrdre()
{
    //Arrangement (Arrange)
    const int utilisateurId = 4;
    const int carteId = 5;

    var utilisateurCarteRepository = new Mock<IUtilisateurCarteRepo>();
    var utilisateurCarteValidateur = new Mock<IValidateurPropriete<UtilisateurCarteModel>>();

    UtilisateurCarteService utilisateurCarteService =
        new UtilisateurCarteService(utilisateurCarteRepository.Object,
                                    utilisateurCarteValidateur.Object);

    //Action (Act)
    await utilisateurCarteService.ObtenirAsync(utilisateurId, carteId);

    //Assertion (Assert)
    utilisateurCarteRepository.Verify(x => x.ObtenirParCleAsync(utilisateurId, carteId), Times.Once);
    utilisateurCarteRepository.Verify(x => x.ObtenirParCleAsync(carteId, utilisateurId), Times.Never);
}
```

Modifiez temporairement la méthode **`ObtenirAsync()`** du service par celle-ci. Le programmeur a utilisé 2 fois la clé **utilisateurId**. Testez de nouveau et le test sera en échec.

```c#
public async Task<UtilisateurCarteModel?> ObtenirAsync(int utilisateurId, int carteId)
{
    UtilisateurCarte? utilisateurCarte = await _utilisateurCarteRepo.ObtenirParCleAsync(utilisateurId, utilisateurId);

    return utilisateurCarte?.VersUtilisateurCarteModel();
}
```

#### Conversion de UtilisateurCarte vers UtilisateurCarteModel

Le 2e test est de s'assurer que la conversion de **UtilisateurCarte** vers **UtilisateurCarteModel** est correcte.

Est-ce nécessaire de tester ce cas si le test unitaire de **`utilisateurCarte?.VersUtilisateurCarteModel()`** a déjà été fait ?

Dans ce cas-ci, il est important de le tester, car la conversion se fait directement à l'interne. Le service n'utilise pas une dépendance pour la conversion.

Imaginez que le programmeur oublie d'utiliser la méthode d'extension et il le fait directement dans la classe comme dans l'exemple ci-dessous. Le test de l'extension est inutile dans ce cas-ci. Un test ne doit pas dépendre d'un autre test pour le considérer valide.

```c#
public async Task<UtilisateurCarteModel?> ObtenirAsync(int utilisateurId, int carteId)
{
    UtilisateurCarte? utilisateurCarte = await _utilisateurCarteRepo.ObtenirParCleAsync(utilisateurId, carteId);
    
    if(utilisateurCarte != null)
	{
        return new UtilisateurCarteModel()
        {
            UtilisateurId = utilisateurCarte.UtilisateurId,
            CarteId = utilisateurCarte.CarteId,
            Quantite = utilisateurCarte.Quantite
        };
    }
    else
    {
        return null;
    }
}
```

Si c'était une dépendance comme auto-mapper, la méthode ressemblerait à ceci.

Il faudrait seulement tester que le **mapper** est appelé correctement sans se soucier du résultat de l'assignation. Le **mapper** serait simulé dans le test. 

```c#
public async Task<UtilisateurCarteModel?> ObtenirAsync(int utilisateurId, int carteId)
{
    UtilisateurCarte? utilisateurCarte = await _utilisateurCarteRepo.ObtenirParCleAsync(utilisateurId, utilisateurId);
    
    return _mapper.Map<UtilisateurCarteModel>(UtilisateurCarte);
}
```

Voici un exemple que le choix d'utiliser des extensions pour le **mappage** n'est peut-être pas le meilleur choix pour les tests. Il arrive souvent que la conception des tests mette en évidence les faiblesses du code.

Voici la méthode pour le test. Il est très similaire à l'extension.

Aux lignes 5 à 10, l'objet est créé à l'aide de la librairie **AutoFixture** pour assigner tous les champs.

À la ligne 13, il faut configurer le simulacre pour le **repository** pour retourner l'utilisateur généré à la ligne 6. Également, ce sont les vraies valeurs qui sont spécifiées dans la configuration. Mais il aurait été aussi valide de mettre **`It.IsAny<int>()`**, car le test s'occupe uniquement de la conversion. Il y a un test qui s'occupe de l'ordre des paramètres.

À la ligne 27, la librairie **FluentValidation** fait la comparaison entre l'objet du modèle du domaine obtenu avec celui créé.

```c#
[Fact]
public async Task ObtenirAsync_DataVersModeleNonNull_ValeursIdentiques()
{
    //Arrangement (Arrange)
    var fixture = new Fixture();        
    UtilisateurCarte utilisateurCarte =
        fixture.Build<UtilisateurCarte>()
            .Without(uc=> uc.Utilisateur)
            .Without(uc => uc.Carte)
            .Create();

    var utilisateurCarteRepository = new Mock<IUtilisateurCarteRepo>();
    utilisateurCarteRepository.Setup(x => x.ObtenirParCleAsync(utilisateurCarte.UtilisateurId, utilisateurCarte.CarteId))
        .ReturnsAsync(utilisateurCarte);

    var utilisateurCarteValidateur = new Mock<IValidateurPropriete<UtilisateurCarteModel>>();

    UtilisateurCarteService utilisateurCarteService =
        new UtilisateurCarteService(utilisateurCarteRepository.Object,
                                    utilisateurCarteValidateur.Object);

    //Action (Act)
    UtilisateurCarteModel utilisateurCarteModelActuel = 
        await utilisateurCarteService.ObtenirAsync(utilisateurCarte.UtilisateurId, utilisateurCarte.CarteId);

    //Assertion (Assert)
    utilisateurCarteModelActuel.Should()
        .BeEquivalentTo(utilisateurCarte, options => options.ExcludingMissingMembers());

}
```

Modifiez la méthode du service avec la version ci-dessous. Le test sera encore un succès.

```c#
public async Task<UtilisateurCarteModel?> ObtenirAsync(int utilisateurId, int carteId)
{
    UtilisateurCarte? utilisateurCarte = await _utilisateurCarteRepo.ObtenirParCleAsync(utilisateurId, carteId);
    
    if(utilisateurCarte != null)
	{
        return new UtilisateurCarteModel()
        {
            UtilisateurId = utilisateurCarte.UtilisateurId,
            CarteId = utilisateurCarte.CarteId,
            Quantite = utilisateurCarte.Quantite
        };
    }
    else
    {
        return null;
    }
}
```

### Tester AjouterAsync

Pour cette méthode, il y a plusieurs cas.

- Si l'objet n'est pas valide, l'enregistrement ne s'effectue pas.
- Si le modèle est valide, l'enregistrement s'effectue
- Avant l'insertion, l'objet du modèle du domaine est converti correctement en modèle de donnée
- Après l'insertion, l'objet du modèle de données est mis à jour à partir du modèle.

Seulement le premier test sera présenté. 

Les 2 derniers sont plus complexes, car il faut intercepter l'objet envoyer en paramètre. Il faut utiliser la notion de **callback** dans la configuration du **mock**. Cette notion ne sera pas présentée. 

#### AjouterAsync_ModeleInvalide_RepoNonAjout

Le premier test est de s'assurer que le **repository** n'ajoute pas l'objet dans le cas que le modèle du domaine n'est pas valide. Ce test est un test comportemental, car il ne valide pas un résultat, mais si un comportement est bien exécuté.

Créez la méthode **`AjouterAsync_ModeleInvalide_RepoNonAjout()`**. Remarquez que la méthode est asynchrone, car celle à tester est asynchrone.

Il faut créer l'objet du modèle à ajouter (ligne 5). Cet objet peut être vide, car il ne sera pas réellement validé ou ajouté.

Il faut créer l'objet **ValidationModel** avec une erreur(linges 7 et 8).

Le **validateur** (ligne 10) est créé. À la ligne 11, il faut le configurer pour retourner le **ValidationModel** en erreur lorsque l'objet du modèle lui est envoyé.

Il faut également un **repository** (ligne 13).   Aucune configuration n'est nécessaire.

Le service est créé à la ligne 15.

À la ligne 20, la méthode est exécutée en envoyant l'objet du modèle de la ligne 5.

À la ligne 23, la première assertion est qu'il faut s'assurer que la méthode **`ValiderAsync()`** du validateur a été appelée seulement une fois avec le modèle du domaine qui a été envoyé.

À la ligne 24, la 2e assertion est qu'il faut s'assurer que la méthode **`AjouterAsync()`** du **repository** n'est jamais appelée, peu importe les paramètres.

```c#
[Fact]
public async Task AjouterAsync_ModeleInvalide_RepoNonAjout()
{
    //Arrangement (Arrange)
    UtilisateurCarteModel utilisateurCarteModel = new UtilisateurCarteModel();
    
    var validationModel = new ValidationModel();
    validationModel.AssignerErreur("testPropriete", "testMessage");

    var utilisateurCarteValidateur = new Mock<IValidateurPropriete<UtilisateurCarteModel>>();
    utilisateurCarteValidateur.Setup(x => x.ValiderAsync(It.IsAny<UtilisateurCarteModel>())).ReturnsAsync(validationModel);

    var utilisateurCarteRepository = new Mock<IUtilisateurCarteRepo>();
    
    UtilisateurCarteService utilisateurCarteService =
        new UtilisateurCarteService(utilisateurCarteRepository.Object,
                                    utilisateurCarteValidateur.Object); 
    
    //Action (Act)        
    await utilisateurCarteService.AjouterAsync(utilisateurCarteModel);
    
    //Assertion (Assert)
    utilisateurCarteValidateur.Verify(x => x.ValiderAsync(utilisateurCarteModel), Times.Once);
    utilisateurCarteRepository.Verify(x => x.AjouterAsync(It.IsAny<UtilisateurCarte>(), It.IsAny<bool>()), Times.Never);
    
}
```

## Tester un repository

**IMPORTANT**. Le repository n'est plus à tester pour le **TP 3**.

## Tester ViewModel - ListeCategoriesVM

Pour tester le **ViewModel**, il faut regarder le comportement des propriétés et des commandes en fonction d'un changement d'état d'une propriété ou d'un appel d'une commande.

Il faut faire le test pour tester l'état du bouton supprimer.

Il faut tester les 4 cas ci-dessous :

- Aucune catégorie sélectionnée
- La catégorie a des dépendances
- La catégorie retourne un objet **`null`** pour la dépendance
- La catégorie n'a pas de dépendance

Créez la classe **ListeCategoriesVMTest** dans le dossier **WPF\ViewModels**.

```c#
/// <summary>
/// Tests unitaires pour la classe ListeCategoriesVM
/// </summary>
public class ListeCategoriesVMTest
{
}
```

### Test SupprimerCommande_CategorieNonSelectionnee_NePeutSupprimer

Ce test permet de déterminer qu'il n'est pas possible d'exécuter la commande si aucune catégorie n'est sélectionnée.

Créez la méthode **`SupprimerCommande_CategorieNonSelectionnee_NePeutSupprimer()`**.

La classe **ListeCategoriesVM** a 4 dépendances.

- INavigateur
- INotification
- ICategorieService
- IAuthentificateur

Il faut créer un simulacre pour chacun des services avec la librairie **Moq**.

```c#
[Fact]
public void SupprimerCommande_CategorieNonSelectionnee_NePeutSupprimer()
{
    //Arrangement (Arrange)
    var navigateur = new Mock<INavigateur>();
    var notification = new Mock<INotification>();

    var categorieService = new Mock<ICategorieService>();        

    var authentificateur = new Mock<IAuthentificateur>();    
    
    //Action (Act)    

    //Assertion (Assert)

}
```

Pour ce test, il faut considérer que l'utilisateur est autorisé à utiliser la commande. Il faut donc configurer le simulacre (lignes 12 et 13). Donc peu importe le rôle demandé, l'authentificateur retourne toujours **`true`** pour ce test.

```c#
[Fact]
public void SupprimerCommande_CategorieNonSelectionnee_NePeutSupprimer()
{
    //Arrangement (Arrange)
    var navigateur = new Mock<INavigateur>();
    var notification = new Mock<INotification>();

    var categorieService = new Mock<ICategorieService>();        

    var authentificateur = new Mock<IAuthentificateur>();  
    //L'utilisateur est autorisé
    authentificateur.Setup(x => x.EstAutorise(It.IsAny<string[]>())).Returns(true);
    authentificateur.Setup(x => x.EstAutoriseAsync(It.IsAny<string[]>())).ReturnsAsync(true);
    
    //Action (Act)    

    //Assertion (Assert)

}
```

Ensuite, il faut créer le **ViewModel** en injectant les simulacres.

```c#
[Fact]
public void SupprimerCommande_CategorieNonSelectionnee_NePeutSupprimer()
{
    //Arrangement (Arrange)
    var navigateur = new Mock<INavigateur>();
    var notification = new Mock<INotification>();

    var categorieService = new Mock<ICategorieService>();        

    var authentificateur = new Mock<IAuthentificateur>();  
    //L'utilisateur est autorisé
    authentificateur.Setup(x => x.EstAutorise(It.IsAny<string[]>())).Returns(true);
    authentificateur.Setup(x => x.EstAutoriseAsync(It.IsAny<string[]>())).ReturnsAsync(true);
    
    ListeCategoriesVM listeCategoriesVM = new ListeCategoriesVM(authentificateur.Object,
                                                                    notification.Object,
                                                                    categorieService.Object,
                                                                    navigateur.Object);
    
    //Action (Act)    

    //Assertion (Assert)

}
```

Ensuite, il faut faire les actions. Il y en a 2.

La première action est d'indiquer qu'aucune catégorie n'est sélectionnée (ligne 21).

Ensuite, il faut récupérer la valeur de la méthode **`CanExecute()`** de la commande **SupprimerCommande **(ligne 23).

Finalement, l'assertion est que la valeur de **canExecuteActuel** doit être à **`false`**.

```c#
[Fact]
public void SupprimerCommande_CategorieNonSelectionnee_NePeutSupprimer()
{
    //Arrangement (Arrange)
    var navigateur = new Mock<INavigateur>();
    var notification = new Mock<INotification>();

    var categorieService = new Mock<ICategorieService>();        

    var authentificateur = new Mock<IAuthentificateur>();  
    //L'utilisateur est autorisé
    authentificateur.Setup(x => x.EstAutorise(It.IsAny<string[]>())).Returns(true);
    authentificateur.Setup(x => x.EstAutoriseAsync(It.IsAny<string[]>())).ReturnsAsync(true);
    
    ListeCategoriesVM listeCategoriesVM = new ListeCategoriesVM(authentificateur.Object,
                                                                    notification.Object,
                                                                    categorieService.Object,
                                                                    navigateur.Object);
    
    //Action (Act)    
	listeCategoriesVM.CategorieSelection = null;

    bool canExecuteActuel = listeCategoriesVM.SupprimerCommande.CanExecute(It.IsAny<object>());

    //Assertion (Assert)
    Assert.False(canExecuteActuel);
}
```

### Test SupprimerCommande_CategorieAvecDependance_NePeutSupprimer

Ce test permet de déterminer qu'il n'est pas possible d'exécuter la commande si la catégorie sélectionnée a une dépendance.

Créez la méthode **`SupprimerCommande_CategorieAvecDependance_NePeutSupprimer()`**.

Le test est assez similaire au précédent. Il faut maintenant configurer la méthode **`ObtenirDependance()`** de **CategorieService** pour indiquer qu'il y a une dépendance (ligne 9).

À la ligne 22, il faut créer un objet de type  **CategorieModel** pour indiquer qu'une catégorie est sélectionnée.

```c#
[Fact]
public void SupprimerCommande_CategorieAvecDependance_NePeutSupprimer()
{
    //Arrangement (Arrange)
    var navigateur = new Mock<INavigateur>();
    var notification = new Mock<INotification>();

    var categorieService = new Mock<ICategorieService>();
    categorieService.Setup(x => x.ObtenirDependance(It.IsAny<int>())).Returns(new CategorieDependance() { NbCartes = 1 });

    var authentificateur = new Mock<IAuthentificateur>();
    //L'utilisateur est autorisé
    authentificateur.Setup(x => x.EstAutorise(It.IsAny<string[]>())).Returns(true);
    authentificateur.Setup(x => x.EstAutoriseAsync(It.IsAny<string[]>())).ReturnsAsync(true);

    ListeCategoriesVM listeCategoriesVM = new ListeCategoriesVM(authentificateur.Object,
                                                                notification.Object,
                                                                categorieService.Object,
                                                                navigateur.Object);

    //Action (Act)        
    listeCategoriesVM.CategorieSelection = new CategorieModel();

    bool canExecuteActuel = listeCategoriesVM.SupprimerCommande.CanExecute(It.IsAny<object>());

    //Assertion (Assert)
    Assert.False(canExecuteActuel);
}
```

Est-ce que vous voyez une faille dans le test qui pourrait indiquer un mauvais résultat en cas d'une modification du logiciel ? Imaginez qu'une nouvelle table utilise **Categorie** comme clé étrangère. La classe **CategorieDependance** va avoir une nouvelle propriété **NbNouvelleTables**. Il faudra penser de modifier le test pour en tenir compte et également le **ViewModel**.

Avez-vous une solution pour ceci ?

Il faudrait modifier le concept des classes de type **Dépendance**. Est-ce nécessaire d'avoir le nombre d'éléments par dépendance ? Si ce n'est pas nécessaire, il suffirait de retourner un booléen pour indiquer s'il y a une dépendance ou non. Si le nombre de dépendances est nécessaire, il faudrait modifier la classe comme ci-dessous.

```c#
public class CategorieDependance
{
    public int CategorieId { get; init; }
    public int NbCartes { get; init; }
    public int NbNouvelleTables { get; init; }
    
    public bool PossedeDependance()
    {
    	return NbCartes > 0 || NbNouvelleTables > 0;
    }
}
```

Le **ViewModel** serait protégé par l'évolution des dépendances.

Mais le développeur devra s'assurer qu'à chaque nouvelle dépendance pour une table, de mettre à jour le **repository**, le modèle du domaine, le service... Il sera difficile pour un test unitaire de s'assurer que le programmeur n'a rien oublié. 

La création d'un test peut remettre en question la conception de l'application.

### Test SupprimerCommande_CategorieDepandenceNull_NePeutSupprimer

Ce test permet de déterminer qu'il est possible d'exécuter la commande si la catégorie sélectionnée retourne une dépendance **`null`**.

À la ligne 9, le simulacre retourne un objet **`null`**.

```c#
 [Fact]
public void SupprimerCommande_CategorieDepandenceNull_NePeutSupprimer()
{
    //Arrangement (Arrange)
    var navigateur = new Mock<INavigateur>();
    var notification = new Mock<INotification>();

    var categorieService = new Mock<ICategorieService>();
    categorieService.Setup(x => x.ObtenirDependance(It.IsAny<int>())).Returns((CategorieDependance)null);

    var authentificateur = new Mock<IAuthentificateur>();
    //L'utilisateur est autorisé
    authentificateur.Setup(x => x.EstAutorise(It.IsAny<string[]>())).Returns(true);
    authentificateur.Setup(x => x.EstAutoriseAsync(It.IsAny<string[]>())).ReturnsAsync(true);

    ListeCategoriesVM listeCategoriesVM = new ListeCategoriesVM(authentificateur.Object,
                                                                notification.Object,
                                                                categorieService.Object,
                                                                navigateur.Object);
    
    //Action (Act)        
    listeCategoriesVM.CategorieSelection = new CategorieModel();
    bool canExecuteActuel = listeCategoriesVM.SupprimerCommande.CanExecute(It.IsAny<object>());

    //Assertion (Assert)
    Assert.False(canExecuteActuel);
}
```

### Test SupprimerCommande_CategorieSansDependance_PeutSupprimer

Ce test permet de déterminer qu'il est possible d'exécuter la commande si la catégorie sélectionnée n'a aucune dépendance.

À la ligne 9, le simulacre ne retourne un objet **CategorieDependance** avec aucune carte.

Créez la méthode **`SupprimerCommande_CategorieSansDependance_PeutSupprimer()`**.

```c#
[Fact]
public void SupprimerCommande_CategorieSansDependance_PeutSupprimer()
{
    //Arrangement (Arrange)
    var navigateur = new Mock<INavigateur>();
    var notification = new Mock<INotification>();

    var categorieService = new Mock<ICategorieService>();
    categorieService.Setup(x => x.ObtenirDependance(It.IsAny<int>())).Returns(new CategorieDependance() { NbCartes = 0 });

    var authentificateur = new Mock<IAuthentificateur>();
    //L'utilisateur est autorisé
    authentificateur.Setup(x => x.EstAutorise(It.IsAny<string[]>())).Returns(true);
    authentificateur.Setup(x => x.EstAutoriseAsync(It.IsAny<string[]>())).ReturnsAsync(true);

    ListeCategoriesVM listeCategoriesVM = new ListeCategoriesVM(authentificateur.Object,
                                                                notification.Object,
                                                                categorieService.Object,
                                                                navigateur.Object);

    //Action (Act)        
    listeCategoriesVM.CategorieSelection = new CategorieModel();
    bool canExecuteActuel = listeCategoriesVM.SupprimerCommande.CanExecute(It.IsAny<object>());

    //Assertion (Assert)
    Assert.True(canExecuteActuel);
}
```

### Autre test

Il faudrait également s'assurer que lorsque la catégorie sélectionnée est modifiée que la commande est notifiée.

Il faut notifier uniquement lorsque la nouvelle catégorie est différente de l'ancienne.

Pour être en mesure de le faire, il faut ajouter une méthode à l'événement **`CanExecuteChanged`** de la commande (ligne 25). Cette méthode incrémente un compteur à chaque appel.

L'assertion détermine si le compteur correspond à la valeur attendue (ligne 38).

```c#
[Fact]
public void CategorieSelection_ModificationValeur_NotifierCommande()
{
    //Arrangement (Arrange)
    var navigateur = new Mock<INavigateur>();
    var notification = new Mock<INotification>();
    var categorieService = new Mock<ICategorieService>();        

    var authentificateur = new Mock<IAuthentificateur>();
    //L'utilisateur est autorisé
    authentificateur.Setup(x => x.EstAutorise(It.IsAny<string[]>())).Returns(true);
    authentificateur.Setup(x => x.EstAutoriseAsync(It.IsAny<string[]>())).ReturnsAsync(true);

    CategorieModel? categorieModel1 = new CategorieModel();
    CategorieModel? categorieModel2 = null;
    CategorieModel? categorieModel3 = new CategorieModel();

    ListeCategoriesVM listeCategoriesVM = new ListeCategoriesVM(authentificateur.Object,
                                                                notification.Object,
                                                                categorieService.Object,
                                                                navigateur.Object);

    int nbCanExecuteChangedActuel = 0;

    listeCategoriesVM.SupprimerCommande.CanExecuteChanged += delegate
    {
        nbCanExecuteChangedActuel++;
    };

    //Action (Act)        
    listeCategoriesVM.CategorieSelection = categorieModel1;
    listeCategoriesVM.CategorieSelection = categorieModel2;
    listeCategoriesVM.CategorieSelection = categorieModel3;
    listeCategoriesVM.CategorieSelection = categorieModel1;
    listeCategoriesVM.CategorieSelection = categorieModel1;//Ne doit pas faire changer

    //Assertion (Assert)
    Assert.Equal(4, nbCanExecuteChangedActuel);        
}
```

