---
sidebar_position: 10
---

# EF Navigation


Dans EF relations entre les éléments utilisent l'agrégation d'objet et de liste selon le sens de la relation.


Pour cette section, nous allons réutiliser la bd **GestionPersonnage** 

<img src="/4N1_2024/img/07_dea_GestionFilm.jpg" />

Notez que nous avons renommé la table **Univers** pour **Franchise** afin de régler un problème de conflit de nom. 

:::warning
Veuillez changer le projet de démarrage pour **LinqCRUD**
:::

## Classe du modèle - Propriété de navigation

La table **Personnage** a une relation **plusieurs à 1** avec la table **Franchise**. Un personnage à une seule franchise.

À l'inverse, un **Franchise** a une relation **1 à plusieurs** avec la table **Personnage. Une franchise contient plusieurs personnages.

La table **Personnage** a une relation **1 à plusieurs** avec la table **Distribution**. Un personnage peut faire partie de la distribution de plusieurs films.

Dans une base de données relationnelle, ces relations fonctionnent grâce aux jointures des clés étrangères.

Dans un modèle objet, ces relations peuvent être représentées par des références vers un objet dans le cas d'une relation **plusieurs à 1** et par composition dans une relation **1 à plusieurs**.

Une classe du modèle contient les propriétés qui correspondent aux champs de la table.

Cette classe a également des propriétés de **navigation**. Ces propriétés permettent de représenter les relations **plusieurs à 1** et **1 à plusieurs** de la table.

Voici la classe **Personnage**.

```csharp showLineNumbers
public partial class Personnage
{
    public int PersonnageId { get; set; }
    public String Nom { get; set; } = null!;
    public String? IdentiteReelle { get; set; }
    public DateOnly DateNaissance { get; set; }
    public bool EstVilain { get; set; }
    public int FranchiseId { get; set; }
    public Franchise Franchise { get; set; } = null!;
    public ICollection<Distribution> DistributionListe { get; set; } = new List<Distribution>();
}
```

La ligne 10 représente la relation **1 à plusieurs** avec la table **Distribution**. Un personnage possède une liste de distribution. Cette liste peut être vide dans le cas que le personnage n'appartienne à aucune distribution ou contenir plusieurs éléments si le personnage appartient à plusieurs distributions.

La ligne 9 représente la relation **plusieurs à 1** avec la table **Franchise**.

Ces propriétés se nomment **navigation**, car il est possible de naviguer vers l'objet parent ou les objets enfants directement sans utiliser une jointure classique.

## Log des opérations SQL

Afin de créer un log des commandes SQL exécutées lors d'un scrpt LINQ, ajouter ces lignes avant vos requêtes dans **Program.cs** du projet **LinqCRUD**:

```csharp
var optBuilder = new DbContextOptionsBuilder<UniversContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();
```

## Jointure classique

Les exemples ci-dessous sont tous des **INNER JOIN**. Le **LEFT OUTER JOIN** sera présenté plus tard en session.

### `join`

Cette approche est identique à **SQL**. Il faut effectuer la jointure en utilisant les clés étrangères. Pour les grosses requêtes, cette approche est parfois plus performante, car elle reproduit généralement la requête **SQL** optimale. 

Voici la requête **SQL** à reproduire.

```sql showLineNumbers
SELECT
	Personnage.PersonnageId,
	Personnage.Nom AS PersonnageNom,
	Franchise.FranchiseId,
	Franchise.Nom AS FranchiseNom
FROM Personnage
INNER JOIN Franchise ON Personnage.FranchiseId = Franchise.FranchiseId;
```

Voici le code **LINQ**.

```csharp showLineNumbers
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    var resultatPersonnage = (from lqPersonnage in db.PersonnageTb
                          join lqFranchise in db.FranchiseTb on lqPersonnage.FranchiseId equals lqFranchise.FranchiseId
                          select
                            new
                            {
                                PersonnageId = lqPersonnage.PersonnageId,
                                PersonnageNom = lqPersonnage.Nom,
                                FranchiseId = lqFranchise.FranchiseId,
                                FranchiseNom = lqFranchise.Nom
                            }).ToList();    
}
```

La ligne 4 représente la jointure **inner join**. L'enregistrement de la table **Franchise** est représenté par la variable **`lqFranchise`**.

Voici le **SQL généré**.

```sql
SELECT [p].[PersonnageId], [p].[Nom] AS [PersonnageNom], [u].[FranchiseId], [u].[Nom] AS [FranchiseNom]
FROM [Personnage] AS [p]
INNER JOIN [Franchise] AS [u] ON [p].[FranchiseId] = [u].[FranchiseId]
```

Dans la requête ci-dessus, l'objet de retour est dynamique. Le **`select`** contient un **`new {}`**. L'utilisation d'objet de retour dynamique est pratique si l'objet est utilisé uniquement dans le bloc de code. S'il faut créer une extension pour gérer l'affichage de ceci, il faut créer un objet précis.

Dans le dossier **Data**, créez l'objet **InfoPersonnage**.

```csharp
namespace IntroEF.Data;

public class InfoPersonnage
{
    public int PersonnageId { get; set; }
    public string PersonnageNom { get; set; } = null!;
    public int FranchiseId { get; set; }
    public string FranchiseNom { get; set;} = null!;

}
```

Dans la définition des tables **Franchise** et **Personnage**, les champs **Nom** ne sont pas **nullable**. Pour éviter des avertissements du compilateur, il faut indiquer que leur valeur par défaut est **`null!`**. Cette déclaration indique au compilateur et au programmeur que si la valeur est **null**, il ne faut pas la considérer réellement **null**. Elle devrait avoir une valeur, mais elle n'est pas disponible (Nous y reviendrons avec **eager-loading**).

Voici la requête avec l'utilisation de la classe **InfoPersonnage**.

```csharp
var resultatPersonnage = (from lqPersonnage in db.PersonnageTb
                      join lqFranchise in db.FranchiseTb on lqPersonnage.FranchiseId equals lqFranchise.FranchiseId
                      select
                        new InfoPersonnage()
                        {
                            PersonnageId = lqPersonnage.PersonnageId,
                            PersonnageNom = lqPersonnage.Nom,
                            FranchiseId = lqFranchise.FranchiseId,
                            FranchiseNom = lqFranchise.Nom
                        }).ToList();   
```

