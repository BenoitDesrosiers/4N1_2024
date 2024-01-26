---
sidebar_position: 4
draft: true
---
# SuperCarte.Core

Dans la section précédente, nous avons créé la structure pour gérer la base de données associée à notre projet. Nous allons maintenant créer la logique du domaine de l'application. 

Il faut différencier les classes du modèle de données et du modèle du domaine. 

- **Modèle de données**
  - Il s'agit d'une classe qui représente une entité de la base de données. (Table ou Vue).
  - L'application ne doit pas travailler directement avec cette classe.
- **Modèle du domaine**
  - Il s'agit d'une classe qui représente un élément du domaine de l'application. Elle peut être très similaire à une classe du modèle de données, mais peut également contenir des champs de plusieurs tables et de la logique propre.
  - La logique applicative travaille avec la classe du modèle de domaine.
  - Le **Service** s'occupe de faire la transition (**mapping**) entre la classe du modèle de données et la classe du domaine du domaine.
  - Le **Repository** (ou dépôt) peut également utiliser les classes du domaine pour insérer les données de plusieurs tables dans un seul objet.

Ce projet introduira les classes de type **Service**, de type **Repository**, de type **Validateur** et les modèles du domaine.

Ces 


## Création du projet dans une solution existante


Créez un projet de type **Bibliothèque de classe**. 

:::warning attention
Il est important **de ne pas choisir** la version **.NET Framework**.
:::

- **Nom du projet** : SuperCarte.Core
- **Infrastructure** : .NET 7

Pour le champ **Solution**, indiquez d'**Ajouter à la solution** et gardez SuperCarteApp. 


Supprimez le fichier **Class1.cs**.

Créez un dossier **Models** à la racine du projet. Ce dossier contient les classes du modèle du domaine. 

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


## Généralisation du contexte

Les méthodes de base de la classe **DBContext** utilisent les types génériques. Il est donc possible de généraliser les requêtes de base et répétitives dans le **Repository**.

:::info
Revoir la section sur les types génériques dans l'introduction à C#
:::

Voici une liste de requêtes *classiques* qui sont généralement identiques.

- Obtenir tous les éléments de la table
- Ajouter un ou des éléments
- Supprimer un ou des éléments
- Modifier des éléments

Et une requête qui devra être traité séparément:
- Obtenir un enregistrement par sa clé

Créez le dossier **Bases** dans le dossier **Repositories**. Ce dossier contiendra les classes génériques de base.

L'injection de dépendances du **Repository** se fera par les interfaces. Il faut donc que les classes de base possèdent une interface.

### IBaseRepo

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


Pour chacune des méthodes, il y a le **TData** pour le type d'un paramètre ou pour le retour.

Également, l'application doit pouvoir fonctionner en **asynchrone**. Par convention en **C#**, une méthode **asynchrone** doit avoir le suffixe **Async**, mais ce n'est pas obligatoire. De plus, les méthodes doivent retourner un type **Task** ou **Task\<T\>**. L'explication du fonctionnement de l'asynchrone sera expliquée plus tard. Il faut également le méthode **synchrone**, car selon le cas d'utilisation, l'appel peut être obligatoirement synchrone.

### BaseRepo

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

La déclaration de la classe **public class BaseRepo\<TData\> : IBaseRepo\<TData\> where TData : class** doit également inclure le **\<TData\>**. Elle doit répliquer l'implémentation de l'interface avec la même contrainte **where**. Retirez le **where** et le compilateur indiquera que la classe est en erreur.

### Obtenir un enregistrement spécifique par sa clé

Une opération de base dans les opérations de la base de données est d'obtenir un enregistrement spécifique en fonction de sa clé primaire. Cette opération n'a pas été traitée jusqu'à maintenant. 

Mais quel est le nom, le type, et même la composition de la clé primaire?

Si toutes les tables avaient une clé unique de type entier s'appelant *id*, il serait simple de trouver la clé. 

Mais ce n'est pas le cas. 

- Pour le nom, au lieu de toujours utiliser *id*, nous avons utilisé la technique de nommer la clé primaire *NomDeLaTable* suivit de *id* (CarteId, UtilisateurId). 

