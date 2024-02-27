---
sidebar_position: 30
---

# Extension de classe

## Mauvaise technique

Dans une conception objet, il serait intéressant d'ajouter une méthode dans la classe **Franchise** qui permettrait d'afficher son information dans la console. Cette approche permet de favoriser la réutilisation du code, donc d'être plus **DRY**.

Ajoutez cette méthode dans la classe **Franchise**.

```csharp title="Cette méthode n'est pas celle recommandée dans le cours"
public void AfficherConsole()
{
    Console.WriteLine($"Id : {FranchiseId}");
    Console.WriteLine($"Nom : {Nom}");
    Console.WriteLine($"Année de création : {AnneeCreation}");
    Console.WriteLine($"Site Web : {SiteWeb}");
    Console.WriteLine($"Propriétaire : {Proprietaire}");
}
```

Maintenant, il est possible de faire ceci dans le fichier **Program.cs**.

```csharp
using (UniversContext db = new UniversContext())
{
    List<Franchise> lstFranchiseQuery = (from lqFranchise in db.FranchiseTb
                                     orderby
                                         lqFranchise.AnneeCreation descending
                                     select
                                         lqFranchise).ToList();

    foreach (Franchise franchise in lstFranchiseQuery)
    {
        franchise.AfficherConsole();
    }
}
```

Mais est-il correct d'ajouter une méthode d'affichage dans une classe de modèle?

Selon les principes **SOLID**, le **S** est pour une responsabilité simple. Pour **Entity Framework**, une classe du modèle doit contenir seulement les données d'un enregistrement et les propriétés de navigations. Elle ne peut pas avoir d'autres responsabilités. 

De plus, il faut éviter de mettre des fonctionnalités liées directement à l'interface utilisateur dans des classes de modèles. À quoi servirait une méthode d'affichage console dans une application web? 

Donc, pour être en mesure d'ajouter des fonctionnalités, il faut utiliser des méthodes d'extension. Le **O** de **SOLID** est **(open/close)**, c'est-à-dire une classe doit être fermée à la modification directe, mais ouverte à l'extension. C'est avec ce principe qu'il sera possible d'ajouter la méthode **AfficherConsole()** dans la classe **Franchise**.

:::danger important
Effacer la méthode AfficherConsole que vous venez de créer
:::


## Les méthodes d'extension

[Pour en savoir plus](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods)


Créez un nouveau dossier **Extensions** dans le projet **LinqCRUD** et créez la classe **FranchiseConsoleExtensions**. Cette classe contiendra les méthodes pour la console.

```csharp title="Cette méthode est recommandée"
using Univers.EF.Data;

namespace LinqCRUD.Extensions;
/// <summary>
/// Classe statique qui regroupe les méthodes d'extension pour la console du modèle Franchise
/// </summary>
public static class FranchiseConsoleExtensions
{
    /// <summary>
    /// Méthode qui affiche l'information d'une franchise à la console
    /// </summary>
    /// <param name="franchise">Franchise</param>
    public static void AfficherConsole(this Franchise franchise)
    {
        Console.WriteLine($"Id : {franchise.FranchiseId}");
        Console.WriteLine($"Nom : {franchise.Nom}");
        Console.WriteLine($"Année de création : {franchise.AnneeCreation}");
        Console.WriteLine($"Site Web : {franchise.SiteWeb}");
        Console.WriteLine($"Propriétaire : {franchise.Proprietaire}");
    }
}
```

Pour ajouter des méthodes d'extension, il faut obligatoirement les créer dans une classe **static**.

La méthode doit également être **static**. Remarquez le paramètre, il débute par **this**. Ceci indique que le premier paramètre consiste à l'objet qui utilisera la méthode d'extension.

Essayez ce code dans **Program.cs**

```csharp
using Univers.EF.Data.Context;
using Univers.EF.Data;
using LinqCRUD.Extensions;

using (UniversContext db = new UniversContext())
{
    Franchise f = db.FranchiseTb.FirstOrDefault();

    f.AfficherConsole();

}
```

