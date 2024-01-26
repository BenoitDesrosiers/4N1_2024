---
sidebar_position: 20
---

# CRUD

Dans cette leçon nous verrons comment utiliser LINQ afin de réaliser des opérations de CRUD. 

## Préparation du projet de CRUD

### Création du projet dans une solution existante

Il faut ajouter le projet **LinqCRUD** dans la solution.

Pour ce faire, sélectionnez la solution **Univers** en haut de l'**Explorateur de solution** et choisissez **Ajouter -> Nouveau projet...** dans le menu contextuel.

Créez un projet de type **Application Console**. Il est important **de ne pas choisir** la version **.NET Framework**.

- **Nom du projet** : LinqCRUD
- **Infrastructure** : .NET la dernière

Ensuite, sélectionnez le projet **LinqCRUD** dans l'**Explorateur de solution** et choisissez **Définir en tant que projet de démarrage** dans le menu contextuel.

### Ajout des dépendances de projet

Le projet **LinqCRUD** aura besoin du projet **Univers.EF** pour initialiser le contexte.

Il faut l'ajouter dans les dépendances du projet.

Sélectionnez le dossier **Dépendances** du projet **LinqCRUD** et choisissez **Ajouter une référence de projet** dans le menu contextuel.

Dans la fenêtre, il faut cocher **Univers.EF**. Vous venez d'intégrer cette librairie interne au projet.

### Fichier Usings.cs

Afin de réduire la taille des classes, les **using** qui seront beaucoup utilisés dans ce projet seront déclaré globalement.

Créez le fichier **Usings.cs** à la racine du projet **LinqCRUD**.

```csharp

global using Univers.EF.Data; //Les classes du modèle du contexte
global using Univers.EF.Data.Context; // La classe du contexte
global using System;
global using System.Collections.Generic;
global using System.Threading.Tasks;
```

Au fur et à mesure que des classes s'ajouteront dans le projet, le fichier **Usings.cs** sera mis à jour.

Également, le fichier **Usings.cs** appartient uniquement au projet dans lequel il est créé.

# CRUD EF en LINQ 

## Lecture des données

Inscrivez directement les blocs de code dans le fichier **Program.cs** pour tester.

Pour avoir une connexion à la base de données, il faut créer une instance du **contexte**.

```csharp
UniversContext db = new UniversContext();
Univers univers = db.Univers.FirstOrDefault(); //Retourne le premier univers de la base de données
Console.WriteLine($"Id : {univers.UniversId}");
Console.WriteLine($"Nom : {univers.Nom}");
db.Dispose();
```

Oups ... petit problème!!! Univers est le nom du Namespace ET le nom d'une classe. Le compilateur ne sais pas de quoi on parle. 

Il y a 2 solutions: 

1) toujours indiquer que la classe Univers est dans le contexte Univers avec la syntaxe **Univers.EF.Data.Univers**. Ca vient un peu long.
2) renommer la classe Univers en Franchise. 

Nous allons utiliser la solution 2 avec ce qu'elle a comme complications. Mais ca sera fait une fois pour toute. 

### Refactor de Univers

Ouvrez **Univers.cs** et renommez la classe **Univers** en **Franchise**. 

:::warning Attention
c'est la classe qu'il faut renommer. 
:::
:::warning Attention #2
Utilisez l'option **rename** de visual studio. Ne changez pas directement le nom de la classe. Visual Studio va s'occuper de changer toutes les références à cette classe dans le reste du code. 
:::

Renommez aussi **UniversId** pour **FranchiseId**

Quiz: qu'est-ce qui doit suivre le changement d'un nom de classe utilisé dans un contexte ?

<details>
<summary>Réponse</summary>
1) le DBset: le type utilisé et le nom par défaut de la table (se terminant par Tb)
2) la classe Personnage contient une référence vers UniversId
3) le nom de la table dans le OnModelCreating (entity.ToTable())
4) le seeder
</details>

Commencez par le DbSet dans UniversContext : le type **Univers** a été changé pour **Franchise**, mais **UniversTb** ne l'a pas été. Changez le pour **FranchiseTb**