- Pour le type, généralement c'est un int, mais ce n'est pas nécessairement toujours le cas. Certaine entité un une clé *naturelle* tel que le DA pour un étudiant. 

- Et finalement, certaines tables on une clé primaire composée.



```csharp title="NE PAS COPIER"
//Clé avec nom différent que id
Carte carte = _bd.CarteTb.Where(c => c.CarteId == carteId).FirstOrDefault();
Utilisateur utilisateur = _bd.UtilisateurTb.Where(c => c.UtilisateurId == utilisateurId).FirstOrDefault();

//Clé qui n'est pas un entier. DA est une string, car les DA peuvent débuter par 0, pour ceux qui ont été inscrits entre 2000 et 2009
Etudiant etudiant = _bd.EtudiantTb.Where(e => e.DA == da).FirstOrDefault();

//Clé composée
UtilisateurCarte utilisateurCarte = _bd.UtilisateurCarteTb.Where(uc => uc.CarteId == carteId && uc.utilisateurId == UtilisateurId).FirstOrDefault();
```

:::info
Remarquez ici que le nom des tables se termine par **Tb**. C'est donc le nom du **DbSet** dans **SuperCarteContext.cs**
:::


Est-ce possible de généraliser ceci ? Oui et non.

Le **contexte** possède une méthode **Find()** ou **FindAsync()**. Cette méthode permet de rechercher un enregistrement en fonction de sa clé primaire.

Cette méthode peut recevoir un **params object?[]? keyValues**. Le type est **object**, donc il peut recevoir une clé en **int**, en **string**, etc. selon le cas.

```csharp title="NE PAS COPIER"
//Clé avec nom différent
Carte carte = _bd.CarteTb.Find(carteId).FirstOrDefault();
Utilisateur utilisateur = _bd.UtilisateurTb.Find(utilisateurId).FirstOrDefault();

//Clé pas un entier. DA est une string, car les DA peuvent débuter par 0, pour ceux qui ont été inscrits entre 2000 et 2009
Etudiant etudiant = _bd.EtudiantTb.Find(da).FirstOrDefault();
```

Le mot-clé **params** permet d'ajouter des paramètres illimités (max réel de 65 535) à la méthode. Donc il est possible de faire **Find(1, "2", new DateTime(2022, 1, 3), 10.3m, true)** ou **Find(1, 2, 3)**.  En réalité, il faudrait envoyer un tableau **object[]** en paramètre, mais le mot-clé **params** permet de le créer lors de l'appel de la méthode en fusionnant les paramètres. Donc **Find(1, 2, 3)** est en réalité **Find(new object{1, 2, 3})**. Pour plus d'information pour le **params** https://learn.microsoft.com/fr-ca/dotnet/csharp/language-reference/keywords/params

Il est donc possible de récupérer un enregistrement qui a une clé primaire composée.

```csharp title="NE PAS COPIER"
UtilisateurCarte utilisateurCarte1 = _bd.UtilisateurCarteTb.Find(carteId, utilisateurId).FirstOrDefault();
UtilisateurCarte utilisateurCarte2 = _bd.UtilisateurCarteTb.Find(utilisateurId, carte).FirstOrDefault();
```

L'ordre des clés a-t-il son importance ? La réponse est **oui**. Lequel des 2 appels est la bonne ? Il faut retourner dans la méthode **OnModelCreating** du **contexte** pour voir dans quel ordre les clés ont été spécifiées.

```csharp title="NE PAS COPIER"
entity.HasKey(t => new { t.UtilisateurId, t.CarteId });
```

C'est donc **UtilisateurCarte utilisateurCarte2 = _bd.UtilisateurCarteTb.Find(utilisateurId, carte).FirstOrDefault();** qui serait la bonne. Il est possible de généraliser la méthode **Find** dans **BaseRepo**, mais il faudrait s'assurer de sa bonne utilisation.

La classe **BaseRepo** générique ne permettra donc pas la gestion des clés multiples, car la validation de l'ordre des clés primaires risque de provoquer des erreurs. Ce sera une méthode spécifique pour les tables qui ont une clé primaire composée (tel que **UtilisateurCarte**).

La méthode générique ressemblerait à celle-ci.

```csharp title="NE PAS COPIER"
public Task<TData?> ObtenirParCleAsync(int id)
{
	return await _bd.FindAsync<TData>(id);
}
```

