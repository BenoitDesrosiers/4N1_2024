---
sidebar_position: 820
draft: false
---

# Tests unitaires

<!-- pour la prochaine fois, il faudrait ajouter du blahblah sur comment on décide quoi tester, et le fait qu'un test unitaire est normalement associé à une specs provenant de l'analyse. Par exemple: le bouton Effacer de la liste des categories est allumé si une catégorie est sélectionnée et que cette catégorie n'a pas de dépendances. Ca donne le contexte pour le test.  

Introduire les tests plus tot dans la session et ajouter un test de temps en temps lors de l'introduction de certaines fonctions. 

-->
Vous devez créer un nouveau projet de type **xUnit** dans votre solution.

Nommez le projet **SuperCarte.UTest** et utilisez **.NET 7**. Le **U** est pour **Unitaire**.

## Modification de la cible du projet

Il faut modifier la cible du projet. Le projet **UTest** utilisera le projet **.WPF** qui est disponible uniquement pour **Windows**.

Effectuez un double-clic sur l'entête du projet **SuperCarte.UTest** pour voir le **XML** de configuration.

Vous devez modifier la balise **\<TargetFramework>net7.0\</TargetFramework>** par **\<TargetFramework>net7.0-windows\</TargetFramework>**. Enregistrez le fichier.

Dans l'exemple ci-dessous, la balise est à la ligne 4.

```xml title="Modifier uniquement cette ligne"
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
  //highlight-next-line
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

Compilez le projet. Si vous avez les erreurs ci-dessous, l'étape précédente n'a pas été faite correctement.

```
Gravité	Code	Description	Projet	Fichier	Ligne	État de la suppression
Erreur	NETSDK1005	Le fichier de composants \SuperCarteApp\SuperCarte.ITest\obj\project.assets.json' n'a aucune cible pour 'net7.0'. Vérifiez que la restauration s'est exécutée et que vous avez inclus 'net7.0' dans TargetFrameworks pour votre projet.	SuperCarte.Test	C:\Program Files\dotnet\sdk\7.0.102\Sdks\Microsoft.NET.Sdk\targets\Microsoft.PackageDependencyResolution.targets	267	

Gravité	Code	Description	Projet	Fichier	Ligne	État de la suppression
Erreur		Le projet « ..\SuperCarte.WPF\SuperCarte.WPF.csproj » cible « net7.0-windows ». Il ne peut pas être référencé par un projet qui cible « .NETCoreApp,Version=v7.0 ».	SuperCarte.Test	C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Current\Bin\amd64\Microsoft.Common.CurrentVersion.targets	1830	
```

## Installation des librairies

Il faut installer les librairies qui seront utiles pour les tests.

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. Il est important que le **Projet par défaut** soit **SuperCarte.UTest** dans la console.

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

:::info
Il faudrait également créer un dossier **Core\Repositories** pour les tests unitaires des **repositories**. Mais ils ne seront pas testés. 
:::
Par exemple, les tests unitaires de la classe **RoleService** sera dans la classe **RoleServiceTest**  dans le dossier **Unitaires\Core\Services**.

# Exemple de tests unitaires

:::info
**Vous ne pouvez pas reprendre la même méthode pour le TP 3**, à l'exception du validateur.
:::

Pour chacune des classes testées unitairement, il faut créer une classe avec le même nom et en ajoutant le suffixe **Test**.

## Tester une extension

Il n'est pas demandé de tester une extension dans le **TP 3**. Cette exemple est pour comprendre le fonctionnement du test.

Créez la classe **UtilisateurMapExtensionTest.cs** dans le dossier **Core\Extensions**.

```csharp showLineNumbers
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

Voici le squelette d'un test:

```csharp showLineNumbers title="NE PAS COPIER"
[Fact]
public void VersUtilisateurModel_CreerObjet_ValeursIdentiques1()
{
	//Arrangement (Arrange)
    
    //Action (Act)
    
    //Assertion (Assert)
}
```

Premièrement, il faut créer l'objet **Utilisateur** à convertir (ligne 12 à 20) et les constantes pour les valeurs (ligne 5 à 10). Il est préférable d'utiliser des constantes au lieu de recopier les valeurs pour éviter les erreurs de copie.

Ensuite, il faut appeler la méthode à tester (ligne 23). Le nom de la variable qui est retournée par le test possède le suffixe **Actuel** **(ou Actual en anglais)**.



Finalement, il faut mettre les assertions (lignes 26 à 30). Il faut comparer toutes les propriétés.

