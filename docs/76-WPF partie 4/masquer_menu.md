---
sidebar_position: 445
draft: true
---

# Masquer le menu

Si vous démarrez l'application, le menu est toujours accessible lorsque c'est la vue de connexion. Il serait préférable de le masquer.

Pour faire ceci, il faut lier la propriété de visibilité du menu à la propriété **EstAuthentifie** de la classe **Authentificateur**.

## Activer la OnPropertyChanged - Authentificateur

Modifiez la classe **Aides/Authentificateur** par celle-ci.

Il faut activer la notification du changement de valeur d'une propriété dans la classe d'assistance **Authentificateur**. Il faut hériter de la classe **ObservableObject** qui provient de la librairie **MVVM Toolkit** (ligne 9).

Il faut ensuite ajouter l'attribut **_estAuthentifie** (ligne 12). 
Ensuite, il faut modifier la propriété **EstAuthentifie** pour activer la notification sur le **set** (lignes 58-68).
Étant donné que la propriété n'avait pas d'attribut, elle contenait le get,set par défaut. Il faut les remplacer par la version permettant de changer la propriété. 

```csharp showLineNumbers
using CommunityToolkit.Mvvm.ComponentModel;
using System.Linq;

namespace SuperCarte.WPF.Aides;

/// <summary>
/// Classe qui représente la classe d'assistance pour l'authentification et l'autorisation
/// </summary>
//highlight-next-line
public class Authentificateur : ObservableObject, IAuthentificateur
{
    private readonly IUtilisateurService _utilisateurService;
    //highlight-next-line
    private bool _estAuthentifie = false;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="utilisateurService">Service du modèle utilisateur</param>
    public Authentificateur(IUtilisateurService utilisateurService)
    {
        _utilisateurService = utilisateurService;
    }

    public async Task<bool> AuthentifierUtilisateurAsync(string nomUtilisateur, string motPasse)
    {
        UtilisateurAuthentifie = await _utilisateurService.AuthentifierUtilisateurAsync(nomUtilisateur, motPasse);

        EstAuthentifie = UtilisateurAuthentifie != null;

        return EstAuthentifie;
    }

    public async Task<bool> EstAutoriseAsync(params string[] nomRoles)
    {
        if (UtilisateurAuthentifie != null)
        {
            return await _utilisateurService.AutoriserUtilisateurParRolesAsync(UtilisateurAuthentifie.UtilisateurId, nomRoles.ToList());
        }
        else
        {
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

    public UtilisateurAuthentifieModel? UtilisateurAuthentifie { get; private set; }

//highlight-start
    public bool EstAuthentifie 
    { 
        get
        {
            return _estAuthentifie;
        }
        private set
        {
            SetProperty(ref _estAuthentifie, value);
        }
    }
//highlight-end
}
```

## Modification du MainWindowVM

Il faut modifier la classe **MainWindowVM** pour rendre accessible la classe d'assistance **Authentificateur** par une propriété.

Il faut injecter la dépendance **IAuthentificateur** dans le constructeur (lignes 8, 10 et 13, 35-40). 

Cette propriété permettra à un composant de se lier à la propriété **Authentificateur.EstAuthentifie** .

```csharp showLineNumbers
using CommunityToolkit.Mvvm.Input;

namespace SuperCarte.WPF.ViewModels;

public class MainWindowVM : BaseVM
{
    private readonly INavigateur _navigateur;
    //highlight-next-line
    private readonly IAuthentificateur _authentificateur;

//highlight-next-line
    public MainWindowVM(INavigateur navigateur, IAuthentificateur authentificateur)
	{   
        _navigateur = navigateur;
        //highlight-next-line
        _authentificateur = authentificateur;

        //Création des commandes
        NaviguerListeCartesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCartesVM>);
        NaviguerListeCategoriesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCategoriesVM>);

        //Vue initiale
        _navigateur.Naviguer<ConnexionVM>();
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
    
    //highlight-start
    public IAuthentificateur Authentificateur
    {
        get 
        {
            return _authentificateur;
        }
    }
    //highlight-end
}
```

## Lier la propriété Visibility du menu - MainWindow.xaml

La propriété **Visibility** n'accepte pas un booléen comme valeur. Il y a 3 valeurs **Collapsed, Hidden et Visible**.

Il faut utiliser un convertisseur **BooleanToVisibilityConverter** pour que **true = Visible** et que **false = Collapsed**.

**Collapsed** ne crée pas le composant. Il ne prend pas d'espace dans la vue.

**Hidden** crée le composant et il prend l'espace qui lui est assigné dans la vue, mais ne l'affiche pas.

Modifiez le fichier **MainWindow.xaml** par celui-ci.

À la ligne 14, il faut inclure le convertisseur dans les ressources de l'application. **WPF** fournit le convertisseur **BooleanToVisibilityConverter**.

À la ligne 43, il faut faire la liaison avec la propriété **Authentificateur.EstAuthentifie**. Dans le **Binding**, il faut indiquer que la valeur doit être convertie **Converter=\{StaticResource BooleanToVisibilityConverter}** avec un convertisseur. Il faut utiliser le nom de la clé de la ressource dans le **Binding**. Dans ce cas-ci, la clé a le même nom que le convertisseur.

```csharp showLineNumbers
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
    //highlight-next-line
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
    </Window.Resources>
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="auto"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>
        //highlight-next-line
        <Menu Grid.Row="0" HorizontalContentAlignment="Stretch" VerticalAlignment="Stretch"
        //highlight-next-line
              Visibility="{Binding Authentificateur.EstAuthentifie, Converter={StaticResource BooleanToVisibilityConverter}}">
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

## Test

Redémarrez le projet. Tant que vous ne serez pas connecté, le menu ne s'affichera pas. 