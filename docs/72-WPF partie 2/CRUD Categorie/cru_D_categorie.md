---
sidebar_position: 40
draft: true
---

# Supprimer une catégorie


Pour être en mesure de supprimer un élément d'une liste, il faut au préalable vérifier les dépendances.

Car, si une carte utilise la catégorie, il ne faut pas qu'il soit possible de supprimer la catégorie.

Il faut ajouter de nouvelles fonctionnalités dans le **Repository** et dans le **Service**.

## SuperCarte.Core

### Création du modèle de dépendance - CategorieDependance

Créez la classe **CategorieDependance.cs**, dans le dossier **Models** du projet **SuperCarte.Core**.

```csharp
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient le nombre de dépendances pour une catégorie
/// </summary>
public class CategorieDependance
{
    public int CategorieId { get; init; }
    public int NbCartes { get; init; }
}
```

S'il avait d'autres tables qui utiliseraient **Categorie** comme clé étrangère, il faudrait ajouter les autres **Nb[Table]**.

La classe a également la clé primaire correspondant.

Le mot clé **init** sert à indiquer qu'il n'est pas possible de modifier la valeur après la construction de l'objet.

#### Ajouter la requête dans le Repository - CategorieRepo

Il s'agit d'une requête spécifique. Elle pourrait être généralisée en utilisant de la réflexion, mais pour conserver le projet plus facile à comprendre, ce sera une requête explicite.

Dans l'interface **ICategorieRepo**, il faut ajouter la méthode **ObtenirDependanceAsync** et **ObtenirDependance**.

Les deux versions (asynchrone et synchrone) sont ajoutées, car les 2 seront nécessaires. Si seulement une version était nécessaire, il ne serait pas nécessaire d'ajouter les 2.

```csharp
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
using Microsoft.EntityFrameworkCore;
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

#### Ajouter dans le service - CategorieService

Il faut ajouter la méthode de suppression et d'obtention des dépendances dans le service.

Modifiez l'interface **ICategorieService.cs**. Il y a seulement la version **synchrone** de **ObtenirDependance** et la version **asynchrone** de **SupprimerAsync**.

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
}
```

La méthode **SupprimerAsync** s'assure qu'il est possible d'effectuer la suppression, sinon elle génère des exceptions.

### SuperCarte.WPF

#### Ajouter la commande dans le ViewModel - ListeCartesVM

Il faut ajouter une nouvelle commande **SupprimerCommande** dans le **ViewModel**.

Dans une commande, il est possible d'ajouter une logique pour indiquer s'il est possible ou non de l'exécuter. Dans ce cas-ci, il y a 2 conditions.

Premièrement, il doit avoir une catégorie sélectionnée dans le **DataGrid**. Deuxièmement, la catégorie ne doit pas avoir de dépendance. 

À chaque fois que la sélection sera modifiée, il faudra appliquer la logique si la commande supprimée peut s'appliquer.

Modifiez la classe **ListeCartesVM** par le code ci-dessous.

```csharp
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
    private CategorieModel? _categorieSelection;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="categorieService">Service du modèle Categorie</param>
	public ListeCategoriesVM(ICategorieService categorieService)
    {
        _categorieService = categorieService;

        ObtenirListeCommande = new AsyncRelayCommand(ObtenirListeAsync);
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
            //Il y a une catégorie est sélectionnée

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

    //Commandes
    public IAsyncRelayCommand ObtenirListeCommande { get; set; }
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
}
```

Voici les éléments nécessaires pour la commande **Supprimer**.

La commande doit être asynchrone. 

```csharp
public IAsyncRelayCommand SupprimerCommande { get; set; }
```

La méthode pour exécuter la commande est **SupprimerAsync**. 

À l'intérieur, elle appelle le service pour supprimer la catégorie sélectionnée. 

Également, après la suppression, il faut mettre la liste à jour.

```csharp
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
```

Avant d'exécuter une méthode, il faut vérifier si elle peut être exécutée. 

La première étape consiste à vérifier si une catégorie est sélectionnée.

Ensuite, il faut obtenir les dépendances dans la base de données. 

Cette méthode ne peut pas être asynchrone. Il faut donc que sa logique soit assez rapide. Si l'appel à la base de données est long, il faudrait revoir la logique. Il serait possible d'afficher un message d'erreur lors de la suppression s'il y a des dépendances. La vérification avec la base de données se ferait uniquement si l'action est réellement demandée.

```csharp
/// <summary>
/// Vérifier si la commande supprimer peut s'exécuter
/// </summary>
/// <returns>Vrai si elle peut s'exécuter, faux si elle ne peut pas</returns>
private bool PeutSupprimer()
{        
    //Vérifie si une catégorie peut être supprimée
    if (CategorieSelection != null)
    {
        //Il y a une catégorie est sélectionnée

        //Il faut empêcher la vérification si l'opération est en cours d'exécution
        //L'appel se fait en parallèle avec l'exécution et il y a une vérification dans la BD
        //Entity Framework ne peut pas fonctionner en parallèle avec la même instance du contexte.
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
        //Aucune catégorie est sélectionnée
        return false;
    }
}
```

