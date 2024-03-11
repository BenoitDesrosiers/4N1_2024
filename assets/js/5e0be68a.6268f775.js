"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[2330],{1087:(e,s,n)=>{n.r(s),n.d(s,{assets:()=>a,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var i=n(5893),t=n(1151);const r={sidebar_position:210,draft:!1},o="XAML et MVVM Introduction",l={id:"WPF partie 2/intro_xaml",title:"XAML et MVVM Introduction",description:"Dans ce document,  l'application aura ses premi\xe8res interfaces visuelles. Les interfaces seront des listes d'\xe9l\xe9ments.",source:"@site/docs/72-WPF partie 2/intro_xaml.md",sourceDirName:"72-WPF partie 2",slug:"/WPF partie 2/intro_xaml",permalink:"/4N1_2024/docs/WPF partie 2/intro_xaml",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:210,frontMatter:{sidebar_position:210,draft:!1},sidebar:"NotesSidebar",previous:{title:"R\xe9sum\xe9 du code",permalink:"/4N1_2024/docs/WPF partie 1/wpf_resume"},next:{title:"Code Partie 2",permalink:"/4N1_2024/docs/WPF partie 2/wpf_partie2_source"}},a={},d=[{value:"XAML",id:"xaml",level:2},{value:"Patron MVVM",id:"patron-mvvm",level:2},{value:"Mod\xe8le du domaine ou mod\xe8le de donn\xe9es",id:"mod\xe8le-du-domaine-ou-mod\xe8le-de-donn\xe9es",level:3}];function c(e){const s={a:"a",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.h1,{id:"xaml-et-mvvm-introduction",children:"XAML et MVVM Introduction"}),"\n",(0,i.jsx)(s.p,{children:"Dans ce document,  l'application aura ses premi\xe8res interfaces visuelles. Les interfaces seront des listes d'\xe9l\xe9ments."}),"\n",(0,i.jsx)(s.p,{children:"Il sera possible de faire quelques op\xe9rations avec la base de donn\xe9es, dont la r\xe9cup\xe9ration des donn\xe9es et la suppression."}),"\n",(0,i.jsxs)(s.p,{children:["La coordination de l'interface graphique se fera avec le patron de conception ",(0,i.jsx)(s.strong,{children:"Model-View-ViewModel"})," ou ",(0,i.jsx)(s.strong,{children:"MVVM"}),"."]}),"\n",(0,i.jsx)(s.p,{children:"Finalement, l'interface graphique utilisera des fichiers ressources pour la traduction du logiciel."}),"\n",(0,i.jsx)(s.h2,{id:"xaml",children:"XAML"}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"XAML"})," est un langage par balise pour cr\xe9er des interfaces graphiques. Ce langage n'est pas utilis\xe9 uniquement par ",(0,i.jsx)(s.strong,{children:"WPF"}),". Par contre, m\xeame si d'autres plateformes comme ",(0,i.jsx)(s.strong,{children:"MAUI"})," utilise ",(0,i.jsx)(s.strong,{children:"XAML"}),", ce ne sont pas n\xe9cessairement les m\xeames composants qui sont disponibles dans la librairie. Il faut s'assurer que le composant est disponible avec la librairie visuelle utilis\xe9e. Heuseureusement, les principaux composants fonctionnent de la m\xeame fa\xe7on."]}),"\n",(0,i.jsxs)(s.p,{children:["Plusieurs concepts sont inspir\xe9s du ",(0,i.jsx)(s.strong,{children:"HTML"}),", mais ce langage est tout de m\xeame tr\xe8s diff\xe9rent du ",(0,i.jsx)(s.strong,{children:"HTML"}),"."]}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Visual Studio"})," permet de cr\xe9er l'interface graphique sans toucher au code ",(0,i.jsx)(s.strong,{children:"XAML"}),". Il est possible de faire du ",(0,i.jsx)(s.strong,{children:"drag and drop"})," des composants dans l'interface visuelle et de modifier les propri\xe9t\xe9s \xe0 partir de la fen\xeatre de propri\xe9t\xe9s."]}),"\n",(0,i.jsxs)(s.p,{children:["Le site ",(0,i.jsx)(s.strong,{children:"WPF Tutorial"})," (",(0,i.jsx)(s.a,{href:"https://wpf-tutorial.com/",children:"https://wpf-tutorial.com/"}),") explique le fonctionnement de plusieurs composants. Le site a une version en fran\xe7ais qui est traduite par la communaut\xe9 (",(0,i.jsx)(s.a,{href:"https://wpf-tutorial.com/Localization/LanguageStatus/fr/",children:"https://wpf-tutorial.com/Localization/LanguageStatus/fr/"}),") . Il y a beaucoup de publicit\xe9, mais c'est une tr\xe8s bonne source d'information."]}),"\n",(0,i.jsx)(s.h2,{id:"patron-mvvm",children:"Patron MVVM"}),"\n",(0,i.jsxs)(s.p,{children:["Le patron ",(0,i.jsx)(s.strong,{children:"Model-View-ViewModel"})," ou ",(0,i.jsx)(s.strong,{children:"MVVM"})," fait partie de la grande famille des patrons de conception pour la s\xe9paration de l'interface graphique et la logique applicative. ",(0,i.jsx)(s.strong,{children:"MVC"})," et ",(0,i.jsx)(s.strong,{children:"MVP"})," sont d'autres patrons de la m\xeame famille."]}),"\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"MVVM"})," a \xe9t\xe9 invent\xe9 par Microsoft  vers 2005 pour faciliter le d\xe9veloppement des applications ",(0,i.jsx)(s.strong,{children:"WPF"})," et ",(0,i.jsx)(s.strong,{children:"Silverlight"}),". Aujourd'hui, le patron est utilis\xe9 avec d'autres technologies. Par exemple, il est possible de l'utiliser avec ",(0,i.jsx)(s.strong,{children:"Blazor"}),"."]}),"\n",(0,i.jsxs)(s.p,{children:["Le ",(0,i.jsx)(s.strong,{children:"MVVM"})," est s\xe9par\xe9 en 3 concepts."]}),"\n",(0,i.jsxs)(s.ul,{children:["\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"Model"})," ou mod\xe8le"]}),"\n",(0,i.jsx)(s.p,{children:"Le mod\xe8le est la classe qui contient les donn\xe9es du logiciel qui doivent \xeatre affich\xe9es \xe0 l'utilisateur. Ce sont g\xe9n\xe9ralement les classes du mod\xe8le du domaine qui sont utilis\xe9es."}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"View"})," ou vue"]}),"\n",(0,i.jsxs)(s.p,{children:["La vue consiste \xe0 l'interface utilisateur. Dans le concept ",(0,i.jsx)(s.strong,{children:"MVVM"})," pur, il ne devrait avoir aucun code dans la vue. Mais d'un point de vue pratique, il arrive parfois de mettre un peu de logique dans la vue pour faciliter l'interaction de l'interface utilisateur."]}),"\n"]}),"\n",(0,i.jsxs)(s.li,{children:["\n",(0,i.jsxs)(s.p,{children:[(0,i.jsx)(s.strong,{children:"ViewModel"})," ou Mod\xe8leVue"]}),"\n",(0,i.jsxs)(s.p,{children:["Le terme ",(0,i.jsx)(s.strong,{children:"ViewModel"})," sera utilis\xe9 dans ce cours. Il ne se traduit pas tr\xe8s bien en fran\xe7ais."]}),"\n",(0,i.jsxs)(s.p,{children:["Le ",(0,i.jsx)(s.strong,{children:"ViewModel"})," contient la logique d'interaction de la vue. Il est dans la famille ",(0,i.jsx)(s.strong,{children:"contr\xf4leur"}),". Son r\xf4le est de coordonner l'interface utilisateur et de fournir les \xe9tats et les valeurs aux composants visuels. Chaque ",(0,i.jsx)(s.strong,{children:"Vue"})," utilise un ",(0,i.jsx)(s.strong,{children:"ViewModel"})]}),"\n",(0,i.jsxs)(s.p,{children:["Le ",(0,i.jsx)(s.strong,{children:"ViewModel"})," publie des propri\xe9t\xe9s que les composants visuels utilisent par liaison."]}),"\n",(0,i.jsx)(s.p,{children:"Lorsqu'une valeur d'un composant est modifi\xe9e dans l'interface visuelle, la liaison met automatiquement \xe0 jour le mod\xe8le."}),"\n",(0,i.jsx)(s.p,{children:"Lorsqu'une valeur du mod\xe8le est modifi\xe9e, la liaison met automatiquement \xe0 jour l'interface visuelle par notification."}),"\n",(0,i.jsxs)(s.p,{children:["Le principe de liaison est \xe9galement utilis\xe9 par ",(0,i.jsx)(s.strong,{children:"Angular"})," et ",(0,i.jsx)(s.strong,{children:"Blazor"}),"."]}),"\n",(0,i.jsxs)(s.p,{children:["Le ",(0,i.jsx)(s.strong,{children:"ViewModel"})," re\xe7oit une commande, un \xe9v\xe9nement ou un appel de m\xe9thodes pour effectuer des actions qui provient de l'interface utilisateur pour initier une action. Le ",(0,i.jsx)(s.strong,{children:"ViewModel"})," utilise les ",(0,i.jsx)(s.strong,{children:"Services"})," de l'application."]}),"\n",(0,i.jsxs)(s.p,{children:["Il y a beaucoup d'exemple sur internet que le ",(0,i.jsx)(s.strong,{children:"ViewModel"})," utilise directement le ",(0,i.jsx)(s.strong,{children:"Repository"})," et qu'il a y un peu plus de logique dans le ",(0,i.jsx)(s.strong,{children:"ViewModel"}),". Cette approche n'est pas mauvaise, car le ",(0,i.jsx)(s.strong,{children:"ViewModel"})," est facilement testable. Par contre, il est possible de modifier un m\xeame type d'enregistrement dans plusieurs ",(0,i.jsx)(s.strong,{children:"vues"})," diff\xe9rentes. Il faut s'assurer que la logique de modification est la m\xeame dans tous les ",(0,i.jsx)(s.strong,{children:"ViewModels"}),". En utilisant un ",(0,i.jsx)(s.strong,{children:"Service"}),", la logique est \xe0 un seul endroit."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(s.p,{children:["En s\xe9parant la ",(0,i.jsx)(s.strong,{children:"Vue"})," et la logique de coordination, il est tr\xe8s facile de modifier l'interface visuelle sans trop de cons\xe9quences. Le ",(0,i.jsx)(s.strong,{children:"ViewModel"})," ne connait pas la ",(0,i.jsx)(s.strong,{children:"Vue"}),", donc la logique de coordination reste la m\xeame, peu importe si la ",(0,i.jsx)(s.strong,{children:"Vue"})," utilise un ",(0,i.jsx)(s.strong,{children:"ListView"}),", un ",(0,i.jsx)(s.strong,{children:"DataGrid"})," ou un composant maison."]}),"\n",(0,i.jsxs)(s.p,{children:["De plus, le plus grand avantage est qu'il est possible des faires des tests automatis\xe9s avec le ",(0,i.jsx)(s.strong,{children:"ViewModel"}),". Par exemple, si aucun item n\u2019est s\xe9lectionn\xe9 dans la liste, il n'est pas possible de faire la suppression. Il est possible de tester ce cas, car la coordination se fait dans une classe ind\xe9pendante."]}),"\n",(0,i.jsxs)(s.p,{children:["Pour avoir une d\xe9finition th\xe9orique, voici 2 liens Microsoft. Ce n'est pas pour ",(0,i.jsx)(s.strong,{children:"WPF"}),", mais les concepts restent les m\xeames."]}),"\n",(0,i.jsxs)(s.p,{children:["Pour UWP : ",(0,i.jsx)(s.a,{href:"https://learn.microsoft.com/fr-fr/windows/uwp/data-binding/data-binding-and-mvvm",children:"https://learn.microsoft.com/fr-fr/windows/uwp/data-binding/data-binding-and-mvvm"})]}),"\n",(0,i.jsxs)(s.p,{children:["Pour MAUI : ",(0,i.jsx)(s.a,{href:"https://learn.microsoft.com/fr-ca/dotnet/architecture/maui/mvvm",children:"https://learn.microsoft.com/fr-ca/dotnet/architecture/maui/mvvm"})]}),"\n",(0,i.jsxs)(s.p,{children:["Wiki : ",(0,i.jsx)(s.a,{href:"https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel",children:"https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel"})]}),"\n",(0,i.jsx)(s.h3,{id:"mod\xe8le-du-domaine-ou-mod\xe8le-de-donn\xe9es",children:"Mod\xe8le du domaine ou mod\xe8le de donn\xe9es"}),"\n",(0,i.jsxs)(s.p,{children:["Il n'est pas recommand\xe9 d'utiliser un objet du mod\xe8le de donn\xe9es (EF) pour l'interaction utilisateur. Le ",(0,i.jsx)(s.strong,{children:"ViewModel"})," ne doit pas les utiliser. Il arrive souvent que le mod\xe8le de donn\xe9es soit pratiquement identique au mod\xe8le du domaine dans ses propri\xe9t\xe9s, il est donc tentant d'utiliser directement l'objet du mod\xe8le de donn\xe9es."]}),"\n",(0,i.jsxs)(s.p,{children:["L'objet du mod\xe8le de donn\xe9es est surveill\xe9 par le contexte qui l'a cr\xe9\xe9 tant que le contexte est actif. Si l'objet est modifi\xe9, l'objet sera pris en consid\xe9ration si son instance dans le contexte se met \xe0 jour par la m\xe9thode ",(0,i.jsx)(s.strong,{children:"SaveChanges()"})," et cela m\xeame s'il n'aurait pas du \xeatre modifi\xe9 dans la bd."]}),"\n",(0,i.jsxs)(s.p,{children:["Pour faciliter la conversion entre les diff\xe9rents types de ",(0,i.jsx)(s.strong,{children:"mod\xe8les"}),", il est possible d'utiliser une librairie ",(0,i.jsx)(s.strong,{children:"Mapper"}),". Pour ce projet, ce sera des ",(0,i.jsx)(s.strong,{children:"extensions"})," qui s'occuperont de faire la transition entre les 2 types de mod\xe8les."]})]})}function u(e={}){const{wrapper:s}={...(0,t.a)(),...e.components};return s?(0,i.jsx)(s,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,s,n)=>{n.d(s,{Z:()=>l,a:()=>o});var i=n(7294);const t={},r=i.createContext(t);function o(e){const s=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function l(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(r.Provider,{value:s},e.children)}}}]);