---
sidebar_position: 260
draft: true
---

# Liste des cartes

Pour faire la liste des cartes, il faut reproduire la même technique que la liste des catégories.

Par contre, la liste des cartes à 2 clés étrangères. Dans une **Vue**, l'utilisateur veut rarement voir les clés étrangères, mais un élément significatif à celle-ci.

Dans le cas des cartes, il faut afficher le nom de la catégorie et le nom de l'ensemble. Il faut créer un modèle qui contient ces deux nouveaux champs.

Dans cette section, ce sera uniquement la mécanique pour **Obtenir la liste**. Il faudrait tout de même ajouter la mécanique de suppression.

### SuperCarte.Core

#### Création du modèle - CarteDetailModel

Les modèles qui seront utilisés pour les listes de données auront le suffixe **Detail**, car elles contiennent le détail des clés étrangères.

Créez la classe **CarteDetailModel.cs** dans le dossier **Models**.

```csharp
namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient l'information d'une carte avec le détail de ses clés étrangères
/// </summary>
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

#### Ajout de la requête dans Repository - CarteRepo

Pour être en mesure de récupérer l'information des clés étrangères, il faut adapter la requête.

Il y a 2 options. La première serait d'utiliser le **EagerLoading**. Le **Service** aurait la responsabilité de prendre les champs nécessaires pour construire l'objet **CarteModelDetail**. Il serait possible de généraliser le **EagerLoading** avec la réflexion.

La 2e option est de créer l'objet directement dans la requête du **Repository**. Pour ce projet, ce sera cette option qui sera utilisée.

Dans l'interface **ICarteRepo.cs**.

```csharp
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Interface qui contient les méthodes de communication avec la base de données pour la table Carte
/// </summary>
public interface ICarteRepo : IBasePKUniqueRepo<Carte, int>
{
    /// <summary>
    /// Obtenir la liste des cartes avec le modèle CarteDetailModel en asynchrone.
    /// </summary>
    /// <returns>Liste des cartes</returns>
    Task<List<CarteDetailModel>> ObtenirListeCarteDetailAsync();
}
```

Dans la classe **CarteRepo.cs**.

```csharp
using Microsoft.EntityFrameworkCore;
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;
using SuperCarte.EF.Data.Context;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Classe qui contient les méthodes de communication avec la base de données pour la table Carte
/// </summary>
public class CarteRepo : BasePKUniqueRepo<Carte, int>, ICarteRepo
{
    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="bd">Contexte de la base de données</param>
    public CarteRepo(SuperCarteContext bd) : base(bd)
    {
        //Vide, il sert uniquement a recevoir le contexte et à l'envoyer à la classe parent.
    }

    public async Task<List<CarteDetailModel>> ObtenirListeCarteDetailAsync()
    {
        return await(from lqCarte in _bd.CarteTb
                     select
                         new CarteDetailModel()
                         {
                             CarteId = lqCarte.CarteId,
                             Nom = lqCarte.Nom,
                             Vie = lqCarte.Vie,
                             Armure = lqCarte.Armure,
                             Attaque = lqCarte.Attaque,
                             EstRare = lqCarte.EstRare,
                             PrixRevente = lqCarte.PrixRevente,
                             CategorieId = lqCarte.CategorieId,
                             CategorieNom = lqCarte.Categorie.Nom,
                             EnsembleId = lqCarte.EnsembleId,
                             EnsembleNom = lqCarte.Ensemble.Nom
                         }).ToListAsync();
    }
}
```

Les jointures sont effectuées par la propriété de navigation dans la création de l'objet.

#### Création du service - CarteService

Créez l'interface **ICarteService.cs** dans le dossier **Services**.

```csharp
using SuperCarte.Core.Models;

namespace SuperCarte.Core.Services;

/// <summary>
/// Interface qui contient les services du modèle Carte
/// </summary>
public interface ICarteService
{
    /// <summary>
    /// Obtenir la liste des cartes avec le modèle CarteDetailModel en asynchrone.
    /// </summary>
    /// <returns>Liste des cartes</returns>
    Task<List<CarteDetailModel>> ObtenirListeCarteDetailAsync();
}
```

Créez la classe **CarteService.cs** dans le dossier **Services**.

```csharp
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;

namespace SuperCarte.Core.Services;