Il faut également modifier la propriété **CategorieSelection**.

Si la propriété est modifiée, il faut indiquer à la commande **Supprimer** de vérifier de nouveau si elle peut être exécutée. Cette propriété a un lien avec la logique de vérification, il faut donc appeler **NotifyCanExecuteChanged** pour que l'état du bouton change dans la vue.

```csharp
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
```

Finalement, il faut créer la commande avec les 2 méthodes.

```csharp
SupprimerCommande = new AsyncRelayCommand(SupprimerAsync, PeutSupprimer);
```

#### Lier le bouton avec la commande dans la vue  - UcListeCategories.xaml

Dans le fichier **UcListeCategories.xaml**.

Voici la nouvelle définition du bouton. La commande est liée à la propriété **SupprimerCommande** du **ViewModel**.

```xaml
<Button Content="S" ToolTip="Supprimer"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding SupprimerCommande}"/>
```

Démarrez le programme.

Changez la sélection dans la liste. Seulement la catégorie **Mages** aura le bouton **S** activé.

Appuyez sur le bouton et la catégorie **Mages** ne sera plus là.

Généralement, il est recommandé d'avoir une demande de confirmation avant de supprimer un élément. Cette technique sera présentée dans un autre document.

#### Réappliquer le seed

Pour appliquer de nouveau le **Seed_Carte**, il faut synchroniser la base de données avec la migration précédente de ce seed et ensuite l'appliquer de nouveau.

```
Update-Database -StartupProject SuperCarte.EF -Migration Seed_RoleEtUtilisateur
Update-Database -StartupProject SuperCarte.EF -Migration Seed_Carte
```

## Localisation

Pour rendre l'application multilingue, il faut utiliser des fichiers ressources. Les fichiers ressources sont en fonction de la localisation.

Le terme localisation est utilisé, car il peut avoir une version pour le français de France et le français du Québec.

Pour faciliter la localisation des vues, il existe la librairie **WPFLocalizeExention**.

### Installation de la librairie

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. Il est important que le **Projet par défaut** **WPF** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.WPF**. À ce stade, il y a **plusieurs projets** et il est important de le modifier dans la liste.

```
Install-Package WPFLocalizeExtension
```

### Création du fichier ressource - ResListeCategories

La librairie utilise les fichiers **.resx** pour la localisation. C'est le format de fichier principal pour **.NET**.

Créez le dossier **Resx**, dans le projet **SuperCarte.WPF**.

Il existe plusieurs stratégies pour gérer les fichiers ressources. Pour ce projet, ce sera un fichier ressource par vue.

Créez le fichier **ResListeCategories.resx** avec le modèle **Fichier de ressources**. Il est important que le nom du fichier ressource ne soit pas réutilisé pour d'autres ressources.

Ce fichier sera le fichier ressource principal. Si aucun fichier ressource n’existe pour la culture du programme, ce sera celui-ci.

Pour ce projet, ce sera le fichier en français.

La colonne **Nom** consiste à la clé de la ressource et la colonne **Valeur** consiste est le texte.

Pour la vue **UcListeCategories**, il faut traduire le titre de la page, les entêtes des colonnes du **DataDrid**, le texte et les **Tooltip** des boutons.

Les boutons seront par contre réutilisés par d'autres **Vues** . Il serait préférable de les spécifier dans un fichier propre.

| Nom             | Valeur               |
| --------------- | -------------------- |
| Titre           | Liste des catégories |
| Col_CategorieId | Id                   |
| Col_Nom         | Nom                  |
| Col_Description | Description          |

Créez le fichier **ResListeCategories.en.resx**. Ce fichier sera pour l'anglais. Ce sera autant pour **en-US** (Anglais États-Unis) que pour **en-CA** (Anglais Canada). Il est important de mettre le code de la culture dans entre le nom du fichier et l'extension.

Il faut que les éléments de la colonne **Nom** soient identiques dans tous les fichiers.

| Nom             | Valeur          |
| --------------- | --------------- |
| Titre           | Categories list |
| Col_CategorieId | Id              |
| Col_Nom         | Name            |
| Col_Description | Description     |

S'il avait une version italienne, il faudrait que le fichier se nomme **ResListeCategories.it.resx**. S'il avait une version française de France, il faudrait que le fichier se nomme **ResListeCategories.fr-Fr.resx**.

### Création du fichier ressource - ResGlobalListeBouton

Ce fichier ressource contiendra l'information des boutons. Les boutons d'une liste seront toujours les mêmes. Imaginez qu'il faut modifier le bouton **Rafraichissement** par **Chargement**. Si le logiciel à 150 listes, il faut le modifier dans 150 fichiers.

Créez le fichier **ResGlobalListeBouton.resx** avec le modèle **Fichier de ressources**. Il est important que le nom du fichier ressource ne soit pas réutilisé pour d'autres ressources.

