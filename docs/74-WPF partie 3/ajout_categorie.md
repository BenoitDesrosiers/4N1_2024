---
sidebar_position: 315
draft: true
---

# Ajout d'une catégorie

Pour être en mesure d'ajouter une catégorie, il faut créer une vue de gestion qui permettra d'entrer les valeurs pour les champs de la catégorie. Cette vue s'occupera de la visualisation, de la création et de la modification.

## SuperCarte.Core

### Méthode d'extension - CategorieMapExtension

Lors d'un ajout, l'objet du domaine associé à la vue n'a pas de clé primaire car celle-ci sera générée lors de l'insertion dans la bd. La méthode **Copie**, ci-dessous, permet  de transférer les valeurs de l'objet de données vers l'objet du domaine, incluant la clé primaire si nécessaire. Cette méthode sera utilisée lors de l'ajout d'une nouvelle catégorie, ou lors de son chargement à partir de la bd. 

Dans la classe **Extensions/CategorieMapExtension**, ajoutez la méthode ci-dessous.

```csharp showLineNumbers
/// <summary>
/// Méthode qui copie les valeurs des propriétés de l'objet de donnée Categorie dans l'objet du modèle CategorieModel
/// </summary>
/// <param name="itemDestination">l'objet CategorieModel initialisée avec l'objet de données (la destination)</param>
/// <param name="categorieSource">L'objet Categorie qui vient d'être chargé de la bd (la source)</param>
/// <param name="copierClePrimaire">Copier ou non la clé primaire</param>
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

Cette méthode d'extension a 3 paramètres, mais seulement 2 seront visibles lorsqu'elle sera utilisée car le premier est this (l'objet sur lequel est appelée cette fonction). Le premier est l'objet du domaine de référence qui sera utilisée pour faire la copie dans l'objet de données que possède l'extension. Le 2e paramètre est pour copier ou non la valeur de la clé primaire.

### Méthode de service: Ajouter  - CategorieService

Il faut ajouter dans le service la méthode permettant d'inscrire une nouvelle catégorie dans la bd (via le repo). La méthode est très simple pour le moment. Elle sera un peu plus complexe lors de l'ajout des de la validation des champs.

Dans l'interface **Services/ICategorieService.cs**, ajoutez la signature de la méthode ci-dessous.

```csharp showLineNumbers
/// <summary>
/// Ajouter une catégorie en asynchrone.
/// </summary>
/// <param name="categorieModel">Categorie à ajouter</param>
/// <returns>Vrai si ajoutée, faux si non ajoutée</returns>
Task<bool> AjouterAsync(CategorieModel categorieModel);
```

Dans la classe **CategorieService.cs**, ajoutez l'implémentation de la méthode.

```csharp showLineNumbers
public async Task<bool> AjouterAsync(CategorieModel categorieModel)
{
    //Transformation de l'objet du modèle du domaine en objet du modèle de données
    Categorie categorie = categorieModel.VersCategorie();

    //Ajout dans le repository avec enregistrement immédiat
    await _categorieRepo.AjouterAsync(categorie, true);

    //Assigne les valeurs de la base de données dans l'objet du modèle
    categorieModel.Copie(categorie, true);
    
    return true;
}
```

Il faut convertir l'objet **CategorieModel** en **Categorie** (ligne 4), car le **Repository** utilise le modèle de données.

Il faut mettre à jour les valeurs dans l'objet du domaine, principalement pour connaitre la clé primaire (ligne 10). Il n'est pas nécessaire au **Respository** de retourner l'objet, car il met à jour la même instance (paramètre par référence... comme la majorité du temps en OO). Le même principe sera utilisé pour le service.

## SuperCarte.WPF

### Création du ViewModel - GestionCategorieVM

Créez la classe **GestionCategorieVM.cs** dans le dossier **ViewModels** du projet **SuperCarte.WPF**.

Premièrement, il faut ajouter les dépendances du **ViewModel**. Il y a seulement le service des catégories.

```csharp showLineNumbers
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

### Théorie 

Il y a 2 options pour les propriétés. 

La première est de créer une propriété dans le **ViewModel** pour chacune des **propriétés** du modèle du domaine. 

```csharp showLineNumbers title="NE PAS COPIER"
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

La 2e option est de créer une propriété dans le **ViewModel** pour **l'objet** du modèle, et de faire le **binding** sur les **propriétés** de cet objet dans la vue. 

```csharp showLineNumbers title="NE PAS COPIER"
//ViewModel
public CategorieModel Categorie { get; set;}

//Vue
<TextBox Text="{Binding Categorie.Nom }" />

```

Dans la 2e option, il n'y a pas la mécanique de notification du changement de valeur de propriété. Comme il a été présenté pour la vue active du navigateur, la notification doit se faire directement sur la propriété qui est liée.

Il faudrait donc modifier la classe du modèle pour hériter de **ObservableObject** et avoir un attribut pour conserver la valeur de la propriété. 

Par exemple.

```csharp showLineNumbers title="NE PAS COPIER"
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

:::warning Avertissement
Pour ce projet et le **TP 3**, la première approche sera utilisée.
:::
 
### GestionCategorieVM
Il faut créer les propriétés liées. Pour s'aider à faire l'assignation entre le **ViewModel** et le **modèle de données**, les méthodes **VersModele()** et **VersVM()** sont ajoutées.