Il est possible d'utiliser la variable **`lqFranchise`** pour le tri et les conditions.

Voici la requête **SQL**.

```sql
SELECT
	Personnage.PersonnageId,
	Personnage.Nom AS PersonnageNom,
	Franchise.FranchiseId,
	Franchise.Nom AS FranchiseNom
FROM Personnage
INNER JOIN Franchise ON Personnage.FranchiseId = Franchise.FranchiseId
WHERE
	Franchise.Proprietaire != 'Disney' AND
	Personnage.EstVilain = 1
ORDER BY
	Franchise.Nom,
	Personnage.Nom DESC;
```

<!-- rendu icitte -->
Voici son équivalent en **LINQ**

```csharp
var resultatPersonnage = (from lqPersonnage in db.PersonnageTb
                      join lqFranchise in db.FranchiseTb on lqPersonnage.FranchiseId equals lqFranchise.FranchiseId
                      where
                        lqFranchise.Proprietaire != "Disney" &&
                        lqPersonnage.EstVilain == true
                      orderby
                        lqFranchise.Nom,
                        lqPersonnage.Nom descending
                      select
                        new InfoPersonnage()
                        {
                            PersonnageId = lqPersonnage.PersonnageId,
                            PersonnageNom = lqPersonnage.Nom,
                            FranchiseId = lqFranchise.FranchiseId,
                            FranchiseNom = lqFranchise.Nom
                        }).ToList(); 
```

Voici le **SQL généré**.

```sql
SELECT [p].[PersonnageId], [p].[Nom] AS [PersonnageNom], [u].[FranchiseId], [u].[Nom] AS [FranchiseNom]
FROM [Personnage] AS [p]
INNER JOIN [Franchise] AS [u] ON [p].[FranchiseId] = [u].[FranchiseId]
WHERE [u].[Proprietaire] <> 'Disney' AND [p].[EstVilain] = CAST(1 AS bit)
ORDER BY [u].[Nom], [p].[Nom] DESC
```

Il est possible de faire plusieurs jointures.

Voici une requête **SQL** pour obtenir l'information d'une distribution pour le film #2.

```sql
SELECT 
	Film.Titre,
	Franchise.Nom AS FranchiseNom,	
	Personnage.Nom AS PersonnageNom,
	[Distribution].Acteur
FROM [Distribution]
INNER JOIN Personnage ON [Distribution].PersonnageId = Personnage.PersonnageId
INNER JOIN Franchise ON Personnage.FranchiseId = Franchise.FranchiseId
INNER JOIN Film ON [Distribution].FilmId = Film.FilmId
WHERE [Distribution].FilmId = 2;
```

Voici la version **LINQ**.

```csharp
var infoDistribution = (from lqDistribution in db.DistributionTb
                        join lqPersonnage in db.PersonnageTb on lqDistribution.PersonnageId equals lqPersonnage.PersonnageId
                        join lqFranchise in db.FranchiseTb on lqPersonnage.FranchiseId equals lqFranchise.FranchiseId
                        join lqFilm in db.FilmTb on lqDistribution.FilmId equals lqFilm.FilmId
                        where
                          lqDistribution.FilmId == 2
                        select
                          new 
                          {
                              Titre = lqFilm.Titre,
                              FranchiseNom = lqFranchise.Nom,
                              PersonnageNom = lqPersonnage.Nom,
                              Acteur = lqDistribution.Acteur
                          }).ToList();
```

Voici le **SQL généré**.

```sql
SELECT [f].[Titre], [u].[Nom] AS [FranchiseNom], [p].[Nom] AS [PersonnageNom], [d].[Acteur]
FROM [Distribution] AS [d]
INNER JOIN [Personnage] AS [p] ON [d].[PersonnageId] = [p].[PersonnageId]
INNER JOIN [Franchise] AS [u] ON [p].[FranchiseId] = [u].[FranchiseId]
INNER JOIN [Film] AS [f] ON [d].[FilmId] = [f].[FilmId]
WHERE [d].[FilmId] = 2
```

## Propriété de navigation

Toutes les requêtes de la section 3.1 peuvent être simplifiées en utilisant les propriétés de navigation.

La propriété de navigation représente la relation, donc **Entity Framework** va créer la jointure automatiquement.

Voici la requête **SQL** à reproduire.

```sql
SELECT
	Personnage.PersonnageId,
	Personnage.Nom AS PersonnageNom,
	Franchise.FranchiseId,
	Franchise.Nom AS FranchiseNom
FROM Personnage
INNER JOIN Franchise ON Personnage.FranchiseId = Franchise.FranchiseId;
```

Voici le code **LINQ**.

```csharp
var optBuilder = new DbContextOptionsBuilder<UniversContext>();
optBuilder.LogTo(message => File.WriteAllText(@"C:\eflog\" + DateTime.Now.Ticks + ".txt", message),
    Microsoft.Extensions.Logging.LogLevel.Information);
optBuilder.EnableSensitiveDataLogging();

using (UniversContext db = new UniversContext(optBuilder.Options))
{
    var infoPersonnage = (from lqPersonnage in db.PersonnageTb                          
                          select
                            new
                            {
                                PersonnageId = lqPersonnage.PersonnageId,
                                PersonnageNom = lqPersonnage.Nom,
                                FranchiseId = lqPersonnage.FranchiseId,
                                FranchiseNom = lqPersonnage.Franchise.Nom //Jointure par navigation
                            }).ToList();
}
```

Le mot clé **join** n'est plus utilisé. Par contre à la ligne 15, l'obtention du nom de l'franchise se fait par la propriété **Franchise** de la classe **Personnage**. Cette propriété est une référence à l'enregistrement.

Voici le code **SQL généré**.

```csharp
SELECT [p].[PersonnageId], [p].[Nom] AS [PersonnageNom], [p].[FranchiseId], [u].[Nom] AS [FranchiseNom]
FROM [Personnage] AS [p]
INNER JOIN [Franchise] AS [u] ON [p].[FranchiseId] = [u].[FranchiseId]
```