Changez la référence dans Personnage: **UniversId** pour **FranchiseID**, **Univers** pour **Franchise** (le type et la variable) . 

Continuez dans le OnModelCreating: changez le commentaire, et le nom de la table. 

Et terminez par le seeder: remplacez tous les **UniversId** par **FranchiseId**

Il faut maintenant faire la migration.
```powershell
Add-Migration RenommerClasseUnivers -StartupProject Univers.EF
```

et l'appliquer à la BD

```powershell
Update-Database -StartupProject "Univers.EF" -Migration RenommerClasseUnivers
```

Vérifiez que la migration c'est bien faite. 

Comme vous pouvez le voir, il arrive qu'on ait des erreurs de design qui n'apparaissent que beaucoup plus tard. Les migrations peuvent nous sortir de ce genre de problème dans certains cas, mais il est toujours mieux de bien réfléchir au système avant de trop coder. 


Revenons à notre premier test de requête sur la bd utilisant Linq. Notre code devrait fonctionner maintenant en changeant la classe Univers par Franchise:

```csharp
UniversContext db = new UniversContext();
Franchise franchise = db.FranchiseTb.FirstOrDefault(); //Retourne la premiere franchise de la base de données
Console.WriteLine($"Id : {franchise.FranchiseId}");
Console.WriteLine($"Nom : {franchise.Nom}");
db.Dispose();
```

Essayez ce code. 


La méthode **Dispose** ferme la connexion.

### using

Il est préférable d'utiliser un bloc de code **using**. La méthode **Dispose** est appelée automatiquement lorsque le bloc de code est terminé.

```csharp
using (UniversContext db = new UniversContext())
{
	Franchise franchise = db.FranchiseTb.FirstOrDefault();
    Console.WriteLine($"Id : {franchise.FranchiseId}");
	Console.WriteLine($"Nom : {franchise.Nom}");
}
```

 Pour faire une requête à la base de données, on peut utiliser **LINQ** en syntaxe **Query** ou **Lambda**.

```csharp
using (UniversContext db = new UniversContext())
{
    //Syntaxe Query
    List<Franchise> lstFranchiseQuery = (from lqFranchise in db.FranchiseTb
                                     orderby
                                         lqFranchise.AnneeCreation descending
                                     select
                                         lqFranchise).ToList();

    foreach (Franchise franchise in lstFranchiseQuery)
    {
        Console.WriteLine($"Id : {franchise.FranchiseId}");
        Console.WriteLine($"Nom : {franchise.Nom}");
    }

    //Syntaxe Lambda
    List<Franchise> lstFranchiseLambda = db.FranchiseTb.OrderByDescending(u => u.AnneeCreation).ToList();

    foreach (Franchise franchise in lstFranchiseLambda)
    {
        Console.WriteLine($"Id : {franchise.FranchiseId}");
        Console.WriteLine($"Nom : {franchise.Nom}");
    }
}
```

Il est possible d'utiliser le **using** sans créer un sous bloc de code. Si le **contexte** doit exister tout le long de la durée de vie de la méthode, il est possible de déclarer comme ci-dessous.

```csharp
MaMethode();

void MaMethode()
{
    //Déclaration du contexte par un using
    using UniversContext db = new UniversContext();

    List<Franchise> lstFranchiseQuery = (from lqFranchise in db.FranchiseTb
                                     orderby
                                         lqFranchise.AnneeCreation descending
                                     select
                                         lqFranchise).ToList();

    foreach (Franchise franchise in lstFranchiseQuery)
    {
        Console.WriteLine($"Id : {franchise.FranchiseId}");
        Console.WriteLine($"Nom : {franchise.Nom}");
    }
} //Fin du contexte
```

## Voir le SQL généré

Il peut être intéressant de voir le SQL généré.

Le contexte doit être créé avec ces options. Le SQL sera généré dans le fichier **C:\eflog\{tick}.txt**. Il faut que le dossier **c:\eflog** existe.


```csharp
var optBuilder = new DbContextOptionsBuilder<UniversContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging(); //Permet de voir les valeurs

using (UniversContext db = new UniversContext(optBuilder.Options))
{
	//Les requêtes
}
```

