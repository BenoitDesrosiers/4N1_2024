---
sidebar_position: 228
draft: false
---


# Seed Categorie, Ensemble, Carte

Les tables **Categorie**, **Ensemble** et **Cartes** ne contiennent pas de données. Il faut donc créer une nouvelle migration qui contient ce nouveau **Seed**.

## SuperCarte.EF

Dans la méthode **Seed()** de la classe **SuperCarteContext**, il faut ajouter les données. Il est important de ne pas supprimer les données existantes, car la migration va croire qu'ils ne sont plus là, et donc qu'il faudrait les supprimer. 

Pour ajouter des données, il faut créer un tableau qui contient les objets et l'ajouter à l'entité avec la méthode **HasData**.

:::note
Les autres tables sont aussi remplies à cause des dépendances des clés étrangères.
:::

Voici la méthode au complet.

```csharp
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

//highlight-start
    Categorie[] categories =
    {
        new Categorie()
        {
            CategorieId = 1,
            Nom = "Animaux magiques",
            Description = null
        },
        new Categorie()
        {
            CategorieId = 2,
            Nom = "Orcs",
            Description = "Les orcs sont une race de guerrier."
        },
        new Categorie()
        {
            CategorieId = 3,
            Nom = "Mages",
            Description = "Les mages ont des pouvoirs magiques."
        }
    };

    Ensemble[] ensembles =
    {
        new Ensemble()
        {
            EnsembleId = 1,
            Nom = "Ensemble de départ",
            Disponibilite = new DateTime(2020,5,12)
        }
    };

    Carte[] cartes =
    {
        new Carte()
        {
            CarteId = 1,
            Nom = "Lion des marais",
            Armure = 0,
            Vie = 12,
            Attaque = 2,
            EstRare = false,
            PrixRevente = 0.02m,
            CategorieId = 1,
            EnsembleId = 1
        },
        new Carte()
        {
            CarteId = 2,
            Nom = "Corbeau vampire",
            Armure = 0,
            Vie = 2,
            Attaque = 12,
            EstRare = true,
            PrixRevente = 1.20m,
            CategorieId = 1,
            EnsembleId = 1
        },
        new Carte()
        {
            CarteId = 3,
            Nom = "Grunty",
            Armure = 5,
            Vie = 25,
            Attaque = 5,
            EstRare = false,
            PrixRevente = 0.20m,
            CategorieId = 2,
            EnsembleId = 1
        }
    };
//highlight-end

    //Ajout dans les tables
    modelBuilder.Entity<Role>().HasData(roles);
    modelBuilder.Entity<Utilisateur>().HasData(utilisateurs);
	//highlight-start
    modelBuilder.Entity<Categorie>().HasData(categories);
    modelBuilder.Entity<Ensemble>().HasData(ensembles);
    modelBuilder.Entity<Carte>().HasData(cartes);
	//highlight-end
}
```

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. Il est important que le **Projet par défaut** de **Entity Framework** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.EF**. À ce stade, il y a **plusieurs projets** et celui sélectionné par défaut sera **WPF**. Il est important de le modifier dans la liste.

Pour ce projet, utilisez cette chaine de connexion. Le nom de la base de données est **eDA_4N1_SuperCarte**. Modifiez le **DA** par votre numéro d'admission.

```powershell
$env:MIGRATION_CONNECTION_STRING = "Server=localhost\SQLExpress;Database=eDA_4N1_SuperCarte;Trusted_Connection=True;"
```

Voici la commande avec le **Trusted_Connection=True;** , si vous avez l'erreur **SSL**.

```powershell
$env:MIGRATION_CONNECTION_STRING = "Server=localhost\SQLExpress;Database=eDA_4N1_SuperCarte;Trusted_Connection=True;Trust Server Certificate=True;"
```

Ensuite, il faut créer la migration **Seed_Carte** avec **Add-Migration**.

```
Add-Migration Seed_Carte -StartupProject SuperCarte.EF
```

Appliquez les modifications à la base de données. Spécifiez la migration **Seed_Carte**.

```powershell
Update-Database -StartupProject SuperCarte.EF -Migration Seed_Carte
```