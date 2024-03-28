---
sidebar_position: 430
draft: true
---

# Autorisation

L'autorisation consiste à vérifier si un utilisateur est en mesure de faire une action et/ou de visualiser une certaine information.

Une vue qui est accessible par tous les utilisateurs authentifiés doit s'assurer qu'il y a un utilisateur qui est connecté.

L'application utilise des **rôles** également pour la sécurité. Il peut y avoir des vues et des actions du programme qui ne sont pas accessibles par tous. Il faut s'assurer que l'utilisateur a le rôle approprié.

Il faut injecter dans tous les **ViewModels** la classe d'assistance **Authentificateur** pour que le **ViewModel** soit en mesure de faire les vérifications.

Également, la vérification du rôle se fait toujours dans la base de données. La classe **UtilisateurAuthentifieModel** ne contient pas l'information du rôle. Il serait possible de l'inclure dans la classe, mais si le rôle de l'utilisateur est modifié en cours d'utilisation, son ancien rôle sera toujours accessible tant qu'il sera connecté. La validation du rôle directement dans la base de données permet de s'assurer que l'utilisateur a toujours le rôle nécessaire.

## SuperCarte.Core

### Requête ObtenirRoleUtilisateur - UtilisateurRepo

La méthode pour obtenir le rôle de l'utilisateur peut se retrouver dans **RoleRepo** ou dans **UtilisateurRepo**. La méthode retourne le **Role**, donc il pourrait être logique de le mettre dans **RoleRepo**. Pour d'autres, le rôle est obtenu par l'utilisateur, donc c'est une requête pour l'utilisateur.

Les 2 visions sont bonnes, mais il faut être cohérent. Si **RoleRepo** est choisi, la fonctionnalité doit être dans **RoleService**. Si **UtilisateurRepo** est choisi, la fonctionnalité doit être dans **UtilisateurService**.

Pour ce projet, ce sera **Utilisateur** qui aura les fonctionnalités pour l'authentification.

Dans l'interface **IUtilisateurRepo**, ajoutez ces 2 méthodes. 

Il y a la version **synchrone** et **asynchrone** de la requête.

```csharp showLineNumbers
/// <summary>
/// Obtenir le rôle d'un utilisateur en asynchrone
/// </summary>
/// <param name="utilisateurId">Utilisateur Id</param>
/// <returns>Le rôle de l'utilisateur ou null si l'utilisateur est inexistant</returns>
Task<Role?> ObtenirRoleUtilisateurAsync(int utilisateurId);

/// <summary>
/// Obtenir le rôle d'un utilisateur en asynchrone
/// </summary>
/// <param name="utilisateurId">Utilisateur Id</param>
/// <returns>Le rôle de l'utilisateur ou null si l'utilisateur est inexistant</returns>
Role? ObtenirRoleUtilisateur(int utilisateurId);
```

Dans la classe **UtilisateurRepo**, ajoutez les 2 méthodes ci-dessous.

```csharp showLineNumbers
public async Task<Role?> ObtenirRoleUtilisateurAsync(int utilisateurId)
{
    return await (from lqUtilisateur in _bd.UtilisateurTb
                  where
                       lqUtilisateur.UtilisateurId == utilisateurId
                  select
                       lqUtilisateur.Role).FirstOrDefaultAsync();
}

public Role? ObtenirRoleUtilisateur(int utilisateurId)
{
    return (from lqUtilisateur in _bd.UtilisateurTb
            where
                 lqUtilisateur.UtilisateurId == utilisateurId
            select
                 lqUtilisateur.Role).FirstOrDefault();
}
```

### Méthode VerifierRoleUtilisateur - UtilisateurService

Le service doit avoir une méthode pour vérifier si l'utilisateur possède l'un des rôles à vérifier.

Plusieurs rôles peuvent avoir accès à une fonctionnalité ou à une vue. Si l'utilisateur possède l'un de ses rôles, il sera autorisé.

Ajoutez ce code dans **IUtilisateurService**

