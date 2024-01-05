"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[8991],{294:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>u,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var t=r(5893),i=r(1151);const s={sidebar_position:17},o="Insertion de donn\xe9es",a={id:"03 Entity Framework/EF_seed",title:"Insertion de donn\xe9es",description:"Pour ajouter des donn\xe9es, il faut le faire dans la m\xe9thode OnModelCreating(). Cette action s'appelle Seed pour semer des donn\xe9es. Nous verrons plus tard des outils plus performants afin de g\xe9n\xe9rer des donn\xe9es de tests.",source:"@site/docs/03 Entity Framework/EF_seed.md",sourceDirName:"03 Entity Framework",slug:"/03 Entity Framework/EF_seed",permalink:"/4N1_2024/docs/03 Entity Framework/EF_seed",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:17,frontMatter:{sidebar_position:17},sidebar:"NotesSidebar",previous:{title:"Modification de la BD",permalink:"/4N1_2024/docs/03 Entity Framework/EF_modification_bd"},next:{title:"CRUD EF en LINQ",permalink:"/4N1_2024/docs/03 Entity Framework/EF_lecture_des_donnees"}},d={},l=[{value:"Pr\xe9paration du contexte",id:"pr\xe9paration-du-contexte",level:2},{value:"Cr\xe9ation des donn\xe9es",id:"cr\xe9ation-des-donn\xe9es",level:2},{value:"Exercice",id:"exercice",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components},{Details:r}=n;return r||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"insertion-de-donn\xe9es",children:"Insertion de donn\xe9es"}),"\n",(0,t.jsxs)(n.p,{children:["Pour ajouter des donn\xe9es, il faut le faire dans la m\xe9thode ",(0,t.jsx)(n.strong,{children:"OnModelCreating()"}),". Cette action s'appelle ",(0,t.jsx)(n.strong,{children:"Seed"})," pour semer des donn\xe9es. Nous verrons plus tard des outils plus performants afin de g\xe9n\xe9rer des donn\xe9es de tests."]}),"\n",(0,t.jsxs)(n.p,{children:["Avant de poursuivre, il faut retirer l'enregistrement de la table ",(0,t.jsx)(n.strong,{children:"Univers"})," qui a \xe9t\xe9 fait manuellement."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"DELETE FROM [Univers];\n"})}),"\n",(0,t.jsx)(n.h2,{id:"pr\xe9paration-du-contexte",children:"Pr\xe9paration du contexte"}),"\n",(0,t.jsxs)(n.p,{children:["Pour \xe9viter que le ",(0,t.jsx)(n.strong,{children:"Seed"})," soit toujours ex\xe9cut\xe9 en m\xe9moire, il est pr\xe9f\xe9rable de modifier le contexte. Ce sera l'attribut ",(0,t.jsx)(n.strong,{children:"_executerSeed"})," qui s'occupera de ceci."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:'using Microsoft.EntityFrameworkCore;\r\n\r\nnamespace Univers.EF.Data.Context;\r\n\r\n/// <summary>\r\n/// Contexte pour la base de de donn\xe9es Univers\r\n/// </summary>\r\npublic class UniversContext : DbContext\r\n{\r\n//highlight-next-line\r\n    private bool _executerSeed = false;\r\n\r\n    /// <summary>\r\n    /// Constructeur pour la migration\r\n    /// </summary>\r\n\tpublic UniversContext() : base()\r\n    {\r\n\r\n    }\r\n\r\n    /// <summary>\r\n    /// Constructeur pour l\'utilisation en programme\r\n    /// </summary>\r\n    /// <param name="options">Option de la base de donn\xe9es</param>\r\n    public UniversContext(DbContextOptions<UniversContext> options)\r\n        : base(options)\r\n    {\r\n    }\r\n\r\n#if DEBUG //Permet d\'inclure cette m\xe9thode uniquement si l\'application est en mode DEBUG\r\n    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)\r\n    {\r\n        //V\xe9rifie si la configuration n\'a pas \xe9t\xe9 sp\xe9cifi\xe9e par un fichier de configuration\r\n        if (optionsBuilder.IsConfigured == false)\r\n        {\r\n            //Aucune configuration \xe0 partir d\'un fichier de configuration\r\n            //Option de base pour la migration\r\n            //string? chaineConnexion = Environment.GetEnvironmentVariable("MIGRATION_CONNECTION_STRING");\r\n            string? chaineConnexion = "Server=localhost\\\\SQLExpress;Database=eDA_4N1_Univers;Trusted_Connection=True;Trust Server Certificate=True;";\r\n            //V\xe9rifie si la variable n\'est pas vide\r\n            if (string.IsNullOrEmpty(chaineConnexion) == false)\r\n            {\r\n                //La variable n\'est pas vide, la chaine de connexion est appliqu\xe9e\r\n                optionsBuilder.UseSqlServer(chaineConnexion);\r\n                //highlight-next-line\r\n                _executerSeed = true;\r\n            }\r\n            else\r\n            {\r\n                //Il n\'y a aucune chaine de connexion.\r\n                throw new Exception("La variable MIGRATION_CONNECTION_STRING n\'est pas sp\xe9cifi\xe9e. Effectuez la commande suivante dans la Console du Gestionnaire de package : $env:MIGRATION_CONNECTION_STRING=\\"[ma chaine de connexion]\\" ");\r\n            }\r\n        }\r\n    }\r\n#endif\r\n\r\n    /// <summary>\r\n    /// Configuration sp\xe9cifique de la base de donn\xe9es\r\n    /// </summary>\r\n    /// <param name="modelBuilder"></param>\r\n    protected override void OnModelCreating(ModelBuilder modelBuilder)\r\n    {\r\n        //Table Personnage\r\n        modelBuilder.Entity<Personnage>(entity =>\r\n        {\r\n            //Sp\xe9cifie le nom de la table dans la BD\r\n            entity.ToTable("Personnage");\r\n\r\n            entity.Property(t => t.Nom)\r\n                .IsUnicode(false) //VARCHAR ou CHAR\r\n                .HasMaxLength(100); //VARCHAR(100)  \r\n\r\n            entity.Property(t => t.IdentiteReelle)\r\n                .IsUnicode(false) //VARCHAR ou CHAR\r\n                .HasMaxLength(100); //VARCHAR(100)  \r\n        });\r\n\r\n\r\n        //Table Univers\r\n        modelBuilder.Entity<Univers>(entity =>\r\n        {\r\n            entity.ToTable("Univers");\r\n\r\n            entity.Property(t => t.Nom)\r\n                .IsUnicode(false) \r\n                .HasMaxLength(100);   \r\n\r\n            entity.Property(t => t.SiteWeb)\r\n                .IsUnicode(false) \r\n                .HasMaxLength(200);\r\n\r\n            entity.Property(t => t.Proprietaire)\r\n                .IsUnicode(false)\r\n                .HasMaxLength(250);\r\n\r\n            entity.HasIndex(t => t.Nom).IsUnique(true);\r\n        });\r\n\r\n        //Table Film\r\n        modelBuilder.Entity<Film>(entity =>\r\n        {\r\n            entity.ToTable("Film");\r\n\r\n            entity.Property(t => t.Titre)\r\n                .IsUnicode(false) \r\n                .HasMaxLength(100);  \r\n        });\r\n\r\n        //Table Distribution\r\n        modelBuilder.Entity<Distribution>(entity =>\r\n        {\r\n            entity.ToTable("Distribution");\r\n            //sp\xe9cifie la cl\xe9 primaire\r\n            entity.HasKey(t => new {t.PersonnageId, t.FilmId});\r\n\r\n            entity.Property(t => t.Acteur)\r\n                .IsUnicode(false)\r\n                .HasMaxLength(100);\r\n        });\r\n\r\n        if (_executerSeed == true)\r\n        {\r\n            Seed(modelBuilder);\r\n        }\r\n\r\n    }\r\n\r\n    /// <summary>\r\n    /// M\xe9thode qui s\'occupe de la cr\xe9ation des donn\xe9es\r\n    /// </summary>\r\n    private void Seed(ModelBuilder modelBuilder)\r\n    {\r\n        //Les donn\xe9es \xe0 ajouter\r\n    }\r\n    public DbSet<Personnage> PersonnageTb { get; set; }\r\n\r\n    public DbSet<Univers> UniversTb { get; set; }\r\n\r\n    public DbSet<Film> FilmTb { get; set; }\r\n\r\n    public DbSet<Distribution> DistributionTb { get; set; }\r\n\r\n\r\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:["\xc0 la ligne 44, l'activation du ",(0,t.jsx)(n.strong,{children:"Seed"})," se fait uniquement si le contexte est initialis\xe9 en mode ",(0,t.jsx)(n.strong,{children:"Migration"})," dans la m\xe9thode ",(0,t.jsx)(n.strong,{children:"OnConfiguring()"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["\xc0 la ligne 119, il y a une v\xe9rification avant d'ex\xe9cuter le **Seed **dans la m\xe9thode ",(0,t.jsx)(n.strong,{children:"OnModelCreating()"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"\xc0 la ligne 129, les donn\xe9es seront cr\xe9\xe9es dans cette m\xe9thode."}),"\n",(0,t.jsx)(n.h2,{id:"cr\xe9ation-des-donn\xe9es",children:"Cr\xe9ation des donn\xe9es"}),"\n",(0,t.jsxs)(n.p,{children:["Pour ajouter des donn\xe9es, il faut envoyer un tableau des donn\xe9es dans la m\xe9thode ",(0,t.jsx)(n.strong,{children:"HasData()"})," de l'entit\xe9 en question."]}),"\n",(0,t.jsxs)(n.p,{children:["Il est obligatoire de sp\xe9cifier les cl\xe9s primaires et \xe9trang\xe8res lors d'un ",(0,t.jsx)(n.strong,{children:"Seed"})," \xe0 partir de la migration avec ",(0,t.jsx)(n.strong,{children:"Entity Framework"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"Remplaces la m\xe9thode Seed() avec ce code:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-csharp",children:'/// <summary>\r\n/// M\xe9thode qui s\'occupe de la cr\xe9ation des donn\xe9es\r\n/// </summary>\r\nprivate void Seed(ModelBuilder modelBuilder)\r\n{\r\n    //Les donn\xe9es \xe0 ajouter\r\n    Univers[] univers =\r\n    {\r\n    new Univers()\r\n    {\r\n        UniversId = 1,\r\n        Nom = "Marvel",\r\n        AnneeCreation = 1939,\r\n        SiteWeb = "https://www.marvel.com",\r\n        Proprietaire = "Disney"\r\n    },\r\n    new Univers()\r\n    {\r\n        UniversId = 2,\r\n        Nom = "DC Comics",\r\n        AnneeCreation = 1934,\r\n        SiteWeb = "https://www.dc.com",\r\n        Proprietaire = "Warner Bros"\r\n    },\r\n};\r\n\r\n    Personnage[] personnages =\r\n    {\r\n    new Personnage()\r\n    {\r\n        PersonnageId = 1,\r\n        Nom = "Spiderman",\r\n        IdentiteReelle = "Peter Parker",\r\n        DateNaissance = new DateOnly(1980, 12,01),\r\n        EstVilain = false,\r\n        UniversId = 1\r\n    },\r\n    new Personnage()\r\n    {\r\n        PersonnageId = 2,\r\n        Nom = "Iron Man",\r\n        IdentiteReelle = "Tony Stark",\r\n        DateNaissance = new DateOnly(1970,11,12),\r\n        EstVilain = false,\r\n        UniversId = 1\r\n    },\r\n    new Personnage()\r\n    {\r\n        PersonnageId = 3,\r\n        Nom = "Batman",\r\n        IdentiteReelle = "Bruce Wayne",\r\n        DateNaissance = new DateOnly(1966,03,04),\r\n        EstVilain = false,\r\n        UniversId = 2\r\n    },\r\n};\r\n\r\n    //Ajout dans les tables\r\n    modelBuilder.Entity<Univers>().HasData(univers);\r\n    modelBuilder.Entity<Personnage>().HasData(personnages);\r\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:["Cr\xe9ez la migration ",(0,t.jsx)(n.strong,{children:"Seed_UniversEtPersonnage"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"Add-Migration Seed_UniversEtPersonnage -StartupProject Univers.EF\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Appliquez les modifications \xe0 la base de donn\xe9es. Sp\xe9cifiez la migration ",(0,t.jsx)(n.strong,{children:"Seed_UniversEtPersonnage"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"Update-Database -StartupProject Univers.EF -Migration Seed_UniversEtPersonnage\n"})}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsxs)(n.p,{children:["Pour votre ",(0,t.jsx)(n.strong,{children:"TP 3"}),", vous devez cr\xe9er un jeu de donn\xe9es initial pour chacune des tables. Il devra \xeatre cr\xe9\xe9 par un ",(0,t.jsx)(n.strong,{children:"Seed"}),"."]})}),"\n",(0,t.jsxs)(n.p,{children:["Ouvrez ",(0,t.jsx)(n.strong,{children:"SSMS"})," et la base de donn\xe9es aura des donn\xe9es dans les tables ",(0,t.jsx)(n.strong,{children:"Personnage"})," et ",(0,t.jsx)(n.strong,{children:"Univers"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"exercice",children:"Exercice"}),"\n",(0,t.jsx)(n.p,{children:"Ajoutez la migration pour les films."}),"\n",(0,t.jsxs)(n.p,{children:["Vous pouvez vous baser sur les donn\xe9es de\r\n",(0,t.jsx)(n.a,{href:"/4N1_2024/docs/01%20R%C3%A9vision%20SQL/exercice_revision_sql",children:"l'exercices de cr\xe9ation de la BD univers du d\xe9but de la session"})]}),"\n",(0,t.jsx)(n.p,{children:"Ajoutez seulement les 3 premiers."}),"\n",(0,t.jsxs)(r,{children:[(0,t.jsx)("summary",{children:"Solution"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-csharp",children:'Film[] films =\r\n{\r\n    new Film()\r\n    {\r\n        FilmId = 1,\r\n        Titre = "Black Widow",\r\n        DateSortie = new DateOnly(2021, 07, 09),\r\n        Etoile = 3,\r\n        Duree = 121\r\n    },\r\n    new Film()\r\n    {\r\n        FilmId = 2,\r\n        Titre = "The Avengers",\r\n        DateSortie = new DateOnly(2012, 05, 04),\r\n        Etoile = 5,\r\n        Duree = 98\r\n    },\r\n    new Film()\r\n    {\r\n        FilmId = 3,\r\n        Titre = "Spiderman",\r\n        DateSortie = new DateOnly(2003, 05, 03),\r\n        Etoile = 5,\r\n        Duree = 110\r\n    }\r\n};\r\n\r\n\r\nmodelBuilder.Entity<Film>().HasData(films);\n'})}),(0,t.jsx)(n.p,{children:"Suivit de l'ajout de la migration et son ex\xe9cution"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"Add-Migration Seed_Film -StartupProject Univers.EF\r\n\r\nUpdate-Database -StartupProject Univers.EF -Migration Seed_Film\n"})})]}),"\n",(0,t.jsx)(n.p,{children:"Nous sommes maintenat pr\xeat pour faire des requ\xeates."})]})}function u(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>a,a:()=>o});var t=r(7294);const i={},s=t.createContext(i);function o(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);