```csharp showLineNumbers
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

Pour exécuter le test, ouvrez l'explorateur de tests (Affichage/Explorateur de tests) et appuyez sur le bouton vert. 

Vous devriez obtenir une erreur indiquant que VersUtilisateurModel() n'existe pas. Pour régler cette erreur, ajoutez 

```csharp
using SuperCarte.Core.Extensions;
```

Rédémarrez le test, cette fois-ci, il sera réussi.

Pour s'assurer qu'il fonctionne bien, modifiez temporairement la méthode de **VersUtilisateurModel** la classe **UtilisateurMapExtension** pour le code ci-dessous. Il faut retirer la copie du champ **Prenom**.

```csharp showLineNumbers
public static UtilisateurModel VersUtilisateurModel(this Utilisateur item)
{
    return new UtilisateurModel()
    {
        UtilisateurId = item.UtilisateurId,
        //highlight-next-line
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

:::tip
Il est toujours bon de faire *planter* un test afin de s'assurer qu'il teste vraiment quelquechose et ainsi s'éviter de faux positifs. N'hésitez pas à introduire une erreur dans votre code pour chaque test (et de l'enlever immédiatement)
:::

Remettez la méthode **VersUtilisateurModel** à son état original.


### Test VersUtilisateurModel - Version 2

Le problème avec la version précédente est que si un nouveau champ est ajouté dans les modèles, mais qu'il n'est pas copié, le test va tout de même fonctionner.

Ajoutez la propriété ci-dessous dans la classe **Utilisateur** et **UtilisateurModel**.

```csharp showLineNumbers
public string PropTest { get; set; } = null!;
```

Exécutez de nouveau le test 1. Il sera un succès. La première raison pour qu'il soit réussi est que la propriété n'a pas été assignée dans le test.


Nous allons créer la version 2 du test. La nouvelle propriété est ajoutée (lignes 11 et 21). 

```csharp showLineNumbers
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
    //highlight-next-line
    const string propTest = "TestPropTest"; //Ajout
       
    Utilisateur utilisateur = new Utilisateur()
    {
        UtilisateurId = utilisateurId,
        Prenom = prenom,
        Nom = nom,
        NomUtilisateur = nomUtilisateur,
        MotPasseHash = motPasseHash,
        RoleId = roleId,
        //highlight-next-line
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
Le test est encore un succès lors de son exécution car la nouvelle propriété n'est pas testée. 


Modifiez la méthode par celle-ci. Il y a maintenant l'assertion à la ligne 33.

```csharp showLineNumbers
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
    //highlight-next-line
    Assert.Equal(propTest, utilisateurModelActuel.PropTest);
}
```

Le test ne fonctionne plus car la méthode **VersUtilisateurModel** ne transfert pas la valeur. 

Est-ce un bon test ? Il faut s'assurer à chaque fois que le modèle est modifié de se souvenir de modifier ce test. En cas d'oubli, le test indique que tout est beau, car la propriété n'est pas dans l'assertion, mais dans la réalité, il y a une problématique. Si la méthode **VersUtilisateurModel** a un bug, il est possible que ce ne soit pas détecté.

Nous allons modifier la fonction afin que le test soit automatiquement évolutive. En cas de modification du modèle, il sera toujours fonctionnel.

En premier lieu, la librairie **FluentAssertions** permet de comparer les propriétés de 2 objets pour vérifier qu'ils sont identiques. Il n'est pas nécessaire que les objets soient du même type, mais les propriétés doivent avoir le même nom.

À la ligne 26, la méthode **utilisateurModelActuel.Should().BeEquivalentTo(utilisateur);** permet de comparer un **UtilisateurModel** avec un **Utilisateur** comme référence. Par contre, la classe **Utilisateur** a des propriétés supplémentaires (Navigations et MotPasseHash). Il faut ajouter l'option **options => options.ExcludingMissingMembers()** pour faire la comparaison uniquement avec les propriétés identiques. Maintenant, l'assertion est évolutive. En ajoutant une propriété dans le modèle de données et du domaine, il ne sera pas nécessaire de l'ajouter.

```csharp showLineNumbers
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
    //highlight-next-line
    utilisateurModelActuel.Should().BeEquivalentTo(utilisateur, options => options.ExcludingMissingMembers());
}
```

Exécutez le test et c'est un succès. Il devrait échouer, car le correctif n'a pas été fait dans la méthode **VersUtilisateurModel()**.

La raison est que la propriété **PropTest** n'a pas été assignée dans l'arrangement. Donc, la propriété à la valeur par défaut. Et la comparaison est identique, car dans la méthode à tester, il n'y a pas d'assignation également. C'est donc une vérification de valeur par défaut à valeur par défaut, donc la comparaison est valide.

Modifiez la méthode par celle-ci. Les lignes 11 et 21 sont pour l'assignation de la propriété **PropTest**. 

```csharp showLineNumbers
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
    //highlight-next-line
    const string propTest = "TestPropTest";

    Utilisateur utilisateur = new Utilisateur()
    {
        UtilisateurId = utilisateurId,
        Prenom = prenom,
        Nom = nom,
        NomUtilisateur = nomUtilisateur,
        MotPasseHash = motPasseHash,
        RoleId = roleId,
        //highlight-next-line
        PropTest = propTest
    };

    //Action (Act)
    UtilisateurModel utilisateurModelActuel = utilisateur.VersUtilisateurModel();

    //Assertion (Assert)
    utilisateurModelActuel.Should().BeEquivalentTo(utilisateur, options => options.ExcludingMissingMembers());
}
```

Exécutez le test et il sera maintenant en échec. Est-ce que le test est bon ? Plus ou moins, car il faut penser de mettre à jour le test à chaque modification du modèle, sinon la valeur par défaut sera utilisé pour la comparaison.

La librairie **AutoFixture** permet de créer des objets et que les propriétés aient des valeurs différentes de celles par défaut.

Modifiez la méthode par celle-ci.

À la ligne 5, il y a un objet **Fixture** qui permet de créer des objets.

À la ligne 6 à 10, c'est la mécanique de création. Il est possible d'exclure des propriétés avec la méthode **Without()**. Il est important d'exclure les propriétés de navigation ou du moins minimalement la propriété de navigation **1 à plusieurs (UtilisateurCarteListe)** . Il est important de faire ceci, car il y a une référence circulaire entre les classes du modèle de données avec **EntityFramework**. Si l'exclusion n'est pas faite, il y aura une exception, car l'objet sera toujours en création circulaire.

```csharp showLineNumbers
[Fact]
public void VersUtilisateurModel_CreerObjet_ValeursIdentiques()
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

Retirez la propriété **PropTest** de la classe **UtilisateurModel** uniquement. Exécutez le test et il sera positif. Il devrait toujours échouer. La raison est que la propriété **PropTest** n'est plus dans l'assertion, car elle est exclue par l'option **ExcludingMissingMembers()**.

