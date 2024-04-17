---
sidebar_position: 4
draft: false
---


# Aide pour le TP3

Pour le TP3, vous devez *faire l'affichage* d'une entité (genre, artiste maisonedition) afin de sélectionner une ligne, ce qui affichera les informations associées à cette ligne.

La technique pour faire ca n'a pas été directement expliqué dans le cours, mais elle dérive de plusieurs techniques que nous avons vues. 

Le diagramme ci-dessous vous donne, en premier lieu, les étapes de programmation à suivre. Par la suite, vous y trouverez les étapes d'exécution de ce code. 

Bonne lecture!

```mermaid
sequenceDiagram
%% Développement

    actor user as Usager
    actor prog as Programmeur
    note over prog:N'oubliez pas d'enregistrer<br>les services et VM lorsque<br>vous en ajoutez.  
    participant wpf_navig as WPF:<br>Navigateur
    participant wpf_mainwindow_xaml as WPF:<br>MainWindow.xaml
    prog-->>wpf_navig:ajouter la méthode <br>Naviguer avec paramètre
    participant wpf_listeSourceVM as WPF:<br>ListeXyzVM<br>liste source
    participant wpf_uc1_xaml as WPF:<br>UcListeXyz.xaml

    create participant core_XyzAssocieModel as Core:<br>XyzAssocieModel
    prog-->>core_XyzAssocieModel:ajouter 
    note over core_XyzAssocieModel:Contient les propriétés<br>pour les champs de Xyz et<br>des tables associées qui<br>seront affichés
    create participant wpf_listeAssocieVM as WPF:<br>ListeXyzAssociéVM<br>:BaseParametreVM<int>
    prog-->>wpf_listeAssocieVM:ajouter (et enregistrer)
    note over wpf_listeAssocieVM:ajouter une variable _lstXyzAssocie de type<br> List<XyzAssocieModel>et sa propriété<br>pour le binding dans la vue
    note over wpf_listeAssocieVM:voir ListeCartesVM<br>_lstCartes
    create participant wpf_uc2_xaml as WPF:<br>UcListeXyzAssocie.xaml
    prog-->>wpf_uc2_xaml:ajouter
    note over wpf_uc2_xaml:affiche les champs de XyzAssocieModel
    note over wpf_uc2_xaml:pas besoin de menu d'action<br>Ce n'est que de l'affichage
    create participant wpf_uc2_xaml_cs as WPF:<br>UcListeXyzAssocie.xaml.cs
    prog-->wpf_uc2_xaml_cs:ajouter
    prog-->> wpf_listeAssocieVM:ajouter AssignerParametre et <br> ObtenirListeXyzAssocieCommande qui sera appelée par UcListeXyzAssocie.xaml.cs/UserControl_Loaded
    
    note over wpf_listeAssocieVM:voir ListeMesCartes et ListeCategoriesVM<br>(mixte entre les deux)
    participant core_xyzRepo as Core:<br>XyzRepo
    prog-->>core_xyzRepo:ajouter ObtenirListeXyzAssocieAsync(id)
    note over core_xyzRepo:voir CarteRepo/<br>ObtenirListeCarteDetailAsync()
    participant core_xyzService as Core:<br>XyzService
    prog-->>core_xyzService:ajouter ObtenirListeXyzAssocieAsync(id)
    note over core_xyzService:voir CarteService/<br>ObtenirListeCarteDetailAsync()

    prog-->>wpf_mainwindow_xaml:ajouter le DataTemplate<br>pour la nouvelle VM<br>et le Uc associé
    prog-->>wpf_uc2_xaml_cs:ajouter UserControl_Loaded()
    note over wpf_uc2_xaml_cs:voir UcListeCategories.xaml.cs
    prog-->>wpf_uc2_xaml:ajouter l'appel à UserControl_Loaded lorsque "Loaded"
    prog-->>wpf_listeSourceVM:ajouter un IRelayCommand AfficherAssocieCommande<br>et la async Task associée
    note over wpf_listeSourceVM:voir EditerCommande dans le constructeur<br>de ListeCategorieVM<br>pour savoir comment associer<br>la commande au navigateur<br>en passant l'id 
    prog-->>wpf_uc1_xaml: ajouter un bouton pour lister<br>l'entité associée
    prog-->>wpf_uc1_xaml: associer ce bouton à la commande dans la ListeXyzVM 
    
    
%% exécution
    note over user,core_xyzService:Exécution
    user->>wpf_uc1_xaml:sélectionne une ligne<br>et appuie sur le bouton<br>pour lister les association
    wpf_uc1_xaml->>wpf_listeSourceVM:appel AfficherAssocieCommande
    wpf_listeSourceVM->>wpf_navig:Naviguer vers ListeAssocieVM<br>en passant l'id de la<br>ligne sélectionnée
    wpf_navig->>wpf_listeAssocieVM:AssignerParametre(id du xyz sélectionné)
    wpf_navig->>wpf_navig:VMactif = ListeAssocieVM
    wpf_navig->>wpf_mainwindow_xaml:changement de VMActif
    note over wpf_mainwindow_xaml:changement de DataTemplate 
    wpf_mainwindow_xaml->>wpf_uc2_xaml_cs:constructeur
    wpf_uc2_xaml_cs->>wpf_uc2_xaml:InitializeComponent()
    wpf_uc2_xaml->>wpf_uc2_xaml_cs:UserControl_loaded()
    wpf_uc2_xaml_cs->>wpf_listeAssocieVM:appel ObtenirListeXyzAssocieCommande<br>qui appel ObtenirListeXyzAssocieAsync
    wpf_listeAssocieVM->>core_xyzService:ObtenirListeXyzAssocieAsync(id de xyz)
    core_xyzService->>core_xyzRepo:ObtenirListeXyzAssocieAsync(id)
    wpf_listeAssocieVM--xcore_XyzAssocieModel:création de la liste des modèles associés
    wpf_uc2_xaml->>wpf_uc2_xaml:affichage
    note over wpf_uc2_xaml:le binding est fait sur ListeXyzAssocie<br>retournée dans ObtenirListeXyzAssocieAsync

```

