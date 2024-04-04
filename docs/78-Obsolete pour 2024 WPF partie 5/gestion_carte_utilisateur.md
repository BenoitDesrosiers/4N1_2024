---
sidebar_position: 510
draft: true
---

# Gestion des cartes de l'utilisateur

<!-- La section 5 n'est pas présentée en 2024 -->
Dans cette section, vous allez créer la fenêtre de gestion pour assigner des cartes à l'utilisateur connecté (table UtilisateurCarte).

La gestion des cartes pour l'utilisateur doit utiliser la table pivot **UtilisateurCarte**. Cette table représente une relation plusieurs à plusieurs.

Il existe plusieurs types de vue pour faire la fenêtre de gestion pour une table pivot. 

Il serait possible de sélectionner les cartes au moment de créer ou modifier un utilisateur. Ou à l'inverse, lorsqu'on crée ou modifie un carte on sélectionnerai les utilisateurs. Ce type de vue consiste en une gestion pure **plusieurs à plusieurs**. Ce type de vue et un peu plus complexe à créer et elles ne sont pas toujours pertinentes. 

Dans cette application, la gestion de l'utilisateur est faite par l'administrateur et c'est l'utilisateur qui gère sa librairie de cartes. Il faut donc une autre approche.

Une autre approche est de partir d'une clé fixe de référence et de faire la sélection des autres clés en même temps. Dans cette application, il s'agirait de prendre l'utilisateur connecté comme clé fixe. Lorsque la table pivot n'a pas de champ propre, l'utilisation d'une **CheckedListBox** peut faire le travail. Dans le cas de ce projet, il faut indiquer la quantité. Ce qui nécessite qu'il faut indiquer pour chacune des cartes sa quantité dans le **CheckedListBox**.

Finalement la dernière approche est de transformer la relation **plusieurs à plusieurs** en une relation **1 à plusieurs** au niveau de la vue. Il faut également partir d'une clé fixe de référence, mais la gestion se fera pour un seul élément à la fois. La vue utilisera un **ComboBox** pour sélectionner la 2e clé. Il est important d'avoir une mécanique qui s'assure que la 2e clé ne peut pas être modifiée lorsqu'il s'agit d'une modification. Lors d'un ajout, il faut s'assurer de ne pas sélectionner une clé existante. Ce type de fenêtre demande plus d'étapes à l'utilisateur, mais la fenêtre est généralement plus simple pour l'utilisateur et pour le programmeur.

Pour ce projet et le **TP 3**, ce sera la 3e technique qui sera utilisée. Afin de rendre le **ComboBox** plus intéressant, il faudra proposer à l'utilisateur uniquement les cartes disponibles, c'est-à-dire celles qui ne se trouvent pas dans la table **UtilisateurCarte** pour l'utilisateur en question. Il faudra tout de même faire la validation que la carte utilisée n'a pas déjà été utilisée lors d'un ajout. Lorsque la vue est pour une modification, il faut que le **ComboBox** soit désactivé pour empêcher la modification.

## SuperCarte.Core

### Création du modèle du domaine - UtilisateurCarteModel

Il faut un modèle du domaine pour permettre la gestion.

Créez la classe **UtilisateurCarteModel** ci-dessous dans le dossier **Models**.

```csharp showLineNumbers
namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient l'information d'une carte d'un utilisateur
/// </summary>
public class UtilisateurCarteModel
{
    public int UtilisateurId { get; set; }
    public int CarteId { get; set; }
    public short Quantite { get; set; }
}
```

### Méthode d'extension - UtilisateurCarteMapExtension

Ces méthodes seront utiles pour faire les conversions entre l'objet du domaine et de l'objet de données.

Créez la classe **UtilisateurCarteMapExtension** dans le dossier **Extensions**.

```csharp showLineNumbers
using SuperCarte.Core.Models;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Extensions;

/// <summary>
/// Classe statique qui regroupe les méthodes d'extension pour la conversion (mapping) du modèle UtilisateurCarte
/// </summary>
public static class UtilisateurCarteMapExtension
{
    /// <summary>
    /// Convertir un objet UtilisateurCarte vers un objet UtilisateurCarteModel
    /// </summary>
    /// <param name="item">Objet à convertir</param>
    /// <returns>Objet converti</returns>
    public static UtilisateurCarteModel VersUtilisateurCarteModel(this UtilisateurCarte item)
    {
        return new UtilisateurCarteModel()
        {
            UtilisateurId = item.UtilisateurId,
            CarteId = item.CarteId,
            Quantite = item.Quantite
        };
    }

    /// <summary>
    /// Convertir un objet UtilisateurCarteModel vers un objet UtilisateurCarte
    /// </summary>
    /// <param name="item">Objet à convertir</param>
    /// <returns>Objet converti</returns>
    public static UtilisateurCarte VersUtilisateurCarte(this UtilisateurCarteModel item)
    {
        return new UtilisateurCarte()
        {
            UtilisateurId = item.UtilisateurId,
            CarteId = item.CarteId,
            Quantite = item.Quantite
        };
    }

    /// <summary>
    /// Méthode qui copie les valeurs des propriétés de l'objet de donnée UtilisateurCarte dans l'objet du modèle UtilisateurCarteModel
    /// </summary>
    /// <param name="itemDestination">UtilisateurCarteModel à recevoir la copie (destination)</param>
    /// <param name="utilisateurCarteSource">L'objet UtilisateurCarte de référence pour la copie (source)</param>
    /// <param name="copierClePrimaire">Copier de la clé primaire</param>
    public static void Copie(this UtilisateurCarteModel itemDestination, UtilisateurCarte utilisateurCarteSource, bool copierClePrimaire)
    {
        if (copierClePrimaire == true)
        {
            itemDestination.UtilisateurId = utilisateurCarteSource.UtilisateurId;
            itemDestination.CarteId = utilisateurCarteSource.CarteId;
        }

        itemDestination.Quantite = utilisateurCarteSource.Quantite;
    }

    /// <summary>
    /// Méthode qui copie les valeurs des propriétés du UtilisateurCarteModel dans l'objet de donnée UtilisateurCarte
    /// </summary>
    /// <param name="itemDestination">UtilisateurCarte à recevoir la copie (destination)</param>
    /// <param name="utilisateurCarteModelSource">L'objet UtilisateurCarteModel de référence pour la copie (source)</param>
    /// <param name="ignoreClePrimaire">Ignore la copie de la clé primaire</param>
    public static void Copie(this UtilisateurCarte itemDestination, UtilisateurCarteModel utilisateurCarteModelSource, bool ignoreClePrimaire = true)
    {
        if (ignoreClePrimaire == true)
        {
            itemDestination.UtilisateurId = utilisateurCarteModelSource.UtilisateurId;
            itemDestination.CarteId = utilisateurCarteModelSource.CarteId;
        }

        itemDestination.Quantite = utilisateurCarteModelSource.Quantite;
    }
}
```

