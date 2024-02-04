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

Ajoutez la propriété **int Nombre** dans **HelloWorldVM.cs**. 
```csharp
    private int _nombre;
```

et 

```csharp
public int Nombre
{
    get
    {
        return _nombre;
    }
    set
    {
        SetProperty(ref _nombre, value);
    }
}
```

Liez la propriété **Nombre** à un **\<Textbox\>** dans **UcHelloWorld.xaml**.

```xaml
<TextBox Text="{Binding Nombre}" />
```

Démarrez le programme. Si vous essayez d'inscrire une lettre, elle s'affichera, mais le contrôle sera en rouge pour indiquer que la valeur n'est pas compatible avec le type de la propriété de liaison.

Pour permettre seulement les chiffres, il faut modifier des événements sur le  **\<Textbox\>** pour être en mesure de le faire. L'exemple provient d'une suggestion de **StackOverflow**. https://stackoverflow.com/questions/1268552/how-do-i-get-a-textbox-to-only-accept-numeric-input-in-wpf

L'événement **PreviewTextInput** permet d'analyser la valeur des caractères qui sont inscrits dans le composant. Généralement, c'est un seul caractère, mais il est possible d'en recevoir plusieurs d'un coup.

Il faut également intercepter l'action **coller**. L'événement **DataObject.Pasting** permet d'intercepter l'action **coller**.

Dans le **xaml**, il faut créer les 2 événements.

Changez le TextBox dans **UcHelloWorld.xaml**

```xaml
<TextBox Text="{Binding Nombre}" PreviewTextInput="TextBox_PreviewTextInput" DataObject.Pasting="TextBox_Pasting"  />
```

Dans le **xaml.cs**, il faut faire l'implémentation de l'événement. L'implémentation ne se fait pas dans le **ViewModel**, car c'est un comportement directement lié à la vue. Le **ViewModel** veut recevoir un nombre, il ne s'intéresse pas comment la vue s'en occupe.

Pour l'événement **PreviewTextInput**, il est possible d'utiliser une règle **[Regex](https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expressions)** (ou [regex sur wikipedia](https://fr.wikipedia.org/wiki/Expression_r%C3%A9guli%C3%A8re)) pour déterminer si la chaine contient uniquement des chiffres.

La propriété **e.Handled == false**  indique que l'événement peut continuer son exécution. Si **e.Handled == true**, l'événement est annulé.

Donc si la chaine n'a pas de chiffre, elle fait annuler l'événement.

Ajoutez cette fonction dans **UcHelloWorld.xaml.cs**

```csharp
private void TextBox_PreviewTextInput(object sender, TextCompositionEventArgs e)
{
    e.Handled = !Regex.IsMatch(e.Text, "^[0-9]");
}
```

Pour l'événement **DataObject.Pasting**, il y a un peu plus d'étapes.

Il faut valider si le contenu du **coller** est du texte. Si c'est le cas, il faut valider à l'aide d'une règle **Regex** si ce sont que des chiffres. Si ce n'est pas le cas, il faut annuler le **coller**.

Ajoutez cette fonction dans **UcHelloWorld.xaml.cs**

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

## Sélection d'une date

Le composant **\<DatePicker\>** permet d'avoir un contrôle de sélection d'une date.

```xaml
<DatePicker SelectedDate="{Binding MaDate}" />
```

