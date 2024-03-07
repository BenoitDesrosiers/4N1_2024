---
sidebar_position: 250
draft: true
---

# Localisation de .xaml

Pour rendre l'application multilingue, il faut utiliser des fichiers ressources. Les fichiers ressources sont en fonction de la localisation.

Le terme localisation est utilisé, car il peut avoir une version pour le français de France et le français du Québec.

Pour faciliter la localisation des vues, il existe la librairie **WPFLocalizeExtention**.

## Installation de la librairie

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. Il est important que le **Projet par défaut**    **SuperCarte.WPF** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.WPF**. À ce stade, il y a **plusieurs projets** et il est important de le modifier dans la liste.

```
Install-Package WPFLocalizeExtension
```

## Création du fichier ressource - ResListeCategories

La librairie utilise les fichiers **.resx** pour la localisation. C'est le format de fichier principal pour **.NET**.

Créez le dossier **Resx**, dans le projet **SuperCarte.WPF**.

Il existe plusieurs stratégies pour gérer les fichiers ressources. Pour ce projet, ce sera un fichier ressource par vue.

Créez le fichier **ResListeCategories.resx** avec le modèle **Fichier de ressources** dans le répertoire **Resx**. Il est important que le nom du fichier ressource ne soit pas réutilisé pour d'autres ressources.

Ce fichier sera le fichier ressource principal. Si aucun fichier ressource n’existe pour la culture du programme, ce sera celui-ci.

Pour ce projet, ce sera le fichier en français.

La colonne **Nom** consiste à la clé de la ressource et la colonne **Valeur** consiste est le texte.

Pour la vue **UcListeCategories**, il faut traduire le titre de la page, les entêtes des colonnes du **DataDrid**, le texte et les **Tooltip** des boutons.

Les boutons seront par contre réutilisés par d'autres **Vues** . Il serait préférable de les spécifier dans un fichier propre.

| Nom             | Valeur               |
| --------------- | -------------------- |
| Titre           | Liste des catégories |
| Col_CategorieId | Id                   |
| Col_Nom         | Nom                  |
| Col_Description | Description          |

Créez le fichier **ResListeCategories.en.resx**. Ce fichier sera pour l'anglais. Ce sera autant pour **en-US** (Anglais États-Unis) que pour **en-CA** (Anglais Canada). Il est important de mettre le code de la culture dans entre le nom du fichier et l'extension.

Il faut que les éléments de la colonne **Nom** soient identiques dans tous les fichiers.

| Nom             | Valeur          |
| --------------- | --------------- |
| Titre           | Categories list |
| Col_CategorieId | Id              |
| Col_Nom         | Name            |
| Col_Description | Description     |

S'il avait une version italienne, il faudrait que le fichier se nomme **ResListeCategories.it.resx**. S'il avait une version française de France, il faudrait que le fichier se nomme **ResListeCategories.fr-Fr.resx**.

:::tip
Vous pouvez télécharger ce fichier zip et le décompresser dans le répertoire Resx afin de vous sauver du temps. 
[fichier ressources](./fichiers_localisation.zip)
:::

## Création du fichier ressource - ResGlobalListeBouton

Ce fichier ressource contiendra l'information des boutons. Les boutons d'une liste seront toujours les mêmes. Imaginez qu'il faut modifier le bouton **Rafraichissement** par **Chargement**. Si le logiciel à 150 listes, il faut le modifier dans 150 fichiers.

Créez le fichier **ResGlobalListeBouton.resx** avec le modèle **Fichier de ressources**. Il est important que le nom du fichier ressource ne soit pas réutilisé pour d'autres ressources.

| Nom                       | Valeur     |
| ------------------------- | ---------- |
| Bouton_Nouveau_Content    | N          |
| Bouton_Editer_Content     | É          |
| Bouton_Supprimer_Content  | S          |
| Bouton_Rafraichir_Content | R          |
| Bouton_Nouveau_Tooltip    | Nouveau    |
| Bouton_Editer_Tooltip     | Éditer     |
| Bouton_Supprimer_Tooltip  | Supprimer  |
| Bouton_Rafraichir_Tooltip | Rafraichir |

Créez le fichier **ResGlobalListeBouton.en.resx**.

| Nom                       | Valeur  |
| ------------------------- | ------- |
| Bouton_Nouveau_Content    | N       |
| Bouton_Editer_Content     | E       |
| Bouton_Supprimer_Content  | D       |
| Bouton_Rafraichir_Content | R       |
| Bouton_Nouveau_Tooltip    | New     |
| Bouton_Editer_Tooltip     | Edit    |
| Bouton_Supprimer_Tooltip  | Delete  |
| Bouton_Rafraichir_Tooltip | Refresh |

## Utilisation dans la vue - UcListeCategories.xaml

Pour être en mesure de l'utiliser dans une **Vue**, il faut ajouter des déclarations dans la balise initiale **\<UserControl\>**.

La ligne 8 indique qu'il faut inclure le **namespace** de la librairie **WPFLocalizeExtension**.

La ligne 9 indique qu'elle est la langue à utiliser pour l'aperçu du design.

La ligne 10 indique le projet dans lequel le fichier ressource se trouve.

