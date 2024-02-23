---
sidebar_position: 320
draft: true
---


# Modifier une catégorie

Pour être en mesure de modifier une catégorie, il faut afficher dans la vue la catégorie qui a été spécifiée par la clé.

Il faut donc intégrer une mécanique de chargement dans le **ViewModel** de la catégorie en fonction d'une clé primaire.

## SuperCarte.Core

### Méthode d'extension - CategorieMapExtension

Pour faire la mise à jour avec **Entity Framework**, il faut préalablement récupérer l'objet de données. Ensuite, il faut lui assigner les nouvelles valeurs et enregistrer le contexte. 

:::danger IMPORTANT
Il est important d'utiliser la même instance et donc de ne pas en faire une copie.
:::

Dans la classe **CategorieMapExtension**, ajoutez la méthode ci-dessous.

Cette méthode d'extension aura 2 paramètres visibles lorsqu'elle sera utilisée. Le premier est l'objet du domaine de référence qui sera utilisée pour faire la copie dans l'objet de données qui possède l'extension. La 2e méthode est pour copier ou non la valeur de la clé primaire.

Cette méthode est l'inverse de la méthode Copie qui est déjà dans cette classe. 

```csharp showLineNumbers
/// <summary>
/// Méthode qui copie les valeurs des propriétés du CatégorieModel dans l'objet de donnée Categorie
/// </summary>
/// <param name="itemDestination">l'objet Categorie dans lequel sera copié le model du domaine (la destination)</param>
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

```csharp showLineNumbers
/// <summary>
/// Modifier une catégorie en asynchrone
/// </summary>
/// <param name="categorieModel">Catégorie à modifier</param>    
/// <returns>Vrai si ajoutée, faux si non ajoutée</returns>
Task<bool> ModifierAsync(CategorieModel categorieModel);

/// <summary>
/// Obtenir une catégorie à partir de sa clé primaire en asynchrone.
/// </summary>
/// <param name="categorieId">Clé primaire de la catégorie</param>
/// <returns>La catégorie ou null si la catégorie n'est pas trouvée</returns>
Task<CategorieModel?> ObtenirAsync(int categorieId);
```

Dans la classe **CategorieService.cs**, ajoutez l'implémentation de la méthode **Modifier**.

```csharp showLineNumbers
public async Task<bool> ModifierAsync(CategorieModel categorieModel)
{
    Categorie? categorie = await _categorieRepo.ObtenirParCleAsync(categorieModel.CategorieId);

    if(categorie != null)
    {
        //Assigner les valeurs dans la catégorie
        categorie.Copie(categorieModel);
        await _categorieRepo.EnregistrerAsync();
        return true;
    }
    else
    {
        throw new Exception("Impossible de modifier la catégorie. Aucune catégorie trouvée avec la clé primaire.");
    }
}
```


Voici la méthode **Obtenir**.

```csharp showLineNumbers
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

Premièrement, il faut créer une commande pour obtenir la catégorie. (ligne 86)

Ensuite, il faut créer la méthode qui sera utilisée par la commande. (ligne 71)

Dans le constructeur, la commande est créée pour la lier à la méthode **ObtenirAsync()**. (ligne 28)

La méthode **EnregistrerAsync()** est modifiée. Il y a maintenant une vérification en fonction de la clé primaire. Si elle est à 0, c'est-à-dire que c'est une nouvelle catégorie. Par contre, si la clé primaire a une valeur différente de 0, la vue est en mode modification.

Dans le constructeur, à la ligne 30, une clé primaire est assignée pour simuler la modification de la catégorie #2.

```csharp showLineNumbers
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
		//highlight-next-line
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
		
//highlight-start	
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
//highlight-end

//highlight-start
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
//highlight-end

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

```xaml  showLineNumbers 
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
					//highlight-next-line
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

Appuyez sur le bouton rafraichir. La catégorie **Orcs** devrait être affichée (hardcodé ligne 30 de GestionCategorieVM.cs). 

Modifiez un champ sans enregistrer et appuyez sur le bouton rafraichir.

Le champ aura de nouveau sa valeur initiale.

#### Test 2 - Modification

Modifiez les champs et enregistrez les modifications.

Vérifiez dans la base de données. Les valeurs seront modifiées.

#### Test 3 - Nouveau et rafraichir

Dans le **ViewModel**, retirez la ligne **CategorieId = 2; //Pour tester uniquement** du constructeur.

Redémarrez.

Le **ViewModel** sera en mode **ajouter**.

Modifiez un champ sans enregistrer et appuyez sur le bouton rafraichir.

Le champ aura de nouveau sa valeur par défaut (vide).

#### Test 4 - Nouveau et modifier

Créez une nouvelle catégorie et enregistrez.

Vérifiez dans la base de données pour voir le nouvel enregistrement.

Ensuite, modifiez un des champs et enregistrez de nouveau.

Vérifiez dans la base de données et l'enregistrement aura la nouvelle valeur.

Le **ViewModel** passe en mode **modifier** après un ajout, car il a une clé primaire (ligne 43 à 52).

## Verrouiller le formulaire et les boutons

Lorsque le formulaire est en cours d'enregistrement, il est toujours modifiable. Il est difficile à visualiser, car c'est très rapide.

