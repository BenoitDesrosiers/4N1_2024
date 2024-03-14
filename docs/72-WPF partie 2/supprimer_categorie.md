---
sidebar_position: 240
draft: false
---

# Supprimer une catégorie

Cette section utilise les techniques apprises dans la section précédente afin de faire la suppression des catégories dans SuperCarte (Le D du CRUD).

Pour être en mesure de supprimer un élément d'une liste, il faut au préalable vérifier les dépendances. L'entité categorie n'a pas de FK, mais d'autres entités ont des FK pointant vers la catégorie. Par exemple, si une carte utilise la catégorie, il ne faut pas qu'il soit possible de supprimer la catégorie sinon ca supprimerait les cartes aussi (il serait possible de suivre cette logique, mais ici, nous l'empêcherons).

Il faut ajouter de nouvelles fonctionnalités dans le **Repository** et dans le **Service**.

## SuperCarte.Core

### Création du modèle de dépendance - CategorieDependance

Créez la classe **CategorieDependance.cs**, dans le dossier **Models** du projet **SuperCarte.Core**.

```csharp
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient le nombre de dépendances (entités qui ont une FK vers cette catégorie) pour une catégorie
/// </summary>
public class CategorieDependance
{
    public int CategorieId { get; init; }
    public int NbCartes { get; init; }
}
```

La propriété NbCartes conservera le nombre de cartes associées à cette catégorie afin de savoir si celle-ci peut être effacée.

S'il avait d'autres tables qui utiliseraient **Categorie** comme clé étrangère, il faudrait ajouter les autres **Nb[Table]**.

La classe a également la clé primaire correspondant.

:::tip
Le mot clé **[init](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/init)** sert à indiquer qu'il n'est pas possible de modifier la valeur après la construction de l'objet.
:::

### Ajouter la requête dans le Repository - CategorieRepo

<!-- ???? Il s'agit d'une requête spécifique. Elle pourrait être généralisée en utilisant de la réflexion, mais pour conserver le projet plus facile à comprendre, ce sera une requête explicite. -->

Dans l'interface **ICategorieRepo**, il faut ajouter la méthode **ObtenirDependanceAsync** et **ObtenirDependance**.

Les deux versions (asynchrone et synchrone) sont ajoutées, car les 2 seront nécessaires. Si seulement une version était nécessaire, il ne serait pas nécessaire d'ajouter les 2.

Une référence aux Models est nécéssaire (ligne 1)

```csharp
//highlight-next-line
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Interface qui contient les méthodes de communication avec la base de données pour la table Categorie
/// </summary>
public interface ICategorieRepo : IBasePKUniqueRepo<Categorie, int>
{
    /// <summary>
    /// Obtenir les dépendances d'une catégorie en asynchrone.
    /// </summary>
    /// <param name="categorieId">Clé primaire de la catégorie/param>
    /// <returns>Les dépendances ou null si la catégorie n'est pas trouvée</returns>
    Task<CategorieDependance?> ObtenirDependanceAsync(int categorieId);
    
    /// <summary>
    /// Obtenir les dépendances d'une catégorie.
    /// </summary>
    /// <param name="categorieId">Clé primaire de la catégorie/param>
    /// <returns>Les dépendances ou null si la catégorie n'est pas trouvée</returns>
    CategorieDependance? ObtenirDependance(int categorieId);
}
```

Ajoutez l'implémentation de la méthode dans la classe **CategorieRepo**.

```csharp
//highlight-next-line
using Microsoft.EntityFrameworkCore;
//highlight-next-line
using SuperCarte.Core.Models;
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

    public async Task<CategorieDependance?> ObtenirDependanceAsync(int categorieId)
    {
        return await (from lqCategorie in _bd.CategorieTb
                      where
                          lqCategorie.CategorieId == categorieId
                      select
                          new CategorieDependance()
                          {
                              CategorieId = lqCategorie.CategorieId,
                              NbCartes = lqCategorie.CarteListe.Count()
                          }).FirstOrDefaultAsync();
    }

    public CategorieDependance? ObtenirDependance(int categorieId)
    {
        return (from lqCategorie in _bd.CategorieTb
                where
                    lqCategorie.CategorieId == categorieId
                select
                    new CategorieDependance()
                    {
                        CategorieId = lqCategorie.CategorieId,
                        NbCartes = lqCategorie.CarteListe.Count()
                    }).FirstOrDefault();
    }
}
```

### Ajouter dans le service - CategorieService

Il faut ajouter la méthode de suppression et d'obtention des dépendances dans le service.

Modifiez l'interface **Services/ICategorieService.cs**. Il y a seulement la version **synchrone** de **ObtenirDependance** et la version **asynchrone** de **SupprimerAsync**.

