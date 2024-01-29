"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[7790],{4714:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>t,metadata:()=>l,toc:()=>d});var r=s(5893),i=s(1151);const t={sidebar_position:4},o="Exercices AdventureWorks2019",l={id:"R\xe9vision SQL/exercice_AdventureWorks2019",title:"Exercices AdventureWorks2019",description:"AdventureWorks est une base de donn\xe9es fictives distribu\xe9e par Microsoft. Malheureusement, il est difficile d'obtenir de la documentation \xe0 jour.",source:"@site/docs/10-R\xe9vision SQL/exercice_AdventureWorks2019.md",sourceDirName:"10-R\xe9vision SQL",slug:"/R\xe9vision SQL/exercice_AdventureWorks2019",permalink:"/4N1_2024/docs/R\xe9vision SQL/exercice_AdventureWorks2019",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"NotesSidebar",previous:{title:"Exercices de cr\xe9ation BD - Univers",permalink:"/4N1_2024/docs/R\xe9vision SQL/exercice_revision_sql"},next:{title:"Proc\xe9dure stock\xe9e",permalink:"/4N1_2024/docs/R\xe9vision SQL/procedures_stockees"}},c={},d=[{value:"Installation sur SQL Express sur votre ordinateur (optionnel)",id:"installation-sur-sql-express-sur-votre-ordinateur-optionnel",level:2},{value:"SSMS",id:"ssms",level:2},{value:"Serveur d\xe9partemental",id:"serveur-d\xe9partemental",level:2},{value:"Sch\xe9ma",id:"sch\xe9ma",level:2},{value:"Exercices sur <strong>SELECT</strong>",id:"exercices-sur-select",level:2},{value:"Exercice 1",id:"exercice-1",level:3},{value:"Exercice 2",id:"exercice-2",level:3},{value:"Exercice 3",id:"exercice-3",level:3},{value:"Exercice 4",id:"exercice-4",level:3},{value:"Exercice 5",id:"exercice-5",level:3},{value:"Exercice 6",id:"exercice-6",level:3},{value:"Exercice 7",id:"exercice-7",level:3},{value:"Exercice 8",id:"exercice-8",level:3},{value:"Exercice 9",id:"exercice-9",level:3},{value:"Exercice 10",id:"exercice-10",level:3},{value:"Exercice 11",id:"exercice-11",level:3}];function a(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.a)(),...e.components},{Details:s}=n;return s||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"exercices-adventureworks2019",children:"Exercices AdventureWorks2019"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"AdventureWorks"})," est une base de donn\xe9es fictives distribu\xe9e par ",(0,r.jsx)(n.strong,{children:"Microsoft"}),". Malheureusement, il est difficile d'obtenir de la documentation \xe0 jour."]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Diagramme complet - Adventure Works - 2008"}),"\n",(0,r.jsx)(n.p,{children:"Version 2008 du diagramme complet de la base de donn\xe9es. Certains correctifs ont \xe9t\xe9 mis \xe0 la main."}),"\n"]}),"\n"]}),"\n",(0,r.jsx)("img",{src:"https://moidulhassan.files.wordpress.com/2014/07/adventureworks2008_schema.gif"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Diagramme - Sch\xe9ma Person - 2019"}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Diagramme g\xe9n\xe9r\xe9 par SQL Server pour la version 2019. Le diagramme contient uniquement les tables du sch\xe9ma Person."}),"\n",(0,r.jsx)("img",{src:"/4N1_2024/img/person.png"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"/4N1_2024/img/AdventureWorks_DataDictionary.pdf",children:"Dictionnaire de donn\xe9es 2014"})}),"\n",(0,r.jsx)(n.p,{children:"Document qui contient l'explication de chacune des tables et des champs pour la version 2014."}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["Pour avoir une explication de sa conception : ",(0,r.jsx)(n.a,{href:"https://docs.microsoft.com/fr-ca/previous-versions/sql/sql-server-2008/ms124825(v=sql.100)?redirectedfrom=MSDN",children:"https://docs.microsoft.com/fr-ca/previous-versions/sql/sql-server-2008/ms124825(v=sql.100)?redirectedfrom=MSDN"})]}),"\n",(0,r.jsx)(n.p,{children:"Notez que l'article date de 2010, il est possible que certains \xe9l\xe9ments ne soient pas identiques."}),"\n",(0,r.jsx)(n.h2,{id:"installation-sur-sql-express-sur-votre-ordinateur-optionnel",children:"Installation sur SQL Express sur votre ordinateur (optionnel)"}),"\n",(0,r.jsxs)(n.p,{children:["T\xe9l\xe9chargez le fichier de la base de donn\xe9es : ",(0,r.jsx)(n.a,{href:"https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorks2019.bak",children:"https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorks2019.bak"})]}),"\n",(0,r.jsxs)(n.p,{children:["Copiez le fichier dans ce dossier ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"C:\\Backup\\AdventureWorks2019.bak"})})]}),"\n",(0,r.jsx)(n.p,{children:"Pour faire la restauration, faites l'une des proc\xe9dures ci-dessous"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsxs)(n.p,{children:["Interface graphique : ",(0,r.jsx)(n.a,{href:"https://docs.microsoft.com/fr-ca/sql/samples/adventureworks-install-configure?view=sql-server-ver15&tabs=ssms#tabpanel_1_ssms",children:"https://docs.microsoft.com/fr-ca/sql/samples/adventureworks-install-configure?view=sql-server-ver15&tabs=ssms#tabpanel_1_ssms"})]}),"\n"]}),"\n",(0,r.jsxs)(n.li,{children:["\n",(0,r.jsx)(n.p,{children:"Script T-SQL"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"USE [master]\r\nRESTORE DATABASE [AdventureWorks2019] \r\nFROM  DISK = N'C:\\Backup\\AdventureWorks2019.bak'\r\nWITH  FILE = 1,  NOUNLOAD,  STATS = 5\r\nGO\n"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"ssms",children:"SSMS"}),"\n",(0,r.jsx)(n.p,{children:"Pour ces exercices, vous pouvez utiliser SSMS"}),"\n",(0,r.jsx)(n.h2,{id:"serveur-d\xe9partemental",children:"Serveur d\xe9partemental"}),"\n",(0,r.jsxs)(n.p,{children:["Vous devriez avoir acc\xe8s \xe0 une base de donn\xe9es nomm\xe9e ",(0,r.jsxs)(n.strong,{children:["e",(0,r.jsx)(n.em,{children:"DA"}),"_AdventureWorks2019"]}),". Si votre DA est 1234567, la base de donn\xe9es sera ",(0,r.jsx)(n.strong,{children:"e1234567_AdventureWorks2019"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"sch\xe9ma",children:"Sch\xe9ma"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT * FROM Person.Person\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Le nom de la table ",(0,r.jsx)(n.strong,{children:"Person"})," \xe9tait r\xe9p\xe9t\xe9\u2026 pourquoi?"]}),"\n",(0,r.jsxs)(n.p,{children:["En r\xe9alit\xe9, ce n\u2019est pas le nom de la table qui est r\xe9p\xe9t\xe9, c\u2019est le nom du sch\xe9ma qui est pr\xe9fix\xe9 au nom de la table. Un sch\xe9ma est simplement un regroupement d\u2019objets. Chacune des tables est dans un sch\xe9ma, indiqu\xe9 entre parenth\xe8ses apr\xe8s le nom de la table dans l\u2019explorateur de serveurs. Un sch\xe9ma est similaire \xe0 un ",(0,r.jsx)(n.strong,{children:"namespace"})," dans un langage de programmation. Il permet de grouper des tables afin d\u2019\xe9liminer les conflits de noms. Il permet aussi de mettre des protections group\xe9es."]}),"\n",(0,r.jsxs)(n.p,{children:["Lorsqu'aucun ",(0,r.jsx)(n.strong,{children:"sch\xe9ma"})," n'est sp\xe9cifi\xe9 lors de la cr\xe9ation d'une table, le ",(0,r.jsx)(n.strong,{children:"sch\xe9ma"})," par d\xe9faut est ",(0,r.jsx)(n.strong,{children:"dbo"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Pour en savoir plus : ",(0,r.jsx)(n.a,{href:"https://www.youtube.com/watch?v=bbpxxnEMda4",children:"https://www.youtube.com/watch?v=bbpxxnEMda4"})]}),"\n",(0,r.jsxs)(n.h2,{id:"exercices-sur-select",children:["Exercices sur ",(0,r.jsx)(n.strong,{children:"SELECT"})]}),"\n",(0,r.jsxs)(n.p,{children:["Utilisez la base de donn\xe9es ",(0,r.jsx)(n.strong,{children:"AdventureWorks"})," pour tous les exercices de ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"SELECT"})}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Nous allons utiliser seulement les tables du sch\xe9ma ",(0,r.jsx)(n.strong,{children:"Person"}),"."]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-1",children:"Exercice 1"}),"\n",(0,r.jsxs)(n.p,{children:["S\xe9lectionnez toutes les personnes que leur type de personne est ",(0,r.jsx)(n.strong,{children:"SP"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Affichez uniquement  la ",(0,r.jsx)(n.strong,{children:"cl\xe9 primaire"}),", le ",(0,r.jsx)(n.strong,{children:"pr\xe9nom"})," et ",(0,r.jsx)(n.strong,{children:"nom"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Vous devriez avoir 17 lignes."}),"\n",(0,r.jsxs)(s,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT\r\n\tBusinessEntityID, \r\n\tFirstName, \r\n\tLastName  \r\nFROM Person.Person \r\nWHERE PersonType = 'SP';\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-2",children:"Exercice 2"}),"\n",(0,r.jsx)(n.p,{children:"Modifiez la requ\xeate 1."}),"\n",(0,r.jsxs)(n.p,{children:["Affichez \xe9galement le ",(0,r.jsx)(n.strong,{children:"type de personne"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Ajoutez un tri en ordre ",(0,r.jsx)(n.strong,{children:"croissant"})," avec le ",(0,r.jsx)(n.strong,{children:"nom"})," et ensuite le ",(0,r.jsx)(n.strong,{children:"pr\xe9nom"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["S\xe9lectionnez ceux qui ont le type de personne est ",(0,r.jsx)(n.strong,{children:"SP"})," ou ",(0,r.jsx)(n.strong,{children:"EM"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Vous devriez avoir 290 lignes."}),"\n",(0,r.jsxs)(s,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT\r\n\tBusinessEntityID, \r\n\tFirstName, \r\n\tLastName,\r\n\tPersonType\r\nFROM Person.Person \r\nWHERE \r\n\tPersonType = 'SP' OR \r\n\tPersonType = 'EM'\r\nORDER BY\r\n\tLastName,\r\n\tFirstName;\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-3",children:"Exercice 3"}),"\n",(0,r.jsxs)(n.p,{children:["Modifiez la requ\xeate 2 et utilisez l'alias ",(0,r.jsx)(n.strong,{children:"p"})," pour la table ",(0,r.jsx)(n.strong,{children:"Person"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Les colonnes du ",(0,r.jsx)(n.strong,{children:"SELECT"})," doivent utiliser cet alias."]}),"\n",(0,r.jsxs)(n.p,{children:["S\xe9lectionnez ceux qui ont le type de personne est ",(0,r.jsx)(n.strong,{children:"SP"})," ou ",(0,r.jsx)(n.strong,{children:"EM"})," et que leur pr\xe9nom commence par la lettre ",(0,r.jsx)(n.strong,{children:"A"})," ou ",(0,r.jsx)(n.strong,{children:"C"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Vous devriez avoir 28 lignes."}),"\n",(0,r.jsxs)(s,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT\r\n\tp.BusinessEntityID, \r\n\tp.FirstName, \r\n\tp.LastName  \r\nFROM Person.Person p\r\nWHERE \r\n\t(\r\n\t\tp.PersonType = 'SP' OR \r\n\t\tp.PersonType = 'EM'\r\n\t) AND\r\n\t(\r\n\t\tp.FirstName LIKE 'A%' OR\r\n\t\tp.FirstName LIKE 'C%'\r\n\t)\r\nORDER BY\r\n\tp.LastName,\r\n    p.FirstName;\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-4",children:"Exercice 4"}),"\n",(0,r.jsx)(n.p,{children:"Affichez le pr\xe9nom, nom et l'adresse courriel d'une personne."}),"\n",(0,r.jsx)(n.p,{children:"Vous devez faire une jointure entre 2 tables: Person et EmailAddress."}),"\n",(0,r.jsxs)(n.p,{children:["Utilisez ",(0,r.jsx)(n.strong,{children:"sp_help"})," pour connaitre les cl\xe9s pour la jointure entre EmailAddress et Person."]}),"\n",(0,r.jsxs)(s,{children:[(0,r.jsx)("summary",{children:"Solution pour sp_help"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"sp_help 'Person.EmailAddress'\n"})}),(0,r.jsxs)(n.p,{children:["Dans la section ",(0,r.jsx)(n.strong,{children:"constraint_type"})," vous y trouverez les ",(0,r.jsx)(n.strong,{children:"FOREIGN KEY"})]})]}),"\n",(0,r.jsx)(n.p,{children:"Vous devriez avoir 19 972 lignes."}),"\n",(0,r.jsxs)(s,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT \r\n\tp.BusinessEntityID,\r\n\tp.FirstName, \r\n\tp.LastName, \r\n\te.EmailAddress\r\nFROM Person.Person p\r\nINNER JOIN Person.EmailAddress e ON P.BusinessEntityID = e.BusinessEntityID;\r\n\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-5",children:"Exercice 5"}),"\n",(0,r.jsx)(n.p,{children:"Affichez le pr\xe9nom, nom et le type de contact de la personne."}),"\n",(0,r.jsxs)(n.p,{children:["Utilisez l'alias ",(0,r.jsx)(n.strong,{children:"ContactTypeName"})," pour le nom du type contact."]}),"\n",(0,r.jsx)(n.p,{children:"Vous devez faire une jointure entre 3 tables."}),"\n",(0,r.jsx)(n.p,{children:"Vous devriez avoir 909 lignes."}),"\n",(0,r.jsxs)(s,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT \r\n\tp.BusinessEntityID, \r\n\tp.FirstName, \r\n\tp.LastName, \r\n\tc.Name AS ContactName\r\nFROM Person.Person p\r\nINNER JOIN Person.BusinessEntityContact b ON p.BusinessEntityID = b.PersonID\r\nINNER JOIN Person.ContactType c ON b.ContactTypeID = c.ContactTypeID;\r\n\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-6",children:"Exercice 6"}),"\n",(0,r.jsx)(n.p,{children:"Refaites l'exercice pr\xe9c\xe9dent, mais si la personne n'a pas de type de contact, il faut tout de m\xeame afficher la ligne."}),"\n",(0,r.jsxs)(n.admonition,{type:"tip",children:[(0,r.jsx)(n.p,{children:"relire sur LEFT OUTER JOIN si n\xe9cessaire"}),(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://sql.sh/cours/jointures/left-join",children:"https://sql.sh/cours/jointures/left-join"})})]}),"\n",(0,r.jsxs)(n.p,{children:["Pour le nom du type de contact, affichez ",(0,r.jsx)(n.strong,{children:"Aucun type"})," lorsque la valeur est ",(0,r.jsx)(n.strong,{children:"null"}),"."]}),"\n",(0,r.jsx)(n.admonition,{type:"tip",children:(0,r.jsxs)(n.p,{children:["Utilisez ce site pour vous aider pour le ",(0,r.jsx)(n.strong,{children:"null"})," : ",(0,r.jsx)(n.a,{href:"https://sql.sh/fonctions/isnull",children:"https://sql.sh/fonctions/isnull"})]})}),"\n",(0,r.jsx)(n.p,{children:"Vous devriez avoir 19 972 lignes."}),"\n",(0,r.jsxs)(s,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT \r\n\tp.BusinessEntityID, \r\n\tp.FirstName, \r\n\tp.LastName, \r\n\tISNULL(c.Name, 'Aucun type') AS ContactName\r\nFROM Person.Person p\r\nLEFT OUTER JOIN Person.BusinessEntityContact b ON p.BusinessEntityID = b.PersonID\r\nLEFT OUTER JOIN Person.ContactType c ON b.ContactTypeID = c.ContactTypeID;\r\n\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-7",children:"Exercice 7"}),"\n",(0,r.jsx)(n.p,{children:"Fusionnez la requ\xeate 4 et 6 pour afficher le pr\xe9nom, nom, courriel et le type de contact de la personne."}),"\n",(0,r.jsx)(n.p,{children:"Vous devriez avoir 19 972 lignes."}),"\n",(0,r.jsxs)(s,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT \r\n\tp.BusinessEntityID, \r\n\tp.FirstName, \r\n\tp.LastName, \r\n\te.EmailAddress,\r\n\tISNULL(c.Name, 'Aucun type') AS ContactName\r\nFROM Person.Person p\r\nINNER JOIN Person.EmailAddress e ON P.BusinessEntityID = e.BusinessEntityID\r\nLEFT OUTER JOIN Person.BusinessEntityContact b ON p.BusinessEntityID = b.PersonID\r\nLEFT OUTER JOIN Person.ContactType c ON b.ContactTypeID = c.ContactTypeID;\r\n\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-8",children:"Exercice 8"}),"\n",(0,r.jsx)(n.p,{children:"Affichez toutes les personnes qui d\xe9sirent recevoir des courriels de promotion."}),"\n",(0,r.jsxs)(n.p,{children:["R\xe9f\xe9rez-vous au document ",(0,r.jsx)(n.strong,{children:"AdventureWorks_DataDictionary.pdf"})," pour avoir la description des champs de la table ",(0,r.jsx)(n.strong,{children:"Person"})," afin de savoir quelles valeurs sont utilis\xe9es pour indiquer qu'une personne d\xe9sire recevoir des courriels de promotion."]}),"\n",(0,r.jsx)(n.p,{children:"Vous devriez obtenir 8 814 lignes."}),"\n",(0,r.jsxs)(s,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT \r\n\tp.BusinessEntityID, \r\n\tp.FirstName, \r\n\tp.LastName,  \r\n\tp.EmailPromotion\r\nFROM Person.Person p\r\nWHERE \r\n\tp.EmailPromotion = 1 OR \r\n\tp.EmailPromotion = 2;\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-9",children:"Exercice 9"}),"\n",(0,r.jsx)(n.p,{children:"Affichez le nombre de personnes pour chacun des choix des courriels de promotion."}),"\n",(0,r.jsx)(n.p,{children:"La requ\xeate doit afficher le choix dans une colonne et le nombre de personnes dans la 2e."}),"\n",(0,r.jsxs)(n.p,{children:["Utilisez un alias pour renommer la colonne du nombre de personnes par ",(0,r.jsx)(n.strong,{children:"NbPersonne"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Triez par le nombre de personnes, en ordre croissant."}),"\n",(0,r.jsxs)(s,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT\r\n\tp.EmailPromotion,\r\n\tCOUNT(p.BusinessEntityID) AS NbPersonne\r\nFROM Person.Person p\r\nGROUP BY p.EmailPromotion\r\nORDER BY COUNT(p.BusinessEntityID);\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-10",children:"Exercice 10"}),"\n",(0,r.jsx)(n.p,{children:"Refaites la requ\xeate 9, mais au lieu d'afficher uniquement le chiffre du choix, nous allons mettre un descriptif."}),"\n",(0,r.jsxs)(n.admonition,{type:"tip",children:[(0,r.jsxs)(n.p,{children:["Il faudra utiliser un ",(0,r.jsx)(n.strong,{children:"CASE"})," dans le ",(0,r.jsx)(n.strong,{children:"SELECT"}),"."]}),(0,r.jsxs)(n.p,{children:["Voir le site : ",(0,r.jsx)(n.a,{href:"https://sql.sh/cours/case",children:"https://sql.sh/cours/case"})]})]}),"\n",(0,r.jsxs)(n.p,{children:["La colonne de description doit avoir comme alias ",(0,r.jsx)(n.strong,{children:"ChoixPromotion"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Le r\xe9sultat doit sortir comme ci-dessous."}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"EmailPromotion"}),(0,r.jsx)(n.th,{children:"ChoixPromotion"}),(0,r.jsx)(n.th,{children:"NbPersonne"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"0"}),(0,r.jsx)(n.td,{children:"Aucune"}),(0,r.jsx)(n.td,{})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"1"}),(0,r.jsx)(n.td,{children:"AdventureWorks seulement"}),(0,r.jsx)(n.td,{})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:"2"}),(0,r.jsx)(n.td,{children:"AdventureWorks et partenaires"}),(0,r.jsx)(n.td,{})]})]})]}),"\n",(0,r.jsxs)(s,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT\r\n\tp.EmailPromotion,\r\n\tCASE \r\n\t\tWHEN p.EmailPromotion = 0 THEN 'Aucune'\r\n\t\tWHEN p.EmailPromotion = 2 THEN 'AdventureWorks seulement'\r\n\t\tELSE 'AdventureWorks et partenaires'\r\n\tEND AS ChoixPromotion,\r\n\tCOUNT(p.BusinessEntityID) AS NbPersonne\r\nFROM Person.Person p\r\nGROUP BY p.EmailPromotion\r\nORDER BY COUNT(p.BusinessEntityID);\r\n\n"})})]}),"\n",(0,r.jsx)(n.h3,{id:"exercice-11",children:"Exercice 11"}),"\n",(0,r.jsx)(n.p,{children:"Affichez la cl\xe9, le pr\xe9nom, le nom, l'adresse, la province, le pays et le code postal de toutes les personnes."}),"\n",(0,r.jsx)(n.p,{children:"Vous devez afficher uniquement les personnes qui r\xe9pondent \xe0 l'un des 3 crit\xe8res ci-dessous :"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["La province est ",(0,r.jsx)(n.strong,{children:"Qu\xe9bec"})," et Code postal commence par ",(0,r.jsx)(n.strong,{children:"J4Z"})]}),"\n",(0,r.jsxs)(n.li,{children:["L'\xe9tat est ",(0,r.jsx)(n.strong,{children:"Californie"})," et leur nom de famille se termine par ",(0,r.jsx)(n.strong,{children:"S"})]}),"\n",(0,r.jsxs)(n.li,{children:["Leur pays est ",(0,r.jsx)(n.strong,{children:"Australie"})]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Vous devriez avoir 4 522 lignes."}),"\n",(0,r.jsxs)(s,{children:[(0,r.jsx)("summary",{children:"Solution"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sql",children:"SELECT \r\n\tp.BusinessEntityID,\r\n\tp.FirstName,\r\n\tp.LastName,\r\n\ta.AddressLine1,\r\n\ta.PostalCode,\r\n\ts.Name AS Province,\r\n\tc.Name AS Pays\r\nFROM Person.Person P\r\nINNER JOIN Person.BusinessEntity be ON p.BusinessEntityID = be.BusinessEntityID\r\nINNER JOIN Person.BusinessEntityAddress bea ON be.BusinessEntityID = bea.BusinessEntityID\r\nINNER JOIN Person.Address a ON bea.AddressID = a.AddressID\r\nINNER JOIN Person.StateProvince s ON a.StateProvinceID = s.StateProvinceID\r\nINNER JOIN Person.CountryRegion c ON c.CountryRegionCode = s.CountryRegionCode\r\nWHERE\r\n\t(\r\n\t\ta.PostalCode like 'J4Z%' AND\r\n\t\ts.StateProvinceCode = 'QC'\r\n\t) OR\r\n\t(\r\n\t\tp.LastName like '%s' AND\r\n\t\ts.StateProvinceCode = 'CA'\r\n\t) OR\r\n\tc.CountryRegionCode = 'AU';\n"})})]})]})}function u(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>l,a:()=>o});var r=s(7294);const i={},t=r.createContext(i);function o(e){const n=r.useContext(t);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(t.Provider,{value:n},e.children)}}}]);