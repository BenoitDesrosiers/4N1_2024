---
sidebar_position: 4
---
# SuperCarte.Core

## Création du projet

Il faut ajouter le projet **Core** dans la solution.

Ce projet aura les classes de type **Service**, de type **Repository**, de type **Validateur** et les modèles du domaine.

Créez un projet de type **Bibliothèque de classe**. Il est important **de ne pas choisir** la version **.NET Framework**.

- **Nom du projet** : SuperCarte.Core
- **Infrastructure** : .NET 7

Pour le champ **Solution**, indiquez d'**Ajouter à la solution** et gardez SuperCarteApp. 


Supprimez le fichier **Class1.cs**.

Créez un dossier **Models** à la racine du projet. Ce dossier contient les classes du modèle du domaine. 

Il faut différencier les classes du modèle de données et du modèle du domaine. 

- **Modèle de données**
  - Il s'agit d'une classe qui représente une entité de la base de données. (Table ou Vue).
  - L'application ne doit pas travailler directement avec cette classe.
- **Modèle du domaine**
  - Il s'agit d'une classe qui représente un élément du domaine de l'application. Elle peut être très similaire à une classe du modèle de données, mais peut également contenir des champs de plusieurs tables et de la logique propre.
  - La logique applicative travaille avec la classe du modèle de domaine.
  - Le **Service** s'occupe de faire la transition (**mapping**) entre la classe du modèle de données et la classe du domaine du domaine.
  - Le **Repository** peut également utiliser les classes du domaine pour insérer les données de plusieurs tables dans un seul objet.

Avec **Entity Framework**, il n'est pas recommandé que la classe du modèle de données soit également la classe du modèle du domaine. **Dapper** offre un plus grand contrôle sur la création de l'objet, il serait possible de donner les 2 rôles à la même classe.

Créez un dossier **Repositories** à la racine du projet. Ce dossier contiendra les classes de type **Repository**. Ce sont les classes qui contiennent les requêtes pour communiquer avec la base de données.

Créez un dossier **Services** à la racine du projet. Ce dossier contiendra les services de l'application. Les classes de type **Service** contiennent la logique de l'application. Elles s'occuperont de convertir les objets de données en objet du domaine et vice-versa dans un certain cas également.

Créez le dossier **Validateurs**. Les classes de type **Validateur** s'occupent de valider les données. Ce sont des outils que le service utilisera pour s'assurer que l'objet du domaine est conforme aux exigences du logiciel. Avant d'envoyer un objet à la base de données, il doit respecter les contraintes.

Créez le dossier **Extensions**. Il y aura des extensions pour faire la conversion entre les objets du modèle de données et du modèle du domaine.

Voici la structure complète des dossiers du projet **SuperCarte.Core**.

```
SuperCarte.Core
	- Extensions
	- Models
	- Repositories
	- Services
	- Validateurs
```

## Ajout des dépendances de projet

Le projet **SuperCarte.Core** aura besoin du projet **SuperCarte.EF** pour utiliser le contexte.

Il faut l'ajouter dans les dépendances du projet.

Sélectionnez le dossier **Dépendances** du projet **SuperCarte.Core** et choisissez **Ajouter une référence de projet** dans le menu contextuel.

Dans la fenêtre, il faut cocher **SuperCarte.EF**. Vous venez d'intégrer une librairie interne au projet.

## Classe et méthode générique - Théorie

Pour plus d'information : https://learn.microsoft.com/fr-fr/dotnet/csharp/fundamentals/types/generics

L'utilisation de classe générique permet de généraliser les classes afin d'éviter de créer plusieurs classes spécifiques et de méthodes spécifiques.

Les classes et les méthodes génériques ont à la fin de leur nom le **\<\>**. Le **\<\>** permet d'indiquer le type réel qui doit être utilisé pour l'instance de la classe ou pour l'utilisation de la méthode.

La classe générique la plus populaire en **C#** est **List\<T\>**. La lettre **T** est la norme pour indiquer que le type est générique.

Prenez par exemple qu'il faut avoir une collection de la classe **Personne**.

```csharp
public class Personne
{
    public string Prenom { get; set; }
    public string Nom { get; set; }
    public int Age { get; set; }
}
```

Avant d'avoir une collection de type **List\<T\>**, il avait 2 options.

- **Créer une collection d'objets**

  Par exemple, en **C#**, il y a la collection **ArrayList**. Voici la signature de la méthode **Add(objet? value)**. Cette collection permet d'ajouter des classes du type **objet**, donc tous les types de classes.

  Il est possible d'ajouter plusieurs types de données dans la même collection. C'est rarement un comportement désiré dans une liste.

  ```csharp
  ArrayList listePersonne = new ArrayList();
  liste.Add(1); //Un entier
  liste.Add("une string"); //Une string
  liste.Add(3.04m); //Un decimal
  liste.Add(new DateTime(2011,11,11)); //Un objet DateTime
  liste.Add(new Personne() {Prenom = "Francois", Nom = "St-Hilaire", Age = 21}); //Un objet de type personne
  
  ```

- **Créer une classe Collection spécifique à un type.**

  Cette approche permet de créer une classe qui s'occupera d'ajouter des objets d'un seul type. Cette classe permet d'encapsuler la mécanique interne pour ajouter, pour enlever et pour obtenir uniquement pour le type **Personne**. Le gros désavantage est qu'il faut créer une classe **Collection** spécifique pour toutes les classes de l'application qui nécessite une collection.
  
  ```csharp
  public class CollectionPersonne
  {
      private ArrayList _arrPersonne = new ArrayList();
  
      public void Ajouter(Personne personne)
      {
          _arrPersonne.Add(personne);
      }
  
      public Personne Obtenir(int index)
      {
          if (index < _arrPersonne.Count)
          {
              return (Personne)_arrPersonne[index];
          }
          else
          {
              throw new Exception($"La liste a {_arrPersonne.Count} élément(s)");
          }
      }
  }
  ```
  
  Voici comment l'utiliser.
  
  ```csharp
  CollectionPersonne liste = new CollectionPersonne();
  
  liste.Ajouter(new Personne() { Prenom = "Francois", Nom = "St-Hilaire", Age = 21 });
  liste.Ajouter(new Personne() { Prenom = "Stéphane", Nom = "Janvier", Age = 61 });
  
  Personne p2 = liste.Obtenir(1);
  
  Console.WriteLine($"La personne est {p2.Prenom} { p2.Nom }.");
  
  liste.Ajouter(4); //Erreur du compilateur. Seulement le type **Personne** qui est accepté.
  ```

