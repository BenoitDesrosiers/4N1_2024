---
sidebar_position: 15
---

# Modification de la BD

Ouvrez **SSMS** et la base de données sera présente.

Il y a par contre quelques erreurs. 
* Les tables se terminent par **Tb**.
* Toutes les propriétés **string** sont des **NVARCHAR(max)**. 
* Le champ **Univers.Nom** n'est pas unique. (ce n'était pas dans le diagramme, mais ca fait du sens :smile:
  
Ceci ne respecte pas le **DEA**. Il faut configurer le contexte pour respecter le **DEA**.

L'utilisation de la migration permet également de conserver les données existantes dans une table.

Dans **SSMS**, insérez un rôle dans la table **UniversTb**.

```sql
USE eDA_4N1_Univers;
GO

INSERT INTO UniversTb(Nom, AnneeCreation)
VALUES ('DC', 1935);
```

La clé primaire n'est pas spécifiée dans le **INSERT**. La migration considère que la clé primaire d'une table est **auto incrémentée** par défaut. 


## Configuration du contexte

### OnModelCreating

Il est possible d'ajouter des configurations et des spécifications à la base de données.

Il est possible de spécifier le nom de la table pour chacune des classes, les clés primaires composées, des types de données spécifiques, des contraintes sur une colonne...

Il faut les ajouter dans la méthode **OnModelCreating** du contexte. Il s'agit du [**FluentAPI**](https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx) . Il est possible de faire plusieurs configurations avec [**DataAnnotation**](https://www.entityframeworktutorial.net/code-first/dataannotation-in-code-first.aspx) directement avec les classes du modèle, mais certaines configurations doivent être faites obligatoirement avec **FluentAPI**. Également, il y a certaines limitations selon la version de **Entity Framework Core** utilisée. Le **FluentAPI** permet de tout faire. Il est préférable de le faire dans un endroit centralisé.

### Nom des tables

Pour débuter, il faut modifier le nom des tables pour retirer le suffixe **Tb** dans la base de données, mais il faut le conserver dans les **DBSet**.

Ajoutez la méthode ci-dessous dans la classe **UniversContext.cs**.

```csharp
/// <summary>
/// Configuration spécifique de la base de données
/// </summary>
/// <param name="modelBuilder"></param>
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    //Table Personnage
    modelBuilder.Entity<Personnage>(entity =>
    {
        //Spécifie le nom de la table dans la BD
        entity.ToTable("Personnage");
    });

    //Table Univers
    modelBuilder.Entity<Univers>(entity =>
    {
        entity.ToTable("Univers");
    });

    //Table Film
    modelBuilder.Entity<Film>(entity =>
    {
        entity.ToTable("Film");
    });

    
}
```

Pour chacune des **entités (modèles/tables)**, il faut utiliser le **modelBuilder** pour faire la configuration. Dans une modélisation de données, le terme **Entité** est utilisé pour représenter un concept. **DEA** est pour **Diagramme Entité Association**. Donc une **entité** dans une base de données est une table et pour un modèle objet une classe de modèle de données.

La méthode **ToTable()** permet d'indiquer le nom de la table dans la base de données. Il serait possible de s'adapter aux standards propres de l'organisation/technologie en utilisant que des minuscules, PascalCase, camelCase, la pluralisation, le underscore pour une table pivot...

Dans la **Console du gestionnaire de Package**, créez la migration **RenommerTables**.

```powershell
Add-Migration RenommerTables -StartupProject Univers.EF
```

Si vous ouvrez le fichier **xxx_RenommerTables.cs** dans le dossier de migration, il y aura seulement la logique pour renommer les tables. En **SQL**, cette tâche demanderait beaucoup de code.

Appliquez la migration avec la commande **Update-Database**. Il faut spécifier la migration **RenommerTables**.

Pour ce projet, utilisez cette commande. Le nom de la base de données est **eDA_4N1_Univers**. Modifiez le **DA** par votre numéro d'admission.

```csharp
Update-Database -StartupProject Univers.EF -Migration RenommerTables 
```

Ouvrez **SSMS** et la base de données sera présente avec les nouveaux noms.

