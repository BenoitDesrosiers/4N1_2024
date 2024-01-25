---
sidebar_position: 3
---

# SuperCarte.EF
## Création du projet - SuperCarte.EF

Pour débuter, il faut créer le projet qui contiendra le **contexte** et les classes du modèle.

Créez un projet de type **Bibliothèque de classe**. Il est important **de ne pas choisir** la version **.NET Framework**.

- **Nom du projet** : SuperCarte.EF
- **Nom de la solution** : SuperCarteApp
- **Infrastructure** : .NET 7

Remarquez que le nom de la solution n'est pas identique au projet, car la solution représente l'application et le projet une partie de l'application.

Supprimez la classe **Class1.cs**.

Une **Bibliothèque de classe** est une librairie interne. Ce type de projet n'est pas en mesure de s'exécuter de façon autonome. Pour être utilisable, ce projet doit être intégré dans un projet **exécutable** (WPF, WinForm, Console, ASP.NET MVC, Blazor...).

Ce projet contiendra uniquement le **contexte** et les classes du modèle de données. 

Dans la **Console du Gestionnaire de package**, installez les 2 librairies ci-dessous.

La première librairie est pour le serveur utilisé avec le contexte. Dans notre cas, c'est **SQL Server**.

```
Install-Package Microsoft.EntityFrameworkCore.SqlServer
```

La 2e librairie est pour les outils de migration. C'est la même librairie que pour l'outil **Scaffold-DbContext** de l'approche **Database First**.

```
Install-Package Microsoft.EntityFrameworkCore.Tools
```

## Création du modèle

Il faut reproduire les classes du modèle pour représenter le **DEA**.

En premier lieu, il faut créer toutes les classes vides, car les propriétés de navigation font des références circulaires. Si la classe n'existe pas, Visual Studio va indiquer une erreur.

Créez le dossier **Data**.

Créez toutes les classes ci-dessous dans le dossier **Data**.

- Role.cs
- Utilisateur.cs
- Categorie.cs
- Ensemble.cs
- Carte.cs
- UtilisateurCarte.cs

:::note
Une propriété de navigation qui représente la relation **1 à Plusieurs** auront le suffixe **Liste** pour les différencier des relations **Plusieurs à 1**, car il s'agit d'une collection d'éléments.

Pour une propriété de navigation qui représente une relation **Plusieurs à 1**, le nom de la propriété de navigation sera le nom de la classe.
:::


Voici le code de la classe **Role.cs**.

```csharp
namespace SuperCarte.EF.Data;

public class Role
{
    public int RoleId { get; set; }

    public string Nom { get; set; } = null!;
    
    public ICollection<Utilisateur> UtilisateurListe { get; set; } = new List<Utilisateur>();
}
```

Voici le code de la classe **Utilisateur.cs**.

```csharp
namespace SuperCarte.EF.Data;

public class Utilisateur
{
    public int UtilisateurId {  get; set; }

    public string Prenom { get; set; } = null!;

    public string Nom { get; set; } = null!;

    public string NomUtilisateur { get; set; } = null!;
    
    public string MotPasseHash { get; set; } = null!;

    public int RoleId { get; set; }
    
    public Role Role { get; set; } = null!;   
}
```

Voici le code de  la classe **Categorie.cs**.

Remarquez que le champ **Description** est **nullable** comme dans le **DEA**.

```csharp
namespace SuperCarte.EF.Data;

public class Categorie
{
    public int CategorieId { get; set; }

    public string Nom { get; set; } = null!;

    public string? Description { get; set; }
    
    public ICollection<Carte> CarteListe { get; set; } = new List<Carte>();
}
```

Voici le code de la classe **Ensemble.cs**.

```csharp
namespace SuperCarte.EF.Data;

public class Ensemble
{
    public int EnsembleId { get; set; }

    public string Nom { get; set; } = null!;

    public DateTime Disponibilite { get; set; }
    
    public ICollection<Carte> CarteListe { get; set; } = new List<Carte>();
}
```

Voici le code de la classe **Carte.cs**.

```csharp
namespace SuperCarte.EF.Data;

public class Carte
{
    public int CarteId { get; set; }

    public string Nom { get; set; } = null!;

    public short Vie { get; set; }

    public short Armure { get; set; }

    public short Attaque { get; set; }

    public bool EstRare { get; set; }
    
    public decimal PrixRevente { get; set; }

    public int CategorieId { get; set; }

    public int EnsembleId { get; set; }
    
    public Categorie Categorie { get; set; } = null!;

    public Ensemble Ensemble { get; set; } = null!;
}
```

La classe **UtilisateurCarte.cs** reste vide pour l'instant.

## Création du contexte

Pour que la migration fonctionne, il faut avoir un **contexte**, une configuration de base, des **DBSet**.

Chacune des classes qui sont inscrites dans un **DbSet** doit avoir une clé primaire. Par convention, la propriété qui se nomme **Id** ou **[Nom de la Classe]Id**  dans la classe du modèle est automatiquement considérée comme la clé primaire.

Également, pour les clés étrangères, il faut la propriété de navigation **Plusieurs à 1** et une propriété du même nom avec **Id** comme suffixe. Par convention, une clé étrangère a le même nom que la clé primaire de la table parent. Donc pour une clé étrangère qui utilise la table **Maison**, la propriété de navigation serait **Maison** et la propriété de la clé serait **MaisonId**. Par défaut, la clé étrangère est **ON DELETE CASCADE** et **ON UPDATE NO ACTION**. Si la classe parent possède une collection de la classe enfant, le lien sera fait automatiquement. Si la table avait 2 clés étrangères sur la même table, il faudrait configurer la relation dans le contexte.

Par exemple, pour la classe **Carte.cs**, il y a la clé étrangère vers la table parent **Categorie**. Mais il serait possible de modifier la convention en effectuant le 2e exemple. Il faut par contre que le couple de propriétés **Navigation et clé étrangère** respecte la convention.

```csharp title="NE PAS COPIER"
//Convention
public int CategorieId { get; set; } //clé étrangère
public Categorie Categorie { get; set; } = null!; //propriété de navigation

//Ceci ferait également une relation entre la table Categorie et Carte
public int CatId { get; set; }
public Categorie Cat { get; set; } = null!;
```

Créez le dossier **Data\Context**.

Créez la classe **SuperCarteContext** dans le dossier **Data\Context**.

