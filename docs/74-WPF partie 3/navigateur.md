---
sidebar_position: 300
draft: true
---

# Navigateur

Dans ce document, vous implémenterez la mécanique de navigation entre les différentes vues.

Vous ajouterez également un menu à l'application.

Ensuite, vous allez faire la vue de gestion pour être en mesure de créer et de modifier des éléments de la base de données. Il faudra mettre en place la validation du formulaire et également la navigation entre la liste et la gestion.

Finalement, vous allez implémenter un **ComboBox** pour spécifier la valeur d'une clé étrangère.

## Navigation

Pour être en mesure de passer d'une vue à l'autre, il faut une mécanique de navigation.

**WPF** n'offre pas de mécanique intégrée, car le choix du type de vue est très varié. Il est possible de faire un changement de contrôle utilisateur dans une fenêtre principal comme pour ce projet. Il est possible de gérer de nouvelles fenêtres, de faire une application avec des pages WPF ou un mélange de tout ceci.

La navigation est propre à la vue. Dans certaines technologies, c'est entièrement la vue qui gère le changement, car c'est plus facile. Dans d'autres, il est plus pratique de le faire par le **ViewModel**. Parfois, il faut faire un mélange des deux.

Il est important que le **ViewModel** ne connaisse pas la mécanique de changement de **Vue**. Il doit seulement indiquer qu'il faut changer de **ViewModel** et c'est la couche **Vue** qui gère la mécanique.

Pour ce projet, ce sera le **ViewModel ** qui va demander les changements de **Vue**.

## Classe d'assistance - Navigateur

Une classe d'assistance, d'aide ou **helper** en anglais est une classe qui assiste un élément logiciel pour effectuer une tâche précise.

Elle est parfois nommée **fournisseur** ou **provider**, car elle fournit un service précis à une composante.

Il peut avoir des classes d'assistance à toutes les couches de l'application.

Le navigateur est une classe d'assistance pour le **ViewModel**.

Dans le projet **SuperCarte.WPF**, créez le dossier **Aides**. Ce dossier contiendra les classes d'assistances.

Créez l'interface **INavigateur.cs**.

```c#
namespace SuperCarte.WPF.Aides;

/// <summary>
/// Interface qui contient la mécanique de navigation
/// </summary>
public interface INavigateur
{
    BaseVM VMActif { get; }

    /// <summary>
    /// Naviger vers un ViewModel
    /// </summary>
    /// <typeparam name="TViewModel">Type du ViewModel</typeparam>
    void Naviguer<TViewModel>() where TViewModel : BaseVM;
}
```

L'interface possède la propriété **VMActif**. Cette propriété indique à la fenêtre principale qu'elle est le **ViewModel** qu'elle doit utiliser.

Ensuite, la méthode **`Naviguer`** est générique. Il faudra spécifier le type du **ViewModel** qui doit être affiché. Le type générique peut être uniquement une classe qui hérite de la classe abstraite **BaseVM**.

Créez la classe **Navigateur.cs**.

```c#
using CommunityToolkit.Mvvm.ComponentModel;
using Microsoft.Extensions.DependencyInjection;

namespace SuperCarte.WPF.Aides;

/// <summary>
/// Classe qui contient la mécanique de navigation de l'application
/// </summary>
public class Navigateur : ObservableObject, INavigateur
{
    private readonly IServiceProvider _serviceProvider;
    private BaseVM _vmActif;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="serviceProvider">Service Provider</param>
    public Navigateur(IServiceProvider serviceProvider)
	{
        _serviceProvider = serviceProvider;
    }    

    public void Naviguer<TViewModel>() where TViewModel : BaseVM
    {        
        VMActif = _serviceProvider.GetRequiredService<TViewModel>();         
    }

    public BaseVM VMActif
    {
        get 
        { 
            return _vmActif; 
        }
        private set
        {
            SetProperty(ref _vmActif, value);
        }
    }
}
```

La classe a besoin du **ServiceProvider** pour créer des instances de **ViewModel**.

La méthode **`Naviguer`** utilise le **ServiceProvider** pour créer une instance en fonction du type du **ViewModel** demandé.

L'instance est associée à la propriété **VMActif**. Cette propriété sera liée dans la fenêtre principale. Pour cette raison, la classe doit hériter de **ObservableObject** de la librairie **MVVM Toolkit** pour avoir accès à la mécanique de notification.

## Ajout de références dans Usings.cs

Dans le fichier **Usings.cs**, ajoutez le nouveau **`namespace`**.

```c#
global using SuperCarte.WPF; //Les classes à la racine de l'application WPF
global using SuperCarte.EF.Data; //Les classes du modèle du contexte
global using SuperCarte.EF.Data.Context; // La classe du contexte
global using SuperCarte.Core.Services;
global using SuperCarte.Core.Models;
global using SuperCarte.WPF.ViewModels;
global using SuperCarte.WPF.ViewModels.Bases;
global using SuperCarte.WPF.Aides;
global using System.Collections.Generic;
global using System.Threading.Tasks;
global using System;
```

## Enregistrement du service - App.xaml.cs

Il faut enregistrer le navigateur dans les services.

L'enregistrement se fait directement dans la classe **App.xaml.cs**.

Voici le nouveau constructeur.

À la ligne 19, l'enregistrement du navigateur est fait avec un singleton. Il faut avoir seulement une instance de cette classe.

```c#
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

        //Enregistrement des classes d'assistance
        services.AddSingleton<INavigateur, Navigateur>();

        //Appel des méthodes d'extension                        
        services.EnregistrerRepositories();
        services.EnregistrerServices();            
        services.EnregistrerValidateurs();
        services.EnregistrerViewModels();
    });

    _host = builder.Build();
}
```

## Intégration du navigateur - MainWindowVM

Il faut modifier la classe **MainWindowVM.cs** pour qu'elle utilise le navigateur.

La classe a plusieurs changements.

Le constructeur reçoit maintenant le **Navigateur** au lieu du **ServiceProvider** comme dépendance.

À la ligne 13, il y a l'assignation de la vue de départ en utilisant le navigateur.

```c#
namespace SuperCarte.WPF.ViewModels;

public class MainWindowVM : BaseVM
{
    private readonly INavigateur _navigateur;

    public MainWindowVM(INavigateur navigateur)
	{   
        //Sélectionner le ViewModel de démarrage        
        _navigateur = navigateur;

        //Vue initiale
        _navigateur.Naviguer<ListeCartesVM>();
    }

    public INavigateur Navigateur
    { 
        get
        {
            return _navigateur;
        }
    }   
}
```

La propriété de liaison est maintenant le **Navigateur** et non directement **VMActif**. La mécanique de notification est dans le **Navigateur**.

Il n'est pas possible de le faire comme ci-dessous. Car la **Vue** est liée à la propriété parent et elle ne considèrera pas la notification de changement de la propriété enfant **`_navigateur.ActiveVM`** comme lui appartenant. La notification doit se faire directement sur la propriété qui est liée. Il n'est pas possible de recevoir la notification par des intermédiaires.

```c#
public BaseVM ActiveVM
{
    get
    {
        return _navigateur.ActiveVM;
    }
}
```

## Liaison du navigateur - MainWindow.xaml

Il faut modifier la liaison du composant **`<ContentControl>`** pour utiliser le navigateur.

Le changement est à la ligne 27. **` <ContentControl  Content="{Binding Navigateur.VMActif}" />`**.

```c#
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
        <DataTemplate DataType="{x:Type TypeName=vm:HelloWordVM}">
            <!--À retirer éventuellement-->
            <v:UcHelloWorld />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:ListeCategoriesVM}">
            <v:UcListeCategories />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:ListeCartesVM}">
            <v:UcListesCartes />
        </DataTemplate>
    </Window.Resources>
    <Grid>
        <ContentControl  Content="{Binding Navigateur.VMActif}" />
    </Grid>
</Window>
```

Démarrez l'application et la liste de carte sera la vue initiale.

# Menu

La navigation par le menu va utiliser une **commande** pour utiliser le **Navigateur**. Il y a plusieurs designs de menu possible, mais le plus classique dans les applications natives Windows est la barre de menu.

Le menu doit être toujours accessible, peu importe la vue active. Le menu sera dans la fenêtre principale de l'application et les commandes dans son **ViewModel**.

## Création des commandes - MainWindowVM

Modifiez la classe **MainWindowVM.cs**.

Les lignes 22 et 24, il y a les 2 commandes pour la navigation. Les commandes pour la navigation doivent avoir le préfixe **Naviguer** avec le nom du **ViewModel**. Les commandes sont synchrones. Le changement de vue doit se faire en synchrone.

Les lignes 15 et 16, il y a la création des commandes dans le constructeur. Il est possible de leur assigner directement la méthode du navigateur sans créer une méthode interne au **ViewModel**. Lorsqu'une commande utilise une classe d'assistance, il est préférable de l'utiliser directement.

```c#
using CommunityToolkit.Mvvm.Input;

namespace SuperCarte.WPF.ViewModels;

public class MainWindowVM : BaseVM
{
    private readonly INavigateur _navigateur;

    public MainWindowVM(INavigateur navigateur)
	{   
        //Sélectionner le ViewModel de démarrage        
        _navigateur = navigateur;

        //Création des commandes
        NaviguerListeCartesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCartesVM>);
        NaviguerListeCategoriesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCategoriesVM>);

        //Vue initiale
        _navigateur.Naviguer<HelloWordVM>();
    }

    public IRelayCommand NaviguerListeCartesVMCommande {  get; private set; }

    public IRelayCommand NaviguerListeCategoriesVMCommande { get; private set; }

    public INavigateur Navigateur
    { 
        get
        {
            return _navigateur;
        }
    }   
}
```

## Création du menu dans la vue - MainWindow.xaml

Modifiez le code du  **MainWindow.xaml** par celui-ci.

```c#
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

La fenêtre a maintenant 2 rangées dans sa grille.

La première rangée sera pour le menu et la 2e pour la vue.

La hauteur de la première rangée est automatique afin d'avoir un menu qui s'adapte en fonction 

```xaml
<Grid.RowDefinitions>
    <RowDefinition Height="auto"/>
    <RowDefinition Height="*"/>
</Grid.RowDefinitions>
```

Ensuite, la barre de menu classique utilise le composant **`<Menu>`**. Chaque élément du menu est un composant **`<MenuItem>`**. Il est possible d'imbriquer les **`<MenuItem>`** pour faire des sous-menus.

Les propriétés **`HorizontalContentAlignment`** et **`VerticalAlignment`** ont la valeur **`Stretch`** pour prendre tout l'espace disponible. Il n'est pas nécessaire de mettre le menu dans un **`<WrapPanel>`**.

Le **`<MenuItem>`** peut être assigné à une commande.

La navigation d'une barre de menu classique peut se faire par le clavier en appuyant sur la touche **ALT**. Le menu indique la lettre qu'il faut appuyer pour sélectionner le menu. Cette lettre est soulignée. Pour être en mesure d'assigner cette lettre, il faut mettre la barre en bas **(underscore)** avant la lettre. Pour le menu fichier, le nom est **`_Fichier`** , donc c'est le **F**. Pour le menu **Liste des c_atégories**, c'est le **a**, car le **c**  est déjà utilisé dans ce sous-menu.

Par convention, on prend la première lettre si elle est disponible.

```xaml
<Menu Grid.Row="0" HorizontalContentAlignment="Stretch" VerticalAlignment="Stretch">
    <MenuItem Header="_Fichier">
        <MenuItem Header="_Quitter" />
    </MenuItem>
    <MenuItem Header="_Administration">
        <MenuItem Header="Liste des _cartes" Command="{Binding NaviguerListeCartesVMCommande}"/>
        <MenuItem Header="Liste des c_atégories" Command="{Binding NaviguerListeCategoriesVMCommande}"/>
    </MenuItem>            
