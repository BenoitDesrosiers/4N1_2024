---
sidebar_position: 40
---

# Aggrégation

L'aggrégation en **LINQ** permet de faire des calculs sur une collection en fonction du modèle objet.

Ajoutez ce film dans la base de données pour avoir un film sans aucune distribution.

```csharp
INSERT INTO Franchise(Nom, AnneeCreation, Proprietaire, SiteWeb)
VALUES ('Teenage mutant ninja turtles', 1984, 'Paramount', 'https://www.teenagemutantninjaturtles.com');
```

## Compte - Count()

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
                NbPersonnage = lqFranchise.Personnages.Count()
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
            lqFranchise.Personnages.Count > 0
         select
            new
            {
                FranchiseId = lqFranchise.FranchiseId,
                FranchiseNom = lqFranchise.Nom,
                NbPersonnage = lqFranchise.Personnages.Count()
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

Il est possible d'ajouter une condition dans la méthode **Count()** pour faire l'équivalent d'un **CountIf**.

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
                NbVilain = lqFranchise.Personnages.Count(p => p.EstVilain == true),
                NbGentil = lqFranchise.Personnages.Count(p => p.EstVilain == false)
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

## Somme - Sum()

### Exemple 1

Cette requête permet d'obtenir le total de minutes des films pour chacun des personnages triée du plus grand nombre de minutes au plus petit.

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
         orderby lqPersonnage.DistributionListe.Sum(d => d.Film.Duree) descending
         select
            new
            {                
                FranchiseNom = lqPersonnage.Franchise.Nom,                
                PersonnageNom = lqPersonnage.Nom,
                DureeTotale = lqPersonnage.DistributionListe.Sum(d => d.Film.Duree)
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

Dans la méthode **Sum()**, il faut spécifier le champ qui sera pris en compte pour la somme.

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

### Exemple 2

Cette requête retourne le total de la durée des films groupé par le nombre d'étoile.

```sql
SELECT etoile, SUM(duree)
FROM film
GROUP BY Etoile
```

La requête Linq équivalenteÈ

```csharp
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    var lst =
         (from lqFilm in db.FilmTb
          group lqFilm by lqFilm.Etoile into etoileGroupe
          select 
          new
          {
              etoile = etoileGroupe.Key,
              total = etoileGroupe.Sum(d => d.Duree)
          }
          ).ToList();


    foreach (var item in lst)
    {
        Console.WriteLine($"Durée par étoile : {item.etoile}, {item.total} " );
       
    }
}
```

## Moyenne - Average()

La méthode **Average()** fonctionne comme la méthode **Sum()**. Il faut spécifier à l'intérieur le champ sur lequel la moyenne sera calculée.

Il faut connaitre la durée moyenne des films pour chacun des personnages. La liste doit être triée de la plus petite moyenne à la plus grande.

Voici la requête **SQL**.

```sql
SELECT
	Franchise.Nom AS NomFranchise,
	Personnage.Nom AS PersonnageNom,
	AVG(Film.Duree) AS DureeMoyen
FROM Personnage
INNER JOIN Franchise ON Personnage.FranchiseId = Franchise.FranchiseId
INNER JOIN [Distribution] ON Personnage.PersonnageId = [Distribution].PersonnageId
INNER JOIN Film ON [Distribution].FilmId = Film.FilmId
GROUP BY Franchise.FranchiseId, Franchise.Nom, Personnage.PersonnageId, Personnage.Nom
ORDER BY AVG(Film.Duree)
```

Voici la requête **LINQ**.

```csharp
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    var resultats =
        (from lqPersonnage in db.PersonnageTb
         orderby lqPersonnage.DistributionListe.Average(d => d.Film.Duree)
         select
            new
            {
                FranchiseNom = lqPersonnage.Franchise.Nom,
                PersonnageNom = lqPersonnage.Nom,
                DureeMoyen = lqPersonnage.DistributionListe.Average(d => d.Film.Duree)
            }).ToList();


    Console.WriteLine("Franchise".PadRight(20) +
                      "Personnage".PadRight(50) +
                      "Duree moyen".PadRight(15));

    Console.WriteLine("-------".PadRight(20) +
                      "----------".PadRight(50) +
                      "------------".PadRight(15));

    foreach (var item in resultats)
    {
        Console.WriteLine(item.FranchiseNom.PadRight(20) +
                          item.PersonnageNom.PadRight(50) +
                          item.DureeMoyen.ToString().PadRight(15));
    }
}
```

