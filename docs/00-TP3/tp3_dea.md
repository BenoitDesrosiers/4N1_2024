---
sidebar_position: 2
draft: false
---

# TP3 DEA
Le DEA pour le TP3

```mermaid
erDiagram
    ro ||--o{ ut : ""
    ut ||--o{ um : ""
    mu ||--o{ um : ""
    ge ||--o{ mu : ""
    ar ||--o{ mu : ""
    me ||--o{ mu : ""

    ro[Role] {
        int RoleId PK
        nvarchar(25) Nom "contrainte unique, valeur: admin, usager"
    }
    ut[Utilisateur] {
        int UtilisateurId PK "auto"
        nvarchar(50) Prenom
        nvarchar(50) Nom
        nvarchar(10) NomUtilisateur "contrainte unique, voir commentaire"
        char(60) MotPasseHash "utiliser password"
        int RoleId FK
    }

    um[UtilisateurMusique] {
        int UtilisateurId PK,FK
        int MusiqueId PK,FK
        decimal  Prix "decimal(8,2), contrainte >= 0. Le prix payé si acheté, voir commentaire"
        int Etoile "contrainte: 1 à 5"
        bool Achete "contrainte default: false. Vrai si achetée, Faux si simplement téléchargée"

    } 

    mu[Musique] {
        int MusiqueId PK "auto"
        nvarchar(100) Titre
        nvarchar(100) Album
        dateonly DateSortie "contrainte >= 1970 et <= année courante"
        int Duree "contrainte > 0"
        int ArtisteId FK
        int GenreId FK
        int MaisonEditionId FK
    }

    ge[Genre] {
        int GenreId PK "auto"
        nvarchar(60) Nom "voir commentaire"
        nvarchar(200) Description "nullable"
        nvarchar(256) SiteWeb "nullable, voir commentaire"
    }

    ar[Artiste] {
        int ArtisteId PK "auto"
        nvarchar(60) Nom
        nvarchar(500) Biographie "nullable"
        nvarchar(256) SiteWeb "nullable, voir commentaire"
        dateonly DateNaissance "contrainte >= 1900 et <= date courante"
    }

    me[MaisonEdition] {
        int MaisonEditionId PK "auto"
        nvarchar(60) Nom "voir commentaire"
        nvarchar(200) Adresse "nullable"
        nvarchar(256) SiteWeb "nullable, voir commentaire"
    }
```

Ce diagramme sur [mermaid.ink](https://mermaid.ink/img/pako:eNqtVdtu2kAQ_ZXRPhXJQTZgLlZTiYqkrVKiqOlFKvRhsTewkneXrnfTUMK_9DXfwY911sGJuZj2IebF3jMze-bMMLMksUoYiQjTA06nmoqxBHy0gvv7kxO1BGsggjHBXw7gZwGILUDYCmDKCgBNygDVFYA45FHwGn1SKfsBy8dv93BpwB1-SODq4vlY3lIdz6h-1QhrcKkExomVNJqiPQMr-U_LPLilKbM6ApoILj2wGZ0yXRBZFTmPvhie8owatN27u4TlFPAiao0qgmxxCf0aXGkmlagALw8iwSNSuqkiG8U1xEoIJg3lmpU55IHaGGiozBXNMvaeZjMMY_OgTMMcD38pnZSdStqeXzyJspFFlGUZ2sxx-Kc63vnFtsHGcR9MWMwFTQEF43dIdPP9qus1ah6Usn9zCn4dPjKYO8M5XawfIONA4xkz64fjqjgGZ0bxlG0pGkEA6z8Qlk0nSqXQd0G3bZHoDbWpieCGphmrw1c8LxHAupxTe-dOMi7mKXM8AIF0_eCKMkWT5w5fQfEm7KhK1LJmx9ot8LHen7nBnCvAfjqxpY5LsFBKpgsY4Mu10obv5IpaB72OD8zA61OgUiJ51NZqiuiusAOr2a4_-LtWfbwlM-UWK5B3TOpD50PKMyXPEm64kodac8pGue-ecEXE47K1_WJiHGud5wHjhBywLNZ87hihn7RpSidphX3YrsE1N-wbm5Rsqxv1KS-qRxu19jJ7VvG_cjs4fhB6yxVugfksr_vLZrHXX5dYxozK-FCL-UWLOY-9BnsSRLDRVjPs_1N2WuXlC99PNMNp-vJFJx4RTAvKE9zPeVpjYmY4PcYkysdhPnWcuTN1OV0vZEwio3EVEDt3ym2WOony0eQRhkIoPXzc-fnq98icShItyR2JgqBZb_lBs9totdqNbs9ve2RBoqbfqfuBH_Qa3U7g95qdcOWR30ph2KAe-j2_0wp7nUbYbHTzaN9zyNFY_QXReps7?type=png)

:::warning Avertissement
En cas de différence entre le diagramme sur cette page et celui sur mermaid.ink, c'est celui sur cette page qui est la bonne version
:::


## Commentaires

Pour le CRUD et pour la génération dans le contexte, vous n'avez pas à respecter les règles pour Bogus. 

Pour la génération avec BOGUS :
### Table Genre
Pour le nom du genre de musique, il doit être parmi ceux trouvés sur https://fr.wikipedia.org/wiki/Liste_de_styles_musicaux . Choisissez en 5. De plus, le site web doit être celui correspondant sur ce même site (https://fr.wikipedia.org/wiki concaténé avec le nom du genre séparé par des _ ). 

### Table MaisonEdition
Pour le nom de la maison, il doit être parmi ceux trouvés sur https://fr.wikipedia.org/wiki/Cat%C3%A9gorie:Maison_d%27%C3%A9dition_d%27ouvrages_musicaux  Choisissez en 5. De plus, le site web doit être celui correspondant sur ce même site (https://fr.wikipedia.org/wiki concaténé avec le nom de la maison séparé par des _ ). 

### Artiste
Pour le site web, il n'y a pas de règles spécifiques, à part être un nom de site web "valide"

### Utilisateur
Le champ NomUtilisateur doit être composé des 6 premiers caractères du Nom et de la première lettre du Prenom suivit d'un nombre aléatoire entre 1 et 99. (Le risque de collision devrait être à peu près nul. Si jamais ca ne fonctionne pas, refaire la génération)

### UtilisateurMusique
Si l'indicateur Achete est faux, le prix doit être 0. 