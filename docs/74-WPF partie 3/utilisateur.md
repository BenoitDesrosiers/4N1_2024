---
sidebar_position: 350
draft: false
---

# Gestion d'un utilisateur

Dans cette section, nous allons construire l'interface permettant la gestion d'un utilisateur. 


Pour l'utilisateur, le validateur devra s'assurer que le nom d'utilisateur n'est pas déjà utilisé.

Également, il faut mettre une mécanique pour le mot de passe. Il doit être **haché** avec l'algorithme **bcrypt**.

Dans une fenêtre de gestion utilisateur, généralement, il est seulement possible de mettre un mot de passe lors de la création. S'il l'administrateur doit réinitialiser le mot de passe, il s'agit d'une action distincte. Donc pour cette gestion, il ne sera pas possible de modifier le mot de passe en mode **modification**. 

Étant donné qu'un utilisateur à un rôle, il faut aller chercher les rôles disponibles et permettre à l'usager d'en choisir un. Un ComboBox sera utilisé pour faire cet affichage. 

## SuperCarte.Core - Combobox

Cette section explique comment avoir les éléments nécessaires dans la logique d'affaires pour faire fonctionner une **ComboBox**.

Pour faire fonctionner un ComboBox ca prend 2 items: un texte qui sera affiché à l'écran, et une valeur qui sera la clé de l'enregistrement représenté par ce texte. 

### Création du modèle - ListeItem

Le modèle **ListeItem** permet de créer un item simple avec une valeur et un texte. La valeur est généralement la clé et le texte est libellé qui représente la valeur. Le **Combobox** utilisera cette classe.

Créez la classe **ListeItem.cs** dans le dossier **Models** du projet **SuperCarte.Core**.

```csharp showLineNumbers
namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient un couple Valeur et Texte pour les items génériques
/// </summary>
/// <typeparam name="TValeur"></typeparam>
public class ListeItem<TValeur>
{
    public TValeur Valeur { get; set; }

    public string Texte { get; set; }
}
```

La classe utilise un type générique pour la valeur.

### Ajout de ObtenirListeItem dans le Repository - RoleRepo

Le **Repository** s'occupera de créer une liste de **ListeItem**.

Modifiez l'interface **SuperCarte.Core/Repositories/IRoleRepo.cs** pour le code ci-dessous.

```csharp showLineNumbers
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Interface qui contient les méthodes de communication avec la base de données pour la table Role
/// </summary>
public interface IRoleRepo : IBasePKUniqueRepo<Role,int>
{
    /// <summary>
    /// Obtenir la liste des rôles dans un objet listeItem
    /// </summary>
    /// <returns>Liste de rôles dans un ListItem</returns>
    List<ListeItem<int>> ObtenirListeItem();
}
```

Modifiez la classe **RoleRepo.cs** pour le code ci-dessous.


```csharp showLineNumbers
//highlight-next-line
using SuperCarte.Core.Models;
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

//highlight-start
    public List<ListeItem<int>> ObtenirListeItem()
    {
        return (from lqRole in _bd.RoleTb
                select
                    new ListeItem<int>()
                    {
                        Valeur = lqRole.RoleId,
                        Texte = lqRole.Nom
                    }).ToList();
    }
    //highlight-end
}
```

### Création du service - RoleService

Le service doit avoir une méthode qui obtient la liste de **ListeItem** pour les rôles.

<!-- Il est également possible de considérer ceci comme une logique d'affaires, car le comportement doit être le même, peu importe la vue. Pour ce projet et le **TP 3**, ce sera cette approche. -->

Créez l'interface **IRoleService.cs** dans le dossier **Services**.

La méthode est synchrone, car elle sera utilisée lors de la création du **ViewModel**.

```csharp showLineNumbers
using SuperCarte.Core.Models;

namespace SuperCarte.Core.Services;

/// <summary>
/// Interface qui contient les services du modèle Role
/// </summary>
public interface IRoleService
{
    /// <summary>
    /// Obtenir la liste des rôles dans un objet listeItem
    /// </summary>    
    /// <returns>Liste de rôles dans un ListItem</returns>
    List<ListeItem<int>> ObtenirListeItem();
}
```

Créez la classe **RoleService.cs**  dans le dossier **Services**.