Maintenant, avec les classes génériques, il est possible de généraliser un comportement et de spécifier un type à une instance précise.

  Voici une simplification de la classe **List\<T\>**. 
	
	```csharp
	public class ListeGenerique<T>
	{
	    private ArrayList _arr = new ArrayList();
	
	    public void Ajouter(T valeur)
	    {
	        _arr.Add(valeur);
	    }
	
	    public T Obtenir(int index)
	    {
	        if (index < _arr.Count)
	        {
	            return (T)_arr[index];
	        }
	        else
	        {
	            throw new Exception($"La liste a {_arr.Count} élément(s)");
	        }
	    }
	}
	```
	
	Dans la déclaration de la classe, il y a le **\<T\>** qui indique qu'il faut obligatoirement spécifier un type lors de la création d'un objet.
	
	Le type générique **T** est utilisé comme type pour le paramètre de la méthode **void Ajouter(T valeur)**.
	
	Le type générique **T** est utilisé comme type de retour de la méthode **T Obtenir(int index)**.
	
	Donc, si une liste est créé avec le type **Personne** **new ListeGenerique\<Personne\>()** , le compilateur va générer **void Ajouter(Personne valeur)** et  **Personne Obtenir(int index)**.
	
	Voici comment l'utiliser.
	
	```csharp
	ListeGenerique<Personne> liste = new ListeGenerique<Personne>();
	
	liste.Ajouter(new Personne() { Prenom = "Francois", Nom = "St-Hilaire", Age = 21 });
	liste.Ajouter(new Personne() { Prenom = "Stéphane", Nom = "Janvier", Age = 61 });
	
	Personne p2 = liste.Obtenir(1);
	
	Console.WriteLine($"La personne est {p2.Prenom} { p2.Nom }.");
	
	liste.Ajouter(4); //Erreur du compilateur
	```
	
	Avec la même liste, il est possible de faire des ajouts de **DateTime** par exemple.
	
	```csharp
	ListeGenerique<DateTime> listeDate = new ListeGenerique<DateTime>();
	
	listeDate.Ajouter(new DateTime(1967, 2, 1));
	listeDate.Ajouter(new DateTime(1957, 6, 29));
	
	DateTime d2 = listeDate.Obtenir(1);
	
	Console.WriteLine($"La date est {d2}.");
	
	listeDate.Ajouter(4); //Erreur du compilateur
	```
	
	

## Généralisation du contexte

Les méthodes de base de la classe **DBContext** utilisent les types génériques. Il est donc possible de généraliser les requêtes de base et répétitives dans le **Repository**.

Voici une liste de requêtes **classiques** qui sont généralement identiques.

- Obtenir tous les éléments de la table
- Ajouter un ou des éléments
- Supprimer un ou des éléments
- Enregistrer les modifications

Créez le dossier **Bases** dans le dossier **Repositories**. Ce dossier contiendra les classes génériques de base.

L'injection de dépendances du **Repository** se fera par les interfaces. Il faut donc que les classes de base possèdent une interface.

Créez l'interface **IBaseRepo** dans le dossier **Repositories\Bases**.

```csharp showLineNumbers
namespace SuperCarte.Core.Repositories.Bases;

/// <summary>
/// Interface générique qui contient les opérations de base des tables de la base de données
/// </summary>
/// <typeparam name="TData">Type du modèle de données / table</typeparam>
public interface IBaseRepo<TData> where TData : class
{
    /// <summary>
    /// Obtenir la liste de tous les items en asynchrone.
    /// </summary>
    /// <returns>Liste des items</returns>
    Task<List<TData>> ObtenirListeAsync();

    /// <summary>
    /// Obtenir la liste de tous les items.
    /// </summary>
    /// <returns>Liste des items</returns>
    List<TData> ObtenirListe();

    /// <summary>
    /// Ajouter une liste d'items dans la base de données en asynchrone.
    /// </summary>
    /// <param name="lstItem">Liste des items à ajouter</param>
    /// <param name="enregistrer">Enregistrer immédiatement ou non dans la base de données</param>
    Task AjouterAsync(List<TData> lstItem, bool enregistrer);

    /// <summary>
    /// Ajouter une liste d'items dans la base de données.
    /// </summary>
    /// <param name="lstItem">Liste des items à ajouter</param>
    /// <param name="enregistrer">Enregistrer immédiatement ou non dans la base de données</param>
    void Ajouter(List<TData> lstItem, bool enregistrer);

    /// <summary>
    /// Ajouter un item dans la base de données en asynchrone.
    /// </summary>
    /// <param name="item">L'item à ajouter</param>
    /// <param name="enregistrer">Enregistrer immédiatement ou non dans la base de données</param>
    Task AjouterAsync(TData item, bool enregistrer);

    /// <summary>
    /// Ajouter un item dans la base de données.
    /// </summary>
    /// <param name="item">L'item à ajouter</param>
    /// <param name="enregistrer">Enregistrer immédiatement ou non dans la base de données</param>
    void Ajouter(TData item, bool enregistrer);

    /// <summary>
    /// Supprimer une liste d'items dans la base de données en asynchrone.
    /// </summary>
    /// <param name="lstItem">Liste des items à supprimer</param>
    /// <param name="enregistrer">Enregistrer immédiatement ou non dans la base de données</param>
    Task SupprimerAsync(List<TData> lstItem, bool enregistrer);

    /// <summary>
    /// Supprimer une liste d'items dans la base de données.
    /// </summary>
    /// <param name="lstItem">Liste des items à supprimer</param>
    /// <param name="enregistrer">Enregistrer immédiatement ou non dans la base de données</param>
    void Supprimer(List<TData> lstItem, bool enregistrer);

    /// <summary>
    /// Supprimer un item dans la base de données en asynchrone.
    /// </summary>
    /// <param name="item">L'item à supprimer</param>
    /// <param name="enregistrer">Enregistrer immédiatement ou non dans la base de données</param>
    Task SupprimerAsync(TData item, bool enregistrer);

    /// <summary>
    /// Supprimer un item dans la base de données.
    /// </summary>
    /// <param name="item">L'item à supprimer</param>
    /// <param name="enregistrer">Enregistrer immédiatement ou non dans la base de données</param>
    void Supprimer(TData item, bool enregistrer);

    /// <summary>
    /// Enregistrer l'état actuel du contexte dans la base de données en asynchrone.
    /// </summary>
    Task EnregistrerAsync();

    /// <summary>
    /// Enregistrer l'état actuel du contexte dans la base de données.
    /// </summary>
    void Enregistrer();
}
```

À la ligne 7, il y a la déclaration de l'interface avec un type générique.  Il est possible de renommer le **T** pour un nom plus spécifique **TData**. Par convention, le type générique débute toujours avec le préfixe **T**.

Il est possible de mettre des contraintes au type générique. Le mot-clé **where** permet de spécifier les contraintes. Dans ce cas-ci, il est seulement possible de spécifier un type qui est une classe. Donc, il n'est pas possible de spécifier **IBaseRepo\<int\>**, car le type **int** n'est pas une classe, mais un type primitif. 

Pour plus d'information pour le **where** https://learn.microsoft.com/fr-ca/dotnet/csharp/language-reference/keywords/where-generic-type-constraint

```csharp
public interface IBaseRepo<TData> where TData : class
```

Pour chacune des méthodes, il y a le **TData** pour le type d'un paramètre ou pour le retour.

Également, l'application doit pouvoir fonctionner en **asynchrone**. Par convention en **C#**, une méthode **asynchrone** doit avoir le suffixe **Async**, mais ce n'est pas obligatoire. De plus, les méthodes doivent retourner un type **Task** ou **Task\<T\>**. L'explication du fonctionnement de l'asynchrone sera expliquée plus tard. Il faut également le méthode **synchrone**, car selon le cas d'utilisation, l'appel peut être obligatoirement synchrone.

Créez la classe **BaseRepo** dans le dossier **Repositories\Bases**.

