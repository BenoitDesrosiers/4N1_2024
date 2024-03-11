---
sidebar_position: 232
draft: false
---

# Barre d'activité

Il serait intéressant d'ajouter une barre d'activité pour indiquer à l'utilisateur qu'il y a du travail en cours d'exécution.

Modifiez la classe **ListeCategoriesVM**.

Il faut ajouter une propriété **EstEnTravail**(ligne 45) et son attribut **_estEnTravail** (ligne 15).

Dans la méthode **ObtenirListeAsync()**, la propriété **EstEnTravail** est mise à jour au début (ligne 33) et à la fin (ligne 38). 

Le délai artificiel est toujours dans la méthode à la ligne 36.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.Input;

namespace SuperCarte.WPF.ViewModels;

/// <summary>
/// ViewModel de la vue ListeCategories
/// </summary>
public class ListeCategoriesVM : BaseVM
{
    //Dépendances
    private readonly ICategorieService _categorieService;

    //Attributs des propriétés
    private List<CategorieModel> _lstCategories;
    //highlight-next-line
    private bool _estEnTravail = false;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="categorieService">Service du modèle Categorie</param>
	public ListeCategoriesVM(ICategorieService categorieService)
    {
        _categorieService = categorieService;

        ObtenirListeCommande = new AsyncRelayCommand(ObtenirListeAsync);
    }

    /// <summary>
    /// Obtenir la liste de catégories du service
    /// </summary>    
    private async Task ObtenirListeAsync()
    {
        //highlight-next-line
        EstEnTravail = true;

        ListeCategories = await _categorieService.ObtenirListeAsync();
        //highlight-next-line
        await Task.Delay(5000);

        //highlight-next-line
        EstEnTravail = false;
    }

    //Commandes
    public IAsyncRelayCommand ObtenirListeCommande { get; set; }

    //Propriétés liées
    //highlight-start
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
//highlight-end
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
}
```

Dans le fichier **UcListeCategories.xaml**, ajoutez le composant **\<ProgressBar\>** dans la 4e rangée de la grille (ligne 68).

La propriété **IsIndeterminate** du composant **\<ProgressBar\>**  est liée à la propriété **EstEnTravail** du **ViewModel**.

```xaml  showLineNumbers 
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
            Text="Liste des catégories"/>
        
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
                    Command="{Binding ObtenirListeCommande}" />
        </WrapPanel>

        <!--Rangée 2-->
        <DataGrid Grid.Row="2" 
                  AutoGenerateColumns="False"
                  SelectionMode="Single" 
                  IsReadOnly="True"
                  ItemsSource="{Binding ListeCategories}"
                  SelectedItem="{Binding CategorieSelection}">
            <DataGrid.Columns>
                <DataGridTextColumn Header="Id"
                                    MinWidth="50"
                                    Binding="{Binding CategorieId}"/>
                
                <DataGridTextColumn Header="Nom"
                                    MinWidth="300"
                                    Binding="{Binding Nom}"/>

                <DataGridTextColumn Header="Description"                                    
                                    Binding="{Binding Description}"
                                    MinWidth="300"
                                    Width="*"/>

            </DataGrid.Columns>
        </DataGrid>
        //highlight-start
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />
		//highlight-end
    </Grid>
</UserControl>
```

Démarrez le programme et la barre sera en activité en pendant un peu plus de 5 secondes .

Vous pouvez retirer le délai artificiel.