```csharp
using SuperCarte.Core.Models;

namespace SuperCarte.Core.Services;

/// <summary>
/// Interface qui contient les services du modèle Categorie
/// </summary>
public interface ICategorieService
{
    /// <summary>
    /// Obtenir la liste de catégories en asynchrone.
    /// </summary>
    /// <returns>Liste de catégories</returns>
    Task<List<CategorieModel>> ObtenirListeAsync();  

//highlight-start
    /// <summary>
    /// Obtenir les dépendances d'une catégorie.
    /// </summary>
    /// <param name="categorieId">Clé primaire de la catégorie</param>
    /// <returns>Les dépendances ou null si la catégorie n'est pas trouvée</returns>
    CategorieDependance? ObtenirDependance(int categorieId);

    /// <summary>
    /// Supprimer une catégorie en asynchrone.
    /// </summary>    
    /// <param name="categorieId">Clé primaire de la catégorie</param>    
    Task SupprimerAsync(int categorieId);
//highlight-end
}
```

Modifiez la classe **CategorieService.cs**.

```csharp
using SuperCarte.Core.Extensions;
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Services;

/// <summary>
/// Classe qui contient les services du modèle Categorie
/// </summary>
public class CategorieService : ICategorieService
{
    private readonly ICategorieRepo _categorieRepo;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="categorieRepo">Repository Categorie</param>
    public CategorieService(ICategorieRepo categorieRepo)
    {
        _categorieRepo = categorieRepo;
    }

    public async Task<List<CategorieModel>> ObtenirListeAsync()
    {
        return (await _categorieRepo.ObtenirListeAsync()).VersCategorieModel();
    }

//highlight-start
    public CategorieDependance? ObtenirDependance(int categorieId)
    {
        return _categorieRepo.ObtenirDependance(categorieId);
    }

    public async Task SupprimerAsync(int categorieId)
    {
        CategorieDependance? categorieDependance = await _categorieRepo.ObtenirDependanceAsync(categorieId);

        if(categorieDependance != null)
        {
            if(categorieDependance.NbCartes == 0)
            {
                await _categorieRepo.SupprimerParCleAsync(categorieId, true);
            }
            else
            {
                throw new Exception("La catégorie a des dépendances. Impossible à supprimer.");
            }
        }
        else
        {
            throw new Exception("La catégorie n'existe pas dans la base de données.");
        }
    }
//highlight-end
}
```

La méthode **SupprimerAsync** s'assure qu'il est possible d'effectuer la suppression, sinon elle génère des exceptions.

## SuperCarte.WPF

### Ajouter la commande dans le ViewModel - ListeCategoriesVM

Il faut ajouter une nouvelle commande **SupprimerCommande** dans le **ViewModel**.

Dans une commande, il est possible d'ajouter une logique pour indiquer s'il est possible ou non de l'exécuter. Dans ce cas-ci, il y a 2 conditions.

Premièrement, il doit avoir une catégorie sélectionnée dans le **DataGrid**. Deuxièmement, la catégorie ne doit pas avoir de dépendance. 

À chaque fois que la sélection sera modifiée, il faudra appliquer la logique si la commande supprimer peut s'appliquer.

Modifiez la classe **ListeCategoriesVM** par le code ci-dessous.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.Input;

namespace SuperCarte.WPF.ViewModels;

/// <summary>
/// ViewModel de la vue ListeCategories
/// </summary>
public class ListeCategoriesVM : BaseVM
{
    //Dépendances
    private readonly ICategorieService _categorieService;

    //Attributs des propriétés
    private List<CategorieModel> _lstCategories;
    private bool _estEnTravail = false;
	//highlight-next-line
    private CategorieModel? _categorieSelection;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="categorieService">Service du modèle Categorie</param>
	public ListeCategoriesVM(ICategorieService categorieService)
    {
        _categorieService = categorieService;

        ObtenirListeCommande = new AsyncRelayCommand(ObtenirListeAsync);
		//highlight-next-line
        SupprimerCommande = new AsyncRelayCommand(SupprimerAsync, PeutSupprimer);
    }

    /// <summary>
    /// Obtenir la liste de catégories du service
    /// </summary>    
    private async Task ObtenirListeAsync()
    {
        EstEnTravail = true;

        ListeCategories = await _categorieService.ObtenirListeAsync();        

        EstEnTravail = false;
    }

//highlight-start
    /// <summary>
    /// Supprimer la catégorie sélectionnée
    /// </summary>    
    private async Task SupprimerAsync()
    {
        EstEnTravail = true;

        await _categorieService.SupprimerAsync(CategorieSelection!.CategorieId);

        await ObtenirListeAsync();

        EstEnTravail = false;
    }

