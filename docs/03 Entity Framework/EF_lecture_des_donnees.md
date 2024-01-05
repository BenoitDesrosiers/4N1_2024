---
sidebar_position: 20
---

# CRUD EF en LINQ 

## Lecture des données

Inscrivez directement les blocs de code dans le fichier **Program.cs** pour tester.

Vous devez avoir les 2 **`using`** au début du fichier.

```c#
using IntroEF.Data.Context;
using IntroEF.Data;
```

Pour avoir une connexion à la base de données, il faut créer une instance du **contexte**.

```c#
GestionPersonnageContext db = new GestionPersonnageContext();
Univers univers = db.Univers.FirstOrDefault(); //Retourne le premier univers de la base de données
Console.WriteLine($"Id : {univers.UniversId}");
Console.WriteLine($"Nom : {univers.Nom}");
db.Dispose();
```

La méthode **Dispose** ferme la connexion.

Il est préférable d'utiliser un bloc de code **`using`**. La méthode **Dispose** est appelée automatiquement lorsque le bloc de code est terminé.

```c#
using (GestionPersonnageContext db = new GestionPersonnageContext())
{
	Univers univers = db.Univers.FirstOrDefault();
    Console.WriteLine($"Id : {univers.UniversId}");
	Console.WriteLine($"Nom : {univers.Nom}");
}
```

 Pour faire une requête à la base de données, il faut utiliser **LINQ** en syntaxe **Query** ou **Lambda**.

```c#
using (GestionPersonnageContext db = new GestionPersonnageContext())
{
    List<Univers> lstUniversQuery = (from lqUnivers in db.Univers
                                     orderby
                                         lqUnivers.AnneeCreation descending
                                     select
                                         lqUnivers).ToList();

    foreach (Univers univers in lstUniversQuery)
    {
        Console.WriteLine($"Id : {univers.UniversId}");
        Console.WriteLine($"Nom : {univers.Nom}");
    }

    List<Univers> lstUniversLambda = db.Univers.OrderByDescending(u => u.AnneeCreation).ToList();

    foreach (Univers univers in lstUniversLambda)
    {
        Console.WriteLine($"Id : {univers.UniversId}");
        Console.WriteLine($"Nom : {univers.Nom}");
    }
}
```

Il est possible d'utiliser le **`using`** sans créer un sous bloc de code. Si le **contexte** doit exister tout le long de la durée de vie de la méthode, il est possible de déclarer comme ci-dessous.

```c#
private void MaMethode()
{
    //Déclaration du contexte par un using
    using GestionPersonnageContext db = new GestionPersonnageContext();

    List<Univers> lstUniversQuery = (from lqUnivers in db.Univers
                                     orderby
                                         lqUnivers.AnneeCreation descending
                                     select
                                         lqUnivers).ToList();

    foreach (Univers univers in lstUniversQuery)
    {
        Console.WriteLine($"Id : {univers.UniversId}");
        Console.WriteLine($"Nom : {univers.Nom}");
    }
} //Fin du contexte
```

## Voir le SQL généré

Il peut être intéressant de voir le SQL généré.

Le contexte devra être créé avec des options. Le SQL sera généré dans le fichier **`C:\eflog\{tick}.txt`**. Il faut que le dossier **c:\eflog** existe.

Il y aura un fichier de créer par requête effectuée à la base de données.

```c#
var optBuilder = new DbContextOptionsBuilder<GestionPersonnageContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging(); //Permet de voir les valeurs

using (GestionPersonnageContext db = new GestionPersonnageContext(optBuilder.Options))
{
	//Les requêtes
}
```

### Exemple 1

Code **SQL**

```sql
SELECT * 
FROM Film
WHERE Etoile >= 8;
```

Code **LINQ**

```c#
var optBuilder = new DbContextOptionsBuilder<GestionPersonnageContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (GestionPersonnageContext db = new GestionPersonnageContext(optBuilder.Options))
{
    List<Film> lstFilmQuery = (from lqFilm in db.Film
                               where
                                    lqFilm.Etoile >= 8
                               select
                                    lqFilm).ToList();

    List<Film> lstFilmLambda = db.Film.Where(f => f.Etoile >= 8).ToList();
    
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
WHERE [f].[Etoile] >= CAST(8 AS tinyint)
```

## Exemple 2

Code **SQL**

```sql
SELECT * 
FROM Film
WHERE Year(DateSortie) = 2019;
```

Code **LINQ**

