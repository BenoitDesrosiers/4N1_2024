"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[6464],{2216:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>o,contentTitle:()=>a,default:()=>d,frontMatter:()=>s,metadata:()=>l,toc:()=>u});var i=n(5893),t=n(1151);const s={sidebar_position:430,draft:!1},a="Autorisation",l={id:"WPF partie 4/autorisation",title:"Autorisation",description:"L'autorisation consiste \xe0 v\xe9rifier si un utilisateur est en mesure de faire une action et/ou de visualiser une certaine information.",source:"@site/docs/76-WPF partie 4/autorisation.md",sourceDirName:"76-WPF partie 4",slug:"/WPF partie 4/autorisation",permalink:"/4N1_2024/docs/WPF partie 4/autorisation",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:430,frontMatter:{sidebar_position:430,draft:!1},sidebar:"NotesSidebar",previous:{title:"Message d'erreur",permalink:"/4N1_2024/docs/WPF partie 4/msg_erreur"},next:{title:"Message \xe0 l'utilisateur - MessageBox",permalink:"/4N1_2024/docs/WPF partie 4/msg_utilisateur"}},o={},u=[{value:"SuperCarte.Core",id:"supercartecore",level:2},{value:"Requ\xeate ObtenirRoleUtilisateur - UtilisateurRepo",id:"requ\xeate-obtenirroleutilisateur---utilisateurrepo",level:3},{value:"M\xe9thode VerifierRoleUtilisateur - UtilisateurService",id:"m\xe9thode-verifierroleutilisateur---utilisateurservice",level:3},{value:"SuperCarte.WPF",id:"supercartewpf",level:2},{value:"Ajout de la m\xe9thode EstAutorise - Authentificateur",id:"ajout-de-la-m\xe9thode-estautorise---authentificateur",level:3},{value:"S\xe9curiser les d\xe9pendances du ViewModel",id:"s\xe9curiser-les-d\xe9pendances-du-viewmodel",level:3},{value:"S\xe9curiser les commandes du ViewModel",id:"s\xe9curiser-les-commandes-du-viewmodel",level:3},{value:"ListeCategoriesVM au complet",id:"listecategoriesvm-au-complet",level:3}];function c(e){const r={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.h1,{id:"autorisation",children:"Autorisation"}),"\n",(0,i.jsx)(r.p,{children:"L'autorisation consiste \xe0 v\xe9rifier si un utilisateur est en mesure de faire une action et/ou de visualiser une certaine information."}),"\n",(0,i.jsx)(r.p,{children:"Une vue qui est accessible par tous les utilisateurs authentifi\xe9s doit s'assurer qu'il y a un utilisateur qui est connect\xe9."}),"\n",(0,i.jsxs)(r.p,{children:["L'application utilise des ",(0,i.jsx)(r.strong,{children:"r\xf4les"})," \xe9galement pour la s\xe9curit\xe9. Il peut y avoir des vues et des actions du programme qui ne sont pas accessibles par tous. Il faut s'assurer que l'utilisateur a le r\xf4le appropri\xe9."]}),"\n",(0,i.jsxs)(r.p,{children:["Il faut injecter dans tous les ",(0,i.jsx)(r.strong,{children:"ViewModels"})," la classe d'assistance ",(0,i.jsx)(r.strong,{children:"Authentificateur"})," pour que le ",(0,i.jsx)(r.strong,{children:"ViewModel"})," soit en mesure de faire les v\xe9rifications."]}),"\n",(0,i.jsxs)(r.p,{children:["\xc9galement, la v\xe9rification du r\xf4le se fait toujours dans la base de donn\xe9es. La classe ",(0,i.jsx)(r.strong,{children:"UtilisateurAuthentifieModel"})," ne contient pas l'information du r\xf4le. Il serait possible de l'inclure dans la classe, mais si le r\xf4le de l'utilisateur est modifi\xe9 en cours d'utilisation, son ancien r\xf4le sera toujours accessible tant qu'il sera connect\xe9. La validation du r\xf4le directement dans la base de donn\xe9es permet de s'assurer que l'utilisateur a toujours le r\xf4le n\xe9cessaire."]}),"\n",(0,i.jsx)(r.h2,{id:"supercartecore",children:"SuperCarte.Core"}),"\n",(0,i.jsx)(r.h3,{id:"requ\xeate-obtenirroleutilisateur---utilisateurrepo",children:"Requ\xeate ObtenirRoleUtilisateur - UtilisateurRepo"}),"\n",(0,i.jsxs)(r.p,{children:["La m\xe9thode pour obtenir le r\xf4le de l'utilisateur peut se retrouver dans ",(0,i.jsx)(r.strong,{children:"RoleRepo"})," ou dans ",(0,i.jsx)(r.strong,{children:"UtilisateurRepo"}),". La m\xe9thode retourne le ",(0,i.jsx)(r.strong,{children:"Role"}),", donc il pourrait \xeatre logique de le mettre dans ",(0,i.jsx)(r.strong,{children:"RoleRepo"}),". Pour d'autres, le r\xf4le est obtenu par l'utilisateur, donc c'est une requ\xeate pour l'utilisateur."]}),"\n",(0,i.jsxs)(r.p,{children:["Les 2 visions sont bonnes, mais il faut \xeatre coh\xe9rent. Si ",(0,i.jsx)(r.strong,{children:"RoleRepo"})," est choisi, la fonctionnalit\xe9 doit \xeatre dans ",(0,i.jsx)(r.strong,{children:"RoleService"}),". Si ",(0,i.jsx)(r.strong,{children:"UtilisateurRepo"})," est choisi, la fonctionnalit\xe9 doit \xeatre dans ",(0,i.jsx)(r.strong,{children:"UtilisateurService"}),"."]}),"\n",(0,i.jsxs)(r.p,{children:["Pour ce projet, ce sera ",(0,i.jsx)(r.strong,{children:"Utilisateur"})," qui aura les fonctionnalit\xe9s pour l'authentification."]}),"\n",(0,i.jsxs)(r.p,{children:["Dans l'interface ",(0,i.jsx)(r.strong,{children:"IUtilisateurRepo"}),", ajoutez ces 2 m\xe9thodes."]}),"\n",(0,i.jsxs)(r.p,{children:["Il y a la version ",(0,i.jsx)(r.strong,{children:"synchrone"})," et ",(0,i.jsx)(r.strong,{children:"asynchrone"})," de la requ\xeate."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:"/// <summary>\r\n/// Obtenir le r\xf4le d'un utilisateur en asynchrone\r\n/// </summary>\r\n/// <param name=\"utilisateurId\">Utilisateur Id</param>\r\n/// <returns>Le r\xf4le de l'utilisateur ou null si l'utilisateur est inexistant</returns>\r\nTask<Role?> ObtenirRoleUtilisateurAsync(int utilisateurId);\r\n\r\n/// <summary>\r\n/// Obtenir le r\xf4le d'un utilisateur en asynchrone\r\n/// </summary>\r\n/// <param name=\"utilisateurId\">Utilisateur Id</param>\r\n/// <returns>Le r\xf4le de l'utilisateur ou null si l'utilisateur est inexistant</returns>\r\nRole? ObtenirRoleUtilisateur(int utilisateurId);\n"})}),"\n",(0,i.jsxs)(r.p,{children:["Dans la classe ",(0,i.jsx)(r.strong,{children:"UtilisateurRepo"}),", ajoutez les 2 m\xe9thodes ci-dessous."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:"public async Task<Role?> ObtenirRoleUtilisateurAsync(int utilisateurId)\r\n{\r\n    return await (from lqUtilisateur in _bd.UtilisateurTb\r\n                  where\r\n                       lqUtilisateur.UtilisateurId == utilisateurId\r\n                  select\r\n                       lqUtilisateur.Role).FirstOrDefaultAsync();\r\n}\r\n\r\npublic Role? ObtenirRoleUtilisateur(int utilisateurId)\r\n{\r\n    return (from lqUtilisateur in _bd.UtilisateurTb\r\n            where\r\n                 lqUtilisateur.UtilisateurId == utilisateurId\r\n            select\r\n                 lqUtilisateur.Role).FirstOrDefault();\r\n}\n"})}),"\n",(0,i.jsx)(r.h3,{id:"m\xe9thode-verifierroleutilisateur---utilisateurservice",children:"M\xe9thode VerifierRoleUtilisateur - UtilisateurService"}),"\n",(0,i.jsx)(r.p,{children:"Le service doit avoir une m\xe9thode pour v\xe9rifier si l'utilisateur poss\xe8de l'un des r\xf4les \xe0 v\xe9rifier."}),"\n",(0,i.jsx)(r.p,{children:"Plusieurs r\xf4les peuvent avoir acc\xe8s \xe0 une fonctionnalit\xe9 ou \xe0 une vue. Si l'utilisateur poss\xe8de l'un de ses r\xf4les, il sera autoris\xe9."}),"\n",(0,i.jsxs)(r.p,{children:["Ajoutez ce code dans ",(0,i.jsx)(r.strong,{children:"IUtilisateurService"})]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:'/// <summary>\r\n/// V\xe9rifier l\'autorisation d\'un utilisateur \xe0 partir de r\xf4les autoris\xe9s en asynchrone.\r\n/// </summary>\r\n/// <param name="utilisateurId">Utilisateur Id \xe0 autoriser</param>\r\n/// <param name="lstNomRole">Liste des noms des r\xf4les autoris\xe9s</param>\r\n/// <returns>Vrai si l\'utilisateur est autoris\xe9, faux si non autoris\xe9</returns>\r\nTask<bool> AutoriserUtilisateurParRolesAsync(int utilisateurId, List<string> lstNomRole);\r\n\r\n/// <summary>\r\n/// V\xe9rifier l\'autorisation d\'un utilisateur \xe0 partir de r\xf4les autoris\xe9s en asynchrone.\r\n/// </summary>\r\n/// <param name="utilisateurId">Utilisateur Id \xe0 autoriser</param>\r\n/// <param name="lstNomRole">Liste des noms des r\xf4les autoris\xe9s</param>\r\n/// <returns>Vrai si l\'utilisateur est autoris\xe9, faux si non autoris\xe9</returns>\r\nbool AutoriserUtilisateurParRoles(int utilisateurId, List<string> lstNomRole);\n'})}),"\n",(0,i.jsxs)(r.p,{children:["Dans la classe ",(0,i.jsx)(r.strong,{children:"UtilisateurService"}),", ajoutez ces 3 m\xe9thodes"]}),"\n",(0,i.jsx)(r.p,{children:"Il faut obtenir le r\xf4le de l'utilisateur. Si le r\xf4le est dans la liste des r\xf4les autoris\xe9e, l'utilisateur re\xe7oit l'autorisation. Si le r\xf4le n'est pas dans la liste ou si l'utilisateur n'existe pas, il n'y a pas d'autorisation."}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:"public async Task<bool> AutoriserUtilisateurParRolesAsync(int utilisateurId, List<string> lstNomRole)\r\n{\r\n    Role? role = await _utilisateurRepo.ObtenirRoleUtilisateurAsync(utilisateurId);\r\n\r\n    return RoleAutorise(role, lstNomRole);\r\n\r\n}\r\n\r\npublic bool AutoriserUtilisateurParRoles(int utilisateurId, List<string> lstNomRole)\r\n{\r\n    Role? role = _utilisateurRepo.ObtenirRoleUtilisateur(utilisateurId);\r\n\r\n    return RoleAutorise(role, lstNomRole);\r\n\r\n}\r\n\r\nprivate bool RoleAutorise(Role? role, List<string> lstNomRole)\r\n{\r\n    if (role != null)\r\n    {\r\n        return lstNomRole.Contains(role.Nom);\r\n    }\r\n    else\r\n    {\r\n        return false;\r\n    }\r\n}\n"})}),"\n",(0,i.jsx)(r.h2,{id:"supercartewpf",children:"SuperCarte.WPF"}),"\n",(0,i.jsx)(r.h3,{id:"ajout-de-la-m\xe9thode-estautorise---authentificateur",children:"Ajout de la m\xe9thode EstAutorise - Authentificateur"}),"\n",(0,i.jsxs)(r.p,{children:["Dans l'interface ",(0,i.jsx)(r.strong,{children:"Aides/IAuthentificateur"}),", ajoutez les 2 m\xe9thodes ci-dessous."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:'/// <summary>\r\n/// V\xe9rifie si l\'utilisateur est autoris\xe9 en fonction des r\xf4les sp\xe9cifi\xe9s en asynchrone.\r\n/// </summary>\r\n/// <param name="nomRoles">Nom des r\xf4les autoris\xe9s</param>\r\n/// <returns>Vrai si autoris\xe9, faux si non autoris\xe9</returns>\r\nTask<bool> EstAutoriseAsync(params string[] nomRoles);\r\n\r\n/// <summary>\r\n/// V\xe9rifie si l\'utilisateur est autoris\xe9 en fonction des r\xf4les sp\xe9cifi\xe9s.\r\n/// </summary>\r\n/// <param name="nomRoles">Nom des r\xf4les autoris\xe9s</param>\r\n/// <returns>Vrai si autoris\xe9, faux si non autoris\xe9</returns>\r\nbool EstAutorise(params string[] nomRoles);\n'})}),"\n",(0,i.jsxs)(r.p,{children:["Dans la classe ",(0,i.jsx)(r.strong,{children:"Authentificateur"}),", ajoutez les 2 m\xe9thodes ci-dessous."]}),"\n",(0,i.jsxs)(r.p,{children:["La m\xe9thode re\xe7oit un param\xe8tre de type ",(0,i.jsx)(r.strong,{children:"params string[]"}),". Le mot-cl\xe9 ",(0,i.jsx)(r.strong,{children:"params"})," permet de sp\xe9cifier les diff\xe9rents \xe9l\xe9ments du tableau sans d\xe9clarer de tableau et en s\xe9parant un \xe9l\xe9ment du tableau comme un param\xe8tre unique. Par exemple, ",(0,i.jsx)(r.strong,{children:'EstAutoriseAsync("Role1", "Role2", "Role3")'})," est permis."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:"public async Task<bool> EstAutoriseAsync(params string[] nomRoles)\r\n{\r\n    if (UtilisateurAuthentifie != null)\r\n    {\r\n        return await _utilisateurService.AutoriserUtilisateurParRolesAsync(UtilisateurAuthentifie.UtilisateurId, nomRoles.ToList());\r\n    }\r\n    else\r\n    {\r\n        //highlight-next-line\r\n        return await Task.FromResult(false);\r\n    }\r\n}\r\n\r\npublic bool EstAutorise(params string[] nomRoles)\r\n{\r\n    if (UtilisateurAuthentifie != null)\r\n    {\r\n        return _utilisateurService.AutoriserUtilisateurParRoles(UtilisateurAuthentifie.UtilisateurId, nomRoles.ToList());\r\n    }\r\n    else\r\n    {\r\n        return false;\r\n    }\r\n}\n"})}),"\n",(0,i.jsx)(r.admonition,{type:"info",children:(0,i.jsxs)(r.p,{children:["Remarquez que la version async de la fonction doit retourner une Task. C'est pour ca qu'\xe0 la ligne 9, la fonction ",(0,i.jsx)(r.strong,{children:"Task.FromResult()"})," est utilis\xe9e"]})}),"\n",(0,i.jsx)(r.h3,{id:"s\xe9curiser-les-d\xe9pendances-du-viewmodel",children:"S\xe9curiser les d\xe9pendances du ViewModel"}),"\n",(0,i.jsxs)(r.p,{children:["Il faut faire ceci pour les ",(0,i.jsx)(r.strong,{children:"ViewModels"})," qui n\xe9cessitent une autorisation."]}),"\n",(0,i.jsxs)(r.p,{children:["L'exemple sera fait uniquement pour ",(0,i.jsx)(r.strong,{children:"ListeCategoriesVM"}),"."]}),"\n",(0,i.jsx)(r.admonition,{title:"Important",type:"warning",children:(0,i.jsx)(r.p,{children:"Pour le TP3, vous devez le faire pour toutes les interfaces"})}),"\n",(0,i.jsx)(r.admonition,{type:"info",children:(0,i.jsx)(r.p,{children:"Le code de la classe au complet se trouve \xe0 la fin de cette section"})}),"\n",(0,i.jsxs)(r.p,{children:["Il faut ajouter l'interface d'assistance ",(0,i.jsx)(r.strong,{children:"IAuthentificateur"})," dans les d\xe9pendances du ",(0,i.jsx)(r.strong,{children:"ViewModel"}),"."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers ",children:'\r\npublic class ListeCategoriesVM : BaseVM\r\n{\r\n    //highlight-start\r\n    //Attributs\r\n    private readonly string[] _rolesAutorises = { "Administrateur" };\r\n//highlight-end\r\n\r\n    //D\xe9pendances\r\n    private readonly ICategorieService _categorieService;\r\n    private readonly INavigateur _navigateur;\r\n    //highlight-next-line\r\n    private readonly IAuthentificateur _authentificateur;\r\n\r\n.\r\n.\r\n.\r\n\r\n/// <summary>\r\n/// Constructeur\r\n/// </summary>\r\n/// <param name="authentificateur">La classe d\'assistance d\'authentification</param>\r\n//highlight-next-line\r\n/// <param name="categorieService">Service du mod\xe8le Categorie</param>\r\n/// <param name="navigateur">La classe d\'assistance Navigateur</param>    \r\n//highlight-next-line\r\npublic ListeCategoriesVM(IAuthentificateur authentificateur, ICategorieService categorieService, INavigateur navigateur)\r\n{\r\n    //highlight-start\r\n    _authentificateur = authentificateur;\r\n\r\n    if (_authentificateur.EstAutorise(_rolesAutorises))\r\n    {\r\n        //highlight-end\r\n        _categorieService = categorieService;\r\n        _navigateur = navigateur;\r\n        ObtenirListeCommande = new AsyncRelayCommand(ObtenirListeAsync);\r\n        SupprimerCommande = new AsyncRelayCommand(SupprimerAsync, PeutSupprimer);\r\n        NouveauCommande = new RelayCommand(() => _navigateur.Naviguer<GestionCategorieVM, int>(0));\r\n        EditerCommande = new RelayCommand(() => _navigateur.Naviguer<GestionCategorieVM, int>(CategorieSelection.CategorieId),\r\n                                          () => CategorieSelection != null);\r\n    //highlight-next-line\r\n    }\r\n    \r\n}\n'})}),"\n",(0,i.jsxs)(r.p,{children:["Les r\xf4les globaux autoris\xe9s par ce ",(0,i.jsx)(r.strong,{children:"ViewModel"})," sont dans l'attribut ",(0,i.jsx)(r.strong,{children:"_rolesAutorises"}),". Si une v\xe9rification de r\xf4le doit se faire \xe0 partir des r\xf4les globaux, il est plus pratique d'utiliser un attribut. Il est ",(0,i.jsx)(r.strong,{children:"readonly"}),", car il ne faut pas que les r\xf4les soient modifiables en ex\xe9cution."]}),"\n",(0,i.jsxs)(r.p,{children:["La seule d\xe9pendance \xe0 \xeatre assign\xe9e avant la s\xe9curit\xe9 est la classe ",(0,i.jsx)(r.strong,{children:"Authentificateur"}),". Les autres d\xe9pendances et la cr\xe9ation des commandes se font uniquement si l'utilisateur est autoris\xe9. Il ne sera pas possible d'utiliser les commandes et les services dans le cas ou l'utilisateur n'est pas autoris\xe9."]}),"\n",(0,i.jsx)(r.p,{children:'D\xe9marrez le programme avec le compte "Administrateur" ci-dessous.'}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"fsthilaire"}),"\n",(0,i.jsx)(r.li,{children:"Native3!"}),"\n"]}),"\n",(0,i.jsx)(r.p,{children:"Vous allez avoir acc\xe8s \xe0 la vue."}),"\n",(0,i.jsx)(r.p,{children:'Essayez maintenant avec le compte "Utilisateur" ci-dessous.'}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"tstark"}),"\n",(0,i.jsx)(r.li,{children:"#NotAdmin!"}),"\n"]}),"\n",(0,i.jsxs)(r.p,{children:["La vue va g\xe9n\xe9rer une exception dans la m\xe9thode ",(0,i.jsx)(r.strong,{children:"UserControl_Loaded"})," pour le chargement automatique."]}),"\n",(0,i.jsxs)(r.p,{children:["Voici l'\xe9v\xe9nement du fichier ",(0,i.jsx)(r.strong,{children:"UcListeCategories.xaml.cs"}),"."]}),"\n",(0,i.jsxs)(r.p,{children:["Le programme ",(0,i.jsx)(r.strong,{children:"plante"}),", car la commande ",(0,i.jsx)(r.strong,{children:"ObtenirListeCommande"})," doit \xeatre ex\xe9cut\xe9e, mais elle est ",(0,i.jsx)(r.strong,{children:"null"}),", car l'utilisateur n'a pas acc\xe8s. Le ",(0,i.jsx)(r.strong,{children:"ViewModel"})," n'a pas cr\xe9\xe9 la commande."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:'showLineNumbers title="NE PAS COPIER"',children:"private async void UserControl_Loaded(object sender, RoutedEventArgs e)\r\n{\r\n    if(this.DataContext != null)\r\n    {\r\n        if(this.DataContext is ListeCategoriesVM)\r\n        {\r\n            await ((ListeCategoriesVM)this.DataContext).ObtenirListeCommande.ExecuteAsync(null);                \r\n        }\r\n    }\r\n}\n"})}),"\n",(0,i.jsx)(r.p,{children:"Pour corriger, il faut remplacer l'\xe9v\xe9nement par celle-ci. Il y a maintenant une v\xe9rification."}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:"private async void UserControl_Loaded(object sender, RoutedEventArgs e)\r\n{\r\n    if(this.DataContext != null)\r\n    {\r\n        if(this.DataContext is ListeCategoriesVM)\r\n        {\r\n            //highlight-next-line\r\n            if (((ListeCategoriesVM)this.DataContext).ObtenirListeCommande != null)\r\n            {\r\n                await ((ListeCategoriesVM)this.DataContext).ObtenirListeCommande.ExecuteAsync(null);\r\n            }                \r\n        }\r\n    }\r\n}\n"})}),"\n",(0,i.jsx)(r.p,{children:'Essayez de nouveau avec le compte "Utilisateur" ci-dessous.'}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"tstark"}),"\n",(0,i.jsx)(r.li,{children:"#NotAdmin!"}),"\n"]}),"\n",(0,i.jsx)(r.p,{children:"La vue s'affiche, mais la liste est vide et aucun bouton ne fonctionne."}),"\n",(0,i.jsx)(r.h3,{id:"s\xe9curiser-les-commandes-du-viewmodel",children:"S\xe9curiser les commandes du ViewModel"}),"\n",(0,i.jsxs)(r.p,{children:["Le r\xf4le d'un utilisateur peut \xeatre modifi\xe9 pendant qu'il est connect\xe9. Il faut s'assurer que les commandes effectuent la v\xe9rification de l'autorisation avant son ex\xe9cution. Il serait possible de mettre cette v\xe9rification dans le ",(0,i.jsx)(r.strong,{children:"CanExecute"})," de la commande, mais il ne serait pas possible de d\xe9tecter le changement d'un r\xf4le en cours d'ex\xe9cution. Il faut donc mettre la v\xe9rification dans la m\xe9thode ",(0,i.jsx)(r.strong,{children:"Execute"}),"."]}),"\n",(0,i.jsxs)(r.p,{children:["Voici par exemple la m\xe9thode ",(0,i.jsx)(r.strong,{children:"SupprimerAsync"})," de ",(0,i.jsx)(r.strong,{children:"ListeCategoriesVM"}),"."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:"private async Task SupprimerAsync()\r\n{\r\n    EstEnTravail = true;\r\n\r\n//highlight-next-line\r\n    if (_authentificateur.EstAutorise(_rolesAutorises))\r\n    //highlight-next-line\r\n    {\r\n        await _categorieService.SupprimerAsync(CategorieSelection!.CategorieId);\r\n\r\n        await ObtenirListeAsync();\r\n        //highlight-next-line\r\n    }\r\n\r\n    EstEnTravail = false;\r\n}\n"})}),"\n",(0,i.jsxs)(r.p,{children:["Il serait possible, par exemple, de permettre la visualisation \xe0 ",(0,i.jsx)(r.strong,{children:"Utilisateur"}),", mais permettre la suppression uniquement \xe0 ",(0,i.jsx)(r.strong,{children:"Administrateur"}),"."]}),"\n",(0,i.jsxs)(r.p,{children:["Il faudrait ajouter dans l'attribut  ",(0,i.jsx)(r.strong,{children:"_rolesAutorises"})," le r\xf4le ",(0,i.jsx)(r.strong,{children:"Utilisateur"}),", mais sp\xe9cifier uniquement le r\xf4le ",(0,i.jsx)(r.strong,{children:"Administrateur"})," dans la commande ",(0,i.jsx)(r.strong,{children:"Supprimer"}),"."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:'showLineNumbers title="NE PAS COPIER"',children:'private readonly string[] _rolesAutorises = { "Administrateur", "Utilisateur" };\r\n.\r\n.\r\n.\r\n\r\nprivate async Task SupprimerAsync()\r\n{\r\n    EstEnTravail = true;\r\n\r\n//highlight-next-line\r\n    if (_authentificateur.EstAutorise("Administrateur"))\r\n    {\r\n        await _categorieService.SupprimerAsync(CategorieSelection!.CategorieId);\r\n\r\n        await ObtenirListeAsync();\r\n    }\r\n\r\n    EstEnTravail = false;\r\n}\r\n\n'})}),"\n",(0,i.jsx)(r.h3,{id:"listecategoriesvm-au-complet",children:"ListeCategoriesVM au complet"}),"\n",(0,i.jsxs)(r.p,{children:["Voici la classe ",(0,i.jsx)(r.strong,{children:"ListeCategoriesVM"})," au complet."]}),"\n",(0,i.jsx)(r.admonition,{type:"info",children:(0,i.jsxs)(r.p,{children:["Pour le ",(0,i.jsx)(r.strong,{children:"TP 3"}),", toutes les fonctionnalit\xe9s  de la vue seront accessible par un seul r\xf4le."]})}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:"using CommunityToolkit.Mvvm.Input;\r\nusing SuperCarte.EF.Data;\r\n\r\nnamespace SuperCarte.WPF.ViewModels;\r\n\r\n/// <summary>\r\n/// ViewModel de la vue ListeCategories\r\n/// </summary>\r\npublic class ListeCategoriesVM : BaseVM\r\n{\r\n    //Attributs\r\n//highlight-next-line\r\n    private readonly string[] _rolesAutorises = { \"Administrateur\" };\r\n\r\n    //D\xe9pendances\r\n    private readonly ICategorieService _categorieService;\r\n    private readonly INavigateur _navigateur;\r\n//highlight-next-line\r\n    private readonly IAuthentificateur _authentificateur;\r\n\r\n    //Attributs des propri\xe9t\xe9s\r\n    private List<CategorieModel> _lstCategories;    \r\n    private CategorieModel? _categorieSelection;\r\n    private bool _estEnTravail = false;\r\n\r\n    /// <summary>\r\n    /// Constructeur\r\n    /// </summary>\r\n//highlight-next-line\r\n    /// <param name=\"authentificateur\">La classe d'assistance d'authentification</param>\r\n    /// <param name=\"categorieService\">Service du mod\xe8le Categorie</param>\r\n    /// <param name=\"navigateur\">La classe d'assistance Navigateur</param>   \r\n    //highlight-next-line \r\n\tpublic ListeCategoriesVM(IAuthentificateur authentificateur, ICategorieService categorieService, INavigateur navigateur)\r\n    {\r\n//highlight-next-line\r\n        _authentificateur = authentificateur;\r\n\r\n//highlight-start\r\n        if (_authentificateur.EstAutorise(_rolesAutorises))\r\n        {\r\n//highlight-end\r\n            _categorieService = categorieService;\r\n            _navigateur = navigateur;\r\n            ObtenirListeCommande = new AsyncRelayCommand(ObtenirListeAsync);\r\n            SupprimerCommande = new AsyncRelayCommand(SupprimerAsync, PeutSupprimer);\r\n            NouveauCommande = new RelayCommand(() => _navigateur.Naviguer<GestionCategorieVM, int>(0));\r\n            EditerCommande = new RelayCommand(() => _navigateur.Naviguer<GestionCategorieVM, int>(CategorieSelection.CategorieId),\r\n                                              () => CategorieSelection != null);\r\n//highlight-next-line\r\n        }\r\n    }\r\n\r\n    /// <summary>\r\n    /// Obtenir la liste de cat\xe9gories du service\r\n    /// </summary>    \r\n    private async Task ObtenirListeAsync()\r\n    {\r\n        EstEnTravail = true;\r\n        \r\n//highlight-next-line\r\n        if (_authentificateur.EstAutorise(_rolesAutorises))\r\n        {\r\n            ListeCategories = await _categorieService.ObtenirListeAsync();\r\n        }\r\n\r\n        EstEnTravail = false;\r\n    }\r\n\r\n    /// <summary>\r\n    /// Supprimer la cat\xe9gorie s\xe9lectionn\xe9e\r\n    /// </summary>    \r\n    private async Task SupprimerAsync()\r\n    {\r\n        EstEnTravail = true;\r\n\r\n//highlight-next-line\r\n        if (_authentificateur.EstAutorise(_rolesAutorises))\r\n        {\r\n            await _categorieService.SupprimerAsync(CategorieSelection!.CategorieId);\r\n\r\n            await ObtenirListeAsync();\r\n        }\r\n\r\n        EstEnTravail = false;\r\n    }\r\n\r\n    /// <summary>\r\n    /// V\xe9rifier si la commande supprimer peut s'ex\xe9cuter\r\n    /// </summary>\r\n    /// <returns>Vrai si elle peut s'ex\xe9cuter, faux si elle ne peut pas</returns>\r\n    private bool PeutSupprimer()\r\n    {        \r\n        //V\xe9rifie si une cat\xe9gorie peut \xeatre supprim\xe9e\r\n        if (CategorieSelection != null)\r\n        {\r\n            //Il y a une cat\xe9gorie s\xe9lectionn\xe9e\r\n\r\n            //Il faut emp\xeacher la v\xe9rification si l'op\xe9ration est en cours d'ex\xe9cution\r\n            //L'appel se fait en parall\xe8le avec l'ex\xe9cution et il y a une v\xe9rification dans la BD\r\n            //Entity Framework ne peut pas fonctionner en parall\xe8le avec la m\xeame instance du contexte.\r\n            //Cette v\xe9rification est seulement n\xe9cessaire dans le cas d'un appel avec la base de donn\xe9es.\r\n            if (SupprimerCommande.IsRunning == false)\r\n            {\r\n                //V\xe9rifie si elle a des d\xe9pendances\r\n                CategorieDependance? categorieDependance =\r\n                    _categorieService.ObtenirDependance(CategorieSelection.CategorieId);\r\n\r\n                //Si aucune cartes, elle peut \xeatre supprim\xe9e\r\n                return categorieDependance?.NbCartes == 0;\r\n            }\r\n            else\r\n            {\r\n                return false;\r\n            }\r\n        }\r\n        else\r\n        {\r\n            //Aucune cat\xe9gorie n'est s\xe9lectionn\xe9e\r\n            return false;\r\n        }\r\n    }\r\n\r\n    //Commandes\r\n    public IAsyncRelayCommand ObtenirListeCommande { get; private set; }\r\n    \r\n    public IAsyncRelayCommand SupprimerCommande { get; private set; }\r\n\r\n    public IRelayCommand NouveauCommande { get; private set; }\r\n\r\n    public IRelayCommand EditerCommande { get; private set; }\r\n\r\n    //Propri\xe9t\xe9s li\xe9es\r\n    public bool EstEnTravail\r\n    {\r\n        get\r\n        {\r\n            return _estEnTravail;\r\n        }\r\n        set\r\n        {\r\n            SetProperty(ref _estEnTravail, value);\r\n        }\r\n    }\r\n\r\n    public List<CategorieModel> ListeCategories\r\n    {\r\n        get\r\n        {\r\n            return _lstCategories;\r\n        }\r\n        set\r\n        {\r\n            SetProperty(ref _lstCategories, value);\r\n        }\r\n    }\r\n\r\n    public CategorieModel? CategorieSelection\r\n    {\r\n        get\r\n        {\r\n            return _categorieSelection;\r\n        }\r\n        set\r\n        {\r\n            if(SetProperty(ref _categorieSelection, value))\r\n            {\r\n                SupprimerCommande.NotifyCanExecuteChanged();\r\n                EditerCommande.NotifyCanExecuteChanged();\r\n            }\r\n        }\r\n    }\r\n}\n"})})]})}function d(e={}){const{wrapper:r}={...(0,t.a)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,r,n)=>{n.d(r,{Z:()=>l,a:()=>a});var i=n(7294);const t={},s=i.createContext(t);function a(e){const r=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function l(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:a(e.components),i.createElement(s.Provider,{value:r},e.children)}}}]);