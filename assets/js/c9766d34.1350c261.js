"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[2942],{2697:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>o,contentTitle:()=>a,default:()=>p,frontMatter:()=>t,metadata:()=>l,toc:()=>c});var s=n(5893),i=n(1151);const t={sidebar_position:4},a="Supercarte WPF",l={id:"04 WPF/supercarte_wpf",title:"Supercarte WPF",description:"Pr\xe9paration du projet WPF",source:"@site/docs/04 WPF/supercarte_wpf.md",sourceDirName:"04 WPF",slug:"/04 WPF/supercarte_wpf",permalink:"/4N1_2024/docs/04 WPF/supercarte_wpf",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"NotesSidebar",previous:{title:"SuperCarte.Core",permalink:"/4N1_2024/docs/04 WPF/supercarte_core"},next:{title:"planning",permalink:"/4N1_2024/docs/planning"}},o={},c=[{value:"Pr\xe9paration du projet WPF",id:"pr\xe9paration-du-projet-wpf",level:2},{value:"Cr\xe9ation du projet dans une solution existante",id:"cr\xe9ation-du-projet-dans-une-solution-existante",level:3},{value:"Ajout des d\xe9pendances de projet",id:"ajout-des-d\xe9pendances-de-projet",level:3},{value:"Fichier Usings.cs",id:"fichier-usingscs",level:3},{value:"Fichier de configuration - appsettings.json",id:"fichier-de-configuration---appsettingsjson",level:3},{value:"Ajout de la structure pour injection des d\xe9pendances",id:"ajout-de-la-structure-pour-injection-des-d\xe9pendances",level:3},{value:"Classes d&#39;extension de m\xe9thodes",id:"classes-dextension-de-m\xe9thodes",level:3},{value:"Cr\xe9ation du Host - App.xaml.cs",id:"cr\xe9ation-du-host---appxamlcs",level:3},{value:"Hello World",id:"hello-world",level:2}];function d(e){const r={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.h1,{id:"supercarte-wpf",children:"Supercarte WPF"}),"\n",(0,s.jsx)(r.h2,{id:"pr\xe9paration-du-projet-wpf",children:"Pr\xe9paration du projet WPF"}),"\n",(0,s.jsx)(r.h3,{id:"cr\xe9ation-du-projet-dans-une-solution-existante",children:"Cr\xe9ation du projet dans une solution existante"}),"\n",(0,s.jsxs)(r.p,{children:["Il faut ajouter le projet ",(0,s.jsx)(r.strong,{children:"WPF"})," dans la solution."]}),"\n",(0,s.jsxs)(r.p,{children:["Pour ce faire, s\xe9lectionnez la solution ",(0,s.jsx)(r.strong,{children:"SuperCarteApp"})," en haut de l'",(0,s.jsx)(r.strong,{children:"Explorateur de solution"})," et choisissez ",(0,s.jsx)(r.strong,{children:"Ajouter -> Nouveau projet..."})," dans le menu contextuel."]}),"\n",(0,s.jsxs)(r.p,{children:["Cr\xe9ez un projet de type ",(0,s.jsx)(r.strong,{children:"Application WPF"}),". Il est important ",(0,s.jsx)(r.strong,{children:"de ne pas choisir"})," la version ",(0,s.jsx)(r.strong,{children:".NET Framework"}),"."]}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.strong,{children:"Nom du projet"})," : SuperCarte.WPF"]}),"\n",(0,s.jsxs)(r.li,{children:[(0,s.jsx)(r.strong,{children:"Infrastructure"})," : .NET 7"]}),"\n"]}),"\n",(0,s.jsxs)(r.p,{children:["Ensuite, s\xe9lectionnez le projet ",(0,s.jsx)(r.strong,{children:"SuperCarte.WPF"})," dans l'",(0,s.jsx)(r.strong,{children:"Explorateur de solution"})," et choisissez ",(0,s.jsx)(r.strong,{children:"D\xe9finir en tant que projet de d\xe9marrage"})," dans le menu contextuel."]}),"\n",(0,s.jsx)(r.h3,{id:"ajout-des-d\xe9pendances-de-projet",children:"Ajout des d\xe9pendances de projet"}),"\n",(0,s.jsxs)(r.p,{children:["Le projet ",(0,s.jsx)(r.strong,{children:"SuperCarte.WPF"})," aura besoin du projet ",(0,s.jsx)(r.strong,{children:"SuperCarte.EF"})," pour initialiser le contexte et ",(0,s.jsx)(r.strong,{children:"SuperCarte.Core"}),", car il utilisera des ",(0,s.jsx)(r.strong,{children:"services"}),"."]}),"\n",(0,s.jsx)(r.p,{children:"Il faut l'ajouter dans les d\xe9pendances du projet."}),"\n",(0,s.jsxs)(r.p,{children:["S\xe9lectionnez le dossier ",(0,s.jsx)(r.strong,{children:"D\xe9pendances"})," du projet ",(0,s.jsx)(r.strong,{children:"SuperCarte.WPF"})," et choisissez ",(0,s.jsx)(r.strong,{children:"Ajouter une r\xe9f\xe9rence de projet"})," dans le menu contextuel."]}),"\n",(0,s.jsxs)(r.p,{children:["Dans la fen\xeatre, il faut cocher ",(0,s.jsx)(r.strong,{children:"SuperCarte.EF"})," et ",(0,s.jsx)(r.strong,{children:"SuperCarte.Core"}),". Vous venez d'int\xe9grer 2 librairies internes au projet."]}),"\n",(0,s.jsx)(r.h3,{id:"fichier-usingscs",children:"Fichier Usings.cs"}),"\n",(0,s.jsxs)(r.p,{children:["Afin de r\xe9duire la taille des classes, les ",(0,s.jsx)(r.strong,{children:"using"})," qui seront beaucoup utilis\xe9s dans ce projet seront d\xe9clar\xe9 globalement."]}),"\n",(0,s.jsxs)(r.p,{children:["Cr\xe9ez le fichier ",(0,s.jsx)(r.strong,{children:"Usings.cs"})," \xe0 la racine du projet ",(0,s.jsx)(r.strong,{children:"SuperCarte.WPF"}),"."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-csharp",children:"global using SuperCarte.WPF; //Les classes \xe0 la racine de l'application WPF\r\nglobal using SuperCarte.EF.Data; //Les classes du mod\xe8le du contexte\r\nglobal using SuperCarte.EF.Data.Context; // La classe du contexte\r\nglobal using System;\r\nglobal using System.Collections.Generic;\r\nglobal using System.Threading.Tasks;\n"})}),"\n",(0,s.jsxs)(r.p,{children:["Au fur et \xe0 mesure que des classes s'ajouteront dans le projet, le fichier ",(0,s.jsx)(r.strong,{children:"Usings.cs"})," sera mis \xe0 jour."]}),"\n",(0,s.jsxs)(r.p,{children:["\xc9galement, le fichier ",(0,s.jsx)(r.strong,{children:"Usings.cs"})," appartient uniquement au projet dans lequel il est cr\xe9\xe9."]}),"\n",(0,s.jsx)(r.h3,{id:"fichier-de-configuration---appsettingsjson",children:"Fichier de configuration - appsettings.json"}),"\n",(0,s.jsxs)(r.p,{children:["La librairie ",(0,s.jsx)(r.strong,{children:"Microsoft.Extensions.Configuration.Json"})," permet de lire un fichier de configuration en ",(0,s.jsx)(r.strong,{children:"json"}),"."]}),"\n",(0,s.jsxs)(r.p,{children:["Dans la ",(0,s.jsx)(r.strong,{children:"Console du Gestionnaire de package"}),", inscrivez cette ligne. Il est important que le ",(0,s.jsx)(r.strong,{children:"Projet par d\xe9faut"})," soit ",(0,s.jsx)(r.strong,{children:"SuperCarte.WPF"})," dans la console. La librairie s'installera dans le projet indiqu\xe9 dans le champ ",(0,s.jsx)(r.strong,{children:"Projet par d\xe9faut"}),"."]}),"\n",(0,s.jsx)("img",{src:"/4N1_2024/img/13_package_console_1.png"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-powershell",children:"Install-Package Microsoft.Extensions.Configuration.Json\n"})}),"\n",(0,s.jsxs)(r.p,{children:["Cr\xe9ez le fichier ",(0,s.jsx)(r.strong,{children:"appsettings.json"})," \xe0 la racine du projet ",(0,s.jsx)(r.strong,{children:"SuperCarte.WPF"}),". Prenez le mod\xe8le ",(0,s.jsx)(r.strong,{children:"Fichier Texte"}),"."]}),"\n",(0,s.jsxs)(r.admonition,{title:"IMPORTANT",type:"danger",children:[(0,s.jsxs)(r.p,{children:["Pour que le fichier soit pris en compte par le compilateur, il faut indiquer dans ces propri\xe9t\xe9s qu'il doit \xeatre copi\xe9 dans le dossier de compilation. Effectuez un ",(0,s.jsx)(r.strong,{children:"clic droit"})," sur le fichier ",(0,s.jsx)(r.strong,{children:"appsettings.json"})," et s\xe9lectionnez ",(0,s.jsx)(r.strong,{children:"Propri\xe9t\xe9s"}),". Pour le champ ",(0,s.jsx)(r.strong,{children:"Copier dans le r\xe9pertoire de sortie"}),", il faut mettre la valeur ",(0,s.jsx)(r.strong,{children:"Copier si plus r\xe9cent"}),"."]}),(0,s.jsx)("img",{src:"/4N1_2024/img/12_appsettings_01.png"})]}),"\n",(0,s.jsxs)(r.p,{children:["Copiez ce code ",(0,s.jsx)(r.strong,{children:"json"})," dans le fichier."]}),"\n",(0,s.jsxs)(r.p,{children:["Utilisez cette version si vous n'avez pas le message d'erreur du certificat ",(0,s.jsx)(r.strong,{children:"SSL"}),". Il faut \xe9galement modifier le nom de la base de donn\xe9es pour celui que vous avez utilis\xe9."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-powershell",children:'{\r\n  "ConnectionStrings": {\r\n    "DefaultConnection": "Server=localhost\\SQLExpress;Database=eDA_4N1_SuperCarte;Trusted_Connection=True;"\r\n  }\r\n}\n'})}),"\n",(0,s.jsxs)(r.p,{children:["Utilisez cette version avec le param\xe8tre ",(0,s.jsx)(r.strong,{children:"Trust Server Certificate=true;"})," si vous avez le message d'erreur du certificat ",(0,s.jsx)(r.strong,{children:"SSL"}),". Il faut \xe9galement modifier le nom de la base de donn\xe9es pour celui que vous avez utilis\xe9."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-csharp",children:'{\r\n  "ConnectionStrings": {\r\n    "DefaultConnection": "Server=localhost\\SQLExpress;Database=eDA_4N1_SuperCarte;Trusted_Connection=True;Trust Server Certificate=true;"\r\n  }\r\n}\n'})}),"\n",(0,s.jsx)(r.h3,{id:"ajout-de-la-structure-pour-injection-des-d\xe9pendances",children:"Ajout de la structure pour injection des d\xe9pendances"}),"\n",(0,s.jsxs)(r.p,{children:["Le projet ",(0,s.jsx)(r.strong,{children:"WPF"})," n'a pas de fichier ",(0,s.jsx)(r.strong,{children:"program.cs"}),". Ce type de projet n'est pas con\xe7u \xe0 la base pour \xeatre dans la structure du ",(0,s.jsx)(r.strong,{children:"hosting"})," de ",(0,s.jsx)(r.strong,{children:".Net Core"}),". Il faut donc l'adapter."]}),"\n",(0,s.jsxs)(r.p,{children:["Le fichier de d\xe9marrage de l'application est ",(0,s.jsx)(r.strong,{children:"App.xaml.cs"}),". Il est inclus dans le fichier ",(0,s.jsx)(r.strong,{children:"App.xaml"}),"."]}),"\n",(0,s.jsx)(r.admonition,{type:"note",children:(0,s.jsx)(r.p,{children:"Remarquez la fl\xe8che \xe0 c\xf4t\xe9 de App.xaml. Si vous cliquez sur celle-ci, vous y trouverez App.xaml.cs"})}),"\n",(0,s.jsxs)(r.p,{children:["Remarquez que la classe est ",(0,s.jsx)(r.strong,{children:"partial"}),"."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-csharp",children:"public partial class App : Application\r\n{\r\n}\n"})}),"\n",(0,s.jsxs)(r.p,{children:["Une classe partielle en ",(0,s.jsx)(r.strong,{children:".NET"})," consiste \xe0 cr\xe9er une classe dans plusieurs fichiers. Le fichier ",(0,s.jsx)(r.strong,{children:"App.xaml"})," est aussi une classe, sauf que le langage est ",(0,s.jsx)(r.strong,{children:"XAML"}),"."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-xaml",children:'<Application x:Class="SuperCarte.WPF.App"\r\n             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"\r\n             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"\r\n             xmlns:local="clr-namespace:SuperCarte.WPF"\r\n             StartupUri="MainWindow.xaml">\r\n    <Application.Resources>\r\n         \r\n    </Application.Resources>\r\n</Application>\n'})}),"\n",(0,s.jsx)(r.p,{children:"\xc0 la ligne 1, le nom de la classe est indiqu\xe9."}),"\n",(0,s.jsxs)(r.p,{children:["C'est pour cette raison que le fichier ",(0,s.jsx)(r.strong,{children:"App.xaml.cs"})," est un sous-fichier de ",(0,s.jsx)(r.strong,{children:"App.xaml"})," dans l'",(0,s.jsx)(r.strong,{children:"Explorateur de solutions"}),". Si la classe n'\xe9tait pas partielle, il ne serait pas possible d'avoir 2 langages pour une m\xeame classe. La notion de classe partielle sert \xe9galement \xe0 ajouter des fonctionnalit\xe9s dans une classe g\xe9n\xe9r\xe9e automatiquement. Dans le ",(0,s.jsx)(r.strong,{children:"TP 2"}),", les classes du mod\xe8le sont ",(0,s.jsx)(r.strong,{children:"partial"}),". Il aurait \xe9t\xe9 possible d'ajouter un 2e fichier interne pour ajouter des \xe9l\xe9ments \xe0 la classe de base."]}),"\n",(0,s.jsxs)(r.p,{children:["\xc0 la ligne 5, c'est la fen\xeatre de d\xe9marrage. Pour une application ",(0,s.jsx)(r.strong,{children:"WPF"}),", la classe ",(0,s.jsx)(r.strong,{children:"App"})," est le conteneur des fen\xeatres. Une fen\xeatre est l'\xe9quivalent d'une page."]}),"\n",(0,s.jsxs)(r.p,{children:["L'application ",(0,s.jsx)(r.strong,{children:"WPF"})," de ce projet sera comme un ",(0,s.jsx)(r.strong,{children:"SPA"})," ou une ",(0,s.jsx)(r.strong,{children:"Application \xe0 page unique"}),". Dans le cas d'une application native, il serait possible de dire un ",(0,s.jsx)(r.strong,{children:"SWA"})," pour une ",(0,s.jsx)(r.strong,{children:"Application \xe0 fen\xeatre unique"}),"."]}),"\n",(0,s.jsxs)(r.p,{children:["Les applications ",(0,s.jsx)(r.strong,{children:"\xe0 fen\xeatres multiples"})," sont de plus en plus rares, car de nombreux appareils ne sont pas en mesure de les g\xe9rer correctement. C'est une approche pour les syst\xe8mes d'exploitation ordinateur, comme ",(0,s.jsx)(r.strong,{children:"Windows"})," ou ",(0,s.jsx)(r.strong,{children:"macOS"}),", car ils sont en mesure de g\xe9rer le ",(0,s.jsx)(r.strong,{children:"multifen\xeatre"}),"."]}),"\n",(0,s.jsxs)(r.p,{children:["L'application aura seulement une seule fen\xeatre, le classe ",(0,s.jsx)(r.strong,{children:"MainWindow.xaml"}),". \xc0 l'int\xe9rieur de cette classe, il y aura un ",(0,s.jsx)(r.strong,{children:"conteneur"})," qui aura un ",(0,s.jsx)(r.strong,{children:"contr\xf4le utilisateur (user contr\xf4le)"})," qui s'occupera d'une vue sp\xe9cifique. Ce conteneur changera de ",(0,s.jsx)(r.strong,{children:"contr\xf4le utilisateur"})," lorsqu'une nouvelle vue devra \xeatre affich\xe9e. Il s'agit de la m\xeame m\xe9ganique que Blazor ou Angular, mais pour une application native."]}),"\n",(0,s.jsx)(r.h3,{id:"classes-dextension-de-m\xe9thodes",children:"Classes d'extension de m\xe9thodes"}),"\n",(0,s.jsxs)(r.p,{children:["Comme pour le projet de ",(0,s.jsx)(r.strong,{children:"GestionPersonnage"}),", des extensions seront utilis\xe9es pour g\xe9rer l'enregistrement des d\xe9pendances."]}),"\n",(0,s.jsxs)(r.p,{children:["Cr\xe9ez les dossiers ",(0,s.jsx)(r.strong,{children:"Extensions\\ServiceCollections"})," \xe0 la racine du projet ",(0,s.jsx)(r.strong,{children:"SuperCarte.WPF"}),"."]}),"\n",(0,s.jsxs)(r.p,{children:["Cr\xe9ez la classe ",(0,s.jsx)(r.strong,{children:"SCRepositories.cs"})," dans le dossier."]}),"\n",(0,s.jsxs)(r.p,{children:["Les ",(0,s.jsx)(r.strong,{children:"Repositories"})," sont d\xe9j\xe0 cr\xe9\xe9s, alors il faut les ajouter dans l'enregistrement. Remarquez que la cr\xe9ation est maintenant en ",(0,s.jsx)(r.strong,{children:"Scoped"}),". L'instance du ",(0,s.jsx)(r.strong,{children:"Repo"})," sera partag\xe9e entre les diff\xe9rents services qui l'utilisent."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-csharp",children:"using Microsoft.Extensions.DependencyInjection;\r\n\r\nnamespace SuperCarte.WPF.Extensions.ServiceCollections;\r\n\r\n/// <summary>\r\n/// Classe d'extension qui permet d'enregistrer les classes de la cat\xe9gorie Repository\r\n/// </summary>\r\npublic static class SCRepositoryExtensions\r\n{\r\n    /// <summary>\r\n    /// M\xe9thode qui permet d'enregistrer les repositories de l'application\r\n    /// </summary>\r\n    /// <param name=\"services\">La collection de services</param>\r\n    public static void EnregistrerRepositories(this IServiceCollection services)\r\n    {\r\n        services.AddScoped<IRoleRepo, RoleRepo>();\r\n        services.AddScoped<IEnsembleRepo, EnsembleRepo>();\r\n        services.AddScoped<ICategorieRepo, CategorieRepo>();\r\n        services.AddScoped<IUtilisateurRepo, UtilisateurRepo>();\r\n        services.AddScoped<ICarteRepo, CarteRepo>();\r\n        services.AddScoped<IUtilisateurCarteRepo, UtilisateurCarteRepo>();\r\n    }\r\n}\n"})}),"\n",(0,s.jsxs)(r.p,{children:["Cr\xe9ez la classe ",(0,s.jsx)(r.strong,{children:"SCServiceExtensions.cs"})," dans le dossier ."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-csharp",children:"using Microsoft.Extensions.DependencyInjection;\r\n\r\nnamespace SuperCarte.WPF.Extensions.ServiceCollections;\r\n\r\n/// <summary>\r\n/// Classe d'extension qui permet d'enregistrer les classes de la cat\xe9gorie Service\r\n/// </summary>\r\npublic static class SCServiceExtensions\r\n{\r\n    /// <summary>\r\n    /// M\xe9thode qui permet d'enregistrer les services de l'application\r\n    /// </summary>\r\n    /// <param name=\"services\">La collection de services</param>\r\n    public static void EnregistrerServices(this IServiceCollection services)\r\n    {\r\n                \r\n    }\r\n}\n"})}),"\n",(0,s.jsxs)(r.p,{children:["Cr\xe9ez la classe ",(0,s.jsx)(r.strong,{children:"SCValidateurExtensions.cs"})," dans le dossier . Cette classe s'occupera de l'enregistrement des ",(0,s.jsx)(r.strong,{children:"Validateurs"}),". Ce concept sera pr\xe9sent\xe9 dansun autre document."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-csharp",children:"using Microsoft.Extensions.DependencyInjection;\r\n\r\nnamespace SuperCarte.WPF.Extensions.ServiceCollections;\r\n\r\n/// <summary>\r\n/// Classe d'extension qui permet d'enregistrer les classes de la cat\xe9gorie Validateur\r\n/// </summary>\r\npublic static class SCValidateurExtensions\r\n{\r\n    /// <summary>\r\n    /// M\xe9thode qui permet d'enregistrer les validateurs de l'application\r\n    /// </summary>\r\n    /// <param name=\"services\">La collection de services</param>\r\n    public static void EnregistrerValidateurs(this IServiceCollection services)\r\n    {\r\n\r\n    }\r\n}\n"})}),"\n",(0,s.jsxs)(r.p,{children:["Cr\xe9ez la classe ",(0,s.jsx)(r.strong,{children:"SCViewModelExtensions.cs"})," dans le dossier . Cette classe s'occupera de l'enregistrement des ",(0,s.jsx)(r.strong,{children:"ViewModel"}),". Ce concept sera pr\xe9sent\xe9 dans le prochain document."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-csharp",children:"using Microsoft.Extensions.DependencyInjection;\r\n\r\nnamespace SuperCarte.WPF.Extensions.ServiceCollections;\r\n\r\n/// <summary>\r\n/// Classe d'extension qui permet d'enregistrer les classes de la cat\xe9gorie Service\r\n/// </summary>\r\npublic static class SCViewModelExtensions\r\n{\r\n    /// <summary>\r\n    /// M\xe9thode qui permet d'enregistrer les ViewModels de l'application\r\n    /// </summary>\r\n    /// <param name=\"services\">La collection de services</param>\r\n    public static void EnregistrerViewModels(this IServiceCollection services)\r\n    {\r\n\r\n    }\r\n}\r\n\n"})}),"\n",(0,s.jsx)(r.h3,{id:"cr\xe9ation-du-host---appxamlcs",children:"Cr\xe9ation du Host - App.xaml.cs"}),"\n",(0,s.jsxs)(r.p,{children:["Dans la ",(0,s.jsx)(r.strong,{children:"Console du Gestionnaire de package"}),", inscrivez cette ligne. Il est important que le ",(0,s.jsx)(r.strong,{children:"Projet par d\xe9faut"})," soit ",(0,s.jsx)(r.strong,{children:"SuperCarte.WPF"})," dans la console. La librairie s'installera dans le projet indiqu\xe9 dans le champ ",(0,s.jsx)(r.strong,{children:"Projet par d\xe9faut"}),"."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{children:"Install-Package Microsoft.Extensions.Hosting\n"})}),"\n",(0,s.jsxs)(r.p,{children:["Avec cette librairie, il sera possible de configurer l'application ",(0,s.jsx)(r.strong,{children:"WPF"})," avec le ",(0,s.jsx)(r.strong,{children:"hosting"})," d'application de ",(0,s.jsx)(r.strong,{children:".NET Core"}),"."]}),"\n",(0,s.jsxs)(r.p,{children:["Copiez ce code dans le fichier ",(0,s.jsx)(r.strong,{children:"App.xaml.cs"}),"."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-csharp",children:'using Microsoft.EntityFrameworkCore;\r\nusing Microsoft.Extensions.Configuration;\r\nusing Microsoft.Extensions.DependencyInjection;\r\nusing Microsoft.Extensions.Hosting;\r\nusing SuperCarte.WPF.Extensions.ServiceCollections;\r\nusing System.Windows;\r\n\r\nnamespace SuperCarte.WPF;\r\n/// <summary>\r\n/// Interaction logic for App.xaml\r\n/// </summary>\r\npublic partial class App : Application\r\n{\r\n    private IHost? _host;\r\n\r\n\tpublic App()\r\n\t{\r\n        var builder = Host.CreateDefaultBuilder();\r\n\r\n        //Enregistrement des services\r\n        builder.ConfigureServices((context, services) =>\r\n        {            \r\n            services.AddSingleton<MainWindow>(); //Fen\xeatre principale\r\n\r\n            //Enregistrement du contexte    \r\n            services.AddDbContext<SuperCarteContext>(options => options.UseSqlServer(context.Configuration.GetConnectionString("DefaultConnection")));\r\n\r\n            //Appel des m\xe9thodes d\'extension                        \r\n            services.EnregistrerRepositories();\r\n            services.EnregistrerServices();            \r\n            services.EnregistrerValidateurs();\r\n            services.EnregistrerViewModels();\r\n        });\r\n\r\n        _host = builder.Build();\r\n    }\r\n\r\n    /// <summary>\r\n    /// D\xe9marrage de l\'application\r\n    /// </summary>\r\n    /// <param name="e"></param>\r\n    protected override async void OnStartup(StartupEventArgs e)\r\n    {\r\n        await _host!.StartAsync();\r\n\r\n        var fenetreInitiale = _host.Services.GetRequiredService<MainWindow>();\r\n        fenetreInitiale.Show(); //Affiche la fen\xeatre initiale\r\n        base.OnStartup(e);\r\n    }\r\n\r\n    /// <summary>\r\n    /// Fermeture de l\'application\r\n    /// </summary>\r\n    /// <param name="e"></param>\r\n    protected override async void OnExit(ExitEventArgs e)\r\n    {\r\n        await _host!.StopAsync();\r\n        base.OnExit(e);\r\n    }\r\n}\n'})}),"\n",(0,s.jsx)(r.p,{children:"Voici le d\xe9tail de la classe."}),"\n",(0,s.jsxs)(r.p,{children:["\xc0 la ligne 1 du bloc de code ci-dessous, il y a un attribut pour le ",(0,s.jsx)(r.strong,{children:"host"})," de l'application. Le ",(0,s.jsx)(r.strong,{children:"host"}),"  doit \xeatre en attribut, car il sera utilis\xe9 dans plusieurs m\xe9thodes de la classe."]}),"\n",(0,s.jsxs)(r.p,{children:["Ensuite, le constructeur de la classe s'occupe de configurer le ",(0,s.jsx)(r.strong,{children:"host"})," comme il a \xe9t\xe9 fait dans le fichier ",(0,s.jsx)(r.strong,{children:"Program.cs"})," de l'application console."]}),"\n",(0,s.jsxs)(r.p,{children:["\xc0 la ligne 5, le constructeur par d\xe9faut du ",(0,s.jsx)(r.strong,{children:"host"})," est cr\xe9\xe9."]}),"\n",(0,s.jsx)(r.p,{children:"\xc0 la ligne 10, il faut enregistrer la fen\xeatre principale dans les d\xe9pendances de l'application."}),"\n",(0,s.jsx)(r.p,{children:"\xc0 la ligne 13, le contexte est enregistr\xe9 avec le fichier de configuration."}),"\n",(0,s.jsx)(r.p,{children:"Aux lignes 16 \xe0 18, le service utilise les m\xe9thodes d'extension pour enregistrer les diff\xe9rents concepts."}),"\n",(0,s.jsxs)(r.p,{children:["\xc0 la ligne 21, le ",(0,s.jsx)(r.strong,{children:"host"})," est construit en fonction de la configuration initiale."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-csharp",children:'private IHost? _host;\r\n\r\npublic App()\r\n{\r\n    var builder = Host.CreateDefaultBuilder();\r\n\r\n    //Enregistrement des services\r\n    builder.ConfigureServices((context, services) =>\r\n    {            \r\n        services.AddSingleton<MainWindow>(); //Fen\xeatre principale\r\n\r\n        //Enregistrement du contexte    \r\n        services.AddDbContext<SuperCarteContext>(options => options.UseSqlServer(context.Configuration.GetConnectionString("DefaultConnection")));\r\n\r\n        //Appel des m\xe9thodes d\'extension                        \r\n        services.EnregistrerRepositories();\r\n        services.EnregistrerServices();            \r\n        services.EnregistrerValidateurs();\r\n        services.EnregistrerViewModels();\r\n    });\r\n\r\n    _host = builder.Build();\r\n}\n'})}),"\n",(0,s.jsxs)(r.p,{children:["La m\xe9thode ",(0,s.jsx)(r.strong,{children:"OnStartup()"})," est appel\xe9 au d\xe9marrage de l'application, apr\xe8s le constructeur. Elle d\xe9marre le ",(0,s.jsx)(r.strong,{children:"host"})," et ensuite indique au programme d'afficher la fen\xeatre principale de l'application."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-csharp",children:"protected override async void OnStartup(StartupEventArgs e)\r\n{\r\n    await _host!.StartAsync();\r\n\r\n    var fenetreInitiale = _host.Services.GetRequiredService<MainWindow>();\r\n    fenetreInitiale.Show(); //Affiche la fen\xeatre initiale\r\n    base.OnStartup(e);\r\n}\n"})}),"\n",(0,s.jsx)(r.p,{children:"D\xe9marrez l'application. Il y a 2 fen\xeatres."}),"\n",(0,s.jsxs)(r.p,{children:["Ouvrez le fichier ",(0,s.jsx)(r.strong,{children:"App.xaml"}),"."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-xaml",children:'<Application x:Class="SuperCarte.WPF.App"\r\n             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"\r\n             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"\r\n             xmlns:local="clr-namespace:SuperCarte.WPF"\r\n             StartupUri="MainWindow.xaml">\r\n    <Application.Resources>\r\n         \r\n    </Application.Resources>\r\n</Application>\n'})}),"\n",(0,s.jsxs)(r.p,{children:["\xc0 la ligne 5, il y a la propri\xe9t\xe9 ",(0,s.jsx)(r.strong,{children:"StartupUri"}),". Cette propri\xe9t\xe9 indique \xe9galement la fen\xeatre de d\xe9marrage. Il faut retirer cette propri\xe9t\xe9 pour ne pas interf\xe9rer avec l'injection de d\xe9pendances."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-xaml",children:'<Application x:Class="SuperCarte.WPF.App"\r\n             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"\r\n             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"\r\n             xmlns:local="clr-namespace:SuperCarte.WPF">\r\n    <Application.Resources>\r\n         \r\n    </Application.Resources>\r\n</Application>\n'})}),"\n",(0,s.jsx)(r.p,{children:"D\xe9marrez de nouveau l'application et il aura seulement une fen\xeatre."}),"\n",(0,s.jsx)(r.h2,{id:"hello-world",children:"Hello World"}),"\n",(0,s.jsxs)(r.p,{children:["Pour avoir un premier contenu visuel, il faut modifier le fichier ",(0,s.jsx)(r.strong,{children:"MainWindows.xaml"}),"."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-xaml",children:'<Window x:Class="SuperCarte.WPF.MainWindow"\r\n        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"\r\n        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"\r\n        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"\r\n        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"\r\n        xmlns:local="clr-namespace:SuperCarte.WPF"\r\n        mc:Ignorable="d"\r\n        Title="Super Carte App" Height="450" Width="800">\r\n    <Grid>\r\n        <Label Content="Hello World!!!"></Label>\r\n    </Grid>\r\n</Window>\n'})}),"\n",(0,s.jsxs)(r.p,{children:["\xc0 la ligne 8, la propri\xe9t\xe9 ",(0,s.jsx)(r.strong,{children:"Title"})," de la balise ",(0,s.jsx)(r.strong,{children:"<Window>"})," permet de mettre le titre de la fen\xeatre."]}),"\n",(0,s.jsxs)(r.p,{children:["\xc0 la ligne 10, il y a un ",(0,s.jsx)(r.strong,{children:"Label"})," pour afficher du texte statique.  L'int\xe9rieur de la balise ",(0,s.jsx)(r.strong,{children:"<Grid>"}),", c'est le contenu de la fen\xeatre."]}),"\n",(0,s.jsx)(r.h1,{id:"annexe---remove-migration",children:"Annexe - Remove-Migration"}),"\n",(0,s.jsx)(r.p,{children:"Pour \xeatre en mesure de supprimer des migrations, il faut remettre la base de donn\xe9es \xe0 l'\xe9tat correct."}),"\n",(0,s.jsx)(r.p,{children:"Par exemple, voici 4 migrations."}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{children:"CreationBD\r\nAjoutTableUtilisateur\r\nAjoutTableEnsemble -- Probl\xe9matique\r\nAjoutTableCategorie -- Correct\r\n\n"})}),"\n",(0,s.jsxs)(r.p,{children:["Il faut remettre la base de donn\xe9es \xe0 un \xe9tat valide. Le dernier \xe9tat valide est ",(0,s.jsx)(r.strong,{children:"AjoutTableUtilisateur"}),"."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-powershell",children:"Update-Database -StartupProject SuperCarte.EF -Migration AjoutTableUtilisateur\n"})}),"\n",(0,s.jsxs)(r.p,{children:["Ensuite, il faut utiliser la commande ",(0,s.jsx)(r.strong,{children:"Remove-Migration"}),". Cette commande enl\xe8ve seulement la derni\xe8re migration. Il faudra l'ex\xe9cuter 2 fois pour retirer la migration probl\xe9matique."]}),"\n",(0,s.jsxs)(r.p,{children:["Pour effacer ",(0,s.jsx)(r.strong,{children:"AjoutTableCategorie"})]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{children:"Remove-Migration -StartupProject SuperCarte.EF \n"})}),"\n",(0,s.jsxs)(r.p,{children:["Pour effacer ",(0,s.jsx)(r.strong,{children:"AjoutTableEnsemble"})]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{children:"Remove-Migration -StartupProject SuperCarte.EF \n"})}),"\n",(0,s.jsxs)(r.p,{children:["Malheureusement, la partie de ",(0,s.jsx)(r.strong,{children:"AjoutTableCategorie"})," doit \xeatre effac\xe9e, m\xeame si elle est valide."]})]})}function p(e={}){const{wrapper:r}={...(0,i.a)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,r,n)=>{n.d(r,{Z:()=>l,a:()=>a});var s=n(7294);const i={},t=s.createContext(i);function a(e){const r=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function l(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(t.Provider,{value:r},e.children)}}}]);