    /// <summary>
    /// Vérifier si la commande supprimer peut s'exécuter
    /// </summary>
    /// <returns>Vrai si elle peut s'exécuter, faux si elle ne peut pas</returns>
    private bool PeutSupprimer()
    {        
        //Vérifie si une catégorie peut être supprimée
        if (CategorieSelection != null)
        {
            //Il y a une catégorie de sélectionnée

            //Il faut empêcher la vérification si l'opération est en cours d'exécution
            //L'appel se fait en parallèle avec l'exécution et il y a une vérification dans la BD
            //Entity Framework ne peut pas fonctionner en parallèle avec la même instance du contexte.
            //Cette vérification est seulement nécessaire dans le cas d'un appel avec la base de données.
            if (SupprimerCommande.IsRunning == false)
            {
                //Vérifie si elle a des dépendances
                CategorieDependance? categorieDependance =
                    _categorieService.ObtenirDependance(CategorieSelection.CategorieId);

                //Si aucune cartes, elle peut être supprimée
                return categorieDependance?.NbCartes == 0;
            }
            else
            {
                return false;
            }
        }
        else
        {
            //Aucune catégorie n’est sélectionnée
            return false;
        }
    }    
//highlight-end

    //Commandes
    public IAsyncRelayCommand ObtenirListeCommande { get; set; }
//highlight-next-line
    public IAsyncRelayCommand SupprimerCommande { get; set; }

    //Propriétés liées
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

    public List<CategorieModel> ListeCategories
    {
        get
        {
            return _lstCategories;
        }
        set
        {
            SetProperty(ref _lstCategories, value);
        }
    }

//highlight-start
    public CategorieModel? CategorieSelection
    {
        get
        {
            return _categorieSelection;
        }
        set
        {
            if(SetProperty(ref _categorieSelection, value))
            {
                SupprimerCommande.NotifyCanExecuteChanged();
            }
        }
    }
//highlight-end
}
```

Voici les éléments nécessaires pour la commande **Supprimer**.

- La commande doit être asynchrone: ligne 94 . 

- La méthode pour exécuter la commande est **SupprimerAsync**: ligne 45. 

- À l'intérieur, elle appelle le service pour supprimer la catégorie sélectionnée: ligne 49. 

- Également, après la suppression, la liste est mise à jour: ligne 51.


Avant d'exécuter une méthode, il faut vérifier si elle peut être exécutée. La méthode **PeutSupprimer** fait cette vérification: ligne 60. 

- La première étape consiste à vérifier si une catégorie est sélectionnée: ligne 63.
- Ensuite, il faut obtenir les dépendances à partir de la base de données: ligne 74. 
- Cette méthode ne peut pas être asynchrone. Il faut donc que sa logique soit assez rapide. Si l'appel à la base de données est long, il faudrait revoir la logique. Il serait possible d'afficher un message d'erreur lors de la suppression s'il y a des dépendances. La vérification avec la base de données se ferait uniquement si l'action est réellement demandée.
- Notez que la commande SupprimerCommande ne doit pas s'exécuter 2 fois en même temps. La ligne 71 s'assure qu'elle n'est pas déjà en exécution. 

Il faut également modifier la propriété **CategorieSelection**.
- Si la propriété est modifiée, il faut indiquer à la commande **SupprimerCommande** de vérifier de nouveau si elle peut être exécutée. Cette propriété a un lien avec la logique de vérification, il faut donc appeler **NotifyCanExecuteChanged** pour que l'état du bouton change dans la vue.

Finalement, il faut créer la commande avec les 2 méthodes à la ligne 27. La première méthode **SupprimerAsync** sera exécutée si la commande est appelée. La deuxième méthode **PeutSupprimer** sert à empêcher d'appeler cette commande (si c'est faux). Cette deuxième méthode sera exécuté quand le bouton apparaitra, et chaque fois que CanExecuteChanged sera appelé (ligne 131)


:::warning Important
Bien que le VM fait en sorte que le bouton S de l'interface ne sera pas disponible (**PeutSupprimer**) s'il y a des dépendances pour une catégorie, il est important que le service empêche d'effacer une catégorie ayant des dépendances. Le service est le dernier point de vérification. Il est possible que le programmeur d'interface n'ait pas pensé à ça. 
:::

### Lier le bouton avec la commande dans la vue  - UcListeCategories.xaml

Dans le fichier **UcListeCategories.xaml**.

Voici la nouvelle définition du bouton. La commande est liée à la propriété **SupprimerCommande** du **ViewModel**.

```xaml
<Button Content="S" ToolTip="Supprimer"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding SupprimerCommande}"/>
```

Démarrez le programme.

Changez la sélection dans la liste. Seulement la catégorie **Mages** aura le bouton **S** activé. Les autre ont des cartes associées

Appuyez sur le bouton et la catégorie **Mages** ne sera plus là.

Généralement, il est recommandé d'avoir une demande de confirmation avant de supprimer un élément. Cette technique sera présentée dans un autre document.

### Réappliquer le seed

Pour appliquer de nouveau le **Seed_Carte**, il faut synchroniser la base de données avec la migration précédent ce seed et ensuite l'appliquer de nouveau.

Ouvrez la **Console du Gestionnaire de package** et assurez-vous que **SuperCarte.ef** est le Projet par défaut. 

```
Update-Database -StartupProject SuperCarte.EF -Migration Seed_RoleEtUtilisateur
Update-Database -StartupProject SuperCarte.EF -Migration Seed_Carte
```

<!-- le code jusqu'ici est dans SuperCarteApp_WPF_partie2_avant_localisation -->