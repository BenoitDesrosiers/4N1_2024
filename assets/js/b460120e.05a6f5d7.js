"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[1794],{6068:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var t=r(5893),s=r(1151);const o={sidebar_position:50},i="Left Join",a={id:"Entity Framework 2/EF_left_join",title:"Left Join",description:"https://learn.microsoft.com/en-us/ef/core/querying/complex-query-operators#left-join",source:"@site/docs/50-Entity Framework 2/EF_left_join.md",sourceDirName:"50-Entity Framework 2",slug:"/Entity Framework 2/EF_left_join",permalink:"/4N1_2024/docs/Entity Framework 2/EF_left_join",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:50,frontMatter:{sidebar_position:50},sidebar:"NotesSidebar",previous:{title:"Agr\xe9gation",permalink:"/4N1_2024/docs/Entity Framework 2/EF_aggregation"},next:{title:"Vue",permalink:"/4N1_2024/docs/Entity Framework 2/EF_vue"}},c={},l=[];function u(e){const n={a:"a",code:"code",h1:"h1",p:"p",pre:"pre",strong:"strong",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"left-join",children:"Left Join"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://learn.microsoft.com/en-us/ef/core/querying/complex-query-operators#left-join",children:"https://learn.microsoft.com/en-us/ef/core/querying/complex-query-operators#left-join"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://learn.microsoft.com/en-us/dotnet/csharp/linq/perform-left-outer-joins#example",children:"https://learn.microsoft.com/en-us/dotnet/csharp/linq/perform-left-outer-joins#example"})}),"\n",(0,t.jsx)(n.p,{children:"L'univers TMNT a pr\xe9c\xe9demment \xe9t\xe9 ajout\xe9 sans lui associer de personnages avec la commande SQL suivante:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-csharp",metastring:"title=\"N'ex\xe9cutez que si TMNT n'est pas d\xe9j\xe0 dans votre BD\"",children:"INSERT INTO Franchise(Nom, AnneeCreation, Proprietaire, SiteWeb)\r\nVALUES ('Teenage mutant ninja turtles', 1984, 'Paramount', 'https://www.teenagemutantninjaturtles.com');\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Si je d\xe9sire lister tous les univers ainsi que leurs personnages m\xeame s'il n'y aucun personnage pour cet univers, je dois utiliser un ",(0,t.jsx)(n.strong,{children:"LEFT JOIN"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"select f.nom, p.nom\r\nfrom Franchise f\r\nleft join Personnage p\r\non f.FranchiseId = p.FranchiseId\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Le concept de ",(0,t.jsx)(n.strong,{children:"LEFT JOIN"})," n'existe pas directement dans LINQ. Pour avoir l'\xe9quivalent, il faut utiliser ",(0,t.jsx)(n.strong,{children:".DefaultIfEmpty()"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-csharp",children:'{\r\n    var lst2 =\r\n         (from lqFranchise in db.FranchiseTb\r\n          join lqPersonnage in db.PersonnageTb\r\n             on lqFranchise.FranchiseId equals lqPersonnage.FranchiseId into grouping\r\n          from p in grouping.DefaultIfEmpty()\r\n          select\r\n          new\r\n          {\r\n              NomFranchise = lqFranchise.Nom,\r\n              NomPersonnage = p.Nom ?? "aucun"\r\n          }\r\n          ).ToList();\r\n\r\n\r\n    foreach (var item in lst2)\r\n    {\r\n        Console.WriteLine($"Franchise : {item.NomFranchise}, {item.NomPersonnage} " );\r\n       \r\n    }\r\n}\n'})}),"\n",(0,t.jsx)(n.p,{children:"La requ\xeate g\xe9n\xe9r\xe9e:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"SELECT [f].[Nom] AS [NomFranchise], COALESCE([p].[Nom], 'aucun') AS [NomPersonnage]\r\n      FROM [Franchise] AS [f]\r\n      LEFT JOIN [Personnage] AS [p] ON [f].[FranchiseId] = [p].[FranchiseId]\n"})})]})}function m(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>a,a:()=>i});var t=r(7294);const s={},o=t.createContext(s);function i(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);