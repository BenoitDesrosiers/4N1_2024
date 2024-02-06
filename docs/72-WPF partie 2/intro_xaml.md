---
sidebar_position: 210
draft: true
---

# Intro à XAML et MVVM

Dans ce document,  l'application aura ses premières interfaces visuelles. Les interfaces seront des listes d'éléments.

Il sera possible de faire quelques opérations avec la base de données, dont la récupération des données et la suppression.

La coordination de l'interface graphique se fera avec le patron de conception **Model-View-ViewModel** ou **MVVM**. 

Finalement, l'interface graphique utilisera des fichiers ressources pour la traduction du logiciel. 

## XAML

**XAML** est un langage par balise pour créer des interfaces graphiques. Ce langage n'est pas utilisé uniquement par **WPF**. Par contre, même si d'autres plateformes comme **MAUI** utilise **XAML**, ce ne sont pas nécessairement les mêmes composants qui sont disponibles dans la librairie. Il faut s'assurer que le composant est disponible avec la librairie visuelle utilisée. Heuseureusement, les principaux composants fonctionnent de la même façon.

Plusieurs concepts sont inspirés du **HTML**, mais ce langage est tout de même très différent du **HTML**.

**Visual Studio** permet de créer l'interface graphique sans toucher au code **XAML**. Il est possible de faire du **drag and drop** des composants dans l'interface visuelle et de modifier les propriétés à partir de la fenêtre de propriétés.