```csharp showLineNumbers
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;

namespace SuperCarte.Core.Services;

/// <summary>
/// Classe qui contient les services du modèle Role
/// </summary>
public class RoleService : IRoleService
{
    private readonly IRoleRepo _roleRepo;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="roleRepo">Repository Role</param>
    public RoleService(IRoleRepo roleRepo)
    {
        _roleRepo = roleRepo;
    }

    public List<ListeItem<int>> ObtenirListeItem()
    {
        return _roleRepo.ObtenirListeItem();
    }
}
```

## SuperCarte.Core - Gestion

Cette section explique comment avoir les éléments nécessaires dans la logique d'affaires pour faire fonctionner la mécanique de gestion.

La mécanique est identique à cette de la catégorie. Par contre, le mot de passe de l'utilisateur doit être géré différemment, car il n'est pas possible de le modifier par ce formulaire.

### Création du modèle - UtilisateurModel

Créez la classe **UtilisateurModel** dans le dossier **Models**.

```csharp showLineNumbers
namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient l'information d'un utilisateur
/// </summary>
public class UtilisateurModel
{
    public int UtilisateurId { get; set; }

    public string Prenom { get; set; } = null!;

    public string Nom { get; set; } = null!;

    public string NomUtilisateur { get; set; } = null!;    

    public int RoleId { get; set; }
}
```

La classe ne contient pas de propriété pour le mot de passe.

### Méthode d'extension - UtilisateurMapExtension

Créez la classe **UtilisateurMapExtension.cs** dans le dossier **Extensions**.

La classe contient les méthodes d'extension pour convertir ou copier le modèle de données vers le modèle du domaine et vice-versa. Le champ **MotPassHash** n'est pas traité.

```csharp showLineNumbers
using SuperCarte.Core.Models;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Extensions;

/// <summary>
/// Classe statique qui regroupe les méthodes d'extension pour la conversion (mapping) du modèle Utilisateur
/// </summary>
public static class UtilisateurMapExtension
{
    /// <summary>
    /// Convertir un objet Utilisateur vers un objet UtilisateurModel
    /// </summary>
    /// <param name="item">Objet à convertir</param>
    /// <returns>Objet converti</returns>
    public static UtilisateurModel VersUtilisateurModel(this Utilisateur item)
    {
        return new UtilisateurModel()
        {
            UtilisateurId = item.UtilisateurId,
            Prenom = item.Prenom,
            Nom = item.Nom,
            NomUtilisateur = item.NomUtilisateur,            
            RoleId = item.RoleId
        };
    }

    /// <summary>
    /// Convertir un objet UtilisateurModel vers un objet Utilisateur
    /// </summary>
    /// <param name="item">Objet à convertir</param>
    /// <returns>Objet converti</returns>
    public static Utilisateur VersUtilisateur(this UtilisateurModel item)
    {
        return new Utilisateur()
        {
            UtilisateurId = item.UtilisateurId,
            Prenom = item.Prenom,
            Nom = item.Nom,
            NomUtilisateur = item.NomUtilisateur,                      
            RoleId = item.RoleId
        };
    }    

    /// <summary>
    /// Méthode qui copie les valeurs des propriétés de l'objet de donnée Utilisateur dans l'objet du modèle UtilisateurModel
    /// </summary>
    /// <param name="itemDestination">UtilisateurModel à recevoir la copie (destination)</param>
    /// <param name="utilisateurSource">L'objet Utilisateurde référence pour la copie (source)</param>
    /// <param name="copierClePrimaire">Copier de la clé primaire</param>
    public static void Copie(this UtilisateurModel itemDestination, Utilisateur utilisateurSource, bool copierClePrimaire)
    {
        if (copierClePrimaire == true)
        {
            itemDestination.UtilisateurId = utilisateurSource.UtilisateurId;
        }

        itemDestination.Prenom = utilisateurSource.Prenom;
        itemDestination.Nom = utilisateurSource.Nom;
        itemDestination.NomUtilisateur = utilisateurSource.NomUtilisateur;        
        itemDestination.RoleId = utilisateurSource.RoleId;
    }

    /// <summary>
    /// Méthode qui copie les valeurs des propriétés du UtilisateurModel dans l'objet de donnée Utilisateur
    /// </summary>
    /// <param name="itemDestination">Utilisateur à recevoir la copie (destination)</param>
    /// <param name="utilisateurModelSource">L'objet UtilisateurModel de référence pour la copie (source)</param>
    /// <param name="ignoreClePrimaire">Ignore la copie de la clé primaire</param>
    public static void Copie(this Utilisateur itemDestination, UtilisateurModel utilisateurModelSource, bool ignoreClePrimaire = true)
    {
        if (ignoreClePrimaire == false)
        {
            itemDestination.UtilisateurId = utilisateurModelSource.UtilisateurId;
        }

        itemDestination.Prenom = utilisateurModelSource.Prenom;
        itemDestination.Nom = utilisateurModelSource.Nom;
        itemDestination.NomUtilisateur = utilisateurModelSource.NomUtilisateur;        
        itemDestination.RoleId = utilisateurModelSource.RoleId;
    }
}
```