```csharp
using Microsoft.EntityFrameworkCore;
using SuperCarte.EF.Data.Context;

namespace SuperCarte.Core.Repositories.Bases;

/// <summary>
/// Classe abstraite générique qui contient les opérations de base des tables de la base de données
/// </summary>
/// <typeparam name="TData">Type du modèle de données / table</typeparam>
public class BaseRepo<TData> : IBaseRepo<TData> where TData : class
{
    protected readonly SuperCarteContext _bd;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="bd">Contexte de la base de données</param>
    public BaseRepo(SuperCarteContext bd)
    {
        _bd = bd;
    }

    public async Task<List<TData>> ObtenirListeAsync()
    {
        //Équivalent à _db.TData.ToListAsync();
        return await _bd.Set<TData>().ToListAsync();
    }

    public List<TData> ObtenirListe()
    {
        //Équivalent à _db.TData.ToList();
        return _bd.Set<TData>().ToList();
    }

    public async Task AjouterAsync(TData item, bool enregistrer)
    {
        //Add est déjà générique.
        //Sa définition réelle est _bd.Add<TData>().
        _bd.Add(item);

        //Vérifie si l'ajout doit être appliqué dans la base de données immédiatement
        if (enregistrer == true)
        {
            //L'ajout doit être appliqué dans la base de données immédiatement
            await _bd.SaveChangesAsync();
        }
        else
        {
            //L'ajout est seulement en mémoire
            await Task.CompletedTask;
        }
    }

    public void Ajouter(TData item, bool enregistrer)
    {
        //Add est déjà générique.
        //Sa définition réelle est _bd.Add<TData>().
        _bd.Add(item);

        //Vérifie si l'ajout doit être appliqué dans la base de données immédiatement
        if (enregistrer == true)
        {
            //L'ajout doit être appliqué dans la base de données immédiatement
            _bd.SaveChanges();
        }
    }

    public async Task AjouterAsync(List<TData> lstItem, bool enregistrer)
    {
        //AddRange est déjà générique.
        //Sa définition réelle est _bd.AddRange<TData>().
        _bd.AddRange(lstItem);

        //Vérifie si l'ajout doit être appliqué dans la base de données immédiatement
        if (enregistrer == true)
        {
            //L'ajout doit être appliqué dans la base de données immédiatement
            await _bd.SaveChangesAsync();
        }
        else
        {
            //L'ajout est seulement en mémoire
            await Task.CompletedTask;
        }
    }

    public void Ajouter(List<TData> lstItem, bool enregistrer)
    {
        //AddRange est déjà générique.
        //Sa définition réelle est _bd.AddRange<TData>().
        _bd.AddRange(lstItem);

        //Vérifie si l'ajout doit être appliqué dans la base de données immédiatement
        if (enregistrer == true)
        {
            //L'ajout doit être appliqué dans la base de données immédiatement
            _bd.SaveChanges();
        }
    }

    public async Task SupprimerAsync(TData item, bool enregistrer)
    {
        //Remove est déjà générique.
        //Sa définition réelle est _bd.Remove<TData>().
        _bd.Remove(item);

        //Vérifie si la suppression doit être appliquée dans la base de données immédiatement
        if (enregistrer == true)
        {
            //La suppression doit être appliquée dans la base de données immédiatement
            await _bd.SaveChangesAsync();
        }
        else
        {
            //La suppression est seulement en mémoire
            await Task.CompletedTask;
        }
    }

    public void Supprimer(TData item, bool enregistrer)
    {
        //Remove est déjà générique.
        //Sa définition réelle est _bd.Remove<TData>().
        _bd.Remove(item);

        //Vérifie si la suppression doit être appliquée dans la base de données immédiatement
        if (enregistrer == true)
        {
            //La suppression doit être appliquée dans la base de données immédiatement
            _bd.SaveChanges();
        }
    }

    public async Task SupprimerAsync(List<TData> lstItem, bool enregistrer)
    {
        //RemoveRange est déjà générique.
        //Sa définition réelle est _bd.RemoveRange<TData>().        
        _bd.RemoveRange(lstItem);

        //Vérifie si la suppression doit être appliquée dans la base de données immédiatement
        if (enregistrer == true)
        {
            //La suppression doit être appliquée dans la base de données immédiatement
            await _bd.SaveChangesAsync();
        }
        else
        {
            //La suppression est seulement en mémoire
            await Task.CompletedTask;
        }
    }

    public void Supprimer(List<TData> lstItem, bool enregistrer)
    {
        //RemoveRange est déjà générique.
        //Sa définition réelle est _bd.RemoveRange<TData>().        
        _bd.RemoveRange(lstItem);

        //Vérifie si la suppression doit être appliquée dans la base de données immédiatement
        if (enregistrer == true)
        {
            //La suppression doit être appliquée dans la base de données immédiatement
            _bd.SaveChanges();
        }
    }
    public async Task EnregistrerAsync()
    {
        //Enregistre les ajouts, modifications et suppression en attente dans la mémoire du contexte
        await _bd.SaveChangesAsync();
    }

    public void Enregistrer()
    {
        //Enregistre les ajouts, modifications et suppressions en attente dans la mémoire du contexte
        _bd.SaveChanges();
    }
}
```

Les méthodes ressemblent à ce que vous avez déjà fait, mais elles sont génériques. 

Également, le contexte utilise des méthodes **asynchrones**. Pour y avoir accès, il faut inclure **using Microsoft.EntityFrameworkCore;**.

- **ToListAsync()**
- **SaveChangesAsync()**

La déclaration de la classe **public class BaseRepo\<TData\> : IBaseRepo\<TData\> where TData : class** doit également inclure le **\<TData\>**. Elle doit la répliquer dans l'implémentation de l'interface avec la même contrainte **where**. Retirez le **where** et le compilateur indiquera que la classe est en erreur.

### Obtenir un enregistrement spécifique par sa clé

Une opération de base dans les opérations de la base de données est d'obtenir un enregistrement spécifique en fonction de sa clé primaire.

Le nom du champ de la clé primaire change pour chacune des tables. Généralement, le type de la clé primaire est un entier, mais ce n'est pas une garantie.

Il y a aussi le cas d'une clé primaire composée.

```csharp
//Clé avec nom différent
Carte carte = _bd.CarteTb.Where(c => c.CarteId == carteId).FirstOrDefault();
Utilisateur utilisateur = _bd.UtilisateurTb.Where(c => c.UtilisateurId == utilisateurId).FirstOrDefault();

//Clé pas un entier. DA est une string, car les DA peuvent débuter par 0, pour ceux qui ont été inscrits entre 2000 et 2009
Etudiant etudiant = _bd.EtudiantTb.Where(e => e.DA == da).FirstOrDefault();

//Clé composée
UtilisateurCarte utilisateurCarte = _bd.UtilisateurCarteTb.Where(uc => uc.CarteId == carteId && uc.utilisateurId == UtilisateurId).FirstOrDefault();
```

:::note
Remarquez ici que le nom des tables se termine par **Tb**. C'est donc le nom du **DbSet** dans **SuperCarteContext.cs**
:::


Est-ce possible de généraliser ceci ? Oui et non.

Le **contexte** possède une méthode **Find()** ou **FindAsync()**. Cette méthode permet de recevoir un enregistrement en fonction de sa clé primaire.

Cette méthode peut recevoir un **params object?[]? keyValues **. Le type est **object**, donc il peut recevoir une clé en **int**, en **string**, etc. selon le cas.