Effectuez également la requête ci-dessous. L'enregistrement dans **Univers** est toujours là.

```sql
SELECT * FROM [Univers];
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

Il faut créer une clé primaire composée pour la table **Distribution**.

Copiez ce code dans la classe **Distribution.cs**.

```csharp
namespace Univers.EF.Data;

public class Distribution
{
    public int PersonnageId { get; set; }
    public int FilmId { get; set; }
    public string Acteur { get; set; } = null!;
    public Personnage Personnage { get; set; } = null!;
    public Film Film { get; set; } = null!;
}
```

Copiez ce code dans la classe **Personnage.cs** pour ajouter la collection **DistributionListe**.

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
    //highlight-next-line
    public ICollection<Distribution> DistributionListe { get; set; } = new List<Distribution>();
}
```

Copiez ce code dans la classe **Film.cs** pour ajouter la collection **DistributionListe**.

```csharp
namespace Univers.EF.Data;
public class Film
{
    public int FilmId { get; set; }
    public string Titre { get; set; } = null!;
    public DateOnly DateSortie { get; set; }
    public byte Etoile { get; set; }
    public int Duree { get; set; }
        //highlight-next-line
    public ICollection<Distribution> DistributionListe { get; set; } = new List<Distribution>();
}

```

Remplacez le code de la classe **UniversContext** par celui-ci afin d'ajouter le **DBSet\<Distribution\>** dans le contexte.
 
L'ajout est à la ligne 88. Il a y également la spécification du nom de la table à la ligne 76.

```csharp showLineNumbers
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

    /// <summary>
    /// Configuration spécifique de la base de données
    /// </summary>
    /// <param name="modelBuilder"></param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //Table Personnage
        modelBuilder.Entity<Personnage>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Personnage");
        });

        //Table Univers
        modelBuilder.Entity<Univers>(entity =>
        {
            entity.ToTable("Univers");
        });

        //Table Film
        modelBuilder.Entity<Film>(entity =>
        {
            entity.ToTable("Film");
        });
//highlight-start
        //Table Distribution
        modelBuilder.Entity<Distribution>(entity =>
        {
            entity.ToTable("Distribution");
        });
//highlight-end
    }
    public DbSet<Personnage> PersonnageTb { get; set; }

    public DbSet<Univers> UniversTb { get; set; }

    public DbSet<Film> FilmTb { get; set; }
//highlight-next-line
    public DbSet<Distribution> DistributionTb { get; set; }

}
```

Effectuez une nouvelle migration nommée **AjouterTableDistribution**.

```powershell
Add-Migration AjouterTableDistribution -StartupProject Univers.EF
```

Vous allez avoir ce message d'erreur.

```
The entity type 'Distribution' requires a primary key to be defined. If you intended to use a keyless entity type, call 'HasNoKey' in 'OnModelCreating'. For more information on keyless entity types, see https://go.microsoft.com/fwlink/?linkid=2141943.
```

Ceci indique que la classe **Distribution** n'a pas de clé primaire, car il n'y a pas de propriété **DistributionId**. Le générateur de migration n'est pas en mesure de déterminer que les propriétés **PersonnageId** et **FilmId** sont les clés primaires. Il faut donc le spécifier dans le contexte.

Modifiez la partie **Distribution** dans la méthode **OnModelCreating()** du contexte.

```csharp
///Table Distribution
modelBuilder.Entity<Distribution>(entity =>
{
    entity.ToTable("Distribution");

    //highlight-start
    //spécifie la clé primaire
    entity.HasKey(t => new {t.PersonnageId, t.FilmId});
    //highlight-end
});
```

La méthode **HasKey()** permet de spécifier la clé primaire. Si la clé est représentée par plusieurs champs, il faut créer un objet dynamique **new {}** et insérer toutes les propriétés qui représentent la clé primaire.

Il peut arriver qu'une table n'utilise pas une clé artificielle pour la clé primaire. Par exemple, la table **Etudiant** peut avoir comme clé primaire le champ **DA** et non **EtudiantId**. Il faudrait spécifier **entity.HasKey(t => t.DA)**.

