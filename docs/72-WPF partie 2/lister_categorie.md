---
sidebar_position: 230
draft: false
---

# Liste des catégories

Cette section utilise les techniques apprises dans la section précédente afin de faire l'affichage des catégories dans SuperCarte (Le R du CRUD). 

Nous commencons par catégorie car cette entité n'a pas de FK. Elle est donc facile à afficher. 


La première interface utilisateur à effectuer sera de lister les enregistrements de la table **Catégorie**.

La liste sera un **DataGrid**. Il faut afficher à l'utilisateur la clé, le nom et la description dans la grille.

## SuperCarte.Core

### Modèle du domaine


Dans le projet **SuperCarte.Core**, il faut créer la classe **CategorieModel.cs** dans le dossier **Models**.

Commencez par créer le dossier **Models** s'il n'est pas déjà là.

La classe contient les 3 propriétés nécessaires pour effectuer des actions dans le logiciel.


```csharp
namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient l'information d'une catégorie
/// </summary>
public class CategorieModel
{
    public int CategorieId { get; set; }

    public string Nom { get; set; } = null!;

    public string? Description { get; set; }
}
```


### Classe d'extension - CategorieMapExtensions

L'application WPF utilise des modèles du domaine, alors que EF utilise des modèles de données. Le projet Core fait le lien entre ces deux projets. Afin de faire les transformations, des extensions seront utilisées.
Les extensions seront associées au modèle du domaine dans Core. Que la conversion s'effectue de **Modèle de données -> Modèle du domaine** ou à l'inverse **Modèle du domaine -> Modèle de données**, elles seront dans la classe d'extension du **Modèle du domaine** (**CategorieModel**).

Il faut faire la méthode qui récupèrera la liste de **Categorie** (modèle de donnée dans EF) et la convertira en **CategorieModel** (modèle du domaine dans Core). 

Il y a également la version pour les **List\<\>**. **Linq** est utilisé pour transformer la liste au lieu d'utiliser une boucle.

Créez la classe **CategorieMapExtensions.cs** dans le répertoire **Core/Extensions**.

```csharp
using SuperCarte.Core.Models;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Extensions;

/// <summary>
/// Classe statique qui regroupe les méthodes d'extension pour la conversion (mapping) du modèle Categorie
/// </summary>
public static class CategorieMapExtension
{
    /// <summary>
    /// Convertir un objet Categorie vers un objet CategorieModel
    /// </summary>
    /// <param name="item">Objet à convertir</param>
    /// <returns>Objet converti</returns>
    public static CategorieModel VersCategorieModel(this Categorie item)
    {
        return new CategorieModel()
        {
            CategorieId = item.CategorieId,
            Nom = item.Nom,
            Description = item.Description
        };
    }

    /// <summary>
    /// Convertir une liste d'objet Categorie vers une liste d'objet CategorieModel
    /// </summary>
    /// <param name="lstItem">Liste d'objet à convertir</param>
    /// <returns>Liste d'objet converti</returns>
    public static List<CategorieModel> VersCategorieModel(this List<Categorie> lstItem)
    {
        return lstItem.Select(i => i.VersCategorieModel()).ToList();
    }

    /// <summary>
    /// Convertir un objet CategorieModel vers un objet Categorie
    /// </summary>
    /// <param name="item">Objet à convertir</param>
    /// <returns>Objet converti</returns>
    public static Categorie VersCategorie(this CategorieModel item) 
    {
        return new Categorie()
        {
            CategorieId = item.CategorieId,
            Nom = item.Nom,
            Description = item.Description
        };
    }

    /// <summary>
    /// Convertir une liste d'objet CategorieModel vers une liste d'objet Categorie
    /// </summary>
    /// <param name="lstItem">Liste d'objet à convertir</param>
    /// <returns>Liste d'objet converti</returns>
    public static List<Categorie> VersCategorieModel(this List<CategorieModel> lstItem)
    {
        return lstItem.Select(i => i.VersCategorie()).ToList();
    }
}
```

### Création du service - CategorieService

Il faut créer la classe qui s'occupera de la logique de conversion modèle de domaine **CategorieModel**.

Créez l'interface **ICategorieService.cs** dans le dossier **Services**.