Il serait idéal d'indiquer manuellement les propriétés à exclure. La méthode **.Excluding()** permet de spécifier une propriété à ignorer.

```csharp  showLineNumbers 
[Fact]
public void VersUtilisateurModel_CreerObjet_ValeursIdentiques()
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
    //highlight-start
        options => options.Excluding(x => x.MotPasseHash)
                          .Excluding(x => x.Role)
                          .Excluding(x => x.UtilisateurCarteListe));
    //highlight-end
}
```

Exécutez de nouveau le test. Le test sera un échec comme voulu.

Ajoutez de nouveau la propriété **PropTest** de la classe **UtilisateurModel** et testez de nouveau. Le test est toujours en échec comme voulu.

Retirez la propriété **PropTest** des classes **UtilisateurModel** et **Utilisateur**.

Testez de nouveau et le test sera un succès comme voulu.

Cette version du test est évolutive et teste réellement la copie.

Il n'est pas toujours possible de réaliser des tests évolutifs. Il est important que lorsqu'on modifie une classe, de s'assurer que les tests unitaires correspondants sont complets.

## Tester un validateur


Pour un validateur, il faut s'assurer que la validation fonctionne bien lorsque les valeurs sont valides et lorsque les valeurs sont invalides. Il faut tester les 2 possibilités. Il faut également tester tous les cas de validation (limites) pour une propriété.

### Ajout des classes à tester
Pour ce test, nous avons besoin d'ajouter un peu de code. Ce code était dans la section WPF partie 5 qui n'est plus enseignée. 

:::warning Attention
Ce code n'est pas complet. Il ne comprend que le code minimal nécessaire pour les tests. 
:::

Ajoutez l'interface **Core/Validateurs/IValidateurPropriete.cs**.

```csharp showLineNumbers
using SuperCarte.Core.Models;

namespace SuperCarte.Core.Validateurs;

/// <summary>
/// Interface qui valide un modèle du domaine avec la possibilité de spécifier des propriétés spécifiques
/// </summary>
/// <typeparam name="TModele">Type du modèle du domaine à valider</typeparam>
public interface IValidateurPropriete<TModele> where TModele : class
{
    /// <summary>
    /// Valider un objet du modèle du domaine pour des propriétés spécifiques
    /// </summary>
    /// <param name="modele">Modèle à valider</param>
    /// <param name="proprietesAValider">Propriété</param>
    /// <returns>Résultat de la validation</returns>
    Task<ValidationModel> ValiderAsync(TModele modele, params string[] proprietesAValider);
}
```

Ainsi que **Core/Validateurs/UtilisateurCarteValidateur.cs**.



```csharp showLineNumbers
using FluentValidation;
using FluentValidation.Results;
using SuperCarte.Core.Extensions;
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;

namespace SuperCarte.Core.Validateurs;

/// <summary>
/// Classe qui valide le modèle UtilisateurCarteModel
/// </summary>
public class UtilisateurCarteValidateur : AbstractValidator<UtilisateurCarteModel>, IValidateurPropriete<UtilisateurCarteModel>
{
    private readonly IUtilisateurCarteRepo _utilisateurCarteRepo;
    private readonly IUtilisateurRepo _utilisateurRepo;
    private readonly ICarteRepo _carteRepo;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="utilisateurCarteRepo">Repository de UtilisateurCarte</param>
    /// <param name="utilisateurRepo">Repository de Utilisateur</param>
    /// <param name="carteRepo">Repository de Carte</param>
    public UtilisateurCarteValidateur(IUtilisateurCarteRepo utilisateurCarteRepo,
        IUtilisateurRepo utilisateurRepo, ICarteRepo carteRepo)
    {
        _utilisateurCarteRepo = utilisateurCarteRepo;
        _utilisateurRepo = utilisateurRepo;
        _carteRepo = carteRepo;

        RuleFor(i => (int)i.Quantite).Cascade(CascadeMode.Stop)
            .InclusiveBetween(1, short.MaxValue).WithMessage($"La quantité doit être entre 1 et {short.MaxValue:N0}");
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
}
```

Ainsi que **Core/Models/UtilisateurCarteModel.cs**

```csharp showLineNumbers
namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient l'information d'une carte d'un utilisateur
/// </summary>
public class UtilisateurCarteModel
{
    public int UtilisateurId { get; set; }
    public int CarteId { get; set; }
    public short Quantite { get; set; }
}
```




### Retour aux tests
Créez la classe **UtilisateurCarteValidateurTest.cs** dans le dossier **UTest/Core/Validateurs**.

```csharp showLineNumbers
using SuperCarte.Core.Models;

namespace SuperCarte.UTest.Core.Validateurs;

/// <summary>
/// Tests unitaires pour la classe UtilisateurCarteValidateur
/// </summary>
public class UtilisateurCarteValidateurTest
{
}
```

Le validateur classique a seulement une méthode **ValiderAsync()**. 

Ce validateur possède 2 paramètres. Il n'y aura pas d'exemple pour l'utilisation du 2e paramètre.

Pour un validateur, il est important de tester une propriété à la fois, avec plusieurs valeurs. Les cas limites sont importants.

Par exemple, pour une chaine de caractères, il faut tester toutes les variations du champ obligatoire.

- Vide

- Null

- Uniquement espace. 


Pour une propriété qui a une valeur minimale ou maximale, il faut tester les cas limites ( limite -1, limite, limite+1).

Il faut également tester le cas valide et non valide. 

### Propriété Quantite

La propriété **Quantite** peut accepter une valeur entre 1 et 32 767 (valeur maximale du **short**).

Pour le test qui s'assure que le champ est valide, il faut tester les valeurs limites.

