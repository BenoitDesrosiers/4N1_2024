---
sidebar_position: 442
draft: true
---


# Pour le TP3
<!-- pas pour 2024
Nous venons de voir comment afficher un message dans un message box. Vous devez utiliser cette technique dans deux circonstances dans le TP3


## Confirmation de la sauvegarde

À la fin d'une sauvegarde, il faut un indicateur visuel pour l'utilisateur. Il existe plusieurs façons d'indiquer à l'utilisateur que le formulaire est sauvegardé comme verrouiller le formulaire, écrire un message d'état ou une notification.

Pour le **TP 3**, vous devez afficher un **MessageBox** à l'utilisateur pour indiquer que l'item est bien sauvegardé.

Il faut mettre une icône d'information pour **MessageBoxImage**.

Pour plus d'information sur le **MessageBox** : https://wpf-tutorial.com/fr/45/dialogs/la-messagebox/

## Question pour la suppression

Avant de supprimer, il faut également demander à l'utilisateur s'il accepte de faire la suppression. Pour le **TP 3**, vous devez faire cette mécanique à partir de la liste et également à partir de la vue de gestion.

Dans la classe d'assistance **Notification**, vous devez ajouter une nouvelle méthode qui demande une acceptation à l'utilisateur. La méthode doit retourner un booléen. Si la méthode retourne **true**, c'est accepté, si c'est **false**, ce n'est pas accepté.

Dans l'implémentation de la méthode, il faut utiliser un **MessageBox**.

La méthode **MessageBox.Show** retourne une **enum** de type **MessageBoxResult**. 

Le résultat est en fonction du bouton qui a été appuyé par l'utilisateur. 

Pour afficher les boutons, il faut spécifier le bon **MessageBoxButton**.

Il faut également mettre une icône pour une question ou un avertissement avec le **MessageBoxImage**.

Il faut convertir le choix du bouton en booléen. 

Pour plus d'information sur le **MessageBox** : https://wpf-tutorial.com/fr/45/dialogs/la-messagebox/

-->