La méthode **f.AfficherConsole()**  est en réalité **FranchiseConsoleExtensions.AfficherConsole(f);** pour le compilateur.

Pour quelle soit disponible, il faut ajouter le **using** qui contient la classe d'extension.

### Paramètres

Il est possible d'ajouter des paramètres dans la méthode.

Remplacez le code de la classe **FranchiseConsoleExtensions** par celui-ci.

```csharp
namespace LinqCRUD.Extensions;

/// <summary>
/// Classe statique qui regroupe les méthodes d'extension pour la console du modèle Franchise
/// </summary>
public static class FranchiseConsoleExtensions
{
    /// <summary>
    /// Méthode qui affiche l'information d'une franchise à la console
    /// </summary>
    /// <param name="franchise">Franchise</param>
    /// <param name="majuscule">Affiche le texte en majuscule. Faux par défaut.</param>
    public static void AfficherConsole(this Franchise franchise, bool majuscule = false)
    {
        if (majuscule == true)
        {
            //En majuscule
            Console.WriteLine($"Id : {franchise.FranchiseId}");
            Console.WriteLine($"Nom : {franchise.Nom.ToUpper()}");
            Console.WriteLine($"Id : {franchise.FranchiseId}");
            Console.WriteLine($"Année de création : {franchise.AnneeCreation}");
            Console.WriteLine($"Site Web : {franchise.SiteWeb.ToUpper()}");
            Console.WriteLine($"Propriétaire : {franchise.Proprietaire.ToUpper()}");
        }
        else
        {
            //Aucun changement
            Console.WriteLine($"Id : {franchise.FranchiseId}");
            Console.WriteLine($"Nom : {franchise.Nom}");
            Console.WriteLine($"Année de création : {franchise.AnneeCreation}");
            Console.WriteLine($"Site Web : {franchise.SiteWeb}");
            Console.WriteLine($"Propriétaire : {franchise.Proprietaire}");
        }
    }
}
```

Il est donc possible de faire ceci.

```csharp
using Univers.EF.Data.Context;
using Univers.EF.Data;
using LinqCRUD.Extensions;

using (UniversContext db = new UniversContext())
{
    List<Franchise> lstFranchiseQuery = (from lqFranchise in db.FranchiseTb
                                         orderby
                                             lqFranchise.AnneeCreation descending
                                         select
                                             lqFranchise).ToList();

    foreach (Franchise franchise in lstFranchiseQuery)
    {
        franchise.AfficherConsole(); //false par défaut => FranchiseConsoleExtensions.AfficherConsole(franchise);       
        franchise.AfficherConsole(false); //false spécifié => FranchiseConsoleExtensions.AfficherConsole(franchise, false);
        franchise.AfficherConsole(true); //true spécifié ==> FranchiseConsoleExtensions.AfficherConsole(franchise, true);
    }
}
```

### Collections

Il est possible de le faire sur une collection également.

Dans la classe **FranchiseConsoleExtensions**, ajoutez la méthode ci-dessous.

```csharp
/// <summary>
/// Méthode qui affiche l'information d'une liste de franchises à la console
/// </summary>
/// <param name="lstFranchise"></param>
public static void AfficherConsole(this List<Franchise> lstFranchise)
{
    if(lstFranchise?.Count > 0)
    {
        foreach (Franchise franchise in lstFranchise)
        {
            franchise.AfficherConsole();
        }
    }
}
```

Il est possible de simplifier le code dans le fichier **Program.cs** par celui-ci.

```csharp
using (UniversContext db = new UniversContext())
{
    List<Franchise> lstFranchiseQuery = (from lqFranchise in db.FranchiseTb
                                     orderby
                                         lqFranchise.AnneeCreation descending
                                     select
                                         lqFranchise).ToList();

    lstFranchiseQuery.AfficherConsole();

    //Ou directement en lambda
    db.FranchiseTb.OrderByDescending(u => u.AnneeCreation).ToList().AfficherConsole();
}
```

