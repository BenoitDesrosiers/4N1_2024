---
sidebar_position: 50
---

# Left Join

https://learn.microsoft.com/en-us/ef/core/querying/complex-query-operators#left-join

https://learn.microsoft.com/en-us/dotnet/csharp/linq/perform-left-outer-joins#example


L'univers TMNT a précédemment été ajouté sans lui associer de personnages avec la commande SQL suivante:

```csharp title="N'exécutez que si TMNT n'est pas déjà dans votre BD"
INSERT INTO Franchise(Nom, AnneeCreation, Proprietaire, SiteWeb)
VALUES ('Teenage mutant ninja turtles', 1984, 'Paramount', 'https://www.teenagemutantninjaturtles.com');
```

Si je désire lister tous les univers ainsi que leurs personnages même s'il n'y aucun personnage pour cet univers, je dois utiliser un **LEFT JOIN**

```sql 
select f.nom, p.nom
from Franchise f
left join Personnage p
on f.FranchiseId = p.FranchiseId
```

Le concept de **LEFT JOIN** n'existe pas directement dans LINQ. Pour avoir l'équivalent, il faut utiliser **.DefaultIfEmpty()**. 

```csharp
{
    var lst2 =
         (from lqFranchise in db.FranchiseTb
          join lqPersonnage in db.PersonnageTb
             on lqFranchise.FranchiseId equals lqPersonnage.FranchiseId into grouping
          from p in grouping.DefaultIfEmpty()
          select
          new
          {
              NomFranchise = lqFranchise.Nom,
              NomPersonnage = p.Nom ?? "aucun"
          }
          ).ToList();


    foreach (var item in lst2)
    {
        Console.WriteLine($"Franchise : {item.NomFranchise}, {item.NomPersonnage} " );
       
    }
}
```

La requête générée: 
```sql
SELECT [f].[Nom] AS [NomFranchise], COALESCE([p].[Nom], 'aucun') AS [NomPersonnage]
      FROM [Franchise] AS [f]
      LEFT JOIN [Personnage] AS [p] ON [f].[FranchiseId] = [p].[FranchiseId]
```