---
sidebar_position: 10
---

# EF Navigation et Jointure


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

### join

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

```

La ligne 4 représente la jointure **inner join**. L'enregistrement de la table **Franchise** est représenté par la variable **lqFranchise**.

Voici le **SQL généré**.

```sql
SELECT [p].[PersonnageId], [p].[Nom] AS [PersonnageNom], [u].[FranchiseId], [u].[Nom] AS [FranchiseNom]
FROM [Personnage] AS [p]
INNER JOIN [Franchise] AS [u] ON [p].[FranchiseId] = [u].[FranchiseId]
```

Dans la requête ci-dessus, l'objet de retour est dynamique. Le **select** contient un **new {}**. L'utilisation d'objet de retour dynamique est pratique si l'objet est utilisé uniquement dans le bloc de code. S'il faut créer une extension pour gérer l'affichage de ceci, il faut créer un objet précis.

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

Dans la définition des tables **Franchise** et **Personnage**, les champs **Nom** ne sont pas **nullable**. Pour éviter des avertissements du compilateur, il faut indiquer que leur valeur par défaut est **null!**. Cette déclaration indique au compilateur et au programmeur que si la valeur est **null**, il ne faut pas la considérer réellement **null**. Elle devrait avoir une valeur, mais elle n'est pas disponible (Nous y reviendrons avec **eager-loading**).

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

### Tri
Il est possible d'utiliser la variable **lqFranchise** pour le tri et les conditions.

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

Voici son équivalent en **LINQ**

```csharp
var resultatPersonnage = (from lqPersonnage in db.PersonnageTb
        join lqFranchise in db.FranchiseTb on lqPersonnage.FranchiseId equals lqFranchise.FranchiseId
        where
        lqFranchise.Proprietaire != "Disney" &&
        lqPersonnage.EstVilain == true
        //highlight-start
        orderby
        lqFranchise.Nom,
        lqPersonnage.Nom descending
        //highlight-end
        select
        new InfoPersonnage()
        {
            PersonnageId = lqPersonnage.PersonnageId,
            PersonnageNom = lqPersonnage.Nom,
            FranchiseId = lqFranchise.FranchiseId,
            FranchiseNom = lqFranchise.Nom
        }).ToList(); 
```


### Multijointures

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
//highlight-start
        join lqPersonnage in db.PersonnageTb on lqDistribution.PersonnageId equals lqPersonnage.PersonnageId
        join lqFranchise in db.FranchiseTb on lqPersonnage.FranchiseId equals lqFranchise.FranchiseId
        join lqFilm in db.FilmTb on lqDistribution.FilmId equals lqFilm.FilmId
//highlight-end
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

:::note
Notez ici qu'on ne peut pas utiliser InfoPersonnage car ce n'est plus la bonne information
:::

## Propriété de navigation

Toutes les requêtes de la section précédente peuvent être simplifiées en utilisant les propriétés de navigation.

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

```csharp showLineNumbers

var infoPersonnage = (from lqPersonnage in db.PersonnageTb                          
        select
        new
        {
            PersonnageId = lqPersonnage.PersonnageId,
            PersonnageNom = lqPersonnage.Nom,
            FranchiseId = lqPersonnage.FranchiseId,
            //highlight-next-line
            FranchiseNom = lqPersonnage.Franchise.Nom //Jointure par navigation
        }).ToList();

```

Le mot clé **join** n'est plus utilisé. Par contre à la ligne 10, l'obtention du nom de la franchise se fait par la propriété **Franchise** de la classe **Personnage**. Cette propriété est une référence à l'enregistrement.

Voici le code **SQL généré**.

```csharp
SELECT [p].[PersonnageId], [p].[Nom] AS [PersonnageNom], [p].[FranchiseId], [u].[Nom] AS [FranchiseNom]
FROM [Personnage] AS [p]
INNER JOIN [Franchise] AS [u] ON [p].[FranchiseId] = [u].[FranchiseId]
```

Il s'agit exactement de la même requête générée par la première requête de la section précédente.

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
var resultatPersonnage = (from lqPersonnage in db.PersonnageTb                          
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

Encore une fois, le **SQL généré** est identique à celui de la section précédente.

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

```csharp showLineNumbers
var infoDistribution = (from lqDistribution in db.DistributionTb
        where
            lqDistribution.FilmId == 2
        select
            new
            {
                Titre = lqDistribution.Film.Titre,
                //highlight-next-line
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

Il n'est pas tout à fait identique à la section précédente, car les **jointures** ne sont pas dans le même ordre. En **SQL**, les **INNER JOIN** sont interchangeables dans l'ordre. 

Si vous désirez avoir exactement la même requête sql, il est possible d'utiliser la technique du **join** et de les interchanger comme dans l'exemple ci-dessous.

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

### plusieurs à 1
Il n'est pas possible de faire la requête suivante en navigation car la relation entre Distribution et Film est **plusieurs à 1**.
Il y a plusieurs acteurs dans un film, c'est donc une liste.

```csharp
var infoDistribution = (from lqFilm in db.FilmTb                           
        where
            lqFilm.FilmId == 2
        select
            new
            {
                Titre = lqFilm.Titre,
                FranchiseNom = lqFilm.DistributionListe.Personnage.Franchise.Nom //Erreur
                PersonnageNom = lqFilm.DistributionListe.Personnage.Nom, //Erreur
                Acteur = lqFilm.DistributionListe.Acteur //Erreur
            }).ToList();
```

La requête a été "simplifiée" afin de démontrer ce qui pourrait être fait (par exemple, si je sais qu'il n'y a qu'un seul acteur dans un film, je peux aller chercher le premier de la liste)

```csharp
var infoDistribution = (from lqFilm in db.FilmTb                           
        where
            lqFilm.FilmId == 2
        select
            new
            {
                Titre = lqFilm.Titre,
                FranchiseNom = lqFilm.DistributionListe.Where(d => d.FilmId == lqFilm.FilmId)
                    .Select(d => d.Personnage.Franchise.Nom).FirstOrDefault(),
                PersonnageNom = lqFilm.DistributionListe.Where(d => d.FilmId == lqFilm.FilmId)
                    .Select(d => d.Personnage.Nom).FirstOrDefault(),
                Acteur = lqFilm.DistributionListe.Where(d => d.FilmId == lqFilm.FilmId)
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

Donc, il est important de débuter à partir de la bonne table pour effectuer des jointures par navigation. Il n'est pas toujours facile ou même possible de convertir une requête **SQL** directement.

## Mélange de join et navigation

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

Le **SQL généré** est équivalent à celui de la section précédente.

