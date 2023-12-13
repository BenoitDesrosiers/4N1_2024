"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[5233],{3117:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var r=s(5893),t=s(1151);const i={sidebar_position:2},l="Introduction \xe0 LINQ",o={id:"02 LINQ/introductionLINQ",title:"Introduction \xe0 LINQ",description:"LINQ ou Language Integrated Query dans sa forme longue est un langage de requ\xeates cr\xe9\xe9 par Microsoft.",source:"@site/docs/02 LINQ/introductionLINQ.md",sourceDirName:"02 LINQ",slug:"/02 LINQ/introductionLINQ",permalink:"/4N1_2024/docs/02 LINQ/introductionLINQ",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"NotesSidebar",previous:{title:"Les Collections",permalink:"/4N1_2024/docs/02 LINQ/collections"},next:{title:"Exercices LINQ",permalink:"/4N1_2024/docs/02 LINQ/exercice_linq"}},d={},c=[{value:"S\xe9lection unique <code>FirstOrDefault()</code> et <code>LastOrDefault()</code>",id:"s\xe9lection-unique-firstordefault-et-lastordefault",level:2},{value:"S\xe9lection multiple <strong><code>ToList()</code></strong>",id:"s\xe9lection-multiple-tolist",level:2},{value:"Tri <code>OrderBy</code>",id:"tri-orderby",level:2},{value:"CountIf <strong><code>Count()</code></strong>",id:"countif-count",level:2},{value:"Objet dynamique",id:"objet-dynamique",level:2},{value:"\xc9l\xe9ments distincts",id:"\xe9l\xe9ments-distincts",level:2},{value:"Th\xe9orie des ensembles - Intersection",id:"th\xe9orie-des-ensembles---intersection",level:2},{value:"Th\xe9orie des ensembles - Union",id:"th\xe9orie-des-ensembles---union",level:2},{value:"Th\xe9orie des ensembles - Diff\xe9rence",id:"th\xe9orie-des-ensembles---diff\xe9rence",level:2}];function a(e){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"introduction-\xe0-linq",children:"Introduction \xe0 LINQ"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"LINQ"})," ou Language Integrated Query dans sa forme longue est un langage de requ\xeates cr\xe9\xe9 par Microsoft."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"LINQ"})," est souvent associ\xe9 \xe0 l'",(0,r.jsx)(n.strong,{children:"ORM Entity Framework"}),". ",(0,r.jsx)(n.strong,{children:"LINQ"})," est bien le langage de requ\xeates utilis\xe9 pour interroger une base de donn\xe9es via ",(0,r.jsx)(n.strong,{children:"Entity Framework"}),", mais il ne se limite pas seulement \xe0 cette technologie."]}),"\n",(0,r.jsxs)(n.p,{children:["Il faut voir ",(0,r.jsx)(n.strong,{children:"LINQ"})," comme un langage de requ\xeates qui permet d'interagir avec des ",(0,r.jsx)(n.strong,{children:"objets"}),". Une base de donn\xe9es n'est aucunement n\xe9cessaire pour son utilisation. ",(0,r.jsx)(n.strong,{children:"Entity Framework"})," mod\xe9lise la base de donn\xe9es en objets."]}),"\n",(0,r.jsx)(n.h1,{id:"linq",children:"LINQ"}),"\n",(0,r.jsxs)(n.p,{children:["Pour \xeatre en mesure d'avoir acc\xe8s aux requ\xeates LINQ, il faut ajouter la r\xe9f\xe9rence ",(0,r.jsx)(n.strong,{children:"System.Linq"})," \xe0 la classe."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"using System.Data.Linq;\n"})}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"LINQ"})," utilise l'extension de m\xe9thodes pour ajouter des m\xe9thodes additionnelles \xe0 certaines collections. Ce concept sera \xe9tudi\xe9 plus tard dans la session."]}),"\n",(0,r.jsxs)(n.p,{children:["La collection la plus utilis\xe9e sous ",(0,r.jsx)(n.strong,{children:"LINQ"})," est la ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"List<T>"})}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Il existe 2 types de syntaxes pour effectuer des requ\xeates LINQ."}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Syntaxe de requ\xeate (Query syntax)"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"Personne personne = (from lqPersonne in list\r\n                     where\r\n                         lqPersonne.Id == 2\r\n                     select\r\n                         lqPersonne).FirstOrDefault();\t\t\t\t\t \t\n"})}),"\n",(0,r.jsxs)(n.p,{children:["En ",(0,r.jsx)(n.strong,{children:"SQL"}),", la syntaxe serait comme ceci"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT TOP 1 * FROM list WHERE Id = 2\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Il faut lire la ",(0,r.jsx)(n.strong,{children:"syntaxe Query"})," comme ceci."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"from lqPersonne in list"})})," => Pour chacun des \xe9l\xe9ments de ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"list"})}),", met l'item dans la variable ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"lqPersonne"})}),"."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"where lqPersonne.Id == 2"})})," => Qui ont le ",(0,r.jsx)(n.strong,{children:"Id"})," \xe9gale \xe0 ",(0,r.jsx)(n.strong,{children:"2"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["**",(0,r.jsx)(n.code,{children:"select lqPersonne"})," ** => Ajoute l'objet ",(0,r.jsx)(n.strong,{children:"lqPersonne"})," dans les items \xe0 retourner."]}),"\n",(0,r.jsxs)(n.p,{children:["Il ne faut pas confondre le ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"from"})})," de ",(0,r.jsx)(n.strong,{children:"LINQ"})," du ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"from"})})," de ",(0,r.jsx)(n.strong,{children:"SQL"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Dans la documentation, la variable du ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"from"})})," est souvent une seule lettre."]}),"\n",(0,r.jsx)(n.p,{children:"Il est pr\xe9f\xe9rable d'avoir un nom significatif, car pour les requ\xeates complexes, le m\xe9lange des variables deviendra incompr\xe9hensible."}),"\n",(0,r.jsxs)(n.p,{children:["Le pr\xe9fixe ",(0,r.jsx)(n.strong,{children:"lq"})," sera utilis\xe9 pour indiquer que c'est une variable dans une requ\xeate ",(0,r.jsx)(n.strong,{children:"LINQ"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Syntaxe Lambda"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"Personne personne = list.Where(lqPersonne => lqPersonne.Id == 2).FirstOrDefault();\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Les deux bouts de code ci-dessus sont \xe9quivalents."}),"\n",(0,r.jsxs)(n.p,{children:["La ",(0,r.jsx)(n.strong,{children:"syntaxe Query"})," ressemble plus \xe0 ",(0,r.jsx)(n.strong,{children:"SQL"})," et elle est un peu plus intuitive et plus simple \xe0 faire lorsqu'elles sont complexes."]}),"\n",(0,r.jsxs)(n.p,{children:["La ",(0,r.jsx)(n.strong,{children:"Syntaxe Lambda"})," est plus compacte et elle est parfois plus simple pour les requ\xeates simples."]}),"\n",(0,r.jsxs)(n.h2,{id:"s\xe9lection-unique-firstordefault-et-lastordefault",children:["S\xe9lection unique ",(0,r.jsx)(n.code,{children:"FirstOrDefault()"})," et ",(0,r.jsx)(n.code,{children:"LastOrDefault()"})]}),"\n",(0,r.jsxs)(n.p,{children:["La m\xe9thode ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"FirstOrDefault"})})," permet de retourner le premier \xe9l\xe9ment en fonction de la recherche demand\xe9e."]}),"\n",(0,r.jsxs)(n.p,{children:["La m\xe9thode ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"LastOrDefault"})})," permet de retourner le premier \xe9l\xe9ment en fonction de la recherche demand\xe9e."]}),"\n",(0,r.jsx)(n.p,{children:"Si aucun \xe9l\xe9ment n\u2019est trouv\xe9, ce sera la valeur par d\xe9faut qui sera retourn\xe9e."}),"\n",(0,r.jsxs)(n.p,{children:["Dans le cas d'un objet, ce sera ",(0,r.jsx)(n.strong,{children:"null"}),". Dans le cas d'un type primitif, ce sera la valeur par d\xe9faut du type."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"List<int> listInt = new List<int>();\r\nlistInt.Add(13);\r\nlistInt.Add(6);\r\nlistInt.Add(9);\r\n\r\n//Lambda\r\nint premierLambda = listInt.FirstOrDefault(); //13\r\nint dernierLambda = listInt.LastOrDefault(); //9\r\n\r\n//Query\r\nint premierQuery = (from lqInt in listInt select lqInt).FirstOrDefault(); //13\r\nint dernierQuery = (from lqInt in listInt select lqInt).LastOrDefault(); //9\n"})}),"\n",(0,r.jsx)(n.p,{children:"Il est possible de forcer une valeur par d\xe9faut en mettant la valeur en param\xe8tre."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"List<int> listInt = new List<int>();\r\nint default = listInt.FirstOrDefault(); //0\r\nint defaultSpecifique = listInt.FirstOrDefault(9); //9\n"})}),"\n",(0,r.jsxs)(n.p,{children:["La clause ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"where"})})," permet de sp\xe9cifier les conditions de s\xe9lection."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:'Personne personne1 = new Personne();\r\npersonne1.Id = 1;\r\npersonne1.Prenom = "Fran\xe7ois";\r\npersonne1.Nom = "St-Hilaire";\r\n\r\nPersonne personne2 = new Personne();\r\npersonne2.Id = 2;\r\npersonne2.Prenom = "St\xe9phane";\r\npersonne2.Nom = "Janvier";\r\n\r\nPersonne personne3 = new Personne();\r\npersonne3.Id = 3;\r\npersonne3.Prenom = "Fran\xe7ois";\r\npersonne3.Nom = "Morin";\r\n\r\nList<Personne> list = new List<Personne>(); \r\nlist.Add(personne1);\r\nlist.Add(personne2);\r\nlist.Add(personne3);\r\n\r\n//Query\r\nPersonne premierQuery = (from lqPersonne in list\r\n\t                     where\r\n     \t                    lqPersonne.Prenom == "Fran\xe7ois"\r\n         \t             select\r\n              \t            lqPersonne).FirstOrDefault(); //Retourne Fran\xe7ois St-Hilaire\r\n\r\n//Lambda\r\nPersonne premierLambda = list.where(lqPersonne.Prenom == "Fran\xe7ois").FirstOrDefault();\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Dans le cas qu'il y a plusieurs conditions, il faut utiliser le ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"&&"})})," et le ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"||"})})," comme pour un ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"if"})})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:'//Query\r\nPersonne premierQuery = (from lqPersonne in list\r\n       \t\t             where\r\n            \t\t          lqPersonne.Prenom == "Fran\xe7ois" &&\r\n\t\t                      lqPersonne.Id > 1\r\n        \t              select\r\n\t\t                      lqPersonne).FirstOrDefault(); //Fran\xe7ois\r\n//Lambda\r\nPersonne premierLambda = list.where(lqPersonne.Prenom == "Fran\xe7ois" && lqPersonne.Id > 1).FirstOrDefault();\n'})}),"\n",(0,r.jsxs)(n.h2,{id:"s\xe9lection-multiple-tolist",children:["S\xe9lection multiple ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"ToList()"})})]}),"\n",(0,r.jsxs)(n.p,{children:["La m\xe9thode ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"ToList()"})})," permet de d\xe9tourner tous les items qui correspondent aux crit\xe8res de la requ\xeate dans une ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"List<T>"})}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:'//Query\r\nList<Personne> lstQuery = (from lqPersonne in list\r\n\t                       where\r\n      \t                      lqPersonne.Prenom == "Fran\xe7ois"\r\n           \t               select\r\n              \t              lqPersonne).ToList(); //Retourne Fran\xe7ois St-Hilaire et Fran\xe7ois Morin\r\n\r\n//Lambda\r\nList<Personne> lstLambda = list.where(lqPersonne.Prenom == "Fran\xe7ois").ToList();\n'})}),"\n",(0,r.jsx)(n.p,{children:"Dans le cas que la requ\xeate retourne uniquement 1 seul item, la liste contiendra 1 seul item."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:'//Query\r\nList<Personne> lstQuery = (from lqPersonne in list\r\n\t                       where\r\n      \t                      lqPersonne.Prenom == "St\xe9phane"\r\n           \t               select\r\n              \t              lqPersonne).ToList(); //Retourne St\xe9phane Janvier\r\n\r\n//Lambda\r\nList<Personne> lstLambda = list.where(lqPersonne.Prenom == "St\xe9phane").ToList();\r\n\r\nConsole.WriteLine(lstQuery.Count); //Retoune 1\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Dans le cas que la requ\xeate ne retourne aucun item, la liste sera vide. ",(0,r.jsx)(n.strong,{children:"LINQ"})," ne retourne pas de liste ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"null"})}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:'//Query\r\nList<Personne> lstQuery = (from lqPersonne in list\r\n\t                       where\r\n      \t                      lqPersonne.Prenom == "Benoit" ||\r\n\t                          lqPersonne.Prenom == "Louis" ||\r\n   \t                          lqPersonne.Prenom == "Frederic" ||\r\n           \t               select\r\n              \t              lqPersonne).ToList(); //Retourne rien\r\n\r\n//Lambda\r\nList<Personne> lstLambda = list.where(lqPersonne.Prenom == "Benoit" || lqPersonne.Prenom == "Louis" || lqPersonne.Prenom == "Frederic").ToList();\r\n\r\nConsole.WriteLine(lstQuery.Count); //Retoune 0\n'})}),"\n",(0,r.jsxs)(n.h2,{id:"tri-orderby",children:["Tri ",(0,r.jsx)(n.code,{children:"OrderBy"})]}),"\n",(0,r.jsxs)(n.p,{children:["Pour effectuer un tri sur une requ\xeate, il est plus facile d'utiliser la ",(0,r.jsx)(n.strong,{children:"syntaxe Query"})," que la ",(0,r.jsx)(n.strong,{children:"syntaxe Lambda"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Pour trier la liste de ",(0,r.jsx)(n.strong,{children:"Personne"})," en fonction du ",(0,r.jsx)(n.strong,{children:"nom"})," en ordre ",(0,r.jsx)(n.strong,{children:"croissant"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"//Query\r\nList<Personne> lstTriQuery = (from lqPersonne in list\r\n                              orderby\r\n                                lqPersonne.Nom \r\n                              select\r\n                                lqPersonne).ToList();\r\n\r\n//Lambda\r\n List<Personne> lstTriLambda = list.OrderBy(lqPersonne => lqPersonne.Nom).ToList();\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Pour trier la liste de ",(0,r.jsx)(n.strong,{children:"Personne"})," en fonction du ",(0,r.jsx)(n.strong,{children:"nom"})," en ordre ",(0,r.jsx)(n.strong,{children:"d\xe9croissant"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"//Query\r\nList<Personne> lstTriQuery = (from lqPersonne in list\r\n                              orderby\r\n                                lqPersonne.Nom descending\r\n                              select\r\n                                lqPersonne).ToList();\r\n\r\n//Lambda\r\n List<Personne> lstTriLambda = list.OrderByDescending(lqPersonne => lqPersonne.Nom).ToList();\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Pour un seul item, ce n'est pas tr\xe8s compliqu\xe9 le ",(0,r.jsx)(n.strong,{children:"Lambda"}),". Mais pour plusieurs crit\xe8res voici la syntaxe."]}),"\n",(0,r.jsxs)(n.p,{children:["Le tri sera fait en ordre croissant pour le ",(0,r.jsx)(n.strong,{children:"Prenom"})," et ensuite le ",(0,r.jsx)(n.strong,{children:"Nom"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"List<Personne> lstTriQuery = (from lqPersonne in list\r\n                              orderby\r\n                                lqPersonne.Prenom,\r\n                                lqPersonne.Nom\r\n                              select\r\n                                lqPersonne).ToList();\r\n\r\nList<Personne> lstTriLambda = list.OrderBy(lqPersonne => lqPersonne.Prenom).ThenBy(lqPersonne => lqPersonne.Nom).ToList();\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Il n'est pas possible de les regrouper tous les champs dans la m\xe9thode ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"OrderBy"})})," ou ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"OrderByDescending"})}),". Il faut ajouter la m\xe9thode ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"ThenBy"})})," ou ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"ThenByDescending"})})," pour chacun des champs additionnels."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"List<Personne> lstTriQuery = (from lqPersonne in list\r\n                              orderby\r\n                                lqPersonne.Prenom,\r\n                                lqPersonne.Nom descending\r\n                              select\r\n                                lqPersonne).ToList();\r\n\r\nList<Personne> lstTriLambda = list.OrderBy(lqPersonne => lqPersonne.Prenom).ThenByDescending(lqPersonne => lqPersonne.Nom).ToList();\n"})}),"\n",(0,r.jsx)(n.p,{children:"La liste peut devenir longue si le nombre de champs pour le tri est \xe9norme."}),"\n",(0,r.jsxs)(n.h2,{id:"countif-count",children:["CountIf ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"Count()"})})]}),"\n",(0,r.jsxs)(n.p,{children:["Il est possible de faire un ",(0,r.jsx)(n.strong,{children:"CountIf"})," avec ",(0,r.jsx)(n.strong,{children:"LINQ"}),". Il faut utiliser la m\xe9thode ",(0,r.jsx)(n.strong,{children:"Count()"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Pour le ",(0,r.jsx)(n.strong,{children:"CountIf"})," il est plus efficace d'utiliser la ",(0,r.jsx)(n.strong,{children:"syntaxe Lamba"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Par exemple, il faut obtenir le nombre de ",(0,r.jsx)(n.strong,{children:"Personne"})," avec le ",(0,r.jsx)(n.strong,{children:"pr\xe9nom"})," Fran\xe7ois."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:'//Query\r\nint nbFrancoisQuery = (from lqPersonne in list\r\n                       where\r\n                            lqPersonne.Prenom == "Fran\xe7ois"\r\n                       select\r\n                            lqPersonne).Count(); //Retourne 2\r\n\r\n//Lambda\r\nint nbFrancoisLambda = lstTriLambda.Count(lqPersonne => lqPersonne.Prenom == "Fran\xe7ois"); //Retourne 2\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Avec la syntaxe ",(0,r.jsx)(n.strong,{children:"Lambda"}),", il est possible de mettre la condition directement dans la m\xe9thode ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"Count()"})}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"objet-dynamique",children:"Objet dynamique"}),"\n",(0,r.jsxs)(n.p,{children:["Il est possible de cr\xe9er des objets ",(0,r.jsx)(n.strong,{children:"dynamiquement"})," avec C#. Pour ",(0,r.jsx)(n.strong,{children:"LINQ"}),", cette fonctionnalit\xe9 peut \xeatre tr\xe8s pratique, car il permet d'\xe9viter de cr\xe9er un objet pour tous les types de requ\xeates."]}),"\n",(0,r.jsx)(n.p,{children:"Par contre, l'utilisation d'objets dynamiques fonctionne uniquement si celui-ci est utilis\xe9 uniquement dans le bloc de code. S'il doit \xeatre retourn\xe9 dans une m\xe9thode ou utilis\xe9 comme param\xe8tre, son utilisation ne fonctionne plus."}),"\n",(0,r.jsxs)(n.p,{children:["Pour cr\xe9er un objet dynamique, il faut utiliser le type ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"var"})}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:'var personne = new\r\n{\r\n    NomComplet = "Fran\xe7ois St-Hilaire",\r\n    Age = 22\r\n};\r\n//var est un type anonyme string, int\n'})}),"\n",(0,r.jsx)(n.p,{children:"Dans le cas de la liste de Personne, s'il faut retourner un objet contenant le nom complet dans une seule propri\xe9t\xe9, il est possible de le faire avec un objet dynamique."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:'//Query\r\nvar lstDynQuery = (from lqPersonne in list\r\n                   select new\r\n                   {\r\n                       Id = lqPersonne.Id,\r\n                       Nom = $"{lqPersonne.Prenom} {lqPersonne.Nom}"\r\n                   }).ToList();\r\n\r\n//Lambda\r\nvar lstDynLambda = list.Select(lqPersonne => new { Id = lqPersonne.Id, Nom = $"{lqPersonne.Prenom} {lqPersonne.Nom}" }).ToList();\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Le type ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"var"})})," dans ce contexte est une ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"List<>"})})," d'un objet dynamique ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"int"})}),", ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"string"})}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"\xe9l\xe9ments-distincts",children:"\xc9l\xe9ments distincts"}),"\n",(0,r.jsx)(n.p,{children:"Avec les listes, il est possible d'obtenir les \xe9l\xe9ments distincts s'il y a des doublons."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"List<int> liste = new List<int> { 1, 1, 3, 4, 6, 7, 3, 6 };\r\nList<int> listeDistinct = liste.Distinct().ToList(); // 1, 3, 4, 6, 7\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Pour les classes, il faut ajouter impl\xe9menter les m\xe9thodes ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"Equals"})})," et ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"GetHashCode"})})," pour \xeatre en mesure d'utiliser le ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"Distinct"})}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"th\xe9orie-des-ensembles---intersection",children:"Th\xe9orie des ensembles - Intersection"}),"\n",(0,r.jsx)(n.p,{children:"Il est possible de trouver les \xe9l\xe9ments communs dans les 2 listes gr\xe2ce \xe0 la th\xe9orique des ensembles."}),"\n",(0,r.jsxs)(n.p,{children:["La m\xe9thode ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"Intersect"})})," permet de voir l'intersection des 2 listes."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"List<int> liste1 = new List<int> { 1, 3, 4, 6, 7 };\r\nList<int> liste2 = new List<int> { 1, 2, 4, 5, 8, 9 };\r\n\r\nList<int> listeIntersect = liste1.Intersect(liste2).ToList(); //1, 4 => liste1 \u2229 liste2\n"})}),"\n",(0,r.jsx)(n.h2,{id:"th\xe9orie-des-ensembles---union",children:"Th\xe9orie des ensembles - Union"}),"\n",(0,r.jsx)(n.p,{children:"Il est possible de regrouper tous les \xe9l\xe9ments des 2 listes gr\xe2ce \xe0 la th\xe9orique des ensembles."}),"\n",(0,r.jsxs)(n.p,{children:["La m\xe9thode ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"Union"})})," permet de voir l'intersection des 2 listes."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"List<int> liste1 = new List<int> { 1, 3, 4, 6, 7 };\r\nList<int> liste2 = new List<int> { 1, 2, 4, 5, 8, 9 };\r\n\r\nList<int> listeUnion = liste1.Union(liste2).ToList(); //1, 2, 3, 4, 5, 6, 7, 8, 9 => liste1 \u222a liste2\n"})}),"\n",(0,r.jsx)(n.h2,{id:"th\xe9orie-des-ensembles---diff\xe9rence",children:"Th\xe9orie des ensembles - Diff\xe9rence"}),"\n",(0,r.jsx)(n.p,{children:"Il est possible de trouver les \xe9l\xe9ments diff\xe9rents dans les 2 listes gr\xe2ce \xe0 la th\xe9orique des ensembles."}),"\n",(0,r.jsxs)(n.p,{children:["La m\xe9thode ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"Except"})})," permet de voir la diff\xe9rence entre les 2 listes."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"List<int> liste1 = new List<int> { 1, 3, 4, 6, 7 };\r\nList<int> liste2 = new List<int> { 1, 2, 4, 5, 8, 9 };\r\n\r\nList<int> listeDiff1 = liste1.Except(liste2).ToList(); //3, 6, 7 => liste1 \\ liste2\r\nList<int> listeDiff2 = liste2.Except(liste1).ToList(); //2, 5, 8, 9 =>  liste2 \\ liste1\n"})})]})}function u(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>o,a:()=>l});var r=s(7294);const t={},i=r.createContext(t);function l(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);