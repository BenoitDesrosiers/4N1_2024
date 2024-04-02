"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[960],{9594:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>o,contentTitle:()=>s,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>u});var i=r(5893),t=r(1151);const a={sidebar_position:445,draft:!1},s="Masquer le menu",l={id:"WPF partie 4/masquer_menu",title:"Masquer le menu",description:"Si vous d\xe9marrez l'application, le menu est toujours accessible lorsque c'est la vue de connexion. Il serait pr\xe9f\xe9rable de le masquer.",source:"@site/docs/76-WPF partie 4/masquer_menu.md",sourceDirName:"76-WPF partie 4",slug:"/WPF partie 4/masquer_menu",permalink:"/4N1_2024/docs/WPF partie 4/masquer_menu",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:445,frontMatter:{sidebar_position:445,draft:!1},sidebar:"NotesSidebar",previous:{title:"Message \xe0 l'utilisateur - MessageBox",permalink:"/4N1_2024/docs/WPF partie 4/msg_utilisateur"},next:{title:"Liste des cartes de l'utilisateur",permalink:"/4N1_2024/docs/WPF partie 4/liste_carte_utilisateur"}},o={},u=[{value:"Activer la OnPropertyChanged - Authentificateur",id:"activer-la-onpropertychanged---authentificateur",level:2},{value:"Modification du MainWindowVM",id:"modification-du-mainwindowvm",level:2},{value:"Lier la propri\xe9t\xe9 Visibility du menu - MainWindow.xaml",id:"lier-la-propri\xe9t\xe9-visibility-du-menu---mainwindowxaml",level:2},{value:"Test",id:"test",level:2}];function c(e){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"masquer-le-menu",children:"Masquer le menu"}),"\n",(0,i.jsx)(n.p,{children:"Si vous d\xe9marrez l'application, le menu est toujours accessible lorsque c'est la vue de connexion. Il serait pr\xe9f\xe9rable de le masquer."}),"\n",(0,i.jsxs)(n.p,{children:["Pour faire ceci, il faut lier la propri\xe9t\xe9 de visibilit\xe9 du menu \xe0 la propri\xe9t\xe9 ",(0,i.jsx)(n.strong,{children:"EstAuthentifie"})," de la classe ",(0,i.jsx)(n.strong,{children:"Authentificateur"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"activer-la-onpropertychanged---authentificateur",children:"Activer la OnPropertyChanged - Authentificateur"}),"\n",(0,i.jsxs)(n.p,{children:["Modifiez la classe ",(0,i.jsx)(n.strong,{children:"Aides/Authentificateur"})," par celle-ci."]}),"\n",(0,i.jsxs)(n.p,{children:["Il faut activer la notification du changement de valeur d'une propri\xe9t\xe9 dans la classe d'assistance ",(0,i.jsx)(n.strong,{children:"Authentificateur"}),". Il faut h\xe9riter de la classe ",(0,i.jsx)(n.strong,{children:"ObservableObject"})," qui provient de la librairie ",(0,i.jsx)(n.strong,{children:"MVVM Toolkit"})," (ligne 9)."]}),"\n",(0,i.jsxs)(n.p,{children:["Il faut ensuite ajouter l'attribut ",(0,i.jsx)(n.strong,{children:"_estAuthentifie"})," (ligne 12).\r\nEnsuite, il faut modifier la propri\xe9t\xe9 ",(0,i.jsx)(n.strong,{children:"EstAuthentifie"})," pour activer la notification sur le ",(0,i.jsx)(n.strong,{children:"set"})," (lignes 58-68).\r\n\xc9tant donn\xe9 que la propri\xe9t\xe9 n'avait pas d'attribut, elle contenait le get,set par d\xe9faut. Il faut les remplacer par la version permettant de changer la propri\xe9t\xe9."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:"using CommunityToolkit.Mvvm.ComponentModel;\r\nusing System.Linq;\r\n\r\nnamespace SuperCarte.WPF.Aides;\r\n\r\n/// <summary>\r\n/// Classe qui repr\xe9sente la classe d'assistance pour l'authentification et l'autorisation\r\n/// </summary>\r\n//highlight-next-line\r\npublic class Authentificateur : ObservableObject, IAuthentificateur\r\n{\r\n    private readonly IUtilisateurService _utilisateurService;\r\n    //highlight-next-line\r\n    private bool _estAuthentifie = false;\r\n\r\n    /// <summary>\r\n    /// Constructeur\r\n    /// </summary>\r\n    /// <param name=\"utilisateurService\">Service du mod\xe8le utilisateur</param>\r\n    public Authentificateur(IUtilisateurService utilisateurService)\r\n    {\r\n        _utilisateurService = utilisateurService;\r\n    }\r\n\r\n    public async Task<bool> AuthentifierUtilisateurAsync(string nomUtilisateur, string motPasse)\r\n    {\r\n        UtilisateurAuthentifie = await _utilisateurService.AuthentifierUtilisateurAsync(nomUtilisateur, motPasse);\r\n\r\n        EstAuthentifie = UtilisateurAuthentifie != null;\r\n\r\n        return EstAuthentifie;\r\n    }\r\n\r\n    public async Task<bool> EstAutoriseAsync(params string[] nomRoles)\r\n    {\r\n        if (UtilisateurAuthentifie != null)\r\n        {\r\n            return await _utilisateurService.AutoriserUtilisateurParRolesAsync(UtilisateurAuthentifie.UtilisateurId, nomRoles.ToList());\r\n        }\r\n        else\r\n        {\r\n            return await Task.FromResult(false);\r\n        }\r\n    }\r\n\r\n    public bool EstAutorise(params string[] nomRoles)\r\n    {\r\n        if (UtilisateurAuthentifie != null)\r\n        {\r\n            return _utilisateurService.AutoriserUtilisateurParRoles(UtilisateurAuthentifie.UtilisateurId, nomRoles.ToList());\r\n        }\r\n        else\r\n        {\r\n            return false;\r\n        }\r\n    }\r\n\r\n    public UtilisateurAuthentifieModel? UtilisateurAuthentifie { get; private set; }\r\n\r\n//highlight-start\r\n    public bool EstAuthentifie \r\n    { \r\n        get\r\n        {\r\n            return _estAuthentifie;\r\n        }\r\n        private set\r\n        {\r\n            SetProperty(ref _estAuthentifie, value);\r\n        }\r\n    }\r\n//highlight-end\r\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"modification-du-mainwindowvm",children:"Modification du MainWindowVM"}),"\n",(0,i.jsxs)(n.p,{children:["Il faut modifier la classe ",(0,i.jsx)(n.strong,{children:"MainWindowVM"})," pour rendre accessible la classe d'assistance ",(0,i.jsx)(n.strong,{children:"Authentificateur"})," par une propri\xe9t\xe9."]}),"\n",(0,i.jsxs)(n.p,{children:["Il faut injecter la d\xe9pendance ",(0,i.jsx)(n.strong,{children:"IAuthentificateur"})," dans le constructeur (lignes 8, 10 et 13, 35-40)."]}),"\n",(0,i.jsxs)(n.p,{children:["Cette propri\xe9t\xe9 permettra \xe0 un composant de se lier \xe0 la propri\xe9t\xe9 ",(0,i.jsx)(n.strong,{children:"Authentificateur.EstAuthentifie"})," ."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:"using CommunityToolkit.Mvvm.Input;\r\n\r\nnamespace SuperCarte.WPF.ViewModels;\r\n\r\npublic class MainWindowVM : BaseVM\r\n{\r\n    private readonly INavigateur _navigateur;\r\n    //highlight-next-line\r\n    private readonly IAuthentificateur _authentificateur;\r\n\r\n//highlight-next-line\r\n    public MainWindowVM(INavigateur navigateur, IAuthentificateur authentificateur)\r\n\t{   \r\n        _navigateur = navigateur;\r\n        //highlight-next-line\r\n        _authentificateur = authentificateur;\r\n\r\n        //Cr\xe9ation des commandes\r\n        NaviguerListeCartesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCartesVM>);\r\n        NaviguerListeCategoriesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCategoriesVM>);\r\n\r\n        //Vue initiale\r\n        _navigateur.Naviguer<ConnexionVM>();\r\n    }\r\n\r\n    public IRelayCommand NaviguerListeCartesVMCommande {  get; private set; }\r\n\r\n    public IRelayCommand NaviguerListeCategoriesVMCommande { get; private set; }\r\n\r\n    public INavigateur Navigateur\r\n    { \r\n        get\r\n        {\r\n            return _navigateur;\r\n        }\r\n    }\r\n    \r\n    //highlight-start\r\n    public IAuthentificateur Authentificateur\r\n    {\r\n        get \r\n        {\r\n            return _authentificateur;\r\n        }\r\n    }\r\n    //highlight-end\r\n}\n"})}),"\n",(0,i.jsx)(n.h2,{id:"lier-la-propri\xe9t\xe9-visibility-du-menu---mainwindowxaml",children:"Lier la propri\xe9t\xe9 Visibility du menu - MainWindow.xaml"}),"\n",(0,i.jsxs)(n.p,{children:["La propri\xe9t\xe9 ",(0,i.jsx)(n.strong,{children:"Visibility"})," n'accepte pas un bool\xe9en comme valeur. Il y a 3 valeurs ",(0,i.jsx)(n.strong,{children:"Collapsed, Hidden et Visible"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Il faut utiliser un convertisseur ",(0,i.jsx)(n.strong,{children:"BooleanToVisibilityConverter"})," pour que ",(0,i.jsx)(n.strong,{children:"true = Visible"})," et que ",(0,i.jsx)(n.strong,{children:"false = Collapsed"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Collapsed"})," ne cr\xe9e pas le composant. Il ne prend pas d'espace dans la vue."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Hidden"})," cr\xe9e le composant et il prend l'espace qui lui est assign\xe9 dans la vue, mais ne l'affiche pas."]}),"\n",(0,i.jsxs)(n.p,{children:["Modifiez le fichier ",(0,i.jsx)(n.strong,{children:"MainWindow.xaml"})," par celui-ci."]}),"\n",(0,i.jsxs)(n.p,{children:["\xc0 la ligne 14, il faut inclure le convertisseur dans les ressources de l'application. ",(0,i.jsx)(n.strong,{children:"WPF"})," fournit le convertisseur ",(0,i.jsx)(n.strong,{children:"BooleanToVisibilityConverter"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["\xc0 la ligne 43, il faut faire la liaison avec la propri\xe9t\xe9 ",(0,i.jsx)(n.strong,{children:"Authentificateur.EstAuthentifie"}),". Dans le ",(0,i.jsx)(n.strong,{children:"Binding"}),", il faut indiquer que la valeur doit \xeatre convertie ",(0,i.jsx)(n.strong,{children:"Converter={StaticResource BooleanToVisibilityConverter}"})," avec un convertisseur. Il faut utiliser le nom de la cl\xe9 de la ressource dans le ",(0,i.jsx)(n.strong,{children:"Binding"}),". Dans ce cas-ci, la cl\xe9 a le m\xeame nom que le convertisseur."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:'<Window x:Class="SuperCarte.WPF.MainWindow"\r\n        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"\r\n        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"\r\n        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"\r\n        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"\r\n        xmlns:local="clr-namespace:SuperCarte.WPF"  \r\n        xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"\r\n        xmlns:v="clr-namespace:SuperCarte.WPF.Views"                \r\n        mc:Ignorable="d"         \r\n        d:DataContext="{d:DesignInstance Type=vm:MainWindowVM}"\r\n        Title="Super Carte App" \r\n        Height="450" Width="800" WindowState="Maximized">\r\n    <Window.Resources>\r\n    //highlight-next-line\r\n        <BooleanToVisibilityConverter x:Key="BooleanToVisibilityConverter" />\r\n        \r\n        \x3c!--Assignation du ViewModel \xe0 Vue--\x3e\r\n        <DataTemplate DataType="{x:Type TypeName=vm:HelloWordVM}">\r\n            \x3c!--\xc0 retirer \xe9ventuellement--\x3e\r\n            <v:UcHelloWorld />\r\n        </DataTemplate>\r\n        <DataTemplate DataType="{x:Type TypeName=vm:ListeCategoriesVM}">\r\n            <v:UcListeCategories />\r\n        </DataTemplate>\r\n        <DataTemplate DataType="{x:Type TypeName=vm:ListeCartesVM}">\r\n            <v:UcListeCartes />\r\n        </DataTemplate>\r\n        <DataTemplate DataType="{x:Type TypeName=vm:GestionCategorieVM}">\r\n            <v:UcGestionCategorie />\r\n        </DataTemplate>\r\n        <DataTemplate DataType="{x:Type TypeName=vm:GestionUtilisateurVM}">\r\n            <v:UcGestionUtilisateur />\r\n        </DataTemplate>\r\n        <DataTemplate DataType="{x:Type TypeName=vm:ConnexionVM}">\r\n            <v:UcConnexion />\r\n        </DataTemplate>\r\n    </Window.Resources>\r\n    <Grid>\r\n        <Grid.RowDefinitions>\r\n            <RowDefinition Height="auto"/>\r\n            <RowDefinition Height="*"/>\r\n        </Grid.RowDefinitions>\r\n        //highlight-next-line\r\n        <Menu Grid.Row="0" HorizontalContentAlignment="Stretch" VerticalAlignment="Stretch"\r\n        //highlight-next-line\r\n              Visibility="{Binding Authentificateur.EstAuthentifie, Converter={StaticResource BooleanToVisibilityConverter}}">\r\n            <MenuItem Header="_Fichier">\r\n                <MenuItem Header="_Quitter" />\r\n            </MenuItem>\r\n            <MenuItem Header="_Administration">\r\n                <MenuItem Header="Liste des _cartes" Command="{Binding NaviguerListeCartesVMCommande}"/>\r\n                <MenuItem Header="Liste des c_at\xe9gories" Command="{Binding NaviguerListeCategoriesVMCommande}"/>\r\n            </MenuItem>            \r\n        </Menu>\r\n\r\n        <ContentControl Grid.Row="1"  Content="{Binding Navigateur.VMActif}" />                \r\n    </Grid>\r\n</Window>\n'})}),"\n",(0,i.jsx)(n.h2,{id:"test",children:"Test"}),"\n",(0,i.jsx)(n.p,{children:"Red\xe9marrez le projet. Tant que vous ne serez pas connect\xe9, le menu ne s'affichera pas."})]})}function d(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>l,a:()=>s});var i=r(7294);const t={},a=i.createContext(t);function s(e){const n=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),i.createElement(a.Provider,{value:n},e.children)}}}]);