| Nom                       | Valeur     |
| ------------------------- | ---------- |
| Bouton_Nouveau_Content    | N          |
| Bouton_Editer_Content     | É          |
| Bouton_Supprimer_Content  | S          |
| Bouton_Rafraichir_Content | R          |
| Bouton_Nouveau_Tooltip    | Nouveau    |
| Bouton_Editer_Tooltip     | Éditer     |
| Bouton_Supprimer_Tooltip  | Supprimer  |
| Bouton_Rafraichir_Tooltip | Rafraichir |

Créez le fichier **ResGlobalListeBouton.en.resx**.

| Nom                       | Valeur  |
| ------------------------- | ------- |
| Bouton_Nouveau_Content    | N       |
| Bouton_Editer_Content     | E       |
| Bouton_Supprimer_Content  | D       |
| Bouton_Rafraichir_Content | R       |
| Bouton_Nouveau_Tooltip    | New     |
| Bouton_Editer_Tooltip     | Edit    |
| Bouton_Supprimer_Tooltip  | Delete  |
| Bouton_Rafraichir_Tooltip | Refresh |

### Utilisation dans la vue - UcListeCategories.xaml

Le fichier au complet sera à la fin de la section

Pour être en mesure de l'utiliser dans une **Vue**, il faut ajouter des déclarations dans la balise initiale **\<UserControl\>**.

La ligne 8 indique qu'il faut inclure le **namespace ** de la librairie **WPFLocalizeExtension**.

La ligne 9 indique qu'elle est la langue à utiliser pour l'aperçu du design.

La ligne 10 indique le projet dans lequel le fichier ressource se trouve.

La ligne 11 est le nom du fichier ressource par défaut de la **Vue**.

```xaml
<UserControl x:Class="SuperCarte.WPF.Views.UcListeCategories"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
             xmlns:lex="http://wpflocalizeextension.codeplex.com"
             lex:LocalizeDictionary.DesignCulture="fr"
             lex:ResxLocalizationProvider.DefaultAssembly="SuperCarte.WPF"
             lex:ResxLocalizationProvider.DefaultDictionary="ResListeCategories"             
             d:DataContext="{d:DesignInstance vm:ListeCategoriesVM}"
             mc:Ignorable="d" 
             d:DesignHeight="450" d:DesignWidth="800"
             Loaded="UserControl_Loaded">
```

Pour sélectionner un élément du fichier ressource de la vue, il faut utiliser cette syntaxe. La clé est le nom de la colonne.

```
{lex:Loc Clé}
```

Par exemple pour le titre de la **Vue**. Il faut prendre la valeur de l'élément **Titre** du fichier **ResListeCategories**.

```xaml
<TextBlock 
	Grid.Row="0" 
	VerticalAlignment="Center" HorizontalAlignment="Center"
	FontSize="16" FontWeight="Bold"
	Text="{lex:Loc Titre}"/>
```

Pour sélectionner un élément d'un autre fichier ressource, il faut utiliser cette syntaxe. Le fichier est le fichier **Resx**. La clé est le nom de la colonne.

```
{lex:Loc Fichier:Clé}
```

Voici pour le bouton **Nouveau**. Il prend l'élément  **Bouton_Nouveau_Content** du fichier **ResGlobalListeBouton** pour la propriété **Content**.

```xaml
<Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Nouveau_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Nouveau_Tooltip}"
        Margin="5" Width="32" Height="32" />
```

Voici pour l'entête de colonne **Id**. L'entête est dans le fichier ressource de la vue.

```xaml
<DataGridTextColumn Header="{lex:Loc Col_CategorieId}"
                    MinWidth="50"
                    Binding="{Binding CategorieId}"/>
```

Tout ce qui est du texte doit être dans un fichier ressource, même si le texte est identique dans les 2 langues.

Il devient difficile à faire évoluer le programme si certains libellés ne sont pas dans le fichier ressource.

Également, il est préférable de créer un élément par composant, même s'il y a une répétition dans la valeur.

Voici le fichier au complet.