### Installation de la librairie BCrpyt.Net

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. Il est important que le **Projet par défaut** de **Entity Framework** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.Core**.

```powershell
Install-Package BCrypt.Net-Next
```

Pour être en mesure d'utiliser la librairie dans une classe, il faut mettre ce **using**.

```csharp showLineNumbers
using BC = BCrypt.Net.BCrypt;
```

La classe a le même nom qu'une partie du **namespace**. Il n'est pas possible d'utiliser la classe directement, car il y a ambiguïté entre la classe et le **namespace**. La syntaxe indique que la classe **BCrypt** dans ce fichier sera renommée sous le nom **BC**.

### Création du service - UtilisateurService

Il faut avoir les 4 méthodes pour la gestion, **Obtenir (sync et async)**, **Ajouter** et **Modifier**.

Créez l'interface **IUtilisateurService.cs** dans le dossier **Services**.

```csharp showLineNumbers
using SuperCarte.Core.Models;

namespace SuperCarte.Core.Services;

/// <summary>
/// Interface qui contient les services du modèle Utilisateur
/// </summary>
public interface IUtilisateurService
{
    /// <summary>
    /// Obtenir un utilisateur à partir de sa clé primaire en asynchrone.
    /// </summary>
    /// <param name="utilisateurId">Clé primaire de l'utilisateur</param>
    /// <returns>L'utilisateur ou null si l'utilisateur n'est pas trouvé</returns>
    Task<UtilisateurModel?> ObtenirAsync(int utilisateurId);

    /// <summary>
    /// Obtenir un utilisateur à partir de sa clé primaire.
    /// </summary>
    /// <param name="utilisateurId">Clé primaire de l'utilisateur</param>
    /// <returns>L'utilisateur ou null si l'utilisateur n'est pas trouvé</returns>
    UtilisateurModel? Obtenir(int utilisateurId);

    /// <summary>
    /// Ajouter un utilisateur en asynchrone.
    /// </summary>
    /// <param name="utilisateurModel">Utilisateur à ajouter</param>        
    /// <param name="motPasse">Mot de passe</param>
    /// <returns>Vrai si ajouté, faux si non ajouté</returns>
    Task<bool> AjouterAsync(UtilisateurModel utilisateurModel, string motPasse);

    /// <summary>
    /// Modifier un utilisateur en asynchrone.
    /// </summary>
    /// <param name="utilisateurModel">Utilisateur à modifier</param>
    /// <returns>Vrai si ajouté, faux si non ajouté</returns>
    Task<bool> ModifierAsync(UtilisateurModel utilisateurModel);
}
```

Créez la classe **UtilisateurService.cs** dans le dossier **Services**.

Voici le code complet. Les méthodes seront expliquées séparément.

