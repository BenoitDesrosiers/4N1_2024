---
sidebar_position: 10
---


# Création de la BD
 
## Introduction

**Entity Framework** est un **ORM** de Microsoft pour interagir avec les bases de données.

**Entity Framework** génère un modèle d'objet de la base de données.

Les relations entre les éléments utilisent l'agrégation d'objet et de liste selon le sens de la relation.

Pour interagir facilement avec le modèle objet de la base de données, il faut utiliser **LINQ**.

Pour cette section des notes de cours, il faut utiliser ce DEA. 


<img src="/4N1_2024/img/07_dea_GestionFilm.jpg"  />



## Approches

### Code First

L'approche **Code First** consiste à créer le modèle objet de la base de données en premier.

Par la suite, il faut **migrer** notre code vers la base de données.

[voir](https://www.entityframeworktutorial.net/efcore/entity-framework-core.aspx)

### Database First

L'approche **Database First** consiste à créer la base de données en pur **SQL**.

Par la suite, il faut utiliser un outil de génération de code pour générer **automatiquement** le modèle objet et le contexte de communication avec la base de données.

Pour ce cours, nous allons favoriser l'approche **Code First** car elle est plus souvent rencontrée en industrie, et est un peu plus complexe à mettre en place. Nous verrons tout de même un exemple de **Database first**. 

## Projet vs solution

Quelle est la différence entre un projet et une solution en **.Net** ?

Il est fréquent en **.Net** de séparer une application en plusieurs projets. Généralement, le projet consiste en une couche logicielle. Cette couche contient le code correspondant au rôle du projet dans l'application. Un projet peut être utilisé dans plusieurs applications.

La solution permet de regrouper plusieurs projets ensemble. La solution n'a pas de logique en soi. Elle permet d'avoir accès à plusieurs projets rapidement. Généralement, la solution contient tous les projets nécessaires à l'application.

Il est possible d'utiliser cette approche avec une application console avec **.NET 7**.

## Création du projet 

Pour débuter, il faut créer le projet qui contiendra le **contexte** et les classes du modèle.

Créez un projet de type **Bibliothèque de classe**. Il est important **de ne pas choisir** la version **.NET Framework**.

- **Nom du projet** : Univers.EF
- **Nom de la solution** : Univers
- **Infrastructure** : la dernière version de .Net disponible

Remarquez que le nom de la solution n'est pas identique au projet, car la solution représente l'application et le projet une partie de l'application.

Supprimez la classe **Class1.cs**.

Une **Bibliothèque de classe** est une librairie interne. Ce type de projet n'est pas en mesure de s'exécuter de façon autonome. Pour être utilisable, ce projet doit être intégré dans un projet **exécutable** (WPF, WinForm, Console, ASP.NET MVC, Blazor...).

Ce projet contiendra uniquement le **contexte** et les classes du modèle de données. 

Dans la **Console du Gestionnaire de package**, installez les 2 librairies ci-dessous.

La première librairie est pour le serveur utilisé avec le contexte. Dans notre cas, c'est **SQL Server**.

```
Install-Package Microsoft.EntityFrameworkCore.SqlServer
```

La 2e librairie est pour les outils de migration.

```
Install-Package Microsoft.EntityFrameworkCore.Tools
```

## Création du modèle

Il faut reproduire les classes du modèle pour représenter le **DEA**.

En premier lieu, il faut créer toutes les classes vides, car les propriétés de navigation font des références circulaires. Si la classe n'existe pas, Visual Studio va indiquer une erreur.

Créez le dossier **Data**.

Créez toutes les classes ci-dessous dans le dossier **Data**.

- Personnage.cs
- Univers.cs
- Distribution.cs
- Film.cs

:::info
Une propriété de navigation qui représente la relation **1 à Plusieurs** auront le suffixe **Liste** pour les différencier des relations **Plusieurs à 1**, car il s'agit d'une collection d'éléments.

Pour une propriété de navigation qui représente une relation **Plusieurs à 1**, le nom de la propriété de navigation sera le nom de la classe.
:::

Voici le code de la classe **Personnage.cs**

```csharp
namespace Univers.EF.Data;
public class Personnage
{
    public int PersonnageId { get; set; }
    public String Nom { get; set; } = null!;
    public String? IdentiteReelle { get; set; }

    public DateOnly DateNaissance { get; set; }
    public bool EstVilain { get; set; }
    public int UniversId { get; set; }
    public Univers Univers { get; set; } = null!;

}
```

Pour **Univers.cs**

```csharp
nnamespace Univers.EF.Data;
public class Univers
{
    public int UniversId { get; set; }
    public string Nom { get; set; } = null!;
    public Int16 AnneeCreation { get; set; }
    public string? SiteWeb { get; set; } 
    public string? Proprietaire { get; set; }
    public ICollection<Personnage> Personnages { get; set; } = new List<Personnage>();
}

```
:::info
Pour l'instant, nous ne créerons pas le code pour **Distribution.cs**. Nous y reviendrons plus tard
:::

:::info
Pour trouver l'équivalent d'un type de sql-server vs celui de C#, référez-vous à [cette adresse](https://learn.microsoft.com/en-us/sql/relational-databases/clr-integration-database-objects-types-net-framework/mapping-clr-parameter-data?view=sql-server-ver16&viewFallbackFrom=sql-server-2014&redirectedfrom=MSDN)
:::
:::info
À quoi sert **= null!** https://stackoverflow.com/questions/54724304/what-does-null-statement-mean

Sommairement: ce n'est que pour enlever l'avertissement du compilateur. 
:::

:::info
À quoi sert **string?**

Si on ne met pas de ? alors le champs ne peut être null dans la bd. 

Si on met le ?, alors ce champs sera nullable. 

Par exemple, un personnage n'a pas toujours une identité réelle. C'est pour cela que ce champs est nullable. 
:::

### Exercice 

Ajoutez le code pour **Film.cs**

<details>
  <summary>Solution</summary>

```csharp
namespace Univers.EF.Data;
public class Film
{
    public int FilmId { get; set; }
    public string Titre { get; set; } = null!;
    public DateOnly DateSortie { get; set; }
    public byte Etoile { get; set; }
    public int Duree { get; set; }
}
```
</details>


## Création du contexte

Nous allons maintenant créer le code qui va générer la base de données à partir des classes. Pour ce faire, nous allons créer un **contexte** qui sera la connexion à la bd. Nous allons ensuite créer des **DBSet** qui indiqueront quelles classes utiliser pour générer les tables.  


Créez le dossier **Data\Context**.

Créez la classe **UniversContext** dans le dossier **Data\Context**.

```csharp
using Microsoft.EntityFrameworkCore;

namespace Univers.EF.Data.Context;

/// <summary>
/// Contexte pour la base de de données Univers
/// </summary>
public class UniversContext : DbContext
{
    /// <summary>
    /// Constructeur pour la migration
    /// </summary>
	public UniversContext() : base()
    {

    }

    /// <summary>
    /// Constructeur pour l'utilisation en programme
    /// </summary>
    /// <param name="options">Option de la base de données</param>
    public UniversContext(DbContextOptions<UniversContext> options)
        : base(options)
    {
    }

#if DEBUG //Permet d'inclure cette méthode uniquement si l'application est en mode DEBUG
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //Vérifie si la configuration n'a pas été spécifiée par un fichier de configuration
        if (optionsBuilder.IsConfigured == false)
        {
            //Aucune configuration à partir d'un fichier de configuration
            //Option de base pour la migration
            string? chaineConnexion = Environment.GetEnvironmentVariable("MIGRATION_CONNECTION_STRING");

            //Vérifie si la variable n'est pas vide
            if (string.IsNullOrEmpty(chaineConnexion) == false)
            {
                //La variable n'est pas vide, la chaine de connexion est appliquée
                optionsBuilder.UseSqlServer(chaineConnexion);
            }
            else
            {
                //Il n'y a aucune chaine de connexion.
                throw new Exception("La variable MIGRATION_CONNECTION_STRING n'est pas spécifiée. Effectuez la commande suivante dans la Console du Gestionnaire de package : $env:MIGRATION_CONNECTION_STRING=\"[ma chaine de connexion]\" ");
            }
        }
    }
#endif

    public DbSet<Personnage> PersonnageTb { get; set; }

    public DbSet<Univers> UniversTb { get; set; }

    public DbSet<Film> FilmTb { get; set; }

}
```

Premièrement, la classe hérite de **DbContext**. Cette classe contient toute la mécanique de communication et de synchronisation du modèle objet avec la base de données. La classe spécifique **UniversContext** contient uniquement la définition de la base de données relationnelle.

Avec le nom des tables de cette base de données, il n'est déjà pas possible d'utiliser la convention du pluriel à cause de la table **Univers**.

Il est possible de choisir le nom des **DbSet**. Pour ce projet, le suffixe **Tb** sera ajouté pour indiquer que c'est la table.

La table **Distribution** est volontairement **exclue** des **DbSet** pour l'instant, car elle n'a pas de clé primaire unique, mais une clé primaire composée. Ce concept sera présenté plus tard.

La méthode **OnConfiguring** contient la logique pour la configuration du serveur par un fichier externe ou par une variable d'environnement. 

La clause **#if DEBUG** indique au compilateur de tenir compte du code seulement si l'application est en mode **Debug**. Il ne faut pas que cette configuration soit accessible en production.

### MIGRATION_CONNECTION_STRING

Il faut assigner la chaine de connexion dans la variable d'environnement **MIGRATION_CONNECTION_STRING**.

Il faut faire cette étape à chaque démarrage de **Visual Studio** s'il est nécessaire d'effectuer des migrations.

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. 

:::danger Important
Il est important que le **Projet par défaut** de **Entity Framework** soit sélectionné dans la console. Pour ce projet, ce doit être **Univers.EF**. 
:::

À ce stade, il y a un seul projet, **Univers.EF** sera le seul de la liste.

Pour ce projet, utilisez cette chaine de connexion. Le nom de la base de données est **eDA_4N1_Univers**. Modifiez le **DA** par votre numéro d'admission.

```powershell
$env:MIGRATION_CONNECTION_STRING = "Server=localhost\SQLExpress;Database=eDA_4N1_Univers;Trusted_Connection=True;"
```

Voici la commande avec le **Trusted_Connection=True;** , si vous avez l'erreur **SSL**.

```powershell
$env:MIGRATION_CONNECTION_STRING = "Server=localhost\SQLExpress;Database=eDA_4N1_Univers;Trusted_Connection=True;Trust Server Certificate=True;"
```

Si vous oubliez cette étape, vous allez avoir ce message lors de l'utilisation des commandes de migration. C'est l'exception de la ligne 46 de la classe du contexte.

```
La variable SQL_CONNECTION_STRING n'est pas spécifiée. Effectuez la commande suivante dans la Console du Gestionnaire de package : $env:MIGRATION_CONNECTION_STRING="{ma chaine de connexion}" 
```

### Création du fichier de migration

Le contexte n'est pas complet, mais il est possible de créer une base de données. 

:::info
[EF Core Migrations](https://www.learnentityframeworkcore.com/migrations)
:::

Il faut créer un fichier de migration. La syntaxe de la commande est celle-ci: 

```powershell
Add-Migration [nom migration] -StartupProject [Nom Projet Entity Framework]
```

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. 

:::danger Important 
Il est important que le **Projet par défaut** de **Entity Framework** soit sélectionné dans la console, même s'il est indiqué dans la ligne de commande. Pour ce projet, ce doit être **Univers.EF**.
:::

```powershell
Add-Migration CreationBD -StartupProject Univers.EF
```

Il y a maintenant un dossier **Migration**. À l'intérieur, il y a un fichier avec un **timestamp** avec le nom de la migration. L'outil **Add-Migration** s'occupe d'analyser le contexte et de créer le fichier de migration correspondant. Il serait possible de faire ce fichier manuellement ou à partir d'une autre librairie.

Voici le fichier. La méthode **Up** permet d'appliquer la migration à la base de données et la méthode **Down** est de la retirer. Il n'est pas recommandé de modifier ce fichier s'il a été généré par un outil., car il ne sera plus en **synchronisation** avec le **contexte**.

```csharp
using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Univers.EF.Migrations
{
    /// <inheritdoc />
    public partial class CreationBD : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FilmTb",
                columns: table => new
                {
                    FilmId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateSortie = table.Column<DateOnly>(type: "date", nullable: false),
                    Etoile = table.Column<byte>(type: "tinyint", nullable: false),
                    Duree = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilmTb", x => x.FilmId);
                });

            migrationBuilder.CreateTable(
                name: "UniversTb",
                columns: table => new
                {
                    UniversId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AnneeCreation = table.Column<short>(type: "smallint", nullable: false),
                    SiteWeb = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Proprietaire = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UniversTb", x => x.UniversId);
                });

            migrationBuilder.CreateTable(
                name: "PersonnageTb",
                columns: table => new
                {
                    PersonnageId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdentiteReelle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateNaissance = table.Column<DateOnly>(type: "date", nullable: false),
                    EstVilain = table.Column<bool>(type: "bit", nullable: false),
                    UniversId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonnageTb", x => x.PersonnageId);
                    table.ForeignKey(
                        name: "FK_PersonnageTb_UniversTb_UniversId",
                        column: x => x.UniversId,
                        principalTable: "UniversTb",
                        principalColumn: "UniversId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PersonnageTb_UniversId",
                table: "PersonnageTb",
                column: "UniversId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FilmTb");

            migrationBuilder.DropTable(
                name: "PersonnageTb");

            migrationBuilder.DropTable(
                name: "UniversTb");
        }
    }
}


```

Les fichiers de migration sont incrémentaux. La génération d'une migration se base sur le fichier **snapshot** du dossier de migration. 
:::danger Attention
Il est important d'utiliser la commande **Remove-Migration** pour retirer une migration de la liste et non supprimer le fichier manuellement. 
:::

### Synchronisation de la base de données

Pour synchroniser une migration avec la base de données, il faut utiliser l'utilitaire **Update-Database**.

Voici la syntaxe.

```powershell
Update-Database -StartupProject [Nom Projet Entity Framework] -Migration [Nom migration]
```

Si l'argument **-Migration** n'est pas spécifié, ce sera toutes les migrations qui seront appliquées. 

Également, dans la chaine de connexion de la variable **MIGRATION_CONNECTION_STRING**, il faut s'assurer que l'utilisateur spécifié soit en mesure de créer des bases de données. Le premier fichier de migration aura le code de création de la base de données.

Pour ce projet, utilisez cette commande. 

```powershell
Update-Database -StartupProject "Univers.EF" -Migration CreationBD
```

### Annulation d'une migration

Si vous vous apercevez qu'il y a une erreur dans une migration, vous devez *reculer* la base de données à l'état précédent cette migration. Pour ce faire, vous n'avez qu'à exécuter la migration précédent celle que vous désirez enlever. Le **down** de toutes les migrations suivantes sera exécuté. 

Exemple:
Vous avez les migrations A,B,C,D,E d'exécuter. Vous vous apercevez qu'il y a une erreur dans C. Vous devez alors exécuter la commande:

Update-Database -StartupProject "votreprojet" -Migration B

Le down de C,D, et E sera alors exécuté. 
Vous devez ensuite enlever les migration 

Si c'est la première migration que vous désirez défaire ... vous devez alors détruire la bd avec la commande **Drop-Database**. 