Il y aura un fichier de créer par requête effectuée à la base de données.


### Exemple 1

Code **SQL**

```sql
SELECT * 
FROM Film
WHERE Etoile >= 2;
```

Code **LINQ**

```csharp
var optBuilder = new DbContextOptionsBuilder<UniversContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (UniversContext db = new UniversContext(optBuilder.Options))
{
    List<Film> lstFilmQuery = (from lqFilm in db.FilmTb
                               where
                                    lqFilm.Etoile >= 8
                               select
                                    lqFilm).ToList();

    List<Film> lstFilmLambda = db.FilmTb.Where(f => f.Etoile >= 8).ToList();
    
    foreach(Film film in lstFilmLambda)
    {
        Console.WriteLine($"Id : {film.FilmId}");
        Console.WriteLine($"Titre : {film.Titre}");
    }
}
```

Code **SQL généré**

```sql
SELECT [f].[FilmId], [f].[Budget], [f].[DateSortie], [f].[Duree], [f].[Etoile], [f].[Titre]
FROM [Film] AS [f]
WHERE [f].[Etoile] >= CAST(2 AS tinyint)
```
:::info
Il y a 2 logs de générées car il y a 2 requêtes identiques de faites: une en query, l'autre en lambda
:::

### Exemple 2

Code **SQL**

```sql
SELECT * 
FROM Film
WHERE Year(DateSortie) = 2021;
```

Code **LINQ**

```csharp
var optBuilder = new DbContextOptionsBuilder<UniversContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (UniversContext db = new UniversContext(optBuilder.Options))
{
    List<Film> lstFilmQuery = (from lqFilm in db.FilmTb
                               where
                                    lqFilm.DateSortie.Year == 2021
                               select
                                    lqFilm).ToList();

    List<Film> lstFilmLambda = db.FilmTb.Where(f => f.DateSortie.Year == 2021).ToList();

    foreach(Film film in lstFilmLambda)
    {
        Console.WriteLine($"Id : {film.FilmId}");
        Console.WriteLine($"Titre : {film.Titre}");
    }
}
```

Code **SQL généré**

```sql
SELECT [f].[FilmId], [f].[Budget], [f].[DateSortie], [f].[Duree], [f].[Etoile], [f].[Titre]
FROM [Film] AS [f]
WHERE DATEPART(year, [f].[DateSortie]) = 2021
```

### Exemple 3

Code **SQL**

```sql
SELECT * 
FROM Film
ORDER BY Year(DateSortie) ASC, Titre DESC;
```

Code **LINQ**

```csharp
var optBuilder = new DbContextOptionsBuilder<UniversContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (UniversContext db = new UniversContext(optBuilder.Options))
{
    List<Film> lstFilmQuery = (from lqFilm in db.FilmTb
                               orderby 
                                lqFilm.DateSortie.Year descending, 
                                lqFilm.Titre
                               select
                                    lqFilm).ToList();

    List<Film> lstFilmLambda = db.FilmTb
        .OrderByDescending(f => f.DateSortie.Year)
        .ThenBy(f => f.Titre).ToList();

    foreach(Film film in lstFilmLambda)
    {
        Console.WriteLine($"Id : {film.FilmId}");
        Console.WriteLine($"Titre : {film.Titre}");
    }
}
```

Code **SQL généré**

```sql
SELECT [f].[FilmId], [f].[Budget], [f].[DateSortie], [f].[Duree], [f].[Etoile], [f].[Titre]
FROM [Film] AS [f]
ORDER BY DATEPART(year, [f].[DateSortie]) DESC, [f].[Titre]
```

## Ajouter des données

Pour ajouter un nouvel enregistrement dans la base de données, il faut créer un nouvel objet.

