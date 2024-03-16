"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[9087],{9847:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>p,contentTitle:()=>s,default:()=>d,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var o=n(5893),t=n(1151);const i={sidebar_position:245,draft:!1},s="R\xe9sum\xe9 du code",a={id:"WPF partie 2/revue_partie2",title:"R\xe9sum\xe9 du code",description:"Ce diagramme synth\xe9tise le processus de d\xe9veloppement vue jusqu'\xe0 maintenant.",source:"@site/docs/72-WPF partie 2/revue_partie2.md",sourceDirName:"72-WPF partie 2",slug:"/WPF partie 2/revue_partie2",permalink:"/4N1_2024/docs/WPF partie 2/revue_partie2",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:245,frontMatter:{sidebar_position:245,draft:!1},sidebar:"NotesSidebar",previous:{title:"Supprimer une cat\xe9gorie",permalink:"/4N1_2024/docs/WPF partie 2/supprimer_categorie"},next:{title:"Localisation de .xaml",permalink:"/4N1_2024/docs/WPF partie 2/localisation"}},p={},c=[];function _(e){const r={a:"a",h1:"h1",mermaid:"mermaid",p:"p",...(0,t.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.h1,{id:"r\xe9sum\xe9-du-code",children:"R\xe9sum\xe9 du code"}),"\n",(0,o.jsx)(r.p,{children:"Ce diagramme synth\xe9tise le processus de d\xe9veloppement vue jusqu'\xe0 maintenant."}),"\n",(0,o.jsx)(r.mermaid,{value:"sequenceDiagram\r\n    autonumber\r\n    actor prog as Programmeur\r\n\r\n    note over prog:________WPF________\r\n    \r\n    box Projet.WPF<br>Application WPF<br>projet de d\xe9marrage\r\n        participant wpf_vm as ViewModels\r\n        participant wpf_vm\r\n        participant wpf_mw as MainWindow.xaml\r\n        participant wpf_serv as Extensions\\<br>ServiceCollections\r\n        participant wpf_view as Views\r\n    end\r\n\r\n    participant cgp as Console<br>Gestionnaire<br>package\r\n    prog->>cgp:Install-Package CommunityToolkit.Mvvm\r\n    prog->>wpf_vm:cr\xe9ation\r\n\r\n    prog->>wpf_vm:cr\xe9ation Bases/BaseVM.cs\r\n    note over wpf_vm:h\xe9rite de ObservableObject\r\n    prog->>wpf_vm:cr\xe9ation de MainWindowVM.cs\r\n    note over wpf_vm:g\xe8re VMActif\r\n    prog->>wpf_serv:SCViewModelExtensions<br>enregistrer MainWindowVM\r\n    prog->>wpf_mw:ajouter le DataContext\r\n    note over wpf_mw:Binding VMActif\r\n    note over wpf_mw:dans MainWindow.xaml<br>ajouter les d\xe9pendances, le titre, et le binding \xe0 VMActif\r\n    note over wpf_mw:dans MainWindow.xaml.cs<br>ajouter MainwindowVM dans le constructeur<br>et l'associer au DataContext<br>ajouter la langue\r\n\r\n    \r\n    note over prog: ________CRUD________\r\n\r\n    note over prog: _______Core________\r\n    box  Projet.Core<br>Biblioth\xe8que de classes\r\n    participant core_model as Models\r\n    participant core_repo as Repositories\r\n    participant core_serv as Services\r\n    participant core_ext as Extensions\r\n    end\r\n    prog->>core_model:cr\xe9ation des classes XyzModel.cs\r\n    note over core_model: une Propri\xe9t\xe9 pour<br>chaque champs utilis\xe9\r\n    prog->>core_ext:cr\xe9ation des classes d'extension XyzMapExtensions.cs\r\n    note over core_ext:m\xe9thodes pour conversion<br>du mod\xe8le de donn\xe9es vs <br>mod\xe8le du domaine<br>et vice-versa\r\n    prog->>core_serv:cr\xe9ation du service IXyzService.cs et XyzService.cs\r\n    note over core_serv:injection du repo <br>dans le constructeur\r\n    note over core_serv:obtient les donn\xe9es<br>\xe0 partir du repo<br>asynchrone\r\n\r\n\r\n    note over prog:________WPF________\r\n    prog->>wpf_serv: enregistrer XyzService (de core)\r\n    note over prog:mettre \xe0 jour Usings.cs\r\n    prog->>wpf_vm:cr\xe9ation du VM pour lister Xyz<br>(ListeXyzVM.cs)\r\n    note over wpf_vm:obtient les donn\xe9es<br>\xe0 partir du service<br>qui les obtient du repo\r\n    prog->>wpf_serv:SCViewModelExtensions enregistrer ListeXyxVM\r\n    prog->>wpf_view:cr\xe9ation de UcListeXyz.xaml\r\n    note over wpf_view: les vues sont des <br>Contr\xf4le utilisateur (WPF)\r\n    note over wpf_view:structure de la vue<br>Grid, TextBlock, WrapPanel<br>DataGrid..\r\n    prog->>wpf_mw:DataTemplate pour faire le lien entre la view et le VM\r\n    prog->>wpf_vm:MainWindowVM changer<br>VMActif pour ListeXyzVM \r\n    prog->>wpf_view:ajouter Loaded\r\n    note over wpf_view:ajouter la fonction associ\xe9e \xe0 Loaded. \r\n    prog->>wpf_vm:ajouter la logique pour <br>la barre d'activit\xe9\r\n    prog->>wpf_view:ajouter le composant ProgressBar\r\n    note over prog:Suppression\r\n    prog->>core_model:cr\xe9ation de la classe de gestion des d\xe9pendances\r\n    prog->>core_repo:modifier IXyzRepo et XyzRepo pour obtenir les d\xe9pendances \r\n    prog->>core_serv:modifier IXyzService et XyzService pour obtenir les d\xe9pendances\r\n    prog->>wpf_vm:modifier ListeXyzVM pour g\xe9rer <br>la commande de suppression\r\n    prog->>wpf_view:modifier UcListeXyz.xaml pour connecter le bouton de suppression\r\n    note over prog:Le program peut \xeatre d\xe9marr\xe9<br>pour afficher la liste des Xyz\r\n\r\n\r\n  "}),"\n",(0,o.jsxs)(r.p,{children:["Ce diagramme sur ",(0,o.jsx)(r.a,{href:"https://mermaid.ink/img/pako:eNqdV9tu4zYQ_RVCL0kAx819baEIsEnaYoEEG2xuRWFgQUtjm4lEaknKSTbIv_Qx7nP_QD_WGVKyZVtKuzUMyxKHh4dzOUO9BJGKIQgDA99ykBGcCT7WPB1Ihh-eWyXzdAi6vI-s0izTasy4YZd4RdMUchz2BlJZYGoK3ij8Wn7uLn-t_no7_ztUTwRyD7aLFj8P9fHHLEtExK1QkpWPMmfAYmBxMUu51nwMfjp9Mq6tiETGpWWP2ejrNCVmtwIeL3BfiXnPsn0sfSSUCy7knZCxeuw-8TRpNzegpzThlycL0iB3MxgQ9St8LiI4VUkCkXXP2-kg5Yp6aQYyrvxat47GGRmeIpxKgNb5DQyhSy60u8949DD3EgVi-_gYZ4WfpLE8SbYv_ThCpGkuhX2-Vip5ELZ7Ma28Us7yjgojXcxcUOZ8mofZCTdgfqLf24tuZFaTorSfFDMt8BnG9POQnMeHCXwe3qOT3ofHCYugvLfCuHjTwG4vPqLbR2uYtGR4dTrPkkXcyHsgNYyFsRrh6qutwaSPIb9XuUW7BNgZtxxjYuHJNpFC4xMEEnK8TGvNKuZyLfWI1mIpQ5WQYXZwrFfTocWtQLodhnWCN8NyneLP_7EU-rS-Go0-lg5gzh4XiNBTVueRxcp3HsNlN7gxKhI4hed1XyxR5_iV4xyqNGoUDVZJxemXm7OFbLxre6o0LCsMaUslLjRKPE7EMBHKToo31DpKpihB1mAaaozwUsoNJwQ1KVmz0pApMvqCVyNQH0UrYKUTpS60maHXVtRkIQf1ip5zXKoQU-2K_f783TFvKJPaXJZLIEdlWhQzW8xYpnxUowknN-ElzQzLrUiEKWbrFJBuC4F4A6o9ODI8W-ypjRShpUhkogiJuFC64TDNIlpxzpB48Za4CMYoe8UMLaeG0eh8KMehFJMXygQlh28TDF_fgdOD2hZyZnyE2CekXUYLCVN9LT1o3IFDE_LeSz6huRRx3BsKqB1DDa0AaX3Fl_skFKxrlzO6wnY1Zp5lNNFKuuL6sW68Ko2sLoGLDbNNKhmkt9UIn4LFCaQ69xS1G4MatAhzq6TnKFI-zphf1i9IG9o8p1u8cTq_1SL0_8lHZTTp-bdcONtqXunBH2gRS84pOT41dAdq6Mut6yaqtlQ7T6zsiCY5gtMcf4wiiuBTmwRVF39j-vha5JQ9bBOjudUK5bMs165WUH4R1R0YtIg77Bpr7SRR0UOH3WmeXXIJrtOQepNFt9vU8mj0GtIswfV93EZ07qC0TtCl6B7KAlqLTjS-IzW5Jw3rzZVkRo7BCU_ZtDz4IgtYs4ur5nKueAxxqydqPWikpC9N37IwZShp_fwua2Jab2BqLEgWHTlii8-GeCpFD2_g8VhMhV0RyXUKVEUpdgtSfHeIBmNOuG6sqqs8y2jcHb7-Xf2Jopdfuhn7g6FLofqZYR2JiiBEODGiFk6yR_2sFDz3120YywakWD-EsBZRXUKsZGRJRd_HbQrGHLOWGg5kjMdKmAcFXZxyGTs_mBYnzkMzx1yp0XkDkqjmPnRDRS9FjagroTsHd8VXJJZBblnxF1VG-RZTzNxJneD5aCSiSZletLqLF1IgHQ86QQoaO1mML2kvtM4gsBNIYRCE-DeGEc8TOwgG8hVN6YXtChtBEGLhQyfIsxjLtHynC8IRTww-hZjOKRf-xc-9_3UCPH4E4UvwFIS7h73u0cH-Xv9wr9fb6R32DzrBcxDuH-1393b6_f2dg91-f2-3_9oJviuFqLvdnZ0Pux_2-geHvV5vb_eo5-D-cIPE4_UfDQcxng?type=png",children:"Kroki!"})]})]})}function d(e={}){const{wrapper:r}={...(0,t.a)(),...e.components};return r?(0,o.jsx)(r,{...e,children:(0,o.jsx)(_,{...e})}):_(e)}},1151:(e,r,n)=>{n.d(r,{Z:()=>a,a:()=>s});var o=n(7294);const t={},i=o.createContext(t);function s(e){const r=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function a(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),o.createElement(i.Provider,{value:r},e.children)}}}]);