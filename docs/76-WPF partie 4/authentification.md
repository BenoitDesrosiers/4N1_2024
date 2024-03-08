---
sidebar_position: 410
draft: true
---


# Authentification

L'authentification consiste à valider l'identité d'un utilisateur. La méthode la plus conventionnelle est l'utilisation d'un nom d'utilisateur et d'un mot de passe.

Pour aider le logiciel, il faut mettre en place une classe d'assistance qui contiendra l'information de l'utilisateur connecté. Cette classe utilisera les services de l'application pour valider le compte utilisateur. Cette classe sera dans le projet **.WPF**, car la gestion de l'état de la sécurité est dépendante de la couche de présentation. Pour un contrôleur Web, ce sera généralement un jeton. Avec **WPF**, il n'y a pas de classe fournie par le cadriciel pour gérer la sécurité, il faut donc la créer.

## SuperCarte.Core

### Requête ObtenirParNomUtilisateur - UtilisateurRepo

Pour authentifier l'utilisateur, il faut obtenir son enregistrement dans la base de données à partir de son nom d'utilisateur. 

Dans l'interface **IUtilisateurRepo**, ajoutez la définition de cette méthode.

```csharp showLineNumbers
/// <summary>
/// Obtenir un utilisateur par son nom d'utilisateur en asynchrone
/// </summary>
/// <param name="nomUtilisateur">Nom utilisateur</param>    
/// <returns>L'utilisateur ou null si non trouvé</returns>
Task<Utilisateur?> ObtenirParNomUtilisateurAsync(string nomUtilisateur);
```

Dans la classe **UtilisateurRepo**, ajoutez cette méthode.

```csharp showLineNumbers
public async Task<Utilisateur?> ObtenirParNomUtilisateurAsync(string nomUtilisateur)
{
    return await (from lqUtilisateur in _bd.UtilisateurTb
                  where
                      lqUtilisateur.NomUtilisateur == nomUtilisateur
                  select
                      lqUtilisateur).FirstOrDefaultAsync();
}
```

### Classe du modèle - UtilisateurAuthentifieModel

Il faut avoir une classe qui contient l'information de l'utilisateur authentifié.

Créez la classe **UtilisateurAuthentifieModel** dans le dossier **Models**.

```csharp showLineNumbers
namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient l'information de l'utilisateur authentifié
/// </summary>
public class UtilisateurAuthentifieModel
{
    public UtilisateurAuthentifieModel()
    {
        DateConnexion = DateTime.Now;
    }

    public int UtilisateurId { get; init; }

    public string Prenom { get; init; } = null!;

    public string Nom { get; init; } = null!;

    public string NomUtilisateur { get; init; } = null!;

    public DateTime DateConnexion { get; private set; }

}
```

Le mot-clé **`init`** indique que le **`set`** est seulement disponible lors de sa création. Il ne sera pas possible de modifier les propriétés après sa création. La classe est donc **immuable**. Il est important que l'information de l'utilisateur ne change pas en cours d'exécution.

La seule façon d'assigner des valeurs est par cette notation.

```csharp showLineNumbers
var u = new UtilisateurAuthentifieModel()
{
	UtilisateurId = 1,
	...
}
```



### Méthode d'autorisation - UtilisateurService

Il faut faire la mécanique d'authentification. Le mot de passe est enregistré dans la base de données par une mécanique de **hash**. L'algorithme utilisé est **BCrypt**.

Dans l'interface **IUtilisateurService**, ajoutez la définition de la méthode ci-dessous.

```csharp showLineNumbers
/// <summary>
/// Authentitifer un utilisateur en asynchrone.
/// </summary>
/// <param name="nomUtilisateur">Nom utilisateur</param>
/// <param name="motPasse">Mot de passe en clair</param>
/// <returns>L'utilisateur authentifié ou null si la combinaison nom utilisateur et mot de passe est invalide</returns>
Task<UtilisateurAuthentifieModel?> AuthentifierUtilisateurAsync(string nomUtilisateur, string motPasse);
```

Dans la classe **UtilisateurService**, ajoutez la méthode ci-dessous.

```csharp showLineNumbers
public async Task<UtilisateurAuthentifieModel?> AuthentifierUtilisateurAsync(string nomUtilisateur, string motPasse)
{
    Utilisateur? utilisateur = await _utilisateurRepo.ObtenirParNomUtilisateurAsync(nomUtilisateur);

    if(utilisateur != null)
    {
        if(BC.Verify(motPasse, utilisateur.MotPasseHash) == true)
        {
            return new UtilisateurAuthentifieModel()
            {
                UtilisateurId = utilisateur.UtilisateurId,
                NomUtilisateur = utilisateur.NomUtilisateur,
                Prenom = utilisateur.Prenom,
                Nom = utilisateur.Nom
            };
        }
        else
        {
            return null;
        }
    }
    else
    {
        return null;
    }
}
```

En premier lieu, il faut récupérer l'utilisateur. 

La librairie **BCrypt** a une méthode de vérification du mot de passe à partir du **hash** de la base de données. Selon l'algorithme de **hash**, il serait possible d'envoyer le **hash** dans le **Repository** et de le mettre dans le **`where`**. Avec **Bcrypt** ce n'est pas recommandé, car il existe plusieurs versions pour le hashage. Donc le hash généré peut varier en fonction des options. La méthode **`Verify()`** permet d'analyser le **hash** et ensuite appliquer les bonnes règles sur le mot de passe à tester.

Remarquez que le mot de passe n'est pas conservé dans la classe **UtilisateurAuthentifieModel**. Il ne faut conserver aucune trace de mot de passe en mémoire pour la sécurité de l'application.

## SuperCarte.WPF

Dans ce projet, il faut créer la classe d'assistance et la vue de connexion.

### Classe d'assistance - Authentificateur

Créez l'interface **IAuthentificateur** dans le dossier **Aides**.

La classe doit avoir au minimum les 3 membres ci-dessous.

La propriété **`UtilisateurAuthentifieModel`** permet de connaitre l'information de l'utilisateur qui est connecté à l'application.

La méthode **`AuthentifierUtilisateurAsync()`** permet d'authentifier l'utilisateur en fonction du nom d'utilisateur et du mot de passe.

```csharp showLineNumbers
namespace SuperCarte.WPF.Aides;

/// <summary>
/// Inteface qui représente la classe d'assistance pour l'authentification et l'autorisation
/// </summary>
public interface IAuthentificateur
{
    /// <summary>
    /// Authentifie un utilisateur à partir de son nom d'utilisateur et de son mot de passe en asynchrone.
    /// </summary>
    /// <param name="nomUtilisateur">Nom d'utilisateur</param>
    /// <param name="motPasse">Mot de passe en clair</param>
    /// <returns>Vrai si un utilisateur est authentifié, faux sinon</returns>
    Task<bool> AuthentifierUtilisateurAsync(string nomUtilisateur, string motPasse);

    UtilisateurAuthentifieModel? UtilisateurAuthentifie { get; }
    
    bool EstAuthentifie { get; }
}
```

Créez la classe **Authentificateur**.

```csharp showLineNumbers
namespace SuperCarte.WPF.Aides;

/// <summary>
/// Classe qui représente la classe d'assistance pour l'authentification et l'autorisation
/// </summary>
public class Authentificateur : IAuthentificateur
{
    private readonly IUtilisateurService _utilisateurService;    

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

    public UtilisateurAuthentifieModel? UtilisateurAuthentifie { get; private set; }

    public bool EstAuthentifie { get; private set; }
}
```

La classe d'assistance utilise **UtilisateurService** pour authentifier l'utilisateur.

### Enregistrement de la classe d'assistance - App.xaml.cs

Il faut enregistrer la classe d'assistance dans les services.

L'enregistrement se fait directement dans la classe **App.xaml.cs**.

Voici le nouveau constructeur.

