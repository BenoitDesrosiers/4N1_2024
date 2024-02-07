---
sidebar_position: 50
draft : true
---


# Type d'enregistrement des dépendances

Il existe 3 types d'enregistrement pour les dépendances. Ces types d'enregistrement consistent à la durée de vie de l'instance de la classe qui sera créée lors de l'injection.

- **Transient**

  Une nouvelle instance est créée à chaque fois qu'un objet demande une injection de cette dépendance.

- **Scoped**

  Une seule instance est créée pour toute la durée de vie du **scope**. Tous les objets qui demandent une injection de ce service à l'intérieur du **scope** auront la même instance.

  En application console, le **scope** doit être créé manuellement.

  Par contre, dans le cas d'une application **Blazor Server**, un rafraichissement du navigateur ou un nouvel onglet consiste à un nouveau **scope**. Le changement de page sans rafraichissement du navigateur n'occasionne pas de changement de **scope**. Le **scope** consiste à la création de la requête initiale avec le serveur par le navigateur.

- **Singleton**

  Une seule instance est créée pour toute la durée de vie de l'application.