```csharp showLineNumbers
using SuperCarte.Core.Extensions;
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;
using SuperCarte.EF.Data;
using BC = BCrypt.Net.BCrypt; //La classe a le même nom qu'une partie du namespace. Cette nomenclature permet de renommer la classe.

namespace SuperCarte.Core.Services;

/// <summary>
/// Classe qui contient les services du modèle Utilisateur
/// </summary>
public class UtilisateurService : IUtilisateurService
{
    private readonly IUtilisateurRepo _utilisateurRepo;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="utilisateurRepo">Repository Utilisateur</param>
    public UtilisateurService(IUtilisateurRepo utilisateurRepo)
    {
        _utilisateurRepo = utilisateurRepo;
    }

//highlight-next-line
    public async Task<bool> AjouterAsync(UtilisateurModel utilisateurModel, string motPasse)
    {
        //Transformation de l'objet du modèle du domaine en objet du modèle de données
        Utilisateur utilisateur = utilisateurModel.VersUtilisateur();

        //Le mot de passe n'est pas copié, il faut le convertir avec BCrypt
        //highlight-next-line
        utilisateur.MotPasseHash = BC.HashPassword(motPasse);

        //Ajout dans repository avec enregistrement immédiat
        await _utilisateurRepo.AjouterAsync(utilisateur, true);

        //Assigne les valeurs de la base de données dans l'objet du modèle
        utilisateurModel.Copie(utilisateur, true);

        return true;
    }

    public async Task<bool> ModifierAsync(UtilisateurModel utilisateurModel)
    {
        //Il n'y a aucune référence au mot de passe.
        Utilisateur? utilisateur = await _utilisateurRepo.ObtenirParCleAsync(utilisateurModel.UtilisateurId);

        if (utilisateur != null)
        {
            //Assigner les valeurs dans l'utilisateur
            utilisateur.Copie(utilisateurModel);

            await _utilisateurRepo.EnregistrerAsync();

            //Assigne les valeurs de la base de données dans l'objet du modèle
            utilisateurModel.Copie(utilisateur, false);

            return true;
        }
        else
        {
            throw new Exception("Impossible de modifier l'utilisateur. Aucun utilisateur trouvé avec la clé primaire.");
        }
    }

    public async Task<UtilisateurModel?> ObtenirAsync(int utilisateurId)
    {
        Utilisateur? utilisateur = await _utilisateurRepo.ObtenirParCleAsync(utilisateurId);
        
        return utilisateur?.VersUtilisateurModel();
    }

    public UtilisateurModel? Obtenir(int utilisateurId)
    {
        Utilisateur? utilisateur = _utilisateurRepo.ObtenirParCle(utilisateurId);

        return utilisateur?.VersUtilisateurModel();
    }
}
```

Premièrement, la méthode **AjouterAsync()**  (ligne 25) a 2 paramètres. Le premier est le modèle et le 2e est le mot de passe en texte. Le mot de passe ne fait pas partie du modèle du domaine, il doit être envoyé comme un 2e paramètre.

Le mot de passe en texte est **haché** avec **BCrypt** et le **hash** est assigné dans le modèle de données (ligne 31).

Pour la modification, la mécanique est la même, sauf que l'extension **.Copie** (ligne 50) ne s'occupe pas du mot de passe.


## SuperCarte.WPF

### Enregistrer les services - SCServiceExtensions

Dans la classe **SuperCarte.WPF/Extension/ServiceCollections/SCServiceExtensions**, il faut enregistrer les 2 nouveaux services.

```csharp showLineNumbers
using Microsoft.Extensions.DependencyInjection;
using SuperCarte.Core.Services;

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
        services.AddScoped<ICategorieService, CategorieService>();
        services.AddScoped<ICarteService, CarteService>();
        //highlight-start
        services.AddScoped<IRoleService, RoleService>();
        services.AddScoped<IUtilisateurService, UtilisateurService>();
        //highlight-end
    }
}
```

### Création du ViewModel - GestionUtilisateurVM

Créez la classe **GestionUtilisateurVM.cs** dans le dossier **ViewModels**.

Le **ViewModel** est très similaire à celui de la catégorie. Les différences sont expliquées après le bout de code.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.Input;
using SuperCarte.EF.Data;

namespace SuperCarte.WPF.ViewModels;

public class GestionUtilisateurVM : BaseParametreVM<int>
{
    #region Dépendances
    //highlight-start
    private readonly IUtilisateurService _utilisateurService;
    private readonly IRoleService _roleService;
    //highlight-end
    #endregion

    #region Attributs des propriétés
    private int _utilisateurId;
    private string _prenom;
    private string _nom;
    private string _nomUtilisateur;
    private string? _motPasse;
    private int _roleId;
    private List<ListeItem<int>> _lstRole;
    private bool _estEnTravail = false;
    private bool _champsModifiables = true;
    #endregion

    public GestionUtilisateurVM(IUtilisateurService utilisateurService, IRoleService roleService)
    {
        _utilisateurService = utilisateurService;
        _roleService = roleService;

//highlight-next-line
        ListeRoles = _roleService.ObtenirListeItem();
    //highlight-next-line
        ListeRoles.Insert(0, new ListeItem<int>() { Valeur = 0, Texte = "Veuillez sélectionner un rôle..."});

        EnregistrerCommande = new AsyncRelayCommand(EnregistrerAsync, () => !EstEnTravail);
        ObtenirCommande = new AsyncRelayCommand(ObtenirAsync, () => !EstEnTravail);
        NouveauCommande = new RelayCommand(Nouveau, () => !EstEnTravail);
    }

