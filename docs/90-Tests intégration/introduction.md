---
sidebar_position: 910
draft: true
---

# Introduction
Dans cette section nous allons effectuer une série de tests d'intégration afin de s'assurer que la gestion et l'affichage des catégories fonctionne bien. 

## Création du projet

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

:::warning IMPORTANT
Pour faire des tests d'intégration, il est recommandé d'utiliser une base de données de test. Ajoutez le suffixe **_Test** dans le nom de la base de données.
:::


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

Pour chacun des tests d'intégration,  il est préférable de réinitialiser la base de données pour chaque test et de créer les données dépendantes selon le cas.

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

La méthode **Initialiser()** permet de supprimer la base de données **test** si elle existe. Ensuite, elle applique toutes les migrations.

La propriété **BDContext** permet d'avoir accès au contexte par la classe de test. Il peut être nécessaire d'avoir accès au contexte pour créer les données initiales pour un test. Également, il peut être nécessaire d'interroger la base de données pour faire les assertions.

Il est possible également d'ajouter des méthodes d'insertion de données dans cette classe. Un même jeu de données de test peut être utilisé par plusieurs tests.

Vous n'avez pas à exécuter les migrations sur la base de données test. La migration (incluant les seeders) sera exécutées par les tests eux-mêmes. 

Il faut enregistrer cette classe dans les dépendances.

Modifiez la méthode **ConfigureServices** de la classe **Startup.cs**.

```c#
 public void ConfigureServices(IServiceCollection services,
 HostBuilderContext context)
 {
     services.AddLocalization();

     services.AddDbContext<SuperCarteContext>(options => options.UseSqlServer(context.Configuration.GetConnectionString("DefaultConnection")));

     services.AddSingleton<IAuthentificateur, Authentificateur>();

//highlight-next-line
     services.AddScoped<UtilitaireBD>();

     services.EnregistrerRepositories();
     services.EnregistrerServices();
     services.EnregistrerValidateurs();
     services.EnregistrerViewModels();
 }
```

## Désactivation du parallélisme

Dans le fichier **GlobalUsings.cs**, il faut indiquer que l'exécution des tests doit se faire en séquence.

Chaque test a créé une nouvelle base de données et doit avoir un jeu de données fixe. Pour permettre l'exécution en parallèle, chaque test devrait avoir sa propre base de données.

```c#
global using Xunit;
[assembly: CollectionBehavior(DisableTestParallelization = true)]
```

