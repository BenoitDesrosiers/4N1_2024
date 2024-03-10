---
sidebar_position: 440
draft: true
---

# Message à l'utilisateur - MessageBox

Il n'y a aucun message pour indiquer à l'utilisateur qu'il n'a pas accès à la vue. Elle est non fonctionnelle, mais l'utilisateur peut penser qu'il s'agit d'un **bug**. Il faut donc l'avertir.

En programmation native **Windows**, le composant **MessageBox** est l'idéal pour ceci. Ce composant permet de faire un **popup**.

La notification doit se faire par le **ViewModel**. Le **ViewModel** ne doit pas connaitre la technique utilisée par la vue. Il faut donc créer une classe d'assistance.

## Classe d'assistance - Notification

Créez l'interface **INotification** dans le dossier **Aides** du projet **SuperCarte.WPF**.

```csharp showLineNumbers
namespace SuperCarte.WPF.Aides;

/// <summary>
/// Inteface qui représente la classe d'assistance pour les notifications avec l'utilisateur
/// </summary>
public interface INotification
{
    /// <summary>
    /// Affiche un message d'erreur à l'utilisateur
    /// </summary>
    /// <param name="titre">Titre du message</param>
    /// <param name="message">Le message d'erreur</param>
    void MessageErreur(string titre, string message);
}
```

Créez la classe **Notification** dans le dossier **Aides**.

```csharp showLineNumbers
using System.Windows;

namespace SuperCarte.WPF.Aides;

/// <summary>
/// Classe qui représente la classe d'assistance pour les notifications avec l'utilisateur
/// </summary>
public class Notification : INotification
{
    public void MessageErreur(string titre, string message)
    {
        MessageBox.Show(message, titre, MessageBoxButton.OK, MessageBoxImage.Error);
    }
}
```

Le composant **MessageBox** a besoin d'un titre, du message, du type de bouton et de l'icône.

Dans ce cas-ci, il y aura uniquement le bouton **OK** et l'icône sera celle d'une erreur.

## Enregistrement de la classe d'assistance - App.xaml.cs

Il faut enregistrer la classe d'assistance dans les services.

L'enregistrement se fait directement dans la classe **App.xaml.cs**.

Voici le nouveau constructeur.

À la ligne 22, l'enregistrement du **Notification** est fait avec un singleton. Il faut avoir seulement une instance de cette classe.

```csharp showLineNumbers
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
        services.AddLocalization();
        services.AddSingleton<MainWindow>(); //Fenêtre principale

        //Enregistrement du contexte    
        services.AddDbContext<SuperCarteContext>(options => options.UseSqlServer(context.Configuration.GetConnectionString("DefaultConnection")));

        //Enregistrement des classes d'assistance
        services.AddSingleton<INavigateur, Navigateur>();
        services.AddSingleton<IAuthentificateur, Authentificateur>();
        services.AddSingleton<INotification, Notification>();

        //Appel des méthodes d'extension                        
        services.EnregistrerRepositories();
        services.EnregistrerServices();
        services.EnregistrerValidateurs();
        services.EnregistrerViewModels();
    });

    _host = builder.Build();
}
```

## Utilisation dans le ViewModel - ListeCategoriesVM

Modifiez la classe **ListeCategoriesVM** par celle-ci.

Il faut injecter l'interface d'assistance **INotification** dans le **ViewModel** (lignes 18, 32 et 36).

Ensuite, dans le **else** de la méthode **EstAutorise()**, il faut afficher le message d'erreur (lignes 50, 67 et 88).

