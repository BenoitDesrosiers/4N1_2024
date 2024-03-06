---
sidebar_position: 212
draft: true
---
# Préparation du projet WPF


Il faut préparer le projet **WPF** pour être en mesure d'intégrer un **Contrôle utilisateur (WPF)** dans le **MainWindow**.

Le **MainWindow** évoluera en cours de projet. Pour l'instant, il sera le plus simple possible pour être en mesure de démarrer le projet.

Créez les dossiers **ViewModels** et **Views** à la racine du projet **SuperCarte.WPF**.

## Librairie MVVM Toolkit

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

## Création d'une classe de base - BaseVM

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
## Création du ViewModel - MainWindowVM

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

## Enregistrer le ViewModel - SCViewModelExtensions

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


## Modification du design de la vue - MainWindows.xaml

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

Aux lignes 7 et 8, ce sont les déclarations des **namespaces** qui seront utiles dans cette vue.

À la ligne 10, le préfixe **v:** sera utilisé pour les **Vues** et le préfixe **vm:** pour les **ViewModels**.

 La ligne 10 sert à indiquer quel est le type du **DataContext**. Ce n'est pas une assignation réelle, mais un indicateur pour permettre les suggestions du code. Il sera donc possible de voir les propriétés du **ViewModel** lors du **Binding**. Cette étape n'est pas obligatoire, mais elle est recommandée pour faciliter la programmation. 

À la ligne 12, la propriété **WindowState="Maximized"** permet de maximiser la fenêtre au maximum.

À la ligne 13, ce sont les **ressources** disponibles à la fenêtre. C'est à cet endroit que le lien entre **ViewModel** et **Contrôle utilisateur (WPF)** sera fait.

À la ligne 17, il y a le contrôle qui recevra le **Contrôle utilisateur (WPF)** en fonction du **ViewModel** actif.

## Modification du code de la vue - MainWindow.xaml.cs

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

Le **DataContext** est la source pour le binding dans **MainWindow.xaml**
:::note
bien que le DataContext ait été indiqué dans le fichier xaml, ce n'était que pour aider intellisence. L'assignation à la ligne 15 est la "vrai". 
:::

Il faut également assigner la langue de la vue. Généralement, lors de l'affichage d'une donnée, elle utilise le format correspondant dans les paramètres régionaux du système d'exploitation. Cette valeur provient de **CultureInfo.CurrentUICulture**. Par contre, avec WPF, il faut le spécifier dans la structure de la vue.

La langue s'applique à la balise en cours et à ses enfants. 

