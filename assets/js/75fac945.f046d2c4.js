"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[470],{3093:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>c,frontMatter:()=>a,metadata:()=>o,toc:()=>d});var i=r(5893),t=r(1151);const a={sidebar_position:310,draft:!1},s="Menu",o={id:"WPF partie 3/menu",title:"Menu",description:"La navigation par le menu va utiliser une commande pour utiliser le Navigateur. Il y a plusieurs designs de menu possible, mais le plus classique dans les applications natives Windows est la barre de menu.",source:"@site/docs/74-WPF partie 3/menu.md",sourceDirName:"74-WPF partie 3",slug:"/WPF partie 3/menu",permalink:"/4N1_2024/docs/WPF partie 3/menu",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:310,frontMatter:{sidebar_position:310,draft:!1},sidebar:"NotesSidebar",previous:{title:"Navigateur",permalink:"/4N1_2024/docs/WPF partie 3/navigateur"},next:{title:"Bogus pour le tp3",permalink:"/4N1_2024/docs/WPF partie 3/bogus_navigateur"}},l={},d=[{value:"Cr\xe9ation des commandes - MainWindowVM",id:"cr\xe9ation-des-commandes---mainwindowvm",level:2},{value:"Cr\xe9ation du menu dans la vue - MainWindow.xaml",id:"cr\xe9ation-du-menu-dans-la-vue---mainwindowxaml",level:2}];function u(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"menu",children:"Menu"}),"\n",(0,i.jsxs)(n.p,{children:["La navigation par le menu va utiliser une ",(0,i.jsx)(n.strong,{children:"commande"})," pour utiliser le ",(0,i.jsx)(n.strong,{children:"Navigateur"}),". Il y a plusieurs designs de menu possible, mais le plus classique dans les applications natives Windows est la barre de menu."]}),"\n",(0,i.jsxs)(n.p,{children:["Le menu doit \xeatre toujours accessible, peu importe la vue active. Le menu sera dans la fen\xeatre principale de l'application et les commandes dans son ",(0,i.jsx)(n.strong,{children:"ViewModel"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"cr\xe9ation-des-commandes---mainwindowvm",children:"Cr\xe9ation des commandes - MainWindowVM"}),"\n",(0,i.jsxs)(n.p,{children:["Modifiez la classe ",(0,i.jsx)(n.strong,{children:"MainWindowVM.cs"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Aux lignes 22 et 24, il y a les 2 commandes pour la navigation. Les commandes pour la navigation doivent avoir le pr\xe9fixe ",(0,i.jsx)(n.strong,{children:"Naviguer"})," avec le nom du ",(0,i.jsx)(n.strong,{children:"ViewModel"}),". Les commandes sont synchrones. Le changement de vue doit se faire en synchrone."]}),"\n",(0,i.jsxs)(n.p,{children:["Aux lignes 15 et 16, il y a la cr\xe9ation des commandes dans le constructeur. Il est possible de leur assigner directement la m\xe9thode du navigateur sans cr\xe9er une m\xe9thode interne au ",(0,i.jsx)(n.strong,{children:"ViewModel"}),". Lorsqu'une commande utilise une classe d'assistance, il est pr\xe9f\xe9rable de l'utiliser directement."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:"using CommunityToolkit.Mvvm.Input;\r\n\r\nnamespace SuperCarte.WPF.ViewModels;\r\n\r\npublic class MainWindowVM : BaseVM\r\n{\r\n    private readonly INavigateur _navigateur;\r\n\r\n    public MainWindowVM(INavigateur navigateur)\r\n\t{   \r\n        //S\xe9lectionner le ViewModel de d\xe9marrage        \r\n        _navigateur = navigateur;\r\n\r\n//highlight-start\r\n        //Cr\xe9ation des commandes\r\n        NaviguerListeCartesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCartesVM>);\r\n        NaviguerListeCategoriesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCategoriesVM>);\r\n//highlight-end\r\n        //Vue initiale\r\n        _navigateur.Naviguer<ListeCartesVM>();\r\n    }\r\n\r\n//highlight-start\r\n    public IRelayCommand NaviguerListeCartesVMCommande {  get; private set; }\r\n\r\n    public IRelayCommand NaviguerListeCategoriesVMCommande { get; private set; }\r\n//highlight-end\r\n    public INavigateur Navigateur\r\n    { \r\n        get\r\n        {\r\n            return _navigateur;\r\n        }\r\n    }   \r\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"cr\xe9ation-du-menu-dans-la-vue---mainwindowxaml",children:"Cr\xe9ation du menu dans la vue - MainWindow.xaml"}),"\n",(0,i.jsxs)(n.p,{children:["Modifiez le code du  ",(0,i.jsx)(n.strong,{children:"MainWindow.xaml"})," par celui-ci."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:'<Window x:Class="SuperCarte.WPF.MainWindow"\r\n        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"\r\n        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"\r\n        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"\r\n        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"\r\n        xmlns:local="clr-namespace:SuperCarte.WPF"  \r\n        xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"\r\n        xmlns:v="clr-namespace:SuperCarte.WPF.Views"                \r\n        mc:Ignorable="d"         \r\n        d:DataContext="{d:DesignInstance Type=vm:MainWindowVM}"\r\n        Title="Super Carte App" \r\n        Height="450" Width="800" WindowState="Maximized">\r\n    <Window.Resources>\r\n        \x3c!--Assignation du ViewModel \xe0 Vue--\x3e\r\n        <DataTemplate DataType="{x:Type TypeName=vm:HelloWorldVM}">\r\n            \x3c!--\xc0 retirer \xe9ventuellement--\x3e\r\n            <v:UcHelloWorld />\r\n        </DataTemplate>\r\n        <DataTemplate DataType="{x:Type TypeName=vm:ListeCategoriesVM}">\r\n            <v:UcListeCategories />\r\n        </DataTemplate>\r\n        <DataTemplate DataType="{x:Type TypeName=vm:ListeCartesVM}">\r\n            <v:UcListeCartes />\r\n        </DataTemplate>\r\n    </Window.Resources>\r\n\t//highlight-start\r\n    <Grid>\r\n        <Grid.RowDefinitions>\r\n            <RowDefinition Height="auto"/>\r\n            <RowDefinition Height="*"/>\r\n        </Grid.RowDefinitions>\r\n        <Menu Grid.Row="0" HorizontalContentAlignment="Stretch" VerticalAlignment="Stretch">\r\n            <MenuItem Header="_Fichier">\r\n                <MenuItem Header="_Quitter" />\r\n            </MenuItem>\r\n            <MenuItem Header="_Administration">\r\n                <MenuItem Header="Liste des _cartes" Command="{Binding NaviguerListeCartesVMCommande}"/>\r\n                <MenuItem Header="Liste des ca_t\xe9gories" Command="{Binding NaviguerListeCategoriesVMCommande}"/>\r\n            </MenuItem>            \r\n        </Menu>\r\n\r\n        <ContentControl Grid.Row="1"  Content="{Binding Navigateur.VMActif}" />                \r\n    </Grid>\r\n\t//highlight-end\r\n</Window>\n'})}),"\n",(0,i.jsx)(n.p,{children:"La fen\xeatre a maintenant 2 rang\xe9es dans sa grille."}),"\n",(0,i.jsx)(n.p,{children:"La premi\xe8re rang\xe9e sera pour le menu et la 2e pour la vue."}),"\n",(0,i.jsx)(n.p,{children:"La hauteur de la premi\xe8re rang\xe9e est automatique afin d'avoir un menu qui s'adapte en fonction"}),"\n",(0,i.jsxs)(n.p,{children:["Ensuite, la barre de menu classique utilise le composant ",(0,i.jsx)(n.strong,{children:"<Menu>"})," (ligne 31 ). Chaque \xe9l\xe9ment du menu est un composant ",(0,i.jsx)(n.strong,{children:"<MenuItem>"}),". Il est possible d'imbriquer les ",(0,i.jsx)(n.strong,{children:"<MenuItem>"})," pour faire des sous-menus."]}),"\n",(0,i.jsxs)(n.p,{children:["Les propri\xe9t\xe9s ",(0,i.jsx)(n.strong,{children:"HorizontalContentAlignment"})," et ",(0,i.jsx)(n.strong,{children:"VerticalAlignment"})," ont la valeur ",(0,i.jsx)(n.strong,{children:"Stretch"})," pour prendre tout l'espace disponible. Il n'est pas n\xe9cessaire de mettre le menu dans un ",(0,i.jsx)(n.strong,{children:"<WrapPanel>"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Le ",(0,i.jsx)(n.strong,{children:"<MenuItem>"})," est assign\xe9 \xe0 une commande (ligne 36)."]}),"\n",(0,i.jsxs)(n.p,{children:["La navigation d'une barre de menu classique peut se faire par le clavier en appuyant sur la touche ",(0,i.jsx)(n.strong,{children:"ALT"}),". Le menu indique la lettre qu'il faut appuyer pour s\xe9lectionner le menu. Cette lettre est soulign\xe9e. Pour \xeatre en mesure d'assigner cette lettre, il faut mettre la barre en bas ",(0,i.jsx)(n.strong,{children:"(underscore)"})," avant la lettre. Pour le menu fichier, le nom est ",(0,i.jsx)(n.strong,{children:"_Fichier"})," , donc c'est le ",(0,i.jsx)(n.strong,{children:"F"}),". Pour le menu ",(0,i.jsx)(n.strong,{children:"Liste des ca_t\xe9gories"}),", c'est le ",(0,i.jsx)(n.strong,{children:"t"}),", car le ",(0,i.jsx)(n.strong,{children:"c"}),"  est d\xe9j\xe0 utilis\xe9 dans ce sous-menu, et le ",(0,i.jsx)(n.strong,{children:"a"})," est pour ",(0,i.jsx)(n.strong,{children:"A"}),"dministration."]}),"\n",(0,i.jsx)(n.p,{children:"Par convention, on prend la premi\xe8re lettre si elle est disponible."}),"\n",(0,i.jsx)(n.p,{children:"D\xe9marrez le logiciel et il sera possible de naviguer avec le menu."}),"\n",(0,i.jsx)(n.p,{children:"Diminuez la taille de la fen\xeatre et le menu s'ajustera."}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsx)(n.p,{children:"Pour le TP 3\r\nIl faut que le menu soit traduit avec les fichiers ressources. N'oubliez pas la lettre pour le raccourci."})})]})}function c(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>o,a:()=>s});var i=r(7294);const t={},a=i.createContext(t);function s(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);