```csharp
using SuperCarte.Core.Models;

namespace SuperCarte.Core.Services;

/// <summary>
/// Interface qui contient les services du modèle Categorie
/// </summary>
public interface ICategorieService
{
    /// <summary>
    /// Obtenir la liste de catégories en asynchrone.
    /// </summary>
    /// <returns>Liste de catégories</returns>
	//highlight-next-line
    Task<List<CategorieModel>> ObtenirListeAsync();
}
```
:::note
Remarquez que la méthode a le suffixe **Async** et le type de retour un **Task\<CategorieModel\>**, car elle sera implémentée en asynchrone. 
:::

Est-ce nécessaire de faire également la version **synchrone** ? C'est un choix de conception. Il y en a qui préfère de couvrir les 2 cas en même temps et d'autres de seulement créer la version qui sera nécessaire. Pour ce travail,nous allons créer uniquement celles qui sont nécessaires. Lorsqu'une méthode est créée, elle doit généralement être testée. Si elle n'est pas utilisée dans le programme, il faudra tout de même la tester. Il y a un coût pour  la réalisation des tests, donc si une méthode n'est pas nécessaire, il est préférable de ne pas l'écrire. C'est l'approche **YAGNI (You ain't gonna need it)** ou en français **(Vous n'en aurez pas besoin**).

Dans la classe **BaseRepo**, les 2 versions ont été prévues, car c'est une classe de base, tous les cas seront utilisés rapidement lors de la réalisation de l'application.

Créez la classe **CategorieService.cs** dans le dossier **Services**.

```csharp
using SuperCarte.Core.Extensions;
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;

namespace SuperCarte.Core.Services;

/// <summary>
/// Classe qui contient les services du modèle Categorie
/// </summary>
public class CategorieService : ICategorieService
{
    private readonly ICategorieRepo _categorieRepo;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="categorieRepo">Repository Categorie</param>
    public CategorieService(ICategorieRepo categorieRepo)
    {
        _categorieRepo = categorieRepo;
    }
    
    public async Task<List<CategorieModel>> ObtenirListeAsync()
    {
        return (await _categorieRepo.ObtenirListeAsync()).VersCategorieModel();
    }
}
```



## Théorie sur le **async Task**

Pour comprendre un peu le fonctionnement de la combinaison **async Task** , voici des exemples de code. **Veuillez ne pas les reproduire.**

Pour être en mesure d'utiliser une méthode **asynchrone**, il faut que la chaine soit complètement en **asynchrone**. Il est important qu'une méthode qui est **async** appelle des méthodes **async**, sinon le lien sera brisé et il aura un avertissement du compilateur.

Lorsqu'on appelle une méthode **async**, elle doit retourner une **tâche** de type **Task**.

En réalité, la méthode crée une tâche dans un nouveau processus. La tâche exécute la méthode sous-jacente pour faire le travail.

Dans l'exemple ci-dessous, la tâche s'exécute dans un nouveau processus et le processus courant continue à effectuer les opérations 1, et 2. et 3. Les 2 processus (**ObtenirListeAsync** et les 3 opérations) s'exécutent en parallèle. Lorsqu'il arrive au **return**, ça ne veut pas dire que la sous-tâche **ObtenirListeAsync** est terminée. **Il va donc avoir une exception.**

```csharp
Task<List<Categorie>> task = _categorieRepo.ObtenirListeAsync();

//Operation 1

//Operation 2

//Operation 3

return task.Result.VersCategorieModel();
```

Il faut être en mesure de récupérer la valeur de la sous-méthode **VersCategorieModel**. Pour pouvoir le faire, il faut attendre le processus avant de récupérer sa valeur.

II est possible de travailler en parallèle. La sous-tâche s'exécute et les autres opérations se poursuivent.

À un certain moment dans le processus parent, il faut attendre la sous-tâche pour s'assurer qu'elle soit terminée.

Dans l'exemple ci-dessous, l'opération 1 et 2 s'exécute en parallèle avec **ObtenirListeAsync** et avant d'exécuter l'opération 3, il faut que la sous-tâche soit terminée.

```
Task<List<Categorie>> task = _categorieRepo.ObtenirListeAsync();

//Operation 1

//Operation 2

task.Wait(); //On attend que la sous-tâche soit terminée.

//Operation 3

return task.Result.VersCategorieModel();
```

Par contre, il faut s'assurer que les autres opérations n'entrent pas en conflit et sont **Thread Safe**. Une instance de **DbContext**  n'est pas **Thread Safe**. Un seul processus peut utiliser une instance de contexte à la fois.