Il y a 1 problème dans cette méthode. Elle fonctionne uniquement pour une clé primaire qui est un **entier**.

Mais le nombre de types génériques d'une classe n'est pas limité à 1. Il suffit de mettre une virgule dans le **\<>** pour ajouter des types génériques, par exemple  **\<T1, T2, T3, T4>**. Ici nous avons **TData** et **TCleprimaire**. Lorsqu'il y a plusieurs types génériques, il est important de les nommer avec un nom significatif.

```csharp title="NE PAS COPIER"
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

 

**TClePrimaire** sert uniquement pour le paramètre des méthodes **ObtenirParCleAsync()** et **ObtenirParCle**.

Mais est-ce BaseRepo est le bon endroit pour mettre cette méthode ? Que devra-t-il être spécifié pour la table **UtilisateurCarte** ? Dans le cas ci-dessous, ce sera **int**, mais si le programmeur utilise quand même la méthode **ObtenirParCleAsync()**, il y aura une exception car cette table nécessite 2 clés (l'id de la carte et l'id de l'utilisateur).

```csharp title="NE PAS COPIER"
var utilisateurCarteRepo BaseRepo<UtilisateurCarte>();

//La valeur 1 est-ce carteId ou utilisateurId ???
utilisateurCarteRepo.ObtenirParCleAsync(1); //Il y aura une exception "System.ArgumentException : 
    'Entity type 'UtilisateurCarte' is defined with a 2-part composite key, 
    but 1 values were passed to the 'Find' method.'"
```

Cette approche va contre un des principes **SOLID**. Il s'agit du **L ([Liskov substitution](https://fr.wikipedia.org/wiki/Principe_de_substitution_de_Liskov))**. Il ne s'applique pas nécessairement au type générique dans sa définition pure, mais l'idée est tout de même respectée. Ce principe consiste au fait qu'une classe de base doit fonctionner pour tous les types de données. Il ne doit pas avoir de méthode disponible dans une classe pour laquelle le programmeur sait qu'un cas particulier va générer une exception si elle est utilisée. Donc par conception, le programmeur concepteur sait que la méthode **ObtenirParCleAsync()** va générer une exception pour le modèle de données **UtilisateurCarte**. Le programmeur qui n'est pas concepteur et qui voit cette méthode disponible, ne saura pas nécessairement qu'il ne peut pas l'utiliser, d'où l'importance de respecter le **L** de **SOLID**.

La solution a ce problème est de créer une classe de base intermédiaire qui servira pour les classes ayant une clé unique. Les classes ayant des clés composées hériteront directement de **BaseRepo**, mais devront redéfinir les méthodes pour obtenir un enregistrement par sa clé. 


Créez l'interface **IBasePKUniqueRepo** dans le dossier **Repositories\Bases**.

```csharp title="Bonne solution"
namespace SuperCarte.Core.Repositories.Bases;

/// <summary>
/// Interface générique qui contient les opérations de base des tables de la base
/// de données pour une table à clé primaire unique
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
/// Classe abstraite générique qui contient les opérations de base des tables 
/// de la base de données pour une table à clé primaire unique
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

La classe a 2 méthodes spécifiques aux tables avec une clé primaire unique. Il est possible d'obtenir un item à partir de sa clé primaire et de le supprimer. Il y a la version **synchrone** et **asynchrone**.

## Repository non standard - Théorie
<!-- questions -->
Pour utiliser un **Repository** générique tel que **IBasePKUniqueRepo**, il faut l'injecter comme ceci. Voici l'exemple pour **Carte**.

```csharp title="Ne pas copier"
public class CarteService
{
	private readonly IBasePKUniqueRepo<Carte, int> _baseRepoCarte;
    
	public CarteService(IBasePKUniqueRepo<Carte, int> baseRepoCarte)
	{
		_baseRepoCarte = baseRepoCarte;
	}
}
```

Par contre, il est facile d'imaginer que le logiciel doive obtenir les cartes qui ont plus qu'un certain nombre de vies, il faudra donc une requête spécifique dans le repository pour y répondre. 

Il sera donc nécessaire de créer la classe **CarteRepo** afin de répondre à cette requête spécifique (**ObtenirListeParPointVieMin()**).