```csharp
using Microsoft.EntityFrameworkCore;

namespace SuperCarte.EF.Data.Context;

/// <summary>
/// Contexte pour la base de de données SuperCarte
/// </summary>
public class SuperCarteContext : DbContext
{
    /// <summary>
    /// Constructeur pour la migration
    /// </summary>
	public SuperCarteContext() : base()
    {

    }

    /// <summary>
    /// Constructeur pour l'utilisation en programme
    /// </summary>
    /// <param name="options">Option de la base de données</param>
    public SuperCarteContext(DbContextOptions<SuperCarteContext> options)
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

    public DbSet<Role> RoleTb { get; set; }

    public DbSet<Utilisateur> UtilisateurTb { get; set; }

    public DbSet<Categorie> CategorieTb { get; set; }

    public DbSet<Ensemble> EnsembleTb { get; set; }

    public DbSet<Carte> CarteTb { get; set; }
}
```

Premièrement, la classe hérite de **DbContext**. Cette classe contient toute la mécanique de communication et de synchronisation du modèle objet avec la base de données. La classe spécifique **SuperCarteContext** contient uniquement la définition de la base de données relationnelle.

Avec le nom des tables de cette base de données, il serait possible d'utiliser la convention du pluriel. Par contre, avec l'évolution de la base de données , il serait possible qu'une nouvelle table se termine par **s** s'ajoute. Il ne serait donc pas possible de mettre la règle du pluriel.

Il est possible de choisir le nom des **DbSet**. Pour ce projet, le suffixe **Tb** sera ajouté pour indiquer que c'est la table.



La méthode **OnConfiguring** contient la logique pour la configuration du serveur par un fichier externe ou par une variable d'environnement. 

La clause **#if DEBUG** indique au compilateur de tenir compte du code seulement si l'application est en mode **Debug**. Il ne faut pas que cette configuration soit accessible en production.

:::note
La table **UtilisateurCarte** est volontairement **exclue** des **DbSet** pour l'instant, car elle n'a pas de clé primaire unique, mais une clé primaire composée. Ce concept sera présenté plus tard.
:::

### MIGRATION_CONNECTION_STRING

Il faut assigner la chaine de connexion dans la variable d'environnement **MIGRATION_CONNECTION_STRING**.

Il faut faire cette étape à chaque démarrage de **Visual Studio** s'il est nécessaire d'effectuer des migrations.

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. 

:::danger Important
Il est important que le **Projet par défaut** de **Entity Framework** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.EF**. 
:::

À ce stade, il y a un seul projet, **SuperCarte.EF** sera le seul de la liste.

Pour ce projet, utilisez cette chaine de connexion. Le nom de la base de données est **eDA_4N1_SuperCarte**. 

:::danger Attention
Modifiez le **DA** par votre numéro d'admission.
:::

```powershell
$env:MIGRATION_CONNECTION_STRING = "Server=localhost\SQLExpress;Database=eDA_4N1_SuperCarte;Trusted_Connection=True;"
```

Voici la commande avec le **Trusted_Connection=True;** , si vous avez l'erreur **SSL**.

```powershell
$env:MIGRATION_CONNECTION_STRING = "Server=localhost\SQLExpress;Database=eDA_4N1_SuperCarte;Trusted_Connection=True;Trust Server Certificate=True;"
```

Si vous oubliez cette étape, vous allez avoir ce message lors de l'utilisation des commandes de migration. C'est l'exception de la ligne 46 de la classe du contexte.

```
La variable SQL_CONNECTION_STRING n'est pas spécifiée. Effectuez la commande suivante dans la Console du Gestionnaire de package : $env:MIGRATION_CONNECTION_STRING="{ma chaine de connexion}" 
```

### Création du fichier de migration

Le contexte n'est pas complet, mais il est possible de créer une base de données. 

Il faut créer un fichier de migration. La syntaxe de la commande est ceci. 

```powershell
Add-Migration [nom migration] -StartupProject [Nom Projet Entity Framework]
```

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. 

:::danger Important 
Il est important que le **Projet par défaut** de **Entity Framework** soit sélectionné dans la console, même s'il est indiqué dans la ligne de commande. Pour ce projet, ce doit être **SuperCarte.EF**.
:::

```powershell
Add-Migration CreationBD -StartupProject SuperCarte.EF
```

Il y a maintenant un dossier **Migration**. À l'intérieur, il y a un fichier avec un **timestamp** avec le nom de la migration. L'outil **Add-Migration** s'occupe d'analyser le contexte et de créer le fichier de migration correspondant. Il serait possible de faire ce fichier manuellement ou à partir d'une autre librairie.

Voici le fichier. La méthode **Up** permet d'appliquer la migration à la base de données et la méthode **Down** est de la retirer. Il n'est pas recommandé de modifier ce fichier s'il a été généré par un outil., car il ne sera plus en **synchronisation** avec le **contexte**.

```csharp
using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SuperCarte.EF.Migrations
{
    /// <inheritdoc />
    public partial class CreationBD : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CategorieTb",
                columns: table => new
                {
                    CategorieId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategorieTb", x => x.CategorieId);
                });

            migrationBuilder.CreateTable(
                name: "EnsembleTb",
                columns: table => new
                {
                    EnsembleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Disponibilite = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnsembleTb", x => x.EnsembleId);
                });

            migrationBuilder.CreateTable(
                name: "RoleTb",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleTb", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "CarteTb",
                columns: table => new
                {
                    CarteId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Vie = table.Column<short>(type: "smallint", nullable: false),
                    Armure = table.Column<short>(type: "smallint", nullable: false),
                    Attaque = table.Column<short>(type: "smallint", nullable: false),
                    EstRare = table.Column<bool>(type: "bit", nullable: false),
                    PrixRevente = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CategorieId = table.Column<int>(type: "int", nullable: false),
                    EnsembleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarteTb", x => x.CarteId);
                    table.ForeignKey(
                        name: "FK_CarteTb_CategorieTb_CategorieId",
                        column: x => x.CategorieId,
                        principalTable: "CategorieTb",
                        principalColumn: "CategorieId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CarteTb_EnsembleTb_EnsembleId",
                        column: x => x.EnsembleId,
                        principalTable: "EnsembleTb",
                        principalColumn: "EnsembleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UtilisateurTb",
                columns: table => new
                {
                    UtilisateurId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Prenom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NomUtilisateur = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MotPasseHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UtilisateurTb", x => x.UtilisateurId);
                    table.ForeignKey(
                        name: "FK_UtilisateurTb_RoleTb_RoleId",
                        column: x => x.RoleId,
                        principalTable: "RoleTb",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CarteTb_CategorieId",
                table: "CarteTb",
                column: "CategorieId");

            migrationBuilder.CreateIndex(
                name: "IX_CarteTb_EnsembleId",
                table: "CarteTb",
                column: "EnsembleId");

            migrationBuilder.CreateIndex(
                name: "IX_UtilisateurTb_RoleId",
                table: "UtilisateurTb",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CarteTb");

            migrationBuilder.DropTable(
                name: "UtilisateurTb");

            migrationBuilder.DropTable(
                name: "CategorieTb");

            migrationBuilder.DropTable(
                name: "EnsembleTb");

            migrationBuilder.DropTable(
                name: "RoleTb");
        }
    }
}
```