Il s'agit exactement de la même requête générée à la section 3.1.

Il est possible d'utiliser la navigation pour le tri et les conditions.

```sql
SELECT 
	Film.Titre,
	Franchise.Nom AS FranchiseNom,	
	Personnage.Nom AS PersonnageNom,
	[Distribution].Acteur
FROM [Distribution]
INNER JOIN Personnage ON [Distribution].PersonnageId = Personnage.PersonnageId
INNER JOIN Franchise ON Personnage.FranchiseId = Franchise.FranchiseId
INNER JOIN Film ON [Distribution].FilmId = Film.FilmId
WHERE [Distribution].FilmId = 2;
```

Voici son équivalent en **LINQ**

```csharp
var infoPersonnage = (from lqPersonnage in db.PersonnageTb                          
                      where
                        lqPersonnage.Franchise.Proprietaire != "Disney" &&
                        lqPersonnage.EstVilain == true
                      orderby
                        lqPersonnage.Franchise.Nom,
                        lqPersonnage.Nom descending
                      select
                        new InfoPersonnage()
                        {
                            PersonnageId = lqPersonnage.PersonnageId,
                            PersonnageNom = lqPersonnage.Nom,
                            FranchiseId = lqPersonnage.FranchiseId,
                            FranchiseNom = lqPersonnage.Franchise.Nom
                        }).ToList();
}
```

Voici le **SQL généré**.

```sql
SELECT [p].[PersonnageId], [p].[Nom] AS [PersonnageNom], [p].[FranchiseId], [u].[Nom] AS [FranchiseNom]
FROM [Personnage] AS [p]
INNER JOIN [Franchise] AS [u] ON [p].[FranchiseId] = [u].[FranchiseId]
WHERE [u].[Proprietaire] <> 'Disney' AND [p].[EstVilain] = CAST(1 AS bit)
ORDER BY [u].[Nom], [p].[Nom] DESC
```

Encore une fois, le **SQL généré** est identique à celui de la section 3.1.

Voici une requête **SQL** pour obtenir l'information d'une distribution pour le film #2.

```sql
SELECT 
	Film.Titre,
	Franchise.Nom AS FranchiseNom,	
	Personnage.Nom AS PersonnageNom,
	[Distribution].Acteur
FROM [Distribution]
INNER JOIN Personnage ON [Distribution].PersonnageId = Personnage.PersonnageId
INNER JOIN Franchise ON Personnage.FranchiseId = Franchise.FranchiseId
INNER JOIN Film ON [Distribution].FilmId = Film.FilmId
WHERE [Distribution].FilmId = 2;
```

Voici la version **LINQ**.

```csharp
var infoDistribution = (from lqDistribution in db.DistributionTb
                        where
                          lqDistribution.FilmId == 2
                        select
                          new
                          {
                              Titre = lqDistribution.Film.Titre,
                              FranchiseNom = lqDistribution.Personnage.Franchise.Nom,
                              PersonnageNom = lqDistribution.Personnage.Nom,
                              Acteur = lqDistribution.Acteur
                          }).ToList();
```

Remarquez la ligne 8, la navigation remonte de 2 niveaux dans la structure des jointures.

Voici le **SQL généré**. 

```sql
SELECT [f].[Titre], [u].[Nom] AS [FranchiseNom], [p].[Nom] AS [PersonnageNom], [d].[Acteur]
FROM [Distribution] AS [d]
INNER JOIN [Film] AS [f] ON [d].[FilmId] = [f].[FilmId]
INNER JOIN [Personnage] AS [p] ON [d].[PersonnageId] = [p].[PersonnageId]
INNER JOIN [Franchise] AS [u] ON [p].[FranchiseId] = [u].[FranchiseId]
WHERE [d].[FilmId] = 2
```

Il n'est pas tout à fait identique à la section 3, car les **jointures** ne sont pas dans le même ordre. En **SQL**, les **INNER JOIN** sont interchangeables dans l'ordre. 

Il est possible d'utiliser la technique du **`join`** et de les interchanger également comme dans l'exemple ci-dessous.

```csharp
var infoDistribution = (from lqFilm in db.FilmTb
                        join lqDistribution in db.DistributionTb on lqFilm.FilmId equals lqDistribution.FilmId
                        join lqPersonnage in db.PersonnageTb on lqDistribution.PersonnageId equals lqPersonnage.PersonnageId
                        join lqFranchise in db.FranchiseTb on lqPersonnage.FranchiseId equals lqFranchise.FranchiseId
                        where
                          lqDistribution.FilmId == 2
                        select
                          new
                          {
                              Titre = lqFilm.Titre,
                              FranchiseNom = lqFranchise.Nom,
                              PersonnageNom = lqPersonnage.Nom,
                              Acteur = lqDistribution.Acteur
                          }).ToList();
```

Par contre, ce ne sera pas possible de faire cette requête en navigation. Elle est pourtant équivalente au niveau **SQL**

**`lqFilm.Distribution`** est une liste de distribution. Il n'est pas possible de faire une relation de **plusieurs à 1**.

```csharp
var infoDistribution = (from lqFilm in db.FilmTb                           
                        where
                          lqFilm.FilmId == 2
                        select
                          new
                          {
                              Titre = lqFilm.Titre,
                              FranchiseNom = lqFilm.Distribution.Personnage.Franchise.Nom //Erreur
                              PersonnageNom = lqFilm.Distribution.Personnage.Nom, //Erreur
                              Acteur = lqFilm.Distribution.Acteur //Erreur
                          }).ToList();
```

Il faudrait faire cette requête. 

