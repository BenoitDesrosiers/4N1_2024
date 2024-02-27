---
sidebar_position: 30
---

# Eager loading

Par défaut, les propriétés de navigation sont disponibles uniquement lorsque le contexte est utilisé directement, comme dans l'utilisation des jointures par navigation.

Voici un exemple qui fonctionne pour obtenir la liste des personnages, et afficher le nom de la franchise et la liste des acteurs qui ont interprété ce personnage.

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
                 ListeActeur = lqPersonnage.DistributionListe.Select(d => d.Acteur).ToList(),
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

```csharp showLineNumbers
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

        foreach (Distribution distribution in personnage.DistributionListe)
        {
            Console.WriteLine($"Acteur : {distribution.Acteur}");
        }
    }
}
```

Pourtant, elle pourrait être plus intéressante, car il serait possible d'utiliser les propriétés des tables en relation avec cet objet sans créer un objet dynamique ou une nouvelle classe.

La ligne 13 génère cette erreur : **Object reference not set to an instance of an object**. Et la liste **Personnage.DistributionListe** est vide.

Pour bien comprendre, il faut analyser le code de la classe **Personnage**.

```csharp showLineNumbers
public partial class Personnage
{
    public int PersonnageId { get; set; }
    public string Nom { get; set; } = null!;
    public string? IdentiteReelle { get; set; }
    public DateOnly DateNaissance { get; set; }
    public bool EstVilain { get; set; }
    public int FranchiseId { get; set; }
//highlight-next-line
    public virtual ICollection<Distribution> DistributionListe { get; } = new List<Distribution>();
    public virtual Franchise Franchise { get; set; } = null!;
}
```

La ligne 10 est la propriété de navigation pour la table **Franchise**. Elle a comme valeur par défaut **null!**. Ce qui indique qu'il est possible que la valeur soit **null**, mais il devrait avoir une valeur.

Par souci d'économie de mémoire, les propriétés de navigations n'ont aucune valeur si ce n'est pas spécifié dans la requête. Il existe la technique **Lazy Loading** qui permet de les utiliser sur demande, tant que le contexte est actif, mais cette technique n'est pas recommandée, car elle génère beaucoup de sous-requêtes. Elle ne sera pas présentée.
<!-- ca serait intéressant de montrer un exemple de lazy loading et des requêtes que ca génère -->

Le **Eager Loading** (chargement *hâtif*) permet d'indiquer à **Entity Framework** de mettre les valeurs dans les propriétés de navigation pour qu'elles soient disponibles en dehors de la requête et de la durée de vie du contexte.

Il faut utiliser la méthode **Include()** dans la requête. Il est important d'utiliser un **Include()** pour chacune des propriétés.

```csharp
List<Personnage> lstPersonnage;

using (UniversContext db = new UniversContext(optBuilder.Options))
{
    lstPersonnage =
        (from lqPersonnage in db.PersonnageTb
            .Include(p => p.Franchise) //Indique que la propriété Franchise aura une valeur
            .Include(p => p.DistributionListe) //Indique que la propriété Distribution ne sera pas vide
         select
               lqPersonnage).ToList();
}
//Fin du contexte

foreach (Personnage personnage in lstPersonnage)
{
    Console.WriteLine($"Nom personnage : {personnage.Nom}");
    Console.WriteLine($"Nom Franchise : {personnage.Franchise.Nom}");

    foreach (Distribution distribution in personnage.DistributionListe)
    {
        Console.WriteLine($"Acteur : {distribution.Acteur}");
    }
}
```

La **Console** est à l'extérieur du **contexte** (using), ce qui démontre que les propriétés de navigation sont toujours disponibles une fois incluses.

Voici les 2 **SQL généré** avec l'approche de l'objet dynamique et l'approche du **Eager Loading**.

**Objet dynamique**

```sql
SELECT [p].[Nom], [u].[Nom], [p].[PersonnageId], [u].[FranchiseId], 
[d].[Acteur], [d].[PersonnageId], [d].[FilmId]
FROM [Personnage] AS [p]
INNER JOIN [Franchise] AS [u] ON [p].[FranchiseId] = [u].[FranchiseId]
LEFT JOIN [Distribution] AS [d] ON [p].[PersonnageId] = [d].[PersonnageId]
ORDER BY [p].[PersonnageId], [u].[FranchiseId], [d].[PersonnageId]
```

**Eager Loading**

```sql
SELECT [p].[PersonnageId], [p].[DateNaissance], [p].[EstVilain], 
[p].[IdentiteReelle], [p].[Nom], [p].[FranchiseId], [u].[FranchiseId], 
[u].[AnneeCreation], [u].[Nom], [u].[Proprietaire], [u].[SiteWeb], 
[d].[PersonnageId], [d].[FilmId], [d].[Acteur]
FROM [Personnage] AS [p]
INNER JOIN [Franchise] AS [u] ON [p].[FranchiseId] = [u].[FranchiseId]
LEFT JOIN [Distribution] AS [d] ON [p].[PersonnageId] = [d].[PersonnageId]
ORDER BY [p].[PersonnageId], [u].[FranchiseId], [d].[PersonnageId]
```