Les fichiers de migration sont incrémentaux. La génération d'une migration se base sur le fichier **snapshot** du dossier de migration. 
:::danger Attention
Il est important d'utiliser la commande **Remove-Migration** pour retirer une migration de la liste et non supprimer le fichier manuellement. Revoir [comment retirer une migration](../30-Entity%20Framework/EF_modification_bd.md#comment-retirer-une-migration).
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
Update-Database -StartupProject "SuperCarte.EF" -Migration CreationBD
```

Ouvrez **SSMS** et la base de données sera présente.

Il y a par contre quelques erreurs. 
* Les tables se terminent par **Tb**.
* Toutes les propriétés **string** sont des **NVARCHAR(max)**. 
* Le champ **CarteTb.PrixRevente** est un **DECIMAL(18,2)**. 
* Le champ **EnsembleTb.Disponible** est un **datetime2**. 
* Le champ **UtilisateurTb.NomUtilisateur** n'est pas unique.
  
Ceci ne respecte pas le **DEA**. Il faut configurer le contexte pour respecter le **DEA**.

<img src="/4N1_2024/img/13_migration_1.png"  />


L'utilisation de la migration permet également de conserver les données existantes dans une table.

Dans **SSMS**, insérez un rôle dans la table **RoleTb**.

```sql
USE eDA_4N1_SuperCarte;
GO

INSERT INTO RoleTb(Nom)
VALUES ('Administrateur');
```

La clé primaire n'est pas spécifiée dans le **INSERT**. La migration considère que la clé primaire d'une table est **auto incrémentée** par défaut. 

## Configuration du contexte

### OnModelCreating

Il est possible d'ajouter des configurations et des spécifications à la base de données.

Il est possible de spécifier le nom de la table pour chacune des classes, les clés primaires composées, des types de données spécifiques, des contraintes sur une colonne...

Il faut les ajouter dans la méthode **OnModelCreating** du contexte. Il s'agit du [**FluentAPI**](https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx) . Il est possible de faire plusieurs configurations avec [**DataAnnotation**](https://www.entityframeworktutorial.net/code-first/dataannotation-in-code-first.aspx) directement avec les classes du modèle, mais certaines configurations doivent être faites obligatoirement avec **FluentAPI**. Également, il y a certaines limitations selon la version de **Entity Framework Core** utilisée. Le **FluentAPI** permet de tout faire. Il est préférable de le faire dans un endroit centralisé.

### Nom des tables

Pour débuter, il faut modifier le nom des tables pour retirer le suffixe **Tb** dans la base de données, mais il faut le conserver dans les **DBSet**.

Ajoutez la méthode ci-dessous dans la classe **SuperCarteContext.cs**.

```csharp
/// <summary>
/// Configuration spécifique de la base de données
/// </summary>
/// <param name="modelBuilder"></param>
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    //Table Role
    modelBuilder.Entity<Role>(entity =>
    {
        //Spécifie le nom de la table dans la BD
        entity.ToTable("Role");
    });

    //Table Utilisateur
    modelBuilder.Entity<Utilisateur>(entity =>
    {
        entity.ToTable("Utilisateur");
    });

    //Table Categorie
    modelBuilder.Entity<Categorie>(entity =>
    {
        entity.ToTable("Categorie");
    });

    //Table Ensemble
    modelBuilder.Entity<Ensemble>(entity =>
    {
        entity.ToTable("Ensemble");
    });

    //Table Carte
    modelBuilder.Entity<Carte>(entity =>
    {
        entity.ToTable("Carte");
    });
}
```

Pour chacune des **entités (modèles/tables)**, il faut utiliser le **modelBuilder** pour faire la configuration. Dans une modélisation de données, le terme **Entité** est utilisé pour représenter un concept.  Donc une **entité** dans une base de données est une **table** et pour un modèle objet une classe de **modèle de données**.

La méthode **ToTable()** permet d'indiquer le nom que devra avoir la table dans la base de données (rappelez-vous que présentement, les tables ont le suffix Tb car il était utilisé dans le DbSet). Il serait possible de s'adapter aux standards propres de l'organisation/technologie en utilisant que des minuscules, PascalCase, camelCase, la pluralisation, le underscore pour une table pivot...

Dans la **Console du gestionnaire de Package**, créez la migration **RenommerTables**.

```powershell
Add-Migration RenommerTables -StartupProject SuperCarte.EF
```

Si vous ouvrez le fichier **xxx_RenommerTables.cs** dans le dossier de migration, il y aura seulement la logique pour renommer les tables. En **SQL**, cette tâche demanderait beaucoup de code.

Appliquez la migration avec la commande **Update-Database**. Il faut spécifier la migration **RenommerTables**.

Pour ce projet, utilisez cette commande. 

```csharp
Update-Database -StartupProject SuperCarte.EF -Migration RenommerTables 
```

Ouvrez **SSMS** et la base de données sera présente avec les nouveaux noms.

<img src="/4N1_2024/img/13_migration_2.png"  />


Effectuez également la requête ci-dessous. L'enregistrement **Administrateur** est toujours là.

```sql
SELECT * FROM [Role];
```

### __EFMigrationsHistory

La base de données a également une table **__EFMigrationsHistory**. Cette table permet de lister les migrations qui ont été appliquées sur la base de données.

La table a actuellement ces enregistrements.

```
MigrationId														ProductVersion
20230315124209_CreationBD										7.0.4
20230315131307_RenommerTables									7.0.4
```

Pour revenir à l'état initial, il faut appliquer de nouveau la migration **CreationBD**.

Pour ce projet, utilisez cette commande. 

```csharp
Update-Database -Migration CreationBD
```

Ouvrez **SSMS** et la base de données sera présente avec les anciens noms.

La table **__EFMigrationsHistory** a seulement cet enregistrement.

```
MigrationId														ProductVersion
20230315124209_CreationBD										7.0.4
```

### Créer une clé primaire composée

Il faut créer une clé primaire composée pour la table **UtilisateurCarte**.

Copiez ce code dans la classe **UtilisateurCarte.cs**.

```csharp
namespace SuperCarte.EF.Data;

public class UtilisateurCarte
{
    public int UtilisateurId { get; set; }
    public int CarteId { get; set; }
    public short Quantite { get; set; }
    public Utilisateur Utilisateur { get; set; } = null!;
    public Carte Carte { get; set; } = null!;
}
```

Copiez ce code dans la classe **Carte.cs** pour ajouter la collection **UtilisateurCarteListe**.

```csharp
namespace SuperCarte.EF.Data;