Le site **WPF Tutorial** (https://wpf-tutorial.com/) explique le fonctionnement de plusieurs composants. Le site a une version en français qui est traduite par la communauté (https://wpf-tutorial.com/Localization/LanguageStatus/fr/) . Il y a beaucoup de publicité, mais c'est une très bonne source d'information.

## Patron MVVM

Le patron **Model-View-ViewModel** ou **MVVM** fait partie de la grande famille des patrons de conception pour la séparation de l'interface graphique et la logique applicative. **MVC** et **MVP** sont d'autres patrons de la même famille.

**MVVM** a été inventé par Microsoft  vers 2005 pour faciliter le développement des applications **WPF** et **Silverlight**. Aujourd'hui, le patron est utilisé avec d'autres technologies. Par exemple, il est possible de l'utiliser avec **Blazor**.

Le **MVVM** est séparé en 3 concepts.

- **Model** ou modèle

  Le modèle est la classe qui contient les données du logiciel qui doivent être affichées à l'utilisateur. Ce sont généralement les classes du modèle du domaine qui sont utilisées.

- **View** ou vue

  La vue consiste à l'interface utilisateur. Dans le concept **MVVM** pur, il ne devrait avoir aucun code dans la vue. Mais d'un point de vue pratique, il arrive parfois de mettre un peu de logique dans la vue pour faciliter l'interaction de l'interface utilisateur.

- **ViewModel** ou ModèleVue

  Le terme **ViewModel** sera utilisé dans ce cours. Il ne se traduit pas très bien en français.

  Le **ViewModel** contient la logique d'interaction de la vue. Il est dans la famille **contrôleur**. Son rôle est de coordonner l'interface utilisateur et de fournir les états et les valeurs aux composants visuels. Chaque **Vue** utilise un **ViewModel**

  Le **ViewModel** publie des propriétés que les composants visuels utilisent par liaison. 

  Lorsqu'une valeur d'un composant est modifiée dans l'interface visuelle, la liaison met automatiquement à jour le modèle. 

  Lorsqu'une valeur du modèle est modifiée, la liaison met automatiquement à jour l'interface visuelle par notification.

  Le principe de liaison est également utilisé par **Angular** et **Blazor**.

  Le **ViewModel** reçoit une commande, un événement ou un appel de méthodes pour effectuer des actions qui provient de l'interface utilisateur pour initier une action. Le **ViewModel** utilise les **Services** de l'application.

  Il y a beaucoup d'exemple sur internet que le **ViewModel** utilise directement le **Repository** et qu'il a y un peu plus de logique dans le **ViewModel**. Cette approche n'est pas mauvaise, car le **ViewModel** est facilement testable. Par contre, il est possible de modifier un même type d'enregistrement dans plusieurs **vues** différentes. Il faut s'assurer que la logique de modification est la même dans tous les **ViewModels**. En utilisant un **Service**, la logique est à un seul endroit.

En séparant la **Vue** et la logique de coordination, il est très facile de modifier l'interface visuelle sans trop de conséquences. Le **ViewModel** ne connait pas la **Vue**, donc la logique de coordination reste la même, peu importe si la **Vue** utilise un **ListView**, un **DataGrid** ou un composant maison.

De plus, le plus grand avantage est qu'il est possible des faires des tests automatisés avec le **ViewModel**. Par exemple, si aucun item n’est sélectionné dans la liste, il n'est pas possible de faire la suppression. Il est possible de tester ce cas, car la coordination se fait dans une classe indépendante.

Pour avoir une définition théorique, voici 2 liens Microsoft. Ce n'est pas pour **WPF**, mais les concepts restent les mêmes.

Pour UWP : https://learn.microsoft.com/fr-fr/windows/uwp/data-binding/data-binding-and-mvvm

Pour MAUI : https://learn.microsoft.com/fr-ca/dotnet/architecture/maui/mvvm

Wiki : https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel

### Modèle du domaine ou modèle de données

Il n'est pas recommandé d'utiliser un objet du modèle de données (EF) pour l'interaction utilisateur. Le **ViewModel** ne doit pas les utiliser. Il arrive souvent que le modèle de données soit pratiquement identique au modèle du domaine dans ses propriétés, il est donc tentant d'utiliser directement l'objet du modèle de données.

L'objet du modèle de données est surveillé par le contexte qui l'a créé tant que le contexte est actif. Si l'objet est modifié, l'objet sera pris en considération si son instance dans le contexte se met à jour par la méthode **SaveChanges()** et cela même s'il n'aurait pas du être modifié dans la bd.

Pour faciliter la conversion entre les différents types de **modèles**, il est possible d'utiliser une librairie **Mapper**. Pour ce projet, ce sera des **extensions** qui s'occuperont de faire la transition entre les 2 types de modèles.

## Préparation du projet WPF

:::danger AVERTISSEMENT
Il est possible que vous ayez des erreurs indiquant qu'une classe n'est pas dans disponible dans l'espace de nom. Cette erreur se produit parfois quand on efface ou renomme une classe ou répertoire.

Pour régler cette erreur, il faut ré-écrire le namespace soit dans la classe qui est introuvable alors qu'elle est à la bonne place, soit dans la classe donnant l'erreur. Vous verrez que parfois vous aurez 2 namespaces avec le même nom. Utiliser le deuxième aide parfois. 
:::

Il faut préparer le projet **WPF** pour être en mesure d'intégrer un **Contrôle utilisateur (WPF)** dans le **MainWindow**.

Le **MainWindow** évoluera en cours de projet. Pour l'instant, il sera le plus simple possible pour être en mesure de démarrer le projet.

Créez les dossiers **ViewModels** et **Views** à la racine du projet **SuperCarte.WPF**.

### Librairie MVVM Toolkit

Il existe une librairie qui permet de gérer plus facilement la gestion du **MVVM**.

Cette librairie offre énormément de fonctionnalités pour accélérer le développement.

La librairie sera utilisée pour la classe **ObservableObject** et pour les classes **RelayCommand**. Il aurait été possible de créer manuellement ces classes, mais elles ont déjà été créées. Il n'est pas utile de recréer ces classes identiques.

<!-- Je comprends pas ce que ca veut dire, alors aussi bien pas en parler
La librairie intègre également un générateur de code pour rendre certaines actions **magiques**. En ajoutant des **Annotations** spécifiques sur des propriétés, une classe parallèle est créée pour générer le code. Pour ce projet, ce générateur de code ne sera pas utilisé, car il faut bien comprendre la mécanique du **MVVM** avant de l'utiliser.
-->

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. 

:::warning Attention
Il est important que le **Projet par défaut** **WPF** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.WPF**. À ce stade, il y a **plusieurs projets** et il est important de le modifier dans la liste.
:::
```
Install-Package CommunityToolkit.Mvvm
```

Pour plus d'information : https://learn.microsoft.com/fr-ca/dotnet/communitytoolkit/mvvm/

### Création d'une classe de base - BaseVM

Il faut créer la classe parent des **ViewModels**. Cette classe sera utilisée pour la navigation et pour les fonctionnalités communes aux **ViewModels**.

Créez le dossier **ViewModels\Bases** à la racine du projet **SuperCarte.WPF**.

Créez la classe **BaseVM.cs**  dans le dossier **ViewModels\Bases**.

```csharp
using CommunityToolkit.Mvvm.ComponentModel;

namespace SuperCarte.WPF.ViewModels.Bases;

/// <summary>
/// Classe abstraite pour du View Model
/// </summary>
public abstract class BaseVM : ObservableObject
{
    
}
```

La classe hérite de la classe **ObservableObject** qui provient du **MVVM Toolkit**. Elle est actuellement vide, mais avoir le type **BaseVM** sera utile pour la navigation et éventuellement, il y aura la validation.

Voici une partie du code de la classe **ObservableObject**.

La classe implémente l'interface **INotifyPropertyChanged**. 

Cette interface contient l'événement **PropertyChanged**. Lorsqu'un composant est lié à une propriété du **ViewModel**, il s'enregistre à cet événement s'il est disponible. C'est par cet événement qu'il est possible d'avertir la vue qu'il y a eu un changement de valeur dans la propriété et que la vue doit mettre ce composant à jour.

Il y a également la méthode **SetProperty()** qui permet d'assigner la nouvelle valeur à la propriété. Elle permet également de vérifier s'il y a réellement eu un changement de valeur pour éviter de soulever l'événement **PropertyChanged** inutilement.

```csharp title="NE PAS COPIER"
/// <summary>
/// A base class for objects of which the properties must be observable.
/// </summary>
public abstract class ObservableObject : INotifyPropertyChanged, INotifyPropertyChanging
{
   
    public event PropertyChangedEventHandler? PropertyChanged;
    
    protected void OnPropertyChanged([CallerMemberName] string? propertyName = null)
    {
        OnPropertyChanged(new PropertyChangedEventArgs(propertyName));
    }

    
    protected bool SetProperty<T>([NotNullIfNotNull(nameof(newValue))] ref T field, 
					T newValue, 
					[CallerMemberName] string? propertyName = null)
    {        
        if (EqualityComparer<T>.Default.Equals(field, newValue))
        {
            return false;
        }

        OnPropertyChanging(propertyName);

        field = newValue;

        OnPropertyChanged(propertyName);

        return true;
    }
}
```
### Création du ViewModel - MainWindowVM

La fenêtre principale de l'application a besoin de son propre **ViewModel**. Les classes du **ViewModel** auront comme suffixe **VM** et elles seront dans le dossier **ViewModels**.

Créez la classe **MainWindowVM.cs**  dans **ViewModel**.

```csharp showLineNumbers
using Microsoft.Extensions.DependencyInjection;

namespace SuperCarte.WPF.ViewModels;

public class MainWindowVM : BaseVM
{    
    public MainWindowVM(IServiceProvider serviceProvider)
	{   
        //Sélectionner le ViewModel de démarrage
        //VMActif = serviceProvider.GetRequiredService<>();
    }

    public BaseVM VMActif { get; set; }
}
```

La classe a une propriété **VMACtif** pour indiquer le **ViewModel** qui doit être affiché. **WPF** est en mesure de savoir la **Vue** à utiliser en fonction du **ViewModel** actif.

À la ligne 9, le **ViewModel** initial sera assigné comme celui qui est **Actif**. Cette approche sera un peu modifiée lorsque le **Navigateur** sera ajouté au projet.

### Enregistrer le ViewModel - SCViewModelExtensions

Dans la classe **Extensions/ServiceCollections/SCViewModelExtensions**, il faut enregistrer le **ViewModel**.

```csharp
public static void EnregistrerViewModels(this IServiceCollection services)
{
	//highlight-next-line
    services.AddSingleton<MainWindowVM>();
}
```

Remarquez ici qu'il n'y a pas d'interface lors de l'enregistrement du **ViewModel MainWindowVM**. Il n'est pas nécessaire pour cette classe d'utiliser une interface, car l'assignation entre **ViewModel** et la **Vue** associée ne peut pas se faire par l'interface (nous verrons comment le faire plus tard). De plus, il n'y a pas de bénéfice au niveau des tests d'utiliser une interface pour le **ViewModel**.

:::warning Important
Notez que MainWindowVM a été enregistré en **Singleton**. Il faut avoir seulement une fenêtre active dans le programme. Les autres **ViewModels** seront enregistrés en **Transient**.
:::


### Modification du design de la vue - MainWindows.xaml

Modifiez le code de la fenêtre **MainWindows.xaml**.

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
    </Window.Resources>
    <Grid>
        <ContentControl Content="{Binding VMActif}" />
    </Grid>
</Window>
```
<!--- explication ? la ligne DataContext est en erreur, MainWindowVM n'est pas connue dans le namespace viewModels -->

Aux lignes 7 et 8, ce sont les déclarations des **namespaces** qui seront utiles dans cette vue.

<!--- explications ? -->
À la ligne 10, le préfixe **v:** sera utilisé pour les **Vues** et le préfixe **vm:** pour les **ViewModels**.

Le **DataContext** consiste au **ViewModel**. La ligne 10 sert à indiquer quel est le type du **DataContext**. Ce n'est pas une assignation réelle, mais un indicateur pour permettre les suggestions du code. Il sera donc possible de voir les propriétés du **ViewModel** lors du **Binding**. Cette étape n'est pas obligatoire, mais elle est recommandée pour faciliter la programmation.

À la ligne 12, la propriété **WindowState="Maximized"** permet de maximiser la fenêtre au maximum.

À la ligne 13, ce sont les **ressources** disponibles à la fenêtre. C'est à cet endroit que le lien entre **ViewModel** et **Contrôle utilisateur (WPF)** sera fait.

À la ligne 17, il y a le contrôle qui recevra le **Contrôle utilisateur (WPF)** en fonction du **ViewModel** actif.

### Modification du code de la vue - MainWindow.xaml.cs

Modifiez le code du fichier **MainWindow.xaml.cs**.

```csharp showLineNumbers
using System.Windows;

namespace SuperCarte.WPF;
/// <summary>
/// Interaction logic for MainWindow.xaml
/// </summary>
public partial class MainWindow : Window
{
    public MainWindow(MainWindowVM mainWindowVM)
    {
        InitializeComponent();
        //Si non spécifié, le format des données utilisera le format en-US
        FrameworkElement.LanguageProperty.OverrideMetadata(typeof(FrameworkElement), 
            new FrameworkPropertyMetadata(System.Windows.Markup.XmlLanguage.GetLanguage(CultureInfo.CurrentUICulture.Name)));
        DataContext = mainWindowVM;
    }
}
```

Le constructeur reçoit le **MainWindowVM** en dépendance. 

Le **ViewModel** est assigné au **DataContext** de la fenêtre à la ligne 15. 

:::note
bien que le DataContext ait été indiqué dans le fichier xaml, ce n'était que pour aider intellisense. L'assignation à la ligne 15 est la "vrai". 
:::

Il faut également assigner la langue de la vue. Généralement, lors de l'affichage d'une donnée, elle utilise le format correspondant dans les paramètres régionaux du système d'exploitation. Cette valeur provient de **CultureInfo.CurrentUICulture**. Par contre, avec WPF, il faut le spécifier dans la structure de la vue.

La langue s'applique à la balise en cours et à ses enfants. 

## Théorie - HelloWorld

Dans cette section, nous allons diverger un peu du projet SuperCarte afin d'introduire certains concepts. Cette section permet de tester le **MVVM** et certains éléments du **XAML** sans se soucier du service.

:::danger ATTENTION
Ca ne doit pas être reproduit dans votre **TP 3**. Nous allons utiliser ces concepts un peu différemment dans le projet SuperCarte. 
:::



### Création du ViewModel - HelloWorldVM

Créez une classe **HelloWorldVM.cs** dans le dossier **ViewModels**.

```csharp
namespace SuperCarte.WPF.ViewModels
{
    public class HelloWorldVM : BaseVM
    {
        public HelloWorldVM()
        {
            DateHeure = DateTime.Now;
            ValeurDecimal = 12_345.30m;
            ValeurBool = true;
        }

        public DateTime DateHeure { get; set; }

        public decimal ValeurDecimal { get; set; }

        public bool ValeurBool { get; set; }
    }
}
```

:::note
En **MVVM**, il n'est pas possible d'utiliser une propriété auto-implémentée si elle est liée à la vue, car il faut notifier le changement de valeur. Il faut donc de la logique dans le **set**. Lorsqu'il y a de la logique, il faut utiliser un attribut pour contenir la valeur de la propriété.

:::

Le constructeur permet d'assigner les valeurs initiales de la **Vue**. Les valeurs initiales peuvent provenir du service. Par contre, il n'est pas possible de faire de l'asynchrone dans le constructeur.

### Création de la vue - UcHelloWorld.xaml

Créez une nouvelle classe nommée **UcHelloWorld.xaml** dans le dossier **Views**. Sélectionnez le modèle **WPF** à gauche de l'écran de création de la classe, et choisissez **Contrôle utilisateur (WPF)**. 

Toutes les **Vues** seront du type **Contrôle utilisateur (WPF)**.
<!--- question: tu avais mis UcHelloWorld au lieu de UCListeCategories -->
```xaml showLineNumbers
<UserControl x:Class="SuperCarte.WPF.Views.UcHelloWorld"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
             xmlns:v="clr-namespace:SuperCarte.WPF.Views"        
             mc:Ignorable="d"
             d:DataContext="{d:DesignInstance Type=vm:HelloWorldVM}" 
             d:DesignHeight="450" d:DesignWidth="800">
    <Grid>
        <StackPanel VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World" />
            <TextBlock Text="{Binding DateHeure , StringFormat=\{0:d MMMM yyyy HH:mm:ss\}}"/>
            <TextBlock Text="{Binding ValeurDecimal}" />
            <CheckBox IsChecked="{Binding ValeurBool}" />
        </StackPanel>        
    </Grid>
</UserControl>
```

La première étape consiste à indiquer le **ViewModel** qui sera utilisé. Ce n'est pas obligatoire, mais en ajoutant les lignes 7 et 8 ci-dessous, il sera possible d'avoir des suggestions lors du **Binding**.

À la ligne 15, il y a le **Binding** de la propriété **Text** avec la propriété **DateHeure** du **ViewModel**. 

### Enregistrer le ViewModel - SCViewModelExtensions

Dans la classe **SCViewModelExtensions**, il faut enregistrer le **ViewModel**.

```csharp
public static void EnregistrerViewModels(this IServiceCollection services)
{
    services.AddSingleton<MainWindowVM>();
	//highlight-next-line
    services.AddTransient<HelloWorldVM>();
}
```

Également, il est enregistré en **Transient**. À chaque fois que le **ViewModel** sera nécessaire, il aura une nouvelle instance afin d'éviter de conserver d’anciens états.

### Ajout de la ressource pour créer le lien entre ViewModel et Vue - MainWindow.xaml

Il faut ajouter dans les ressources le lien entre le **ViewModel** et la **Vue** dans **MainWindow.xaml**.

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
	//highlight-start
        <!--Assignation du ViewModel à Vue-->
        <DataTemplate DataType="{x:Type TypeName=vm:HelloWorldVM}">
            <v:UcHelloWorld />
        </DataTemplate>
		//highlight-end
    </Window.Resources>
    <Grid>
        <ContentControl Content="{Binding VMActif}" />
    </Grid>
</Window>
```

La ligne 15 à 17 indique que lorsque le **DataContext** est de type **HelloWorldVM** (ligne 15), il faut utiliser le contrôle utilisateur **UcHelloWorld** (ligne 16).

À la ligne 20, lorsque le **Content** du **ContentControl** sera un **HelloWorldVM**, il chargera le contrôle utilisateur correspondant.

:::note
Souvenez-vous qu'on avait dit qu'il était inutile d'avoir une interface pour l'ajout du ViewModel dans le service, c'est ici qu'il est impossible de spécifier une interface pour HelloWorldVM.
:::

### Assignation du ViewModel initial - MainWindowVM

Dans la classe **MainWindowVM.cs**, il faut indique que la propriété **VMActif** que c'est une instance de **HelloWorldVM**.

```csharp
using Microsoft.Extensions.DependencyInjection;

namespace SuperCarte.WPF.ViewModels;

public class MainWindowVM : BaseVM
{    
    public MainWindowVM(IServiceProvider serviceProvider)
	{   
        //Sélectionner le ViewModel de démarrage
		//highlight-next-line
        VMActif = serviceProvider.GetRequiredService<HelloWorldVM>();
    }

    public BaseVM VMActif { get; set; }
}
```

À la ligne 10, le **ServiceProvider** obtiendra une instance de **HelloWorldVM**.

Démarrez l'application et vous devriez voir le message **HelloWorld** avec la date et l'heure.

<!-- la solution "SuperCarteApp_WPF_partie_2_helloworld" correspond au code jusqu'ici -->