```csharp showLineNumbers
var optBuilder = new DbContextOptionsBuilder<UniversContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (UniversContext db = new UniversContext(optBuilder.Options))
{
    //Obtenir la franchise à modifier
    Franchise franchise = new Franchise()
    {
        Nom = "Teenage mutant ninja turtles",
        AnneeCreation = 1984,
        Proprietaire = "Paramount",
        SiteWeb = "https://www.teenagemutantninjaturtles.com/"
    };

    //L'ajouter dans la base de données
    //Le contexte est en mesure de déterminer la table par le type de l'objet
    db.Add(franchise);

    //Affiche la clé, elle sera à 0
    //highlight-next-line
    Console.WriteLine($"Id : {franchise.FranchiseId}");

    db.SaveChanges();

    //Affiche la clé, elle aura une valeur
    //highlight-next-line
    Console.WriteLine($"Id : {franchise.FranchiseId}");
}
```

Remarquez que la clé n'est pas spécifiée lors de la création de l'objet. À la ligne 22, la valeur de la clé est 0, car le contexte ne s'est pas mis à jour avec la base de données.

Une fois que la méthode **SaveChanges()** a été appelée, la valeur de la propriété **FranchiseId** a été mise à jour avec celle qui a été autogénérée par la base de données.


### Exercice

Vous devez compléter la BD Univers afin de correspondre à ces données. 

Il y a déjà de l'information dans la bd. Comment allez-vous faire pour connaitre les ids des films, personnages et franchises déjà présente dans la bd ?

<details>
  <summary>Solution</summary>

Vous savez comment aller lire de l'information. Créez des variables pour contenir l'info qui est déjà dans la bd. 

</details>


Et tant qu'à se pratiquer, utilisez une **List\<Distribution\>** afin de créer les distributions. 

**Table Franchise**

| FranchiseId | Nom       | AnneCreation | SiteWeb                | Proprietaire |
|-----------|-----------|--------------|------------------------|--------------|
| 1         | Marvel    | 1939         | https://www.marvel.com | Disney       |
| 2         | DC Comics | 1934         | https://www.dc.com     | Warner Bros  |
|           |           |              |                        |              |


**Table Personnage**
| PersonnageId 	| Nom         	| IdentiteReelle    	| DateNaissance 	| EstVilain 	| Franchise |
|--------------	|-------------	|-------------------	|---------------	|-----------	|---------	|
| 1            	| Spiderman   	| Peter Parker      	| null          	| 0         	| Marvel  	|
| 2            	| Iron Man    	| Tony Stark        	| 1970-11-12    	| 0         	| Marvel  	|
| 3            	| Batman      	| Bruce Wayne       	| 1966-03-04    	| 0         	| DC      	|
| 4            	| Joker       	| null              	| 1966-01-01      	| 1         	| DC      	|
| 5            	| Thor        	| Thor              	| 0001-01-01       	| 0         	| Marvel  	|
| 6            	| Black Widow 	| Nathasha Romanoff 	| 1985-08-31    	| 0         	| Marvel  	|

**Table Film**
| FilmId 	| Titre              	| DateSortie 	| Etoile 	| Duree 	|
|--------	|--------------------	|------------	|--------	|-------	|
| 1      	| Black Widow        	| 2021-07-09 	| 3      	| 121   	|
| 2      	| The Avengers       	| 2012-05-04 	| 5      	| 98    	|
| 3      	| Spiderman          	| 2003-05-03 	| 5      	| 110   	|
| 4      	| The Dark Knight    	| 2008-07-18 	| 5      	| 142   	|
| 5      	| Avengers : Endgame 	| 2019-04-26 	| 4      	| 132   	|
| 6      	| Iron Man           	| 2008-05-02 	| 4      	| 96    	|
| 7      	| Joker              	| 2019-10-04 	| 4      	| 99    	|