public class Carte
{
    public int CarteId { get; set; }
    public string Nom { get; set; } = null!;
    public byte[]? Image { get; set; }
    public short Vie { get; set; }
    public short Armure { get; set; }
    public short Attaque { get; set; }
    public bool EstRare { get; set; }
    public decimal PrixRevente { get; set; }
    public int CategorieId { get; set; }
    public int EnsembleId { get; set; }
    public Categorie Categorie { get; set; } = null!;
    public Ensemble Ensemble { get; set; } = null!;
//highlight-next-line
    public ICollection<UtilisateurCarte> UtilisateurCarteListe { get; set; } = new List<UtilisateurCarte>();
}
```

Copiez ce code dans la classe **Utilisateur.cs** pour ajouter la collection **UtilisateurCarteListe**.

```csharp
namespace SuperCarte.EF.Data;

public class Utilisateur
{
    public int UtilisateurId {  get; set; }
    public string Prenom { get; set; } = null!;
    public string Nom { get; set; } = null!;
    public string NomUtilisateur { get; set; } = null!;
    public string MotPasseHash { get; set; } = null!;
    public int RoleId { get; set; }
    public Role Role { get; set; } = null!;
    //highlight-next-line
    public ICollection<UtilisateurCarte> UtilisateurCarteListe { get; set; } = new List<UtilisateurCarte>();
}
```

Remplacez le code de la classe **SuperCarteContext** par celui-ci afin d'ajouter le **DBSet\<UtilisateurCarte\>** dans le contexte.
 
L'ajout est à la ligne 112. Il a y également la spécification du nom de la table à la ligne 94.

```csharp showLineNumbers
using Microsoft.EntityFrameworkCore;

namespace SuperCarte.EF.Data.Context;

/// <summary>
/// Contexte pour la base de de données SuperCarte
/// </summary>
public class SuperCarteContext : DbContext
{
    /// <summary>
    /// Constructeur pour la migration
    /// </summary>
	public SuperCarteContext() : base()
    {

    }

    /// <summary>
    /// Constructeur pour l'utilisation en programme
    /// </summary>
    /// <param name="options">Option de la base de données</param>
    public SuperCarteContext(DbContextOptions<SuperCarteContext> options)
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

    /// <summary>
    /// Configuration spécifique de la base de données
    /// </summary>
    /// <param name="modelBuilder"></param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //Table Role
        modelBuilder.Entity<Role>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Role");
        });

        //Table Utilisateur
        modelBuilder.Entity<Utilisateur>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Utilisateur");
        });

        //Table Categorie
        modelBuilder.Entity<Categorie>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Categorie");
        });

        //Table Ensemble
        modelBuilder.Entity<Ensemble>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Ensemble");
        });

        //Table Carte
        modelBuilder.Entity<Carte>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Carte");
        });

//highlight-start
        //Table UtilisateurCarte
        modelBuilder.Entity<UtilisateurCarte>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("UtilisateurCarte");
        });
//highlight-end
    }


    public DbSet<Role> RoleTb { get; set; }

    public DbSet<Utilisateur> UtilisateurTb { get; set; }

    public DbSet<Categorie> CategorieTb { get; set; }

    public DbSet<Ensemble> EnsembleTb { get; set; }

    public DbSet<Carte> CarteTb { get; set; }

