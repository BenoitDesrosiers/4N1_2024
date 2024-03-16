"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[3404],{4810:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>t,metadata:()=>a,toc:()=>d});var s=r(5893),i=r(1151);const t={sidebar_position:212,draft:!1},l="Pr\xe9paration du projet WPF",a={id:"WPF partie 2/preparation_projet_wpf",title:"Pr\xe9paration du projet WPF",description:"Il faut pr\xe9parer le projet WPF pour \xeatre en mesure d'int\xe9grer un Contr\xf4le utilisateur (WPF) dans le MainWindow.",source:"@site/docs/72-WPF partie 2/preparation_projet_wpf.md",sourceDirName:"72-WPF partie 2",slug:"/WPF partie 2/preparation_projet_wpf",permalink:"/4N1_2024/docs/WPF partie 2/preparation_projet_wpf",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:212,frontMatter:{sidebar_position:212,draft:!1},sidebar:"NotesSidebar",previous:{title:"Code Partie 2",permalink:"/4N1_2024/docs/WPF partie 2/wpf_partie2_source"},next:{title:"HelloWorld en WPF",permalink:"/4N1_2024/docs/WPF partie 2/helloworld_wpf"}},o={},d=[{value:"Librairie MVVM Toolkit",id:"librairie-mvvm-toolkit",level:2},{value:"Cr\xe9ation d&#39;une classe de base - BaseVM",id:"cr\xe9ation-dune-classe-de-base---basevm",level:2},{value:"Cr\xe9ation du ViewModel - MainWindowVM",id:"cr\xe9ation-du-viewmodel---mainwindowvm",level:2},{value:"Enregistrer le ViewModel - SCViewModelExtensions",id:"enregistrer-le-viewmodel---scviewmodelextensions",level:2},{value:"Modification du design de la vue - MainWindows.xaml",id:"modification-du-design-de-la-vue---mainwindowsxaml",level:2},{value:"Modification du code de la vue - MainWindow.xaml.cs",id:"modification-du-code-de-la-vue---mainwindowxamlcs",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"pr\xe9paration-du-projet-wpf",children:"Pr\xe9paration du projet WPF"}),"\n",(0,s.jsxs)(n.p,{children:["Il faut pr\xe9parer le projet ",(0,s.jsx)(n.strong,{children:"WPF"})," pour \xeatre en mesure d'int\xe9grer un ",(0,s.jsx)(n.strong,{children:"Contr\xf4le utilisateur (WPF)"})," dans le ",(0,s.jsx)(n.strong,{children:"MainWindow"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Le ",(0,s.jsx)(n.strong,{children:"MainWindow"})," \xe9voluera en cours de projet. Pour l'instant, il sera le plus simple possible pour \xeatre en mesure de d\xe9marrer le projet."]}),"\n",(0,s.jsxs)(n.p,{children:["Cr\xe9ez les dossiers ",(0,s.jsx)(n.strong,{children:"ViewModels"})," et ",(0,s.jsx)(n.strong,{children:"Views"})," \xe0 la racine du projet ",(0,s.jsx)(n.strong,{children:"SuperCarte.WPF"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"librairie-mvvm-toolkit",children:"Librairie MVVM Toolkit"}),"\n",(0,s.jsxs)(n.p,{children:["Il existe une librairie qui permet de g\xe9rer plus facilement la gestion du ",(0,s.jsx)(n.strong,{children:"MVVM"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"Cette librairie offre \xe9norm\xe9ment de fonctionnalit\xe9s pour acc\xe9l\xe9rer le d\xe9veloppement."}),"\n",(0,s.jsxs)(n.p,{children:["La librairie sera utilis\xe9e pour la classe ",(0,s.jsx)(n.strong,{children:"ObservableObject"})," et pour les classes ",(0,s.jsx)(n.strong,{children:"RelayCommand"}),". Il aurait \xe9t\xe9 possible de cr\xe9er manuellement ces classes, mais elles ont d\xe9j\xe0 \xe9t\xe9 cr\xe9\xe9es. Il n'est pas utile de recr\xe9er ces classes identiques."]}),"\n",(0,s.jsxs)(n.p,{children:["Dans la ",(0,s.jsx)(n.strong,{children:"Console du Gestionnaire de package"}),", inscrivez la commande ci-dessous."]}),"\n",(0,s.jsx)(n.admonition,{title:"Attention",type:"warning",children:(0,s.jsxs)(n.p,{children:["Il est important que le ",(0,s.jsx)(n.strong,{children:"Projet par d\xe9faut"})," ",(0,s.jsx)(n.strong,{children:"WPF"})," soit s\xe9lectionn\xe9 dans la console. Pour ce projet, ce doit \xeatre ",(0,s.jsx)(n.strong,{children:"SuperCarte.WPF"}),". \xc0 ce stade, il y a ",(0,s.jsx)(n.strong,{children:"plusieurs projets"})," et il est important de le modifier dans la liste."]})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"Install-Package CommunityToolkit.Mvvm\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Pour plus d'information : ",(0,s.jsx)(n.a,{href:"https://learn.microsoft.com/fr-ca/dotnet/communitytoolkit/mvvm/",children:"https://learn.microsoft.com/fr-ca/dotnet/communitytoolkit/mvvm/"})]}),"\n",(0,s.jsx)(n.h2,{id:"cr\xe9ation-dune-classe-de-base---basevm",children:"Cr\xe9ation d'une classe de base - BaseVM"}),"\n",(0,s.jsxs)(n.p,{children:["Il faut cr\xe9er la classe parent des ",(0,s.jsx)(n.strong,{children:"ViewModels"}),". Cette classe sera utilis\xe9e pour la navigation et pour les fonctionnalit\xe9s communes aux ",(0,s.jsx)(n.strong,{children:"ViewModels"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Cr\xe9ez le dossier ",(0,s.jsx)(n.strong,{children:"ViewModels\\Bases"})," \xe0 la racine du projet ",(0,s.jsx)(n.strong,{children:"SuperCarte.WPF"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Cr\xe9ez la classe ",(0,s.jsx)(n.strong,{children:"BaseVM.cs"}),"  dans le dossier ",(0,s.jsx)(n.strong,{children:"ViewModels\\Bases"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:"using CommunityToolkit.Mvvm.ComponentModel;\r\n\r\nnamespace SuperCarte.WPF.ViewModels.Bases;\r\n\r\n/// <summary>\r\n/// Classe abstraite pour du View Model\r\n/// </summary>\r\npublic abstract class BaseVM : ObservableObject\r\n{\r\n    \r\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["La classe h\xe9rite de la classe ",(0,s.jsx)(n.strong,{children:"ObservableObject"})," qui provient du ",(0,s.jsx)(n.strong,{children:"MVVM Toolkit"}),". Elle est actuellement vide, mais avoir le type ",(0,s.jsx)(n.strong,{children:"BaseVM"})," sera utile pour la navigation et \xe9ventuellement, il y aura la validation."]}),"\n",(0,s.jsxs)(n.p,{children:["Voici une partie du code de la classe ",(0,s.jsx)(n.strong,{children:"ObservableObject"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["La classe impl\xe9mente l'interface ",(0,s.jsx)(n.strong,{children:"INotifyPropertyChanged"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Cette interface contient l'\xe9v\xe9nement ",(0,s.jsx)(n.strong,{children:"PropertyChanged"}),". Lorsqu'un composant est li\xe9 \xe0 une propri\xe9t\xe9 du ",(0,s.jsx)(n.strong,{children:"ViewModel"}),", il s'enregistre \xe0 cet \xe9v\xe9nement s'il est disponible. C'est par cet \xe9v\xe9nement qu'il est possible d'avertir la vue qu'il y a eu un changement de valeur dans la propri\xe9t\xe9 et que la vue doit mettre ce composant \xe0 jour."]}),"\n",(0,s.jsxs)(n.p,{children:["Il y a \xe9galement la m\xe9thode ",(0,s.jsx)(n.strong,{children:"SetProperty()"})," qui permet d'assigner la nouvelle valeur \xe0 la propri\xe9t\xe9. Elle permet \xe9galement de v\xe9rifier s'il y a r\xe9ellement eu un changement de valeur pour \xe9viter de soulever l'\xe9v\xe9nement ",(0,s.jsx)(n.strong,{children:"PropertyChanged"})," inutilement."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",metastring:'title="NE PAS COPIER"',children:"/// <summary>\r\n/// A base class for objects of which the properties must be observable.\r\n/// </summary>\r\npublic abstract class ObservableObject : INotifyPropertyChanged, INotifyPropertyChanging\r\n{\r\n   \r\n    public event PropertyChangedEventHandler? PropertyChanged;\r\n    \r\n    protected void OnPropertyChanged([CallerMemberName] string? propertyName = null)\r\n    {\r\n        OnPropertyChanged(new PropertyChangedEventArgs(propertyName));\r\n    }\r\n\r\n    \r\n    protected bool SetProperty<T>([NotNullIfNotNull(nameof(newValue))] ref T field, \r\n\t\t\t\t\tT newValue, \r\n\t\t\t\t\t[CallerMemberName] string? propertyName = null)\r\n    {        \r\n        if (EqualityComparer<T>.Default.Equals(field, newValue))\r\n        {\r\n            return false;\r\n        }\r\n\r\n        OnPropertyChanging(propertyName);\r\n\r\n        field = newValue;\r\n\r\n        OnPropertyChanged(propertyName);\r\n\r\n        return true;\r\n    }\r\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"cr\xe9ation-du-viewmodel---mainwindowvm",children:"Cr\xe9ation du ViewModel - MainWindowVM"}),"\n",(0,s.jsxs)(n.p,{children:["La fen\xeatre principale de l'application a besoin de son propre ",(0,s.jsx)(n.strong,{children:"ViewModel"}),". Les classes du ",(0,s.jsx)(n.strong,{children:"ViewModel"})," auront comme suffixe ",(0,s.jsx)(n.strong,{children:"VM"})," et elles seront dans le dossier ",(0,s.jsx)(n.strong,{children:"ViewModels"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Cr\xe9ez la classe ",(0,s.jsx)(n.strong,{children:"MainWindowVM.cs"}),"  dans ",(0,s.jsx)(n.strong,{children:"ViewModel"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:"using Microsoft.Extensions.DependencyInjection;\r\n\r\nnamespace SuperCarte.WPF.ViewModels;\r\n\r\npublic class MainWindowVM : BaseVM\r\n{    \r\n    public MainWindowVM(IServiceProvider serviceProvider)\r\n\t{   \r\n        //S\xe9lectionner le ViewModel de d\xe9marrage\r\n        //VMActif = serviceProvider.GetRequiredService<>();\r\n    }\r\n\r\n    public BaseVM VMActif { get; set; }\r\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["La classe a une propri\xe9t\xe9 ",(0,s.jsx)(n.strong,{children:"VMACtif"})," pour indiquer le ",(0,s.jsx)(n.strong,{children:"ViewModel"})," qui doit \xeatre affich\xe9. ",(0,s.jsx)(n.strong,{children:"WPF"})," est en mesure de savoir la ",(0,s.jsx)(n.strong,{children:"Vue"})," \xe0 utiliser en fonction du ",(0,s.jsx)(n.strong,{children:"ViewModel"})," actif."]}),"\n",(0,s.jsxs)(n.p,{children:["\xc0 la ligne 9, le ",(0,s.jsx)(n.strong,{children:"ViewModel"})," initial sera assign\xe9 comme celui qui est ",(0,s.jsx)(n.strong,{children:"Actif"}),". Cette approche sera un peu modifi\xe9e lorsque le ",(0,s.jsx)(n.strong,{children:"Navigateur"})," sera ajout\xe9 au projet."]}),"\n",(0,s.jsx)(n.h2,{id:"enregistrer-le-viewmodel---scviewmodelextensions",children:"Enregistrer le ViewModel - SCViewModelExtensions"}),"\n",(0,s.jsxs)(n.p,{children:["Dans la classe ",(0,s.jsx)(n.strong,{children:"Extensions/ServiceCollections/SCViewModelExtensions"}),", il faut enregistrer le ",(0,s.jsx)(n.strong,{children:"ViewModel"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:"using Microsoft.Extensions.DependencyInjection;\r\n\r\nnamespace SuperCarte.WPF.Extensions.ServiceCollections;\r\n\r\n/// <summary>\r\n/// Classe d'extension qui permet d'enregistrer les classes de la cat\xe9gorie Service\r\n/// </summary>\r\npublic static class SCViewModelExtensions\r\n{\r\n    /// <summary>\r\n    /// M\xe9thode qui permet d'enregistrer les ViewModels de l'application\r\n    /// </summary>\r\n    /// <param name=\"services\">La collection de services</param>\r\n    public static void EnregistrerViewModels(this IServiceCollection services)\r\n    {\r\n        //highlight-next-line\r\n        services.AddSingleton<MainWindowVM>();\r\n    }\r\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Remarquez ici qu'il n'y a pas d'interface lors de l'enregistrement du ",(0,s.jsx)(n.strong,{children:"ViewModel MainWindowVM"}),". Il n'est pas n\xe9cessaire pour cette classe d'utiliser une interface, car l'assignation entre ",(0,s.jsx)(n.strong,{children:"ViewModel"})," et la ",(0,s.jsx)(n.strong,{children:"Vue"})," associ\xe9e ne peut pas se faire par l'interface (nous verrons comment le faire plus tard). De plus, il n'y a pas de b\xe9n\xe9fice au niveau des tests d'utiliser une interface pour le ",(0,s.jsx)(n.strong,{children:"ViewModel"}),"."]}),"\n",(0,s.jsx)(n.admonition,{type:"info",children:(0,s.jsxs)(n.p,{children:["Notez que MainWindowVM a \xe9t\xe9 enregistr\xe9 en ",(0,s.jsx)(n.strong,{children:"Singleton"}),". Il faut avoir seulement une fen\xeatre active dans le programme. Les autres ",(0,s.jsx)(n.strong,{children:"ViewModels"})," seront enregistr\xe9s en ",(0,s.jsx)(n.strong,{children:"Transient"}),"."]})}),"\n",(0,s.jsx)(n.admonition,{title:"Important",type:"warning",children:(0,s.jsxs)(n.p,{children:["Si ce n'est pas d\xe9j\xe0 fait, ajoutez l'appel \xe0 ",(0,s.jsx)(n.strong,{children:"EnregistrerViewModels"})," dans ",(0,s.jsx)(n.strong,{children:"App.xaml.cs/App"})]})}),"\n",(0,s.jsx)(n.h2,{id:"modification-du-design-de-la-vue---mainwindowsxaml",children:"Modification du design de la vue - MainWindows.xaml"}),"\n",(0,s.jsxs)(n.p,{children:["Modifiez le code de la fen\xeatre ",(0,s.jsx)(n.strong,{children:"MainWindows.xaml"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-xaml",metastring:"showLineNumbers",children:'<Window x:Class="SuperCarte.WPF.MainWindow"\r\n        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"\r\n        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"\r\n        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"\r\n        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"\r\n        xmlns:local="clr-namespace:SuperCarte.WPF"  \r\n        xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"\r\n        mc:Ignorable="d"\r\n        d:DataContext="{d:DesignInstance Type=vm:MainWindowVM}"\r\n        Title="Super Carte App" \r\n        Height="450" Width="800" WindowState="Maximized">\r\n    <Window.Resources>\r\n        \x3c!--Assignation du ViewModel \xe0 Vue--\x3e\r\n    </Window.Resources>\r\n    <Grid>\r\n        <ContentControl Content="{Binding VMActif}" />\r\n    </Grid>\r\n</Window>\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Aux lignes 7 et 8, ce sont les d\xe9clarations des ",(0,s.jsx)(n.strong,{children:"namespaces"})," qui seront utiles dans cette vue."]}),"\n",(0,s.jsxs)(n.p,{children:["\xc0 la ligne 10, le pr\xe9fixe ",(0,s.jsx)(n.strong,{children:"v:"})," sera utilis\xe9 pour les ",(0,s.jsx)(n.strong,{children:"Vues"})," et le pr\xe9fixe ",(0,s.jsx)(n.strong,{children:"vm:"})," pour les ",(0,s.jsx)(n.strong,{children:"ViewModels"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["La ligne 10 sert \xe0 indiquer quel est le type du ",(0,s.jsx)(n.strong,{children:"DataContext"}),". Ce n'est pas une assignation r\xe9elle, mais un indicateur pour permettre les suggestions du code. Il sera donc possible de voir les propri\xe9t\xe9s du ",(0,s.jsx)(n.strong,{children:"ViewModel"})," lors du ",(0,s.jsx)(n.strong,{children:"Binding"}),". Cette \xe9tape n'est pas obligatoire, mais elle est recommand\xe9e pour faciliter la programmation."]}),"\n",(0,s.jsxs)(n.p,{children:["\xc0 la ligne 12, la propri\xe9t\xe9 ",(0,s.jsx)(n.strong,{children:'WindowState="Maximized"'})," permet de maximiser la fen\xeatre au maximum."]}),"\n",(0,s.jsxs)(n.p,{children:["\xc0 la ligne 13, ce sont les ",(0,s.jsx)(n.strong,{children:"ressources"})," disponibles \xe0 la fen\xeatre. C'est \xe0 cet endroit que le lien entre ",(0,s.jsx)(n.strong,{children:"ViewModel"})," et ",(0,s.jsx)(n.strong,{children:"Contr\xf4le utilisateur (WPF)"})," sera fait."]}),"\n",(0,s.jsxs)(n.p,{children:["\xc0 la ligne 17, il y a le contr\xf4le qui recevra le ",(0,s.jsx)(n.strong,{children:"Contr\xf4le utilisateur (WPF)"})," en fonction du ",(0,s.jsx)(n.strong,{children:"ViewModel"})," actif."]}),"\n",(0,s.jsx)(n.h2,{id:"modification-du-code-de-la-vue---mainwindowxamlcs",children:"Modification du code de la vue - MainWindow.xaml.cs"}),"\n",(0,s.jsxs)(n.p,{children:["Modifiez le code du fichier ",(0,s.jsx)(n.strong,{children:"MainWindow.xaml.cs"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:"using System.Windows;\r\n\r\nnamespace SuperCarte.WPF;\r\n/// <summary>\r\n/// Interaction logic for MainWindow.xaml\r\n/// </summary>\r\npublic partial class MainWindow : Window\r\n{\r\n    //highlight-next-line\r\n    public MainWindow(MainWindowVM mainWindowVM)\r\n    {\r\n        InitializeComponent();\r\n        //highlight-start\r\n        //Si non sp\xe9cifi\xe9, le format des donn\xe9es utilisera le format en-US\r\n        FrameworkElement.LanguageProperty.OverrideMetadata(typeof(FrameworkElement), \r\n            new FrameworkPropertyMetadata(System.Windows.Markup.XmlLanguage.GetLanguage(CultureInfo.CurrentUICulture.Name)));\r\n        DataContext = mainWindowVM;\r\n        //highlight-end\r\n    }\r\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Le constructeur re\xe7oit le ",(0,s.jsx)(n.strong,{children:"MainWindowVM"})," en d\xe9pendance."]}),"\n",(0,s.jsxs)(n.p,{children:["Le ",(0,s.jsx)(n.strong,{children:"ViewModel"})," est assign\xe9 au ",(0,s.jsx)(n.strong,{children:"DataContext"})," de la fen\xeatre \xe0 la ligne 15."]}),"\n",(0,s.jsxs)(n.p,{children:["Le ",(0,s.jsx)(n.strong,{children:"DataContext"})," est la source pour le binding dans ",(0,s.jsx)(n.strong,{children:"MainWindow.xaml"})]}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsx)(n.p,{children:"bien que le DataContext ait \xe9t\xe9 indiqu\xe9 dans le fichier xaml, ce n'\xe9tait que pour aider intellisence. L'assignation \xe0 la ligne 15 est la \"vrai\"."})}),"\n",(0,s.jsxs)(n.p,{children:["Il faut \xe9galement assigner la langue de la vue. G\xe9n\xe9ralement, lors de l'affichage d'une donn\xe9e, elle utilise le format correspondant dans les param\xe8tres r\xe9gionaux du syst\xe8me d'exploitation. Cette valeur provient de ",(0,s.jsx)(n.strong,{children:"CultureInfo.CurrentUICulture"}),". Par contre, avec WPF, il faut le sp\xe9cifier dans la structure de la vue."]}),"\n",(0,s.jsx)(n.p,{children:"La langue s'applique \xe0 la balise en cours et \xe0 ses enfants."})]})}function u(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>a,a:()=>l});var s=r(7294);const i={},t=s.createContext(i);function l(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);