    #region Méthodes d'assignation
    /// <summary>
    /// Assigner les propriétés liées du ViewModel vers les propriétés du modèle
    /// </summary>
    /// <returns>Objet du modèle</returns>
    private UtilisateurModel VersModele()
    {
        return new UtilisateurModel
        {
            UtilisateurId = this.UtilisateurId,
            Prenom = this.Prenom,
            Nom = this.Nom,
            NomUtilisateur = this.NomUtilisateur,
            RoleId= this.RoleId
        };
    }

    /// <summary>
    /// Assigner les propriétés du modèle vers les propriétés liées du ViewModel
    /// </summary>
    /// <param name="categorieModel">Modèle</param>
    private void VersVM(UtilisateurModel? utilisateurModel)
    {
        if (utilisateurModel != null)
        {
            UtilisateurId = utilisateurModel.UtilisateurId;
            Prenom = utilisateurModel.Prenom;
            Nom = utilisateurModel.Nom;
            NomUtilisateur = utilisateurModel.NomUtilisateur;
            RoleId = utilisateurModel.RoleId;            
        }
        else
        {
            UtilisateurId = 0;
            Prenom = string.Empty;
            Nom = string.Empty;
            NomUtilisateur = string.Empty;
            RoleId = 0;
        }
        
        MotPasse = string.Empty;
    }

    public override void AssignerParametre(int parametre)
    {
        UtilisateurId = parametre;

        UtilisateurModel? utilisateurModel = _utilisateurService.Obtenir(UtilisateurId);

        VersVM(utilisateurModel);
    }
    #endregion

    #region Méthodes des commandes
    /// <summary>
    /// Enregistrer la catégorie
    /// </summary>    
    private async Task EnregistrerAsync()
    {
        ChampsModifiables = false;
        EstEnTravail = true;

        UtilisateurModel utilisateurModel = VersModele();

        if (utilisateurModel.UtilisateurId == 0)
        {
            //La clé primaire est zéro, donc c'est un nouvel utilisateur
            await _utilisateurService.AjouterAsync(utilisateurModel, MotPasse!);
        }
        else
        {
            //La clé primaire n'est pas zéro, donc c'est un utilisateur existant
            await _utilisateurService.ModifierAsync(utilisateurModel);
        }        

        VersVM(utilisateurModel);

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

        UtilisateurModel? utilisateurModel = await _utilisateurService.ObtenirAsync(UtilisateurId);

        VersVM(utilisateurModel);

        EstEnTravail = false;
    }