À la ligne 21, l'enregistrement du **Authentificateur** est fait avec un singleton. Il faut avoir seulement une instance de cette classe.

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

        //Appel des méthodes d'extension                        
        services.EnregistrerRepositories();
        services.EnregistrerServices();
        services.EnregistrerValidateurs();
        services.EnregistrerViewModels();
    });

    _host = builder.Build();
}
```

### Création du ViewModel - ConnexionVM

Il faut créer le **ViewModel** pour la vue de connexion.

Créez la classe **ConnexionVM** dans le dossier **ViewModels**.

Cette vue a besoin d'une propriété pour le nom d'utilisateur et d'une propriété pour le mot de passe inscrit.

Il faut également une commande pour authentifier l'utilisateur (ligne 60). Cette commande est uniquement accessible si les champs ne sont pas vides. La commande utilise la classe d'assistance **Authentificateur** pour faire l'authentification (ligne 42). Si l'utilisateur est authentifié, la vue est redirigée vers **ListeCategorieVM** (ligne 46). Par contre, cette vue n'est pas accessible pour tous, seulement pour le rôle **Administratreur**. Généralement, il faut une vue accessible pour tous comme vue initiale.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.Input;

namespace SuperCarte.WPF.ViewModels;

/// <summary>
/// ViewModel de la vue Connexion
/// </summary>
public class ConnexionVM : BaseVM
{
    #region Dépendances
    private readonly INavigateur _navigateur;
    private readonly IAuthentificateur _authentificateur;
    #endregion

    #region Attributs des propriétés        
    private string _nomUtilisateur;
    private string _motPasse;
    private bool _estEnTravail = false;
    private bool _champsModifiables = true;
    #endregion

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="navigateur">Classe d'assistance pour la navigation</param>
    /// <param name="authentificateur">Classe d'assistance pour l'authentification</param>
    public ConnexionVM(INavigateur navigateur, IAuthentificateur authentificateur)
    {
        _navigateur = navigateur;
        _authentificateur = authentificateur;

        AuthentifierCommande = new AsyncRelayCommand(AuthentifierAsync, PeutAuthentifier);
    }

    #region Méthodes des commandes
    private async Task AuthentifierAsync()
    {
        ChampsModifiables = false;
        EstEnTravail = true;
        base.EffacerErreurs();

        bool authentifier = await _authentificateur.AuthentifierUtilisateurAsync(NomUtilisateur, MotPasse);

        if (authentifier == true)
        {
            _navigateur.Naviguer<ListeCategoriesVM>();
        }

        EstEnTravail = false;
        ChampsModifiables = true;
    }

    private bool PeutAuthentifier()
    {
        return (!string.IsNullOrWhiteSpace(NomUtilisateur) && !string.IsNullOrWhiteSpace(MotPasse));
    }
    #endregion

    #region Commandes
    public IAsyncRelayCommand AuthentifierCommande { get; private set; }
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

    public string NomUtilisateur
    {
        get
        {
            return _nomUtilisateur;
        }
        set
        {
            if (SetProperty(ref _nomUtilisateur, value))
            {
                AuthentifierCommande.NotifyCanExecuteChanged();
            }
        }
    }

    public string MotPasse
    {
        get
        {
            return _motPasse;
        }
        set
        {
            if (SetProperty(ref _motPasse, value))
            {
                AuthentifierCommande.NotifyCanExecuteChanged();
            }
        }
    }
    #endregion
}
```

### Classe d'assistance pour le PasswordBox

Le composant **PasswordBox** ne peut pas être utilisé avec la liaison dans sa conception. Cette limitation est imposée pour des raisons de sécurité. 

Il est également impossible de créer un sous-composant en héritant de la classe **PasswordBox**, car celle-ci est scellée **`sealed`**. Une classe **`sealed`** est une classe qui empêche l'héritage. Microsoft veut s'assurer que la mécanique du **PasswordBox** ne soit pas modifiée par la réécriture des méthodes.

Les librairies de composants comme **DevExpress** offre un **PasswordBox** évolué qui permettre de faire la liaison. La conception d'un composant demande énormément de code et faire une version soit même serait très long.

Le site **WPF Tutorial** donne une classe d'extension qui permet d'ajouter la fonctionnalité au **PasswordBox**. Ceci contourne la vision de sécurité de Microsoft, mais pour la nature de cette application, cette option est valide.

Pour plus d'information : https://www.wpftutorial.net/PasswordBox.html

La classe présentée ci-dessous est légèrement modifiée par rapport à celle de **WPF Tutorial**.

Créez le dossier **Composants** dans le projet **SuperCarte.WPF**.

Créez la classe **PasswordBoxExt.cs**

```csharp showLineNumbers
/*
 * Source 
 * WPF Tutorial.Net
 * https://www.wpftutorial.net/PasswordBox.html
 */

using System.Windows.Controls;
using System.Windows;

namespace SuperCarte.WPF.Composants;

/// <summary>
/// Classe d'aide pour ajouter la liaison sur le mot de passe du composant PasswordBox
/// </summary>
public static class PasswordBoxExt
{
    public static readonly DependencyProperty PasswordProperty =
        DependencyProperty.RegisterAttached("Password",
        typeof(string), typeof(PasswordBoxExt),
        new FrameworkPropertyMetadata(string.Empty, OnPasswordPropertyChanged)
        {
            BindsTwoWayByDefault = true

        });

    public static readonly DependencyProperty AttachProperty =
        DependencyProperty.RegisterAttached("Attach",
        typeof(bool), typeof(PasswordBoxExt), new PropertyMetadata(false, Attach));

    private static readonly DependencyProperty IsUpdatingProperty =
       DependencyProperty.RegisterAttached("IsUpdating", typeof(bool),
       typeof(PasswordBoxExt));


    public static void SetAttach(DependencyObject dp, bool value)
    {
        dp.SetValue(AttachProperty, value);
    }

    public static bool GetAttach(DependencyObject dp)
    {
        return (bool)dp.GetValue(AttachProperty);
    }

    public static string GetPassword(DependencyObject dp)
    {
        return (string)dp.GetValue(PasswordProperty);
    }

    public static void SetPassword(DependencyObject dp, string value)
    {
        dp.SetValue(PasswordProperty, value);
    }

    private static bool GetIsUpdating(DependencyObject dp)
    {
        return (bool)dp.GetValue(IsUpdatingProperty);
    }

    private static void SetIsUpdating(DependencyObject dp, bool value)
    {
        dp.SetValue(IsUpdatingProperty, value);
    }

    private static void OnPasswordPropertyChanged(DependencyObject sender,
        DependencyPropertyChangedEventArgs e)
    {
        PasswordBox passwordBox = sender as PasswordBox;
        passwordBox.PasswordChanged -= PasswordChanged;

        if (!(bool)GetIsUpdating(passwordBox))
        {
            passwordBox.Password = (string)e.NewValue;
        }
        passwordBox.PasswordChanged += PasswordChanged;
    }

    private static void Attach(DependencyObject sender,
        DependencyPropertyChangedEventArgs e)
    {
        PasswordBox passwordBox = sender as PasswordBox;

        if (passwordBox == null)
            return;

        if ((bool)e.OldValue)
        {
            passwordBox.PasswordChanged -= PasswordChanged;
        }

        if ((bool)e.NewValue)
        {
            passwordBox.PasswordChanged += PasswordChanged;
        }
    }

    private static void PasswordChanged(object sender, RoutedEventArgs e)
    {
        PasswordBox passwordBox = sender as PasswordBox;
        SetIsUpdating(passwordBox, true);
        SetPassword(passwordBox, passwordBox.Password);
        SetIsUpdating(passwordBox, false);
    }
}
```

Pour le **TP 3**, la vue **UcGestionUtilisateur**, il faudra utiliser cette extension pour le mot de passe. 

### Enregistrer le ViewModel - SCViewModelExtensions

Dans la classe **SCViewModelExtensions**, il faut enregistrer le **ViewModel**.

```csharp showLineNumbers
public static void EnregistrerViewModels(this IServiceCollection services)
{
    services.AddSingleton<MainWindowVM>();
    services.AddTransient<HelloWordVM>(); //À retirer
    services.AddTransient<ListeCategoriesVM>();
    services.AddTransient<ListeCartesVM>();
    services.AddTransient<GestionCategorieVM>();
    services.AddTransient<GestionUtilisateurVM>();
    services.AddTransient<ConnexionVM>();
}
```

### Création de la vue - UcConnexion.xaml

Créez le fichier **UcConnexion.xaml** dans le dossier **Views**.

À la ligne 8, le **`namespace`** pour les composants est ajouté. Ce **`namespace`** permet d'utiliser la classe **PasswordBoxExt**.