//highlight-next-line
    public DbSet<UtilisateurCarte> UtilisateurCarteTb { get; set; }
}
```

Effectuez une nouvelle migration nommée **AjouterTableUtilisateurCarte**.

```powershell
Add-Migration AjouterTableUtilisateurCarte -StartupProject SuperCarte.EF
```

Vous allez avoir ce message d'erreur.

```
The entity type 'UtilisateurCarte' requires a primary key to be defined. If you intended to use a keyless entity type, call 'HasNoKey' in 'OnModelCreating'. For more information on keyless entity types, see https://go.microsoft.com/fwlink/?linkid=2141943.
```

Ceci indique que la classe **UtilisateurCarte** n'a pas de clé primaire, car il n'y a pas de propriété **UtilisateurCarteId**. Le générateur de migration n'est pas en mesure de déterminer que les propriétés **UtilisateurId** et **CarteId** sont les clés primaires. Il faut donc le spécifier dans le contexte.

Modifiez la partie **UtilisateurCarte** dans la méthode **OnModelCreating()** du contexte.

```csharp
//Table UtilisateurCarte
modelBuilder.Entity<UtilisateurCarte>(entity =>
{
    //Spécifie le nom de la table dans la BD
    entity.ToTable("UtilisateurCarte");

    //Spécifie la clé primaire
    entity.HasKey(t => new { t.UtilisateurId, t.CarteId });
});
```

La méthode **HasKey()** permet de spécifier la clé primaire. Si la clé est représentée par plusieurs champs, il faut créer un objet dynamique **new {}** et insérer toutes les propriétés qui représentent la clé primaire.

Il peut arriver qu'une table n'utilise pas une clé artificielle pour la clé primaire. Par exemple, la table **Etudiant** peut avoir comme clé primaire le champ **DA** et non **EtudiantId**. Il faudrait spécifier **entity.HasKey(t => t.DA)**.

Effectuez une nouvelle migration nommée **AjouterTableUtilisateurCarte**. Elle devrait fonctionner.

```powershell
Add-Migration AjouterTableUtilisateurCarte
```

Dans le fichier de migration **xxx_AjouterTableUtilisateurCarte.cs** du dossier **Migrations**, il y a seulement la logique de la création de la table **UtilisateurCarte**. Il prend en considération les anciennes migrations, dont **RemommerTables** même si elle n'est pas actuellement appliquée.

Appliquez les modifications à la base de données. Spécifiez la migration **AjouterTableUtilisateurCarte**.

```csharp
Update-Database -StartupProject SuperCarte.EF -Migration AjouterTableUtilisateurCarte
```

Ouvrez **SSMS** et la base de données aura de nouveau les bons noms de table et la table **UtilisateurCarte** est présente avec ses clés primaires.

<img src="/4N1_2024/img/13_migration_3.png"  />

La table **__EFMigrationsHistory** a toutes les migrations qui ont été appliquées à la base de données. La migration **RenommerTables** a été exécutée de nouveau, car la version de la BD était celle de **CreationBD**.

```
MigrationId														ProductVersion
20230315124209_CreationBD										7.0.4
20230315131307_RenommerTables									7.0.4
20230315140002_AjouterTableUtilisateurCarte						7.0.4
```

### Type des champs - string, decimal et date

Actuellement, toutes les chaines de caractères sont des **NVARCHAR(MAX)**. Il est de plus en plus fréquent de ne plus spécifier la longueur des chaines de caractères qui ne sont pas fixes, car il est difficile de déterminer la bonne longueur pour plusieurs champs. La longueur est souvent spécifiée par l'expérience, mais sans considération valable. Le **NVARCHAR(MAX)** va seulement utiliser l'espace nécessaire. La gestion des contraintes se fait normalement au niveau du logiciel maintenant. Si la longueur maximale doit être modifiée, il n'est pas nécessaire de modifier la base de données, seulement la partie **validation** dans le logiciel.

Mais en tant que programmeur, il faut réaliser le **DEA** tel que produit par le concepteur. Si vous êtes le concepteur, posez-vous la question s'il est nécessaire de limiter la longueur d'un champ ou de ne pas permettre le **unicode**.

Le **modelBuilder** a la méthode **Property()** qui permet de spécifier les éléments spécifiques à un champ. La méthode **Property()** est chainable, donc il est possible d'ajouter toutes les spécifications d'un coup pour une propriété. Elle reçoit en paramètre une fonction **Lambda** pour spécifier la propriété. La variable **t** est utilisée pour **Table**. Ensuite, les autres méthodes chainables permettent de configurer la propriété/champ.

Pour spécifier la longueur maximale, c'est la méthode **HasMaxLength()** qui permet de la spécifier.

Dans le **DEA**, ce sont des **VARCHAR** et non des **NVARCHAR**. La méthode **IsUnicode(false)** permet d'indiquer que ce n'est pas un **NVARCHAR**.

Voici les exemples pour la configuration des différents cas. La classe complète sera fourni à la fin de la section.

Pour la table **Role**

```csharp title="NE PAS COPIER"
//Table Role
modelBuilder.Entity<Role>(entity =>
{
    //Spécifie le nom de la table dans la BD
    entity.ToTable("Role");

    entity.Property(t => t.Nom)
        .IsUnicode(false) //VARCHAR ou CHAR
        .HasMaxLength(25); //VARCHAR(25)        
});
```

Pour la table **Utilisateur**, le champ **MotPasseHash** est un **CHAR(60)**. La longueur d'un **Hash** est fixe à 60 caractères pour l'algorithme **Bcrypt**. Ce sera l'algorithme utilisé pour ce projet. Pour ce cas, il est pertinent pour le concepteur de fixer la longueur. La méthode **IsFixedLength()** permet d'indiquer que c'est un **NCHAR** ou un **CHAR**. 

```csharp title="NE PAS COPIER"
//Table Utilisateur
modelBuilder.Entity<Utilisateur>(entity =>
{
    //Spécifie le nom de la table dans la BD
    entity.ToTable("Utilisateur");           

    entity.Property(t => t.MotPasseHash)
        .IsUnicode(false)
        .IsFixedLength(true) //CHAR
        .HasMaxLength(60);
    
    /*Autres colonnes à ajouter*/
});
```

Pour la table **Carte**, le champ **PrixRevente** doit être un **DECIMAL(8,2)**. La méthode **HasPrecision()** permet de préciser la précision d'un **DECIMAL**.

```csharp title="NE PAS COPIER"
//Table Carte
modelBuilder.Entity<Carte>(entity =>
{
    //Spécifie le nom de la table dans la BD
    entity.ToTable("Carte");

    entity.Property(t => t.PrixRevente)
        .HasPrecision(8, 2); //DECIMAL(8,2)
});
```

Pour la table **Ensemble**, le champ **Disponibilite** doit être de type **DATE**. Actuellement c'est un **DATETIME2**. La méthode **HasColumnType()** permet de spécifier directement un type. Il faut s'assurer que le type est compatible avec celui de la classe.

```csharp title="NE PAS COPIER"
//Table Ensemble
modelBuilder.Entity<Ensemble>(entity =>
{
    //Spécifie le nom de la table dans la BD
    entity.ToTable("Ensemble");

    entity.Property(t => t.Disponibilite)
        .HasColumnType("DATE");
});
```

Voici la classe **SuperCarteContext.cs** au complet avec tous les ajustements pour les champs.

```csharp title="CELLE LA, COPIEZ LA"
using Microsoft.EntityFrameworkCore;

namespace SuperCarte.EF.Data.Context;

/// <summary>
/// Contexte pour la base de de données SuperCarte
/// </summary>
public class SuperCarteContext : DbContext
{
    /// <summary>
    /// Constructeur pour la migration
    /// </summary>
	public SuperCarteContext() : base()
    {

    }

    /// <summary>
    /// Constructeur pour l'utilisation en programme
    /// </summary>
    /// <param name="options">Option de la base de données</param>
    public SuperCarteContext(DbContextOptions<SuperCarteContext> options)
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

    /// <summary>
    /// Configuration spécifique de la base de données
    /// </summary>
    /// <param name="modelBuilder"></param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //Table Role
        modelBuilder.Entity<Role>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Role");

            entity.Property(t => t.Nom)
                .IsUnicode(false) //VARCHAR ou CHAR
                .HasMaxLength(25); //VARCHAR(25)   
        });

        //Table Utilisateur
        modelBuilder.Entity<Utilisateur>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Utilisateur");

            entity.Property(t => t.Prenom)
                .IsUnicode(false)                    
                .HasMaxLength(50);

            entity.Property(t => t.Nom)
                .IsUnicode(false)
                .HasMaxLength(50);

            entity.Property(t => t.NomUtilisateur)
                .IsUnicode(false)
                .HasMaxLength(50);

            entity.Property(t => t.MotPasseHash)
                .IsUnicode(false)
                .IsFixedLength(true) //CHAR
                .HasMaxLength(60);
        });

        //Table Categorie
        modelBuilder.Entity<Categorie>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Categorie");

            entity.Property(t => t.Nom)
                    .IsUnicode(false)
                    .HasMaxLength(35);

            entity.Property(t => t.Description)
                    .IsUnicode(false)
                    .HasMaxLength(50);
        });

        //Table Ensemble
        modelBuilder.Entity<Ensemble>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Ensemble");

            entity.Property(t => t.Nom)
                    .IsUnicode(false)
                    .HasMaxLength(50);

            entity.Property(t => t.Disponibilite)
                .HasColumnType("DATE");
        });

        //Table Carte
        modelBuilder.Entity<Carte>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Carte");

            entity.Property(t => t.Nom)
                    .IsUnicode(false)
                    .HasMaxLength(100);

            entity.Property(t => t.PrixRevente)
                .HasPrecision(8,2);
        });

        //Table UtilisateurCarte
        modelBuilder.Entity<UtilisateurCarte>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("UtilisateurCarte");

            //Spécifie la clé primaire
            entity.HasKey(t => new { t.UtilisateurId, t.CarteId });
        });
    }


    public DbSet<Role> RoleTb { get; set; }

    public DbSet<Utilisateur> UtilisateurTb { get; set; }

    public DbSet<Categorie> CategorieTb { get; set; }

    public DbSet<Ensemble> EnsembleTb { get; set; }

    public DbSet<Carte> CarteTb { get; set; }

    public DbSet<UtilisateurCarte> UtilisateurCarteTb { get; set; }
}
```

Créez la migration **CorrectionType**.

```powershell
Add-Migration CorrectionType -StartupProject SuperCarte.EF
```

Appliquez les modifications à la base de données. Spécifiez la migration **CorrectionType**.

```csharp
Update-Database -StartupProject SuperCarte.EF -Migration CorrectionType
```

Ouvrez **SSMS** et la base de données aura les nouveaux types pour les champs modifiés.

### Ajout d'une contrainte d'unicité

Pour la table **Utilisateur**, le champ **NomUtilisateur** doit être unique.

Cette contrainte est assez importante dans la base de données, car s'il y a un problème dans l'application pour faire la validation d'un doublon, l'application aurait une faille de sécurité.

Une contrainte d'unicité permet de créer un **index** de recherche sur le champ et d'indiquer la contrainte **UNIQUE**. Il faut donc créer un **index** dans le contexte et de le spécifier comme unique. La spécification est à la ligne 24. Par contre, dans la base de données, il n'y aura pas de contrainte explicite **UNIQUE** sur le champ. Ce sera uniquement l'index qui s'occupera de valider l'unicité. L'ajout de l'index unique est à la ligne 25 du code ci-dessous.

Remplacez la section pour Table Utilisateur dans SuperCarteContext.cs

```csharp showLineNumbers