La ligne 11 est le nom du fichier ressource par défaut de la **Vue**.


Pour sélectionner un élément du fichier ressource de la vue, il faut utiliser cette syntaxe. La clé est le nom de la colonne.

```
{lex:Loc Clé}
```

Par exemple pour le titre de la **Vue** ligne 33, il faut prendre la valeur de l'élément **Titre** du fichier **ResListeCategories**. 

Pour sélectionner un élément d'un autre fichier ressource, il faut utiliser cette syntaxe. Le fichier est le fichier **.resx**. La clé est le nom de la colonne.

```
{lex:Loc Fichier:Clé}
```

Par exemple pour le bouton **Nouveau**, à la ligne 39, il prend l'élément  **Bouton_Nouveau_Content** du fichier **ResGlobalListeBouton** pour la propriété **Content**.


Tous les textes doivent être dans un fichier ressource, même si le texte est identique dans les 2 langues.

Il devient difficile à faire évoluer le programme si certains libellés ne sont pas dans le fichier ressource.

Également, il est préférable de créer un élément par composant, même s'il y a une répétition dans la valeur. Un mot dans un contexte n'aura pas nécessairement la même traduction dans un autre contexte. 

Voici le fichier au complet.

```xaml showLineNumbers
<UserControl x:Class="SuperCarte.WPF.Views.UcListeCategories"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
             xmlns:lex="http://wpflocalizeextension.codeplex.com"
             lex:LocalizeDictionary.DesignCulture="fr"
             lex:ResxLocalizationProvider.DefaultAssembly="SuperCarte.WPF"
             lex:ResxLocalizationProvider.DefaultDictionary="ResListeCategories"             
             d:DataContext="{d:DesignInstance vm:ListeCategoriesVM}"
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
                  ItemsSource="{Binding ListeCategories}"
                  SelectedItem="{Binding CategorieSelection}">
            <DataGrid.Columns>
                <DataGridTextColumn Header="{lex:Loc Col_CategorieId}"
                                    MinWidth="50"
                                    Binding="{Binding CategorieId}"/>

                <DataGridTextColumn Header="{lex:Loc Col_Nom}"
                                    MinWidth="300"
                                    Binding="{Binding Nom}"/>

                <DataGridTextColumn Header="{lex:Loc Col_Description}" 
                                    MinWidth="300"
                                    Width="*"
                                    Binding="{Binding Description}"/>

            </DataGrid.Columns>
        </DataGrid>
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />

    </Grid>
</UserControl>
```

:::tip
Maintenant que vous savez comment se fait la localisation, vous devriez y penser dès le départ et inscrire les clés pour chaque mot au moment de la création de la vue, et inscrire chacun de ces mots dans les fichiers .resx au fur et à mesure
:::

## Test

Par défaut, la culture sera celle spécifiée dans le système d'exploitation.

Il est possible de la modifier à partir du code.

Dans le fichier **App.xaml.cs**, modifiez  le constructeur de la classe **App**.

```csharp
public App()
{
	//highlight-start
    //Modification de la langue dans l'extension et du thread principale
    //highlight-next-line
    CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("en-CA");
    WPFLocalizeExtension.Engine.LocalizeDictionary.Instance.SetCurrentThreadCulture = true;
    WPFLocalizeExtension.Engine.LocalizeDictionary.Instance.Culture = CultureInfo.DefaultThreadCurrentCulture;
	//highlight-end

    var builder = Host.CreateDefaultBuilder();

    //Enregistrement des services
    builder.ConfigureServices((context, services) =>
    {            
        services.AddSingleton<MainWindow>(); //Fenêtre principale

        //Enregistrement du contexte    
        services.AddDbContext<SuperCarteContext>(options => options.UseSqlServer(context.Configuration.GetConnectionString("DefaultConnection")));

        //Appel des méthodes d'extension                        
        services.EnregistrerRepositories();
        services.EnregistrerServices();            
        services.EnregistrerValidateurs();
        services.EnregistrerViewModels();
    });

    _host = builder.Build();
}
```

Démarrez l'application et la page sera en anglais.

Il est important de modifier la langue dans le **Thread principal** de l'application et non dans le **Thread d'affichage**, car l'application fonctionne en asynchrone. Une sous-tâche crée une copie de la culture du **Thread parent**. L'instance du **ViewModel** est créée par le **ServiceProvider**, donc il provient du **Thread principal**. Ce n'est pas la **Vue** qui crée la **VM**. 

La ligne **CultureInfo.DefaultThreadCurrentCulture** permet d'indiquer la culture par défaut de l'application. En cas qu'il faille modifier la culture dans l'application en cours d'exécution, il faudrait se baser sur cette valeur pour appliquer la culture sur le **Thread** en cours d'exécution si c'est nécessaire.

Remettez l'application en français par défaut.

```csharp
public App()
{
    //Modification de la langue dans l'extension et du thread principal
    //highlight-next-line
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

        //Appel des méthodes d'extension                        
        services.EnregistrerRepositories();
        services.EnregistrerServices();            
        services.EnregistrerValidateurs();
        services.EnregistrerViewModels();
    });

    _host = builder.Build();
}
```

