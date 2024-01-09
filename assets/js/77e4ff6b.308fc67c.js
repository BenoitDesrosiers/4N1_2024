"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[7444],{1843:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>m,contentTitle:()=>a,default:()=>d,frontMatter:()=>s,metadata:()=>t,toc:()=>c});var r=i(5893),l=i(1151);const s={sidebar_position:30},a="Exercices requ\xeates en LINQ",t={id:"LINQ/exercice_requete_linq",title:"Exercices requ\xeates en LINQ",description:"Cr\xe9ation du projet",source:"@site/docs/02-LINQ/exercice_requete_linq.md",sourceDirName:"02-LINQ",slug:"/LINQ/exercice_requete_linq",permalink:"/4N1_2024/docs/LINQ/exercice_requete_linq",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:30,frontMatter:{sidebar_position:30},sidebar:"NotesSidebar",previous:{title:"Requ\xeates en LINQ",permalink:"/4N1_2024/docs/LINQ/introductionLINQ"},next:{title:"Principes SOLID",permalink:"/4N1_2024/docs/Entity Framework/solid"}},m={},c=[{value:"Cr\xe9ation du projet",id:"cr\xe9ation-du-projet",level:2},{value:"Exercices",id:"exercices",level:2},{value:"Exercice 1",id:"exercice-1",level:3},{value:"Exercice 2",id:"exercice-2",level:3},{value:"Exercice 3",id:"exercice-3",level:3},{value:"Exercice 4",id:"exercice-4",level:3},{value:"Exercice 5",id:"exercice-5",level:3},{value:"Exercice 6",id:"exercice-6",level:3},{value:"Exercice 7",id:"exercice-7",level:3},{value:"Exercice 8",id:"exercice-8",level:3},{value:"Exercice 9",id:"exercice-9",level:3},{value:"Exercice 10",id:"exercice-10",level:3},{value:"Exercice 11",id:"exercice-11",level:3},{value:"Exercice 12",id:"exercice-12",level:3},{value:"Exercice 13",id:"exercice-13",level:3},{value:"Exercice 14",id:"exercice-14",level:3},{value:"Exercice 15",id:"exercice-15",level:3},{value:"Exercice 16",id:"exercice-16",level:3},{value:"Exercice 17",id:"exercice-17",level:3},{value:"Exercice 18",id:"exercice-18",level:3},{value:"Exercice 19",id:"exercice-19",level:3}];function o(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,l.a)(),...e.components},{Details:i}=n;return i||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"exercices-requ\xeates-en-linq",children:"Exercices requ\xeates en LINQ"}),"\n",(0,r.jsx)(n.h2,{id:"cr\xe9ation-du-projet",children:"Cr\xe9ation du projet"}),"\n",(0,r.jsxs)(n.p,{children:["Pour faire vos exercices, cr\xe9ez une application console en ",(0,r.jsx)(n.strong,{children:".NET 7"})]}),"\n",(0,r.jsx)(n.p,{children:"Cr\xe9ez un projet."}),"\n",(0,r.jsx)("img",{src:"/4N1_2024/img/04_projet_1.png"}),"\n",(0,r.jsxs)(n.p,{children:["S\xe9lectionnez le type ",(0,r.jsx)(n.strong,{children:"Application Console"})," en ",(0,r.jsx)(n.strong,{children:"C#"}),". Important, il ne faut pas avoir la mention ",(0,r.jsx)(n.strong,{children:"(.NET Framework)"}),"."]}),"\n",(0,r.jsx)("img",{src:"/4N1_2024/img/04_projet_2.png"}),"\n",(0,r.jsxs)(n.p,{children:["Nommez le projet ",(0,r.jsx)(n.strong,{children:"ConsoleLINQ"}),"."]}),"\n",(0,r.jsx)("img",{src:"/4N1_2024/img/04_projet_3.png"}),"\n",(0,r.jsxs)(n.p,{children:["S\xe9lectionnez l'infrastructure ",(0,r.jsx)(n.strong,{children:".NET 7.0"})," et d\xe9cochez ",(0,r.jsx)(n.strong,{children:"N'utilisez pas d'instructions de niveau sup\xe9rieur."})]}),"\n",(0,r.jsx)("img",{src:"/4N1_2024/img/04_projet_4.png"}),"\n",(0,r.jsx)(n.h2,{id:"exercices",children:"Exercices"}),"\n",(0,r.jsxs)(n.p,{children:["Cr\xe9ez l'enum ",(0,r.jsx)(n.strong,{children:"TypeAnimal"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"namespace ConsoleLINQ;\r\n\r\npublic enum TypeAnimal\r\n{\r\n    Mammifere,\r\n    Reptile,\r\n    Oiseau,\r\n    Amphibien,\r\n    Poisson,\r\n    Crustace,\r\n    Insecte\r\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Cr\xe9ez la classe ",(0,r.jsx)(n.strong,{children:"Animal"})," et copiez le code ci-dessous."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"namespace ConsoleLINQ;\r\n\r\npublic class Animal\r\n{\r\n    public int AnimalId { get; set; }\r\n    public string Nom { get; set; }\r\n    public string Espece { get; set; }\r\n    public decimal Poids { get; set; }\r\n    public bool Male { get; set; }\r\n    public string Proprietaire { get; set; }\r\n    public DateTime Naissance { get; set; }\r\n    public TypeAnimal TypeAnimal { get; set; }\r\n}\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Cr\xe9ez la classe ",(0,r.jsx)(n.strong,{children:"GenerateurListeAnimal"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:'namespace ConsoleLINQ;\r\n\r\npublic class GenerateurListeAnimal\r\n{\r\n    public static List<Animal> ObtenirListe()\r\n    {\r\n        List<Animal> listeAnimal = new List<Animal>();\r\n\r\n        listeAnimal.Add(new Animal() { AnimalId = 1, Nom = "Peanut", Espece = "Chat", Poids = 6.5m, Male = true, Proprietaire = "Martin Simard", Naissance = new DateTime(2018, 12, 17), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 2, Nom = "Poppey", Espece = "Chien", Poids = 9.5m, Male = true, Proprietaire = "Simon Turcotte", Naissance = new DateTime(2011, 05, 28), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 3, Nom = "Pincette", Espece = "Homard", Poids = 3.1m, Male = false, Proprietaire = "Homer Simpson", Naissance = new DateTime(2011, 06, 02), TypeAnimal = TypeAnimal.Crustace });\r\n        listeAnimal.Add(new Animal() { AnimalId = 4, Nom = "Doris", Espece = "Poisson-chirurgien", Poids = 0.1m, Male = false, Proprietaire = "Pascal Tanguay", Naissance = new DateTime(2021, 08, 31), TypeAnimal = TypeAnimal.Poisson });\r\n        listeAnimal.Add(new Animal() { AnimalId = 5, Nom = "Serge", Espece = "Chat", Poids = 2.3m, Male = true, Proprietaire = "Michel Simard", Naissance = new DateTime(2021, 07, 06), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 6, Nom = "Snape", Espece = "Serpent", Poids = 1.1m, Male = false, Proprietaire = "Martin Morin", Naissance = new DateTime(2019, 03, 30), TypeAnimal = TypeAnimal.Reptile });\r\n        listeAnimal.Add(new Animal() { AnimalId = 7, Nom = "Pitpit", Espece = "Rossignol", Poids = 0.4m, Male = true, Proprietaire = "Sylvain Bernier", Naissance = new DateTime(2016, 12, 19), TypeAnimal = TypeAnimal.Oiseau });\r\n        listeAnimal.Add(new Animal() { AnimalId = 8, Nom = "Croco", Espece = "Crocodile", Poids = 25.4m, Male = false, Proprietaire = "Jean-Fran\xe7ois Turcotte", Naissance = new DateTime(2010, 11, 21), TypeAnimal = TypeAnimal.Reptile });\r\n        listeAnimal.Add(new Animal() { AnimalId = 9, Nom = "Prince", Espece = "Grenouille", Poids = 0.2m, Male = false, Proprietaire = "Pascal Bernier", Naissance = new DateTime(2022, 01, 01), TypeAnimal = TypeAnimal.Amphibien });\r\n        listeAnimal.Add(new Animal() { AnimalId = 10, Nom = "Bob", Espece = "Rat", Poids = 0.7m, Male = false, Proprietaire = "Simon Turcotte", Naissance = new DateTime(2015, 07, 15), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 11, Nom = "Arnold", Espece = "Fourmis", Poids = 0.00001m, Male = false, Proprietaire = "Jean-Michel Chabot", Naissance = new DateTime(2021, 11, 15), TypeAnimal = TypeAnimal.Insecte });\r\n        listeAnimal.Add(new Animal() { AnimalId = 12, Nom = "Crispie", Espece = "Salamande", Poids = 0.5m, Male = true, Proprietaire = "Michel St-Pierre", Naissance = new DateTime(2019, 09, 14), TypeAnimal = TypeAnimal.Reptile });\r\n        listeAnimal.Add(new Animal() { AnimalId = 13, Nom = "Hot-dog", Espece = "Chien", Poids = 3.3m, Male = true, Proprietaire = "Fran\xe7ois Turcotte", Naissance = new DateTime(2016, 11, 09), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 14, Nom = "Poppey", Espece = "Chien", Poids = 4.3m, Male = false, Proprietaire = "V\xe9ronique Morin", Naissance = new DateTime(2014, 07, 11), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 15, Nom = "Luigi", Espece = "Chien", Poids = 7.5m, Male = true, Proprietaire = "Michel St-Pierre", Naissance = new DateTime(2020, 02, 15), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 16, Nom = "Mario", Espece = "Chat", Poids = 4.5m, Male = true, Proprietaire = "Michel St-Pierre", Naissance = new DateTime(2020, 10, 30), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 17, Nom = "Steak", Espece = "Chat", Poids = 2.6m, Male = false, Proprietaire = "Marge Simpson", Naissance = new DateTime(2019, 05, 05), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 18, Nom = "Minette", Espece = "Chat", Poids = 2.7m, Male = true, Proprietaire = "Bertrand Drouin", Naissance = new DateTime(2017, 04, 12), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 19, Nom = "Nemo", Espece = "Poisson-clown", Poids = 0.2m, Male = true, Proprietaire = "Bertrand Bernier", Naissance = new DateTime(2020, 04, 15), TypeAnimal = TypeAnimal.Poisson });\r\n        listeAnimal.Add(new Animal() { AnimalId = 20, Nom = "Cricri", Espece = "Criquet", Poids = 0.00002m, Male = true, Proprietaire = "Michel Simard", Naissance = new DateTime(2021, 10, 15), TypeAnimal = TypeAnimal.Insecte });\r\n        listeAnimal.Add(new Animal() { AnimalId = 21, Nom = "Ciel", Espece = "Pigeon", Poids = 0.9m, Male = false, Proprietaire = "Michel Simard", Naissance = new DateTime(2019, 07, 22), TypeAnimal = TypeAnimal.Oiseau });\r\n        listeAnimal.Add(new Animal() { AnimalId = 22, Nom = "Pirate", Espece = "Perroquet", Poids = 1.1m, Male = false, Proprietaire = "Michel Simard", Naissance = new DateTime(2016, 09, 09), TypeAnimal = TypeAnimal.Oiseau });\r\n        listeAnimal.Add(new Animal() { AnimalId = 23, Nom = "Labo", Espece = "Rat", Poids = 0.9m, Male = true, Proprietaire = "Jean-Michel Turcotte", Naissance = new DateTime(2017, 06, 12), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 24, Nom = "Doris", Espece = "Cochon d\'Inde", Poids = 1.2m, Male = true, Proprietaire = "Fran\xe7ois Turcotte", Naissance = new DateTime(2019, 09, 14), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 25, Nom = "Prince", Espece = "Chat", Poids = 5.2m, Male = true, Proprietaire = "Bertrand Drouin", Naissance = new DateTime(2009, 07, 07), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 26, Nom = "Arnold", Espece = "Chien", Poids = 6.4m, Male = true, Proprietaire = "V\xe9ronique St-Pierre", Naissance = new DateTime(2008, 02, 25), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 27, Nom = "Simba", Espece = "Lion", Poids = 62.3m, Male = true, Proprietaire = "Pascal Lassonde", Naissance = new DateTime(2005, 09, 12), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 28, Nom = "Lapinette", Espece = "Lapin", Poids = 1.7m, Male = false, Proprietaire = "Simon Martel", Naissance = new DateTime(2021, 04, 18), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 29, Nom = "Boule-de-poils", Espece = "Lapin", Poids = 1.5m, Male = false, Proprietaire = "Simon Martel", Naissance = new DateTime(2021, 04, 18), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 30, Nom = "Terreur", Espece = "Serpent", Poids = 1.4m, Male = false, Proprietaire = "Pascal Tanguay", Naissance = new DateTime(2018, 11, 30), TypeAnimal = TypeAnimal.Reptile });\r\n        listeAnimal.Add(new Animal() { AnimalId = 31, Nom = "Piquette", Espece = "Ch\xe8vre", Poids = 9.5m, Male = false, Proprietaire = "V\xe9ronique St-Pierre", Naissance = new DateTime(2019, 06, 25), TypeAnimal = TypeAnimal.Mammifere });\r\n        listeAnimal.Add(new Animal() { AnimalId = 32, Nom = "Biquette", Espece = "Ch\xe8vre", Poids = 9.8m, Male = false, Proprietaire = "V\xe9ronique St-Pierre", Naissance = new DateTime(2018, 09, 25), TypeAnimal = TypeAnimal.Mammifere });\r\n\r\n\r\n        return listeAnimal;\r\n\r\n    }\r\n}\n'})}),"\n",(0,r.jsxs)(n.p,{children:["Dans le fichier ",(0,r.jsx)(n.strong,{children:"Program.cs"}),", d\xe9butez avec cette ligne pour r\xe9cup\xe9rer la liste d'objets de type ",(0,r.jsx)(n.strong,{children:"Animal"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"using ConsoleLINQ;\r\n\r\nList<Animal> lstAnimal = GenerateurListeAnimal.ObtenirListe();\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Pour chacun des exercices, nommez votre objet de retour comme indiqu\xe9 ci-dessous. Inscrivez directement les requ\xeates dans le fichier ",(0,r.jsx)(n.strong,{children:"Program.cs"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Pour chacun des exercices, effectuez la requ\xeate en syntaxe ",(0,r.jsx)(n.strong,{children:"Lamba"})," et ",(0,r.jsx)(n.strong,{children:"Query"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"//Si un seul objet\r\nAnimal ex1Lambda = ...\r\nAnimal ex1Query = ...\r\n\r\n//Si liste\r\nList<Animal> ex1Lambda = ...\r\nList<Animal> ex1Query = ...\r\n\r\n//Si count\r\nint ex1Lambda = ...\r\nint ex1Query = ...\n"})}),"\n",(0,r.jsx)(n.h3,{id:"exercice-1",children:"Exercice 1"}),"\n",(0,r.jsxs)(n.p,{children:["Trouvez tous les animaux ayant pour nom ",(0,r.jsx)(n.strong,{children:"Arnold"}),"."]}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:'List<Animal> ex1Lamba = listeAnimal.Where(lqAnimal => lqAnimal.Nom == "Arnold").ToList();\r\nList<Animal> ex1Query = (from lqAnimal in listeAnimal\r\n                         where\r\n                              lqAnimal.Nom == "Arnold"\r\n                         select\r\n                              lqAnimal).ToList();\r\n\n'})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-2",children:"Exercice 2"}),"\n",(0,r.jsxs)(n.p,{children:["Triez les animaux par ",(0,r.jsx)(n.strong,{children:"Nom"})," et retournez le premier."]}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"Animal ex2Lambda = listeAnimal.OrderBy(lqAnimal => lqAnimal.Nom).First();\r\nAnimal ex2Query = (from lqAnimal in listeAnimal\r\n                   orderby\r\n                        lqAnimal.Nom\r\n                   select\r\n                        lqAnimal).First();\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-3",children:"Exercice 3"}),"\n",(0,r.jsxs)(n.p,{children:["Retournez une liste tri\xe9e par ",(0,r.jsx)(n.strong,{children:"Nom"})," de propri\xe9taire en ordre ",(0,r.jsx)(n.strong,{children:"croissant"})," et par ",(0,r.jsx)(n.strong,{children:"Date de naissance"})," en ordre ",(0,r.jsx)(n.strong,{children:"d\xe9croissant"}),"."]}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"List<Animal> ex3Lambda = listeAnimal.OrderBy(lqAnimal => lqAnimal.Nom).ThenByDescending(lqAnimal => lqAnimal.Naissance).ToList();\r\nList<Animal> ex3Query = (from lqAnimal in listeAnimal\r\n                         orderby\r\n                            lqAnimal.Nom,\r\n                            lqAnimal.Naissance descending\r\n                         select\r\n                            lqAnimal).ToList();\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-4",children:"Exercice 4"}),"\n",(0,r.jsx)(n.p,{children:"Retournez l'animal le plus \xe2g\xe9."}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"Animal ex4Lambda = listeAnimal.OrderBy(lqAnimal => lqAnimal.Naissance).First();\r\nAnimal ex4Query = (from lqAnimal in listeAnimal\r\n                   orderby\r\n                        lqAnimal.Naissance\r\n                   select\r\n                        lqAnimal).First();\r\n\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-5",children:"Exercice 5"}),"\n",(0,r.jsx)(n.p,{children:"Retournez le nombre d'animaux qui ont 4 ans et plus."}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"int ex5Lambda = listeAnimal.Count(lqAnimal => lqAnimal.Naissance <= DateTime.Now.Date.AddYears(-4));\r\nint ex5Query = (from lqAnimal in listeAnimal\r\n                where\r\n                    lqAnimal.Naissance <= DateTime.Now.Date.AddYears(-4)\r\n                select\r\n                    lqAnimal).Count();\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-6",children:"Exercice 6"}),"\n",(0,r.jsxs)(n.p,{children:["Retournez tous les animaux qui sont des  ",(0,r.jsx)(n.strong,{children:"m\xe2les"})," et qui sont des ",(0,r.jsx)(n.strong,{children:"mammif\xe8res"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Utilisez l'",(0,r.jsx)(n.strong,{children:"enum"})," pour faire la s\xe9lection du type d'animal."]}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"List<Animal> ex6Lamda = listeAnimal.Where(lqAnimal => lqAnimal.Male == true && lqAnimal.TypeAnimal == TypeAnimal.Mammifere).ToList();\r\nList<Animal> ex6Query = (from lqAnimal in listeAnimal\r\n                         where\r\n                            lqAnimal.Male == true &&\r\n                            lqAnimal.TypeAnimal == TypeAnimal.Mammifere\r\n                         select\r\n                            lqAnimal).ToList();\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-7",children:"Exercice 7"}),"\n",(0,r.jsxs)(n.p,{children:["Retournez le nombre d'animaux de type ",(0,r.jsx)(n.strong,{children:"Reptile"}),"."]}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"int ex7Lambda = listeAnimal.Count(lqAnimal => lqAnimal.TypeAnimal == TypeAnimal.Reptile);\r\nint ex7Query = (from lqAnimal in listeAnimal\r\n                where\r\n                    lqAnimal.TypeAnimal == TypeAnimal.Reptile\r\n                select\r\n                    lqAnimal).Count();\r\n\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-8",children:"Exercice 8"}),"\n",(0,r.jsxs)(n.p,{children:["Retournez tous les animaux que leur ",(0,r.jsx)(n.strong,{children:"nom"})," commence par ",(0,r.jsx)(n.strong,{children:"P"})," ou ",(0,r.jsx)(n.strong,{children:"L"}),"."]}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:'List<Animal> ex8Lambda = listeAnimal.Where(lqAnimal => lqAnimal.Nom.StartsWith("P") || lqAnimal.Nom.StartsWith("L")).ToList();\r\nList<Animal> ex8Query = (from lqAnimal in listeAnimal\r\n                         where\r\n                            lqAnimal.Nom.StartsWith("P") ||\r\n                            lqAnimal.Nom.StartsWith("L")\r\n                         select\r\n                            lqAnimal).ToList();\n'})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-9",children:"Exercice 9"}),"\n",(0,r.jsxs)(n.p,{children:["Retournez un objet qui contient le ",(0,r.jsx)(n.strong,{children:"nom"})," de l'animal,  ",(0,r.jsx)(n.strong,{children:"l'esp\xe8ce"})," et le ",(0,r.jsx)(n.strong,{children:"type"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Utilisez un type **var **pour l'objet de retour."}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"var ex9Lambda = listeAnimal.Select(lqAnimal => new { Nom = lqAnimal.Nom, Espece = lqAnimal.Espece, TypeAnimal = lqAnimal.TypeAnimal }).ToList();\r\nvar ex9Query = (from lqAnimal in listeAnimal\r\n                select new\r\n                {\r\n                    Nom = lqAnimal.Nom,\r\n                    Espece = lqAnimal.Espece,\r\n                    TypeAnimal = lqAnimal.TypeAnimal\r\n                }).ToList();\r\n\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-10",children:"Exercice 10"}),"\n",(0,r.jsxs)(n.p,{children:["Retournez un objet qui contient le ",(0,r.jsx)(n.strong,{children:"nom"})," de l'animal, ",(0,r.jsx)(n.strong,{children:"l'esp\xe8ce"})," et le ",(0,r.jsx)(n.strong,{children:"type"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Le nom de l'animal doit contenir le ",(0,r.jsx)(n.strong,{children:"nom de famille"})," du propri\xe9taire. Utilisez un ",(0,r.jsx)(n.strong,{children:"split"})," pour s\xe9parer le pr\xe9nom du nom."]}),"\n",(0,r.jsxs)(n.p,{children:["Utilisez un type ",(0,r.jsx)(n.strong,{children:"var"})," pour l'objet de retour."]}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"var ex10Lambda = listeAnimal.Select(lqAnimal => new { Nom = $\"{lqAnimal.Nom} {lqAnimal.Proprietaire.Split(' ')[1]}\", Espece = lqAnimal.Espece, TypeAnimal = lqAnimal.TypeAnimal }).ToList();\r\nvar ex10Query = (from lqAnimal in listeAnimal\r\n                 select new\r\n                 {\r\n                     Nom = $\"{lqAnimal.Nom} {lqAnimal.Proprietaire.Split(' ')[1]}\",\r\n                     Espece = lqAnimal.Espece,\r\n                     TypeAnimal = lqAnimal.TypeAnimal\r\n                 }).ToList();\r\n\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-11",children:"Exercice 11"}),"\n",(0,r.jsx)(n.p,{children:"Retournez l'animal qui a le grand nom (plus de lettres)."}),"\n",(0,r.jsxs)(n.p,{children:["Utilisez un ",(0,r.jsx)(n.strong,{children:"LastOrDefault()"}),"."]}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"Animal? ex11Lambda = listeAnimal.OrderBy(lqAnimal => lqAnimal.Nom.Length).LastOrDefault();\r\nAnimal? ex11Query = (from lqAnimal in listeAnimal\r\n                    orderby\r\n                        lqAnimal.Nom.Length\r\n                    select lqAnimal).LastOrDefault();\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-12",children:"Exercice 12"}),"\n",(0,r.jsxs)(n.p,{children:["Retournez tous les ",(0,r.jsx)(n.strong,{children:"mammif\xe8res"})," qui sont des ",(0,r.jsx)(n.strong,{children:"femelles"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Triez par le ",(0,r.jsx)(n.strong,{children:"propri\xe9taire"})," de l'animal en ordre ",(0,r.jsx)(n.strong,{children:"croissant"})," et par la ",(0,r.jsx)(n.strong,{children:"date de naissance"})," en ordre ",(0,r.jsx)(n.strong,{children:"d\xe9croissant"}),"."]}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"List<Animal> ex12Lambda = listeAnimal.Where(lqAnimal => lqAnimal.Male == false && lqAnimal.TypeAnimal == TypeAnimal.Mammifere)\r\n                                     .OrderBy(lqAnimal => lqAnimal.Proprietaire)\r\n                                     .ThenByDescending(lqAnimal => lqAnimal.Naissance).ToList();\r\n\r\nList<Animal> ex12Query = (from lqAnimal in listeAnimal\r\n                          where\r\n                            lqAnimal.Male == false &&\r\n                            lqAnimal.TypeAnimal == TypeAnimal.Mammifere\r\n                          orderby\r\n                            lqAnimal.Proprietaire,\r\n                            lqAnimal.Naissance descending\r\n                          select\r\n                            lqAnimal).ToList();\r\n\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-13",children:"Exercice 13"}),"\n",(0,r.jsxs)(n.p,{children:["Retournez une liste d'objet. Il doit avoir le ",(0,r.jsx)(n.strong,{children:"Id"}),", le ",(0,r.jsx)(n.strong,{children:"Nom"})," de l'animal, ",(0,r.jsx)(n.strong,{children:"PoidsLbs"}),", ",(0,r.jsx)(n.strong,{children:"PoidsKg"}),", et le ",(0,r.jsx)(n.strong,{children:"Sexe"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Retournez un objet qui contient le poids en ",(0,r.jsx)(n.strong,{children:"livre"}),". Le poids actuel dans l'objet est en ",(0,r.jsx)(n.strong,{children:"kilogramme"}),". La formule est ",(0,r.jsx)(n.strong,{children:"Lbs = Kg * 2,2"})]}),"\n",(0,r.jsxs)(n.p,{children:["Il faut \xe9crire ",(0,r.jsx)(n.strong,{children:"M\xe2le"})," si c'est Male = true et ",(0,r.jsx)(n.strong,{children:"Femelle"})," si Male = false pour la propri\xe9t\xe9 ",(0,r.jsx)(n.strong,{children:"Sexe"}),"."]}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:'var ex13Lambda = listeAnimal.Select(lqAnimal => new\r\n{\r\n    Id = lqAnimal.AnimalId,\r\n    Nom = lqAnimal.Nom,\r\n    PoidsLbs = lqAnimal.Poids * 2.2m,\r\n    PoidsKg = lqAnimal.Poids,\r\n    Sexe = (lqAnimal.Male == true ? "M\xe2le" : "Femelle")\r\n}).ToList();\r\n\r\nvar ex13Query = (from lqAnimal in listeAnimal\r\n                 select\r\n                    new\r\n                    {\r\n                        Id = lqAnimal.AnimalId,\r\n                        Nom = lqAnimal.Nom,\r\n                        PoidsLbs = lqAnimal.Poids * 2.2m,\r\n                        PoidsKg = lqAnimal.Poids,\r\n                        Sexe = (lqAnimal.Male == true ? "M\xe2le" : "Femelle")\r\n                    }).ToList();\n'})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-14",children:"Exercice 14"}),"\n",(0,r.jsx)(n.p,{children:"Retournez tous les animaux n\xe9s en d\xe9cembre."}),"\n",(0,r.jsx)(n.p,{children:"Triez le r\xe9sultat du plus vieux au plus jeune."}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"var ex14Lambda = listeAnimal.Where(lqAnimal => lqAnimal.Naissance.Month == 12 || lqAnimal.Naissance.Month == 5)\r\n                            .OrderByDescending(lqAnimal => lqAnimal.Naissance).ToList();\r\n\r\nvar ex14Query = (from lqAnimal in listeAnimal\r\n                 where\r\n                    lqAnimal.Naissance.Month == 12 ||\r\n                    lqAnimal.Naissance.Month == 5\r\n                 orderby\r\n                    lqAnimal.Naissance descending\r\n                 select\r\n                    lqAnimal).ToList();\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-15",children:"Exercice 15"}),"\n",(0,r.jsx)(n.p,{children:"Retournez la liste des noms des animaux. Il faut \xe9liminer les doublons."}),"\n",(0,r.jsx)(n.p,{children:"Triez la liste en ordre alphab\xe9tique."}),"\n",(0,r.jsxs)(n.p,{children:["Utilisez la m\xe9thode ",(0,r.jsx)(n.strong,{children:"Distinct()"})," avant de faire le ",(0,r.jsx)(n.strong,{children:".ToList()"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Retournez une liste de ",(0,r.jsx)(n.strong,{children:"string"}),"."]}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"List<string> ex15Lambda = listeAnimal.OrderBy(lqAnimal => lqAnimal.Nom).Select(lqAnimal => lqAnimal.Nom).Distinct().ToList();\r\nList<string> ex15Query = (from lqAnimal in listeAnimal\r\n                          orderby\r\n                               lqAnimal.Nom\r\n                          select\r\n                               lqAnimal.Nom).Distinct().ToList();\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-16",children:"Exercice 16"}),"\n",(0,r.jsxs)(n.p,{children:["Retournez dans un objet la liste des ",(0,r.jsx)(n.strong,{children:"ids"})," qui sont des ",(0,r.jsx)(n.strong,{children:"m\xe2les"})," et une liste des ",(0,r.jsx)(n.strong,{children:"ids"})," qui sont  des ",(0,r.jsx)(n.strong,{children:"femelles"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Il faut cr\xe9ez l'objet dynamique et ses propri\xe9t\xe9s utilisent du ",(0,r.jsx)(n.strong,{children:"Lambda"})," ou du ",(0,r.jsx)(n.strong,{children:"Query"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["L'objet doit avoir comme propri\xe9t\xe9 ",(0,r.jsx)(n.strong,{children:"IdMale"})," et ",(0,r.jsx)(n.strong,{children:"IdFemelle"}),"."]}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"var ex16Lambda = new\r\n{\r\n    IdMale = listeAnimal.Where(lqAnimal => lqAnimal.Male == true).Select(lqAnimal => lqAnimal.AnimalId).ToList(),\r\n    IdFemelle = listeAnimal.Where(lqAnimal => lqAnimal.Male == false).Select(lqAnimal => lqAnimal.AnimalId).ToList()\r\n};\r\n\r\nvar ex16Query = new\r\n{\r\n    IdMale = (from lqAnimal in listeAnimal\r\n              where\r\n                  lqAnimal.Male == true\r\n              select\r\n                  lqAnimal.AnimalId).ToList(),\r\n    IdFemelle = (from lqAnimal in listeAnimal\r\n                 where\r\n                     lqAnimal.Male == false\r\n                 select\r\n                     lqAnimal.AnimalId).ToList()\r\n};\r\n\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-17",children:"Exercice 17"}),"\n",(0,r.jsxs)(n.p,{children:["Retournez la liste des animaux que leur propri\xe9taire on un ",(0,r.jsx)(n.strong,{children:"pr\xe9nom compos\xe9"}),". Utilisez un ",(0,r.jsx)(n.strong,{children:"split"})," et un ",(0,r.jsx)(n.strong,{children:"contains"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Triez la liste par le nom du propri\xe9taire."}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"List<Animal> ex17Lambda = listeAnimal.Where(lqAnimal => lqAnimal.Proprietaire.Split(' ')[0].Contains(\"-\") == true)\r\n                                     .OrderBy(lqAnimal => lqAnimal.Proprietaire).ToList();\r\n\r\nList<Animal> ex18Query = (from lqAnimal in listeAnimal\r\n                          where\r\n                               lqAnimal.Proprietaire.Split(' ')[0].Contains(\"-\") == true\r\n                          orderby\r\n                               lqAnimal.Proprietaire\r\n                          select\r\n                                lqAnimal).ToList();\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-18",children:"Exercice 18"}),"\n",(0,r.jsxs)(n.p,{children:["Retournez la liste des ",(0,r.jsx)(n.strong,{children:"propri\xe9taires"})," qui ont des ",(0,r.jsx)(n.strong,{children:"chiens"}),". La liste doit avoir seulement des \xe9l\xe9ments ",(0,r.jsx)(n.strong,{children:"distincts"}),". Utilisez la syntaxe ",(0,r.jsx)(n.strong,{children:"Lambda"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Retournez la liste des ",(0,r.jsx)(n.strong,{children:"propri\xe9taires"})," qui ont des ",(0,r.jsx)(n.strong,{children:"chats"}),". La liste doit avoir seulement des \xe9l\xe9ments ",(0,r.jsx)(n.strong,{children:"distincts"}),". Utilisez la syntaxe ",(0,r.jsx)(n.strong,{children:"Query"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Utilisez 2 listes diff\xe9rentes. Exemple : ",(0,r.jsx)(n.strong,{children:"List<string> ex18ChienLambda"})," et ",(0,r.jsx)(n.strong,{children:"List<string> ex18ChatQuery`"})," ."]}),"\n",(0,r.jsxs)(n.p,{children:["Retournez la liste des propri\xe9taires qui ont des chats et des chiens. Utilisez la m\xe9thode ",(0,r.jsx)(n.strong,{children:"Intersect"})," (intersection)."]}),"\n",(0,r.jsxs)(n.p,{children:["Retournez la liste des propri\xe9taires qui ont soit un chat ou un chien, mais pas les 2. Utilisez la m\xe9thode ",(0,r.jsx)(n.strong,{children:"Union"})," et ",(0,r.jsx)(n.strong,{children:"Except"})," (diff\xe9rence) et le r\xe9sultat de l'intersection."]}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:'List<string> ex18ChienLambda = listeAnimal.Where(lqAnimal => lqAnimal.Espece == "Chien")\r\n                                          .Select(lqAnimal => lqAnimal.Proprietaire).Distinct().ToList();\r\n\r\nList<string> ex18ChatQuery = (from lqAnimal in listeAnimal\r\n                              where\r\n                                   lqAnimal.Espece == "Chat"\r\n                              select\r\n                                   lqAnimal.Proprietaire).Distinct().ToList();\r\n\r\nList<string> ex18ChatEtChien = ex18ChatQuery.Intersect(ex18ChienLambda).ToList();\r\n\r\nList<string> ex18ChatOuChien = ex18ChatQuery.Union(ex18ChienLambda).Except(ex18ChatEtChien).ToList();\r\n\r\n\n'})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-19",children:"Exercice 19"}),"\n",(0,r.jsxs)(n.p,{children:["Cr\xe9ez un dictionnaire de type ",(0,r.jsx)(n.strong,{children:"Dictionary<int, Animal> ex20dicAnimal"}),", o\xf9 la cl\xe9 est le ",(0,r.jsx)(n.strong,{children:"AnimalId"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Effectuez une boucle ",(0,r.jsx)(n.strong,{children:"foreach"})," et non par ",(0,r.jsx)(n.strong,{children:"LINQ"}),", car ce n'est pas possible directement."]}),"\n",(0,r.jsxs)(n.p,{children:["Au prochain cours, nous utiliserons l'extension de classe pour \xeatre en mesure de le faire avec ",(0,r.jsx)(n.strong,{children:"LINQ"}),"."]}),"\n",(0,r.jsxs)(i,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:"Dictionary<int, Animal> ex19dicAnimal = new Dictionary<int, Animal>();\r\n\r\nforeach (Animal animal in listeAnimal)\r\n{\r\n    ex19dicAnimal.Add(animal.AnimalId, animal);\r\n}\n"})})]})]})}function d(e={}){const{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>t,a:()=>a});var r=i(7294);const l={},s=r.createContext(l);function a(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:a(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);