### Requête ObtenirParCle - UtilisateurCarteRepo

Il faut ajouter la requête **ObtenirParCle** synchrone et asynchrone.

La classe **UtilisateurCarteRepo** n'hérite pas de **BasePKUniqueRepo**, car c'est une table avec 2 clés primaires. Il faut donc créer cette méthode spécifiquement dans la classe **UtilisateurCarteRepo**.

Dans l'interface **IUtilisateurCarteRepo**,  ajoutez les méthodes ci-dessous.

```csharp showLineNumbers
/// <summary>
/// Obtenir un UtilisateurCarte spécifique en fonction de sa clé primaire en asynchrone.
/// </summary>
/// <param name="utilisateurId">Clé primaire de l'utilisateur</param>
/// <param name="carteId">Clé primaire de la carte</param>
/// <returns>L'enregistrement UtilisateurCarte ou null si non trouvé</returns>
Task<UtilisateurCarte?> ObtenirParCleAsync(int utilisateurId, int carteId);

/// <summary>
/// Obtenir un UtilisateurCarte spécifique en fonction de sa clé primaire.
/// </summary>
/// <param name="utilisateurId">Clé primaire de l'utilisateur</param>
/// <param name="carteId">Clé primaire de la carte</param>
/// <returns>L'enregistrement UtilisateurCarte ou null si non trouvé</returns>
UtilisateurCarte? ObtenirParCle(int utilisateurId, int carteId);
```

Dans la classe **UtilisateurCarteRepo**, ajoutez les méthodes ci-dessous.

```csharp showLineNumbers
public async Task<UtilisateurCarte?> ObtenirParCleAsync(int utilisateurId, int carteId)
{
    return await (from lqUtilisateurCarte in _bd.UtilisateurCarteTb
                  where
                       lqUtilisateurCarte.UtilisateurId == utilisateurId &&
                       lqUtilisateurCarte.CarteId == carteId
                  select
                    lqUtilisateurCarte).FirstOrDefaultAsync();
}

public UtilisateurCarte? ObtenirParCle(int utilisateurId, int carteId)
{
    return (from lqUtilisateurCarte in _bd.UtilisateurCarteTb
            where
                 lqUtilisateurCarte.UtilisateurId == utilisateurId &&
                 lqUtilisateurCarte.CarteId == carteId
            select
              lqUtilisateurCarte).FirstOrDefault();
}
```

### Requête ObtenirCartesDisponibles - UtilisateurCarteRepo

Il faut faire une requête pour obtenir les cartes disponibles pour un utilisateur.

Pour faire cette requête, il faut utiliser la théorie des ensembles. Il faut faire la différence entre la liste de cartes de la table **Cartes** et la liste des cartes de la table **UtilisateurCarte**. La différence correspond aux cartes non utilisées par l'utilisateur, donc celles qui sont disponibles.

Voici la requête **SQL** pour faire une différence entre 2 projections (**SELECT**). Le mot-clé **EXCEPT** permet de faire une différence.

```sql
SELECT Carte1.* FROM Carte Carte1
EXCEPT
SELECT Carte2.* FROM UtilisateurCarte
INNER JOIN Carte Carte2 ON UtilisateurCarte.CarteId = Carte2.CarteId
WHERE UtilisateurCarte.UtilisateurId = @utilisateurId
```

L'ordre des **SELECT** est important pour une différence dans la théorie des ensembles. Le premier **SELECT** correspond à la liste complète et le deuxième **SELECT** correspond à la liste à soustraire.

Il faut convertir cette requête en **LINQ**.

Voici une première proposition, mais celle-ci n'est pas optimale. C'est la plus intuitive.

```csharp showLineNumbers
var lstCarte = _bd.CarteTb.ToList();

var lstCarteUtilisateur = _bd.UtilisateurCarteTb.Where(uc => uc.UtilisateurId == utilisateurId)
        .Select(uc => uc.Carte).ToList();

var lstCarteDisponible = lstCarte.Except(lstCarteUtilisateur);
```

Cette approche effectue 2 communications avec la base de données et la différence se fait dans la mémoire de l'application. Si le nombre d'enregistrements est très grand dans les 2 tables, mais que la différence est très petite, le délai de transmission entre l'application et la base de données sera plus long. 

Il est donc préférable de faire une requête **LINQ** qui génèrera la requête **SQL** plus haut. Il n'y aura pas de différence notable entre les 2 approches, mais celle-ci sera plus performante, car le serveur de la base de données va effectuer la différence et que la quantité de données sera plus petite.

Avec **LINQ**, il est possible de créer une partie de requête sans l'exécuter avec le serveur de la base de données. Cette technique permet d'ajouter des comportements en fonction de choix ou de mieux segmenter une requête complexe. La requête s'exécute avec la base de données lorsque la méthode **`.FirstOrDefault()` ** ou **`.ToList()`** est appelée.

Voici comment séparer la requête en plusieurs étapes.

```csharp showLineNumbers
var reqListeCartes = from lqCarte in _bd.CarteTb
                	 select lqCarte;

var reqListeCartesUtilisateur =
	from lqUtilisateurCarte in _bd.UtilisateurCarteTb
	where
		lqUtilisateurCarte.UtilisateurId == utilisateurId
	select
		lqUtilisateurCarte.Carte;

List<Carte> lstCarteDisponible = reqListeCartes.Except(reqListeCartesUtilisateur).ToList();
```