```c#
var optBuilder = new DbContextOptionsBuilder<GestionPersonnageContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (GestionPersonnageContext db = new GestionPersonnageContext(optBuilder.Options))
{
    List<Film> lstFilmQuery = (from lqFilm in db.Film
                               where
                                    lqFilm.DateSortie.Year == 2019
                               select
                                    lqFilm).ToList();

    List<Film> lstFilmLambda = db.Film.Where(f => f.DateSortie.Year == 2019).ToList();

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
WHERE DATEPART(year, [f].[DateSortie]) = 2019
```

## Exemple 3

Code **SQL**

```sql
SELECT * 
FROM Film
ORDER BY Year(DateSortie) ASC, Titre DESC;
```

Code **LINQ**

```c#
var optBuilder = new DbContextOptionsBuilder<GestionPersonnageContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (GestionPersonnageContext db = new GestionPersonnageContext(optBuilder.Options))
{
    List<Film> lstFilmQuery = (from lqFilm in db.Film
                               orderby 
                                lqFilm.DateSortie.Year descending, 
                                lqFilm.Titre
                               select
                                    lqFilm).ToList();

    List<Film> lstFilmLambda = db.Film
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

# Modifier

Pour être en mesure de modifier un enregistrement, il faut avoir une instance d'un objet de l'enregistrement.

Il n'y a pas d'action directe comme **SQL** pour le faire en une seule commande.

```sql
UPDATE Univers SET Nom = 'DC Comics' WHERE UniversId = 2; --En supposant que DC = 2
```

Pour faire la même chose avec **Entity Framework**, il faut faire un **SELECT** pour obtenir l'enregistrement et ensuite modifier les valeurs.

```c#
var optBuilder = new DbContextOptionsBuilder<GestionPersonnageContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (GestionPersonnageContext db = new GestionPersonnageContext(optBuilder.Options))
{
    //Obetnir l'univers à modifier
    Univers univers = (from lqUnivers in db.Univers
                        where
                             lqUnivers.UniversId == 2
                        select
                             lqUnivers).First();

    //Appliquer la modification
    univers.Nom = "DC Comics";    

    //Obtenir la liste de tous les univers
    List<Univers> lstUnivers = db.Univers.ToList();

    //Afficher tous les univers
    foreach(Univers u in lstUnivers)
    {
        Console.WriteLine($"Id : {u.UniversId}");
        Console.WriteLine($"Nom : {u.Nom}");
    }
}
```

Exécutez le code et allez voir dans la base de données. Est-ce que l'enregistrement s'y retrouve ? Non il n'est pas dans la base de données. 

Pourtant, le **`foreach`** sur tous les enregistrements de la table l'a affiché. 

Regardez le code **SQL** généré. Il aura seulement les 2 **SELECT**.

L'enregistrement n'est pas dans la base de données, car l'ajout a été fait en mémoire uniquement dans le **contexte**. 

Il est important d'appeler la méthode **`SaveChanges()`** pour indiquer au contexte qu'il faut appliquer les modifications à la base de données.

Exécutez ce code. La modification sera appliquée.

```c#
var optBuilder = new DbContextOptionsBuilder<GestionPersonnageContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (GestionPersonnageContext db = new GestionPersonnageContext(optBuilder.Options))
{
    //Obtenir l'univers à modifier
    Univers univers = (from lqUnivers in db.Univers
                        where
                             lqUnivers.UniversId == 2
                        select
                             lqUnivers).First();

    //Appliquer la modification
    univers.Nom = "DC Comics";

    db.SaveChanges();    
}
```

Dans le code généré, il y aura un **UPDATE**.

```sql
info: 2023-02-22 13:57:52.904 RelationalEventId.CommandExecuted[20101] (Microsoft.EntityFrameworkCore.Database.Command) 
      Executed DbCommand (86ms) [Parameters=[@p1='2', @p0='DC Comics' (Nullable = false) (Size = 100) (DbType = AnsiString)], CommandType='Text', CommandTimeout='30']
      SET IMPLICIT_TRANSACTIONS OFF;
      SET NOCOUNT ON;
      UPDATE [Univers] SET [Nom] = @p0
      OUTPUT 1
      WHERE [UniversId] = @p1;