Le code ci-dessous va générer une exception. C'est l'instance du contexte qui n'est pas **Thread Safe** et non la base de données. Si 2 utilisateurs utilisent le programme, ils seront dans leur propre processus et ils auront leur propre instance de contexte.

```csharp
Task<List<Categorie>> task1 = _categorieRepo.ObtenirListeAsync();

Task<List<Categorie>> task2 = _categorieRepo.ObtenirListeAsync();
//Operation 1

//Operation 2

task1.Wait();
task2.Wait();

//Operation 3

return task1.Result.VersCategorieModel();
```

Pour revenir avec le mot-clé **await**. Les 2 exemples sont équivalents. Le **await** permet de le faire en une seule ligne.

```csharp
Task<List<Categorie>> task = _categorieRepo.ObtenirListeAsync();
        
task.Wait();       

return task.Result.VersCategorieModel();

// le code ci-dessus est équivalent à cette ligne
return (await _categorieRepo.ObtenirListeAsync()).VersCategorieModel();
```

Remarquez également que le **await** est entre parenthèses avant d'utiliser l'extension.

Le code suivant n'est pas légal car **_categorieRepo.ObtenirListeAsync()** retourne un objet **Task\<List\<Categorie\>\>** et non un objet **List\<Categorie\>**. La méthode d'extension **VersCategorieModel** est disponible sur le type **List\<Categorie\>**.

```csharp title="Illégal" 
return await _categorieRepo.ObtenirListeAsync().VersCategorieModel();
```

C'est le **await _categorieRepo.ObtenirListeAsync()** qui retourne un objet **List\<Categorie\>**. S'il faut utiliser une méthode sur **List\<Categorie\>**, il faut regrouper **await** et la tâche avec des parenthèses.

```csharp
return (await _categorieRepo.ObtenirListeAsync()).VersCategorieModel();
```

Pour le rendre plus visuel, il serait possible de faire ceci.

```csharp
List<Categorie> lstCategorie = await _categorieRepo.ObtenirListeAsync(); //Équivalent à (await _categorieRepo.ObtenirListeAsync())

return lstCategorie.VersCategorieModel(); //Équivalent à (await _categorieRepo.ObtenirListeAsync()).VersCategorieModel()
```

## Projet SuperCarte.WPF

### Enregistrement du service - SCServiceExtensions

Il faut enregistrer le service dans la classe **SCServiceExtensions** du  répertoire **Extensions/ServiceCollections**.

```csharp
using Microsoft.Extensions.DependencyInjection;

namespace SuperCarte.WPF.Extensions.ServiceCollections;

/// <summary>
/// Classe d'extension qui permet d'enregistrer les classes de la catégorie Service
/// </summary>
public static class SCServiceExtensions
{
    /// <summary>
    /// Méthode qui permet d'enregistrer les services de l'application
    /// </summary>
    /// <param name="services">La collection de services</param>
    public static void EnregistrerServices(this IServiceCollection services)
    {
        //highlight-next-line
              services.AddScoped<ICategorieService, CategorieService>();
      
    }
}
```

Le service est également enregistré en **Scoped** pour permettre d'utiliser la même instance dans le programme dans le même **scope**.

:::warning Important
Si ce n'est pas déjà fait, ajoutez l'appel à **EnregistrerServices** dans **App.xaml.cs/App**
:::


### Ajout de références dans Usings.cs

Ajoutez les références ci-dessous dans le fichier **Usings.cs**.

```csharp
global using SuperCarte.Core.Services;
global using SuperCarte.Core.Models;
global using SuperCarte.WPF.ViewModels;
global using SuperCarte.WPF.ViewModels.Bases;
```

### Création du ViewModel - ListeCategoriesVM

Le **CategorieService** est maintenant créé, il faut maintenant créer le **ViewModel**.

Créez la classe **ListeCategoriesVM.cs** dans le dossier **ViewModels**. 

Premièrement, il faut définir les éléments que la **Vue** a besoin de connaitre pour fonctionner.

Pour la liste des catégories, il faut une **List\<CategorieModel\>** à la ligne 14. Cette liste sera affichée à l'utilisateur. Le choix de comment l'afficher sera dans la vue.