```csharp
var infoDistribution = (from lqFilm in db.FilmTb                           
                        where
                          lqFilm.FilmId == 2
                        select
                          new
                          {
                              Titre = lqFilm.Titre,
                              FranchiseNom = lqFilm.Distribution.Where(d => d.FilmId == lqFilm.FilmId)
                                  .Select(d => d.Personnage.Franchise.Nom).FirstOrDefault(),
                              PersonnageNom = lqFilm.Distribution.Where(d => d.FilmId == lqFilm.FilmId)
                                  .Select(d => d.Personnage.Nom).FirstOrDefault(),
                              Acteur = lqFilm.Distribution.Where(d => d.FilmId == lqFilm.FilmId)
                                  .Select(d => d.Acteur).FirstOrDefault()
                          }).ToList();
```

Voici le **SQL généré**. Il effectue plusieurs sous-requêtes pour obtenir l'information.

```sql
SELECT [f].[Titre], (
    SELECT TOP(1) [u].[Nom]
    FROM [Distribution] AS [d]
    INNER JOIN [Personnage] AS [p] ON [d].[PersonnageId] = [p].[PersonnageId]
    INNER JOIN [Franchise] AS [u] ON [p].[FranchiseId] = [u].[FranchiseId]
    WHERE [f].[FilmId] = [d].[FilmId] AND [d].[FilmId] = [f].[FilmId]) AS [FranchiseNom], (
    SELECT TOP(1) [p0].[Nom]
    FROM [Distribution] AS [d0]
    INNER JOIN [Personnage] AS [p0] ON [d0].[PersonnageId] = [p0].[PersonnageId]
    WHERE [f].[FilmId] = [d0].[FilmId] AND [d0].[FilmId] = [f].[FilmId]) AS [PersonnageNom], (
    SELECT TOP(1) [d1].[Acteur]
    FROM [Distribution] AS [d1]
    WHERE [f].[FilmId] = [d1].[FilmId] AND [d1].[FilmId] = [f].[FilmId]) AS [Acteur]
FROM [Film] AS [f]
WHERE [f].[FilmId] = 2
```

Cette requête est donc à proscrire, car elle aura un impact significatif sur la performance. 

Donc, il est important de débuter à partir de la bonne table pour effectuer des jointures par navigation. Il n'est pas possible de convertir une requête **SQL** directement.

## Mélange de `join` et navigation

Il est possible de mélanger les 2 approches, mais je ne la recommande pas s'il est possible d'en utiliser une seule.

Voici la requête **SQL** qui débute par la table **Personnage**.

```sql
SELECT 
	Film.Titre,
	Franchise.Nom AS FranchiseNom,	
	Personnage.Nom AS PersonnageNom,
	[Distribution].Acteur
FROM Personnage
INNER JOIN Franchise ON Personnage.FranchiseId = Franchise.FranchiseId
INNER JOIN [Distribution] ON Personnage.PersonnageId = [Distribution].PersonnageId
INNER JOIN Film ON [Distribution].FilmId = Film.FilmId
WHERE [Distribution].FilmId = 2;
```

Voici la requête **LINQ**.

```csharp
var infoDistribution = 
    (from lqPersonnage in db.PersonnageTb                           
     join lqDistribution in db.DistributionTb on lqPersonnage.PersonnageId equals lqDistribution.PersonnageId
     where
       lqDistribution.FilmId == 2 //Jointure classique
     select
       new
       {
           Titre = lqDistribution.Film.Titre, //Jointure classique et navigation
           FranchiseNom = lqPersonnage.Franchise.Nom, //Navigation
           PersonnageNom = lqPersonnage.Nom,
           Acteur = lqDistribution.Acteur
       }).ToList();
```

Voici le **SQL généré**.

```sql
SELECT [f].[Titre], [u].[Nom] AS [FranchiseNom], [p].[Nom] AS [PersonnageNom], [d].[Acteur]
FROM [Personnage] AS [p]
INNER JOIN [Distribution] AS [d] ON [p].[PersonnageId] = [d].[PersonnageId]
INNER JOIN [Film] AS [f] ON [d].[FilmId] = [f].[FilmId]
INNER JOIN [Franchise] AS [u] ON [p].[FranchiseId] = [u].[FranchiseId]
WHERE [d].[FilmId] = 2
```

Le **SQL généré** est équivalent à celui de la section 3.1.

# Eager loading

Par défaut, les propriétés de navigation sont disponibles uniquement lorsque le contexte est utilisé directement, comme dans l'utilisation des jointures par navigation.

Voici un exemple qui fonctionne pour obtenir la liste des personnages et d'afficher le nom de l'franchise et la liste des acteurs qui ont interprété ce personnage.

```csharp
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    var lstPersonnage =
        (from lqPersonnage in db.PersonnageTb
         select
             new
             {
                 PersonnageNom = lqPersonnage.Nom,
                 FranchiseNom = lqPersonnage.Franchise.Nom,
                 ListeActeur = lqPersonnage.Distribution.Select(d => d.Acteur).ToList(),
             }).ToList();

    foreach (var personnage in lstPersonnage)
    {
        Console.WriteLine($"Nom personnage : {personnage.PersonnageNom}");
        Console.WriteLine($"Nom Franchise : {personnage.FranchiseNom}");

        foreach (string acteur in personnage.ListeActeur)
        {
            Console.WriteLine($"Acteur : {acteur}");
        }
    }
}
```

Par contre, cette approche ne fonctionnera pas. 

```csharp
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    List<Personnage> lstPersonnage =
        (from lqPersonnage in db.PersonnageTb
         select
           lqPersonnage).ToList();

    foreach (Personnage personnage in lstPersonnage)
    {
        Console.WriteLine($"Nom personnage : {personnage.Nom}");
        Console.WriteLine($"Nom Franchise : {personnage.Franchise.Nom}");

        foreach (Distribution distribution in personnage.Distribution)
        {
            Console.WriteLine($"Acteur : {distribution.Acteur}");
        }
    }
}
```

Pourtant, elle pourrait être plus intéressante, car il serait possible d'utiliser les propriétés des tables en relation avec cet objet sans créer un objet dynamique ou une nouvelle classe.

La ligne 11 génère cette erreur : **`Object reference not set to an instance of an object`**. Et la liste **Personnage.Distribution** est vide.

Pour bien comprendre, il faut analyser le code de la classe **Personnage**.

