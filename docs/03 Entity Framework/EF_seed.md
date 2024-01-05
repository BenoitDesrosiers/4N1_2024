---
sidebar_position: 17
---

# Insertion de données

Pour ajouter des données, il faut le faire dans la méthode **OnModelCreating()**. Cette action s'appelle **Seed** pour semer des données.

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
            MotPasseHash = "$2y$11$IY6NG9FkTSI1dnjLfSbuOuNkuyI7IZHxHSOD5Td6AlwvroUz/vzLK", //Native3! avec Bcrypt
            RoleId = 1 //Admin
        },
        new Utilisateur()
        {
            UtilisateurId = 2,
            Prenom = "Benoit",
            Nom = "Tremblay",
            NomUtilisateur = "btremblay",
            MotPasseHash = "$2y$11$ewK3YsMGQ1IMKEzJUAjyVe0P19I0gEbTO998mwfVbSSA8nZ6MG/ha", //Web4MVC! avec Bcrypt
            RoleId = 2 //Utilisateur
        },
        new Utilisateur() 
        {
            UtilisateurId = 3,
            Prenom = "Tony",
            Nom = "Stark",
            NomUtilisateur = "tstark",
            MotPasseHash = "$2y$11$VfcNowkWResPQKl0AA3MJ.w1LXBqmMM77YKlyf32Glr9TWG4xxyD2", //#NotAdmin! avec Bcrypt
            RoleId = 2 //Utilisateur
        }
    };

    //Ajout dans les tables
    modelBuilder.Entity<Role>().HasData(roles);
    modelBuilder.Entity<Utilisateur>().HasData(utilisateurs);
}
```

Créez la migration **Seed_RoleEtUtilisateur**.

```powershell
Add-Migration Seed_RoleEtUtilisateur -StartupProject SuperCarte.EF
```

Appliquez les modifications à la base de données. Spécifiez la migration **Seed_RoleEtUtilisateur**.

```powershell
Update-Database -StartupProject SuperCarte.EF -Migration Seed_RoleEtUtilisateur
```

:::note
Pour votre **TP 3**, vous devez créer un jeu de données initial pour chacune des tables. Il devra être créé par un **Seed**.
:::

Ouvrez **SSMS** et la base de données aura des données dans les tables **Utilisateur** et **Role**.