Il faut également la propriété **CategorieSelection** pour connaitre la catégorie qui est sélectionnée dans la liste (ligne 52). En **MVVM**, il n'est pas possible d'utiliser une propriété auto-implémentée si elle est liée à la vue, car il faut de notifier le changement de valeur (ligne 60). Il faut donc de la logique dans le **set**. Lorsqu'il y a de la logique, il faut utiliser un attribut pour contenir la valeur de la propriété (ligne 15).

Ensuite, il faut injecter les dépendances à la ligne 11, car les catégories seront obtenues par le service.

Ensuite, il faut penser aux commandes. La liste doit se rafraichir. Cette commande doit être **asynchrone**. Cette commande se nomme **ObtenirListeCommande**. La propriété de la commande est à la ligne 37. Les commandes doivent avoir le suffixe **Commande**. La commande doit utiliser un verbe d'action dans la mesure du possible.

La méthode que la commande utilise est à la ligne 31. Par convention, la méthode doit avoir le même nom que la commande sans le mot *Commande* en suffix (**ObtenirListeCommande** devient **ObtenirListeAsync**).

À la ligne 25, la commande est créée dans le constructeur.

Il est important d'assigner la liste par la propriété et jamais par l'attribut. Car la propriété contient la mécanique de notification.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.Input;

namespace SuperCarte.WPF.ViewModels;

/// <summary>
/// ViewModel de la vue ListeCategories
/// </summary>
public class ListeCategoriesVM : BaseVM
{
    //Dépendances
    //highlight-next-line
    private readonly ICategorieService _categorieService;

    //Attributs des propriétés
    //highlight-next-line
    private List<CategorieModel>? _lstCategories;
    //highlight-next-line
    private CategorieModel? _categorieSelection;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="categorieService">Service du modèle Categorie</param>
    public ListeCategoriesVM(ICategorieService categorieService)
    {
        _categorieService = categorieService;

//highlight-next-line
        ObtenirListeCommande = new AsyncRelayCommand(ObtenirListeAsync);
    }

    /// <summary>
    /// Obtenir la liste de catégories du service
    /// </summary>    
    //highlight-next-line
    private async Task ObtenirListeAsync()
    {
        ListeCategories = await _categorieService.ObtenirListeAsync();
    }

    //Commandes
    //highlight-next-line
    public IAsyncRelayCommand ObtenirListeCommande { get; set; }

    //Propriétés liées
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

//highlight-next-line
    public CategorieModel? CategorieSelection
    {
        get
        {
            return _categorieSelection;
        }
        set
        {
            //highlight-next-line
            SetProperty(ref _categorieSelection, value);
        }
    }
}
```

### Enregistrer le ViewModel - SCViewModelExtensions

Dans la classe **SCViewModelExtensions**, il faut enregistrer le **ViewModel**.

```csharp
public static void EnregistrerViewModels(this IServiceCollection services)
{
    services.AddTransient<MainWindowVM>();
	//highlight-next-line
    services.AddTransient<ListeCategoriesVM>();
}
```

### Création de la vue - UcListeCategories.xaml

Créez le dossier **SuperCarte.WPF/Views** si nécessaire. 

Créez un **Contrôle utilisateur (WPF)** nommé **UcListeCategories.xaml** dans le dossier **Views**. Le modèle se retrouve dans la section **WPF** à gauche.

Toutes les **Vues** seront du type  **Contrôle utilisateur (WPF)**.

```xaml showLineNumbers
<UserControl x:Class="SuperCarte.WPF.Views.UcListeCategories"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
             d:DataContext="{d:DesignInstance vm:ListeCategoriesVM}"
             mc:Ignorable="d"              
             d:DesignHeight="450" d:DesignWidth="800">
    <Grid>
    //highlight-next-line
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
         //highlight-next-line
        <TextBlock 
            Grid.Row="0" 
            VerticalAlignment="Center" HorizontalAlignment="Center"
            FontSize="16" FontWeight="Bold"
            Text="Liste des catégories"/>
        
        //highlight-next-line
        <!--Rangée 1-->
        <WrapPanel Grid.Row="1" 
                    Orientation="Horizontal" VerticalAlignment="Center">
            
            <Button Content="N" ToolTip="Nouveau"
                    Margin="5" Width="32" Height="32" />
            <Button Content="E" ToolTip="Éditer"
                    Margin="5" Width="32" Height="32" />
            <Button Content="S" ToolTip="Supprimer"
                    Margin="5" Width="32" Height="32" />
            <Button Content="R" ToolTip="Rafraichir"
                    Margin="5" Width="32" Height="32"
                    //highlight-next-line
                    Command="{Binding ObtenirListeCommande}" />
        </WrapPanel>

        <!--Rangée 2-->
        //highlight-start
        <DataGrid Grid.Row="2" 
                  AutoGenerateColumns="False"
                  SelectionMode="Single" 
                  IsReadOnly="True"
                  ItemsSource="{Binding ListeCategories}"
                  SelectedItem="{Binding CategorieSelection}">
                  //highlight-end
            <DataGrid.Columns>
            //highlight-start
                <DataGridTextColumn Header="Id"
                                    MinWidth="50"
                                    Binding="{Binding CategorieId}"/>
                                    //highlight-end
                
                <DataGridTextColumn Header="Nom"
                                    MinWidth="300"
                                    Binding="{Binding Nom}"/>

                <DataGridTextColumn Header="Description"                                    
                                    Binding="{Binding Description}"
                                    MinWidth="300"
                                    //highlight-next-line
                                    Width="*"/>

            </DataGrid.Columns>
        </DataGrid>
        
        <!--Rangée 3-->

    </Grid>
