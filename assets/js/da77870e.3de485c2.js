"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[4930],{7291:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>u,frontMatter:()=>t,metadata:()=>l,toc:()=>c});var s=r(5893),i=r(1151);const t={sidebar_position:40},a="Utilisation",l={id:"Injection de d\xe9pendance/injection_dependance",title:"Utilisation",description:"L'application consiste \xe0 faire la gestion d'une base de donn\xe9es contenant des univers de personnages.",source:"@site/docs/60-Injection de d\xe9pendance/injection_dependance.md",sourceDirName:"60-Injection de d\xe9pendance",slug:"/Injection de d\xe9pendance/injection_dependance",permalink:"/4N1_2024/docs/Injection de d\xe9pendance/injection_dependance",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:40,frontMatter:{sidebar_position:40},sidebar:"NotesSidebar",previous:{title:"Introduction",permalink:"/4N1_2024/docs/Injection de d\xe9pendance/injection_introduction"},next:{title:"WPF Introduction",permalink:"/4N1_2024/docs/WPF/partie_1"}},o={},c=[{value:"Classe de coordination - Manager",id:"classe-de-coordination---manager",level:2},{value:"Interface",id:"interface",level:3},{value:"Enregistrement du Manager - program.cs",id:"enregistrement-du-manager---programcs",level:3},{value:"IServiceProvider",id:"iserviceprovider",level:2},{value:"Le Repository",id:"le-repository",level:2},{value:"Cr\xe9ation directe - new class (\xe0 ne pas faire)",id:"cr\xe9ation-directe---new-class-\xe0-ne-pas-faire",level:2},{value:"Injection de la classe (\xe0 \xe9viter)",id:"injection-de-la-classe-\xe0-\xe9viter",level:2},{value:"Injection par interface (approche recommand\xe9e)",id:"injection-par-interface-approche-recommand\xe9e",level:2},{value:"Type d&#39;enregistrement des d\xe9pendances",id:"type-denregistrement-des-d\xe9pendances",level:2}];function d(e){const n={admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"utilisation",children:"Utilisation"}),"\n",(0,s.jsx)(n.p,{children:"L'application consiste \xe0 faire la gestion d'une base de donn\xe9es contenant des univers de personnages."}),"\n",(0,s.jsxs)(n.p,{children:["Pr\xe9sentement, nos donn\xe9es sur l'Univers de superh\xe9ros sont entrepos\xe9es dans une bd relationnel SQLServer. Mais rien n'emp\xeache de mettre ces donn\xe9es dans une structure de liste, dans une bd sqlite, un API, ou encore une bd NoSQL. Il est courant dans un projet de ne pas connaitre la technologie exacte d'entreposage des donn\xe9es. Afin de s'isoler de celle-ci, il est courant d'utiliser une classe qui fera le lien entre l'entrepot de donn\xe9es et le reste du programme: un ",(0,s.jsx)(n.strong,{children:"Repository"}),". Il suffira alors de simplement changer cette classe afin de changer l'entrepot de donn\xe9s."]}),"\n",(0,s.jsx)(n.p,{children:"Mais comment \"isoler\" le reste du code afin de rendre cette classe interm\xe9diaire \xe9changeable? C'est ici que l'injection de d\xe9pendance entre en jeu."}),"\n",(0,s.jsx)(n.p,{children:"Cette classe interm\xe9diaire nous fournira quelques fonctionnalit\xe9s que nous d\xe9sirons avoir. La connexion entre notre programme et la \"bd\" se fera selon la solution utilis\xe9e. L'injection de d\xe9pendances nous permettra de choisir le mode de connexion au moment de l'ex\xe9cution."}),"\n",(0,s.jsx)(n.h2,{id:"classe-de-coordination---manager",children:"Classe de coordination - Manager"}),"\n",(0,s.jsxs)(n.p,{children:["Il faut maintenant ajouter la logique pour la gestion de l'affichage de l'univers. Cette logique ne doit pas \xeatre dans la classe ",(0,s.jsx)(n.strong,{children:"App"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Afin de respecter le ",(0,s.jsx)(n.strong,{children:"S"})," de ",(0,s.jsx)(n.strong,{children:"SOLID"}),", les classes doivent avoir une seule responsabilit\xe9. La responsabilit\xe9 de la classe ",(0,s.jsx)(n.strong,{children:"App"})," est de d\xe9terminer la t\xe2che et d'appeler le bonne classe de coordination."]}),"\n",(0,s.jsxs)(n.p,{children:["Il faut donc cr\xe9er une classe qui s'occupe de la coordination entre l'utilisateur et l'utilisation des services. Ce type de classe sera un ",(0,s.jsx)(n.strong,{children:"Manager"}),". Plusieurs personnes appellent \xe9galement ce type de classe un ",(0,s.jsx)(n.strong,{children:"contr\xf4leur"}),", car son r\xf4le est de faire le lien entre l'utilisateur et la logique de notre application. Dans un serveur Web MVC ou API Rest, le ",(0,s.jsx)(n.strong,{children:"contr\xf4leur"})," a le m\xeame r\xf4le. Afin de diff\xe9rencier le concept entre une application Web et une application console, la classe de coordination sera un ",(0,s.jsx)(n.strong,{children:"Manager"})," dans ce cours pour faire la coordination entre la console et la logique."]}),"\n",(0,s.jsxs)(n.p,{children:["Il peut \xeatre difficile de d\xe9terminer le d\xe9coupage des ",(0,s.jsx)(n.strong,{children:"Manager"}),". Il serait possible de cr\xe9er un ",(0,s.jsx)(n.strong,{children:"AfficherUniversManager"})," et un ",(0,s.jsx)(n.strong,{children:"SupprimerUniversManager"}),". Par contre, la quantit\xe9 de classe risque d'\xeatre assez \xe9norme. Il serait plus int\xe9ressant de regrouper les t\xe2ches en fonction du mod\xe8le. Par exemple, ",(0,s.jsx)(n.strong,{children:"UniversManager"}),". Le ",(0,s.jsx)(n.strong,{children:"S"})," est encore respect\xe9, car cette classe s'occupe uniquement de coordonner ",(0,s.jsx)(n.strong,{children:"Univers"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Cr\xe9ez le dossier ",(0,s.jsx)(n.strong,{children:"Managers"}),". Dans ce dossier, cr\xe9ez la classe ",(0,s.jsx)(n.strong,{children:"UniversManager"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'namespace GestionPersonnageApp.Managers;\r\n\r\n/// <summary>\r\n/// Classe qui s\'occupe de la coordination du mod\xe8le Univers\r\n/// </summary>\r\npublic class UniversManager\r\n{\r\n    public void AfficherListe()\r\n    {\r\n        Console.WriteLine("Afficher tout.");\r\n    }\r\n\r\n    public void AfficherParId()\r\n    {\r\n        Console.WriteLine("Entrer la cl\xe9 de l\'univers.");\r\n        \r\n        int universId = Int32.Parse(Console.ReadLine());\r\n\r\n        Console.WriteLine($"Afficher univers #{universId}.");\r\n    }\r\n}\n'})}),"\n",(0,s.jsx)(n.h3,{id:"interface",children:"Interface"}),"\n",(0,s.jsx)(n.p,{children:"Les interfaces sont utilis\xe9es afin de d\xe9connecter encore plus l'application (App.cs) des classes qui r\xe9aliseront les op\xe9rations demand\xe9es (UniversManager). Une interface d\xe9finie une suite d'op\xe9rations que devront implanter les classes qui respectent cette interface. De cette fa\xe7on, il est possible d'injecter toute classe qui respectent l'interface. Une interface est, en quelque sorte, un contrat. Les classes indiquent qu'elles impl\xe9mentent toutes les fonctionnalit\xe9s d\xe9finies dans l'interface. Si une classe A utilisant une classe B respectant une interface C, alors A est assur\xe9e que toutes les fonctionnalit\xe9s de C sont implant\xe9es dans B."}),"\n",(0,s.jsxs)(n.p,{children:["G\xe9n\xe9rez automatiquement l'interface avec l'action rapide. Placez le curseur sur le nom de la classe, faites ",(0,s.jsx)(n.strong,{children:"CTRL+."})," (CTRL et le point) et s\xe9lectionnez ",(0,s.jsx)(n.strong,{children:"Extraire l'interface"}),". (ou ",(0,s.jsx)(n.strong,{children:"CTRL-R, CTRL_I"}),", ou Edition/Refactoriser/Extraire interface)"]}),"\n",(0,s.jsx)(n.p,{children:"N'oubliez pas de mettre des commentaires dans l'interface lorsque cette technique est utilis\xe9e."}),"\n",(0,s.jsx)(n.p,{children:"Voici ce \xe0 quoi l'interface devrait ressembler une fois document\xe9e."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:"namespace GestionPersonnageApp.Managers;\r\n\r\n/// <summary>\r\n/// Interface qui s'occupe de la coordination du mod\xe8le Univers\r\n/// </summary>\r\npublic interface IUniversManager\r\n{\r\n    /// <summary>\r\n    /// Afficher tous les univers\r\n    /// </summary>\r\n    void AfficherListe();\r\n\r\n    /// <summary>\r\n    /// Afficher un univers en fonction de sa cl\xe9 primaire\r\n    /// </summary>        \r\n    void AfficherParId();\r\n}\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["En ",(0,s.jsx)(n.strong,{children:"c#"}),", si un membre provient de l'interface, il faut seulement le documenter dans l'interface pour respecter le principe ",(0,s.jsx)(n.strong,{children:"DRY (Don't Repeate Yourself) ou Ne te r\xe9p\xe8te pas."})]})}),"\n",(0,s.jsx)(n.h3,{id:"enregistrement-du-manager---programcs",children:"Enregistrement du Manager - program.cs"}),"\n",(0,s.jsxs)(n.p,{children:["Remplacez la section de la configuration des services du fichier ",(0,s.jsx)(n.strong,{children:"Program.cs"})," par le code ci-dessous."]}),"\n",(0,s.jsxs)(n.p,{children:["Dans le fichier ",(0,s.jsx)(n.strong,{children:"Program.cs"}),", il faut enregistrer le ",(0,s.jsx)(n.strong,{children:"Manager"})," comme indiqu\xe9 \xe0 la ligne 7."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",metastring:"showLineNumbers",children:"//Configuration des services\r\nbuilder.ConfigureServices((context, services) =>\r\n{\r\n    services.AddTransient<App>(); //Application principale\r\n\r\n    //Manager\r\n    //highlight-next-line\r\n    services.AddTransient<IUniversManager, UniversManager>();\r\n});\n"})}),"\n",(0,s.jsx)(n.p,{children:"Cette ligne indique que si le code demande qqchose qui impl\xe9mente IUniversManager, l'injection de d\xe9pendances va fournir une instance de UniversManager."}),"\n",(0,s.jsx)(n.h2,{id:"iserviceprovider",children:"IServiceProvider"}),"\n",(0,s.jsxs)(n.p,{children:["Il serait possible d'injecter les ",(0,s.jsx)(n.strong,{children:"Manager"})," dans le constructeur comme l'exemple ci-dessous."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:"public App(IUniversManager universManager, IPersonnageManager personnageManager)\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Par contre, le programme risque d'avoir plusieurs ",(0,s.jsx)(n.strong,{children:"Manager"}),". Un seul ",(0,s.jsx)(n.strong,{children:"Manager"})," est n\xe9cessaire par ex\xe9cution du programme. Si tous les ",(0,s.jsx)(n.strong,{children:"Manager"})," sont inject\xe9s automatiquement lors de la cr\xe9ation de la classe ",(0,s.jsx)(n.strong,{children:"App"}),", beaucoup de m\xe9moire sera utilis\xe9e inutilement. Si le programme n\xe9cessite uniquement ",(0,s.jsx)(n.strong,{children:"UniversManager"}),", la cr\xe9ation de ",(0,s.jsx)(n.strong,{children:"PersonnageManager"})," sera inutile et consommera de la m\xe9moire et des ressources inutiles."]}),"\n",(0,s.jsxs)(n.p,{children:["Le service ",(0,s.jsx)(n.strong,{children:"IServiceProvider"}),", est en mesure de cr\xe9er uniquement les classes n\xe9cessaires \xe0 l'application console. Si l'application peut effectuer plusieurs t\xe2ches selon la r\xe9ception des param\xe8tres, il est pr\xe9f\xe9rable d'injecter uniquement la classe qui s'occupera de la coordination de la t\xe2che demand\xe9e."]}),"\n",(0,s.jsx)(n.admonition,{type:"important",children:(0,s.jsxs)(n.p,{children:["Il est recommand\xe9 de limiter l'utilisation du ",(0,s.jsx)(n.strong,{children:"IServiceProvider"})," au maximum. Il faut le mettre \xe0 un seul endroit dans le programme si c'est n\xe9cessaire. C'est une mauvaise pratique d'injecter partout le ",(0,s.jsx)(n.strong,{children:"IServiceProvider"}),"."]})}),"\n",(0,s.jsxs)(n.p,{children:["Il faut donc cr\xe9er ",(0,s.jsx)(n.strong,{children:"UniversManager"})," par cette technique."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:"IUniversManager universManager = _serviceProvider.GetRequiredService<IUniversManager>();\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Dans la classe ",(0,s.jsx)(n.strong,{children:"App"}),", il faut modifier la m\xe9thode ",(0,s.jsx)(n.strong,{children:"DemarrerApplicationAsync"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'public async Task DemarrerApplicationAsync()\r\n{\r\n    //Le point de d\xe9part de la logique de l\'application\r\n\r\n    switch (_args[0].ToLower())\r\n    {\r\n        case "-aide":\r\n            AfficherAide();\r\n            break;\r\n\r\n        case "-univers":\r\n\r\n            if (_args[1].ToLower() == "-afficher")\r\n            {\r\n                //highlight-start\r\n                //Cr\xe9ation du manager par le service d\'injection de d\xe9pendances.\r\n                IUniversManager universManager = _serviceProvider.GetRequiredService<IUniversManager>();\r\n\r\n                universManager.AfficherParId();\r\n                //highlight-end\r\n            }\r\n\r\n            break;\r\n\r\n        default:\r\n            Console.WriteLine("Argument non valide");\r\n            break;\r\n    }\r\n    \r\n    //highlight-start\r\n    //N\xe9cessaire, car il n\'y a aucun await dans le code et la m\xe9thode est async\r\n    await Task.CompletedTask;\r\n    //highlight-end\r\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"D\xe9marrez le programme pour tester."}),"\n",(0,s.jsx)(n.h2,{id:"le-repository",children:"Le Repository"}),"\n",(0,s.jsxs)(n.p,{children:["La technique d'injection de d\xe9pendances par interface permet de respecter le principe ",(0,s.jsx)(n.strong,{children:"D"})," de ",(0,s.jsx)(n.strong,{children:"SOLID"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"L'interface permet d'isoler la d\xe9pendance de la classe."}),"\n",(0,s.jsxs)(n.p,{children:["Pour d\xe9montrer l'utilit\xe9, nous allons cr\xe9er un ",(0,s.jsx)(n.strong,{children:"Repository"})," pour interroger les donn\xe9es. Pour l'instant, les donn\xe9es seront uniquement en m\xe9moire."]}),"\n",(0,s.jsxs)(n.p,{children:["Cr\xe9ez un dossier ",(0,s.jsx)(n.strong,{children:"Data"})," et \xe0 l'int\xe9rieur de celui-ci, cr\xe9ez la classe ",(0,s.jsx)(n.strong,{children:"Univers"}),". Cette classe est un \xe9l\xe9ment du mod\xe8le du domaine d'affaires. Le dossier ",(0,s.jsx)(n.strong,{children:"Data"})," contiendra les classes du mod\xe8le du domaine."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:"namespace GestionPersonnageApp.Data;\r\n\r\n/// <summary>\r\n/// Classe qui contient l'information d'un univers pour les personnages\r\n/// </summary>\r\npublic class Univers\r\n{\r\n    public int UniversId { get; set; }\r\n    public string Nom { get;set; }\r\n}\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["Selon la communaut\xe9 ",(0,s.jsx)(n.strong,{children:"csharp"}),", il n'est pas n\xe9cessaire de documenter une propri\xe9t\xe9 lorsque son nom est significatif."]})}),"\n",(0,s.jsxs)(n.p,{children:["Cr\xe9ez un dossier ",(0,s.jsx)(n.strong,{children:"Repositories"})," et \xe0 l'int\xe9rieur de celui-ci, cr\xe9ez l'interface ",(0,s.jsx)(n.strong,{children:"IUniversRepo"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Le dossier ",(0,s.jsx)(n.strong,{children:"Repositories"})," accueillera les classes qui s'occupent d'interagir avec les donn\xe9es du syst\xe8me."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:"using GestionPersonnageApp.Data;\r\n\r\nnamespace GestionPersonnageApp.Repositories;\r\n\r\npublic interface IUniversRepo\r\n{\r\n    Univers? ObtenirUnivers(int universId);\r\n    \r\n    List<Univers> ObtenirListe();\r\n}\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["Remarquez \xe9galement que la m\xe9thode retourne le type ",(0,s.jsx)(n.strong,{children:"Univers?"}),". Le ",(0,s.jsx)(n.strong,{children:"?"})," n'est pas obligatoire, mais si il n'est pas mis, le compilateur retournera un avertissement que l'objet peut \xeatre ",(0,s.jsx)(n.strong,{children:"null"}),". Le point d'interrogation permet d'indiquer au compilateur que la valeur ",(0,s.jsx)(n.strong,{children:"null"})," est possible dans notre logique. Si la m\xe9thode retourne ",(0,s.jsx)(n.strong,{children:"null"}),", c'est que l'univers n'a pas \xe9t\xe9 trouv\xe9."]})}),"\n",(0,s.jsxs)(n.p,{children:["Cr\xe9ez la classe ",(0,s.jsx)(n.strong,{children:"UniversV1Repo"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"Remarquez que la recherche de donn\xe9es n'est aucunement efficace."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'using GestionPersonnageApp.Data;\r\n\r\nnamespace GestionPersonnageApp.Repositories;\r\n\r\npublic class UniversV1Repo : IUniversRepo\r\n{\r\n    private List<Univers> _lstUnivers;\r\n\t\r\n\tpublic UniversV1Repo()\r\n\t{\r\n        //Cr\xe9ation d\'une liste en m\xe9moire\r\n\t\t_lstUnivers= new List<Univers>();\r\n\t\t_lstUnivers.Add(new Univers() { UniversId = 1, Nom = "Marvel"});\r\n        _lstUnivers.Add(new Univers() { UniversId = 2, Nom = "DC Comics" });\r\n        _lstUnivers.Add(new Univers() { UniversId = 3, Nom = "TMNT" });\r\n        _lstUnivers.Add(new Univers() { UniversId = 4, Nom = "Power Rangers" });\r\n    }\r\n\r\n    public Univers? ObtenirUnivers(int universId)\r\n    {\r\n        //Affiche un message dans la console du d\xe9veloppeur\r\n        System.Diagnostics.Debug.WriteLine("Utilisation de UniversV1Repo.");\r\n        Univers? univers = null;\r\n\r\n        //Aucunement efficace. La liste est enti\xe8rement visit\xe9e\r\n       for(int index = 0; index < _lstUnivers.Count; index++)\r\n        {\r\n            if(_lstUnivers[index].UniversId == universId)\r\n            {\r\n                univers = _lstUnivers[index];\r\n            }\r\n        }\r\n\r\n        return univers;\r\n    }\r\n    \r\n    public List<Univers> ObtenirListe()\r\n    {\r\n        return _lstUnivers;\r\n    }\r\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Cr\xe9ez la classe ",(0,s.jsx)(n.strong,{children:"UniversV2Repo"}),". Une requ\xeate ",(0,s.jsx)(n.strong,{children:"LINQ"})," en notation ",(0,s.jsx)(n.strong,{children:"Lambda"})," sera utilis\xe9e pour obtenir le bon univers."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",children:'using GestionPersonnageApp.Data;\r\n\r\nnamespace GestionPersonnageApp.Repositories;\r\n\r\npublic class UniversV2Repo : IUniversRepo\r\n{\r\n    private List<Univers> _lstUnivers;\r\n\r\n    public UniversV2Repo()\r\n    {\r\n        //Cr\xe9ation d\'une liste en m\xe9moire\r\n        _lstUnivers = new List<Univers>();\r\n        _lstUnivers.Add(new Univers() { UniversId = 1, Nom = "Marvel" });\r\n        _lstUnivers.Add(new Univers() { UniversId = 2, Nom = "DC Comics" });\r\n        _lstUnivers.Add(new Univers() { UniversId = 3, Nom = "TMNT" });\r\n        _lstUnivers.Add(new Univers() { UniversId = 4, Nom = "Power Rangers" });\r\n    }\r\n\r\n    public Univers? ObtenirUnivers(int universId)\r\n    {\r\n        //Affiche un message dans la console du d\xe9veloppeur\r\n        System.Diagnostics.Debug.WriteLine("Utilisation de UniversV2Repo.");\r\n        return _lstUnivers.Where(u => u.UniversId == universId).FirstOrDefault();\r\n    }\r\n    \r\n    public List<Univers> ObtenirListe()\r\n    {\r\n        return _lstUnivers;\r\n    }\r\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Vous pouvez mettre un ",(0,s.jsx)(n.strong,{children:"break point"})," \xe0 la ligne 22 des 2 classes UniversV1Repo et UniversV2Repo pour bien visualiser quelle classe sera utilis\xe9e."]}),"\n",(0,s.jsxs)(n.p,{children:["\xc9galement, le ",(0,s.jsx)(n.strong,{children:"System.Diagnostics.Debug.WriteLine"})," permet d'\xe9crire dans la console de d\xe9veloppement. Il y a beaucoup d'information dans cette console, mais le code de cette console est seulement pour le d\xe9veloppeur."]}),"\n",(0,s.jsx)("img",{src:"/4N1_2024/img/05_debug_console_1.png"}),"\n",(0,s.jsxs)(n.p,{children:["Les 3 prochaines sections illustrent 3 fa\xe7ons pour utiliser le ",(0,s.jsx)(n.strong,{children:"repository"})," dans ",(0,s.jsx)(n.strong,{children:"UniversManager"}),"."]}),"\n",(0,s.jsx)(n.admonition,{type:"important",children:(0,s.jsx)(n.p,{children:"La derni\xe8re technique devra \xeatre utilis\xe9e pour les travaux pratiques."})}),"\n",(0,s.jsx)(n.h2,{id:"cr\xe9ation-directe---new-class-\xe0-ne-pas-faire",children:"Cr\xe9ation directe - new class (\xe0 ne pas faire)"}),"\n",(0,s.jsxs)(n.p,{children:["Il faut modifier le ",(0,s.jsx)(n.strong,{children:"Manager"})," Univers pour utiliser le ",(0,s.jsx)(n.strong,{children:"Repository"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"Il ne faut pas faire la cr\xe9ation comme aux lignes 13 et 29."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",metastring:'showLineNumbers title="NE PAS UTILISER"',children:'using GestionPersonnageApp.Data;\r\nusing GestionPersonnageApp.Repositories;\r\n\r\nnamespace GestionPersonnageApp.Managers;\r\n\r\n/// <summary>\r\n/// Classe qui s\'occupe de la coordination de mod\xe8le Univers\r\n/// </summary>\r\npublic class UniversManager : IUniversManager\r\n{   \r\n    public void AfficherListe()\r\n    {\r\n        //highlight-next-line\r\n        UniversV1Repo universRepo = new UniversV1Repo();\r\n\r\n        List<Univers> lstUnivers = universRepo.ObtenirListe();\r\n\r\n        foreach(Univers univers in lstUnivers)\r\n        {\r\n            Console.WriteLine($"Id : {univers.UniversId}, Nom : {univers.Nom}");\r\n        }\r\n    }\r\n\r\n    public void AfficherParId()\r\n    {\r\n        Console.WriteLine("Entrer la cl\xe9 de l\'univers.");\r\n\r\n        int universId = Int32.Parse(Console.ReadLine());\r\n        //highlight-next-line\r\n        UniversV1Repo universRepo = new UniversV1Repo();\r\n\r\n        Univers? univers = universRepo.ObtenirUnivers(universId);\r\n\r\n        if (univers != null)\r\n        {\r\n            Console.WriteLine($"Id : {univers.UniversId}, Nom : {univers.Nom}");\r\n        }\r\n        else\r\n        {\r\n            Console.WriteLine("Univers non trouv\xe9.");\r\n        }\r\n    }\r\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"Si vous ex\xe9cutez le programme, le code fonctionnera."}),"\n",(0,s.jsxs)(n.p,{children:["Par contre, une cr\xe9ation directe rend la classe enti\xe8rement d\xe9pendante de la classe ",(0,s.jsx)(n.strong,{children:"UniversV1Repo"}),". Si nous d\xe9sirons utiliser ",(0,s.jsx)(n.strong,{children:"UniversV2Repo"}),", il faudra modifier dans tout le programme les emplacements appelant ",(0,s.jsx)(n.strong,{children:"new UniversV1Repo()"})," . Si cette classe est cr\xe9\xe9e 1 million de fois, il faut le modifier 1 million de fois. Il existe des outils de refactorisation pour nous aider, mais ce n'est pas l'id\xe9al. Seulement dans ",(0,s.jsx)(n.strong,{children:"UniversManager"}),", elle est cr\xe9\xe9e 2 fois."]}),"\n",(0,s.jsx)(n.h2,{id:"injection-de-la-classe-\xe0-\xe9viter",children:"Injection de la classe (\xe0 \xe9viter)"}),"\n",(0,s.jsx)(n.p,{children:"La 2e technique serait de l'injecter par le constructeur, en utilisant la classe."}),"\n",(0,s.jsxs)(n.p,{children:["Premi\xe8rement, il faut enregistrer le service ",(0,s.jsx)(n.strong,{children:"UniversV1Repo"}),". Remplacez la section de la configuration des services du fichier ",(0,s.jsx)(n.strong,{children:"Program.cs"})," par le code ci-dessous."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",metastring:'showLineNumbers title="NE PAS UTILISER"',children:"//Configuration des services\r\nbuilder.ConfigureServices((context, services) =>\r\n{\r\n    services.AddTransient<App>(); //Application principale\r\n\r\n    //Manager\r\n    services.AddTransient<IUniversManager, UniversManager>();\r\n\r\n    //Repo\r\n    //highlight-next-line\r\n    services.AddTransient<UniversV1Repo>();\r\n});\n"})}),"\n",(0,s.jsxs)(n.p,{children:["La classe ",(0,s.jsx)(n.strong,{children:"UniversManager"})," serait comme ci-dessous."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",metastring:'title="NE PAS UTILISER"',children:'using GestionPersonnageApp.Data;\r\nusing GestionPersonnageApp.Repositories;\r\n\r\nnamespace GestionPersonnageApp.Managers;\r\n\r\n/// <summary>\r\n/// Classe qui s\'occupe de la coordination de mod\xe8le Univers\r\n/// </summary>\r\npublic class UniversManager : IUniversManager\r\n{\r\n    //highlight-next-line\r\n    private readonly UniversV1Repo _universRepo;\r\n\r\n    //highlight-next-line\r\n    public UniversManager(UniversV1Repo universRepo)\r\n    {\r\n        _universRepo = universRepo;\r\n    }\r\n\r\n    public void AfficherListe()\r\n    {\r\n        List<Univers> lstUnivers = _universRepo.ObtenirListe();\r\n\r\n        foreach (Univers univers in lstUnivers)\r\n        {\r\n            Console.WriteLine($"Id : {univers.UniversId}, Nom : {univers.Nom}");\r\n        }\r\n    }\r\n\r\n    public void AfficherParId()\r\n    {\r\n        Console.WriteLine("Entrer la cl\xe9 de l\'univers.");\r\n\r\n        int universId = Int32.Parse(Console.ReadLine());\r\n\r\n        Univers? univers = _universRepo.ObtenirUnivers(universId);\r\n\r\n        if (univers != null)\r\n        {\r\n            Console.WriteLine(univers.Nom);\r\n        }\r\n        else\r\n        {\r\n            Console.WriteLine("Univers non trouv\xe9.");\r\n        }\r\n    }\r\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"Cette approche utilise l'injection de d\xe9pendances, mais utilise la classe impl\xe9ment\xe9e dans le constructeur."}),"\n",(0,s.jsxs)(n.p,{children:["Lorsque l'enregistrement de la d\xe9pendance sera remplac\xe9 par la nouvelle version comme ci-dessous, il faudra modifier \xe9galement tous les constructeurs qui utilisent ",(0,s.jsx)(n.strong,{children:"UniversV1Repo"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Remplacez la section de la configuration des services du fichier ",(0,s.jsx)(n.strong,{children:"Program.cs"})," par le code ci-dessous."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",metastring:'title="NE PAS UTILISER"',children:"\r\n//Configuration des services\r\nbuilder.ConfigureServices((context, services) =>\r\n{\r\n    services.AddTransient<App>(); //Application principale\r\n\r\n    //Manager\r\n    services.AddTransient<IUniversManager, UniversManager>();\r\n\r\n    //Repo\r\n    //highlight-next-line\r\n    services.AddTransient<UniversV2Repo>();\r\n});\n"})}),"\n",(0,s.jsxs)(n.p,{children:["D\xe9marrez le programme. Toutes les classes qui utilisent ",(0,s.jsx)(n.strong,{children:"UniversV1Repo"})," ne seront plus utilisables. Le programme aura cette exception lorsqu'il essayera de l'utiliser : ",(0,s.jsx)(n.strong,{children:"'Unable to resolve service for type 'GestionPersonnageApp.Repositories.UniversV1Repo' while attempting to activate 'GestionPersonnageApp.Managers.UniversManager'.'"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Pour simuler cette erreur, dans la classe ",(0,s.jsx)(n.strong,{children:"UniversManager"}),", conserver le constructeur ",(0,s.jsx)(n.strong,{children:"public UniversManager(UniversV1Repo universRepo)"}),"."]}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"ASTUCE :"})," Lorsque vous avez l'exception ",(0,s.jsx)(n.strong,{children:"Unable to resolve service for type"}),", la plupart du temps c'est que la classe n'est pas enregistr\xe9e dans les services disponibles par injection de d\xe9pendances."]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"injection-par-interface-approche-recommand\xe9e",children:"Injection par interface (approche recommand\xe9e)"}),"\n",(0,s.jsxs)(n.p,{children:["La meilleure approche est d'injecter l'",(0,s.jsx)(n.strong,{children:"interface"})," par le constructeur. Le ",(0,s.jsx)(n.strong,{children:"Manager"})," n'est plus d\xe9pendant d'une classe, mais d'une interface. Il sera maintenant plus efficace d'utiliser une 2e version du ",(0,s.jsx)(n.strong,{children:"repo"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Modifiez le code de ",(0,s.jsx)(n.strong,{children:"UniversManager"})," pour celui-ci. Le constructeur re\xe7oit l'interface ",(0,s.jsx)(n.strong,{children:"IUniversRepo"})," comme d\xe9pendance."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",metastring:'title="APPROCHE RECOMMAND\xc9E"',children:'using GestionPersonnageApp.Data;\r\nusing GestionPersonnageApp.Repositories;\r\n\r\nnamespace GestionPersonnageApp.Managers;\r\n\r\n/// <summary>\r\n/// Classe qui s\'occupe de la coordination de mod\xe8le Univers\r\n/// </summary>\r\npublic class UniversManager : IUniversManager\r\n{\r\n    //highlight-next-line\r\n    private readonly IUniversRepo _universRepo;\r\n    //highlight-next-line\r\n    public UniversManager(IUniversRepo universRepo)\r\n    {\r\n        _universRepo = universRepo;\r\n    }\r\n    public void AfficherListe()\r\n    {\r\n        Console.WriteLine("Afficher liste.");\r\n    }\r\n\r\n    public void AfficherParId()\r\n    {\r\n        Console.WriteLine("Entrer la cl\xe9 de l\'univers.");\r\n        \r\n        int universId = Int32.Parse(Console.ReadLine());        \r\n\r\n        Univers? univers = _universRepo.ObtenirUnivers(universId);\r\n\r\n        if(univers != null)\r\n        {\r\n            Console.WriteLine(univers.Nom);\r\n        }\r\n        else\r\n        {\r\n            Console.WriteLine("Univers non trouv\xe9.");\r\n        }\r\n    }\r\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Remplacez la section de la configuration des services du fichier ",(0,s.jsx)(n.strong,{children:"Program.cs"})," par le code ci-dessous. \xc0 la ligne 9, l'enregistrement se fait par l'interface."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",metastring:'title="APPROCHE RECOMMAND\xc9E"',children:"//Configuration des services\r\nbuilder.ConfigureServices((context, services) =>\r\n{\r\n    services.AddTransient<App>(); //Application principale\r\n\r\n    //Manager\r\n    services.AddTransient<IUniversManager, UniversManager>();\r\n\r\n    //Repo\r\n    //highlight-next-line\r\n    services.AddTransient<IUniversRepo, UniversV1Repo>();\r\n});\n"})}),"\n",(0,s.jsxs)(n.p,{children:["D\xe9marrez le programme. Il sera fonctionnel et il utilisera la classe ",(0,s.jsx)(n.strong,{children:"UniversV1Repo"})," lorsque l'interface ",(0,s.jsx)(n.strong,{children:"IUniversRepo"})," sera inject\xe9 dans un constructeur."]}),"\n",(0,s.jsxs)(n.p,{children:["Remplacez la section de la configuration des services du fichier ",(0,s.jsx)(n.strong,{children:"Program.cs"})," par le code ci-dessous pour que la classe soit maintenant ",(0,s.jsx)(n.strong,{children:"UniversV2Repo"}),"."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-csharp",metastring:'title="APPROCHE RECOMMAND\xc9E"',children:"//Configuration des services\r\nbuilder.ConfigureServices((context, services) =>\r\n{\r\n    services.AddTransient<App>(); //Application principale\r\n\r\n    //Manager\r\n    services.AddTransient<IUniversManager, UniversManager>();\r\n\r\n    //Repo\r\n    //highlight-next-line\r\n    services.AddTransient<IUniversRepo, UniversV2Repo>();\r\n});\n"})}),"\n",(0,s.jsxs)(n.p,{children:["D\xe9marrez le programme. Il sera fonctionnel et il utilisera la classe ",(0,s.jsx)(n.strong,{children:"UniversV2Repo"})," lorsque l'interface ",(0,s.jsx)(n.strong,{children:"IUniversRepo"})," sera inject\xe9e dans un constructeur. Si 1 million de classes utilisaient ",(0,s.jsx)(n.strong,{children:"IUniversRepo"}),", une seule ligne de code permet d'utiliser la nouvelle version dans tout le programme."]}),"\n",(0,s.jsxs)(n.p,{children:["Un autre avantage d'utiliser les interfaces est lors des tests. Il est possible de remplacer les d\xe9pendances par des ",(0,s.jsx)(n.strong,{children:"simulacres"}),". Les tests seront pr\xe9sent\xe9s plus tard dans la session."]}),"\n",(0,s.jsx)(n.h2,{id:"type-denregistrement-des-d\xe9pendances",children:"Type d'enregistrement des d\xe9pendances"}),"\n",(0,s.jsx)(n.p,{children:"Il existe 3 types d'enregistrement pour les d\xe9pendances. Ces types d'enregistrement consistent \xe0 la dur\xe9e de vie de l'instance de la classe qui sera cr\xe9\xe9e lors de l'injection."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Transient"})}),"\n",(0,s.jsx)(n.p,{children:"Une nouvelle instance est cr\xe9\xe9e \xe0 chaque fois qu'un objet demande une injection de cette d\xe9pendance."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Scoped"})}),"\n",(0,s.jsxs)(n.p,{children:["Une seule instance est cr\xe9\xe9e pour toute la dur\xe9e de vie du ",(0,s.jsx)(n.strong,{children:"scope"}),". Tous les objets qui demandent une injection de ce service \xe0 l'int\xe9rieur du ",(0,s.jsx)(n.strong,{children:"scope"})," auront la m\xeame instance."]}),"\n",(0,s.jsxs)(n.p,{children:["En application console, le ",(0,s.jsx)(n.strong,{children:"scope"})," doit \xeatre cr\xe9\xe9 manuellement."]}),"\n",(0,s.jsxs)(n.p,{children:["Par contre, dans le cas d'une application ",(0,s.jsx)(n.strong,{children:"Blazor Server"}),", un rafraichissement du navigateur ou un nouvel onglet consiste \xe0 un nouveau ",(0,s.jsx)(n.strong,{children:"scope"}),". Le changement de page sans rafraichissement du navigateur n'occasionne pas de changement de ",(0,s.jsx)(n.strong,{children:"scope"}),". Le ",(0,s.jsx)(n.strong,{children:"scope"})," consiste \xe0 la cr\xe9ation de la requ\xeate initiale avec le serveur par le navigateur."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"Singleton"})}),"\n",(0,s.jsx)(n.p,{children:"Une seule instance est cr\xe9\xe9e pour toute la dur\xe9e de vie de l'application."}),"\n"]}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>l,a:()=>a});var s=r(7294);const i={},t=s.createContext(i);function a(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(t.Provider,{value:n},e.children)}}}]);