/// <summary>
/// Classe qui contient les services du modèle Carte
/// </summary>
public class CarteService : ICarteService
{
    private readonly ICarteRepo _carteRepo;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="carteRepo">Repository Carte</param>
    public CarteService(ICarteRepo carteRepo)
    {
        _carteRepo = carteRepo;
    }

    public async Task<List<CarteDetailModel>> ObtenirListeCarteDetailAsync()
    {
        return await _carteRepo.ObtenirListeCarteDetailAsync();
    }
}
```

Pour cette méthode, le **Service** appelle directement le **Repository**.

### Projet SuperCarte.WPF

#### Enregistrement du service - SCServiceExtensions

Il faut enregistrer le **Service** dans la classe **SCServiceExtensions**.

```csharp
public static void EnregistrerServices(this IServiceCollection services)
{
    services.AddScoped<ICategorieService, CategorieService>();
    services.AddScoped<ICarteService, CarteService>();
}
```

Le service est également enregistré en **Scoped** pour permettre d'utiliser la même instance dans le programme dans le même **scope**.

#### Création du ViewModel - ListeCartesVM

Créez la classe **ListeCartesVM.cs**.

```csharp
using CommunityToolkit.Mvvm.Input;

namespace SuperCarte.WPF.ViewModels
{
    /// <summary>
    /// ViewModel de la vue ListeCartes
    /// </summary>
    public class ListeCartesVM : BaseVM
    {
        #region Dépendances
        private readonly ICarteService _carteService;
        #endregion

        #region Attributs des propriétés
        private List<CarteDetailModel> _lstCartes;
        private CarteDetailModel? _carteSelection;
        private bool _estEnTravail = false;
        #endregion

        public ListeCartesVM(ICarteService carteService)
        {
            _carteService = carteService;
            
            ObtenirListeCommande = new AsyncRelayCommand(ObtenirListeAsync);
        }

        #region Méthodes des commandes
        /// <summary>
        /// Obtenir la liste de catégories du service
        /// </summary>    
        private async Task ObtenirListeAsync()
        {
            EstEnTravail = true;

            ListeCartes = await _carteService.ObtenirListeCarteDetailAsync();

            EstEnTravail = false;
        }
        #endregion

        #region Commandes
        public IAsyncRelayCommand ObtenirListeCommande { get; set; }
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

        public List<CarteDetailModel> ListeCartes
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