//Table Utilisateur
modelBuilder.Entity<Utilisateur>(entity =>
{
    //Spécifie le nom de la table dans la BD
    entity.ToTable("Utilisateur");

    entity.Property(t => t.Prenom)
        .IsUnicode(false)                    
        .HasMaxLength(50);

    entity.Property(t => t.Nom)
        .IsUnicode(false)
        .HasMaxLength(50);

    entity.Property(t => t.NomUtilisateur)
        .IsUnicode(false)
        .HasMaxLength(50);

    entity.Property(t => t.MotPasseHash)
        .IsUnicode(false)
        .IsFixedLength(true) //CHAR
        .HasMaxLength(60);

//highlight-next-line
    entity.HasIndex(t => t.NomUtilisateur).IsUnique(true);
});
```

Créez la migration **UtilisateurNomUtilisateurUnique**.

```powershell
Add-Migration UtilisateurNomUtilisateurUnique -StartupProject SuperCarte.EF
```

Appliquez les modifications à la base de données. Spécifiez la migration **UtilisateurNomUtilisateurUnique**.

```powershell
Update-Database -StartupProject SuperCarte.EF -Migration UtilisateurNomUtilisateurUnique
```

Ouvrez **SSMS** et la base de données aura l'index avec la mention **Unique** sur le champ **NomUtilisateur**. Il n'aura pas de contrainte **UNIQUE** sur le champ, mais le résultat est le même.

### ON DELETE NO ACTION

Par défaut, les clés étrangères ont la règle **ON DELETE CASCADE**. Dans certains cas, ce comportement peut être intéressant, car ceci permet de supprimer plusieurs enregistrements à partie de l'enregistrement parent.

Pour la table **UtilisateurCarte**, il pourrait être intéressant de conserver le **ON DELETE CASCADE** sur la clé étrangère **UtilisateurId**. Si l'utilisateur est supprimé, les cartes qu'ils possèdent le seront également.

Par contre, pour la clé étrangère carte, il n'est pas intéressant de le faire, car si une carte est supprimée, elle disparaitrait de tous les utilisateurs. L'administrateur avant de supprimer une carte qui est utilisée par des utilisateurs devra prendre une action spéciale s'il désire réellement supprimer la carte, soit en offrant une nouvelle carte en compensation. Il serait possible de gérer ce comportement dans le code uniquement, mais en cas de **bug**, les conséquences peuvent être importantes. Il peut être préférable de limiter ce comportement dans la base de données également.

Pour le **ON UPDATE**, il est toujours à **NO ACTION** avec **Entity Framework**, même si la table est configurée de cette façon dans la base de données.

Pour l'instant, toutes les clés étrangères auront **ON DELETE NO ACTION**. Pour **Entity Framework**, il faut mettre **DeleteBehavior.ClientSetNull**.

Il faut donc configurer manuellement dans le **contexte** la relation **Plusieurs à 1** avec la méthode **HasOne()**.

Pour la table **Utilisateur**, la relation est avec la table **Role**.

```csharp
//Table Utilisateur
modelBuilder.Entity<Utilisateur>(entity =>
{
    /** Code précédent retiré pour l'exemple uniquement **/

    entity.HasOne(t => t.Role).WithMany(p => p.UtilisateurListe)
        .HasForeignKey(t => t.RoleId)
        .OnDelete(DeleteBehavior.ClientSetNull);
});
```

La méthode **HasOne(t => t.Role)** indique qu'il y a une relation **Plusieurs à 1** avec la table/modèle **Role**.

La méthode **WithMany(p => p.UtilisateurListe)** indique la relation **1 à plusieurs** de la table/modèle **Role** avec la table/modèle **Utilisateur**. La variable **p** est pour **Table Parent**.

La méthode **HasForeignKey(t => t.RoleId)** indique que la clé étrangère de la table/modèle **Role** est la propriété **RoleId**.

La méthode **OnDelete(DeleteBehavior.ClientSetNull)** permet d'indiquer que la règle est **No Action**. Malgré que l'option **DeleteBehavior.NoAction** existe, il est recommandé de prendre **DeleteBehavior.ClientSetNull**.

Pour la classe **Carte** et **UtilisateurCarte**, il y a 2 clés étrangères. Il faut le faire pour les 2 clés.

Pour la table **Carte**.

```csharp title="NE PAS COPIER"
//Table Carte
modelBuilder.Entity<Carte>(entity =>
{
    /** Code précédent retiré pour l'exemple uniquement **/

    entity.HasOne(t => t.Ensemble).WithMany(p => p.CarteListe)
            .HasForeignKey(t => t.EnsembleId)
            .OnDelete(DeleteBehavior.ClientSetNull);

    entity.HasOne(t => t.Categorie).WithMany(p => p.CarteListe)
            .HasForeignKey(t => t.CategorieId)
            .OnDelete(DeleteBehavior.ClientSetNull);
});
```

Pour la table **UtilisateurCarte**.

```csharp title="NE PAS COPIER"
//Table UtilisateurCarte
modelBuilder.Entity<UtilisateurCarte>(entity =>
{
    /** Code précédent retiré pour l'exemple uniquement **/

    entity.HasOne(t => t.Utilisateur).WithMany(p => p.UtilisateurCarteListe)
            .HasForeignKey(t => t.UtilisateurId)
            .OnDelete(DeleteBehavior.ClientSetNull);

    entity.HasOne(t => t.Carte).WithMany(p => p.UtilisateurCarteListe)
            .HasForeignKey(t => t.CarteId)
            .OnDelete(DeleteBehavior.ClientSetNull);
});
```

Voici le code du contexte **SuperCarteContext.cs** au complet.

```csharp title="CELLE LA, COPIEZ LA"
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace SuperCarte.EF.Data.Context;