- 1
- 32 767 (**short.MaxValue**)
- Et une entre les 2

Pour le test qui s'assure que le champ est invalide, il faut tester les valeurs en dehors.

- 0
- -10

Si la propriété acceptait entre 1 et 250, il faudrait également tester 251. Mais pour ce validateur, il n'est pas possible de spécifier une valeur au-delà du maximum du type.

Afin d'éviter d'écrire plusieurs tests pour chacune des valeurs, il est possible d'utiliser l'annotation **[Theory]** au lieu de **[Fact]**. Cette nouvelle annotation permet de spécifier les paramètres pour le même test avec l'annotation **[InlineData]**.

Créez la méthode **ValiderAsync_Quantite_Valide**. 

Remarquez que la méthode possède un paramètre **quantite** (ligne 5).

La méthode a plusieurs annotations (ligne 2 à 4). Ce test sera exécuté 3 fois. La première fois, le paramètre **quantite** aura la valeur 1. La deuxième fois, la valeur sera 32 767 et la troisième fois, la valeur sera 15657.

La propriété **Quantite** de l'objet **utilisateurCarteModel** utilise la valeur du paramètre (ligne 10). 

Il faut ensuite créer les simulacres pour les dépendances. Il n'est pas nécessaire de les configurer, car pour ce test, elles ne seront pas utilisées (lignes 13 à 15).

À la ligne 17, il y a la création du service et à la ligne 23 il y a l'exécution.

Finalement, l'assertion doit se faire sur la propriété des messages d'erreur. Il n'est pas possible d'utiliser la propriété **EstValide**, car cette propriété considère toutes les erreurs. Les autres propriétés sont ignorées dans le test, donc elles ne sont pas contrôlées. Il n'est pas possible de prédire leur comportement. Donc, si le **dictionnaire** d'erreur ne contient pas la propriété **Quantite** (ligne 26), la propriété est valide.

```csharp showLineNumbers
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
    //highlight-next-line
    Assert.False(validationModel.ErreurParPropriete.ContainsKey(nameof(utilisateurCarteModel.Quantite)));
}
```

Voici le test pour le cas invalide. 

Le tout est identique, à l'exception des valeurs pour la quantité et l'assertion. Maintenant, pour que le test soit réussi, il faut que l'erreur soit présente.

```csharp showLineNumbers
[Theory]
//highlight-start
[InlineData(0)] //Limite
[InlineData(-10)] //Négatif    
//highlight-end
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
    //highlight-next-line   
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

Modifiez la classe **UtilisateurCarteValidateur** pour recevoir la dépendance **IStringLocalizer\<ResUtilisateurCarteValidateur>**(lignes 19, 30 et 35).

La règle pour la quantité utilise le texte du fichier ressource (ligne 38).

```csharp showLineNumbers
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
    //highlight-next-line
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
        //highlight-next-line
        IStringLocalizer<ResUtilisateurCarteValidateur> resUtilisateurCarteValidateur)
    {
        _utilisateurCarteRepo = utilisateurCarteRepo;
        _utilisateurRepo = utilisateurRepo;
        _carteRepo = carteRepo;
        //highlight-next-line
        _resUtilisateurCarteValidateur = resUtilisateurCarteValidateur;

        RuleFor(i => (int)i.Quantite).Cascade(CascadeMode.Stop)
        //highlight-next-line
            .InclusiveBetween(1, short.MaxValue).WithMessage(resUtilisateurCarteValidateur["Quantite_PlageInvalide"]);
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
}
```

Il faudra maintenant créer, dans les tests, un simulacre pour le message d'erreur car il est nécessaire dans le constructeur du validateur. 

Pour le test **valide**, il faut configurer le simulacre pour retourner un message d'erreur, peu importe la ressource demandée (ligne 17). Ce message peut être n'importe quoi, car il ne sera pas testé dans l'assertion. 


```csharp showLineNumbers
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
    //highlight-next-line
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

Pour le test **non valide**, il faut configurer le message d'erreur et vérifier dans l'assertion que c'est ce même message qui est retourné. Il y a un risque que le validateur n'utilise pas la bonne clé de ressource. Il faut donc le valider que c'est bien la bonne ressource qui est utilisée. 

Le fonctionnement d'un Mock est le suivant: si la clé de message "Quantite_PlageInvalide" est demandée, alors retourne messageErreurAttendu (ligne 18). Ce qui est important, ce n'est pas le contenu du message retourné, c'est le fait que la bonne clé ait été demandée. 

À la ligne 7, il faut créer la constante pour le message d'erreur attendu. Il est utilisé pour configurer le simulacre de la ressource à la ligne 18, et vérifier que c'est bien le bon message qui est retourné à la ligne 31.

À la ligne 31, il y a une nouvelle assertion qui vérifie que le message d'erreur attendu est celui qui a été obtenu.

```csharp showLineNumbers
[Theory]
[InlineData(0)] //Limite
[InlineData(-10)] //Négatif    
public async Task ValiderAsync_Quantite_NonValide(short quantite)
{
    //Arrangement (Arrange)       
    //highlight-next-line 
    const string messageErreurAttendu = "Quantite_PlageInvalide_Test";

    UtilisateurCarteModel utilisateurCarteModel = new UtilisateurCarteModel()
    {
        Quantite = quantite
    };

    var utilisateurCarteRepo = new Mock<IUtilisateurCarteRepo>();
    var carteRepo = new Mock<ICarteRepo>();
    var utilisateurRepo = new Mock<IUtilisateurRepo>();
    var ressource = new Mock<IStringLocalizer<ResUtilisateurCarteValidateur>>();
    //highlight-next-line
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
    //highlight-next-line
    Assert.Equal(messageErreurAttendu, validationModel.ErreurParPropriete[nameof(utilisateurCarteModel.Quantite)]);
}
```