Le préfixe **req** est utilisé pour la variable pour indiquer que c'est une requête. Le type du **var** est un **`IQueryable<Carte>`**. Ce type est pour indiquer que la requête retournera un élément de type **Carte**. L'exécution se fait réellement à la ligne 11, car c'est sur cette ligne que le **`.ToList()`** est exécuté.

La requête **SQL** générée par **Entity Framework** est celle-ci.

```sql
SELECT [c].[CarteId], [c].[Armure], [c].[Attaque], [c].[CategorieId], [c].[EnsembleId], [c].[EstRare], [c].[Nom], [c].[PrixRevente], [c].[Vie]
      FROM [Carte] AS [c]
      EXCEPT
      SELECT [c0].[CarteId], [c0].[Armure], [c0].[Attaque], [c0].[CategorieId], [c0].[EnsembleId], [c0].[EstRare], [c0].[Nom], [c0].[PrixRevente], [c0].[Vie]
      FROM [UtilisateurCarte] AS [u]
      INNER JOIN [Carte] AS [c0] ON [u].[CarteId] = [c0].[CarteId]
      WHERE [u].[UtilisateurId] = @__utilisateurId_0
```

La liste des cartes disponibles sera utilisée par un **ComboBox**. Il faut donc retourner un **`ListeItem<int>`**.

Dans l'interface **IUtilisateurCarteRepo**, ajoutez la méthode ci-dessous.

```csharp showLineNumbers
/// <summary>
/// Obtenir la liste des cartes disponibles pour un utilisateur dans un objet ListeItem
/// </summary>
/// <returns>Liste des cartes disponible pour un utilisateur dans un ListeItem</returns>
List<ListeItem<int>> ObtenirCartesDisponibles(int utilisateurId);
```

Dans la classe **UtilisateurCarteRepo**, ajoutez la méthode ci-dessous.

La requête qui est exécutée à la base de données retourne une liste de **`ListeItem<int>`**. Le texte de cette liste a plusieurs éléments de la définition de la carte pour faciliter la différenciation.

```csharp showLineNumbers
public List<ListeItem<int>> ObtenirCartesDisponibles(int utilisateurId)
{
    //Requête pour avoir la liste complète des cartes
    var reqListeCartes = from lqCarte in _bd.CarteTb
                         select lqCarte;

    //Requête pour avoir la liste des cartes de l'utilisateur
    var reqListeCartesUtilisateur =
        from lqUtilisateurCarte in _bd.UtilisateurCarteTb
        where
            lqUtilisateurCarte.UtilisateurId == utilisateurId
        select
            lqUtilisateurCarte.Carte;

    //Différence entre les 2 listes
    return (from lqCarte in reqListeCartes.Except(reqListeCartesUtilisateur)
            select
                new ListeItem<int>()
                {
                    Valeur = lqCarte.CarteId,
                    Texte = $"{lqCarte.Nom} ({lqCarte.Categorie.Nom}) ({lqCarte.Ensemble.Nom})"
                }).ToList();        
}
```

## Méthodes du service - UtilisateurCarteService

Il faut ajouter les méthodes nouvelles méthodes du **Repository**, la méthode d'ajout, la méthode de modification et finalement la méthode de validation.

Modifiez l'interface **IUtilisateurCarteService** avec le code ci-dessous.

```csharp showLineNumbers
using SuperCarte.Core.Models;

namespace SuperCarte.Core.Services;

/// <summary>
/// Interface qui contient les services du modèle UtilisateurCarte
/// </summary>
public interface IUtilisateurCarteService
{
    /// <summary>
    /// Obtenir la liste des cartes d'un utilisateur avec sa quantité en asynchrone.
    /// La liste est triée par le nom de la catégorie et ensuite par le nom de la carte.
    /// </summary>
    /// <param name="utilisateurId">La clé de l'utilisateur</param>
    /// <returns>Liste des cartes avec la quantité</returns>
    Task<List<QuantiteCarteDetailModel>> ObtenirCartesUtilisateurAsync(int utilisateurId);

    /// <summary>
    /// Obtenir un UtilisateurCarteModel spécifique en fonction de sa clé primaire en asynchrone.
    /// </summary>
    /// <param name="utilisateurId">Clé primaire de l'utilisateur</param>
    /// <param name="carteId">Clé primaire de la carte</param>
    /// <returns>L'enregistrement UtilisateurCarteModel ou null si non trouvé</returns>
    Task<UtilisateurCarteModel?> ObtenirAsync(int utilisateurId, int carteId);

    /// <summary>
    /// Obtenir un UtilisateurCarteModel spécifique en fonction de sa clé primaire.
    /// </summary>
    /// <param name="utilisateurId">Clé primaire de l'utilisateur</param>
    /// <param name="carteId">Clé primaire de la carte</param>
    /// <returns>L'enregistrement UtilisateurCarteModel ou null si non trouvé</returns>
    UtilisateurCarteModel? Obtenir(int utilisateurId, int carteId);

    /// <summary>
    /// Obtenir la liste des cartes disponibles pour un utilisateur dans un objet ListeItem
    /// </summary>
    /// <returns>Liste des cartes disponible pour un utilisateur dans un ListeItem</returns>
    List<ListeItem<int>> ObtenirCartesDisponibles(int utilisateurId);

    /// <summary>
    /// Ajouter une carte à un utilisateur en asynchrone.
    /// </summary>
    /// <param name="utilisateurCarteModel">UtilisateurCarte à ajouter</param>     
    /// <returns>Vrai si ajoutée, faux si non ajoutée</returns>
    Task<bool> AjouterAsync(UtilisateurCarteModel utilisateurCarteModel);

    /// <summary>
    /// Modifier une carte à un utilisateur en asynchrone.
    /// </summary>
    /// <param name="utilisateurCarteModel">UtilisateurCarte à modifier</param>     
    /// <returns>Vrai si ajoutée, faux si non ajoutée</returns>
    Task<bool> ModifierAsync(UtilisateurCarteModel utilisateurCarteModel);

    /// <summary>
    /// Valider le modèle
    /// </summary>
    /// <param name="utilisateurCarteModel">UtilisateurCarteModel à valider</param>
    /// <param name="validerPourAjout">Valider pour un ajout d'un nouvel item</param>
    /// <returns>Résultat de validation</returns>
    Task<ValidationModel> ValiderAsync(UtilisateurCarteModel utilisateurCarteModel, bool validerPourAjout);
}
```

