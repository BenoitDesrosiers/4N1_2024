"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[9957],{2720:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var s=r(5893),t=r(1151);const a={sidebar_position:1},o="Niveau sup\xe9rieur",i={id:"03 Injection de d\xe9pendance/app_sans_main",title:"Niveau sup\xe9rieur",description:"Les applications consoles que vous avez fait jusqu'\xe0 maintenant dans vos autres cours utilisaient l'approche classique. Lors de l'ex\xe9cution du programme, une instance de la classe principale est cr\xe9\xe9e et la m\xe9thode de d\xe9marrage (g\xe9n\xe9ralement Main) est appel\xe9e. La logique du programme d\xe9bute dans le Main.",source:"@site/docs/03 Injection de d\xe9pendance/app_sans_main.md",sourceDirName:"03 Injection de d\xe9pendance",slug:"/03 Injection de d\xe9pendance/app_sans_main",permalink:"/4N1_2024/docs/03 Injection de d\xe9pendance/app_sans_main",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"NotesSidebar",previous:{title:"Exercices LINQ",permalink:"/4N1_2024/docs/02 LINQ/exercice_linq"},next:{title:"Principes SOLID",permalink:"/4N1_2024/docs/03 Injection de d\xe9pendance/solid"}},c={},l=[{value:"Exemple de l&#39;approche classique",id:"exemple-de-lapproche-classique",level:2},{value:"Exemple de l&#39;approche sans classe",id:"exemple-de-lapproche-sans-classe",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,t.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"niveau-sup\xe9rieur",children:"Niveau sup\xe9rieur"}),"\n",(0,s.jsxs)(n.p,{children:["Les applications consoles que vous avez fait jusqu'\xe0 maintenant dans vos autres cours utilisaient l'approche classique. Lors de l'ex\xe9cution du programme, une instance de la classe principale est cr\xe9\xe9e et la m\xe9thode de d\xe9marrage (g\xe9n\xe9ralement ",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"Main"})}),") est appel\xe9e. La logique du programme d\xe9bute dans le ",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"Main"})}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Certains environnements de travail, comme ",(0,s.jsx)(n.strong,{children:".NET 6"})," et plus, ne n\xe9cessitent pas de classe de d\xe9marrage. Le code dans le fichier est ex\xe9cut\xe9 automatiquement. L'environnement de travail s'occupe de g\xe9n\xe9rer automatiquement l'encapsulation du code. En ",(0,s.jsx)(n.strong,{children:".NET"}),", cette approche s'appelle ",(0,s.jsx)(n.strong,{children:"Instructions de niveau sup\xe9rieur"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Pour plus d'information : ",(0,s.jsx)(n.a,{href:"https://learn.microsoft.com/fr-ca/dotnet/csharp/fundamentals/program-structure/top-level-statements",children:"https://learn.microsoft.com/fr-ca/dotnet/csharp/fundamentals/program-structure/top-level-statements"})]}),"\n",(0,s.jsxs)(n.p,{children:["La nouvelle approche permet de g\xe9rer plus facilement les nouveaux concepts introduits dans ",(0,s.jsx)(n.strong,{children:".NET Core"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"exemple-de-lapproche-classique",children:"Exemple de l'approche classique"}),"\n",(0,s.jsxs)(n.p,{children:["Cr\xe9ez un nouveau projet dans Visual Studio. S\xe9lectionnez le mod\xe8le ",(0,s.jsx)(n.strong,{children:"Application console (.NET Framework)"}),". Prenez celui avec la mention ",(0,s.jsx)(n.strong,{children:"c#"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Nommez votre projet ",(0,s.jsx)(n.strong,{children:"DemoC4_Classique"}),". S\xe9lectionnez l'infrastructure ",(0,s.jsx)(n.strong,{children:".Net Framework 4.8"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["La classe ",(0,s.jsx)(n.strong,{children:"Program.cs"})," contient le code de d\xe9marrage."]}),"\n",(0,s.jsxs)(n.p,{children:["\xc0 l'int\xe9rieur de la m\xe9thode  ",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"Main"})}),", ce sera le code du programme."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'namespace DemoC4_Classique\r\n{\r\n    internal class Program\r\n    {\r\n        static void Main(string[] args)\r\n        {\r\n            Console.WriteLine("Appuyez sur ENTER pour quitter.");\r\n\t\t\t\r\n            //Demande une touche \xe0 l\'utilisateur tant que ce n\'est pas la touche ENTER\r\n            while (Console.ReadKey().Key != ConsoleKey.Enter)\r\n            {\r\n                Console.Clear();\r\n                Console.WriteLine("Mauvaise touche. Appuyez sur ENTER pour quitter.");\r\n            }\r\n\r\n            Console.WriteLine("Aurevoir !");\r\n        }\r\n    }\r\n}\n'})}),"\n",(0,s.jsx)(n.h2,{id:"exemple-de-lapproche-sans-classe",children:"Exemple de l'approche sans classe"}),"\n",(0,s.jsxs)(n.p,{children:["Cr\xe9ez un nouveau projet dans Visual Studio. S\xe9lectionnez le mod\xe8le ",(0,s.jsx)(n.strong,{children:"Application console"}),". Prenez celui avec la mention ",(0,s.jsx)(n.strong,{children:"csharp"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Nommez votre projet ",(0,s.jsx)(n.strong,{children:"DemoC4"}),". S\xe9lectionnez l'infrastructure ",(0,s.jsx)(n.strong,{children:".NET 7.0"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Le fichier ",(0,s.jsx)(n.strong,{children:"Program.cs"})," est vide."]}),"\n",(0,s.jsx)(n.p,{children:"Il est possible de reproduire le m\xeame programme directement."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'Console.WriteLine("Appuyez sur ENTER pour quitter.");\r\n\t\t\t\r\n//Demande une touche \xe0 l\'utilisateur tant que ce n\'est pas la touche ENTER\r\nwhile (Console.ReadKey().Key != ConsoleKey.Enter)\r\n{\r\n    Console.Clear();\r\n    Console.WriteLine("Mauvaise touche. Appuyez sur ENTER pour quitter.");\r\n}\r\n\r\nConsole.WriteLine("Aurevoir !");\n'})})]})}function u(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>i,a:()=>o});var s=r(7294);const t={},a=s.createContext(t);function o(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);