/// <summary>
/// Contexte pour la base de de données SuperCarte
/// </summary>
public class SuperCarteContext : DbContext
{
    private bool _executerSeed = false;

    /// <summary>
    /// Constructeur pour la migration
    /// </summary>
	public SuperCarteContext() : base()
    {

    }

    /// <summary>
    /// Constructeur pour l'utilisation en programme
    /// </summary>
    /// <param name="options">Option de la base de données</param>
    public SuperCarteContext(DbContextOptions<SuperCarteContext> options)
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

                _executerSeed = true;
            }
            else
            {
                //Il n'y a aucune chaine de connexion.
                throw new Exception("La variable MIGRATION_CONNECTION_STRING n'est pas spécifiée. Effectuez la commande suivante dans la Console du Gestionnaire de package : $env:MIGRATION_CONNECTION_STRING=\"[ma chaine de connexion]\" ");
            }
        }
    }
#endif

    /// <summary>
    /// Configuration spécifique de la base de données
    /// </summary>
    /// <param name="modelBuilder"></param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //Table Role
        modelBuilder.Entity<Role>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Role");

            entity.Property(t => t.Nom)
                .IsUnicode(false) //VARCHAR ou CHAR
                .HasMaxLength(25); //VARCHAR(25)   
        });

        //Table Utilisateur
        modelBuilder.Entity<Utilisateur>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Utilisateur");

            entity.Property(t => t.Prenom)
                .IsUnicode(false)
                .HasMaxLength(50);

            entity.Property(t => t.Nom)
                .IsUnicode(false)
                .HasMaxLength(50);

            entity.Property(t => t.NomUtilisateur)
                .IsUnicode(false)
                .HasMaxLength(50);

            entity.Property(t => t.MotPasseHash)
                .IsUnicode(false)
                .IsFixedLength(true) //CHAR
                .HasMaxLength(60);

            entity.HasIndex(t => t.NomUtilisateur).IsUnique(true);

//highlight-start
            entity.HasOne(t => t.Role).WithMany(p => p.UtilisateurListe)
                .HasForeignKey(t => t.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull);
                //highlight-end

        });

        //Table Categorie
        modelBuilder.Entity<Categorie>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Categorie");

            entity.Property(t => t.Nom)
                    .IsUnicode(false)
                    .HasMaxLength(35);

            entity.Property(t => t.Description)
                    .IsUnicode(false)
                    .HasMaxLength(50);
        });

        //Table Ensemble
        modelBuilder.Entity<Ensemble>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Ensemble");

            entity.Property(t => t.Nom)
                    .IsUnicode(false)
                    .HasMaxLength(50);

            entity.Property(t => t.Disponibilite)
                .HasColumnType("DATE");
        });

        //Table Carte
        modelBuilder.Entity<Carte>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Carte");

            entity.Property(t => t.Nom)
                    .IsUnicode(false)
                    .HasMaxLength(100);

            entity.Property(t => t.PrixRevente)
                .HasPrecision(8,2);

//highlight-start
            entity.HasOne(t => t.Ensemble).WithMany(p => p.CarteListe)
                    .HasForeignKey(t => t.EnsembleId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(t => t.Categorie).WithMany(p => p.CarteListe)
                    .HasForeignKey(t => t.CategorieId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
//highlight-end
        });

        //Table UtilisateurCarte
        modelBuilder.Entity<UtilisateurCarte>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("UtilisateurCarte");

            //Spécifie la clé primaire
            entity.HasKey(t => new { t.UtilisateurId, t.CarteId });

            entity.HasOne(t => t.Utilisateur).WithMany(p => p.UtilisateurCarteListe)
                    .HasForeignKey(t => t.UtilisateurId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(t => t.Carte).WithMany(p => p.UtilisateurCarteListe)
                    .HasForeignKey(t => t.CarteId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
        });
    }

    public DbSet<Role> RoleTb { get; set; }

    public DbSet<Utilisateur> UtilisateurTb { get; set; }

    public DbSet<Categorie> CategorieTb { get; set; }

    public DbSet<Ensemble> EnsembleTb { get; set; }

    public DbSet<Carte> CarteTb { get; set; }

    public DbSet<UtilisateurCarte> UtilisateurCarteTb { get; set; }
}
```

Créez la migration **FKOnDeleteNoAction**.

```powershell
Add-Migration FKOnDeleteNoAction -StartupProject SuperCarte.EF
```

Appliquez les modifications à la base de données. Spécifiez la migration **UtilisateurNomUtilisateurUnique**.

```powershell
Update-Database -StartupProject SuperCarte.EF -Migration FKOnDeleteNoAction
```

Ouvrez **SSMS** et les clés étrangères auront **No Action**.

Voici le résultat de la 7e section de **sp_help Utilisateur **.

```
constraint_type			constraint_name				delete_action	update_action	
FOREIGN KEY				FK_Utilisateur_Role_RoleId	No Action		No Action		
```




## Seed - Ajout des données

Pour ajouter des données, il faut le faire dans la méthode **OnModelCreating()**. Cette action s'appelle **Seed** pour semer des données.

:::danger ATTENTION
Avant de poursuivre, il faut retirer l'enregistrement de la table **Role** qui a été fait manuellement.

```sql
DELETE FROM Role;
```
:::
### Préparation du contexte

Pour éviter que le **Seed** soit toujours exécuté, il est préférable de modifier le contexte. Ce sera l'attribut **_executerSeed** qui indiquera si le seeder doit ou non être exécuté.

```csharp showLineNumbers
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace SuperCarte.EF.Data.Context;

/// <summary>
/// Contexte pour la base de de données SuperCarte
/// </summary>
public class SuperCarteContext : DbContext
{
    //highlight-next-line
    private bool _executerSeed = false;

    /// <summary>
    /// Constructeur pour la migration
    /// </summary>
	public SuperCarteContext() : base()
    {

    }

    /// <summary>
    /// Constructeur pour l'utilisation en programme
    /// </summary>
    /// <param name="options">Option de la base de données</param>
    public SuperCarteContext(DbContextOptions<SuperCarteContext> options)
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
//highlight-next-line
                _executerSeed = true;
            }
            else
            {
                //Il n'y a aucune chaine de connexion.
                throw new Exception("La variable MIGRATION_CONNECTION_STRING n'est pas spécifiée. Effectuez la commande suivante dans la Console du Gestionnaire de package : $env:MIGRATION_CONNECTION_STRING=\"[ma chaine de connexion]\" ");
            }
        }
    }
