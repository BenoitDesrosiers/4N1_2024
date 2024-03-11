---
sidebar_position: 220
draft: false
---

# Composants XAML

Avant de continuer avec des amélioration du code de SuperCarte, nous allons expérimenter avec les composants visuels XAML dans le HelloWorld.

## Formater des données

Il est possible de formater la valeur des propriétés dans un format spécifique.

Lors du **Binding**, il est possible d'indiquer la transformation avec la propriété **StringFormat**, Le choix de l'affichage appartient à la **Vue**, donc il faut faire les transformations d'affichage dans la **Vue** et non dans le **ViewModel**.

Pour la date, elle sera affichée selon le format **dd MMM yyyy HH:mm:ss**. Donc pour **2023-03-03 15:23:03.452121** se sera **3 Mars 2023 15:23:03**.

Pour le nombre décimal, il sera affiché avec un séparateur de milliers et une précision au millième (3 décimaux). Le format sera **N3**.

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

Dans **Views/UcHelloWorld.xaml**
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

Dans **Views/UcHelloWorld.xaml**
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

Dans **Views/UcHelloWorld.xaml**
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

Dans **Views/UcHelloWorld.xaml**
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

Dans **Views/UcHelloWorld.xaml**
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

Dans **Views/UcHelloWorld.xaml**
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

Dans **Views/UcHelloWorld.xaml**
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