```

## Mise à jour massive

Contrairement au langage **SQL**, il n'est pas possible de faire une mise à jour sur plusieurs enregistrements en fonction de sa condition.

Voici par exemple, il faut masquer l'identité réelle de tous les personnages de l'univers Marvel. 

```sql
UPDATE Personnage SET IdentiteReelle = 'Confidentielle' WHERE UniversId = 1; --En supposant que Marvel = 1;
```

Si la table a 1 million de personnages de Marvel, cette simple requête est en mesure de mettre à jour tous les enregistrements.

Avec **Entity Framework**, il faut faire en plusieurs étapes.

- Récupérer tous les enregistrements
- Parcourir les enregistrements
- Assigné la nouvelle valeur à chaque enregistrement

```c#
var optBuilder = new DbContextOptionsBuilder<GestionPersonnageContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (GestionPersonnageContext db = new GestionPersonnageContext(optBuilder.Options))
{
    //Obtenir les personnages à mettre à jour
    List<Personnage> lstPersonnage =
        (from lqPersonnage in db.Personnage
         where
            lqPersonnage.UniversId == 1
         select lqPersonnage).ToList();

    
    foreach(Personnage personnage in lstPersonnage)
    {
        personnage.IdentiteReelle = "Confidentielle";
    }

    db.SaveChanges();    
}
```

Remarquez que le **`SaveChanges()`** se fait uniquement à la fin. Il est possible de faire plusieurs modifications et d'enregistrer les modifications à la fin.

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

# Ajouter

Pour ajouter un nouvel enregistrement dans la base de données, il faut créer un nouvel objet.

```c#
using IntroEF.Data.Context;
using IntroEF.Data;
using Microsoft.EntityFrameworkCore;

var optBuilder = new DbContextOptionsBuilder<GestionPersonnageContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (GestionPersonnageContext db = new GestionPersonnageContext(optBuilder.Options))
{
    //Obetnir l'univers à modifier
    Univers univers = new Univers()
    {
        Nom = "Teenage mutant ninja turtles",
        AnneeCreation = 1984,
        Proprietaire = "Paramount",
        SiteWeb = "https://www.teenagemutantninjaturtles.com/"
    };

    //L'ajouter dans la base de données
    //Le contexte est en mesure de déterminer la table par le type de l'objet
    db.Add(univers);

    //Affiche la clé, elle sera à 0
    Console.WriteLine($"Id : {univers.UniversId}");

    db.SaveChanges();

    //Affiche la clé, elle aura une valeur
    Console.WriteLine($"Id : {univers.UniversId}");
}
```

Remarquez que la clé n'est pas spécifiée lors de la création de l'objet. À la ligne 26, la valeur de la clé est 0, car le contexte ne s'est pas mis à jour avec la base de données.

Une fois que la méthode **`SaveChanges()`** a été appelée, la valeur de la propriété **UniversId** a été mise à jour avec celle qui a été autogénérée par la base de données.

# Supprimer

Pour supprimer un enregistrement, il faut faire une technique similaire à la mise à jour.

Pour supprimer l'univers **Teenage mutant ninja turtles**, il faut faire cette requête.

```sql
DELETE FROM Univers WHERE Nom = 'Teenage mutant ninja turtles';
```

Avec **Entity Framework**, il faut faire en plusieurs étapes.

- Récupérer l'enregistrement
- Le retirer du **DBSet**.

```c#
var optBuilder = new DbContextOptionsBuilder<GestionPersonnageContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (GestionPersonnageContext db = new GestionPersonnageContext(optBuilder.Options))
{
    Univers univers = db.Univers.Where(u => u.Nom == "Teenage mutant ninja turtles").First();

    //Le contexte est en mesure de déterminer la table par le type de l'objet
    db.Remove(univers);

    db.SaveChanges();
}
```

## Suppression massive

Contrairement au langage **SQL**, il n'est pas possible de supprimer plusieurs enregistrements en fonction de sa condition.

Pour supprimer toutes les références de **Spideman** dans les films, il faudrait faire ceci en **SQL**.

```sql
DELETE FROM [Distribution] WHERE PersonnageId = 1; --En supposant que Spiderman = 1
```

Avec **Entity Framework**, il faut faire en plusieurs étapes.

- Récupérer toutes les données
- Les retirer du **DBSet**.

```sql
var optBuilder = new DbContextOptionsBuilder<GestionPersonnageContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (GestionPersonnageContext db = new GestionPersonnageContext(optBuilder.Options))
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

# Transaction

**Entity Framework** effectue toutes les modifications(ajout, suppression, mise à jour) de la base de données dans la mémoire de son contexte.

Toutes les actions sont effectuées lors de l'exécution de la méthode **`SaveChanges()`**.

Est-ce que le comportement de **`SaveChanges()`** est comme celui d'une transaction ?