Les champs **Nom d'utilisateur** et **Mot de passe** ont le **`Validation.ErrorTemplate="{StaticResource erreurTemplate}"`** pour afficher les erreurs.

```xaml
<UserControl x:Class="SuperCarte.WPF.Views.UcConnexion"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:composants="clr-namespace:SuperCarte.WPF.Composants"    
             d:DataContext="{d:DesignInstance vm:ConnexionVM}"
             mc:Ignorable="d" 
             d:DesignHeight="450" d:DesignWidth="800">
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="auto"/>
            <RowDefinition Height="*" />
            <RowDefinition Height="20" />
        </Grid.RowDefinitions>

        <!--Rangée 0-->
        <TextBlock 
            Grid.Row="0" 
            VerticalAlignment="Center" HorizontalAlignment="Center"
            FontSize="16" FontWeight="Bold"
            Text="Connexion"/>

        <!--Rangée 1-->
        <!-- Formulaire -->
        <Grid Grid.Row="1" MaxWidth="800" IsEnabled="{Binding ChampsModifiables}">
            <Grid.RowDefinitions>
                <RowDefinition Height="auto"/>
                <RowDefinition Height="auto"/>
                <RowDefinition Height="auto"/>
            </Grid.RowDefinitions>
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="auto"/>
                <ColumnDefinition Width="*" />
            </Grid.ColumnDefinitions>

            <!-- Nom utilisateur -->
            <Label Grid.Row="0" Grid.Column="0" 
                   Content="Nom d'utilisateur : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="0" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding NomUtilisateur}"
                     Padding="2 4 0 0"
                     Margin="0 10 5 10">
                <TextBox.InputBindings>
                    <KeyBinding Command="{Binding AuthentifierCommande}" Key="Return"/>
                </TextBox.InputBindings>
            </TextBox>

            <!-- Mot de passe -->
            <Label Grid.Row="1" Grid.Column="0" 
                   Content="Mot de passe : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>

            <PasswordBox Grid.Row="1" Grid.Column="1"
                         Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                         composants:PasswordBoxExt.Attach="True"
                         composants:PasswordBoxExt.Password="{Binding MotPasse}"                                                  
                         Padding="2 4 0 0"
                         Margin="0 10 5 10">
                <PasswordBox.InputBindings>
                    <KeyBinding Command="{Binding AuthentifierCommande}" Key="Return"/>
                </PasswordBox.InputBindings>
            </PasswordBox>

            <!--Rangée 2-->
            <Button Grid.Row="2" Grid.ColumnSpan="2" HorizontalAlignment="Right"
                    Command="{Binding AuthentifierCommande}"
                    Content="Connexion"
                    Width="70" Height="30"
                    Margin="0 10 5 0"/>

        </Grid>

        <!--Rangée 2-->
        <ProgressBar Grid.Row="2" Height="10" IsIndeterminate="{Binding EstEnTravail}" />
    </Grid>
</UserControl>
```

Pour faire la liaison du **PasswordBox**, il faut ajouter les lignes 3 et 4. 

Également, il est intéressant de permettre la touche **Entrée** pour exécuter la commande d'authentification. Les lignes **7 à 9** permettent de lier une commande à une touche.

```xaml
<PasswordBox Grid.Row="1" Grid.Column="1"
             Validation.ErrorTemplate="{StaticResource erreurTemplate}"
             composants:PasswordBoxExt.Attach="True"
             composants:PasswordBoxExt.Password="{Binding MotPasse}"                                              
             Padding="2 4 0 0"
             Margin="0 10 5 10">
    <PasswordBox.InputBindings>
        <KeyBinding Command="{Binding AuthentifierCommande}" Key="Return"/>
    </PasswordBox.InputBindings>
</PasswordBox>
```

### Ajout de la ressource pour créer le lien entre ViewModel et Vue - MainWindow.xaml

Il faut ajouter dans les ressources le lien entre le **ViewModel** et la **Vue**.

Les lignes 31 à 33 contiennent le lien entre **UcConnexion** et **ConnexionVM**.

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
        <DataTemplate DataType="{x:Type TypeName=vm:ConnexionVM}">
            <v:UcConnexion />
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

### Modification de la vue initiale - MainWindowVM

Il faut que la vue initiale soit la connexion.

Modifiez la classe **MainWindowVM**.

```csharp showLineNumbers
public MainWindowVM(INavigateur navigateur)
{   
    //Sélectionner le ViewModel de démarrage        
    _navigateur = navigateur;

    //Création des commandes
    NaviguerListeCartesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCartesVM>);
    NaviguerListeCategoriesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCategoriesVM>);

    //Vue initiale
    _navigateur.Naviguer<ConnexionVM>();
}
```

### Test

Démarrez l'application.

Essayez avec ce compte.

- fsthilaire
- 1234

Rien ne se passe lorsque vous appuyez sur le bouton de connexion. Il faudra améliorer la fenêtre à la section 3.

Essayez avec ce compte.

- fsthilaire
- Native3!

La vue **Liste des cartes** est affichée.

Démarrez de nouveau le programme. Sélectionnez le menu **Administration -> Liste des cartes**. Il est possible d'y accéder sans être connecté. Ce problème sera réglé aux sections 4, 5 et 6.

# Message d'erreur

Le formulaire de connexion n'affiche pas de message lorsque le compte n'est pas valide. Pour ce faire, il faut ajouter de la validation au formulaire.

Par contre, pour cette vue, ce ne sera pas un validateur qui s'occupera de la validation. Le **ViewModel** ajoutera un message d'erreur si l'authentification n'est pas valide.

Il est souvent conseillé de ne pas indiquer si c'est un utilisateur inexistant ou que le mot de passe est invalide. Il faut donner le moins d'indices pour ceci.

## Modification du BaseVM

Ajoutez cette méthode dans la classe **BaseVM**.

Cette méthode permet d'ajouter une erreur directement pour une propriété. La ligne 15 génère l'événement pour indiquer au composant qui est lié à la propriété qu'il y a maintenant une erreur.

```csharp showLineNumbers
/// <summary>
/// Ajouter une erreur pour une propriété
/// </summary>
/// <param name="propriete">Nom de la propriété</param>
/// <param name="erreur">Message d'erreur</param>
protected void AjouterErreur(string propriete, string erreur)
{
    if (!_lstErreursParPropriete.ContainsKey(propriete))
    {
        _lstErreursParPropriete.Add(propriete, new List<string>());
    }

    _lstErreursParPropriete[propriete].Add(erreur);

    OnErrorsChanged(propriete);
}
```

## Ajout du message - ConnexionVM

Modifiez la méthode **`AuthentifierAsync()`** par celle-ci.

À la ligne 15, l'erreur est ajoutée manuellement pour la propriété **MotPasse**. L'utilisation du mot-clé **`nameof`** permet de convertir en **string** le nom d'une propriété. Il serait possible de faire **`AjouterErreur("MotPasse", "Erreur...")`**, mais le compilateur ne sera pas en mesure de voir si la propriété **MotPasse** existe réellement, car c'est une **string**.

Le message s'affichera pour le mot de passe, même si le nom d'utilisateur est invalide, car l'erreur est assignée à la propriété **MotPasse**.

```csharp showLineNumbers
private async Task AuthentifierAsync()
{
    ChampsModifiables = false;
    EstEnTravail = true;
    EffacerErreurs();

    bool authentifier = await _authentificateur.AuthentifierUtilisateurAsync(NomUtilisateur, MotPasse);

    if (authentifier == true)
    {
        _navigateur.Naviguer<ListeCategoriesVM>();
    }
    else
    {
        AjouterErreur(nameof(MotPasse), "La combinaison du nom d'utilisateur et du mot de passe n'est pas valide.");
    }

    EstEnTravail = false;
    ChampsModifiables = true;
}
```

## Test

La vue **UcConnexion** a déjà le **`Validation.ErrorTemplate="{StaticResource erreurTemplate}"`** pour les composants.

Essayez avec ce compte.

- fsthilaire
- 1234

Le message d'erreur s'affiche.

Essayez avec ce compte.

- fsthilaire
- Native3!

La vue **Liste des cartes** est affichée.

# Autorisation

L'autorisation consiste à vérifier si un utilisateur est en mesure de faire une action de visualiser de l'information.

