"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[1124],{5970:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>o,contentTitle:()=>s,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var t=r(5893),a=r(1151);const i={sidebar_position:225,draft:!1},s="Commande",l={id:"WPF partie 2/commande",title:"Commande",description:"Une commande est une action faite par l'utilisateur. G\xe9n\xe9ralement, un bouton est li\xe9 \xe0 une commande.",source:"@site/docs/72-WPF partie 2/commande.md",sourceDirName:"72-WPF partie 2",slug:"/WPF partie 2/commande",permalink:"/4N1_2024/docs/WPF partie 2/commande",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:225,frontMatter:{sidebar_position:225,draft:!1},sidebar:"NotesSidebar",previous:{title:"Composants XAML",permalink:"/4N1_2024/docs/WPF partie 2/composants_xaml"},next:{title:"Date et Champ texte num\xe9rique",permalink:"/4N1_2024/docs/WPF partie 2/champ_numerique"}},o={},c=[{value:"Rafraichissement de l&#39;heure dans HelloWorld",id:"rafraichissement-de-lheure-dans-helloworld",level:2},{value:"Asynchrone",id:"asynchrone",level:2},{value:"Indicateur de travail",id:"indicateur-de-travail",level:2},{value:"Asynchrone et constructeur",id:"asynchrone-et-constructeur",level:2}];function d(e){const n={admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"commande",children:"Commande"}),"\n",(0,t.jsx)(n.p,{children:"Une commande est une action faite par l'utilisateur. G\xe9n\xe9ralement, un bouton est li\xe9 \xe0 une commande."}),"\n",(0,t.jsx)(n.p,{children:"Lors de la cr\xe9ation de la commande, il faut indiquer la m\xe9thode qui effectuera le travail."}),"\n",(0,t.jsxs)(n.p,{children:["La librairie ",(0,t.jsx)(n.strong,{children:"MVVM ToolKit"})," fournit l'objet ",(0,t.jsx)(n.strong,{children:"RelayCommand"})," qui permet de cr\xe9er des commandes dynamiquement."]}),"\n",(0,t.jsx)(n.h2,{id:"rafraichissement-de-lheure-dans-helloworld",children:"Rafraichissement de l'heure dans HelloWorld"}),"\n",(0,t.jsx)(n.p,{children:"Dans l'exemple ci-dessous, il faut cr\xe9er un bouton pour mettre \xe0 jour l'heure."}),"\n",(0,t.jsx)(n.admonition,{type:"tip",children:(0,t.jsx)(n.p,{children:"Il est recommand\xe9 d'utiliser un verbe d'action pour nommer la commande."})}),"\n",(0,t.jsxs)(n.p,{children:["Modifiez la classe ",(0,t.jsx)(n.strong,{children:"HelloWorldVM.cs"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:"using CommunityToolkit.Mvvm.Input;\r\n\r\nnamespace SuperCarte.WPF.ViewModels\r\n{\r\n    public class HelloWorldVM : BaseVM\r\n    {\r\n        public HelloWorldVM()\r\n        {\r\n            DateHeure = DateTime.Now;           \r\n//highlight-next-line\r\n            RafraichirDateHeureCommande = new RelayCommand(RafraichirDateHeure);\r\n        }\r\n\r\n        /// <summary>\r\n        /// Rafraichir la date et l'heure\r\n        /// </summary>\r\n        private void RafraichirDateHeure()\r\n        {\r\n            DateHeure = DateTime.Now;\r\n        }\r\n//highlight-next-line\r\n        public IRelayCommand RafraichirDateHeureCommande { get; private set; }\r\n\r\n        public DateTime DateHeure { get; set; }       \r\n    }\r\n}\n"})}),"\n",(0,t.jsx)(n.admonition,{title:"Attention",type:"warning",children:(0,t.jsxs)(n.p,{children:["L'assignation ",(0,t.jsx)(n.strong,{children:"set"})," est priv\xe9e, car il est pr\xe9f\xe9rable que ce soit le ",(0,t.jsx)(n.strong,{children:"ViewModel"})," qui s'occupe de la cr\xe9ation de la commande et non une classe externe. Le ",(0,t.jsx)(n.strong,{children:"get"})," doit \xeatre public pour qu'il soit visible par la ",(0,t.jsx)(n.strong,{children:"Vue"}),"."]})}),"\n",(0,t.jsxs)(n.p,{children:["\xc0 la ligne 11, il y a la propri\xe9t\xe9 ",(0,t.jsx)(n.strong,{children:"RafraichirDateHeureCommande"})," qui sera li\xe9e \xe0 la propri\xe9t\xe9 ",(0,t.jsx)(n.strong,{children:"Command"})," du bouton."]}),"\n",(0,t.jsxs)(n.p,{children:["\xc0 la ligne 11, la commande est cr\xe9\xe9e avec un ",(0,t.jsx)(n.strong,{children:"RelayCommand"}),". La m\xe9thode associ\xe9e \xe0 cette commande est ",(0,t.jsx)(n.strong,{children:"RafraichirDateHeure()"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["Modifiez le fichier ",(0,t.jsx)(n.strong,{children:"UcHelloWorld.xaml"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-xaml",children:'<UserControl x:Class="SuperCarte.WPF.Views.UcHelloWorld"\r\n             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"\r\n             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"\r\n             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" \r\n             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" \r\n             xmlns:local="clr-namespace:SuperCarte.WPF.Views"\r\n             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"\r\n             xmlns:v="clr-namespace:SuperCarte.WPF.Views"        \r\n             mc:Ignorable="d"\r\n             d:DataContext="{d:DesignInstance Type=vm:HelloWorldVM}" \r\n             d:DesignHeight="450" d:DesignWidth="800">\r\n    <Grid>\r\n        <StackPanel VerticalAlignment="Center" HorizontalAlignment="Center">            \r\n            <TextBlock Text="{Binding DateHeure , StringFormat=\\{0:d MMMM yyyy HH:mm:ss\\}}"/>\r\n\t\t//highlight-next-line\t\r\n            <Button Content="Rafraichir" Command="{Binding RafraichirDateHeureCommande}"/>\r\n        </StackPanel>\r\n    </Grid>\r\n</UserControl>\n'})}),"\n",(0,t.jsxs)(n.p,{children:["Le bouton est associ\xe9 \xe0 la commande du ",(0,t.jsx)(n.strong,{children:"ViewModel"})," par la propri\xe9t\xe9 ",(0,t.jsx)(n.strong,{children:"Command"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'<Button Content="Rafraichir" Command="{Binding RafraichirDateHeureCommande}"/>\n'})}),"\n",(0,t.jsx)(n.p,{children:"D\xe9marrez le programme. Est-ce que c'est fonctionnel ?"}),"\n",(0,t.jsxs)(n.p,{children:["La raison que \xe7a ne fonctionne pas est qu'il faut notifier la ",(0,t.jsx)(n.strong,{children:"Vue"})," que la propri\xe9t\xe9 a \xe9t\xe9 modifi\xe9e."]}),"\n",(0,t.jsxs)(n.p,{children:["En ",(0,t.jsx)(n.strong,{children:"MVVM"}),", il n'est pas possible d'utiliser une propri\xe9t\xe9 auto-impl\xe9ment\xe9e (ici DateHeure \xe0 la ligne 22 de HelloworldVM.cs) si elle est li\xe9e \xe0 la vue, car il faut de notifier le changement de valeur. Il faut donc de la logique dans le ",(0,t.jsx)(n.strong,{children:"set"}),". Lorsqu'il y a de la logique, il faut utiliser un attribut pour contenir la valeur de la propri\xe9t\xe9."]}),"\n",(0,t.jsxs)(n.p,{children:["Modifiez la classe ",(0,t.jsx)(n.strong,{children:"HelloWorldVM.cs"})," par le code ci-dessous."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-csharp",children:"using CommunityToolkit.Mvvm.Input;\r\n\r\nnamespace SuperCarte.WPF.ViewModels\r\n{\r\n    public class HelloWorldVM : BaseVM\r\n    {\r\n        //Ajout de la d\xe9claration de l'attribut\r\n\t\t//highlight-next-line\r\n        private DateTime _dateTime;\r\n\r\n        public HelloWorldVM()\r\n        {\r\n            DateHeure = DateTime.Now;\r\n\r\n            RafraichirDateHeureCommande = new RelayCommand(RafraichirDateHeure);\r\n        }\r\n\r\n        /// <summary>\r\n        /// Rafraichir la date et l'heure\r\n        /// </summary>\r\n        private void RafraichirDateHeure()\r\n        {\r\n            DateHeure = DateTime.Now;\r\n        }\r\n\r\n        public IRelayCommand RafraichirDateHeureCommande { get; private set; }\r\n\r\n//highlight-start\r\n        public DateTime DateHeure \r\n        {\r\n            get\r\n            {\r\n                return _dateTime;\r\n            }\r\n            set\r\n            {\r\n                SetProperty(ref _dateTime, value);\r\n            }\r\n        }\r\n//highlight-end\r\n    }\r\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["La propri\xe9t\xe9 ",(0,t.jsx)(n.strong,{children:"DateHeure"})," utilise maintenant un attribut pour conserver la valeur. Lors de l'assignation ",(0,t.jsx)(n.strong,{children:"set"}),", la m\xe9thode ",(0,t.jsx)(n.strong,{children:"SetProperty"})," est utilis\xe9e. Cette m\xe9thode v\xe9rifie s'il y a un changement dans la valeur et si c'est le cas, l'\xe9v\xe9nement  ",(0,t.jsx)(n.strong,{children:"PropertyChanged"})," est soulev\xe9."]}),"\n",(0,t.jsxs)(n.p,{children:["L'\xe9v\xe9nement provient de l'interface ",(0,t.jsx)(n.strong,{children:"INotifyPropertyChanged"})," qui est incluse dans ",(0,t.jsx)(n.strong,{children:".NET"}),". Par contre, la m\xe9thode ",(0,t.jsx)(n.strong,{children:"SetProperty"})," provient de la librairie ",(0,t.jsx)(n.strong,{children:"MVVM Toolkit"}),". Elle est disponible par h\xe9ritage de la classe ",(0,t.jsx)(n.strong,{children:"BaseVM"})," qui h\xe9rite de ",(0,t.jsx)(n.strong,{children:"ObservableObject"}),"."]}),"\n",(0,t.jsx)(n.admonition,{title:"Attention",type:"danger",children:(0,t.jsx)(n.p,{children:"Il est important de ne jamais utiliser l'attribut pour l'assignation d'une valeur, car la m\xe9canique de notification ne fonctionnera pas."})}),"\n",(0,t.jsx)(n.h2,{id:"asynchrone",children:"Asynchrone"}),"\n",(0,t.jsxs)(n.p,{children:["Il est important que les commandes soient ex\xe9cut\xe9es en ",(0,t.jsx)(n.strong,{children:"asynchrone"}),", car l'interface visuelle sera bloqu\xe9e. Pour les op\xe9rations qui sont longues, l'interface visuelle ne r\xe9pondra plus. Il faut un indicateur de progression et que la fen\xeatre ne soit pas bloqu\xe9e."]}),"\n",(0,t.jsxs)(n.p,{children:["Modifiez la classe ",(0,t.jsx)(n.strong,{children:"HelloWorldVM.cs"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:"using CommunityToolkit.Mvvm.Input;\r\n\r\nnamespace SuperCarte.WPF.ViewModels\r\n{\r\n    public class HelloWorldVM : BaseVM\r\n    {\r\n        private DateTime _dateTime;\r\n\r\n        public HelloWorldVM()\r\n        {\r\n            RafraichirDateHeureCommande = new RelayCommand(RafraichirDateHeure);\r\n        }\r\n\r\n        /// <summary>\r\n        /// Rafraichir la date et l'heure\r\n        /// </summary>\r\n        private void RafraichirDateHeure()\r\n        {\r\n\t\t\t//highlight-next-line\r\n            Task.Delay(5000).Wait();\r\n            DateHeure = DateTime.Now;\r\n        }\r\n\r\n        public IRelayCommand RafraichirDateHeureCommande { get; private set; }\r\n\r\n        public DateTime DateHeure \r\n        {\r\n            get\r\n            {\r\n                return _dateTime;\r\n            }\r\n            set\r\n            {\r\n                SetProperty(ref _dateTime, value);\r\n            }\r\n        }\r\n    }\r\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:"\xc0 la ligne 19, il y a un d\xe9lai artificiel de 5 secondes pour simuler une commande qui a une longue dur\xe9e d'ex\xe9cution."}),"\n",(0,t.jsx)(n.p,{children:"D\xe9marrez l'application et appuyez sur le bouton. Il ne sera pas possible de bouger la fen\xeatre."}),"\n",(0,t.jsxs)(n.p,{children:["Modifiez de nouveau la classe ",(0,t.jsx)(n.strong,{children:"HelloWorldVM.cs"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:"using CommunityToolkit.Mvvm.Input;\r\n\r\nnamespace SuperCarte.WPF.ViewModels\r\n{\r\n    public class HelloWorldVM : BaseVM\r\n    {\r\n        private DateTime _dateTime;\r\n\r\n        public HelloWorldVM()\r\n        {\r\n\t//highlight-next-line\r\n            RafraichirDateHeureCommande = new AsyncRelayCommand(RafraichirDateHeureAsync);\r\n        }\r\n\r\n        /// <summary>\r\n        /// Rafraichir la date et l'heure\r\n        /// </summary>\r\n\t//highlight-next-line\r\n        private async Task RafraichirDateHeureAsync()\r\n        {\r\n            await Task.Delay(5000);\r\n            DateHeure = DateTime.Now;\r\n        }\r\n\r\n\t//highlight-next-line\r\n        public IAsyncRelayCommand RafraichirDateHeureCommande { get; set; }\r\n\r\n        public DateTime DateHeure \r\n        {\r\n            get\r\n            {\r\n                return _dateTime;\r\n            }\r\n            set\r\n            {\r\n                SetProperty(ref _dateTime, value);\r\n            }\r\n        }\r\n    }\r\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["La m\xe9thode ",(0,t.jsx)(n.strong,{children:"RafraichirDateHeure()"})," (ligne 17) a \xe9t\xe9 renomm\xe9e ",(0,t.jsx)(n.strong,{children:"RafraichirDateHeureAsync()"}),". Ce n'est pas obligatoire, mais par convention ",(0,t.jsx)(n.strong,{children:"C#"}),", une m\xe9thode asynchrone devrait avoir le suffixe ",(0,t.jsx)(n.strong,{children:"Async"}),". Son type de retour est ",(0,t.jsx)(n.strong,{children:"async Task"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["La commande ",(0,t.jsx)(n.strong,{children:"RafraichirDateHeureCommande"})," (ligne 23) est maintenant du type ",(0,t.jsx)(n.strong,{children:"IAsyncRelayCommand"})," pour qu'elle soit asynchrone."]}),"\n",(0,t.jsxs)(n.p,{children:["Dans le constructeur, la commande est de type ",(0,t.jsx)(n.strong,{children:"AsyncRelayCommand"})," (ligne 11)."]}),"\n",(0,t.jsx)(n.p,{children:"Ex\xe9cutez de nouveau le programme. Il sera possible de bouger la fen\xeatre pendant l'ex\xe9cution et le bouton ne sera plus accessible \xe9galement."}),"\n",(0,t.jsx)(n.h2,{id:"indicateur-de-travail",children:"Indicateur de travail"}),"\n",(0,t.jsx)(n.p,{children:"Il pourrait \xeatre int\xe9ressant de mettre un indicateur de travail."}),"\n",(0,t.jsxs)(n.p,{children:["Modifiez la classe ",(0,t.jsx)(n.strong,{children:"HelloWorldVM.cs"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-csharp",children:"using CommunityToolkit.Mvvm.Input;\r\n\r\nnamespace SuperCarte.WPF.ViewModels\r\n{\r\n    public class HelloWorldVM : BaseVM\r\n    {\r\n        private DateTime _dateTime;\r\n\t//highlight-next-line\r\n        private bool _estEnTravail;\r\n\r\n        public HelloWorldVM()\r\n        {\r\n            RafraichirDateHeureCommande = new AsyncRelayCommand(RafraichirDateHeureAsync);\r\n        }\r\n\r\n        /// <summary>\r\n        /// Rafraichir la date et l'heure\r\n        /// </summary>\r\n        private async Task RafraichirDateHeureAsync()\r\n        {\r\n\t\t//highlight-next-line\r\n            EstEnTravail = true;\r\n            await Task.Delay(5000);\r\n            DateHeure = DateTime.Now;\r\n\t\t//highlight-next-line\r\n            EstEnTravail = false;\r\n        }\r\n\r\n        public IAsyncRelayCommand RafraichirDateHeureCommande { get; set; }\r\n\r\n        public DateTime DateHeure \r\n        {\r\n            get\r\n            {\r\n                return _dateTime;\r\n            }\r\n            set\r\n            {\r\n                SetProperty(ref _dateTime, value);\r\n            }\r\n        }\r\n//highlight-start\r\n        public bool EstEnTravail \r\n        {\r\n            get\r\n            {\r\n                return _estEnTravail;\r\n            }\r\n            set\r\n            {\r\n                SetProperty(ref _estEnTravail, value);\r\n            }\r\n        }\r\n//highlight-end\r\n    }\r\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Le ",(0,t.jsx)(n.strong,{children:"ViewModel"})," a maintenant une propri\xe9t\xe9 ",(0,t.jsx)(n.strong,{children:"EstEnTravail"})," pour indiquer s'il y a une t\xe2che en cours d'ex\xe9cution."]}),"\n",(0,t.jsxs)(n.p,{children:["Modifiez le fichier ",(0,t.jsx)(n.strong,{children:"UcHelloWorld.xaml"})," ."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:'<UserControl x:Class="SuperCarte.WPF.Views.UcHelloWorld"\r\n             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"\r\n             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"\r\n             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" \r\n             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" \r\n             xmlns:local="clr-namespace:SuperCarte.WPF.Views"\r\n             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"\r\n             xmlns:v="clr-namespace:SuperCarte.WPF.Views"        \r\n             mc:Ignorable="d"\r\n             d:DataContext="{d:DesignInstance Type=vm:HelloWorldVM}" \r\n             d:DesignHeight="450" d:DesignWidth="800">\r\n    <Grid>\r\n        <StackPanel VerticalAlignment="Center" HorizontalAlignment="Center">            \r\n            <TextBlock Text="{Binding DateHeure , StringFormat=\\{0:d MMMM yyyy HH:mm:ss\\}}"/>\r\n            <Button Content="Rafraichir" Command="{Binding RafraichirDateHeureCommande}"/>\r\n\t\t\t//highlight-next-line\r\n            <ProgressBar Height="10" IsIndeterminate="{Binding EstEnTravail}" />\r\n        </StackPanel>\r\n    </Grid>\r\n</UserControl>\n'})}),"\n",(0,t.jsxs)(n.p,{children:["\xc0 la ligne 16, il y a une barre de progression. Sa propri\xe9t\xe9 ",(0,t.jsx)(n.strong,{children:"IsIndeterminate"})," est li\xe9e \xe0 la propri\xe9t\xe9 ",(0,t.jsx)(n.strong,{children:"EstEnTravail"})," du ",(0,t.jsx)(n.strong,{children:"ViewModel"}),". La propri\xe9t\xe9 ",(0,t.jsx)(n.strong,{children:"IsIndeterminate"})," permet de faire une barre de progression pour en continue au lieu d'une progression en pourcentage."]}),"\n",(0,t.jsx)(n.h2,{id:"asynchrone-et-constructeur",children:"Asynchrone et constructeur"}),"\n",(0,t.jsxs)(n.p,{children:["Avez-vous remarqu\xe9 que la date et heure n'est pas g\xe9n\xe9r\xe9 en partant l'application. La ",(0,t.jsx)(n.strong,{children:"Vue"})," devrait donc g\xe9n\xe9rer une date et une heure automatiquement lors de son initialisation."]}),"\n",(0,t.jsxs)(n.p,{children:["Le principe sugg\xe9r\xe9 est d'inclure la m\xe9thode dans le constructeur. Par contre, il n'est pas possible d'appeler une m\xe9thode asynchrone et rester asynchrone \xe0 partir du constructeur. Il serait possible de faire une version ",(0,t.jsx)(n.em,{children:"synchrone"})," de la m\xe9thode, mais le contr\xf4le ne s'affichera pas tant que le constructeur n'a pas termin\xe9."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-csharp",metastring:'title="Ne pas utiliser"',children:"public HelloWorldVM()\r\n{\r\n    RafraichirDateHeureAsync();\r\n\r\n    RafraichirDateHeureCommande = new AsyncRelayCommand(RafraichirDateHeureAsync);\r\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["La m\xe9thode sera ex\xe9cut\xe9e, mais il n'est pas possible d'avoir un ",(0,t.jsx)(n.strong,{children:"await"}),", car le constructeur ne peut pas \xeatre ",(0,t.jsx)(n.strong,{children:"async"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["\xc9galement, lors de la construction du ",(0,t.jsx)(n.strong,{children:"ViewModel"}),", il est pr\xe9f\xe9rable qu'il soit enti\xe8rement construit avec la ",(0,t.jsx)(n.strong,{children:"Vue"})," pour \xe9viter des conflits. Il est pr\xe9f\xe9rable que la ",(0,t.jsx)(n.strong,{children:"Vue"})," soit pr\xeate avant d'ex\xe9cuter des t\xe2ches en ",(0,t.jsx)(n.strong,{children:"asynchrone"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["\xc9galement, le choix d'afficher une date automatiquement lors de l'ouverture peut \xeatre un choix de design de la ",(0,t.jsx)(n.strong,{children:"Vue"})," et non faire partie de la logique du ",(0,t.jsx)(n.strong,{children:"ViewModel"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["Dans le ",(0,t.jsx)(n.strong,{children:"UserControl"}),", il y a un \xe9v\xe9nement ",(0,t.jsx)(n.strong,{children:"Loaded"})," qui est appel\xe9 lorsque la ",(0,t.jsx)(n.strong,{children:"Vue"})," est compl\xe8tement charg\xe9e."]}),"\n",(0,t.jsx)(n.p,{children:"Cet \xe9v\xe9nement va appeler la commande qu'il faut ex\xe9cuter."}),"\n",(0,t.jsxs)(n.p,{children:["Dans le fichier ",(0,t.jsx)(n.strong,{children:"UcHelloWorld.xaml"}),", il faut ajouter la ligne 12 pour assigner l'\xe9v\xe9nement."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-xaml",metastring:"showLineNumbers",children:'<UserControl x:Class="SuperCarte.WPF.Views.UcHelloWorld"\r\n             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"\r\n             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"\r\n             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" \r\n             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" \r\n             xmlns:local="clr-namespace:SuperCarte.WPF.Views"\r\n             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"\r\n             xmlns:v="clr-namespace:SuperCarte.WPF.Views"        \r\n             mc:Ignorable="d"\r\n             d:DataContext="{d:DesignInstance Type=vm:HelloWorldVM}" \r\n             d:DesignHeight="450" d:DesignWidth="800"\r\n//highlight-next-line\t\t\t \r\n             Loaded="UserControl_Loaded">\r\n    <Grid>\r\n        <StackPanel VerticalAlignment="Center" HorizontalAlignment="Center">            \r\n            <TextBlock Text="{Binding DateHeure , StringFormat=\\{0:d MMMM yyyy HH:mm:ss\\}}"/>\r\n            <Button Content="Rafraichir" Command="{Binding RafraichirDateHeureCommande}"/>\r\n            <ProgressBar Height="10" IsIndeterminate="{Binding EstEnTravail}" />\r\n        </StackPanel>\r\n    </Grid>\r\n</UserControl>\n'})}),"\n",(0,t.jsxs)(n.p,{children:["Dans le fichier ",(0,t.jsx)(n.strong,{children:"UcHelloWorld.xaml.cs"}),", il faut ajouter le code de l'\xe9v\xe9nement. Si l'\xe9v\xe9nement est autog\xe9n\xe9r\xe9, il faut ajouter le ",(0,t.jsx)(n.strong,{children:"async"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"Il y a les v\xe9rifications d'usage pour s'assurer que le type du contexte est le bon."}),"\n",(0,t.jsx)(n.p,{children:"Ensuite, il faut appeler la commande qu'il faut automatiser."}),"\n",(0,t.jsxs)(n.p,{children:["Ajoutez cette fonction dans ",(0,t.jsx)(n.strong,{children:"UcHelloWorld.xaml.cs"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-csharp",children:"private async void UserControl_Loaded(object sender, RoutedEventArgs e)\r\n{\r\n    if(DataContext != null)\r\n    {\r\n        if(DataContext is HelloWorldVM)\r\n        {\r\n            await ((HelloWorldVM)DataContext).RafraichirDateHeureCommande.ExecuteAsync(null);\r\n        }\r\n    }\r\n}\n"})})]})}function m(e={}){const{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>l,a:()=>s});var t=r(7294);const a={},i=t.createContext(a);function s(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);