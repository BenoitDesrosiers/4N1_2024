"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[2451],{7214:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>s,default:()=>d,frontMatter:()=>a,metadata:()=>o,toc:()=>l});var i=t(5893),r=t(1151);const a={sidebar_position:460,draft:!1},s="Menu et s\xe9curit\xe9",o={id:"WPF partie 4/securite",title:"Menu et s\xe9curit\xe9",description:"Il existe 2 visions pour la gestion d'un menu dans une application native pour la s\xe9curit\xe9.",source:"@site/docs/76-WPF partie 4/securite.md",sourceDirName:"76-WPF partie 4",slug:"/WPF partie 4/securite",permalink:"/4N1_2024/docs/WPF partie 4/securite",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:460,frontMatter:{sidebar_position:460,draft:!1},sidebar:"NotesSidebar",previous:{title:"Liste des cartes de l'utilisateur",permalink:"/4N1_2024/docs/WPF partie 4/liste_carte_utilisateur"},next:{title:"Suppression d'une carte d'un utilisateur - Explication",permalink:"/4N1_2024/docs/WPF partie 4/suppression_carte_utilisateur"}},u={},l=[{value:"Ajout de la commande - MainWindowVM",id:"ajout-de-la-commande---mainwindowvm",level:2},{value:"Ajout de Mes cartes dans le menu - MainWindow.xaml",id:"ajout-de-mes-cartes-dans-le-menu---mainwindowxaml",level:2}];function c(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"menu-et-s\xe9curit\xe9",children:"Menu et s\xe9curit\xe9"}),"\n",(0,i.jsx)(n.p,{children:"Il existe 2 visions pour la gestion d'un menu dans une application native pour la s\xe9curit\xe9."}),"\n",(0,i.jsx)(n.p,{children:"Il serait possible pour la s\xe9curit\xe9 de masquer les menus auxquels l'utilisateur n'a pas acc\xe8s. Il faudrait lier une propri\xe9t\xe9 \xe0 chacun des items du menu pour g\xe9rer la visibilit\xe9 ou non. Cette approche \xe9vite d'exposer des menus non n\xe9cessaires \xe0 l'utilisateur. Cependant, cette approche peut occasionner de l'incompr\xe9hension, car l'utilisateur peut chercher un menu qu'il ne voit pas. Il ne lui viendra peut-\xeatre pas d'instinct que la raison est qu'il n'y a pas acc\xe8s."}),"\n",(0,i.jsx)(n.p,{children:"L'autre option est de laisser le menu visible et accessible et de notifier l'utilisateur qu'il n'a pas acc\xe8s. Cette approche permet d'avoir un menu uniforme et l'utilisateur sait exactement pourquoi il n'est pas en mesure d'acc\xe9der \xe0 une section."}),"\n",(0,i.jsx)(n.admonition,{type:"info",children:(0,i.jsxs)(n.p,{children:["Pour ce projet et le ",(0,i.jsx)(n.strong,{children:"TP 3"}),", les menus seront toujours accessibles et visibles. Ce sera lors de l'initialisation du ",(0,i.jsx)(n.strong,{children:"ViewModel"})," que le message sera envoy\xe9 \xe0 l'utilisateur en cas de non-acc\xe8s."]})}),"\n",(0,i.jsxs)(n.p,{children:["Nous allons ajouter l'item ",(0,i.jsx)(n.strong,{children:"Mes cartes"})," dans le menu."]}),"\n",(0,i.jsx)(n.h2,{id:"ajout-de-la-commande---mainwindowvm",children:"Ajout de la commande - MainWindowVM"}),"\n",(0,i.jsxs)(n.p,{children:["Il faut ajouter la commande pour faire la navigation vers le ",(0,i.jsx)(n.strong,{children:"ViewModel ListeMesCartesVM"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Modifiez la classe ",(0,i.jsx)(n.strong,{children:"MainWindowVM"})," pour celle-ci."]}),"\n",(0,i.jsxs)(n.p,{children:["Aux lignes 18 et 28, il y a la nouvelle commande ",(0,i.jsx)(n.strong,{children:"NaviguerListeMesCartesVMCommande"})," et sa cr\xe9ation."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:"using CommunityToolkit.Mvvm.Input;\r\n\r\nnamespace SuperCarte.WPF.ViewModels;\r\n\r\npublic class MainWindowVM : BaseVM\r\n{\r\n    private readonly INavigateur _navigateur;\r\n    private readonly IAuthentificateur _authentificateur;\r\n\r\n    public MainWindowVM(INavigateur navigateur, IAuthentificateur authentificateur)\r\n\t{           \r\n        _navigateur = navigateur;\r\n        _authentificateur = authentificateur;\r\n\r\n        //Cr\xe9ation des commandes\r\n        NaviguerListeCartesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCartesVM>);\r\n        NaviguerListeCategoriesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCategoriesVM>);\r\n        //highlight-next-line\r\n        NaviguerListeMesCartesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeMesCartesVM>);\r\n\r\n        //Vue initiale\r\n        _navigateur.Naviguer<ConnexionVM>();\r\n    }\r\n\r\n    public IRelayCommand NaviguerListeCartesVMCommande {  get; private set; }\r\n\r\n    public IRelayCommand NaviguerListeCategoriesVMCommande { get; private set; }\r\n\r\n//highlight-next-line\r\n    public IRelayCommand NaviguerListeMesCartesVMCommande { get; private set; }\r\n\r\n    public INavigateur Navigateur\r\n    { \r\n        get\r\n        {\r\n            return _navigateur;\r\n        }\r\n    }\r\n    \r\n    public IAuthentificateur Authentificateur\r\n    {\r\n        get \r\n        {\r\n            return _authentificateur;\r\n        }\r\n    }\r\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"ajout-de-mes-cartes-dans-le-menu---mainwindowxaml",children:"Ajout de Mes cartes dans le menu - MainWindow.xaml"}),"\n",(0,i.jsxs)(n.p,{children:["Modifiez le fichier ",(0,i.jsx)(n.strong,{children:"MainWindow.xaml"})," pour le code ci-dessous."]}),"\n",(0,i.jsxs)(n.p,{children:["\xc0 la ligne 54, il y a le nouvel item dans le menu. Le menu ",(0,i.jsx)(n.strong,{children:"Mes cartes"})," est directement dans la barre."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-xaml",metastring:"showLineNumbers ",children:'<Window x:Class="SuperCarte.WPF.MainWindow"\r\n        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"\r\n        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"\r\n        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"\r\n        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"\r\n        xmlns:local="clr-namespace:SuperCarte.WPF"  \r\n        xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"\r\n        xmlns:v="clr-namespace:SuperCarte.WPF.Views"                \r\n        mc:Ignorable="d"         \r\n        d:DataContext="{d:DesignInstance Type=vm:MainWindowVM}"\r\n        Title="Super Carte App" \r\n        Height="450" Width="800" WindowState="Maximized">\r\n    <Window.Resources>\r\n        <BooleanToVisibilityConverter x:Key="BooleanToVisibilityConverter" />\r\n        \r\n        \x3c!--Assignation du ViewModel \xe0 Vue--\x3e\r\n        <DataTemplate DataType="{x:Type TypeName=vm:HelloWordVM}">\r\n            \x3c!--\xc0 retirer \xe9ventuellement--\x3e\r\n            <v:UcHelloWorld />\r\n        </DataTemplate>\r\n        <DataTemplate DataType="{x:Type TypeName=vm:ListeCategoriesVM}">\r\n            <v:UcListeCategories />\r\n        </DataTemplate>\r\n        <DataTemplate DataType="{x:Type TypeName=vm:ListeCartesVM}">\r\n            <v:UcListeCartes />\r\n        </DataTemplate>\r\n        <DataTemplate DataType="{x:Type TypeName=vm:GestionCategorieVM}">\r\n            <v:UcGestionCategorie />\r\n        </DataTemplate>\r\n        <DataTemplate DataType="{x:Type TypeName=vm:GestionUtilisateurVM}">\r\n            <v:UcGestionUtilisateur />\r\n        </DataTemplate>\r\n        <DataTemplate DataType="{x:Type TypeName=vm:ConnexionVM}">\r\n            <v:UcConnexion />\r\n        </DataTemplate>\r\n        <DataTemplate DataType="{x:Type TypeName=vm:ListeMesCartesVM}">\r\n            <v:UcListeMesCartes />\r\n        </DataTemplate>\r\n    </Window.Resources>\r\n    <Grid>\r\n        <Grid.RowDefinitions>\r\n            <RowDefinition Height="auto"/>\r\n            <RowDefinition Height="*"/>\r\n        </Grid.RowDefinitions>\r\n        <Menu Grid.Row="0" HorizontalContentAlignment="Stretch" VerticalAlignment="Stretch"\r\n              Visibility="{Binding Authentificateur.EstAuthentifie, Converter={StaticResource BooleanToVisibilityConverter}}">\r\n            <MenuItem Header="_Fichier">\r\n                <MenuItem Header="_Quitter" />\r\n            </MenuItem>\r\n            <MenuItem Header="_Administration">\r\n                <MenuItem Header="Liste des _cartes" Command="{Binding NaviguerListeCartesVMCommande}"/>\r\n                <MenuItem Header="Liste des c_at\xe9gories" Command="{Binding NaviguerListeCategoriesVMCommande}"/>\r\n            </MenuItem>\r\n            //highlight-next-line\r\n            <MenuItem Header="_Mes cartes" Command="{Binding NaviguerListeMesCartesVMCommande}"/>\r\n        </Menu>\r\n\r\n        <ContentControl Grid.Row="1"  Content="{Binding Navigateur.VMActif}" />                \r\n    </Grid>\r\n</Window>\n'})})]})}function d(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>o,a:()=>s});var i=t(7294);const r={},a=i.createContext(r);function s(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);