</Menu>
```

Démarrez le logiciel et il sera possible de naviguer avec le menu.

Diminuez la taille de la fenêtre et le menu s'ajustera.

## Pour le TP 3

Il faut que le menu soit traduit avec les fichiers ressources. N'oubliez pas la lettre pour le raccourci.

# Ajouter une catégorie

Pour être en mesure d'ajouter une catégorie, il faut créer une vue de gestion. Cette vue s'occupera de la visualisation, de la création et de la modification.

## SuperCarte.Core

### Méthode d'extension - CategorieMapExtension

Cette méthode sera utile pour mettre à jour l'objet du domaine à partir de l'objet de données. Lors d'un ajout dans la base de données, **Entity Framework** va récupérer les nouvelles valeurs dans l'objet de donnée, dont la clé primaire. Il faut également mettre à jour les valeurs dans l'objet du domaine.

Dans la classe **CategorieMapExtension**, ajoutez la méthode ci-dessous.

Cette méthode d'extension aura 2 paramètres visibles lorsqu'elle sera utilisée. Le premier est l'objet du domaine de référence qui sera utilisée pour faire la copie dans l'objet de données qui possède l'extension. La 2e méthode est pour copier ou non la valeur de la clé primaire.

```c#
/// <summary>
/// Méthode qui copie les valeurs des propriétés de l'objet de donnée Categorie dans l'objet du modèle CategorieModel
/// </summary>
/// <param name="itemDestination">CategorieModel à recevoir la copie (destination)</param>
/// <param name="categorieSource">L'objet Categoriede référence pour la copie (source)</param>
/// <param name="copierClePrimaire">Copier de la clé primaire</param>
public static void Copie(this CategorieModel itemDestination, Categorie categorieSource, bool copierClePrimaire)
{
    if (copierClePrimaire == true)
    {
        itemDestination.CategorieId = categorieSource.CategorieId;
    }

    itemDestination.Nom = categorieSource.Nom;
    itemDestination.Description = categorieSource.Description;
}
```

### Méthode Ajouter dans le service - CategorieService

Il faut ajouter dans le service la méthode d'ajout. La méthode est très simple pour le moment. Elle sera un peu plus complexe lors de la validation.

Dans l'interface **ICategorieService.cs**, ajoutez la signature de la méthode ci-dessous.

```c#
/// <summary>
/// Ajouter une catégorie en asynchrone.
/// </summary>
/// <param name="categorieModel">Catégorie à ajouter</param>
/// <returns>Vrai si ajoutée, faux si non ajoutée</returns>
Task<bool> AjouterAsync(CategorieModel categorieModel);
```

Dans la classe **CategorieService.cs**, ajoutez l'implémentation de la méthode.

```c#
public async Task<bool> AjouterAsync(CategorieModel categorieModel)
{
    //Transformation de l'objet du modèle du domaine en objet du modèle de données
    Categorie categorie = categorieModel.VersCategorie();

    //Ajout dans repository avec enregistrement immédiat
    await _categorieRepo.AjouterAsync(categorie, true);

    //Assigne les valeurs de la base de données dans l'objet du modèle
    categorieModel.Copie(categorie, true);
    
    return true;
}
```

Il faut convertir l'objet **CaterogieModel** en **Categorie**, car le **Repository** utilise le modèle de données.

Il faut mettre à jour les valeurs dans l'objet du domaine, principalement pour connaitre la clé primaire. Il n'est pas nécessaire au **Respository** de retourner l'objet, car il met à jour la même instance. Le même principe sera utilisé pour le service.

## SuperCarte.WPF

### Création du ViewModel - GestionCategorieVM

Créez la classe **GestionCategorieVM.cs** dans le dossier **ViewModels** du projet **SuperCarte.WPF**.

Premièrement, il faut ajouter les dépendances du **ViewModel**. Il y a seulement le service des catégories.

```c#
namespace SuperCarte.WPF.ViewModels;

/// <summary>
/// ViewModel de la vue Gestion Categorie
/// </summary>
public class GestionCategorieVM : BaseVM
{
    #region Dépendances
    private readonly ICategorieService _categorieService;
    #endregion

    public GestionCategorieVM(ICategorieService categorieService)
	{
        _categorieService = categorieService;
    }
}

```

Ensuite, il faut penser aux propriétés de la vue.

Il y a 2 options pour les propriétés. 

La première est de créer une propriété dans le **ViewModel** pour chacune des propriétés du **modèle du domaine**. 

```c#
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
```

La 2e option est de créer une propriété dans le **ViewModel** pour l'objet du modèle comme ci-dessous.

```c#
//ViewModel
public CategorieModel Categorie { get; set;}

//Vue
<TextBox Text="{Binding Categorie.Nom }" />

```

Dans la 2e option, il n'y a pas la mécanique de notification du changement de valeur de propriété. Comme il a été présenté pour la vue active du navigateur, la notification doit se faire directement sur la propriété qui est liée.

Il faudrait donc modifier la classe du modèle pour hériter de **ObservableObject** et avoir un attribut pour conserver la valeur de la propriété. 

Par exemple.

```c#
public class CategorieModel : ObservableObject
{
	public string _nom;
	
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
}
```

L'avantage de la première approche est que le modèle du domaine est indépendant de la logique **MVVM**. Le service peut être réutilisé dans un API Web et cette mécanique n'est pas nécessaire pour celle-ci. Par contre, il faut penser de faire la transformation entre les propriétés du **ViewModel** et le **modèle de données** dans le **ViewModel**.

L'avantage de la 2e approche est qu'il n'est pas nécessaire de faire la transformation entre le **ViewModel** et le **modèle de données**. Par contre, le modèle a une mécanique de notification qui n'est pas toujours nécessaire selon le type d'architecture.

Pour ce projet et le **TP 3**, la première approche sera utilisée.

Il faut créer les propriétés liées. Pour s'aider à faire l'assignation entre le **ViewModel** et le **modèle**, les méthodes **`VersModele()`** et **`VersVM()`** sont ajoutées. Il serait possible d'utiliser une librairie **Mapper** pour ceci. Si le **CategorieModel** est **`null`**, les valeurs par défaut du **ViewModel** seront assignées.

Également, la propriété **CategorieId** qui représente la clé primaire peut seulement être assignée par le **ViewModel**. Il ne faut pas que la **Vue** soit en mesure de la modifier.

À la ligne 90, l'assignation de la propriété a une vérification de chaine vide. Dans le cas que la chaine est vide ou avec uniquement des espaces, il faut retourner **`null`**, car c'est un champ non obligatoire. Il sera important de faire ceci pour tous les champs non obligatoires du **TP 3**.

```c#
#region Attributs des propriétés
private int _categorieId;
private string _nom;
private string? _description;
private bool _estEnTravail = false; 
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
```

Ensuite, il faut créer la commande **Enregistrer**. L'ajout et la modification utiliseront la même commande. Selon l'état du **ViewModel**, le **ViewModel** déterminera si c'est un ajout ou une modification. Pour l'instant, la logique est uniquement pour l'ajout.

Dans la méthode **`EnregistrerAsync()`**, l'utilisation des méthodes d'assignation est nécessaire pour récupérer les valeurs de la vue et de les mettre à jour.

```c#
public GestionCategorieVM(ICategorieService categorieService)
{
    _categorieService = categorieService;

    EnregistrerCommande = new AsyncRelayCommand(EnregistrerAsync);
}

#region Méthodes des commandes
/// <summary>
/// Enregistrer la catégorie
/// </summary>    
private async Task EnregistrerAsync()
{
    EstEnTravail = true;
    bool estEnregistre;

    CategorieModel categorieModel = VersModele();

    estEnregistre = await _categorieService.AjouterAsync(categorieModel);

    if (estEnregistre == true)
    {
        VersVM(categorieModel);
    }
    else
    {
        //Envoyer un message d'erreur à la vue
        throw new Exception("Erreur. Impossible d'enregistrer");
    }

    EstEnTravail = false;
}
#endregion

#region Commandes
public IAsyncRelayCommand EnregistrerCommande { get; private set; }
#endregion   
```

Voici la classe finale.

```c#
using CommunityToolkit.Mvvm.Input;
using SuperCarte.WPF.Views;

namespace SuperCarte.WPF.ViewModels;

/// <summary>
/// ViewModel de la vue Gestion Categorie
/// </summary>
public class GestionCategorieVM : BaseVM
{
    #region Dépendances
    private readonly ICategorieService _categorieService;
    #endregion

    #region Attributs des propriétés
    private int _categorieId;
    private string _nom;
    private string? _description;
    private bool _estEnTravail = false;
    #endregion

    public GestionCategorieVM(ICategorieService categorieService)
	{
        _categorieService = categorieService;

        EnregistrerCommande = new AsyncRelayCommand(EnregistrerAsync);
    }

    #region Méthodes des commandes
	/// <summary>
    /// Enregistrer la catégorie
    /// </summary>    
    private async Task EnregistrerAsync()
    {
        EstEnTravail = true;
        bool estEnregistre;

        CategorieModel categorieModel = VersModele();

        estEnregistre = await _categorieService.AjouterAsync(categorieModel);

        if (estEnregistre == true)
        {
            VersVM(categorieModel);
        }
        else
        {           
            throw new Exception("Erreur. Impossible d'enregistrer");
        }

        EstEnTravail = false;
    }
    #endregion

    #region Commandes
    public IAsyncRelayCommand EnregistrerCommande { get; private set; }
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