```xaml
<UserControl x:Class="SuperCarte.WPF.Views.UcListeCategories"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
             xmlns:lex="http://wpflocalizeextension.codeplex.com"
             lex:LocalizeDictionary.DesignCulture="fr"
             lex:ResxLocalizationProvider.DefaultAssembly="SuperCarte.WPF"
             lex:ResxLocalizationProvider.DefaultDictionary="ResListeCategories"             
             d:DataContext="{d:DesignInstance vm:ListeCategoriesVM}"
             mc:Ignorable="d" 
             d:DesignHeight="450" d:DesignWidth="800"
             Loaded="UserControl_Loaded">
    <Grid>
        <Grid.RowDefinitions>
            <!--Rangée 0 -->
            <RowDefinition Height="auto" /> 
            <!--Rangée 1 -->
            <RowDefinition Height="auto" />
            <!--Rangée 2 -->
            <RowDefinition Height="*" />
            <!--Rangée 3 -->
            <RowDefinition Height="20" />
        </Grid.RowDefinitions>

        <!--Rangée 0-->
        <TextBlock 
            Grid.Row="0" 
            VerticalAlignment="Center" HorizontalAlignment="Center"
            FontSize="16" FontWeight="Bold"
            Text="{lex:Loc Titre}"/>

        <!--Rangée 1-->
        <WrapPanel Grid.Row="1" 
                    Orientation="Horizontal" VerticalAlignment="Center">

            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Nouveau_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Nouveau_Tooltip}"
                    Margin="5" Width="32" Height="32" />
            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Tooltip}"
                    Margin="5" Width="32" Height="32" />
            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Supprimer_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Supprimer_Tooltip}"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding SupprimerCommande}"/>
            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Rafraichir_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Rafraichir_Tooltip}"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding ObtenirListeCommande}"/>
        </WrapPanel>

        <!--Rangée 2-->
        <DataGrid Grid.Row="2" 
                  AutoGenerateColumns="False"
                  SelectionMode="Single" IsReadOnly="True"
                  ItemsSource="{Binding ListeCategories}"
                  SelectedItem="{Binding CategorieSelection}">
            <DataGrid.Columns>
                <DataGridTextColumn Header="{lex:Loc Col_CategorieId}"
                                    MinWidth="50"
                                    Binding="{Binding CategorieId}"/>

                <DataGridTextColumn Header="{lex:Loc Col_Nom}"
                                    MinWidth="300"
                                    Binding="{Binding Nom}"/>

                <DataGridTextColumn Header="{lex:Loc Col_Description}" 
                                    MinWidth="300"
                                    Width="*"
                                    Binding="{Binding Description}"/>

            </DataGrid.Columns>
        </DataGrid>
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />

    </Grid>
</UserControl>
```

### Test

Par défaut, la culture sera celle spécifiée dans le système d'exploitation.

Il est possible de la modifier à partir du code.

Dans le fichier **App.xaml.cs**, modifiez  le constructeur de la classe **App**.