Pour voir ce diagramme plus gros sur [Kroki!](https://kroki.io/mermaid/svg/eNqlV9tuGzcQffdXDAIEloDaQfsopAIcOwUCRKmRxE7eBGp3LLPdJTckV5b9NX2MvkM_1hlyb6Io2UX9Yonk3M6cucjijxpVhldSLI0oT16_hqvtZoWFriosUbmTE6A_kTltoLZoQFi4sWKJZnBRGb3ki2v6T1pKrMOt0g5BrzC8mHw61fWikPgEFT3OT1EZXErrDJq3CzMt0AJZWMmMPqCD2xkU2lhykG9XuqZTBeIvXTt8OgfwJiphnMxkJZSDh-pursRKel--Xf8xYblPfCBc61L8vhRSPUiV64f5WpTFUHJGV9_81TlfBXGK4-xsOu1MTYI_BgoB5Xbj7nWO0NmtGbAVZmxWlNufFGrSi4JQwC-6NhlS1AMfPvLF98en25lHiL-B9e-Seurs170wbrJWSQjDC2YGCZMd-UwbnNOrC2t1JnFGgXg9l3TuFUV3O3ikhDtoIi4k315q5STxDZgFpLUyktDcbixbrihif5Hdi7Ii6iCQPHGEL3M6d2LB18Jr3G7o449a8iXxiRSDuLuT2T1pOxR8l4TGqXQWLhr9IRuTd8LiNScWKa90JpWb7rFkV2uHyYgIPuD_OMLoiGStEFbCSA4Z5oV1PZQMjHusfL0AO_02gnlKVq0Y4juAFxZEdqmWkAtlmc-rGp93a6Wl8bbwkvBEG7Bhv8L3Y4jX2W9H6NrYSBdfK9rCknC0f-Kzj_sM2qPzAQXcrhZotVQsSG2xpu5FrU9qxS5fIqhTtI5I51NQnAaL1CVfEv08s88DcJ7ZIQaR_A4KLUzHSEQncqnQdPTlhutp8-fCoZIm8uFSl6VQFBvVFTdpAYIGREGlxmHBQZ_f3NBjrm2ji_lHLXLMvY__hVcztIFK7GPDNIdLbWTLtlEp16SK2ocJWc6xXo_3OqRvPOvHp89Y6biz8dl-R2sed7ClwbmwjyobyXycanStCh-Pj4O_vmGzQ23-5gqdkEVQd9j9L2FGxhE0x8kgmrv_GUerpQ-lOXlJNHsVHE3efpAiXAknvmJZFZTnvkEJcqmm1YQehLQjTwviXtf3D3aJQYnAPiNH4yPFz6I-4IbjPfdSdZnsTdwQuFpg-0_CervkwKvw_VV6hLTbwWAOwIfPWIjHpjbhIrQ5E5VsixSVLKcCvgr7dz8pDxViZ87H_j6Xjv1umkAYEEjEUDS96oy3qzCKo_oMefLps8JrykgHj_ngQLP4CX_sVYsaVLexedcVb4uWC6A4lTkk0A47zwQGyCzokyZJTxx2KRiildNJmnpR_AfUNS4C1VqjjxI4dLYdlP2WBn13410a19tNVvOciHDmVfqXuK7e777mN7FTdrsp0A8e2gJ4Eyi4jTcpJpLVtATYZpp7l_vy8ShAvyaJztDQQppynr0H-NWp2JHZ2ZG7XZhCtwGtrtGncswzVISFl6KDQdBtxjrd6S1rb7yNWGsNBPautnFSW_D6dsYj_g5-jzxOisTdjKa_WvpfUBzN7eyCVSWK7bjcsBFCZzeSSfS6YWEOUtw9iBvVByWdFIV84qxWWpH50XhPMGFo2M6KYTNNG4y3Ec-r4xsH04CXjmNv_YzZ5WFnJDEFj08_xp0ehzAi0XgveMkcTbh0tk7-BsrMduOrMhRAKFng3zelzrc_h79w7HPJmeyuoAcW28HSz_vrnZDOt48oIM6BQUelzQUY2t6xTPwLEAjsKA)