    public int CategorieId
    {
        get 
        { 
            return _categorieId;
        }
        set
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

### Enregistrer le ViewModel - SCViewModelExtensions

Dans la classe **SCViewModelExtensions**, il faut enregistrer le **ViewModel**.

```c#
public static void EnregistrerViewModels(this IServiceCollection services)
{
    services.AddTransient<MainWindowVM>();
    services.AddTransient<ListeCategoriesVM>();
    services.AddTransient<ListeCartesVM>();
    services.AddTransient<GestionCategorieVM>();
}
```

### Création de la vue - UcGestionCategorie.xaml

Cette vue n'utilisera pas les fichiers ressources pour la traduction, mais dans la réalité, il faudrait prévoir ceci.

Les boutons de la vue devraient utiliser une ressource globale. Pensez à le faire pour le **TP 3**.

Créez le fichier **UcGestionCategorie.xaml** dans le dossier **Views**.

Voici la coquille du composant.

La première étape consiste à indiquer le **ViewModel** qui sera utilisé. Ce n'est pas obligatoire, mais en ajoutant les lignes 7 et 8 ci-dessous, il sera possible d'avoir des suggestions lors du **Binding**.

La grille principale est séparée en 4 rangées. La première pour le titre, la 2e pour les boutons, la 3e pour le formulaire et la 4e pour la barre de progression.

Le bouton **Enregistrer** est déjà lié à la commande 

```c#
<UserControl x:Class="SuperCarte.WPF.Views.UcGestionCategorie"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
             d:DataContext="{d:DesignInstance vm:GestionCategorieVM}"
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
            Text="Gestion d'une catégorie"/>

        <!--Rangée 1-->
        <WrapPanel Grid.Row="1" 
                    Orientation="Horizontal" VerticalAlignment="Center">

            <Button Content="N" ToolTip="Nouveau"
                    Margin="5" Width="32" Height="32" />
            <Button Content="E" ToolTip="Enregistrer"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding EnregistrerCommande}"/>
            <Button Content="R" ToolTip="Rafraichir"
                    Margin="5" Width="32" Height="32" />
        </WrapPanel>

        <!--Rangée 2-->
        <!-- Formulaire -->
        
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />

    </Grid>
</UserControl>
```

Pour faire le formulaire, il est possible d'intégrer un **Grid** dans un autre **Grid**.

Il faut 2 colonnes pour le formulaire. La première pour le titre et la 2e pour le composant de saisie.

Le formulaire s'adapte à la largeur de la fenêtre, mais si la largeur est trop petite, elle ne sera pas fonctionnelle. Il serait possible de faire comme en Web de passer à une colonne si la largeur est insuffisante, mais il faudrait intégrer des **`<WrapPanel>`** et plusieurs sous **Grid**.

Il faut prévoir un espace en dessous du contrôle pour afficher le message de validation. Il est assez compliqué en **XAML** de rendre ceci dynamique, car le message n'est pas considéré dans la grille. Il est plus facile d'utiliser une taille fixe.

Il est possible d'appliquer un **Padding** pour ajuster l'emplacement du texte à l'intérieur de la zone de texte.

```xaml
<!--Rangée 2-->
<!-- Formulaire -->
<Grid Grid.Row="2">
    <Grid.RowDefinitions>
        <RowDefinition Height="auto"></RowDefinition>
        <RowDefinition Height="auto"></RowDefinition>
    </Grid.RowDefinitions>
    <Grid.ColumnDefinitions>
        <ColumnDefinition Width="auto"/>
        <ColumnDefinition Width="*" />
    </Grid.ColumnDefinitions>
    
    <!-- Nom -->
    <Label Grid.Row="0" Grid.Column="0" 
           Content="Nom : "
           Margin="5 10 5 10" 
           FontWeight="Bold"/>
    <TextBox Grid.Row="0" Grid.Column="1" 
             Text="{Binding Nom}" 
             Padding="2 4 0 0"
             Margin="0 10 5 10"/>

    <!-- Description -->
    <Label Grid.Row="1" Grid.Column="0" 
           Content="Description : "
           Margin="5 10 5 10" 
           FontWeight="Bold"/>
    <TextBox Grid.Row="1" Grid.Column="1" 
             Padding="2 4 0 0"
             Text="{Binding Description}"                      
             Margin="0 10 5 10"/>

</Grid>
```

Voici le fichier au complet.

```xaml
<UserControl x:Class="SuperCarte.WPF.Views.UcGestionCategorie"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
             d:DataContext="{d:DesignInstance vm:GestionCategorieVM}"
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
            Text="Gestion d'une catégorie"/>

        <!--Rangée 1-->
        <WrapPanel Grid.Row="1" 
                    Orientation="Horizontal" VerticalAlignment="Center">

            <Button Content="N" ToolTip="Nouveau"
                    Margin="5" Width="32" Height="32" />
            <Button Content="E" ToolTip="Enregistrer"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding EnregistrerCommande}"/>
            <Button Content="R" ToolTip="Rafraichir"
                    Margin="5" Width="32" Height="32" />
        </WrapPanel>

        <!--Rangée 2-->
        <!-- Formulaire -->
        <Grid Grid.Row="2">
            <Grid.RowDefinitions>
                <RowDefinition Height="auto"></RowDefinition>
                <RowDefinition Height="auto"></RowDefinition>
            </Grid.RowDefinitions>
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="auto"/>
                <ColumnDefinition Width="*" />
            </Grid.ColumnDefinitions>
            
            <!-- Nom -->
            <Label Grid.Row="0" Grid.Column="0" 
                   Content="Nom : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="0" Grid.Column="1" 
                     Text="{Binding Nom}" 
                     Padding="2 4 0 0"
                     Margin="0 10 5 10"/>

            <!-- Description -->
            <Label Grid.Row="1" Grid.Column="0" 
                   Content="Description : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="1" Grid.Column="1" 
                     Text="{Binding Description}" 
                     Padding="2 4 0 0"
                     Margin="0 10 5 10"/>

        </Grid>
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />

    </Grid>
</UserControl>
```

### Ajout de la ressource pour créer le lien entre ViewModel et Vue - MainWindow.xaml

Il faut ajouter dans les ressources le lien entre le **ViewModel** et la **Vue**.

Les lignes 25 à 27 contiennent le lien entre **UcGestionCategorie** et **GestionCategorieVM**.

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

### Test - MainWindowsVM

Pour tester, il faut modifier le **ViewModel** de départ dans le **MainWindowVM**.

Dans le constructeur, il faut naviguer vers le **ViewModel** initial (ligne 11).

```c#
public MainWindowVM(INavigateur navigateur)
{   
    //Sélectionner le ViewModel de démarrage        
    _navigateur = navigateur;

    //Création des commandes
    NaviguerListeCartesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCartesVM>);
    NaviguerListeCategoriesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCategoriesVM>);

    //Vue initiale
    _navigateur.Naviguer<GestionCategorieVM>();
}
```

Démarrez l'application et inscrivez du texte dans les 2 champs. Appuyez sur le bouton enregistrer.

Vous pouvez vérifier le fonctionnement en regardant dans la base de données avec **SSMS** ou mettre la **ListeCategorieVM** comme **ViewModel** de base.

# Modifier une catégorie

Pour être en mesure de modifier une catégorie, il faut afficher dans la vue la catégorie qui a été spécifiée par la clé.

Il faut donc intégrer une mécanique de chargement dans le **ViewModel** de la catégorie en fonction d'une clé primaire.

## SuperCate.Core

### Méthode d'extension - CategorieMapExtension

Pour faire la mise à jour avec **Entity Framework**, il faut préalablement récupérer l'objet de données. Ensuite, il faut lui assigner les nouvelles valeurs et enregistrer le contexte. Il est important de ne pas faire une copie de l'objet et d'utiliser la même instance.

Dans la classe **CategorieMapExtension**, ajoutez la méthode ci-dessous.

Cette méthode d'extension aura 2 paramètres visibles lorsqu'elle sera utilisée. Le premier est l'objet du domaine de référence qui sera utilisée pour faire la copie dans l'objet de données qui possède l'extension. La 2e méthode est pour copier ou non la valeur de la clé primaire.

```c#
/// <summary>
/// Méthode qui copie les valeurs des propriétés du CatégorieModel dans l'objet de donnée Categorie
/// </summary>
/// <param name="itemDestination">Categorie à recevoir la copie (destination)</param>
/// <param name="categorieModelSource">L'objet CategorieModel de référence pour la copie (source)</param>
/// <param name="ignoreClePrimaire">Ignore la copie de la clé primaire</param>
public static void Copie(this Categorie itemDestination, CategorieModel categorieModelSource, bool ignoreClePrimaire = true)
{
    if(ignoreClePrimaire == false)
    {
        itemDestination.CategorieId = categorieModelSource.CategorieId;
    }

    itemDestination.Nom = categorieModelSource.Nom;
    itemDestination.Description = categorieModelSource.Description;
}
```

### Méthode Obtenir et Modifier dans le service - CategorieService

Il faut ajouter dans le service la méthode pour obtenir et pour modifier une catégorie. La méthode est très simple pour le moment. Elle sera un peu plus complexe lors de la validation.

Dans l'interface **ICategorieService.cs**, ajoutez la signature des méthodes ci-dessous.

```c#
/// <summary>
/// Modifier une catégorie en asynchrone
/// </summary>
/// <param name="categorieModel">Catégorie à modifier</param>    
/// <returns>Vrai si ajoutée, faux si non ajoutée</returns>
Task<bool> ModifierAsync(CategorieModel categorieModel);

/// <summary>
/// Obtenir une catégorie en partir de sa clé primaire en asynchrone.
/// </summary>
/// <param name="categorieId">Clé primaire de la catégorie</param>
/// <returns>La catégorie ou null si la catégorie n'est pas trouvée</returns>
Task<CategorieModel?> ObtenirAsync(int categorieId);
```

Dans la classe **CategorieService.cs**, ajoutez l'implémentation de la méthode **Modifier**.

```c#
public async Task<bool> ModifierAsync(CategorieModel categorieModel)
{
    Categorie? categorie = await _categorieRepo.ObtenirParCleAsync(categorieModel.CategorieId);

    if(categorie != null)
    {
        //Assigner les valeurs dans la catégorie
        categorie.Copie(categorieModel);

        await _categorieRepo.EnregistrerAsync();

        //Assigne les valeurs de la base de données dans l'objet du modèle
        categorieModel.Copie(categorie, false);
        
        return true;
    }
    else
    {
        throw new Exception("Impossible de modifier la catégorie. Aucune catégorie trouvée avec la clé primaire.");
    }
}
```

Il faut copier l'objet **CaterogieModel** dans **Categorie**, car le **Repository** utilise le modèle de données.

Voici la méthode **Obtenir**.

```c#
public async Task<CategorieModel?> ObtenirAsync(int categorieId)
{
    Categorie? categorie = await _categorieRepo.ObtenirParCleAsync(categorieId);
  
    //Le ?. est important, car si la catégorie n'est pas trouvée, l'objet sera null
    return categorie?.VersCategorieModel();
}
```

## SuperCarte.WPF

### Modification du ViewModel - GestionCategorieVM

Modifiez la classe **GestionCategorieVM.cs** par le code ci-dessous.

Premièrement, il faut créer une commande pour obtenir la catégorie. (ligne 81)

Ensuite, il faut créer la méthode qui sera utilisée par la commande. (ligne 63)

Dans le constructeur, la commande est créée pour la lier à la méthode **`ObtenirAsync()`**. (ligne 28)

La méthode **`EnregistrerAsync()`** est modifiée. Il y a maintenant une vérification en fonction de la clé primaire. Si elle est à 0, c'est-à-dire que c'est une nouvelle catégorie. Par contre, si la clé primaire a une valeur différente de 0, la vue est en mode modification.

Dans le constructeur, à la ligne 30, une clé primaire est assignée pour simuler la modification de la catégorie #2.

```c#
using CommunityToolkit.Mvvm.Input;
using SuperCarte.Core.Models;
using SuperCarte.WPF.Views;

namespace SuperCarte.WPF.ViewModels;

/// <summary>
/// ViewModel de la vue Gestion Categorie
/// </summary>
public class GestionCategorieVM : BaseVM
{
    #region Dépendances
    private readonly ICategorieService _categorieService;
    #endregion

    #region Attributs des propriétés
    private int _categorieId;
    private string _nom;
    private string? _description;
    private bool _estEnTravail = false; 
    #endregion

    public GestionCategorieVM(ICategorieService categorieService)
	{
        _categorieService = categorieService;

        EnregistrerCommande = new AsyncRelayCommand(EnregistrerAsync);
        ObtenirCommande = new AsyncRelayCommand(ObtenirAsync);
        
        CategorieId = 2;//Pour test
    }

    #region Méthodes des commandes
    /// <summary>
    /// Enregistrer la catégorie
    /// </summary>    
    private async Task EnregistrerAsync()
    {
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
    #endregion

    #region Commandes
    public IAsyncRelayCommand EnregistrerCommande { get; private set; }

    public IAsyncRelayCommand ObtenirCommande { get; private set; }
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

### Modification de la vue - UcGestionCategorie.xaml

Il faut lier le bouton rafraichir à la commande **ObtenirCommande**.

Également, il faut charger automatiquement la catégorie.

Modifiez le fichier **UcGestionCategorie.xaml** pour le code ci-dessous.

À la ligne 37, le bouton rafraichir est lié à la commande **ObtenirCommande**.

```xaml
<UserControl x:Class="SuperCarte.WPF.Views.UcGestionCategorie"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
             d:DataContext="{d:DesignInstance vm:GestionCategorieVM}"
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
            Text="Gestion d'une catégorie"/>

        <!--Rangée 1-->
        <WrapPanel Grid.Row="1" 
                    Orientation="Horizontal" VerticalAlignment="Center">

            <Button Content="N" ToolTip="Nouveau"
                    Margin="5" Width="32" Height="32" />
            <Button Content="E" ToolTip="Enregistrer"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding EnregistrerCommande}"/>
            <Button Content="R" ToolTip="Rafraichir"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding ObtenirCommande}"/>
        </WrapPanel>

        <!--Rangée 2-->
        <!-- Formulaire -->
        <Grid Grid.Row="2">
            <Grid.RowDefinitions>
                <RowDefinition Height="auto"></RowDefinition>
                <RowDefinition Height="auto"></RowDefinition>
            </Grid.RowDefinitions>
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="auto"/>
                <ColumnDefinition Width="*" />
            </Grid.ColumnDefinitions>
            
            <!-- Nom -->
            <Label Grid.Row="0" Grid.Column="0" 
                   Content="Nom : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="0" Grid.Column="1" 
                     Text="{Binding Nom}" 
                     Padding="2 4 0 0"
                     Margin="0 10 5 10"/>

            <!-- Description -->
            <Label Grid.Row="1" Grid.Column="0" 
                   Content="Description : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="1" Grid.Column="1" 
                     Text="{Binding Description}"
                     Padding="2 4 0 0"
                     Margin="0 10 5 10"/>

        </Grid>
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />
    </Grid>
</UserControl>
```

### Tests

#### Test 1 - Rafraichissement

Appuyez sur le bouton rafraichir. La catégorie **Orcs** devrait être affichée. 

Modifiez un champ sans enregistrer et appuyez sur le bouton rafraichir.

Le champ aura de nouveau sa valeur initiale.

#### Test 2 - Modification

Modifiez les champs et enregistrez les modifications.

Vérifiez dans la base de données. Les valeurs seront modifiées.

#### Test 3 - Nouveau et rafraichir

Dans le **ViewModel**, retirez la ligne **`CategorieId = 2; //Pour tester uniquement`** du constructeur.

Le **ViewModel** sera en mode **ajouter**.

Modifiez un champ sans enregistrer et appuyez sur le bouton rafraichir.

Le champ aura de nouveau sa valeur par défaut.

#### Test 4 - Nouveau et modifier

Créez une nouvelle catégorie et enregistrez.

Vérifiez dans la base de données pour voir le nouvel enregistrement.

Ensuite, modifiez un des champs et enregistrez de nouveau.

Vérifiez dans la base de données et l'enregistrement aura la nouvelle valeur.

Le **ViewModel** passe en mode **modifier** après un ajout, car il a une clé primaire.

## Verrouiller le formulaire et les boutons

Lorsque le formulaire est en cours d'enregistrement, il est toujours modifiable. Il est difficile à visualiser, car c'est très rapide.

Pour le visualiser, il faut ajouter un délai artificiel dans la commande **Enregistrer**.

Dans la classe **GestionCategorieVM.cs**, modifiez temporairement la méthode **`EnregistrerAsync()`** par celle-ci.

```c#
private async Task EnregistrerAsync()
{
    EstEnTravail = true;

    //Délai artificiel
    await Task.Delay(5000);

    CategorieModel categorieModel = VersModele();

    if (categorieModel.CategorieId == 0)
    {
        //La clé primaire est zéro, donc c'est une nouvelle catégorie
        await _categorieService.AjouterAsync(categorieModel);
    }
    else
    {
        //La clé primaire n'est pas zéro, donc c'est une catégorie existante
        await _categorieService.ModifierAsync(categorieModel);
    }

    VersVM(categorieModel);

    EstEnTravail = false;
}
```

Démarrez l'application et enregistrez. Il est toujours possible de modifier les valeurs. Également, le bouton Rafraichir est disponible. Lorsqu'une commande est en cours d'exécution, il ne faudrait pas que les autres soient disponibles.

Il faut donc créer une propriété **ChampsModifiables** et la lier à la propriété **IsEnabled** de la grille du formulaire.