```csharp
public App()
{
    //Modification de la langue dans l'extension et du thread principal
	CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("en-CA");
    WPFLocalizeExtension.Engine.LocalizeDictionary.Instance.SetCurrentThreadCulture = true;
    WPFLocalizeExtension.Engine.LocalizeDictionary.Instance.Culture = CultureInfo.DefaultThreadCurrentCulture;

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

Démarrez l'application et la page sera en anglais.

Il est important de modifier la langue dans le **Thread principal** de l'application et non dans le **Thread d'affichage**, car l'application fonctionne en asynchrone. Une sous-tâche crée une copie de la culture du **Thread parent**. L'instance du **ViewModel** est créée par le **ServiceProvider**, donc il provient du **Thread principal**. Ce n'est pas la **Vue** qui crée la **VM**. 

La ligne **CultureInfo.DefaultThreadCurrentCulture** permet d'indiquer la culture par défaut de l'application. En cas qu'il faille modifier la culture dans l'application en cours d'exécution, il faudrait se baser sur cette valeur pour appliquer la culture sur le **Thread** en cours d'exécution si c'est nécessaire.

Remettez l'application en français par défaut.

```csharp
public App()
{
    //Modification de la langue dans l'extension et du thread principal
		CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("fr-CA");
        WPFLocalizeExtension.Engine.LocalizeDictionary.Instance.SetCurrentThreadCulture = true;
        WPFLocalizeExtension.Engine.LocalizeDictionary.Instance.Culture = CultureInfo.DefaultThreadCurrentCulture;

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

## Liste des cartes

Pour faire la liste des cartes, il faut reproduire la même technique que la liste des catégories.

Par contre, la liste des cartes à 2 clés étrangères. Dans une **Vue**, l'utilisateur veut rarement voir les clés étrangères, mais un élément significatif à celle-ci.

Dans le cas des cartes, il faut afficher le nom de la catégorie et le nom de l'ensemble. Il faut créer un modèle qui contient ces deux nouveaux champs.

Dans cette section, ce sera uniquement la mécanique pour **Obtenir la liste**. Il faudrait tout de même ajouter la mécanique de suppression.

### SuperCarte.Core

#### Création du modèle - CarteDetailModel

Les modèles qui seront utilisés pour les listes de données auront le suffixe **Detail**, car elles contiennent le détail des clés étrangères.

Créez la classe **CarteDetailModel.cs** dans le dossier **Models**.

```csharp
namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient l'information d'une carte avec le détail de ses clés étrangères
/// </summary>
public class CarteDetailModel
{
    public int CarteId { get; set; }

    public string Nom { get; set; } = null!;

    public short Vie { get; set; }

    public short Armure { get; set; }

    public short Attaque { get; set; }

    public bool EstRare { get; set; }

    public decimal PrixRevente { get; set; }

    public int CategorieId { get; set; }

    public string CategorieNom { get; set; } = null!;

    public int EnsembleId { get; set; }

    public string EnsembleNom { get; set; } = null!;
}
```

#### Ajout de la requête dans Repository - CarteRepo

Pour être en mesure de récupérer l'information des clés étrangères, il faut adapter la requête.

Il y a 2 options. La première serait d'utiliser le **EagerLoading**. Le **Service** aurait la responsabilité de prendre les champs nécessaires pour construire l'objet **CarteModelDetail**. Il serait possible de généraliser le **EagerLoading** avec la réflexion.

La 2e option est de créer l'objet directement dans la requête du **Repository**. Pour ce projet, ce sera cette option qui sera utilisée.

Dans l'interface **ICarteRepo.cs**.

```csharp
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Interface qui contient les méthodes de communication avec la base de données pour la table Carte
/// </summary>
public interface ICarteRepo : IBasePKUniqueRepo<Carte, int>
{
    /// <summary>
    /// Obtenir la liste des cartes avec le modèle CarteDetailModel en asynchrone.
    /// </summary>
    /// <returns>Liste des cartes</returns>
    Task<List<CarteDetailModel>> ObtenirListeCarteDetailAsync();
}
```

Dans la classe **CarteRepo.cs**.

```csharp
using Microsoft.EntityFrameworkCore;
using SuperCarte.Core.Models;
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

    public async Task<List<CarteDetailModel>> ObtenirListeCarteDetailAsync()
    {
        return await(from lqCarte in _bd.CarteTb
                     select
                         new CarteDetailModel()
                         {
                             CarteId = lqCarte.CarteId,
                             Nom = lqCarte.Nom,
                             Vie = lqCarte.Vie,
                             Armure = lqCarte.Armure,
                             Attaque = lqCarte.Attaque,
                             EstRare = lqCarte.EstRare,
                             PrixRevente = lqCarte.PrixRevente,
                             CategorieId = lqCarte.CategorieId,
                             CategorieNom = lqCarte.Categorie.Nom,
                             EnsembleId = lqCarte.EnsembleId,
                             EnsembleNom = lqCarte.Ensemble.Nom
                         }).ToListAsync();
    }
}
```

Les jointures sont effectuées par la propriété de navigation dans la création de l'objet.

#### Création du service - CarteService

Créez l'interface **ICarteService.cs** dans le dossier **Services**.

```csharp
using SuperCarte.Core.Models;

namespace SuperCarte.Core.Services;

/// <summary>
/// Interface qui contient les services du modèle Carte
/// </summary>
public interface ICarteService
{
    /// <summary>
    /// Obtenir la liste des cartes avec le modèle CarteDetailModel en asynchrone.
    /// </summary>
    /// <returns>Liste des cartes</returns>
    Task<List<CarteDetailModel>> ObtenirListeCarteDetailAsync();
}
```

Créez la classe **CarteService.cs** dans le dossier **Services**.

```csharp
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;

namespace SuperCarte.Core.Services;

/// <summary>
/// Classe qui contient les services du modèle Carte
/// </summary>
public class CarteService : ICarteService
{
    private readonly ICarteRepo _carteRepo;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="carteRepo">Repository Carte</param>
    public CarteService(ICarteRepo carteRepo)
    {
        _carteRepo = carteRepo;
    }

    public async Task<List<CarteDetailModel>> ObtenirListeCarteDetailAsync()
    {
        return await _carteRepo.ObtenirListeCarteDetailAsync();
    }
}
```

Pour cette méthode, le **Service** appelle directement le **Repository**.

### Projet SuperCarte.WPF

#### Enregistrement du service - SCServiceExtensions

Il faut enregistrer le **Service** dans la classe **SCServiceExtensions**.

```csharp
public static void EnregistrerServices(this IServiceCollection services)
{
    services.AddScoped<ICategorieService, CategorieService>();
    services.AddScoped<ICarteService, CarteService>();
}
```

Le service est également enregistré en **Scoped** pour permettre d'utiliser la même instance dans le programme dans le même **scope**.

#### Création du ViewModel - ListeCartesVM

Créez la classe **ListeCartesVM.cs**.

```csharp
using CommunityToolkit.Mvvm.Input;

namespace SuperCarte.WPF.ViewModels
{
    /// <summary>
    /// ViewModel de la vue ListeCartes
    /// </summary>
    public class ListeCartesVM : BaseVM
    {
        #region Dépendances
        private readonly ICarteService _carteService;
        #endregion

        #region Attributs des propriétés
        private List<CarteDetailModel> _lstCartes;
        private CarteDetailModel? _carteSelection;
        private bool _estEnTravail = false;
        #endregion

        public ListeCartesVM(ICarteService carteService)
        {
            _carteService = carteService;
            
            ObtenirListeCommande = new AsyncRelayCommand(ObtenirListeAsync);
        }

        #region Méthodes des commandes
        /// <summary>
        /// Obtenir la liste de catégories du service
        /// </summary>    
        private async Task ObtenirListeAsync()
        {
            EstEnTravail = true;

            ListeCartes = await _carteService.ObtenirListeCarteDetailAsync();

            EstEnTravail = false;
        }
        #endregion

        #region Commandes
        public IAsyncRelayCommand ObtenirListeCommande { get; set; }
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

        public List<CarteDetailModel> ListeCartes
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

        public CarteDetailModel? CarteSelection
        {
            get
            {
                return _carteSelection;
            }
            set
            {
                SetProperty(ref _carteSelection, value);
            }
        }
        #endregion
    }
}
```

Il y a beaucoup de similitudes entre **ListeCategoriesVM** et **ListeCartesVM**. Il serait possible de généraliser une bonne partie de la logique avec une classe parent générique du type **BaseListeVM**. Par contre, ce concept ne sera pas présenté.

Également, dans ce **ViewModel**, il y a des **#region** utilisées pour classer les différentes sections. Les **ViewModel** peuvent devenir assez gros selon la complexité de la vue. Le classement des différentes sections peut aider.

#### Enregistrer le ViewModel - SCViewModelExtensions

Dans la classe **SCViewModelExtensions**, il faut enregistrer le **ViewModel**.

```csharp
public static void EnregistrerViewModels(this IServiceCollection services)
{
    services.AddTransient<MainWindowVM>();
    services.AddTransient<ListeCategoriesVM>();
    services.AddTransient<ListeCartesVM>();
}
```

#### Création du fichier ressource - ResUcListeCartes

Généralement, la conception de la **Vue** et du fichier ressource se fait en parallèle. À chaque élément qu'il faut faire un libellé, il faut créer un élément dans le fichier ressource.

Créez le fichier **ResListeCartes.resx**. 

| Nom              | Valeur           |
| ---------------- | ---------------- |
| Titre            | Liste des cartes |
| Col_CarteId      | Id               |
| Col_Nom          | Nom              |
| Col_Vie          | Vie              |
| Col_Armure       | Armure           |
| Col_Attaque      | Attaque          |
| Col_EstRare      | Rare             |
| Col_PrixRevente  | Prix de revente  |
| Col_CategorieNom | Catégorie        |
| Col_EnsembleNom  | Ensemble         |

Créez le fichier **ResListeCartes.en.resx**.

| Nom              | Valeur       |
| ---------------- | ------------ |
| Titre            | Card List    |
| Col_CarteId      | Id           |
| Col_Nom          | Name         |
| Col_Vie          | Health       |
| Col_Armure       | Armor        |
| Col_Attaque      | Attack       |
| Col_EstRare      | Rare         |
| Col_PrixRevente  | Resale price |
| Col_CategorieNom | Category     |
| Col_EnsembleNom  | Set          |

#### Création de la vue - UcListeCartes.xaml

Créez un **Contrôle utilisateur (WPF)** nommé **UcListeCartes.xaml** dans le dossier **Views**. Le modèle se retrouve dans la section **WPF** à gauche.

```xaml
<UserControl x:Class="SuperCarte.WPF.Views.UcListeCartes"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
             xmlns:lex="http://wpflocalizeextension.codeplex.com"
             lex:LocalizeDictionary.DesignCulture="fr"
             lex:ResxLocalizationProvider.DefaultAssembly="SuperCarte.WPF"
             lex:ResxLocalizationProvider.DefaultDictionary="ResListeCartes"             
             d:DataContext="{d:DesignInstance vm:ListeCartesVM}"
             mc:Ignorable="d"              
             d:DesignHeight="450" d:DesignWidth="800"
             Loaded="UserControl_Loaded">
    <Grid>
        <Grid.RowDefinitions>
            <!--Rangée 0 -->
            <RowDefinition Height="auto" />
            <!--Rangée 1 -->
            <RowDefinition Height="auto" />
            <!--Rangée 2 -->
            <RowDefinition Height="*" />
            <!--Rangée 3 -->
            <RowDefinition Height="20" />
        </Grid.RowDefinitions>

        <!--Rangée 0-->
        <TextBlock 
            Grid.Row="0" 
            VerticalAlignment="Center" HorizontalAlignment="Center"
            FontSize="16" FontWeight="Bold"
            Text="{lex:Loc Titre}"/>

        <!--Rangée 1-->
        <WrapPanel Grid.Row="1" 
                    Orientation="Horizontal" VerticalAlignment="Center">

            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Nouveau_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Nouveau_Tooltip}"
                    Margin="5" Width="32" Height="32" />
            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Tooltip}"
                    Margin="5" Width="32" Height="32" />
            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Supprimer_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Supprimer_Tooltip}"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding SupprimerCommande}"/>
            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Rafraichir_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Rafraichir_Tooltip}"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding ObtenirListeCommande}"/>
        </WrapPanel>

        <!--Rangée 2-->
        <DataGrid Grid.Row="2" 
                  AutoGenerateColumns="False"
                  SelectionMode="Single" IsReadOnly="True"
                  ItemsSource="{Binding ListeCartes}"
                  SelectedItem="{Binding CarteSelection}">
            <DataGrid.Columns>
                <DataGridTextColumn Header="{lex:Loc Col_CarteId}"
                                    MinWidth="50"
                                    Binding="{Binding CarteId}"/>

                <DataGridTextColumn Header="{lex:Loc Col_Nom}"
                                    MinWidth="300"
                                    Binding="{Binding Nom}"/>

                <DataGridTextColumn Header="{lex:Loc Col_Vie}" 
                                    MinWidth="50"                                    
                                    Binding="{Binding Vie}"/>
                
                <DataGridTextColumn Header="{lex:Loc Col_Armure}" 
                                    MinWidth="50"                                    
                                    Binding="{Binding Armure}"/>

                <DataGridTextColumn Header="{lex:Loc Col_Attaque}" 
                                    MinWidth="50"                                    
                                    Binding="{Binding Attaque}"/>

                <DataGridCheckBoxColumn Header="{lex:Loc Col_EstRare}" 
                                        MinWidth="50"                                    
                                        Binding="{Binding EstRare}"/>

                <DataGridTextColumn Header="{lex:Loc Col_PrixRevente}" 
                                    MinWidth="50"                                    
                                    Binding="{Binding PrixRevente, StringFormat=\{0:N2\}}"/>

                <DataGridTextColumn Header="{lex:Loc Col_CategorieNom}" 
                                    MinWidth="250"                                    
                                    Binding="{Binding CategorieNom}"/>

                <DataGridTextColumn Header="{lex:Loc Col_EnsembleNom}" 
                                    MinWidth="250"       
                                    Width="*"
                                    Binding="{Binding EnsembleNom}"/>

            </DataGrid.Columns>
        </DataGrid>
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />

    </Grid>
</UserControl>
```

Le **DataGrid** n'a pas besoin d'afficher le **Id** des clés étrangères, donc il n'y a pas de colonne pour ceci.

Également, la convention pour un booléen est d'utiliser un **DataGridCheckBoxColumn**.

Pour la colonne **PrixRevente**, il y a un format d'appliquer dans la propriété **Binding**. Il faut s'assurer que le prix a toujours 2 décimales.

```csharp
Binding="{Binding PrixRevente, StringFormat=\{0:N2\}}"
```

Dans le fichier **UcListeCartes.xaml.cs**, il faut ajouter l'événement pour le chargement automatique.

```csharp
private async void UserControl_Loaded(object sender, RoutedEventArgs e)
 {
     if (this.DataContext != null)
     {
         if (this.DataContext is ListeCartesVM)
         {
             await ((ListeCartesVM)this.DataContext).ObtenirListeCommande.ExecuteAsync(null);
         }
     }
 }
```

#### Ajout de la ressource pour créer le lien entre ViewModel et Vue - MainWindow.xaml

Il faut ajouter dans les ressources le lien entre le **ViewModel** et la **Vue**.

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
        <!--Assignation du ViewModel à Vue-->
        <DataTemplate DataType="{x:Type TypeName=vm:HelloWorldVM}">
            <!--À retirer éventuellement-->
            <v:UcHelloWorld />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:ListeCategoriesVM}">
            <v:UcListeCategories />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:ListeCartesVM}">
            <v:UcListeCartes />
        </DataTemplate>
    </Window.Resources>
    <Grid>
        <ContentControl  Content="{Binding VMActif}" />
    </Grid>