```csharp
public partial class Personnage
{
    public int PersonnageId { get; set; }

    public string Nom { get; set; } = null!;

    public string? IdentiteReelle { get; set; }

    public DateTime? DateNaissance { get; set; }

    public bool EstVilain { get; set; }

    public int FranchiseId { get; set; }

    public virtual ICollection<Distribution> Distribution { get; } = new List<Distribution>();

    public virtual Franchise Franchise { get; set; } = null!;
}
```

La ligne 17 est la propriété de navigation pour la table **Franchise**. Elle a comme valeur par défaut **`null!`**. Ce qui indique qu'il est possible que la valeur soit **null**, mais il devrait avoir une valeur.

Par souci d'économie de mémoire, les propriétés de navigations n'ont aucune valeur si ce n'est pas spécifié dans la requête. Il existe la technique **Lazy Loading** qui permet de les utiliser sur demande, tant que le contexte est actif, mais cette technique n'est pas recommandée, car elle génère beaucoup de sous-requêtes. Elle ne sera pas présentée.

Le **Eager Loading** permet d'indiquer à **Entity Framework** de mettre les valeurs dans les propriétés de navigation pour qu'elles soient disponibles en dehors de la requête et de la durée de vie du contexte.

Il faut utiliser la méthode **`Include()`** dans la requête. Il est important d'utiliser d'utiliser un **`Include()`** pour chacune des propriétés.

```csharp
List<Personnage> lstPersonnage;

using (UniversContext db = new UniversContext(optBuilder.Options))
{
    lstPersonnage =
        (from lqPersonnage in db.PersonnageTb
            .Include(p => p.Franchise) //Indique que la propriété Franchise aura une valeur
            .Include(p => p.Distribution) //Indique que la propriété Distribution ne sera pas vide
         select
               lqPersonnage).ToList();
}
//Fin du contexte

foreach (Personnage personnage in lstPersonnage)
{
    Console.WriteLine($"Nom personnage : {personnage.Nom}");
    Console.WriteLine($"Nom Franchise : {personnage.Franchise.Nom}");

    foreach (Distribution distribution in personnage.Distribution)
    {
        Console.WriteLine($"Acteur : {distribution.Acteur}");
    }
}
```

La **Console** est à l'extérieur du **contexte**, donc les propriétés de navigation sont toujours disponibles.

Voici les 2 **SQL généré** avec l'approche de l'objet dynamique et l'approche du **Eager Loading**.

**Objet dynamique**

```sql
SELECT [p].[Nom], [u].[Nom], [p].[PersonnageId], [u].[FranchiseId], [d].[Acteur], [d].[PersonnageId], [d].[FilmId]
FROM [Personnage] AS [p]
INNER JOIN [Franchise] AS [u] ON [p].[FranchiseId] = [u].[FranchiseId]
LEFT JOIN [Distribution] AS [d] ON [p].[PersonnageId] = [d].[PersonnageId]
ORDER BY [p].[PersonnageId], [u].[FranchiseId], [d].[PersonnageId]
```

**Eager Loading**

```sql
SELECT [p].[PersonnageId], [p].[DateNaissance], [p].[EstVilain], [p].[IdentiteReelle], [p].[Nom], [p].[FranchiseId], [u].[FranchiseId], [u].[AnneeCreation], [u].[Nom], [u].[Proprietaire], [u].[SiteWeb], [d].[PersonnageId], [d].[FilmId], [d].[Acteur]
FROM [Personnage] AS [p]
INNER JOIN [Franchise] AS [u] ON [p].[FranchiseId] = [u].[FranchiseId]
LEFT JOIN [Distribution] AS [d] ON [p].[PersonnageId] = [d].[PersonnageId]
ORDER BY [p].[PersonnageId], [u].[FranchiseId], [d].[PersonnageId]
```

Elles sont équivalentes pour ce cas.  Par contre, les champs non nécessaires des tables **Franchise** et **Distribution** sont tous de même inclus dans la requête du **Eager Loading**, car il faut peupler l'objet au complet . Selon la nature de la requête, il peut être plus optimal d'utiliser un objet dynamique ou une classe spécifique.

## Plusieurs niveaux de navigation  - plusieurs à 1 -> plusieurs à 1

Par exemple, s'il faut présenter la requête ci-dessous, il faudra plusieurs niveaux pour la méthode **`Include()`**.

```sql
SELECT 
	Film.Titre,
	Franchise.Nom AS FranchiseNom,	
	Personnage.Nom AS PersonnageNom,
	[Distribution].Acteur
FROM [Distribution]
INNER JOIN Personnage ON [Distribution].PersonnageId = Personnage.PersonnageId
INNER JOIN Franchise ON Personnage.FranchiseId = Franchise.FranchiseId
INNER JOIN Film ON [Distribution].FilmId = Film.FilmId;
```

La méthode **`Include()`** peut inclure une séquence de plusieurs relations **plusieurs à 1**.

Remarquez l'indentation du **`Include()`**. C'est pour indiquer que c'est à partir de la table **Distribution**.

```csharp
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    List<Distribution> lstDistribution = 
        (from lqDistribution in db.DistributionTb
            .Include(d => d.Personnage.Franchise)//Inclusion de Personnage et Franchise en même temps                
            .Include(d => d.Film)
        select
            lqDistribution).ToList();

    foreach (Distribution distribution in lstDistribution)
    {
        Console.WriteLine($"Titre Film : {distribution.Film.Titre}");
        Console.WriteLine($"Nom Franchise : {distribution.Personnage.Franchise.Nom}");
        Console.WriteLine($"Nom Personnage : {distribution.Personnage.Nom}");
        Console.WriteLine($"Acteur : {distribution.Acteur}");
    }
}
```

Voici le **SQL généré**.