Lorsque l'enregistrement débutera, il faut mettre à jour la propriété **ChampsModifiables** pour empêcher la modification. À la fin de l'enregistrement, il fait permettre de nouveau la modification.

Modifiez la classe **GestionCategorieVM.cs**.

À la ligne 21, il y a l'attribut **`_champsModifiables`** et sa propriété **`ChampsModifiables`** à la ligne 136.

Aux lignes 40 et 62 de la méthode **`EnregistrerAsync()`**, la commande indique si le formulaire est modifiable ou non.

```c#
using CommunityToolkit.Mvvm.Input;
using SuperCarte.Core.Models;
using SuperCarte.WPF.Views;

namespace SuperCarte.WPF.ViewModels;

/// <summary>
/// ViewModel de la vue Gestion Categorie
/// </summary>
public class GestionCategorieVM : BaseVM
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

        EnregistrerCommande = new AsyncRelayCommand(EnregistrerAsync);
        ObtenirCommande = new AsyncRelayCommand(ObtenirAsync);
                
        CategorieId = 3; //Pour tester uniquement
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
        
        //Délai artificiel
        await Task.Delay(5000);

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
    #endregion

    #region Commandes
    public IAsyncRelayCommand EnregistrerCommande { get; private set; }

    public IAsyncRelayCommand ObtenirCommande { get; private set; }
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

Dans le fichier **UcGestionCategorie.xaml**, il faut lier la propriété **`IsEnabled`** à la propriété **`ChampsModifiables`** du **ViewModel **(ligne 42).

```xaml
<UserControl x:Class="SuperCarte.WPF.Views.UcGestionCategorie"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
             d:DataContext="{d:DesignInstance vm:GestionCategorieVM}"
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
            Text="Gestion d'une catégorie"/>

        <!--Rangée 1-->
        <WrapPanel Grid.Row="1" 
                    Orientation="Horizontal" VerticalAlignment="Center">

            <Button Content="N" ToolTip="Nouveau"
                    Margin="5" Width="32" Height="32" />
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
            
            <!-- Nom -->
            <Label Grid.Row="0" Grid.Column="0" 
                   Content="Nom : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="0" Grid.Column="1" 
                     Text="{Binding Nom}" 
                     Padding="2 4 0 0"
                     Margin="0 10 5 10"/>

            <!-- Description -->
            <Label Grid.Row="1" Grid.Column="0" 
                   Content="Description : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="1" Grid.Column="1" 
                     Text="{Binding Description}"
                     Padding="2 4 0 0"
                     Margin="0 10 5 10"/>

        </Grid>
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />

    </Grid>
</UserControl>
```

Démarrez l'application et effectuez une modification. Le formulaire ne sera pas modifiable pendant l'enregistrement.

La raison pour laquelle la propriété **EstEnTravail** n'est pas utilisée est que le formulaire doit rester accessible lors d'un rafraichissement. Sinon il aurait un **clignotement**.

Il reste à régler la disponibilité des boutons.

Dans la classe **GestionCategorieVM**, il faut ajouter une méthode pour le **CanExecute** pour la commande.

Pour ce cas, ce sera la propriété **`EstEnTravail`** qui déterminera si les commandes sont disponibles ou non.Il est possible de le faire directement sans créer de sous-méthode.

```c#
EnregistrerCommande = new AsyncRelayCommand(EnregistrerAsync, () => !EstEnTravail);
ObtenirCommande = new AsyncRelayCommand(ObtenirAsync, () => !EstEnTravail);
```

Il faut également notifier les commandes lorsque la propriété **EstEnTravail** est modifiée.

```c#
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
        }
    }
}
```

Voici la classe **GestionCategorieVM.cs** au complet.

```c#
using CommunityToolkit.Mvvm.Input;
using SuperCarte.Core.Models;
using SuperCarte.WPF.Views;

namespace SuperCarte.WPF.ViewModels;

/// <summary>
/// ViewModel de la vue Gestion Categorie
/// </summary>
public class GestionCategorieVM : BaseVM
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
                
        CategorieId = 3; //Pour tester uniquement
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

        //Délai artificiel
        await Task.Delay(5000);

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
    #endregion

    #region Commandes
    public IAsyncRelayCommand EnregistrerCommande { get; private set; }

    public IAsyncRelayCommand ObtenirCommande { get; private set; }
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

Démarrez l'application et effectuez un enregistrement. Pendant l'enregistrement, les boutons ne sont pas accessibles.

## Bouton nouveau

Dans une fenêtre de gestion, il peut être intéressant d'ajouter plusieurs éléments sans toujours revenir à la liste.

Le bouton nouveau de la fenêtre de gestion permet d'indiquer au **ViewModel** de se mettre en état **Ajouter**.

Il faut créer une nouvelle commande **NouveauCommande** dans le **ViewModel**.

Voici la classe **GestionCategorieVM.cs**.

À la ligne 92, la commande est déclarée. Elle est en **synchrone**, car elle n'appelle aucune méthode **asynchrone**. Elle effectue seulement la réinitialisation des propriétés du **ViewModel**.

À la ligne 79, la méthode **`Nouveau()`** met le champ **CategorieId** à zéro et les autres champs avec leur valeur initiale.

À la ligne 30, la commande est assignée à la méthode dans le constructeur. La commande à la même logique de **CanExecute** que les autres. 

À la ligne 144, il faut notifier la commande **Nouveau** que son état de **CanExecute** est modifié.

```c#
using CommunityToolkit.Mvvm.Input;
using SuperCarte.Core.Models;
using SuperCarte.WPF.Views;

namespace SuperCarte.WPF.ViewModels;

/// <summary>
/// ViewModel de la vue Gestion Categorie
/// </summary>
public class GestionCategorieVM : BaseVM
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

# Navigation entre la liste et la gestion

Il faut être en mesure de passer de la liste vers la gestion.

Il faut être en mesure d'envoyer des paramètres dans le navigateur et que le **ViewModel** les reçoit.

Dans ce cas-ci, il faut envoyer la clé **CategorieId** de l'élément sélectionné dans la liste dans le navigateur et le **GestionCategorieVM** doit le recevoir.

## Création de BaseParameterVM

Il faut créer une nouvelle classe abstraite pour les **ViewModel** qui peuvent recevoir des paramètres de la navigation.

Une nouvelle classe de base est nécessaire pour respecter le **L** de **SOLID**. Il ne faut pas utiliser une classe qui ne peut pas recevoir de paramètre dans la navigation avec paramètre.

Créez la classe **BaseParametreVM**, dans le dossier **ViewModels\Bases** du projet **SuperCarte.WPF**.

```c#
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

La classe est abstraite et elle hérite de **BaseVM** pour permettre la notification de paramètre. Également, le **ViewModel** actif est de type **BaseVM**.

La méthode **`AssignerParametre`** est également abstraite. Elle devra être implémentée obligatoirement dans la classe enfant.

La classe utilise le type générique **`TParametre`** pour contrôler ce que la classe peut recevoir comme paramètre.

S'il faut envoyer plusieurs paramètres, il faudra spécifier une classe. Dans le cas que c'est seulement une clé primaire, un type primitif sera suffisant.

## Modification du ViewModel de type gestion - GestionCategorieVM

Il faut que la classe **GestionCategorieVM** hérite de la nouvelle classe de base **`BaseParametreVM<int>`**.  Elle spécifie un **`int`** pour le type du paramètre, car la clé primaire est un entier (ligne 10).

Il faut également implémenter la méthode **`AssignerParametre`**. La méthode fait l'assignation du paramètre à la propriété **CategorieId** (ligne 130).

Voici la nouvelle classe **GestionCategorieVM**.

```c#
using CommunityToolkit.Mvvm.Input;
using SuperCarte.Core.Models;
using SuperCarte.WPF.Views;

namespace SuperCarte.WPF.ViewModels;

/// <summary>
/// ViewModel de la vue Gestion Categorie
/// </summary>
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

    public override void AssignerParametre(int parametre)
    {
        CategorieId = parametre;
    }
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

Il faut ajouter la nouvelle méthode de navigation avec paramètre dans le navigateur.

Dans l'interface **INavigateur**, il faut ajouter la signature de méthode ci-dessous.

Le type **`TViewModel`** a une restriction. Il doit être du type **`BaseParametreVM<TParameter>`**. Il n'est donc pas possible d'envoyer un type de paramètre qui n'est pas supporté par le **ViewModel** avec cette restriction.

```c#
/// <summary>
/// Naviger vers un ViewModel et assigner un paramètre initial
/// </summary>
/// <typeparam name="TViewModel">Type du ViewModel</typeparam>
/// <typeparam name="TParameter">Type du paramètre</typeparam>
/// <param name="parametre">Paramètre initial</param>
void Naviguer<TViewModel, TParameter>(TParameter parametre) where TViewModel : BaseParametreVM<TParameter>;
```

Ajoutez la méthode dans la classe **Navigateur**.

En premier, une instance du **ViewModel** est créée par le **ServiceProvider**.

Ensuite, il faut assigner le paramètre au **ViewModel**.

Finalement, il faut indiquer le **ViewModel** comme celui qui est actif.

```c#
public void Naviguer<TViewModel, TParameter>(TParameter parametre) where TViewModel : BaseParametreVM<TParameter>
{
    BaseParametreVM<TParameter> baseParametreVM = _serviceProvider.GetRequiredService<TViewModel>();

    baseParametreVM.AssignerParametre(parametre);

    VMActif = baseParametreVM;
}
```

## Modification du ViewModel de type liste - ListeCategoriesVM

Premièrement, il faut injecter le **Navigateur** dans le **ViewModel**, car c'est le**ViewModel** qui s'occupe d'appeler le **ViewModel** de gestion (ligne 25).

Il faut créer 2 nouvelles commandes dans la liste. La commande **Nouveau** et **Editer**. Ces commandes sont **synchrones**, car aucun appel asynchrone n’est utilisé (lignes 103 et 105).

À la ligne 31, la commande **NouveauCommande** a comme fonction d'exécution la méthode **`Naviguer`** du **Navigateur**.

Il faut spécifier le type du **ViewModel** ainsi que le type du paramètre. Pour une nouvelle catégorie, il faut envoyer le paramètre **0**. Également, il faut utiliser une fonction **Lambda**, car la méthode a un paramètre.

```c#
NouveauCommande = new RelayCommand(() => _navigateur.Naviguer<GestionCategorieVM, int>(0));
```

À la ligne 32, la commande **EditerCommande** a comme fonction d'exécution la méthode **`Naviguer`** du **Navigateur**.

Il faut spécifier le type du **ViewModel** ainsi que le type du paramètre. Pour une nouvelle catégorie, il faut envoyer le **CategorieId** de la catégorie sélectionnée dans la liste. Également, il faut utiliser une fonction **Lambda**, car la méthode a un paramètre.

De plus, la commande est seulement disponible si une catégorie est sélectionnée.

```c#
EditerCommande = new RelayCommand(() => _navigateur.Naviguer<GestionCategorieVM, int>(CategorieSelection.CategorieId),
                                  () => CategorieSelection != null);
```

Finalement, il faut notifier la commande **Editer** lorsque la catégorie sélectionnée est modifiée. (ligne 143)

Modifiez la classe **ListeCategoriesVM** avec le code ci-dessous.

```c#
using CommunityToolkit.Mvvm.Input;
using SuperCarte.EF.Data;

namespace SuperCarte.WPF.ViewModels;