Modifiez la classe **UtilisateurCarteService** avec le code ci-dessous.

Pour cette première étape, la méthode de validation retournera toujours un objet valide (97). Il y a des éléments spécifiques à la validation qu'ils seront présentés dans leur propre section.

```csharp showLineNumbers
using SuperCarte.Core.Extensions;
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;
using SuperCarte.Core.Validateurs;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Services;

/// <summary>
/// Classe qui contient les services du modèle UtilisateurCarte
/// </summary>
public class UtilisateurCarteService : IUtilisateurCarteService
{
    private readonly IUtilisateurCarteRepo _utilisateurCarteRepo;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="utilisateurCarteRepo">Repository UtilisateurCarte</param>
    public UtilisateurCarteService(IUtilisateurCarteRepo utilisateurCarteRepo)
	{
        _utilisateurCarteRepo = utilisateurCarteRepo;
    }

    public async Task<List<QuantiteCarteDetailModel>> ObtenirCartesUtilisateurAsync(int utilisateurId)
    {
        return await _utilisateurCarteRepo.ObtenirCartesUtilisateurAsync(utilisateurId);
    }

    public async Task<UtilisateurCarteModel?> ObtenirAsync(int utilisateurId, int carteId)
    {
        UtilisateurCarte? utilisateurCarte = await _utilisateurCarteRepo.ObtenirParCleAsync(utilisateurId, carteId);

        return utilisateurCarte?.VersUtilisateurCarteModel();
    }

    public UtilisateurCarteModel? Obtenir(int utilisateurId, int carteId)
    {
        UtilisateurCarte? utilisateurCarte = _utilisateurCarteRepo.ObtenirParCle(utilisateurId, carteId);

        return utilisateurCarte?.VersUtilisateurCarteModel();
    }

    public List<ListeItem<int>> ObtenirCartesDisponibles(int utilisateurId)
    {
        return _utilisateurCarteRepo.ObtenirCartesDisponibles(utilisateurId);
    }

    public async Task<bool> AjouterAsync(UtilisateurCarteModel utilisateurCarteModel)
    {
        if ((await ValiderAsync(utilisateurCarteModel, true)).EstValide == true)
        {
            //Transformation de l'objet du modèle du domaine en objet du modèle de données
            UtilisateurCarte utilisateurCarte = utilisateurCarteModel.VersUtilisateurCarte();

            //Ajout dans repository avec enregistrement immédiat
            await _utilisateurCarteRepo.AjouterAsync(utilisateurCarte, true);

            utilisateurCarteModel.Copie(utilisateurCarte, false);

            return true;
        }
        else
        {
            return false;
        }
    }

    public async Task<bool> ModifierAsync(UtilisateurCarteModel utilisateurCarteModel)
    {
        if ((await ValiderAsync(utilisateurCarteModel, false)).EstValide == true)
        {
            UtilisateurCarte? utilisateurCarte =
                await _utilisateurCarteRepo.ObtenirParCleAsync(utilisateurCarteModel.UtilisateurId,
                    utilisateurCarteModel.CarteId);

            if (utilisateurCarte != null)
            {
                //Assigner les valeurs dans le UtilisateurCarte
                utilisateurCarte.Copie(utilisateurCarteModel);

                await _utilisateurCarteRepo.EnregistrerAsync();

                //Assigne les valeurs de la base de données dans l'objet du modèle
                utilisateurCarteModel.Copie(utilisateurCarte, false);
            }
            else
            {
                throw new Exception("Impossible de modifier l'item UtilisateurCarte. Aucun UtilisateurCarte trouvé avec la clé primaire.");
            }

            return true;
        }
        else
        {
            return false;
        }
    }

    public async Task<ValidationModel> ValiderAsync(UtilisateurCarteModel utilisateurCarteModel, bool validerPourAjout)
    {
        return await Task.FromResult(new ValidationModel());
    }
}
```

## SuperCarte.WPF

### Création du ViewModel - GestionMesCartesVM

Créez la classe **GestionMesCartesVM**.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.Input;

namespace SuperCarte.WPF.ViewModels;

/// <summary>
/// ViewModel de la vue Gestion MesCartes
/// </summary>
public class GestionMesCartesVM : BaseParametreVM<int>
{
    #region Attributs
    private readonly string[] _rolesAutorises = { "Administrateur", "Utilisateur" };
    private int _carteIdCle;
    #endregion

    #region Dépendances
    private readonly IAuthentificateur _authentificateur;
    private readonly INotification _notification;
    private readonly IUtilisateurCarteService _utilisateurCarteService;
    #endregion

    #region Attributs des propriétés
    private int _carteId;
    private short _quantite;
    private List<ListeItem<int>> _lstCartesDisponibles = new List<ListeItem<int>>();
    private bool _estEnTravail = false;
    private bool _champsModifiables = true;
    #endregion

    /// <summary>
    /// Constructeur
    /// </summary>    
    /// <param name="authentificateur">La classe d'assistance d'authentification</param>
    /// <param name="notification">La classe d'assistance pour la notification</param>
    /// <param name="utilisateurCarteService">Le service du modèle UtilisateurCarte</param>
    public GestionMesCartesVM(IAuthentificateur authentificateur, INotification notification,
        IUtilisateurCarteService utilisateurCarteService)
    {
        _authentificateur = authentificateur;
        _notification = notification;

        if (_authentificateur.EstAutorise(_rolesAutorises))
        {
            _utilisateurCarteService = utilisateurCarteService;

            EnregistrerCommande = new AsyncRelayCommand(EnregistrerAsync, () => !EstEnTravail);
            ObtenirCommande = new AsyncRelayCommand(ObtenirAsync, () => !EstEnTravail);
            NouveauCommande = new RelayCommand(Nouveau, () => !EstEnTravail);
        }
        else
        {
            _notification.MessageErreur("Accès non autorisé.", "Vous n'avez pas accès à cette vue.");
        }
    }

