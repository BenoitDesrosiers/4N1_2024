"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[438],{2325:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>t,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>a});var i=r(5893),s=r(1151);const l={sidebar_position:2},t="Exercices",o={id:"00 Intro Csharp/exercices_c_sharp",title:"Exercices",description:"Cr\xe9ez une nouvelle application console .NET avec le framework .Net 7.0.",source:"@site/docs/00 Intro Csharp/exercices_c_sharp.md",sourceDirName:"00 Intro Csharp",slug:"/00 Intro Csharp/exercices_c_sharp",permalink:"/4N1_2024/docs/00 Intro Csharp/exercices_c_sharp",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"NotesSidebar",previous:{title:"Pr\xe9sentation de Microsoft .NET",permalink:"/4N1_2024/docs/00 Intro Csharp/Introduction_CSharp"},next:{title:"Introduction \xe0 SQL Server",permalink:"/4N1_2024/docs/01 R\xe9vision SQL/introduction_SQL_Server"}},c={},a=[{value:"Exercice 1",id:"exercice-1",level:2},{value:"Classe BaseDocument",id:"classe-basedocument",level:4},{value:"Interface ILivre",id:"interface-ilivre",level:4},{value:"Interface IDisque",id:"interface-idisque",level:4},{value:"Interface INoteCours",id:"interface-inotecours",level:4},{value:"Classe Livre",id:"classe-livre",level:4},{value:"Classe Disque",id:"classe-disque",level:4},{value:"Classe NoteCours",id:"classe-notecours",level:4},{value:"solution",id:"solution",level:3},{value:"Exercice 2",id:"exercice-2",level:2},{value:"Instance Livre",id:"instance-livre",level:4},{value:"Instance Disque",id:"instance-disque",level:4},{value:"Instance NoteCours",id:"instance-notecours",level:4},{value:"solution",id:"solution-1",level:3},{value:"Exercice 3",id:"exercice-3",level:2},{value:"solution",id:"solution-2",level:3},{value:"Exercice 4",id:"exercice-4",level:2},{value:"solution",id:"solution-3",level:3},{value:"Exercice 5",id:"exercice-5",level:2},{value:"Classe Livre",id:"classe-livre-1",level:4},{value:"solution",id:"solution-4",level:3},{value:"Classe NoteCours",id:"classe-notecours-1",level:4},{value:"solution",id:"solution-5",level:3},{value:"Classe Disque",id:"classe-disque-1",level:4},{value:"solution",id:"solution-6",level:3},{value:"Exercice 6",id:"exercice-6",level:2},{value:"Testez les m\xe9thodes",id:"testez-les-m\xe9thodes",level:4},{value:"solution",id:"solution-7",level:3}];function d(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components},{Details:r}=n;return r||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"exercices",children:"Exercices"}),"\n",(0,i.jsx)(n.p,{children:"Cr\xe9ez une nouvelle application console .NET avec le framework .Net 7.0."}),"\n",(0,i.jsx)(n.h2,{id:"exercice-1",children:"Exercice 1"}),"\n",(0,i.jsx)(n.h4,{id:"classe-basedocument",children:"Classe BaseDocument"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["La classe doit \xeatre ",(0,i.jsx)(n.strong,{children:"abstraite"}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Constructeurs","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Par d\xe9faut"}),"\n",(0,i.jsx)(n.li,{children:"et avec param\xe8tres"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["Propri\xe9t\xe9 ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"public"})})," en get et set","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Auteur (string)"}),"\n",(0,i.jsx)(n.li,{children:"Titre (string)"}),"\n",(0,i.jsx)(n.li,{children:"Publication (DateTime)"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["M\xe9thode ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"AfficherInfo()"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"Abstraite"})}),"\n",(0,i.jsx)(n.li,{children:"Retourne une string"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["M\xe9thode ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"AfficherPublication()"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:"Virtuelle"})}),"\n",(0,i.jsx)(n.li,{children:"Retourne un string"}),"\n",(0,i.jsxs)(n.li,{children:["Utilisez la notation ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"$"})})]}),"\n",(0,i.jsxs)(n.li,{children:["La date doit avoir le format suivant ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"d MMMM yyyy"})})]}),"\n",(0,i.jsxs)(n.li,{children:["Le message pour la date ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"2022/01/18"})})," doit \xeatre ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:'"La date de publication est le 18 janvier 2022."'})})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"interface-ilivre",children:"Interface ILivre"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Interface ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"public"})})]}),"\n",(0,i.jsxs)(n.li,{children:["Propri\xe9t\xe9 en get et set","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"NombrePage (int)"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"interface-idisque",children:"Interface IDisque"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Interface ",(0,i.jsx)(n.strong,{children:"public"})]}),"\n",(0,i.jsxs)(n.li,{children:["Propri\xe9t\xe9 en get et set","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"TailleMo (decimal)"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"interface-inotecours",children:"Interface INoteCours"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Interface ",(0,i.jsx)(n.strong,{children:"public"})]}),"\n",(0,i.jsxs)(n.li,{children:["Propri\xe9t\xe9 en get et set","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Matiere (string)"}),"\n",(0,i.jsx)(n.li,{children:"Session (string)"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"classe-livre",children:"Classe Livre"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["H\xe9rite de ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"ILivre"})})," et ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"BaseDocument"})})]}),"\n",(0,i.jsxs)(n.li,{children:["Constructeurs","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Par d\xe9faut"}),"\n",(0,i.jsx)(n.li,{children:"et avec param\xe8tres"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["M\xe9thode ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"AfficherInfo()"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Utilisez la notation ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"$"})})]}),"\n",(0,i.jsxs)(n.li,{children:["Le message doit \xeatre ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:'"L\'auteur du livre intitul\xe9 ABC est Fran\xe7ois St-Hilaire. Le livre a 18 page(s)."'})})," pour les donn\xe9es ci-dessous :","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Titre : ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"ABC"})})]}),"\n",(0,i.jsxs)(n.li,{children:["Auteur : ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"Fran\xe7ois St-Hilaire"})})]}),"\n",(0,i.jsxs)(n.li,{children:["NombrePage : ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"18"})})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"classe-disque",children:"Classe Disque"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["H\xe9rite de ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"IDisque"})})," et ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"BaseDocument"})})]}),"\n",(0,i.jsxs)(n.li,{children:["Constructeurs","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Par d\xe9faut"}),"\n",(0,i.jsx)(n.li,{children:"et avec param\xe8tres"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["M\xe9thode ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"AfficherInfo()"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Utilisez la notation ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"string.format"})})]}),"\n",(0,i.jsxs)(n.li,{children:["Le message doit \xeatre ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:'"L\'auteur du disque intitul\xe9 Data123 est Fran\xe7ois St-Hilaire. Le disque a une taille de 63,3 Mo."'})})," pour les donn\xe9es ci-dessous :","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Titre : ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"Data123"})})]}),"\n",(0,i.jsxs)(n.li,{children:["Auteur : ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"Fran\xe7ois St-Hilaire"})})]}),"\n",(0,i.jsxs)(n.li,{children:["TailleMo: ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"64.3"})})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"classe-notecours",children:"Classe NoteCours"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["H\xe9rite de ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"INoteCours"})})," et ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"BaseDocument"})})]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Constructeurs"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"Par d\xe9faut"}),"\n",(0,i.jsx)(n.li,{children:"et avec param\xe8tres"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["M\xe9thode ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"AfficherInfo()"})})]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Utilisez la notation ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"$"})})]}),"\n",(0,i.jsxs)(n.li,{children:["Le message doit \xeatre ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:'"L\'auteur des notes intitul\xe9es Web IV est Fran\xe7ois St-Hilaire. La mati\xe8re est Informatique."'})})," pour les donn\xe9es ci-dessous :","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Titre : ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"Web IV"})})]}),"\n",(0,i.jsxs)(n.li,{children:["Auteur : ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"Fran\xe7ois St-Hilaire"})})]}),"\n",(0,i.jsxs)(n.li,{children:["Matiere : ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"Informatique"})})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["M\xe9thode ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"AfficherPublication()"})})]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Utilisez la notation ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"$"})})]}),"\n",(0,i.jsxs)(n.li,{children:["Le message doit \xeatre ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:'"Les notes ont \xe9t\xe9 publi\xe9es le 18 janvier 2022 pour la session H22."'})})," pour les donn\xe9es ci-dessous :","\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["Publication : ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"2022/01/18"})})]}),"\n",(0,i.jsxs)(n.li,{children:["Session : ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"H22"})})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"solution",children:"solution"}),"\n",(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"Solution"}),(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"BaseDocument"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'namespace ExercicesCours1;\r\n\r\n/// <summary>\r\n/// Classe abstraite contenant l\'information de base d\'un document\r\n/// </summary>\r\npublic abstract class BaseDocument\r\n{\r\n    #region Constructeurs\r\n    /// <summary>\r\n    /// Constructeur par d\xe9faut\r\n    /// </summary>\r\n    public BaseDocument()\r\n    {\r\n\r\n    }\r\n\r\n    /// <summary>\r\n    /// Constructeur avec param\xe8tres\r\n    /// </summary>\r\n    /// <param name="auteur">L\'auteur du document</param>\r\n    /// <param name="titre">Le titre du document</param>\r\n    /// <param name="publication">La date de publication du document</param>\r\n    public BaseDocument(string auteur, string titre, DateTime publication)\r\n    {\r\n        Auteur = auteur;\r\n        Titre = titre;\r\n        Publication = publication;\r\n    }\r\n    #endregion\r\n\r\n    #region M\xe9thodes\r\n    /// <summary>\r\n    /// G\xe9n\xe8re la phrase pour afficher le message contenant l\'information du document (Auteur et Titre)\r\n    /// </summary>\r\n    /// <returns>La phrase</returns>\r\n    public abstract string AfficherInfo();\r\n\r\n    /// <summary>\r\n    /// G\xe9n\xe8re la phrase pour afficher le message de la date de publication\r\n    /// </summary>\r\n    /// <returns>La phrase</returns>\r\n    public virtual string AfficherPublication()\r\n    {\r\n        return $"La date de publication est le {Publication:d MMMM yyyy}.";\r\n    }\r\n    #endregion\r\n\r\n    #region Propri\xe9t\xe9s \r\n    public string Auteur { get; set; }\r\n        \r\n    public string Titre { get; set; }\r\n        \r\n    public DateTime Publication { get; set; }\r\n    #endregion\r\n}\n'})})]}),(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"ILivre"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:"namespace ExercicesCours1;\r\n\r\n/// <summary>\r\n/// Interface qui repr\xe9sente le concept d'un livre\r\n/// </summary>\r\npublic interface ILivre\r\n{\r\n    int NombrePage { get; set; }\r\n}\r\n\n"})})]}),(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"IDisque"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:"namespace ExercicesCours1;\r\n\r\n/// <summary>\r\n/// Interface qui repr\xe9sente le concept d'un disque compact\r\n/// </summary>\r\npublic interface IDisque\r\n{\r\n    decimal TailleMo { get; set; }\r\n}\r\n\n"})})]}),(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"INoteCours"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:"namespace ExercicesCours1;\r\n\r\n/// <summary>\r\n/// Interface qui repr\xe9sente le concept d'un recueil de notes de cours\r\n/// </summary>\r\npublic interface INoteCours\r\n{\r\n    string Matiere { get; set; }\r\n    string Session { get; set; }\r\n}\r\n\n"})})]}),(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"Livre"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'namespace ExercicesCours1;\r\n\r\n/// <summary>\r\n/// Classe qui contient l\'information d\'un livre\r\n/// </summary>\r\npublic class Livre : BaseDocument, ILivre\r\n{\r\n    #region Constructeurs\r\n    /// <summary>\r\n    /// Constructeur par d\xe9faut\r\n    /// </summary>\r\n    public Livre() : base()\r\n    {\r\n\r\n    }\r\n\r\n    /// <summary>\r\n    /// Constructeur avec param\xe8tres\r\n    /// </summary>\r\n    /// <param name="auteur">L\'auteur du livre</param>\r\n    /// <param name="titre">Le titre du livre</param>\r\n    /// <param name="publication">La date de publication du livre</param>\r\n    /// <param name="nombrePage">Nombre de page du livre</param>\r\n    public Livre(string auteur, string titre, DateTime publication, int nombrePage) : base(auteur, titre, publication)\r\n    {\r\n        NombrePage = nombrePage;\r\n    }\r\n    #endregion\r\n\r\n    #region M\xe9thodes\r\n    /// <summary>\r\n    /// G\xe9n\xe8re la phrase pour afficher le message contenant l\'information du livre (Auteur, Titre et NombrePage)\r\n    /// </summary>\r\n    /// <returns>La phrase</returns>\r\n    public override string AfficherInfo()\r\n    {\r\n        return $"L\'auteur du livre intitul\xe9 {Titre} est {Auteur}. Le livre a {NombrePage} page(s).";\r\n    }\r\n    #endregion\r\n\r\n    #region Propri\xe9t\xe9s\r\n    public int NombrePage { get; set; }\r\n    #endregion\r\n}\r\n\r\n\n'})})]}),(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"Disque"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'namespace ExercicesCours1;\r\n\r\n/// <summary>\r\n/// Classe qui contient l\'information d\'un disque compact\r\n/// </summary>\r\npublic class Disque : BaseDocument, IDisque\r\n{\r\n    #region Constructeurs\r\n    /// <summary>\r\n    /// Constructeur par d\xe9faut\r\n    /// </summary>\r\n    public Disque() : base()\r\n    {\r\n    }\r\n\r\n    /// <summary>\r\n    /// Constructeur avec param\xe8tres\r\n    /// </summary>\r\n    /// <param name="auteur">L\'auteur du disque</param>\r\n    /// <param name="titre">Le titre du disque</param>\r\n    /// <param name="publication">La date de publication du disque</param>\r\n    /// <param name="tailleMo">La taille en m\xe9ga octet du disque</param>\r\n    public Disque(string auteur, string titre, DateTime publication, decimal tailleMo) : base(auteur, titre, publication)\r\n    {\r\n        TailleMo = tailleMo;\r\n    }\r\n    #endregion\r\n\r\n    #region M\xe9thodes\r\n    /// <summary>\r\n    /// G\xe9n\xe8re la phrase pour afficher le message contenant l\'information du disque (Auteur, Titre et NombreMinute)\r\n    /// </summary>\r\n    /// <returns>La phrase</returns>\r\n    public override string AfficherInfo()\r\n    {\r\n        return String.Format("L\'auteur du disque intitul\xe9 {0} est {1}. Le disque a une taille de {2} Mo.", Titre, Auteur, TailleMo);\r\n    }\r\n    #endregion\r\n\r\n    #region Propri\xe9t\xe9s\r\n    public decimal TailleMo { get; set; }\r\n    #endregion\r\n}\r\n\r\n\n'})})]}),(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"NoteCours"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'namespace ExercicesCours1;\r\n\r\n/// <summary>\r\n/// Classe qui contient l\'information des notes de cours\r\n/// </summary>\r\npublic class NoteCours : BaseDocument, INoteCours\r\n{\r\n    #region Constructeurs\r\n    /// <summary>\r\n    /// Constructeur par d\xe9faut\r\n    /// </summary>\r\n    public NoteCours() : base()\r\n    {\r\n    }\r\n\r\n    /// <summary>\r\n    /// Constructeur avec param\xe8tres\r\n    /// </summary>\r\n    /// <param name="auteur">L\'auteur des notes de cours</param>\r\n    /// <param name="titre">Le titre des notes de cours</param>\r\n    /// <param name="publication">La date de publication des notes de cours</param>\r\n    /// <param name="matiere">La mati\xe8re des notes de cours</param>\r\n    /// <param name="session">La session d\'utilisation des notes de cours</param>\r\n    public NoteCours(string auteur, string titre, DateTime publication, string matiere, string session) : base(auteur, titre, publication)\r\n    {\r\n        Matiere = matiere;\r\n        Session = session;\r\n    }\r\n    #endregion\r\n\r\n    #region M\xe9thodes\r\n    /// <summary>\r\n    /// G\xe9n\xe8re la phrase pour afficher le message contenant l\'information des notes de cours (Auteur, Titre et Mati\xe8re)\r\n    /// </summary>\r\n    /// <returns>La phrase</returns>\r\n    public override string AfficherInfo()\r\n    {\r\n        return $"L\'auteur des notes intitul\xe9s {Titre} est {Auteur}. La mati\xe8re est {Matiere}.";\r\n    }\r\n\r\n    /// <summary>\r\n    /// G\xe9n\xe8re la phrase pour afficher le message de la date de publication des notes de cours et la session d\'utilisation\r\n    /// </summary>\r\n    /// <returns>La phrase</returns>\r\n    public override string AfficherPublication()\r\n    {\r\n        return $"Les notes ont \xe9t\xe9 publi\xe9es le {Publication:d MMMM yyyy} pour la session {Session}.";\r\n    }\r\n    #endregion\r\n\r\n    #region Propri\xe9t\xe9s\r\n    public string Matiere { get; set; }\r\n\r\n    public string Session { get; set; }\r\n    #endregion\r\n}\r\n\r\n\n'})})]})]}),"\n",(0,i.jsx)(n.h2,{id:"exercice-2",children:"Exercice 2"}),"\n",(0,i.jsx)(n.h4,{id:"instance-livre",children:"Instance Livre"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Cr\xe9ez une instance ",(0,i.jsx)(n.strong,{children:"`Livre"})," et utilisez le constructeur avec param\xe8tres."]}),"\n",(0,i.jsxs)(n.li,{children:["Affichez le retour des m\xe9thodes ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"AfficheInfo()"})})," et ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"AfficherPublication()"})})," dans la console."]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"instance-disque",children:"Instance Disque"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Cr\xe9ez une instance ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"Disque"})})," et utilisez le constructeur avec param\xe8tres."]}),"\n",(0,i.jsxs)(n.li,{children:["Affichez le retour des m\xe9thodes ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"AfficheInfo()"})})," et ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"AfficherPublication()"})})," dans la console."]}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"instance-notecours",children:"Instance NoteCours"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Cr\xe9ez une instance NoteCours et utilisez le constructeur avec param\xe8tres."}),"\n",(0,i.jsxs)(n.li,{children:["Affichez le retour des m\xe9thodes ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"AfficheInfo()"})})," et ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"AfficherPublication()"})})," dans la console."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"solution-1",children:"solution"}),"\n",(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"Solution"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'#region Livre ex 2\r\n//Assignation avec le constructeur\r\nLivre livre1 = new Livre("Fran\xe7ois St-Hilaire", "L\'ABC du C#", new DateTime(2022, 01, 18), 14);\r\n\r\nConsole.WriteLine("Livre 1");\r\nConsole.WriteLine(livre1.AfficherPublication());\r\nConsole.WriteLine(livre1.AfficherInfo());\r\n#endregion\r\n\r\n#region Disques ex 2\r\nDisque disque1 = new Disque("Blizzard", "StarCraft", new DateTime(1998, 12, 18), 266.31M);\r\n\r\nConsole.WriteLine("Disque 1");\r\nConsole.WriteLine(disque1.AfficherPublication());\r\nConsole.WriteLine(disque1.AfficherInfo());\r\n#endregion\r\n\r\n#region NoteCours ex 2\r\n//Assignation avec le constructeur\r\nNoteCours note1 = new NoteCours("Benoit Desrosiers", "Conception d\'un projet Web", new DateTime(2021, 09, 01), "Web", "A21");\r\n\r\nConsole.WriteLine("Note 1");\r\nConsole.WriteLine(note1.AfficherPublication());\r\nConsole.WriteLine(note1.AfficherInfo());\r\n#endregion\r\n\n'})})]}),"\n",(0,i.jsx)(n.h2,{id:"exercice-3",children:"Exercice 3"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Refaites l'exercice #2, mais utilisez le constructeur par d\xe9faut."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Effectuez l'assignation par les propri\xe9t\xe9s apr\xe8s la cr\xe9ation."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'Object obj = new Object();\r\nobj.Prop1 = "asd";\n'})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"solution-2",children:"solution"}),"\n",(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"Solution"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'#region Livres ex 3\r\n\r\n//Assignation directement lors de la construction\r\nLivre livre2 = new Livre();\r\nlivre2.Auteur = "St\xe9phane Janvier";\r\nlivre2.Titre = "L\'analyse en informatique";\r\nlivre2.Publication = new DateTime(2021, 11, 03);\r\nlivre2.NombrePage = 1;\r\n\r\nConsole.WriteLine("Livre 2");\r\nConsole.WriteLine(livre2.AfficherInfo());\r\nConsole.WriteLine(livre2.AfficherPublication());\r\n#endregion\r\n \r\n#region Disques ex 3\r\n\r\nDisque disque2 = new Disque();\r\ndisque2.Auteur = "id Software";\r\ndisque2.Titre =  "Doom";\r\ndisque2.Publication = new DateTime(1993, 12, 10);\r\ndisque2.TailleMo =46.3184M;\r\n\r\nConsole.WriteLine("Disque 2");\r\nConsole.WriteLine(disque2.AfficherPublication());\r\nConsole.WriteLine(disque2.AfficherInfo()); \r\n#endregion\r\n\r\n#region NoteCours ex 3\r\nNoteCours note2 = new NoteCours();\r\nnote2.Auteur = "Fred\xe9ric Montembault";\r\nnote2.Titre = "Les bases de la r\xe9seautique";\r\nnote2.Publication = new DateTime(2021, 08, 22);\r\nnote2.Matiere = "R\xe9seau";\r\nnote2.Session = "A21";\r\n\r\nConsole.WriteLine("Note 2");\r\nConsole.WriteLine(note2.AfficherPublication());\r\nConsole.WriteLine(note2.AfficherInfo());\r\n#endregion\n'})})]}),"\n",(0,i.jsx)(n.h2,{id:"exercice-4",children:"Exercice 4"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Refaites l'exercice #2, mais utilisez le constructeur par d\xe9faut."}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsx)(n.p,{children:"Effectuez l'assignation directement lors de la construction de l'objet. (Point 3.6)"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'Object obj = new Object()\r\n{\r\n    Prop1 = "asd"\r\n};\n'})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"solution-3",children:"solution"}),"\n",(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"Solution"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'#region Livres ex 4\r\n\r\n//Assignation directement lors de la construction\r\nLivre livre3 = new Livre()\r\n{\r\n    Auteur = "St\xe9phane Janvier",\r\n    Titre = "L\'analyse en informatique",\r\n    Publication = new DateTime(2021, 11, 03),\r\n    NombrePage = 1};\r\n\r\nConsole.WriteLine("Livre 3");\r\nConsole.WriteLine(livre3.AfficherInfo());\r\nConsole.WriteLine(livre3.AfficherPublication());\r\n#endregion\r\n \r\n#region Disques ex 4\r\n\r\nDisque disque3 = new Disque()\r\n{\r\n    Auteur = "id Software",\r\n    Titre =  "Doom",\r\n    Publication = new DateTime(1993, 12, 10),\r\n    TailleMo =46.3184M};\r\n\r\nConsole.WriteLine("Disque 3");\r\nConsole.WriteLine(disque3.AfficherPublication());\r\nConsole.WriteLine(disque3.AfficherInfo()); \r\n#endregion\r\n\r\n#region NoteCours ex 4\r\nNoteCours note3 = new NoteCours()\r\n{\r\n    Auteur = "Fred\xe9ric Montembault",\r\n    Titre = "Les bases de la r\xe9seautique",\r\n    Publication = new DateTime(2021, 08, 22),\r\n    Matiere = "R\xe9seau",\r\n    Session = "A21"};\r\n\r\nConsole.WriteLine("Note 3");\r\nConsole.WriteLine(note3.AfficherPublication());\r\nConsole.WriteLine(note3.AfficherInfo());\r\n#endregion\n'})})]}),"\n",(0,i.jsx)(n.h2,{id:"exercice-5",children:"Exercice 5"}),"\n",(0,i.jsx)(n.h4,{id:"classe-livre-1",children:"Classe Livre"}),"\n",(0,i.jsxs)(n.p,{children:["Modifiez la m\xe9thode ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"AfficheInfo()"})}),' pour remplacer page(s). Utilisez une op\xe9ration ternaire pour d\xe9terminer si "page" doit \xeatre au singulier ou au pluriel.']}),"\n",(0,i.jsx)(n.p,{children:"Exemples"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:'"L\'auteur du livre intitul\xe9 ABC est Fran\xe7ois St-Hilaire. Le livre a 18 pages."'})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:'"L\'auteur du livre intitul\xe9 ABC est Fran\xe7ois St-Hilaire. Le livre a 1 page."'})})}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"solution-4",children:"solution"}),"\n",(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"Solution"}),(0,i.jsx)(n.p,{children:"remplacez le return de AfficherInfo() de Livre.cs par:"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'        return $"L\'auteur du livre intitul\xe9 {Titre} est {Auteur}. Le livre a {NombrePage} {(NombrePage > 1 ? "pages" : "page")}.";\r\n\n'})})]}),"\n",(0,i.jsx)(n.h4,{id:"classe-notecours-1",children:"Classe NoteCours"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Modifiez la m\xe9thode ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"AfficheInfo()"})})," pour afficher ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:'"non disponible"'})})," lorsque la valeur de la propri\xe9t\xe9 Auteur est ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"null"})}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Utilisez le ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"??"})}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["Exemples","\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:'"L\'auteur des notes intitul\xe9es ABC est Fran\xe7ois St-Hilaire. La mati\xe8re est Informatique."'})})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:'"L\'auteur des notes intitul\xe9es ABC est non disponible. La mati\xe8re est Informatique."'})})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"solution-5",children:"solution"}),"\n",(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"Solution"}),(0,i.jsx)(n.p,{children:"remplacez le return de AfficheInfo() de NoteCours par:"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'        return $"L\'auteur des notes intitul\xe9s {Titre} est {Auteur ?? "non disponible"}. La mati\xe8re est {Matiere}.";\n'})})]}),"\n",(0,i.jsx)(n.h4,{id:"classe-disque-1",children:"Classe Disque"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Modifiez la m\xe9thode ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"AfficheInfo()"})})," pour formater la taille avec 3 d\xe9cimaux en tout temps."]}),"\n",(0,i.jsxs)(n.li,{children:["La valeur ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"701.1"})})," doit afficher ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"701.100"})}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["La valeur ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"701.12"})})," doit afficher ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"701.120"})}),"."]}),"\n",(0,i.jsxs)(n.li,{children:["La valeur ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"701.123"})})," doit afficher ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"701.123"})}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"solution-6",children:"solution"}),"\n",(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"Solution"}),(0,i.jsx)(n.p,{children:"ramplacez le return de AfficheInfo() de Disque.cs par:"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'        return String.Format("L\'auteur du disque intitul\xe9 {0} est {1}. Le disque a une taille de {2:N3} Mo.", Titre, Auteur, TailleMo);\r\n\n'})})]}),"\n",(0,i.jsx)(n.h2,{id:"exercice-6",children:"Exercice 6"}),"\n",(0,i.jsx)(n.h4,{id:"testez-les-m\xe9thodes",children:"Testez les m\xe9thodes"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["Cr\xe9ez une instance de ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"Livre"})})," avec 1 page et une autre instance avec 2 pages. Est-ce que le nombre de page s'affiche correctement ?"]}),"\n",(0,i.jsxs)(n.li,{children:["Cr\xe9ez une instance ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"NoteCours"})})," avec une valeur dans la propri\xe9t\xe9 Auteur et une autre instance avec la valeur ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"null"})}),' dans la propri\xe9t\xe9 Auteur. Est-ce "non disponible" est affich\xe9 correctement?']}),"\n",(0,i.jsxs)(n.li,{children:["Cr\xe9ez une instance de ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"Disque "})})," avec la valeur 46.3189. Est-ce que l'arrondissement est fait correctement?"]}),"\n",(0,i.jsxs)(n.li,{children:["Cr\xe9ez une instance de ",(0,i.jsx)(n.strong,{children:(0,i.jsx)(n.code,{children:"Disque "})})," avec la valeur 46.3184. Est-ce que l'arrondissement est fait correctement?"]}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"solution-7",children:"solution"}),"\n",(0,i.jsxs)(r,{children:[(0,i.jsx)("summary",{children:"Solution"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-csharp",children:'#region Exercice 6\r\nLivre livreEx6_1 = new Livre("Fran\xe7ois St-Hilaire", "L\'ABC du C#", new DateTime(2022, 01, 18), 1);\r\nLivre livreEx6_2 = new Livre("Fran\xe7ois St-Hilaire", "L\'ABC du C#", new DateTime(2022, 01, 18), 2);\r\n\r\nConsole.WriteLine("Livre une page");\r\nConsole.WriteLine(livreEx6_1.AfficherInfo());\r\nConsole.WriteLine("Livre deux pages");\r\nConsole.WriteLine(livreEx6_2.AfficherInfo());\r\n\r\nNoteCours noteEx6_1 = new NoteCours(null, "Conception d\'un projet Web", new DateTime(2021, 09, 01), "Web", "A21");\r\nNoteCours noteEx6_2 = new NoteCours() \r\n{\r\n    // auteur non sp\xe9cifi\xe9\r\n    Titre = "Les bases de la r\xe9seautique",\r\n    Publication = new DateTime(2021, 08, 22),\r\n    Matiere = "R\xe9seau",\r\n    Session = "A21"\r\n};\r\n\r\nConsole.WriteLine("Note sans auteur 1 ");\r\nConsole.WriteLine(noteEx6_1.AfficherInfo());\r\nConsole.WriteLine("Note sans auteur 12 ");\r\nConsole.WriteLine(noteEx6_2.AfficherInfo());\r\n\r\nDisque disqueEx6_9 = new Disque()\r\n{\r\n    Auteur = "id Software",\r\n    Titre =  "Doom",\r\n    Publication = new DateTime(1993, 12, 10),\r\n    TailleMo =46.3189M\r\n};\r\n\r\nConsole.WriteLine("Disque 9");\r\nConsole.WriteLine(disqueEx6_9.AfficherInfo()); \r\n\r\nDisque disqueEx6_4 = new Disque()\r\n{\r\n    Auteur = "id Software",\r\n    Titre =  "Doom",\r\n    Publication = new DateTime(1993, 12, 10),\r\n    TailleMo =46.3184M\r\n};\r\nConsole.WriteLine("Disque 4");\r\nConsole.WriteLine(disqueEx6_4.AfficherInfo()); \r\n#endregion\n'})})]})]})}function u(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>o,a:()=>t});var i=r(7294);const s={},l=i.createContext(s);function t(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:t(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);