#endif

    /// <summary>
    /// Configuration spécifique de la base de données
    /// </summary>
    /// <param name="modelBuilder"></param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //Table Role
        modelBuilder.Entity<Role>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Role");

            entity.Property(t => t.Nom)
                .IsUnicode(false) //VARCHAR ou CHAR
                .HasMaxLength(25); //VARCHAR(25)   
        });

        //Table Utilisateur
        modelBuilder.Entity<Utilisateur>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Utilisateur");

            entity.Property(t => t.Prenom)
                .IsUnicode(false)
                .HasMaxLength(50);

            entity.Property(t => t.Nom)
                .IsUnicode(false)
                .HasMaxLength(50);

            entity.Property(t => t.NomUtilisateur)
                .IsUnicode(false)
                .HasMaxLength(50);

            entity.Property(t => t.MotPasseHash)
                .IsUnicode(false)
                .IsFixedLength(true) //CHAR
                .HasMaxLength(60);

            entity.HasIndex(t => t.NomUtilisateur).IsUnique(true);

            entity.HasOne(t => t.Role).WithMany(p => p.UtilisateurListe)
                .HasForeignKey(t => t.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        //Table Categorie
        modelBuilder.Entity<Categorie>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Categorie");

            entity.Property(t => t.Nom)
                    .IsUnicode(false)
                    .HasMaxLength(35);

            entity.Property(t => t.Description)
                    .IsUnicode(false)
                    .HasMaxLength(50);
        });

        //Table Ensemble
        modelBuilder.Entity<Ensemble>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Ensemble");

            entity.Property(t => t.Nom)
                    .IsUnicode(false)
                    .HasMaxLength(50);

            entity.Property(t => t.Disponibilite)
                .HasColumnType("DATE");
        });

        //Table Carte
        modelBuilder.Entity<Carte>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Carte");

            entity.Property(t => t.Nom)
                    .IsUnicode(false)
                    .HasMaxLength(100);

            entity.Property(t => t.PrixRevente)
                .HasPrecision(8,2);

            entity.HasOne(t => t.Ensemble).WithMany(p => p.CarteListe)
                    .HasForeignKey(t => t.EnsembleId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(t => t.Categorie).WithMany(p => p.CarteListe)
                    .HasForeignKey(t => t.CategorieId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
        });

        //Table UtilisateurCarte
        modelBuilder.Entity<UtilisateurCarte>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("UtilisateurCarte");

            //Spécifie la clé primaire
            entity.HasKey(t => new { t.UtilisateurId, t.CarteId });

            entity.HasOne(t => t.Utilisateur).WithMany(p => p.UtilisateurCarteListe)
                    .HasForeignKey(t => t.UtilisateurId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(t => t.Carte).WithMany(p => p.UtilisateurCarteListe)
                    .HasForeignKey(t => t.CarteId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
        });
//highlight-start
        if(_executerSeed == true)
        {
            Seed(modelBuilder);
        }

    }

    /// <summary>
    /// Méthode qui s'occupe de la création des données
    /// </summary>
    private void Seed(ModelBuilder modelBuilder)
    {
        //Les données à ajouter
    }
//highlight-end
    public DbSet<Role> RoleTb { get; set; }

    public DbSet<Utilisateur> UtilisateurTb { get; set; }

    public DbSet<Categorie> CategorieTb { get; set; }

    public DbSet<Ensemble> EnsembleTb { get; set; }

    public DbSet<Carte> CarteTb { get; set; }

    public DbSet<UtilisateurCarte> UtilisateurCarteTb { get; set; }
}
```

À la ligne 45, l'activation du **Seed** se fait uniquement si le contexte est initialisé en mode **Migration** dans la méthode **OnConfiguring()**.

À la ligne 171, il y a une vérification avant d'exécuter le **Seed** dans la méthode **OnModelCreating()**.

À la ligne 181, les données seront créées dans cette méthode.

### Création des données

Pour ajouter des données, il faut envoyer un tableau des données dans la méthode **HasData()** de l'entité en question.

Il est obligatoire de spécifier les clés primaires et étrangères lors d'un **Seed** à partir de la migration avec **Entity Framework**.

Remplaces la méthode Seed() avec ce code:

```csharp
/// <summary>
/// Méthode qui s'occupe de la création des données
/// </summary>
private void Seed(ModelBuilder modelBuilder)
{
    //Les données à ajouter
    Role[] roles = 
    {
        new Role() 
        { 
            RoleId = 1,
            Nom = "Administrateur"                
        },
        new Role()
        {
            RoleId = 2,
            Nom = "Utilisateur"
        },
    };

    Utilisateur[] utilisateurs =
    {
        new Utilisateur()
        {
            UtilisateurId = 1,
            Prenom = "François",
            Nom = "St-Hilaire",
            NomUtilisateur = "fsthilaire",
            MotPasseHash = "$2y$11$IY6NG9FkTSI1dnjLfSbuOuNkuyI7IZHxHSOD5Td6AlwvroUz/vzLK", 
			//Native3! avec Bcrypt
            RoleId = 1 //Admin
        },
        new Utilisateur()
        {
            UtilisateurId = 2,
            Prenom = "Benoit",
            Nom = "Tremblay",
            NomUtilisateur = "btremblay",
            MotPasseHash = "$2y$11$ewK3YsMGQ1IMKEzJUAjyVe0P19I0gEbTO998mwfVbSSA8nZ6MG/ha", 
			//Web4MVC! avec Bcrypt
            RoleId = 2 //Utilisateur
        },
        new Utilisateur() 
        {
            UtilisateurId = 3,
            Prenom = "Tony",
            Nom = "Stark",
            NomUtilisateur = "tstark",
            MotPasseHash = "$2y$11$VfcNowkWResPQKl0AA3MJ.w1LXBqmMM77YKlyf32Glr9TWG4xxyD2", 
			//#NotAdmin! avec Bcrypt
            RoleId = 2 //Utilisateur
        }
    };

    //Ajout dans les tables
    modelBuilder.Entity<Role>().HasData(roles);
    modelBuilder.Entity<Utilisateur>().HasData(utilisateurs);
}
```

Les utilisateurs ont un mot de passe en **Hash** avec l'algorithme **Bcrypt**. Le site web **https://bcrypt.online/** a permis de les générer manuellement pour les insérer directement. La librairie **Bcrypt.Net** sera utilisée dans l'application.

Créez la migration **Seed_RoleEtUtilisateur**.

```powershell
Add-Migration Seed_RoleEtUtilisateur -StartupProject SuperCarte.EF
```

Appliquez les modifications à la base de données. Spécifiez la migration **Seed_RoleEtUtilisateur**.

```powershell
Update-Database -StartupProject SuperCarte.EF -Migration Seed_RoleEtUtilisateur
```

Ouvrez **SSMS** et la base de données aura des données dans les tables **Utilisateur** et **Role**.