    #region Méthodes d'assignation
    /// <summary>
    /// Assigner les propriétés liées du ViewModel vers les propriétés du modèle
    /// </summary>
    /// <returns>Objet du modèle</returns>
    private UtilisateurCarteModel VersModele()
    {
        return new UtilisateurCarteModel
        {
            UtilisateurId = _authentificateur.UtilisateurAuthentifie!.UtilisateurId,
            //Si la clé est 0, il faut prendre celle sélectionnée par l'utilisateur, sinon il faut prendre celle reçue en paramètre
            CarteId = (this.CarteIdCle == 0 ? this.CarteId : this.CarteIdCle),
            Quantite = this.Quantite
        };
    }

    /// <summary>
    /// Assigner les propriétés du modèle vers les propriétés liées du ViewModel
    /// </summary>
    /// <param name="categorieModel">Modèle</param>
    private void VersVM(UtilisateurCarteModel? utilisateurCarteModel)
    {
        if (utilisateurCarteModel != null)
        {
            CarteIdCle = utilisateurCarteModel.CarteId;
            CarteId = utilisateurCarteModel.CarteId;
            Quantite = utilisateurCarteModel.Quantite;
        }
        else
        {
            CarteIdCle = 0;
            CarteId = 0;
            Quantite = 0;
        }
    }

    public override void AssignerParametre(int parametre)
    {
        if (_authentificateur.EstAutorise(_rolesAutorises))
        {
            //Le paramètre est CarteIdCle
            CarteIdCle = parametre;
            
            UtilisateurCarteModel? utilisateurCarteModel =
                _utilisateurCarteService.Obtenir(_authentificateur.UtilisateurAuthentifie!.UtilisateurId,
                                                 CarteIdCle);
            
            ObtenirListeCartesDisponibles();

            VersVM(utilisateurCarteModel);
        }
    }
    #endregion

    #region Méthodes des commandes
    /// <summary>
    /// Enregistrer la catégorie
    /// </summary>    
    private async Task EnregistrerAsync()
    {
        EffacerErreurs();

        ChampsModifiables = false;
        EstEnTravail = true;

        if (_authentificateur.EstAutorise(_rolesAutorises))
        {
            bool estEnregistre = true;

            UtilisateurCarteModel utilisateurCarteModel = VersModele();

            ValidationModel validationModel = await _utilisateurCarteService.ValiderAsync(utilisateurCarteModel, CarteIdCle == 0);

            if (validationModel.EstValide == true)
            {
                if (CarteIdCle == 0)
                {
                    //C'est un nouveau
                    estEnregistre = await _utilisateurCarteService.AjouterAsync(utilisateurCarteModel);
                }
                else
                {
                    //C'est une modification
                    estEnregistre = await _utilisateurCarteService.ModifierAsync(utilisateurCarteModel);
                }

                if (estEnregistre == true)
                {
                    VersVM(utilisateurCarteModel);
                }
                else
                {
                    //Envoyer un message d'erreur à la vue
                    throw new Exception("Erreur. Impossible d'enregistrer");
                }
            }
            else
            {
                AssignerValidation(validationModel);
            }
        }
        else
        {
            _notification.MessageErreur("Accès non autorisé.", "Vous n'avez pas accès à cette fonctionnalité.");
        }

        EstEnTravail = false;
        ChampsModifiables = true;
    }

    /// <summary>
    /// Obtenir l'utilisateur
    /// </summary>
    /// <returns></returns>
    private async Task ObtenirAsync()
    {
        EstEnTravail = true;

        if (_authentificateur.EstAutorise(_rolesAutorises))
        {
            UtilisateurCarteModel? utilisateurCarteModel = await
                _utilisateurCarteService.ObtenirAsync(_authentificateur.UtilisateurAuthentifie!.UtilisateurId,
                                                      CarteIdCle);

            VersVM(utilisateurCarteModel);
        }
        else
        {
            _notification.MessageErreur("Accès non autorisé.", "Vous n'avez pas accès à cette fonctionnalité.");
        }

        EstEnTravail = false;
    }

    /// <summary>
    /// Mettre le ViewModel en mode ajouter
    /// </summary>
    private void Nouveau()
    {
        ObtenirListeCartesDisponibles();

        CarteIdCle = 0;
        CarteId = 0;
        Quantite = 0;
    }

    /// <summary>
    /// Obtenir la liste des cartes disponibles pour l'utilisateur
    /// </summary>
    private void ObtenirListeCartesDisponibles()
    {
        ListeCartesDisponibles.Clear();
        ListeCartesDisponibles.Insert(0, new ListeItem<int>() { Valeur = 0, Texte = "Veuillez sélectionner une carte..." });
        ListeCartesDisponibles.AddRange(_utilisateurCarteService.ObtenirCartesDisponibles(_authentificateur.UtilisateurAuthentifie!.UtilisateurId));
    }
    #endregion

    #region Commandes
    public IAsyncRelayCommand EnregistrerCommande { get; private set; }

    public IAsyncRelayCommand ObtenirCommande { get; private set; }

    public IRelayCommand NouveauCommande { get; private set; }
    #endregion   


    #region Propriétés liées
    public bool EstEnTravail
    {
        get
        {
            return _estEnTravail;
        }
        set
        {
            if (SetProperty(ref _estEnTravail, value))
            {
                ObtenirCommande.NotifyCanExecuteChanged();
                EnregistrerCommande.NotifyCanExecuteChanged();
                NouveauCommande.NotifyCanExecuteChanged();
            }
        }
    }

    public bool ChampsModifiables
    {
        get
        {
            return _champsModifiables;
        }
        set
        {
            SetProperty(ref _champsModifiables, value);
        }
    }

    public List<ListeItem<int>> ListeCartesDisponibles
    {
        get
        {
            return _lstCartesDisponibles;
        }
        private set
        {
            SetProperty(ref _lstCartesDisponibles, value);
        }
    }

    public int CarteId
    {
        get
        {
            return _carteId;
        }
        set
        {
            SetProperty(ref _carteId, value);
        }
    }

