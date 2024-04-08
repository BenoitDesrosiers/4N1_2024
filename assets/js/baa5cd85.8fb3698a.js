"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[5837],{3287:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>c,toc:()=>u});var r=n(5893),s=n(1151);const i={sidebar_position:470,draft:!1},a="Suppression d'une carte d'un utilisateur - Explication",c={id:"WPF partie 4/suppression_carte_utilisateur",title:"Suppression d'une carte d'un utilisateur - Explication",description:"Il n'est pas n\xe9cessaire de valider les d\xe9pendances pour cet enregistrement, car cette table n'est pas utilis\xe9e par une table enfant.",source:"@site/docs/76-WPF partie 4/suppression_carte_utilisateur.md",sourceDirName:"76-WPF partie 4",slug:"/WPF partie 4/suppression_carte_utilisateur",permalink:"/4N1_2024/docs/WPF partie 4/suppression_carte_utilisateur",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:470,frontMatter:{sidebar_position:470,draft:!1},sidebar:"NotesSidebar",previous:{title:"Menu et s\xe9curit\xe9",permalink:"/4N1_2024/docs/WPF partie 4/securite"},next:{title:"Introduction",permalink:"/4N1_2024/docs/Tests Unitaires/introduction"}},o={},u=[];function l(e){const t={code:"code",h1:"h1",p:"p",strong:"strong",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"suppression-dune-carte-dun-utilisateur---explication",children:"Suppression d'une carte d'un utilisateur - Explication"}),"\n",(0,r.jsx)(t.p,{children:"Il n'est pas n\xe9cessaire de valider les d\xe9pendances pour cet enregistrement, car cette table n'est pas utilis\xe9e par une table enfant."}),"\n",(0,r.jsxs)(t.p,{children:["Au niveau du ",(0,r.jsx)(t.strong,{children:"ViewModel"}),", il faut appeler le service directement lorsque l'utilisateur accepte la suppression. La disponibilit\xe9 de la commande d\xe9pend uniquement si une carte est s\xe9lectionn\xe9e dans la liste. Il faut envoyer ",(0,r.jsx)(t.strong,{children:"UtilisateurId"})," \xe0 partir de la classe ",(0,r.jsx)(t.strong,{children:"Authentificateur"})," et ",(0,r.jsx)(t.strong,{children:"CarteId"})," \xe0 partir de la carte s\xe9lectionn\xe9e."]}),"\n",(0,r.jsxs)(t.p,{children:["Au niveau du ",(0,r.jsx)(t.strong,{children:"Service"}),", il faut r\xe9cup\xe9rer l'enregistrement ",(0,r.jsx)(t.strong,{children:"UtilisateurCarte"})," \xe0 partir de ses cl\xe9s. Si l'enregistrement existe, il faut le supprimer avec le ",(0,r.jsx)(t.strong,{children:"Repository"}),". S'il n'existe pas, il faut g\xe9n\xe9rer une exception. Il n'est pas n\xe9cessaire de cr\xe9er la classe ",(0,r.jsx)(t.strong,{children:"UtilisateurCarteDependance"}),", car il n'y en a aucune."]}),"\n",(0,r.jsxs)(t.p,{children:["Au niveau du ",(0,r.jsx)(t.strong,{children:"Repository"}),", il faut ajouter la m\xe9thode ",(0,r.jsx)(t.strong,{children:(0,r.jsx)(t.code,{children:"ObtenirParCle"})}),". Cette m\xe9thode ne provient pas de la classe parent, car c'est une cl\xe9 primaire compos\xe9e. Cette m\xe9thode sera cr\xe9\xe9e dans le prochain document, car elle sera n\xe9cessaire pour la gestion."]})]})}function d(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>c,a:()=>a});var r=n(7294);const s={},i=r.createContext(s);function a(e){const t=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),r.createElement(i.Provider,{value:t},e.children)}}}]);