```csharp
//Clé avec nom différent
Carte carte = _bd.CarteTb.Find(carteId).FirstOrDefault();
Utilisateur utilisateur = _bd.UtilisateurTb.Find(utilisateurId).FirstOrDefault();

//Clé pas un entier. DA est une string, car les DA peuvent débuter par 0, pour ceux qui ont été inscrits entre 2000 et 2009
Etudiant etudiant = _bd.EtudiantTb.Find(da).FirstOrDefault();
```

Le mot-clé **params** permet d'ajouter des paramètres illimités (max réel de 65 535) à la méthode. Donc il est possible de faire **Find(1, "2", new DateTime(2022, 1, 3), 10.3m, true)** ou **Find(1, 2, 3)**.  En réalité, il faudrait envoyer un tableau **object[]** en paramètre, mais le mot-clé **params** permet de le créer lors de l'appel de la méthode en fusionnant les paramètres. Donc **Find(1, 2, 3)** est en réalité **Find(new object{1, 2, 3})**. Pour plus d'information pour le **params** https://learn.microsoft.com/fr-ca/dotnet/csharp/language-reference/keywords/params

Il est donc possible de récupérer un enregistrement qui a une clé primaire composée.

```csharp
UtilisateurCarte utilisateurCarte1 = _bd.UtilisateurCarteTb.Find(carteId, utilisateurId).FirstOrDefault();
UtilisateurCarte utilisateurCarte2 = _bd.UtilisateurCarteTb.Find(utilisateurId, carte).FirstOrDefault();
```

L'ordre des clés a-t-il son importance ? La réponse est **oui**. Lequel des 2 appels est la bonne ? Il faut retourner dans la méthode **OnModelCreating** du **contexte** pour voir dans quel ordre les clés ont été spécifiées.

```csharp
entity.HasKey(t => new { t.UtilisateurId, t.CarteId });
```

C'est donc **UtilisateurCarte utilisateurCarte2 = _bd.UtilisateurCarteTb.Find(utilisateurId, carte).FirstOrDefault();** qui serait la bonne. Il est possible de généraliser la méthode **Find** dans le **Repo**, mais il faut l'encadrer.

Le **Repo** générique ne permettra pas la gestion des clés multiples, car il y a trop de risque d'erreur que le programmeur doive toujours valider l'ordre des clés primaires. Ce sera une méthode spécifique pour les tables qui ont une clé primaire composée.

La méthode générique ressemblerait à celle-ci.

```csharp
public Task<TData?> ObtenirParCleAsync(int id)
{
	return await _bd.FindAsync<TData>(id);
}
```

Il y a 1 problème dans cette méthode. Elle fonctionne uniquement pour une clé primaire qui est un **entier**.

Il est possible de mettre plusieurs types génériques dans une classe. 

```csharp
public class BaseRepo<TData, TClePrimaire> : IBaseRepo<TData, TClePrimaire> where TData : class
{
    /**
     Code retiré pour simplifier
    */
    public Task<TData?> ObtenirParCleAsync(TClePrimaire clePrimaire)
    {
        return await _bd.FindAsync<TData>(clePrimaire);
    }
}
```

Le nombre de types génériques d'une classe n'est pas limité à 1 uniquement. Il suffit de mettre une virgule dans le **`<>`** pour ajouter des types génériques, par exemple  **`<T1, T2, T3, T4>`** . Lorsqu'il y a plusieurs types génériques, il est important de les nommer avec un nom significatif. 

**TClePrimaire** sert uniquement pour le paramètre de la méthode **ObtenirParCleAsync()**.

Mais est-ce le bon endroit pour mettre cette méthode ? Que devra-t-il être spécifié pour la table **UtilisateurCarte** ? Dans le cas ci-dessous, ce sera **int**, mais si le programmeur utilise quand même la méthode **ObtenirParCleAsync()**, il y aura une exception.

```csharp
var utilisateurCarteRepo BaseRepo<UtilisateurCarte, int>();

//La valeur 1 est-ce carteId ou utilisateurId ???
utilisateurCarteRepo.ObtenirParCleAsync(1); //Il y aura une exception "System.ArgumentException : 'Entity type 'UtilisateurCarte' is defined with a 2-part composite key, but 1 values were passed to the 'Find' method.'
"
```

Cette approche va contre les principes **SOLID**. Il s'agit du **L (Liskov substitution)**. Ça ne s'applique pas nécessairement au type générique dans sa définition pure, mais l'idée est tout de même respectée. Ce principe consiste qu'une classe de **Base** doit fonctionner pour tous les types de données. Il ne doit pas avoir de méthode disponible dans une classe dont le programmeur sait qu'un cas particulier va générer une exception si elle est utilisée. Donc par conception, le programmeur concepteur sait que la méthode **ObtenirParCleAsync()** va générer une exception pour le modèle de données **UtilisateurCarte**. Le programmeur qui n'est pas concepteur et qui voit cette méthode disponible, ne saura pas nécessairement qu'il ne peut pas l'utiliser, d'où l'importance de respecter le **L** de **SOLID**.

La solution a ce problème est de créer une classe de base intermédiaire.

Créez l'interface **IBasePKUniqueRepo** dans le dossier **Repositories\Bases**.

```csharp
namespace SuperCarte.Core.Repositories.Bases;

/// <summary>
/// Interface générique qui contient les opérations de base des tables de la base de données pour une table à clé primaire unique
/// </summary>
/// <typeparam name="TData">Type du modèle de données / table</typeparam>
/// <typeparam name="TClePrimaire">Type de la clé primaire</typeparam>
public interface IBasePKUniqueRepo<TData, TClePrimaire> : IBaseRepo<TData> where TData : class
{
    /// <summary>
    /// Obtenir un item spécifique en fonction de sa clé primaire en asynchrone.
    /// </summary>
    /// <param name="clePrimaire">Valeur de la clé primaire</param>
    /// <returns>L'item ou null si non trouvé</returns>
    Task<TData?> ObtenirParCleAsync(TClePrimaire clePrimaire);

    /// <summary>
    /// Obtenir un item spécifique en fonction de sa clé primaire.
    /// </summary>
    /// <param name="clePrimaire">Valeur de la clé primaire</param>
    /// <returns>L'item ou null si non trouvé</returns>
    TData? ObtenirParCle(TClePrimaire clePrimaire);

    /// <summary>
    /// Suprimer un item spécifique en fonction de sa clé primaire en asynchrone.
    /// </summary>
    /// <param name="clePrimaire">Valeur de la clé primaire</param>    
    /// <param name="enregistrer">Enregistrer immédiatement ou non dans la base de données</param>
    Task SupprimerParCleAsync(TClePrimaire clePrimaire, bool enregistrer);

    /// <summary>
    /// Suprimer un item spécifique en fonction de sa clé primaire.
    /// </summary>
    /// <param name="clePrimaire">Valeur de la clé primaire</param>    
    /// <param name="enregistrer">Enregistrer immédiatement ou non dans la base de données</param>
    void SupprimerParCle(TClePrimaire clePrimaire, bool enregistrer);
}
```

Créez la classe **BasePKUniqueRepo** dans le dossier **Repositories\Bases**.