/// <summary>
/// ViewModel de la vue ListeCategories
/// </summary>
public class ListeCategoriesVM : BaseVM
{
    //Dépendances
    private readonly ICategorieService _categorieService;
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
	public ListeCategoriesVM(ICategorieService categorieService, INavigateur navigateur)
    {
        _categorieService = categorieService;
        _navigateur = navigateur;
        ObtenirListeCommande = new AsyncRelayCommand(ObtenirListeAsync);
        SupprimerCommande = new AsyncRelayCommand(SupprimerAsync, PeutSupprimer);
        NouveauCommande = new RelayCommand(() => _navigateur.Naviguer<GestionCategorieVM, int>(0));
        EditerCommande = new RelayCommand(() => _navigateur.Naviguer<GestionCategorieVM, int>(CategorieSelection.CategorieId),
                                          () => CategorieSelection != null);
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

## Lier les commandes aux boutons - UcListeCategories.xaml

Il faut lier les boutons **Nouveau** et **Éditer** aux commandes du **ViewModel** (ligne 41 et 44).

Modifiez le fichier **UcListeCategories.xaml** avec le code ci-dessous.

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
                    Margin="5" Width="32" Height="32"
                    Command="{Binding NouveauCommande}"/>
            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Tooltip}"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding EditerCommande}"/>
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

## Test - MainWindowVM

Pour tester, il faut modifier le **ViewModel** de départ dans le **MainWindowVM**.

Dans le constructeur, il faut naviguer vers le **ViewModel** initial (ligne 11).

```c#
public MainWindowVM(INavigateur navigateur)
{   
    //Sélectionner le ViewModel de démarrage        
    _navigateur = navigateur;

    //Création des commandes
    NaviguerListeCartesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCartesVM>);
    NaviguerListeCategoriesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCategoriesVM>);

    //Vue initiale
    _navigateur.Naviguer<ListeCategoriesVM>();
}
```

Démarrez l'application et testez les boutons **Nouveau** et **Éditer**.

# Chargement automatique

Pour une vue de gestion, il arrive souvent que le chargement automatique s'effectue en **synchrone**.

Si le chargement est long, il ne faut pas avoir un formulaire vide. Il est préférable d'attendre le chargement initial avant d'afficher la vue. 

Il est possible de le verrouiller au départ pour éviter la modification si le chargement se fait en asynchrone. Mais même si le délai n'est pas énorme, il est possible de voir un **clignotement** entre champ vide et maintenant des valeurs.

Pour ce projet et le **TP 3**, le chargement automatique se fera en **synchrone**. Également, il est idéal que ce soit le **ViewModel** qui gère le chargement automatique lorsqu'il reçoit le paramètre de la clé primaire.

Le chargement se fera lors de l'assignation des paramètres du **ViewModel**.

## SuperCarte.Core

### Ajout de la méthode Obtenir en synchrone dans le service - CategorieService

Dans l'interface **ICategorieService**, il faut ajouter la signature de la méthode ci-dessous.

```c#
/// <summary>
/// Obtenir une catégorie en partir de sa clé primaire.
/// </summary>
/// <param name="categorieId">Clé primaire de la catégorie</param>
/// <returns>La catégorie ou null si la catégorie n'est pas trouvée</returns>
CategorieModel? Obtenir(int categorieId);
```

Dans la classe **CategorieService**, il faut ajouter l'implémentation de la méthode.

```c#
public CategorieModel? Obtenir(int categorieId)
{
    Categorie? categorie = _categorieRepo.ObtenirParCle(categorieId);

    //Le ?. est important, car si la catégorie n'est pas trouvée, l'objet sera null
    return categorie?.VersCategorieModel();
}
```

## SuperCarte.WPF

### Modification du ViewModel - GestionCategorieVM 

Il faut mettre à jour la méthode **`AssignerParametre`** dans la classe **GestionCategorieVM** pour appeler la méthode **synchrone** pour obtenir la catégorie.

```c#
public override void AssignerParametre(int parametre)
{
    CategorieId = parametre;

    CategorieModel? categorieModel = _categorieService.Obtenir(CategorieId);

    VersVM(categorieModel);
}
```

# Validation

Avant d'ajouter ou de modifier un élément dans la base de données, il faut vérifier si les valeurs sont valides.

La validation est un service spécialisé. Le service principal utilisera le service de validation avant d'effectuer une création ou une modification.

Pour faire la validation, la librairie **FluentValidation** sera utilisée.

Chaque propriété peut avoir une seule erreur. Dès qu'une erreur est rencontrée pour une propriété, il faut arrêter la validation de cette propriété. **WPF** permet la gestion de plusieurs erreurs par propriété, mais son affichage est complexe.

Pour plus d'information sur la librairie : https://docs.fluentvalidation.net/en/latest/

## SuperCarte.Core

### Installation de la librairie

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. Il est important que le **Projet par défaut** **.Core** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.Core**.

```
Install-Package FluentValidation
```

### Création du modèle de validation - ValidationModel

Il faut une classe pour contenir le résultat d'une validation. Il serait possible de prendre celle de **FluentValidation**, mais l'application aurait une dépendance directe avec la librairie. En créant une classe propre au programme, il est possible d'avoir une façade entre la validation et les autres couches de l'application.

Créez la classe **ValidationModel** dans le dossier **Models**.

```c#
namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient l'information de la validation
/// </summary>
public class ValidationModel
{
    public ValidationModel()
    {
        ErreurParPropriete = new Dictionary<string, string>();
    }

    /// <summary>
    /// Assigner une erreur pour une propriété du modèle
    /// </summary>
    /// <param name="propriete">Nom de la propriété</param>
    /// <param name="erreur">Message d'erreur</param>
    public void AssignerErreur(string propriete, string erreur)
    {
        if(ErreurParPropriete.ContainsKey(propriete) == false)
        {
            ErreurParPropriete.Add(propriete, erreur);
        }
        else
        {
            ErreurParPropriete[propriete] = erreur;
        }
    } 
    
    public Dictionary<string, string> ErreurParPropriete { get; private set; }

    public bool EstValide
    {
        get
        {
            return !ErreurParPropriete.Any();
        }
    }
}
```

### Méthode d'extension - ValidationModelExtension

Il faut créer une méthode d'extension pour passer de **ValidationResult** qui provient de la librairie **FluentValidation** à **ValidationModel**.

Attention, la classe **ValidationResult** se retrouve dans plusieurs **`namespace`**. Assurez-vous d'utiliser celle de **`FluentValidation.Results;`**

Créez la classe **ValidationModelExtension** dans le dossier **Extensions**.

```c#
using FluentValidation.Results;
using SuperCarte.Core.Models;

namespace SuperCarte.Core.Extensions;

/// <summary>
/// Classe statique qui regroupe les méthodes d'extension pour la conversion (mapping) du modèle ValidationModel
/// </summary>
public static class ValidationModelExtension
{
    /// <summary>
    /// Convertir un objet ValidationResult vers un objet ValidationModel
    /// </summary>
    /// <param name="validationResult">Objet à convertir</param>
    /// <returns>Objet converti</returns>
    public static ValidationModel VersValidationModel(this ValidationResult validationResult)
    {
        ValidationModel validationModel = new ValidationModel();

        if (validationResult.IsValid == false)
        {
            foreach(var erreur in validationResult.Errors)
            {
                validationModel.AssignerErreur(erreur.PropertyName, erreur.ErrorMessage);
            }
        }
        return validationModel;
    }
}
```

### Création du validateur - CategorieValidateur

Créez l'interface **IValidateur.cs** dans le dossier **Validateurs**.

L'interface est générique. Les validateurs auront tous la même interface, il est donc possible de la généraliser en fonction du modèle à valider.

```c#
using SuperCarte.Core.Models;
namespace SuperCarte.Core.Validateurs;

/// <summary>
/// Interface qui valide un modèle du domaine
/// </summary>
/// <typeparam name="TModele">Type du modèle du domaine à valider</typeparam>
public interface IValidateur<TModele> where TModele : class
{
    /// <summary>
    /// Valider un objet du modèle du domaine
    /// </summary>
    /// <param name="modele">Modèle à valider</param>
    /// <returns>Résultat de la validation</returns>
    Task<ValidationModel> ValiderAsync(TModele modele);
}
```

Créez la classe **CategorieValidateur.cs**.

À la ligne 11, la classe implémente l'interface **IValidateur** en spécifiant le modèle à valider. À la ligne 25, la méthode à implémenter est spécifiquement pour **CategorieModel**.

La classe doit également hériter de la classe **AbstractValidator** qui provient de la librairie **FluentValidation**.

Dans le constructeur, il faut appliquer les règles de validation pour chacune des propriétés du modèle.

**FluentValidation** utilise un **API Fluent** par des méthodes chainées.

```c#
using FluentValidation;
using FluentValidation.Results;
using SuperCarte.Core.Extensions;
using SuperCarte.Core.Models;

namespace SuperCarte.Core.Validateurs;

/// <summary>
/// Classe qui valide le modèle CategorieModel
/// </summary>
public class CategorieValidateur : AbstractValidator<CategorieModel>, IValidateur<CategorieModel>
{
    public CategorieValidateur()
    {
        RuleFor(i => i.Nom).Cascade(CascadeMode.Stop)
            .NotNull().WithMessage("Le nom est obligatoire.")
            .NotEmpty().WithMessage("Le nom est obligatoire.")
            .MaximumLength(35).WithMessage("Le nom doit avoir 35 caractères au maximum.");


        RuleFor(i => i.Description).Cascade(CascadeMode.Stop)
            .MaximumLength(50).WithMessage("La description doit avoir 50 caractères au maximum.");
    }

    public async Task<ValidationModel> ValiderAsync(CategorieModel modele)
    {
        ValidationResult validationResult = await base.ValidateAsync(modele);

        return validationResult.VersValidationModel();
    }
}
```

Voici le fonctionnement.

La première étape consiste à indiquer la propriété dans la méthode **`RuleFor`**. Ensuite, il faut indiquer la règle de **Cascase**. Lorsque la valeur est **CascadeMode.Stop**, la validation s'arrête dès qu'il y a une erreur.

```c#
RuleFor(i => i.Nom).Cascade(CascadeMode.Stop)
```

Ensuite il faut appliquer chacune des règles. Il existe plusieurs méthodes internes. Lisez la documentation pour voir les différentes méthodes disponibles. Dans ce cas-ci, la méthode de validation est **`NotNull()`**. La méthode **`WithMessage()`** permet de spécifier le message d'erreur. Si ce n'est pas spécifié, ce sera un message générique et en anglais.

```c#
.NotNull().WithMessage("Le nom est obligatoire.") //Pas null
.NotEmpty().WithMessage("Le nom est obligatoire.") //Pas vide
.MaximumLength(35).WithMessage("Le nom doit avoir 35 caractères au maximum."); //Maximum 35 caractères
```

Il est possible que la validation à effectuer soit personnalisée.

Prenez par exemple qu'il faut également vérifier que les champs obligatoires ne contiennent pas uniquement des espaces.

Il faut utiliser la méthode de validation **`Must()`** et indiquer la méthode de validation. La méthode de validation doit recevoir un paramètre du type de la propriété et doit retourner un booléen.

```c#
public CategorieValidateur()
{
    RuleFor(i => i.Nom).Cascade(CascadeMode.Stop)
        .Must(ValiderStringObligatoire).WithMessage("Le nom est obligatoire.")                        
        .MaximumLength(35).WithMessage("Le nom doit avoir 35 caractères au maximum.");

    RuleFor(i => i.Description).Cascade(CascadeMode.Stop)
        .MaximumLength(50).WithMessage("La description doit avoir 50 caractères au maximum.");
}

/// <summary>
/// Valider une chaine de caractère qui est obligatoire
/// </summary>
/// <param name="valeur">Chaine à valider</param>
/// <returns>Vrai si valide, faux si non valide</returns>
private bool ValiderStringObligatoire(string valeur)
{
	return !string.IsNullOrWhiteSpace(valeur);
}
```

La méthode **`ValiderObligatoire()`** est une méthode qui risque d'être réutilisée souvent. Il serait intéressant de créer une classe **BaseValidateur** et y intégrer les méthodes réutilisables.

### Modification du service - CategorieService

Il faut modifier le service pour être en mesure de faire une validation et d'améliorer les méthodes pour ajouter et modifier afin de faire une validation au préalable.

Dans l'interface **ICategorieService**, ajoutez la signature de méthode ci-dessous.

```c#
/// <summary>
/// Valider le modèle
/// </summary>
/// <param name="categorieModel">CategorieModel à valider</param>
/// <returns>Résultat de validation</returns>
Task<ValidationModel> ValiderAsync(CategorieModel categorieModel);
```

Dans la classe **CategorieService**, il faut injecter le validateur. La classe complète sera à la fin de la section.

```c#
private readonly ICategorieRepo _categorieRepo;
private readonly IValidateur<CategorieModel> _validateur;

/// <summary>
/// Constructeur
/// </summary>
/// <param name="categorieRepo">Repository Categorie</param>
/// <param name="validateur">Validateur Categorie</param>
public CategorieService(ICategorieRepo categorieRepo, IValidateur<CategorieModel> validateur)
{
    _categorieRepo = categorieRepo;
    _validateur = validateur;
}
```

Ensuite, il faut ajouter la méthode **`ValiderAsync()`**.

```c#
public async Task<ValidationModel> ValiderAsync(CategorieModel categorieModel)
{
    return await _categorieValidateur.ValiderAsync(categorieModel);
}
```

Pour la méthode **`AjouterAsync()`**, il faut valider avant de faire l'enregistrement (ligne 3). Il faut éviter les exceptions inutiles.

Si l'objet n'est pas valide, il faut retourner **`false`** pour indiquer que l'ajout n'a pas été fait.

```c#
public async Task<bool> AjouterAsync(CategorieModel categorieModel)
{
    if ((await _validateur.ValiderAsync(categorieModel)).EstValide == true)
    {
        //Transformation de l'objet du modèle du domaine en objet du modèle de données
        Categorie categorie = categorieModel.VersCategorie();

        //Ajout dans repository avec enregistrement immédiat
        await _categorieRepo.AjouterAsync(categorie, true);

        //Assigne les valeurs de la base de données dans l'objet du modèle
        categorieModel.Copie(categorie, true);

        return true;
    }
    else
    {
        return false;
    }
}
```

Pour la méthode **`ModifierAsync()`**, il faut valider avant de faire l'enregistrement (ligne 3). Il faut éviter les exceptions inutiles.

Si l'objet n'est pas valide, il faut retourner **`false`** pour indiquer que l'ajout n'a pas été fait.

```c#
public async Task<bool> ModifierAsync(CategorieModel categorieModel)
{
    if ((await _validateur.ValiderAsync(categorieModel)).EstValide == true)
    {
        Categorie? categorie = await _categorieRepo.ObtenirParCleAsync(categorieModel.CategorieId);

        if (categorie != null)
        {
            //Assigner les valeurs dans la catégorie
            categorie.Copie(categorieModel);

            await _categorieRepo.EnregistrerAsync();

            //Assigne les valeurs de la base de données dans l'objet du modèle
            categorieModel.Copie(categorie, false);
        }
        else
        {
            throw new Exception("Impossible de modifier la catégorie. Aucune catégorie trouvée avec la clé primaire.");
        }

        return true;
    }
    else
    {
        return false;
    }
}
```

Voici la classe au complet.

```c#
using SuperCarte.Core.Extensions;
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;
using SuperCarte.Core.Validateurs;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Services;

/// <summary>
/// Classe qui contient les services du modèle Categorie
/// </summary>
public class CategorieService : ICategorieService
{
    private readonly ICategorieRepo _categorieRepo;
    private readonly IValidateur<CategorieModel> _validateur;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="categorieRepo">Repository Categorie</param>
    /// <param name="validateur">Validateur Categorie</param>
    public CategorieService(ICategorieRepo categorieRepo, IValidateur<CategorieModel> validateur)
    {
        _categorieRepo = categorieRepo;
        _validateur = validateur;
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

    public async Task<bool> AjouterAsync(CategorieModel categorieModel)
    {
        if ((await _validateur.ValiderAsync(categorieModel)).EstValide == true)
        {
            //Transformation de l'objet du modèle du domaine en objet du modèle de données
            Categorie categorie = categorieModel.VersCategorie();

            //Ajout dans repository avec enregistrement immédiat
            await _categorieRepo.AjouterAsync(categorie, true);

            //Assigne les valeurs de la base de données dans l'objet du modèle
            categorieModel.Copie(categorie, true);

            return true;
        }
        else
        {
            return false;
        }
    }

    public async Task<CategorieModel?> ObtenirAsync(int categorieId)
    {
        Categorie? categorie = await _categorieRepo.ObtenirParCleAsync(categorieId);
      
        //Le ?. est important, car si la catégorie n'est pas trouvée, l'objet sera null
        return categorie?.VersCategorieModel();
    }

    public CategorieModel? Obtenir(int categorieId)
    {
        Categorie? categorie = _categorieRepo.ObtenirParCle(categorieId);

        //Le ?. est important, car si la catégorie n'est pas trouvée, l'objet sera null
        return categorie?.VersCategorieModel();
    }

    public async Task<bool> ModifierAsync(CategorieModel categorieModel)
    {
        if ((await _validateur.ValiderAsync(categorieModel)).EstValide == true)
        {
            Categorie? categorie = await _categorieRepo.ObtenirParCleAsync(categorieModel.CategorieId);

            if (categorie != null)
            {
                //Assigner les valeurs dans la catégorie
                categorie.Copie(categorieModel);

                await _categorieRepo.EnregistrerAsync();

                //Assigne les valeurs de la base de données dans l'objet du modèle
                categorieModel.Copie(categorie, false);
            }
            else
            {
                throw new Exception("Impossible de modifier la catégorie. Aucune catégorie trouvée avec la clé primaire.");
            }

            return true;
        }
        else
        {
            return false;
        }
    }

    public async Task<ValidationModel> ValiderAsync(CategorieModel categorieModel)
    {
        return await _validateur.ValiderAsync(categorieModel);
    }
}
```

## SuperCarte.WPF

### Enregistrement du validateur - SCValidateurExtensions

Dans la classe **SCValidateurExtensions**, il faut enregistrer le validateur.

Remarquez que l'interface utilisée est la générique. Dans ce cas-ci il est possible de le faire, car le validateur n'aura pas d'autres méthodes publiques que celles de l'interface.

```c#
using Microsoft.Extensions.DependencyInjection;
using SuperCarte.Core.Validateurs;

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
        services.AddScoped<IValidateur<CategorieModel>, CategorieValidateur>();
    }
}
```

### Modification du BaseVM - Ajouter l'interface INotifyDataErrorInfo

Pour être en mesure d'indiquer à la vue qu'il y a des erreurs, il faut implémenter l'interface **INotifyDataErrorInfo**. La librairie **MVVM Toolkit** possède une classe **ValidationObject** qui implémente cette interface, mais il est difficile d'y intégrer **FluentValidation**.

Pour cette raison, il faut implémenter cette interface dans la classe **BaseVM**.

Modifiez la classe **BaseVM** par le code ci-dessous.

```c#
using CommunityToolkit.Mvvm.ComponentModel;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SuperCarte.Core.Models;
using System;
using System.Collections;
using System.ComponentModel;
using System.Linq;

namespace SuperCarte.WPF.ViewModels.Bases;

/// <summary>
/// Classe abstraite pour du View Models
/// </summary>
public abstract class BaseVM : ObservableObject, INotifyDataErrorInfo
{
    private readonly Dictionary<string, List<string>> _lstErreursParPropriete = new Dictionary<string, List<string>>();
   
    public event EventHandler<DataErrorsChangedEventArgs>? ErrorsChanged;
    
    private void OnErrorsChanged(string propertyName)
    {
        ErrorsChanged?.Invoke(this, new DataErrorsChangedEventArgs(propertyName));
    }

    public IEnumerable GetErrors(string? propertyName)
    {
        return _lstErreursParPropriete.GetValueOrDefault(propertyName, null);
    }

    /// <summary>
    /// Effacer les erreurs de la vue
    /// </summary>
    protected void EffacerErreurs()
    {
        foreach (string propriete in _lstErreursParPropriete.Keys)
        {
            _lstErreursParPropriete.Remove(propriete);
            OnErrorsChanged(propriete);
        }
    }

    /// <summary>
    /// Assigner les erreurs à la vue à partir de la validation
    /// </summary>
    /// <param name="validationModel">Objet de validation</param>
    protected void AssignerValidation(ValidationModel validationModel)
    {
        EffacerErreurs();

        foreach (string propriete in validationModel.ErreurParPropriete.Keys)
        {
            if (!_lstErreursParPropriete.ContainsKey(propriete))
            {
                _lstErreursParPropriete.Add(propriete, new List<string>());
            }

            _lstErreursParPropriete[propriete].Add(validationModel.ErreurParPropriete[propriete]);
            OnErrorsChanged(propriete);
        }
    }    

    public bool HasErrors
    {
        get
        {
            return _lstErreursParPropriete.Any();
        }
    }
}
```

Premièrement, il y a un dictionnaire de type **`<string,List<string>>`**. La clé du dictionnaire est le nom de la propriété et pour chaque propriété, il est possible d'avoir une liste d'erreurs. Par contre, la validation retourne uniquement une erreur par propriété à la fois. Il faut tout de même respecter l'implémentation de l'interface **INotifyDataErrorInfo** qui supporte plusieurs erreurs.

```c#
private readonly Dictionary<string, List<string>> _lstErreursParPropriete = new Dictionary<string, List<string>>();
```

Ensuite, il y a un événement **ErrorsChanged**. Lorsqu'un composant est lié, il écoute cet événement pour voir si sa propriété a une erreur. Le composant appelle la méthode **`GetErrors()`** pour obtenir la liste d'erreurs.

La propriété **HasErrors** indique s'il y a au moins une propriété en erreur dans le **ViewModel**.

```c#
public event EventHandler<DataErrorsChangedEventArgs>? ErrorsChanged;

private void OnErrorsChanged(string propertyName)
{
    ErrorsChanged?.Invoke(this, new DataErrorsChangedEventArgs(propertyName));
}

public IEnumerable GetErrors(string? propertyName)
{
    return _lstErreursParPropriete.GetValueOrDefault(propertyName, null);
}

public bool HasErrors
{
    get
    {
        return _lstErreursParPropriete.Any();
    }
}
```

Ensuite, Il faut assigner les erreurs du **ValidationModel** dans le dictionnaire. Avant de faire l'assignation, il faut effacer la liste au complet.

À la ligne 13, l'événement est appelé pour indiquer que la propriété a une erreur.

```c#
protected void AssignerValidation(ValidationModel validationModel)
{
    EffacerErreurs();

    foreach (string propriete in validationModel.ErreurParPropriete.Keys)
    {
        if (!_lstErreursParPropriete.ContainsKey(propriete))
        {
            _lstErreursParPropriete.Add(propriete, new List<string>());
        }

        _lstErreursParPropriete[propriete].Add(validationModel.ErreurParPropriete[propriete]);
        OnErrorsChanged(propriete);
    }
}
```

La méthode **`EffacerErreurs()`** permet d'enlever les erreurs. À la ligne 6, l'événement est appelé pour indiquer que la propriété n'a plus d'erreur.

```c#
protected void EffacerErreurs()
{
    foreach (string propriete in _lstErreursParPropriete.Keys)
    {
        _lstErreursParPropriete.Remove(propriete);
        OnErrorsChanged(propriete);
    }
}
```

### Modification du ViewModel - GestionCategorieVM

Il faut modifier la méthode **`EnregistrerAsync()`** pour y inclure la validation.

À la ligne 3, il faut effacer les erreurs, car il est possible que des erreurs soient corrigées par l'utilisateur.

Avant d'enregistrer, il faut appeler le service pour effectuer une validation(ligne 11). 

Si l'objet est valide, l'enregistrement s'effectue(ligne 13).

Par contre, si l'objet n'est pas valide, il faut assigner la validation et notifier les erreurs(ligne 38).

```c#
private async Task EnregistrerAsync()
{
    EffacerErreurs();

    ChampsModifiables = false;
    EstEnTravail = true;
    bool estEnregistre;

    CategorieModel categorieModel = VersModele();
    
    ValidationModel validationModel = await _categorieService.ValiderAsync(categorieModel);

    if (validationModel.EstValide == true)
    {
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
            //Envoyer un message d'erreur à la vue
            throw new Exception("Erreur. Impossible d'enregistrer");
        }
    }
    else
    {
        AssignerValidation(validationModel);
    }

    EstEnTravail = false;
    ChampsModifiables = true;
}
```

Démarrez l'application et testez l'ajout d'une nouvelle catégorie sans inscrire de nom.

Le **`<Textbox>`** sera rouge, mais il n'y aura aucun message.

### Ajout d'un template dans les ressources

Pour être en mesure de voir le message d'erreur d'un composant, il faut ajouter le **`<Validation.ErrorTemplate>` **. Cette propriété du composant permet d'indiquer comment le composant s'affiche lorsqu'il y a une erreur.

Il est possible de le faire composant par composant, mais l'idéal est d'utiliser un modèle **(template)** global dans les ressources de l'application.

Créez le dossier **Styles** dans le projet **SuperCarte.WPF**.

Créez le fichier **ErreurTemplate.xaml**. Le fichier doit être du type **Dictionaire de ressources (WPF)**.

```xaml
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <ControlTemplate x:Key="erreurTemplate">
        <StackPanel Orientation="Vertical">
            <AdornedElementPlaceholder>
                <Border BorderBrush="Red" BorderThickness="2"/>
            </AdornedElementPlaceholder>
            <ItemsControl ItemsSource="{Binding}">
                <ItemsControl.ItemTemplate>
                    <DataTemplate>
                        <TextBlock Text="{Binding ErrorContent}" Foreground="Red"/>
                    </DataTemplate>
                </ItemsControl.ItemTemplate>
            </ItemsControl>
        </StackPanel>
    </ControlTemplate>
</ResourceDictionary>
```

Un dictionnaire de ressources permet de configurer des éléments de l'application et de les réutiliser. Il est possible de faire la parallèle avec les fichiers **CSS**.

Dans l'exemple ci-dessous, il y a un modèle **erreurTemplate** qui permet de gérer l'affichage des erreurs. Le nom **erreurTemplate** peut être considéré comme une classe **CSS**. Les contrôles qui utilisent le modèle **erreurTemplate** pour les erreurs auront le même comportement.

À la ligne 5, le contrôle **`<AdornedElementPlaceholder>`** représente le contrôle utilisateur normal. Si le contrôle est un **`<TextBox`>**, **`<AdornedElementPlaceholder>`** correspond au  **`<TextBox`>**.

À la ligne 6, une bordure rouge est ajoutée à l'intérieur du contrôle. C'est le comportement par défaut, mais en spécifiant un **template**, il faut le reproduire.

À la ligne 8, c'est un contrôle de répétition. Il est lié à la liste des erreurs. 

À la ligne 11, un **`<TextBlock>`** est créé avec le contenu de l'erreur pour chaque erreur de la liste d'erreur. Le message d'erreur est dans la propriété **`Text="{Binding ErrorContent}"`**. Le texte est en rouge.

Dans le fichier **App.xaml**, il faut importer le dictionnaire.

À la ligne 8, il y a le dictionnaire de ressources à inclure. Il serait possible d'en inclure plusieurs.

```xaml
<Application x:Class="SuperCarte.WPF.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:SuperCarte.WPF">
    <Application.Resources>        
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                 <ResourceDictionary Source="Styles\ErreurTemplate.xaml"/>
            </ResourceDictionary.MergedDictionaries>
        </ResourceDictionary>        
    </Application.Resources>
</Application>
```

Modifiez le fichier **UcGestionCategorie.xaml**.

Dans le **contrôle utilisateur**, il faut assigner le template avec cette propriété sur le composant **`Validation.ErrorTemplate="{StaticResource erreurTemplate}"`** (lignes 59 et 71).

```xaml
<UserControl x:Class="SuperCarte.WPF.Views.UcGestionCategorie"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"              
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"             
             d:DataContext="{d:DesignInstance vm:GestionCategorieVM}"
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
            Text="Gestion d'une catégorie"/>

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
            
            <!-- Nom -->
            <Label Grid.Row="0" Grid.Column="0" 
                   Content="Nom : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="0" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding Nom}" 
                     Padding="2 4 0 0"
                     Margin="0 10 5 10" />

            <!-- Description -->
            <Label Grid.Row="1" Grid.Column="0" 
                   Content="Description : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="1" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding Description}"
                     Padding="2 4 0 0"
                     Margin="0 10 5 10" />
        </Grid>
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />

    </Grid>
</UserControl>
```

Démarrez le programme et testez la validation. Le message d'erreur s'affichera en dessous du contrôle.

### Propriété MaxLength - UcGestionCategorie.xaml

Il est possible de limiter le nombre de caractères dans un **`<TextBox>`** avec la propriété **`MaxLength`**. 

Il est préférable de l'utiliser dans la vue (lignes 61 et 74).

Avec cette propriété, il n'y aura plus de message d'erreur pour la longueur, mais il faut tout de même que le validateur s'en assure, car le **Service** n'a aucune idée si la **Vue** s'en occupe.

Pensez à utiliser cette propriété pour le **TP 3**.

```xaml
<UserControl x:Class="SuperCarte.WPF.Views.UcGestionCategorie"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"              
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"             
             d:DataContext="{d:DesignInstance vm:GestionCategorieVM}"
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
            Text="Gestion d'une catégorie"/>

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
            
            <!-- Nom -->
            <Label Grid.Row="0" Grid.Column="0" 
                   Content="Nom : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="0" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding Nom}" 
                     MaxLength="35"
                     Padding="2 4 0 0"
                     Margin="0 10 5 10" />

            <!-- Description -->
            <Label Grid.Row="1" Grid.Column="0" 
                   Content="Description : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="1" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding Description}"
                     MaxLength="50"
                     Padding="2 4 0 0"
                     Margin="0 10 5 10" />
        </Grid>
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />

    </Grid>
</UserControl>
```

# Localisation dans le code - VM, Service et Validateur

Pour faire la localisation dans le code, il faut utiliser la librairie de localisation de **.NET**.

Cette librairie donne accès à la classe **`IStringLocalizer<T>`** qui est possible d'injecter dans une classe.

Il faut également utiliser les fichiers ressources avec cette technique. Le type générique du **`IStringLocalizer<T>`** correspond au fichier ressource.

Il existe plusieurs visions pour la gestion des fichiers ressources. Il est possible d'en faire un par classe qui l'utilise et d'utiliser des fichiers globaux pour les éléments généraux qui sont utilisés par plusieurs classes.

L'exemple ci-dessous est pour la validation du **CategorieModel**.

## Installation de la librairie

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. Il est important que le **Projet par défaut** **.Core** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.Core**.

```c#
Install-Package Microsoft.Extensions.Localization
```

## Enregistrement du service - App.xaml.cs

Dans le fichier **App.xaml.cs**, il faut enregistrer le service de pour la localisation.

Modifiez le constructeur par le code ci-dessous.

L'enregistrement se fait à la ligne 13. **`services.AddLocalization();`**

```c#
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

        //Appel des méthodes d'extension                        
        services.EnregistrerRepositories();
        services.EnregistrerServices();
        services.EnregistrerValidateurs();
        services.EnregistrerViewModels();
    });

    _host = builder.Build();
}
```

## Création du fichier ressource - ResCategorieValidateur

Dans le projet **SuperCarte.Core**, créez un dossier **Resx**.

Créez le fichier ressource **ResCategorieValidateur.resx** dans le dossier **Resx**. 

Il est important que le **Modificateur d'accès** du fichier ressource soit **Public**. Si le fichier ressource n'et pas **Public**, il ne sera pas utilisable par le **IStringLocalizer**.

| Nom                     | Valeur                                              |
| ----------------------- | --------------------------------------------------- |
| Nom_Obligatoire         | Le nom est obligatoire.                             |
| Nom_LongueurMax         | Le nom doit avoir 35 caractères au maximum.          |
| Description_LongueurMax | La description doit avoir 50 caractères au maximum. |

Créez le fichier ressource anglais **ResCategorieValidateur.en.resx**. Pour les fichiers des autres langues, **il ne faut pas changer le Modificateur d'accès**. Il faut le laisser à **Pas de génération de code**.

| Nom                     | Valeur                                                   |
| ----------------------- | -------------------------------------------------------- |
| Nom_Obligatoire         | The name is mandatory.                                   |
| Nom_LongueurMax         | The maximum length for the name is 35 characters.        |
| Description_LongueurMax | The maximum length for the description is 50 characters. |

## Injection du IStringLocalizer - CategorieValidateur

Le service **AddLocalization** qui a été ajouté dans le fichier **App.xaml.cs** permet d'avoir accès au service **IStringLocalizer**.

Ce service permet d'avoir accès au fichier ressource demandé en fonction de la culture en cours du programme.

**IStringLocalizer** a besoin d'un type lors de son injection. Le type est le nom du fichier ressource.

Il faut mettre le **IStringLocalizer** dans les paramètres du constructeur pour toutes classes qui a besoin d'un accès à des fichiers ressources. Il faut un **IStringLocalizer** par fichier ressource.

Modifiez la classe **CategorieValidateur** par le code ci-dessous.

```c#
using FluentValidation;
using FluentValidation.Results;
using Microsoft.Extensions.Localization;
using SuperCarte.Core.Extensions;
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;
using SuperCarte.Core.Resx;

namespace SuperCarte.Core.Validateurs;

/// <summary>
/// Classe qui valide le modèle CategorieModel
/// </summary>
public class CategorieValidateur : AbstractValidator<CategorieModel>, IValidateur<CategorieModel>
{    
    private readonly IStringLocalizer<ResCategorieValidateur> _resCategorieValidateur;

    /// <summary>
    /// Constructeur
    /// </summary>    
    /// <param name="resCategorieValidateur">Fichier ressource ResCategorieValidateur</param>
    public CategorieValidateur(IStringLocalizer<ResCategorieValidateur> resCategorieValidateur)
    {        
        _resCategorieValidateur = resCategorieValidateur;

        RuleFor(i => i.Nom).Cascade(CascadeMode.Stop)
            .Must(ValiderStringObligatoire).WithMessage(_resCategorieValidateur["Nom_Obligatoire"])
            .MaximumLength(35).WithMessage(_resCategorieValidateur["Nom_LongueurMax"]);

        RuleFor(i => i.Description).Cascade(CascadeMode.Stop)
            .MaximumLength(50).WithMessage(_resCategorieValidateur["Description_LongueurMax"]);
    }

    public async Task<ValidationModel> ValiderAsync(CategorieModel modele)
    {
        ValidationResult validationResult = await base.ValidateAsync(modele);

        return validationResult.VersValidationModel();
    }

    /// <summary>
    /// Valider une chaine de caractère qui est obligatoire
    /// </summary>
    /// <param name="valeur">Chaine à valider</param>
    /// <returns>Vrai si valide, faux si non valide</returns>
    private bool ValiderStringObligatoire(string valeur)
    {
        return !string.IsNullOrWhiteSpace(valeur);
    }
}
```

Pour être en mesure de récupérer une valeur du fichier ressource, il faut spécifier le nom de la clé dans l'index.

Par exemple, **`_resCategorieValidateur["Nom_Obligatoire"]`** permet d'obtenir la valeur de la clé **Nom_Obligatoire**.

Démarrez le programme et testez en français et en anglais la validation.

# Gestion d'un utilisateur

Pour l'utilisateur, le validateur devra s'assurer que le nom d'utilisateur n'est pas déjà utilisé.

Également, il faut mettre une mécanique pour le mot de passe. Il doit être **haché** avec l'algorithme **bcrypt**.

Dans une fenêtre de gestion utilisateur, généralement, il est seulement possible de mettre un mot de passe lors de la création. S'il l'administrateur doit réinitialiser le mot de passe, il s'agit d'une action distincte. Donc pour cette gestion, il ne sera pas possible de modifier le mot de passe en mode **modification**. 

Pour la sélection du rôle, il est préférable d'utiliser un **combobox** pour faire la sélection dans une liste. Il faut obtenir les éléments disponibles de la liste.

## SuperCarte.Core - Combobox

Cette section explique comment avoir les éléments nécessaires dans la logique d'affaires pour faire fonctionner une **ComboBox**.

### Création du modèle - ListeItem

Le modèle **ListeItem** permet de créer un item simple avec une valeur et un texte. La valeur est généralement la clé et le texte est libellé qui représente bien la valeur. Le **Combobox** utilisera cette classe.

Créez la classe **ListeItem.cs** dans le dossier **Model** du projet **SuperCarte.Core**.

```c#
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

Modifiez l'interface **IRoleRepo.cs** pour le code ci-dessous.

```c#
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

```c#
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
}
```

### Création du service - RoleService

Le service doit avoir une méthode qui obtient la liste de **ListeItem** pour les rôles.

Il est également possible de considérer ceci comme une logique d'affaires, car le comportement doit être le même, peu importe la vue. Pour ce projet et le **TP 3**, ce sera cette approche.

Créez l'interface **IRoleService.cs** dans le dossier **Services**.

La méthode est synchrone, car elle sera utilisée lors de la création du **ViewModel**.

```c#
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

```c#
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

```c#
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

```c#
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

Pour être en mesure d'utiliser la librairie dans une classe, il faut mettre ce **`using`**.

```c#
using BC = BCrypt.Net.BCrypt;
```

La classe a le même nom qu'une partie du **`namespace`**. Il n'est pas possible d'utiliser la classe directement, car il y a ambiguïté entre la classe et le **`namespace`**. La syntaxe indique que la classe **BCrypt** dans ce fichier sera renommée sous le nom **BC**.

### Création du service - UtilisateurService

Il faut avoir les 4 méthodes pour la gestion, **Obtenir (sync et async)**, **Ajouter** et **Modifier**.

Créez l'interface **IUtilisateurService.cs** dans le dossier **Services**.

```c#
using SuperCarte.Core.Models;

namespace SuperCarte.Core.Services;

/// <summary>
/// Interface qui contient les services du modèle Utilisateur
/// </summary>
public interface IUtilisateurService
{
    /// <summary>
    /// Obtenir un utilisateur en partir de sa clé primaire en asynchrone.
    /// </summary>
    /// <param name="utilisateurId">Clé primaire de l'utilisateur</param>
    /// <returns>L'utilisateur ou null si l'utilisateur n'est pas trouvé</returns>
    Task<UtilisateurModel?> ObtenirAsync(int utilisateurId);

    /// <summary>
    /// Obtenir un utilisateur en partir de sa clé primaire.
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

```c#
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