```csharp showLineNumbers
/// <summary>
/// Vérifier l'autorisation d'un utilisateur à partir de rôles autorisés en asynchrone.
/// </summary>
/// <param name="utilisateurId">Utilisateur Id à autoriser</param>
/// <param name="lstNomRole">Liste des noms des rôles autorisés</param>
/// <returns>Vrai si l'utilisateur est autorisé, faux si non autorisé</returns>
Task<bool> AutoriserUtilisateurParRolesAsync(int utilisateurId, List<string> lstNomRole);

/// <summary>
/// Vérifier l'autorisation d'un utilisateur à partir de rôles autorisés en asynchrone.
/// </summary>
/// <param name="utilisateurId">Utilisateur Id à autoriser</param>
/// <param name="lstNomRole">Liste des noms des rôles autorisés</param>
/// <returns>Vrai si l'utilisateur est autorisé, faux si non autorisé</returns>
bool AutoriserUtilisateurParRoles(int utilisateurId, List<string> lstNomRole);
```

Dans la classe **UtilisateurService**, ajoutez ces 3 méthodes 

Il faut obtenir le rôle de l'utilisateur. Si le rôle est dans la liste des rôles autorisée, l'utilisateur reçoit l'autorisation. Si le rôle n'est pas dans la liste ou si l'utilisateur n'existe pas, il n'y a pas d'autorisation.

```csharp showLineNumbers
public async Task<bool> AutoriserUtilisateurParRolesAsync(int utilisateurId, List<string> lstNomRole)
{
    Role? role = await _utilisateurRepo.ObtenirRoleUtilisateurAsync(utilisateurId);

    return RoleAutorise(role, lstNomRole);

}

public bool AutoriserUtilisateurParRoles(int utilisateurId, List<string> lstNomRole)
{
    Role? role = _utilisateurRepo.ObtenirRoleUtilisateur(utilisateurId);

    return RoleAutorise(role, lstNomRole);

}

private bool RoleAutorise(Role? role, List<string> lstNomRole)
{
    if (role != null)
    {
        return lstNomRole.Contains(role.Nom);
    }
    else
    {
        return false;
    }
}
```

## SuperCarte.WPF

### Ajout de la méthode EstAutorise - Authentificateur

Dans l'interface **Aides/IAuthentificateur**, ajoutez les 2 méthodes ci-dessous.

```csharp showLineNumbers
/// <summary>
/// Vérifie si l'utilisateur est autorisé en fonction des rôles spécifiés en asynchrone.
/// </summary>
/// <param name="nomRoles">Nom des rôles autorisés</param>
/// <returns>Vrai si autorisé, faux si non autorisé</returns>
Task<bool> EstAutoriseAsync(params string[] nomRoles);

/// <summary>
/// Vérifie si l'utilisateur est autorisé en fonction des rôles spécifiés.
/// </summary>
/// <param name="nomRoles">Nom des rôles autorisés</param>
/// <returns>Vrai si autorisé, faux si non autorisé</returns>
bool EstAutorise(params string[] nomRoles);
```

Dans la classe **Authentificateur**, ajoutez les 2 méthodes ci-dessous.

La méthode reçoit un paramètre de type **params string[]**. Le mot-clé **params** permet de spécifier les différents éléments du tableau sans déclarer de tableau et en séparant un élément du tableau comme un paramètre unique. Par exemple, **EstAutoriseAsync("Role1", "Role2", "Role3")** est permis.

```csharp showLineNumbers
public async Task<bool> EstAutoriseAsync(params string[] nomRoles)
{
    if (UtilisateurAuthentifie != null)
    {
        return await _utilisateurService.AutoriserUtilisateurParRolesAsync(UtilisateurAuthentifie.UtilisateurId, nomRoles.ToList());
    }
    else
    {
        //highlight-next-line
        return await Task.FromResult(false);
    }
}

public bool EstAutorise(params string[] nomRoles)
{
    if (UtilisateurAuthentifie != null)
    {
        return _utilisateurService.AutoriserUtilisateurParRoles(UtilisateurAuthentifie.UtilisateurId, nomRoles.ToList());
    }
    else
    {
        return false;
    }
}
```

:::info
Remarquez que la version async de la fonction doit retourner une Task. C'est pour ca qu'à la ligne 9, la fonction **Task.FromResult()** est utilisée
::: 
### Sécuriser les dépendances du ViewModel

Il faut faire ceci pour les **ViewModels** qui nécessitent une autorisation.

L'exemple sera fait uniquement pour **ListeCategoriesVM**.

:::warning Important
Pour le TP3, vous devez le faire pour toutes les interfaces
:::

