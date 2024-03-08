---
sidebar_position: 830
draft: true
---

# Test d'intégration

Vous devez créer un nouveau projet de type **xUnit** dans votre solution.

Nommez le projet **SuperCarte.ITest** et utilisez **.NET 7**.

Créez un dossier **ViewModels** à la racine du projet.

## Modification de la cible du projet

Il faut modifier la cible du projet. Le projet **ITest** utilisera le projet **.WPF** qui est disponible uniquement pour **Windows**.

Effectuez un double-clic sur l'entête du projet **SuperCarte.ITest** pour voir le **XML** de configuration.

Vous devez modifiez la balise **` <TargetFramework>net7.0</TargetFramework>`** par **` <TargetFramework>net7.0-windows</TargetFramework>`**. Enregistrez le fichier.

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

Effectuez un clic-droit sur le dossier **Dépendances** du projet **SuperCarte.ITest**. Sélectionnez **Ajouter une référence de projet...**.

Cochez **SuperCarte.WPF**, **SuperCarte.Core** et **SuperCarte.EF**.

Compilez le projet. Si vous avez les erreurs ci-dessous, l'étape 11.1 n'a pas été faite correctement.

```
Gravité	Code	Description	Projet	Fichier	Ligne	État de la suppression
Erreur	NETSDK1005	Le fichier de composants \SuperCarteApp\SuperCarte.ITest\obj\project.assets.json' n'a aucune cible pour 'net7.0'. Vérifiez que la restauration s'est exécutée et que vous avez inclus 'net7.0' dans TargetFrameworks pour votre projet.	SuperCarte.Test	C:\Program Files\dotnet\sdk\7.0.102\Sdks\Microsoft.NET.Sdk\targets\Microsoft.PackageDependencyResolution.targets	267	

Gravité	Code	Description	Projet	Fichier	Ligne	État de la suppression
Erreur		Le projet « ..\SuperCarte.WPF\SuperCarte.WPF.csproj » cible « net7.0-windows ». Il ne peut pas être référencé par un projet qui cible « .NETCoreApp,Version=v7.0 ».	SuperCarte.Test	C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Current\Bin\amd64\Microsoft.Common.CurrentVersion.targets	1830	
```

## Configuration de l'injection de dépendances

Pour simuler correctement l'environnement de production, il faut que le projet soit configuré avec de l'injection de dépendances.

Pour ce faire, vous devez installer la librairie **Xunit.DependencyInjection**.

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. Il est important que le **Projet par défaut** **.ITest** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.ITest**.

```
Install-Package Xunit.DependencyInjection
```

Créez la classe **Startup.cs** à la racine du projet.

Cette classe est l'équivalent du **Program.cs** ou du **App.xaml.cs**.

Le **navigateur** et la **notification** ne seront pas injectés. Il faudra utiliser un simulacre pour ces 2 dépendances.

```c#
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SuperCarte.EF.Data.Context;
using SuperCarte.WPF.Aides;
using SuperCarte.WPF.Extensions.ServiceCollections;

namespace SuperCarte.ITest;

public class Startup
{
    /// <summary>
    /// Méhthode qui permet d'enregistrer les services
    /// </summary>
    /// <param name="services">Collection de services</param>
    /// <param name="context">Context de l'application</param>
    public void ConfigureServices(IServiceCollection services,
    HostBuilderContext context)
    {
        services.AddLocalization();
        
        services.AddDbContext<SuperCarteContext>(options => options.UseSqlServer(context.Configuration.GetConnectionString("DefaultConnection")));
        
        services.AddSingleton<IAuthentificateur, Authentificateur>();
        
        services.EnregistrerRepositories();
        services.EnregistrerServices();
        services.EnregistrerValidateurs();
        services.EnregistrerViewModels();
    }

    public void ConfigureHost(IHostBuilder hostBuilder) =>
        hostBuilder.ConfigureHostConfiguration(builder => {
        builder.AddJsonFile("appsettings.json");
        });
}
```

Créez le fichier de configuration **appsettings.json**. N'oubliez pas de modifier la propriété **Copier dans le répertoire de sortie** pour mettre la valeur **Copier si plus récent**.

