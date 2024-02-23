---
sidebar_position: 325
draft: true
---

# Navigation et paramètres

Il faut être en mesure de passer de la liste vers la gestion.

Il faut être en mesure d'envoyer des paramètres dans le navigateur et que le **ViewModel** les reçoive.

Dans ce cas-ci, il faut envoyer la clé **CategorieId** de l'élément sélectionné dans la liste dans le navigateur et le **GestionCategorieVM** doit le recevoir.

## Création de BaseParameterVM

Il faut créer une nouvelle classe abstraite pour les **ViewModel** pouvant recevoir des paramètres de la navigation.

Une nouvelle classe de base est nécessaire pour respecter le **L** de **SOLID**. Il ne faut pas utiliser une classe ne pouvant pas recevoir de paramètres dans la navigation avec paramètres.

Créez la classe **BaseParametreVM**, dans le dossier **ViewModels\Bases** du projet **SuperCarte.WPF**.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.ComponentModel;

namespace SuperCarte.WPF.ViewModels.Bases;

/// <summary>
/// Classe abstraite pour du View Models avec paramètre
/// </summary>
/// <typeparam name="TParametre">Type du paramètre</typeparam>
public abstract class BaseParametreVM<TParametre> : BaseVM
{
    /// <summary>
    /// Assigner des paramètres au ViewModel
    /// </summary>
    /// <param name="parametre">Paramètre à assigner</param>
    public abstract void AssignerParametre(TParametre parametre);
}
```

La classe est abstraite et elle hérite de **BaseVM** pour permettre la notification de paramètre.

<!-- ????  Également, le **ViewModel** actif est de type **BaseVM**. -->

La méthode **AssignerParametre** est également abstraite. Elle devra être implémentée obligatoirement dans la classe enfant.

La classe utilise le type générique **TParametre** pour contrôler ce que la classe peut recevoir comme paramètre.

S'il faut envoyer plusieurs paramètres, il faudra spécifier une classe. Dans le cas où c'est seulement une clé primaire, un type primitif sera suffisant.

## Modification de GestionCategorieVM

Il faut que la classe **GestionCategorieVM** hérite de la nouvelle classe de base **BaseParametreVM\<int>**.  Elle spécifie un **int** pour le type du paramètre, car la clé primaire est un entier (ligne 10).

Il faut également implémenter la méthode **AssignerParametre**. La méthode fait l'assignation du paramètre à la propriété **CategorieId** (ligne 136).

Voici la nouvelle classe **GestionCategorieVM**.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.Input;
using SuperCarte.Core.Models;
using SuperCarte.WPF.Views;

namespace SuperCarte.WPF.ViewModels;

/// <summary>
/// ViewModel de la vue Gestion Categorie
/// </summary>
//highlight-next-line
public class GestionCategorieVM : BaseParametreVM<int>
{
    #region Dépendances
    private readonly ICategorieService _categorieService;
    #endregion

    #region Attributs des propriétés
    private int _categorieId;
    private string _nom;
    private string? _description;
    private bool _estEnTravail = false;
    private bool _champsModifiables = true;
    #endregion

    public GestionCategorieVM(ICategorieService categorieService)
	{
        _categorieService = categorieService;

        EnregistrerCommande = new AsyncRelayCommand(EnregistrerAsync, () => !EstEnTravail);
        ObtenirCommande = new AsyncRelayCommand(ObtenirAsync, () => !EstEnTravail);
        NouveauCommande = new RelayCommand(Nouveau, () => !EstEnTravail);
    }

    #region Méthodes des commandes
    /// <summary>
    /// Enregistrer la catégorie
    /// </summary>    
    private async Task EnregistrerAsync()
    {
        ChampsModifiables = false;
        EstEnTravail = true;
        bool estEnregistre;

        CategorieModel categorieModel = VersModele();

        if (categorieModel.CategorieId == 0)
        {
            //La clé primaire est zéro, donc c'est une nouvelle catégorie
            estEnregistre = await _categorieService.AjouterAsync(categorieModel);
        }
        else
        {
            //La clé primaire n'est pas zéro, donc c'est une catégorie existante
            estEnregistre = await _categorieService.ModifierAsync(categorieModel);
        }

        if (estEnregistre == true)
        {
            VersVM(categorieModel);
        }
        else
        {
	        throw new Exception("Erreur. Impossible d'enregistrer");
        }

        EstEnTravail = false;
        ChampsModifiables = true;
    }

    /// <summary>
    /// Obtenir la catégorie
    /// </summary>
    /// <returns></returns>
    private async Task ObtenirAsync()
    {
        EstEnTravail = true;

        CategorieModel? categorieModel = await _categorieService.ObtenirAsync(CategorieId);

        VersVM(categorieModel);

        EstEnTravail = false;
    }

    /// <summary>
    /// Mettre le ViewModel en mode ajouter
    /// </summary>
    private void Nouveau()
    {
        CategorieId = 0;
        Nom = string.Empty;
        Description = null;
    }
    #endregion

    #region Commandes
    public IAsyncRelayCommand EnregistrerCommande { get; private set; }
    public IAsyncRelayCommand ObtenirCommande { get; private set; }
    public IRelayCommand NouveauCommande { get; private set; }
    #endregion   

    #region Méthodes d'assignation
    /// <summary>
    /// Assigner les propriétés liées du ViewModel vers les propriétés du modèle
    /// </summary>
    /// <returns>Objet du modèle</returns>
    private CategorieModel VersModele()
    {
        return new CategorieModel
        {
            CategorieId = this.CategorieId,
            Nom = this.Nom,
            Description = this.Description
        };
    }

    /// <summary>
    /// Assigner les propriétés du modèle vers les propriétés liées du ViewModel
    /// </summary>
    /// <param name="categorieModel">Modèle</param>
    private void VersVM(CategorieModel? categorieModel)
    {
        if (categorieModel != null)
        { 
            CategorieId = categorieModel.CategorieId;
            Nom = categorieModel.Nom;
            Description = categorieModel.Description;
        }
        else
        {
            CategorieId = 0;
            Nom = string.Empty;
            Description = null;
        }
    }

//highlight-start
    public override void AssignerParametre(int parametre)
    {
        CategorieId = parametre;
    }
    //highlight-end
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

    public int CategorieId
    {
        get 
        { 
            return _categorieId;
        }
        private set
        {
            SetProperty(ref _categorieId, value);
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

    public string? Description
    {
        get
        {
            return _description;
        }
        set
        {
            //Permet de remplacer une chaine vide par null
            SetProperty(ref _description, string.IsNullOrWhiteSpace(value) ? null : value );
        }
    }
    #endregion
}
```