**Table Distribution**
| Personnage  	| Film               	| Acteur             	|
|-------------	|--------------------	|--------------------	|
| Spiderman   	| Spiderman          	| Tobey Maguire      	|
| Spiderman   	| Avengers : Endgame 	| Tom Holland        	|
| Iron Man    	| Iron Man           	| Robert Downey Jr   	|
| Iron Man    	| The Avengers       	| Robert Downey Jr   	|
| Iron Man    	| Avengers : Endgame 	| Robert Downey Jr   	|
| Batman      	| The Dark Knight    	| Christian Bale     	|
| Joker       	| The Dark Knight    	| Heath Ledger       	|
| Joker       	| Joker              	| Joaquin Phoenix    	|
| Thor        	| The Avengers       	| Chris Hemsworth    	|
| Thor        	| Avengers : Endgame 	| Chris Hemsworth    	|
| Black Widow 	| The Avengers       	| Scarlett Johansson 	|
| Black Widow 	| Avengers : Endgame 	| Scarlett Johansson 	|
| Black Widow 	| Black Widow        	| Scarlett Johansson 	|

<details>
  <summary>Solution</summary>
```csharp
global using Univers.EF.Data; //Les classes du modèle du contexte
global using Univers.EF.Data.Context; // La classe du contexte
global using System;
global using System.Collections.Generic;
global using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using (UniversContext db = new UniversContext())
{
    Franchise marvel = db.FranchiseTb.Where(f => f.Nom == "Marvel").First();
    Franchise dc = db.FranchiseTb.Where(f => f.Nom == "DC Comics").First();

    Personnage joker = new Personnage()
    {
        Nom = "Joker",
        IdentiteReelle = null,
        DateNaissance = new DateOnly(1966, 01, 01),
        EstVilain = true,
        FranchiseId = dc.FranchiseId,

    };

    Personnage thor = new Personnage()
    {
        Nom = "Thor",
        IdentiteReelle = "Thor",
        DateNaissance = new DateOnly(01, 01, 01),
        EstVilain = false,
        FranchiseId = marvel.FranchiseId,

    };
    Personnage blackwidow = new Personnage()
    {
        Nom = "Black Widow",
        IdentiteReelle = "Nathasha Romanoff",
        DateNaissance = new DateOnly(1985, 08, 31),
        EstVilain = false,
        FranchiseId = marvel.FranchiseId,

    };

    db.Add(joker);
    db.Add(thor);
    db.Add(blackwidow);

    //il est important de faire la sauvegarde afin d'avoir des id pour les 3
    // personnages ajoutés. 
    db.SaveChanges();

    Film darkknight = new Film()
    {
        Titre = "The Dark Knight",
        DateSortie = new DateOnly(2008, 07, 18),
        Etoile = 5, 
        Duree = 142,
    };
    Film endgame = new Film()
    {
        Titre = "Avengers : Endgame",
        DateSortie = new DateOnly(2019, 04, 26),
        Etoile = 4,
        Duree = 132,
    };
    Film ironman = new Film()
    {
        Titre = "Iron Man",
        DateSortie = new DateOnly(2008, 05, 02),
        Etoile = 4,
        Duree = 96,
    };

    Film jokerf = new Film()
    {
        Titre = "Joker",
        DateSortie = new DateOnly(2019, 10, 04),
        Etoile = 4,
        Duree = 99,
    };

    db.Add(darkknight);
    db.Add(endgame);
    db.Add(ironman); 
    db.Add(jokerf);

    db.SaveChanges();
    
    //Pour compléter l'inventaire des personnages et films qui sont déjà dans la bd
    Personnage spidey = db.PersonnageTb.Where(p => p.Nom == "Spiderman").First();
    Personnage ironmanP = db.PersonnageTb.Where(p => p.Nom == "Iron Man").First();
    Personnage batman = db.PersonnageTb.Where(p => p.Nom == "Batman").First();

    Film spidermanF = db.FilmTb.Where(f => f.Titre == "Spiderman").First();
    Film ironmanF  = db.FilmTb.Where(f => f.Titre == "Iron Man").First();
    Film batmanF = db.FilmTb.Where(f => f.Titre == "The Dark Knight").First();
    Film avenger = db.FilmTb.Where(f => f.Titre == "The Avengers").First();
    Film blackwidowF = db.FilmTb.Where(f => f.Titre == "Black Widow").First();

    List<Distribution> distributions = new List<Distribution>()
    {
        new Distribution(){PersonnageId=spidey.PersonnageId,
                            FilmId = spidermanF.FilmId, 
                            Acteur = "Tobey Maguire"},
        new Distribution(){PersonnageId=spidey.PersonnageId,
                            FilmId = endgame.FilmId,
                            Acteur = "Tom Holland"},
        new Distribution(){PersonnageId=ironmanP.PersonnageId,
                            FilmId = ironmanF.FilmId,
                            Acteur = "Robert Downey Jr"},
        new Distribution(){PersonnageId=ironmanP.PersonnageId,
                            FilmId = endgame.FilmId,
                            Acteur = "Robert Downey Jr"},
        new Distribution(){PersonnageId=batman.PersonnageId,
                            FilmId = darkknight.FilmId,
                            Acteur = "Christian Bale"},
        new Distribution(){PersonnageId=joker.PersonnageId,
                            FilmId = darkknight.FilmId,
                            Acteur = "Heath Ledger"},
        new Distribution(){PersonnageId=joker.PersonnageId,
                            FilmId = jokerf.FilmId,
                            Acteur = "Joaquin Phoenix"},
        new Distribution(){PersonnageId=thor.PersonnageId,
                            FilmId = endgame.FilmId,
                            Acteur = "Chris Hemsworth"},
        new Distribution(){PersonnageId=thor.PersonnageId,
                            FilmId = avenger.FilmId,
                            Acteur = "Chris Hemsworth"},
        new Distribution(){PersonnageId=blackwidow.PersonnageId,
                            FilmId = endgame.FilmId,
                            Acteur = "Scarlett Johansson"},
        new Distribution(){PersonnageId=blackwidow.PersonnageId,
                            FilmId = avenger.FilmId,
                            Acteur = "Scarlett Johansson"},
        new Distribution(){PersonnageId=blackwidow.PersonnageId,
                            FilmId = blackwidowF.FilmId,
                            Acteur = "Scarlett Johansson"},
    };

    foreach (Distribution d  in distributions)
    {
        db.Add(d);
    }
    db.SaveChanges();
}
```
</details>





