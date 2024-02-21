---
sidebar_position: 300
draft: true
---

# Navigateur

Dans ce document, vous implémenterez la mécanique de navigation entre les différentes vues.

Vous ajouterez également un menu à l'application.

Ensuite, vous allez faire la vue de gestion pour être en mesure de créer et de modifier des éléments de la base de données. Il faudra mettre en place la validation du formulaire et également la navigation entre la liste et la gestion.

Finalement, vous allez implémenter un **ComboBox** pour spécifier la valeur d'une clé étrangère.

## Navigation

Pour être en mesure de passer d'une vue à l'autre, il faut une mécanique de navigation. Présentement, la navigation se fait dans **MainWindowVM.cs**, en changeant **VMActif**. Ce n'est pas trop efficace. 

**WPF** n'offre pas de mécanique intégrée, car le choix du type de vue est très varié. Il est possible de faire un changement de contrôle utilisateur dans une fenêtre principal comme pour ce projet. Il est possible de gérer de nouvelles fenêtres, de faire une application avec des pages WPF ou un mélange de tout ceci.

La navigation est propre à la vue. Dans certaines technologies, c'est entièrement la vue qui gère le changement, car c'est plus facile. Dans d'autres, il est plus pratique de le faire par le **ViewModel**. Parfois, il faut faire un mélange des deux.

Il est important que le **ViewModel** ne connaisse pas la mécanique de changement de **Vue**. Il doit seulement indiquer qu'il faut changer de **ViewModel** et c'est la couche **Vue** qui gère la mécanique.

Pour ce projet, ce sera le **ViewModel** qui va demander les changements de **Vue**.

## Classe d'assistance - Navigateur

Une classe d'assistance, d'aide ou **helper** en anglais est une classe qui assiste un élément logiciel pour effectuer une tâche précise.

Elle est parfois nommée **fournisseur** ou **provider**, car elle fournit un service précis à une composante.

Il peut y avoir des classes d'assistance à toutes les couches de l'application.

Le navigateur est une classe d'assistance pour le **ViewModel**.

Dans le projet **SuperCarte.WPF**, créez le dossier **Aides**. Ce dossier contiendra les classes d'assistances.

Créez l'interface **INavigateur.cs**.

```csharp showLineNumbers 
namespace SuperCarte.WPF.Aides;

/// <summary>
/// Interface qui contient la mécanique de navigation
/// </summary>
public interface INavigateur
{
    BaseVM VMActif { get; }

    /// <summary>
    /// Naviger vers un ViewModel
    /// </summary>
    /// <typeparam name="TViewModel">Type du ViewModel</typeparam>
    void Naviguer<TViewModel>() where TViewModel : BaseVM;
}
```

L'interface possède la propriété **VMActif** (ligne 8). Cette propriété indique à la fenêtre principale qu'elle est le **ViewModel** qu'elle doit utiliser.

Ensuite, la méthode **Naviguer** est générique (ligne 14). Il faudra spécifier le type du **ViewModel** qui doit être affiché. Le type générique peut être uniquement une classe qui hérite de la classe abstraite **BaseVM** (where).

Créez la classe **Navigateur.cs**.

```csharp showLineNumbers 
using CommunityToolkit.Mvvm.ComponentModel;
using Microsoft.Extensions.DependencyInjection;

namespace SuperCarte.WPF.Aides;

/// <summary>
/// Classe qui contient la mécanique de navigation de l'application
/// </summary>
public class Navigateur : ObservableObject, INavigateur
{
    private readonly IServiceProvider _serviceProvider;
    private BaseVM _vmActif;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="serviceProvider">Service Provider</param>
    public Navigateur(IServiceProvider serviceProvider)
	{
        _serviceProvider = serviceProvider;
    }    

    public void Naviguer<TViewModel>() where TViewModel : BaseVM
    {        
        VMActif = _serviceProvider.GetRequiredService<TViewModel>();         
    }

    public BaseVM VMActif
    {
        get 
        { 
            return _vmActif; 
        }
        private set
        {
            SetProperty(ref _vmActif, value);
        }
    }
}
```

La classe a besoin du **ServiceProvider** pour créer des instances de **ViewModel**.

La méthode **Naviguer** utilise le **ServiceProvider** pour créer une instance en fonction du type du **ViewModel** demandé.