## Modification du navigateur

Il faut **ajouter** la nouvelle méthode de navigation avec paramètre dans le navigateur.

:::warning Attention
Il ne faut pas remplacer la méthode naviguer() qui est présentement dans l'interface et la classe. Il faut ajouter cette nouvelle signature/fonction
:::

Dans l'interface **INavigateur**, il faut ajouter la signature de méthode ci-dessous.

Le type **TViewModel** a une restriction. Il doit être du type **BaseParametreVM\<TParameter>**. Il n'est donc pas possible d'envoyer un type de paramètre qui n'est pas supporté par le **ViewModel** avec cette restriction.

```csharp showLineNumbers
/// <summary>
/// Naviger vers un ViewModel et assigner un paramètre initial
/// </summary>
/// <typeparam name="TViewModel">Type du ViewModel</typeparam>
/// <typeparam name="TParameter">Type du paramètre</typeparam>
/// <param name="parametre">Paramètre initial</param>
void Naviguer<TViewModel, TParameter>(TParameter parametre) where TViewModel : BaseParametreVM<TParameter>;
```

Ajoutez la méthode dans la classe **Navigateur**.

En premier (ligne 3), une instance du **ViewModel** est créée par le **ServiceProvider**.

Ensuite (ligne 5), il faut assigner le paramètre au **ViewModel**.

Finalement (ligne 7), il faut indiquer le **ViewModel** comme celui qui est actif.

```csharp showLineNumbers
public void Naviguer<TViewModel, TParameter>(TParameter parametre) where TViewModel : BaseParametreVM<TParameter>
{
    BaseParametreVM<TParameter> baseParametreVM = _serviceProvider.GetRequiredService<TViewModel>();

    baseParametreVM.AssignerParametre(parametre);

    VMActif = baseParametreVM;
}
```

## Modification de ListeCategoriesVM

Premièrement, il faut injecter le **Navigateur** dans **ListeCategoriesVM** (ligne 13,25, et 28), car c'est **ListeCategoriesVM** qui s'occupe d'appeler **GestionCategorieVM** .