## Modifier des données

Pour être en mesure de modifier un enregistrement, il faut avoir une instance d'un objet de l'enregistrement.

Il n'y a pas d'action directe comme **SQL** pour le faire en une seule commande.

```sql title="NE PAS EXÉCUTER"
UPDATE Franchise SET Nom = 'DC Comics modifié' WHERE FranchiseId = 2; --En supposant que DC = 2
```

Pour faire la même chose avec **Entity Framework**, il faut faire un **SELECT** pour obtenir l'enregistrement et ensuite modifier les valeurs.

```csharp
var optBuilder = new DbContextOptionsBuilder<UniversContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (UniversContext db = new UniversContext(optBuilder.Options))
{
    //Obetnir la franchise à modifier
    Franchise franchise = (from lqFranchise in db.FranchiseTb
                        where
                             lqFranchise.FranchiseId == 2
                        select
                             lqFranchise).First();

    //Appliquer la modification
    franchise.Nom = "DC Comics modifié";    

    //Obtenir la liste de tous les franchises
    List<Franchise> lstFranchise = db.FranchiseTb.ToList();

    //Afficher toutes les franchises
    foreach(Franchise f in lstFranchise)
    {
        Console.WriteLine($"Id : {f.FranchiseId}");
        Console.WriteLine($"Nom : {f.Nom}");
    }
}
```

Exécutez le code et allez voir dans la base de données. Est-ce que l'enregistrement s'y retrouve ? Non il n'est pas dans la base de données. 

Pourtant, le **foreach** sur tous les enregistrements de la table l'a affiché. 

Regardez le code **SQL** généré. Il aura seulement les 2 **SELECT**.

L'enregistrement n'est pas dans la base de données, car l'ajout a été fait en mémoire uniquement dans le **contexte**. 

Il est important d'appeler la méthode **SaveChanges()** pour indiquer au contexte qu'il faut appliquer les modifications à la base de données.

Exécutez ce code. La modification sera appliquée.