Une vue qui est accessible par tous les utilisateurs authentifiés doit s'assurer qu'il y a un utilisateur qui est connecté.

L'application utilise des **rôles** également pour la sécurité. Il peut avoir des vues et des actions du programme ne sont pas accessibles par tous. Il faut s'assurer que l'utilisateur a le rôle.

Il faut injecter dans tous les **ViewModels** la classe d'assistance **Authentificateur** pour que le **ViewModel** soit en mesure de faire les vérifications.

Également, la vérification du rôle se fait toujours dans la base de données. La classe **UtilisateurAuthentifieModel** ne contient pas l'information du rôle. Il serait possible de l'inclure dans la classe, mais si le rôle de l'utilisateur est modifié en cours d'utilisateur, son ancien rôle sera toujours accessible tant qu'il sera connecté. La validation du rôle directement dans la base de données permet de s'assurer que l'utilisateur a toujours le rôle nécessaire.

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

Dans la classe **UtilisateurService**, ajoutez les 2 méthodes ci-dessous.

Il faut obtenir le rôle de l'utilisateur. Si le rôle est dans la liste des rôles autorisée, l'utilisateur reçoit l'autorisation. Si le rôle n'est pas dans la liste ou si l'utilisateur n'existe pas, il n'y a pas d'autorisation.

```csharp showLineNumbers
public async Task<bool> AutoriserUtilisateurParRolesAsync(int utilisateurId, List<string> lstNomRole)
{
    Role? role = await _utilisateurRepo.ObtenirRoleUtilisateurAsync(utilisateurId);

    if (role != null)
    {
        return lstNomRole.Contains(role.Nom);
    }
    else
    {
        return false;
    }
}

public bool AutoriserUtilisateurParRoles(int utilisateurId, List<string> lstNomRole)
{
    Role? role = _utilisateurRepo.ObtenirRoleUtilisateur(utilisateurId);

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

Dans l'interface **IAuthentificateur**, ajoutez les 2 méthodes ci-dessous.

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

La méthode reçoit un paramètre de type **`params string[]`**. Le mot-clé **`params`** permet de spécifier les différents éléments du tableau sans déclarer de tableau et en séparant un élément du tableau comme un paramètre unique. Par exemple, **`EstAutoriseAsync("Role1", "Role2", "Role3")`** est permis.

```csharp showLineNumbers
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
```

### Sécuriser les dépendances du ViewModel

Il faut faire ceci pour les **ViewModels** qui nécessitent une autorisation.

L'exemple sera fait uniquement pour **ListeCategoriesVM**.

Il faut ajouter l'interface d'assistance **IAuthentificateur** dans les dépendances du **ViewModel**.

```csharp showLineNumbers
//Attributs
private readonly string[] _rolesAutorises = { "Administrateur" };

public ListeCategoriesVM(IAuthentificateur authentificateur, ICategorieService categorieService, INavigateur navigateur)
{
    _authentificateur = authentificateur;

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
}
```

Les rôles globaux autorisés par ce **ViewModel** sont dans l'attribut **`_rolesAutorises`**. Si une vérification de rôle doit se faire à partir des rôles globaux, il est plus pratique d'utiliser un attribut. Il est **`readonly`**, car il ne faut pas que les rôles soient modifiables en exécution.

La seule dépendance à être assigné avant la sécurité est la classe **Authentificateur**. Les autres dépendances et la création des commandes se font uniquement si l'utilisateur est autorisé. Il ne sera pas possible d'utiliser les commandes et les services dans le cas que l'utilisateur n'est pas autorisé.

Démarrez le programme avec le compte "Administrateur" ci-dessous.

- fsthilaire
- Native3!

Vous allez avoir accès à la vue.

Essayez maintenant avec le compte "Utilisateur" ci-dessous.

- tstark
- #NotAdmin!

La vue va générer une exception dans la méthode **UserControl_Loaded** pour le chargement automatique.

Voici l'événement du fichier **UcListeCategories.xaml.cs**.

Le programme **plante**, car la commande **ObtenirListeCommande** doit être exécutée, mais elle est **`null`**, car l'utilisateur n'a pas accès. Le **ViewModel** n'a pas créé la commande.

```csharp showLineNumbers
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

Voici par exemple la méthode **`SupprimerAsync`**.

```csharp showLineNumbers
private async Task SupprimerAsync()
{
    EstEnTravail = true;

    if (_authentificateur.EstAutorise(_rolesAutorises))
    {
        await _categorieService.SupprimerAsync(CategorieSelection!.CategorieId);

        await ObtenirListeAsync();
    }

    EstEnTravail = false;
}
```

Il serait possible de permettre la visualisation à **Utilisateur**, mais permettre la suppression uniquement à **Administrateur**.

Il faudrait ajouter dans l'attribut  **`_rolesAutorises`** le rôle **Utilisateur**, mais spécifier uniquement le rôle **Administrateur** dans la commande **Supprimer**.

```
private readonly string[] _rolesAutorises = { "Administrateur", "Utilisateur" };

/***/
private async Task SupprimerAsync()
{
    EstEnTravail = true;

    if (_authentificateur.EstAutorise("Administrateur"))
    {
        await _categorieService.SupprimerAsync(CategorieSelection!.CategorieId);

        await ObtenirListeAsync();
    }

    EstEnTravail = false;
}

```

