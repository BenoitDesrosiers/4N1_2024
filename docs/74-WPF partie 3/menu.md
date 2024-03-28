---
sidebar_position: 310
draft: false
---

# Menu

La navigation par le menu va utiliser une **commande** pour utiliser le **Navigateur**. Il y a plusieurs designs de menu possible, mais le plus classique dans les applications natives Windows est la barre de menu.

Le menu doit être toujours accessible, peu importe la vue active. Le menu sera dans la fenêtre principale de l'application et les commandes dans son **ViewModel**.

## Création des commandes - MainWindowVM

Modifiez la classe **MainWindowVM.cs**.

Aux lignes 22 et 24, il y a les 2 commandes pour la navigation. Les commandes pour la navigation doivent avoir le préfixe **Naviguer** avec le nom du **ViewModel**. Les commandes sont synchrones. Le changement de vue doit se faire en synchrone.

Aux lignes 15 et 16, il y a la création des commandes dans le constructeur. Il est possible de leur assigner directement la méthode du navigateur sans créer une méthode interne au **ViewModel**. Lorsqu'une commande utilise une classe d'assistance, il est préférable de l'utiliser directement.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.Input;

namespace SuperCarte.WPF.ViewModels;

public class MainWindowVM : BaseVM
{
    private readonly INavigateur _navigateur;

    public MainWindowVM(INavigateur navigateur)
	{   
        //Sélectionner le ViewModel de démarrage        
        _navigateur = navigateur;

//highlight-start
        //Création des commandes
        NaviguerListeCartesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCartesVM>);
        NaviguerListeCategoriesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCategoriesVM>);
//highlight-end
        //Vue initiale
        _navigateur.Naviguer<ListeCartesVM>();
    }

//highlight-start
    public IRelayCommand NaviguerListeCartesVMCommande {  get; private set; }

    public IRelayCommand NaviguerListeCategoriesVMCommande { get; private set; }
//highlight-end
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
	//highlight-start
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
                <MenuItem Header="Liste des ca_tégories" Command="{Binding NaviguerListeCategoriesVMCommande}"/>
            </MenuItem>            
        </Menu>

        <ContentControl Grid.Row="1"  Content="{Binding Navigateur.VMActif}" />                
    </Grid>
	//highlight-end
</Window>
```

La fenêtre a maintenant 2 rangées dans sa grille.

La première rangée sera pour le menu et la 2e pour la vue.

La hauteur de la première rangée est automatique afin d'avoir un menu qui s'adapte en fonction 

Ensuite, la barre de menu classique utilise le composant **\<Menu>** (ligne 31 ). Chaque élément du menu est un composant **\<MenuItem>**. Il est possible d'imbriquer les **\<MenuItem>** pour faire des sous-menus.

Les propriétés **HorizontalContentAlignment** et **VerticalAlignment** ont la valeur **Stretch** pour prendre tout l'espace disponible. Il n'est pas nécessaire de mettre le menu dans un **\<WrapPanel>**.

Le **\<MenuItem>** est assigné à une commande (ligne 36).

La navigation d'une barre de menu classique peut se faire par le clavier en appuyant sur la touche **ALT**. Le menu indique la lettre qu'il faut appuyer pour sélectionner le menu. Cette lettre est soulignée. Pour être en mesure d'assigner cette lettre, il faut mettre la barre en bas **(underscore)** avant la lettre. Pour le menu fichier, le nom est **_Fichier** , donc c'est le **F**. Pour le menu **Liste des ca_tégories**, c'est le **t**, car le **c**  est déjà utilisé dans ce sous-menu, et le **a** est pour **A**dministration.

Par convention, on prend la première lettre si elle est disponible.

Démarrez le logiciel et il sera possible de naviguer avec le menu.

Diminuez la taille de la fenêtre et le menu s'ajustera.

:::tip
Pour le TP 3
Il faut que le menu soit traduit avec les fichiers ressources. N'oubliez pas la lettre pour le raccourci.
:::
