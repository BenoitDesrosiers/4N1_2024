"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[6339],{507:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>t,toc:()=>l});var s=r(5893),i=r(1151);const a={sidebar_position:50},o="Vue",t={id:"Entity Framework 2/EF_vue",title:"Vue",description:"L'utilisation d'une vue se fait comme une table avec Entity Framework.",source:"@site/docs/50-Entity Framework 2/EF_vue.md",sourceDirName:"50-Entity Framework 2",slug:"/Entity Framework 2/EF_vue",permalink:"/4N1_2024/docs/Entity Framework 2/EF_vue",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:50,frontMatter:{sidebar_position:50},sidebar:"NotesSidebar",previous:{title:"Left Join",permalink:"/4N1_2024/docs/Entity Framework 2/EF_left_join"},next:{title:"Bogus Introduction",permalink:"/4N1_2024/docs/Bogus/Bogus_intro"}},c={},l=[{value:"La migration",id:"la-migration",level:2},{value:"La classe VNombrePersonnageFranchise",id:"la-classe-vnombrepersonnagefranchise",level:2},{value:"Utilisation",id:"utilisation",level:2}];function d(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"vue",children:"Vue"}),"\n",(0,s.jsxs)(n.p,{children:["L'utilisation d'une vue se fait comme une table avec ",(0,s.jsx)(n.strong,{children:"Entity Framework"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Nous allons cr\xe9er l'\xe9quivalent de cette vue dans la base de donn\xe9es en utilisant ",(0,s.jsx)(n.strong,{children:"Code First"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",metastring:'title="NE PAS EX\xc9CUTER"',children:"CREATE VIEW vNombrePersonnageFranchise\r\nAS\r\n    SELECT \r\n        Franchise.FranchiseId,\r\n        Franchise.Nom,\r\n        Count(Personnage.PersonnageId) AS NbPersonnage\r\n    FROM Franchise\r\n    LEFT OUTER JOIN Personnage ON Franchise.FranchiseId = Personnage.FranchiseId\r\n    GROUP BY Franchise.FranchiseId, Franchise.Nom\r\nGO\n"})}),"\n",(0,s.jsx)(n.h2,{id:"la-migration",children:"La migration"}),"\n",(0,s.jsx)(n.p,{children:"Comme pour les tables, pour ajouter la view dans la bd, ca prend une migration."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-powershell",children:"Add-Migration AjoutViewvNombrePersonnageFranchise -StartupProject Univers.EF\n"})}),"\n",(0,s.jsxs)(n.p,{children:["La migration se retrouvera dans ",(0,s.jsx)(n.strong,{children:"Univer.EF"})]}),"\n",(0,s.jsx)(n.p,{children:"Remplacez le code de la migration vide par:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'using Microsoft.EntityFrameworkCore.Migrations;\r\n\r\n#nullable disable\r\n\r\nnamespace Univers.EF.Migrations\r\n{\r\n    /// <inheritdoc />\r\n    public partial class AjoutViewvNombrePersonnageFranchise : Migration\r\n    {\r\n        /// <inheritdoc />\r\n        protected override void Up(MigrationBuilder migrationBuilder)\r\n        {\r\n            migrationBuilder.Sql(\r\n                "CREATE VIEW vNombrePersonnageFranchise " +\r\n                "AS SELECT  Franchise.FranchiseId, " +\r\n                "Franchise.Nom,  " +\r\n                "Count(Personnage.PersonnageId) AS NbPersonnage " +\r\n                "FROM Franchise  " +\r\n                "LEFT OUTER JOIN Personnage " +\r\n                "ON Franchise.FranchiseId = Personnage.FranchiseId " +\r\n                "GROUP BY Franchise.FranchiseId, Franchise.Nom;");\r\n        }\r\n\r\n        /// <inheritdoc />\r\n        protected override void Down(MigrationBuilder migrationBuilder)\r\n        {\r\n            migrationBuilder.Sql(@"DROP VIEW vNombrePersonnageFranchise;");\r\n        }\r\n    }\r\n}\r\n\n'})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsx)(n.p,{children:"Il n'y a pas de syntaxe en LINQ pour la cr\xe9ation de la view. Il est donc n\xe9cessaire d'utiliser une commande SQL"})}),"\n",(0,s.jsx)(n.p,{children:"Mettre la bd \xe0 jour:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-powershell",children:'Update-Database -StartupProject "Univers.EF" -Migration AjoutViewvNombrePersonnageFranchise\n'})}),"\n",(0,s.jsx)(n.h2,{id:"la-classe-vnombrepersonnagefranchise",children:"La classe VNombrePersonnageFranchise"}),"\n",(0,s.jsxs)(n.p,{children:["Ajoutez la classe ",(0,s.jsx)(n.strong,{children:"VNombrePersonnageFranchise.cs"})," dans ",(0,s.jsx)(n.strong,{children:"Univers.EF/Data"})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:"namespace Univers.EF.Data;\r\npublic class VNombrePersonnageFranchise\r\n{\r\n    public int FranchiseId { get; set; }\r\n    public string Nom { get; set; }\r\n    public int NbPersonnage { get; set;}\r\n\r\n}\n"})}),"\n",(0,s.jsx)(n.p,{children:"et ajoutez le DbSet dans le Context"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:"    public DbSet<VNombrePersonnageFranchise> VNombrePersonnageFranchise {  get; set; }\n"})}),"\n",(0,s.jsx)(n.p,{children:"ainsi que OnModelCreating"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'//View VNombrePersonnageFranchise\r\nmodelBuilder.Entity<VNombrePersonnageFranchise>(entity =>\r\n{\r\n    entity.ToView("vNombrePersonnageFranchise");\r\n    entity.HasKey(t => new { t.FranchiseId });\r\n});\r\n\n'})}),"\n",(0,s.jsx)(n.h2,{id:"utilisation",children:"Utilisation"}),"\n",(0,s.jsx)(n.p,{children:"La view est maintenant pr\xeate \xe0 \xeatre utiliser pour les select."}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsx)(n.p,{children:"Comme toute view, il est impossible d'ajouter ou d'enlever des donn\xe9es dans cette view. Seule les SELECT sont permis"})}),"\n",(0,s.jsx)(n.p,{children:"Pour avoir tous les franchises."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'using (UniversContext db = new UniversContext(optBuilder.Options))\r\n{\r\n    List<VNombrePersonnageFranchise> lst = db.VNombrePersonnageFranchise.ToList();\r\n\r\n    foreach(var item in lst)\r\n    {\r\n        Console.WriteLine($"Franchise : {item.Nom} Nb Personnages : {item.NbPersonnage}");\r\n    }\r\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"Pour avoir seulement ceux qui ont des personnages."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'using (UniversContext db = new UniversContext(optBuilder.Options))\r\n{\r\n    List<VNombrePersonnageFranchise> lst = \r\n        db.VNombrePersonnageFranchise.Where(v => v.NbPersonnage > 0).ToList();\r\n\r\n    foreach(var item in lst)\r\n    {\r\n        Console.WriteLine($"Franchise : {item.Nom} Nb Personnages : {item.NbPersonnage}");\r\n    }\r\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"Il est possible d'ajouter un tri."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'using (UniversContext db = new UniversContext(optBuilder.Options))\r\n{\r\n    List<VNombrePersonnageFranchise> lst = \r\n        (from lqVue in db.VNombrePersonnageFranchise\r\n         orderby\r\n            lqVue.Nom\r\n         select\r\n            lqVue).ToList();\r\n\r\n    foreach(var item in lst)\r\n    {\r\n        Console.WriteLine($"Franchise : {item.Nom} Nb Personnages : {item.NbPersonnage}");\r\n    }\r\n}\n'})})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>t,a:()=>o});var s=r(7294);const i={},a=s.createContext(i);function o(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);