<!--  Il serait possible d'utiliser une librairie **Mapper** pour ceci. Si le **CategorieModel** est **null**, les valeurs par défaut du **ViewModel** seront assignées. -->

Également, la propriété **CategorieId** qui représente la clé primaire peut seulement être assignée par le **ViewModel**. Il ne faut pas que la **Vue** soit en mesure de la modifier (private set à la ligne 116).

À la ligne 141, l'assignation de la propriété Description a une vérification de chaine vide. Dans le cas que la chaine est vide ou avec uniquement des espaces, il faut retourner **null**, car c'est un champ non obligatoire. 

:::tip
Il sera important de faire ceci pour tous les champs non obligatoires du **TP 3**.
:::


:::note
La propriété EstEnTravail (ligne 96) servira plus tard afin de controller la barre de progression lors du chargement
:::


Ensuite, il faut créer la commande **Enregistrer**. L'ajout et la modification utiliseront la même commande. Selon l'état du **ViewModel**, le **ViewModel** déterminera si c'est un ajout ou une modification. Pour l'instant, la logique est uniquement pour l'ajout.

Dans la méthode **EnregistrerAsync()**, l'utilisation des méthodes d'assignation est nécessaire pour récupérer les valeurs de la vue et de les mettre à jour.

Remplacez le code de **GestionCategorieVM** par celui-ci

```csharp showLineNumbers
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

//highlight-start
    #region Attributs des propriétés
    private int _categorieId;
    private string _nom;
    private string? _description;
    private bool _estEnTravail = false;
    #endregion
//highlight-end

    public GestionCategorieVM(ICategorieService categorieService)
	{
        _categorieService = categorieService;

//highlight-start
        EnregistrerCommande = new AsyncRelayCommand(EnregistrerAsync);
//highlight-end
    }

//highlight-start
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
//highlight-end

}
```

### Enregistrer le ViewModel - SCViewModelExtensions

Dans la classe **SCViewModelExtensions**, il faut enregistrer le **ViewModel**.

```csharp showLineNumbers
public static void EnregistrerViewModels(this IServiceCollection services)
{
    services.AddTransient<MainWindowVM>();
    services.AddTransient<ListeCategoriesVM>();
    services.AddTransient<ListeCartesVM>();
	//highlight-next-line
    services.AddTransient<GestionCategorieVM>();
}
```

### Création de la vue - UcGestionCategorie.xaml

:::note
Cette vue n'utilisera pas les fichiers ressources pour la traduction, mais dans la réalité, il faudrait prévoir ceci.
:::


<!-- Les boutons de la vue devraient utiliser une ressource globale. Pensez à le faire pour le **TP 3**. -->
Créez le fichier **UcGestionCategorie.xaml** dans le dossier **Views**. (Uc comme dans Contrôle Usager (WPF))

La première étape consiste à indiquer le **ViewModel** qui sera utilisé. Ce n'est pas obligatoire, mais en ajoutant les lignes 7 et 8 ci-dessous, il sera possible d'avoir des suggestions lors du **Binding**.

La grille principale est séparée en 4 rangées. La première pour le titre, la 2e pour les boutons, la 3e pour le formulaire et la 4e pour la barre de progression.

Le bouton **Enregistrer** est lié à la commande (ligne 32-35 )

Pour faire le formulaire, il est possible d'intégrer un **Grid** dans un autre **Grid** te qu'utilisé pour la Rangé 2 (ligne 41).

Il faut 2 colonnes pour le formulaire (ligne 47-48). La première pour le titre et la 2e pour le composant de saisie.

Le formulaire s'adapte à la largeur de la fenêtre, mais si la largeur est trop petite, elle ne sera pas fonctionnelle. Il serait possible de faire comme en Web de passer à une colonne si la largeur est insuffisante, mais il faudrait intégrer des **\<WrapPanel>** et plusieurs sous **Grid**.

Il faut prévoir un espace en dessous du contrôle pour afficher le message de validation. Il est assez compliqué en **XAML** de rendre ceci dynamique, car le message n'est pas considéré dans la grille. Il est plus facile d'utiliser une taille fixe.

Il est possible d'appliquer un **Padding** pour ajuster l'emplacement du texte à l'intérieur de la zone de texte.


Voici le fichier **UcGestionCategorie.xaml** au complet.

```xaml showLineNumbers
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

Les lignes 25 à 27 de **MainWindow.xaml** contiennent le lien entre **UcGestionCategorie** et **GestionCategorieVM**.

```xaml showLineNumbers
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
		//highlight-start
        <DataTemplate DataType="{x:Type TypeName=vm:GestionCategorieVM}">
            <v:UcGestionCategorie />
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

### Test - MainWindowsVM

Pour tester, il faut modifier le **ViewModel** de départ dans le **MainWindowVM**.

Dans le constructeur, il faut naviguer vers le **ViewModel** initial (ligne 11).

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
    _navigateur.Naviguer<GestionCategorieVM>();
}
```

Démarrez l'application et inscrivez du texte dans les 2 champs. Appuyez sur le bouton enregistrer.

Vous pouvez vérifier le fonctionnement en choisissant **Liste des catégories** dans le menu **Administration** de l'application, ou àl'aide de SSMS .

