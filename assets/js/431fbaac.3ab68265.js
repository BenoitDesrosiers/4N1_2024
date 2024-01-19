"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[640],{8386:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>d,contentTitle:()=>t,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>a});var r=n(5893),i=n(1151);const l={sidebar_position:90},t="R\xe9sum\xe9 du processus",o={id:"WPF/wpf_resume",title:"R\xe9sum\xe9 du processus",description:"Cette section vous donne un r\xe9sum\xe9 des \xe9tapes \xe0 faire pour cr\xe9er un projet WPF tel que d\xe9montr\xe9 dans le cours.",source:"@site/docs/70-WPF/wpf_resume.md",sourceDirName:"70-WPF",slug:"/WPF/wpf_resume",permalink:"/4N1_2024/docs/WPF/wpf_resume",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:90,frontMatter:{sidebar_position:90},sidebar:"NotesSidebar",previous:{title:"SuperCarte.WPF",permalink:"/4N1_2024/docs/WPF/supercarte_wpf"},next:{title:"Introduction",permalink:"/4N1_2024/docs/WPF partie 2/wpf2_xaml"}},d={},a=[{value:"Les \xe9tapes:",id:"les-\xe9tapes",level:2},{value:"Base de donn\xe9es (EF)",id:"base-de-donn\xe9es-ef",level:3},{value:"Core",id:"core",level:3},{value:"WPF",id:"wpf",level:3}];function c(e){const s={h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s.h1,{id:"r\xe9sum\xe9-du-processus",children:"R\xe9sum\xe9 du processus"}),"\n",(0,r.jsx)(s.p,{children:"Cette section vous donne un r\xe9sum\xe9 des \xe9tapes \xe0 faire pour cr\xe9er un projet WPF tel que d\xe9montr\xe9 dans le cours.\r\nVeuillez vous r\xe9f\xe9rer aux notes de cours pour les d\xe9tails."}),"\n",(0,r.jsx)(s.h2,{id:"les-\xe9tapes",children:"Les \xe9tapes:"}),"\n",(0,r.jsx)(s.h3,{id:"base-de-donn\xe9es-ef",children:"Base de donn\xe9es (EF)"}),"\n",(0,r.jsx)(s.p,{children:"Le projet EF contient la structure de la base de donn\xe9es : les mod\xe8les de donn\xe9es, DbSet, migrations, et seeders."}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["Cr\xe9er un nouveau projet et lui donner le suffixe .EF","\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Le type de ce projet est Biblioth\xe8que de classe"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(s.li,{children:"Cr\xe9er le r\xe9pertoire Data"}),"\n",(0,r.jsx)(s.li,{children:"Cr\xe9er une classe pour chaque entit\xe9 du D\xc9A (les mod\xe8les de donn\xe9es)"}),"\n",(0,r.jsx)(s.li,{children:"Cr\xe9er le r\xe9pertoire Data/Context"}),"\n",(0,r.jsx)(s.li,{children:"Cr\xe9er une classe pour le contexte (NomDuProjetContext.cs)"}),"\n",(0,r.jsxs)(s.li,{children:["Cr\xe9er les DbSet pour chacune des entit\xe9","\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"un DbSet cr\xe9er une liaison entre les classes du mod\xe8le de donn\xe9es et les tables dans la bd"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(s.li,{children:["Cr\xe9er les migrations","\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Add-Migration [nom migration] -StartupProject [Nom Projet Entity Framework]"}),"\n",(0,r.jsx)(s.li,{children:"Les migrations, en mode Code First, sont bas\xe9es sur les changements faits dans les mod\xe8les et dans le contexte"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(s.li,{children:["Synchroniser les migrations \xe0 la bd","\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Update-Database -StartupProject [Nom Projet Entity Framework] -Migration [Nom migration]"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(s.li,{children:["Si n\xe9cessaire, faire les corrections au contexte dans OnModelCreating afin de pr\xe9ciser des d\xe9tails de la bd","\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Faire les changements"}),"\n",(0,r.jsx)(s.li,{children:"Cr\xe9er et appliquer la migration"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(s.li,{children:"Si n\xe9cessaire, ajouter des seeders afin de populer la bd avec les donn\xe9es de bases"}),"\n"]}),"\n",(0,r.jsx)(s.h3,{id:"core",children:"Core"}),"\n",(0,r.jsx)(s.p,{children:"Le projet Core contient les Services, les Repository, les Validateur, ainsi que les mod\xe8les du domaine."}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["Cr\xe9er un nouveau projet et lui donner le suffixe .Core","\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Ce projet est dans la m\xeame solution que le projet .EF"}),"\n",(0,r.jsx)(s.li,{children:"Le type de ce projet est Biblioth\xe8que de classe"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(s.li,{children:"Ajouter la d\xe9pendance au projet EF"}),"\n",(0,r.jsx)(s.li,{children:"Cr\xe9er les r\xe9pertoires Repositories, Services, Validateurs, Extensions, et Models"}),"\n",(0,r.jsx)(s.li,{children:"Cr\xe9er le r\xe9pertoire Repositories/Bases"}),"\n",(0,r.jsx)(s.li,{children:"Cr\xe9er l'interface de base pour les repositories (Repositories/Bases/IBaseRepo.cs)"}),"\n",(0,r.jsxs)(s.li,{children:["Cr\xe9er les classe Repositories/Bases/BaseRepo.cs pour les requ\xeates de base,  et BasePKUniqueRepo pour les requ\xeates utilisant la cl\xe9 primaire.","\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Classes g\xe9n\xe9riques contenant la base pour toutes les m\xe9thodes qui devront \xeatre implant\xe9es dans les repositories"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(s.li,{children:["Cr\xe9er les repositories pour chacune des classes du mod\xe8le du domaine.","\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Ces classes font le lien entre les classes du domaine et les classes de donn\xe9es dans EF."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(s.h3,{id:"wpf",children:"WPF"}),"\n",(0,r.jsx)(s.p,{children:"Le projet WPF contient l'interface usag\xe9 du projet."}),"\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsxs)(s.li,{children:["Cr\xe9er un nouveau projet et lui donner le suffixe .WPF","\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Ce projet est dans la m\xeame solution que les projet .EF et .Core"}),"\n",(0,r.jsx)(s.li,{children:"Le type de ce projet est Application WPF"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(s.li,{children:"D\xe9finir ce projet  en tant que projet de d\xe9marrage"}),"\n",(0,r.jsx)(s.li,{children:"Ajouter les d\xe9pendances vers EF et Core"}),"\n",(0,r.jsx)(s.li,{children:"D\xe9clar\xe9 les using globaux"}),"\n",(0,r.jsxs)(s.li,{children:["Ajout\xe9 les packages n\xe9cessaires","\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Install-Package Microsoft.Extensions.Configuration.Json"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(s.li,{children:"Cr\xe9er appsettings.json et ajouter la connexion \xe0 la bd."}),"\n",(0,r.jsx)(s.li,{children:"Cr\xe9er les classes d'extensions afin d'enregistrer les services"}),"\n",(0,r.jsxs)(s.li,{children:["Ajouter le hosting","\n",(0,r.jsxs)(s.ul,{children:["\n",(0,r.jsx)(s.li,{children:"Install-Package Microsoft.Extensions.Hosting"}),"\n",(0,r.jsx)(s.li,{children:"configurer App.xaml.cs"}),"\n"]}),"\n"]}),"\n"]})]})}function u(e={}){const{wrapper:s}={...(0,i.a)(),...e.components};return s?(0,r.jsx)(s,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},1151:(e,s,n)=>{n.d(s,{Z:()=>o,a:()=>t});var r=n(7294);const i={},l=r.createContext(i);function t(e){const s=r.useContext(l);return r.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function o(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),r.createElement(l.Provider,{value:s},e.children)}}}]);