    public short Quantite
    {
        get
        {
            return _quantite;
        }
        set
        {
            SetProperty(ref _quantite, value);
        }
    }

    public bool CarteIdModifiable
    {
        get
        {
            return CarteIdCle == 0;
        }
    }

    private int CarteIdCle
    {
        get
        {
            return _carteIdCle;
        }
        set
        {
            if (_carteIdCle != value)
            {
                _carteIdCle = value;
                OnPropertyChanged(nameof(CarteIdModifiable));
            }
        }
    }
    #endregion
}
```

Ce **ViewModel** est similaire à celui de **GestionCategorieVM**, mais il y a des différences, car la clé primaire est spécifiée par l'application pour un nouvel élément. 

La clé pour l'utilisateur est obtenue par la classe d'assistance **Authentificateur** et celle de la carte par assignation de paramètre lors de la création du **ViewModel**.

Il y a 2 propriétés pour la carte **CarteIdCle** et **CarteId**. 

La propriété **CarteIdCle** correspond à la clé qui a été reçue en paramètre et qui déterminera si c'est une création ou une modification. 

**CarteId** correspond à la carte sélectionnée par l'utilisateur.

Il est important de séparer les 2 propriétés, car s'il y a uniquement la propriété **CarteId**, la valeur ne sera plus à 0 lorsque l'utilisateur fera sa sélection. Si cette approche était utilisée, il faudrait une méthode **AjouterOuModifier** dans le service. Si l'item n'est pas trouvé avec la clé, il s'agit d'un ajout, sinon c'est une modification. Par contre, en mettant cette logique dans le **ViewModel**, ceci permet d'ajouter de la logique pour s'assurer de ne pas modifier un item existant en le considérant comme un nouveau.

Il y a également une propriété **CarteIdModifiable** qui détermine si l'utilisateur est en mesure de modifier ou non la sélection de la carte.

Cette propriété est n'est pas liée à un attribut, mais utilise l'état d'une autre propriété pour déterminer sa valeur. Il n'est donc pas possible de notifier la vue que la propriété a été modifiée par le **`SetProperty`** de **CarteIdModifiable**, car il n'y a aucun **`set`**.

Il faut ajouter dans la propriété dépendante la méthode **`OnPropertyChanged(nameof(CarteIdModifiable))`** (ligne 20) que si **CarteIdCle** est modifiée, il faut notifier le changement d'état pour **CarteIdModifiable**. Également la propriété **CarteIdCle** est privée. Elle est modifiable uniquement par le **ViewModel**. La vue ne peut pas l'utiliser.

```
public bool CarteIdModifiable
{
    get
    {
        return CarteIdCle == 0;
    }
}
    
private int CarteIdCle
{
    get
    {
        return _carteIdCle;
    }
    set
    {
        if (_carteIdCle != value)
        {
            _carteIdCle = value;
            OnPropertyChanged(nameof(CarteIdModifiable));
        }
    }
}
```

La méthode **`VersModele()`** utilise le **CarteId** choisi par l'utilisateur si c'est un nouvel item. Sinon, il faut imposer la clé (ligne 7).

```csharp showLineNumbers
private UtilisateurCarteModel VersModele()
{
    return new UtilisateurCarteModel
    {
        UtilisateurId = _authentificateur.UtilisateurAuthentifie!.UtilisateurId,
        //Si la clé est 0, il faut prendre celle sélectionnée par l'utilisateur, sinon il faut prendre celle reçue en paramètre
        CarteId = (this.CarteIdCle == 0 ? this.CarteId : this.CarteIdCle),
        Quantite = this.Quantite
    };
}
```

La méthode **`ObtenirListeCartesDisponibles()`** permet d'obtenir la liste des cartes disponibles pour l'utilisateur. Cette méthode doit être appelée à chaque fois que le mode nouveau est sélectionné, car son contenu changera après chaque ajout.

```csharp showLineNumbers
/// <summary>
/// Obtenir la liste des cartes disponibles pour l'utilisateur
/// </summary>
private void ObtenirListeCartesDisponibles()
{
    ListeCartesDisponibles.Clear();
    ListeCartesDisponibles.Insert(0, new ListeItem<int>() { Valeur = 0, Texte = "Veuillez sélectionner une carte..." });
    ListeCartesDisponibles.AddRange(_utilisateurCarteService.ObtenirCartesDisponibles(_authentificateur.UtilisateurAuthentifie!.UtilisateurId));
}

