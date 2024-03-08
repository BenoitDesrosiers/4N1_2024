---
sidebar_position: 470
draft: true
---

# Suppression d'une carte d'un utilisateur - Explication

Il n'est pas nécessaire de valider les dépendances pour cet enregistrement, car cette table n'est pas utilisée par une table enfant.

Au niveau du **ViewModel**, il faut appeler le service directement lorsque l'utilisateur accepte la suppression. La disponibilité de la commande dépend uniquement si une carte est sélectionnée dans la liste. Il faut envoyer **UtilisateurId** à partir de la classe **Authentificateur** et **CarteId** à partir de la carte sélectionnée.

Au niveau du **Service**, il faut récupérer l'enregistrement **UtilisateurCarte** à partir de ses clés. Si l'enregistrement existe, il faut le supprimer avec le **Repository**. S'il n'existe pas, il faut générer une exception. Il n'est pas nécessaire de créer la classe **UtilisateurCarteDependance**, car il n'y en a aucune.

Au niveau du **Repository**, il faut ajouter la méthode **`ObtenirParCle`**. Cette méthode ne provient pas de la classe parent, car c'est une clé primaire composée. Cette méthode sera créée dans le prochain document, car elle sera nécessaire pour la gestion.
