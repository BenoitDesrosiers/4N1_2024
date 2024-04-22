"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[9582],{6529:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>a,toc:()=>d});var s=n(5893),t=n(1151);const i={sidebar_position:910,draft:!1},o="Introduction",a={id:"Tests int\xe9gration/introduction",title:"Introduction",description:"Dans cette section nous allons effectuer une s\xe9rie de tests d'int\xe9gration afin de s'assurer que la gestion et l'affichage des cat\xe9gories fonctionne bien.",source:"@site/docs/90-Tests int\xe9gration/introduction.md",sourceDirName:"90-Tests int\xe9gration",slug:"/Tests int\xe9gration/introduction",permalink:"/4N1_2024/docs/Tests int\xe9gration/introduction",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:910,frontMatter:{sidebar_position:910,draft:!1},sidebar:"NotesSidebar",previous:{title:"Tests unitaires",permalink:"/4N1_2024/docs/Tests Unitaires/test_unitaire"},next:{title:"Liste de tests d'int\xe9gration",permalink:"/4N1_2024/docs/Tests int\xe9gration/test_integration"}},l={},d=[{value:"Cr\xe9ation du projet",id:"cr\xe9ation-du-projet",level:2},{value:"Modification de la cible du projet",id:"modification-de-la-cible-du-projet",level:2},{value:"Ajout des d\xe9pendances des projets",id:"ajout-des-d\xe9pendances-des-projets",level:2},{value:"Configuration de l&#39;injection de d\xe9pendances",id:"configuration-de-linjection-de-d\xe9pendances",level:2},{value:"Installation des librairies",id:"installation-des-librairies",level:2},{value:"Utilitaire pour la BD",id:"utilitaire-pour-la-bd",level:2},{value:"D\xe9sactivation du parall\xe9lisme",id:"d\xe9sactivation-du-parall\xe9lisme",level:2}];function c(e){const r={admonition:"admonition",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.h1,{id:"introduction",children:"Introduction"}),"\n",(0,s.jsx)(r.p,{children:"Dans cette section nous allons effectuer une s\xe9rie de tests d'int\xe9gration afin de s'assurer que la gestion et l'affichage des cat\xe9gories fonctionne bien."}),"\n",(0,s.jsx)(r.h2,{id:"cr\xe9ation-du-projet",children:"Cr\xe9ation du projet"}),"\n",(0,s.jsxs)(r.p,{children:["Vous devez cr\xe9er un nouveau projet de type ",(0,s.jsx)(r.strong,{children:"xUnit"})," dans votre solution."]}),"\n",(0,s.jsxs)(r.p,{children:["Nommez le projet ",(0,s.jsx)(r.strong,{children:"SuperCarte.ITest"})," et utilisez ",(0,s.jsx)(r.strong,{children:".NET 7"}),"."]}),"\n",(0,s.jsxs)(r.p,{children:["Cr\xe9ez un dossier ",(0,s.jsx)(r.strong,{children:"ViewModels"})," \xe0 la racine du projet."]}),"\n",(0,s.jsx)(r.h2,{id:"modification-de-la-cible-du-projet",children:"Modification de la cible du projet"}),"\n",(0,s.jsxs)(r.p,{children:["Il faut modifier la cible du projet. Le projet ",(0,s.jsx)(r.strong,{children:"ITest"})," utilisera le projet ",(0,s.jsx)(r.strong,{children:".WPF"})," qui est disponible uniquement pour ",(0,s.jsx)(r.strong,{children:"Windows"}),"."]}),"\n",(0,s.jsxs)(r.p,{children:["Effectuez un double-clic sur l'ent\xeate du projet ",(0,s.jsx)(r.strong,{children:"SuperCarte.ITest"})," pour voir le ",(0,s.jsx)(r.strong,{children:"XML"})," de configuration."]}),"\n",(0,s.jsxs)(r.p,{children:["Vous devez modifiez la balise ",(0,s.jsx)(r.strong,{children:"<TargetFramework>net7.0</TargetFramework>"})," par ",(0,s.jsx)(r.strong,{children:"<TargetFramework>net7.0-windows</TargetFramework>"}),". Enregistrez le fichier."]}),"\n",(0,s.jsx)(r.p,{children:"Dans l'exemple ci-dessous, la balise est \xe0 la ligne 4."}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-xml",children:'<Project Sdk="Microsoft.NET.Sdk">\r\n\r\n  <PropertyGroup>\r\n    <TargetFramework>net7.0-windows</TargetFramework>\r\n    <ImplicitUsings>enable</ImplicitUsings>\r\n    <Nullable>enable</Nullable>\r\n\r\n    <IsPackable>false</IsPackable>\r\n  </PropertyGroup>\r\n  /* **** */\r\n</Project>\n'})}),"\n",(0,s.jsxs)(r.p,{children:["Supprimez la classe ",(0,s.jsx)(r.strong,{children:"UnitTest1.cs"}),"."]}),"\n",(0,s.jsx)(r.h2,{id:"ajout-des-d\xe9pendances-des-projets",children:"Ajout des d\xe9pendances des projets"}),"\n",(0,s.jsxs)(r.p,{children:["Effectuez un clic-droit sur le dossier ",(0,s.jsx)(r.strong,{children:"D\xe9pendances"})," du projet ",(0,s.jsx)(r.strong,{children:"SuperCarte.ITest"}),". S\xe9lectionnez ",(0,s.jsx)(r.strong,{children:"Ajouter une r\xe9f\xe9rence de projet..."}),"."]}),"\n",(0,s.jsxs)(r.p,{children:["Cochez ",(0,s.jsx)(r.strong,{children:"SuperCarte.WPF"}),", ",(0,s.jsx)(r.strong,{children:"SuperCarte.Core"})," et ",(0,s.jsx)(r.strong,{children:"SuperCarte.EF"}),"."]}),"\n",(0,s.jsx)(r.p,{children:"Compilez le projet. Si vous avez les erreurs ci-dessous, l'\xe9tape 11.1 n'a pas \xe9t\xe9 faite correctement."}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{children:"Gravit\xe9\tCode\tDescription\tProjet\tFichier\tLigne\t\xc9tat de la suppression\r\nErreur\tNETSDK1005\tLe fichier de composants \\SuperCarteApp\\SuperCarte.ITest\\obj\\project.assets.json' n'a aucune cible pour 'net7.0'. V\xe9rifiez que la restauration s'est ex\xe9cut\xe9e et que vous avez inclus 'net7.0' dans TargetFrameworks pour votre projet.\tSuperCarte.Test\tC:\\Program Files\\dotnet\\sdk\\7.0.102\\Sdks\\Microsoft.NET.Sdk\\targets\\Microsoft.PackageDependencyResolution.targets\t267\t\r\n\r\nGravit\xe9\tCode\tDescription\tProjet\tFichier\tLigne\t\xc9tat de la suppression\r\nErreur\t\tLe projet \xab\xa0..\\SuperCarte.WPF\\SuperCarte.WPF.csproj\xa0\xbb cible \xab\xa0net7.0-windows\xa0\xbb. Il ne peut pas \xeatre r\xe9f\xe9renc\xe9 par un projet qui cible \xab\xa0.NETCoreApp,Version=v7.0\xa0\xbb.\tSuperCarte.Test\tC:\\Program Files\\Microsoft Visual Studio\\2022\\Community\\MSBuild\\Current\\Bin\\amd64\\Microsoft.Common.CurrentVersion.targets\t1830\t\n"})}),"\n",(0,s.jsx)(r.h2,{id:"configuration-de-linjection-de-d\xe9pendances",children:"Configuration de l'injection de d\xe9pendances"}),"\n",(0,s.jsx)(r.p,{children:"Pour simuler correctement l'environnement de production, il faut que le projet soit configur\xe9 avec de l'injection de d\xe9pendances."}),"\n",(0,s.jsxs)(r.p,{children:["Pour ce faire, vous devez installer la librairie ",(0,s.jsx)(r.strong,{children:"Xunit.DependencyInjection"}),"."]}),"\n",(0,s.jsxs)(r.p,{children:["Dans la ",(0,s.jsx)(r.strong,{children:"Console du Gestionnaire de package"}),", inscrivez la commande ci-dessous. Il est important que le ",(0,s.jsx)(r.strong,{children:"Projet par d\xe9faut"})," ",(0,s.jsx)(r.strong,{children:".ITest"})," soit s\xe9lectionn\xe9 dans la console. Pour ce projet, ce doit \xeatre ",(0,s.jsx)(r.strong,{children:"SuperCarte.ITest"}),"."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{children:"Install-Package Xunit.DependencyInjection\n"})}),"\n",(0,s.jsxs)(r.p,{children:["Cr\xe9ez la classe ",(0,s.jsx)(r.strong,{children:"Startup.cs"})," \xe0 la racine du projet."]}),"\n",(0,s.jsxs)(r.p,{children:["Cette classe est l'\xe9quivalent du ",(0,s.jsx)(r.strong,{children:"Program.cs"})," ou du ",(0,s.jsx)(r.strong,{children:"App.xaml.cs"}),"."]}),"\n",(0,s.jsxs)(r.p,{children:["Le ",(0,s.jsx)(r.strong,{children:"navigateur"})," et la ",(0,s.jsx)(r.strong,{children:"notification"})," ne seront pas inject\xe9s. Il faudra utiliser un simulacre pour ces 2 d\xe9pendances."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:'using Microsoft.EntityFrameworkCore;\r\nusing Microsoft.Extensions.Configuration;\r\nusing Microsoft.Extensions.DependencyInjection;\r\nusing Microsoft.Extensions.Hosting;\r\nusing SuperCarte.EF.Data.Context;\r\nusing SuperCarte.WPF.Aides;\r\nusing SuperCarte.WPF.Extensions.ServiceCollections;\r\n\r\nnamespace SuperCarte.ITest;\r\n\r\npublic class Startup\r\n{\r\n    /// <summary>\r\n    /// M\xe9hthode qui permet d\'enregistrer les services\r\n    /// </summary>\r\n    /// <param name="services">Collection de services</param>\r\n    /// <param name="context">Context de l\'application</param>\r\n    public void ConfigureServices(IServiceCollection services,\r\n    HostBuilderContext context)\r\n    {\r\n        services.AddLocalization();\r\n        \r\n        services.AddDbContext<SuperCarteContext>(options => options.UseSqlServer(context.Configuration.GetConnectionString("DefaultConnection")));\r\n        \r\n        services.AddSingleton<IAuthentificateur, Authentificateur>();\r\n        \r\n        services.EnregistrerRepositories();\r\n        services.EnregistrerServices();\r\n        services.EnregistrerValidateurs();\r\n        services.EnregistrerViewModels();\r\n    }\r\n\r\n    public void ConfigureHost(IHostBuilder hostBuilder) =>\r\n        hostBuilder.ConfigureHostConfiguration(builder => {\r\n        builder.AddJsonFile("appsettings.json");\r\n        });\r\n}\n'})}),"\n",(0,s.jsxs)(r.p,{children:["Cr\xe9ez le fichier de configuration ",(0,s.jsx)(r.strong,{children:"appsettings.json"}),". N'oubliez pas de modifier la propri\xe9t\xe9 ",(0,s.jsx)(r.strong,{children:"Copier dans le r\xe9pertoire de sortie"})," pour mettre la valeur ",(0,s.jsx)(r.strong,{children:"Copier si plus r\xe9cent"}),"."]}),"\n",(0,s.jsx)(r.admonition,{title:"IMPORTANT",type:"warning",children:(0,s.jsxs)(r.p,{children:["Pour faire des tests d'int\xe9gration, il est recommand\xe9 d'utiliser une base de donn\xe9es de test. Ajoutez le suffixe ",(0,s.jsx)(r.strong,{children:"_Test"})," dans le nom de la base de donn\xe9es."]})}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:'{\r\n  "ConnectionStrings": {\r\n    "DefaultConnection": "Server=localhost\\\\SQLExpress;Database=eDA_4N1_SuperCarte_Test;Trusted_Connection=True;Trust Server Certificate=true;"\r\n  }\r\n}\n'})}),"\n",(0,s.jsx)(r.h2,{id:"installation-des-librairies",children:"Installation des librairies"}),"\n",(0,s.jsx)(r.p,{children:"Il faut installer les librairies qui seront utiles pour les tests."}),"\n",(0,s.jsxs)(r.p,{children:["Dans la ",(0,s.jsx)(r.strong,{children:"Console du Gestionnaire de package"}),", inscrivez la commande ci-dessous. Il est important que le ",(0,s.jsx)(r.strong,{children:"Projet par d\xe9faut"})," ",(0,s.jsx)(r.strong,{children:".ITest"})," soit s\xe9lectionn\xe9 dans la console. Pour ce projet, ce doit \xeatre ",(0,s.jsx)(r.strong,{children:"SuperCarte.ITest"}),"."]}),"\n",(0,s.jsxs)(r.p,{children:["La librairie pour cr\xe9er des simulacres ",(0,s.jsx)(r.strong,{children:"Moq"}),"."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{children:"Install-Package Moq\n"})}),"\n",(0,s.jsxs)(r.p,{children:["La librairie ",(0,s.jsx)(r.strong,{children:"AutoFixture"})," pour cr\xe9er des objets avec des valeurs."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{children:"Install-Package AutoFixture\n"})}),"\n",(0,s.jsxs)(r.p,{children:["La librairie pour faciliter les assertions ",(0,s.jsx)(r.strong,{children:"FluentAssertions"}),"."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{children:"Install-Package FluentAssertions\n"})}),"\n",(0,s.jsx)(r.h2,{id:"utilitaire-pour-la-bd",children:"Utilitaire pour la BD"}),"\n",(0,s.jsx)(r.p,{children:"Pour chacun des tests d'int\xe9gration,  il est pr\xe9f\xe9rable de r\xe9initialiser la base de donn\xe9es pour chaque test et de cr\xe9er les donn\xe9es d\xe9pendantes selon le cas."}),"\n",(0,s.jsxs)(r.p,{children:["Cr\xe9ez le dossier ",(0,s.jsx)(r.strong,{children:"Aides"})," \xe0 la racine du projet ",(0,s.jsx)(r.strong,{children:"SuperCarte.ITest"}),"."]}),"\n",(0,s.jsxs)(r.p,{children:["Cr\xe9ez la classe ",(0,s.jsx)(r.strong,{children:"UtilitaireBD"}),"."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:'using Microsoft.EntityFrameworkCore;\r\nusing SuperCarte.EF.Data.Context;\r\n\r\nnamespace SuperCarte.ITest.Aides;\r\n\r\n/// <summary>\r\n/// Classe qui permet de g\xe9rer la base de donn\xe9es pour les tests\r\n/// </summary>\r\npublic class UtilitaireBD\r\n{\r\n    private readonly SuperCarteContext _bd;\r\n\r\n    /// <summary>\r\n    /// Constructeur\r\n    /// </summary>\r\n    /// <param name="bd">Contexte de la base de donn\xe9es</param>\r\n    public UtilitaireBD(SuperCarteContext bd)\r\n    {\r\n        _bd = bd;\r\n    }\r\n\r\n    /// <summary>\r\n    /// Initialise la base de donn\xe9es Test et applique la migration\r\n    /// </summary>\r\n    public void Initialiser()\r\n    {\r\n        //Supprime la base de donn\xe9es si elle existe\r\n        _bd.Database.EnsureDeleted();\r\n\r\n        //Applique la derni\xe8re migration \r\n        //\xc9quivalent de Update-Database\r\n        _bd.Database.Migrate();        \r\n    }\r\n\r\n    public SuperCarteContext BDContext \r\n    { \r\n        get \r\n        { \r\n            return _bd; \r\n        } \r\n    }\r\n}\n'})}),"\n",(0,s.jsxs)(r.p,{children:["La m\xe9thode ",(0,s.jsx)(r.strong,{children:"Initialiser()"})," permet de supprimer la base de donn\xe9es ",(0,s.jsx)(r.strong,{children:"test"})," si elle existe. Ensuite, elle applique toutes les migrations."]}),"\n",(0,s.jsxs)(r.p,{children:["La propri\xe9t\xe9 ",(0,s.jsx)(r.strong,{children:"BDContext"})," permet d'avoir acc\xe8s au contexte par la classe de test. Il peut \xeatre n\xe9cessaire d'avoir acc\xe8s au contexte pour cr\xe9er les donn\xe9es initiales pour un test. \xc9galement, il peut \xeatre n\xe9cessaire d'interroger la base de donn\xe9es pour faire les assertions."]}),"\n",(0,s.jsx)(r.p,{children:"Il est possible \xe9galement d'ajouter des m\xe9thodes d'insertion de donn\xe9es dans cette classe. Un m\xeame jeu de donn\xe9es de test peut \xeatre utilis\xe9 par plusieurs tests."}),"\n",(0,s.jsx)(r.p,{children:"Vous n'avez pas \xe0 ex\xe9cuter les migrations sur la base de donn\xe9es test. La migration (incluant les seeders) sera ex\xe9cut\xe9es par les tests eux-m\xeames."}),"\n",(0,s.jsx)(r.p,{children:"Il faut enregistrer cette classe dans les d\xe9pendances."}),"\n",(0,s.jsxs)(r.p,{children:["Modifiez la m\xe9thode ",(0,s.jsx)(r.strong,{children:"ConfigureServices"})," de la classe ",(0,s.jsx)(r.strong,{children:"Startup.cs"}),"."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:' public void ConfigureServices(IServiceCollection services,\r\n HostBuilderContext context)\r\n {\r\n     services.AddLocalization();\r\n\r\n     services.AddDbContext<SuperCarteContext>(options => options.UseSqlServer(context.Configuration.GetConnectionString("DefaultConnection")));\r\n\r\n     services.AddSingleton<IAuthentificateur, Authentificateur>();\r\n\r\n//highlight-next-line\r\n     services.AddScoped<UtilitaireBD>();\r\n\r\n     services.EnregistrerRepositories();\r\n     services.EnregistrerServices();\r\n     services.EnregistrerValidateurs();\r\n     services.EnregistrerViewModels();\r\n }\n'})}),"\n",(0,s.jsx)(r.h2,{id:"d\xe9sactivation-du-parall\xe9lisme",children:"D\xe9sactivation du parall\xe9lisme"}),"\n",(0,s.jsxs)(r.p,{children:["Dans le fichier ",(0,s.jsx)(r.strong,{children:"GlobalUsings.cs"}),", il faut indiquer que l'ex\xe9cution des tests doit se faire en s\xe9quence."]}),"\n",(0,s.jsx)(r.p,{children:"Chaque test a cr\xe9\xe9 une nouvelle base de donn\xe9es et doit avoir un jeu de donn\xe9es fixe. Pour permettre l'ex\xe9cution en parall\xe8le, chaque test devrait avoir sa propre base de donn\xe9es."}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:"global using Xunit;\r\n[assembly: CollectionBehavior(DisableTestParallelization = true)]\n"})})]})}function u(e={}){const{wrapper:r}={...(0,t.a)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},1151:(e,r,n)=>{n.d(r,{Z:()=>a,a:()=>o});var s=n(7294);const t={},i=s.createContext(t);function o(e){const r=s.useContext(i);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(i.Provider,{value:r},e.children)}}}]);