```sql
SELECT [d].[PersonnageId], [d].[FilmId], [d].[Acteur], [p].[PersonnageId], [p].[DateNaissance], [p].[EstVilain], [p].[IdentiteReelle], [p].[Nom], [p].[FranchiseId], [u].[FranchiseId], [u].[AnneeCreation], [u].[Nom], [u].[Proprietaire], [u].[SiteWeb], [f].[FilmId], [f].[Budget], [f].[DateSortie], [f].[Duree], [f].[Etoile], [f].[Titre]
      FROM [Distribution] AS [d]
      INNER JOIN [Personnage] AS [p] ON [d].[PersonnageId] = [p].[PersonnageId]
      INNER JOIN [Franchise] AS [u] ON [p].[FranchiseId] = [u].[FranchiseId]
      INNER JOIN [Film] AS [f] ON [d].[FilmId] = [f].[FilmId]
```

Si par exemple, la table **Personnage** avait une clé étrangère **TypePersonnegeId** vers une table **TypePersonnage**, il faudrait faire ceci.

```sql
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    List<Distribution> lstDistribution = 
        (from lqDistribution in db.DistributionTb
            .Include(d => d.Personnage.Franchise)//Inclusion de Personnage et Franchise en même temps                
            .Include(d => d.Personnage.TypePersonnage)//Inclusion de TypePersonnage.                
            .Include(d => d.Film)
        select
            lqDistribution).ToList();
}
```



## Navagion à plusieurs niveaux - 1 à plusieurs -> plusieurs à 1

Pour cette requête **SQL**, il ne serait pas possible de faire seulement des **`Include()`**.  La méthode **`Include()`** a la méthode chainée **`ThenInclude()`** qui permet d'inclure une sous-relation **plusieurs à 1**.

```sql
SELECT 
	Film.Titre,
	Franchise.Nom AS FranchiseNom,	
	Personnage.Nom AS PersonnageNom,
	[Distribution].Acteur
FROM Film
INNER JOIN [Distribution] ON Film.FilmId = [Distribution].FilmId
INNER JOIN Personnage ON [Distribution].PersonnageId = Personnage.PersonnageId
INNER JOIN Franchise ON Personnage.FranchiseId = Franchise.FranchiseId
```

Voici la requête **LINQ** à utiliser.

Remarquez l'indentation du **`Include()`** et du **`ThenInclude()`**. Il est préférable de représenter le niveau de navigation.

```sql
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    List<Film> lstFilm = 
        (from lqFilm in db.FilmTb
            .Include(f => f.Distribution)
                .ThenInclude(d => d.Personnage.Franchise)
         select
            lqFilm).ToList();



    foreach (Film film in lstFilm)
    {
        Console.WriteLine($"Titre Film : {film.Titre}");

        foreach (Distribution distribution in film.Distribution)
        {

            Console.WriteLine($"Nom Franchise : {distribution.Personnage.Franchise.Nom}");
            Console.WriteLine($"Nom Personnage : {distribution.Personnage.Nom}");
            Console.WriteLine($"Acteur : {distribution.Acteur}");
        }        
    }
}
```

La propriété **Film.Distribution** est une liste. Il n'est donc pas possible de faire **Film.Distribution.Personnage**. Il faut inclure pour chacune des distributions les personnages. Il faut donc obligatoirement utiliser la méthode **`ThenInclude()`**.

Par contre, **Personnage.Franchise** est une relation **plusieurs à 1**. Il est possible de les inclure en même temps.

## Classe d'extension

Il serait intéressant de reproduire le code de la console avec une classe d'extension.

Il faut déterminer le cas si les classes de navigation sont disponibles ou non.

Voici la classe **PersonnageConsoleExtensions**.

```csharp
public static class PersonnageConsoleExtensions
{
    public static void AfficherConsole(this Personnage? personnage)
    {
        if (personnage != null)
        {
            Console.WriteLine($"Id : {personnage.PersonnageId}");
            Console.WriteLine($"Nom : {personnage.Nom}");

            //Le ?? permet d'indiquer la valeur de remplacement si IdentiteReelle est null
            Console.WriteLine($"Identité réelle : {personnage.IdentiteReelle ?? "Inconnue"}");

            //Affiche la date de naissance en d MMM yyyy -> 3 dec 1998
            Console.Write("Date de naissance : ");

            if (personnage.DateNaissance != null)
            {
                Console.WriteLine($"{personnage.DateNaissance:d MMM yyyy}");
            }
            else
            {
                Console.WriteLine("Inconnue");
            }

            Console.WriteLine($"Est vilain : {(personnage.EstVilain ? "Oui" : "Non")}");

            Console.WriteLine($"Franchise Id : {personnage.FranchiseId}");

            if (personnage.Franchise != null)
            {
                Console.WriteLine($"Nom franchise : {personnage.Franchise.Nom}");
            }
        }
        else
        {
            Console.WriteLine("Personnage inexistant.");
        }
    }
}
```

Exécutez la requête ci-dessous.

```csharp
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    Personnage? pSansInclude =
        (from lqPersonnage in db.PersonnageTb
         where
            lqPersonnage.PersonnageId == 1
         select
            lqPersonnage).FirstOrDefault();

    pSansInclude.AfficherConsole();

    Personnage? pAvecInclude =
        (from lqPersonnage in db.PersonnageTb
            .Include(p => p.Franchise)
         where
            lqPersonnage.PersonnageId == 1
         select
            lqPersonnage).FirstOrDefault();

    pAvecInclude.AfficherConsole();
}
```

Voici le résultat dans la console.

```csharp
Id : 1
Nom : Spiderman
Identité réelle : Peter Parker
Date de naissance : 22 oct. 2003
Est vilain : Non
Franchise Id : 1

Id : 1
Nom : Spiderman
Identité réelle : Peter Parker
Date de naissance : 22 oct. 2003
Est vilain : Non
Franchise Id : 1
Nom franchise : Marvel
```

La méthode d'extension supporte le cas si la navigation est disponible.

# Agrégation

L'agrégation en **LINQ** permet de faire des calculs sur une collection en fonction du modèle objet.

Ajoutez ce film dans la base de données pour avoir un film sans aucune distribution.

```csharp
INSERT INTO Franchise(Nom, AnneeCreation, Proprietaire, SiteWeb)
VALUES ('Teenage mutant ninja turtles', 1984, 'Paramount', 'https://www.teenagemutantninjaturtles.com');
```

## Compte - `Count()`

Cette requête **SQL** permet de déterminer le nombre de **Personnages** par **Franchise**.