Exécuter le test, il devrait passer. 

### Validation des tests

Il est toujours bon de vérifier si les tests sont valides. Pour ce faire, on veut provoquer une erreur.

Vous pouvez changer les valeurs dans le test lui même, ou changer le code qui est testé. 

Par exemple, pour le test de valide, on pourrait changer la valeur 1 pour -1 dans le test. Le test devrait alors donner une erreur. 

Autre exemple, dans UtilisateurCarteValidateur, au lieu de 

**WithMessage(resUtilisateurCarteValidateur["Quantite_PlageInvalide"])**

 inscrivez 
 
 **WithMessage("allo")**
 
 Le test pour invalide devrait alors indiquer **Expected: "Quantite_PlageInvalide_Test" Actual allo**

 Il est très important de faire *planter* un test au moins une fois afin de s'assurer qu'il teste quelquechose. 

## Tester un service - UtilisateurCarteService

Créez la classe **UtilisateurCarteServiceTest** dans le dossier **SupertCarte.UTest/Core/Services**.

```csharp showLineNumbers
namespace SuperCarte.UTest.Core.Services;

/// <summary>
/// Tests unitaires pour la classe UtilisateurCarteService
/// </summary>
public class UtilisateurCarteServiceTest
{
}
```
### Ajout pour les tests

Ici aussi les tests sont pour du code qui était prévu pour la partie 5 des notes de cours sur WPF. Nous allons donc ajouter un peu de code pour les faire. 

:::warning Attention
Ce code n'est pas complet. Il ne comprend que le code minimal nécessaire pour les tests. 
:::

Dans **SuperCarte.Core/Extensions** ajoutez la classe **UtilisateurCarteMapExtension.cs**

```csharp showLineNumbers
using SuperCarte.Core.Models;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Extensions;
public static class UtilisateurCarteMapExtension
{
    public static UtilisateurCarteModel VersUtilisateurCarteModel(this UtilisateurCarte item)
    {
        return new UtilisateurCarteModel()
        {
            UtilisateurId = item.UtilisateurId,
            CarteId = item.CarteId,
            Quantite = item.Quantite
        };
    }

     public static UtilisateurCarte VersUtilisateurCarte(this UtilisateurCarteModel item)
    {
        return new UtilisateurCarte()
        {
            UtilisateurId = item.UtilisateurId,
            CarteId = item.CarteId,
            Quantite = item.Quantite
        };
    }

    public static void Copie(this UtilisateurCarteModel itemDestination, UtilisateurCarte utilisateurCarteSource, bool copierClePrimaire)
    {
        if (copierClePrimaire == true)
        {
            itemDestination.UtilisateurId = utilisateurCarteSource.UtilisateurId;
            itemDestination.CarteId = utilisateurCarteSource.CarteId;
        }

        itemDestination.Quantite = utilisateurCarteSource.Quantite;
    }
}
```

Dans **SuperCarte.Core/Repositories/IUtilisateurCarteRepo.cs**, ajoutez cette déclaration:

```csharp showLineNumbers
    Task<UtilisateurCarte?> ObtenirParCleAsync(int utilisateurId, int carteId);
```

Dans **SuperCarte.Core/Repositories/UtilisateurCarteRepo.cs**, ajoutez cette fonction:

```csharp showLineNumbers
public async Task<UtilisateurCarte?> ObtenirParCleAsync(int utilisateurId, int carteId)
{
    return await (from lqUtilisateurCarte in _bd.UtilisateurCarteTb
                  where
                       lqUtilisateurCarte.UtilisateurId == utilisateurId &&
                       lqUtilisateurCarte.CarteId == carteId
                  select
                    lqUtilisateurCarte).FirstOrDefaultAsync();
}
```
Dans **SuperCarte.Core/Services/IUtilisateurCarteService.cs**, ajoutez ces déclarations:

```csharp showLineNumbers
    Task<UtilisateurCarteModel?> ObtenirAsync(int utilisateurId, int carteId);
    Task<bool> AjouterAsync(UtilisateurCarteModel utilisateurCarteModel);
    Task<ValidationModel> ValiderAsync(UtilisateurCarteModel utilisateurCarteModel, bool validerPourAjout);
```

Dans **SuperCarte.Core/Services/UtilisateurCarteService.cs**, ajoutez ce using:
```csharp showLineNumbers
using SuperCarte.Core.Extensions;
```
Dans **SuperCarte.Core/Services/UtilisateurCarteService.cs**, modifiez le constructeur et ajoutez _utilisateurCarteValidateur:
```csharp showLineNumbers
    private readonly IValidateurPropriete<UtilisateurCarteModel> _utilisateurCarteValidateur;

```
```csharp showLineNumbers
 public UtilisateurCarteService(IUtilisateurCarteRepo utilisateurCarteRepo,
     IValidateurPropriete<UtilisateurCarteModel> utilisateurCarteValidateur)
 {
     _utilisateurCarteRepo = utilisateurCarteRepo;
     _utilisateurCarteValidateur = utilisateurCarteValidateur;
 }

```

Dans **SuperCarte.Core/Services/UtilisateurCarteService.cs**, ajoutez ces fonctions:

```csharp showLineNumbers
//////
public async Task<UtilisateurCarteModel?> ObtenirAsync(int utilisateurId, int carteId)
{
    UtilisateurCarte? utilisateurCarte = await _utilisateurCarteRepo.ObtenirParCleAsync(utilisateurId, carteId);

    return utilisateurCarte?.VersUtilisateurCarteModel();
}
 
public async Task<bool> AjouterAsync(UtilisateurCarteModel utilisateurCarteModel)
{
    if ((await ValiderAsync(utilisateurCarteModel, true)).EstValide == true)
    {
        //Transformation de l'objet du modèle du domaine en objet du modèle de données
        UtilisateurCarte utilisateurCarte = utilisateurCarteModel.VersUtilisateurCarte();

        //Ajout dans repository avec enregistrement immédiat
        await _utilisateurCarteRepo.AjouterAsync(utilisateurCarte, true);

        utilisateurCarteModel.Copie(utilisateurCarte, false);

        return true;
    }
    else
    {
        return false;
    }
}

public async Task<ValidationModel> ValiderAsync(UtilisateurCarteModel utilisateurCarteModel, bool validerPourAjout)
{
    if (validerPourAjout == true)
    {
        return await _utilisateurCarteValidateur.ValiderAsync(utilisateurCarteModel);
    }
    else
    {
        return await _utilisateurCarteValidateur.ValiderAsync(utilisateurCarteModel,
            nameof(utilisateurCarteModel.Quantite));
    }
}
```

### Test ObtenirCartesUtilisateurAsync

Est-ce qu'il y a quelque chose à tester dans la méthode **UtilisateurCarteServices.cs/ObtenirCartesUtilisateurAsync** ?


```csharp showLineNumbers
public async Task<List<QuantiteCarteDetailModel>> ObtenirCartesUtilisateurAsync(int utilisateurId)
{
    return await _utilisateurCarteRepo.ObtenirCartesUtilisateurAsync(utilisateurId);
}
```

Cette méthode effectue uniquement un appel au **repository** sans aucune logique. Il n'est pas nécessaire de faire un test pour cette méthode.

Le seul test possible serait de s'assurer que la méthode retourne exactement la même chose de ce que le **repository** retourne. Les tests doivent avoir une valeur et celui-ci n’en donne pas réellement. Comment ce test s'appellerait-il ? S'il est difficile de nommer le test, c'est souvent un indicateur qu'il n'est pas utile.

### Test ObtenirAsync

Voici la méthode **ObtenirAsync**. 


```csharp showLineNumbers
public async Task<UtilisateurCarteModel?> ObtenirAsync(int utilisateurId, int carteId)
{
    UtilisateurCarte? utilisateurCarte = await _utilisateurCarteRepo.ObtenirParCleAsync(utilisateurId, carteId);

    return utilisateurCarte?.VersUtilisateurCarteModel();
}
```

Est-ce qu'il faut la tester ? Celle-ci à 2 cas de test.

#### Insertion des clés

Le premier test est de s'assurer que les paramètres ne sont pas inversés en appelant le **repository**.

Créez la méthode **ObtenirAsync_ParametreRepo_BonOrdre()** dans **UtilisateurCarteServiceTest**. Remarquez que la méthode est asynchrone, car celle à tester est asynchrone.


Il faut créer les constantes pour les clés (lignes 5 et 6).

Le service a 2 dépendances. Il faut créer les simulacres. Il n'est pas nécessaire de les configurer (lignes 8 et 9).


Ensuite, il faut exécuter la méthode (ligne 16). La méthode est asynchrone, il ne faut pas oublier le **await**. Il n'est pas nécessaire de récupérer l'objet de retour, car il n'est pas nécessaire à l'assertion.

Finalement, l'assertion est sur le comportement.

Il est possible de vérifier si un appel a été fait sur une méthode d'un simulacre.

À la ligne 19, il est vérifié que la méthode est appelée seulement une fois avec les paramètres de l'arrangement. Il est important que les valeurs des clés soient différentes pour détecter leur inversion. À la ligne 20, l'assertion est que la méthode n'est jamais appelée avec une inversion.

```csharp showLineNumbers
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

Exécutez le test, il devrait passer.

Mais comme recommendé, il faut que le test plante afin de s'assurer que l'on test la bonne chose. Modifiez temporairement la méthode **ObtenirAsync()** du service par celle-ci. Le programmeur a utilisé 2 fois la clé **utilisateurId**. Testez de nouveau et le test sera en échec.

```csharp showLineNumbers
public async Task<UtilisateurCarteModel?> ObtenirAsync(int utilisateurId, int carteId)
{
    //highlight-next-line
    UtilisateurCarte? utilisateurCarte = await _utilisateurCarteRepo.ObtenirParCleAsync(utilisateurId, utilisateurId);

    return utilisateurCarte?.VersUtilisateurCarteModel();
}
```

Ré-exécutez le test. Cette fois-ci, il sera en erreur. 

Remettez la fonction ObtenirAsync comme elle était. 

#### Conversion de UtilisateurCarte vers UtilisateurCarteModel

Le 2e test est de s'assurer que la conversion de **UtilisateurCarte** vers **UtilisateurCarteModel** est correcte.

Cette conversion est effectuée par la ligne 

```csharp showLineNumbers title="NE PAS COPIER"
        return utilisateurCarte?.VersUtilisateurCarteModel();
```

Est-ce nécessaire de tester ce cas si le test unitaire de **utilisateurCarte?.VersUtilisateurCarteModel()** a déjà été fait ?


:::note
Ici, on ne veut pas tester si le programmeur à utiliser ou non la bonne fonction, on veut savoir si, peut importe comment c'est fait, que c'est bien fait. 

Le but de la fonction ObtenirAsync est d'obtenir un objet de donnée à partir de la source (ici une bd) et de retourner un objet du domaine. Il faut donc vérifier que cette conversion est bien faite. 
:::

Imaginez que le programmeur oublie d'utiliser la méthode d'extension et il le fait directement dans la classe comme dans l'exemple ci-dessous. Tester VersUtilisateurCarteModel() serait inutile dans ce cas-ci. Un test ne doit pas dépendre d'un autre test pour le considérer valide. 

```csharp showLineNumbers title="NE PAS COPIER"
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