/// <summary>
/// Mettre le ViewModel en mode ajouter
/// </summary>
private void Nouveau()
{
    ObtenirListeCartesDisponibles();

    CarteIdCle = 0;
    CarteId = 0;
    Quantite = 0;
}
```

### Enregistrer le ViewModel - SCViewModelExtensions

Dans la classe **SCViewModelExtensions**, il faut enregistrer le **ViewModel**.

```csharp showLineNumbers
public static void EnregistrerViewModels(this IServiceCollection services)
{
    services.AddSingleton<MainWindowVM>();
    services.AddTransient<ListeCategoriesVM>();
    services.AddTransient<ListeCartesVM>();
    services.AddTransient<GestionCategorieVM>();
    services.AddTransient<GestionUtilisateurVM>();
    services.AddTransient<ConnexionVM>();
    services.AddTransient<ListeMesCartesVM>();
    services.AddTransient<GestionMesCartesVM>();
}
```

### Création de la vue - UcGestionMesCartes.xaml

Le **ComboxBox** de la vue n'est peut-être pas le plus convivial pour une longue liste. Il existe des **ComboBox** un plus évolué qui permet de faire des filtres.

Également, avec le **ComboBox** de base, il est possible de faire un **modèle** pour l'item. Au lieu de mettre l'ensemble et la catégorie sur la même ligne, il serait possible de faire un modèle sur plusieurs lignes. Ce type de **ComboBox** est un peu plus complexe créer.

Une autre approche qui aurait été intéressante serait de faire une cascade de **ComboBox**. Il serait possible de sélectionner dans un **ComboBox** l'ensemble, dans un autre **ComboBox** la catégorie et le **ComboBox** des cartes contiendrait seulement les cartes en fonction de la catégorie sélectionnée et de l'ensemble sélectionné. 

À la ligne 64, la propriété **`IsEnabled`** du **ComboBox** est liée à la propriété **CarteIdModifiable** du **ViewModel**. Cette propriété permet de rendre disponible ou non le **ComboBox**.

À la ligne 65, la propriété **`IsEditable`** est à **`True`**. Cette propriété permet d'écrire dans le **ComboBox** pour faciliter la sélection. Cette option est très limitée avec le composant de base. Il permet uniquement de proposer la première occurrence qui commence par les lettres inscrites. Les composants plus avancés permettent de faire des recherches plus complexes et afficher plusieurs possibilités.

Le champ **Quantité** doit être un nombre. Le composant **TextBox** est assigné aux événements de changement de texte **PreviewTextInput** (ligne 79) et de coller **DataObject.Pasting** (ligne 80) pour permettre uniquement des chiffres.

```csharp showLineNumbers
<UserControl x:Class="SuperCarte.WPF.Views.UcGestionMesCartes"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"             
             d:DataContext="{d:DesignInstance vm:GestionMesCartesVM}"
             mc:Ignorable="d" 
             d:DesignHeight="450" d:DesignWidth="800">
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="auto"/>
            <RowDefinition Height="auto" />
            <RowDefinition Height="*" />
            <RowDefinition Height="20" />
        </Grid.RowDefinitions>

        <!--Rangée 0-->
        <TextBlock 
            Grid.Row="0" 
            VerticalAlignment="Center" HorizontalAlignment="Center"
            FontSize="16" FontWeight="Bold"
            Text="Gestion de mes cartes"/>

        <!--Rangée 1-->
        <WrapPanel Grid.Row="1" 
                    Orientation="Horizontal" VerticalAlignment="Center">

            <Button Content="N" ToolTip="Nouveau"
                    Margin="5" Width="32" Height="32" 
                    Command="{Binding NouveauCommande}"/>
            <Button Content="E" ToolTip="Enregistrer"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding EnregistrerCommande}"/>
            <Button Content="R" ToolTip="Rafraichir"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding ObtenirCommande}"/>
        </WrapPanel>

        <!--Rangée 2-->
        <!-- Formulaire -->
        <Grid Grid.Row="2" IsEnabled="{Binding ChampsModifiables}">
            <Grid.RowDefinitions>
                <RowDefinition Height="auto"></RowDefinition>
                <RowDefinition Height="auto"></RowDefinition>
            </Grid.RowDefinitions>
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="auto"/>
                <ColumnDefinition Width="*" />
            </Grid.ColumnDefinitions>

            <!-- Carte -->
            <Label Grid.Row="0" Grid.Column="0" 
                   Content="Carte : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <ComboBox Grid.Row="0" Grid.Column="1" 
                      Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                      ItemsSource="{Binding ListeCartesDisponibles}"
                      SelectedValue="{Binding CarteId}"                      
                      DisplayMemberPath="Texte"
                      SelectedValuePath="Valeur"                      
	                  IsEnabled="{Binding CarteIdModifiable}"       
     	              IsEditable="True"                                          
                      Padding="2 4 0 0"
                      Margin="0 10 5 10"/>

            <!-- Quantité -->
            <Label Grid.Row="1" Grid.Column="0" 
                   Content="Quantité : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="1" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding Quantite, TargetNullValue=''}"                     
                     Padding="2 4 0 0"
                     Margin="0 10 5 10" 
                     PreviewTextInput="TextBox_PreviewTextInput" 
                     DataObject.Pasting="TextBox_Pasting"/>

        </Grid>
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />

    </Grid>
</UserControl>
```

### Implémentation des événements du TextBox numérique - GestionMesCartes.xaml.cs

Il faut ajouter l'implémentation de méthodes pour les événements du **TextBox** numérique.

Il faut permettre uniquement les nombres entiers positifs.

Dans le fichier **GestionMesCartes.xaml.cs**, ajoutez les 2 méthodes ci-dessous.

```csharp showLineNumbers
private void TextBox_PreviewTextInput(object sender, TextCompositionEventArgs e)
{
    e.Handled = !Regex.IsMatch(e.Text, "^[0-9]");
}

private void TextBox_Pasting(object sender, DataObjectPastingEventArgs e)
{
    if (e.DataObject.GetDataPresent(typeof(String)))
    {
        String text = (String)e.DataObject.GetData(typeof(String));
        if (!Regex.IsMatch(text, "^[0-9]"))
        {
            e.CancelCommand();
        }
    }
    else
    {
        e.CancelCommand();
    }
}
```



### Ajout de la ressource pour créer le lien entre ViewModel et Vue - MainWindow.xaml

Il faut ajouter dans les ressources le lien entre le **ViewModel** et la **Vue**.

Les lignes 39 à 41 contiennent le lien entre **UcGestionMesCartes** et **GestionMesCartesVM**.

```xaml
<Window x:Class="SuperCarte.WPF.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:SuperCarte.WPF"  
        xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
        xmlns:v="clr-namespace:SuperCarte.WPF.Views"                
        mc:Ignorable="d"         
        d:DataContext="{d:DesignInstance Type=vm:MainWindowVM}"
        Title="Super Carte App" 
        Height="450" Width="800" WindowState="Maximized">
    <Window.Resources>
        <BooleanToVisibilityConverter x:Key="BooleanToVisibilityConverter" />
        
        <!--Assignation du ViewModel à Vue-->
        <DataTemplate DataType="{x:Type TypeName=vm:HelloWordVM}">
            <!--À retirer éventuellement-->
            <v:UcHelloWorld />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:ListeCategoriesVM}">
            <v:UcListeCategories />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:ListeCartesVM}">
            <v:UcListeCartes />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:GestionCategorieVM}">
            <v:UcGestionCategorie />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:GestionUtilisateurVM}">
            <v:UcGestionUtilisateur />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:ConnexionVM}">
            <v:UcConnexion />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:ListeMesCartesVM}">
            <v:UcListeMesCartes />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:GestionMesCartesVM}">
            <v:UcGestionMesCartes />
        </DataTemplate>
    </Window.Resources>
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="auto"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>
        <Menu Grid.Row="0" HorizontalContentAlignment="Stretch" VerticalAlignment="Stretch"
              Visibility="{Binding Authentificateur.EstAuthentifie, Converter={StaticResource BooleanToVisibilityConverter}}">
            <MenuItem Header="_Fichier">
                <MenuItem Header="_Quitter" />
            </MenuItem>
            <MenuItem Header="_Administration">
                <MenuItem Header="Liste des _cartes" Command="{Binding NaviguerListeCartesVMCommande}"/>
                <MenuItem Header="Liste des c_atégories" Command="{Binding NaviguerListeCategoriesVMCommande}"/>
            </MenuItem>
            <MenuItem Header="_Mes cartes" Command="{Binding NaviguerListeMesCartesVMCommande}"/>
        </Menu>

        <ContentControl Grid.Row="1"  Content="{Binding Navigateur.VMActif}" />                
    </Grid>
