"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[8608],{4754:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>c,contentTitle:()=>d,default:()=>a,frontMatter:()=>t,metadata:()=>l,toc:()=>h});var i=n(5893),s=n(1151);const t={sidebar_position:2},d="Exercices de cr\xe9ation BD et donn\xe9es",l={id:"exercice_revision_sql",title:"Exercices de cr\xe9ation BD et donn\xe9es",description:"Exercice 1",source:"@site/docs/exercice_revision_sql.md",sourceDirName:".",slug:"/exercice_revision_sql",permalink:"/4N1_2024/docs/exercice_revision_sql",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"NotesSidebar",previous:{title:"Installation des logiciels requis",permalink:"/4N1_2024/docs/preparation_environnement"},next:{title:"Tutorial - Basics",permalink:"/4N1_2024/docs/category/tutorial---basics"}},c={},h=[{value:"Exercice 1",id:"exercice-1",level:2},{value:"Exercice 2",id:"exercice-2",level:2},{value:"Exercice 3",id:"exercice-3",level:2},{value:"Exercice 4",id:"exercice-4",level:2},{value:"Exercice 5",id:"exercice-5",level:2},{value:"Exercice 6",id:"exercice-6",level:2},{value:"Exercice 7",id:"exercice-7",level:2}];function o(e){const r={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.a)(),...e.components},{Details:n}=r;return n||function(e,r){throw new Error("Expected "+(r?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.h1,{id:"exercices-de-cr\xe9ation-bd-et-donn\xe9es",children:"Exercices de cr\xe9ation BD et donn\xe9es"}),"\n",(0,i.jsx)(r.h2,{id:"exercice-1",children:"Exercice 1"}),"\n",(0,i.jsxs)(r.p,{children:["Cr\xe9ez la base de donn\xe9es ",(0,i.jsxs)(r.strong,{children:["e",(0,i.jsx)(r.em,{children:"DA"}),"_BDExercice"]})," dans le ",(0,i.jsx)(r.strong,{children:"SQL Server Express"})," de votre ordinateur."]}),"\n",(0,i.jsx)(r.p,{children:"N'oubliez pas d'inclure la v\xe9rification si la base de donn\xe9es existe avant la cr\xe9ation."}),"\n",(0,i.jsx)(r.p,{children:"Cr\xe9ez les 4 tables ci-dessous. Veuillez mettre la v\xe9rification si la table n'existe pas avant de cr\xe9er la table."}),"\n",(0,i.jsx)("img",{src:"/4N1_2024/img/02_DEA_SuperHeros.jpg"}),"\n",(0,i.jsxs)(r.p,{children:["Pour la table ",(0,i.jsx)(r.code,{children:"Film"}),", le champ ",(0,i.jsx)(r.code,{children:"Etoile"})," a une contrainte. Le champ accepte uniquement les valeurs de 1 \xe0 10."]}),"\n",(0,i.jsxs)(n,{children:[(0,i.jsx)("summary",{children:"Solution"}),(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-sql",children:"\r\nIF DB_ID('e1234_BDExercice') IS NULL\r\n\tCREATE DATABASE e1234_BDExercice;\r\nGO\r\n\r\nUSE e1234_BDExercice;\r\nGO\r\n\r\nIF OBJECT_ID('Univers', 'U') IS NULL\r\n\tCREATE TABLE Univers\r\n\t(\r\n\t\tUniversId INT NOT NULL CONSTRAINT PK_Univers PRIMARY KEY,\r\n\t\tNom VARCHAR(100) NOT NULL,\r\n\t\tAnneeCreation SMALLINT NOT NULL,\r\n\t\tSiteWeb VARCHAR(2000) NOT NULL,\r\n\t\tProprietaire VARCHAR(250) NOT NULL\r\n\t);\r\n\r\nIF OBJECT_ID('Film', 'U') IS NULL\r\n\tCREATE TABLE Film\r\n\t(\r\n\t\tFilmId INT NOT NULL CONSTRAINT PK_Film PRIMARY KEY,\r\n\t\tTitre VARCHAR(100) NOT NULL,\r\n\t\tDateSortie DATE NOT NULL,\r\n\t\tEtoile TINYINT NOT NULL CONSTRAINT CK_Film_Etoile CHECK(Etoile >= 1 AND Etoile <= 5),\r\n\t\tDuree SMALLINT NOT NULL\r\n\t);\r\n\r\nIF OBJECT_ID('Personnage', 'U') IS NULL\r\n\tCREATE TABLE Personnage\r\n\t(\r\n\t\tPersonnageId INT NOT NULL CONSTRAINT PK_Personnage PRIMARY KEY,\r\n\t\tNom VARCHAR(100) NOT NULL,\r\n\t\tIdentiteReelle VARCHAR(100) NULL,\r\n\t\tDateNaissance DATE NULL,\r\n\t\tEstVilain BIT NOT NULL,\r\n\t\tUniversId INT NOT NULL CONSTRAINT FK_Personnage_UniversId FOREIGN KEY REFERENCES Univers(UniversId)\r\n\t\t\tON DELETE NO ACTION\r\n\t\t\tON UPDATE CASCADE\r\n\t);\r\n\r\nIF OBJECT_ID('Distribution', 'U') IS NULL\r\n\tCREATE TABLE [Distribution]\r\n\t(\r\n\t\tPersonnageId INT NOT NULL CONSTRAINT FK_Distribution_PersonnageId FOREIGN KEY REFERENCES Personnage(PersonnageId)\r\n\t\t\tON DELETE NO ACTION\r\n\t\t\tON UPDATE CASCADE,\r\n\t\tFilmId INT NOT NULL CONSTRAINT FK_Distribution_FilmId FOREIGN KEY REFERENCES Film(FilmId)\r\n\t\t\tON DELETE NO ACTION\r\n\t\t\tON UPDATE CASCADE,\r\n\t\tActeur VARCHAR(100) NOT NULL,\r\n\t\tCONSTRAINT PK_Distribution PRIMARY KEY (PersonnageId, FilmId)\r\n\t);\r\nGO\n"})})]}),"\n",(0,i.jsx)(r.h2,{id:"exercice-2",children:"Exercice 2"}),"\n",(0,i.jsx)(r.p,{children:"Faites le script d'insertion pour les donn\xe9es ci-dessous. Pour la cl\xe9 \xe9trang\xe8re, vous devez mettre la cl\xe9 dans votre script en fonction de la valeur."}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.strong,{children:"Table Univers"})}),"\n",(0,i.jsxs)(r.table,{children:[(0,i.jsx)(r.thead,{children:(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.th,{children:"UniversId"}),(0,i.jsx)(r.th,{children:"Nom"}),(0,i.jsx)(r.th,{children:"AnneCreation"}),(0,i.jsx)(r.th,{children:"SiteWeb"}),(0,i.jsx)(r.th,{children:"Proprietaire"})]})}),(0,i.jsxs)(r.tbody,{children:[(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"1"}),(0,i.jsx)(r.td,{children:"Marvel"}),(0,i.jsx)(r.td,{children:"1939"}),(0,i.jsx)(r.td,{children:(0,i.jsx)(r.a,{href:"https://www.marvel.com",children:"https://www.marvel.com"})}),(0,i.jsx)(r.td,{children:"Disney"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"2"}),(0,i.jsx)(r.td,{children:"DC Comics"}),(0,i.jsx)(r.td,{children:"1934"}),(0,i.jsx)(r.td,{children:(0,i.jsx)(r.a,{href:"https://www.dc.com",children:"https://www.dc.com"})}),(0,i.jsx)(r.td,{children:"Warner Bros"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{}),(0,i.jsx)(r.td,{}),(0,i.jsx)(r.td,{}),(0,i.jsx)(r.td,{}),(0,i.jsx)(r.td,{})]})]})]}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.strong,{children:"Table Personnage"})}),"\n",(0,i.jsxs)(r.table,{children:[(0,i.jsx)(r.thead,{children:(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.th,{children:"PersonnageId"}),(0,i.jsx)(r.th,{children:"Nom"}),(0,i.jsx)(r.th,{children:"IdentiteReelle"}),(0,i.jsx)(r.th,{children:"DateNaissance"}),(0,i.jsx)(r.th,{children:"EstVilain"}),(0,i.jsx)(r.th,{children:"Univers"})]})}),(0,i.jsxs)(r.tbody,{children:[(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"1"}),(0,i.jsx)(r.td,{children:"Spiderman"}),(0,i.jsx)(r.td,{children:"Peter Parker"}),(0,i.jsx)(r.td,{children:"null"}),(0,i.jsx)(r.td,{children:"0"}),(0,i.jsx)(r.td,{children:"Marvel"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"2"}),(0,i.jsx)(r.td,{children:"Iron Man"}),(0,i.jsx)(r.td,{children:"Tony Stark"}),(0,i.jsx)(r.td,{children:"1970-11-12"}),(0,i.jsx)(r.td,{children:"0"}),(0,i.jsx)(r.td,{children:"Marvel"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"3"}),(0,i.jsx)(r.td,{children:"Batman"}),(0,i.jsx)(r.td,{children:"Bruce Wayne"}),(0,i.jsx)(r.td,{children:"1966-03-04"}),(0,i.jsx)(r.td,{children:"0"}),(0,i.jsx)(r.td,{children:"DC"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"4"}),(0,i.jsx)(r.td,{children:"Joker"}),(0,i.jsx)(r.td,{children:"null"}),(0,i.jsx)(r.td,{children:"null"}),(0,i.jsx)(r.td,{children:"1"}),(0,i.jsx)(r.td,{children:"DC"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"5"}),(0,i.jsx)(r.td,{children:"Thor"}),(0,i.jsx)(r.td,{children:"Thor"}),(0,i.jsx)(r.td,{children:"null"}),(0,i.jsx)(r.td,{children:"0"}),(0,i.jsx)(r.td,{children:"Marvel"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"6"}),(0,i.jsx)(r.td,{children:"Black Widow"}),(0,i.jsx)(r.td,{children:"Nathasha Romanoff"}),(0,i.jsx)(r.td,{children:"1985-08-31"}),(0,i.jsx)(r.td,{children:"0"}),(0,i.jsx)(r.td,{children:"Marvel"})]})]})]}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.strong,{children:"Table Film"})}),"\n",(0,i.jsxs)(r.table,{children:[(0,i.jsx)(r.thead,{children:(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.th,{children:"FilmId"}),(0,i.jsx)(r.th,{children:"Titre"}),(0,i.jsx)(r.th,{children:"DateSortie"}),(0,i.jsx)(r.th,{children:"Etoile"}),(0,i.jsx)(r.th,{children:"Duree"})]})}),(0,i.jsxs)(r.tbody,{children:[(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"1"}),(0,i.jsx)(r.td,{children:"Black Widow"}),(0,i.jsx)(r.td,{children:"2021-07-09"}),(0,i.jsx)(r.td,{children:"3"}),(0,i.jsx)(r.td,{children:"121"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"2"}),(0,i.jsx)(r.td,{children:"The Avengers"}),(0,i.jsx)(r.td,{children:"2012-05-04"}),(0,i.jsx)(r.td,{children:"5"}),(0,i.jsx)(r.td,{children:"98"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"3"}),(0,i.jsx)(r.td,{children:"Spiderman"}),(0,i.jsx)(r.td,{children:"2003-05-03"}),(0,i.jsx)(r.td,{children:"5"}),(0,i.jsx)(r.td,{children:"110"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"4"}),(0,i.jsx)(r.td,{children:"The Dark Knight"}),(0,i.jsx)(r.td,{children:"2008-07-18"}),(0,i.jsx)(r.td,{children:"5"}),(0,i.jsx)(r.td,{children:"142"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"5"}),(0,i.jsx)(r.td,{children:"Avengers : Endgame"}),(0,i.jsx)(r.td,{children:"2019-04-26"}),(0,i.jsx)(r.td,{children:"4"}),(0,i.jsx)(r.td,{children:"132"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"6"}),(0,i.jsx)(r.td,{children:"Iron Man"}),(0,i.jsx)(r.td,{children:"2008-05-02"}),(0,i.jsx)(r.td,{children:"4"}),(0,i.jsx)(r.td,{children:"96"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"7"}),(0,i.jsx)(r.td,{children:"Joker"}),(0,i.jsx)(r.td,{children:"2019-10-04"}),(0,i.jsx)(r.td,{children:"4"}),(0,i.jsx)(r.td,{children:"99"})]})]})]}),"\n",(0,i.jsx)(r.p,{children:(0,i.jsx)(r.strong,{children:"Table Distribution"})}),"\n",(0,i.jsxs)(r.table,{children:[(0,i.jsx)(r.thead,{children:(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.th,{children:"Personnage"}),(0,i.jsx)(r.th,{children:"Film"}),(0,i.jsx)(r.th,{children:"Acteur"})]})}),(0,i.jsxs)(r.tbody,{children:[(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"Spiderman"}),(0,i.jsx)(r.td,{children:"Spiderman"}),(0,i.jsx)(r.td,{children:"Tobey Maguire"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"Spiderman"}),(0,i.jsx)(r.td,{children:"Avengers : Endgame"}),(0,i.jsx)(r.td,{children:"Tom Holland"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"Iron Man"}),(0,i.jsx)(r.td,{children:"Iron Man"}),(0,i.jsx)(r.td,{children:"Robert Downey Jr"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"Iron Man"}),(0,i.jsx)(r.td,{children:"The Avengers"}),(0,i.jsx)(r.td,{children:"Robert Downey Jr"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"Iron Man"}),(0,i.jsx)(r.td,{children:"Avengers : Endgame"}),(0,i.jsx)(r.td,{children:"Robert Downey Jr"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"Batman"}),(0,i.jsx)(r.td,{children:"The Dark Knight"}),(0,i.jsx)(r.td,{children:"Christian Bale"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"Joker"}),(0,i.jsx)(r.td,{children:"The Dark Knight"}),(0,i.jsx)(r.td,{children:"Heath Ledger"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"Joker"}),(0,i.jsx)(r.td,{children:"Joker"}),(0,i.jsx)(r.td,{children:"Joaquin Phoenix"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"Thor"}),(0,i.jsx)(r.td,{children:"The Avengers"}),(0,i.jsx)(r.td,{children:"Chris Hemsworth"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"Thor"}),(0,i.jsx)(r.td,{children:"Avengers : Endgame"}),(0,i.jsx)(r.td,{children:"Chris Hemsworth"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"Black Widow"}),(0,i.jsx)(r.td,{children:"The Avengers"}),(0,i.jsx)(r.td,{children:"Scarlett Johansson"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"Black Widow"}),(0,i.jsx)(r.td,{children:"Avengers : Endgame"}),(0,i.jsx)(r.td,{children:"Scarlett Johansson"})]}),(0,i.jsxs)(r.tr,{children:[(0,i.jsx)(r.td,{children:"Black Widow"}),(0,i.jsx)(r.td,{children:"Black Widow"}),(0,i.jsx)(r.td,{children:"Scarlett Johansson"})]})]})]}),"\n",(0,i.jsxs)(n,{children:[(0,i.jsx)("summary",{children:"Solution"}),(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-sql",children:"USE e1234_BDExercice;\r\nGO\r\n\r\nINSERT INTO Univers(UniversId, Nom, AnneeCreation, SiteWeb, Proprietaire) \r\nVALUES\t\t\t\t\r\n\t(1, 'Marvel', 1939, 'https://www.marvel.com', 'Disney'),\r\n\t(2, 'DC Comics', 1934, 'https://dc.com', 'Warner Bros');\r\nGO\r\n\r\nINSERT INTO Personnage(PersonnageId, Nom, IdentiteReelle, DateNaissance, EstVilain, UniversId)\r\nVALUES\r\n\t(1, 'Spiderman', 'Peter Parker', null, 0, 1),\r\n\t(2, 'Iron Man', 'Tony Stark', '1970-11-12',0, 1),\r\n\t(3, 'Batman', 'Bruce Wayne', '1966-03-04', 0, 2),\r\n\t(4, 'Joker', null, null, 0, 2),\r\n\t(5, 'Thor', 'Thor', null, 0, 1),\r\n\t(6, 'Black Widow', 'Nathasha Romanoff', '1985-08-31', 0, 1);\r\nGO\r\n\r\nINSERT INTO Film(FilmId, Titre, DateSortie, Etoile, Duree)\r\nVALUES\r\n\t(1,'Black Widow', '2021-07-09', 3, 121),\r\n\t(2,'The Avengers', '2012-05-04', 5, 98),\r\n\t(3,'Spideman', '2003-05-03', 5, 110),\r\n\t(4,'The Dark Knight', '2008-07-18', 5, 142),\r\n\t(5,'Avengers : Endgames', '2019-04-26', 4, 132),\r\n\t(6,'Iron Man', '2008-05-02', 4, 96),\r\n\t(7,'Joker', '2019-10-04', 4, 99)\r\nGO\r\n\r\nINSERT INTO [Distribution](PersonnageId, FilmId, Acteur)\r\nVALUES\r\n\t(1,3,'Tobey Maguire'),\r\n\t(1,5,'Tom Holland'),\r\n\t(2,6,'Robert Downey Jr'),\r\n\t(2,2,'Robert Downey Jr'),\r\n\t(2,5,'Robert Downey Jr'),\r\n\t(3,4,'Christian Bale'),\r\n\t(4,4,'Heath Ledger'),\r\n\t(4,7,'Joaquin Phoenix'),\r\n\t(5,2,'Chris Hemsworth'),\r\n\t(5,5,'Chris Hemsworth'),\r\n\t(6,2,'Scarlett Johansson'),\r\n\t(6,5,'Scarlett Johansson'),\r\n\t(6,1,'Scarlett Johansson')\r\nGO\n"})})]}),"\n",(0,i.jsx)(r.h2,{id:"exercice-3",children:"Exercice 3"}),"\n",(0,i.jsx)(r.p,{children:"Effectuez une requ\xeate pour afficher les champs suivant :"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"Univers.Nom alias UniversNom"}),"\n",(0,i.jsx)(r.li,{children:"Film.Titre alias FilmTitre"}),"\n",(0,i.jsx)(r.li,{children:"Film.DateSortie"}),"\n",(0,i.jsx)(r.li,{children:"Personnage.Nom alias PersonnageNom"}),"\n",(0,i.jsx)(r.li,{children:"Distribution.Acteur"}),"\n"]}),"\n",(0,i.jsx)(r.p,{children:"Effectuez le tri par :"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"Univers.Nom"}),"\n",(0,i.jsx)(r.li,{children:"Film.DateSortie"}),"\n",(0,i.jsx)(r.li,{children:"Film.Titre"}),"\n",(0,i.jsx)(r.li,{children:"Personnage.Nom"}),"\n"]}),"\n",(0,i.jsxs)(n,{children:[(0,i.jsx)("summary",{children:"Solution"}),(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-sql",children:"\r\nUSE e1234_BDExercice;\r\nGO\r\n\r\nSELECT\r\n\tUnivers.Nom AS UniversNom,\r\n\tFilm.Titre AS FilmTitre,\r\n\tFilm.DateSortie,\r\n\tPersonnage.Nom AS PersonnageNom,\t\r\n\t[Distribution].Acteur\t\r\nFROM [Distribution]\r\nINNER JOIN Personnage ON [Distribution].PersonnageId = Personnage.PersonnageId\r\nINNER JOIN Univers ON Personnage.UniversId = Univers.UniversId\r\nINNER JOIN Film ON [Distribution].FilmId = Film.FilmId\r\nORDER BY\r\n\tUnivers.Nom,\r\n\tFilm.DateSortie,\r\n\tFilm.Titre,\r\n\tPersonnage.Nom,\r\n\t[Distribution].Acteur\r\n\n"})})]}),"\n",(0,i.jsx)(r.h2,{id:"exercice-4",children:"Exercice 4"}),"\n",(0,i.jsxs)(r.p,{children:["Modifiez la contrainte du champ ",(0,i.jsx)(r.strong,{children:"Etoile"})," de la table ",(0,i.jsx)(r.strong,{children:"Film"})," pour accepter une valeur entre 1 et 10 inclusivement."]}),"\n",(0,i.jsxs)(n,{children:[(0,i.jsx)("summary",{children:"Solution"}),(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-sql",children:"USE e1234_BDExercice;\r\nALTER TABLE Film\r\nDROP CONSTRAINT CK_Film_Etoile\r\n\r\nALTER TABLE Film\r\nADD CONSTRAINT CK_Film_Etoile CHECK(Etoile >= 1 AND Etoile <= 10)\n"})})]}),"\n",(0,i.jsx)(r.h2,{id:"exercice-5",children:"Exercice 5"}),"\n",(0,i.jsxs)(r.p,{children:["Effectuez une sauvegarde de votre base de donn\xe9es. Assurez-vous d'avoir le dossier ",(0,i.jsx)(r.strong,{children:(0,i.jsx)(r.code,{children:"C:\\Backup"})})," dans votre ordinateur."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-sql",children:"DECLARE @nomBD NVARCHAR(256) -- Nom base de donn\xe9es\r\nDECLARE @dossierBck NVARCHAR(512) -- Chemin dossier backup. \r\nDECLARE @date NVARCHAR(40) -- Date du jour\r\nDECLARE @fichierBck NVARCHAR(512) -- Nom du fichier\r\n\r\nSET @dossierBck = 'C:\\Backup\\'\r\nSELECT @nomBD = DB_NAME() \r\nSELECT @date = CONVERT(NVARCHAR(20),GETDATE(),112) \r\nSET @fichierBck = @dossierBck + @nomBD + '_' + @date + '.BAK' \r\nBACKUP DATABASE @nomBD TO DISK = @fichierBck\n"})}),"\n",(0,i.jsxs)(n,{children:[(0,i.jsx)("summary",{children:"Solution"}),(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-sql",children:"USE e1234_BDExercice;\r\nGO\r\n\r\nDECLARE @nomBD NVARCHAR(256) -- Nom base de donn\ufffdes\r\nDECLARE @dossierBck NVARCHAR(512) -- Chemin dossier backup. \r\nDECLARE @date NVARCHAR(40) -- Date du jour\r\nDECLARE @fichierBck NVARCHAR(512) -- Nom du fichier\r\n\r\nSET @dossierBck = 'C:\\Backup\\'\r\nSELECT @nomBD = DB_NAME() \r\nSELECT @date = CONVERT(NVARCHAR(20),GETDATE(),112) \r\nSET @fichierBck = @dossierBck + @nomBD + '_' + @date + '.BAK' \r\nBACKUP DATABASE @nomBD TO DISK = @fichierBck\n"})})]}),"\n",(0,i.jsx)(r.h2,{id:"exercice-6",children:"Exercice 6"}),"\n",(0,i.jsx)(r.p,{children:"Effectuez le script de suppression des tables. Assurez-vous de mettre la suppression dans le bon ordre."}),"\n",(0,i.jsx)(r.p,{children:"Ajoutez la v\xe9rification que la table existe avant la suppression."}),"\n",(0,i.jsxs)(n,{children:[(0,i.jsx)("summary",{children:"Solution"}),(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-sql",children:"USE BDExercice\r\nGO\r\n\r\nIF OBJECT_ID('Distribution', 'U') IS NOT NULL \r\n  DROP TABLE [Distribution];\r\nIF OBJECT_ID('Personnage', 'U') IS NOT NULL \r\n  DROP TABLE Personnage;\r\nIF OBJECT_ID('Univers', 'U') IS NOT NULL\r\n  DROP TABLE Univers;\r\nIF OBJECT_ID('Film', 'U') IS NOT NULL \r\n  DROP TABLE Film;\r\nGO\n"})})]}),"\n",(0,i.jsx)(r.h2,{id:"exercice-7",children:"Exercice 7"}),"\n",(0,i.jsx)(r.p,{children:"Restaurer la base de donn\xe9es en utilisant l'explorateur d'objet."}),"\n",(0,i.jsxs)(n,{children:[(0,i.jsx)("summary",{children:"Solution"}),(0,i.jsx)(r.p,{children:"Clic droit sur la BD-> T\xe2ches -> Restaurer -> Base de donn\xe9es."})]})]})}function a(e={}){const{wrapper:r}={...(0,s.a)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},1151:(e,r,n)=>{n.d(r,{Z:()=>l,a:()=>d});var i=n(7294);const s={},t=i.createContext(s);function d(e){const r=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function l(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),i.createElement(t.Provider,{value:r},e.children)}}}]);