```csharp
using SuperCarte.EF.Data.Context;

namespace SuperCarte.Core.Repositories.Bases;

// <summary>
/// Classe abstraite générique qui contient les opérations de base des tables de la base de données pour une table à clé primaire unique
/// </summary>
/// <typeparam name="TData">Type du modèle de données / table</typeparam>
/// <typeparam name="TClePrimaire">Type de la clé primaire</typeparam>
public abstract class BasePKUniqueRepo<TData, TClePrimaire> : BaseRepo<TData>, IBasePKUniqueRepo<TData, TClePrimaire> where TData : class
{
    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="bd">Contexte de la base de données</param>
    public BasePKUniqueRepo(SuperCarteContext bd) : base(bd)
    {
        //Vide, il sert uniquement a recevoir le contexte et à l'envoyer à la classe parent.
    }

    public async Task<TData?> ObtenirParCleAsync(TClePrimaire clePrimaire)
    {
        return await _bd.FindAsync<TData>(clePrimaire);
    }

    public TData? ObtenirParCle(TClePrimaire clePrimaire)
    {
        return _bd.Find<TData>(clePrimaire);
    }

    public async Task SupprimerParCleAsync(TClePrimaire clePrimaire, bool enregistrer)
    {
        TData? item = await ObtenirParCleAsync(clePrimaire);

        //Vérifie si un item a été trouvé avec la clé spécifiée
        if (item != null)
        {
            //Il y a un item avec la clé spécifiée
            await SupprimerAsync(item, enregistrer);
        }
        else
        {
            //Il n'y a pas d'item avec la clé spécifiée
            throw new Exception("Impossible de trouver l'item à supprimer avec la clé spécifiée.");
        }
    }

    public void SupprimerParCle(TClePrimaire clePrimaire, bool enregistrer)
    {
        TData? item = ObtenirParCle(clePrimaire);

        //Vérifie si un item a été trouvé avec la clé spécifiée
        if (item != null)
        {
            //Il y a un item avec la clé spécifiée
            Supprimer(item, enregistrer);
        }
        else
        {
            //Il n'y a pas d'item avec la clé spécifiée
            throw new Exception("Impossible de trouver l'item à supprimer avec la clé spécifiée.");
        }
    }
}
```

La classe a 2 méthodes spécifiques aux tables avec une clé primaire unique. Il est possible d'obtenir un item à partir de sa clé primaire et de le supprimer. Il y la version **synchrone** et **asynchrone**.

### Utilisation du Repository - Théorie

Pour utiliser un **Repository** générique, il faut l'injecter comme ceci. Voici l'exemple pour **Carte**.

```csharp
public classe CarteService
{
	private readonly IBasePKUniqueRepo<Carte, int> _baseRepoCarte;
    
	public CarteService(IBasePKUniqueRepo<Carte, int> baseRepoCarte)
	{
		_baseRepoCarte = baseRepoCarte;
	}
}
```

Par contre, si le logiciel doit obtenir les cartes qui ont plus de 10 points de vie, il faut une requête spécifique dans le **Repository**. 

Il faut avoir une classe **CarteRepo**.

Il y a 2 options. 

- Utiliser 2 **Repositories** par modèle de données.

  Pour les modèles qui nécessitent des requêtes spécifiques, il serait possible d'injecter les 2 **Repositories** dans le **Service**.

  Voici l'interface et la classe du **Repository** spécifique.

  ```csharp
  public interface ICarteRepo
  {
  	List<Carte> ObtenirListeParPointVieMin(int vie);
  }
  
  public classe CarteRepoICarteService
  {
      private readonly SuperCarteContext _bd;
      
      public CarteRepo(SuperCarteContext bd)
      {
          _bd = bd;
      }
      
  	public List<Carte> ObtenirListeParPointVieMin(int vie)
      {
          return _bd.CarteTb.Where(c => c.vie >= vie).ToList();
      }
  }
  ```

  Et l'injection dans le **Service**.

  ```csharp
  public classe CarteService
  {
  	private readonly IBaseRepo<Carte> _carteBaseRepo;
  	private readonly ICarteRepo _carteSpecificRepo;
      
  	public CarteService(IBaseRepo<Carte> _carteBaseRepo, ICarteRepo _carteSpecificRepo)
  	{
  		_carteBaseRepo = carteBaseRepo;
  		_carteSpecificRepo = carteSpecificRepo;
  	}
  }
  ```

  

- Hériter de **BaseRepo**.

  Il y aurait seulement un **Repository**. Le **Repository** spécifique hériterait du **Repository** générique de base.

  Voici l'interface et la classe du **Repository** spécifique.

  ```csharp
  public interface ICarteRepo : IBasePKUniqueRepo<Carte,int>
  {
  	List<Carte> ObtenirListeParPointVieMin(int vie);
  }
  
  public classe CarteRepo : BasePKUniqueRepo<Carte,int>, ICarteService
  {   
      public CarteRepo(SuperCarteContext bd) : base(bd)
      {
          
      }
      
  	public List<Carte> ObtenirListeParPointVieMin(int vie)
      {
          return _bd.CarteTb.Where(c => c.vie >= vie).ToList();
      }
  }
  
  ```

  Et l'injection dans le **Service**.

  ```csharp
  public classe CarteService
  {
  	private readonly ICarteRepo _carteRepo;
      
  	public CarteService(ICarteRepo _carteRepo)
  	{
  		_carteRepo = carteRepo;
  	}
  }
  ```

  

Les 2 approches ont leurs avantages et leurs inconvénients.

L'approche par héritage permet d'avoir un seul **Repository** qui contient toutes les méthodes nécessaires à l'entité. Par contre, ce n'est pas tous les **Repository** qui nécessitent des requêtes spécifiques. Dans une approche standardisée, il pourrait être exigé au programmeur de créer des classes spécifiques, même s'il n'y a pas de requête spécifique. 

Dans une approche non standardisée, il faudrait injecter le **BaseRepo\<TData\>** dans le service lorsqu'il n'y a pas de requêtes spécifiques. Si un jour, il faut ajouter une requête spécifique, il faut créer le **Repository** spécifique et modifier tous les services qui utilisaient le **Repository** de base. Ceci peut demander beaucoup de refactorisation. Donc, si l'approche par 

L'approche avec 2 **Repositories** a l'avantage de créer uniquement un **Repo** spécialisé lorsque nécessaire. Par contre, le programmeur doit basculer d'un **Repository** à l'autre selon le contexte. Aussi, à chaque fois qu'il faut injecter le **Repository** de base, il faut s'assurer de spécifier le type de la bonne clé primaire. Rien n'empêche également d'injecter la mauvaise classe de base, par exemple **BaseRepo\<Carte\>**.

Si l'enregistrement des services est bien fait dans l'injection des dépendances, le programme génèrera une exception lorsque la mauvaise classe de base sera utilisée. Par contre, si le programmeur l'ajoute dans l'enregistrement sans valider l'existence des autres, le programme va devenir non uniforme et moins maintenable dans le temps.

Principalement pour la dernière raison, l'approche par héritage sera utilisée et il faudra créer la classe et l'interface spécifique en tout temps, même si elle est vide. Le programme sera plus uniforme et plus facilement maintenable à long terme.  De plus, dans les applications d'envergure, les **entités** sans aucune requête spécifique sont assez rares.

Remarquez que les classes **BaseRepo** et **BasePKUniqueRepo** ont été déclarées dès le départ **abstract** pour éviter l'utilisation directe sans héritage.

## Création des Repositories spécifiques

Il faut créer les classes spécifiques qui hériteront de la classe de base correspondante.

Pour l'instant, toutes les classes seront vides.

Toutes les classes et interfaces doivent être créées dans le dossier **Repositories**.

