---
sidebar_position: 20
draft: true
---

# Composants XAML

## Formater des données

Il est possible de formater la valeur des propriétés dans un format spécifique.

Lors du **Binding**, il est possible d'indiquer la transformation avec la propriété **StringFormat**, Le choix de l'affichage appartient à la **Vue**, donc il faut faire les transformations d'affichage dans la **Vue** et non dans le **ViewModel**.

Pour la date, il faut afficher en mode **dd MMM yyyy HH:mm:ss**. Donc pour **2023-03-03 15:23:03.452121** se sera **3 Mars 2023 15:23:03**.

Pour le nombre décimal, il faut avoir un séparateur de milliers et avoir une précision au millième (3 décimaux). Le format sera **N3**.

```csharp
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
			//highlight-start
            <TextBlock Text="{Binding DateHeure , StringFormat=\{0:d MMMM yyyy HH:mm:ss\}}"/>
            <TextBlock Text="{Binding ValeurDecimal, StringFormat=\{0:N3\}}" />     
			//highlight-end       
            <CheckBox IsChecked="{Binding ValeurBool}" />
        </StackPanel>        
    </Grid>
</UserControl>
```



Notez que le format des chaines de caractères dépend également des paramètres régionaux de l'ordinateur. En **fr-ca**, le séparateur de milliers est un espace et la décimale est une virgule. Donc **N3** ne s'affichera pas nécessairement de la même façon.

Pour plus d'information sur les règles : https://learn.microsoft.com/fr-ca/dotnet/api/system.string.format?view=net-7.0

## Grid Layout

Le composant **Grid** permet de créer une disposition dans un contrôle. Afin de faciliter la visualisation du **Grid**, le paramètre **ShowGridLines="true"**.

Afin de définir la grille, il faut déclarer des rangées et des colonnes.

Dans l'exemple ci-dessous, la disposition sera de 3 rangées et de 2 colonnes. La première colonne est 0 et la première rangée est 0.

```xaml title="Ne pas copier"
<Grid ShowGridLines="true">
        <Grid.RowDefinitions>
            <RowDefinition />
            <RowDefinition />            
            <RowDefinition />
        </Grid.RowDefinitions>
        <Grid.ColumnDefinitions>
            <ColumnDefinition />
            <ColumnDefinition />
        </Grid.ColumnDefinitions>
 </Grid>
```

Si aucun élément n'est spécifié dans **Grid.ColumnDefinitions**, il y aura une seule colonne qui prendra tout l'espace.

```xaml title="Ne pas copier"
<Grid ShowGridLines="true">
        <Grid.RowDefinitions>
            <RowDefinition />
            <RowDefinition />            
            <RowDefinition />
        </Grid.RowDefinitions>
 </Grid>
```

Si aucun élément n'est spécifié dans **Grid.RowDefinitions**, il y aura une seule rangée qui prendra tout l'espace.

```xaml title="Ne pas copier"
<Grid ShowGridLines="true">
        <Grid.ColumnDefinitions>
            <ColumnDefinition />
            <ColumnDefinition />
        </Grid.ColumnDefinitions>
 </Grid>
```

Afin d'indiquer l'emplacement d'un composant dans la grille, il faut l'indiquer dans les propriétés de positionnement **Grid.Row** et **Grid.Column**.

Également, s'il la largeur et la hauteur n'est pas spécifié, la disposition de la grille sera uniforme en fonction de la taille de la fenêtre. Elle sera **responsive**.

Si ce n'est pas spécifié, ce sera la valeur **0**. Il est recommandé de toujours indiquer l'emplacement de la rangée à moins qu'il y ait seulement 1 rangée et la même chose pour les colonnes.

Il n'est pas nécessaire de les déclarer dans un ordre spécifique. Le **TextBloc** (2,1) est déclaré avant le (1,0). Ce n'est pas recommandé de faire ceci, mais c'est possible.

```xaml title="Ne pas copier"
<Grid ShowGridLines="true">
        <Grid.RowDefinitions>
            <RowDefinition />
            <RowDefinition />
            <RowDefinition />
        </Grid.RowDefinitions>
        <Grid.ColumnDefinitions>
            <ColumnDefinition />
            <ColumnDefinition />
        </Grid.ColumnDefinitions>

        <!--Row 0, Column 0-->
        <TextBlock  Grid.Row="0" Grid.Column="0"  Text="Hello World 0,0" />
        <!--<TextBlock Text="Hello World 0,0" />-->
        
        <!--Row 0, Col 1-->
        <TextBlock Grid.Row="0" Grid.Column="1" Text="Hello World 0,1" />
        <!--<TextBlock Grid.Column="1"  Text="Hello World 0,1" />-->

//highlight-start
        <!--Row 2, Col 1-->
        <TextBlock Grid.Row="2" Grid.Column="1" Text="Hello World 2,1" />
//highlight-end        

        <!--Row 1, Col 0-->
        <TextBlock Grid.Row="1" Grid.Column="0" Text="Hello World 1,0" />
</Grid>
```

Également, il n'est pas nécessaire de spécifier l'emplacement pour les composants enfants, si le parent possède les propriétés de positionnement.

