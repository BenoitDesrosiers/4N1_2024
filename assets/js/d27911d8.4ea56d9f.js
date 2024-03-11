"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[967],{2799:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var s=n(5893),t=n(1151);const o={sidebar_position:190,draft:!1},i="R\xe9sum\xe9 du code",a={id:"WPF partie 1/wpf_resume",title:"R\xe9sum\xe9 du code",description:"Cette section vous donne un r\xe9sum\xe9 des \xe9tapes \xe0 faire pour cr\xe9er un projet WPF tel que d\xe9montr\xe9 dans le cours.",source:"@site/docs/70-WPF partie 1/wpf_resume.md",sourceDirName:"70-WPF partie 1",slug:"/WPF partie 1/wpf_resume",permalink:"/4N1_2024/docs/WPF partie 1/wpf_resume",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:190,frontMatter:{sidebar_position:190,draft:!1},sidebar:"NotesSidebar",previous:{title:"SuperCarte.WPF",permalink:"/4N1_2024/docs/WPF partie 1/supercarte_wpf"},next:{title:"Planification",permalink:"/4N1_2024/docs/Enseignant/a_planning"}},l={},c=[{value:"Les \xe9tapes:",id:"les-\xe9tapes",level:2},{value:"Base de donn\xe9es (EF)",id:"base-de-donn\xe9es-ef",level:3},{value:"Core",id:"core",level:3},{value:"WPF",id:"wpf",level:3}];function d(e){const r={a:"a",h1:"h1",h2:"h2",h3:"h3",li:"li",mermaid:"mermaid",p:"p",ul:"ul",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.h1,{id:"r\xe9sum\xe9-du-code",children:"R\xe9sum\xe9 du code"}),"\n",(0,s.jsx)(r.p,{children:"Cette section vous donne un r\xe9sum\xe9 des \xe9tapes \xe0 faire pour cr\xe9er un projet WPF tel que d\xe9montr\xe9 dans le cours.\r\nVeuillez vous r\xe9f\xe9rer aux notes de cours pour les d\xe9tails."}),"\n",(0,s.jsx)(r.h2,{id:"les-\xe9tapes",children:"Les \xe9tapes:"}),"\n",(0,s.jsx)(r.mermaid,{value:"sequenceDiagram\r\n    title R\xe9sum\xe9 WPF Partie 1\r\n    actor prog as Programmeur\r\n    \r\n    box  Projet.EF<br>Biblioth\xe8que de classes\r\n    participant ef_context as Data/Context<br>ProjetContext.cs\r\n    participant ef_classe as classes\r\n    end\r\n    note over prog: _________EF_________\r\n    prog->>ef_classe: cr\xe9ation des classes\r\n    note over ef_classe: ajouter une classe<br>pour chaque entit\xe9\r\n    prog->>ef_context: cr\xe9ation du context\r\n    note over ef_context: 1 DbSet par table<br>OnConfiguring<br>MIGRATION_CONNECTION_STRING\r\n    participant cgp as Console<br>Gestionnaire<br>package\r\n    prog->>ef_classe: modifier les classes\r\n    note over ef_classe: ajout de champs<br>propri\xe9t\xe9s de navigation<br>type de champs<br>contraintes...\r\n    prog->>ef_context: modifier le context\r\n    note over ef_context: nom de table<br>contraintes<br>cl\xe9 primaire compos\xe9e<br>ON DELETE ON UPDATE,...\r\n    prog->>ef_context: ajout des seeders dans le context<br>private void Seed()\r\n    prog->>cgp: Add-Migration [nom migration] -StartupProject [Nom Projet Entity Framework]\r\n    prog->>cgp: Update-Database -StartupProject [Nom Projet Entity Framework] -Migration [Nom migration]\r\n\r\n\r\n    note over prog: _______Core________\r\n    box  Projet.Core<br>Biblioth\xe8que de classes\r\n    participant core_model as Models\r\n    participant core_repo as Repositories\r\n    participant core_serv as Services\r\n    end\r\n    note over prog: ajouter d\xe9pendances<br>de EF dans Core\r\n    prog->>core_repo:cr\xe9ation de Repositories/IBaseRepo et BaseRepo\r\n    note over core_repo: ObtenirListe<br>Ajouter<br>Supprimer<br>Enregistrer\r\n    prog->>core_repo:cr\xe9ation de IBasePKUniqueRepo/BasePKUniqueRepo\r\n    note over core_repo: M\xe9thodes sp\xe9cifiques pour<br>cl\xe9 primaire unique\r\n    prog->>core_repo: cr\xe9ation des repo pour chaque classe\r\n    note over core_repo: h\xe9rite de BaseRepo ou de BasePKUniqueRepo\r\n\r\n    note over prog:________WPF________\r\n    box Projet.WPF<br>Application WPF<br>projet de d\xe9marrage\r\n    participant wpf_app as App.xaml.cs \r\n    participant wpf_serv as Extensions\\<br>Services\r\n    end\r\n    note over prog: ajouter d\xe9pendances<br>de EF et Core dans WPF\r\n    note over prog: ajouter Usings.cs\r\n    prog->>cgp:Install-Package Microsoft.Extensions.Configuration.Json\r\n    note over prog: ajouter appsettings.json<br>pour la chaine de connexion\r\n    prog->>wpf_serv:enregistrer les repositories dans les services\r\n    prog->>cgp:Install-Package Microsoft.Extensions.Hosting\r\n    prog->>wpf_app:cr\xe9ation de App.xaml.cs\r\n    note over wpf_app:enregistrement de MainWindow<br>du DbContext<br>des services\r\n    note over wpf_app:OnStartup<br>affichage fen\xeatre initiale\r\n\r\n\r\n"}),"\n",(0,s.jsxs)(r.p,{children:["Ce diagramme sur ",(0,s.jsx)(r.a,{href:"https://kroki.io/mermaid/svg/eNqlVttu4zYQffdXzGML1A721SgCZGM563Z9QZxgH7aLgJbGNrMSyZKU4_2jur-hH-sMadnyLZugfrAocnjmzOHMUA7_LlGl2JNiYUXRAvp56XOE-2rjyqLawJdJHybCeonwoRUMROq1BWP1AoSDCT1pa4GlDavhb6bXwCvP6DtJ__eZvf4oZ7nUfln9Qx4hQ0hz4Ry6YG4YP5VGKA84f0q18rj2jN4TXlzdxneGiZjbiU56fntA5t1NH6iy8FTaI-gVxgi68FT_kv5uGFFpuX19vQPsQmqrjfBSK-J_CL4HbZiLZ116mipVHS1HYHRpIV0KlgEViV1tjt3F6A78lbCdPeOuNv8AvdkUPcsBXszy4G6sSKy5XJRWqgVPDAd39zcPg_Ho6XY8GiW3YTh9uB-M7k7ETBeGZSQEpyPcHTompIS0MRqRfhcLvCBYoTM5l0Qzf7NeITWWojAuwFttrKw2JJLjFSVWchEk4VX_w-ChPWthhSRBXKfTuaRrg9YbZFW6YCc7RRs-wmtORUIkC5aE4AqjXbWJ2o-gl3xOHhKg0eOkd_OQ_PYKrTp-Bw4xQ0sRC-UaJKMiciWI5krLDKZk98uvTTw6sS7cZFl7KKkqQ-585QCK-vUbtKeejrg0oZRSD19HtB7rChJOyB_Qp4LGF22_fzvBfjQZuW9zXc4EVdm70KBJa3RAq9V6rTpvtcWD4mw2GF58V4tJGY2SAHPO7iEPLhhZNJpt7unpJLU9eQnOoV2x5ZSeMv1Jz6k7Q1ZtDNkI6sAhl4hz0o-nzkEdiF_T6Ta70AGxq8FHOhGeARK_Hh8R2OPAeOZRSftZOh_0u4mseDgtDad0fEmUxQUZWbRvYBRITP58VJJOgQlcHU9cZjSkSl_qUAGm2qRUpLTFAbfM01IrA-B5RketOhxjs_HGzLhMZFltrPQhiXaa6rJ-PQjm3AHXqUp350nWbpOWloLmxuQyjUy3UyYWD_mi9CiEtbv-2si5FzN_EiZ0Z4LorEWR020IZ-3q1EzWdN6OPLm_whn__0wlmpynMWOJ_qsQj45uILe7s_c9ZaCcF3nensS7BIYytdrpOX067Bh36lssSNX5w2n1qjPSxqH3weOzi9dFSIBccA5IFRsE3WS4llusLaVasi7u8z5cYLZRa3Vr5l7dkPG9UX3Sjjkeuyf2h0XVOOOjsGvzPdmCvip4z5Ci_CJVpl_CgZX0ddD4kMqOqZ9CjtW2t7O9mM8lCUeBzFFV_5IfkEp6KXJstf4Dw8-h2A",children:"Kroki!"})]}),"\n",(0,s.jsx)(r.h3,{id:"base-de-donn\xe9es-ef",children:"Base de donn\xe9es (EF)"}),"\n",(0,s.jsx)(r.p,{children:"Le projet EF contient la structure de la base de donn\xe9es : les mod\xe8les de donn\xe9es, DbSet, migrations, et seeders."}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:["Cr\xe9er un nouveau projet et lui donner le suffixe .EF","\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:"Le type de ce projet est Biblioth\xe8que de classe"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(r.li,{children:"Cr\xe9er le r\xe9pertoire Data"}),"\n",(0,s.jsx)(r.li,{children:"Cr\xe9er une classe pour chaque entit\xe9 du D\xc9A (les mod\xe8les de donn\xe9es)"}),"\n",(0,s.jsx)(r.li,{children:"Cr\xe9er le r\xe9pertoire Data/Context"}),"\n",(0,s.jsx)(r.li,{children:"Cr\xe9er une classe pour le contexte (NomDuProjetContext.cs)"}),"\n",(0,s.jsxs)(r.li,{children:["Cr\xe9er les DbSet pour chacune des entit\xe9","\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:"un DbSet cr\xe9e une liaison entre les classes du mod\xe8le de donn\xe9es et les tables dans la bd"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(r.li,{children:["Cr\xe9er les migrations","\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:"Add-Migration [nom migration] -StartupProject [Nom Projet Entity Framework]"}),"\n",(0,s.jsx)(r.li,{children:"Les migrations, en mode Code First, sont bas\xe9es sur les changements faits dans les mod\xe8les et dans le contexte"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(r.li,{children:["Synchroniser les migrations \xe0 la bd","\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:"Update-Database -StartupProject [Nom Projet Entity Framework] -Migration [Nom migration]"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(r.li,{children:["Si n\xe9cessaire, faire les corrections au contexte dans OnModelCreating afin de pr\xe9ciser des d\xe9tails de la bd","\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:"Faire les changements"}),"\n",(0,s.jsx)(r.li,{children:"Cr\xe9er et appliquer la migration"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(r.li,{children:"Si n\xe9cessaire, ajouter des seeders afin de populer la bd avec les donn\xe9es de bases"}),"\n"]}),"\n",(0,s.jsx)(r.h3,{id:"core",children:"Core"}),"\n",(0,s.jsx)(r.p,{children:"Le projet Core contient les Services, les Repository, les Validateur, ainsi que les mod\xe8les du domaine."}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:["Cr\xe9er un nouveau projet et lui donner le suffixe .Core","\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:"Ce projet est dans la m\xeame solution que le projet .EF"}),"\n",(0,s.jsx)(r.li,{children:"Le type de ce projet est Biblioth\xe8que de classe"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(r.li,{children:"Ajouter la d\xe9pendance au projet EF"}),"\n",(0,s.jsx)(r.li,{children:"Cr\xe9er les r\xe9pertoires Repositories, Services, Validateurs, Extensions, et Models"}),"\n",(0,s.jsx)(r.li,{children:"Cr\xe9er le r\xe9pertoire Repositories/Bases"}),"\n",(0,s.jsx)(r.li,{children:"Cr\xe9er l'interface de base pour les repositories (Repositories/Bases/IBaseRepo.cs)"}),"\n",(0,s.jsxs)(r.li,{children:["Cr\xe9er les classe Repositories/Bases/BaseRepo.cs pour les requ\xeates de base,  et BasePKUniqueRepo pour les requ\xeates utilisant la cl\xe9 primaire.","\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:"Classes g\xe9n\xe9riques contenant la base pour toutes les m\xe9thodes qui devront \xeatre implant\xe9es dans les repositories"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(r.li,{children:["Cr\xe9er les repositories pour chacune des classes du mod\xe8le du domaine.","\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:"Ces classes font le lien entre les classes du domaine et les classes de donn\xe9es dans EF."}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(r.h3,{id:"wpf",children:"WPF"}),"\n",(0,s.jsx)(r.p,{children:"Le projet WPF contient l'interface usag\xe9 du projet."}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:["Cr\xe9er un nouveau projet et lui donner le suffixe .WPF","\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:"Ce projet est dans la m\xeame solution que les projet .EF et .Core"}),"\n",(0,s.jsx)(r.li,{children:"Le type de ce projet est Application WPF"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(r.li,{children:"D\xe9finir ce projet  en tant que projet de d\xe9marrage"}),"\n",(0,s.jsx)(r.li,{children:"Ajouter les d\xe9pendances vers EF et Core"}),"\n",(0,s.jsx)(r.li,{children:"D\xe9clar\xe9 les using globaux"}),"\n",(0,s.jsxs)(r.li,{children:["Ajout\xe9 les packages n\xe9cessaires","\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:"Install-Package Microsoft.Extensions.Configuration.Json"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(r.li,{children:"Cr\xe9er appsettings.json et ajouter la connexion \xe0 la bd."}),"\n",(0,s.jsx)(r.li,{children:"Cr\xe9er les classes d'extensions afin d'enregistrer les services"}),"\n",(0,s.jsxs)(r.li,{children:["Ajouter le hosting","\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:"Install-Package Microsoft.Extensions.Hosting"}),"\n",(0,s.jsx)(r.li,{children:"configurer App.xaml.cs"}),"\n"]}),"\n"]}),"\n"]})]})}function p(e={}){const{wrapper:r}={...(0,t.a)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,r,n)=>{n.d(r,{Z:()=>a,a:()=>i});var s=n(7294);const t={},o=s.createContext(t);function i(e){const r=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),s.createElement(o.Provider,{value:r},e.children)}}}]);