        public CarteDetailModel? CarteSelection
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
}
```

Il y a beaucoup de similitudes entre **ListeCategoriesVM** et **ListeCartesVM**. Il serait possible de généraliser une bonne partie de la logique avec une classe parent générique du type **BaseListeVM**. Par contre, ce concept ne sera pas présenté.

Également, dans ce **ViewModel**, il y a des **#region** utilisées pour classer les différentes sections. Les **ViewModel** peuvent devenir assez gros selon la complexité de la vue. Le classement des différentes sections peut aider.

#### Enregistrer le ViewModel - SCViewModelExtensions

Dans la classe **SCViewModelExtensions**, il faut enregistrer le **ViewModel**.

```csharp
public static void EnregistrerViewModels(this IServiceCollection services)
{
    services.AddTransient<MainWindowVM>();
    services.AddTransient<ListeCategoriesVM>();
    services.AddTransient<ListeCartesVM>();
}
```

#### Création du fichier ressource - ResUcListeCartes

Généralement, la conception de la **Vue** et du fichier ressource se fait en parallèle. À chaque élément qu'il faut faire un libellé, il faut créer un élément dans le fichier ressource.

Créez le fichier **ResListeCartes.resx**. 

| Nom              | Valeur           |
| ---------------- | ---------------- |
| Titre            | Liste des cartes |
| Col_CarteId      | Id               |
| Col_Nom          | Nom              |
| Col_Vie          | Vie              |
| Col_Armure       | Armure           |
| Col_Attaque      | Attaque          |
| Col_EstRare      | Rare             |
| Col_PrixRevente  | Prix de revente  |
| Col_CategorieNom | Catégorie        |
| Col_EnsembleNom  | Ensemble         |

Créez le fichier **ResListeCartes.en.resx**.

| Nom              | Valeur       |
| ---------------- | ------------ |
| Titre            | Card List    |
| Col_CarteId      | Id           |
| Col_Nom          | Name         |
| Col_Vie          | Health       |
| Col_Armure       | Armor        |
| Col_Attaque      | Attack       |
| Col_EstRare      | Rare         |
| Col_PrixRevente  | Resale price |
| Col_CategorieNom | Category     |
| Col_EnsembleNom  | Set          |

#### Création de la vue - UcListeCartes.xaml

Créez un **Contrôle utilisateur (WPF)** nommé **UcListeCartes.xaml** dans le dossier **Views**. Le modèle se retrouve dans la section **WPF** à gauche.

```xaml
<UserControl x:Class="SuperCarte.WPF.Views.UcListeCartes"
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
             d:DataContext="{d:DesignInstance vm:ListeCartesVM}"
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
                    Margin="5" Width="32" Height="32" />
            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Tooltip}"
                    Margin="5" Width="32" Height="32" />
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
                  ItemsSource="{Binding ListeCartes}"
                  SelectedItem="{Binding CarteSelection}">
            <DataGrid.Columns>
                <DataGridTextColumn Header="{lex:Loc Col_CarteId}"
                                    MinWidth="50"
                                    Binding="{Binding CarteId}"/>

                <DataGridTextColumn Header="{lex:Loc Col_Nom}"
                                    MinWidth="300"
                                    Binding="{Binding Nom}"/>

                <DataGridTextColumn Header="{lex:Loc Col_Vie}" 
                                    MinWidth="50"                                    
                                    Binding="{Binding Vie}"/>
                
                <DataGridTextColumn Header="{lex:Loc Col_Armure}" 
                                    MinWidth="50"                                    
                                    Binding="{Binding Armure}"/>

                <DataGridTextColumn Header="{lex:Loc Col_Attaque}" 
                                    MinWidth="50"                                    
                                    Binding="{Binding Attaque}"/>

                <DataGridCheckBoxColumn Header="{lex:Loc Col_EstRare}" 
                                        MinWidth="50"                                    
                                        Binding="{Binding EstRare}"/>

                <DataGridTextColumn Header="{lex:Loc Col_PrixRevente}" 
                                    MinWidth="50"                                    
                                    Binding="{Binding PrixRevente, StringFormat=\{0:N2\}}"/>

                <DataGridTextColumn Header="{lex:Loc Col_CategorieNom}" 
                                    MinWidth="250"                                    
                                    Binding="{Binding CategorieNom}"/>

                <DataGridTextColumn Header="{lex:Loc Col_EnsembleNom}" 
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

Le **DataGrid** n'a pas besoin d'afficher le **Id** des clés étrangères, donc il n'y a pas de colonne pour ceci.

Également, la convention pour un booléen est d'utiliser un **DataGridCheckBoxColumn**.

Pour la colonne **PrixRevente**, il y a un format d'appliquer dans la propriété **Binding**. Il faut s'assurer que le prix a toujours 2 décimales.

```csharp
Binding="{Binding PrixRevente, StringFormat=\{0:N2\}}"
```

Dans le fichier **UcListeCartes.xaml.cs**, il faut ajouter l'événement pour le chargement automatique.

```csharp
private async void UserControl_Loaded(object sender, RoutedEventArgs e)
 {
     if (this.DataContext != null)
     {
         if (this.DataContext is ListeCartesVM)
         {
             await ((ListeCartesVM)this.DataContext).ObtenirListeCommande.ExecuteAsync(null);
         }
     }
 }
```

#### Ajout de la ressource pour créer le lien entre ViewModel et Vue - MainWindow.xaml

Il faut ajouter dans les ressources le lien entre le **ViewModel** et la **Vue**.

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
    <Grid>
        <ContentControl  Content="{Binding VMActif}" />
    </Grid>
</Window>
```

La ligne 19 à 21 indique que lorsque le **DataContext** est de type **ListeCategoriesVM** (ligne 19), il faut utiliser le contrôle utilisateur **UcListeCategories** (ligne 20).

La ligne 22  à 24 indique que lorsque le **DataContext** est de type **ListeCartesVM** (ligne 19), il faut utiliser le contrôle utilisateur **UcListeCartes** (ligne 23).

À la ligne 27, lorsque le **Content** du **ContentControl** sera un **ViewModel** de la liste des ressources, il chargera le contrôle utilisateur correspondant.

#### Test - MainWindowVM

Dans la classe **MainWindowVM.cs**, il faut assigner **ListeCategoriesVM** à la propriété **VMActif**.

```csharp
using Microsoft.Extensions.DependencyInjection;