:::info
Le code de la classe au complet se trouve à la fin de cette section
:::

Il faut ajouter l'interface d'assistance **IAuthentificateur** dans les dépendances du **ViewModel**.

```csharp showLineNumbers 

public class ListeCategoriesVM : BaseVM
{
    //highlight-start
    //Attributs
    private readonly string[] _rolesAutorises = { "Administrateur" };
//highlight-end

    //Dépendances
    private readonly ICategorieService _categorieService;
    private readonly INavigateur _navigateur;
    //highlight-next-line
    private readonly IAuthentificateur _authentificateur;

.
.
.

/// <summary>
/// Constructeur
/// </summary>
/// <param name="authentificateur">La classe d'assistance d'authentification</param>
//highlight-next-line
/// <param name="categorieService">Service du modèle Categorie</param>
/// <param name="navigateur">La classe d'assistance Navigateur</param>    
//highlight-next-line
public ListeCategoriesVM(IAuthentificateur authentificateur, ICategorieService categorieService, INavigateur navigateur)
{
    //highlight-start
    _authentificateur = authentificateur;

    if (_authentificateur.EstAutorise(_rolesAutorises))
    {
        //highlight-end
        _categorieService = categorieService;
        _navigateur = navigateur;
        ObtenirListeCommande = new AsyncRelayCommand(ObtenirListeAsync);
        SupprimerCommande = new AsyncRelayCommand(SupprimerAsync, PeutSupprimer);
        NouveauCommande = new RelayCommand(() => _navigateur.Naviguer<GestionCategorieVM, int>(0));
        EditerCommande = new RelayCommand(() => _navigateur.Naviguer<GestionCategorieVM, int>(CategorieSelection.CategorieId),
                                          () => CategorieSelection != null);
    //highlight-next-line
    }
    
}
```

Les rôles globaux autorisés par ce **ViewModel** sont dans l'attribut **_rolesAutorises**. Si une vérification de rôle doit se faire à partir des rôles globaux, il est plus pratique d'utiliser un attribut. Il est **readonly**, car il ne faut pas que les rôles soient modifiables en exécution.

La seule dépendance à être assignée avant la sécurité est la classe **Authentificateur**. Les autres dépendances et la création des commandes se font uniquement si l'utilisateur est autorisé. Il ne sera pas possible d'utiliser les commandes et les services dans le cas ou l'utilisateur n'est pas autorisé.

Démarrez le programme avec le compte "Administrateur" ci-dessous.

- fsthilaire
- Native3!

Vous allez avoir accès à la vue.

Essayez maintenant avec le compte "Utilisateur" ci-dessous.

- tstark
- #NotAdmin!

La vue va générer une exception dans la méthode **UserControl_Loaded** pour le chargement automatique.

Voici l'événement du fichier **UcListeCategories.xaml.cs**.

Le programme **plante**, car la commande **ObtenirListeCommande** doit être exécutée, mais elle est **null**, car l'utilisateur n'a pas accès. Le **ViewModel** n'a pas créé la commande.

```csharp showLineNumbers title="NE PAS COPIER"
private async void UserControl_Loaded(object sender, RoutedEventArgs e)
{
    if(this.DataContext != null)
    {
        if(this.DataContext is ListeCategoriesVM)
        {
            await ((ListeCategoriesVM)this.DataContext).ObtenirListeCommande.ExecuteAsync(null);                
        }
    }
}
```

 Pour corriger, il faut remplacer l'événement par celle-ci. Il y a maintenant une vérification.

```csharp showLineNumbers
private async void UserControl_Loaded(object sender, RoutedEventArgs e)
{
    if(this.DataContext != null)
    {
        if(this.DataContext is ListeCategoriesVM)
        {
            //highlight-next-line
            if (((ListeCategoriesVM)this.DataContext).ObtenirListeCommande != null)
            {
                await ((ListeCategoriesVM)this.DataContext).ObtenirListeCommande.ExecuteAsync(null);
            }                
        }
    }
}
```

Essayez de nouveau avec le compte "Utilisateur" ci-dessous.

- tstark
- #NotAdmin!

La vue s'affiche, mais la liste est vide et aucun bouton ne fonctionne.

### Sécuriser les commandes du ViewModel