```c#
var optBuilder = new DbContextOptionsBuilder<GestionPersonnageContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (GestionPersonnageContext db = new GestionPersonnageContext(optBuilder.Options))
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

Lors de l'exécution du **`SaveChanges()`**, il y aura une exception.

```powershell
SqlException : The MERGE statement conflicted with the CHECK constraint "CK_Film_Etoile". The conflict occurred in database "eDA_4N1_GestionPersonnage", table "dbo.Film", column 'Etoile'.
```

Est-ce qu'une partie des données seront dans la base de données ? Il n'y aura aucun des 3 films, car la méthode **`SaveChanges()`** effectue une transaction.

La gestion de transaction se fait automatiquement, il faut seulement bien gérer quand est-ce que la méthode **`SaveChanges()`** doit être appelée.

# Méthode d'extension

Dans une conception objet, il serait intéressant d'ajouter une méthode dans la classe **Univers** qui permettrait d'afficher son information dans la console. Cette approche permet de favoriser la réutilisation du code, donc d'être plus **DRY**.

Ajoutez cette méthode dans la classe **Univers**.

```
public void AfficherConsole()
{
    Console.WriteLine($"Id : {UniversId}");
    Console.WriteLine($"Nom : {Nom}");
    Console.WriteLine($"Année de création : {AnneeCreation}");
    Console.WriteLine($"Site Web : {SiteWeb}");
    Console.WriteLine($"Propriétaire : {Proprietaire}");
}
```

Maintenant, il est possible de faire ceci dans le fichier **Program.cs**.

```
using (GestionPersonnageContext db = new GestionPersonnageContext())
{
    List<Univers> lstUniversQuery = (from lqUnivers in db.Univers
                                     orderby
                                         lqUnivers.AnneeCreation descending
                                     select
                                         lqUnivers).ToList();

    foreach (Univers univers in lstUniversQuery)
    {
        univers.AfficherConsole();
    }
}
```

Il faut maintenant ajouter dans la table le champ **TelephoneProprietaire**.

```sql
ALTER TABLE Univers
ADD TelephoneProprietaire VARCHAR(15);
```

Il faut mettre à jour le contexte avec **Scaffold-DbContext**.

```powershell
Scaffold-DbContext "Server=localhost\SQLExpress;Database=eDA_4N1_GestionPersonnage;Trusted_Connection=True;Trust Server Certificate=true;" Microsoft.EntityFrameworkCore.SqlServer -Context GestionPersonnageContext -OutputDir Data -ContextDir Data\Context
```

Compilez de nouveau le code. Il y a une erreur pour la méthode **`AfficherConsole()`**.  

Elle n'existe plus dans la classe **Univers**. Pourtant, la nouvelle propriété **TelephoneProprietaire** est présente.

Lorsqu'une classe est générée et mise à jour par un outil d'autogénération de code, dans la majorité des cas, tous les changements manuels ne seront pas conservés.

De plus, selon les principes **SOLID**, le **S** est pour une responsabilité simple. Pour **Entity Framework**, une classe du modèle doit contenir seulement les données d'un enregistrement et les propriétés de navigations. Elle ne peut pas avoir d'autres responsabilités. De plus, il faut éviter de mettre des fonctionnalités liées directement à l'interface utilisateur dans des classes de modèles, car il serait possible d'utiliser ces modèles pour une application web, ensuite une console et WPF.

Donc, pour être en mesure d'ajouter des fonctionnalités, il faut utiliser des méthodes d'extension. Le **O** de **SOLID** est **(open/close)**, c'est-à-dire une classe doit être fermée à la modification directe, mais ouverte à l'extension. C'est avec ce principe qu'il sera possible d'ajouter la méthode **`AfficherConsole()`** dans la classe **Univers**.

Créez un nouveau dossier **Extensions** dans le projet et créez la classe **UniversConsoleExtensions**. Cette classe contiendra les méthodes pour la console.

```c#
/// <summary>
/// Classe statique qui regroupe les méthodes d'extension pour la console du modèle Univers
/// </summary>
public static class UniversConsoleExtensions
{
    /// <summary>
    /// Méthode qui affiche l'information d'un univers à la console
    /// </summary>
    /// <param name="univers">Univers</param>
    public static void AfficherConsole(this Univers univers)
    {
        Console.WriteLine($"Id : {univers.UniversId}");
        Console.WriteLine($"Nom : {univers.Nom}");
        Console.WriteLine($"Année de création : {univers.AnneeCreation}");
        Console.WriteLine($"Site Web : {univers.SiteWeb}");
        Console.WriteLine($"Propriétaire : {univers.Proprietaire}");
    }
}
```

Pour ajouter des méthodes d'extension, il faut obligatoirement les créer dans une classe **static**.

La méthode doit également être **static**. Remarquez le paramètre, il débute par **`this`**. Ceci indique que le premier paramètre consiste à l'objet qui utilisera la méthode d'extension.

Voici un exemple.

```c#
Univers u1 = new Univers();