namespace SuperCarte.WPF.ViewModels;

public class MainWindowVM : BaseVM
{    
    public MainWindowVM(IServiceProvider serviceProvider)
	{   
        //Sélectionner le ViewModel de démarrage
        VMActif = serviceProvider.GetRequiredService<ListeCartesVM>();
    }

    public BaseVM VMActif { get; set; }    
}
```

Démarrez l'application.

#### Alignement à droite des nombres

Dans une grille, les nombres sont généralement alignés à droite pour faciliter la lecture. 

Pour être en mesure de le faire, il faut ajouter un style dans la définition de la colonne.

```xaml
<DataGridTextColumn Header="{lex:Loc Col_Vie}" 
                    MinWidth="50"                                    
                    Binding="{Binding Vie}">
    <DataGridTextColumn.ElementStyle>
        <Style>
            <Setter Property="Control.HorizontalAlignment" Value="Right"/>
        </Style>
    </DataGridTextColumn.ElementStyle>
</DataGridTextColumn>
```

La balise **\<DataGridTextColumn.ElementStyle\>** permet de spécifier le style pour le contenu de la colonne.

Il est important de mettre **Control.** dans la propriété pour indiquer que la valeur s'applique au contenu de la cellule au complet. Il est possible de faire des cellules avancées avec plusieurs sous-contrôles dans son contenu. Il serait possible d'appliquer un style à seulement un des éléments de la cellule.

Voici le fichier au complet.

```xaml
<UserControl x:Class="SuperCarte.WPF.Views.UcListeCartes"
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
             d:DataContext="{d:DesignInstance vm:ListeCartesVM}"
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
                    Margin="5" Width="32" Height="32" />
            <Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Editer_Tooltip}"
                    Margin="5" Width="32" Height="32" />
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
                  ItemsSource="{Binding ListeCartes}"
                  SelectedItem="{Binding CarteSelection}">
            <DataGrid.Columns>
                <DataGridTextColumn Header="{lex:Loc Col_CarteId}"
                                    MinWidth="50"
                                    Binding="{Binding CarteId}"/>

                <DataGridTextColumn Header="{lex:Loc Col_Nom}"
                                    MinWidth="300"
                                    Binding="{Binding Nom}"/>

                <DataGridTextColumn Header="{lex:Loc Col_Vie}" 
                                    MinWidth="50"                                    
                                    Binding="{Binding Vie}">
                    <DataGridTextColumn.ElementStyle>
                        <Style>
                            <Setter Property="Control.HorizontalAlignment" Value="Right"/>
                        </Style>
                    </DataGridTextColumn.ElementStyle>
                </DataGridTextColumn>

                <DataGridTextColumn Header="{lex:Loc Col_Armure}" 
                                    MinWidth="50"                                    
                                    Binding="{Binding Armure}">
                    <DataGridTextColumn.ElementStyle>
                        <Style>
                            <Setter Property="Control.HorizontalAlignment" Value="Right"/>
                        </Style>
                    </DataGridTextColumn.ElementStyle>
                </DataGridTextColumn>

                <DataGridTextColumn Header="{lex:Loc Col_Attaque}" 
                                    MinWidth="50"                               
                                    Binding="{Binding Attaque}">
                    <DataGridTextColumn.ElementStyle>
                        <Style>
                            <Setter Property="Control.HorizontalAlignment" Value="Right"/>
                        </Style>
                    </DataGridTextColumn.ElementStyle>
                </DataGridTextColumn>

                <DataGridCheckBoxColumn Header="{lex:Loc Col_EstRare}" 
                                        MinWidth="50"                                    
                                        Binding="{Binding EstRare}"/>

                <DataGridTextColumn Header="{lex:Loc Col_PrixRevente}" 
                                    MinWidth="50"                                   
                                    Binding="{Binding PrixRevente, StringFormat=\{0:N2\}}">
                    <DataGridTextColumn.ElementStyle>
                        <Style>                            
                            <Setter Property="Control.HorizontalAlignment" Value="Right"/>
                        </Style>
                    </DataGridTextColumn.ElementStyle>
                </DataGridTextColumn>

                <DataGridTextColumn Header="{lex:Loc Col_CategorieNom}" 
                                    MinWidth="250"                                    
                                    Binding="{Binding CategorieNom}"/>

                <DataGridTextColumn Header="{lex:Loc Col_EnsembleNom}" 
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

