"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[997],{2238:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>a,contentTitle:()=>t,default:()=>u,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var i=r(5893),l=r(1151);const s={sidebar_position:214,draft:!1},t="HelloWorld en WPF",o={id:"WPF partie 2/helloworld_wpf",title:"HelloWorld en WPF",description:"Dans cette section, nous allons diverger un peu du projet SuperCarte afin d'introduire certains concepts. Cette section permet de tester le MVVM et certains \xe9l\xe9ments du XAML sans se soucier du service.",source:"@site/docs/72-WPF partie 2/helloworld_wpf.md",sourceDirName:"72-WPF partie 2",slug:"/WPF partie 2/helloworld_wpf",permalink:"/4N1_2024/docs/WPF partie 2/helloworld_wpf",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:214,frontMatter:{sidebar_position:214,draft:!1},sidebar:"NotesSidebar",previous:{title:"Pr\xe9paration du projet WPF",permalink:"/4N1_2024/docs/WPF partie 2/preparation_projet_wpf"},next:{title:"Ex\xe9cution du HelloWorld",permalink:"/4N1_2024/docs/WPF partie 2/partie2_helloworld_resume"}},a={},d=[{value:"Cr\xe9ation du ViewModel - HelloWorldVM",id:"cr\xe9ation-du-viewmodel---helloworldvm",level:2},{value:"Cr\xe9ation de la vue - UcHelloWorld.xaml",id:"cr\xe9ation-de-la-vue---uchelloworldxaml",level:2},{value:"Enregistrer le ViewModel - SCViewModelExtensions",id:"enregistrer-le-viewmodel---scviewmodelextensions",level:2},{value:"Ajout de la ressource pour cr\xe9er le lien entre ViewModel et Vue - MainWindow.xaml",id:"ajout-de-la-ressource-pour-cr\xe9er-le-lien-entre-viewmodel-et-vue---mainwindowxaml",level:2},{value:"Assignation du ViewModel initial - MainWindowVM",id:"assignation-du-viewmodel-initial---mainwindowvm",level:2}];function c(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,l.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"helloworld-en-wpf",children:"HelloWorld en WPF"}),"\n",(0,i.jsxs)(n.p,{children:["Dans cette section, nous allons diverger un peu du projet SuperCarte afin d'introduire certains concepts. Cette section permet de tester le ",(0,i.jsx)(n.strong,{children:"MVVM"})," et certains \xe9l\xe9ments du ",(0,i.jsx)(n.strong,{children:"XAML"})," sans se soucier du service."]}),"\n",(0,i.jsx)(n.admonition,{title:"ATTENTION",type:"danger",children:(0,i.jsxs)(n.p,{children:["Ca ne doit pas \xeatre reproduit dans votre ",(0,i.jsx)(n.strong,{children:"TP 3"}),". Nous allons utiliser ces concepts un peu diff\xe9remment dans le projet SuperCarte."]})}),"\n",(0,i.jsx)(n.h2,{id:"cr\xe9ation-du-viewmodel---helloworldvm",children:"Cr\xe9ation du ViewModel - HelloWorldVM"}),"\n",(0,i.jsxs)(n.p,{children:["Cr\xe9ez une classe ",(0,i.jsx)(n.strong,{children:"HelloWorldVM.cs"})," dans le dossier ",(0,i.jsx)(n.strong,{children:"ViewModels"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:"namespace SuperCarte.WPF.ViewModels\r\n{\r\n    public class HelloWorldVM : BaseVM\r\n    {\r\n        public HelloWorldVM()\r\n        {\r\n            DateHeure = DateTime.Now;\r\n            ValeurDecimal = 12_345.30m;\r\n            ValeurBool = true;\r\n        }\r\n\r\n        public DateTime DateHeure { get; set; }\r\n\r\n        public decimal ValeurDecimal { get; set; }\r\n\r\n        public bool ValeurBool { get; set; }\r\n    }\r\n}\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["En ",(0,i.jsx)(n.strong,{children:"MVVM"}),", il n'est pas possible d'utiliser une propri\xe9t\xe9 auto-impl\xe9ment\xe9e si elle est li\xe9e \xe0 la vue, car il faut notifier le changement de valeur. Il faut donc de la logique dans le ",(0,i.jsx)(n.strong,{children:"set"}),". Lorsqu'il y a de la logique, il faut utiliser un attribut pour contenir la valeur de la propri\xe9t\xe9."]})}),"\n",(0,i.jsxs)(n.p,{children:["Le constructeur permet d'assigner les valeurs initiales de la ",(0,i.jsx)(n.strong,{children:"Vue"}),". Les valeurs initiales peuvent provenir du service. Par contre, il n'est pas possible de faire de l'asynchrone dans le constructeur."]}),"\n",(0,i.jsx)(n.h2,{id:"cr\xe9ation-de-la-vue---uchelloworldxaml",children:"Cr\xe9ation de la vue - UcHelloWorld.xaml"}),"\n",(0,i.jsxs)(n.p,{children:["Cr\xe9ez une nouvelle classe nomm\xe9e ",(0,i.jsx)(n.strong,{children:"UcHelloWorld.xaml"})," dans le dossier ",(0,i.jsx)(n.strong,{children:"Views"}),". S\xe9lectionnez le mod\xe8le ",(0,i.jsx)(n.strong,{children:"WPF"})," \xe0 gauche de l'\xe9cran de cr\xe9ation de la classe, et choisissez ",(0,i.jsx)(n.strong,{children:"Contr\xf4le utilisateur (WPF)"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Toutes les ",(0,i.jsx)(n.strong,{children:"Vues"})," seront du type ",(0,i.jsx)(n.strong,{children:"Contr\xf4le utilisateur (WPF)"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-xaml",metastring:"showLineNumbers",children:'<UserControl x:Class="SuperCarte.WPF.Views.UcHelloWorld"\r\n             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"\r\n             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"\r\n             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" \r\n             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" \r\n             xmlns:local="clr-namespace:SuperCarte.WPF.Views"\r\n             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"\r\n             xmlns:v="clr-namespace:SuperCarte.WPF.Views"        \r\n             mc:Ignorable="d"\r\n             d:DataContext="{d:DesignInstance Type=vm:HelloWorldVM}" \r\n             d:DesignHeight="450" d:DesignWidth="800">\r\n    <Grid>\r\n        <StackPanel VerticalAlignment="Center" HorizontalAlignment="Center">\r\n            <TextBlock Text="Hello World" />\r\n            <TextBlock Text="{Binding DateHeure , StringFormat=\\{0:d MMMM yyyy HH:mm:ss\\}}"/>\r\n            <TextBlock Text="{Binding ValeurDecimal}" />\r\n            <CheckBox IsChecked="{Binding ValeurBool}" />\r\n        </StackPanel>        \r\n    </Grid>\r\n</UserControl>\n'})}),"\n",(0,i.jsxs)(n.p,{children:["La premi\xe8re \xe9tape consiste \xe0 indiquer le ",(0,i.jsx)(n.strong,{children:"ViewModel"})," qui sera utilis\xe9. Ce n'est pas obligatoire, mais en ajoutant les lignes 7 et 8 ci-dessous, il sera possible d'avoir des suggestions lors du ",(0,i.jsx)(n.strong,{children:"Binding"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["\xc0 la ligne 15, il y a le ",(0,i.jsx)(n.strong,{children:"Binding"})," de la propri\xe9t\xe9 ",(0,i.jsx)(n.strong,{children:"Text"})," avec la propri\xe9t\xe9 ",(0,i.jsx)(n.strong,{children:"DateHeure"})," du ",(0,i.jsx)(n.strong,{children:"ViewModel"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"enregistrer-le-viewmodel---scviewmodelextensions",children:"Enregistrer le ViewModel - SCViewModelExtensions"}),"\n",(0,i.jsxs)(n.p,{children:["Dans la classe ",(0,i.jsx)(n.strong,{children:"SCViewModelExtensions"}),", il faut enregistrer le ",(0,i.jsx)(n.strong,{children:"ViewModel"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:"public static void EnregistrerViewModels(this IServiceCollection services)\r\n{\r\n    services.AddSingleton<MainWindowVM>();\r\n\t//highlight-next-line\r\n    services.AddTransient<HelloWorldVM>();\r\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["\xc9galement, il est enregistr\xe9 en ",(0,i.jsx)(n.strong,{children:"Transient"}),". \xc0 chaque fois que le ",(0,i.jsx)(n.strong,{children:"ViewModel"})," sera n\xe9cessaire, il aura une nouvelle instance afin d'\xe9viter de conserver d\u2019anciens \xe9tats."]}),"\n",(0,i.jsx)(n.h2,{id:"ajout-de-la-ressource-pour-cr\xe9er-le-lien-entre-viewmodel-et-vue---mainwindowxaml",children:"Ajout de la ressource pour cr\xe9er le lien entre ViewModel et Vue - MainWindow.xaml"}),"\n",(0,i.jsxs)(n.p,{children:["Il faut ajouter dans les ressources le lien entre le ",(0,i.jsx)(n.strong,{children:"ViewModel"})," et la ",(0,i.jsx)(n.strong,{children:"Vue"})," dans ",(0,i.jsx)(n.strong,{children:"MainWindow.xaml"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-xaml",metastring:"showLineNumbers",children:'<Window x:Class="SuperCarte.WPF.MainWindow"\r\n        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"\r\n        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"\r\n        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"\r\n        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"\r\n        xmlns:local="clr-namespace:SuperCarte.WPF"  \r\n        xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"\r\n        xmlns:v="clr-namespace:SuperCarte.WPF.Views"        \r\n        mc:Ignorable="d"\r\n        d:DataContext="{d:DesignInstance Type=vm:MainWindowVM}"\r\n        Title="Super Carte App" \r\n        Height="450" Width="800" WindowState="Maximized">\r\n    <Window.Resources>\r\n\t//highlight-start\r\n        \x3c!--Assignation du ViewModel \xe0 Vue--\x3e\r\n        <DataTemplate DataType="{x:Type TypeName=vm:HelloWorldVM}">\r\n            <v:UcHelloWorld />\r\n        </DataTemplate>\r\n\t\t//highlight-end\r\n    </Window.Resources>\r\n    <Grid>\r\n        <ContentControl Content="{Binding VMActif}" />\r\n    </Grid>\r\n</Window>\n'})}),"\n",(0,i.jsxs)(n.p,{children:["La ligne 15 \xe0 17 indique que lorsque le ",(0,i.jsx)(n.strong,{children:"DataContext"})," est de type ",(0,i.jsx)(n.strong,{children:"HelloWorldVM"})," (ligne 15), il faut utiliser le contr\xf4le utilisateur ",(0,i.jsx)(n.strong,{children:"UcHelloWorld"})," (ligne 16)."]}),"\n",(0,i.jsxs)(n.p,{children:["\xc0 la ligne 20, lorsque le ",(0,i.jsx)(n.strong,{children:"Content"})," du ",(0,i.jsx)(n.strong,{children:"ContentControl"})," sera un ",(0,i.jsx)(n.strong,{children:"HelloWorldVM"}),", il chargera le contr\xf4le utilisateur correspondant."]}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:"Souvenez-vous qu'on avait dit qu'il \xe9tait inutile d'avoir une interface pour l'ajout du ViewModel dans le service, c'est ici qu'il est impossible de sp\xe9cifier une interface pour HelloWorldVM."})}),"\n",(0,i.jsx)(n.h2,{id:"assignation-du-viewmodel-initial---mainwindowvm",children:"Assignation du ViewModel initial - MainWindowVM"}),"\n",(0,i.jsxs)(n.p,{children:["Dans la classe ",(0,i.jsx)(n.strong,{children:"MainWindowVM.cs"}),", il faut indique que la propri\xe9t\xe9 ",(0,i.jsx)(n.strong,{children:"VMActif"})," que c'est une instance de ",(0,i.jsx)(n.strong,{children:"HelloWorldVM"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:"using Microsoft.Extensions.DependencyInjection;\r\n\r\nnamespace SuperCarte.WPF.ViewModels;\r\n\r\npublic class MainWindowVM : BaseVM\r\n{    \r\n    public MainWindowVM(IServiceProvider serviceProvider)\r\n\t{   \r\n        //S\xe9lectionner le ViewModel de d\xe9marrage\r\n\t\t//highlight-next-line\r\n        VMActif = serviceProvider.GetRequiredService<HelloWorldVM>();\r\n    }\r\n\r\n    public BaseVM VMActif { get; set; }\r\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["\xc0 la ligne 10, le ",(0,i.jsx)(n.strong,{children:"ServiceProvider"})," obtiendra une instance de ",(0,i.jsx)(n.strong,{children:"HelloWorldVM"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["D\xe9marrez l'application et vous devriez voir le message ",(0,i.jsx)(n.strong,{children:"HelloWorld"})," avec la date et l'heure."]})]})}function u(e={}){const{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>o,a:()=>t});var i=r(7294);const l={},s=i.createContext(l);function t(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:t(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);