//Par extension
u1.AfficherConsole();

//Directement
UniversConsoleExtensions.AfficherConsole(u1);
```

La méthode **`u1.AfficherConsole()`**  est en réalité **`UniversConsoleExtensions.AfficherConsole(u1);`** pour le compilateur.

Dans le fichier **Program.cs**, est-ce que la méthode disponible ? Pour quelle soit disponible, il faut ajouter le **`using`** qui contient la classe d'extension.

```c#
using IntroEF.Data.Context;
using IntroEF.Data;
using IntroEF.Extensions; //Donne accès à AfficherConsole()

using (GestionPersonnageContext db = new GestionPersonnageContext())
{
    List<Univers> lstUniversQuery = (from lqUnivers in db.Univers
                                     orderby
                                         lqUnivers.AnneeCreation descending
                                     select
                                         lqUnivers).ToList();

    foreach (Univers univers in lstUniversQuery)
    {
        univers.AfficherConsole();        
    }
}
```

Il est possible d'ajouter des paramètres dans la méthode.

Remplacez le code de la classe **UniversConsoleExtensions** par celui-ci.

```c#
/// <summary>
/// Classe statique qui regroupe les méthodes d'extension pour la console du modèle Univers
/// </summary>
public static class UniversConsoleExtensions
{
    /// <summary>
    /// Méthode qui affiche l'information d'un univers à la console
    /// </summary>
    /// <param name="univers">Univers</param>
    /// <param name="majuscule">Affiche le texte en majuscule. Faux par défaut.</param>
    public static void AfficherConsole(this Univers univers, bool majuscule = false)
    {
        if (majuscule == true)
        {
            //En majuscule
            Console.WriteLine($"Id : {univers.UniversId}");
            Console.WriteLine($"Nom : {univers.Nom.ToUpper()}");
            Console.WriteLine($"Id : {univers.UniversId}");
            Console.WriteLine($"Année de création : {univers.AnneeCreation}");
            Console.WriteLine($"Site Web : {univers.SiteWeb.ToUpper()}");
            Console.WriteLine($"Propriétaire : {univers.Proprietaire.ToUpper()}");
        }
        else
        {
            //Aucun changement
            Console.WriteLine($"Id : {univers.UniversId}");
            Console.WriteLine($"Nom : {univers.Nom}");
            Console.WriteLine($"Année de création : {univers.AnneeCreation}");
            Console.WriteLine($"Site Web : {univers.SiteWeb}");
            Console.WriteLine($"Propriétaire : {univers.Proprietaire}");
        }
    }
}
```

Il est donc possible de faire ceci.

```c#
using IntroEF.Data.Context;
using IntroEF.Data;
using IntroEF.Extensions; //Donne accès à AfficherConsole()

using (GestionPersonnageContext db = new GestionPersonnageContext())
{
    List<Univers> lstUniversQuery = (from lqUnivers in db.Univers
                                     orderby
                                         lqUnivers.AnneeCreation descending
                                     select
                                         lqUnivers).ToList();

    foreach (Univers univers in lstUniversQuery)
    {
        univers.AfficherConsole(); //false par défaut => UniversConsoleExtensions.AfficherConsole(univers);       
        univers.AfficherConsole(false); //false spécifié => UniversConsoleExtensions.AfficherConsole(univers, false);
        univers.AfficherConsole(true); //true spécifié ==> UniversConsoleExtensions.AfficherConsole(univers, true);
    }
}
```

Il est possible de le faire sur une collection également.

Dans la classe **UniversConsoleExtensions**, ajoutez la méthode ci-dessous.

```c#
/// <summary>
/// Méthode qui affiche l'information d'une liste d'univers à la console
/// </summary>
/// <param name="lstUnivers"></param>
public static void AfficherConsole(this List<Univers> lstUnivers)
{
    if(lstUnivers?.Count > 0)
    {
        foreach (Univers univers in lstUnivers)
        {
            univers.AfficherConsole();
        }
    }
}
```

Il est possible de simplifier le code dans le fichier **Program.cs** par celui-ci.

```c#
using (GestionPersonnageContext db = new GestionPersonnageContext())
{
    List<Univers> lstUniversQuery = (from lqUnivers in db.Univers
                                     orderby
                                         lqUnivers.AnneeCreation descending
                                     select
                                         lqUnivers).ToList();

    lstUniversQuery.AfficherConsole();

    //Ou directement en lambda
    db.Univers.OrderByDescending(u => u.AnneeCreation).ToList().AfficherConsole();
}
```

