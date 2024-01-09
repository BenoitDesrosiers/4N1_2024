"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[4227],{7727:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>E,frontMatter:()=>t,metadata:()=>l,toc:()=>d});var s=r(5893),i=r(1151);const t={sidebar_position:8},a="Cl\xe9 auto incr\xe9ment\xe9e",l={id:"R\xe9vision SQL/cles_auto_incrementees",title:"Cl\xe9 auto incr\xe9ment\xe9e",description:"R\xe9initialisez la base de donn\xe9es.",source:"@site/docs/10-R\xe9vision SQL/cles_auto_incrementees.md",sourceDirName:"10-R\xe9vision SQL",slug:"/R\xe9vision SQL/cles_auto_incrementees",permalink:"/4N1_2024/docs/R\xe9vision SQL/cles_auto_incrementees",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:8,frontMatter:{sidebar_position:8},sidebar:"NotesSidebar",previous:{title:"Table temporaire",permalink:"/4N1_2024/docs/R\xe9vision SQL/table_temporaire"},next:{title:"Niveau sup\xe9rieur",permalink:"/4N1_2024/docs/LINQ/app_sans_main"}},o={},d=[{value:"D\xe9sactivation de l&#39;identit\xe9",id:"d\xe9sactivation-de-lidentit\xe9",level:2},{value:"Probl\xe9matique",id:"probl\xe9matique",level:3},{value:"Am\xe9lioration",id:"am\xe9lioration",level:3},{value:"SCOPE_IDENTITY()",id:"scope_identity",level:2},{value:"Utilisation de cl\xe9 naturelle",id:"utilisation-de-cl\xe9-naturelle",level:2},{value:"INSERTION et OUTPUT",id:"insertion-et-output",level:2},{value:"Exemple",id:"exemple",level:3},{value:"Table temporaire",id:"table-temporaire",level:2},{value:"Consid\xe9ration",id:"consid\xe9ration",level:2}];function c(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"cl\xe9-auto-incr\xe9ment\xe9e",children:"Cl\xe9 auto incr\xe9ment\xe9e"}),"\n",(0,s.jsx)(n.p,{children:"R\xe9initialisez la base de donn\xe9es."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"EXEC initialiserBD; \n"})}),"\n",(0,s.jsx)(n.p,{children:"Pour cr\xe9er des scripts d'importation de donn\xe9es, il faut s'assurer de bien g\xe9rer les cl\xe9s des tables auto incr\xe9ment\xe9es."}),"\n",(0,s.jsx)(n.p,{children:"Il existe plusieurs techniques qui permettent de g\xe9rer les cl\xe9s."}),"\n",(0,s.jsx)(n.p,{children:"Par d\xe9faut, lorsque la cl\xe9 est auto-incr\xe9ment\xe9e, il n'est pas possible de la sp\xe9cifier."}),"\n",(0,s.jsx)(n.p,{children:"Ins\xe9rez la ligne ci-dessous dans la table."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"INSERT INTO Univers(UniversId, Nom) \r\nVALUES (1, 'Marvel');\r\n\r\n--Cannot insert explicit value for identity column in table 'Univers' when IDENTITY_INSERT is set to OFF.\n"})}),"\n",(0,s.jsx)(n.p,{children:"Le serveur retourne une erreur, car il n'est pas possible de g\xe9rer la cl\xe9 manuellement."}),"\n",(0,s.jsx)(n.p,{children:"Dans le premier exemple d'insertion, lors de la cr\xe9ation des Personnages, l'id de l'univers \xe9tait pr\xe9sum\xe9 \xeatre 1 et 2. Par contre, il n'est pas possible de pr\xe9sumer ceci, car les scripts d'importations doivent \xeatre fonctionnels en tout temps."}),"\n",(0,s.jsxs)(n.p,{children:["Assurez-vous d'avoir ",(0,s.jsx)(n.strong,{children:"2 enregistrements"})," dans la table ",(0,s.jsx)(n.strong,{children:"Univers"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Supprimez"})," les 2 enregistrements et ",(0,s.jsx)(n.strong,{children:"ajoutez"})," de nouveau vos 2 enregistrements."]}),"\n",(0,s.jsxs)(n.p,{children:["Est-ce que la cl\xe9 recommence \xe0 1 si la table est vide ? Malheureusement ",(0,s.jsx)(n.strong,{children:"non"}),". La BD se souvient du dernier id utilis\xe9. Tant que la table n'est pas recr\xe9\xe9e, le dernier id sera conserv\xe9 afin de calculer le nouveau lors d'une insertion m\xeame si ce dernier id a \xe9t\xe9 effac\xe9 de la table."]}),"\n",(0,s.jsx)(n.p,{children:"C'est pour cette raison qu'il faut s'assurer d'avoir des scripts qui g\xe8rent correctement les cl\xe9s."}),"\n",(0,s.jsx)(n.h2,{id:"d\xe9sactivation-de-lidentit\xe9",children:"D\xe9sactivation de l'identit\xe9"}),"\n",(0,s.jsxs)(n.p,{children:["Il est possible de d\xe9sactiver l'auto-incr\xe9mentation d'une table temporairement avec la propri\xe9t\xe9 ",(0,s.jsx)(n.strong,{children:"IDENTITY_INSERT"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-SQL",children:"SET IDENTITY_INSERT Univers ON; -- Indique que la table Univers accepte l'insertion de valeur dans le champ IDENTITY\r\nINSERT INTO Univers(UniversId, Nom) \r\nVALUES (19898989, 'Teenage mutant ninja turtles');\r\n\r\nSET IDENTITY_INSERT Univers OFF; -- Indique que la table Univers n'accepte pas l'insertion de valeur dans le champ IDENTITY\n"})}),"\n",(0,s.jsx)(n.p,{children:"Pour \xeatre en mesure de connaitre la derni\xe8re identit\xe9 utilis\xe9e, il faut utiliser la fonction **IDENT_CURRENT( 'table' ) **."}),"\n",(0,s.jsx)(n.p,{children:"Ex\xe9cutez le script ci-dessous."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"EXEC initialiserBD; \r\n\r\nSELECT IDENT_CURRENT('Univers'); -- Affiche 1\r\n\r\nINSERT INTO Univers(Nom) \r\nVALUES ('Marvel');\r\n\r\nSELECT IDENT_CURRENT('Univers'); -- Affiche 1\r\n\r\nINSERT INTO Univers(Nom) \r\nVALUES ('DC');\r\n\r\nSELECT IDENT_CURRENT('Univers'); -- Affiche 2\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Lorsque la table n'a jamais eu d'insertion, ",(0,s.jsx)(n.strong,{children:"IDENT_CURRENT"})," retourne le premier \xe9l\xe9ment possible."]}),"\n",(0,s.jsxs)(n.p,{children:["Dans le cas d'une table avec une ",(0,s.jsx)(n.strong,{children:"identit\xe9 par d\xe9faut"}),", soit ",(0,s.jsx)(n.strong,{children:"d\xe9bute \xe0 1 et incr\xe9ment de 1"}),", il est possible d'utiliser cette requ\xeate pour d\xe9terminer le suivant."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"DECLARE @universId INT;\r\n--V\xe9rifie si la table est vide et que la cl\xe9 courante correspond \xe0 1. La prochaine cl\xe9 doit \xeatre 1\r\n--Sinon, on prend la derni\xe8re cl\xe9 et on ajoute 1\r\n\r\nSET\t@universId = \r\n\tCASE WHEN IDENT_CURRENT('Univers') = 1 AND (SELECT COUNT(1) FROM Univers) = 0 \r\n\t\tTHEN 1\r\n\t\tELSE IDENT_CURRENT('Univers') + 1\r\n\tEND;\r\n\r\nSELECT @universId;\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Donc pour l'ajout de valeur, il faut prendre la variable ",(0,s.jsx)(n.strong,{children:"@UniversId"})," et l'incr\xe9menter de 1 par enregistrement."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",metastring:"showLineNumbers",children:"EXEC initialiserBD; \r\n\r\nSET XACT_ABORT ON;\r\nGO\r\nBEGIN TRANSACTION;\r\n\t--D\xe9terminer la cl\xe9 de d\xe9part pour la table Univers\r\n\tDECLARE @universIdDepart INT;\r\n\tSET @universIdDepart = \r\n\t\tCASE WHEN IDENT_CURRENT('Univers') = 1 AND (SELECT COUNT(1) FROM Univers) = 0 \r\n\t\t\tTHEN 1\r\n\t\t\tELSE IDENT_CURRENT('Univers') + 1\r\n\t\tEND;\r\n\r\n    --D\xe9but des insertions pour la table Univers\r\n    SET IDENTITY_INSERT Univers ON; -- Permet d'activer l'insertion manuelle d'une cl\xe9 auto-incr\xe9ment\xe9e\r\n    INSERT INTO Univers(UniversId, Nom) \r\n    VALUES\r\n        (0 + @universIdDepart, 'Marvel'),\r\n        (1 + @universIdDepart, 'DC Comics'),\r\n        (2 + @universIdDepart, 'Teenage mutant ninja turtles');\r\n    SET IDENTITY_INSERT Univers OFF; -- Remet l'auto-incr\xe9ment automatique sur la table\r\n\r\n\t--D\xe9terminer la cl\xe9 de d\xe9part pour la table Personnage\r\n\tDECLARE @personnageIdDepart INT\r\n\tSET\t@personnageIdDepart = \r\n\t\tCASE WHEN IDENT_CURRENT('Personnage') = 1 AND (SELECT COUNT(1) FROM Personnage) = 0 \r\n\t\t\tTHEN 1\r\n\t\t\tELSE IDENT_CURRENT('Personnage') + 1\r\n\t\tEND;\r\n\t\t\t\r\n    --D\xe9but des insertions de la table\r\n    SET IDENTITY_INSERT Personnage ON;\r\n    --Ajout des h\xe9ros pour Marvel -> 0 + @universIdDepart\r\n    INSERT INTO Personnage(PersonnageId, Nom, IdentiteReelle, DateNaissance, EstVilain, UniversId) \r\n    VALUES\r\n\t\t(0 + @personnageIdDepart, 'Spiderman', 'Peter Parker', null, 0, 0 + @universIdDepart),\r\n\t\t(1 + @personnageIdDepart, 'Iron Man', 'Tony Stark', null, 0, 0 + @universIdDepart),\r\n\t\t(2 + @personnageIdDepart, 'Thor', 'Thor', null, 0, 0 + @universIdDepart);\r\n\r\n\t--Ajout des h\xe9ros pour DC -> 1 + @universIdDepart\r\n\tINSERT INTO Personnage(PersonnageId, Nom, IdentiteReelle, DateNaissance, EstVilain, UniversId)\r\n\tVALUES\r\n\t\t(3 + @personnageIdDepart, 'Joker', null, null, 1, 1 + @universIdDepart),\r\n\t\t(4 + @personnageIdDepart, 'Batman', 'Bruce Wayne', null, 0, 1 + @universIdDepart);\r\n    SET IDENTITY_INSERT Personnage OFF;\r\nCOMMIT TRANSACTION;\r\nGO\r\nSET XACT_ABORT OFF;\r\nGO\n"})}),"\n",(0,s.jsx)(n.h3,{id:"probl\xe9matique",children:"Probl\xe9matique"}),"\n",(0,s.jsx)(n.p,{children:"En utilisant cette technique, il y a un risque que votre script ne fonctionne pas, car il est possible qu'un enregistrement soit ajout\xe9 dans la table entre le calcul de la prochaine cl\xe9 et l'insertion du premier enregistrement."}),"\n",(0,s.jsx)(n.p,{children:"La transaction bloque la table d\xe8s qu'il y a une \xe9criture, mais pas lors de la lecture. Dans l'exemple ci-dessus, il pourrait avoir une insertion par un autre processus \xe0 la ligne 11 et la prochaine valeur ne serait plus valide."}),"\n",(0,s.jsx)(n.p,{children:"La coh\xe9rence des donn\xe9es serait intacte, car la transaction annulera le tout et rien ne sera fait dans la BD."}),"\n",(0,s.jsx)(n.h3,{id:"am\xe9lioration",children:"Am\xe9lioration"}),"\n",(0,s.jsx)(n.p,{children:"Lorsqu'une table a une identit\xe9 particuli\xe8re, c'est-\xe0-dire que la premi\xe8re valeur et/ou l'incr\xe9ment n'est pas 1."}),"\n",(0,s.jsx)(n.admonition,{title:"IMPORTANT",type:"warning",children:(0,s.jsx)(n.p,{children:"Ne pas utiliser cette technique pour le TP. Utilisez celle avec SCOPE_IDENTITY()."})}),"\n",(0,s.jsxs)(n.p,{children:["La propri\xe9t\xe9 ",(0,s.jsx)(n.strong,{children:"IDENT_SEED"})," permet de connaitre la premi\xe8re valeur."]}),"\n",(0,s.jsxs)(n.p,{children:["La propri\xe9t\xe9 ",(0,s.jsx)(n.strong,{children:"IDENT_INCR"})," permet de connaitre l'incr\xe9ment."]}),"\n",(0,s.jsx)(n.p,{children:"Pour \xeatre en mesure de connaitre le prochain, il faut faire cette logique."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",metastring:'title="NE PAS UTILISER"',children:"DECLARE @universIdDepart INT;\r\n--V\xe9rifie si la table est vide et que la cl\xe9 courante correspond \xe0 la valeur de d\xe9part (SEED). La prochaine cl\xe9 doit \xeatre la valeur de d\xe9part (SEED)\r\n--Sinon, on prend la derni\xe8re cl\xe9 et on ajoute la valeur d'incr\xe9ment (INCR) '\r\n\r\nSET\t@universIdDepart = \r\n\tCASE WHEN IDENT_CURRENT('Univers') = IDENT_SEED('Univers') AND (SELECT COUNT(*) FROM Univers) = 0 \r\n\t\tTHEN IDENT_SEED('Univers')\r\n    \tELSE IDENT_CURRENT('Univers') + IDENT_INCR('Univers')\r\n\tEND;\t\n"})}),"\n",(0,s.jsx)(n.p,{children:"Pour faire le script d'insertion. Le premier \xe9l\xe9ment doit \xeatre 12 et le suivant 16, 20..."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"IF OBJECT_ID('Personnage','U') IS NOT NULL \r\n\tDROP TABLE Personnage;\r\nIF OBJECT_ID('Univers','U') IS NOT NULL \r\n\tDROP TABLE Univers;\r\n\r\nCREATE TABLE Univers\r\n(\r\n    --highlight-next-line\r\n\tUniversId INT NOT NULL CONSTRAINT PK_Univers PRIMARY KEY IDENTITY(12,4), --D\xe9bute \xe0 12 avec des incr\xe9ments de 4\r\n\tNom VARCHAR(100) NOT NULL\r\n);\r\n\r\nCREATE TABLE Personnage\r\n(\r\n\tPersonnageId INT NOT NULL CONSTRAINT PK_Personnage PRIMARY KEY IDENTITY,\r\n\tNom VARCHAR(100) NOT NULL,\r\n\tIdentiteReelle VARCHAR(100) NULL,\r\n\tDateNaissance DATE NULL,\r\n    EstVilain BIT NOT NULL,\r\n\tUniversId INT NOT NULL CONSTRAINT FK_Personnage_UniversId FOREIGN KEY REFERENCES Univers(UniversId)\r\n);\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Si on d\xe9sire ajouter un personnage de l'univers ",(0,s.jsx)(n.strong,{children:"DC Comics"}),", la cl\xe9 \xe9trang\xe8re doit \xeatre ",(0,s.jsx)(n.strong,{children:"1 * IDENT_INCR('Univers') + @UniversId"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"SET XACT_ABORT ON;\r\nGO\r\nBEGIN TRANSACTION;\r\n\r\n    DECLARE @universIdDepart INT;\r\n    SET @universIdDepart = \r\n    \tCASE\r\n        \tWHEN IDENT_CURRENT('Univers') = IDENT_SEED('Univers') AND (SELECT COUNT(*) FROM Univers) = 0\r\n        \tTHEN IDENT_SEED('Univers')\r\n\t        ELSE IDENT_CURRENT('Univers') + IDENT_INCR('Univers')\r\n        END;\r\n\r\n    DECLARE @personnageIdDepart INT;\r\n    SET @personnageIdDepart = CASE\r\n        WHEN IDENT_CURRENT('Personnage') = IDENT_SEED('Personnage') AND (SELECT COUNT(*) FROM Personnage) = 0 \r\n        THEN IDENT_SEED('Personnage')\r\n        ELSE IDENT_CURRENT('Personnage') + IDENT_INCR('Personnage')\r\n        END;\r\n\r\n    --Insertion. La cl\xe9 sera g\xe9n\xe9r\xe9e par Index * IDENT_INCR('Univers') + @universIdDepart\r\n    SET IDENTITY_INSERT Univers ON;\r\n    INSERT INTO Univers(UniversId, Nom) VALUES\r\n        (0 * IDENT_INCR('Univers') + @universIdDepart, 'Marvel'), --Id = 12\r\n        (1 * IDENT_INCR('Univers') + @universIdDepart, 'DC Comics'), --Id = 16\r\n        (2 * IDENT_INCR('Univers') + @universIdDepart, 'Teenage mutant ninja turtles'); --Id = 20\r\n    SET IDENTITY_INSERT Univers OFF;\r\n\r\n    SET IDENTITY_INSERT Personnage ON;\r\n    INSERT INTO Personnage(PersonnageId, Nom, IdentiteReelle, DateNaissance, EstVilain, UniversId)\r\n\tVALUES\r\n\t\t(0 * IDENT_INCR('Personnage') + @personnageIdDepart, 'Joker', null, null, 1, 1 * IDENT_INCR('Univers') + @universIdDepart),\r\n        (1 * IDENT_INCR('Personnage') + @personnageIdDepart, 'Batman', 'Bruce Wayne', null, 0, 1 * IDENT_INCR('Univers') + @universIdDepart);\t\t\r\n    SET IDENTITY_INSERT Personnage OFF;\r\nCOMMIT TRANSACTION;\r\nGO\r\nSET XACT_ABORT OFF;\r\nGO\n"})}),"\n",(0,s.jsx)(n.h2,{id:"scope_identity",children:"SCOPE_IDENTITY()"}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsx)(n.p,{children:"Cette technique est recommand\xe9e"})}),"\n",(0,s.jsxs)(n.p,{children:["La fonction ",(0,s.jsx)(n.strong,{children:"SCOPE_IDENTITY()"})," retourne la derni\xe8re valeur de l'identit\xe9 en fonction de la connexion."]}),"\n",(0,s.jsx)(n.p,{children:"Recr\xe9ez les tables comme ci-dessous."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"EXEC initialiserBD;\n"})}),"\n",(0,s.jsx)(n.p,{children:"Ouvrez deux nouveaux onglets de requ\xeate dans SSMS."}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Onglet 1"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"INSERT INTO Univers(Nom) \r\nVALUES ('Marvel');\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Onglet 2"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"INSERT INTO Univers(Nom) \r\nVALUES ('DC Comics');\n"})}),"\n",(0,s.jsxs)(n.p,{children:["L'univers Marvel devrait avoir comme cl\xe9 primaire 1 et pour ",(0,s.jsx)(n.strong,{children:"DC Comics"})," la cl\xe9 sera \xe0 2."]}),"\n",(0,s.jsx)(n.p,{children:"Ex\xe9cutez dans chacun des onglets la commande ci-dessous."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"SELECT SCOPE_IDENTITY();\n"})}),"\n",(0,s.jsx)(n.p,{children:"Dans l'onglet 1, la valeur retourn\xe9e sera 1 et dans l'onglet 2, la valeur sera 2."}),"\n",(0,s.jsxs)(n.p,{children:["Avec le ",(0,s.jsx)(n.strong,{children:"SCOPE_IDENTITY"}),", m\xeame s'il y a une insertion dans la table pendant la pr\xe9paration du script, le ",(0,s.jsx)(n.strong,{children:"SCOPE_IDENTITY()"})," retournera la cl\xe9 de la connexion en cours."]}),"\n",(0,s.jsx)(n.p,{children:"Ouvrez un 3e onglet."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"INSERT INTO Univers(Nom) VALUES('Teenage mutant ninja turtles');\r\nINSERT INTO Univers(Nom) VALUES('Power Rangers');\r\nSELECT SCOPE_IDENTITY();\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Le ",(0,s.jsx)(n.strong,{children:"SCOPE_IDENTITY"})," retourne seulement la derni\xe8re valeur. Il faut donc faire les scripts en cons\xe9quence."]}),"\n",(0,s.jsx)(n.p,{children:"Ouvrez un 4e onglet."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"INSERT INTO Univers(Nom) \r\nVALUES ('Star Wars'); -- Sera la cl\xe9 #5\r\n-- Les autres champs peuvent \xeatre null, donc il n'est pas n\xe9cessaire de les mettre dans l'insertion\r\nINSERT INTO Personnage(Nom, EstVilain, UniversId) \r\nVALUES ('Dark Vador', 1, 5);\r\nSELECT SCOPE_IDENTITY(); --Retourne 1, car c'est la cl\xe9 de Dark Vador\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Il n'est pas possible de sp\xe9cifier la table pour la fonction ",(0,s.jsx)(n.strong,{children:"SCOPE_IDENTITY()"}),". Elle retourne la derni\xe8re cl\xe9 primaire qui a \xe9t\xe9 cr\xe9\xe9e. Il faut donc faire les scripts en cons\xe9quence."]}),"\n",(0,s.jsxs)(n.p,{children:["Pour faire le script, il faut mettre la valeur du ",(0,s.jsx)(n.strong,{children:"SCOPE_IDENTITY()"})," dans une variable \xe0 des endroits sp\xe9cifiques."]}),"\n",(0,s.jsx)(n.p,{children:"Recr\xe9ez vos tables pour les vider et repartir de 0."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"EXEC initialiserBD;\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"--D\xe9claration des variables pour enregistrer la cl\xe9 primaire\r\nDECLARE @universId1 INT\r\nDECLARE @universId2 INT\r\nDECLARE @universId3 INT\r\n\r\nINSERT INTO Univers(Nom) VALUES('Marvel')\r\n--Enregistre la cl\xe9 pour Marvel\r\nSELECT @universId1 = SCOPE_IDENTITY()\r\n\r\nINSERT INTO Univers(Nom) VALUES('DC Comics')\r\n--Enregistre la cl\xe9 pour DC\r\nSELECT @universId2 = SCOPE_IDENTITY()\r\n\r\nINSERT INTO Univers(Nom) VALUES('Teenage mutant ninja turtles')\r\n--Enregistre la cl\xe9 pour TMNT\r\nSELECT @universId3 = SCOPE_IDENTITY()\r\n\r\n--Pour afficher le contenu des variables\r\nSELECT \r\n\t@universId1 AS Univers1,\r\n\t@universId2 AS Univers2,\r\n\t@universId3 AS Univers3\r\n\t\r\n--Afichage\r\n--Univers1\tUnivers2\tUnivers3\r\n--1\t\t\t2\t\t\t3\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Donc pour faire l'insertion dans la table ",(0,s.jsx)(n.strong,{children:"Personnage"}),", la cl\xe9 \xe9trang\xe8re doit \xeatre la variable."]}),"\n",(0,s.jsx)(n.p,{children:"Voici un script complet avec la transaction."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"EXEC initialiserBD;\r\n\r\nSET XACT_ABORT ON\r\nGO\r\nBEGIN TRANSACTION\r\n\t--Insertion dans la table Univers\r\n\tDECLARE @universId1 INT\r\n\tDECLARE @universId2 INT\t\r\n\tDECLARE @universId3 INT\r\n\t\r\n\tINSERT INTO Univers(Nom) VALUES('Marvel')\r\n\tSELECT @universId1 = SCOPE_IDENTITY()\r\n\t\r\n\t\r\n\tINSERT INTO Univers(Nom) VALUES('DC Comics')\r\n\tSELECT @universId2 = SCOPE_IDENTITY()\r\n\t\t\r\n\t\r\n\tINSERT INTO Univers(Nom) VALUES('Teenage mutant ninja turtles')\r\n\tSELECT @universId3 = SCOPE_IDENTITY()\r\n\r\n\t--Insertion dans la table Personnage\t\r\n\tDECLARE @personnage1 INT\r\n\tDECLARE @personnage2 INT\r\n\tDECLARE @personnage3 INT\r\n\tDECLARE @personnage4 INT\r\n\r\n\t--Insertion pour Marvel - @universId1\r\n\tINSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Spiderman', 0, @universId1)\r\n\tSELECT @personnage1 = SCOPE_IDENTITY()\r\n\t\r\n\tINSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Ironman', 0, @universId1)\r\n\tSELECT @personnage2 = SCOPE_IDENTITY()\r\n\r\n\t--Insertion pour DC - @universId2\r\n\tINSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Batman', 0, @universId2) \r\n\tSELECT @personnage3 = SCOPE_IDENTITY()\r\n\r\n\t--Insertion pour TMNT - @universId3\r\n\tINSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Leonardo', 0, @universId3)\r\n\tSELECT @personnage4 = SCOPE_IDENTITY()\r\n\r\n\t-- Suite pour les autres tables...\r\nCOMMIT TRANSACTION\r\nSET XACT_ABORT OFF\r\nGO\n"})}),"\n",(0,s.jsx)(n.p,{children:"Cette technique demande \xe9norm\xe9ment de variables."}),"\n",(0,s.jsx)(n.h2,{id:"utilisation-de-cl\xe9-naturelle",children:"Utilisation de cl\xe9 naturelle"}),"\n",(0,s.jsx)(n.p,{children:"Lorsque l'enregistrement a une cl\xe9 naturelle, il est possible de r\xe9cup\xe9rer la cl\xe9 primaire par la cl\xe9 naturelle."}),"\n",(0,s.jsx)(n.p,{children:"Cette technique simplifie \xe9norm\xe9ment les importations de donn\xe9es lorsque c'est possible."}),"\n",(0,s.jsxs)(n.p,{children:["Par exemple, nous avons une base de donn\xe9es avec une table ",(0,s.jsx)(n.strong,{children:"Pays"})," et ",(0,s.jsx)(n.strong,{children:"Ville"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-SQL",children:"CREATE TABLE Pays\r\n(\r\n\tPaysId INT NOT NULL CONSTRAINT PK_Pays PRIMARY KEY IDENTITY,\r\n\tNom VARCHAR(100) NOT NULL,\r\n\tCode CHAR(2) NOT NULL CONSTRAINT UQ_Code UNIQUE CONSTRAINT CK_Code CHECK (LEN(Code) = 2)\r\n);\r\n\r\nCREATE TABLE Ville\r\n(\r\n\tVilleId INT NOT NULL CONSTRAINT PK_Ville PRIMARY KEY IDENTITY,\r\n\tNom VARCHAR(100) NOT NULL,\r\n\tPaysId INT NOT NULL CONSTRAINT FK_Ville_Pays FOREIGN KEY REFERENCES Pays(PaysId)\r\n);\n"})}),"\n",(0,s.jsx)(n.p,{children:"Cr\xe9ez les 3 pays ci-dessous."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"INSERT INTO Pays(Nom, Code) \r\nVALUES\r\n\t('Canada', 'CA'),\r\n\t('France', 'FR'),\r\n\t('Italie', 'IT');\n"})}),"\n",(0,s.jsx)(n.p,{children:"Il faut ajouter les villes suivantes."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Drummondville dans le Canada"}),"\n",(0,s.jsx)(n.li,{children:"Montr\xe9al dans le Canada"}),"\n",(0,s.jsx)(n.li,{children:"Paris pour la France"}),"\n",(0,s.jsx)(n.li,{children:"Rome pour l'Italie"}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Il est possible de faire l'insertion sans connaitre la cl\xe9 primaire, car il y a une cl\xe9 naturelle, soit le ",(0,s.jsx)(n.strong,{children:"code ISO"})," du pays."]}),"\n",(0,s.jsxs)(n.p,{children:["Pour obtenir la cl\xe9 primaire, il faut faire un ",(0,s.jsx)(n.strong,{children:"SELECT"})," ",(0,s.jsx)(n.strong,{children:"imbriqu\xe9"})," dans le ",(0,s.jsx)(n.strong,{children:"INSERTION"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"INSERT INTO Ville(Nom, PaysId) \r\nVALUES\r\n\t('Drummondville', (SELECT PaysId FROM Pays WHERE Pays.Code = 'CA')),\r\n\t('Montr\xe9al', (SELECT PaysId FROM Pays WHERE Pays.Code = 'CA')),\r\n\t('Paris', (SELECT PaysId FROM Pays WHERE Pays.Code = 'FR')),\r\n\t('Rome', (SELECT PaysId FROM Pays WHERE Pays.Code = 'IT'));\n"})}),"\n",(0,s.jsx)(n.p,{children:"Par contre, il est assez rare d'avoir des cl\xe9s naturelles dans toutes nos tables."}),"\n",(0,s.jsx)(n.h2,{id:"insertion-et-output",children:"INSERTION et OUTPUT"}),"\n",(0,s.jsxs)(n.p,{children:["La technique du ",(0,s.jsx)(n.strong,{children:"INSERTION"})," et ",(0,s.jsx)(n.strong,{children:"OUTPUT"})," est similaire au ",(0,s.jsx)(n.strong,{children:"SCOPE_IDENTITY"}),". La clause ",(0,s.jsx)(n.strong,{children:"OUTPUT"})," permet de retourner la valeur des colonnes de l'enregistrement qui vient d'\xeatre ins\xe9r\xe9. Cette clause est tr\xe8s pratique pour r\xe9cup\xe9rer une cl\xe9 primaire g\xe9n\xe9r\xe9 automatiquement. L'\xe9quivalent en ",(0,s.jsx)(n.strong,{children:"PostGreSQL"})," et ",(0,s.jsx)(n.strong,{children:"MariaBD v10.5+"})," est la clause ",(0,s.jsx)(n.strong,{children:"RETURNING"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"Ex\xe9cutez le script ci-dessous pour recr\xe9er les tables."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"EXEC initialiserBD;\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Il est possible d'enregistrer des valeurs d'une insertion dans une variable de type ",(0,s.jsx)(n.strong,{children:"TABLE"}),". Ce type est l'\xe9quivalent d'une collection d'une structure de donn\xe9es. Une variable de type ",(0,s.jsx)(n.strong,{children:"TABLE"})," existe uniquement dans le contexte d'ex\xe9cution, mais il est possible de faire des ",(0,s.jsx)(n.strong,{children:"SELECT"})," avec des ",(0,s.jsx)(n.strong,{children:"WHERE"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"Ex\xe9cutez le script ci-dessous."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"INSERT INTO Univers(Nom) \r\nVALUES('Teenage mutant ninja turtles'); -- UniversId = 1\r\n\r\nDECLARE @tblUniversId TABLE(RowId INT IDENTITY, UniversId INT);\r\n\r\nINSERT INTO Univers(Nom)\r\n--highlight-next-line\r\nOUTPUT INSERTED.UniversId INTO @tblUniversId\r\nVALUES\r\n\t('Marvel'), --RowId = 1, UniversId = 2\r\n\t('DC Comics');\t\t--RowId = 2, UniversId = 3\r\n\r\nSELECT UniversId FROM @tblUniversId WHERE RowId = 1; -- Pour Marvel\r\nSELECT UniversId FROM @tblUniversId WHERE RowId = 2; -- Pour DC\n"})}),"\n",(0,s.jsxs)(n.p,{children:["La ligne ",(0,s.jsx)(n.strong,{children:"OUTPUT INSERTED"})," permet de r\xe9cup\xe9rer la valeur de tous les champs de l'enregistrement. La partie ",(0,s.jsx)(n.strong,{children:"INTO"})," permet d'enregistrer le contenu dans la variable de type ",(0,s.jsx)(n.strong,{children:"TABLE"}),". Le type ",(0,s.jsx)(n.strong,{children:"TABLE"})," est similaire \xe0 une structure de donn\xe9es."]}),"\n",(0,s.jsxs)(n.p,{children:["La variable ",(0,s.jsx)(n.strong,{children:"@TblUniversId"})," contient 2 enregistrements."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"RowId\t\tUniversId\r\n-----\t\t---------\r\n1\t\t\t2\r\n2\t\t\t3\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Pour r\xe9cup\xe9rer la cl\xe9 primaire, il faut faire un ",(0,s.jsx)(n.strong,{children:"SELECT"})," en fonction de son ",(0,s.jsx)(n.strong,{children:"RowId"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Apr\xe8s chaque ex\xe9cution, la variable de type ",(0,s.jsx)(n.strong,{children:"TABLE"})," est recr\xe9\xe9e et son ",(0,s.jsx)(n.strong,{children:"RowId"})," va recommencer \xe0 1. Il est important d'ex\xe9cuter tout le script en m\xeame temps et non section par section."]}),"\n",(0,s.jsx)(n.h3,{id:"exemple",children:"Exemple"}),"\n",(0,s.jsx)(n.p,{children:"R\xe9initialisez la table et voici un exemple de script."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"EXEC initialiserBD;\r\n\r\nSET XACT_ABORT ON;\r\nGO\r\nBEGIN TRANSACTION;\r\n\t\r\n    DECLARE @tblUniversId TABLE(RowId INT IDENTITY, UniversId INT);\r\n\r\n    INSERT INTO Univers(Nom)\r\n    OUTPUT INSERTED.UniversId INTO @tblUniversId\r\n    VALUES\r\n        ('Marvel'), --RowId sera 1\r\n        ('DC Comics'); --Row Id sera 2\r\n\r\n    DECLARE @tblPersonnageId TABLE(RowId INT IDENTITY, PersonnageId INT)\r\n\r\n    INSERT INTO Personnage(Nom, EstVilain, UniversId)\r\n    OUTPUT INSERTED.PersonnageId INTO @tblPersonnageId\r\n    VALUES\r\n        ('Spiderman', 0, (SELECT UniversId FROM @tblUniversId WHERE RowId = 1)), --Marvel\r\n        ('Ironman', 0, (SELECT UniversId FROM @tblUniversId WHERE RowId = 1)), --Marvel\r\n        ('Batman', 0, (SELECT UniversId FROM @tblUniversId WHERE RowId = 2)), --DC\r\n        ('Superman', 0, (SELECT UniversId FROM @tblUniversId WHERE RowId = 2)); --DC\r\n\r\nCOMMIT TRANSACTION;\r\nSET XACT_ABORT OFF;\r\nGO\n"})}),"\n",(0,s.jsx)(n.h2,{id:"table-temporaire",children:"Table temporaire"}),"\n",(0,s.jsxs)(n.p,{children:["La technique de cr\xe9ation par table temporaire consiste \xe0 enregistrer des cl\xe9s ",(0,s.jsx)(n.strong,{children:"naturelles temporaires"})," en lien avec les cl\xe9s primaires. La cl\xe9 naturelle n'a pas r\xe9ellement de signification, mais elle en aura une dans le script."]}),"\n",(0,s.jsx)(n.p,{children:"Pour \xeatre optimal, cette technique est un mixte des techniques ci-dessus. L'avantage d'avoir des proc\xe9dures stock\xe9es, c'est qu'il est possible de les conserver dans la BD et de faire de nouvelles insertions \xe0 tout moment."}),"\n",(0,s.jsx)(n.p,{children:"Il faut cr\xe9er les tables temporaires, ensuite faire les proc\xe9dures stock\xe9es d'insertions et les insertions par les proc\xe9dures stock\xe9es."}),"\n",(0,s.jsxs)(n.p,{children:["Pour la proc\xe9dure stock\xe9e, il est possible de faire l'insertion avec un ",(0,s.jsx)(n.strong,{children:"SCOPE IDENTITY"})," ou le ",(0,s.jsx)(n.strong,{children:"OUTPUT"}),"."]}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["Pour le TP 1, il est demand\xe9 d'utiliser le ",(0,s.jsx)(n.strong,{children:"OUTPUT"}),", donc nous allons faire les exemples avec le ",(0,s.jsx)(n.strong,{children:"OUTPUT"}),"."]})}),"\n",(0,s.jsx)(n.p,{children:"R\xe9initialisez les tables."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"EXEC initialiserBD;\n"})}),"\n",(0,s.jsx)(n.p,{children:"Premi\xe8rement, il faut cr\xe9er les proc\xe9dures stock\xe9es pour les insertions."}),"\n",(0,s.jsx)(n.p,{children:"La proc\xe9dure stock\xe9e doit avoir en param\xe8tre tous les champs de la table \xe0 l'exception de la cl\xe9 primaire. Il faut ajouter un param\xe8tre pour la cl\xe9 naturelle temporaire qui servira de r\xe9f\xe9rence."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"--Proc\xe9dure pour l'insertion d'un univers\r\nIF OBJECT_ID('insererUnivers', 'P') IS NOT NULL \r\n\tDROP PROCEDURE insererUnivers;\r\nGO\r\n\r\nCREATE PROCEDURE insererUnivers\r\n\t@nom NVARCHAR(100),\r\n\t@cleNatTemp VARCHAR(100) --Cl\xe9 naturelle temporaire\r\nAS\r\n\tSET NOCOUNT ON;\r\n\t--V\xe9rifie si la table temporaire globale n'existe pas, il faut la cr\xe9er\r\n\tIF OBJECT_ID('tempdb..##UniversCleNat') IS NULL \r\n\t\tCREATE TABLE ##UniversCleNat \r\n\t\t(\r\n\t\t\tUniversId INT NOT NULL UNIQUE, \r\n\t\t\tCleNatTemp VARCHAR(100) NOT NULL UNIQUE\r\n\t\t);\r\n\r\n\t--Insertion dans la table\r\n\tINSERT INTO Univers(Nom)\r\n\tVALUES (@nom);\r\n\r\n\t--Insertion dans la table temporaire\r\n\tINSERT INTO ##UniversCleNat(UniversId, CleNatTemp) \r\n\tVALUES\r\n\t\t(SCOPE_IDENTITY(), @cleNatTemp);\r\nGO\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Il est important d'utiliser des tables ",(0,s.jsx)(n.strong,{children:"temporaires globales"})," pour les proc\xe9dures stock\xe9es, car une temporaire normale sera accessible uniquement dans l'ex\xe9cution de la proc\xe9dure."]}),"\n",(0,s.jsx)(n.p,{children:"La proc\xe9dure effectue l'enregistrement dans la table, r\xe9cup\xe8re la cl\xe9 primaire et associe la cl\xe9 primaire \xe0 la cl\xe9 naturelle temporaire."}),"\n",(0,s.jsxs)(n.p,{children:["Pour la table ",(0,s.jsx)(n.strong,{children:"Personnage"}),", c'est un peu diff\xe9rent."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"--Proc\xe9dure pour l'insertion d'un personnage\r\nIF OBJECT_ID('insererPersonnage', 'P') IS NOT NULL \r\n\tDROP PROCEDURE insererPersonnage;\r\nGO\r\n\r\nCREATE PROCEDURE insererPersonnage\r\n\t@nom VARCHAR(100),\r\n\t@identiteReelle VARCHAR(100),\r\n\t@dateNaissance DATE,\r\n\t@estVilain BIT,\r\n\t@universIdCleNatTemp VARCHAR(100),\r\n\t@cleNatTemp VARCHAR(100)\r\nAS\r\n\tSET NOCOUNT ON;\r\n\t--V\xe9rifie si la table temporaire globale n'existe pas, il faut la cr\xe9er\r\n\tIF OBJECT_ID('tempdb..##PersonnageCleNat') IS NULL \r\n\t\tCREATE TABLE ##PersonnageCleNat \r\n\t\t(\r\n\t\t\tPersonnageId INT NOT NULL UNIQUE, \r\n\t\t\tCleNatTemp VARCHAR(100) NOT NULL UNIQUE\r\n\t\t);\r\n\r\n\t--R\xe9cup\xe9ration de la cl\xe9 UniversId \xe0 partir de la cl\xe9 naturelle temporaire\r\n\tDECLARE @universId INT;\r\n    -- highlight-start\r\n\tSET @universId = (SELECT ##UniversCleNat.UniversId \r\n\t\t\t\t\t  FROM ##UniversCleNat \r\n\t\t\t\t\t  WHERE ##UniversCleNat.CleNatTemp = @UniversIdCleNatTemp);\r\n    -- highlight-end\r\n\t--Insertion dans la table\t\r\n\tINSERT INTO Personnage(Nom, IdentiteReelle, DateNaissance, EstVilain, UniversId)\t\r\n\tVALUES (@nom, @identiteReelle, @dateNaissance, @estVilain, @universId)\r\n\r\n\t--Insertion dans la table temporaire\r\n\tINSERT INTO ##PersonnageCleNat(PersonnageId, CleNatTemp) \r\n\tVALUES\r\n\t\t(SCOPE_IDENTITY(), @cleNatTemp);\r\n\r\nGO\n"})}),"\n",(0,s.jsxs)(n.p,{children:["L'enregistrement de la table ",(0,s.jsx)(n.strong,{children:"Personnage"})," a besoin de la cl\xe9 \xe9trang\xe8re de la table ",(0,s.jsx)(n.strong,{children:"Univers"}),". Il faut sp\xe9cifier la cl\xe9 ",(0,s.jsx)(n.strong,{children:"UniversId"}),". La cl\xe9 sera r\xe9cup\xe9r\xe9e par l'utilisation de la cl\xe9 naturelle temporaire sp\xe9cifi\xe9e lors de l'insertion des enregistrements de la table ",(0,s.jsx)(n.strong,{children:"Univers"})," (voir les lignes surlign\xe9es ci-haut)."]}),"\n",(0,s.jsx)(n.p,{children:"Pour ins\xe9rer un personnage, il faut appeler la proc\xe9dure."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"EXEC insererPersonnage 'Spiderman', 'Peter Parker', null, 0, 'MCU', 'P1';\r\n--MCU est la cl\xe9 naturelle temporaire pour Marvel\r\n--P1 est la cl\xe9 naturelle temporaire pour le personnage\n"})}),"\n",(0,s.jsx)(n.p,{children:"Il est aussi important de supprimer les tables temporaires, car il ne faut pas avoir de vieilles r\xe9f\xe9rences pour les cl\xe9s naturelles."}),"\n",(0,s.jsx)(n.p,{children:"L'utilisation d'une proc\xe9dure stock\xe9e est id\xe9ale, car il est plus facile de la r\xe9utiliser."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"-- Proc\xe9dure pour supprimer les tables temporaires\r\nIF OBJECT_ID('nettoyageTableTemporaireInsertion', 'P') IS NOT NULL \r\n\tDROP PROCEDURE nettoyageTableTemporaireInsertion;\r\nGO\r\n\r\nCREATE PROCEDURE nettoyageTableTemporaireInsertion\r\nAS\r\n\tIF OBJECT_ID('tempdb..##UniversCleNat') IS NOT NULL \r\n\t\tDROP TABLE ##UniversCleNat;\r\n\tIF OBJECT_ID('tempdb..##PersonnageCleNat') IS NOT NULL \r\n\t\tDROP TABLE ##PersonnageCleNat;\r\nGO\n"})}),"\n",(0,s.jsx)(n.p,{children:"Pour faire l'insertion des donn\xe9es, il suffit d'appeler les proc\xe9dures stock\xe9es."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"SET XACT_ABORT ON;\r\nGO\r\nBEGIN TRANSACTION;\r\n    --Nettoyage des tables temporaires pour les insertions\r\n    EXEC nettoyageTableTemporaireInsertion\r\n\r\n    --Insertion pour la table Univers\r\n    EXEC insererUnivers 'Marvel', 'MCU';\r\n    EXEC insererUnivers 'DC Comics', 'DC';\r\n    EXEC insererUnivers 'Teenage mutant ninja turtles', 'TMNT';\r\n\r\n    --Insertion pour la table Personnage\r\n    --La cl\xe9 \xe9trang\xe8re est la cl\xe9 naturelle temporaire sp\xe9cifi\xe9e avant\r\n    EXEC insererPersonnage 'Spiderman', 'Peter Parker', null, 0, 'MCU', 'P1';\r\n    EXEC insererPersonnage 'Batman', 'Bruce Wayne', null, 0, 'DC', 'P2';\r\n    EXEC insererPersonnage 'Leonardo', null, null, 0, 'TMNT', 'P3';\r\n    EXEC insererPersonnage 'Joker', null, null, 1, 'DC', 'P4';\r\n\r\n    --Nettoyage des tables temporaires pour les insertions pour ne pas les conserver en m\xe9moire inutilement\r\n    EXEC nettoyageTableTemporaireInsertion;\r\n\r\nCOMMIT TRANSACTION;\r\nSET XACT_ABORT OFF;\r\nGO\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsx)(n.p,{children:"Ici la cl\xe9 naturelle temporaire pour les personnages ne sert \xe0 rien.\r\nMais il est facile d'imaginer qu'on voudrait associer des superpouvoirs aux  personnages. Dans ce cas, cette cl\xe9 temporaire servirait."})}),"\n",(0,s.jsx)(n.h2,{id:"consid\xe9ration",children:"Consid\xe9ration"}),"\n",(0,s.jsx)(n.p,{children:"Pour chacune des techniques, il y a une consid\xe9ration \xe0 prendre en compte."}),"\n",(0,s.jsx)(n.p,{children:"Ces techniques fonctionnent uniquement pour de nouvelles donn\xe9es."}),"\n",(0,s.jsxs)(n.p,{children:["Par exemple, s'il faut ajouter de nouveaux enregistrements dans la table ",(0,s.jsx)(n.strong,{children:"Personnage"})," pour des univers existants, il faut \xeatre en mesure de r\xe9cup\xe9rer la cl\xe9 \xe9trang\xe8re existante."]}),"\n",(0,s.jsx)(n.p,{children:"Si la cl\xe9 est pr\xe9alablement connue et fixe dans le temps, il est possible de l'ajouter directement dans l'insertion."})]})}function E(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>l,a:()=>a});var s=r(7294);const i={},t=s.createContext(i);function a(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);