Pour faire des tests d'intégration, il est recommandé d'utiliser une base de données de test. Ajoutez le suffixe **_Test** dans le nom de la base de données.

```c#
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLExpress;Database=eDA_4N1_SuperCarte_Test;Trusted_Connection=True;Trust Server Certificate=true;"
  }
}
```

## Installation des librairies

Il faut installer les librairies qui seront utiles pour les tests.

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. Il est important que le **Projet par défaut** **.ITest** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.ITest**.

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

## Utilitaire pour la BD

Pour chacun des tests d'intégration, il faut utiliser une base de données. Il est recommandé d'utiliser une base de données propres aux tests.

Également, il est préférable de réinitialiser la base de données pour chaque test et de créer les données dépendantes selon le cas.

Créez le dossier **Aides** à la racine du projet **SuperCarte.ITest**.

Créez la classe **UtilitaireBD**.

```c#
using Microsoft.EntityFrameworkCore;
using SuperCarte.EF.Data.Context;

namespace SuperCarte.ITest.Aides;

/// <summary>
/// Classe qui permet de gérer la base de données pour les tests
/// </summary>
public class UtilitaireBD
{
    private readonly SuperCarteContext _bd;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="bd">Contexte de la base de données</param>
    public UtilitaireBD(SuperCarteContext bd)
    {
        _bd = bd;
    }

    /// <summary>
    /// Initialise la base de données Test et applique la migration
    /// </summary>
    public void Initialiser()
    {
        //Supprime la base de données si elle existe
        _bd.Database.EnsureDeleted();

        //Applique la dernière migration 
        //Équivalent de Update-Database
        _bd.Database.Migrate();        
    }

    public SuperCarteContext BDContext 
    { 
        get 
        { 
            return _bd; 
        } 
    }
}
```

La méthode **`Initialiser()`** permet de supprimer la base de données **test** si elle existe. Ensuite, elle applique toutes les migrations.

La propriété **BDContext** permet d'avoir accès au contexte par la classe de test. Il peut être nécessaire d'avoir accès au contexte pour créer les données initiales pour un test. Également, il peut être nécessaire d'interroger la base de données pour faire les assertions.

Il est possible également d'ajouter des méthodes d'insertion de données dans cette classe. Un même jeu de données de test peut être utilisé par plusieurs tests.

Il faut enregistrer cette classe dans les dépendances.

Modifiez la méthode **ConfigureServices** de la classe **Startup.cs**.

```c#
public void ConfigureServices(IServiceCollection services,
        HostBuilderContext context)
{
    services.AddDbContext<SuperCarteContext>(options => options.UseSqlServer(context.Configuration.GetConnectionString("DefaultConnection")));

    services.AddScoped<UtilitaireBD>();

    services.EnregistrerRepositories();
    services.EnregistrerServices();
    services.EnregistrerValidateurs();
    services.EnregistrerViewModels();
}
```

## Désactivation du parallélisme

Dans le fichier **Usings.cs**, il faut indiquer que l'exécution des tests doit se faire en séquence.

Chaque test a créé une nouvelle base de données et doit avoir un jeu de données fixe. Pour permettre l'exécution en parallèle, chaque test devrait avoir sa propre base de données.

```c#
global using Xunit;
[assembly: CollectionBehavior(DisableTestParallelization = true)]
```

# Liste de tests d'intégration

Voici une liste de tests d'intégration. Pour le **TP 3**, vous devez faire 2 tests d'intégration. Vous pouvez réutiliser les exemples de ce document et d'ajouter les éléments manquants. Seulement le test **12.2.1** ne peut pas être réutilisé. 

Les exemples sont incomplets pour le **TP 3**, car le **ViewModel** en démonstration dans les notes de cours n'a pas toutes les fonctionnalités (sécurité, notification).

À partir du **ViewModel** de type liste.

- Obtenir la liste
- Supprimer
- Empêcher la suppression s'il y a une dépendance
- Tester la sécurité

À partir du **ViewModel** de type **Gestion**.