    public async Task<bool> AjouterAsync(UtilisateurModel utilisateurModel, string motPasse)
    {
        //Transformation de l'objet du modèle du domaine en objet du modèle de données
        Utilisateur utilisateur = utilisateurModel.VersUtilisateur();

        //Le mot de passe n'est pas copié, il faut le convertir avec BCrypt
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
            //Assigner les valeurs dans la catégorie
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

Premièrement, la méthode **`AjouterAsync()`**  a 2 paramètres. Le premier est le modèle et le 2e est le mot de passe en texte. Le mot de passe ne fait pas partie du modèle du domaine, il doit être envoyé comme un 2e paramètre.

Le mot de passe en texte est **haché** avec **BCrypt** et le **hash** est assigné dans le modèle de données.

```c#
public async Task<bool> AjouterAsync(UtilisateurModel utilisateurModel, string motPasse)
{
    //Transformation de l'objet du modèle du domaine en objet du modèle de données
    Utilisateur utilisateur = utilisateurModel.VersUtilisateur();

    //Le mot de passe n'est pas copié, il faut le convertir avec BCrypt
    utilisateur.MotPasseHash = BC.HashPassword(motPasse);

    //Ajout dans repository avec enregistrement immédiat
    await _utilisateurRepo.AjouterAsync(utilisateur, true);

    //Assigne les valeurs de la base de données dans l'objet du modèle
    utilisateurModel.Copie(utilisateur, true);

    return true;
}
```

Pour la modification, la mécanique est la même, sauf que l'extension **.Copie** ne s'occupe pas du mot de passe.

```c#
public async Task<bool> ModifierAsync(UtilisateurModel utilisateurModel)
{
    //Il n'y a aucune référence au mot de passe.
    Utilisateur? utilisateur = await _utilisateurRepo.ObtenirParCleAsync(utilisateurModel.UtilisateurId);

    if (utilisateur != null)
    {
        //Assigner les valeurs dans l'utilisateur, sauf pour le mot de passe.
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
```

## SuperCarte.WPF

### Enregistrer les services - SCServiceExtensions

Dans la classe **SCServiceExtensions**, il faut enregistrer les 2 nouveaux services.

```c#
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
        services.AddScoped<IRoleService, RoleService>();
        services.AddScoped<IUtilisateurService, UtilisateurService>();
    }
}
```

### Création du ViewModel - GestionUtilisateurVM

Créez la classe **GestionUtilisateurVM.cs** dans le dossier **ViewModels**.

Le **ViewModel** est très similaire à celui de la catégorie. Les différences sont expliquées après le bout de code.

```c#
using CommunityToolkit.Mvvm.Input;
using SuperCarte.EF.Data;

namespace SuperCarte.WPF.ViewModels;

public class GestionUtilisateurVM : BaseParametreVM<int>
{
    #region Dépendances
    private readonly IUtilisateurService _utilisateurService;
    private readonly IRoleService _roleService;
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

        ListeRoles = _roleService.ObtenirListeItem();
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

    public bool MotPasseModifiable
    {
        get
        {
            return UtilisateurId == 0;
        }
    }

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

Pour débuter, le **ViewModel** a besoin de 2 services. Il doit avoir accès aux méthodes de gestion de l'utilisateur et également au service du **Role** pour obtenir la liste de **`ListeItem`**.

À la ligne 10 du code ci-dessous, la propriété **ListeRoles** contient la liste des rôles disponibles pour la vue. L'assignation se fait dans le constructeur, car il s'agit d'une dépendance de la vue. La liste doit exister avant d'afficher l'utilisateur.

À la ligne 11, il faut ajouter l'élément par défaut. Il est plus intéressant de mettre du texte pour indiquer qu'il faut choisir un élément dans la liste.

```c#
/***/
private List<ListeItem<int>> _lstRole;
/***/

public GestionUtilisateurVM(IUtilisateurService utilisateurService, IRoleService roleService)
{
    _utilisateurService = utilisateurService;
    _roleService = roleService;

    ListeRoles = _roleService.ObtenirListeItem();
    ListeRoles.Insert(0, new ListeItem<int>() { Valeur = 0, Texte = "Veuillez sélectionner un rôle..."});

    /***/
}

/***/
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
/***/
```

Il faut également indiquer à la **Vue** si le champ **MotPasse** est modifiable ou non. Le champ peut être modifié uniquement lorsque c'est un nouvel utilisateur. Cette propriété n'utilise pas un attribut et elle a une logique en fonction d'une autre propriété.

Il est important que lorsque la propriété **UtilisateurId** est modifiée, il faut également indiquer que la propriété **MotPasseModifiable** est modifiée. À la ligne 19 de la méthode ci-dessous, la méthode **`OnPropertyChanged()`** indique aux composants qui sont liés à la propriété **MotPasseModifiable** de se mettre à jour. La méthode **`OnPropertyChanged`** provient de la classe **ObservableObject** du **MVVM Toolkit**.

```c#
public bool MotPasseModifiable
{
    get
    {
        return UtilisateurId == 0;
    }
}

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
            OnPropertyChanged(nameof(MotPasseModifiable));
        }
    }
}
```

### Enregistrement du ViewModel - SCViewModelExtensions

Dans la classe **SCServiceVideModels**, il faut enregistrer le nouveau **ViewModel**.

```c#
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
        services.AddTransient<HelloWordVM>(); //À retirer
        services.AddTransient<ListeCategoriesVM>();
        services.AddTransient<ListeCartesVM>();
        services.AddTransient<GestionCategorieVM>();
        services.AddTransient<GestionUtilisateurVM>();
    }
}
```

### Création de la vue - UcGestionUtilisateur.xaml

Créez le fichier **UcGestionUtilisateur.xaml** dans le dossier **Views**.

Aux lignes 7 et 8, il y a l'indicateur du **ViewModel** pour faciliter la liaison.

```xaml
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
            <TextBox Grid.Row="3" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding MotPasse}"
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
                      ItemsSource="{Binding ListeRoles}"
                      SelectedValue="{Binding RoleId}"
                      DisplayMemberPath="Texte"
                      SelectedValuePath="Valeur"                      
                      Padding="2 4 0 0"
                      Margin="0 10 5 10"/>

        </Grid>
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />

    </Grid>   
    