```sql
SELECT 
	Franchise.FranchiseId,
	Franchise.Nom,
	Count(Personnage.PersonnageId) AS NbPersonnage
FROM Franchise
LEFT OUTER JOIN Personnage ON Franchise.FranchiseId = Personnage.FranchiseId
GROUP BY Franchise.FranchiseId, Franchise.Nom;
```

L'équivalent en **LINQ**.

```csharp
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    var resultats =
        (from lqFranchise in db.FranchiseTb
         select
            new
            {
                FranchiseId = lqFranchise.FranchiseId,
                FranchiseNom = lqFranchise.Nom,
                NbPersonnage = lqFranchise.Personnage.Count()
            }).ToList();


    Console.WriteLine("Id".PadRight(3) +
                      "Nom".PadRight(70) +
                      "Nb Pers.".PadRight(3));

    Console.WriteLine("--".PadRight(3) +
                      "---".PadRight(70) +
                      "--------".PadRight(3));

    foreach (var item in resultats)
    {
        Console.WriteLine(item.FranchiseId.ToString().PadRight(3) +
                          item.FranchiseNom.PadRight(70) +
                          item.NbPersonnage.ToString().PadRight(3));
    }
}
```

Voici le résultat dans la console.

```
Id Nom                                                                   Nb Pers.
-- ---                                                                   --------
1  Marvel                                                                4
2  DC                                                                    2
3  Teenage mutant ninja turtles                                          0
```

Il n'est pas nécessaire d'avoir une clause **GROUP BY** dans **LINQ**, car l'objet **Franchise** a déjà une collection de **Personnage**. Il est possible d'obtenir le nombre de personnages contenu dans cette collection.

Il est possible d'exclure les franchise sans aucun personnage.

La requête **SQL**.

```sql
SELECT 
	Franchise.FranchiseId,
	Franchise.Nom,
	Count(Personnage.PersonnageId) AS NbPersonnage
FROM Franchise
LEFT OUTER JOIN Personnage ON Franchise.FranchiseId = Personnage.FranchiseId
GROUP BY Franchise.FranchiseId, Franchise.Nom
HAVING Count(Personnage.PersonnageId) > 0;
```

La requête **LINQ**.

```csharp
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    var resultats =
        (from lqFranchise in db.FranchiseTb
         where
            lqFranchise.Personnage.Count > 0
         select
            new
            {
                FranchiseId = lqFranchise.FranchiseId,
                FranchiseNom = lqFranchise.Nom,
                NbPersonnage = lqFranchise.Personnage.Count()
            }).ToList();


    Console.WriteLine("Id".PadRight(3) +
                      "Nom".PadRight(50) +
                      "Nb Pers.".PadRight(10));

    Console.WriteLine("--".PadRight(3) +
                      "---".PadRight(50) +
                      "--------".PadRight(10));

    foreach (var item in resultats)
    {
        Console.WriteLine(item.FranchiseId.ToString().PadRight(3) +
                          item.FranchiseNom.PadRight(50) +
                          item.NbPersonnage.ToString().PadRight(10));
    }
}
```

Est-ce aussi optimal que le **SQL** d'utiliser la propriété de navigation ?

Voici le **SQL généré**.

```sql
SELECT [u].[FranchiseId], [u].[Nom] AS [FranchiseNom], (
    SELECT COUNT(*)
    FROM [Personnage] AS [p0]
    WHERE [u].[FranchiseId] = [p0].[FranchiseId]) AS [NbPersonnage]
FROM [Franchise] AS [u]
WHERE (
    SELECT COUNT(*)
    FROM [Personnage] AS [p]
    WHERE [u].[FranchiseId] = [p].[FranchiseId]) > 0
```

Il y a 2 sous-requêtes. Un **GROUP BY** sera plus performant qu'une sous-requête corrélée. S'il y a 5 franchise, il y aura 6 exécutions de sous-requêtes.

L'utilisation d'un **GROUP BY** avec **LINQ** sera présentée plus tard dans la session avec le **LEFT OUTER JOIN**.

Il est possible d'ajouter une condition dans la méthode **`Count()`** pour faire l'équivalent d'un **CountIf**.

Dans l'exemple ci-dessous, il est possible de dénombrer le nombre de gentils et de vilains.

```csharp
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    var resultats =
        (from lqFranchise in db.FranchiseTb         
         select
            new
            {
                FranchiseId = lqFranchise.FranchiseId,
                FranchiseNom = lqFranchise.Nom,
                NbVilain = lqFranchise.Personnage.Count(p => p.EstVilain == true),
                NbGentil = lqFranchise.Personnage.Count(p => p.EstVilain == false)
            }).ToList();


    Console.WriteLine("Id".PadRight(3) +
                      "Nom".PadRight(50) +
                      "Nb Vilain".PadRight(11) +
                      "Nb Gentil".PadRight(11));

    Console.WriteLine("--".PadRight(3) +
                      "---".PadRight(50) +
                      "---------".PadRight(11) +
                      "---------".PadRight(11));

    foreach (var item in resultats)
    {
        Console.WriteLine(item.FranchiseId.ToString().PadRight(3) +
                          item.FranchiseNom.PadRight(50) +
                          item.NbVilain.ToString().PadRight(11) +
                          item.NbGentil.ToString().PadRight(11));
    }
}
```

## Somme - `Sum()`

Il faut obtenir le nombre total de minutes des films pour chacun des personnages. Il faut trier cette liste du plus grand nombre de minutes au plus petit.

```sql
SELECT
	Franchise.Nom AS NomFranchise,
	Personnage.Nom AS PersonnageNom,
	SUM(Film.Duree) AS DureeTotale
FROM Personnage
INNER JOIN Franchise ON Personnage.FranchiseId = Franchise.FranchiseId
INNER JOIN [Distribution] ON Personnage.PersonnageId = [Distribution].PersonnageId
INNER JOIN Film ON [Distribution].FilmId = Film.FilmId
GROUP BY Franchise.FranchiseId, Franchise.Nom, Personnage.PersonnageId, Personnage.Nom
ORDER BY SUM(Film.Duree) DESC
```