    /// <summary>
    /// Mettre le ViewModel en mode ajouter
    /// </summary>
    private void Nouveau()
    {
        UtilisateurId = 0;
        Prenom = string.Empty;
        Nom = string.Empty;
        NomUtilisateur = string.Empty;
        MotPasse = string.Empty;
        RoleId = 0;
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

//highlight-start
    public bool MotPasseModifiable
    {
        get
        {
            return UtilisateurId == 0;
        }
    }
//highlight-end

    public int UtilisateurId 
    { 
        get
        {
            return _utilisateurId;
        }
        set
        {
            if(SetProperty(ref _utilisateurId, value))
            {
                //highlight-next-line
                OnPropertyChanged(nameof(MotPasseModifiable));
            }
        }
    }

    public string Prenom
    {
        get
        {
            return _prenom;
        }
        set
        {
            SetProperty(ref _prenom, value);
        }
    }

    public string Nom
    {
        get
        {
            return _nom;
        }
        set
        {
            SetProperty(ref _nom, value);
        }
    }

    public string NomUtilisateur
    {
        get
        {
            return _nomUtilisateur;
        }
        set
        {
            SetProperty(ref _nomUtilisateur, value);
        }
    }

    public string? MotPasse
    {
        get
        {
            return _motPasse;
        }
        set
        {
            SetProperty(ref _motPasse, value);
        }
    }

    public int RoleId
    {
        get
        {
            return _roleId;
        }
        set
        {
            SetProperty(ref _roleId, value);
        }
    }

    public List<ListeItem<int>> ListeRoles
    {
        get
        {
            return _lstRole;
        }

        private set
        {
            SetProperty(ref _lstRole, value);
        }
    }
    #endregion
}
```

Pour débuter, le **ViewModel** a besoin de 2 services (ligne 9-10). Il doit avoir accès aux méthodes de gestion de l'utilisateur et également au service du **Role** pour obtenir la liste de **ListeItem**.

À la ligne 30 , la propriété **ListeRoles** contient la liste des rôles disponibles pour la vue. L'assignation se fait dans le constructeur, car il s'agit d'une dépendance de la vue. La liste doit exister avant d'afficher l'utilisateur.

À la ligne 31, il faut ajouter l'élément par défaut. Il est plus intéressant de mettre du texte pour indiquer qu'il faut choisir un élément dans la liste.

Il faut également indiquer à la **Vue** si le champ **MotPasse** est modifiable ou non. Le champ peut être modifié uniquement lorsque c'est un nouvel utilisateur. Cette propriété n'utilise pas un attribut et elle a une logique en fonction de la propriété **MotPasseModifiable** (ligne 186). Si **UtilisateurId** est 0, c'est que c'est un nouvel utilisateur. 

Si la propriété **UtilisateurId** est modifiée, il faut également indiquer que la propriété **MotPasseModifiable** est modifiée. À la ligne 204,  la méthode **OnPropertyChanged()** indique aux composants qui sont liés à la propriété **MotPasseModifiable** de se mettre à jour. La méthode **OnPropertyChanged** provient de la classe **ObservableObject** du **MVVM Toolkit**.



### Enregistrement du ViewModel - SCViewModelExtensions

Dans la classe **Supercarte.WPF/Extensions/ServiceCollections/SCServiceViewModelExtensions**, il faut enregistrer le nouveau **ViewModel**.

```csharp showLineNumbers
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
        services.AddSingleton<MainWindowVM>();
        services.AddTransient<ListeCategoriesVM>();
        services.AddTransient<ListeCartesVM>();
        services.AddTransient<GestionCategorieVM>();
        //highlight-next-line
        services.AddTransient<GestionUtilisateurVM>();
    }
}
```

### Création de la vue - UcGestionUtilisateur.xaml

Créez le fichier **UcGestionUtilisateur.xaml** de type **Contrôle Utilisateur (WPF)** dans le dossier **Views**.

Aux lignes 7 et 8, il y a l'indicateur du **ViewModel** pour faciliter la liaison.

```xaml  showLineNumbers 
<UserControl x:Class="SuperCarte.WPF.Views.UcGestionUtilisateur"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
             xmlns:aide="clr-namespace:SuperCarte.WPF.Aides"
             d:DataContext="{d:DesignInstance vm:GestionUtilisateurVM}"
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
            Text="Gestion d'un utilisateur"/>

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
                <RowDefinition Height="auto"></RowDefinition>
                <RowDefinition Height="auto"></RowDefinition>
                <RowDefinition Height="auto"></RowDefinition>
            </Grid.RowDefinitions>
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="auto"/>
                <ColumnDefinition Width="*" />
            </Grid.ColumnDefinitions>

            <!-- Prenom -->
            <Label Grid.Row="0" Grid.Column="0" 
                   Content="Prénom : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="0" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding Prenom}" 
                     Padding="2 4 0 0"
                     Margin="0 10 5 10"/>

            <!-- Nom -->
            <Label Grid.Row="1" Grid.Column="0" 
                   Content="Nom : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="1" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding Nom}" 
                     Padding="2 4 0 0"
                     Margin="0 10 5 10"/>

            <!-- Nom utilisateur -->
            <Label Grid.Row="2" Grid.Column="0" 
                   Content="Nom d'utilisateur : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="2" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding NomUtilisateur}"
                     Padding="2 4 0 0"
                     Margin="0 10 5 10"/>

            <!-- Mot de passe -->
            <Label Grid.Row="3" Grid.Column="0" 
                   Content="Mot de passe : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
                   //highlight-next-line
            <TextBox Grid.Row="3" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding MotPasse}"
                     //highlight-next-line
                     IsEnabled="{Binding MotPasseModifiable}"
                     Padding="2 4 0 0"
                     Margin="0 10 5 10"/>
            
            <!-- Rôle -->
            <Label Grid.Row="4" Grid.Column="0" 
                   Content="Role : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <ComboBox Grid.Row="4" Grid.Column="1" 
                      Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                      //highlight-start
                      ItemsSource="{Binding ListeRoles}"
                      SelectedValue="{Binding RoleId}"
                      DisplayMemberPath="Texte"
                      SelectedValuePath="Valeur"  
                      //highlight-end                    
                      Padding="2 4 0 0"
                      Margin="0 10 5 10"/>

        </Grid>
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />

    </Grid>   
    