Il faut créer 2 nouvelles commandes dans la liste. La commande **Nouveau** et **Editer**. Ces commandes sont **synchrones**, car aucun appel asynchrone n’est utilisé (lignes 103 et 105).

À la ligne 31, la commande **NouveauCommande** a comme fonction d'exécuter la méthode **Naviguer** du **Navigateur**.

Il faut spécifier le type du **ViewModel** ainsi que le type du paramètre. Pour une nouvelle catégorie, il faut envoyer le paramètre **0**. Également, il faut utiliser une fonction **Lambda**, car la méthode a un paramètre.

À la ligne 32, la commande **EditerCommande** a comme fonction d'exécuter la méthode **Naviguer** du **Navigateur**.

Il faut spécifier le type du **ViewModel** ainsi que le type du paramètre. Il faut envoyer le **CategorieId** de la catégorie sélectionnée dans la liste. Également, il faut utiliser une fonction **Lambda**, car la méthode a un paramètre.

De plus, la commande est seulement disponible si une catégorie est sélectionnée ( CategorieSelection != null ).

Finalement, il faut notifier la commande **Editer** lorsque la catégorie sélectionnée est modifiée afin que le bouton soit disponible. (ligne 143)

Modifiez la classe **ListeCategoriesVM** avec le code ci-dessous.

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
    //highlight-next-line
    private readonly INavigateur _navigateur;

    //Attributs des propriétés
    private List<CategorieModel> _lstCategories;    
    private CategorieModel? _categorieSelection;
    private bool _estEnTravail = false;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="categorieService">Service du modèle Categorie</param>
    /// <param name="navigateur">La classe d'assistance Navigateur</param>
    //highlight-next-line
    public ListeCategoriesVM(ICategorieService categorieService, INavigateur navigateur)
    {
        _categorieService = categorieService;
        //highlight-next-line
        _navigateur = navigateur;
        ObtenirListeCommande = new AsyncRelayCommand(ObtenirListeAsync);
        SupprimerCommande = new AsyncRelayCommand(SupprimerAsync, PeutSupprimer);
        //highlight-start
        NouveauCommande = new RelayCommand(() => _navigateur.Naviguer<GestionCategorieVM, int>(0));
        EditerCommande = new RelayCommand(() => _navigateur.Naviguer<GestionCategorieVM, int>(CategorieSelection.CategorieId),
                                          () => CategorieSelection != null);
        //highlight-end
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
            //Aucune catégorie n'est sélectionnée
            return false;
        }
    }

    //Commandes
    public IAsyncRelayCommand ObtenirListeCommande { get; private set; }
    
    public IAsyncRelayCommand SupprimerCommande { get; private set; }

//highlight-start
    public IRelayCommand NouveauCommande { get; private set; }

    public IRelayCommand EditerCommande { get; private set; }
//highlight-end

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
                //highlight-next-line
                EditerCommande.NotifyCanExecuteChanged();
            }
        }
    }
}
```

## Lier les commandes aux boutons - UcListeCategories.xaml

Il faut lier les boutons **Nouveau** et **Éditer** aux commandes du **ViewModel** (ligne 7 et 10).

Modifiez le fichier **UcListeCategories.xaml** avec le code ci-dessous.

```xaml showLineNumbers
        <!--Rangée 1-->
        <WrapPanel Grid.Row="1" 
                    Orientation="Horizontal" VerticalAlignment="Center">

            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Nouveau_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Nouveau_Tooltip}"
                    Margin="5" Width="32" Height="32"
                    //highlight-next-line
                    Command="{Binding NouveauCommande}"/>
            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Tooltip}"
                    Margin="5" Width="32" Height="32"
                    //highlight-next-line
                    Command="{Binding EditerCommande}"/>
```

## Test - MainWindowVM

Pour tester, il faut modifier le **ViewModel** de départ dans le **MainWindowVM**.

Dans le constructeur, il faut naviguer vers le **ViewModel** initial.

```csharp showLineNumbers
    //Vue initiale
    _navigateur.Naviguer<ListeCategoriesVM>();
}
```

Démarrez l'application et testez les boutons **Nouveau** et **Éditer**.

:::note
Pour Éditer, lorsque vous arriverez sur l'écran de gestion, appuyez sur R afin de rafraichir l'écran. Ce petit problème est réglé dans la section suivante.
:::