Pour le visualiser, il faut ajouter un délai artificiel dans la commande **Enregistrer**.

Dans la classe **GestionCategorieVM.cs**, modifiez temporairement la méthode **EnregistrerAsync()** par celle-ci.

```csharp showLineNumbers
private async Task EnregistrerAsync()
{
    EstEnTravail = true;
    bool estEnregistre;

    //Délai artificiel
    //highlight-next-line
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
}
```

Démarrez l'application et enregistrez. Il est toujours possible de modifier les valeurs. Également, le bouton Rafraichir est disponible. Lorsqu'une commande est en cours d'exécution, il ne faudrait pas que les autres soient disponibles.

Il faut donc créer une propriété **ChampsModifiables** et la lier à la propriété **IsEnabled** de la grille du formulaire.

Lorsque l'enregistrement débutera, il faut mettre à jour la propriété **ChampsModifiables** pour empêcher la modification. À la fin de l'enregistrement, il fait permettre de nouveau la modification.

Modifiez la classe **GestionCategorieVM.cs**.

À la ligne 21, il y a l'attribut **_champsModifiables** et sa propriété **ChampsModifiables** à la ligne 136.

Aux lignes 40 et 62 de la méthode **EnregistrerAsync()**, la commande indique si le formulaire est modifiable ou non.

```csharp showLineNumbers
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
    //highlight-next-line
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
        //highlight-next-line
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
        //highlight-next-line
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

//highlight-start
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
//highlight-end
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

Dans le fichier **UcGestionCategorie.xaml**, il faut lier la propriété **IsEnabled** à la propriété **ChampsModifiables** du **ViewModel** (ligne 42).

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
                    Margin="5" Width="32" Height="32"
                    Command="{Binding ObtenirCommande}"/>
        </WrapPanel>

        <!--Rangée 2-->
        <!-- Formulaire -->
        //highlight-next-line
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

Pour ce cas, ce sera la propriété **EstEnTravail** qui déterminera si les commandes sont disponibles ou non. Il est possible de le faire directement sans créer de sous-méthode.

Changer les lignes 28 et 29 de **GestionCategorieVM** pour celle-ci (notez la fin de la ligne)
```csharp showLineNumbers
EnregistrerCommande = new AsyncRelayCommand(EnregistrerAsync, () => !EstEnTravail);
ObtenirCommande = new AsyncRelayCommand(ObtenirAsync, () => !EstEnTravail);
```

Il faut également notifier les commandes lorsque la propriété **EstEnTravail** est modifiée.

```csharp showLineNumbers
public bool EstEnTravail
{
    get
    {
        return _estEnTravail;
    }
    set
    {
        //highlight-start
        if (SetProperty(ref _estEnTravail, value))
        {
            ObtenirCommande.NotifyCanExecuteChanged();
            EnregistrerCommande.NotifyCanExecuteChanged();
        }
        //highlight-end
    }
}
```
:::tip
Rappelons-nous que si SetProperty change la valeur, il retourne true. Si la nouvelle valeur est la même que l'ancienne, il retourne false. [reference](https://learn.microsoft.com/en-us/dotnet/api/microsoft.visualstudio.platformui.observableobject.setproperty?view=visualstudiosdk-2022)
:::

Si vous êtes un peu perdu, voici la classe **GestionCategorieVM.cs** au complet.
<details>
<summary> GestionCategorieVM.cs</summary>

```csharp showLineNumbers
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
</details>


Démarrez l'application et effectuez un enregistrement. Pendant l'enregistrement, les boutons ne sont pas accessibles.

## Bouton Nouveau

Dans une fenêtre de gestion, il pourrait être intéressant d'ajouter plusieurs éléments sans toujours avoir à revenir à la liste.

Le bouton **Nouveau** de la fenêtre de gestion permet d'indiquer au **ViewModel** de se mettre en état **Ajouter**.

Il faut créer une nouvelle commande **NouveauCommande** dans le **ViewModel**.

Voici la classe **GestionCategorieVM.cs**.

À la ligne 98, la commande est déclarée. Elle est en **synchrone**, car elle n'appelle aucune méthode **asynchrone**. Elle effectue seulement la réinitialisation des propriétés du **ViewModel**.

À la ligne 87, la méthode **Nouveau()** met le champ **CategorieId** à zéro et les autres champs avec leur valeur initiale.

À la ligne 30, la commande est assignée à la méthode dans le constructeur. La commande à la même logique de **CanExecute** que les autres. 

À la ligne 150, il faut notifier la commande **Nouveau** que son état de **CanExecute** est modifié.

```csharp showLineNumbers
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
        //highlight-next-line
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

//highlight-start
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
//highlight-end

    #region Commandes
    public IAsyncRelayCommand EnregistrerCommande { get; private set; }
    public IAsyncRelayCommand ObtenirCommande { get; private set; }
//highlight-next-line
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
                //highlight-next-line
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

Et ajouter le binding dans **UcGestionCategorie.xaml**

```xaml 
<Button Content="N" ToolTip="Nouveau"
        Margin="5" Width="32" Height="32" 
        Command="{Binding NouveauCommande}"/>
```

Démarez le programme, inscrivez du texte dans un des champs et appuyez sur Nouveau. Le texte devrait disparaitre. 

