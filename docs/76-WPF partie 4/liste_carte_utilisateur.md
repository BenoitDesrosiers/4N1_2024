---
sidebar_position: 450
draft: false
---

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

Voici les enregistrements **Carte** à ajouter dans la méthode **Seed()** de la classe **SuperCarteContext**.

Il faut ajouter ces cartes dans le tableau **Carte[]** qui est déjà dans le Seed
```csharp showLineNumbers
//Nouvelles cartes
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


```

Voici les enregistrements **UtilisateurCarte** à ajouter dans la méthode **Seed()** de la classe **SuperCarteContext**.

```csharp showLineNumbers
UtilisateurCarte[] utilisateurCartes = 
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

Et ajoutez la ligne pour associer le nouveau tableau **utilisateurCartes** à sa table
```csharp showLineNumbers
        modelBuilder.Entity<UtilisateurCarte>().HasData(utilisateurCartes);
```

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. Il est important que le **Projet par défaut** de **Entity Framework** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.EF**. À ce stade, il y a **plusieurs projets** et celui sélectionné par défaut sera **WPF**. Il est important de le modifier dans la liste.

Pour ce projet, utilisez cette chaine de connexion. Le nom de la base de données est **eDA_4N1_SuperCarte**. Modifiez le **DA** par votre numéro d'admission.

```powershell
$env:MIGRATION_CONNECTION_STRING = "Server=localhost\SQLExpress;Database=eDA_4N1_SuperCarte;Trusted_Connection=True;"
```

Voici la commande avec le **Trusted_Connection=True;** , si vous avez l'erreur **SSL**.

```powershell
$env:MIGRATION_CONNECTION_STRING = "Server=localhost\SQLExpress;Database=eDA_4N1_SuperCarte;Trusted_Connection=True;Trust Server Certificate=True;"
```

Ensuite, il faut créer la migration **Seed_CartesEtUtilisateurCartes** avec **Add-Migration**.

```
Add-Migration Seed_CartesEtUtilisateurCartes -StartupProject SuperCarte.EF
```

Appliquez les modifications à la base de données. Spécifiez la migration **Seed_CartesEtUtilisateurCartes**.

```powershell
Update-Database -StartupProject SuperCarte.EF -Migration Seed_CartesEtUtilisateurCartes
```

## SuperCarte.Core

Il faut ajouter la logique applicative pour le module **UtilisateurCarte**. 

Il faut faire une requête qui retourne la liste complète des cartes pour un utilisateur. 

Mais dans quelle classe mettre cette requête ?
1) Il serait possible d'inclure cette requête dans le **Repository** et le **Service** de **Carte**, car l'information retournée sera pour des cartes. 
2) Il serait aussi possible de la mettre dans le module **Utilisateur**, car c'est en fonction de l'utilisateur. 
3) Et finalement, la 3e option est d'utiliser le module **UtilisateurCarte**, car c'est l'entité centrale. 

Les 3 options sont bonnes. Pour ce projet et le **TP 3**, ce sera la 3e option qui sera utilisée.

### Création du modèle du domaine - QuantiteCarteDetailModel

Le modèle **CarteDetailModel** a été utilisé pour la liste des cartes.

```csharp showLineNumbers title="NE PAS COPIER"
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

Il y a des programmeurs qui utilisent la même classe. La propriété **public string EnsembleNom** n'accepte pas les **null** par sa définition. En laissant le champ vide, ça indique tout de même au programmeur qu'il devrait avoir une valeur. C'est le même principe que le modèle de données et les propriétés de navigation de **Entity Framework**. Ça évite de créer plusieurs classes dans un projet.

Il y a des programmeurs qui préfèrent avoir des modèles de données qui ont seulement les données nécessaires pour diminuer la taille des objets en mémoire, le temps de transfert et d'éviter d'avoir une **méga-classe** avec une bonne proportion des champs inutilisés selon le cas d'utilisation. Il faut donc une 2e classe pour respecter cette vision.

