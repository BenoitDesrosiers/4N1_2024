"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[4226],{6159:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>t,default:()=>p,frontMatter:()=>a,metadata:()=>o,toc:()=>c});var s=r(5893),i=r(1151);const a={sidebar_position:3},t="Structure de base de l'application",o={id:"03 Injection de d\xe9pendance/preparation_projet",title:"Structure de base de l'application",description:"Projet vs solution",source:"@site/docs/03 Injection de d\xe9pendance/preparation_projet.md",sourceDirName:"03 Injection de d\xe9pendance",slug:"/03 Injection de d\xe9pendance/preparation_projet",permalink:"/4N1_2024/docs/03 Injection de d\xe9pendance/preparation_projet",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"NotesSidebar",previous:{title:"Principes SOLID",permalink:"/4N1_2024/docs/03 Injection de d\xe9pendance/solid"},next:{title:"Injection de d\xe9pendances",permalink:"/4N1_2024/docs/03 Injection de d\xe9pendance/injection_dependance"}},l={},c=[{value:"Projet vs solution",id:"projet-vs-solution",level:2},{value:"Pr\xe9paration du projet",id:"pr\xe9paration-du-projet",level:2},{value:"Installation des librairies",id:"installation-des-librairies",level:2},{value:"La classe App",id:"la-classe-app",level:2},{value:"Fichier Program.cs",id:"fichier-programcs",level:2},{value:"Arguments du programme",id:"arguments-du-programme",level:2},{value:"Sp\xe9cification des arguments en mode d\xe9veloppement",id:"sp\xe9cification-des-arguments-en-mode-d\xe9veloppement",level:3}];function d(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"structure-de-base-de-lapplication",children:"Structure de base de l'application"}),"\n",(0,s.jsx)(n.h2,{id:"projet-vs-solution",children:"Projet vs solution"}),"\n",(0,s.jsxs)(n.p,{children:["Quelle est la diff\xe9rence entre un projet et une solution en ",(0,s.jsx)(n.strong,{children:".Net"})," ?"]}),"\n",(0,s.jsxs)(n.p,{children:["Il est fr\xe9quent en ",(0,s.jsx)(n.strong,{children:".Net"})," de s\xe9parer une application en plusieurs projets. G\xe9n\xe9ralement, le projet consiste en une couche logicielle. Cette couche contient le code correspondant au r\xf4le du projet dans l'application. Un projet peut \xeatre utilis\xe9 dans plusieurs applications."]}),"\n",(0,s.jsx)(n.p,{children:"La solution permet de regrouper plusieurs projets ensemble. La solution n'a pas de logique en soi. Elle permet d'avoir acc\xe8s \xe0 plusieurs projets rapidement. G\xe9n\xe9ralement, la solution contient tous les projets n\xe9cessaires \xe0 l'application."}),"\n",(0,s.jsxs)(n.p,{children:["Il est possible d'utiliser cette approche avec une application console avec ",(0,s.jsx)(n.strong,{children:".NET 7"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Les prochaines \xe9tapes pr\xe9parent la structure de base du projet ",(0,s.jsx)(n.strong,{children:"Console"})," pour \xeatre en mesure d'utiliser l'injection de d\xe9pendances."]}),"\n",(0,s.jsx)(n.h2,{id:"pr\xe9paration-du-projet",children:"Pr\xe9paration du projet"}),"\n",(0,s.jsx)(n.p,{children:"L'application que nous allons construire consiste \xe0 la gestion d'une \"bd\" contenant des univers de personnages (Marvel, DC, TMNT, Power Rangers)."}),"\n",(0,s.jsx)(n.p,{children:"Afin de structurer notre application console convenablement, il faut mettre en place certains \xe9l\xe9ments."}),"\n",(0,s.jsxs)(n.p,{children:["Cr\xe9ez un nouveau projet ",(0,s.jsx)(n.strong,{children:"Application Console"}),"."]}),"\n",(0,s.jsx)("img",{src:"/4N1_2024/img/05_projet_1.png"}),"\n",(0,s.jsxs)(n.p,{children:["Nommez le projet ",(0,s.jsx)(n.strong,{children:"GestionPersonnageApp"}),"."]}),"\n",(0,s.jsx)("img",{src:"/4N1_2024/img/05_projet_2.png"}),"\n",(0,s.jsxs)(n.p,{children:["S\xe9lectionnez l'infrastructure ",(0,s.jsx)(n.strong,{children:".NET 7.0"})," et d\xe9cochez ",(0,s.jsx)(n.strong,{children:"N'utilisez pas d'instructions de niveau sup\xe9rieur."})]}),"\n",(0,s.jsx)("img",{src:"/4N1_2024/img/05_projet_3.png"}),"\n",(0,s.jsx)(n.h2,{id:"installation-des-librairies",children:"Installation des librairies"}),"\n",(0,s.jsxs)(n.p,{children:["Il faut utiliser la librairie ",(0,s.jsx)(n.strong,{children:"Microsoft.Extensions.Hosting"})," pour \xeatre en mesure de cr\xe9er une application avec l'enregistrement de services par injection de d\xe9pendances."]}),"\n",(0,s.jsxs)(n.p,{children:["L'ajout des librairies se fait par ",(0,s.jsx)(n.strong,{children:"Nuget"}),". Il est plus convivial d'utiliser la ",(0,s.jsx)(n.strong,{children:"Console du Gestionnaire de package"}),". Elle se retrouve dans le bas de l'\xe9cran\xad. Si l'onglet n'est pas l\xe0, allez dans le menu ",(0,s.jsx)(n.strong,{children:"Affichage -> Autres fen\xeatres -> Console du Gestionnaire de package"}),"."]}),"\n",(0,s.jsx)("img",{src:"/4N1_2024/img/05_package_console_1.png"}),"\n",(0,s.jsxs)(n.p,{children:["Dans la ",(0,s.jsx)(n.strong,{children:"Console du Gestionnaire de package"}),", incrivez cette ligne."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"Install-Package Microsoft.Extensions.Hosting\n"})}),"\n",(0,s.jsx)("img",{src:"/4N1_2024/img/05_package_console_2.png"}),"\n",(0,s.jsxs)(n.p,{children:["Lorsque la librairie est install\xe9e, elle est maintenant visible dans le dossier ",(0,s.jsx)(n.strong,{children:"D\xe9pendances -> Packages"})," du projet de l'",(0,s.jsx)(n.strong,{children:"Explorateur de solutions"}),"."]}),"\n",(0,s.jsx)("img",{src:"/4N1_2024/img/05_package_console_3.png"}),"\n",(0,s.jsx)(n.h2,{id:"la-classe-app",children:"La classe App"}),"\n",(0,s.jsx)(n.p,{children:"La premi\xe8re partie de code \xe0 construire est la classe repr\xe9sentant l'application elle m\xeame. Cette classe sert de point de d\xe9part de l'application. Cette classe aura pour r\xf4le de rediriger le choix d'une option pass\xe9e en argument par l'usager vers la bonne fonctionnalit\xe9 dans le code."}),"\n",(0,s.jsxs)(n.p,{children:["Cr\xe9ez la classe ",(0,s.jsx)(n.strong,{children:"App.cs"})," \xe0 la racine du projet."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:"namespace GestionPersonnageApp;\r\n\r\n/// <summary>\r\n/// Classe qui repr\xe9sente la base de l'application console\r\n/// </summary>\r\npublic class App\r\n{\r\n    private readonly IServiceProvider _serviceProvider;\r\n    private readonly string[] _args;\r\n\r\n    /// <summary>\r\n    /// Constructeur\r\n    /// </summary>\r\n    /// <param name=\"serviceProvider\">Fournisser de service pour r\xe9cupp\xe9rer les d\xe9pendances</param>\r\n    public App(IServiceProvider serviceProvider)\r\n    {   \r\n        _serviceProvider = serviceProvider;\r\n        \r\n        //Verifie si le programme a des arguments sp\xe9cifiques\r\n        if(Environment.GetCommandLineArgs().Length > 1)\r\n        {\r\n            //Le programme a des arguments sp\xe9cifiques\r\n            //R\xe9cup\xe8re \xe0 partir du 2e argument, car le premier est la r\xe9f\xe9rence du programme\r\n            _args = Environment.GetCommandLineArgs().ToList().GetRange(1, Environment.GetCommandLineArgs().Length - 1).ToArray();\r\n        }\r\n        else\r\n        {\r\n            //Il n'y a aucun argument sp\xe9cifique\r\n            //Cr\xe9e un tableau vide\r\n            _args = new string[0];\r\n        }\r\n\r\n    }\r\n\r\n    \r\n    /// <summary>\r\n    /// M\xe9thode qui s'occupe du d\xe9marrage de l'application\r\n    /// </summary>\r\n    /// <returns>T\xe2ches</returns>\r\n    public async Task DemarrerApplicationAsync()\r\n    {\r\n        //Le point de d\xe9part de la logique de l'application\r\n        \r\n    }\r\n}\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["Remarquez que les variables private sont pr\xe9fix\xe9es par ",(0,s.jsx)(n.strong,{children:"_"}),". Cette nomenclature est recommand\xe9e par MS"]})}),"\n",(0,s.jsxs)(n.p,{children:["Pour le test initial, ins\xe9rez le code ci-dessous dans la m\xe9thode ",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"DemarrerApplicationAsync"})}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'Console.WriteLine("Appuyez sur ENTER pour quitter.");\r\n\t\t\t\r\n//Demande une touche \xe0 l\'utilisateur tant que ce n\'est pas la touche ENTER\r\nwhile (Console.ReadKey().Key != ConsoleKey.Enter)\r\n{\r\n    Console.Clear();\r\n    Console.WriteLine("Mauvaise touche. Appuyez sur ENTER pour quitter.");\r\n}\r\n\r\nConsole.WriteLine("Aurevoir !");\n'})}),"\n",(0,s.jsxs)(n.p,{children:["La classe ",(0,s.jsx)(n.strong,{children:"App"})," a le r\xf4le d'initialiser l'application console en fonction des param\xe8tres re\xe7us. Une application console peut effectuer plusieurs t\xe2ches diff\xe9rentes, mais la coordination des t\xe2ches doivent se faire dans leur propre classe."]}),"\n",(0,s.jsxs)(n.p,{children:["Cette approche permet de respecter le ",(0,s.jsx)(n.strong,{children:"S"})," de ",(0,s.jsx)(n.strong,{children:"SOLID"}),". Une classe doit avoir une seule responsabilit\xe9."]}),"\n",(0,s.jsx)(n.h2,{id:"fichier-programcs",children:"Fichier Program.cs"}),"\n",(0,s.jsxs)(n.p,{children:["Le fichier ",(0,s.jsx)(n.strong,{children:"Program.cs"})," sert \xe0 configurer et \xe0 pr\xe9parer l'environnement de l'application. C'est aussi d'ici que sera d\xe9marr\xe9e l'application repr\xe9sent\xe9e par App.cs."]}),"\n",(0,s.jsxs)(n.p,{children:["Pour \xeatre en mesure de d\xe9marrer l'application, il faut ajouter le code ci-dessous dans le fichier ",(0,s.jsx)(n.strong,{children:"Program.cs"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"Le fichier programme sert \xe0 configurer l'application et \xe0 enregistrer les services (classes) disponibles pour l'injection de d\xe9pendances."}),"\n",(0,s.jsx)(n.p,{children:"Voici la coquille du fichier."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:"using Microsoft.Extensions.DependencyInjection;\r\nusing Microsoft.Extensions.Hosting;\r\n\r\n//La variable args sont les arguments du programme. Ils seront accessibles en tout temps \xe0 partir de Environment.GetCommandLineArgs()\r\n//\xc0 noter que l'index 0 est toujours le nom du DLL ex\xe9cut\xe9.\r\n\r\n//Creation du configurateur de l'application\r\n\r\nvar builder = Host.CreateDefaultBuilder(args);\r\n\r\n//Configuration des services\r\nbuilder.ConfigureServices((context, services) =>\r\n{\r\n    services.AddTransient<App>(); //Application principale\r\n});\r\n\r\n//Cr\xe9ation du host de l'application en fonction de sa configuration\r\nvar host = builder.Build();\r\n\r\n//D\xe9marrage de l'application\r\nApp application = host.Services.GetRequiredService<App>();\r\nawait application.DemarrerApplicationAsync();\n"})}),"\n",(0,s.jsxs)(n.admonition,{type:"note",children:[(0,s.jsx)(n.p,{children:"sur la ligne services.AddTransientApp();"}),(0,s.jsx)(n.p,{children:"App r\xe9f\xe8re \xe0 la classe App"})]}),"\n",(0,s.jsx)(n.p,{children:"D\xe9marrez le programme pour tester votre code."}),"\n",(0,s.jsx)(n.p,{children:"Pourquoi ne pas avoir fait ceci \xe0 la ligne 21 ."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:"App application = new App(host.Services);\n"})}),"\n",(0,s.jsxs)(n.p,{children:["En utilisant ",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"host.Services.GetRequiredService<App>();"})}),", ceci permet de d'injecter automatiquement toutes les d\xe9pendances dans le constructeur."]}),"\n",(0,s.jsx)(n.h2,{id:"arguments-du-programme",children:"Arguments du programme"}),"\n",(0,s.jsx)(n.p,{children:"Afin de permettre \xe0 l'application d'effectuer plusieurs t\xe2ches, il faut passer en arguments diff\xe9rents param\xe8tres."}),"\n",(0,s.jsx)(n.p,{children:"Voici comment les arguments sont envoy\xe9s par l'invite de commandes."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-powershell",children:"c:\\projet> monprog.exe -univers -afficher\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Les arguments proviennent de la variable ",(0,s.jsx)(n.strong,{children:"args"})," du fichier ",(0,s.jsx)(n.strong,{children:"Program.cs"}),". Cette variable est un tableau. L'index 0 correspond \xe0 ",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"-univers"})}),", l'index 1 correspond  \xe0 ",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"-afficher"})}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["La classe ",(0,s.jsx)(n.strong,{children:"App"})," dans son constructeur r\xe9cup\xe8re les arguments du programme \xe0 la ligne 24."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:"        _args = Environment.GetCommandLineArgs().ToList().GetRange(1, Environment.GetCommandLineArgs().Length - 1).ToArray();\n"})}),"\n",(0,s.jsx)(n.p,{children:"\xc0 cette \xe9tape, l'index 0 correspond au fichier compil\xe9 du programme. Il faut donc l'exclure."}),"\n",(0,s.jsxs)(n.p,{children:["Selon l'option choisie par l'utilisateur, la classe ",(0,s.jsx)(n.strong,{children:"App"})," choisira l\u2019action \xe0 utiliser. Ce choix se fera dans la m\xe9thode ",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"DemarrerApplicationAsync"})}),".  Remplacez la m\xe9thode avec le code ci-dessous."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:'public async Task DemarrerApplicationAsync()\r\n{\r\n    //Le point de d\xe9part de la logique de l\'application\r\n\r\n    switch(_args[0].ToLower())\r\n    {\r\n        case "-univers":\r\n\r\n            if (_args[1].ToLower() == "-afficher")\r\n            {\r\n                Console.WriteLine("J\'affiche les univers.");\r\n            }\r\n\r\n            break;\r\n\r\n        default:\r\n            Console.WriteLine("Argument non valide");\r\n            break;\r\n    }\r\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"Ex\xe9cutez l'application. Elle devrait g\xe9n\xe9rer une exception \xe0 la ligne 5 ci-dessus. La raison est que le programme n' a re\xe7u aucun argument et que le code de s\xe9lection en attend. Il faut donc ajouter une v\xe9rification si la longueur des arguments n'est pas valide, et avoir une option par d\xe9faut si aucun argument n'est sp\xe9cifi\xe9."}),"\n",(0,s.jsxs)(n.p,{children:["Dans notre cas, l'argument par d\xe9faut sera ",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"-aide"})}),"."]}),"\n",(0,s.jsx)(n.p,{children:"Modifiez le constructeur par celui-ci. La ligne 16 sera modifi\xe9e pour appliquer le param\xe8tre par d\xe9faut."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:'public App(IServiceProvider serviceProvider)\r\n{\r\n    _serviceProvider = serviceProvider;\r\n\r\n    //Verifie si le programme a des arguments sp\xe9cifiques\r\n    if (Environment.GetCommandLineArgs().Length > 1)\r\n    {\r\n        //Le programme a des arguments sp\xe9cifiques\r\n        //R\xe9cup\xe8re \xe0 partir du 2e argument, car le premier est la r\xe9f\xe9rence du programme\r\n        _args = Environment.GetCommandLineArgs().ToList().GetRange(1, Environment.GetCommandLineArgs().Length - 1).ToArray();\r\n    }\r\n    else\r\n    {\r\n        //Il n\'y a aucun argument sp\xe9cifique\r\n        //Cr\xe9e un tableau vide\r\n        // highlight-next-line\r\n        _args = new string[] { "-aide" };\r\n    }\r\n\r\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Ajoutez la m\xe9thode ",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"AfficherAide()"})})," dans la classe App."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'/// <summary>\r\n/// M\xe9thode qui affiche le message d\'aide du programme\r\n/// </summary>    \r\nprivate void AfficherAide()\r\n{\r\n    Console.WriteLine("Voici les param\xe8tres \xe0 utiliser.");\r\n    Console.WriteLine("-aide        Affiche l\'aide du programme.");\r\n    Console.WriteLine("-[module] -[t\xe2che]       Permet de s\xe9lectionner le module et appliquer une t\xe2che.");\r\n    Console.WriteLine("La liste des modules : univers.");\r\n    Console.WriteLine("La liste des t\xe2ches : afficher.");\r\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Modifiez la m\xe9thode ",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"DemarrerApplicationAsync"})})," pour ajouter l'option ",(0,s.jsx)(n.strong,{children:(0,s.jsx)(n.code,{children:"-aide"})}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'public async Task DemarrerApplicationAsync()\r\n{\r\n    //Le point de d\xe9part de la logique de l\'application\r\n\r\n    switch (_args[0].ToLower())\r\n    {\r\n        //highlight-start\r\n        case "-aide":\r\n            AfficherAide();\r\n            break;\r\n        //highlight-end\r\n        case "-univers":\r\n\r\n            if (_args[1].ToLower() == "-afficher")\r\n            {\r\n                Console.WriteLine("J\'affiche les univers.");\r\n            }\r\n\r\n            break;\r\n\r\n        default:\r\n            Console.WriteLine("Argument non valide");\r\n            break;\r\n    }\r\n\r\n    //N\xe9c\xe9ssaire, car il n\'y a aucun await dans le code et la m\xe9thode est async\r\n    await Task.CompletedTask;\r\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"D\xe9marrez de nouveau l'application. Le message d'aide s'affichera."}),"\n",(0,s.jsx)(n.h3,{id:"sp\xe9cification-des-arguments-en-mode-d\xe9veloppement",children:"Sp\xe9cification des arguments en mode d\xe9veloppement"}),"\n",(0,s.jsxs)(n.p,{children:["En d\xe9veloppement, il est possible de sp\xe9cifier les arguments. Appuyez sur le bouton ",(0,s.jsx)(n.strong,{children:"fl\xe8che vers le bas"})," \xe0 droite du bouton d'ex\xe9cution. Ensuite, s\xe9lectionnez le menu ",(0,s.jsx)(n.strong,{children:"Propri\xe9t\xe9s de d\xe9bogage de ..."}),"."]}),"\n",(0,s.jsx)("img",{src:"/4N1_2024/img/05_argument_1.png"}),"\n",(0,s.jsxs)(n.p,{children:["Dans la zone de texte ",(0,s.jsx)(n.strong,{children:"Arguments de ligne de commande"}),", il faut mettre les arguments \xe0 utiliser. Appuyez sur le ",(0,s.jsx)(n.strong,{children:"X"})," de la fen\xeatre pour fermer. Il n'y a pas de bouton ",(0,s.jsx)(n.strong,{children:"OK"}),"."]}),"\n",(0,s.jsx)("img",{src:"/4N1_2024/img/05_argument_2.png"}),"\n",(0,s.jsxs)(n.p,{children:["D\xe9marrez le programme et le texte ",(0,s.jsx)(n.strong,{children:"J'affiche les univers."})," s'affichera dans la console."]})]})}function p(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>o,a:()=>t});var s=r(7294);const i={},a=s.createContext(i);function t(e){const n=s.useContext(a);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),s.createElement(a.Provider,{value:n},e.children)}}}]);