- Obtenir l'item et il doit exister
- Obtenir l'item et il n'existe pas
- Ajouter
- Empêcher l'ajout par la validation
- Modifier
- Empêcher la modification par la validation

- Supprimer
- Empêcher la suppression s'il y a une dépendance
- Tester la sécurité

## GestionCategorieVM

Créez la classe **GestionCategorieVMUTest.cs** dans le dossier **ViewModels**.

La classe **UtilitaireBD** permet d'initialiser la base de données de test.

L'interface **ICategorieService** est le service réel.

Cette classe va utiliser des dépendances pour faire fonctionner les tests. Il faut inclure toutes les dépendances réelles dont le **ViewModel** a besoin. Celui du **TP 3** va avoir besoin de **l'authenficitateur**.

```c#
using FluentAssertions;
using SuperCarte.Core.Services;
using SuperCarte.EF.Data;
using SuperCarte.ITest.Aides;
using SuperCarte.WPF.ViewModels;

namespace SuperCarte.ITest.ViewModels;

/// <summary>
/// Test d'intégration à partir de GestionCategorieVM 
/// </summary>
public class GestionCategorieVMUTest
{    
    private readonly UtilitaireBD _utilitaireBD;    
    private readonly ICategorieService _categorieService;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="utilitaireBD">Utilitaire de la BD</param>
    /// <param name="categorieService">Service du module Categorie</param>
    public GestionCategorieVMUTest(UtilitaireBD utilitaireBD,
        ICategorieService categorieService)
	{        
        _utilitaireBD = utilitaireBD;        
        _categorieService = categorieService;
    }
}
```

### Afficher une catégorie pour une catégorie existante

Pour réaliser ce test, il faut obtenir l'enregistrement de la base de données pour faire la comparaison avec les propriétés de liaison.

N'oubliez pas qu'il faut ajouter l'authentification dans les arrangements pour le **TP 3**. Référez-vous sur l'exemple **12.2.1** pour voir la mécanique de l'authentification.

Voici les arrangements.

À la ligne 5, c'est la clé de la catégorie utilisée pour faire le test. Il est important que la catégorie existe dans la base de données. Elle doit provenir du **seed** de la migration ou d'un **seed** contenu dans la classe **UtilitaireBD**. Pour simplifier les tests, tous les tests utiliseront les données du **seed** de la migration, mais généralement, il faut avoir des données de tests.

À la ligne 8, la base de données est réinitialisée.

À la ligne 11, l'enregistrement de la catégorie #1 est obtenu directement du contexte.

À la ligne 14, il faut créer le **ViewModel**. Il faut injecter les dépendances obtenues par le constructeur de la classe test ou par des simulacres.

Pour les actions, il faut assigner en paramètre la clé de la catégorie et il faut exécuter la commande (lignes 18 et 21).

Au niveau des assertions, il faut s'assurer que la catégorie existe réellement dans la base de données (ligne 25). Si la catégorie n'existe pas, la vérification des propriétés pourrait donner un faux négatif, car ce serait les valeurs par défaut qui seraient comparées. 

Aux lignes 28 à 30, il faut s'assurer que les valeurs des propriétés de liaison sont identiques à celle de la base de données.

```c#
[Fact]
public async Task ObtenirCommande_CategorieExiste_ProprieteOK()
{
    //Arrangement (Arrange)
    const int categorieId = 1;

    ////Initialisation de la base de données test
    _utilitaireBD.Initialiser();

    ////Obtenir la catégorie attendue
    Categorie? categorieAttendue = _utilitaireBD.BDContext.CategorieTb.Where(c => c.CategorieId == categorieId).FirstOrDefault();

    ////Création du ViewModel
    GestionCategorieVM gestionCategorieVM = new GestionCategorieVM(_categorieService);

    //Action (Act)         
    ////Assignation de la catégorie à gérer
    gestionCategorieVM.AssignerParametre(categorieId);

    ////Exécution de la commande pour obtenir
    await gestionCategorieVM.ObtenirCommande.ExecuteAsync(null);
            
    //Assertion (Assert)        
    ////La catégorie à afficher existe dans la base de données
    Assert.NotEqual((Categorie?)null, categorieAttendue); 

    ////Les propriétés de liaison sont identiques à celle de la base de données
    Assert.Equal(categorieAttendue.CategorieId, gestionCategorieVM.CategorieId);
    Assert.Equal(categorieAttendue.Nom, gestionCategorieVM.Nom);
    Assert.Equal(categorieAttendue.Description, gestionCategorieVM.Description);
}
```