```csharp
var optBuilder = new DbContextOptionsBuilder<UniversContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (UniversContext db = new UniversContext(optBuilder.Options))
{
    //Obtenir la franchise à modifier
    Franchise franchise = (from lqFranchise in db.FranchiseTb
                        where
                             lqFranchise.FranchiseId == 2
                        select
                             lqFranchise).First();

    //Appliquer la modification
    franchise.Nom = "DC Comics modifié";

    db.SaveChanges();    
}
```

Dans le code généré, il y aura un **UPDATE**.

```sql title="NE PAS EXÉCUTER"
info: 2023-02-22 13:57:52.904 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command) 
      Executed DbCommand (86ms) [Parameters=[@p1='2', @p0='DC Comics' (Nullable = false) (Size = 100) (DbType = AnsiString)], CommandType='Text', CommandTimeout='30']
      SET IMPLICIT_TRANSACTIONS OFF;
      SET NOCOUNT ON;
      UPDATE [Franchise] SET [Nom] = @p0
      OUTPUT 1
      WHERE [FranchiseId] = @p1;
```

## Mise à jour massive

Contrairement au langage **SQL**, il n'est pas possible de faire une mise à jour sur plusieurs enregistrements en fonction de sa condition.

Voici par exemple, il faut masquer l'identité réelle de tous les personnages de la franchise Marvel. 

```sql title="NE PAS EXÉCUTER"
UPDATE Personnage SET IdentiteReelle = 'Confidentielle' WHERE FranchiseId = 1; --En supposant que Marvel = 1;
```

Si la table a 1 million de personnages de Marvel, cette simple requête est en mesure de mettre à jour tous les enregistrements.

Avec **Entity Framework**, il faut faire en plusieurs étapes.

- Récupérer tous les enregistrements
- Parcourir les enregistrements
- Assigner la nouvelle valeur à chaque enregistrement

```csharp
var optBuilder = new DbContextOptionsBuilder<UniversContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (UniversContext db = new UniversContext(optBuilder.Options))
{
    //Obtenir les personnages à mettre à jour
    List<Personnage> lstPersonnage =
        (from lqPersonnage in db.PersonnageTb
         where
            lqPersonnage.FranchiseId == 1
         select lqPersonnage).ToList();

    
    foreach(Personnage personnage in lstPersonnage)
    {
        personnage.IdentiteReelle = "Confidentielle";
    }

    db.SaveChanges();    
}
```

Remarquez que le **SaveChanges()** se fait uniquement à la fin. Il est possible de faire plusieurs modifications et d'enregistrer les modifications à la fin.

Est-ce qu'il aura un seul ou plusieurs **UPDATE** ? Voici le **SQL généré**.

```sql
info: 2023-02-22 13:59:54.801 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command) 
      Executed DbCommand (39ms) [Parameters=[@p1='1', @p0='Confidentielle' (Size = 100) (DbType = AnsiString), @p3='2', @p2='Confidentielle' (Size = 100) (DbType = AnsiString), @p5='5', @p4='Confidentielle' (Size = 100) (DbType = AnsiString), @p7='6', @p6='Confidentielle' (Size = 100) (DbType = AnsiString)], CommandType='Text', CommandTimeout='30']
      SET NOCOUNT ON;
      UPDATE [Personnage] SET [IdentiteReelle] = @p0
      OUTPUT 1
      WHERE [PersonnageId] = @p1;
      UPDATE [Personnage] SET [IdentiteReelle] = @p2
      OUTPUT 1
      WHERE [PersonnageId] = @p3;
      UPDATE [Personnage] SET [IdentiteReelle] = @p4
      OUTPUT 1
      WHERE [PersonnageId] = @p5;
      UPDATE [Personnage] SET [IdentiteReelle] = @p6
      OUTPUT 1
      WHERE [PersonnageId] = @p7;
```

Il y en a plusieurs. Pour des mises à jour massives, **SQL** a toujours son utilité.



## Supprimer des données

Pour supprimer un enregistrement, il faut faire une technique similaire à la mise à jour.

Pour supprimer la franchise **Teenage mutant ninja turtles**, il faut faire cette requête.

```sql title="NE PAS EXÉCUTER"
DELETE FROM Franchise WHERE Nom = 'Teenage mutant ninja turtles';
```