Le rôle d'un utilisateur peut être modifié pendant qu'il est connecté. Il faut s'assurer que les commandes effectuent la vérification de l'autorisation avant son exécution. Il serait possible de mettre cette vérification dans le **CanExecute** de la commande, mais il ne serait pas possible de détecter le changement d'un rôle en cours d'exécution. Il faut donc mettre la vérification dans la méthode **Execute**.

Voici par exemple la méthode **SupprimerAsync** de **ListeCategoriesVM**.

```csharp showLineNumbers
private async Task SupprimerAsync()
{
    EstEnTravail = true;

//highlight-next-line
    if (_authentificateur.EstAutorise(_rolesAutorises))
    //highlight-next-line
    {
        await _categorieService.SupprimerAsync(CategorieSelection!.CategorieId);

        await ObtenirListeAsync();
        //highlight-next-line
    }

    EstEnTravail = false;
}
```

Il serait possible, par exemple, de permettre la visualisation à **Utilisateur**, mais permettre la suppression uniquement à **Administrateur**.

Il faudrait ajouter dans l'attribut  **_rolesAutorises** le rôle **Utilisateur**, mais spécifier uniquement le rôle **Administrateur** dans la commande **Supprimer**.

```csharp showLineNumbers title="NE PAS COPIER"
private readonly string[] _rolesAutorises = { "Administrateur", "Utilisateur" };
.
.
.

private async Task SupprimerAsync()
{
    EstEnTravail = true;

//highlight-next-line
    if (_authentificateur.EstAutorise("Administrateur"))
    {
        await _categorieService.SupprimerAsync(CategorieSelection!.CategorieId);

        await ObtenirListeAsync();
    }

    EstEnTravail = false;
}

```

### ListeCategoriesVM au complet

Voici la classe **ListeCategoriesVM** au complet. 

:::info
Pour le **TP 3**, toutes les fonctionnalités  de la vue seront accessible par un seul rôle.
:::

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
//highlight-next-line
    private readonly string[] _rolesAutorises = { "Administrateur" };

    //Dépendances
    private readonly ICategorieService _categorieService;
    private readonly INavigateur _navigateur;
//highlight-next-line
    private readonly IAuthentificateur _authentificateur;

    //Attributs des propriétés
    private List<CategorieModel> _lstCategories;    
    private CategorieModel? _categorieSelection;
    private bool _estEnTravail = false;

    /// <summary>
    /// Constructeur
    /// </summary>
//highlight-next-line
    /// <param name="authentificateur">La classe d'assistance d'authentification</param>
    /// <param name="categorieService">Service du modèle Categorie</param>
    /// <param name="navigateur">La classe d'assistance Navigateur</param>   
    //highlight-next-line 
	public ListeCategoriesVM(IAuthentificateur authentificateur, ICategorieService categorieService, INavigateur navigateur)
    {
//highlight-next-line
        _authentificateur = authentificateur;

//highlight-start
        if (_authentificateur.EstAutorise(_rolesAutorises))
        {
//highlight-end
            _categorieService = categorieService;
            _navigateur = navigateur;
            ObtenirListeCommande = new AsyncRelayCommand(ObtenirListeAsync);
            SupprimerCommande = new AsyncRelayCommand(SupprimerAsync, PeutSupprimer);
            NouveauCommande = new RelayCommand(() => _navigateur.Naviguer<GestionCategorieVM, int>(0));
            EditerCommande = new RelayCommand(() => _navigateur.Naviguer<GestionCategorieVM, int>(CategorieSelection.CategorieId),
                                              () => CategorieSelection != null);
//highlight-next-line
        }
    }

    /// <summary>
    /// Obtenir la liste de catégories du service
    /// </summary>    
    private async Task ObtenirListeAsync()
    {
        EstEnTravail = true;
        
//highlight-next-line
        if (_authentificateur.EstAutorise(_rolesAutorises))
        {
            ListeCategories = await _categorieService.ObtenirListeAsync();
        }

        EstEnTravail = false;
    }

    /// <summary>
    /// Supprimer la catégorie sélectionnée
    /// </summary>    
    private async Task SupprimerAsync()
    {
        EstEnTravail = true;

//highlight-next-line
        if (_authentificateur.EstAutorise(_rolesAutorises))
        {
            await _categorieService.SupprimerAsync(CategorieSelection!.CategorieId);

            await ObtenirListeAsync();
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
            //Il y a une catégorie sélectionnée

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

