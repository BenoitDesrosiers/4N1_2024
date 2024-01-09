---
sidebar_position: 17
---

# Insertion de données

Pour ajouter des données, il faut le faire dans la méthode **OnModelCreating()**. Cette action s'appelle **Seed** pour semer des données. Nous verrons plus tard des outils plus performants afin de générer des données de tests. 

Avant de poursuivre, il faut retirer l'enregistrement de la table **Univers** qui a été fait manuellement.

```sql
DELETE FROM [Univers];
```

## Préparation du contexte

Pour éviter que le **Seed** soit toujours exécuté en mémoire, il est préférable de modifier le contexte. Ce sera l'attribut **_executerSeed** qui s'occupera de ceci.

```csharp showLineNumbers
using Microsoft.EntityFrameworkCore;

namespace Univers.EF.Data.Context;

/// <summary>
/// Contexte pour la base de de données Univers
/// </summary>
public class UniversContext : DbContext
{
//highlight-next-line
    private bool _executerSeed = false;

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
            //string? chaineConnexion = Environment.GetEnvironmentVariable("MIGRATION_CONNECTION_STRING");
            string? chaineConnexion = "Server=localhost\\SQLExpress;Database=eDA_4N1_Univers;Trusted_Connection=True;Trust Server Certificate=True;";
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

            entity.HasIndex(t => t.Nom).IsUnique(true);
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

        if (_executerSeed == true)
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
    public DbSet<Personnage> PersonnageTb { get; set; }

    public DbSet<Univers> UniversTb { get; set; }

    public DbSet<Film> FilmTb { get; set; }

    public DbSet<Distribution> DistributionTb { get; set; }


}
```

À la ligne 44, l'activation du **Seed** se fait uniquement si le contexte est initialisé en mode **Migration** dans la méthode **OnConfiguring()**.

À la ligne 119, il y a une vérification avant d'exécuter le **Seed **dans la méthode **OnModelCreating()**.

À la ligne 129, les données seront créées dans cette méthode.

## Création des données

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
    Univers[] univers =
    {
    new Univers()
    {
        UniversId = 1,
        Nom = "Marvel",
        AnneeCreation = 1939,
        SiteWeb = "https://www.marvel.com",
        Proprietaire = "Disney"
    },
    new Univers()
    {
        UniversId = 2,
        Nom = "DC Comics",
        AnneeCreation = 1934,
        SiteWeb = "https://www.dc.com",
        Proprietaire = "Warner Bros"
    },
};

    Personnage[] personnages =
    {
    new Personnage()
    {
        PersonnageId = 1,
        Nom = "Spiderman",
        IdentiteReelle = "Peter Parker",
        DateNaissance = new DateOnly(1980, 12,01),
        EstVilain = false,
        UniversId = 1
    },
    new Personnage()
    {
        PersonnageId = 2,
        Nom = "Iron Man",
        IdentiteReelle = "Tony Stark",
        DateNaissance = new DateOnly(1970,11,12),
        EstVilain = false,
        UniversId = 1
    },
    new Personnage()
    {
        PersonnageId = 3,
        Nom = "Batman",
        IdentiteReelle = "Bruce Wayne",
        DateNaissance = new DateOnly(1966,03,04),
        EstVilain = false,
        UniversId = 2
    },
};

    //Ajout dans les tables
    modelBuilder.Entity<Univers>().HasData(univers);
    modelBuilder.Entity<Personnage>().HasData(personnages);
}
```

Créez la migration **Seed_UniversEtPersonnage**.

```powershell
Add-Migration Seed_UniversEtPersonnage -StartupProject Univers.EF
```

Appliquez les modifications à la base de données. Spécifiez la migration **Seed_UniversEtPersonnage**.

```powershell
Update-Database -StartupProject Univers.EF -Migration Seed_UniversEtPersonnage
```

:::note
Pour votre **TP 3**, vous devez créer un jeu de données initial pour chacune des tables. Il devra être créé par un **Seed**.
:::

Ouvrez **SSMS** et la base de données aura des données dans les tables **Personnage** et **Univers**.

## Exercice

Ajoutez la migration pour les films. 

Vous pouvez vous baser sur les données de l'exercices de création de la BD univers du début de la session

Ajoutez seulement les 3 premiers.


<details>
  <summary>Solution</summary>
```csharp
Film[] films =
{
    new Film()
    {
        FilmId = 1,
        Titre = "Black Widow",
        DateSortie = new DateOnly(2021, 07, 09),
        Etoile = 3,
        Duree = 121
    },
    new Film()
    {
        FilmId = 2,
        Titre = "The Avengers",
        DateSortie = new DateOnly(2012, 05, 04),
        Etoile = 5,
        Duree = 98
    },
    new Film()
    {
        FilmId = 3,
        Titre = "Spiderman",
        DateSortie = new DateOnly(2003, 05, 03),
        Etoile = 5,
        Duree = 110
    }
};


modelBuilder.Entity<Film>().HasData(films);
```

Suivit de l'ajout de la migration et son exécution 

```powershell
Add-Migration Seed_Film -StartupProject Univers.EF

Update-Database -StartupProject Univers.EF -Migration Seed_Film
```
</details>


Nous sommes maintenant prêt pour faire des requêtes. 

