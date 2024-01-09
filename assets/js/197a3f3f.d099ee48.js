"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[8537],{9697:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=s(5893),t=s(1151);const o={sidebar_position:1},a="Niveau sup\xe9rieur",i={id:"LINQ/app_sans_main",title:"Niveau sup\xe9rieur",description:"Les applications consoles que vous avez fait jusqu'\xe0 maintenant dans vos autres cours utilisaient l'approche classique. Lors de l'ex\xe9cution du programme, une instance de la classe principale est cr\xe9\xe9e et la m\xe9thode de d\xe9marrage (g\xe9n\xe9ralement Main) est appel\xe9e. La logique du programme d\xe9bute dans le Main.",source:"@site/docs/20-LINQ/app_sans_main.md",sourceDirName:"20-LINQ",slug:"/LINQ/app_sans_main",permalink:"/4N1_2024/docs/LINQ/app_sans_main",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"NotesSidebar",previous:{title:"Cl\xe9 auto incr\xe9ment\xe9e",permalink:"/4N1_2024/docs/R\xe9vision SQL/cles_auto_incrementees"},next:{title:"Les Collections",permalink:"/4N1_2024/docs/LINQ/collections"}},l={},c=[{value:"Exemple de l&#39;approche classique",id:"exemple-de-lapproche-classique",level:2},{value:"Exemple de l&#39;approche sans classe",id:"exemple-de-lapproche-sans-classe",level:2}];function u(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,t.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"niveau-sup\xe9rieur",children:"Niveau sup\xe9rieur"}),"\n",(0,r.jsxs)(n.p,{children:["Les applications consoles que vous avez fait jusqu'\xe0 maintenant dans vos autres cours utilisaient l'approche classique. Lors de l'ex\xe9cution du programme, une instance de la classe principale est cr\xe9\xe9e et la m\xe9thode de d\xe9marrage (g\xe9n\xe9ralement ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"Main"})}),") est appel\xe9e. La logique du programme d\xe9bute dans le ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"Main"})}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Certains environnements de travail, comme ",(0,r.jsx)(n.strong,{children:".NET 6"})," et plus, ne n\xe9cessitent pas de classe de d\xe9marrage. Le code dans le fichier est ex\xe9cut\xe9 automatiquement. L'environnement de travail s'occupe de g\xe9n\xe9rer automatiquement l'encapsulation du code. En ",(0,r.jsx)(n.strong,{children:".NET"}),", cette approche s'appelle ",(0,r.jsx)(n.strong,{children:"Instructions de niveau sup\xe9rieur"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Pour plus d'information : ",(0,r.jsx)(n.a,{href:"https://learn.microsoft.com/fr-ca/dotnet/csharp/fundamentals/program-structure/top-level-statements",children:"https://learn.microsoft.com/fr-ca/dotnet/csharp/fundamentals/program-structure/top-level-statements"})]}),"\n",(0,r.jsxs)(n.p,{children:["La nouvelle approche permet de g\xe9rer plus facilement les nouveaux concepts introduits dans ",(0,r.jsx)(n.strong,{children:".NET Core"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"exemple-de-lapproche-classique",children:"Exemple de l'approche classique"}),"\n",(0,r.jsxs)(n.p,{children:["Cr\xe9ez un nouveau projet dans Visual Studio. S\xe9lectionnez le mod\xe8le ",(0,r.jsx)(n.strong,{children:"Application console (.NET Framework)"}),". Prenez celui avec la mention ",(0,r.jsx)(n.strong,{children:"c#"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Nommez votre projet ",(0,r.jsx)(n.strong,{children:"DemoC4_Classique"}),". S\xe9lectionnez l'infrastructure ",(0,r.jsx)(n.strong,{children:".Net Framework 4.8"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["La classe ",(0,r.jsx)(n.strong,{children:"Program.cs"})," contient le code de d\xe9marrage."]}),"\n",(0,r.jsxs)(n.p,{children:["\xc0 l'int\xe9rieur de la m\xe9thode  ",(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:"Main"})}),", ce sera le code du programme."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:'namespace DemoC4_Classique\r\n{\r\n    internal class Program\r\n    {\r\n        static void Main(string[] args)\r\n        {\r\n            Console.WriteLine("Appuyez sur ENTER pour quitter.");\r\n\t\t\t\r\n            //Demande une touche \xe0 l\'utilisateur tant que ce n\'est pas la touche ENTER\r\n            while (Console.ReadKey().Key != ConsoleKey.Enter)\r\n            {\r\n                Console.Clear();\r\n                Console.WriteLine("Mauvaise touche. Appuyez sur ENTER pour quitter.");\r\n            }\r\n\r\n            Console.WriteLine("Aurevoir !");\r\n        }\r\n    }\r\n}\n'})}),"\n",(0,r.jsx)(n.h2,{id:"exemple-de-lapproche-sans-classe",children:"Exemple de l'approche sans classe"}),"\n",(0,r.jsxs)(n.p,{children:["Cr\xe9ez un nouveau projet dans Visual Studio. S\xe9lectionnez le mod\xe8le ",(0,r.jsx)(n.strong,{children:"Application console"}),". Prenez celui avec la mention ",(0,r.jsx)(n.strong,{children:"csharp"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Nommez votre projet ",(0,r.jsx)(n.strong,{children:"DemoC4"}),". S\xe9lectionnez l'infrastructure ",(0,r.jsx)(n.strong,{children:".NET 7.0"}),"."]}),"\n",(0,r.jsxs)(n.p,{children:["Le fichier ",(0,r.jsx)(n.strong,{children:"Program.cs"})," est vide."]}),"\n",(0,r.jsx)(n.p,{children:"Il est possible de reproduire le m\xeame programme directement."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-csharp",children:'Console.WriteLine("Appuyez sur ENTER pour quitter.");\r\n\t\t\t\r\n//Demande une touche \xe0 l\'utilisateur tant que ce n\'est pas la touche ENTER\r\nwhile (Console.ReadKey().Key != ConsoleKey.Enter)\r\n{\r\n    Console.Clear();\r\n    Console.WriteLine("Mauvaise touche. Appuyez sur ENTER pour quitter.");\r\n}\r\n\r\nConsole.WriteLine("Aurevoir !");\n'})})]})}function p(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(u,{...e})}):u(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>i,a:()=>a});var r=s(7294);const t={},o=r.createContext(t);function a(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);