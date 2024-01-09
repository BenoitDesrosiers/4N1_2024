"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[9395],{8898:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>l,toc:()=>d});var i=r(5893),t=r(1151);const s={sidebar_position:15},a="Modification de la BD",l={id:"Entity Framework/EF_modification_bd",title:"Modification de la BD",description:"Ouvrez SSMS et la base de donn\xe9es sera pr\xe9sente.",source:"@site/docs/03-Entity Framework/EF_modification_bd.md",sourceDirName:"03-Entity Framework",slug:"/Entity Framework/EF_modification_bd",permalink:"/4N1_2024/docs/Entity Framework/EF_modification_bd",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:15,frontMatter:{sidebar_position:15},sidebar:"NotesSidebar",previous:{title:"Cr\xe9ation de la BD",permalink:"/4N1_2024/docs/Entity Framework/EF_creation_bd"},next:{title:"Insertion de donn\xe9es",permalink:"/4N1_2024/docs/Entity Framework/EF_seed"}},o={},d=[{value:"Configuration du contexte",id:"configuration-du-contexte",level:2},{value:"OnModelCreating",id:"onmodelcreating",level:3},{value:"Nom des tables",id:"nom-des-tables",level:3},{value:"__EFMigrationsHistory",id:"__efmigrationshistory",level:3},{value:"Cr\xe9er une cl\xe9 primaire compos\xe9e",id:"cr\xe9er-une-cl\xe9-primaire-compos\xe9e",level:3},{value:"Type des champs - string, decimal et date",id:"type-des-champs---string-decimal-et-date",level:3},{value:"Ajout d&#39;une contrainte d&#39;unicit\xe9",id:"ajout-dune-contrainte-dunicit\xe9",level:3}];function c(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"modification-de-la-bd",children:"Modification de la BD"}),"\n",(0,i.jsxs)(n.p,{children:["Ouvrez ",(0,i.jsx)(n.strong,{children:"SSMS"})," et la base de donn\xe9es sera pr\xe9sente."]}),"\n",(0,i.jsx)(n.p,{children:"Il y a par contre quelques erreurs."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Les tables se terminent par ",(0,i.jsx)(n.strong,{children:"Tb"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Toutes les propri\xe9t\xe9s ",(0,i.jsx)(n.strong,{children:"string"})," sont des ",(0,i.jsx)(n.strong,{children:"NVARCHAR(max)"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Le champ ",(0,i.jsx)(n.strong,{children:"Univers.Nom"})," n'est pas unique. (ce n'\xe9tait pas dans le diagramme, mais ca fait du sens ","\ud83d\ude04"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Ceci ne respecte pas le ",(0,i.jsx)(n.strong,{children:"DEA"}),". Il faut configurer le contexte pour respecter le ",(0,i.jsx)(n.strong,{children:"DEA"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"L'utilisation de la migration permet \xe9galement de conserver les donn\xe9es existantes dans une table."}),"\n",(0,i.jsxs)(n.p,{children:["Dans ",(0,i.jsx)(n.strong,{children:"SSMS"}),", ins\xe9rez un r\xf4le dans la table ",(0,i.jsx)(n.strong,{children:"UniversTb"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"USE eDA_4N1_Univers;\r\nGO\r\n\r\nINSERT INTO UniversTb(Nom, AnneeCreation)\r\nVALUES ('DC', 1935);\n"})}),"\n",(0,i.jsxs)(n.p,{children:["La cl\xe9 primaire n'est pas sp\xe9cifi\xe9e dans le ",(0,i.jsx)(n.strong,{children:"INSERT"}),". La migration consid\xe8re que la cl\xe9 primaire d'une table est ",(0,i.jsx)(n.strong,{children:"auto incr\xe9ment\xe9e"})," par d\xe9faut."]}),"\n",(0,i.jsx)(n.h2,{id:"configuration-du-contexte",children:"Configuration du contexte"}),"\n",(0,i.jsx)(n.h3,{id:"onmodelcreating",children:"OnModelCreating"}),"\n",(0,i.jsx)(n.p,{children:"Il est possible d'ajouter des configurations et des sp\xe9cifications \xe0 la base de donn\xe9es."}),"\n",(0,i.jsx)(n.p,{children:"Il est possible de sp\xe9cifier le nom de la table pour chacune des classes, les cl\xe9s primaires compos\xe9es, des types de donn\xe9es sp\xe9cifiques, des contraintes sur une colonne..."}),"\n",(0,i.jsxs)(n.p,{children:["Il faut les ajouter dans la m\xe9thode ",(0,i.jsx)(n.strong,{children:"OnModelCreating"})," du contexte. Il s'agit du ",(0,i.jsx)(n.a,{href:"https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx",children:(0,i.jsx)(n.strong,{children:"FluentAPI"})})," . Il est possible de faire plusieurs configurations avec ",(0,i.jsx)(n.a,{href:"https://www.entityframeworktutorial.net/code-first/dataannotation-in-code-first.aspx",children:(0,i.jsx)(n.strong,{children:"DataAnnotation"})})," directement avec les classes du mod\xe8le, mais certaines configurations doivent \xeatre faites obligatoirement avec ",(0,i.jsx)(n.strong,{children:"FluentAPI"}),". \xc9galement, il y a certaines limitations selon la version de ",(0,i.jsx)(n.strong,{children:"Entity Framework Core"})," utilis\xe9e. Le ",(0,i.jsx)(n.strong,{children:"FluentAPI"})," permet de tout faire. Il est pr\xe9f\xe9rable de le faire dans un endroit centralis\xe9."]}),"\n",(0,i.jsx)(n.h3,{id:"nom-des-tables",children:"Nom des tables"}),"\n",(0,i.jsxs)(n.p,{children:["Pour d\xe9buter, il faut modifier le nom des tables pour retirer le suffixe ",(0,i.jsx)(n.strong,{children:"Tb"})," dans la base de donn\xe9es, mais il faut le conserver dans les ",(0,i.jsx)(n.strong,{children:"DBSet"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Ajoutez la m\xe9thode ci-dessous dans la classe ",(0,i.jsx)(n.strong,{children:"UniversContext.cs"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'/// <summary>\r\n/// Configuration sp\xe9cifique de la base de donn\xe9es\r\n/// </summary>\r\n/// <param name="modelBuilder"></param>\r\nprotected override void OnModelCreating(ModelBuilder modelBuilder)\r\n{\r\n    //Table Personnage\r\n    modelBuilder.Entity<Personnage>(entity =>\r\n    {\r\n        //Sp\xe9cifie le nom de la table dans la BD\r\n        entity.ToTable("Personnage");\r\n    });\r\n\r\n    //Table Univers\r\n    modelBuilder.Entity<Univers>(entity =>\r\n    {\r\n        entity.ToTable("Univers");\r\n    });\r\n\r\n    //Table Film\r\n    modelBuilder.Entity<Film>(entity =>\r\n    {\r\n        entity.ToTable("Film");\r\n    });\r\n\r\n    \r\n}\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Pour chacune des ",(0,i.jsx)(n.strong,{children:"entit\xe9s (mod\xe8les/tables)"}),", il faut utiliser le ",(0,i.jsx)(n.strong,{children:"modelBuilder"})," pour faire la configuration. Dans une mod\xe9lisation de donn\xe9es, le terme ",(0,i.jsx)(n.strong,{children:"Entit\xe9"})," est utilis\xe9 pour repr\xe9senter un concept. ",(0,i.jsx)(n.strong,{children:"DEA"})," est pour ",(0,i.jsx)(n.strong,{children:"Diagramme Entit\xe9 Association"}),". Donc une ",(0,i.jsx)(n.strong,{children:"entit\xe9"})," dans une base de donn\xe9es est une table et pour un mod\xe8le objet une classe de mod\xe8le de donn\xe9es."]}),"\n",(0,i.jsxs)(n.p,{children:["La m\xe9thode ",(0,i.jsx)(n.strong,{children:"ToTable()"})," permet d'indiquer le nom de la table dans la base de donn\xe9es. Il serait possible de s'adapter aux standards propres de l'organisation/technologie en utilisant que des minuscules, PascalCase, camelCase, la pluralisation, le underscore pour une table pivot..."]}),"\n",(0,i.jsxs)(n.p,{children:["Dans la ",(0,i.jsx)(n.strong,{children:"Console du gestionnaire de Package"}),", cr\xe9ez la migration ",(0,i.jsx)(n.strong,{children:"RenommerTables"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Add-Migration RenommerTables -StartupProject Univers.EF\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Si vous ouvrez le fichier ",(0,i.jsx)(n.strong,{children:"xxx_RenommerTables.cs"})," dans le dossier de migration, il y aura seulement la logique pour renommer les tables. En ",(0,i.jsx)(n.strong,{children:"SQL"}),", cette t\xe2che demanderait beaucoup de code."]}),"\n",(0,i.jsxs)(n.p,{children:["Appliquez la migration avec la commande ",(0,i.jsx)(n.strong,{children:"Update-Database"}),". Il faut sp\xe9cifier la migration ",(0,i.jsx)(n.strong,{children:"RenommerTables"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Pour ce projet, utilisez cette commande. Le nom de la base de donn\xe9es est ",(0,i.jsx)(n.strong,{children:"eDA_4N1_Univers"}),". Modifiez le ",(0,i.jsx)(n.strong,{children:"DA"})," par votre num\xe9ro d'admission."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:"Update-Database -StartupProject Univers.EF -Migration RenommerTables \n"})}),"\n",(0,i.jsxs)(n.p,{children:["Ouvrez ",(0,i.jsx)(n.strong,{children:"SSMS"})," et la base de donn\xe9es sera pr\xe9sente avec les nouveaux noms."]}),"\n",(0,i.jsxs)(n.p,{children:["Effectuez \xe9galement la requ\xeate ci-dessous. L'enregistrement dans ",(0,i.jsx)(n.strong,{children:"Univers"})," est toujours l\xe0."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sql",children:"SELECT * FROM [Univers];\n"})}),"\n",(0,i.jsx)(n.h3,{id:"__efmigrationshistory",children:"__EFMigrationsHistory"}),"\n",(0,i.jsxs)(n.p,{children:["La base de donn\xe9es a \xe9galement une table ",(0,i.jsx)(n.strong,{children:"__EFMigrationsHistory"}),". Cette table permet de lister les migrations qui ont \xe9t\xe9 appliqu\xe9es sur la base de donn\xe9es."]}),"\n",(0,i.jsx)(n.p,{children:"La table a actuellement ces enregistrements."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"MigrationId\t\t\t\t\t\t\t\t\t\t\t\t\t\tProductVersion\r\n20230315124209_CreationBD\t\t\t\t\t\t\t\t\t\t7.0.4\r\n20230315131307_RenommerTables\t\t\t\t\t\t\t\t\t7.0.4\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Pour revenir \xe0 l'\xe9tat initial, il faut appliquer de nouveau la migration ",(0,i.jsx)(n.strong,{children:"CreationBD"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"Pour ce projet, utilisez cette commande."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:"Update-Database -Migration CreationBD\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Ouvrez ",(0,i.jsx)(n.strong,{children:"SSMS"})," et la base de donn\xe9es sera pr\xe9sente avec les anciens noms."]}),"\n",(0,i.jsxs)(n.p,{children:["La table ",(0,i.jsx)(n.strong,{children:"__EFMigrationsHistory"})," a seulement cet enregistrement."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"MigrationId\t\t\t\t\t\t\t\t\t\t\t\t\t\tProductVersion\r\n20230315124209_CreationBD\t\t\t\t\t\t\t\t\t\t7.0.4\n"})}),"\n",(0,i.jsx)(n.h3,{id:"cr\xe9er-une-cl\xe9-primaire-compos\xe9e",children:"Cr\xe9er une cl\xe9 primaire compos\xe9e"}),"\n",(0,i.jsxs)(n.p,{children:["Il faut cr\xe9er une cl\xe9 primaire compos\xe9e pour la table ",(0,i.jsx)(n.strong,{children:"Distribution"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Copiez ce code dans la classe ",(0,i.jsx)(n.strong,{children:"Distribution.cs"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:"namespace Univers.EF.Data;\r\n\r\npublic class Distribution\r\n{\r\n    public int PersonnageId { get; set; }\r\n    public int FilmId { get; set; }\r\n    public string Acteur { get; set; } = null!;\r\n    public Personnage Personnage { get; set; } = null!;\r\n    public Film Film { get; set; } = null!;\r\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Copiez ce code dans la classe ",(0,i.jsx)(n.strong,{children:"Personnage.cs"})," pour ajouter la collection ",(0,i.jsx)(n.strong,{children:"DistributionListe"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:"namespace Univers.EF.Data;\r\npublic class Personnage\r\n{\r\n    public int PersonnageId { get; set; }\r\n    public String Nom { get; set; } = null!;\r\n    public String? IdentiteReelle { get; set; }\r\n\r\n    public DateOnly DateNaissance { get; set; }\r\n    public bool EstVilain { get; set; }\r\n    public int UniversId { get; set; }\r\n    public Univers Univers { get; set; } = null!;\r\n    //highlight-next-line\r\n    public ICollection<Distribution> DistributionListe { get; set; } = new List<Distribution>();\r\n}\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Copiez ce code dans la classe ",(0,i.jsx)(n.strong,{children:"Film.cs"})," pour ajouter la collection ",(0,i.jsx)(n.strong,{children:"DistributionListe"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:"namespace Univers.EF.Data;\r\npublic class Film\r\n{\r\n    public int FilmId { get; set; }\r\n    public string Titre { get; set; } = null!;\r\n    public DateOnly DateSortie { get; set; }\r\n    public byte Etoile { get; set; }\r\n    public int Duree { get; set; }\r\n        //highlight-next-line\r\n    public ICollection<Distribution> DistributionListe { get; set; } = new List<Distribution>();\r\n}\r\n\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Remplacez le code de la classe ",(0,i.jsx)(n.strong,{children:"UniversContext"})," par celui-ci afin d'ajouter le ",(0,i.jsx)(n.strong,{children:"DBSet<Distribution>"})," dans le contexte."]}),"\n",(0,i.jsx)(n.p,{children:"L'ajout est \xe0 la ligne 88. Il a y \xe9galement la sp\xe9cification du nom de la table \xe0 la ligne 76."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:'using Microsoft.EntityFrameworkCore;\r\n\r\nnamespace Univers.EF.Data.Context;\r\n\r\n/// <summary>\r\n/// Contexte pour la base de de donn\xe9es Univers\r\n/// </summary>\r\npublic class UniversContext : DbContext\r\n{\r\n    /// <summary>\r\n    /// Constructeur pour la migration\r\n    /// </summary>\r\n\tpublic UniversContext() : base()\r\n    {\r\n\r\n    }\r\n\r\n    /// <summary>\r\n    /// Constructeur pour l\'utilisation en programme\r\n    /// </summary>\r\n    /// <param name="options">Option de la base de donn\xe9es</param>\r\n    public UniversContext(DbContextOptions<UniversContext> options)\r\n        : base(options)\r\n    {\r\n    }\r\n\r\n#if DEBUG //Permet d\'inclure cette m\xe9thode uniquement si l\'application est en mode DEBUG\r\n    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)\r\n    {\r\n        //V\xe9rifie si la configuration n\'a pas \xe9t\xe9 sp\xe9cifi\xe9e par un fichier de configuration\r\n        if (optionsBuilder.IsConfigured == false)\r\n        {\r\n            //Aucune configuration \xe0 partir d\'un fichier de configuration\r\n            //Option de base pour la migration\r\n            string? chaineConnexion = Environment.GetEnvironmentVariable("MIGRATION_CONNECTION_STRING");\r\n            //V\xe9rifie si la variable n\'est pas vide\r\n            if (string.IsNullOrEmpty(chaineConnexion) == false)\r\n            {\r\n                //La variable n\'est pas vide, la chaine de connexion est appliqu\xe9e\r\n                optionsBuilder.UseSqlServer(chaineConnexion);\r\n            }\r\n            else\r\n            {\r\n                //Il n\'y a aucune chaine de connexion.\r\n                throw new Exception("La variable MIGRATION_CONNECTION_STRING n\'est pas sp\xe9cifi\xe9e. Effectuez la commande suivante dans la Console du Gestionnaire de package : $env:MIGRATION_CONNECTION_STRING=\\"[ma chaine de connexion]\\" ");\r\n            }\r\n        }\r\n    }\r\n#endif\r\n\r\n    /// <summary>\r\n    /// Configuration sp\xe9cifique de la base de donn\xe9es\r\n    /// </summary>\r\n    /// <param name="modelBuilder"></param>\r\n    protected override void OnModelCreating(ModelBuilder modelBuilder)\r\n    {\r\n        //Table Personnage\r\n        modelBuilder.Entity<Personnage>(entity =>\r\n        {\r\n            //Sp\xe9cifie le nom de la table dans la BD\r\n            entity.ToTable("Personnage");\r\n        });\r\n\r\n        //Table Univers\r\n        modelBuilder.Entity<Univers>(entity =>\r\n        {\r\n            entity.ToTable("Univers");\r\n        });\r\n\r\n        //Table Film\r\n        modelBuilder.Entity<Film>(entity =>\r\n        {\r\n            entity.ToTable("Film");\r\n        });\r\n//highlight-start\r\n        //Table Distribution\r\n        modelBuilder.Entity<Distribution>(entity =>\r\n        {\r\n            entity.ToTable("Distribution");\r\n        });\r\n//highlight-end\r\n    }\r\n    public DbSet<Personnage> PersonnageTb { get; set; }\r\n\r\n    public DbSet<Univers> UniversTb { get; set; }\r\n\r\n    public DbSet<Film> FilmTb { get; set; }\r\n//highlight-next-line\r\n    public DbSet<Distribution> DistributionTb { get; set; }\r\n\r\n}\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Effectuez une nouvelle migration nomm\xe9e ",(0,i.jsx)(n.strong,{children:"AjouterTableDistribution"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Add-Migration AjouterTableDistribution -StartupProject Univers.EF\n"})}),"\n",(0,i.jsx)(n.p,{children:"Vous allez avoir ce message d'erreur."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"The entity type 'Distribution' requires a primary key to be defined. If you intended to use a keyless entity type, call 'HasNoKey' in 'OnModelCreating'. For more information on keyless entity types, see https://go.microsoft.com/fwlink/?linkid=2141943.\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Ceci indique que la classe ",(0,i.jsx)(n.strong,{children:"Distribution"})," n'a pas de cl\xe9 primaire, car il n'y a pas de propri\xe9t\xe9 ",(0,i.jsx)(n.strong,{children:"DistributionId"}),". Le g\xe9n\xe9rateur de migration n'est pas en mesure de d\xe9terminer que les propri\xe9t\xe9s ",(0,i.jsx)(n.strong,{children:"PersonnageId"})," et ",(0,i.jsx)(n.strong,{children:"FilmId"})," sont les cl\xe9s primaires. Il faut donc le sp\xe9cifier dans le contexte."]}),"\n",(0,i.jsxs)(n.p,{children:["Modifiez la partie ",(0,i.jsx)(n.strong,{children:"Distribution"})," dans la m\xe9thode ",(0,i.jsx)(n.strong,{children:"OnModelCreating()"})," du contexte."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'///Table Distribution\r\nmodelBuilder.Entity<Distribution>(entity =>\r\n{\r\n    entity.ToTable("Distribution");\r\n\r\n    //highlight-start\r\n    //sp\xe9cifie la cl\xe9 primaire\r\n    entity.HasKey(t => new {t.PersonnageId, t.FilmId});\r\n    //highlight-end\r\n});\n'})}),"\n",(0,i.jsxs)(n.p,{children:["La m\xe9thode ",(0,i.jsx)(n.strong,{children:"HasKey()"})," permet de sp\xe9cifier la cl\xe9 primaire. Si la cl\xe9 est repr\xe9sent\xe9e par plusieurs champs, il faut cr\xe9er un objet dynamique ",(0,i.jsx)(n.strong,{children:"new "})," et ins\xe9rer toutes les propri\xe9t\xe9s qui repr\xe9sentent la cl\xe9 primaire."]}),"\n",(0,i.jsxs)(n.p,{children:["Il peut arriver qu'une table n'utilise pas une cl\xe9 artificielle pour la cl\xe9 primaire. Par exemple, la table ",(0,i.jsx)(n.strong,{children:"Etudiant"})," peut avoir comme cl\xe9 primaire le champ ",(0,i.jsx)(n.strong,{children:"DA"})," et non ",(0,i.jsx)(n.strong,{children:"EtudiantId"}),". Il faudrait sp\xe9cifier ",(0,i.jsx)(n.strong,{children:"entity.HasKey(t => t.DA)"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Re-Effectuez une migration nomm\xe9e ",(0,i.jsx)(n.strong,{children:"AjouterTableDistribution"}),". Elle devrait fonctionner."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Add-Migration AjouterTableDistribution\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Dans le fichier de migration ",(0,i.jsx)(n.strong,{children:"xxx_AjouterTableDistribution.cs"})," du dossier ",(0,i.jsx)(n.strong,{children:"Migrations"}),", il y a seulement la logique de la cr\xe9ation de la table ",(0,i.jsx)(n.strong,{children:"Distribution"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Appliquez les modifications \xe0 la base de donn\xe9es. Sp\xe9cifiez la migration ",(0,i.jsx)(n.strong,{children:"AjouterTableDistribution"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:"Update-Database -StartupProject Univers.EF -Migration AjouterTableDistribution\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Ouvrez ",(0,i.jsx)(n.strong,{children:"SSMS"})," et la base de donn\xe9es aura de nouveau les bons noms de table et la table ",(0,i.jsx)(n.strong,{children:"Distribution"})," est pr\xe9sente avec ses cl\xe9s primaires."]}),"\n",(0,i.jsxs)(n.p,{children:["La table ",(0,i.jsx)(n.strong,{children:"__EFMigrationsHistory"})," a toutes les migrations qui ont \xe9t\xe9 appliqu\xe9es \xe0 la base de donn\xe9es. La migration ",(0,i.jsx)(n.strong,{children:"RenommerTables"})," a \xe9t\xe9 ex\xe9cut\xe9e de nouveau, car la version de la BD \xe9tait celle de ",(0,i.jsx)(n.strong,{children:"CreationBD"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"MigrationId\t\t\t\t\t\t\t\t\t\t\t\t\t\tProductVersion\r\n20230315124209_CreationBD\t\t\t\t\t\t\t\t\t\t7.0.4\r\n20230315131307_RenommerTables\t\t\t\t\t\t\t\t\t7.0.4\r\n20230315140002_AjouterTableDistribution\t\t\t\t\t\t7.0.4\n"})}),"\n",(0,i.jsx)(n.h3,{id:"type-des-champs---string-decimal-et-date",children:"Type des champs - string, decimal et date"}),"\n",(0,i.jsxs)(n.p,{children:["Actuellement, toutes les chaines de caract\xe8res sont des ",(0,i.jsx)(n.strong,{children:"NVARCHAR(MAX)"}),". Il est de plus en plus fr\xe9quent de ne plus sp\xe9cifier la longueur des chaines de caract\xe8res qui ne sont pas fixes, car il est difficile de d\xe9terminer la bonne longueur pour plusieurs champs. La longueur est souvent sp\xe9cifi\xe9e par l'exp\xe9rience, mais sans consid\xe9ration valable. Le ",(0,i.jsx)(n.strong,{children:"NVARCHAR(MAX)"})," va seulement utiliser l'espace n\xe9cessaire. La gestion des contraintes se fait normalement au niveau du logiciel maintenant. Si la longueur maximale doit \xeatre modifi\xe9e, il n'est pas n\xe9cessaire de modifier la base de donn\xe9es, seulement la partie ",(0,i.jsx)(n.strong,{children:"validation"})," dans le logiciel."]}),"\n",(0,i.jsxs)(n.p,{children:["Mais en tant que programmeur, il faut r\xe9aliser le ",(0,i.jsx)(n.strong,{children:"DEA"})," tel que produit par le concepteur. Si vous \xeates le concepteur, posez-vous la question s'il est n\xe9cessaire de limiter la longueur d'un champ ou de ne pas permettre le ",(0,i.jsx)(n.strong,{children:"unicode"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Le ",(0,i.jsx)(n.strong,{children:"modelBuilder"})," a la m\xe9thode ",(0,i.jsx)(n.strong,{children:"Property()"})," qui permet de sp\xe9cifier les \xe9l\xe9ments sp\xe9cifiques \xe0 un champ. La m\xe9thode ",(0,i.jsx)(n.strong,{children:"Property()"})," est chainable, donc il est possible d'ajouter toutes les sp\xe9cifications d'un coup pour une propri\xe9t\xe9. Elle re\xe7oit en param\xe8tre une fonction ",(0,i.jsx)(n.strong,{children:"Lambda"})," pour sp\xe9cifier la propri\xe9t\xe9. La variable ",(0,i.jsx)(n.strong,{children:"t"})," est utilis\xe9e pour ",(0,i.jsx)(n.strong,{children:"Table"}),". Ensuite, les autres m\xe9thodes chainables permettent de configurer la propri\xe9t\xe9/champ."]}),"\n",(0,i.jsxs)(n.p,{children:["Pour sp\xe9cifier la longueur maximale, c'est la m\xe9thode ",(0,i.jsx)(n.strong,{children:"HasMaxLength()"})," qui permet de la sp\xe9cifier."]}),"\n",(0,i.jsxs)(n.p,{children:["Dans le ",(0,i.jsx)(n.strong,{children:"DEA"}),", ce sont des ",(0,i.jsx)(n.strong,{children:"VARCHAR"})," et non des ",(0,i.jsx)(n.strong,{children:"NVARCHAR"}),". La m\xe9thode ",(0,i.jsx)(n.strong,{children:"IsUnicode(false)"})," permet d'indiquer que ce n'est pas un ",(0,i.jsx)(n.strong,{children:"NVARCHAR"}),"."]}),"\n",(0,i.jsx)(n.p,{children:"Voici les exemples pour la configuration des diff\xe9rents cas. La classe compl\xe8te sera fourni \xe0 la fin de la section."}),"\n",(0,i.jsxs)(n.p,{children:["Pour la table ",(0,i.jsx)(n.strong,{children:"Personnage"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'//Table Personnage\r\nmodelBuilder.Entity<Personnage>(entity =>\r\n{\r\n    //Sp\xe9cifie le nom de la table dans la BD\r\n    entity.ToTable("Personnage");\r\n\r\n    entity.Property(t => t.Nom)\r\n        .IsUnicode(false) //VARCHAR ou CHAR\r\n        .HasMaxLength(100); //VARCHAR(100)  \r\n\r\n    entity.Property(t => t.IdentiteReelle)\r\n        .IsUnicode(false) //VARCHAR ou CHAR\r\n        .HasMaxLength(100); //VARCHAR(100)  \r\n});\r\n\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Voici la classe ",(0,i.jsx)(n.strong,{children:"UniversContext.cs"})," au complet avec tous les ajustements pour les champs."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'using Microsoft.EntityFrameworkCore;\r\n\r\nnamespace Univers.EF.Data.Context;\r\n\r\n/// <summary>\r\n/// Contexte pour la base de de donn\xe9es Univers\r\n/// </summary>\r\npublic class UniversContext : DbContext\r\n{\r\n    /// <summary>\r\n    /// Constructeur pour la migration\r\n    /// </summary>\r\n\tpublic UniversContext() : base()\r\n    {\r\n\r\n    }\r\n\r\n    /// <summary>\r\n    /// Constructeur pour l\'utilisation en programme\r\n    /// </summary>\r\n    /// <param name="options">Option de la base de donn\xe9es</param>\r\n    public UniversContext(DbContextOptions<UniversContext> options)\r\n        : base(options)\r\n    {\r\n    }\r\n\r\n#if DEBUG //Permet d\'inclure cette m\xe9thode uniquement si l\'application est en mode DEBUG\r\n    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)\r\n    {\r\n        //V\xe9rifie si la configuration n\'a pas \xe9t\xe9 sp\xe9cifi\xe9e par un fichier de configuration\r\n        if (optionsBuilder.IsConfigured == false)\r\n        {\r\n            //Aucune configuration \xe0 partir d\'un fichier de configuration\r\n            //Option de base pour la migration\r\n            string? chaineConnexion = Environment.GetEnvironmentVariable("MIGRATION_CONNECTION_STRING");\r\n            //V\xe9rifie si la variable n\'est pas vide\r\n            if (string.IsNullOrEmpty(chaineConnexion) == false)\r\n            {\r\n                //La variable n\'est pas vide, la chaine de connexion est appliqu\xe9e\r\n                optionsBuilder.UseSqlServer(chaineConnexion);\r\n            }\r\n            else\r\n            {\r\n                //Il n\'y a aucune chaine de connexion.\r\n                throw new Exception("La variable MIGRATION_CONNECTION_STRING n\'est pas sp\xe9cifi\xe9e. Effectuez la commande suivante dans la Console du Gestionnaire de package : $env:MIGRATION_CONNECTION_STRING=\\"[ma chaine de connexion]\\" ");\r\n            }\r\n        }\r\n    }\r\n#endif\r\n\r\n    /// <summary>\r\n    /// Configuration sp\xe9cifique de la base de donn\xe9es\r\n    /// </summary>\r\n    /// <param name="modelBuilder"></param>\r\n    protected override void OnModelCreating(ModelBuilder modelBuilder)\r\n    {\r\n        //Table Personnage\r\n        modelBuilder.Entity<Personnage>(entity =>\r\n        {\r\n            //Sp\xe9cifie le nom de la table dans la BD\r\n            entity.ToTable("Personnage");\r\n\r\n            entity.Property(t => t.Nom)\r\n                .IsUnicode(false) //VARCHAR ou CHAR\r\n                .HasMaxLength(100); //VARCHAR(100)  \r\n\r\n            entity.Property(t => t.IdentiteReelle)\r\n                .IsUnicode(false) //VARCHAR ou CHAR\r\n                .HasMaxLength(100); //VARCHAR(100)  \r\n        });\r\n\r\n\r\n        //Table Univers\r\n        modelBuilder.Entity<Univers>(entity =>\r\n        {\r\n            entity.ToTable("Univers");\r\n\r\n            entity.Property(t => t.Nom)\r\n                .IsUnicode(false) \r\n                .HasMaxLength(100);   \r\n\r\n            entity.Property(t => t.SiteWeb)\r\n                .IsUnicode(false) \r\n                .HasMaxLength(200);\r\n\r\n            entity.Property(t => t.Proprietaire)\r\n                .IsUnicode(false)\r\n                .HasMaxLength(250);  \r\n        });\r\n\r\n        //Table Film\r\n        modelBuilder.Entity<Film>(entity =>\r\n        {\r\n            entity.ToTable("Film");\r\n\r\n            entity.Property(t => t.Titre)\r\n                .IsUnicode(false) \r\n                .HasMaxLength(100);  \r\n        });\r\n\r\n        //Table Distribution\r\n        modelBuilder.Entity<Distribution>(entity =>\r\n        {\r\n            entity.ToTable("Distribution");\r\n            //sp\xe9cifie la cl\xe9 primaire\r\n            entity.HasKey(t => new {t.PersonnageId, t.FilmId});\r\n\r\n            entity.Property(t => t.Acteur)\r\n                .IsUnicode(false)\r\n                .HasMaxLength(100);\r\n        });\r\n    }\r\n    public DbSet<Personnage> PersonnageTb { get; set; }\r\n\r\n    public DbSet<Univers> UniversTb { get; set; }\r\n\r\n    public DbSet<Film> FilmTb { get; set; }\r\n\r\n    public DbSet<Distribution> DistributionTb { get; set; }\r\n\r\n\r\n}\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Cr\xe9ez la migration ",(0,i.jsx)(n.strong,{children:"CorrectionType"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Add-Migration CorrectionType -StartupProject Univers.EF\n"})}),"\n",(0,i.jsx)(n.p,{children:"Vous verrez l'avertissement suivant passer."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:"An operation was scaffolded that may result in the loss of data. Please review the migration for accuracy."})}),"\n",(0,i.jsxs)(n.p,{children:["Il est caus\xe9 par le fait qu'il y a des donn\xe9es dans la table Univers et que nous changeons le type de ces donn\xe9es. Dans notre situation, ce n'est pas grave, mais dans un vrai syst\xe8me il faudrait surveiller les impacts potentiels d'un tel changement. Il est possible de modifier la migration manuellement pour corriger certains probl\xe8mes; mais nous n'irons pas jusque l\xe0 ",(0,i.jsx)(n.a,{href:"https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/managing?tabs=dotnet-core-cli#customize-migration-code",children:"Pour en savoir plus"})]}),"\n",(0,i.jsxs)(n.p,{children:["Appliquez les modifications \xe0 la base de donn\xe9es. Sp\xe9cifiez la migration ",(0,i.jsx)(n.strong,{children:"CorrectionType"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:"Update-Database -StartupProject Univers.EF -Migration CorrectionType\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Ouvrez ",(0,i.jsx)(n.strong,{children:"SSMS"})," et la base de donn\xe9es aura les nouveaux types pour les champs modifi\xe9s."]}),"\n",(0,i.jsx)(n.h3,{id:"ajout-dune-contrainte-dunicit\xe9",children:"Ajout d'une contrainte d'unicit\xe9"}),"\n",(0,i.jsxs)(n.p,{children:["Pour la table ",(0,i.jsx)(n.strong,{children:"Univers"}),", le champ ",(0,i.jsx)(n.strong,{children:"Nom"})," doit \xeatre unique."]}),"\n",(0,i.jsx)(n.p,{children:"Cette contrainte est assez importante dans la base de donn\xe9es, car s'il y a un probl\xe8me dans l'application pour faire la validation d'un doublon, l'application aurait une faille de s\xe9curit\xe9."}),"\n",(0,i.jsxs)(n.p,{children:["Une contrainte d'unicit\xe9 permet de cr\xe9er un ",(0,i.jsx)(n.strong,{children:"index"})," de recherche sur le champ et d'indiquer la contrainte ",(0,i.jsx)(n.strong,{children:"UNIQUE"}),". Il faut donc cr\xe9er un ",(0,i.jsx)(n.strong,{children:"index"})," dans le contexte et de le sp\xe9cifier comme unique. Par contre, dans la base de donn\xe9es, il n'y aura pas de contrainte explicite ",(0,i.jsx)(n.strong,{children:"UNIQUE"})," sur le champ. Ce sera uniquement l'index qui s'occupera de valider l'unicit\xe9."]}),"\n",(0,i.jsxs)(n.p,{children:["Remplacez la section pour ",(0,i.jsx)(n.strong,{children:"Univers"})," dans ",(0,i.jsx)(n.strong,{children:"UniversContext.cs"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:'\r\n//Table Univers\r\nmodelBuilder.Entity<Univers>(entity =>\r\n{\r\n    entity.ToTable("Univers");\r\n\r\n    entity.Property(t => t.Nom)\r\n        .IsUnicode(false) \r\n        .HasMaxLength(100);   \r\n\r\n    entity.Property(t => t.SiteWeb)\r\n        .IsUnicode(false) \r\n        .HasMaxLength(200);\r\n\r\n    entity.Property(t => t.Proprietaire)\r\n        .IsUnicode(false)\r\n        .HasMaxLength(250);\r\n\r\n//highlight-next-line\r\n    entity.HasIndex(t => t.Nom).IsUnique(true);\r\n});\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Cr\xe9ez la migration ",(0,i.jsx)(n.strong,{children:"UniversNomUnique"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Add-Migration UniversNomUnique -StartupProject Univers.EF\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Appliquez les modifications \xe0 la base de donn\xe9es. Sp\xe9cifiez la migration ",(0,i.jsx)(n.strong,{children:"UniversNomUnique"}),"."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Update-Database -StartupProject Univers.EF -Migration UniversNomUnique\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Ouvrez ",(0,i.jsx)(n.strong,{children:"SSMS"})," et la base de donn\xe9es aura l'index avec la mention ",(0,i.jsx)(n.strong,{children:"Unique"})," sur le champ ",(0,i.jsx)(n.strong,{children:"Nom"}),". Il n'aura pas de contrainte ",(0,i.jsx)(n.strong,{children:"UNIQUE"})," sur le champ, mais le r\xe9sultat est le m\xeame."]}),"\n",(0,i.jsx)(n.p,{children:"Il y a plusieurs autres types de modifications possibles. Nous en verrons d'autres dans l'exemple utilisant WPF."})]})}function u(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>l,a:()=>a});var i=r(7294);const t={},s=i.createContext(t);function a(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);