Ici, le composant parent **[StackPanel](https://learn.microsoft.com/en-us/uwp/api/windows.ui.xaml.controls.stackpanel?view=winrt-22621)** est positionné (Grid.Row et Grid.Column), il n'est donc pas nécessaire de positionner **[TextBlock](https://learn.microsoft.com/en-us/uwp/api/windows.ui.xaml.controls.textblock?view=winrt-22621)**.

```xaml title="Vous pouvez l'essayer"
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
    <Grid ShowGridLines="true">
        <Grid.RowDefinitions>
            <RowDefinition />
            <RowDefinition />
            <RowDefinition />
        </Grid.RowDefinitions>
        <Grid.ColumnDefinitions>
            <ColumnDefinition />
            <ColumnDefinition />
        </Grid.ColumnDefinitions>
        
        <!-- Rangée 0 Colonne 0 -->
        <StackPanel Grid.Row="0" Grid.Column="0" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World (0,0)" />            
        </StackPanel>

        <!-- Rangée 0 Colonne 1 -->
        <StackPanel Grid.Row="0" Grid.Column="1" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World (0,1)" />            
        </StackPanel>

        <!-- Rangée 1 Colonne 0 -->

        <StackPanel Grid.Row="1" Grid.Column="0" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World (1,0)" />            
        </StackPanel>

        <!-- Rangée 1 Colonne 1 -->
        <StackPanel Grid.Row="1" Grid.Column="1" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World (1,1)" />  
        </StackPanel>
    </Grid>
</UserControl>
```

### Taille fixe

Dans l'exemple ci-dessous, il y a 4 rangées. Il y a un élément par rangées. La hauteur des rangées est fixe, donc la fenêtre n'est pas **responsive**.

Le nombre correspond au nombre de pixels.

```xaml
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
    <Grid ShowGridLines="true">
        <Grid.RowDefinitions>
            <RowDefinition Height="100" />
            <RowDefinition Height="200" />
            <RowDefinition Height="300" />
            <RowDefinition Height="400" />
        </Grid.RowDefinitions>
        
        <!-- Rangée 0 -->
        <StackPanel Grid.Row="0" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World" />            
        </StackPanel>
                 
        <!-- Rangée 1 -->
        <StackPanel Grid.Row="1" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="{Binding DateHeure , StringFormat=\{0:d MMMM yyyy HH:mm:ss\}}"/>
        </StackPanel>

        <!-- Rangée 2 -->
        <StackPanel Grid.Row="2" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="{Binding ValeurDecimal, StringFormat=\{0:N3\}}" />
        </StackPanel>

        <!-- Rangée 3 -->
        <StackPanel Grid.Row="3" VerticalAlignment="Center" HorizontalAlignment="Center">
            <CheckBox IsChecked="{Binding ValeurBool}" />
        </StackPanel>
    </Grid>
</UserControl>
```

Dans l'exemple ci-dessous, il y a également des colonnes à taille fixe.

```xaml
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
    <Grid ShowGridLines="true">
        <Grid.RowDefinitions>
            <RowDefinition Height="100" />
            <RowDefinition Height="500" />
            <RowDefinition Height="200" />
        </Grid.RowDefinitions>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="200" />
            <ColumnDefinition Width="600" />
        </Grid.ColumnDefinitions>

        <!-- Rangée 0 Colonne 0 -->
        <StackPanel Grid.Row="0" Grid.Column="0" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World" />
        </StackPanel>

        <!-- Rangée 0  Colonne 1-->
        <StackPanel Grid.Row="0" Grid.Column="1" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="{Binding DateHeure , StringFormat=\{0:d MMMM yyyy HH:mm:ss\}}"/>
        </StackPanel>

        <!-- Rangée 1 Colonne 1-->
        <StackPanel Grid.Row="1" Grid.Column="1" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="{Binding ValeurDecimal, StringFormat=\{0:N3\}}" />
        </StackPanel>

        <!-- Rangée 2 Colonne 2 -->
        <StackPanel Grid.Row="2" Grid.Column="0" VerticalAlignment="Center" HorizontalAlignment="Center">
            <CheckBox IsChecked="{Binding ValeurBool}" />
        </StackPanel>
    </Grid>
</UserControl>
```

### Taille dynamique

La valeur étoile **\*** consiste à prendre toute l'espace disponible sur la hauteur ou la largeur. Si la valeur n'est pas spécifiée, la valeur par défaut est **\***.

```xaml
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
    <Grid ShowGridLines="true">
        <Grid.RowDefinitions>
            <RowDefinition Height="*" />
            <RowDefinition Height="*" />
            <RowDefinition Height="*" />
        </Grid.RowDefinitions>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="*" />
            <ColumnDefinition Width="*"/>
        </Grid.ColumnDefinitions>

        <!-- Rangée 0 Colonne 0 -->
        <StackPanel Grid.Row="0" Grid.Column="0" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World (0,0)" />
        </StackPanel>

        <!-- Rangée 0 Colonne 1 -->
        <StackPanel Grid.Row="0" Grid.Column="1" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World (0,1)" />
        </StackPanel>

        <!-- Rangée 1 Colonne 0 -->

        <StackPanel Grid.Row="1" Grid.Column="0" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World (1,0)" />
        </StackPanel>

        <!-- Rangée 1 Colonne 1 -->
        <StackPanel Grid.Row="1" Grid.Column="1" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World (1,1)" />
        </StackPanel>
    </Grid>
</UserControl>
```

Il est possible de définir des proportions relatives dans la taille.


Il est possible d'utiliser l'étoile **\*** avec un nombre pour représenter une proportion. La fenêtre sera alors **responsive** et la proportion sera respectée.

```xaml
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
    <Grid ShowGridLines="true">
        <Grid.RowDefinitions>
            <RowDefinition Height="1*" />  <!-- 1/8 -->
            <RowDefinition Height="5*" />  <!-- 5/8 -->
            <RowDefinition Height="2*" />  <!-- 2/8 -->
        </Grid.RowDefinitions>
        <Grid.ColumnDefinitions>
            <ColumnDefinition Width="1*" /> <!-- 1/4-->
            <ColumnDefinition Width="3*"/>  <!-- 1/4 -->
        </Grid.ColumnDefinitions>

        <!-- Rangée 0 Colonne 0 -->
        <StackPanel Grid.Row="0" Grid.Column="0" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World (0,0)" />
        </StackPanel>

        <!-- Rangée 0 Colonne 1 -->
        <StackPanel Grid.Row="0" Grid.Column="1" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World (0,1)" />
        </StackPanel>

        <!-- Rangée 1 Colonne 0 -->

        <StackPanel Grid.Row="1" Grid.Column="0" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World (1,0)" />
        </StackPanel>

        <!-- Rangée 1 Colonne 1 -->
        <StackPanel Grid.Row="1" Grid.Column="1" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World (1,1)" />
        </StackPanel>
    </Grid>
</UserControl>
```

### Taille fixe et dynamique

Il est possible de faire une combinaison des 2. Il peut avoir une section fixe pour représenter une barre d'outils, mais le reste de la page doit prendre l'espace disponible.

```xaml
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
    <Grid ShowGridLines="true">
        <Grid.RowDefinitions>
            <RowDefinition Height="50" />
            <RowDefinition Height="*" />
            <RowDefinition Height="100" />
        </Grid.RowDefinitions>        

        <!-- Rangée 0 Fixe à 50 pixels -->
        <StackPanel Grid.Row="0" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World (0)" />
        </StackPanel>

        <!-- Rangée 1 Dynamique -->
        <StackPanel Grid.Row="1" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World (1)" />
        </StackPanel>

        <!-- Rangée 2 Fixe à 100 pixels -->

        <StackPanel Grid.Row="2" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World (2)" />
        </StackPanel>
    </Grid>
</UserControl>
```

### Taille automatique

Il est possible d'avoir une taille automatique. C'est pratique pour avoir une hauteur d'une rangée qui s'adapte à la taille de la fenêtre. Elle devient donc **responsive**.

La valeur **auto** permet de gérer ce comportement.

Dans la vue ci-dessous, la première rangée est automatique. Elle contient une liste de bouton à l'intérieur d'un **\<WrapPanel\>**. Ce composant déplace son contenu en fonction de l'espace disponible. Lorsqu'il a l'intérieur d'une rangée automatique, il est en mesure de prendre plus de hauteur si la largeur est insuffisante. Les boutons vont se déplacer sur plusieurs lignes.

La 2e rangée est dynamique. Elle va prendre l'espace disponible et la 3e rangée est fixe à 10 pixels.

```xaml
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
    <Grid ShowGridLines="true">
        <Grid.RowDefinitions>
            <RowDefinition Height="auto" />
            <RowDefinition Height="*" />
            <RowDefinition Height="50" />
        </Grid.RowDefinitions>

        <!-- Rangée 0 automatique -->
		//highlight-next-line
        <WrapPanel Grid.Row="0" VerticalAlignment="Center" HorizontalAlignment="Center">
            <Button Content="0" Width="30" Height="30" Margin="5"/>
            <Button Content="1" Width="30" Height="30" Margin="5"/>
            <Button Content="2" Width="30" Height="30" Margin="5"/>
            <Button Content="3" Width="30" Height="30" Margin="5"/>
            <Button Content="4" Width="30" Height="30" Margin="5"/>
            <Button Content="5" Width="30" Height="30" Margin="5"/>
            <Button Content="6" Width="30" Height="30" Margin="5"/>
            <Button Content="7" Width="30" Height="30" Margin="5"/>
            <Button Content="8" Width="30" Height="30" Margin="5"/>
            <Button Content="9" Width="30" Height="30" Margin="5"/>            
        </WrapPanel>

        <!-- Rangée 1 Dynamique -->
        <StackPanel Grid.Row="1" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World (1)" />
        </StackPanel>

        <!-- Rangée 2 Fixe à 50 pixels -->

        <StackPanel Grid.Row="2" VerticalAlignment="Center" HorizontalAlignment="Center">
            <TextBlock Text="Hello World (2)" />
        </StackPanel>
    </Grid>
</UserControl>
```

## Commande

Une commande est une action faite par l'utilisateur. Généralement, un bouton est lié à une commande.

Lors de la création de la commande, il faut indiquer la méthode qui effectuera le travail.

La librairie **MVVM ToolKit** fournit l'objet **RelayCommand** qui permet de créer des commandes dynamiquement.

:::warning Attention
L'assignation **set** est privée, car il est préférable que ce soit le **ViewModel** qui s'occupe de la création de la commande et non une classe externe. Le **get** doit être public pour qu'il soit visible par la **Vue**.
:::

Dans l'exemple ci-dessous, il faut créer un bouton pour mettre à jour l'heure.

:::tip
Il est recommandé d'utiliser un verbe d'action pour nommer la commande, mais ce n'est pas toujours possible.
:::

Modifiez la classe **HelloWorldVM.cs**.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.Input;

namespace SuperCarte.WPF.ViewModels
{
    public class HelloWorldVM : BaseVM
    {
        public HelloWorldVM()
        {
            DateHeure = DateTime.Now;           
//highlight-next-line
            RafraichirDateHeureCommande = new RelayCommand(RafraichirDateHeure);
        }

        /// <summary>
        /// Rafraichir la date et l'heure
        /// </summary>
        private void RafraichirDateHeure()
        {
            DateHeure = DateTime.Now;
        }
//highlight-next-line
        public IRelayCommand RafraichirDateHeureCommande { get; private set; }

        public DateTime DateHeure { get; set; }       
    }
}
```

À la ligne 11, il y a la propriété **RafraichirDateHeureCommande** qui sera liée à la propriété **Command** du bouton.

À la ligne 11, la commande est créée avec un **RelayCommand**. La méthode associée à cette commande est **RafraichirDateHeure()**.

Modifiez le fichier **UcHelloWorld.xaml**.

```xaml
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
            <TextBlock Text="{Binding DateHeure , StringFormat=\{0:d MMMM yyyy HH:mm:ss\}}"/>
		//highlight-next-line	
            <Button Content="Rafraichir" Command="{Binding RafraichirDateHeureCommande}"/>
        </StackPanel>
    </Grid>
</UserControl>
```

Le bouton est associé à la commande du **ViewModel** par la propriété **Command**.

```
<Button Content="Rafraichir" Command="{Binding RafraichirDateHeureCommande}"/>
```

Démarrez le programme. Est-ce que c'est fonctionnel ?

La raison que ça ne fonctionne pas est qu'il faut notifier la **Vue** que la propriété a été modifiée. 

En **MVVM**, il n'est pas possible d'utiliser une propriété auto-implémentée (ici DateHeure à la ligne 22 de HelloworldVM.cs) si elle est liée à la vue, car il faut de notifier le changement de valeur. Il faut donc de la logique dans le **set**. Lorsqu'il y a de la logique, il faut utiliser un attribut pour contenir la valeur de la propriété.

Modifiez la classe **HelloWorldVM.cs** par le code ci-dessous.

```csharp
using CommunityToolkit.Mvvm.Input;

namespace SuperCarte.WPF.ViewModels
{
    public class HelloWorldVM : BaseVM
    {
        //Ajout de la déclaration de l'attribut
		//highlight-next-line
        private DateTime _dateTime;

        public HelloWorldVM()
        {
            DateHeure = DateTime.Now;

            RafraichirDateHeureCommande = new RelayCommand(RafraichirDateHeure);
        }

        /// <summary>
        /// Rafraichir la date et l'heure
        /// </summary>
        private void RafraichirDateHeure()
        {
            DateHeure = DateTime.Now;
        }

        public IRelayCommand RafraichirDateHeureCommande { get; private set; }

//highlight-start
        public DateTime DateHeure 
        {
            get
            {
                return _dateTime;
            }
            set
            {
                SetProperty(ref _dateTime, value);
            }
        }
//highlight-end
    }
}
```

La propriété **DateHeure** utilise maintenant un attribut pour conserver la valeur. Lors de l'assignation **set**, la méthode **SetProperty** est utilisée. Cette méthode vérifie s'il y a un changement dans la valeur et si c'est le cas, l'événement  **PropertyChanged** est soulevé.

L'événement provient de l'interface **INotifyPropertyChanged** qui est incluse dans **.NET**. Par contre, la méthode **SetProperty** provient de la librairie **MVVM Toolkit**. Elle est disponible par héritage de la classe **BaseVM** qui hérite de **ObservableObject**.

:::danger Attention
Il est important de ne jamais utiliser l'attribut pour l'assignation d'une valeur, car la mécanique de notification ne fonctionnera pas.
::: 

### Asynchrone

Il est important que les commandes soient exécutées en **asynchrone**, car l'interface visuelle sera bloquée. Pour les opérations qui sont longues, l'interface visuelle ne répondra plus. Il faut un indicateur de progression et que la fenêtre ne soit pas bloquée.

Modifiez la classe **HelloWorldVM.cs**.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.Input;

namespace SuperCarte.WPF.ViewModels
{
    public class HelloWorldVM : BaseVM
    {
        private DateTime _dateTime;

        public HelloWorldVM()
        {
            RafraichirDateHeureCommande = new RelayCommand(RafraichirDateHeure);
        }

        /// <summary>
        /// Rafraichir la date et l'heure
        /// </summary>
        private void RafraichirDateHeure()
        {
            Task.Delay(5000).Wait();
            DateHeure = DateTime.Now;
        }

        public IRelayCommand RafraichirDateHeureCommande { get; private set; }

        public DateTime DateHeure 
        {
            get
            {
                return _dateTime;
            }
            set
            {
                SetProperty(ref _dateTime, value);
            }
        }
    }
}
```

À la ligne 19, il y a un délai artificiel de 5 secondes pour simuler une commande qui a une longue durée d'exécution.

Démarrez l'application et appuyez sur le bouton. Il ne sera pas possible de bouger la fenêtre.

Modifiez de nouveau la classe **HelloWorldVM.cs**.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.Input;

namespace SuperCarte.WPF.ViewModels
{
    public class HelloWorldVM : BaseVM
    {
        private DateTime _dateTime;

        public HelloWorldVM()
        {
	//highlight-next-line
            RafraichirDateHeureCommande = new AsyncRelayCommand(RafraichirDateHeureAsync);
        }

        /// <summary>
        /// Rafraichir la date et l'heure
        /// </summary>
	//highlight-next-line

        private async Task RafraichirDateHeureAsync()
        {
            await Task.Delay(5000);
            DateHeure = DateTime.Now;
        }

	//highlight-next-line
        public IAsyncRelayCommand RafraichirDateHeureCommande { get; set; }

        public DateTime DateHeure 
        {
            get
            {
                return _dateTime;
            }
            set
            {
                SetProperty(ref _dateTime, value);
            }
        }
    }
}
```

La méthode **RafraichirDateHeure()** (ligne 17) a été renommée **RafraichirDateHeureAsync()**. Ce n'est pas obligatoire, mais par convention **C#**, une méthode asynchrone devrait avoir le suffixe **Async**. Son type de retour est **async Task**. 

La commande **RafraichirDateHeureCommande** (ligne 23) est maintenant du type **IAsyncRelayCommand** pour qu'elle soit asynchrone.

Dans le constructeur, la commande est de type **AsyncRelayCommand** (ligne 11).

Exécutez de nouveau le programme. Il sera possible de bouger la fenêtre pendant l'exécution et le bouton ne sera plus accessible également.

### Indicateur de travail
Il pourrait être intéressant de mettre un indicateur de travail.

Modifiez la classe **HelloWorldVM.cs**.

```csharp
using CommunityToolkit.Mvvm.Input;

namespace SuperCarte.WPF.ViewModels
{
    public class HelloWorldVM : BaseVM
    {
        private DateTime _dateTime;
	//highlight-next-line
        private bool _estEnTravail;

        public HelloWorldVM()
        {
            RafraichirDateHeureCommande = new AsyncRelayCommand(RafraichirDateHeureAsync);
        }

        /// <summary>
        /// Rafraichir la date et l'heure
        /// </summary>
        private async Task RafraichirDateHeureAsync()
        {
		//highlight-next-line
            EstEnTravail = true;
            await Task.Delay(5000);
            DateHeure = DateTime.Now;
		//highlight-next-line
            EstEnTravail = false;
        }

        public IAsyncRelayCommand RafraichirDateHeureCommande { get; set; }

        public DateTime DateHeure 
        {
            get
            {
                return _dateTime;
            }
            set
            {
                SetProperty(ref _dateTime, value);
            }
        }
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
    }
}
```

Le **ViewModel** a maintenant une propriété **EstEnTravail** pour indiquer s'il y a une tâche en cours d'exécution.

Modifiez le fichier **UcHelloWorld.xaml** .

```csharp showLineNumbers
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
            <TextBlock Text="{Binding DateHeure , StringFormat=\{0:d MMMM yyyy HH:mm:ss\}}"/>
            <Button Content="Rafraichir" Command="{Binding RafraichirDateHeureCommande}"/>
            <ProgressBar Height="10" IsIndeterminate="{Binding EstEnTravail}" />
        </StackPanel>
    </Grid>
</UserControl>
```

À la ligne 16, il y a une barre de progression. Sa propriété **IsIndeterminate** est liée à la propriété **EstEnTravail** du **ViewModel**. La propriété **IsIndeterminate** permet de faire une barre de progression pour signaler une activité et non par une progression de pourcentage.

### Asynchrone et constructeur

Avez-vous remarqué que la date et heure n'est pas généré en partant l'application. La **Vue** devrait donc générer une date et une heure automatiquement lors de son initialisation.

Le principe suggéré est d'inclure la méthode dans le constructeur. Par contre, il n'est pas possible d'appeler une méthode asynchrone et rester asynchrone à partir du constructeur. Il serait possible de faire une version *synchrone* de la méthode, mais le contrôle ne s'affichera pas tant que le constructeur n'a pas terminé.

```csharp titre="Ne pas utiliser"
public HelloWorldVM()
{
    RafraichirDateHeureAsync();

    RafraichirDateHeureCommande = new AsyncRelayCommand(RafraichirDateHeureAsync);
}
```

La méthode sera exécutée, mais il n'est pas possible d'avoir un **await**, car le constructeur ne peut pas être **async**.

Également, lors de la construction du **ViewModel**, il est préférable qu'il soit entièrement construit avec la **Vue** pour éviter des conflits. Il est préférable que la **Vue** soit prête avant d'exécuter des tâches en **asynchrone**.

Également, le choix d'afficher une date automatiquement lors de l'ouverture peut être un choix de design de la **Vue** et non faire partie de la logique du **ViewModel**.

Dans le **UserControl**, il y a un événement **Loaded** qui est appelé lorsque la **Vue** est complètement chargée.

Cet événement va appeler la commande qu'il faut exécuter.

Dans le fichier **UcHelloWorld.xaml**, il faut ajouter la ligne 12 pour assigner l'événement.

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
             d:DesignHeight="450" d:DesignWidth="800"
//highlight-next-line			 
             Loaded="UserControl_Loaded">
    <Grid>
        <StackPanel VerticalAlignment="Center" HorizontalAlignment="Center">            
            <TextBlock Text="{Binding DateHeure , StringFormat=\{0:d MMMM yyyy HH:mm:ss\}}"/>
            <Button Content="Rafraichir" Command="{Binding RafraichirDateHeureCommande}"/>
            <ProgressBar Height="10" IsIndeterminate="{Binding EstEnTravail}" />
        </StackPanel>
    </Grid>
</UserControl>
```

Dans le fichier **UcHelloWorld.xaml.cs**, il faut ajouter le code de l'événement. Si l'événement est autogénéré, il faut ajouter le **async**.

Il y a les vérifications d'usage pour s'assurer que le type du contexte est le bon.

Ensuite, il faut appeler la commande qu'il faut automatiser.

Ajoutez cette fonction dans **UcHelloWorld.xaml.cs**

```csharp 
private async void UserControl_Loaded(object sender, RoutedEventArgs e)
{
    if(DataContext != null)
    {
        if(DataContext is HelloWorldVM)
        {
            await ((HelloWorldVM)DataContext).RafraichirDateHeureCommande.ExecuteAsync(null);
        }
    }
}
```

## Champ texte numérique

Il n'existe pas de contrôle qui accepte seulement les nombres avec **WPF**. Les développeurs peuvent acheter des librairies de composants comme **DevExpress** et **Telerik** pour avoir des composants avancés. Il est possible de faire une version simple soi-même, mais elle est limitée.

Ajoutez la propriété **int Nombre** dans le **ViewModel**. 

Liez la propriété **Nombre** à un **\<Textbox\>**.

```xaml
<TextBox Text="{Binding Nombre}" />
```

Démarrez le programme. Si vous essayez d'inscrire une lettre, elle s'affichera, mais le contrôle sera en rouge pour indiquer que la valeur n'est pas compatible avec le type de la propriété de liaison.

Pour permettre seulement les chiffres, il faut modifier des événements sur le  **\<Textbox\>** pour être en mesure de le faire. L'exemple provient d'une suggestion de **StackOverflow**. https://stackoverflow.com/questions/1268552/how-do-i-get-a-textbox-to-only-accept-numeric-input-in-wpf

L'événement **PreviewTextInput** permet d'analyser la valeur des caractères qui sont inscrits dans le composant. Généralement, c'est un seul caractère, mais il est possible d'en recevoir plusieurs d'un coup.

Il faut également intercepter l'action **coller**. L'événement **DataObject.Pasting** permet d'intercepter l'action **coller**.

Dans le **xaml**, il faut créer les 2 événements.

```xaml
<TextBox Text="{Binding Nombre}" PreviewTextInput="TextBox_PreviewTextInput" DataObject.Pasting="TextBox_Pasting"  />
```

Dans le **xaml.cs**, il faut faire l'implémentation de l'événement. L'implémentation ne se fait pas dans le **ViewModel**, car c'est un comportement directement lié à la vue. Le **ViewModel** veut recevoir un nombre, il ne s'intéresse pas comment la vue s'en occupe.

Pour l'événement **PreviewTextInput**, il est possible d'utiliser une règle **Regex** pour déterminer si la chaine contient uniquement des chiffres.

La propriété **e.Handled == false**  indique que l'événement peut continuer son exécution. Si **e.Handled == true**, l'événement est annulé.

Donc si la chaine n'a pas de chiffre, elle fait annuler l'événement.

```csharp
private void TextBox_PreviewTextInput(object sender, TextCompositionEventArgs e)
{
    e.Handled = !Regex.IsMatch(e.Text, "^[0-9]");
}
```

Pour l'événement **DataObject.Pasting**, il y a un peu plus d'étapes.

Il faut valider si le contenu du **coller** est du texte. Si c'est le cas, il faut valider à l'aide d'une règle **Regex** si ce sont que des chiffres. Si ce n'est pas le cas, il faut annuler le **coller**.

```csharp
private void TextBox_Pasting(object sender, DataObjectPastingEventArgs e)
{
    if (e.DataObject.GetDataPresent(typeof(String)))
    {
        String text = (String)e.DataObject.GetData(typeof(String));
        if (!Regex.IsMatch(text, "^[0-9]"))
        {
            e.CancelCommand();
        }
    }
    else
    {
        e.CancelCommand();
    }
}
```

Si la propriété liée est de type **int?**, donc elle est **nullable**. Le **\<textbox\>** n'acceptera pas le champ vide comme valeur **null**. Il faut ajouter la propriété **TargetNullValue=''** dans le **Binding**. Donc la valeur **null**  de la liaison équivaut à une chaine vide du **\<Textbox\>**.

```xaml
<TextBox Text="{Binding Nombre, TargetNullValue=''}" PreviewTextInput="TextBox_PreviewTextInput" DataObject.Pasting="TextBox_Pasting"  />
```

Si le nombre est un **decimal**, il faut utiliser la **Regex** ci-dessous. L'événement **PreviewTextInput** valide uniquement le caractère inscrit et non l'entièreté du nombre. Il est donc possible d'inscrire **12,,,,564,10**. Les composants payants n'ont pas ce genre de problème.

```csharp
"^[0-9.]+" //Anglais, car le séparateur est un point
"^[0-9,]+" //Français, car le séparateur est une virgule
```

Pour le rendre indépendant de la culture, il faut déterminer quel est le séparateur de la culture en cours d'exécution.

```csharp
string separateur = NumberFormatInfo.CurrentInfo.NumberDecimalSeparator;
string regex = $"^[0-9{separateur}]+");
```

S'il faut avoir un nombre négatif.

```csharp
string separateur = NumberFormatInfo.CurrentInfo.NumberDecimalSeparator;
string decregex = $"^[0-9{separateur}-]+"); //decimal négatif
string intregex = "^[0-9-]"; //int négatif
```

### Sélection d'une date

Le composant **\<DatePicker\>** permet d'avoir un contrôle de sélection d'une date.

```xaml
<DatePicker SelectedDate="{Binding MaDate}" />
```

## Liste des catégories

La première interface utilisateur à effectuer sera de lister les enregistrements de la table **Catégorie**.

L'approche des couches **bas vers le haut** sera utilisée pour réaliser cette fenêtre.

La liste sera un **DataGrid**. Il faut afficher à l'utilisateur la clé, le nom et la description dans la grille.

### Projet SuperCarte.EF

### Ajout des données par Seed

Les tables **Categorie**, **Ensemble** et **Cartes** ne contiennent pas de données. Il faut donc créer une nouvelle migration qui contient ce nouveau **Seed**.

Dans la méthode **Seed()** de la classe **SuperCarteContext**, il faut ajouter les données. Il est important de ne pas supprimer les données existantes, car la migration va voir qu'ils ne sont plus là, donc qu'il faut les supprimer.

Pour ajouter des données, il faut créer un tableau qui contient les objets et l'ajouter à l'entité avec la méthode **HasData**.

Pour les catégories.

```csharp
Categorie[] categories =
{
    new Categorie()
    {
        CategorieId = 1,
        Nom = "Animaux magiques",
        Description = null
    },
    new Categorie()
    {
        CategorieId = 2,
        Nom = "Orcs",
        Description = "Les orcs sont une race de guerrier."
    },
    new Categorie()
    {
        CategorieId = 3,
        Nom = "Mages",
        Description = "Les mages ont des pouvoirs magiques."
    }
};

modelBuilder.Entity<Categorie>().HasData(categories);
```

Pour l'ensemble.

```csharp
Ensemble[] ensembles =
{
    new Ensemble()
    {
        EnsembleId = 1,
        Nom = "Ensemble de départ",
        Disponibilite = new DateTime(2020,5,12)
    }
};

modelBuilder.Entity<Ensemble>().HasData(ensembles);
```

Pour les cartes. Il est voulu de ne pas avoir de cartes pour la catégorie 3.

```csharp
Carte[] cartes =
{
    new Carte()
    {
        CarteId = 1,
        Nom = "Lion des marais",
        Armure = 0,
        Vie = 12,
        Attaque = 2,
        EstRare = false,
        PrixRevente = 0.02m,
        CategorieId = 1,
        EnsembleId = 1
    },
    new Carte()
    {
        CarteId = 2,
        Nom = "Corbeau vampire",
        Armure = 0,
        Vie = 2,
        Attaque = 12,
        EstRare = true,
        PrixRevente = 1.20m,
        CategorieId = 1,
        EnsembleId = 1
    },
    new Carte()
    {
        CarteId = 3,
        Nom = "Grunty",
        Armure = 5,
        Vie = 25,
        Attaque = 5,
        EstRare = false,
        PrixRevente = 0.20m,
        CategorieId = 2,
        EnsembleId = 1
    }
};
        
modelBuilder.Entity<Carte>().HasData(cartes);
```

Voici la méthode au complet.

```csharp
private void Seed(ModelBuilder modelBuilder)
{
    //Les données à ajouter
    Role[] roles = 
    {
        new Role() 
        { 
            RoleId = 1,
            Nom = "Administrateur"                
        },
        new Role()
        {
            RoleId = 2,
            Nom = "Utilisateur"
        },
    };

    Utilisateur[] utilisateurs =
    {
        new Utilisateur()
        {
            UtilisateurId = 1,
            Prenom = "François",
            Nom = "St-Hilaire",
            NomUtilisateur = "fsthilaire",
            MotPasseHash = "$2y$11$IY6NG9FkTSI1dnjLfSbuOuNkuyI7IZHxHSOD5Td6AlwvroUz/vzLK", //Native3! avec Bcrypt
            RoleId = 1 //Admin
        },
        new Utilisateur()
        {
            UtilisateurId = 2,
            Prenom = "Benoit",
            Nom = "Tremblay",
            NomUtilisateur = "btremblay",
            MotPasseHash = "$2y$11$ewK3YsMGQ1IMKEzJUAjyVe0P19I0gEbTO998mwfVbSSA8nZ6MG/ha", //Web4MVC! avec Bcrypt
            RoleId = 2 //Utilisateur
        },
        new Utilisateur() 
        {
            UtilisateurId = 3,
            Prenom = "Tony",
            Nom = "Stark",
            NomUtilisateur = "tstark",
            MotPasseHash = "$2y$11$VfcNowkWResPQKl0AA3MJ.w1LXBqmMM77YKlyf32Glr9TWG4xxyD2", //#NotAdmin! avec Bcrypt
            RoleId = 2 //Utilisateur
        }
    };

    Categorie[] categories =
    {
        new Categorie()
        {
            CategorieId = 1,
            Nom = "Animaux magiques",
            Description = null
        },
        new Categorie()
        {
            CategorieId = 2,
            Nom = "Orcs",
            Description = "Les orcs sont une race de guerrier."
        },
        new Categorie()
        {
            CategorieId = 3,
            Nom = "Mages",
            Description = "Les mages ont des pouvoirs magiques."
        }
    };

    Ensemble[] ensembles =
    {
        new Ensemble()
        {
            EnsembleId = 1,
            Nom = "Ensemble de départ",
            Disponibilite = new DateTime(2020,5,12)
        }
    };

    Carte[] cartes =
    {
        new Carte()
        {
            CarteId = 1,
            Nom = "Lion des marais",
            Armure = 0,
            Vie = 12,
            Attaque = 2,
            EstRare = false,
            PrixRevente = 0.02m,
            CategorieId = 1,
            EnsembleId = 1
        },
        new Carte()
        {
            CarteId = 2,
            Nom = "Corbeau vampire",
            Armure = 0,
            Vie = 2,
            Attaque = 12,
            EstRare = true,
            PrixRevente = 1.20m,
            CategorieId = 1,
            EnsembleId = 1
        },
        new Carte()
        {
            CarteId = 3,
            Nom = "Grunty",
            Armure = 5,
            Vie = 25,
            Attaque = 5,
            EstRare = false,
            PrixRevente = 0.20m,
            CategorieId = 2,
            EnsembleId = 1
        }
    };

    //Ajout dans les tables
    modelBuilder.Entity<Role>().HasData(roles);
    modelBuilder.Entity<Utilisateur>().HasData(utilisateurs);
    modelBuilder.Entity<Categorie>().HasData(categories);
    modelBuilder.Entity<Ensemble>().HasData(ensembles);
    modelBuilder.Entity<Carte>().HasData(cartes);
}
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

Ensuite, il faut créer la migration **Seed_Carte** avec **Add-Migration**.

```
Add-Migration Seed_Carte -StartupProject SuperCarte.EF
```

Appliquez les modifications à la base de données. Spécifiez la migration **Seed_Carte**.

```powershell
Update-Database -StartupProject SuperCarte.EF -Migration Seed_Carte
```

### Projet SuperCarte.Code

#### Création du modèle du domaine - EnsembleModel

Dans le projet **SuperCarte.Core**, il faut créer la classe **CategorieModel.cs** dans le dossier **Models**.

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

La classe contient les 3 propriétés nécessaires pour effectuer des actions dans le logiciel.

#### Création de la classe d'extension - CategorieMapExtensions

Les extensions seront associées au modèle de données. Que la conversion s'effectue de **Modèle de données -> Modèle du domaine** ou à l'inverse **Modèle du domaine -> Modèle de données**, elles seront dans la classe d'extension du **Modèle de données**.

Il faut faire la méthode qui récupèrera la liste de **Categorie** et la convertir en **CategorieModel**. 

Il y a également la version pour les **List\<\>**. **Linq** est utilisé pour transformer la liste au lieu d'utiliser une boucle.

Créez la classe **CategorieMapExtensions.cs**.

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
    /// Convertir un objet Categorie vers un objet CategotieModel
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

#### Création du service - CategorieService

Il faut créer la classe qui s'occupera de la logique du modèle **Catégorie**.

Créez la classe **ICategorieService.cs** dans le dossier **Services**.

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
    Task<List<CategorieModel>> ObtenirListeAsync();
}
```

Remarquez que la méthode a le suffixe **Async** et le type de retour un **Task\<CategorieModel\>**, car elle sera implémentée en asynchrone. 

Est-ce nécessaire de faire également la version **synchrone** ? C'est un choix de conception. Il y en a qui préfère de couvrir les 2 cas en même temps et d'autres de seulement créer la version qui sera nécessaire. Pour ce travail et le **TP 3**, il faudra créer uniquement celles qui sont nécessaires. Lorsqu'une méthode est créée, elle doit généralement être testée. Si elle n'est pas utilisée dans le programme, il faudra tout de même la tester. Il y a un coût pour  la réalisation des tests, donc si une méthode n'est pas nécessaire, il est préférable de ne pas l'écrire. C'est l'approche **YAGNI (You ain't gonna need it)** ou en français **(Vous n'en aurez pas besoin**).

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

Remarquez la méthode **ObtenirListeAsync()**. Elle a le mot-clé **async** pour indiquer qu'elle fonctionne en asynchrone.

##### Théorie sur le `async Task`

Pour comprendre un peu le fonctionnement de la combinaison **async Task** , voici des exemples de code. **Veuillez ne pas les reproduire.**

Pour être en mesure d'utiliser une méthode **asynchrone**, il faut que la chaine soit complètement en **asynchrone**. Il est important qu'une méthode qui est **async** appelle des méthodes **async**, sinon le lien sera brisé et il aura un avertissement du compilateur.

Lorsqu'on appelle une méthode **async**, elle doit retourner une **tâche** de type **Task**.

En réalité, la méthode crée une tâche dans un nouveau processus. La tâche exécute la méthode sous-jacente pour faire le travail.

Dans l'exemple ci-dessous, la tâche s'exécute dans un nouveau processus et le processus courant continue à effectuer les opérations 1, 2.... Les 2 processus s'exécutent en parallèle. Lorsqu'il arrive au **return**, ça ne veut pas dire que la sous-tâche est terminée. **Il va donc avoir une exception.**

```csharp
Task<List<Categorie>> task = _categorieRepo.ObtenirListeAsync();

//Operation 1

//Operation 2

//Operation 3

return task.Result.VersCategorieModel();
```

Il faut être en mesure de récupérer la valeur de la sous-méthode. Pour pouvoir le faire, il faut attendre le processus avant de récupérer sa valeur.

II est possible de travailler en parallèle. La sous-tâche s'exécute et les autres opérations se poursuivent.

À un certain moment dans le processus parent, il faut attendre la sous-tâche pour s'assurer qu'elle soit terminée.

Dans l'exemple ci-dessous, l'opération 1 et 2 s'exécute en parallèle et avant d'exécuter l'opération 3, il faut que la sous-tâche soit terminée.

```
Task<List<Categorie>> task = _categorieRepo.ObtenirListeAsync();

//Operation 1

//Operation 2

task.Wait(); //On attend que la sous-tâche soit terminée.

//Operation 3

return task.Result.VersCategorieModel();
```

Par contre, il faut s'assurer que les autres opérations n'entrent pas en conflit et sont **Thread Safe**. Une instance de contexte n'est pas **Thread Safe**. Un seul processus peut utiliser une instance de contexte à la fois.

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

//Équivalent
return (await _categorieRepo.ObtenirListeAsync()).VersCategorieModel();
```

Remarquez également que le **await** est entre parenthèses avant d'utiliser l'extension.

Il n'est pas possible de faire ceci, car **_categorieRepo.ObtenirListeAsync()** retourne un objet **Task\<List\<Categorie\>\<** et non un objet **List\<Categorie\>**. La méthode d'extension est disponible sur le type **List\<Categorie\>**.

```
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

### Projet SuperCarte.WPF

#### Enregistrement du service - SCServiceExtensions

Il faut enregistrer le **Service** dans la classe **SCServiceExtensions**.

```csharp
public static void EnregistrerServices(this IServiceCollection services)
{
    services.AddScoped<ICategorieService, CategorieService>();
}
```

Le service est également enregistré en **Scoped** pour permettre d'utiliser la même instance dans le programme dans le même **scope**.

#### Ajout de références dans Usings.cs

Ajoutez les 5 références ci-dessous dans le fichier **Usings.cs**.

```csharp
global using SuperCarte.Core.Services;
global using SuperCarte.Core.Models;
global using SuperCarte.WPF.ViewModels;
global using SuperCarte.WPF.ViewModels.Bases;
```

#### Création du ViewModel - ListeCategoriesVM

Le **CategorieService** est maintenant créé, il faut maintenant créer le **ViewModel**.

Créez la classe **ListeCategoriesVM.cs** dans le dossier **ViewModels**. La classe au complet est à la fin de la section.

Premièrement, il faut définir les éléments que la **Vue** a besoin de connaitre pour fonctionner.

Pour la liste des catégories, il faut une **List\<CategorieModel\>**. Cette liste sera affichée à l'utilisateur. Le choix de comment l'afficher sera dans la vue.

Il faut également la propriété pour connaitre la catégorie qui est sélectionnée dans la liste.

En **MVVM**, il n'est pas possible d'utiliser une propriété auto-implémentée si elle est liée à la vue, car il faut de notifier le changement de valeur. Il faut donc de la logique dans le **set**. Lorsqu'il y a de la logique, il faut utiliser un attribut pour contenir la valeur de la propriété.

```csharp
public class ListeCategoriesVM : BaseVM
{
	//Attributs des propriétés
    private List<CategorieModel> _lstCategories;
    private CategorieModel? _categorieSelection;
    
    //Propriétés liées
    public List<CategorieModel> ListeCategories
    {
        get
        { 
            return _lstCategories; 
        }
        set
        {
            //Assigne la propriété
            //S'il y a un changement, l'événement OnPropertyChanged sera soulevé automatiquement
            SetProperty(ref _lstCategories, value);
        }            
    }
    
    public CategorieModel? CategorieSelection
    {
        get
        {
            return _categorieSelection;
        }
        set
        {
			SetProperty(ref _categorieSelection, value);
        }
    }
}
```

Ensuite, il faut injecter les dépendances, car les catégories seront obtenues par le service.

```csharp
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
    private CategorieModel? _categorieSelection;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="categorieService">Service du modèle Categorie</param>
	public ListeCategoriesVM(ICategorieService categorieService)
	{
        _categorieService = categorieService;
    }

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
    
    public CategorieModel? CategorieSelection
    {
        get
        {
            return _categorieSelection;
        }
        set
        {
			SetProperty(ref _categorieSelection, value);
        }
    }
}
```

Ensuite, il faut penser aux commandes. La liste doit se rafraichir. Cette commande doit être **asynchrone**. Cette commande se nomme **ObtenirListeCommande**.

La propriété de la commande est à la ligne 36. Les commandes doivent avoir le suffixe **Commande**. La commande doit utiliser un verbe d'action dans la mesure du possible.

La méthode que la commande utilise est à la ligne 30. Par convention, la méthode doit avoir le même nom que la commande dans le suffixe.

À la ligne 24, la commande est créée dans le constructeur.

Il est important d'assigner la liste par la propriété et jamais par l'attribut. Car la propriété contient la mécanique de notification.

```csharp
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
    private CategorieModel? _categorieSelection;

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
        ListeCategories = await _categorieService.ObtenirListeAsync();
    }

    //Commandes
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
    
    public CategorieModel? CategorieSelection
    {
        get
        {
            return _categorieSelection;
        }
        set
        {
			SetProperty(ref _categorieSelection, value);
        }
    }
}
```

#### Enregistrer le ViewModel - SCViewModelExtensions

Dans la classe **SCViewModelExtensions**, il faut enregistrer le **ViewModel**.

```csharp
public static void EnregistrerViewModels(this IServiceCollection services)
{
    services.AddTransient<MainWindowVM>();
    services.AddTransient<ListeCategoriesVM>();
}
```

#### Création de la vue - UcListeCategories.xaml

Créez un **Contrôle utilisateur (WPF)** nommé **UcListeCategories.xaml** dans le dossier **Views**. Le modèle se retrouve dans la section **WPF** à gauche.

Toutes les **Vues** seront du type  **Contrôle utilisateur (WPF)**.

La première étape consiste à indiquer le **ViewModel** qui sera utilisé. Ce n'est pas obligatoire, mais en ajoutant les lignes 7 et 8 ci-dessous, il sera possible d'avoir des suggestions lors du **Binding**.

```xaml
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

    </Grid>
</UserControl>

```

La deuxième étape consiste à créer une disposition. La vue aura 4 rangées. 

La première rangée (0) contiendra le titre de la vue. L'hauteur est automatique.

La deuxième rangée (1) contiendra la liste des boutons **Nouveau**, **Édition**, **Supprimer** et **Rafraichir**. La hauteur est automatique.

La troisième rangée (2) contiendra le **DataGrid**. La hauteur est **`*`**. Elle va prendre tout l'espace restant de la vue.

La quatrième rangée (3) contiendra la barre de chargement.

```xaml
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
        <Grid.RowDefinitions>
            <RowDefinition Height="auto" /> <!--Rangée 0 -->
            <RowDefinition Height="auto" /> <!--Rangée 1 -->
            <RowDefinition Height="*" />  <!--Rangée 2 -->
            <RowDefinition Height="20" /> <!--Rangée 3-->   
        </Grid.RowDefinitions>                   
        
    </Grid>
</UserControl>
```

Ensuite, il faut créer le titre. Le composant **\<TextBloc\>** sera utilisé. Se composant permet d'afficher du texte facilement.

Il prend tout l'espace disponible, donc en le centrant verticalement et horizontalement, il restera toujours en centre en fonction de la grosseur de la fenêtre.

```xaml
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

        <!--Rangée 2-->

        <!--Rangée 3-->
        
    </Grid>
</UserControl>

```

Ensuite, il faut ajouter les boutons dans un **StackPanel**. Il est important de spécifier la rangée de la grille où elle doit se positionner.

Contrairement au **\<div\>** en **HTML**, le système de **Grid** n'a pas de balise encapsulée. Il faut spécifier l'emplacement avec la propriété **Grid.Row**. L'ajout de commentaires permet de mieux voir la séparation des composants dans le **Grid**.

Le contenu à l'intérieur du **StackPanel** se positionne un à la suite de l'autre. Il n'est pas nécessaire de spécifier des coordonnées spécifiques. Il est important de spécifier une taille et une marge, sinon les boutons prendront tous l'espace disponible et ils seront collés.

À la ligne 36, le bouton **Rafraichir** est lié à la commande **ObtenirListeCommande**. 

Si les lignes 7 et 8 ne sont pas inscrites, il n'y aura pas d'autosuggestion après **\{Binding** Le risque de se tromper est plus grand.

```xaml
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
                    Command="{Binding ObtenirListeCommande}"/>
        </WrapPanel>

        <!--Rangée 2-->

        <!--Rangée 3-->
        
    </Grid>
</UserControl>

```

Ensuite, il faut ajouter le **DataGrid**. Le **DataGrid** peut autogénéré les colonnes en fonction des propriétés. 

Par contre, il ne sera pas possible de faire des ajustements si ce mode est activé. À la ligne 44 du code ci-dessous, la propriété **AutoGenerateColumns=false** désactive ce mode.

La propriété **SelectionMode="Single" ** permet de sélectionner une seule ligne à la fois.

La propriété **IsReadOnly="True"** rend la grille non éditable. Il est possible d'avoir des designs qui permettent de modifier des valeurs directement dans une grille et de sauvegarder l'ensemble.

La propriété **ItemsSource="\{Binding ListeCategories\}"** indique la propriété du **ViewModel** qui contient la source des données. Si les lignes 7 et 8 ne sont pas inscrites, il n'y aura pas d'autosuggestion après **\{Binding ** Le risque de se tromper est plus grand.

La propriété **SelectedItem="\{Binding CategorieSelection\}"** permet d'indiquer la propriété qui aura la référence de la propriété sélectionnée.

Il faut ensuite déclarer les colonnes.

Toutes les colonnes sont du texte, car même le **Id** sera transformé en texte. Elles sont toutes du type **\<DataGridTextColumn\>**. 

La propriété **Header** est pour le nom de la colonne. La propriété **Binding** est pour indiquer la propriété à utiliser dans la classe **CategorieModel**. Il n'est pas obligatoire de créer systématiquement une colonne par propriété. La clé pourrait être masquée à l'utilisateur. L'autosuggestion provient du type du **binding** du **DataGrid**  **ItemsSource="\{Binding ListeCategories\}"**. 

À la ligne 61, la largeur de la colonne est ** Width="*"**, ce qui indique qu'elle prendra l'espace restant. Si l'espace restant est plus petit que 300, la colonne restera à 300, car la propriété **MinWidth="300"** (ligne 60).

```xaml
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
        
        <!--Rangée 3-->

    </Grid>
</UserControl>

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
    </Window.Resources>
    <Grid>
        <ContentControl Content="{Binding VMActif}" />
    </Grid>
</Window>
```

La ligne 19 à 21 indique que lorsque le **DataContext** est de type **ListeCategoriesVM** (ligne 19), il faut utiliser le contrôle utilisateur **UcListeCategories** (ligne 20).

À la ligne 24, lorsque le **Content** du **ContentControl** sera un **ViewModel** de la liste des ressources, il chargera le contrôle utilisateur correspondant.

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
        VMActif = serviceProvider.GetRequiredService<ListeCategoriesVM>();
    }

    public BaseVM VMActif { get; set; }    
}
```

Démarrez l'application. Appuyez sur le bouton **R** et la liste s'affichera dans le **DataGrid**.

#### Chargement automatique

Il est plus intéressant pour l'utilisateur d'avoir un chargement automatique pour ce type de vue.

Il faut implémenter l'événement **Loaded** de la vue et appeler la commande **ObtenirListeCommande**.

Dans le fichier **UcListeCategories.xaml**. 

À la ligne 11, il y a la déclaration de l'événement.

```xaml
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
        <!--Rangée 2-->

    </Grid>
</UserControl>
```

Dans le fichier **UcListeCategories.xaml.cs**. 

À la ligne 27, il y a l'implémentation de la méthode associée à l'événement. Elle doit être **async**.

Ensuite, il y a les vérifications que le **DataContext** existe et qu'il est un **ListeCategoriesVM**.

La commande est exécutée an **asynchrone**. Le **await** est très important pour indiquer à la fenêtre qu'elle est en cours de travail.

```csharp
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

#### Barre d'activité

Il serait intéressant d'ajouter une barre d'activité pour indiquer à l'utilisateur qu'il y a du travail en cours d'exécution.

Modifiez la classe **ListeCategoriesVM**.

Il faut ajouter une propriété **EstEnTravail**(ligne 45) et son attribut **_estEnTravail** (ligne 15).

Dans la méthode **ObtenirListeAsync()**, la propriété **EstEnTravail** est mise à jour au début (ligne 33) et à la fin (ligne 38). 

Le délai artificiel est toujours dans la méthode à la ligne 36.

```csharp
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
        EstEnTravail = true;

        ListeCategories = await _categorieService.ObtenirListeAsync();
        await Task.Delay(5000);

        EstEnTravail = false;
    }

    //Commandes
    public IAsyncRelayCommand ObtenirListeCommande { get; set; }

    //Propriétés liées
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

```xaml
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
        
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />
    </Grid>
</UserControl>
```

Démarrez le programme et la barre sera en activité en pendant un peu plus de 5 secondes .

Vous pouvez retirer le délai artificiel.

## Supprimer une catégorie

Pour être en mesure de supprimer un élément d'une liste, il faut au préalable vérifier les dépendances.

Car, si une carte utilise la catégorie, il ne faut pas qu'il soit possible de supprimer la catégorie.

Il faut ajouter de nouvelles fonctionnalités dans le **Repository** et dans le **Service**.

Ce sera la même technique utilisée pour le **TP 2**.

### SuperCarte.Core

#### Créez le modèle de dépendance - CategorieDependance

Créez la classe **CategorieDependance.cs**, dans le dossier **Models** du projet **SuperCarte.Core**.

```csharp
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient le nombre de dépendances pour une catégorie
/// </summary>
public class CategorieDependance
{
    public int CategorieId { get; init; }
    public int NbCartes { get; init; }
}
```

S'il avait d'autres tables qui utiliseraient **Categorie** comme clé étrangère, il faudrait ajouter les autres **Nb[Table]**.

La classe a également la clé primaire correspondant.

Le mot clé **init** sert à indiquer qu'il n'est pas possible de modifier la valeur après la construction de l'objet.

#### Ajouter la requête dans le Repository - CategorieRepo

Il s'agit d'une requête spécifique. Elle pourrait être généralisée en utilisant de la réflexion, mais pour conserver le projet plus facile à comprendre, ce sera une requête explicite.

Dans l'interface **ICategorieRepo**, il faut ajouter la méthode **ObtenirDependanceAsync** et **ObtenirDependance**.

Les deux versions (asynchrone et synchrone) sont ajoutées, car les 2 seront nécessaires. Si seulement une version était nécessaire, il ne serait pas nécessaire d'ajouter les 2.

```csharp
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Interface qui contient les méthodes de communication avec la base de données pour la table Categorie
/// </summary>
public interface ICategorieRepo : IBasePKUniqueRepo<Categorie, int>
{
    /// <summary>
    /// Obtenir les dépendances d'une catégorie en asynchrone.
    /// </summary>
    /// <param name="categorieId">Clé primaire de la catégorie/param>
    /// <returns>Les dépendances ou null si la catégorie n'est pas trouvée</returns>
    Task<CategorieDependance?> ObtenirDependanceAsync(int categorieId);
    
    /// <summary>
    /// Obtenir les dépendances d'une catégorie.
    /// </summary>
    /// <param name="categorieId">Clé primaire de la catégorie/param>
    /// <returns>Les dépendances ou null si la catégorie n'est pas trouvée</returns>
    CategorieDependance? ObtenirDependance(int categorieId);
}
```

Ajoutez l'implémentation de la méthode dans la classe **CategorieRepo**.

```csharp
using Microsoft.EntityFrameworkCore;
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;
using SuperCarte.EF.Data.Context;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Classe qui contient les méthodes de communication avec la base de données pour la table Categorie
/// </summary>
public class CategorieRepo : BasePKUniqueRepo<Categorie, int>, ICategorieRepo
{
    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="bd">Contexte de la base de données</param>
    public CategorieRepo(SuperCarteContext bd) : base(bd)
    {
        //Vide, il sert uniquement a recevoir le contexte et à l'envoyer à la classe parent.
    }

    public async Task<CategorieDependance?> ObtenirDependanceAsync(int categorieId)
    {
        return await (from lqCategorie in _bd.CategorieTb
                      where
                          lqCategorie.CategorieId == categorieId
                      select
                          new CategorieDependance()
                          {
                              CategorieId = lqCategorie.CategorieId,
                              NbCartes = lqCategorie.CarteListe.Count()
                          }).FirstOrDefaultAsync();
    }

    public CategorieDependance? ObtenirDependance(int categorieId)
    {
        return (from lqCategorie in _bd.CategorieTb
                where
                    lqCategorie.CategorieId == categorieId
                select
                    new CategorieDependance()
                    {
                        CategorieId = lqCategorie.CategorieId,
                        NbCartes = lqCategorie.CarteListe.Count()
                    }).FirstOrDefault();
    }
}
```

#### Ajouter dans le service - CategorieService

Il faut ajouter la méthode de suppression et d'obtention des dépendances dans le service.

Modifiez l'interface **ICategorieService.cs**. Il y a seulement la version **synchrone** de **ObtenirDependance** et la version **asynchrone** de **SupprimerAsync**.

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
    Task<List<CategorieModel>> ObtenirListeAsync();    

    /// <summary>
    /// Obtenir les dépendances d'une catégorie.
    /// </summary>
    /// <param name="categorieId">Clé primaire de la catégorie</param>
    /// <returns>Les dépendances ou null si la catégorie n'est pas trouvée</returns>
    CategorieDependance? ObtenirDependance(int categorieId);

    /// <summary>
    /// Supprimer une catégorie en asynchrone.
    /// </summary>    
    /// <param name="categorieId">Clé primaire de la catégorie</param>    
    Task SupprimerAsync(int categorieId);
}
```

Modifiez la classe **CategorieService.cs**.

```csharp
using SuperCarte.Core.Extensions;
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;
using SuperCarte.EF.Data;

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

    public CategorieDependance? ObtenirDependance(int categorieId)
    {
        return _categorieRepo.ObtenirDependance(categorieId);
    }

    public async Task SupprimerAsync(int categorieId)
    {
        CategorieDependance? categorieDependance = await _categorieRepo.ObtenirDependanceAsync(categorieId);

        if(categorieDependance != null)
        {
            if(categorieDependance.NbCartes == 0)
            {
                await _categorieRepo.SupprimerParCleAsync(categorieId, true);
            }
            else
            {
                throw new Exception("La catégorie a des dépendances. Impossible à supprimer.");
            }
        }
        else
        {
            throw new Exception("La catégorie n'existe pas dans la base de données.");
        }
    }
}
```

La méthode **SupprimerAsync** s'assure qu'il est possible d'effectuer la suppression, sinon elle génère des exceptions.

### SuperCarte.WPF

#### Ajouter la commande dans le ViewModel - ListeCartesVM

Il faut ajouter une nouvelle commande **SupprimerCommande** dans le **ViewModel**.

Dans une commande, il est possible d'ajouter une logique pour indiquer s'il est possible ou non de l'exécuter. Dans ce cas-ci, il y a 2 conditions.

Premièrement, il doit avoir une catégorie sélectionnée dans le **DataGrid**. Deuxièmement, la catégorie ne doit pas avoir de dépendance. 

À chaque fois que la sélection sera modifiée, il faudra appliquer la logique si la commande supprimée peut s'appliquer.

Modifiez la classe **ListeCartesVM** par le code ci-dessous.

```csharp
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
    private bool _estEnTravail = false;
    private CategorieModel? _categorieSelection;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="categorieService">Service du modèle Categorie</param>
	public ListeCategoriesVM(ICategorieService categorieService)
    {
        _categorieService = categorieService;

        ObtenirListeCommande = new AsyncRelayCommand(ObtenirListeAsync);
        SupprimerCommande = new AsyncRelayCommand(SupprimerAsync, PeutSupprimer);
    }

    /// <summary>
    /// Obtenir la liste de catégories du service
    /// </summary>    
    private async Task ObtenirListeAsync()
    {
        EstEnTravail = true;

        ListeCategories = await _categorieService.ObtenirListeAsync();        

        EstEnTravail = false;
    }

    /// <summary>
    /// Supprimer la catégorie sélectionnée
    /// </summary>    
    private async Task SupprimerAsync()
    {
        EstEnTravail = true;

        await _categorieService.SupprimerAsync(CategorieSelection!.CategorieId);

        await ObtenirListeAsync();

        EstEnTravail = false;
    }

    /// <summary>
    /// Vérifier si la commande supprimer peut s'exécuter
    /// </summary>
    /// <returns>Vrai si elle peut s'exécuter, faux si elle ne peut pas</returns>
    private bool PeutSupprimer()
    {        
        //Vérifie si une catégorie peut être supprimée
        if (CategorieSelection != null)
        {
            //Il y a une catégorie est sélectionnée

            //Il faut empêcher la vérification si l'opération est en cours d'exécution
            //L'appel se fait en parallèle avec l'exécution et il y a une vérification dans la BD
            //Entity Framework ne peut pas fonctionner en parallèle avec la même instance du contexte.
            //Cette vérification est seulement nécessaire dans le cas d'un appel avec la base de données.
            if (SupprimerCommande.IsRunning == false)
            {
                //Vérifie si elle a des dépendances
                CategorieDependance? categorieDependance =
                    _categorieService.ObtenirDependance(CategorieSelection.CategorieId);

                //Si aucune cartes, elle peut être supprimée
                return categorieDependance?.NbCartes == 0;
            }
            else
            {
                return false;
            }
        }
        else
        {
            //Aucune catégorie n’est sélectionnée
            return false;
        }
    }    

    //Commandes
    public IAsyncRelayCommand ObtenirListeCommande { get; set; }
    public IAsyncRelayCommand SupprimerCommande { get; set; }

    //Propriétés liées
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

    public CategorieModel? CategorieSelection
    {
        get
        {
            return _categorieSelection;
        }
        set
        {
            if(SetProperty(ref _categorieSelection, value))
            {
                SupprimerCommande.NotifyCanExecuteChanged();
            }
        }
    }
}
```

Voici les éléments nécessaires pour la commande **Supprimer**.

La commande doit être asynchrone. 

```csharp
public IAsyncRelayCommand SupprimerCommande { get; set; }
```

La méthode pour exécuter la commande est **SupprimerAsync**. 

À l'intérieur, elle appelle le service pour supprimer la catégorie sélectionnée. 

Également, après la suppression, il faut mettre la liste à jour.

```csharp
/// <summary>
/// Supprimer la catégorie sélectionnée
/// </summary>    
private async Task SupprimerAsync()
{
    EstEnTravail = true;

    await _categorieService.SupprimerAsync(CategorieSelection!.CategorieId);

    await ObtenirListeAsync();

    EstEnTravail = false;
}
```

Avant d'exécuter une méthode, il faut vérifier si elle peut être exécutée. 

La première étape consiste à vérifier si une catégorie est sélectionnée.

Ensuite, il faut obtenir les dépendances dans la base de données. 

Cette méthode ne peut pas être asynchrone. Il faut donc que sa logique soit assez rapide. Si l'appel à la base de données est long, il faudrait revoir la logique. Il serait possible d'afficher un message d'erreur lors de la suppression s'il y a des dépendances. La vérification avec la base de données se ferait uniquement si l'action est réellement demandée.

```csharp
/// <summary>
/// Vérifier si la commande supprimer peut s'exécuter
/// </summary>
/// <returns>Vrai si elle peut s'exécuter, faux si elle ne peut pas</returns>
private bool PeutSupprimer()
{        
    //Vérifie si une catégorie peut être supprimée
    if (CategorieSelection != null)
    {
        //Il y a une catégorie est sélectionnée

        //Il faut empêcher la vérification si l'opération est en cours d'exécution
        //L'appel se fait en parallèle avec l'exécution et il y a une vérification dans la BD
        //Entity Framework ne peut pas fonctionner en parallèle avec la même instance du contexte.
        if (SupprimerCommande.IsRunning == false)
        {
            //Vérifie si elle a des dépendances
            CategorieDependance? categorieDependance =
                _categorieService.ObtenirDependance(CategorieSelection.CategorieId);

            //Si aucune cartes, elle peut être supprimée
            return categorieDependance?.NbCartes == 0;
        }
        else
        {
            return false;
        }
    }
    else
    {
        //Aucune catégorie est sélectionnée
        return false;
    }
}
```

Il faut également modifier la propriété **CategorieSelection**.

Si la propriété est modifiée, il faut indiquer à la commande **Supprimer** de vérifier de nouveau si elle peut être exécutée. Cette propriété a un lien avec la logique de vérification, il faut donc appeler **NotifyCanExecuteChanged** pour que l'état du bouton change dans la vue.

```csharp
public CategorieModel? CategorieSelection
{
    get
    {
        return _categorieSelection;
    }
    set
    {
        if(SetProperty(ref _categorieSelection, value))
        {
            SupprimerCommande.NotifyCanExecuteChanged();
        }
    }
}
```

Finalement, il faut créer la commande avec les 2 méthodes.

```csharp
SupprimerCommande = new AsyncRelayCommand(SupprimerAsync, PeutSupprimer);
```

#### Lier le bouton avec la commande dans la vue  - UcListeCategories.xaml

Dans le fichier **UcListeCategories.xaml**.

Voici la nouvelle définition du bouton. La commande est liée à la propriété **SupprimerCommande** du **ViewModel**.

```xaml
<Button Content="S" ToolTip="Supprimer"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding SupprimerCommande}"/>
```

Démarrez le programme.

Changez la sélection dans la liste. Seulement la catégorie **Mages** aura le bouton **S** activé.

Appuyez sur le bouton et la catégorie **Mages** ne sera plus là.

Généralement, il est recommandé d'avoir une demande de confirmation avant de supprimer un élément. Cette technique sera présentée dans un autre document.

#### Réappliquer le seed

Pour appliquer de nouveau le **Seed_Carte**, il faut synchroniser la base de données avec la migration précédente de ce seed et ensuite l'appliquer de nouveau.

```
Update-Database -StartupProject SuperCarte.EF -Migration Seed_RoleEtUtilisateur
Update-Database -StartupProject SuperCarte.EF -Migration Seed_Carte
```

## Localisation

Pour rendre l'application multilingue, il faut utiliser des fichiers ressources. Les fichiers ressources sont en fonction de la localisation.

Le terme localisation est utilisé, car il peut avoir une version pour le français de France et le français du Québec.

Pour faciliter la localisation des vues, il existe la librairie **WPFLocalizeExention**.

### Installation de la librairie

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. Il est important que le **Projet par défaut** **WPF** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.WPF**. À ce stade, il y a **plusieurs projets** et il est important de le modifier dans la liste.

```
Install-Package WPFLocalizeExtension
```

### Création du fichier ressource - ResListeCategories

La librairie utilise les fichiers **.resx** pour la localisation. C'est le format de fichier principal pour **.NET**.

Créez le dossier **Resx**, dans le projet **SuperCarte.WPF**.

Il existe plusieurs stratégies pour gérer les fichiers ressources. Pour ce projet, ce sera un fichier ressource par vue.

Créez le fichier **ResListeCategories.resx** avec le modèle **Fichier de ressources**. Il est important que le nom du fichier ressource ne soit pas réutilisé pour d'autres ressources.

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

### Création du fichier ressource - ResGlobalListeBouton

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

### Utilisation dans la vue - UcListeCategories.xaml

Le fichier au complet sera à la fin de la section

Pour être en mesure de l'utiliser dans une **Vue**, il faut ajouter des déclarations dans la balise initiale **\<UserControl\>**.

La ligne 8 indique qu'il faut inclure le **namespace ** de la librairie **WPFLocalizeExtension**.

La ligne 9 indique qu'elle est la langue à utiliser pour l'aperçu du design.

La ligne 10 indique le projet dans lequel le fichier ressource se trouve.

La ligne 11 est le nom du fichier ressource par défaut de la **Vue**.

```xaml
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
```

Pour sélectionner un élément du fichier ressource de la vue, il faut utiliser cette syntaxe. La clé est le nom de la colonne.

```
{lex:Loc Clé}
```

Par exemple pour le titre de la **Vue**. Il faut prendre la valeur de l'élément **Titre** du fichier **ResListeCategories**.

```xaml
<TextBlock 
	Grid.Row="0" 
	VerticalAlignment="Center" HorizontalAlignment="Center"
	FontSize="16" FontWeight="Bold"
	Text="{lex:Loc Titre}"/>
```

Pour sélectionner un élément d'un autre fichier ressource, il faut utiliser cette syntaxe. Le fichier est le fichier **Resx**. La clé est le nom de la colonne.

```
{lex:Loc Fichier:Clé}
```

Voici pour le bouton **Nouveau**. Il prend l'élément  **Bouton_Nouveau_Content** du fichier **ResGlobalListeBouton** pour la propriété **Content**.

```xaml
<Button Content="{lex:Loc ResGlobalListeBouton:Bouton_Nouveau_Content}" ToolTip="{lex:Loc ResGlobalListeBouton:Bouton_Nouveau_Tooltip}"
        Margin="5" Width="32" Height="32" />
```

Voici pour l'entête de colonne **Id**. L'entête est dans le fichier ressource de la vue.

```xaml
<DataGridTextColumn Header="{lex:Loc Col_CategorieId}"
                    MinWidth="50"
                    Binding="{Binding CategorieId}"/>
```

Tout ce qui est du texte doit être dans un fichier ressource, même si le texte est identique dans les 2 langues.

Il devient difficile à faire évoluer le programme si certains libellés ne sont pas dans le fichier ressource.

Également, il est préférable de créer un élément par composant, même s'il y a une répétition dans la valeur.

Voici le fichier au complet.

```xaml
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

### Test

Par défaut, la culture sera celle spécifiée dans le système d'exploitation.

Il est possible de la modifier à partir du code.

Dans le fichier **App.xaml.cs**, modifiez  le constructeur de la classe **App**.

```csharp
public App()
{
    //Modification de la langue dans l'extension et du thread principal
	CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("en-CA");
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

Démarrez l'application et la page sera en anglais.

Il est important de modifier la langue dans le **Thread principal** de l'application et non dans le **Thread d'affichage**, car l'application fonctionne en asynchrone. Une sous-tâche crée une copie de la culture du **Thread parent**. L'instance du **ViewModel** est créée par le **ServiceProvider**, donc il provient du **Thread principal**. Ce n'est pas la **Vue** qui crée la **VM**. 

La ligne **CultureInfo.DefaultThreadCurrentCulture** permet d'indiquer la culture par défaut de l'application. En cas qu'il faille modifier la culture dans l'application en cours d'exécution, il faudrait se baser sur cette valeur pour appliquer la culture sur le **Thread** en cours d'exécution si c'est nécessaire.

Remettez l'application en français par défaut.

```csharp
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

        //Appel des méthodes d'extension                        
        services.EnregistrerRepositories();
        services.EnregistrerServices();            
        services.EnregistrerValidateurs();
        services.EnregistrerViewModels();
    });

    _host = builder.Build();
}
```

## Liste des cartes

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