### RoleRepo

Créez l'interface **IRoleRepo**.

```csharp
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Interface qui contient les méthodes de communication avec la base de données pour la table Role
/// </summary>
public interface IRoleRepo : IBasePKUniqueRepo<Role,int>
{
}
```

Créez la classe **RoleRepo**.

```csharp
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;
using SuperCarte.EF.Data.Context;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Classe qui contient les méthodes de communication avec la base de données pour la table Role
/// </summary>
public class RoleRepo : BasePKUniqueRepo<Role,int>, IRoleRepo
{
    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="bd">Contexte de la base de données</param>
    public RoleRepo(SuperCarteContext bd) : base(bd)
	{
        //Vide, il sert uniquement a recevoir le contexte et à l'envoyer à la classe parent.
    }
}
```

La classe hérite de **`BasePKUniqueRepo<Role,int>`**, car il y a seulement une clé primaire et c'est un entier.

### UtilisateurRepo

Créez l'interface **IUtilisateurRepo**.

```csharp
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Interface qui contient les méthodes de communication avec la base de données pour la table Utilisateur
/// </summary>
public interface IUtilisateurRepo : IBasePKUniqueRepo<Utilisateur, int>
{
}
```

Créez la classe **UtilisateurRepo**.

```csharp
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;
using SuperCarte.EF.Data.Context;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Classe qui contient les méthodes de communication avec la base de données pour la table Utilisateur
/// </summary>
public class UtilisateurRepo : BasePKUniqueRepo<Utilisateur, int>, IUtilisateurRepo
{
    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="bd">Contexte de la base de données</param>
    public UtilisateurRepo(SuperCarteContext bd) : base(bd)
    {
        //Vide, il sert uniquement a recevoir le contexte et à l'envoyer à la classe parent.
    }
}
```

La classe hérite de **BasePKUniqueRepo\<Utilisateur,int\>**, car il y a seulement une clé primaire et c'est un entier.

### EnsembleRepo

Créez l'interface **IEnsembleRepo**.

```csharp
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Interface qui contient les méthodes de communication avec la base de données pour la table Ensemble
/// </summary>
public interface IEnsembleRepo : IBasePKUniqueRepo<Ensemble, int>
{
}

```

Créez la classe **EnsembleRepo**.

```csharp
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;
using SuperCarte.EF.Data.Context;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Classe qui contient les méthodes de communication avec la base de données pour la table Ensemble
/// </summary>
public class EnsembleRepo : BasePKUniqueRepo<Ensemble, int>, IEnsembleRepo
{
    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="bd">Contexte de la base de données</param>
    public EnsembleRepo(SuperCarteContext bd) : base(bd)
    {
        //Vide, il sert uniquement a recevoir le contexte et à l'envoyer à la classe parent.
    }
}
```

La classe hérite de **BasePKUniqueRepo\<Ensemble,int\>**, car il y a seulement une clé primaire et c'est un entier.

### CategorieRepo

Créez l'interface **ICategorieRepo**.

```csharp
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Interface qui contient les méthodes de communication avec la base de données pour la table Categorie
/// </summary>
public interface ICategorieRepo : IBasePKUniqueRepo<Categorie, int>
{
}
```

Créez la classe **CategorieRepo**.

```csharp
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;
using SuperCarte.EF.Data.Context;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Classe qui contient les méthodes de communication avec la base de données pour la table Categorie
/// </summary>
public class CategorieRepo : BasePKUniqueRepo<Categorie, int>, ICategorieRepo
{
    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="bd">Contexte de la base de données</param>
    public CategorieRepo(SuperCarteContext bd) : base(bd)
    {
        //Vide, il sert uniquement a recevoir le contexte et à l'envoyer à la classe parent.
    }
}

```

La classe hérite de **BasePKUniqueRepo\<Categorie,int\>**, car il y a seulement une clé primaire et c'est un entier.

### CarteRepo

Créez l'interface **ICarteRepo**.

```csharp
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Interface qui contient les méthodes de communication avec la base de données pour la table Carte
/// </summary>
public interface ICarteRepo : IBasePKUniqueRepo<Carte, int>
{
}
```

Créez la classe **CarteRepo**.

```csharp
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;
using SuperCarte.EF.Data.Context;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Classe qui contient les méthodes de communication avec la base de données pour la table Carte
/// </summary>
public class CarteRepo : BasePKUniqueRepo<Carte, int>, ICarteRepo
{
    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="bd">Contexte de la base de données</param>
    public CarteRepo(SuperCarteContext bd) : base(bd)
    {
        //Vide, il sert uniquement a recevoir le contexte et à l'envoyer à la classe parent.
    }
}
```

La classe hérite de **BasePKUniqueRepo\<Carte,int\>**, car il y a seulement une clé primaire et c'est un entier.

### UtilisateurCarteRepo

Créez l'interface **IUtilisateurCarteRepoRepo**.

```csharp
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Interface qui contient les méthodes de communication avec la base de données pour la table Role
/// </summary>
public interface IUtilisateurCarteRepo : IBaseRepo<UtilisateurCarte>
{

}
```

Créez la classe **UtilisateurCarteRepoRepo**.

```csharp
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;
using SuperCarte.EF.Data.Context;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Classe qui contient les méthodes de communication avec la base de données pour la table UtilisateurCarte
/// </summary>
public class UtilisateurCarteRepo : BaseRepo<UtilisateurCarte>, IUtilisateurCarteRepo
{
    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="bd">Contexte de la base de données</param>
    public UtilisateurCarteRepo(SuperCarteContext bd) : base(bd)
    {
        //Vide, il sert uniquement a recevoir le contexte et à l'envoyer à la classe parent.
    }
}
```

La classe hérite de **BaseRepo\<UtilisateurCarte\>**, car elle n'a pas de clé primaire unique.

# Préparation du projet WPF

## Création du projet dans une solution existante

Il faut ajouter le projet **WPF** dans la solution.

Pour ce faire, sélectionnez la solution **SuperCarteApp** en haut de l'**Explorateur de solution** et choisissez **Ajouter -> Nouveau projet...** dans le menu contextuel.

Créez un projet de type **Application WPF**. Il est important **de ne pas choisir** la version **.NET Framework**.

- **Nom du projet** : SuperCarte.WPF
- **Infrastructure** : .NET 7

Ensuite, sélectionnez le projet **SuperCarte.WPF** en haut de l'**Explorateur de solution** et choisissez **Définir en tant que projet de démarrage** dans le menu contextuel.

## Ajout des dépendances de projet

Le projet **SuperCarte.WPF** aura besoin du projet **SuperCarte.EF** pour initialiser le contexte et **SuperCarte.Core**, car il utilisera des **services**.

Il faut l'ajouter dans les dépendances du projet.

Sélectionnez le dossier **Dépendances** du projet **SuperCarte.WPF** et choisissez **Ajouter une référence de projet** dans le menu contextuel.

Dans la fenêtre, il faut cocher **SuperCarte.EF** et **SuperCarte.Core**. Vous venez d'intégrer 2 librairies internes au projet.

## Fichier Usings.cs

Afin de réduire la taille des classes, les **using** qui seront beaucoup utilisés dans ce projet seront déclaré globalement.

Créez le fichier **Usings.cs** à la racine du projet **SuperCarte.WPF**.