L'instance est associée à la propriété **VMActif**. Cette propriété sera liée dans la fenêtre principale. Pour cette raison, la classe doit hériter de **ObservableObject** de la librairie **MVVM Toolkit** pour avoir accès à la mécanique de notification.

## Ajout de références dans Usings.cs

Dans le fichier **Usings.cs**, ajoutez le nouveau **namespace**.

```csharp showLineNumbers
global using SuperCarte.WPF; //Les classes à la racine de l'application WPF
global using SuperCarte.EF.Data; //Les classes du modèle du contexte
global using SuperCarte.EF.Data.Context; // La classe du contexte
global using System;
global using System.Collections.Generic;
global using System.Threading.Tasks;

global using SuperCarte.Core.Services;
global using SuperCarte.Core.Models;
global using SuperCarte.WPF.ViewModels;
global using SuperCarte.WPF.ViewModels.Bases;

//highlight-next-line
global using SuperCarte.WPF.Aides;
```

## Enregistrement du service - App.xaml.cs

Il faut enregistrer le navigateur dans les services.

L'enregistrement se fait directement dans la classe **App.xaml.cs**.

Voici le nouveau constructeur.

À la ligne 19, l'enregistrement du navigateur est fait avec un singleton. Il faut avoir seulement une instance de cette classe.

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
        services.AddSingleton<MainWindow>(); //Fenêtre principale

        //Enregistrement du contexte    
        services.AddDbContext<SuperCarteContext>(options => options.UseSqlServer(context.Configuration.GetConnectionString("DefaultConnection")));

//highlight-start
        //Enregistrement des classes d'assistance
        services.AddSingleton<INavigateur, Navigateur>();
//highlight-end

        //Appel des méthodes d'extension                        
        services.EnregistrerRepositories();
        services.EnregistrerServices();            
        services.EnregistrerValidateurs();
        services.EnregistrerViewModels();
    });

    _host = builder.Build();
}
```

## Intégration du navigateur - MainWindowVM

Il faut modifier la classe **MainWindowVM.cs** pour qu'elle utilise le navigateur.

La classe a plusieurs changements.

Le constructeur reçoit maintenant le **Navigateur** au lieu du **ServiceProvider** comme dépendance.

À la ligne 13, il y a l'assignation de la vue de départ en utilisant le navigateur.

```csharp showLineNumbers
namespace SuperCarte.WPF.ViewModels;

public class MainWindowVM : BaseVM
{
    private readonly INavigateur _navigateur;

    public MainWindowVM(INavigateur navigateur)
	{   
        //Sélectionner le ViewModel de démarrage        
        _navigateur = navigateur;

        //Vue initiale
        _navigateur.Naviguer<ListeCartesVM>();
    }

    public INavigateur Navigateur
    { 
        get
        {
            return _navigateur;
        }
    }   
}
```

La propriété de liaison est maintenant le **Navigateur** et non directement **VMActif**. La mécanique de notification est dans le **Navigateur**.

Il n'est pas possible de le faire comme ci-dessous. Car la **Vue** est liée à la propriété parent et elle ne considèrera pas la notification de changement de la propriété enfant **_navigateur.ActiveVM** comme lui appartenant. La notification doit se faire directement sur la propriété qui est liée. Il n'est pas possible de recevoir la notification par des intermédiaires.

```csharp showLineNumbers
public BaseVM ActiveVM
{
    get
    {
        return _navigateur.ActiveVM;
    }
}
```

## Liaison du navigateur - MainWindow.xaml

Il faut modifier la liaison du composant **\<ContentControl>** pour utiliser le navigateur.

Le changement est à la ligne 27. **\<ContentControl  Content="\{Binding Navigateur.VMActif}" />**.

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
        <DataTemplate DataType="{x:Type TypeName=vm:HelloWordVM}">
            <!--À retirer éventuellement-->
            <v:UcHelloWorld />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:ListeCategoriesVM}">
            <v:UcListeCategories />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:ListeCartesVM}">
            <v:UcListesCartes />
        </DataTemplate>
    </Window.Resources>
    <Grid>
	//highlight-next-line
        <ContentControl  Content="{Binding Navigateur.VMActif}" />
    </Grid>
</Window>
```
Le Binding est donc fait sur la propriété **Navigateur** de **MainWindowVM** qui est le **DataContext** pour cette vue.

Démarrez l'application et la liste de carte sera la vue initiale.