### Ajouter une catégorie

Pour tester l'ajout, il faut assigner manuellement les propriétés de liaison du **ViewModel**. Les valeurs doivent être valides. Après l'exécution, il faut récupérer la catégorie directement dans la base de données à partir de sa nouvelle clé. Il faut également s'assurer que la catégorie n'existait pas.

Dans la classe **UtilitaireBD**, ajoutez la méthode **`CreerObjetCategorieValide()`**. La méthode permet de créer un objet **Categorie**. La librairie **AutoFixture** est utilisée pour la création, car il faut s'assurer que toutes les propriétés ont une valeur. Dans le cas qu'on ajoute un nouveau champ optionnel dans la base de données, s'il y a une erreur dans le code pour cette propriété et que le test  n'a pas été mis à jour pour mettre une valeur, le test sera un faux positif.

```c#
public Categorie CreerObjetCategorieValide()
{
    var fixture = new Fixture();

    //Création de l'objet avec Autofixture pour s'assurer que toutes les propriétés ont une valeur
    Categorie categorie =
        fixture.Build<Categorie>()
            .Without(u => u.CategorieId)
            .Without(u => u.CarteListe)
            .Create();

    //Assignation des valeurs valides
    categorie.Nom = "Nom valide";
    categorie.Description = "Description valide";

    return categorie;
}
```

Créez la méthode **`EnregistrerCommande_AjouterCategorieValide_ExisteBD()`** dans la classe **GestionCategorieVMUTest**.

Voici les arrangements.

À la ligne 6, la base de données est réinitialisée.

À la ligne 9, la catégorie attendue pour la création et créer par l'utilitaire.

À la ligne 12, la liste des **CategorieId** est obtenue pour s'assurer que le **CategorieId** obtenu après la création n'existait pas déjà.

À la ligne 15, le **ViewModel** est créé.

Voici les actions.

À la ligne 19, il faut assigner la clé **0** pour indiquer que c'est pour un ajout. 

Aux lignes 22 et 23, il faut assigner les valeurs dans les propriétés de liaison à partir de la catégorie attendue.

Voici les assertions.

À la ligne 33, il faut s'assurer que la clé de la catégorie obtenue n'est pas **0**.

À la ligne 36, il faut s'assurer que la catégorie existe dans la base de données à partir de la clé obtenue.

À la ligne 39, il faut s'assurer que la clé de la catégorie n'existait pas dans la base de données.

À la ligne 42, il faut s'assurer que la catégorie créée est identique à celle attendue.

```c#
[Fact]
public async Task EnregistrerCommande_AjouterCategorieValide_ExisteBD()
{
    //Arrangement (Arrange)
    ////Initialisation de la base de données test
    _utilitaireBD.Initialiser();

    ////Objet categorie a ajouté dans la base de données
    Categorie categorieAttendue = _utilitaireBD.CreerObjetCategorieValide();        

    ////Obtenir la liste des CategorieId existant pour s'assurer que la catégorie n'existe pas déjà
    List<int> lstCategorieIdInitial = _utilitaireBD.BDContext.CategorieTb.Select(c => c.CategorieId).ToList();        

    ////Création du ViewModel
    GestionCategorieVM gestionCategorieVM = new GestionCategorieVM(_categorieService);

    //Action (Act)         
    ////Assignation de la catégorie à créer
    gestionCategorieVM.AssignerParametre(0);
    
    ////Assignation des propriétés de liaison à partir de l'objet à créer
    gestionCategorieVM.Nom = categorieAttendue.Nom;
    gestionCategorieVM.Description = categorieAttendue.Description;

    ////Exécution de la commande enregistrer
    await gestionCategorieVM.EnregistrerCommande.ExecuteAsync(null);

    ////Obtenir la catégorie dans la base de données à partir de la clé générée
    Categorie? categorieAjoutee = _utilitaireBD.BDContext.CategorieTb.Where(c => c.CategorieId == gestionCategorieVM.CategorieId).FirstOrDefault();

    //Assertion (Assert)
    ////Vérifie que la clé générée n'est pas 0
    Assert.NotEqual(gestionCategorieVM.CategorieId, 0);

    ////Vérifie que la catégorie ajoutée existe dans la base de données
    Assert.NotEqual((Categorie?)null, categorieAjoutee);        

    ////Vérifie que la clé de la catégorie ajoutée n'existait pas avant l'ajout
    Assert.False(lstCategorieIdInitial.Contains(gestionCategorieVM.CategorieId));

    ////Vérifie que les propriétés sont identiques dans la base de données et l'objet créé
    categorieAjoutee.Should().BeEquivalentTo(categorieAttendue, 
        options => options.Excluding(x => x.CategorieId)
                          .Excluding(x => x.CarteListe));
}
```