<!-- je connais pas auto-mapper
Si c'était une dépendance comme auto-mapper, la méthode ressemblerait à ceci.

Il faudrait seulement tester que le **mapper** est appelé correctement sans se soucier du résultat de l'assignation. Le **mapper** serait simulé dans le test. 

```csharp showLineNumbers
public async Task<UtilisateurCarteModel?> ObtenirAsync(int utilisateurId, int carteId)
{
    UtilisateurCarte? utilisateurCarte = await _utilisateurCarteRepo.ObtenirParCleAsync(utilisateurId, utilisateurId);
    
    return _mapper.Map<UtilisateurCarteModel>(UtilisateurCarte);
}
```

Voici un exemple que le choix d'utiliser des extensions pour le **mappage** n'est peut-être pas le meilleur choix pour les tests. Il arrive souvent que la conception des tests mette en évidence les faiblesses du code.
-->

Voici la méthode pour le test. Ajoutez la dans **UtilisateurCarteServiceTests**

Aux lignes 5 à 10, l'objet est créé à l'aide de la librairie **AutoFixture** pour assigner tous les champs.

À la ligne 13, il faut configurer le simulacre pour le **repository** pour retourner l'utilisateur généré à la ligne 6. Également, ce sont les vraies valeurs qui sont spécifiées pour les clée dans la configuration. Mais il aurait été aussi valide de mettre **It.IsAny\<int>()**, car le test s'occupe uniquement de la conversion. Le test **ObtenirAsync_ParametreRepo_BonOrdre** s'occupe de l'ordre des paramètres.

Le mock pour le repository (ligne 12) est configuré de la facon suivante (ligne 13): si un appel à ObtenirParCleAsync est fait, retourne utilisateurCarte. L'action du test va donc appeler la vrai fonction UtilisateurCarteService/ObtenirAsync() (ligne 22). Celle-ci va appeler **_utilisateurCarteRepo.ObtenirParCleAsync**, mais étant donné que _utilisateurCarteRepo est généré via une interface, ce n'est pas le vrai qui sera injecté, c'est le Mock. Ce Mock interceptera donc ObtenirParCleAsync et retournera utilisateurCarte. C'est donc notre utilisateurCarte qui sera converti en UtilisateurCarteModel. Donc c'est la convertion qui est testée. 

À la ligne 27, la librairie **FluentValidation** fait la comparaison entre l'objet du modèle du domaine obtenu avec celui créé.

```csharp showLineNumbers
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

Modifiez la méthode du service avec la version ci-dessous. 

```csharp showLineNumbers
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
Réexécutez le test. Le test sera encore un succès.

Maintenant remplacer utilisateurCarte.Quantite à la ligne 11 par un entier quelconque, et reexécutez le test. Il devrait planter. Je dis bien "devrait" car il la fixture génère un nombre alératoire pour cette quantité. Il y a donc une faible chance que la valeur aléatoire et votre valeur soit les mêmes. Si c'est le cas, réessayez une autre fois... s'il n'y a toujours pas d'erreur ... allez vous acheter un 6/49.

Remettez la fonction à son état original. 
### Tester AjouterAsync

CategorieService/AjouterAsync


Pour cette méthode, il y a plusieurs cas.

- Si l'objet n'est pas valide, l'enregistrement ne s'effectue pas.
- Si le modèle est valide, l'enregistrement s'effectue
- Avant l'insertion, l'objet du modèle du domaine est converti correctement en modèle de donnée
- Après l'insertion, l'objet du modèle de données est mis à jour à partir du modèle.

Seulement le premier test sera présenté. 

Les 2 derniers sont plus complexes, car il faut intercepter l'objet envoyer en paramètre. Il faut utiliser la notion de **callback** dans la configuration du **mock**. Cette notion ne sera pas présentée. 

#### AjouterAsync_ModeleInvalide_RepoNonAjout

Le premier test est de s'assurer que le **repository** n'ajoute pas l'objet lorsque le modèle du domaine n'est pas valide. Ce test est un test comportemental, car il ne valide pas un résultat, mais si un comportement est bien exécuté.

Créez la méthode **AjouterAsync_ModeleInvalide_RepoNonAjout()**. Remarquez que la méthode est asynchrone, car celle à tester est asynchrone.

Il faut créer l'objet du modèle à ajouter (ligne 5). Cet objet peut être vide, car il ne sera pas réellement validé ou ajouté.

Il faut créer l'objet **ValidationModel** avec une erreur(lignes 7 et 8).

Le **validateur** (ligne 10) est créé. À la ligne 11, il faut le configurer pour retourner le **ValidationModel** en erreur lorsque l'objet du modèle lui est envoyé.

Il faut également un **repository** (ligne 13).   Aucune configuration n'est nécessaire.

Le service est créé à la ligne 15.

À la ligne 20, la méthode est exécutée en envoyant l'objet du modèle de la ligne 5.

À la ligne 23, la première assertion est qu'il faut s'assurer que la méthode **ValiderAsync()** du validateur a été appelée seulement une fois avec le modèle du domaine qui a été envoyé.

À la ligne 24, la 2e assertion est qu'il faut s'assurer que la méthode **AjouterAsync()** du **repository** n'est jamais appelée, peu importe les paramètres.