Voici la classe **ListeCategoriesVM** au complet. Pour le **TP 3**, toutes les fonctionnalités du de la vue seront accessible par un seul rôle.

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

    //Attributs des propriétés
    private List<CategorieModel> _lstCategories;    
    private CategorieModel? _categorieSelection;
    private bool _estEnTravail = false;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="authentificateur">La classe d'assistance d'authentification</param>
    /// <param name="categorieService">Service du modèle Categorie</param>
    /// <param name="navigateur">La classe d'assistance Navigateur</param>    
	public ListeCategoriesVM(IAuthentificateur authentificateur, ICategorieService categorieService, INavigateur navigateur)
    {
        _authentificateur = authentificateur;

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

Il faut injecter l'interface d'assistance **INotification** dans le **ViewModel **(lignes 18, 32 et 36).

Ensuite, dans le **`else`** de la méthode **`EstAutorise()`**, il faut afficher le message d'erreur (lignes 50, 67 et 88).

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
	public ListeCategoriesVM(IAuthentificateur authentificateur, INotification notification,
        ICategorieService categorieService, INavigateur navigateur)
    {
        _authentificateur = authentificateur;
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

# Masquer le menu

Si vous démarrez l'application, le menu est toujours accessible lorsque c'est la vue de connexion. Il serait préférable de le masquer.

Pour faire ceci, il faut lier la propriété de visibilité du menu à la propriété **EstAuthentifie** de la classe **Authentificateur**.

## Activer la OnPropertyChanged - Authentificateur

Modifiez la classe **Authentificateur** par celle-ci.

Il faut activer la notification du changement de valeur d'une propriété dans la classe d'assistance **Authentificateur**. Il faut hériter de la classe **ObservableObject** qui provient de la librairie **MVVM Toolkit **(ligne 9).

Ensuite, il faut modifier la propriété **EstAuthentifie** pour activer la notification sur le **`set`** (ligne 58).

```csharp showLineNumbers
using CommunityToolkit.Mvvm.ComponentModel;
using System.Linq;

namespace SuperCarte.WPF.Aides;

/// <summary>
/// Classe qui représente la classe d'assistance pour l'authentification et l'autorisation
/// </summary>
public class Authentificateur : ObservableObject, IAuthentificateur
{
    private readonly IUtilisateurService _utilisateurService;
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
}
```

## Modification du MainWindowVM

Il faut modifier la classe **MainWindowVM** pour rendre accessible la classe d'assistance **Authentificateur** par une propriété.

Il faut injecter la dépendance **IAuthentificateur** dans le constructeur (lignes 8, 10 et 14). 

Cette propriété permettra à un composant de se lier à la propriété **Authentificateur.EstAuthentifie **(ligne 36).

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
    
    public IAuthentificateur Authentificateur
    {
        get 
        {
            return _authentificateur;
        }
    }
}
```

## Lier la propriété Visibility du menu - MainWindow.xaml

La propriété **`Visibility`** n'accepte pas un booléen comme valeur. Il y a 3 valeurs **Collapsed, Hidden et Visible**.

Il faut utiliser un convertisseur **BooleanToVisibilityConverter** pour que **true = Visible** et que **false = Collapsed**.

**Collapsed** ne crée pas le composant. Il ne prend pas d'espace dans la vue.

**Hidden** crée le composant et il prend l'espace qui lui est assigné dans la vue, mais ne l'affiche pas.

Modifiez le fichier **MainWindow.xaml** par celui-ci.

À la ligne 14, il faut inclure le convertisseur dans les ressources de l'application. **WPF** fournit le convertisseur **BooleanToVisibilityConverter**.

À la ligne 43, il faut faire la liaison avec la propriété **Authentificateur.EstAuthentifie**. Dans le **Binding**, il faut indiquer que la valeur doit être convertie **`Converter={StaticResource BooleanToVisibilityConverter}`** avec un convertisseur. Il faut utiliser le nom de la clé de la ressource dans le **Binding**. Dans ce cas-ci, la clé a le même nom que le convertisseur.

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
        <Menu Grid.Row="0" HorizontalContentAlignment="Stretch" VerticalAlignment="Stretch"
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

# Liste des cartes de l'utilisateur

La vue sera associée à la table pivot **UtilisateurCarte**. Cette table est la relation **plusieurs à plusieurs** des tables **Carte** et **Utilisateur**.

Elle permet d'indiquer les cartes qu'un utilisateur possède et les utilisateurs que les cartes possèdent.

La table **UtilisateurCarte** a également un champ propre pour indiquer le nombre de cartes physiques que l'utilisateur possède pour une carte spécifique.

Pour faire la liste, il faut déterminer les champs qui sont nécessaires à afficher. Étant donné que la vue est la liste des cartes d'un utilisateur, il n'est pas nécessaire d'afficher l'information de l'utilisateur dans la liste. Par contre, il faut un minimum d'information pour la carte. Il faut également inclure la quantité.

## SuperCarte.EF 

### Ajout de données par Seed

Il faut ajouter des données pour la table **UtilisateurCarte**, sinon il ne sera pas possible de voir le fonctionnement de la liste.

Il faut ajouter des cartes pour l'utilisateur **fsthilaire** et l'utilisateur **tstark**.

Il y a seulement 3 cartes, il faut en ajouter quelques-unes.

Voici les enregistrements **Carte** à ajouter dans la méthode **`Seed()`** de la classe **SuperCarteContext**.

```csharp showLineNumbers
//Nouvelles cartes

Carte[] cartes =
{
	/***/
    new Carte()
    {
        CarteId = 4,
        Nom = "Rider",
        Armure = 11,
        Vie = 45,
        Attaque = 35,
        EstRare = true,
        PrixRevente = 3.98m,
        CategorieId = 2,
        EnsembleId = 1
    },
    new Carte()
    {
        CarteId = 5,
        Nom = "Troll",
        Armure = 0,
        Vie = 25,
        Attaque = 15,
        EstRare = false,
        PrixRevente = 0.19m,
        CategorieId = 2,
        EnsembleId = 1
    },
    new Carte()
    {
        CarteId = 6,
        Nom = "Dragon de glace",
        Armure = 10,
        Vie = 35,
        Attaque = 10,
        EstRare = false,
        PrixRevente = 0.09m,
        CategorieId = 1,
        EnsembleId = 1
    }
};


```

Voici les enregistrements **UtilisateurCarte** à ajouter dans la méthode **`Seed()`** de la classe **SuperCarteContext**.

```csharp showLineNumbers
UtilisateurCarte[] utilisateurCartes = new UtilisateurCarte[]
{
    new UtilisateurCarte()
    {
        UtilisateurId = 1, //fsthilaire
        CarteId = 1, //Lion des marais
        Quantite = 2
    },
    new UtilisateurCarte()
    {
        UtilisateurId = 1, //fsthilaire
        CarteId = 3, //Grunty
        Quantite = 3
    },
    new UtilisateurCarte()
    {
        UtilisateurId = 1, //fsthilaire
        CarteId = 4, //Rider
        Quantite = 1
    },
    new UtilisateurCarte()
    {
        UtilisateurId = 1, //fsthilaire
        CarteId = 2, //Corbeau vampire
        Quantite = 5
    },
    new UtilisateurCarte()
    {
        UtilisateurId = 3, //tstark
        CarteId = 1, //Lion des marais
        Quantite = 5
    },
    new UtilisateurCarte()
    {
        UtilisateurId = 3, //tstark
        CarteId = 3, //Grunty
        Quantite = 1
    },
    new UtilisateurCarte()
    {
        UtilisateurId = 3, //tstark
        CarteId = 6, //Dragon de glace
        Quantite = 2
    },
};
```

Voici la méthode **`Seed()`** au complet.

```csharp showLineNumbers
private void Seed(ModelBuilder modelBuilder)
{
    //Les données à ajouter
    Role[] roles = 
    {
        new Role() 
        { 
            RoleId = 1,
            Nom = "Administrateur"                
        },
        new Role()
        {
            RoleId = 2,
            Nom = "Utilisateur"
        },
    };

    Utilisateur[] utilisateurs =
    {
        new Utilisateur()
        {
            UtilisateurId = 1,
            Prenom = "François",
            Nom = "St-Hilaire",
            NomUtilisateur = "fsthilaire",
            MotPasseHash = "$2y$11$IY6NG9FkTSI1dnjLfSbuOuNkuyI7IZHxHSOD5Td6AlwvroUz/vzLK", //Native3! avec Bcrypt
            RoleId = 1 //Admin
        },
        new Utilisateur()
        {
            UtilisateurId = 2,
            Prenom = "Benoit",
            Nom = "Tremblay",
            NomUtilisateur = "btremblay",
            MotPasseHash = "$2y$11$ewK3YsMGQ1IMKEzJUAjyVe0P19I0gEbTO998mwfVbSSA8nZ6MG/ha", //Web4MVC! avec Bcrypt
            RoleId = 2 //Utilisateur
        },
        new Utilisateur() 
        {
            UtilisateurId = 3,
            Prenom = "Tony",
            Nom = "Stark",
            NomUtilisateur = "tstark",
            MotPasseHash = "$2y$11$VfcNowkWResPQKl0AA3MJ.w1LXBqmMM77YKlyf32Glr9TWG4xxyD2", //#NotAdmin! avec Bcrypt
            RoleId = 2 //Utilisateur
        }
    };

    Categorie[] categories =
    {
        new Categorie()
        {
            CategorieId = 1,
            Nom = "Animaux magiques",
            Description = null
        },
        new Categorie()
        {
            CategorieId = 2,
            Nom = "Orcs",
            Description = "Les orcs sont une race de guerrier."
        },
        new Categorie()
        {
            CategorieId = 3,
            Nom = "Mages",
            Description = "Les mages ont des pouvoirs magiques."
        }
    };

    Ensemble[] ensembles =
    {
        new Ensemble()
        {
            EnsembleId = 1,
            Nom = "Ensemble de départ",
            Disponibilite = new DateTime(2020,5,12)
        }
    };

    Carte[] cartes =
    {
        new Carte()
        {
            CarteId = 1,
            Nom = "Lion des marais",
            Armure = 0,
            Vie = 12,
            Attaque = 2,
            EstRare = false,
            PrixRevente = 0.02m,
            CategorieId = 1,
            EnsembleId = 1
        },
        new Carte()
        {
            CarteId = 2,
            Nom = "Corbeau vampire",
            Armure = 0,
            Vie = 2,
            Attaque = 12,
            EstRare = true,
            PrixRevente = 1.20m,
            CategorieId = 1,
            EnsembleId = 1
        },
        new Carte()
        {
            CarteId = 3,
            Nom = "Grunty",
            Armure = 5,
            Vie = 25,
            Attaque = 5,
            EstRare = false,
            PrixRevente = 0.20m,
            CategorieId = 2,
            EnsembleId = 1
        },
        new Carte()
        {
            CarteId = 4,
            Nom = "Rider",
            Armure = 11,
            Vie = 45,
            Attaque = 35,
            EstRare = true,
            PrixRevente = 3.98m,
            CategorieId = 2,
            EnsembleId = 1
        },
        new Carte()
        {
            CarteId = 5,
            Nom = "Troll",
            Armure = 0,
            Vie = 25,
            Attaque = 15,
            EstRare = false,
            PrixRevente = 0.19m,
            CategorieId = 2,
            EnsembleId = 1
        },
        new Carte()
        {
            CarteId = 6,
            Nom = "Dragon de glace",
            Armure = 10,
            Vie = 35,
            Attaque = 10,
            EstRare = false,
            PrixRevente = 0.09m,
            CategorieId = 1,
            EnsembleId = 1
        }
    };

    UtilisateurCarte[] utilisateurCartes = new UtilisateurCarte[]
    {
        new UtilisateurCarte()
        {
            UtilisateurId = 1, //fsthilaire
            CarteId = 1, //Lion des marais
            Quantite = 2
        },
        new UtilisateurCarte()
        {
            UtilisateurId = 1, //fsthilaire
            CarteId = 3, //Grunty
            Quantite = 3
        },
        new UtilisateurCarte()
        {
            UtilisateurId = 1, //fsthilaire
            CarteId = 4, //Rider
            Quantite = 1
        },
        new UtilisateurCarte()
        {
            UtilisateurId = 1, //fsthilaire
            CarteId = 2, //Corbeau vampire
            Quantite = 5
        },
        new UtilisateurCarte()
        {
            UtilisateurId = 3, //tstark
            CarteId = 1, //Lion des marais
            Quantite = 5
        },
        new UtilisateurCarte()
        {
            UtilisateurId = 3, //tstark
            CarteId = 3, //Grunty
            Quantite = 1
        },
        new UtilisateurCarte()
        {
            UtilisateurId = 3, //tstark
            CarteId = 6, //Dragon de glace
            Quantite = 2
        },
    };

    //Ajout dans les tables
    modelBuilder.Entity<Role>().HasData(roles);
    modelBuilder.Entity<Utilisateur>().HasData(utilisateurs);
    modelBuilder.Entity<Categorie>().HasData(categories);
    modelBuilder.Entity<Ensemble>().HasData(ensembles);
    modelBuilder.Entity<Carte>().HasData(cartes);
    modelBuilder.Entity<UtilisateurCarte>().HasData(utilisateurCartes);
}
```

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. Il est important que le **Projet par défaut** de **Entity Framework** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.EF**. À ce stade, il y a **plusieurs projets** et celui sélectionné par défaut sera **WPF**. Il est important de le modifier dans la liste.

Pour ce projet, utilisez cette chaine de connexion. Le nom de la base de données est **eDA_4N1_SuperCarte**. Modifiez le **DA** par votre numéro d'admission.

```powershell
$env:MIGRATION_CONNECTION_STRING = "Server=localhost\SQLExpress;Database=eDA_4N1_SuperCarte;Trusted_Connection=True;"
```

Voici la commande avec le **`Trusted_Connection=True;`** , si vous avez l'erreur **SSL**.

```powershell
$env:MIGRATION_CONNECTION_STRING = "Server=localhost\SQLExpress;Database=eDA_4N1_SuperCarte;Trusted_Connection=True;Trust Server Certificate=True;"
```

Ensuite, il faut créer la migration **`Seed_CartesEtUtilisateurCartes`** avec **`Add-Migration`**.

```
Add-Migration Seed_CartesEtUtilisateurCartes -StartupProject SuperCarte.EF
```

Appliquez les modifications à la base de données. Spécifiez la migration **`Seed_CartesEtUtilisateurCartes`**.

```powershell
Update-Database -StartupProject SuperCarte.EF -Migration Seed_CartesEtUtilisateurCartes
```

## SuperCarte.Core

Il faut ajouter la logique applicative pour le module **UtilisateurCarte**. 

Il faut faire une requête qui retourne la liste complète des cartes pour un utilisateur. Il serait possible d'inclure cette requête dans le **Repository** et le **Service** **Carte**, car l'information retournée sera pour des cartes. Pour d'autres, ce serait le module **Utilisateur**, car c'est en fonction de l'utilisateur. Et finalement, la 3e option est d'utiliser le module **UtilisateurCarte**, car c'est l'entité centrale. Les 3 options sont bonnes. Pour ce projet et le **TP 3**, ce sera la 3e option.

### Création du modèle du domaine - QuantiteCarteDetailModel

Dans le document **Application WPF - Partie 3, section 11**, il était mentionné qu'il était préférable d'utiliser une structure par héritage lorsqu'il faut ajouter des champs à une classe du modèle. Ceci permet d'éviter la répétition des propriétés dans plusieurs classes. Il faut utiliser cette approche pour le nouveau modèle.

En premier lieu, il faut créer la classe **CarteModel** dans le dossier **Models**.

```csharp showLineNumbers
namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient l'information d'une carte
/// </summary>
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

Ensuite, il faut modifier la classe **CarteDetailModel** pour hériter de la classe **CarteModel**.

```csharp showLineNumbers
namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient l'information d'une carte avec le détail de ses clés étrangères
/// </summary>
public class CarteDetailModel : CarteModel
{
    public string CategorieNom { get; set; } = null!;

    public string EnsembleNom { get; set; } = null!;
}
```

Finalement, il faut créer la classe **QuantiteCarteDetailModel** dans le dossier **Models**.

Cette classe n'a pas de propriété pour identifier l'utilisateur. La raison pour ceci est que le **ViewModel** ne doit pas prendre l'information de l'utilisateur à partir de cet objet, mais à partir du **Authentificateur**. Il serait possible de créer une classe **UtilisateurCarteDetailModel** qui contiendrait l'information de l'utilisateur et de la carte et d'ignorer tout simplement les éléments de l'utilisateur. Cette approche permet de créer moins de classe, mais la quantité d'information en mémoire augmente.

Cette classe hérite de la classe **CarteDetailModel**.

```csharp showLineNumbers
namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient l'information complète d'une carte et avec une quantité
/// </summary>
public class QuantiteCarteDetailModel : CarteDetailModel
{
    public short Quantite {  get; set; }
}
```

### Méthode ObtenirCartesUtilisateurAsync - UtilisateurCarteRepo

Il faut ajouter une méthode qui retourne la liste des cartes pour un utilisateur.

La requête fait également un tri pour regrouper les cartes de la même catégorie.

Dans l'interface **IUtilisateurCarteRepo**, ajoutez la méthode ci-dessous.

```csharp showLineNumbers
/// <summary>
/// Obtenir la liste des cartes d'un utilisateur avec sa quantité en asynchrone.
/// La liste est triée par le nom de la catégorie et ensuite par le nom de la carte.
/// </summary>
/// <param name="utilisateurId">La clé de l'utilisateur</param>
/// <returns>Liste des cartes avec la quantité</returns>
Task<List<QuantiteCarteDetailModel>> ObtenirCartesUtilisateurAsync(int utilisateurId);
```

Dans la classe **UtilisateurCarteRepo**, ajoutez la méthode ci-dessous.

```csharp showLineNumbers
public async Task<List<QuantiteCarteDetailModel>> ObtenirCartesUtilisateurAsync(int utilisateurId)
{
    return await (from lqUtilisateurCarte in _bd.UtilisateurCarteTb
                  where
                      lqUtilisateurCarte.UtilisateurId == utilisateurId
                  orderby
                      lqUtilisateurCarte.Carte.Categorie.Nom,                          
                      lqUtilisateurCarte.Carte.Nom
                  select
                      new QuantiteCarteDetailModel()
                      {
                          CarteId = lqUtilisateurCarte.Carte.CarteId,
                          Nom = lqUtilisateurCarte.Carte.Nom,
                          Vie = lqUtilisateurCarte.Carte.Vie,
                          Armure = lqUtilisateurCarte.Carte.Armure,
                          Attaque = lqUtilisateurCarte.Carte.Attaque,
                          EstRare = lqUtilisateurCarte.Carte.EstRare,
                          PrixRevente = lqUtilisateurCarte.Carte.PrixRevente,
                          CategorieId = lqUtilisateurCarte.Carte.CategorieId,
                          CategorieNom = lqUtilisateurCarte.Carte.Categorie.Nom,
                          EnsembleId = lqUtilisateurCarte.Carte.EnsembleId,
                          EnsembleNom = lqUtilisateurCarte.Carte.Ensemble.Nom,
                          Quantite = lqUtilisateurCarte.Quantite
                      }).ToListAsync();
}
```

### Création du service - UtilisateurCarteService

Créez l'interface **IUtilisateurCarteService.cs** dans le dossier **Services**.

```csharp showLineNumbers
using SuperCarte.Core.Models;

namespace SuperCarte.Core.Services;

/// <summary>
/// Interface qui contient les services du modèle UtilisateurCarte
/// </summary>
public interface IUtilisateurCarteService
{
    /// <summary>
    /// Obtenir la liste des cartes d'un utilisateur avec sa quantité en asynchrone.
    /// La liste est triée par le nom de la catégorie et ensuite par le nom de la carte.
    /// </summary>
    /// <param name="utilisateurId">La clé de l'utilisateur</param>
    /// <returns>Liste des cartes avec la quantité</returns>
    Task<List<QuantiteCarteDetailModel>> ObtenirCartesUtilisateurAsync(int utilisateurId);
}
```

Créez la classe **UtilisateurCarteService.cs** dans le dossier **Services**.

La méthode appelle tout simplement le **Repository**.

```csharp showLineNumbers
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;

namespace SuperCarte.Core.Services;

/// <summary>
/// Classe qui contient les services du modèle UtilisateurCarte
/// </summary>
public class UtilisateurCarteService : IUtilisateurCarteService
{
    private readonly IUtilisateurCarteRepo _utilisateurCarteRepo;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="utilisateurCarteRepo">Repository UtilisateurCarte</param>
    public UtilisateurCarteService(IUtilisateurCarteRepo utilisateurCarteRepo)
	{
        _utilisateurCarteRepo = utilisateurCarteRepo;
    }

    public async Task<List<QuantiteCarteDetailModel>> ObtenirCartesUtilisateurAsync(int utilisateurId)
    {
        return await _utilisateurCarteRepo.ObtenirCartesUtilisateurAsync(utilisateurId);
    }
}
```

## SuperCarte.WPF

### Enregistrement du service - SCServiceExtensions

Il faut enregistrer le **Service** dans la classe **SCServiceExtensions**.

```csharp showLineNumbers
public static void EnregistrerServices(this IServiceCollection services)
{
    services.AddScoped<ICategorieService, CategorieService>();
    services.AddScoped<ICarteService, CarteService>();
    services.AddScoped<IRoleService, RoleService>();
    services.AddScoped<IUtilisateurService, UtilisateurService>();
    services.AddScoped<IUtilisateurCarteService, UtilisateurCarteService>();
}
```

### Création du ViewModel - ListeMesCartesVM

Le **ViewModel** sera accessible pour tous les rôles (**Administrateur** et **Utilisateur**) (ligne 11).

La mécanique est pratiquement identique aux autres listes. Il serait possible de faire une généralisation avec le l'héritage et même avec des types génériques. Ceci demanderait beaucoup de travail pour mettre la structure en place, mais pour un projet d'envergure, ce serait bénéfique. Il n'y aura pas d'exemple de généralisation du **ViewModel** dans ce projet et ce ne doit pas être fait pour le travail pratique.

Par contre, lorsque la commande **ObtenirListe** appelle le service, il doit lui fournir le **UtilisateurId** de l'utilisateur en cours. La clé est disponible dans la classe **UtilisateurAuthentifieModel**. La classe d'assistance **Authentificateur** possède la propriété **UtilisateurAuthentifie** (ligne 62) . Par cette propriété, il est possible d'obtenir l'utilisateur en cours de connexion.

Créez la classe **ListeMesCartesVM.cs** dans le dossier **ViewModels**.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.Input;
using SuperCarte.WPF.Views;

namespace SuperCarte.WPF.ViewModels;

/// <summary>
/// ViewModel de la vue ListeMesCartes
/// </summary>
public class ListeMesCartesVM : BaseVM
{
    private readonly string[] _rolesAutorises = { "Administrateur", "Utilisateur" };

    #region Dépendances
    private readonly IAuthentificateur _authentificateur;
    private readonly INotification _notification;
    private readonly INavigateur _navigateur;
    private readonly IUtilisateurCarteService _utilisateurCarteService;
    #endregion

    #region Attributs des propriétés
    private List<QuantiteCarteDetailModel> _lstCartes;
    private QuantiteCarteDetailModel? _carteSelection;
    private bool _estEnTravail = false;
    #endregion

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="authentificateur">La classe d'assistance d'authentification</param>
    /// <param name="notification">La classe d'assistance pour la notification</param>
    /// <param name="utilisateurCarteService">Service du modèle UtilisateurCarte</param>
    /// <param name="navigateur">La classe d'assistance Navigateur</param>
    public ListeMesCartesVM(IAuthentificateur authentificateur, INotification notification,
        IUtilisateurCarteService utilisateurCarteService, INavigateur navigateur)
    {
        _authentificateur = authentificateur;
        _notification = notification;        
        if (_authentificateur.EstAutorise(_rolesAutorises))
        {
            _navigateur = navigateur;
            _utilisateurCarteService = utilisateurCarteService;

            ObtenirListeCommande = new AsyncRelayCommand(ObtenirListeAsync);
        }
        else
        {
            _notification.MessageErreur("Accès non autorisé.", "Vous n'avez pas accès à cette vue.");
        }
    }

    #region Méthodes des commandes
    /// <summary>
    /// Obtenir la liste de catégories du service
    /// </summary>    
    private async Task ObtenirListeAsync()
    {
        EstEnTravail = true;

        if (_authentificateur.EstAutorise(_rolesAutorises))
        {
            ListeCartes = await _utilisateurCarteService
                .ObtenirCartesUtilisateurAsync(_authentificateur.UtilisateurAuthentifie!.UtilisateurId);
        }
        else
        {
            _notification.MessageErreur("Accès non autorisé.", "Vous n'avez pas accès à cette fonctionnalité.");
        }

        EstEnTravail = false;
    }
    #endregion

    #region Commandes
    public IAsyncRelayCommand ObtenirListeCommande { get; private set; }
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

    public List<QuantiteCarteDetailModel> ListeCartes
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

    public QuantiteCarteDetailModel? CarteSelection
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
```

### Enregistrer le ViewModel - SCViewModelExtensions

Dans la classe **SCViewModelExtensions**, il faut enregistrer le **ViewModel**.

```csharp showLineNumbers
public static void EnregistrerViewModels(this IServiceCollection services)
    {
        services.AddSingleton<MainWindowVM>();
        services.AddTransient<ListeCategoriesVM>();
        services.AddTransient<ListeCartesVM>();
        services.AddTransient<GestionCategorieVM>();
        services.AddTransient<GestionUtilisateurVM>();
        services.AddTransient<ConnexionVM>();
        services.AddTransient<ListeMesCartesVM>();
    }
```

### Création de la vue - UcListeMesCartes.xaml

Créez un **Contrôle utilisateur (WPF)** nommé **UcListeMesCartes.xaml** dans le dossier **Views**. 

La liste est identique à la liste des cartes, mais il y a la colonne **Quantite** en plus (ligne 66).

La localisation n'est pas faite pour les colonnes de la grille. Dans une application complète, il faudrait créer un nouveau fichier ressource pour la vue. Dans ce cas-ci, il y a des répétitions de terme, car il y a beaucoup de colonnes identiques dans la vue **UcListeCartes.xaml**. Avec l'approche 1 fichier ressource par vue, il faudra recréer toutes les valeurs. Il pourrait être intéressant de faire un fichier ressource pour les éléments du modèle du domaine. Dans ce cas, il y aurait un fichier pour **CarteModel**, un autre pour **CarteDetailModel** et finalement un dernier pour **QuantiteCarteDetailModel**. Cette vue devra utiliser les 3 fichiers ressources. Il peut être difficile de maintenir ce genre de structure, car si le modèle change, il faut s'assurer de respecter la même structure. Il aurait d'autres options également pour éviter la répétition. Aucune des méthodes n'est parfaite malheureusement et il arrive souvent que le **DRY** ne soit pas parfaitement respecté pour les fichiers ressources.

```xaml
<UserControl x:Class="SuperCarte.WPF.Views.UcListeMesCartes"
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
             d:DataContext="{d:DesignInstance vm:ListeMesCartesVM}"
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
            Text="Mes cartes"/>

        <!--Rangée 1-->
        <WrapPanel Grid.Row="1" 
                    Orientation="Horizontal" VerticalAlignment="Center">

            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Nouveau_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Nouveau_Tooltip}"
                    Margin="5" Width="32" Height="32" />
            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Tooltip}"
                    Margin="5" Width="32" Height="32" />
            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Supprimer_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Supprimer_Tooltip}"
                    Margin="5" Width="32" Height="32" />
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
                <DataGridTextColumn Header="Id"
                                    MinWidth="50"
                                    Binding="{Binding CarteId}"/>

                <DataGridTextColumn Header="Nom"
                                    MinWidth="300"
                                    Binding="{Binding Nom}"/>

                <DataGridTextColumn Header="Quantité"
                                    MinWidth="50"
                                    Binding="{Binding Quantite}">
                    <DataGridTextColumn.ElementStyle>
                        <Style>
                            <Setter Property="Control.HorizontalAlignment" Value="Right"/>
                        </Style>
                    </DataGridTextColumn.ElementStyle>
                </DataGridTextColumn>

                <DataGridTextColumn Header="Vie" 
                                    MinWidth="50"                                    
                                    Binding="{Binding Vie}">
                    <DataGridTextColumn.ElementStyle>
                        <Style>
                            <Setter Property="Control.HorizontalAlignment" Value="Right"/>
                        </Style>
                    </DataGridTextColumn.ElementStyle>
                </DataGridTextColumn>

                <DataGridTextColumn Header="Armure" 
                                    MinWidth="50"                                    
                                    Binding="{Binding Armure}">
                    <DataGridTextColumn.ElementStyle>
                        <Style>
                            <Setter Property="Control.HorizontalAlignment" Value="Right"/>
                        </Style>
                    </DataGridTextColumn.ElementStyle>
                </DataGridTextColumn>

                <DataGridTextColumn Header="Attaque" 
                                    MinWidth="50"                               
                                    Binding="{Binding Attaque}">
                    <DataGridTextColumn.ElementStyle>
                        <Style>
                            <Setter Property="Control.HorizontalAlignment" Value="Right"/>
                        </Style>
                    </DataGridTextColumn.ElementStyle>
                </DataGridTextColumn>

                <DataGridCheckBoxColumn Header="Rare" 
                                        MinWidth="50"                                    
                                        Binding="{Binding EstRare}"/>

                <DataGridTextColumn Header="Prix de revente" 
                                    MinWidth="50"                                   
                                    Binding="{Binding PrixRevente, StringFormat=\{0:N2\}}">
                    <DataGridTextColumn.ElementStyle>
                        <Style>
                            <Setter Property="Control.HorizontalAlignment" Value="Right"/>
                        </Style>
                    </DataGridTextColumn.ElementStyle>
                </DataGridTextColumn>

                <DataGridTextColumn Header="Catégorie" 
                                    MinWidth="250"                                    
                                    Binding="{Binding CategorieNom}"/>

                <DataGridTextColumn Header="Ensemble" 
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