</Window>
```

### Ajout des commandes dans la liste - ListeMesCartesVM

Il faut ajouter les commandes pour naviguer vers la vue de gestion en mode nouveau et édition.

Modifiez la classe **ListeMesCartesVM** pour le code ci-dessous.

Aux lignes 78 et 80, les propriétés des commandes ont été ajoutées.

Aux lignes 43 et 44, les commandes sont créées et elles utilisent le directement le navigateur.

À la ligne 118, il y a la notification du changement d'état du **CanExecute** de la commande **EditerCommande** lorsque la carte sélectionnée est modifiée.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.Input;

namespace SuperCarte.WPF.ViewModels;

/// <summary>
/// ViewModel de la vue ListeMesCartes
/// </summary>
public class ListeMesCartesVM : BaseVM
{
    private readonly string[] _rolesAutorises = { "Administrateur", "Utilisateur" };

    #region Dépendances
    private readonly IAuthentificateur _authentificateur;
    private readonly INotification _notification;
    private readonly INavigateur _navigateur;
    private readonly IUtilisateurCarteService _utilisateurCarteService;
    #endregion

    #region Attributs des propriétés
    private List<QuantiteCarteDetailModel> _lstCartes;
    private QuantiteCarteDetailModel? _carteSelection;
    private bool _estEnTravail = false;
    #endregion

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="authentificateur">La classe d'assistance d'authentification</param>
    /// <param name="notification">La classe d'assistance pour la notification</param>
    /// <param name="utilisateurCarteService">Service du modèle UtilisateurCarte</param>
    /// <param name="navigateur">La classe d'assistance Navigateur</param>
    public ListeMesCartesVM(IAuthentificateur authentificateur, INotification notification,
        IUtilisateurCarteService utilisateurCarteService, INavigateur navigateur)
    {
        _authentificateur = authentificateur;
        _notification = notification;        
        if (_authentificateur.EstAutorise(_rolesAutorises))
        {
            _navigateur = navigateur;
            _utilisateurCarteService = utilisateurCarteService;

            ObtenirListeCommande = new AsyncRelayCommand(ObtenirListeAsync);
            NouveauCommande = new RelayCommand(() => _navigateur.Naviguer<GestionMesCartesVM, int>(0));
            EditerCommande = new RelayCommand(() => _navigateur.Naviguer<GestionMesCartesVM, int>(CarteSelection.CarteId),
                                              () => CarteSelection != null);
        }
        else
        {
            _notification.MessageErreur("Accès non autorisé.", "Vous n'avez pas accès à cette vue.");
        }
    }

    #region Méthodes des commandes
    /// <summary>
    /// Obtenir la liste de catégories du service
    /// </summary>    
    private async Task ObtenirListeAsync()
    {
        EstEnTravail = true;

        if (_authentificateur.EstAutorise(_rolesAutorises))
        {
            ListeCartes = await _utilisateurCarteService
                .ObtenirCartesUtilisateurAsync(_authentificateur.UtilisateurAuthentifie!.UtilisateurId);
        }
        else
        {
            _notification.MessageErreur("Accès non autorisé.", "Vous n'avez pas accès à cette fonctionnalité.");
        }

        EstEnTravail = false;
    }
    #endregion

    #region Commandes
    public IAsyncRelayCommand ObtenirListeCommande { get; private set; }

    public IRelayCommand NouveauCommande { get; private set; }

    public IRelayCommand EditerCommande { get; private set; }
    #endregion

    #region Propriétés liées
    public bool EstEnTravail
    {
        get
        {
            return _estEnTravail;
        }
        set
        {
            SetProperty(ref _estEnTravail, value);
        }
    }

    public List<QuantiteCarteDetailModel> ListeCartes
    {
        get
        {
            return _lstCartes;
        }
        set
        {
            SetProperty(ref _lstCartes, value);
        }
    }

    public QuantiteCarteDetailModel? CarteSelection
    {
        get
        {
            return _carteSelection;
        }
        set
        {
            if(SetProperty(ref _carteSelection, value))
            {
                EditerCommande.NotifyCanExecuteChanged();
            }
        }
    }
    #endregion
}
```

### Liaison des boutons dans la vue - UcListeMesCartes.xaml

Modifiez les boutons **N** et **É** pour les lier à leur commande.

```xaml
<Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Nouveau_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Nouveau_Tooltip}"
        Margin="5" Width="32" Height="32" 
        Command="{Binding NouveauCommande}"/>
<Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Tooltip}"
        Margin="5" Width="32" Height="32" 
        Command="{Binding EditerCommande}"/>
```

## Test

Démarrez le programme et effectuez un ajout et une modification.

L'ajout fonctionne. Si vous appuyez sur le bouton **Nouveau**, le **ComboBox** devient disponible et la liste se met à jour.

Si vous modifiez un item à partir de la liste, la modification fonctionne, mais le **ComboBox** sera vide.  La carte n'est plus disponible, donc elle ne se retrouve pas dans la liste. La modification fonctionne, car c'est la propriété **CarteIdCle** qui gère l'enregistrement. Il faut régler ce problème pour avoir le libellé de la carte lors de la modification.

