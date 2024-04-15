"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[9225],{3580:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var t=n(5893),i=n(1151);const a={sidebar_position:330,draft:!1},o="Chargement automatique",s={id:"WPF partie 3/chargement_initial",title:"Chargement automatique",description:"Pour une vue de gestion, il arrive souvent que le chargement initial s'effectue en synchrone.",source:"@site/docs/74-WPF partie 3/chargement_initial.md",sourceDirName:"74-WPF partie 3",slug:"/WPF partie 3/chargement_initial",permalink:"/4N1_2024/docs/WPF partie 3/chargement_initial",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:330,frontMatter:{sidebar_position:330,draft:!1},sidebar:"NotesSidebar",previous:{title:"Navigation et param\xe8tres",permalink:"/4N1_2024/docs/WPF partie 3/navigation"},next:{title:"Validation",permalink:"/4N1_2024/docs/WPF partie 3/validation"}},l={},c=[{value:"SuperCarte.Core",id:"supercartecore",level:2},{value:"Ajout de la m\xe9thode Obtenir en synchrone dans le service - CategorieService",id:"ajout-de-la-m\xe9thode-obtenir-en-synchrone-dans-le-service---categorieservice",level:3},{value:"SuperCarte.WPF",id:"supercartewpf",level:2},{value:"Modification du ViewModel - GestionCategorieVM",id:"modification-du-viewmodel---gestioncategorievm",level:3}];function d(e){const r={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.h1,{id:"chargement-automatique",children:"Chargement automatique"}),"\n",(0,t.jsxs)(r.p,{children:["Pour une vue de gestion, il arrive souvent que le chargement initial s'effectue en ",(0,t.jsx)(r.strong,{children:"synchrone"}),"."]}),"\n",(0,t.jsx)(r.p,{children:"Si le chargement synchrone est long, il ne faut pas avoir un formulaire vide pendant ce chargement. Il est pr\xe9f\xe9rable d'attendre le chargement initial avant d'afficher la vue."}),"\n",(0,t.jsxs)(r.p,{children:["Il serait aussi possible de faire le chargement en asynchrone et de de verrouiller le formulaire au d\xe9part afin d'\xe9viter la modification. Mais m\xeame si le d\xe9lai n'est pas \xe9norme, il est possible de voir un ",(0,t.jsx)(r.strong,{children:"clignotement"})," entre champ vide et l'affichage des valeurs."]}),"\n",(0,t.jsx)(r.admonition,{type:"note",children:(0,t.jsxs)(r.p,{children:["Pour ce projet et le ",(0,t.jsx)(r.strong,{children:"TP 3"}),", le chargement automatique se fera en ",(0,t.jsx)(r.strong,{children:"synchrone"}),". \xc9galement, il est id\xe9al que ce soit le ",(0,t.jsx)(r.strong,{children:"ViewModel"})," qui g\xe8re le chargement automatique lorsqu'il re\xe7oit le param\xe8tre de la cl\xe9 primaire."]})}),"\n",(0,t.jsxs)(r.p,{children:["Le chargement se fera lors de l'assignation des param\xe8tres du ",(0,t.jsx)(r.strong,{children:"ViewModel"})," dans ",(0,t.jsx)(r.strong,{children:"AssignerParametre"}),"."]}),"\n",(0,t.jsx)(r.h2,{id:"supercartecore",children:"SuperCarte.Core"}),"\n",(0,t.jsx)(r.h3,{id:"ajout-de-la-m\xe9thode-obtenir-en-synchrone-dans-le-service---categorieservice",children:"Ajout de la m\xe9thode Obtenir en synchrone dans le service - CategorieService"}),"\n",(0,t.jsxs)(r.p,{children:["Dans ",(0,t.jsx)(r.strong,{children:"CategorieService"}),", il y a d\xe9j\xe0 une m\xe9thode pour charger de facon asynchrone (",(0,t.jsx)(r.strong,{children:"ObtenirAsync()"})," ). Nous allons ici ajouter son \xe9quivalent synchrone."]}),"\n",(0,t.jsxs)(r.p,{children:["Dans l'interface ",(0,t.jsx)(r.strong,{children:"ICategorieService"}),", il faut ajouter la signature de la m\xe9thode ci-dessous. Ajouter ce code \xe0 la fin."]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:'/// <summary>\r\n/// Obtenir une cat\xe9gorie \xe0 partir de sa cl\xe9 primaire.\r\n/// </summary>\r\n/// <param name="categorieId">Cl\xe9 primaire de la cat\xe9gorie</param>\r\n/// <returns>La cat\xe9gorie ou null si la cat\xe9gorie n\'est pas trouv\xe9e</returns>\r\nCategorieModel? Obtenir(int categorieId);\n'})}),"\n",(0,t.jsxs)(r.p,{children:["Dans la classe ",(0,t.jsx)(r.strong,{children:"CategorieService"}),", il faut ajouter l'impl\xe9mentation de la m\xe9thode."]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:"public CategorieModel? Obtenir(int categorieId)\r\n{\r\n    Categorie? categorie = _categorieRepo.ObtenirParCle(categorieId);\r\n\r\n    //Le ?. est important, car si la cat\xe9gorie n'est pas trouv\xe9e, l'objet sera null\r\n    return categorie?.VersCategorieModel();\r\n}\n"})}),"\n",(0,t.jsx)(r.admonition,{type:"note",children:(0,t.jsxs)(r.p,{children:["Cette nouvelle m\xe9thode est une copie de sa version asynchrone, \xe0 part le fait qu'elle appel ",(0,t.jsx)(r.strong,{children:"ObtenirParCle"})," au lieu de ",(0,t.jsx)(r.strong,{children:"ObtenirParCleAsync"}),"."]})}),"\n",(0,t.jsx)(r.h2,{id:"supercartewpf",children:"SuperCarte.WPF"}),"\n",(0,t.jsx)(r.h3,{id:"modification-du-viewmodel---gestioncategorievm",children:"Modification du ViewModel - GestionCategorieVM"}),"\n",(0,t.jsxs)(r.p,{children:["Il faut mettre \xe0 jour la m\xe9thode ",(0,t.jsx)(r.strong,{children:"AssignerParametre"})," dans la classe ",(0,t.jsx)(r.strong,{children:"GestionCategorieVM"})," pour appeler la m\xe9thode ",(0,t.jsx)(r.strong,{children:"synchrone"})," pour obtenir la cat\xe9gorie."]}),"\n",(0,t.jsx)(r.pre,{children:(0,t.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:"public override void AssignerParametre(int parametre)\r\n{\r\n    CategorieId = parametre;\r\n\r\n    CategorieModel? categorieModel = _categorieService.Obtenir(CategorieId);\r\n\r\n    VersVM(categorieModel);\r\n}\n"})}),"\n",(0,t.jsx)(r.p,{children:"Si vous r\xe9essayer d'\xe9diter, cette fois-ci la cat\xe9gorie s'affichera automatiquement."})]})}function u(e={}){const{wrapper:r}={...(0,i.a)(),...e.components};return r?(0,t.jsx)(r,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,r,n)=>{n.d(r,{Z:()=>s,a:()=>o});var t=n(7294);const i={},a=t.createContext(i);function o(e){const r=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function s(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(a.Provider,{value:r},e.children)}}}]);