Elles sont équivalentes pour ce cas.  Par contre, les champs non nécessaires des tables **Franchise** et **Distribution** sont tous de même inclus dans la requête du **Eager Loading**, car il faut peupler l'objet au complet . Selon la nature de la requête, il peut être plus optimal d'utiliser un objet dynamique ou une classe spécifique.

## Plusieurs niveaux de navigation  - plusieurs à 1 -> plusieurs à 1

Par exemple, s'il faut présenter la requête ci-dessous, il faudra plusieurs niveaux pour la méthode **Include()**.

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

La méthode **Include()** peut inclure une séquence de plusieurs relations **plusieurs à 1**.

Il y a plusieurs Distribution pour un Personnage, et plusieurs Personnage pour une Franchise. Nous avons donc **plusieurs à 1** -> **plusieurs à 1**.

Remarquez l'indentation du **Include()**. C'est pour indiquer que c'est à partir de la table **Distribution**.

```csharp
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    List<Distribution> lstDistribution = 
        (from lqDistribution in db.DistributionTb
            .Include(d => d.Personnage.Franchise)//Inclusion de Personnage 
                                                 //et Franchise en même temps                
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
SELECT [d].[PersonnageId], [d].[FilmId], [d].[Acteur], [p].[PersonnageId], 
[p].[DateNaissance], [p].[EstVilain], [p].[IdentiteReelle], [p].[Nom], 
[p].[FranchiseId], [u].[FranchiseId], [u].[AnneeCreation], [u].[Nom], 
[u].[Proprietaire], [u].[SiteWeb], [f].[FilmId], [f].[Budget], 
[f].[DateSortie], [f].[Duree], [f].[Etoile], [f].[Titre]
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



## Navigation à plusieurs niveaux - 1 à plusieurs -> plusieurs à 1

Pour cette requête **SQL**, il ne serait pas possible de faire seulement des **Include()**.  La méthode **Include()** a la méthode chainée **ThenInclude()** qui permet d'inclure une sous-relation **plusieurs à 1**.

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

Remarquez l'indentation du **Include()** et du **ThenInclude()**. Il est préférable de représenter le niveau de navigation.

```sql
using (UniversContext db = new UniversContext(optBuilder.Options))
{
    List<Film> lstFilm = 
        (from lqFilm in db.FilmTb
            .Include(f => f.DistributionListe)
                .ThenInclude(d => d.Personnage.Franchise)
         select
            lqFilm).ToList();



    foreach (Film film in lstFilm)
    {
        Console.WriteLine($"Titre Film : {film.Titre}");

        foreach (Distribution distribution in film.DistributionListe)
        {

            Console.WriteLine($"Nom Franchise : {distribution.Personnage.Franchise.Nom}");
            Console.WriteLine($"Nom Personnage : {distribution.Personnage.Nom}");
            Console.WriteLine($"Acteur : {distribution.Acteur}");
        }        
    }
}
```

La propriété **Film.DistributionListe** est une liste. Il n'est donc pas possible de faire **Film.DistributionListe.Personnage**. Il faut inclure pour chacune des distributions les personnages. Il faut donc obligatoirement utiliser la méthode **ThenInclude()**.

Par contre, **Personnage.Franchise** est une relation **plusieurs à 1**. Il est possible de les inclure en même temps.

## Classe d'extension

Il serait intéressant de reproduire le code de la console avec une classe d'extension.

Il faut déterminer le cas si les classes de navigation sont disponibles ou non.

Voici la classe **PersonnageConsoleExtensions**.

```csharp
using Univers.EF.Data;

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

            Console.WriteLine($"{personnage.DateNaissance:d MMM yyyy}");
            

            Console.WriteLine($"Est vilain : {(personnage.EstVilain ? "Oui" : "Non")}");

            Console.WriteLine($"Franchise Id : {personnage.FranchiseId}");
//highlight-start
            if (personnage.Franchise != null)
            {
                Console.WriteLine($"Nom franchise : {personnage.Franchise.Nom}");
            } 
            else
            {
                Console.WriteLine("Franchise inconnue");
            }
            //highlight-end
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
IId : 1
Nom : Spiderman
Identité réelle : Confidentielle
Date de naissance : 1 déc. 1980
Est vilain : Non
Franchise Id : 1
//highlight-next-line
Franchise inconnue
Id : 1
Nom : Spiderman
Identité réelle : Confidentielle
Date de naissance : 1 déc. 1980
Est vilain : Non
Franchise Id : 1
//highlight-next-line
Nom franchise : Marvel
```

La méthode d'extension supporte le cas si la navigation est disponible.