Dans le **TP 3**, il faut également s'assurer que la notification est effectuée à la fin de la sauvegarde. L'exemple 12.2.1 explique comment créer un simulacre.

## ListeCategoriesVM

Créez la classe **GestionCategorieVMUTest.cs** dans le dossier **ViewModels**.

La classe **UtilitaireBD** permet d'initialiser la base de données de test.

L'interface **ICategorieService** est le service réel.

La classe **UtilitaireBD** permet d'initialiser la base de données de test.

```c#
using SuperCarte.Core.Services;
using SuperCarte.ITest.Aides;
using SuperCarte.WPF.Aides;

namespace SuperCarte.ITest.ViewModels;

/// <summary>
/// Test d'intégration à partir de ListeCategoriesVM 
/// </summary>
public class ListeCategoriesVMUTest
{
    private readonly UtilitaireBD _utilitaireBD;
    private readonly ICategorieService _categorieService;
    private readonly IAuthentificateur _authentificateur;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="utilitaireBD">Utilitaire de la BD</param>
    /// <param name="categorieService">Service du module Categorie</param>
    /// <param name="authentificateur">Classe d'assistance pour l'authentification</param>
    public ListeCategoriesVMUTest(UtilitaireBD utilitaireBD,
        ICategorieService categorieService,
        IAuthentificateur authentificateur)
    {
        _utilitaireBD = utilitaireBD;
        _categorieService = categorieService;
        _authentificateur = authentificateur;
    }
}
```

### Utilisateur non authentifié

**IMPORTANT : Vous ne pouvez pas reprendre ce test pour le TP 3**, car il n'y a aucune variation.

Pour ce test, il faut s'assurer que les commandes ne sont pas créées lorsqu'un utilisateur n'est pas authentifié.

Également, il faut s'assurer qu'il y a une notification envoyée à l'utilisateur.

Dans la classe **UtilitaireBD**, il faut ajouter les méthodes pour obtenir les informations d'un compte utilisateur.

Les méthodes utilisent un **Tuple** comme type de retour. Un **Tuple** consiste à une structure de données simple. Ceci évite de créer une nouvelle classe.

```c#
/// <summary>
/// Obtenir le nom de l'utilisateur et le mot de passe d'un utilisateur le rôle Administrateur
/// </summary>
/// <returns>Tuple (nomUtilisater, motPasse)</returns>
public (string nomUtilisateur, string motPasse) ObtenirUtilisateurRoleAdministrateur()
{
    return ("fsthilaire", "Native3!");
}

/// <summary>
/// Obtenir le nom de l'utilisateur et le mot de passe d'un utilisateur avec le rôle Utilisateur
/// </summary>
/// <returns>Tuple (nomUtilisater, motPasse)</returns>
public (string nomUtilisateur, string motPasse) ObtenirUtilisateurRoleUtilisateur()
{
    return ("tstark", "#NotAdmin!");
}
```

Dans la classe **ListeCategoriesVMUTest**, créez la méthode **`CreerVM_UtilisateurNonAutorise_CommandesNull()`**

Voici les arrangements.

À la ligne 6, la base de données est réinitialisée.

