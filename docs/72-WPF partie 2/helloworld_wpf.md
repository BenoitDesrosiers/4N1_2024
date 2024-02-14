---
sidebar_position: 214
draft: true
---



# HelloWorld en WPF

Dans cette section, nous allons diverger un peu du projet SuperCarte afin d'introduire certains concepts. Cette section permet de tester le **MVVM** et certains éléments du **XAML** sans se soucier du service.

:::danger ATTENTION
Ca ne doit pas être reproduit dans votre **TP 3**. Nous allons utiliser ces concepts un peu différemment dans le projet SuperCarte. 
:::



## Création du ViewModel - HelloWorldVM

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

## Création de la vue - UcHelloWorld.xaml

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

## Enregistrer le ViewModel - SCViewModelExtensions

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

## Ajout de la ressource pour créer le lien entre ViewModel et Vue - MainWindow.xaml

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

## Assignation du ViewModel initial - MainWindowVM

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