Re-Effectuez une migration nommée **AjouterTableDistribution**. Elle devrait fonctionner.

```powershell
Add-Migration AjouterTableDistribution
```

Dans le fichier de migration **xxx_AjouterTableDistribution.cs** du dossier **Migrations**, il y a seulement la logique de la création de la table **Distribution**. 

Appliquez les modifications à la base de données. Spécifiez la migration **AjouterTableDistribution**.

```csharp
Update-Database -StartupProject Univers.EF -Migration AjouterTableDistribution
```

Ouvrez **SSMS** et la base de données aura de nouveau les bons noms de table et la table **Distribution** est présente avec ses clés primaires.



La table **__EFMigrationsHistory** a toutes les migrations qui ont été appliquées à la base de données. La migration **RenommerTables** a été exécutée de nouveau, car la version de la BD était celle de **CreationBD**.

```
MigrationId														ProductVersion
20230315124209_CreationBD										7.0.4
20230315131307_RenommerTables									7.0.4
20230315140002_AjouterTableDistribution						7.0.4
```

### Type des champs - string, decimal et date

Actuellement, toutes les chaines de caractères sont des **NVARCHAR(MAX)**. Il est de plus en plus fréquent de ne plus spécifier la longueur des chaines de caractères qui ne sont pas fixes, car il est difficile de déterminer la bonne longueur pour plusieurs champs. La longueur est souvent spécifiée par l'expérience, mais sans considération valable. Le **NVARCHAR(MAX)** va seulement utiliser l'espace nécessaire. La gestion des contraintes se fait normalement au niveau du logiciel maintenant. Si la longueur maximale doit être modifiée, il n'est pas nécessaire de modifier la base de données, seulement la partie **validation** dans le logiciel.

Mais en tant que programmeur, il faut réaliser le **DEA** tel que produit par le concepteur. Si vous êtes le concepteur, posez-vous la question s'il est nécessaire de limiter la longueur d'un champ ou de ne pas permettre le **unicode**.

Le **modelBuilder** a la méthode **Property()** qui permet de spécifier les éléments spécifiques à un champ. La méthode **Property()** est chainable, donc il est possible d'ajouter toutes les spécifications d'un coup pour une propriété. Elle reçoit en paramètre une fonction **Lambda** pour spécifier la propriété. La variable **t** est utilisée pour **Table**. Ensuite, les autres méthodes chainables permettent de configurer la propriété/champ.

Pour spécifier la longueur maximale, c'est la méthode **HasMaxLength()** qui permet de la spécifier.

Dans le **DEA**, ce sont des **VARCHAR** et non des **NVARCHAR**. La méthode **IsUnicode(false)** permet d'indiquer que ce n'est pas un **NVARCHAR**.

Voici les exemples pour la configuration des différents cas. La classe complète sera fourni à la fin de la section.

Pour la table **Personnage**

```csharp
//Table Personnage
modelBuilder.Entity<Personnage>(entity =>
{
    //Spécifie le nom de la table dans la BD
    entity.ToTable("Personnage");

    entity.Property(t => t.Nom)
        .IsUnicode(false) //VARCHAR ou CHAR
        .HasMaxLength(100); //VARCHAR(100)  

    entity.Property(t => t.IdentiteReelle)
        .IsUnicode(false) //VARCHAR ou CHAR
        .HasMaxLength(100); //VARCHAR(100)  
});

```