Les 2 visions ont leurs avantages et leurs inconvénients, mais pour ce projet et le **TP 3**, il faudra avoir 2 classes différentes.

Créez la classe **CarteModel** qu'il faudra utiliser sans le détail de la clé étrangère.

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

C'est pratiquement la même classe. Il y a beaucoup de répétition et ce n'est pas très **DRY**.

Ce sont des classes, donc il est possible d'utiliser l'héritage pour éviter la répétition des propriétés. Si une nouvelle propriété de base est ajoutée, il ne sera pas nécessaire de l'ajouter dans les autres classes.

Modifiez la classe **CarteDetailModel** pour utiliser l'héritage et ajouter les champs nécessaires.

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

:::info 
Pour le **TP 3**, vous devez appliquer cette approche pour les modules qui utilisent des clés étrangères.
:::


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

Étant donné que nous avons maintenant une méthode Async, il faut ajouter ce using au début

```csharp showLineNumbers
using Microsoft.EntityFrameworkCore;
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
    //highlight-next-line
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
    //highlight-next-line
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
            //highlight-next-line
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
        //highlight-next-line
        services.AddTransient<ListeMesCartesVM>();
    }
```

### Création de la vue - UcListeMesCartes.xaml

Créez un **Contrôle utilisateur (WPF)** nommé **UcListeMesCartes.xaml** dans le dossier **Views**. 

La liste est identique à la liste des cartes, mais il y a la colonne **Quantite** en plus (ligne 66).

La localisation n'est pas faite pour les colonnes de la grille. Dans une application complète, il faudrait créer un nouveau fichier ressource pour la vue. Dans ce cas-ci, il y a des répétitions de terme, car il y a beaucoup de colonnes identiques dans la vue **UcListeCartes.xaml**. Avec l'approche 1 fichier ressource par vue, il faudra recréer toutes les valeurs. Il pourrait être intéressant de faire un fichier ressource pour les éléments du modèle du domaine. Dans ce cas, il y aurait un fichier pour **CarteModel**, un autre pour **CarteDetailModel** et finalement un dernier pour **QuantiteCarteDetailModel**. Cette vue devra utiliser les 3 fichiers ressources. Il peut être difficile de maintenir ce genre de structure, car si le modèle change, il faut s'assurer de respecter la même structure. Il aurait d'autres options également pour éviter la répétition. Aucune des méthodes n'est parfaite malheureusement et il arrive souvent que le **DRY** ne soit pas parfaitement respecté pour les fichiers ressources.

```xaml showLineNumbers
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

Il faut faire le chargement automatique. Il faut s'assurer que la commande n'est pas **null** avant de l'exécuter.

Dans le fichier **UcListeMesCartes.xaml.cs**, il faut implémenter l'événement **UserControl_Loaded**.

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
        //highlight-start
        <DataTemplate DataType="{x:Type TypeName=vm:ListeMesCartesVM}">
            <v:UcListeMesCartes />
        </DataTemplate>
        //highlight-end
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
        </Menu>

        <ContentControl Grid.Row="1"  Content="{Binding Navigateur.VMActif}" />                
    </Grid>
</Window>
```



### Modification du ViewModel initial après la connexion - ConnexionVM

Dans la classe **ConnexionVM**, il faut indiquer que le **ViewModel** initial est **ListeMesCartesVM**. Il faut avoir une vue qui est accessible par tous. N'oubliez pas de le faire pour le **TP 3**.

Modifiez la méthode **AuthentifierAsync()** pour mettre **ListeMesCartesVM** (ligne 11) dans la classe **ConnexionVM**.

```csharp showLineNumbers
private async Task AuthentifierAsync()
{
    ChampsModifiables = false;
    EstEnTravail = true;
    EffacerErreurs();

    bool authentifier = await _authentificateur.AuthentifierUtilisateurAsync(NomUtilisateur, MotPasse);

    if (authentifier == true)
    {
        //highlight-next-line
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