```csharp showLineNumbers
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
Si vous exécutez le test, il va passer. 

Pour vérifier si le test est fonctionnel, mettez en commentaire la ligne 8. Le validateur ne donnera donc pas d'erreur et la méthode AjouterAsync sera exécuté. 

Mais si AjouterAsync est appelé, est-ce qu'un enregistrement sera ajouté dans la bd ?

La réponse est non, car le repository est mocked aussi. Mais si on avait utilisé un vrai repository (par exemple, si celui-ci n'était pas injecté), alors oui, le test aurait ajouté une entrée. Il faut donc faire attention aux tests pour ne pas corrompre la bd si elle est en production. Mais si vous avez bien fait les choses, et que vous injecté un repository mock, alors pas de risque. 


## Tester un repository

**IMPORTANT**. Le repository n'est plus à tester pour le **TP 3**.

## Tester ViewModel - ListeCategoriesVM

Pour tester le **ViewModel**, il faut regarder le comportement des propriétés et des commandes en fonction d'un changement d'état d'une propriété ou d'un appel d'une commande.

Nous allons faire le test pour l'état du bouton supprimer.

:::info Rappel
Si nous nous rappelons la logique de l'interface, le bouton supprimer pour les catégories est disponible seulement si une catégorie est sélectionnée dans la liste et si cette catégorie n'est associé à aucune carte (voir ListeCategorieVM/PeutSupprimer qui est utilisé dans le constructeur afin de bloquer SupprimerCommande  )
:::
Il faut tester les 4 cas ci-dessous :

- Aucune catégorie sélectionnée
- La catégorie a des dépendances
- La catégorie retourne un objet **null** pour la dépendance
- La catégorie n'a pas de dépendance

Créez la classe **ListeCategoriesVMTest** dans le dossier **UTest\WPF\ViewModels**.

```csharp showLineNumbers
/// <summary>
/// Tests unitaires pour la classe ListeCategoriesVM
/// </summary>
public class ListeCategoriesVMTest
{
}
```

### Test SupprimerCommande_CategorieNonSelectionnee_NePeutSupprimer

Ce test permet de déterminer qu'il n'est pas possible d'exécuter la commande si aucune catégorie n'est sélectionnée.

Créez la méthode **SupprimerCommande_CategorieNonSelectionnee_NePeutSupprimer()**.

La classe **ListeCategoriesVM** a 4 dépendances.

- INavigateur
- INotification
- ICategorieService
- IAuthentificateur

Il faut créer un simulacre pour chacun des services avec la librairie **Moq**.

Pour ce test, il faut considérer que l'utilisateur est autorisé à utiliser la commande. Il faut donc configurer le simulacre (lignes 12 et 13). Donc peu importe le rôle demandé, l'authentificateur retourne toujours **true** pour ce test.

Ensuite, il faut créer le **ViewModel** en injectant les simulacres (ligne 15).

Ensuite, il faut faire les actions. Il y en a 2.

La première action est d'indiquer qu'aucune catégorie n'est sélectionnée (ligne 21).

Ensuite, il faut récupérer la valeur de la méthode **CanExecute()** de la commande **SupprimerCommande** (ligne 23).

Finalement, l'assertion est que la valeur de **canExecuteActuel** doit être à **false**.

```csharp showLineNumbers
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
Ici pour faire planter le test, il suffit d'ajouter un **return true** au début de **PeutSupprimer()** afin de simuler une erreur de logique dans cette fonction car c'est celle-ci qui controle si SupprimerCommande peut s'exécuter ou non. Dans ce test, on vérifiait si le fait de n'avoir rien de sélectionné (ligne 21) empêchait d'effacer.

### Test SupprimerCommande_CategorieAvecDependance_NePeutSupprimer

Ce test permet de déterminer qu'il n'est pas possible d'exécuter la commande si la catégorie sélectionnée a une dépendance.

Créez la méthode **SupprimerCommande_CategorieAvecDependance_NePeutSupprimer()**.

Le test est assez similaire au précédent. Il faut maintenant configurer la méthode **ObtenirDependance()** de **CategorieService** pour indiquer qu'il y a une dépendance (ligne 9).

À la ligne 22, il faut créer un objet de type  **CategorieModel** pour indiquer qu'une catégorie est sélectionnée.

```csharp showLineNumbers
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
Ici aussi, la fonction qu'on test ultimement est PeutSupprimer(). Donc en ajoutant return true au début de cette fonction, on vérifie que le test est ok. 

Est-ce que vous voyez une faille dans le test qui pourrait indiquer un mauvais résultat en cas d'une modification du logiciel ? Imaginez qu'une nouvelle table utilise **Categorie** comme clé étrangère. La classe **CategorieDependance** va avoir une nouvelle propriété **NbNouvelleTables**. Il faudra penser de modifier le test pour en tenir compte et également le **ViewModel**.

Avez-vous une solution pour ceci ?

Il faudrait modifier le concept des classes de type **Dépendance**. Est-ce nécessaire d'avoir le nombre d'éléments par dépendance ? Si ce n'est pas nécessaire, il suffirait de retourner un booléen pour indiquer s'il y a une dépendance ou non. Si le nombre de dépendances est nécessaire, il faudrait modifier la classe comme ci-dessous.

```csharp showLineNumbers title="NE PAS COPIER"
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

Ce test permet de déterminer qu'il est possible d'exécuter la commande si la catégorie sélectionnée retourne une dépendance **null**.

À la ligne 9, le simulacre retourne un objet **null**.

```csharp showLineNumbers
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

Créez la méthode **SupprimerCommande_CategorieSansDependance_PeutSupprimer()**.

```csharp showLineNumbers
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

Pour être en mesure de le faire, il faut ajouter une méthode à l'événement **CanExecuteChanged** de la commande (ligne 25). Cette méthode incrémente un compteur à chaque appel.

L'assertion détermine si le compteur correspond à la valeur attendue (ligne 38).

```csharp showLineNumbers
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