Voici la classe **UniversContext.cs** au complet avec tous les ajustements pour les champs.

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

    /// <summary>
    /// Configuration spécifique de la base de données
    /// </summary>
    /// <param name="modelBuilder"></param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //Table Personnage
        modelBuilder.Entity<Personnage>(entity =>
        {
            //Spécifie le nom de la table dans la BD
            entity.ToTable("Personnage");

            entity.Property(t => t.Nom)
                .IsUnicode(false) //VARCHAR ou CHAR
                .HasMaxLength(100); //VARCHAR(100)  

            entity.Property(t => t.IdentiteReelle)
                .IsUnicode(false) //VARCHAR ou CHAR
                .HasMaxLength(100); //VARCHAR(100)  
        });


        //Table Univers
        modelBuilder.Entity<Univers>(entity =>
        {
            entity.ToTable("Univers");

            entity.Property(t => t.Nom)
                .IsUnicode(false) 
                .HasMaxLength(100);   

            entity.Property(t => t.SiteWeb)
                .IsUnicode(false) 
                .HasMaxLength(200);

            entity.Property(t => t.Proprietaire)
                .IsUnicode(false)
                .HasMaxLength(250);  
        });

        //Table Film
        modelBuilder.Entity<Film>(entity =>
        {
            entity.ToTable("Film");

            entity.Property(t => t.Titre)
                .IsUnicode(false) 
                .HasMaxLength(100);  
        });

        //Table Distribution
        modelBuilder.Entity<Distribution>(entity =>
        {
            entity.ToTable("Distribution");
            //spécifie la clé primaire
            entity.HasKey(t => new {t.PersonnageId, t.FilmId});

            entity.Property(t => t.Acteur)
                .IsUnicode(false)
                .HasMaxLength(100);
        });
    }
    public DbSet<Personnage> PersonnageTb { get; set; }

    public DbSet<Univers> UniversTb { get; set; }

    public DbSet<Film> FilmTb { get; set; }

    public DbSet<Distribution> DistributionTb { get; set; }


}
```

Créez la migration **CorrectionType**.

```powershell
Add-Migration CorrectionType -StartupProject Univers.EF
```

Vous verrez l'avertissement suivant passer.

*An operation was scaffolded that may result in the loss of data. Please review the migration for accuracy.*

Il est causé par le fait qu'il y a des données dans la table Univers et que nous changeons le type de ces données. Dans notre situation, ce n'est pas grave, mais dans un vrai système il faudrait surveiller les impacts potentiels d'un tel changement. Il est possible de modifier la migration manuellement pour corriger certains problèmes; mais nous n'irons pas jusque là [Pour en savoir plus](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/managing?tabs=dotnet-core-cli#customize-migration-code)


Appliquez les modifications à la base de données. Spécifiez la migration **CorrectionType**.

```csharp
Update-Database -StartupProject Univers.EF -Migration CorrectionType
```

Ouvrez **SSMS** et la base de données aura les nouveaux types pour les champs modifiés.

### Ajout d'une contrainte d'unicité

Pour la table **Univers**, le champ **Nom** doit être unique.

Cette contrainte est assez importante dans la base de données, car s'il y a un problème dans l'application pour faire la validation d'un doublon, l'application aurait une faille de sécurité.

Une contrainte d'unicité permet de créer un **index** de recherche sur le champ et d'indiquer la contrainte **UNIQUE**. Il faut donc créer un **index** dans le contexte et de le spécifier comme unique. Par contre, dans la base de données, il n'y aura pas de contrainte explicite **UNIQUE** sur le champ. Ce sera uniquement l'index qui s'occupera de valider l'unicité.

Remplacez la section pour **Univers** dans **UniversContext.cs**

```csharp showLineNumbers

//Table Univers
modelBuilder.Entity<Univers>(entity =>
{
    entity.ToTable("Univers");

    entity.Property(t => t.Nom)
        .IsUnicode(false) 
        .HasMaxLength(100);   

    entity.Property(t => t.SiteWeb)
        .IsUnicode(false) 
        .HasMaxLength(200);

    entity.Property(t => t.Proprietaire)
        .IsUnicode(false)
        .HasMaxLength(250);

//highlight-next-line
    entity.HasIndex(t => t.Nom).IsUnique(true);
});
```

Créez la migration **UniversNomUnique**.

```powershell
Add-Migration UniversNomUnique -StartupProject Univers.EF
```

Appliquez les modifications à la base de données. Spécifiez la migration **UniversNomUnique**.

```powershell
Update-Database -StartupProject Univers.EF -Migration UniversNomUnique
```

Ouvrez **SSMS** et la base de données aura l'index avec la mention **Unique** sur le champ **Nom**. Il n'aura pas de contrainte **UNIQUE** sur le champ, mais le résultat est le même.


Il y a plusieurs autres types de modifications possibles. Nous en verrons d'autres dans l'exemple utilisant WPF. 


