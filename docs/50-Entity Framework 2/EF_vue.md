---
sidebar_position: 50
---


# Vue

L'utilisation d'une vue se fait comme une table avec **Entity Framework**.

Nous allons créer l'équivalent de cette vue dans la base de données en utilisant **Code First**.

```sql title="NE PAS EXÉCUTER"
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

## La migration

Comme pour les tables, pour ajouter la view dans la bd, ca prend une migration. 


```powershell
Add-Migration AjoutViewvNombrePersonnageFranchise -StartupProject Univers.EF
```

La migration se retrouvera dans **Univer.EF**

Remplacez le code de la migration vide par:

```csharp
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Univers.EF.Migrations
{
    /// <inheritdoc />
    public partial class AjoutViewvNombrePersonnageFranchise : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "CREATE VIEW vNombrePersonnageFranchise " +
                "AS SELECT  Franchise.FranchiseId, " +
                "Franchise.Nom,  " +
                "Count(Personnage.PersonnageId) AS NbPersonnage " +
                "FROM Franchise  " +
                "LEFT OUTER JOIN Personnage " +
                "ON Franchise.FranchiseId = Personnage.FranchiseId " +
                "GROUP BY Franchise.FranchiseId, Franchise.Nom;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"DROP VIEW vNombrePersonnageFranchise;");
        }
    }
}

```

:::info
Il n'y a pas de syntaxe en LINQ pour la création de la view. Il est donc nécessaire d'utiliser une commande SQL
:::

Mettre la bd à jour:

```powershell
Update-Database -StartupProject "Univers.EF" -Migration AjoutViewvNombrePersonnageFranchise
```

## La classe VNombrePersonnageFranchise

Ajoutez la classe **VNombrePersonnageFranchise.cs** dans **Univers.EF/Data**

```csharp
namespace Univers.EF.Data;
public class VNombrePersonnageFranchise
{
    public int FranchiseId { get; set; }
    public string Nom { get; set; }
    public int NbPersonnage { get; set;}

}
```

et ajoutez le DbSet dans le Context

```csharp
    public DbSet<VNombrePersonnageFranchise> VNombrePersonnageFranchise {  get; set; }
```

ainsi que OnModelCreating

```csharp
//View VNombrePersonnageFranchise
modelBuilder.Entity<VNombrePersonnageFranchise>(entity =>
{
    entity.ToView("vNombrePersonnageFranchise");
    entity.HasKey(t => new { t.FranchiseId });
});

```

## Utilisation

La view est maintenant prête à être utiliser pour les select. 

:::info
Comme toute view, il est impossible d'ajouter ou d'enlever des données dans cette view. Seule les SELECT sont permis
:::


Pour avoir tous les franchises.

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

```csharp
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