Il y a 2 options. 

- Option 1: Créer un deuxième type de Repository pour répondre à cette question spécifiquement.


  Voici l'interface et la classe de ce nouveau type de repository:

  ```csharp title="CE N'EST PAS LA MÉTHODE RECOMMANDÉE DANS LE COURS"
  public interface ICarteRepo
  {
  	List<Carte> ObtenirListeParPointVieMin(int vie);
  }
  
  public class CarteRepo : ICarteRepo
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

:::info
Notez que ICarteRepo n'hérite pas de IBaseRepo.
:::

  Pour les modèles qui nécessitent des requêtes spécifiques, il est possible d'injecter les 2 **Repositories** dans le **Service** de la façon suivante.

  ```csharp title="CE N'EST PAS LA MÉTHODE RECOMMANDÉE DANS LE COURS"
  public class CarteService
  {
  	private readonly IBaseRepo<Carte> _carteBaseRepo;
  	private readonly ICarteRepo _carteSpecificRepo;
      
  	public CarteService(IBaseRepo<Carte> _carteBaseRepo, 
                        ICarteRepo _carteSpecificRepo)
  	{
  		_carteBaseRepo = carteBaseRepo;
  		_carteSpecificRepo = carteSpecificRepo;
  	}
  }
  ```

  

- Option 2: Hériter de **IBasePKUniqueRepo**.

  Il y aurait seulement un Repository. Le Repository spécifique hériterait du Repository générique de base.

  Voici l'interface et la classe du Repository spécifique.

  ```csharp title="MÉTHODE RECOMMANDÉE DANS LE COURS"
  public interface ICarteRepo : IBasePKUniqueRepo<Carte,int>
  {
  	List<Carte> ObtenirListeParPointVieMin(int vie);
  }
  
  public class CarteRepo : BasePKUniqueRepo<Carte,int>, ICarteRepo
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

  ```csharp title="MÉTHODE RECOMMANDÉE DANS LE COURS"
  public class CarteService
  {
  	private readonly ICarteRepo _carteRepo;
      
  	public CarteService(ICarteRepo _carteRepo)
  	{
  		_carteRepo = carteRepo;
  	}
  }
  ```

  

Les 2 approches ont leurs avantages et leurs inconvénients.

L'approche par héritage permet d'avoir un seul Repository qui contient toutes les méthodes nécessaires à l'entité. Par contre, ce n'est pas tous les Repository qui nécessitent des requêtes spécifiques. Dans une approche standardisée, il pourrait être exigé au programmeur de créer des classes spécifiques, même s'il n'y a pas de requête spécifique. 

Dans une approche non standardisée, il faudrait injecter le BaseRepo\<TData\> dans le service lorsqu'il n'y a pas de requêtes spécifiques. Si un jour, il faut ajouter une requête spécifique, il faut créer le Repository spécifique et modifier tous les services qui utilisaient le Repository de base. Ceci peut demander beaucoup de refactorisation. 

<!-- Questions expliquer derniere ligne de ce paragraphe -->
L'approche avec 2 Repositories a l'avantage de créer uniquement un Repository spécialisé lorsque nécessaire. Par contre, le programmeur doit basculer d'un Repository à l'autre selon le contexte. Aussi, à chaque fois qu'il faut injecter le Repository de base, il faut s'assurer de spécifier le type de la bonne clé primaire. Rien n'empêche également d'injecter la mauvaise classe de base, par exemple BaseRepo\<Carte\>.

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
	//highlight-next-line
    public RoleRepo(SuperCarteContext bd) : base(bd)
	{
        //Vide, il sert uniquement a recevoir le contexte et à l'envoyer à la classe parent.
    }
}
```

La classe hérite de **BasePKUniqueRepo\<Role,int>**, car il y a seulement une clé primaire et c'est un entier.

:::info Rappel
Rappellez-vous que **base(bd)** indique d'envoyer bd au constructeur de la superclasse; ici c'est **BasePKUniqueRepo** qui l'enverra à **BaseRepo**. 
:::

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

Créez l'interface **IUtilisateurCarteRepo**.

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

Créez la classe **UtilisateurCarteRepo**.

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