</UserControl>

```
La première étape consiste à indiquer le **ViewModel** qui sera utilisé. Ce n'est pas obligatoire, mais en ajoutant les lignes 7 et 8, il sera possible d'avoir des suggestions lors du **Binding**.


La deuxième étape consiste à créer une disposition (ligne 12 à 21) 

La vue aura 4 rangées. 
- La première rangée (0) contiendra le titre de la vue. La hauteur est automatique.
- La deuxième rangée (1) contiendra la liste des boutons **Nouveau**, **Édition**, **Supprimer** et **Rafraichir**. La hauteur est automatique.
- La troisième rangée (2) contiendra le **DataGrid**. La hauteur est **\***. Elle va prendre tout l'espace restant de la vue.
- La quatrième rangée (3) contiendra la barre de chargement d'une hauteur de 20.

Ensuite, il faut créer le titre. Le composant **\<TextBloc\>** sera utilisé (ligne24) . Se composant permet d'afficher du texte facilement. Il prend tout l'espace disponible, donc en le centrant verticalement et horizontalement, il restera toujours en centre en fonction de la grosseur de la fenêtre.

Contrairement au **\<div\>** en **HTML**, le système de **Grid** n'a pas de balise encapsulée. Il faut spécifier l'emplacement avec la propriété **Grid.Row**. L'ajout de commentaires (ligne 30) permet de mieux voir la séparation des composants dans le **Grid**.

À la ligne 40, le bouton **Rafraichir** est lié à la commande **ObtenirListeCommande**. 

Si les lignes 7 et 8 ne sont pas inscrites, il n'y aura pas d'autosuggestion après **\{Binding}** Le risque de se tromper est plus grand.

Ensuite, il faut ajouter le **DataGrid** (ligne 46 à 67 ). Le **DataGrid** peut autogénéré les colonnes en fonction des propriétés. 

Par contre, il ne sera pas possible de faire des ajustements si ce mode est activé. À la ligne 47 du code ci-dessous, la propriété **AutoGenerateColumns=false** désactive ce mode.

La propriété **SelectionMode="Single"** permet de sélectionner une seule ligne à la fois.

La propriété **IsReadOnly="True"** rend la grille non éditable. Il est possible d'avoir des designs qui permettent de modifier des valeurs directement dans une grille et de sauvegarder l'ensemble.

La propriété **ItemsSource="\{Binding ListeCategories\}"** indique la propriété du **ViewModel** qui contient la source des données.

La propriété **SelectedItem="\{Binding CategorieSelection\}"** permet d'indiquer la propriété qui aura la référence de la propriété sélectionnée.

Il faut ensuite déclarer les colonnes.

Toutes les colonnes sont du texte, car même le **Id** sera transformé en texte. Elles sont toutes du type **\<DataGridTextColumn\>**. 

La propriété **Header** est pour le nom de la colonne. La propriété **Binding** est pour indiquer la propriété à utiliser dans la classe **CategorieModel**. Il n'est pas obligatoire de créer systématiquement une colonne par propriété, par exemple la clé pourrait être masquée à l'utilisateur. 

À la ligne 61, la largeur de la colonne est **Width="*"**, ce qui indique qu'elle prendra l'espace restant. Si l'espace restant est plus petit que 300, la colonne restera à 300, car la propriété **MinWidth="300"** (ligne 58).

:::tip
Pour le tp3, pourquoi ne pas faire un détour à la section **Localisation de .xaml** immédiatement... 
:::

### Ajout de la ressource pour créer le lien entre ViewModel et Vue - MainWindow.xaml

Il faut ajouter dans les ressources le lien entre le **ViewModel** et la **Vue**.

```xaml showLineNumbers
<Window x:Class="SuperCarte.WPF.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:SuperCarte.WPF"  
        xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
        //highlight-next-line
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
		//highlight-start
        <DataTemplate DataType="{x:Type TypeName=vm:ListeCategoriesVM}">
            <v:UcListeCategories />
        </DataTemplate>
		//highlight-end
    </Window.Resources>
    <Grid>
        <ContentControl Content="{Binding VMActif}" />
    </Grid>