Aux lignes 9 et 10, **l'authentificateur** authentifie un utilisateur qui a le rôle **Utilisateur**. Ce rôle n'a pas accès à ce **ViewModel**. L'authentification se fait réellement, car le service est obtenu par injection de dépendance.

Aux lignes 13 et 14, il faut créer un simulacre pour les services manquants. Il est important de créer un simulacre pour ces 2 services, car ils utilisent **WPF**. Si la notification est appelée, il ne faut pas que le **MessageBox** s'affiche réellement. Ceci bloquerait le test.

Voici les actions.

À la ligne 19, il faut créer le **ViewModel**. Pour ce test, il s'agit de l'action à tester, car l'assignation des commandes se fait dans le constructeur. Remarquez que ce sont les simulacres qui sont injectés pour  le **navigateur** et la **notification**.

Finalement, pour les assertions, il faut vérifier si la notification a affiché un message d'erreur. Le simulacre permet de faire cette vérification. Le reste des assertions est de s'assurer que les commandes sont bien à **`null`**.

```c#
[Fact]
public async Task CreerVM_UtilisateurNonAutorise_CommandesNull()
{
    //Arrangement (Arrange)
    ////Initialisation de la base de données test
    _utilitaireBD.Initialiser();

    ////Connecter un utilisateur qui a le rôle Administrateur
    var compteUtilisateur = _utilitaireBD.ObtenirUtilisateurRoleUtilisateur();
    await _authentificateur.AuthentifierUtilisateurAsync(compteUtilisateur.nomUtilisateur, compteUtilisateur.motPasse);

    ////Création des simulacres pour les services dépendants du UI
    var navigateur = new Mock<INavigateur>();
    var notification = new Mock<INotification>();


    //Action (Act)
    ////Création du ViewModel
    ListeCategoriesVM listeCategorieVM = new ListeCategoriesVM(_authentificateur,
                                                               notification.Object,
                                                               _categorieService,
                                                               navigateur.Object);

    //Assertion (Assert)
    ////Vérifie que le message d'erreur a été affiché
    notification.Verify(x => x.MessageErreur(It.IsAny<string>(), It.IsAny<string>()), Times.Once);
    
    ////Vérifie que les commandes sont tous null
    Assert.True(listeCategorieVM.ObtenirListeCommande is null);
    Assert.True(listeCategorieVM.NouveauCommande is null);
    Assert.True(listeCategorieVM.EditerCommande is null);
    Assert.True(listeCategorieVM.SupprimerCommande is null);
}
```

### Supprimer une catégorie

Pour supprimer une catégorie, il faut obtenir la catégorie directement dans la base de données pour s'assurer qu'elle existe.

Il faut utiliser une catégorie qui n'a aucune dépendance. 

Voici les arrangements.

À la ligne 6, c'est la clé de la catégorie à supprimer.

À la ligne 9, la base de données est réinitialisée.

À la ligne 12, il faut obtenir la catégorie à supprimer. Ceci permet de s'assurer que la catégorie existe réellement dans la base de données. Cette étape peut être inutile, le jeu de données de la base de données est contrôlé. Mais le jeu de données n'est pas exempt de **bugs**. Cette étape permet de s'assurer qu'elle existe réellement. 

Aux lignes 15 et 16, **l'authentificateur** authentifie un utilisateur qui a le rôle **Utilisateur**. Ce rôle n'a pas accès à ce **ViewModel**. L'authentification se fait réellement, car le service est obtenu par injection de dépendance.

Aux lignes 19 et 20, il faut créer un simulacre pour les services manquants. Il est important de créer un simulacre pour ces 2 services, car ils utilisent **WPF**. Si la notification est appelée, il ne faut pas que le **MessageBox** s'affiche réellement. Ceci bloquerait le test.

À la ligne 23, il faut créer le **ViewModel**. Remarquez que ce sont les simulacres qui sont injectés pour  le **navigateur** et la **notification**.

Pour les actions, il faut simuler les actions de l'utilisateur. Elle contient plusieurs étapes. Il faut charger la liste initiale, ensuite effectuer la sélection de la catégorie et finalement exécuter la suppression. 