</UserControl>
```

Pour le mot de passe, idéalement, il faut utiliser le composant **`<PasswordBox>`**. Ce composant ne peut pas être lié à une propriété du **ViewModel** pour des raisons de sécurité par sa conception. Ce composant n'est pas très **MVVM**. Pour l'instant, ce sera un **`<TextBox>`**. Dans le cours sur l'intégration, il faudra modifier le **`<PasswordBox>`** pour qu'il soit **liable**. Il faudra penser de le corriger ici.

Également, la propriété **`IsEnabled`** est liée à la propriété **`MotPasseModifiable`** du **ViewModel**. Le composant sera disponible uniquement lors de l'ajout.

```xaml
<!-- Mot de passe -->
<Label Grid.Row="3" Grid.Column="0" 
       Content="Mot de passe : "
       Margin="5 10 5 10" 
       FontWeight="Bold"/>            

<TextBox Grid.Row="3" Grid.Column="1" 
         Validation.ErrorTemplate="{StaticResource erreurTemplate}"
         Text="{Binding MotPasse}"
         IsEnabled="{Binding MotPasseModifiable}"
         Padding="2 4 0 0"
         Margin="0 10 5 10"/>
```

Ensuite, le composant **`<ComboBox>`** doit avoir les propriétés **`ItemsSource`** et **`SelectedValue`** associées au **ViewModel**. 

**`ItemsSource`** correspond à la liste des éléments et la propriété **`SelectedValue`** à l'item sélectionné dans la liste.

La propriété **`SelectedValuePath`** permet d'indiquer la propriété du **`ListeItem<int>`** qui sera utilisée pour la valeur. C'est la valeur de cette propriété qui sera envoyée dans la propriété **`SelectedValue`**. Il est important que leur type soit le même.

La propriété **`DisplayMemberPath`** permet d'indiquer la propriété du **`ListeItem<int>`** qui sera utilisée pour l'affichage.

```xaml
 <!-- Rôle -->
