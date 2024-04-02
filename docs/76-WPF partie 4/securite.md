---
sidebar_position: 460
draft: false
---

# Menu et sécurité

Il existe 2 visions pour la gestion d'un menu dans une application native pour la sécurité.

Il serait possible pour la sécurité de masquer les menus auxquels l'utilisateur n'a pas accès. Il faudrait lier une propriété à chacun des items du menu pour gérer la visibilité ou non. Cette approche évite d'exposer des menus non nécessaires à l'utilisateur. Cependant, cette approche peut occasionner de l'incompréhension, car l'utilisateur peut chercher un menu qu'il ne voit pas. Il ne lui viendra peut-être pas d'instinct que la raison est qu'il n'y a pas accès.

L'autre option est de laisser le menu visible et accessible et de notifier l'utilisateur qu'il n'a pas accès. Cette approche permet d'avoir un menu uniforme et l'utilisateur sait exactement pourquoi il n'est pas en mesure d'accéder à une section. 

:::info
Pour ce projet et le **TP 3**, les menus seront toujours accessibles et visibles. Ce sera lors de l'initialisation du **ViewModel** que le message sera envoyé à l'utilisateur en cas de non-accès.
:::

Nous allons ajouter l'item **Mes cartes** dans le menu.

## Ajout de la commande - MainWindowVM

Il faut ajouter la commande pour faire la navigation vers le **ViewModel ListeMesCartesVM**.

Modifiez la classe **MainWindowVM** pour celle-ci.

Aux lignes 18 et 28, il y a la nouvelle commande **NaviguerListeMesCartesVMCommande** et sa création.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.Input;

namespace SuperCarte.WPF.ViewModels;

public class MainWindowVM : BaseVM
{
    private readonly INavigateur _navigateur;
    private readonly IAuthentificateur _authentificateur;

    public MainWindowVM(INavigateur navigateur, IAuthentificateur authentificateur)
	{           
        _navigateur = navigateur;
        _authentificateur = authentificateur;

        //Création des commandes
        NaviguerListeCartesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCartesVM>);
        NaviguerListeCategoriesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCategoriesVM>);
        //highlight-next-line
        NaviguerListeMesCartesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeMesCartesVM>);

        //Vue initiale
        _navigateur.Naviguer<ConnexionVM>();
    }

    public IRelayCommand NaviguerListeCartesVMCommande {  get; private set; }

    public IRelayCommand NaviguerListeCategoriesVMCommande { get; private set; }

//highlight-next-line
    public IRelayCommand NaviguerListeMesCartesVMCommande { get; private set; }

    public INavigateur Navigateur
    { 
        get
        {
            return _navigateur;
        }
    }
    
    public IAuthentificateur Authentificateur
    {
        get 
        {
            return _authentificateur;
        }
    }
}
```

## Ajout de Mes cartes dans le menu - MainWindow.xaml

Modifiez le fichier **MainWindow.xaml** pour le code ci-dessous.

À la ligne 54, il y a le nouvel item dans le menu. Le menu **Mes cartes** est directement dans la barre.

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
        <DataTemplate DataType="{x:Type TypeName=vm:ListeMesCartesVM}">
            <v:UcListeMesCartes />
        </DataTemplate>
    </Window.Resources>
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="auto"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>
        <Menu Grid.Row="0" HorizontalContentAlignment="Stretch" VerticalAlignment="Stretch"
              Visibility="{Binding Authentificateur.EstAuthentifie, Converter={StaticResource BooleanToVisibilityConverter}}">
            <MenuItem Header="_Fichier">
                <MenuItem Header="_Quitter" />
            </MenuItem>
            <MenuItem Header="_Administration">
                <MenuItem Header="Liste des _cartes" Command="{Binding NaviguerListeCartesVMCommande}"/>
                <MenuItem Header="Liste des c_atégories" Command="{Binding NaviguerListeCategoriesVMCommande}"/>
            </MenuItem>
            //highlight-next-line
            <MenuItem Header="_Mes cartes" Command="{Binding NaviguerListeMesCartesVMCommande}"/>
        </Menu>

        <ContentControl Grid.Row="1"  Content="{Binding Navigateur.VMActif}" />                
    </Grid>
</Window>
```