```csharp
global using SuperCarte.WPF; //Les classes à la racine de l'application WPF
global using SuperCarte.EF.Data; //Les classes du modèle du contexte
global using SuperCarte.EF.Data.Context; // La classe du contexte
global using System;
global using System.Collections.Generic;
global using System.Threading.Tasks;
```

Au fur et à mesure que des classes s'ajouteront dans le projet, le fichier **Usings.cs** sera mis à jour.

Également, le fichier **Usings.cs** appartient uniquement au projet dans lequel il est créé.

## Fichier de configuration - appsettings.json

La librairie **Microsoft.Extensions.Configuration.Json** permet de lire un fichier de configuration en **json**.

Dans la **Console du Gestionnaire de package**, inscrivez cette ligne. Il est important que le **Projet par défaut** soit **SuperCarte.WPF** dans la console. La librairie s'installera dans le projet indiqué dans le champ **Projet par défaut**.

<img src="/4N1_2024/img/13_package_console_1.png"  />


```powershell
Install-Package Microsoft.Extensions.Configuration.Json
```

Créez le fichier **appsettings.json** à la racine du projet **SuperCarte.WPF**. Prenez le modèle **Fichier Texte**.

**IMPORTANT** : Pour que le fichier soit pris en compte par le compilateur, il faut indiquer dans ces propriétés qu'il doit être copié dans le dossier de compilation. Effectuez un **clic droit** sur le fichier **appsettings.json** et sélectionnez **Propriétés**. Pour le champ **Copier dans le répertoire de sortie**, il faut mettre la valeur **Copier si plus récent**.

<img src="/4N1_2024/img/12_appsettings_01.png"  />


Copiez ce code **json** dans le fichier.

Utilisez cette version si vous n'avez pas le message d'erreur du certificat **SSL**. Il faut également modifier le nom de la base de données pour celui que vous avez utilisé.

```powershell
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\SQLExpress;Database=eDA_4N1_SuperCarte;Trusted_Connection=True;"
  }
}
```

Utilisez cette version avec le paramètre **Trust Server Certificate=true;** si vous avez le message d'erreur du certificat **SSL**. Il faut également modifier le nom de la base de données pour celui que vous avez utilisé.

```csharp
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\SQLExpress;Database=eDA_4N1_SuperCarte;Trusted_Connection=True;Trust Server Certificate=true;"
  }
}
```

## Ajout de la structure pour injection des dépendances

Le projet **WPF** n'a pas de fichier **program.cs**. Ce type de projet n'est pas conçu à la base pour être dans la structure du **hosting** de **.Net Core**. Il faut donc l'adapter.

Le fichier de démarrage de l'application est **App.xaml.cs**. Il est inclus dans le fichier **App.xaml**.

Remarquez que la classe est **partial**. 

```csharp
public partial class App : Application
{
}
```

Une classe partielle en **.NET** consiste à créer une classe dans plusieurs fichiers. Le fichier **App.xaml** est aussi une classe, sauf que le langage est **XAML**.

```xaml
<Application x:Class="SuperCarte.WPF.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:SuperCarte.WPF"
             StartupUri="MainWindow.xaml">
    <Application.Resources>
         
    </Application.Resources>
</Application>
```

 À la ligne 1, le nom de la classe est indiqué.

C'est pour cette raison que le fichier **App.xaml.cs** est un sous-fichier de **App.xaml** dans l'**Explorateur de solutions**. Si la classe n'était pas partielle, il ne serait pas possible d'avoir 2 langages pour une même classe. La notion de classe partielle sert également à ajouter des fonctionnalités dans une classe générée automatiquement. Dans le **TP 2**, les classes du modèle sont **partial**. Il aurait été possible d'ajouter un 2e fichier interne pour ajouter des éléments à la classe de base.

À la ligne 5, c'est la fenêtre de démarrage. Pour une application **WPF**, la classe **App** est le conteneur des fenêtres. Une fenêtre est l'équivalent d'une page.

L'application **WPF** de ce projet sera comme un **SPA** ou une **Application à page unique**. Dans le cas d'une application native, il serait possible de dire un **SWA** pour une **Application à fenêtre unique**.

Les applications **à fenêtres multiples** sont de plus en plus rares, car de nombreux appareils ne sont pas en mesure de les gérer correctement. C'est une approche pour les systèmes d'exploitation ordinateur, comme **Windows** ou **macOS**, car ils sont en mesure de gérer le **multifenêtre**.

L'application aura seulement une seule fenêtre, le classe **MainWindow.xaml**. À l'intérieur de cette classe, il y aura un **conteneur** qui aura un **contrôle utilisateur (user contrôle)** qui s'occupera d'une vue spécifique. Ce conteneur changera de **contrôle utilisateur** lorsqu'une nouvelle vue devra être affichée. Il s'agit de la même méganique que Blazor ou Angular, mais pour une application native.

### Classes d'extension de méthodes

Comme pour le projet de **GestionPersonnage**, des extensions seront utilisées pour gérer l'enregistrement des dépendances.

Créez les dossiers **Extensions\ServiceCollections** à la racine du projet **SuperCarte.WPF**.

Créez la classe **SCRepositories.cs** dans le dossier.

Les **Repositories** sont déjà créés, alors il faut les ajouter dans l'enregistrement. Remarquez que la création est maintenant en **Scoped**. L'instance du **Repo** sera partagée entre les différents services qui l'utilisent.

```csharp
using Microsoft.Extensions.DependencyInjection;

namespace SuperCarte.WPF.Extensions.ServiceCollections;

/// <summary>
/// Classe d'extension qui permet d'enregistrer les classes de la catégorie Repository
/// </summary>
public static class SCRepositoryExtensions
{
    /// <summary>
    /// Méthode qui permet d'enregistrer les repositories de l'application
    /// </summary>
    /// <param name="services">La collection de services</param>
    public static void EnregistrerRepositories(this IServiceCollection services)
    {
        services.AddScoped<IRoleRepo, RoleRepo>();
        services.AddScoped<IEnsembleRepo, EnsembleRepo>();
        services.AddScoped<ICategorieRepo, CategorieRepo>();
        services.AddScoped<IUtilisateurRepo, UtilisateurRepo>();
        services.AddScoped<ICarteRepo, CarteRepo>();
        services.AddScoped<IUtilisateurCarteRepo, UtilisateurCarteRepo>();
    }
}
```

Créez la classe **SCServiceExtensions.cs** dans le dossier .

```csharp
using Microsoft.Extensions.DependencyInjection;

namespace SuperCarte.WPF.Extensions.ServiceCollections;

/// <summary>
/// Classe d'extension qui permet d'enregistrer les classes de la catégorie Service
/// </summary>
public static class SCServiceExtensions
{
    /// <summary>
    /// Méthode qui permet d'enregistrer les services de l'application
    /// </summary>
    /// <param name="services">La collection de services</param>
    public static void EnregistrerServices(this IServiceCollection services)
    {
                
    }
}
```

Créez la classe **SCValidateurExtensions.cs** dans le dossier . Cette classe s'occupera de l'enregistrement des **Validateurs**. Ce concept sera présenté dansun autre document.

```csharp
using Microsoft.Extensions.DependencyInjection;

namespace SuperCarte.WPF.Extensions.ServiceCollections;

/// <summary>
/// Classe d'extension qui permet d'enregistrer les classes de la catégorie Validateur
/// </summary>
public static class SCValidateurExtensions
{
    /// <summary>
    /// Méthode qui permet d'enregistrer les validateurs de l'application
    /// </summary>
    /// <param name="services">La collection de services</param>
    public static void EnregistrerValidateurs(this IServiceCollection services)
    {

    }
}
```