</Window>
```
La ligne 8 ajoute les Views dans l'espace de nom. 

La ligne 19 à 21 indique que lorsque le **DataContext** est de type **ListeCategoriesVM** (ligne 19), il faut utiliser le contrôle utilisateur **UcListeCategories** (ligne 20).

À la ligne 24, lorsque le **Content** du **ContentControl** sera un **ViewModel** de la liste des ressources, il chargera le contrôle utilisateur correspondant.

## MainWindowVM

Dans la classe **MainWindowVM.cs**, il faut assigner **ListeCategoriesVM** à la propriété **VMActif**.

```csharp
using Microsoft.Extensions.DependencyInjection;

namespace SuperCarte.WPF.ViewModels;

public class MainWindowVM : BaseVM
{    
    public MainWindowVM(IServiceProvider serviceProvider)
	{   
        //Sélectionner le ViewModel de démarrage
        VMActif = serviceProvider.GetRequiredService<ListeCategoriesVM>();
    }

    public BaseVM VMActif { get; set; }    
}
```

Démarrez l'application. Appuyez sur le bouton **R** et la liste s'affichera dans le **DataGrid**.

## Chargement automatique

Il est plus intéressant pour l'utilisateur d'avoir un chargement automatique pour ce type de vue.

Il faut implémenter l'événement **Loaded** de la vue et appeler la commande **ObtenirListeCommande**.

Dans le fichier **UcListeCategories.xaml**. 

À la ligne 11, il y a la déclaration de l'événement.

```xaml showLineNumbers
<UserControl x:Class="SuperCarte.WPF.Views.UcListeCategories"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
             d:DataContext="{d:DesignInstance vm:ListeCategoriesVM}"
             mc:Ignorable="d" 
             d:DesignHeight="450" d:DesignWidth="800"
			 //highlight-next-line
             Loaded="UserControl_Loaded">
    .....

```

Dans le fichier **UcListeCategories.xaml.cs**. 

À la ligne 27, il y a l'implémentation de la méthode associée à l'événement. Elle doit être **async**.

Ensuite, il y a les vérifications que le **DataContext** existe et qu'il est un **ListeCategoriesVM**.

La commande est exécutée an **asynchrone**. Le **await** est très important pour indiquer à la fenêtre qu'elle est en cours de travail.

```csharp showLineNumbers
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace SuperCarte.WPF.Views;
/// <summary>
/// Logique d'interaction pour UcListeCategories.xaml
/// </summary>
public partial class UcListeCategories : UserControl
{
    public UcListeCategories()
    {
        InitializeComponent();
    }

//highlight-start
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
//highlight-end
}
```

Ajoutez un **délai artificiel** dans la méthode **ObtenirListeAsync()** du **ViewModel**. Remarquez le comportement du bouton **Rafraichir**. Lorsque la commande est en cours d'exécution, elle indique aux composants qui sont liés à la commande d'être indisponible. Le bouton est donc désactivé pour éviter la double exécution.

Voici la méthode avec le **délai artificiel** de la classe **ListeCategoriesVM**.

```csharp
/// <summary>
/// Obtenir la liste de catégories du service
/// </summary>    
private async Task ObtenirListeAsync()
{
    await Task.Delay(5000);
    ListeCategories = await _categorieService.ObtenirListeAsync();
    
}
```

Mettez le délai après l'appel du service. La commande sera toujours en exécution, mais la liste va apparaitre instantanément. Un autre avantage de l'asynchrone, il est possible de mettre à jour la vue graduellement pour une commande qui effectue plusieurs opérations.