</UserControl>
```

Pour le mot de passe (ligne 90), idéalement, il faut utiliser le composant **\<PasswordBox>**. Ce composant ne peut pas être lié à une propriété du **ViewModel** pour des raisons de sécurité par sa conception. Ce composant n'est pas très **MVVM**. Pour l'instant, ce sera un **\<TextBox>**. Dans le cours sur l'intégration, il faudra modifier le **\<PasswordBox>** pour qu'il soit **liable**. Il faudra penser de le corriger ici.

Également, la propriété **IsEnabled** (ligne 98) est liée à la propriété **MotPasseModifiable** du **ViewModel**. Le composant sera disponible uniquement lors de l'ajout d'un utilisateur.


Ensuite, le composant **\<ComboBox>** (ligne 109-110) doit avoir les propriétés **ItemsSource** et **SelectedValue**. 

**ItemsSource** correspond à la liste des éléments et la propriété **SelectedValue** à l'item sélectionné dans la liste.

La propriété **SelectedValuePath** (ligne 112) permet d'indiquer la propriété du **ListeItem\<int>** qui sera utilisée pour la valeur. C'est la valeur de cette propriété qui sera envoyée dans la propriété **SelectedValue**. Il est important que leur type soit le même.

La propriété **DisplayMemberPath** (ligne 111) permet d'indiquer la propriété du **ListeItem\<int>** qui sera utilisée pour l'affichage.


### Ajout de la ressource pour créer le lien entre ViewModel et Vue - MainWindow.xaml

Il faut ajouter dans les ressources le lien entre le **ViewModel** et la **Vue**.

Les lignes 24 à 26 contiennent le lien entre **UcGestionUtilisateur** et **GestionUtilisateurVM**.

Modifier **MainWindow.xaml**

```xaml  showLineNumbers 
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
        <!--Assignation du ViewModel à Vue-->
        <DataTemplate DataType="{x:Type TypeName=vm:ListeCategoriesVM}">
            <v:UcListeCategories />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:ListeCartesVM}">
            <v:UcListeCartes />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:GestionCategorieVM}">
            <v:UcGestionCategorie />
        </DataTemplate>
        //highlight-start
        <DataTemplate DataType="{x:Type TypeName=vm:GestionUtilisateurVM}">
            <v:UcGestionUtilisateur />
        </DataTemplate>
        //highlight-end
    </Window.Resources>
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="auto"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>
        <Menu Grid.Row="0" HorizontalContentAlignment="Stretch" VerticalAlignment="Stretch">
            <MenuItem Header="_Fichier">
                <MenuItem Header="_Quitter" />
            </MenuItem>
            <MenuItem Header="_Administration">
                <MenuItem Header="Liste des _cartes" Command="{Binding NaviguerListeCartesVMCommande}"/>
                <MenuItem Header="Liste des c_atégories" Command="{Binding NaviguerListeCategoriesVMCommande}"/>
            </MenuItem>            
        </Menu>

        <ContentControl Grid.Row="1"  Content="{Binding Navigateur.VMActif}" />                
    </Grid>
