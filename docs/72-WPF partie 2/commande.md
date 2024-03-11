---
sidebar_position: 225
draft: false
---

# Commande

Une commande est une action faite par l'utilisateur. Généralement, un bouton est lié à une commande.

Lors de la création de la commande, il faut indiquer la méthode qui effectuera le travail.

La librairie **MVVM ToolKit** fournit l'objet **RelayCommand** qui permet de créer des commandes dynamiquement.


## Rafraichissement de l'heure dans HelloWorld

Dans l'exemple ci-dessous, il faut créer un bouton pour mettre à jour l'heure.

:::tip
Il est recommandé d'utiliser un verbe d'action pour nommer la commande.
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

:::warning Attention
L'assignation **set** est privée, car il est préférable que ce soit le **ViewModel** qui s'occupe de la création de la commande et non une classe externe. Le **get** doit être public pour qu'il soit visible par la **Vue**.
:::

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

## Asynchrone

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
			//highlight-next-line
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

## Indicateur de travail
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
			//highlight-next-line
            <ProgressBar Height="10" IsIndeterminate="{Binding EstEnTravail}" />
        </StackPanel>
    </Grid>
</UserControl>
```

À la ligne 16, il y a une barre de progression. Sa propriété **IsIndeterminate** est liée à la propriété **EstEnTravail** du **ViewModel**. La propriété **IsIndeterminate** permet de faire une barre de progression pour en continue au lieu d'une progression en pourcentage.

## Asynchrone et constructeur

Avez-vous remarqué que la date et heure n'est pas généré en partant l'application. La **Vue** devrait donc générer une date et une heure automatiquement lors de son initialisation.

Le principe suggéré est d'inclure la méthode dans le constructeur. Par contre, il n'est pas possible d'appeler une méthode asynchrone et rester asynchrone à partir du constructeur. Il serait possible de faire une version *synchrone* de la méthode, mais le contrôle ne s'affichera pas tant que le constructeur n'a pas terminé.

```csharp title="Ne pas utiliser"
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

