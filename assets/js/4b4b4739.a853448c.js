"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[7418],{400:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>s,metadata:()=>a,toc:()=>d});var i=n(5893),t=n(1151);const s={sidebar_position:315,draft:!1},o="Ajout d'une cat\xe9gorie",a={id:"WPF partie 3/ajout_categorie",title:"Ajout d'une cat\xe9gorie",description:"Pour \xeatre en mesure d'ajouter une cat\xe9gorie, il faut cr\xe9er une vue de gestion qui permettra d'entrer les valeurs pour les champs de la cat\xe9gorie. Cette vue s'occupera de la visualisation, de la cr\xe9ation et de la modification.",source:"@site/docs/74-WPF partie 3/ajout_categorie.md",sourceDirName:"74-WPF partie 3",slug:"/WPF partie 3/ajout_categorie",permalink:"/4N1_2024/docs/WPF partie 3/ajout_categorie",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:315,frontMatter:{sidebar_position:315,draft:!1},sidebar:"NotesSidebar",previous:{title:"Bogus pour le tp3",permalink:"/4N1_2024/docs/WPF partie 3/bogus_navigateur"},next:{title:"Modifier une cat\xe9gorie",permalink:"/4N1_2024/docs/WPF partie 3/modif_categorie"}},l={},d=[{value:"SuperCarte.Core",id:"supercartecore",level:2},{value:"M\xe9thode d&#39;extension - CategorieMapExtension",id:"m\xe9thode-dextension---categoriemapextension",level:3},{value:"M\xe9thode de service: Ajouter  - CategorieService",id:"m\xe9thode-de-service-ajouter----categorieservice",level:3},{value:"SuperCarte.WPF",id:"supercartewpf",level:2},{value:"Cr\xe9ation du ViewModel - GestionCategorieVM",id:"cr\xe9ation-du-viewmodel---gestioncategorievm",level:3},{value:"Th\xe9orie",id:"th\xe9orie",level:3},{value:"GestionCategorieVM",id:"gestioncategorievm",level:3},{value:"Enregistrer le ViewModel - SCViewModelExtensions",id:"enregistrer-le-viewmodel---scviewmodelextensions",level:3},{value:"Cr\xe9ation de la vue - UcGestionCategorie.xaml",id:"cr\xe9ation-de-la-vue---ucgestioncategoriexaml",level:3},{value:"Ajout de la ressource pour cr\xe9er le lien entre ViewModel et Vue - MainWindow.xaml",id:"ajout-de-la-ressource-pour-cr\xe9er-le-lien-entre-viewmodel-et-vue---mainwindowxaml",level:3},{value:"Test - MainWindowsVM",id:"test---mainwindowsvm",level:3}];function c(e){const r={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,t.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.h1,{id:"ajout-dune-cat\xe9gorie",children:"Ajout d'une cat\xe9gorie"}),"\n",(0,i.jsx)(r.p,{children:"Pour \xeatre en mesure d'ajouter une cat\xe9gorie, il faut cr\xe9er une vue de gestion qui permettra d'entrer les valeurs pour les champs de la cat\xe9gorie. Cette vue s'occupera de la visualisation, de la cr\xe9ation et de la modification."}),"\n",(0,i.jsx)(r.h2,{id:"supercartecore",children:"SuperCarte.Core"}),"\n",(0,i.jsx)(r.h3,{id:"m\xe9thode-dextension---categoriemapextension",children:"M\xe9thode d'extension - CategorieMapExtension"}),"\n",(0,i.jsxs)(r.p,{children:["Lors d'un ajout, l'objet du domaine associ\xe9 \xe0 la vue n'a pas de cl\xe9 primaire car celle-ci sera g\xe9n\xe9r\xe9e lors de l'insertion dans la bd. La m\xe9thode ",(0,i.jsx)(r.strong,{children:"Copie"}),", ci-dessous, permet  de transf\xe9rer les valeurs de l'objet de donn\xe9es vers l'objet du domaine, incluant la cl\xe9 primaire si n\xe9cessaire. Cette m\xe9thode sera utilis\xe9e lors de l'ajout d'une nouvelle cat\xe9gorie, ou lors de son chargement \xe0 partir de la bd."]}),"\n",(0,i.jsxs)(r.p,{children:["Dans la classe ",(0,i.jsx)(r.strong,{children:"Extensions/CategorieMapExtension"}),", ajoutez la m\xe9thode ci-dessous."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:"/// <summary>\r\n/// M\xe9thode qui copie les valeurs des propri\xe9t\xe9s de l'objet de donn\xe9e Categorie dans l'objet du mod\xe8le CategorieModel\r\n/// </summary>\r\n/// <param name=\"itemDestination\">l'objet CategorieModel initialis\xe9e avec l'objet de donn\xe9es (la destination)</param>\r\n/// <param name=\"categorieSource\">L'objet Categorie qui vient d'\xeatre charg\xe9 de la bd (la source)</param>\r\n/// <param name=\"copierClePrimaire\">Copier ou non la cl\xe9 primaire</param>\r\npublic static void Copie(this CategorieModel itemDestination, Categorie categorieSource, bool copierClePrimaire)\r\n{\r\n    if (copierClePrimaire == true)\r\n    {\r\n        itemDestination.CategorieId = categorieSource.CategorieId;\r\n    }\r\n\r\n    itemDestination.Nom = categorieSource.Nom;\r\n    itemDestination.Description = categorieSource.Description;\r\n}\n"})}),"\n",(0,i.jsx)(r.p,{children:"Cette m\xe9thode d'extension a 3 param\xe8tres, mais seulement 2 seront visibles lorsqu'elle sera utilis\xe9e car le premier est this (l'objet sur lequel est appel\xe9e cette fonction). Le premier est l'objet du domaine de r\xe9f\xe9rence qui sera utilis\xe9e pour faire la copie dans l'objet de donn\xe9es que poss\xe8de l'extension. Le 2e param\xe8tre est pour copier ou non la valeur de la cl\xe9 primaire."}),"\n",(0,i.jsx)(r.h3,{id:"m\xe9thode-de-service-ajouter----categorieservice",children:"M\xe9thode de service: Ajouter  - CategorieService"}),"\n",(0,i.jsx)(r.p,{children:"Il faut ajouter dans le service la m\xe9thode permettant d'inscrire une nouvelle cat\xe9gorie dans la bd (via le repo). La m\xe9thode est tr\xe8s simple pour le moment. Elle sera un peu plus complexe lors de l'ajout des de la validation des champs."}),"\n",(0,i.jsxs)(r.p,{children:["Dans l'interface ",(0,i.jsx)(r.strong,{children:"Services/ICategorieService.cs"}),", ajoutez la signature de la m\xe9thode ci-dessous."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:'/// <summary>\r\n/// Ajouter une cat\xe9gorie en asynchrone.\r\n/// </summary>\r\n/// <param name="categorieModel">Categorie \xe0 ajouter</param>\r\n/// <returns>Vrai si ajout\xe9e, faux si non ajout\xe9e</returns>\r\nTask<bool> AjouterAsync(CategorieModel categorieModel);\n'})}),"\n",(0,i.jsxs)(r.p,{children:["Dans la classe ",(0,i.jsx)(r.strong,{children:"CategorieService.cs"}),", ajoutez l'impl\xe9mentation de la m\xe9thode."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:"public async Task<bool> AjouterAsync(CategorieModel categorieModel)\r\n{\r\n    //Transformation de l'objet du mod\xe8le du domaine en objet du mod\xe8le de donn\xe9es\r\n    Categorie categorie = categorieModel.VersCategorie();\r\n\r\n    //Ajout dans le repository avec enregistrement imm\xe9diat\r\n    await _categorieRepo.AjouterAsync(categorie, true);\r\n\r\n    //Assigne les valeurs de la base de donn\xe9es dans l'objet du mod\xe8le\r\n    categorieModel.Copie(categorie, true);\r\n    \r\n    return true;\r\n}\n"})}),"\n",(0,i.jsxs)(r.p,{children:["Ajoutez aussi le ",(0,i.jsx)(r.strong,{children:"using de SuperCarte.EF.Data"})," si n\xe9cessaire."]}),"\n",(0,i.jsxs)(r.p,{children:["Il faut convertir l'objet ",(0,i.jsx)(r.strong,{children:"CategorieModel"})," en ",(0,i.jsx)(r.strong,{children:"Categorie"})," (ligne 4), car le ",(0,i.jsx)(r.strong,{children:"Repository"})," utilise le mod\xe8le de donn\xe9es."]}),"\n",(0,i.jsxs)(r.p,{children:["Il faut mettre \xe0 jour les valeurs dans l'objet du domaine, principalement pour connaitre la cl\xe9 primaire (ligne 10). Il n'est pas n\xe9cessaire au ",(0,i.jsx)(r.strong,{children:"Respository"})," de retourner l'objet, car il met \xe0 jour la m\xeame instance (param\xe8tre par r\xe9f\xe9rence... comme la majorit\xe9 du temps en OO). Le m\xeame principe sera utilis\xe9 pour le service."]}),"\n",(0,i.jsx)(r.h2,{id:"supercartewpf",children:"SuperCarte.WPF"}),"\n",(0,i.jsx)(r.h3,{id:"cr\xe9ation-du-viewmodel---gestioncategorievm",children:"Cr\xe9ation du ViewModel - GestionCategorieVM"}),"\n",(0,i.jsxs)(r.p,{children:["Cr\xe9ez la classe ",(0,i.jsx)(r.strong,{children:"GestionCategorieVM.cs"})," dans le dossier ",(0,i.jsx)(r.strong,{children:"ViewModels"})," du projet ",(0,i.jsx)(r.strong,{children:"SuperCarte.WPF"}),"."]}),"\n",(0,i.jsxs)(r.p,{children:["Premi\xe8rement, il faut ajouter les d\xe9pendances du ",(0,i.jsx)(r.strong,{children:"ViewModel"}),". Il y a seulement le service des cat\xe9gories."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:"namespace SuperCarte.WPF.ViewModels;\r\n\r\n/// <summary>\r\n/// ViewModel de la vue Gestion Categorie\r\n/// </summary>\r\npublic class GestionCategorieVM : BaseVM\r\n{\r\n    #region D\xe9pendances\r\n    private readonly ICategorieService _categorieService;\r\n    #endregion\r\n\r\n    public GestionCategorieVM(ICategorieService categorieService)\r\n\t{\r\n        _categorieService = categorieService;\r\n    }\r\n}\r\n\n"})}),"\n",(0,i.jsx)(r.p,{children:"Ensuite, il faut penser aux propri\xe9t\xe9s de la vue."}),"\n",(0,i.jsx)(r.h3,{id:"th\xe9orie",children:"Th\xe9orie"}),"\n",(0,i.jsx)(r.p,{children:"Il y a 2 options pour les propri\xe9t\xe9s."}),"\n",(0,i.jsxs)(r.p,{children:["La premi\xe8re est de cr\xe9er une propri\xe9t\xe9 dans le ",(0,i.jsx)(r.strong,{children:"ViewModel"})," pour chacune des ",(0,i.jsx)(r.strong,{children:"propri\xe9t\xe9s"})," du mod\xe8le du domaine."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:'showLineNumbers title="NE PAS COPIER"',children:"public string Nom\r\n{\r\n\tget\r\n\t{\r\n\t\treturn _nom;\r\n\t}\r\n\tset\r\n\t{\r\n\t\tSetProperty(ref _nom, value);\r\n\t}\r\n}\n"})}),"\n",(0,i.jsxs)(r.p,{children:["La 2e option est de cr\xe9er une propri\xe9t\xe9 dans le ",(0,i.jsx)(r.strong,{children:"ViewModel"})," pour ",(0,i.jsx)(r.strong,{children:"l'objet"})," du mod\xe8le, et de faire le ",(0,i.jsx)(r.strong,{children:"binding"})," sur les ",(0,i.jsx)(r.strong,{children:"propri\xe9t\xe9s"})," de cet objet dans la vue."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:'showLineNumbers title="NE PAS COPIER"',children:'//ViewModel\r\npublic CategorieModel Categorie { get; set;}\r\n\r\n//Vue\r\n<TextBox Text="{Binding Categorie.Nom }" />\r\n\n'})}),"\n",(0,i.jsx)(r.p,{children:"Dans la 2e option, il n'y a pas la m\xe9canique de notification du changement de valeur de propri\xe9t\xe9. Comme il a \xe9t\xe9 pr\xe9sent\xe9 pour la vue active du navigateur, la notification doit se faire directement sur la propri\xe9t\xe9 qui est li\xe9e."}),"\n",(0,i.jsxs)(r.p,{children:["Il faudrait donc modifier la classe du mod\xe8le pour h\xe9riter de ",(0,i.jsx)(r.strong,{children:"ObservableObject"})," et avoir un attribut pour conserver la valeur de la propri\xe9t\xe9."]}),"\n",(0,i.jsx)(r.p,{children:"Par exemple."}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:'showLineNumbers title="NE PAS COPIER"',children:"public class CategorieModel : ObservableObject\r\n{\r\n\tpublic string _nom;\r\n\t\r\n    public string Nom \r\n    { \r\n\t    get\r\n\t    {\r\n\t    \treturn _nom;\r\n\t    }\r\n\t    set\r\n\t    {\r\n\t    \tSetProperty(ref _nom, value);\r\n\t    }\r\n    }\r\n}\n"})}),"\n",(0,i.jsxs)(r.p,{children:["L'avantage de la premi\xe8re approche est que le mod\xe8le du domaine est ind\xe9pendant de la logique ",(0,i.jsx)(r.strong,{children:"MVVM"}),". Le service peut \xeatre r\xe9utilis\xe9 dans un API Web et cette m\xe9canique n'est pas n\xe9cessaire pour celle-ci. Par contre, il faut penser de faire la transformation entre les propri\xe9t\xe9s du ",(0,i.jsx)(r.strong,{children:"ViewModel"})," et le ",(0,i.jsx)(r.strong,{children:"mod\xe8le de donn\xe9es"})," dans le ",(0,i.jsx)(r.strong,{children:"ViewModel"}),"."]}),"\n",(0,i.jsxs)(r.p,{children:["L'avantage de la 2e approche est qu'il n'est pas n\xe9cessaire de faire la transformation entre le ",(0,i.jsx)(r.strong,{children:"ViewModel"})," et le ",(0,i.jsx)(r.strong,{children:"mod\xe8le de donn\xe9es"}),". Par contre, le mod\xe8le a une m\xe9canique de notification qui n'est pas toujours n\xe9cessaire selon le type d'architecture."]}),"\n",(0,i.jsx)(r.admonition,{type:"info",children:(0,i.jsxs)(r.p,{children:["Pour ce projet et le ",(0,i.jsx)(r.strong,{children:"TP 3"}),", la premi\xe8re approche sera utilis\xe9e."]})}),"\n",(0,i.jsx)(r.h3,{id:"gestioncategorievm",children:"GestionCategorieVM"}),"\n",(0,i.jsxs)(r.p,{children:["Il faut cr\xe9er les propri\xe9t\xe9s li\xe9es. Pour s'aider \xe0 faire l'assignation entre le ",(0,i.jsx)(r.strong,{children:"ViewModel"})," et le ",(0,i.jsx)(r.strong,{children:"mod\xe8le de donn\xe9es"}),", les m\xe9thodes ",(0,i.jsx)(r.strong,{children:"VersModele()"})," et ",(0,i.jsx)(r.strong,{children:"VersVM()"})," sont ajout\xe9es."]}),"\n",(0,i.jsxs)(r.p,{children:["\xc9galement, la propri\xe9t\xe9 ",(0,i.jsx)(r.strong,{children:"CategorieId"})," qui repr\xe9sente la cl\xe9 primaire peut seulement \xeatre assign\xe9e par le ",(0,i.jsx)(r.strong,{children:"ViewModel"}),". Il ne faut pas que la ",(0,i.jsx)(r.strong,{children:"Vue"})," soit en mesure de la modifier (private set \xe0 la ligne 116)."]}),"\n",(0,i.jsxs)(r.p,{children:["\xc0 la ligne 141, l'assignation de la propri\xe9t\xe9 Description a une v\xe9rification de chaine vide. Dans le cas que la chaine est vide ou avec uniquement des espaces, il faut retourner ",(0,i.jsx)(r.strong,{children:"null"}),", car c'est un champ non obligatoire."]}),"\n",(0,i.jsx)(r.admonition,{type:"tip",children:(0,i.jsxs)(r.p,{children:["Il sera important de faire ceci pour tous les champs non obligatoires du ",(0,i.jsx)(r.strong,{children:"TP 3"}),"."]})}),"\n",(0,i.jsx)(r.admonition,{type:"note",children:(0,i.jsx)(r.p,{children:"La propri\xe9t\xe9 EstEnTravail (ligne 96) servira plus tard afin de controller la barre de progression lors du chargement"})}),"\n",(0,i.jsxs)(r.p,{children:["Ensuite, il faut cr\xe9er la commande ",(0,i.jsx)(r.strong,{children:"Enregistrer"}),". L'ajout et la modification utiliseront la m\xeame commande. Selon l'\xe9tat du ",(0,i.jsx)(r.strong,{children:"ViewModel"}),", le ",(0,i.jsx)(r.strong,{children:"ViewModel"})," d\xe9terminera si c'est un ajout ou une modification. Pour l'instant, la logique est uniquement pour l'ajout."]}),"\n",(0,i.jsxs)(r.p,{children:["Dans la m\xe9thode ",(0,i.jsx)(r.strong,{children:"EnregistrerAsync()"}),", l'utilisation des m\xe9thodes d'assignation est n\xe9cessaire pour r\xe9cup\xe9rer les valeurs de la vue et de les mettre \xe0 jour."]}),"\n",(0,i.jsxs)(r.p,{children:["Remplacez le code de ",(0,i.jsx)(r.strong,{children:"GestionCategorieVM"})," par celui-ci"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:'using CommunityToolkit.Mvvm.Input;\r\nusing SuperCarte.WPF.Views;\r\n\r\nnamespace SuperCarte.WPF.ViewModels;\r\n\r\n/// <summary>\r\n/// ViewModel de la vue Gestion Categorie\r\n/// </summary>\r\npublic class GestionCategorieVM : BaseVM\r\n{\r\n    #region D\xe9pendances\r\n    private readonly ICategorieService _categorieService;\r\n    #endregion\r\n\r\n//highlight-start\r\n    #region Attributs des propri\xe9t\xe9s\r\n    private int _categorieId;\r\n    private string _nom;\r\n    private string? _description;\r\n    private bool _estEnTravail = false;\r\n    #endregion\r\n//highlight-end\r\n\r\n    public GestionCategorieVM(ICategorieService categorieService)\r\n\t{\r\n        _categorieService = categorieService;\r\n\r\n//highlight-start\r\n        EnregistrerCommande = new AsyncRelayCommand(EnregistrerAsync);\r\n//highlight-end\r\n    }\r\n\r\n//highlight-start\r\n    #region M\xe9thodes des commandes\r\n\t/// <summary>\r\n    /// Enregistrer la cat\xe9gorie\r\n    /// </summary>    \r\n    private async Task EnregistrerAsync()\r\n    {\r\n        EstEnTravail = true;\r\n        bool estEnregistre;\r\n\r\n        CategorieModel categorieModel = VersModele();\r\n\r\n        estEnregistre = await _categorieService.AjouterAsync(categorieModel);\r\n\r\n        if (estEnregistre == true)\r\n        {\r\n            VersVM(categorieModel);\r\n        }\r\n        else\r\n        {           \r\n            throw new Exception("Erreur. Impossible d\'enregistrer");\r\n        }\r\n\r\n        EstEnTravail = false;\r\n    }\r\n    #endregion\r\n\r\n    #region Commandes\r\n    public IAsyncRelayCommand EnregistrerCommande { get; private set; }\r\n    #endregion   \r\n\r\n    #region M\xe9thodes d\'assignation\r\n    /// <summary>\r\n    /// Assigner les propri\xe9t\xe9s li\xe9es du ViewModel vers les propri\xe9t\xe9s du mod\xe8le\r\n    /// </summary>\r\n    /// <returns>Objet du mod\xe8le</returns>\r\n    private CategorieModel VersModele()\r\n    {\r\n        return new CategorieModel\r\n        {\r\n            CategorieId = this.CategorieId,\r\n            Nom = this.Nom,\r\n            Description = this.Description\r\n        };\r\n    }\r\n\r\n    /// <summary>\r\n    /// Assigner les propri\xe9t\xe9s du mod\xe8le vers les propri\xe9t\xe9s li\xe9es du ViewModel\r\n    /// </summary>\r\n    /// <param name="categorieModel">Mod\xe8le</param>\r\n    private void VersVM(CategorieModel? categorieModel)\r\n    {\r\n        if (categorieModel != null)\r\n        { \r\n            CategorieId = categorieModel.CategorieId;\r\n            Nom = categorieModel.Nom;\r\n            Description = categorieModel.Description;\r\n        }\r\n        else\r\n        {\r\n            CategorieId = 0;\r\n            Nom = string.Empty;\r\n            Description = null;\r\n        }\r\n    }\r\n    #endregion\r\n\r\n    #region Propri\xe9t\xe9s li\xe9es\r\n    public bool EstEnTravail\r\n    {\r\n        get\r\n        {\r\n            return _estEnTravail;\r\n        }\r\n        set\r\n        {\r\n            SetProperty(ref _estEnTravail, value);\r\n        }\r\n    }\r\n\r\n    public int CategorieId\r\n    {\r\n        get \r\n        { \r\n            return _categorieId;\r\n        }\r\n        set\r\n        {\r\n            SetProperty(ref _categorieId, value);\r\n        }\r\n    }\r\n\r\n    public string Nom\r\n    {\r\n        get\r\n        {\r\n            return _nom;\r\n        }\r\n        set\r\n        {\r\n            SetProperty(ref _nom, value);\r\n        }\r\n    }\r\n\r\n    public string? Description\r\n    {\r\n        get\r\n        {\r\n            return _description;\r\n        }\r\n        set\r\n        {\r\n            //Permet de remplacer une chaine vide par null\r\n            SetProperty(ref _description, string.IsNullOrWhiteSpace(value) ? null : value );\r\n        }\r\n    }\r\n    #endregion\r\n//highlight-end\r\n\r\n}\n'})}),"\n",(0,i.jsx)(r.h3,{id:"enregistrer-le-viewmodel---scviewmodelextensions",children:"Enregistrer le ViewModel - SCViewModelExtensions"}),"\n",(0,i.jsxs)(r.p,{children:["Dans la classe ",(0,i.jsx)(r.strong,{children:"SCViewModelExtensions"}),", il faut enregistrer le ",(0,i.jsx)(r.strong,{children:"ViewModel"}),"."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:"public static void EnregistrerViewModels(this IServiceCollection services)\r\n{\r\n    services.AddTransient<MainWindowVM>();\r\n    services.AddTransient<ListeCategoriesVM>();\r\n    services.AddTransient<ListeCartesVM>();\r\n\t//highlight-next-line\r\n    services.AddTransient<GestionCategorieVM>();\r\n}\n"})}),"\n",(0,i.jsx)(r.h3,{id:"cr\xe9ation-de-la-vue---ucgestioncategoriexaml",children:"Cr\xe9ation de la vue - UcGestionCategorie.xaml"}),"\n",(0,i.jsx)(r.admonition,{type:"note",children:(0,i.jsx)(r.p,{children:"Cette vue n'utilisera pas les fichiers ressources pour la traduction, mais dans la r\xe9alit\xe9, il faudrait pr\xe9voir ceci."})}),"\n",(0,i.jsxs)(r.p,{children:["Cr\xe9ez le fichier ",(0,i.jsx)(r.strong,{children:"UcGestionCategorie.xaml"})," dans le dossier ",(0,i.jsx)(r.strong,{children:"Views"}),". (Uc comme dans Contr\xf4le Usager (WPF))"]}),"\n",(0,i.jsxs)(r.p,{children:["La premi\xe8re \xe9tape consiste \xe0 indiquer le ",(0,i.jsx)(r.strong,{children:"ViewModel"})," qui sera utilis\xe9. Ce n'est pas obligatoire, mais en ajoutant les lignes 7 et 8 ci-dessous, il sera possible d'avoir des suggestions lors du ",(0,i.jsx)(r.strong,{children:"Binding"}),"."]}),"\n",(0,i.jsx)(r.p,{children:"La grille principale est s\xe9par\xe9e en 4 rang\xe9es. La premi\xe8re pour le titre, la 2e pour les boutons, la 3e pour le formulaire et la 4e pour la barre de progression."}),"\n",(0,i.jsxs)(r.p,{children:["Le bouton ",(0,i.jsx)(r.strong,{children:"Enregistrer"})," est li\xe9 \xe0 la commande (ligne 32-35 )"]}),"\n",(0,i.jsxs)(r.p,{children:["Pour faire le formulaire, il est possible d'int\xe9grer un ",(0,i.jsx)(r.strong,{children:"Grid"})," dans un autre ",(0,i.jsx)(r.strong,{children:"Grid"})," te qu'utilis\xe9 pour la Rang\xe9 2 (ligne 41)."]}),"\n",(0,i.jsx)(r.p,{children:"Il faut 2 colonnes pour le formulaire (ligne 47-48). La premi\xe8re pour le titre et la 2e pour le composant de saisie."}),"\n",(0,i.jsxs)(r.p,{children:["Le formulaire s'adapte \xe0 la largeur de la fen\xeatre, mais si la largeur est trop petite, elle ne sera pas fonctionnelle. Il serait possible de faire comme en Web de passer \xe0 une colonne si la largeur est insuffisante, mais il faudrait int\xe9grer des ",(0,i.jsx)(r.strong,{children:"<WrapPanel>"})," et plusieurs sous ",(0,i.jsx)(r.strong,{children:"Grid"}),"."]}),"\n",(0,i.jsxs)(r.p,{children:["Il faut pr\xe9voir un espace en dessous du contr\xf4le pour afficher le message de validation. Il est assez compliqu\xe9 en ",(0,i.jsx)(r.strong,{children:"XAML"})," de rendre ceci dynamique, car le message n'est pas consid\xe9r\xe9 dans la grille. Il est plus facile d'utiliser une taille fixe."]}),"\n",(0,i.jsxs)(r.p,{children:["Il est possible d'appliquer un ",(0,i.jsx)(r.strong,{children:"Padding"})," pour ajuster l'emplacement du texte \xe0 l'int\xe9rieur de la zone de texte."]}),"\n",(0,i.jsxs)(r.p,{children:["Voici le fichier ",(0,i.jsx)(r.strong,{children:"UcGestionCategorie.xaml"})," au complet."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-xaml",metastring:"showLineNumbers",children:'<UserControl x:Class="SuperCarte.WPF.Views.UcGestionCategorie"\r\n             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"\r\n             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"\r\n             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" \r\n             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" \r\n             xmlns:local="clr-namespace:SuperCarte.WPF.Views"\r\n             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"\r\n             d:DataContext="{d:DesignInstance vm:GestionCategorieVM}"\r\n             mc:Ignorable="d" \r\n             d:DesignHeight="450" d:DesignWidth="800">\r\n    <Grid>\r\n        <Grid.RowDefinitions>\r\n            <RowDefinition Height="auto"/>\r\n            <RowDefinition Height="auto" />\r\n            <RowDefinition Height="*" />\r\n            <RowDefinition Height="20" />\r\n        </Grid.RowDefinitions>\r\n\r\n        \x3c!--Rang\xe9e 0--\x3e\r\n        <TextBlock \r\n            Grid.Row="0" \r\n            VerticalAlignment="Center" HorizontalAlignment="Center"\r\n            FontSize="16" FontWeight="Bold"\r\n            Text="Gestion d\'une cat\xe9gorie"/>\r\n\r\n        \x3c!--Rang\xe9e 1--\x3e\r\n        <WrapPanel Grid.Row="1" \r\n                    Orientation="Horizontal" VerticalAlignment="Center">\r\n\r\n            <Button Content="N" ToolTip="Nouveau"\r\n                    Margin="5" Width="32" Height="32" />\r\n            <Button Content="E" ToolTip="Enregistrer"\r\n                    Margin="5" Width="32" Height="32"\r\n                    Command="{Binding EnregistrerCommande}"/>\r\n            <Button Content="R" ToolTip="Rafraichir"\r\n                    Margin="5" Width="32" Height="32" />\r\n        </WrapPanel>\r\n\r\n        \x3c!--Rang\xe9e 2--\x3e\r\n        \x3c!-- Formulaire --\x3e\r\n        <Grid Grid.Row="2">\r\n            <Grid.RowDefinitions>\r\n                <RowDefinition Height="auto"></RowDefinition>\r\n                <RowDefinition Height="auto"></RowDefinition>\r\n            </Grid.RowDefinitions>\r\n            <Grid.ColumnDefinitions>\r\n                <ColumnDefinition Width="auto"/>\r\n                <ColumnDefinition Width="*" />\r\n            </Grid.ColumnDefinitions>\r\n            \r\n            \x3c!-- Nom --\x3e\r\n            <Label Grid.Row="0" Grid.Column="0" \r\n                   Content="Nom : "\r\n                   Margin="5 10 5 10" \r\n                   FontWeight="Bold"/>\r\n            <TextBox Grid.Row="0" Grid.Column="1" \r\n                     Text="{Binding Nom}" \r\n                     Padding="2 4 0 0"\r\n                     Margin="0 10 5 10"/>\r\n\r\n            \x3c!-- Description --\x3e\r\n            <Label Grid.Row="1" Grid.Column="0" \r\n                   Content="Description : "\r\n                   Margin="5 10 5 10" \r\n                   FontWeight="Bold"/>\r\n            <TextBox Grid.Row="1" Grid.Column="1" \r\n                     Text="{Binding Description}" \r\n                     Padding="2 4 0 0"\r\n                     Margin="0 10 5 10"/>\r\n\r\n        </Grid>\r\n        \x3c!--Rang\xe9e 3--\x3e\r\n        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />\r\n\r\n    </Grid>\r\n</UserControl>\n'})}),"\n",(0,i.jsx)(r.h3,{id:"ajout-de-la-ressource-pour-cr\xe9er-le-lien-entre-viewmodel-et-vue---mainwindowxaml",children:"Ajout de la ressource pour cr\xe9er le lien entre ViewModel et Vue - MainWindow.xaml"}),"\n",(0,i.jsxs)(r.p,{children:["Il faut ajouter dans les ressources le lien entre le ",(0,i.jsx)(r.strong,{children:"ViewModel"})," et la ",(0,i.jsx)(r.strong,{children:"Vue"}),"."]}),"\n",(0,i.jsxs)(r.p,{children:["Les lignes 25 \xe0 27 de ",(0,i.jsx)(r.strong,{children:"MainWindow.xaml"})," contiennent le lien entre ",(0,i.jsx)(r.strong,{children:"UcGestionCategorie"})," et ",(0,i.jsx)(r.strong,{children:"GestionCategorieVM"}),"."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-xaml",metastring:"showLineNumbers",children:'<Window x:Class="SuperCarte.WPF.MainWindow"\r\n        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"\r\n        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"\r\n        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"\r\n        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"\r\n        xmlns:local="clr-namespace:SuperCarte.WPF"  \r\n        xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"\r\n        xmlns:v="clr-namespace:SuperCarte.WPF.Views"                \r\n        mc:Ignorable="d"         \r\n        d:DataContext="{d:DesignInstance Type=vm:MainWindowVM}"\r\n        Title="Super Carte App" \r\n        Height="450" Width="800" WindowState="Maximized">\r\n    <Window.Resources>\r\n        \x3c!--Assignation du ViewModel \xe0 Vue--\x3e\r\n        <DataTemplate DataType="{x:Type TypeName=vm:HelloWorldVM}">\r\n            \x3c!--\xc0 retirer \xe9ventuellement--\x3e\r\n            <v:UcHelloWorld />\r\n        </DataTemplate>\r\n        <DataTemplate DataType="{x:Type TypeName=vm:ListeCategoriesVM}">\r\n            <v:UcListeCategories />\r\n        </DataTemplate>\r\n        <DataTemplate DataType="{x:Type TypeName=vm:ListeCartesVM}">\r\n            <v:UcListeCartes />\r\n        </DataTemplate>\r\n\t\t//highlight-start\r\n        <DataTemplate DataType="{x:Type TypeName=vm:GestionCategorieVM}">\r\n            <v:UcGestionCategorie />\r\n        </DataTemplate>\r\n\t\t//highlight-end\r\n    </Window.Resources>\r\n    <Grid>\r\n        <Grid.RowDefinitions>\r\n            <RowDefinition Height="auto"/>\r\n            <RowDefinition Height="*"/>\r\n        </Grid.RowDefinitions>\r\n        <Menu Grid.Row="0" HorizontalContentAlignment="Stretch" VerticalAlignment="Stretch">\r\n            <MenuItem Header="_Fichier">\r\n                <MenuItem Header="_Quitter" />\r\n            </MenuItem>\r\n            <MenuItem Header="_Administration">\r\n                <MenuItem Header="Liste des _cartes" Command="{Binding NaviguerListeCartesVMCommande}"/>\r\n                <MenuItem Header="Liste des c_at\xe9gories" Command="{Binding NaviguerListeCategoriesVMCommande}"/>\r\n            </MenuItem>            \r\n        </Menu>\r\n\r\n        <ContentControl Grid.Row="1"  Content="{Binding Navigateur.VMActif}" />                \r\n    </Grid>\r\n</Window>\n'})}),"\n",(0,i.jsx)(r.h3,{id:"test---mainwindowsvm",children:"Test - MainWindowsVM"}),"\n",(0,i.jsxs)(r.p,{children:["Pour tester, il faut modifier le ",(0,i.jsx)(r.strong,{children:"ViewModel"})," de d\xe9part dans le ",(0,i.jsx)(r.strong,{children:"MainWindowVM"}),"."]}),"\n",(0,i.jsxs)(r.p,{children:["Dans le constructeur, il faut naviguer vers le ",(0,i.jsx)(r.strong,{children:"ViewModel"})," initial (ligne 11)."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-csharp",metastring:"showLineNumbers",children:"public MainWindowVM(INavigateur navigateur)\r\n{   \r\n    //S\xe9lectionner le ViewModel de d\xe9marrage        \r\n    _navigateur = navigateur;\r\n\r\n    //Cr\xe9ation des commandes\r\n    NaviguerListeCartesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCartesVM>);\r\n    NaviguerListeCategoriesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCategoriesVM>);\r\n\r\n    //Vue initiale\r\n\t//highlight-next-line\r\n    _navigateur.Naviguer<GestionCategorieVM>();\r\n}\n"})}),"\n",(0,i.jsx)(r.p,{children:"D\xe9marrez l'application et inscrivez du texte dans les 2 champs. Appuyez sur le bouton enregistrer."}),"\n",(0,i.jsxs)(r.p,{children:["Vous pouvez v\xe9rifier le fonctionnement en choisissant ",(0,i.jsx)(r.strong,{children:"Liste des cat\xe9gories"})," dans le menu ",(0,i.jsx)(r.strong,{children:"Administration"})," de l'application, ou \xe0l'aide de SSMS ."]})]})}function u(e={}){const{wrapper:r}={...(0,t.a)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}},1151:(e,r,n)=>{n.d(r,{Z:()=>a,a:()=>o});var i=n(7294);const t={},s=i.createContext(t);function o(e){const r=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(s.Provider,{value:r},e.children)}}}]);