</Window>
```

## Test - MainWindowVM

Pour tester directement, il faut modifier le **VMActif** pour celui de **GestionUtilisateurVM** (ligne 11).

Il faut envoyer le paramètre 0 pour un nouveau, sinon la clé de l'utilisateur pour le modifier.

```csharp showLineNumbers
public MainWindowVM(INavigateur navigateur)
{   
    //Sélectionner le ViewModel de démarrage        
    _navigateur = navigateur;

    //Création des commandes
    NaviguerListeCartesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCartesVM>);
    NaviguerListeCategoriesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCategoriesVM>);

    //Vue initiale
    //highlight-next-line
    _navigateur.Naviguer<GestionUtilisateurVM, int>(0); //Pour un nouveau
    //_navigateur.Naviguer<GestionUtilisateurVM, int>(1);//Pour modifier François St-Hilaire
    
}
```

Créez un nouvel utilisateur. Le champ **Mot de passe** sera disponible. Une fois enregistré, il ne sera plus modifiable.

<!-- à revoir, pas implémenter dans la solution finale 
## Validation de l'utilisateur - Avec Repository

Il manque la validation pour la gestion de l'utilisateur.

L'utilisateur doit valider des éléments dans la base de données pour 2 champs.

- RoleId -> Doit être un RoleId qui existe dans la table **Role**.
- NomUtilisateur -> Ne doit pas avoir d'utilisateur qui a déjà le même nom d'utilisateur. Le validateur doit exclure l'utilisateur en cours.

La validation aura donc besoin d'accéder à la base de données pour faire les vérifications. Pour ce faire, un  **Repository** sera injecté dans le **Validateur**.

Il faut créer une règle avec la fonction **Must**.

Voici une coquille de **UtilisateurValidateur** pour le rôle et le nom d'utilisateur. Cette coquille est incomplète et donne uniquement un alignement pour faire de la validation avec un **Repository**.

À la ligne 12, le méthode **Must()** utilise une fonction **lambda** **(i,p)**. 

La variable **i** représente l'item en cours de validation. Dans ce cas-ci, c'est un objet de type **UtilisateurModel**. 

La variable **p** représente la valeur de la propriété en cours de validation. Dans ce cas-ci, c'est la valeur de **NomUtilisateur**. 

La méthode de validation doit avoir la signature **bool Methode(string p, UtilisateurModel i)** pour répondre à la fonction attendue par la méthode **Must()**.

```csharp showLineNumbers

public UtilisateurValidateur(IRoleService roleRepo, IUtilisateurRepo utilisateurRepo)
{
	_roleRepo = roleRepo;
    _utilisateurRepo = utilisateurRepo;
	
	RuleFor(i => i.RoleId).Cascade(CascadeMode.Stop)
		.Must(ValiderRoleId).WithMessage("Le rôle n'est pas valide.");
        
    RuleFor(i => i.NomUtilisateur).Cascade(CascadeMode.Stop)
        .NotEmpty().WithMessage("Le nom d'utilisateur est obligatoire.")
      	//highlight-next-line
        .Must((i, p) => ValiderDoublonNomUtilisateur(p, i.UtilisateurId)).WithMessage("Le nom d'utilisateur est déjà utilisé.");
}

private bool ValiderRoleId(int roldeId)
{   
    //Si la liste contient la valeur en paramètre, c'est valide.
    //Si la liste ne contient pas la valeur en paramètre, ce n'est pas valide.
    
    /*Requête SQL à reproduire dans le repo.
    	SELECT Count(*) FROM Role
    	WHERE RoleId = valeur;
    */
}

private bool ValiderDoublonNomUtilisateur(string nomUtilisateur, int utilisateurId)
{
    //Si aucun utilisateur a le même nom d'utilisateur avec un utilisateurId différent que le mien, c'est valide.
    //Si un utilisateur a le même nom d'utilisateur avec un utilisateurId différent que le mien, ce n'est pas valide.
    
    /*Requête SQL à reproduire dans le repo. Retourne 0 si l'utilisateur n'est pas utilisé par une autre personne. Retourne 1 ou plus si l'utilisateur est déjà utilisé
    	SELECT Count(*) FROM Utilisateur
    	WHERE 
    		NomUtilisateur = nomUtilisateur AND
    		UtilisateurId <> utilisateurId;
    */
}


/***/
```

## Validation du mot de passe 

Le mot de passe doit être robuste. La définition d'un mot de passe robuste peut varier, mais généralement il faut ces critères.

- 8 caractères et plus
- Au moins 3 des 4 éléments ci-dessous
  - 1 majuscule
  - 1 minuscule
  - 1 chiffre
  - 1 caractère spécial


Pour le **TP 3**, il faut faire une méthode de validation spécifique que la méthode **.Must()** utilisera pour sa validation.

Pour vous aider à déterminer les critères du contenu, il est possible d'utiliser des 4 **Regex**. Il faut que 3 des 4 **Regex** soit à **true** et que la longueur soit plus grand que 8.

```
bool minuscule = Regex.Match(motPasse,"[a-z]") //Contient une minuscule
bool majuscule = Regex.Match(motPasse,"[A-Z]") //Contient une majuscule
bool chiffre = Regex.Match(motPasse,"\\d") //Contient un chiffre
bool special = Regex.Match(motPasse,"\\W") //Contient une caractère qui n'est pas une lettre ou chiffre
```

-->