<Label Grid.Row="4" Grid.Column="0" 
       Content="Role : "
       Margin="5 10 5 10" 
       FontWeight="Bold"/>
<ComboBox Grid.Row="4" Grid.Column="1" 
          Validation.ErrorTemplate="{StaticResource erreurTemplate}"
          ItemsSource="{Binding ListeRoles}"
          SelectedValue="{Binding RoleId}"
          DisplayMemberPath="Texte"
          SelectedValuePath="Valeur"                      
          Padding="2 4 0 0"
          Margin="0 10 5 10"/>
```

### Ajout de la ressource pour créer le lien entre ViewModel et Vue - MainWindow.xaml

Il faut ajouter dans les ressources le lien entre le **ViewModel** et la **Vue**.

Les lignes 28 à 30 contiennent le lien entre **UcGestionUtilisateur** et **GestionUtilisateurVM**.

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

Pour tester directement, il faut modifier le **VMActif** pour celui de **GestionUtilisateurVM**.

Il faut envoyer le paramètre 0 pour un nouveau, sinon la clé de l'utilisateur pour le modifier.

```c#
public MainWindowVM(INavigateur navigateur)
{   
    //Sélectionner le ViewModel de démarrage        
    _navigateur = navigateur;

    //Création des commandes
    NaviguerListeCartesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCartesVM>);
    NaviguerListeCategoriesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCategoriesVM>);

    //Vue initiale
    _navigateur.Naviguer<GestionUtilisateurVM, int>(0); //Pour un nouveau
    //_navigateur.Naviguer<GestionUtilisateurVM, int>(1);//Pour modifier François St-Hilaire
    
}
```

Créez un nouvel utilisateur. Le champ **Mot de passe** sera disponible. Une fois enregistré, il ne sera plus modifiable.

## Validation de l'utilisateur - Avec Repository

Il manque la validation pour la gestion de l'utilisateur.

L'utilisateur doit valider des éléments dans la base de données pour 2 champs.

- RoleId -> Doit être un RoleId qui existe dans la table **Role**.
- NomUtilisateur -> Ne doit pas avoir d'utilisateur qui a déjà le même nom d'utilisateur. Le validateur doit exclure l'utilisateur en cours.

Il est possible d'injecter un **Repository** dans le **Validateur**.

Il faut créer une règle avec la fonction **`Must`**.

Voici une coquille de **UtilisateurValidateur** pour le rôle et le nom d'utilisateur. Cette coquille est incomplète et donne uniquement un alignement pour faire de la validation avec un **Repository**.

À la ligne 12, le méthode **`Must()`** utilise une fonction **lambda** **`(i,p)`**. 

La variable **`i`** représente l'item en cours de validation. Dans ce cas-ci, c'est un objet de type **UtilisateurModel**. 

La variable **`p`** représente la valeur de la propriété en cours de validation. Dans ce cas-ci, c'est la valeur de **NomUtilisateur**. 

La méthode de validation doit avoir la signature **`bool Methode(string p, UtilisateurModel i)`** pour répondre à la fonction attendue par la méthode **`Must()`**.

```c#
/****/

public UtilisateurValidateur(IRoleService roleRepo, IUtilisateurRepo utilisateurRepo)
{
	_roleRepo = roleRepo;
    _utilisateurRepo = utilisateurRepo;
	
	RuleFor(i => i.RoleId).Cascade(CascadeMode.Stop)
		.Must(ValiderRoleId).WithMessage("Le rôle n'est pas valide.");
        
    RuleFor(i => i.NomUtilisateur).Cascade(CascadeMode.Stop)
        .NotEmpty().WithMessage("Le nom d'utilisateur est obligatoire.")
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

Pour vous aider à déterminer les critères du contenu, il est possible d'utiliser des 4 **Regex**. Il faut que 3 des 4 **Regex** soit à **`true`** et que la longueur soit plus grand que 8.

```
bool minuscule = Regex.Match(motPasse,"[a-z]") //Contient une minuscule
bool majuscule = Regex.Match(motPasse,"[A-Z]") //Contient une majuscule
bool chiffre = Regex.Match(motPasse,"\\d") //Contient un chiffre
bool special = Regex.Match(motPasse,"\\W") //Contient une caractère qui n'est pas une lettre ou chiffre
```



# Modèle de données pour Gestion d'une carte - Explication

Le modèle **CarteDetailModel** a été utilisé pour la liste des cartes.

```c#
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

Par contre, pour la gestion d'une seule carte, l'information des clés étrangères n'est pas nécessaire. 

Il y a des programmeurs qui utilisent la même classe. La propriété **`public string EnsembleNom`** n'accepte pas les **null** par sa définition. En laissant le champ vide, ça indique tout de même au programmeur qu'il devrait avoir une valeur. C'est le même principe que le modèle de données et les propriétés de navigation de **Entity Framework**. Ça évite de créer plusieurs classes dans un projet.

Il y a des programmeurs qui préfèrent avoir des modèles de données qui ont seulement les données nécessaires pour diminuer la taille des objets en mémoire, le temps de transfert et d'éviter d'avoir une **méga-classe** avec une bonne proportion des champs inutilisés selon le cas d'utilisation. Il faut donc une 2e classe pour respecter cette vision.

Les 2 visions ont leurs avantages et leurs inconvénients, mais pour ce projet et le **TP 3**, il faudra avoir 2 classes différentes.

Voici la classe **CarteModel** qu'il faudrait utiliser sans le détail de la clé étrangère.

```c#
public class CarteModel
{
    public int CarteId { get; set; }

    public string Nom { get; set; } = null!;

    public short Vie { get; set; }

    public short Armure { get; set; }

    public short Attaque { get; set; }

    public bool EstRare { get; set; }

    public decimal PrixRevente { get; set; }

    public int CategorieId { get; set; }

    public int EnsembleId { get; set; }
}
```

C'est pratiquement la même classe. Il y a beaucoup de répétition et ce n'est pas très **DRY**.

Ce sont des classes, donc il est possible d'utiliser l'héritage pour éviter la répétition des propriétés. Si une nouvelle propriété de base est ajoutée, il ne sera pas nécessaire de l'ajouter dans les autres classes.

Donc la classe **CarteDetailModel** devrait être ceci.

```c#
public class CarteDetailModel : CarteModel
{    
    public string CategorieNom { get; set; } = null!;
    
    public string EnsembleNom { get; set; } = null!;
}
```

Pour le **TP 3**, vous devez appliquer cette approche pour les modules qui utilisent des clés étrangères.
