"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[7048],{958:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>l,frontMatter:()=>o,metadata:()=>i,toc:()=>a});var s=r(5893),t=r(1151);const o={sidebar_position:5},c="Proc\xe9dure stock\xe9e",i={id:"R\xe9vision SQL/procedures_stockees",title:"Proc\xe9dure stock\xe9e",description:"Une proc\xe9dure stock\xe9e est un bloc de code qui contient une s\xe9rie d'instructions en T-SQL ou SQL.",source:"@site/docs/01-R\xe9vision SQL/procedures_stockees.md",sourceDirName:"01-R\xe9vision SQL",slug:"/R\xe9vision SQL/procedures_stockees",permalink:"/4N1_2024/docs/R\xe9vision SQL/procedures_stockees",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"NotesSidebar",previous:{title:"Exercices AdventureWorks2019",permalink:"/4N1_2024/docs/R\xe9vision SQL/exercice_AdventureWorks2019"},next:{title:"Transaction",permalink:"/4N1_2024/docs/R\xe9vision SQL/transaction"}},d={},a=[{value:"Cr\xe9ation d&#39;une proc\xe9dure stock\xe9e",id:"cr\xe9ation-dune-proc\xe9dure-stock\xe9e",level:2},{value:"Ex\xe9cution",id:"ex\xe9cution",level:2},{value:"Exemple",id:"exemple",level:3}];function u(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"proc\xe9dure-stock\xe9e",children:"Proc\xe9dure stock\xe9e"}),"\n",(0,s.jsxs)(n.p,{children:["Une proc\xe9dure stock\xe9e est un bloc de code qui contient une s\xe9rie d'instructions en ",(0,s.jsx)(n.strong,{children:"T-SQL"})," ou ",(0,s.jsx)(n.strong,{children:"SQL"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"Elle est enregistr\xe9e dans la base de donn\xe9es."}),"\n",(0,s.jsx)(n.p,{children:"Elle permet d'avoir acc\xe8s \xe0 des scripts en tout temps dans la base de donn\xe9es."}),"\n",(0,s.jsx)(n.p,{children:"Une proc\xe9dure stock\xe9e peut modifier la base de donn\xe9es."}),"\n",(0,s.jsx)(n.p,{children:"Une proc\xe9dure stock\xe9e peut recevoir des param\xe8tres d'entr\xe9e et elle peut retourner des valeurs."}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["Pour en savoir plus: ",(0,s.jsx)(n.a,{href:"https://sql.sh/cours/procedure-stockee",children:"https://sql.sh/cours/procedure-stockee"})]})}),"\n",(0,s.jsx)(n.h2,{id:"cr\xe9ation-dune-proc\xe9dure-stock\xe9e",children:"Cr\xe9ation d'une proc\xe9dure stock\xe9e"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"CREATE PROCEDURE nomProc\xe9dure\r\n\t@parametre1 type = valeur par d\xe9faut,\r\n\t@parametre2 type\r\nAS\r\n\tSET NOCOUNT ON\r\n\t--Votre code\r\nGO\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Par d\xe9faut, une proc\xe9dure stock\xe9e retourne le nombre de lignes trait\xe9es dans son ex\xe9cution. La commande ",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"SET NOCOUNT ON;"})})," permet de d\xe9sactiver ceci."]}),"\n",(0,s.jsxs)(n.p,{children:["Le nom de la proc\xe9dure doit \xeatre significatif \xe0 son utilit\xe9. Elle doit \xeatre en ",(0,s.jsx)(n.strong,{children:"camelCase"}),"."]}),"\n",(0,s.jsx)(n.admonition,{title:"ATTENTION",type:"danger",children:(0,s.jsxs)(n.p,{children:["Le pr\xe9fixe ",(0,s.jsx)(n.strong,{children:"sp_"})," ne doit pas \xeatre utilis\xe9, car ce sont les proc\xe9dures int\xe9gr\xe9es \xe0 SQL Server qui commencent par ce pr\xe9fixe."]})}),"\n",(0,s.jsx)(n.h2,{id:"ex\xe9cution",children:"Ex\xe9cution"}),"\n",(0,s.jsx)(n.p,{children:"Pour ex\xe9cuter une proc\xe9dure stock\xe9e, il faut utiliser la syntaxe ci-dessous."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"exec nomProcedure parametre1, parametre2\n"})}),"\n",(0,s.jsx)(n.h3,{id:"exemple",children:"Exemple"}),"\n",(0,s.jsxs)(n.p,{children:["Dans la base de donn\xe9es ",(0,s.jsx)(n.strong,{children:"AdventureWorks2019"}),", cr\xe9ez une proc\xe9dure stock\xe9e qui supprime tous les logs de la BD qui appartient au sch\xe9ma demand\xe9 en param\xe8tre, et qui ajoute un log pour indiquer la suppression."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sql",children:"IF OBJECT_ID('supprimeDatabaseLog', 'P') IS NOT NULL \r\n\tDROP PROCEDURE supprimeDatabaseLog;\r\nGO\r\n\r\nCREATE PROCEDURE supprimeDatabaseLog\r\n\t@schema VARCHAR(20)\r\nAS\r\n\tDELETE DatabaseLog WHERE [Schema] = @schema;\r\n\r\n\tINSERT INTO DatabaseLog(PostTime, DatabaseUser, [Event], [Schema], [Object], [TSQL], XmlEvent)\r\n\tVALUES (GetDate(), 'dbo', Concat('Suppression des logs du sch\xe9ma ', @schema), '', 'DatabaseLog', '', '');\r\nGO\n"})})]})}function l(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>i,a:()=>c});var s=r(7294);const t={},o=s.createContext(t);function c(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:c(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);