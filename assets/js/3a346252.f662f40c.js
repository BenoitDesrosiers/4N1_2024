"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[6851],{7103:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>t,default:()=>h,frontMatter:()=>a,metadata:()=>o,toc:()=>d});var s=r(5893),i=r(1151);const a={sidebar_position:40},t="Aggr\xe9gation",o={id:"Entity Framework 2/EF_aggregation",title:"Aggr\xe9gation",description:"L'aggr\xe9gation en LINQ permet de faire des calculs sur une collection en fonction du mod\xe8le objet.",source:"@site/docs/50-Entity Framework 2/EF_aggregation.md",sourceDirName:"50-Entity Framework 2",slug:"/Entity Framework 2/EF_aggregation",permalink:"/4N1_2024/docs/Entity Framework 2/EF_aggregation",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:40,frontMatter:{sidebar_position:40},sidebar:"NotesSidebar",previous:{title:"Eager loading",permalink:"/4N1_2024/docs/Entity Framework 2/EF_eager_loading"},next:{title:"Left Join",permalink:"/4N1_2024/docs/Entity Framework 2/EF_left_join"}},l={},d=[{value:"Compte - Count()",id:"compte---count",level:2},{value:"Somme - Sum()",id:"somme---sum",level:2},{value:"Exemple 1",id:"exemple-1",level:3},{value:"Exemple 2",id:"exemple-2",level:3},{value:"Moyenne - Average()",id:"moyenne---average",level:2}];function c(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"aggr\xe9gation",children:"Aggr\xe9gation"}),"\n",(0,s.jsxs)(n.p,{children:["L'aggr\xe9gation en ",(0,s.jsx)(n.strong,{children:"LINQ"})," permet de faire des calculs sur une collection en fonction du mod\xe8le objet."]}),"\n",(0,s.jsx)(n.p,{children:"Ajoutez ce film dans la base de donn\xe9es pour avoir un film sans aucune distribution."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:"INSERT INTO Franchise(Nom, AnneeCreation, Proprietaire, SiteWeb)\r\nVALUES ('Teenage mutant ninja turtles', 1984, 'Paramount', 'https://www.teenagemutantninjaturtles.com');\n"})}),"\n",(0,s.jsx)(n.h2,{id:"compte---count",children:"Compte - Count()"}),"\n",(0,s.jsxs)(n.p,{children:["Cette requ\xeate ",(0,s.jsx)(n.strong,{children:"SQL"})," permet de d\xe9terminer le nombre de ",(0,s.jsx)(n.strong,{children:"Personnages"})," par ",(0,s.jsx)(n.strong,{children:"Franchise"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"SELECT \r\n\tFranchise.FranchiseId,\r\n\tFranchise.Nom,\r\n\tCount(Personnage.PersonnageId) AS NbPersonnage\r\nFROM Franchise\r\nLEFT OUTER JOIN Personnage ON Franchise.FranchiseId = Personnage.FranchiseId\r\nGROUP BY Franchise.FranchiseId, Franchise.Nom;\n"})}),"\n",(0,s.jsxs)(n.p,{children:["L'\xe9quivalent en ",(0,s.jsx)(n.strong,{children:"LINQ"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'using (UniversContext db = new UniversContext(optBuilder.Options))\r\n{\r\n    var resultats =\r\n        (from lqFranchise in db.FranchiseTb\r\n         select\r\n            new\r\n            {\r\n                FranchiseId = lqFranchise.FranchiseId,\r\n                FranchiseNom = lqFranchise.Nom,\r\n                NbPersonnage = lqFranchise.Personnages.Count()\r\n            }).ToList();\r\n\r\n\r\n    Console.WriteLine("Id".PadRight(3) +\r\n                      "Nom".PadRight(70) +\r\n                      "Nb Pers.".PadRight(3));\r\n\r\n    Console.WriteLine("--".PadRight(3) +\r\n                      "---".PadRight(70) +\r\n                      "--------".PadRight(3));\r\n\r\n    foreach (var item in resultats)\r\n    {\r\n        Console.WriteLine(item.FranchiseId.ToString().PadRight(3) +\r\n                          item.FranchiseNom.PadRight(70) +\r\n                          item.NbPersonnage.ToString().PadRight(3));\r\n    }\r\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"Voici le r\xe9sultat dans la console."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"Id Nom                                                                   Nb Pers.\r\n-- ---                                                                   --------\r\n1  Marvel                                                                4\r\n2  DC                                                                    2\r\n3  Teenage mutant ninja turtles                                          0\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Il n'est pas n\xe9cessaire d'avoir une clause ",(0,s.jsx)(n.strong,{children:"GROUP BY"})," dans ",(0,s.jsx)(n.strong,{children:"LINQ"}),", car l'objet ",(0,s.jsx)(n.strong,{children:"Franchise"})," a d\xe9j\xe0 une collection de ",(0,s.jsx)(n.strong,{children:"Personnage"}),". Il est possible d'obtenir le nombre de personnages contenu dans cette collection."]}),"\n",(0,s.jsx)(n.p,{children:"Il est possible d'exclure les franchise sans aucun personnage."}),"\n",(0,s.jsxs)(n.p,{children:["La requ\xeate ",(0,s.jsx)(n.strong,{children:"SQL"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"SELECT \r\n\tFranchise.FranchiseId,\r\n\tFranchise.Nom,\r\n\tCount(Personnage.PersonnageId) AS NbPersonnage\r\nFROM Franchise\r\nLEFT OUTER JOIN Personnage ON Franchise.FranchiseId = Personnage.FranchiseId\r\nGROUP BY Franchise.FranchiseId, Franchise.Nom\r\nHAVING Count(Personnage.PersonnageId) > 0;\n"})}),"\n",(0,s.jsxs)(n.p,{children:["La requ\xeate ",(0,s.jsx)(n.strong,{children:"LINQ"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'using (UniversContext db = new UniversContext(optBuilder.Options))\r\n{\r\n    var resultats =\r\n        (from lqFranchise in db.FranchiseTb\r\n         where\r\n            lqFranchise.Personnages.Count > 0\r\n         select\r\n            new\r\n            {\r\n                FranchiseId = lqFranchise.FranchiseId,\r\n                FranchiseNom = lqFranchise.Nom,\r\n                NbPersonnage = lqFranchise.Personnages.Count()\r\n            }).ToList();\r\n\r\n\r\n    Console.WriteLine("Id".PadRight(3) +\r\n                      "Nom".PadRight(50) +\r\n                      "Nb Pers.".PadRight(10));\r\n\r\n    Console.WriteLine("--".PadRight(3) +\r\n                      "---".PadRight(50) +\r\n                      "--------".PadRight(10));\r\n\r\n    foreach (var item in resultats)\r\n    {\r\n        Console.WriteLine(item.FranchiseId.ToString().PadRight(3) +\r\n                          item.FranchiseNom.PadRight(50) +\r\n                          item.NbPersonnage.ToString().PadRight(10));\r\n    }\r\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Est-ce aussi optimal que le ",(0,s.jsx)(n.strong,{children:"SQL"})," d'utiliser la propri\xe9t\xe9 de navigation ?"]}),"\n",(0,s.jsxs)(n.p,{children:["Voici le ",(0,s.jsx)(n.strong,{children:"SQL g\xe9n\xe9r\xe9"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"SELECT [u].[FranchiseId], [u].[Nom] AS [FranchiseNom], (\r\n    SELECT COUNT(*)\r\n    FROM [Personnage] AS [p0]\r\n    WHERE [u].[FranchiseId] = [p0].[FranchiseId]) AS [NbPersonnage]\r\nFROM [Franchise] AS [u]\r\nWHERE (\r\n    SELECT COUNT(*)\r\n    FROM [Personnage] AS [p]\r\n    WHERE [u].[FranchiseId] = [p].[FranchiseId]) > 0\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Il y a 2 sous-requ\xeates. Un ",(0,s.jsx)(n.strong,{children:"GROUP BY"})," sera plus performant qu'une sous-requ\xeate corr\xe9l\xe9e. S'il y a 5 franchise, il y aura 6 ex\xe9cutions de sous-requ\xeates."]}),"\n",(0,s.jsxs)(n.p,{children:["L'utilisation d'un ",(0,s.jsx)(n.strong,{children:"GROUP BY"})," avec ",(0,s.jsx)(n.strong,{children:"LINQ"})," sera pr\xe9sent\xe9e plus tard dans la session avec le ",(0,s.jsx)(n.strong,{children:"LEFT OUTER JOIN"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Il est possible d'ajouter une condition dans la m\xe9thode ",(0,s.jsx)(n.strong,{children:"Count()"})," pour faire l'\xe9quivalent d'un ",(0,s.jsx)(n.strong,{children:"CountIf"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"Dans l'exemple ci-dessous, il est possible de d\xe9nombrer le nombre de gentils et de vilains."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'using (UniversContext db = new UniversContext(optBuilder.Options))\r\n{\r\n    var resultats =\r\n        (from lqFranchise in db.FranchiseTb         \r\n         select\r\n            new\r\n            {\r\n                FranchiseId = lqFranchise.FranchiseId,\r\n                FranchiseNom = lqFranchise.Nom,\r\n                NbVilain = lqFranchise.Personnages.Count(p => p.EstVilain == true),\r\n                NbGentil = lqFranchise.Personnages.Count(p => p.EstVilain == false)\r\n            }).ToList();\r\n\r\n\r\n    Console.WriteLine("Id".PadRight(3) +\r\n                      "Nom".PadRight(50) +\r\n                      "Nb Vilain".PadRight(11) +\r\n                      "Nb Gentil".PadRight(11));\r\n\r\n    Console.WriteLine("--".PadRight(3) +\r\n                      "---".PadRight(50) +\r\n                      "---------".PadRight(11) +\r\n                      "---------".PadRight(11));\r\n\r\n    foreach (var item in resultats)\r\n    {\r\n        Console.WriteLine(item.FranchiseId.ToString().PadRight(3) +\r\n                          item.FranchiseNom.PadRight(50) +\r\n                          item.NbVilain.ToString().PadRight(11) +\r\n                          item.NbGentil.ToString().PadRight(11));\r\n    }\r\n}\n'})}),"\n",(0,s.jsx)(n.h2,{id:"somme---sum",children:"Somme - Sum()"}),"\n",(0,s.jsx)(n.h3,{id:"exemple-1",children:"Exemple 1"}),"\n",(0,s.jsx)(n.p,{children:"Cette requ\xeate permet d'obtenir le total de minutes des films pour chacun des personnages tri\xe9e du plus grand nombre de minutes au plus petit."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"SELECT\r\n\tFranchise.Nom AS NomFranchise,\r\n\tPersonnage.Nom AS PersonnageNom,\r\n\tSUM(Film.Duree) AS DureeTotale\r\nFROM Personnage\r\nINNER JOIN Franchise ON Personnage.FranchiseId = Franchise.FranchiseId\r\nINNER JOIN [Distribution] ON Personnage.PersonnageId = [Distribution].PersonnageId\r\nINNER JOIN Film ON [Distribution].FilmId = Film.FilmId\r\nGROUP BY Franchise.FranchiseId, Franchise.Nom, Personnage.PersonnageId, Personnage.Nom\r\nORDER BY SUM(Film.Duree) DESC\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Voici la requ\xeate ",(0,s.jsx)(n.strong,{children:"LINQ"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'\r\nusing (UniversContext db = new UniversContext(optBuilder.Options))\r\n{\r\n    var resultats = \r\n        (from lqPersonnage in db.PersonnageTb\r\n         orderby lqPersonnage.DistributionListe.Sum(d => d.Film.Duree) descending\r\n         select\r\n            new\r\n            {                \r\n                FranchiseNom = lqPersonnage.Franchise.Nom,                \r\n                PersonnageNom = lqPersonnage.Nom,\r\n                DureeTotale = lqPersonnage.DistributionListe.Sum(d => d.Film.Duree)\r\n            }).ToList();\r\n\r\n\r\n    Console.WriteLine("Franchise".PadRight(20) +                      \r\n                      "Personnage".PadRight(50) +\r\n                      "Dur\xe9e totale".PadRight(15));\r\n\r\n    Console.WriteLine("-------".PadRight(20) +\r\n                      "----------".PadRight(50) +\r\n                      "------------".PadRight(15));\r\n\r\n    foreach (var item in resultats)\r\n    {\r\n        Console.WriteLine(item.FranchiseNom.PadRight(20) +\r\n                          item.PersonnageNom.PadRight(50) +\r\n                          item.DureeTotale.ToString().PadRight(15));\r\n    }\r\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Dans la m\xe9thode ",(0,s.jsx)(n.strong,{children:"Sum()"}),", il faut sp\xe9cifier le champ qui sera pris en compte pour la somme."]}),"\n",(0,s.jsxs)(n.p,{children:["Voici le ",(0,s.jsx)(n.strong,{children:"SQL g\xe9n\xe9r\xe9"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"SELECT [u].[Nom] AS [FranchiseNom], [p].[Nom] AS [PersonnageNom], (\r\n    SELECT COALESCE(SUM(CAST([f0].[Duree] AS int)), 0)\r\n    FROM [Distribution] AS [d0]\r\n    INNER JOIN [Film] AS [f0] ON [d0].[FilmId] = [f0].[FilmId]\r\n    WHERE [p].[PersonnageId] = [d0].[PersonnageId]) AS [DureeTotale]\r\nFROM [Personnage] AS [p]\r\nINNER JOIN [Franchise] AS [u] ON [p].[FranchiseId] = [u].[FranchiseId]\r\nORDER BY (\r\n    SELECT COALESCE(SUM(CAST([f].[Duree] AS int)), 0)\r\n    FROM [Distribution] AS [d]\r\n    INNER JOIN [Film] AS [f] ON [d].[FilmId] = [f].[FilmId]\r\n    WHERE [p].[PersonnageId] = [d].[PersonnageId]) DESC\n"})}),"\n",(0,s.jsx)(n.p,{children:"Il s'agit encore de sous-requ\xeates. Ce n'est pas le plus performant comme requ\xeate."}),"\n",(0,s.jsx)(n.h3,{id:"exemple-2",children:"Exemple 2"}),"\n",(0,s.jsx)(n.p,{children:"Cette requ\xeate retourne le total de la dur\xe9e des films group\xe9 par le nombre d'\xe9toile."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"SELECT etoile, SUM(duree)\r\nFROM film\r\nGROUP BY Etoile\n"})}),"\n",(0,s.jsx)(n.p,{children:"La requ\xeate Linq \xe9quivalente\xc8"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'using (UniversContext db = new UniversContext(optBuilder.Options))\r\n{\r\n    var lst =\r\n         (from lqFilm in db.FilmTb\r\n          group lqFilm by lqFilm.Etoile into etoileGroupe\r\n          select \r\n          new\r\n          {\r\n              etoile = etoileGroupe.Key,\r\n              total = etoileGroupe.Sum(d => d.Duree)\r\n          }\r\n          ).ToList();\r\n\r\n\r\n    foreach (var item in lst)\r\n    {\r\n        Console.WriteLine($"Dur\xe9e par \xe9toile : {item.etoile}, {item.total} " );\r\n       \r\n    }\r\n}\n'})}),"\n",(0,s.jsx)(n.h2,{id:"moyenne---average",children:"Moyenne - Average()"}),"\n",(0,s.jsxs)(n.p,{children:["La m\xe9thode ",(0,s.jsx)(n.strong,{children:"Average()"})," fonctionne comme la m\xe9thode ",(0,s.jsx)(n.strong,{children:"Sum()"}),". Il faut sp\xe9cifier \xe0 l'int\xe9rieur le champ sur lequel la moyenne sera calcul\xe9e."]}),"\n",(0,s.jsx)(n.p,{children:"Il faut connaitre la dur\xe9e moyenne des films pour chacun des personnages. La liste doit \xeatre tri\xe9e de la plus petite moyenne \xe0 la plus grande."}),"\n",(0,s.jsxs)(n.p,{children:["Voici la requ\xeate ",(0,s.jsx)(n.strong,{children:"SQL"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"SELECT\r\n\tFranchise.Nom AS NomFranchise,\r\n\tPersonnage.Nom AS PersonnageNom,\r\n\tAVG(Film.Duree) AS DureeMoyen\r\nFROM Personnage\r\nINNER JOIN Franchise ON Personnage.FranchiseId = Franchise.FranchiseId\r\nINNER JOIN [Distribution] ON Personnage.PersonnageId = [Distribution].PersonnageId\r\nINNER JOIN Film ON [Distribution].FilmId = Film.FilmId\r\nGROUP BY Franchise.FranchiseId, Franchise.Nom, Personnage.PersonnageId, Personnage.Nom\r\nORDER BY AVG(Film.Duree)\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Voici la requ\xeate ",(0,s.jsx)(n.strong,{children:"LINQ"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'using (UniversContext db = new UniversContext(optBuilder.Options))\r\n{\r\n    var resultats =\r\n        (from lqPersonnage in db.PersonnageTb\r\n         orderby lqPersonnage.DistributionListe.Average(d => d.Film.Duree)\r\n         select\r\n            new\r\n            {\r\n                FranchiseNom = lqPersonnage.Franchise.Nom,\r\n                PersonnageNom = lqPersonnage.Nom,\r\n                DureeMoyen = lqPersonnage.DistributionListe.Average(d => d.Film.Duree)\r\n            }).ToList();\r\n\r\n\r\n    Console.WriteLine("Franchise".PadRight(20) +\r\n                      "Personnage".PadRight(50) +\r\n                      "Duree moyen".PadRight(15));\r\n\r\n    Console.WriteLine("-------".PadRight(20) +\r\n                      "----------".PadRight(50) +\r\n                      "------------".PadRight(15));\r\n\r\n    foreach (var item in resultats)\r\n    {\r\n        Console.WriteLine(item.FranchiseNom.PadRight(20) +\r\n                          item.PersonnageNom.PadRight(50) +\r\n                          item.DureeMoyen.ToString().PadRight(15));\r\n    }\r\n}\n'})})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>o,a:()=>t});var s=r(7294);const i={},a=s.createContext(i);function t(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);