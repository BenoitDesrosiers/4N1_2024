"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[819],{1170:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>o,contentTitle:()=>l,default:()=>u,frontMatter:()=>t,metadata:()=>a,toc:()=>d});var i=r(5893),s=r(1151);const t={sidebar_position:10},l="Cr\xe9ation de la BD",a={id:"Entity Framework/EF_creation_bd",title:"Cr\xe9ation de la BD",description:"Introduction",source:"@site/docs/30-Entity Framework/EF_creation_bd.md",sourceDirName:"30-Entity Framework",slug:"/Entity Framework/EF_creation_bd",permalink:"/4N1_2024/docs/Entity Framework/EF_creation_bd",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_position:10},sidebar:"NotesSidebar",previous:{title:"Principes SOLID",permalink:"/4N1_2024/docs/Entity Framework/solid"},next:{title:"Modification de la BD",permalink:"/4N1_2024/docs/Entity Framework/EF_modification_bd"}},o={},d=[{value:"Introduction",id:"introduction",level:2},{value:"Approches",id:"approches",level:2},{value:"Code First",id:"code-first",level:3},{value:"Database First",id:"database-first",level:3},{value:"Projet vs solution",id:"projet-vs-solution",level:2},{value:"Cr\xe9ation du projet",id:"cr\xe9ation-du-projet",level:2},{value:"Cr\xe9ation du mod\xe8le",id:"cr\xe9ation-du-mod\xe8le",level:2},{value:"Exercice",id:"exercice",level:3},{value:"Cr\xe9ation du contexte",id:"cr\xe9ation-du-contexte",level:2},{value:"MIGRATION_CONNECTION_STRING",id:"migration_connection_string",level:3},{value:"Cr\xe9ation du fichier de migration",id:"cr\xe9ation-du-fichier-de-migration",level:3},{value:"Synchronisation de la base de donn\xe9es",id:"synchronisation-de-la-base-de-donn\xe9es",level:3},{value:"Annulation d&#39;une migration",id:"annulation-dune-migration",level:3}];function c(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components},{Details:r}=n;return r||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"cr\xe9ation-de-la-bd",children:"Cr\xe9ation de la BD"}),"\n",(0,i.jsx)(n.h2,{id:"introduction",children:"Introduction"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Entity Framework"})," est un ",(0,i.jsx)(n.strong,{children:"ORM"})," de Microsoft pour interagir avec les bases de donn\xe9es."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Entity Framework"})," g\xe9n\xe8re un mod\xe8le d'objet de la base de donn\xe9es."]}),"\n",(0,i.jsx)(n.p,{children:"Les relations entre les \xe9l\xe9ments utilisent l'agr\xe9gation d'objet et de liste selon le sens de la relation."}),"\n",(0,i.jsxs)(n.p,{children:["Pour interagir facilement avec le mod\xe8le objet de la base de donn\xe9es, il faut utiliser ",(0,i.jsx)(n.strong,{children:"LINQ"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"Pour cette section des notes de cours, il faut utiliser ce DEA."}),"\n",(0,i.jsx)("img",{src:"/4N1_2024/img/07_dea_GestionFilm.jpg"}),"\n",(0,i.jsx)(n.h2,{id:"approches",children:"Approches"}),"\n",(0,i.jsx)(n.h3,{id:"code-first",children:"Code First"}),"\n",(0,i.jsxs)(n.p,{children:["L'approche ",(0,i.jsx)(n.strong,{children:"Code First"})," consiste \xe0 cr\xe9er le mod\xe8le objet de la base de donn\xe9es en premier."]}),"\n",(0,i.jsxs)(n.p,{children:["Par la suite, il faut ",(0,i.jsx)(n.strong,{children:"migrer"})," notre code vers la base de donn\xe9es."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://www.entityframeworktutorial.net/efcore/entity-framework-core.aspx",children:"voir"})}),"\n",(0,i.jsx)(n.h3,{id:"database-first",children:"Database First"}),"\n",(0,i.jsxs)(n.p,{children:["L'approche ",(0,i.jsx)(n.strong,{children:"Database First"})," consiste \xe0 cr\xe9er la base de donn\xe9es en pur ",(0,i.jsx)(n.strong,{children:"SQL"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Par la suite, il faut utiliser un outil de g\xe9n\xe9ration de code pour g\xe9n\xe9rer ",(0,i.jsx)(n.strong,{children:"automatiquement"})," le mod\xe8le objet et le contexte de communication avec la base de donn\xe9es."]}),"\n",(0,i.jsxs)(n.p,{children:["Pour ce cours, nous allons favoriser l'approche ",(0,i.jsx)(n.strong,{children:"Code First"})," car elle est plus souvent rencontr\xe9e en industrie, et est un peu plus complexe \xe0 mettre en place. Nous verrons tout de m\xeame un exemple de ",(0,i.jsx)(n.strong,{children:"Database first"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"projet-vs-solution",children:"Projet vs solution"}),"\n",(0,i.jsxs)(n.p,{children:["Quelle est la diff\xe9rence entre un projet et une solution en ",(0,i.jsx)(n.strong,{children:".Net"})," ?"]}),"\n",(0,i.jsxs)(n.p,{children:["Il est fr\xe9quent en ",(0,i.jsx)(n.strong,{children:".Net"})," de s\xe9parer une application en plusieurs projets. G\xe9n\xe9ralement, le projet consiste en une couche logicielle. Cette couche contient le code correspondant au r\xf4le du projet dans l'application. Un projet peut \xeatre utilis\xe9 dans plusieurs applications."]}),"\n",(0,i.jsx)(n.p,{children:"La solution permet de regrouper plusieurs projets ensemble. La solution n'a pas de logique en soi. Elle permet d'avoir acc\xe8s \xe0 plusieurs projets rapidement. G\xe9n\xe9ralement, la solution contient tous les projets n\xe9cessaires \xe0 l'application."}),"\n",(0,i.jsxs)(n.p,{children:["Il est possible d'utiliser cette approche avec une application console avec ",(0,i.jsx)(n.strong,{children:".NET 7"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"cr\xe9ation-du-projet",children:"Cr\xe9ation du projet"}),"\n",(0,i.jsxs)(n.p,{children:["Pour d\xe9buter, il faut cr\xe9er le projet qui contiendra le ",(0,i.jsx)(n.strong,{children:"contexte"})," et les classes du mod\xe8le."]}),"\n",(0,i.jsxs)(n.p,{children:["Cr\xe9ez un projet de type ",(0,i.jsx)(n.strong,{children:"Biblioth\xe8que de classe"}),". Il est important ",(0,i.jsx)(n.strong,{children:"de ne pas choisir"})," la version ",(0,i.jsx)(n.strong,{children:".NET Framework"}),"."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Nom du projet"})," : Univers.EF"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Nom de la solution"})," : Univers"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Infrastructure"})," : la derni\xe8re version de .Net disponible"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Remarquez que le nom de la solution n'est pas identique au projet, car la solution repr\xe9sente l'application et le projet une partie de l'application."}),"\n",(0,i.jsxs)(n.p,{children:["Supprimez la classe ",(0,i.jsx)(n.strong,{children:"Class1.cs"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Une ",(0,i.jsx)(n.strong,{children:"Biblioth\xe8que de classe"})," est une librairie interne. Ce type de projet n'est pas en mesure de s'ex\xe9cuter de fa\xe7on autonome. Pour \xeatre utilisable, ce projet doit \xeatre int\xe9gr\xe9 dans un projet ",(0,i.jsx)(n.strong,{children:"ex\xe9cutable"})," (WPF, WinForm, Console, ASP.NET MVC, Blazor...)."]}),"\n",(0,i.jsxs)(n.p,{children:["Ce projet contiendra uniquement le ",(0,i.jsx)(n.strong,{children:"contexte"})," et les classes du mod\xe8le de donn\xe9es."]}),"\n",(0,i.jsxs)(n.p,{children:["Dans la ",(0,i.jsx)(n.strong,{children:"Console du Gestionnaire de package"}),", installez les 2 librairies ci-dessous."]}),"\n",(0,i.jsxs)(n.p,{children:["La premi\xe8re librairie est pour le serveur utilis\xe9 avec le contexte. Dans notre cas, c'est ",(0,i.jsx)(n.strong,{children:"SQL Server"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"Install-Package Microsoft.EntityFrameworkCore.SqlServer\n"})}),"\n",(0,i.jsx)(n.p,{children:"La 2e librairie est pour les outils de migration."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"Install-Package Microsoft.EntityFrameworkCore.Tools\n"})}),"\n",(0,i.jsx)(n.h2,{id:"cr\xe9ation-du-mod\xe8le",children:"Cr\xe9ation du mod\xe8le"}),"\n",(0,i.jsxs)(n.p,{children:["Il faut reproduire les classes du mod\xe8le pour repr\xe9senter le ",(0,i.jsx)(n.strong,{children:"DEA"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"En premier lieu, il faut cr\xe9er toutes les classes vides, car les propri\xe9t\xe9s de navigation font des r\xe9f\xe9rences circulaires. Si la classe n'existe pas, Visual Studio va indiquer une erreur."}),"\n",(0,i.jsxs)(n.p,{children:["Cr\xe9ez le dossier ",(0,i.jsx)(n.strong,{children:"Data"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Cr\xe9ez toutes les classes ci-dessous dans le dossier ",(0,i.jsx)(n.strong,{children:"Data"}),"."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Personnage.cs"}),"\n",(0,i.jsx)(n.li,{children:"Univers.cs"}),"\n",(0,i.jsx)(n.li,{children:"Distribution.cs"}),"\n",(0,i.jsx)(n.li,{children:"Film.cs"}),"\n"]}),"\n",(0,i.jsxs)(n.admonition,{type:"note",children:[(0,i.jsxs)(n.p,{children:["Une propri\xe9t\xe9 de navigation qui repr\xe9sente la relation ",(0,i.jsx)(n.strong,{children:"1 \xe0 Plusieurs"})," auront le suffixe ",(0,i.jsx)(n.strong,{children:"Liste"})," pour les diff\xe9rencier des relations ",(0,i.jsx)(n.strong,{children:"Plusieurs \xe0 1"}),", car il s'agit d'une collection d'\xe9l\xe9ments."]}),(0,i.jsxs)(n.p,{children:["Pour une propri\xe9t\xe9 de navigation qui repr\xe9sente une relation ",(0,i.jsx)(n.strong,{children:"Plusieurs \xe0 1"}),", le nom de la propri\xe9t\xe9 de navigation sera le nom de la classe."]})]}),"\n",(0,i.jsxs)(n.p,{children:["Voici le code de la classe ",(0,i.jsx)(n.strong,{children:"Personnage.cs"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:"namespace Univers.EF.Data;\r\npublic class Personnage\r\n{\r\n    public int PersonnageId { get; set; }\r\n    public String Nom { get; set; } = null!;\r\n    public String? IdentiteReelle { get; set; }\r\n\r\n    public DateOnly DateNaissance { get; set; }\r\n    public bool EstVilain { get; set; }\r\n    public int UniversId { get; set; }\r\n    public Univers Univers { get; set; } = null!;\r\n\r\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Pour ",(0,i.jsx)(n.strong,{children:"Univers.cs"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:"nnamespace Univers.EF.Data;\r\npublic class Univers\r\n{\r\n    public int UniversId { get; set; }\r\n    public string Nom { get; set; } = null!;\r\n    public Int16 AnneeCreation { get; set; }\r\n    public string? SiteWeb { get; set; } \r\n    public string? Proprietaire { get; set; }\r\n    public ICollection<Personnage> Personnages { get; set; } = new List<Personnage>();\r\n}\r\n\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["Pour l'instant, nous ne cr\xe9erons pas le code pour ",(0,i.jsx)(n.strong,{children:"Distribution.cs"}),". Nous y reviendrons plus tard"]})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["Pour trouver l'\xe9quivalent d'un type de sql-server vs celui de C#, r\xe9f\xe9rez-vous \xe0 ",(0,i.jsx)(n.a,{href:"https://learn.microsoft.com/en-us/sql/relational-databases/clr-integration-database-objects-types-net-framework/mapping-clr-parameter-data?view=sql-server-ver16&viewFallbackFrom=sql-server-2014&redirectedfrom=MSDN",children:"cette adresse"})]})}),"\n",(0,i.jsxs)(n.admonition,{type:"note",children:[(0,i.jsxs)(n.p,{children:["\xc0 quoi sert ",(0,i.jsx)(n.strong,{children:"= null!"})," ",(0,i.jsx)(n.a,{href:"https://stackoverflow.com/questions/54724304/what-does-null-statement-mean",children:"https://stackoverflow.com/questions/54724304/what-does-null-statement-mean"})]}),(0,i.jsx)(n.p,{children:"Sommairement: ce n'est que pour enlever l'avertissement du compilateur."})]}),"\n",(0,i.jsxs)(n.admonition,{type:"note",children:[(0,i.jsxs)(n.p,{children:["\xc0 quoi sert ",(0,i.jsx)(n.strong,{children:"string?"})]}),(0,i.jsx)(n.p,{children:"Si on ne met pas de ? alors le champs ne peut \xeatre null dans la bd."}),(0,i.jsx)(n.p,{children:"Si on met le ?, alors ce champs sera nullable."}),(0,i.jsx)(n.p,{children:"Par exemple, un personnage n'a pas toujours une identit\xe9 r\xe9elle. C'est pour cela que ce champs est nullable."})]}),"\n",(0,i.jsx)(n.h3,{id:"exercice",children:"Exercice"}),"\n",(0,i.jsxs)(n.p,{children:["Ajoutez le code pour ",(0,i.jsx)(n.strong,{children:"Film.cs"})]}),"\n",(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"Solution"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:"namespace Univers.EF.Data;\r\npublic class Film\r\n{\r\n    public int FilmId { get; set; }\r\n    public string Titre { get; set; } = null!;\r\n    public DateOnly DateSortie { get; set; }\r\n    public byte Etoile { get; set; }\r\n    public int Duree { get; set; }\r\n}\n"})})]}),"\n",(0,i.jsx)(n.h2,{id:"cr\xe9ation-du-contexte",children:"Cr\xe9ation du contexte"}),"\n",(0,i.jsxs)(n.p,{children:["Nous allons maintenant cr\xe9er le code qui va g\xe9n\xe9rer la base de donn\xe9es \xe0 partir des classes. Pour ce faire, nous allons cr\xe9er un ",(0,i.jsx)(n.strong,{children:"contexte"})," qui sera la connexion \xe0 la bd. Nous allons ensuite cr\xe9er des ",(0,i.jsx)(n.strong,{children:"DBSet"})," qui indiqueront quelles classes utiliser pour g\xe9n\xe9rer les tables."]}),"\n",(0,i.jsxs)(n.p,{children:["Cr\xe9ez le dossier ",(0,i.jsx)(n.strong,{children:"Data\\Context"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Cr\xe9ez la classe ",(0,i.jsx)(n.strong,{children:"UniversContext"})," dans le dossier ",(0,i.jsx)(n.strong,{children:"Data\\Context"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:"using Microsoft.EntityFrameworkCore;\r\n\r\nnamespace Univers.EF.Data.Context;\r\n\r\n/// <summary>\r\n/// Contexte pour la base de de donn\xe9es Univers\r\n/// </summary>\r\npublic class UniversContext : DbContext\r\n{\r\n    /// <summary>\r\n    /// Constructeur pour la migration\r\n    /// </summary>\r\n\tpublic UniversContext() : base()\r\n    {\r\n\r\n    }\r\n\r\n    /// <summary>\r\n    /// Constructeur pour l'utilisation en programme\r\n    /// </summary>\r\n    /// <param name=\"options\">Option de la base de donn\xe9es</param>\r\n    public UniversContext(DbContextOptions<UniversContext> options)\r\n        : base(options)\r\n    {\r\n    }\r\n\r\n#if DEBUG //Permet d'inclure cette m\xe9thode uniquement si l'application est en mode DEBUG\r\n    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)\r\n    {\r\n        //V\xe9rifie si la configuration n'a pas \xe9t\xe9 sp\xe9cifi\xe9e par un fichier de configuration\r\n        if (optionsBuilder.IsConfigured == false)\r\n        {\r\n            //Aucune configuration \xe0 partir d'un fichier de configuration\r\n            //Option de base pour la migration\r\n            string? chaineConnexion = Environment.GetEnvironmentVariable(\"MIGRATION_CONNECTION_STRING\");\r\n\r\n            //V\xe9rifie si la variable n'est pas vide\r\n            if (string.IsNullOrEmpty(chaineConnexion) == false)\r\n            {\r\n                //La variable n'est pas vide, la chaine de connexion est appliqu\xe9e\r\n                optionsBuilder.UseSqlServer(chaineConnexion);\r\n            }\r\n            else\r\n            {\r\n                //Il n'y a aucune chaine de connexion.\r\n                throw new Exception(\"La variable MIGRATION_CONNECTION_STRING n'est pas sp\xe9cifi\xe9e. Effectuez la commande suivante dans la Console du Gestionnaire de package : $env:MIGRATION_CONNECTION_STRING=\\\"[ma chaine de connexion]\\\" \");\r\n            }\r\n        }\r\n    }\r\n#endif\r\n\r\n    public DbSet<Personnage> PersonnageTb { get; set; }\r\n\r\n    public DbSet<Univers> UniversTb { get; set; }\r\n\r\n    public DbSet<Film> FilmTb { get; set; }\r\n\r\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Premi\xe8rement, la classe h\xe9rite de ",(0,i.jsx)(n.strong,{children:"DbContext"}),". Cette classe contient toute la m\xe9canique de communication et de synchronisation du mod\xe8le objet avec la base de donn\xe9es. La classe sp\xe9cifique ",(0,i.jsx)(n.strong,{children:"UniversContext"})," contient uniquement la d\xe9finition de la base de donn\xe9es relationnelle."]}),"\n",(0,i.jsxs)(n.p,{children:["Avec le nom des tables de cette base de donn\xe9es, il n'est d\xe9j\xe0 pas possible d'utiliser la convention du pluriel \xe0 cause de la table ",(0,i.jsx)(n.strong,{children:"Univers"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Il est possible de choisir le nom des ",(0,i.jsx)(n.strong,{children:"DbSet"}),". Pour ce projet, le suffixe ",(0,i.jsx)(n.strong,{children:"Tb"})," sera ajout\xe9 pour indiquer que c'est la table."]}),"\n",(0,i.jsxs)(n.p,{children:["La table ",(0,i.jsx)(n.strong,{children:"Distribution"})," est volontairement ",(0,i.jsx)(n.strong,{children:"exclue"})," des ",(0,i.jsx)(n.strong,{children:"DbSet"})," pour l'instant, car elle n'a pas de cl\xe9 primaire unique, mais une cl\xe9 primaire compos\xe9e. Ce concept sera pr\xe9sent\xe9 plus tard."]}),"\n",(0,i.jsxs)(n.p,{children:["La m\xe9thode ",(0,i.jsx)(n.strong,{children:"OnConfiguring"})," contient la logique pour la configuration du serveur par un fichier externe ou par une variable d'environnement."]}),"\n",(0,i.jsxs)(n.p,{children:["La clause ",(0,i.jsx)(n.strong,{children:"#if DEBUG"})," indique au compilateur de tenir compte du code seulement si l'application est en mode ",(0,i.jsx)(n.strong,{children:"Debug"}),". Il ne faut pas que cette configuration soit accessible en production."]}),"\n",(0,i.jsx)(n.h3,{id:"migration_connection_string",children:"MIGRATION_CONNECTION_STRING"}),"\n",(0,i.jsxs)(n.p,{children:["Il faut assigner la chaine de connexion dans la variable d'environnement ",(0,i.jsx)(n.strong,{children:"MIGRATION_CONNECTION_STRING"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Il faut faire cette \xe9tape \xe0 chaque d\xe9marrage de ",(0,i.jsx)(n.strong,{children:"Visual Studio"})," s'il est n\xe9cessaire d'effectuer des migrations."]}),"\n",(0,i.jsxs)(n.p,{children:["Dans la ",(0,i.jsx)(n.strong,{children:"Console du Gestionnaire de package"}),", inscrivez la commande ci-dessous."]}),"\n",(0,i.jsx)(n.admonition,{title:"Important",type:"danger",children:(0,i.jsxs)(n.p,{children:["Il est important que le ",(0,i.jsx)(n.strong,{children:"Projet par d\xe9faut"})," de ",(0,i.jsx)(n.strong,{children:"Entity Framework"})," soit s\xe9lectionn\xe9 dans la console. Pour ce projet, ce doit \xeatre ",(0,i.jsx)(n.strong,{children:"Univers.EF"}),"."]})}),"\n",(0,i.jsxs)(n.p,{children:["\xc0 ce stade, il y a un seul projet, ",(0,i.jsx)(n.strong,{children:"Univers.EF"})," sera le seul de la liste."]}),"\n",(0,i.jsxs)(n.p,{children:["Pour ce projet, utilisez cette chaine de connexion. Le nom de la base de donn\xe9es est ",(0,i.jsx)(n.strong,{children:"eDA_4N1_Univers"}),". Modifiez le ",(0,i.jsx)(n.strong,{children:"DA"})," par votre num\xe9ro d'admission."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:'$env:MIGRATION_CONNECTION_STRING = "Server=localhost\\SQLExpress;Database=eDA_4N1_Univers;Trusted_Connection=True;"\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Voici la commande avec le ",(0,i.jsx)(n.strong,{children:"Trusted_Connection=True;"})," , si vous avez l'erreur ",(0,i.jsx)(n.strong,{children:"SSL"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:'$env:MIGRATION_CONNECTION_STRING = "Server=localhost\\SQLExpress;Database=eDA_4N1_Univers;Trusted_Connection=True;Trust Server Certificate=True;"\n'})}),"\n",(0,i.jsx)(n.p,{children:"Si vous oubliez cette \xe9tape, vous allez avoir ce message lors de l'utilisation des commandes de migration. C'est l'exception de la ligne 46 de la classe du contexte."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:'La variable SQL_CONNECTION_STRING n\'est pas sp\xe9cifi\xe9e. Effectuez la commande suivante dans la Console du Gestionnaire de package : $env:MIGRATION_CONNECTION_STRING="{ma chaine de connexion}" \n'})}),"\n",(0,i.jsx)(n.h3,{id:"cr\xe9ation-du-fichier-de-migration",children:"Cr\xe9ation du fichier de migration"}),"\n",(0,i.jsx)(n.p,{children:"Le contexte n'est pas complet, mais il est possible de cr\xe9er une base de donn\xe9es."}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://www.learnentityframeworkcore.com/migrations",children:"EF Core Migrations"})})}),"\n",(0,i.jsx)(n.p,{children:"Il faut cr\xe9er un fichier de migration. La syntaxe de la commande est celle-ci:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Add-Migration [nom migration] -StartupProject [Nom Projet Entity Framework]\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Dans la ",(0,i.jsx)(n.strong,{children:"Console du Gestionnaire de package"}),", inscrivez la commande ci-dessous."]}),"\n",(0,i.jsx)(n.admonition,{title:"Important",type:"danger",children:(0,i.jsxs)(n.p,{children:["Il est important que le ",(0,i.jsx)(n.strong,{children:"Projet par d\xe9faut"})," de ",(0,i.jsx)(n.strong,{children:"Entity Framework"})," soit s\xe9lectionn\xe9 dans la console, m\xeame s'il est indiqu\xe9 dans la ligne de commande. Pour ce projet, ce doit \xeatre ",(0,i.jsx)(n.strong,{children:"Univers.EF"}),"."]})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Add-Migration CreationBD -StartupProject Univers.EF\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Il y a maintenant un dossier ",(0,i.jsx)(n.strong,{children:"Migration"}),". \xc0 l'int\xe9rieur, il y a un fichier avec un ",(0,i.jsx)(n.strong,{children:"timestamp"})," avec le nom de la migration. L'outil ",(0,i.jsx)(n.strong,{children:"Add-Migration"})," s'occupe d'analyser le contexte et de cr\xe9er le fichier de migration correspondant. Il serait possible de faire ce fichier manuellement ou \xe0 partir d'une autre librairie."]}),"\n",(0,i.jsxs)(n.p,{children:["Voici le fichier. La m\xe9thode ",(0,i.jsx)(n.strong,{children:"Up"})," permet d'appliquer la migration \xe0 la base de donn\xe9es et la m\xe9thode ",(0,i.jsx)(n.strong,{children:"Down"})," est de la retirer. Il n'est pas recommand\xe9 de modifier ce fichier s'il a \xe9t\xe9 g\xe9n\xe9r\xe9 par un outil., car il ne sera plus en ",(0,i.jsx)(n.strong,{children:"synchronisation"})," avec le ",(0,i.jsx)(n.strong,{children:"contexte"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'using System;\r\nusing Microsoft.EntityFrameworkCore.Migrations;\r\n\r\n#nullable disable\r\n\r\nnamespace Univers.EF.Migrations\r\n{\r\n    /// <inheritdoc />\r\n    public partial class CreationBD : Migration\r\n    {\r\n        /// <inheritdoc />\r\n        protected override void Up(MigrationBuilder migrationBuilder)\r\n        {\r\n            migrationBuilder.CreateTable(\r\n                name: "FilmTb",\r\n                columns: table => new\r\n                {\r\n                    FilmId = table.Column<int>(type: "int", nullable: false)\r\n                        .Annotation("SqlServer:Identity", "1, 1"),\r\n                    Titre = table.Column<string>(type: "nvarchar(max)", nullable: false),\r\n                    DateSortie = table.Column<DateOnly>(type: "date", nullable: false),\r\n                    Etoile = table.Column<byte>(type: "tinyint", nullable: false),\r\n                    Duree = table.Column<int>(type: "int", nullable: false)\r\n                },\r\n                constraints: table =>\r\n                {\r\n                    table.PrimaryKey("PK_FilmTb", x => x.FilmId);\r\n                });\r\n\r\n            migrationBuilder.CreateTable(\r\n                name: "UniversTb",\r\n                columns: table => new\r\n                {\r\n                    UniversId = table.Column<int>(type: "int", nullable: false)\r\n                        .Annotation("SqlServer:Identity", "1, 1"),\r\n                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),\r\n                    AnneeCreation = table.Column<short>(type: "smallint", nullable: false),\r\n                    SiteWeb = table.Column<string>(type: "nvarchar(max)", nullable: true),\r\n                    Proprietaire = table.Column<string>(type: "nvarchar(max)", nullable: true)\r\n                },\r\n                constraints: table =>\r\n                {\r\n                    table.PrimaryKey("PK_UniversTb", x => x.UniversId);\r\n                });\r\n\r\n            migrationBuilder.CreateTable(\r\n                name: "PersonnageTb",\r\n                columns: table => new\r\n                {\r\n                    PersonnageId = table.Column<int>(type: "int", nullable: false)\r\n                        .Annotation("SqlServer:Identity", "1, 1"),\r\n                    Nom = table.Column<string>(type: "nvarchar(max)", nullable: false),\r\n                    IdentiteReelle = table.Column<string>(type: "nvarchar(max)", nullable: true),\r\n                    DateNaissance = table.Column<DateOnly>(type: "date", nullable: false),\r\n                    EstVilain = table.Column<bool>(type: "bit", nullable: false),\r\n                    UniversId = table.Column<int>(type: "int", nullable: false)\r\n                },\r\n                constraints: table =>\r\n                {\r\n                    table.PrimaryKey("PK_PersonnageTb", x => x.PersonnageId);\r\n                    table.ForeignKey(\r\n                        name: "FK_PersonnageTb_UniversTb_UniversId",\r\n                        column: x => x.UniversId,\r\n                        principalTable: "UniversTb",\r\n                        principalColumn: "UniversId",\r\n                        onDelete: ReferentialAction.Cascade);\r\n                });\r\n\r\n            migrationBuilder.CreateIndex(\r\n                name: "IX_PersonnageTb_UniversId",\r\n                table: "PersonnageTb",\r\n                column: "UniversId");\r\n        }\r\n\r\n        /// <inheritdoc />\r\n        protected override void Down(MigrationBuilder migrationBuilder)\r\n        {\r\n            migrationBuilder.DropTable(\r\n                name: "FilmTb");\r\n\r\n            migrationBuilder.DropTable(\r\n                name: "PersonnageTb");\r\n\r\n            migrationBuilder.DropTable(\r\n                name: "UniversTb");\r\n        }\r\n    }\r\n}\r\n\r\n\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Les fichiers de migration sont incr\xe9mentaux. La g\xe9n\xe9ration d'une migration se base sur le fichier ",(0,i.jsx)(n.strong,{children:"snapshot"})," du dossier de migration."]}),"\n",(0,i.jsx)(n.admonition,{title:"Attention",type:"danger",children:(0,i.jsxs)(n.p,{children:["Il est important d'utiliser la commande ",(0,i.jsx)(n.strong,{children:"Remove-Migration"})," pour retirer une migration de la liste et non supprimer le fichier manuellement."]})}),"\n",(0,i.jsx)(n.h3,{id:"synchronisation-de-la-base-de-donn\xe9es",children:"Synchronisation de la base de donn\xe9es"}),"\n",(0,i.jsxs)(n.p,{children:["Pour synchroniser une migration avec la base de donn\xe9es, il faut utiliser l'utilitaire ",(0,i.jsx)(n.strong,{children:"Update-Database"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"Voici la syntaxe."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Update-Database -StartupProject [Nom Projet Entity Framework] -Migration [Nom migration]\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Si l'argument ",(0,i.jsx)(n.strong,{children:"-Migration"})," n'est pas sp\xe9cifi\xe9, ce sera toutes les migrations qui seront appliqu\xe9es."]}),"\n",(0,i.jsxs)(n.p,{children:["\xc9galement, dans la chaine de connexion de la variable ",(0,i.jsx)(n.strong,{children:"MIGRATION_CONNECTION_STRING"}),", il faut s'assurer que l'utilisateur sp\xe9cifi\xe9 soit en mesure de cr\xe9er des bases de donn\xe9es. Le premier fichier de migration aura le code de cr\xe9ation de la base de donn\xe9es."]}),"\n",(0,i.jsx)(n.p,{children:"Pour ce projet, utilisez cette commande."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:'Update-Database -StartupProject "Univers.EF" -Migration CreationBD\n'})}),"\n",(0,i.jsx)(n.h3,{id:"annulation-dune-migration",children:"Annulation d'une migration"}),"\n",(0,i.jsxs)(n.p,{children:["Si vous vous apercevez qu'il y a une erreur dans une migration, vous devez ",(0,i.jsx)(n.em,{children:"reculer"})," la base de donn\xe9es \xe0 l'\xe9tat pr\xe9c\xe9dent cette migration. Pour ce faire, vous n'avez qu'\xe0 ex\xe9cuter la migration pr\xe9c\xe9dent celle que vous d\xe9sirez enlever. Le ",(0,i.jsx)(n.strong,{children:"down"})," de toutes les migrations suivantes sera ex\xe9cut\xe9."]}),"\n",(0,i.jsx)(n.p,{children:"Exemple:\r\nVous avez les migrations A,B,C,D,E d'ex\xe9cuter. Vous vous apercevez qu'il y a une erreur dans C. Vous devez alors ex\xe9cuter la commande:"}),"\n",(0,i.jsx)(n.p,{children:'Update-Database -StartupProject "votreprojet" -Migration B'}),"\n",(0,i.jsx)(n.p,{children:"Le down de C,D, et E sera alors ex\xe9cut\xe9.\r\nVous devez ensuite enlever les migration"}),"\n",(0,i.jsxs)(n.p,{children:["Si c'est la premi\xe8re migration que vous d\xe9sirez d\xe9faire ... vous devez alors d\xe9truire la bd avec la commande ",(0,i.jsx)(n.strong,{children:"Drop-Database"}),"."]})]})}function u(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>a,a:()=>l});var i=r(7294);const s={},t=i.createContext(s);function l(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);