Il y a également 2 étapes additionnelles pour aider les assertions. À la ligne 33, la liste des **CategorieId** est conservée pour s'assurer que la catégorie est présente dans la liste avant la suppression. À la ligne 42, la liste des **CategorieId** est conservée pour s'assurer que la catégorie n'est pas présente dans la liste après  la suppression. Ces 2 listes serviront aux assertions.

Finalement, il y a plusieurs assertions pour s'assure du bon fonctionnement.

Voici les assertions.

À la ligne 49, il faut s'assurer que la catégorie existait avant la suppression.

À la ligne 52, il faut s'assurer que la catégorie était dans la liste avant la suppression.

À la ligne 55, il faut s'assurer que la liste initiale a 1 élément de plus de la liste finale.

À la ligne 58, il faut s'assurer que la catégorie n'est plus dans la liste après la suppression.

À la ligne 61, il faut s'assurer que la catégorie n'est réellement plus dans la base de données.

```c#
[Fact]
public async Task SupprimerCommande_CategorieSansDependance_OK()
{
    //Arrangement (Arrange)
    ////Catégorie sans dépendance
    const int categorieId = 3;

    ////Initialisation de la base de données test
    _utilitaireBD.Initialiser(); 

    ////Obtenir la catégorie à supprimer
    Categorie categorieASupprimer = _utilitaireBD.BDContext.Find<Categorie>(categorieId); 

    ////Connecter un utilisateur qui a le rôle Administrateur
    var compteUtilisateur = _utilitaireBD.ObtenirUtilisateurRoleAdministrateur();
    await _authentificateur.AuthentifierUtilisateurAsync(compteUtilisateur.nomUtilisateur, compteUtilisateur.motPasse);

    ////Création des simulacres pour les services dépendants du UI
    var navigateur = new Mock<INavigateur>();
    var notification = new Mock<INotification>();
    
    ////Création du ViewModel
    ListeCategoriesVM listeCategorieVM = new ListeCategoriesVM(_authentificateur,
                                                               notification.Object,
                                                               _categorieService,
                                                               navigateur.Object);

    //Action (Act)
    ////Exécution de la commande pour obtenir la liste
    await listeCategorieVM.ObtenirListeCommande.ExecuteAsync(null);
    
    ////Obtenir la liste des catégories id avant la suppression pour l'assertion
    List<int> lstCategorieIdAvantSupp = listeCategorieVM.ListeCategories.Select(c => c.CategorieId).ToList();

    ////Sélection de la catégorie à supprimer
    listeCategorieVM.CategorieSelection = listeCategorieVM.ListeCategories.Where(c => c.CategorieId == categorieId).FirstOrDefault();

    ////Exécuter la commande de suppression
    await listeCategorieVM.SupprimerCommande.ExecuteAsync(null);

    ////Obtenir la liste des CategorieId après la suppression pour l'assertion
    List<int> lstCategorieIdApresSupp = listeCategorieVM.ListeCategories.Select(c => c.CategorieId).ToList();

    ////Obtenir dans la base de données la catégorie supprimée pour l'assertion
    Categorie? categorieSupprime = _utilitaireBD.BDContext.CategorieTb.Where(c => c.CategorieId == categorieId).FirstOrDefault();

    //Assertion (Assert)
    ////La catégorie à supprimer existe dans la base de données avant la suppression
    Assert.False(categorieASupprimer is null);

    ////La catégorie à supprimer est dans la liste avant la suppression
    Assert.True(lstCategorieIdAvantSupp.Contains(categorieId));

    ////La liste avant la suppression a un élément de plus que la liste après la suppression
    Assert.True(lstCategorieIdAvantSupp.Count - 1 == lstCategorieIdApresSupp.Count);

    ////La catégorie à supprimer n'est pas dans la liste avant la suppression
    Assert.False(lstCategorieIdApresSupp.Contains(categorieId));

    ////La catégorie à supprimer n'existe pas dans la BD après la suppression
    Assert.True(categorieSupprime is null);
}
```

Pour le **TP 3**, il faut configurer la notification pour indiquer que la suppression est acceptée par l'utilisateur et que la question a bien été posée.