Créez la classe **SCViewModelExtensions.cs** dans le dossier . Cette classe s'occupera de l'enregistrement des **ViewModel**. Ce concept sera présenté dans le prochain document.

```csharp
using Microsoft.Extensions.DependencyInjection;

namespace SuperCarte.WPF.Extensions.ServiceCollections;

/// <summary>
/// Classe d'extension qui permet d'enregistrer les classes de la catégorie Service
/// </summary>
public static class SCViewModelExtensions
{
    /// <summary>
    /// Méthode qui permet d'enregistrer les ViewModels de l'application
    /// </summary>
    /// <param name="services">La collection de services</param>
    public static void EnregistrerViewModels(this IServiceCollection services)
    {

    }
}

```

### Création du Host - App.xaml.cs

Dans la **Console du Gestionnaire de package**, inscrivez cette ligne. Il est important que le **Projet par défaut** soit **SuperCarte.WPF** dans la console. La librairie s'installera dans le projet indiqué dans le champ **Projet par défaut**.

```
Install-Package Microsoft.Extensions.Hosting
```

Avec cette librairie, il sera possible de configurer l'application **WPF** avec le **hosting** d'application de **.NET Core**.

Copiez ce code dans le fichier **App.xaml.cs**.

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SuperCarte.WPF.Extensions.ServiceCollections;
using System.Windows;

namespace SuperCarte.WPF;
/// <summary>
/// Interaction logic for App.xaml
/// </summary>
public partial class App : Application
{
    private IHost? _host;

	public App()
	{
        var builder = Host.CreateDefaultBuilder();

        //Enregistrement des services
        builder.ConfigureServices((context, services) =>
        {            
            services.AddSingleton<MainWindow>(); //Fenêtre principale

            //Enregistrement du contexte    
            services.AddDbContext<SuperCarteContext>(options => options.UseSqlServer(context.Configuration.GetConnectionString("DefaultConnection")));

            //Appel des méthodes d'extension                        
            services.EnregistrerRepositories();
            services.EnregistrerServices();            
            services.EnregistrerValidateurs();
            services.EnregistrerViewModels();
        });

        _host = builder.Build();
    }

    /// <summary>
    /// Démarrage de l'application
    /// </summary>
    /// <param name="e"></param>
    protected override async void OnStartup(StartupEventArgs e)
    {
        await _host!.StartAsync();

        var fenetreInitiale = _host.Services.GetRequiredService<MainWindow>();
        fenetreInitiale.Show(); //Affiche la fenêtre initiale
        base.OnStartup(e);
    }

    /// <summary>
    /// Fermeture de l'application
    /// </summary>
    /// <param name="e"></param>
    protected override async void OnExit(ExitEventArgs e)
    {
        await _host!.StopAsync();
        base.OnExit(e);
    }
}
```

Voici le détail de la classe.

À la ligne 1 du bloc de code ci-dessous, il y a un attribut pour le **host** de l'application. Le **host**  doit être en attribut, car il sera utilisé dans plusieurs méthodes de la classe. 

Ensuite, le constructeur de la classe s'occupe de configurer le **host** comme il a été fait dans le fichier **Program.cs** de l'application console.

À la ligne 5, le constructeur par défaut du **host** est créé.

À la ligne 10, il faut enregistrer la fenêtre principale dans les dépendances de l'application.

À la ligne 13, le contexte est enregistré avec le fichier de configuration. 

Aux lignes 16 à 18, le service utilise les méthodes d'extension pour enregistrer les différents concepts.

À la ligne 21, le **host** est construit en fonction de la configuration initiale.

```csharp
private IHost? _host;

public App()
{
    var builder = Host.CreateDefaultBuilder();

    //Enregistrement des services
    builder.ConfigureServices((context, services) =>
    {            
        services.AddSingleton<MainWindow>(); //Fenêtre principale

        //Enregistrement du contexte    
        services.AddDbContext<SuperCarteContext>(options => options.UseSqlServer(context.Configuration.GetConnectionString("DefaultConnection")));

        //Appel des méthodes d'extension                        
        services.EnregistrerRepositories();
        services.EnregistrerServices();            
        services.EnregistrerValidateurs();
        services.EnregistrerViewModels();
    });

    _host = builder.Build();
}
```

La méthode **OnStartup()** est appelé au démarrage de l'application, après le constructeur. Elle démarre le **host** et ensuite indique au programme d'afficher la fenêtre principale de l'application.

```csharp
protected override async void OnStartup(StartupEventArgs e)
{
    await _host!.StartAsync();

    var fenetreInitiale = _host.Services.GetRequiredService<MainWindow>();
    fenetreInitiale.Show(); //Affiche la fenêtre initiale
    base.OnStartup(e);
}
```

Démarrez l'application. Il y a 2 fenêtres.

Ouvrez le fichier **App.xaml**.

```xaml
<Application x:Class="SuperCarte.WPF.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:SuperCarte.WPF"
             StartupUri="MainWindow.xaml">
    <Application.Resources>
         
    </Application.Resources>
</Application>
```

À la ligne 5, il y a la propriété **StartupUri**. Cette propriété indique également la fenêtre de démarrage. Il faut retirer cette propriété pour ne pas interférer avec l'injection de dépendances.

```xaml
<Application x:Class="SuperCarte.WPF.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:SuperCarte.WPF">
    <Application.Resources>
         
    </Application.Resources>
</Application>
```

Démarrez de nouveau l'application et il aura seulement une fenêtre.

## Hello World

Pour avoir un premier contenu visuel, il faut modifier le fichier **MainWindows.xaml**.

```xaml
<Window x:Class="SuperCarte.WPF.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:SuperCarte.WPF"
        mc:Ignorable="d"
        Title="Super Carte App" Height="450" Width="800">
    <Grid>
        <Label Content="Hello World!!!"></Label>
    </Grid>
</Window>
```

À la ligne 8, la propriété **Title** de la balise **\<Window\>** permet de mettre le titre de la fenêtre. 

À la ligne 10, il y a un **Label** pour afficher du texte statique.  L'intérieur de la balise **\<Grid\>**, c'est le contenu de la fenêtre.

# Annexe - Remove-Migration

Pour être en mesure de supprimer des migrations, il faut remettre la base de données à l'état correct.

Par exemple, voici 4 migrations.

```
CreationBD
AjoutTableUtilisateur
AjoutTableEnsemble -- Problématique
AjoutTableCategorie -- Correct

```

Il faut remettre la base de données à un état valide. Le dernier état valide est **AjoutTableUtilisateur**.

```powershell
Update-Database -StartupProject SuperCarte.EF -Migration AjoutTableUtilisateur
```

Ensuite, il faut utiliser la commande **Remove-Migration**. Cette commande enlève seulement la dernière migration. Il faudra l'exécuter 2 fois pour retirer la migration problématique.

Pour effacer **AjoutTableCategorie**

```
Remove-Migration -StartupProject SuperCarte.EF 
```

Pour effacer **AjoutTableEnsemble**

```
Remove-Migration -StartupProject SuperCarte.EF 
```

Malheureusement, la partie de **AjoutTableCategorie** doit être effacée, même si elle est valide.