Il faut faire le chargement automatique. Il faut s'assurer que la commande n'est pas **`null`** avant de l'exécuter.

Dans le fichier **UcListeMesCartes.xaml.cs**, il faut implémenter l'événement **`UserControl_Loaded`**.

```csharp showLineNumbers
private async void UserControl_Loaded(object sender, RoutedEventArgs e)
{
    if (this.DataContext != null)
    {
        if (this.DataContext is ListeMesCartesVM)
        {
            if (((ListeMesCartesVM)this.DataContext).ObtenirListeCommande != null)
            {
                await ((ListeMesCartesVM)this.DataContext).ObtenirListeCommande.ExecuteAsync(null);
            }
        }
    }
}
```

### Ajout de la ressource pour créer le lien entre ViewModel et Vue - MainWindow.xaml

Il faut ajouter dans les ressources le lien entre le **ViewModel** et la **Vue**.

Les lignes 36 à 38 contiennent le lien entre **UcListeMesCartes** et **ListeMesCartesVM**.

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
            <MenuItem Header="_Mes cartes" Command="{Binding NaviguerListeMesCartesVMCommande}"/>
        </Menu>

        <ContentControl Grid.Row="1"  Content="{Binding Navigateur.VMActif}" />                
    </Grid>
</Window>
```



### Modification du ViewModel initial après la connexion - ConnexionVM

Dans la classe **ConnexionVM**, il faut indiquer que le **ViewModel** initial est **ListeMesCartesVM**. Il faut avoir une vue qui est accessible par tous. N'oubliez pas de le faire pour le **TP 3**.

Modifiez la méthode **`AuthentifierAsync()`** pour mettre **ListeMesCartesVM** (ligne 11) dans la classe **ConnexionVM**.

```csharp showLineNumbers
private async Task AuthentifierAsync()
{
    ChampsModifiables = false;
    EstEnTravail = true;
    EffacerErreurs();

    bool authentifier = await _authentificateur.AuthentifierUtilisateurAsync(NomUtilisateur, MotPasse);

    if (authentifier == true)
    {
        _navigateur.Naviguer<ListeMesCartesVM>();
    }
    else
    {
        AjouterErreur(nameof(MotPasse), "La combinaison du nom d'utilisateur et du mot de passe n'est pas valide.");
    }

    EstEnTravail = false;
    ChampsModifiables = true;
}
```

Testez l'application avec les 3 utilisateurs. La liste sera différente pour chacun d'eux.

# Menu et sécurité

Il existe 2 visions pour la gestion d'un menu dans une application native pour la sécurité.

Il serait possible pour la de masquer les menus que l'utilisateur n'a pas accès. Il faudrait lier une propriété à chacun des items du menu pour gérer la visibilité ou non. Cette approche évite d'exposer des menus non nécessaires à l'utilisateur. Cependant, cette approche peut occasionner de l'incompréhension, car l'utilisateur peut chercher un menu qu'il ne voit pas. Il ne lui viendra peut-être pas d'instinct que la raison est qu'il n'y a pas accès.

L'autre option est de laisser le menu visible et accessible et de notifier l'utilisateur qu'il n'a pas accès. Cette approche permet d'avoir un menu uniforme et l'utilisateur sait exactement pourquoi il n'est pas en mesure d'accéder à une section. Pour ce projet et le **TP 3**, les menus seront toujours accessibles et visibles. Ce sera lors de l'initialisation du **ViewModel** que le message sera envoyé à l'utilisateur en cas de non-accès.

Il faut ajouter l'item **Mes cartes** dans le menu.

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
        NaviguerListeMesCartesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeMesCartesVM>);

        //Vue initiale
        _navigateur.Naviguer<ConnexionVM>();
    }

    public IRelayCommand NaviguerListeCartesVMCommande {  get; private set; }

    public IRelayCommand NaviguerListeCategoriesVMCommande { get; private set; }

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
            <MenuItem Header="_Mes cartes" Command="{Binding NaviguerListeMesCartesVMCommande}"/>
        </Menu>

        <ContentControl Grid.Row="1"  Content="{Binding Navigateur.VMActif}" />                
    </Grid>
</Window>
```

# Suppression d'une carte d'un utilisateur - Explication

Il n'est pas nécessaire de valider les dépendances pour cet enregistrement, car cette table n'est pas utilisée par une table enfant.

Au niveau du **ViewModel**, il faut appeler le service directement lorsque l'utilisateur accepte la suppression. La disponibilité de la commande dépend uniquement si une carte est sélectionnée dans la liste. Il faut envoyer **UtilisateurId** à partir de la classe **Authentificateur** et **CarteId** à partir de la carte sélectionnée.

Au niveau du **Service**, il faut récupérer l'enregistrement **UtilisateurCarte** à partir de ses clés. Si l'enregistrement existe, il faut le supprimer avec le **Repository**. S'il n'existe pas, il faut générer une exception. Il n'est pas nécessaire de créer la classe **UtilisateurCarteDependance**, car il n'y en a aucune.

Au niveau du **Repository**, il faut ajouter la méthode **`ObtenirParCle`**. Cette méthode ne provient pas de la classe parent, car c'est une clé primaire composée. Cette méthode sera créée dans le prochain document, car elle sera nécessaire pour la gestion.