Avec **Entity Framework**, il faut faire en plusieurs étapes.

- Récupérer l'enregistrement
- Le retirer du **DBSet**.

```csharp
var optBuilder = new DbContextOptionsBuilder<UniversContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (UniversContext db = new UniversContext(optBuilder.Options))
{
    Franchise franchise = db.FranchiseTb.Where(u => u.Nom == "Teenage mutant ninja turtles").First();

    //Le contexte est en mesure de déterminer la table par le type de l'objet
    db.Remove(franchise);

    db.SaveChanges();
}
```

## Suppression massive

Contrairement au langage **SQL**, il n'est pas possible de supprimer plusieurs enregistrements en fonction de sa condition.

Pour supprimer toutes les références de **Spideman** dans les films, il faudrait faire ceci en **SQL**.

```sql title="NE PAS EXÉCUTER"
DELETE FROM [Distribution] WHERE PersonnageId = 1; --En supposant que Spiderman = 1
```

Avec **Entity Framework**, il faut faire en plusieurs étapes.

- Récupérer toutes les données
- Les retirer du **DBSet**.

```sql
var optBuilder = new DbContextOptionsBuilder<UniversContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (UniversContext db = new UniversContext(optBuilder.Options))
{
	//Obtenir les distributions à supprimer
    List<Distribution> lstDistribution =
        (from lqDistribution in db.Distribution
         where
            lqDistribution.PersonnageId == 1
         select lqDistribution).ToList();
    
    //Le contexte est en mesure de déterminer la table par le type de l'objet
    db.RemoveRange(lstDistribution);

    db.SaveChanges();
}
```

Voici le **SQL généré**. Encore une fois, il y a plusieurs requêtes.

```sql
info: 2023-02-22 14:07:33.395 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command) 
      Executed DbCommand (16ms) [Parameters=[@p0='3', @p1='1', @p2='5', @p3='1'], CommandType='Text', CommandTimeout='30']
      SET NOCOUNT ON;
      DELETE FROM [Distribution]
      OUTPUT 1
      WHERE [FilmId] = @p0 AND [PersonnageId] = @p1;
      DELETE FROM [Distribution]
      OUTPUT 1
      WHERE [FilmId] = @p2 AND [PersonnageId] = @p3;
```

## Transaction

**Entity Framework** effectue toutes les modifications(ajout, suppression, mise à jour) de la base de données dans la mémoire de son contexte.

Toutes les actions sont effectuées lors de l'exécution de la méthode **SaveChanges()**.

Est-ce que le comportement de **SaveChanges()** est comme celui d'une transaction ?

```csharp
var optBuilder = new DbContextOptionsBuilder<UniversContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (UniversContext db = new UniversContext(optBuilder.Options))
{
    Film film1 = new Film()
    {
        Titre = "Film #1",
        DateSortie = new DateTime(2019, 7, 29),
        Etoile = 4,
        Duree = 123        
    };

    Film film2 = new Film()
    {
        Titre = "Film #2",
        DateSortie = new DateTime(2017, 8, 9),
        Etoile = 100, //Ne respecte pas la contrainte CHECK de 1 à 10
        Duree = 135
    };

    Film film3 = new Film()
    {
        Titre = "Film #3",
        DateSortie = new DateTime(2021, 12, 17),
        Etoile = 9,
        Duree = 99
    };    

    //Ajout des nouveaux films dans le contexte
    db.Add(film1);
    db.Add(film2);
    db.Add(film3);

    db.SaveChanges();
}
```

Lors de l'exécution du **SaveChanges()**, il y aura une exception.

```powershell
SqlException : The MERGE statement conflicted with the CHECK constraint "CK_Film_Etoile". The conflict occurred in database "eDA_4N1_GestionPersonnage", table "dbo.Film", column 'Etoile'.
```

Est-ce qu'une partie des données seront dans la base de données ? Il n'y aura aucun des 3 films, car la méthode **SaveChanges()** effectue une transaction.

La gestion de transaction se fait automatiquement, il faut seulement bien gérer quand est-ce que la méthode **SaveChanges()** doit être appelée.

