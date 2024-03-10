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

Le mot-clé **init** indique que le **set** est seulement disponible lors de sa création. Il ne sera pas possible de modifier les propriétés après sa création. La classe est donc **immuable**. Il est important que l'information de l'utilisateur ne change pas en cours d'exécution.

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

La librairie **BCrypt** a une méthode de vérification du mot de passe à partir du **hash** de la base de données. Selon l'algorithme de **hash**, il serait possible d'envoyer le **hash** dans le **Repository** et de le mettre dans le **where**. Avec **Bcrypt** ce n'est pas recommandé, car il existe plusieurs versions pour le hashage. Donc le hash généré peut varier en fonction des options. La méthode **Verify()** permet d'analyser le **hash** et ensuite appliquer les bonnes règles sur le mot de passe à tester.

Remarquez que le mot de passe n'est pas conservé dans la classe **UtilisateurAuthentifieModel**. Il ne faut conserver aucune trace de mot de passe en mémoire pour la sécurité de l'application.

## SuperCarte.WPF

Dans ce projet, il faut créer la classe d'assistance et la vue de connexion.

### Classe d'assistance - Authentificateur

Créez l'interface **IAuthentificateur** dans le dossier **Aides**.

La classe doit avoir au minimum les 3 membres ci-dessous.

La propriété **UtilisateurAuthentifieModel** permet de connaitre l'information de l'utilisateur qui est connecté à l'application.

La méthode **AuthentifierUtilisateurAsync()** permet d'authentifier l'utilisateur en fonction du nom d'utilisateur et du mot de passe.

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

//highlight-next-line
        bool authentifier = await _authentificateur.AuthentifierUtilisateurAsync(NomUtilisateur, MotPasse);

        if (authentifier == true)
        {
            //highlight-next-line
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
    //highlight-next-line
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

Le composant **[PasswordBox](https://learn.microsoft.com/en-us/dotnet/api/system.windows.controls.passwordbox?view=windowsdesktop-8.0)** ne peut pas être utilisé avec la liaison dans sa conception. Cette limitation est imposée pour des raisons de sécurité. 

Il est également impossible de créer un sous-composant en héritant de la classe **PasswordBox**, car celle-ci est scellée **sealed**. Une classe **sealed** est une classe qui empêche l'héritage. Microsoft veut s'assurer que la mécanique du **PasswordBox** ne soit pas modifiée par la réécriture des méthodes.

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

:::info
Pour le **TP 3**, la vue **UcGestionUtilisateur**, il faudra utiliser cette extension pour le mot de passe. 
:::

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

À la ligne 8, le **namespace** pour les composants est ajouté. Ce **namespace** permet d'utiliser la classe **PasswordBoxExt**.

Les champs **Nom d'utilisateur** et **Mot de passe** ont le **Validation.ErrorTemplate="\{StaticResource erreurTemplate}"** pour afficher les erreurs.

```xaml  showLineNumbers 
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
                         //highlight-start
                         composants:PasswordBoxExt.Attach="True"
                         composants:PasswordBoxExt.Password="{Binding MotPasse}
                         //highlight-end
                         "                                                  
                         Padding="2 4 0 0"
                         Margin="0 10 5 10">
                         //highlight-start
                <PasswordBox.InputBindings>
                    <KeyBinding Command="{Binding AuthentifierCommande}" Key="Return"/>
                </PasswordBox.InputBindings>
                //highlight-end
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

Pour faire la liaison du **PasswordBox**, il faut ajouter les lignes 62 et 63. 

Également, il est intéressant de permettre la touche **Entrée** pour exécuter la commande d'authentification. Les lignes 67 à 69 permettent de lier une commande à une touche.

### Ajout de la ressource pour créer le lien entre ViewModel et Vue - MainWindow.xaml

Il faut ajouter dans les ressources le lien entre le **ViewModel** et la **Vue**.

Les lignes 31 à 33 contiennent le lien entre **UcConnexion** et **ConnexionVM**.

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
        //highlight-start
        <DataTemplate DataType="{x:Type TypeName=vm:ConnexionVM}">
            <v:UcConnexion />
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
    //highlight-next-line
    _navigateur.Naviguer<ConnexionVM>();
}
```

### Test

Démarrez l'application.

Essayez avec ce compte.

- fsthilaire
- 1234

Rien ne se passe lorsque vous appuyez sur le bouton de connexion. Il faudra améliorer la fenêtre dans une prochaine section.

Essayez avec ce compte.

- fsthilaire
- Native3!

La vue **Liste des cartes** est affichée.

Démarrez de nouveau le programme. Sélectionnez le menu **Administration -> Liste des cartes**. Il est possible d'y accéder sans être connecté. Ce problème sera réglé dans une section future.