```csharp showLineNumbers
using CommunityToolkit.Mvvm.Input;
using SuperCarte.EF.Data;

namespace SuperCarte.WPF.ViewModels;

/// <summary>
/// ViewModel de la vue ListeCategories
/// </summary>
public class ListeCategoriesVM : BaseVM
{
    //Attributs
    private readonly string[] _rolesAutorises = { "Administrateur" };

    //Dépendances
    private readonly ICategorieService _categorieService;
    private readonly INavigateur _navigateur;
    private readonly IAuthentificateur _authentificateur;
    //highlight-next-line
    private readonly INotification _notification;

    //Attributs des propriétés
    private List<CategorieModel> _lstCategories;    
    private CategorieModel? _categorieSelection;
    private bool _estEnTravail = false;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="authentificateur">La classe d'assistance d'authentification</param>
    /// <param name="notification">La classe d'assistance pour la notification</param>
    /// <param name="categorieService">Service du modèle Categorie</param>
    /// <param name="navigateur">La classe d'assistance Navigateur</param>
//highlight-next-line
	public ListeCategoriesVM(IAuthentificateur authentificateur, INotification notification,
        ICategorieService categorieService, INavigateur navigateur)
    {
        _authentificateur = authentificateur;
        //highlight-next-line
        _notification = notification;

        if (_authentificateur.EstAutorise(_rolesAutorises))
        {
            _categorieService = categorieService;
            _navigateur = navigateur;
            ObtenirListeCommande = new AsyncRelayCommand(ObtenirListeAsync);
            SupprimerCommande = new AsyncRelayCommand(SupprimerAsync, PeutSupprimer);
            NouveauCommande = new RelayCommand(() => _navigateur.Naviguer<GestionCategorieVM, int>(0));
            EditerCommande = new RelayCommand(() => _navigateur.Naviguer<GestionCategorieVM, int>(CategorieSelection.CategorieId),
                                              () => CategorieSelection != null);
        }
        else
        {
            //highlight-next-line
            _notification.MessageErreur("Accès non autorisé.", "Vous n'avez pas accès à cette vue.");
        }
    }

    /// <summary>
    /// Obtenir la liste de catégories du service
    /// </summary>    
    private async Task ObtenirListeAsync()
    {
        EstEnTravail = true;

        if (_authentificateur.EstAutorise(_rolesAutorises))
        {
            ListeCategories = await _categorieService.ObtenirListeAsync();
        }
        else
        {
            //highlight-next-line
            _notification.MessageErreur("Accès non autorisé.", "Vous n'avez pas accès à cette fonctionnalité.");
        }

        EstEnTravail = false;
    }

    /// <summary>
    /// Supprimer la catégorie sélectionnée
    /// </summary>    
    private async Task SupprimerAsync()
    {
        EstEnTravail = true;

        if (_authentificateur.EstAutorise(_rolesAutorises))
        {
            await _categorieService.SupprimerAsync(CategorieSelection!.CategorieId);

            await ObtenirListeAsync();
        }
        else
        {
            //highlight-next-line
            _notification.MessageErreur("Accès non autorisé.", "Vous n'avez pas accès à cette fonctionnalité.");
        }

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

    public IRelayCommand NouveauCommande { get; private set; }

    public IRelayCommand EditerCommande { get; private set; }

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
                EditerCommande.NotifyCanExecuteChanged();
            }
        }
    }
}
```

Testez l'application avec les 2 utilisateurs. Avec **fsthilaire**, la vue sera accessible et fonctionnelle. Avec **tstark**, il y aura le message d'erreur.

Connectez-vous avec l'utilisateur **fsthilaire**. Modifiez le rôle de l'utilisateur pendant que l'utilisateur est connecté. Appuyez sur le bouton **R**. Vous allez recevoir un message.

```sql
UPDATE utilisateur SET RoleId = 2 WHERE UtilisateurId = 1;
```

Remettez l'utilisateur **fsthilaire** en tant qu'administrateur.

```sql
UPDATE utilisateur SET RoleId = 1 WHERE UtilisateurId = 1;
```

## Confirmation de la sauvegarde - Explication TP 3

À la fin d'une sauvegarde, il faut un indicateur visuel pour l'utilisateur. Il existe plusieurs façons d'indiquer à l'utilisateur que le formulaire est sauvegardé comme verrouiller le formulaire, écrire un message d'état ou une notification.

Pour le **TP 3**, vous devez afficher un **MessageBox** à l'utilisateur pour indiquer que l'item est bien sauvegardé.

Il faut mettre une icône d'information pour **MessageBoxImage**.

Pour plus d'information sur le **MessageBox** : https://wpf-tutorial.com/fr/45/dialogs/la-messagebox/

## Question pour la suppression - Explication TP 3

Avant de supprimer, il faut également demander à l'utilisateur s'il accepte de faire la suppression. Pour le **TP 3**, vous devez faire cette mécanique à partir de la liste et également à partir de la vue de gestion.

Dans la classe d'assistance **Notification**, vous devez ajouter une nouvelle méthode qui demande une acceptation à l'utilisateur. Si la méthode doit retourner un booléen. Si la méthode retourne **true**, c'est accepté, si c'est **false**, ce n'est pas accepté.

Dans l'implémentation de la méthode, il faut utiliser un **MessageBox**.

La méthode **MessageBox.Show** retourne une **enum** de type **MessageBoxResult**. 

Le résultat est en fonction du bouton qui a été appuyé par l'utilisateur. 

Pour afficher les boutons, il faut spécifier le bon **MessageBoxButton**.

Il faut également mettre une icône pour une question ou un avertissement avec le **MessageBoxImage**.

Il faut convertir le choix du bouton en booléen. 

Pour plus d'information sur le **MessageBox** : https://wpf-tutorial.com/fr/45/dialogs/la-messagebox/