</Window>
```

La ligne 19 à 21 indique que lorsque le **DataContext** est de type **ListeCategoriesVM** (ligne 19), il faut utiliser le contrôle utilisateur **UcListeCategories** (ligne 20).

La ligne 22  à 24 indique que lorsque le **DataContext** est de type **ListeCartesVM** (ligne 19), il faut utiliser le contrôle utilisateur **UcListeCartes** (ligne 23).

À la ligne 27, lorsque le **Content** du **ContentControl** sera un **ViewModel** de la liste des ressources, il chargera le contrôle utilisateur correspondant.

#### Test - MainWindowVM

Dans la classe **MainWindowVM.cs**, il faut assigner **ListeCategoriesVM** à la propriété **VMActif**.

```csharp
using Microsoft.Extensions.DependencyInjection;

namespace SuperCarte.WPF.ViewModels;

public class MainWindowVM : BaseVM
{    
    public MainWindowVM(IServiceProvider serviceProvider)
	{   
        //Sélectionner le ViewModel de démarrage
        VMActif = serviceProvider.GetRequiredService<ListeCartesVM>();
    }

    public BaseVM VMActif { get; set; }    
}
```

Démarrez l'application.

#### Alignement à droite des nombres

Dans une grille, les nombres sont généralement alignés à droite pour faciliter la lecture. 

Pour être en mesure de le faire, il faut ajouter un style dans la définition de la colonne.

```xaml
<DataGridTextColumn Header="{lex:Loc Col_Vie}" 
                    MinWidth="50"                                    
                    Binding="{Binding Vie}">
    <DataGridTextColumn.ElementStyle>
        <Style>
            <Setter Property="Control.HorizontalAlignment" Value="Right"/>
        </Style>
    </DataGridTextColumn.ElementStyle>