Voici la requête **LINQ**.

```csharp
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    var resultats = 
        (from lqPersonnage in db.PersonnageTb
         orderby lqPersonnage.Distribution.Sum(d => d.Film.Duree) descending
         select
            new
            {                
                FranchiseNom = lqPersonnage.Franchise.Nom,                
                PersonnageNom = lqPersonnage.Nom,
                DureeTotale = lqPersonnage.Distribution.Sum(d => d.Film.Duree)
            }).ToList();


    Console.WriteLine("Franchise".PadRight(20) +                      
                      "Personnage".PadRight(50) +
                      "Durée totale".PadRight(15));

    Console.WriteLine("-------".PadRight(20) +
                      "----------".PadRight(50) +
                      "------------".PadRight(15));

    foreach (var item in resultats)
    {
        Console.WriteLine(item.FranchiseNom.PadRight(20) +
                          item.PersonnageNom.PadRight(50) +
                          item.DureeTotale.ToString().PadRight(15));
    }
}
```

Dans la méthode **`Sum()`**, il faut spécifier le champ qui sera pris en compte pour la somme.

Voici le **SQL généré**.

```sql
SELECT [u].[Nom] AS [FranchiseNom], [p].[Nom] AS [PersonnageNom], (
    SELECT COALESCE(SUM(CAST([f0].[Duree] AS int)), 0)
    FROM [Distribution] AS [d0]
    INNER JOIN [Film] AS [f0] ON [d0].[FilmId] = [f0].[FilmId]
    WHERE [p].[PersonnageId] = [d0].[PersonnageId]) AS [DureeTotale]
FROM [Personnage] AS [p]
INNER JOIN [Franchise] AS [u] ON [p].[FranchiseId] = [u].[FranchiseId]
ORDER BY (
    SELECT COALESCE(SUM(CAST([f].[Duree] AS int)), 0)
    FROM [Distribution] AS [d]
    INNER JOIN [Film] AS [f] ON [d].[FilmId] = [f].[FilmId]
    WHERE [p].[PersonnageId] = [d].[PersonnageId]) DESC
```

Il s'agit encore de sous-requêtes. Ce n'est pas le plus performant comme requête.

## Moyenne - `Average()`

La méthode **`Average()`** fonctionne comme la méthode **`Sum()`**. Il faut spécifier à l'intérieur le champ sur lequel la moyenne sera calculée.

Il faut connaitre le budget moyen des films pour chacun des personnages. La liste doit être triée de la plus petite moyenne à la plus grande.

Voici la requête **SQL**.

```sql
SELECT
	Franchise.Nom AS NomFranchise,
	Personnage.Nom AS PersonnageNom,
	AVG(Film.Budget) AS BudgetMoyen
FROM Personnage
INNER JOIN Franchise ON Personnage.FranchiseId = Franchise.FranchiseId
INNER JOIN [Distribution] ON Personnage.PersonnageId = [Distribution].PersonnageId
INNER JOIN Film ON [Distribution].FilmId = Film.FilmId
GROUP BY Franchise.FranchiseId, Franchise.Nom, Personnage.PersonnageId, Personnage.Nom
ORDER BY AVG(Film.Budget)
```

Voici la requête **LINQ**.

```
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    var resultats =
        (from lqPersonnage in db.PersonnageTb
         orderby lqPersonnage.Distribution.Average(d => d.Film.Budget)
         select
            new
            {
                FranchiseNom = lqPersonnage.Franchise.Nom,
                PersonnageNom = lqPersonnage.Nom,
                BudgetMoyen = lqPersonnage.Distribution.Average(d => d.Film.Budget)
            }).ToList();


    Console.WriteLine("Franchise".PadRight(20) +
                      "Personnage".PadRight(50) +
                      "Budget moyen".PadRight(15));

    Console.WriteLine("-------".PadRight(20) +
                      "----------".PadRight(50) +
                      "------------".PadRight(15));

    foreach (var item in resultats)
    {
        Console.WriteLine(item.FranchiseNom.PadRight(20) +
                          item.PersonnageNom.PadRight(50) +
                          item.BudgetMoyen.ToString().PadRight(15));
    }
}
```

# Vue

L'utilisation d'une vue se fait comme une table avec **Entity Framework**.

Créez cette vue dans la base de données.

```sql
CREATE VIEW vNombrePersonnageFranchise
AS
    SELECT 
        Franchise.FranchiseId,
        Franchise.Nom,
        Count(Personnage.PersonnageId) AS NbPersonnage
    FROM Franchise
    LEFT OUTER JOIN Personnage ON Franchise.FranchiseId = Personnage.FranchiseId
    GROUP BY Franchise.FranchiseId, Franchise.Nom
GO
```

Mettez à jour le **contexte**. Il y aura maintenant une classe **VNombrePersonnageFranchise** dans le dossier **Data**.

Pour avoir tous les franchise.

```csharp
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    List<VNombrePersonnageFranchise> lst = db.VNombrePersonnageFranchise.ToList();

    foreach(var item in lst)
    {
        Console.WriteLine($"Franchise : {item.Nom} Nb Personnages : {item.NbPersonnage}");
    }
}
```

Pour avoir seulement ceux qui ont des personnages.

```
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    List<VNombrePersonnageFranchise> lst = 
        db.VNombrePersonnageFranchise.Where(v => v.NbPersonnage > 0).ToList();

    foreach(var item in lst)
    {
        Console.WriteLine($"Franchise : {item.Nom} Nb Personnages : {item.NbPersonnage}");
    }
}
```

Il est possible d'ajouter un tri.

```csharp
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    List<VNombrePersonnageFranchise> lst = 
        (from lqVue in db.VNombrePersonnageFranchise
         orderby
            lqVue.Nom
         select
            lqVue).ToList();

    foreach(var item in lst)
    {
        Console.WriteLine($"Franchise : {item.Nom} Nb Personnages : {item.NbPersonnage}");
    }
}
```

Supprimez la vue pour ne pas l'avoir dans votre projet.

```
DROP VIEW vNombrePersonnageFranchise;
```