</DataGridTextColumn>
```

La balise **\<DataGridTextColumn.ElementStyle\>** permet de spécifier le style pour le contenu de la colonne.

Il est important de mettre **Control.** dans la propriété pour indiquer que la valeur s'applique au contenu de la cellule au complet. Il est possible de faire des cellules avancées avec plusieurs sous-contrôles dans son contenu. Il serait possible d'appliquer un style à seulement un des éléments de la cellule.

Voici le fichier au complet.

```xaml
<UserControl x:Class="SuperCarte.WPF.Views.UcListeCartes"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
             xmlns:lex="http://wpflocalizeextension.codeplex.com"
             lex:LocalizeDictionary.DesignCulture="fr"
             lex:ResxLocalizationProvider.DefaultAssembly="SuperCarte.WPF"
             lex:ResxLocalizationProvider.DefaultDictionary="ResListeCartes"             
             d:DataContext="{d:DesignInstance vm:ListeCartesVM}"
             mc:Ignorable="d"              
             d:DesignHeight="450" d:DesignWidth="800"
             Loaded="UserControl_Loaded">
    <Grid>
        <Grid.RowDefinitions>
            <!--Rangée 0 -->
            <RowDefinition Height="auto" />
            <!--Rangée 1 -->
            <RowDefinition Height="auto" />
            <!--Rangée 2 -->
            <RowDefinition Height="*" />
            <!--Rangée 3 -->
            <RowDefinition Height="20" />
        </Grid.RowDefinitions>

        <!--Rangée 0-->
        <TextBlock 
            Grid.Row="0" 
            VerticalAlignment="Center" HorizontalAlignment="Center"
            FontSize="16" FontWeight="Bold"
            Text="{lex:Loc Titre}"/>

        <!--Rangée 1-->
        <WrapPanel Grid.Row="1" 
                    Orientation="Horizontal" VerticalAlignment="Center">

            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Nouveau_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Nouveau_Tooltip}"
                    Margin="5" Width="32" Height="32" />
            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Tooltip}"
                    Margin="5" Width="32" Height="32" />
            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Supprimer_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Supprimer_Tooltip}"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding SupprimerCommande}"/>
            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Rafraichir_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Rafraichir_Tooltip}"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding ObtenirListeCommande}"/>
        </WrapPanel>

        <!--Rangée 2-->
        <DataGrid Grid.Row="2" 
                  AutoGenerateColumns="False"
                  SelectionMode="Single" IsReadOnly="True"
                  ItemsSource="{Binding ListeCartes}"
                  SelectedItem="{Binding CarteSelection}">
            <DataGrid.Columns>
                <DataGridTextColumn Header="{lex:Loc Col_CarteId}"
                                    MinWidth="50"
                                    Binding="{Binding CarteId}"/>

                <DataGridTextColumn Header="{lex:Loc Col_Nom}"
                                    MinWidth="300"
                                    Binding="{Binding Nom}"/>

                <DataGridTextColumn Header="{lex:Loc Col_Vie}" 
                                    MinWidth="50"                                    
                                    Binding="{Binding Vie}">
                    <DataGridTextColumn.ElementStyle>
                        <Style>
                            <Setter Property="Control.HorizontalAlignment" Value="Right"/>
                        </Style>
                    </DataGridTextColumn.ElementStyle>
                </DataGridTextColumn>

                <DataGridTextColumn Header="{lex:Loc Col_Armure}" 
                                    MinWidth="50"                                    
                                    Binding="{Binding Armure}">
                    <DataGridTextColumn.ElementStyle>
                        <Style>
                            <Setter Property="Control.HorizontalAlignment" Value="Right"/>
                        </Style>
                    </DataGridTextColumn.ElementStyle>
                </DataGridTextColumn>

                <DataGridTextColumn Header="{lex:Loc Col_Attaque}" 
                                    MinWidth="50"                               
                                    Binding="{Binding Attaque}">
                    <DataGridTextColumn.ElementStyle>
                        <Style>
                            <Setter Property="Control.HorizontalAlignment" Value="Right"/>
                        </Style>
                    </DataGridTextColumn.ElementStyle>
                </DataGridTextColumn>

                <DataGridCheckBoxColumn Header="{lex:Loc Col_EstRare}" 
                                        MinWidth="50"                                    
                                        Binding="{Binding EstRare}"/>

                <DataGridTextColumn Header="{lex:Loc Col_PrixRevente}" 
                                    MinWidth="50"                                   
                                    Binding="{Binding PrixRevente, StringFormat=\{0:N2\}}">
                    <DataGridTextColumn.ElementStyle>
                        <Style>                            
                            <Setter Property="Control.HorizontalAlignment" Value="Right"/>
                        </Style>
                    </DataGridTextColumn.ElementStyle>
                </DataGridTextColumn>

                <DataGridTextColumn Header="{lex:Loc Col_CategorieNom}" 
                                    MinWidth="250"                                    
                                    Binding="{Binding CategorieNom}"/>

                <DataGridTextColumn Header="{lex:Loc Col_EnsembleNom}" 
                                    MinWidth="250"       
                                    Width="*"
                                    Binding="{Binding EnsembleNom}"/>

            </DataGrid.Columns>
        </DataGrid>
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />

    </Grid>
</UserControl>
```

