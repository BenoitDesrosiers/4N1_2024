---
sidebar_position: 1
draft: false
---

# TP #3 Énoncé

Ce TP consiste au développement d'une application WPF connectée à une bd relationnel SQL-Server.

Il compte pour **50%** de la note finale. 

## Consignes 

- Le travail doit se faire en **équipe de 2** (et une équipe de 3 si impair)
- Le travail doit être remis sur **GitLab ou Github**.
    - Sur Github, l’utilisateur BenoitDesrosiers doit être ajouté en tant que **collaborator**
    - Sur Gitlab, l'utilisateur BenoitDesrosiers (image de Wall-e) doit être ajouté en tant que **developer**.
- Sur LÉA, il faut remettre un fichier texte contenant 
  - le lien du dépôt git.
  - le nom et DEA des membres de l'équipe.
- Ce fichier texte doit être remis dans Léa avant le **mardi 14 mai 2024 23:59:59**.
- Une présentation/discussion du projet avec l’enseignant sera faite durant le cours de la semaine 15.
- La remise finale du projet sera le **mardi 14 mai 2024 23:59:59**. 
- La date du dernier **commit** dans le dépot sera la date de remise du projet.

# Énoncé

Vous devez créer une application WPF pour faire la gestion d'une liste de musique. Le DEA de la bd est fournie sur la page suivante.

Votre application doit respecter l'architecture présentée en classe. 

Une partie du code est à faire en équipe, et une autre est à faire individuellement. 

Afin de m'assurer que tout le monde fait sa part, et aussi vous habituer à travailler en équipe, Une revue sera faite des commits ayant permis d'introduire votre code dans le programme. Cette révision de la division des tâches sera faite lors de la rencontre à la semaine 15. 

Vous pouvez donc commencer par faire la partie en équipe, et ensuite vous séparer la tâche. 

Afin de faciliter le suivit des commits, vous devrez utiliser des messages significatifs. Assurez-vous aussi que vos identifiants dans git sont à votre nom.  

:::tip
Utilisez cette commande pour vous identifier correctement dans git

```powershell
git config --global user.name "Votre Nom"
git config --global user.email votre.nom@etu.cegepdrummond.ca
```
:::

## Création de la Base de données (en équipe)

Vous devez créer la base de données au complet par la technique Code First. Il est important de respecter le DEA.

La chaine de connexion doit être dans une fichier de configuration. 

Vous devez créer 2 comptes utilisateurs. Un utilisateur avec le rôle **usager** et un utilisateur avec le rôle **admin**. 
Ces utilisateurs doivent être créés dans le fichier de contexte.

:::warning IMPORTANT
 Vous devez nommer ces utilisateurs **Admin** et **Usager1**, et leur mot de passe doit être **password**.
:::

Vous devez créer un fichier **Readme** contenant les commandes pour la migration. 


## Insertion de données à l'aide de Bogus (en équipe)


Vous devez insérer de l'information dans les tables Musique, Utilisateur et UtilisateurMusique (et Artiste pour les équipes de 2) à l'aide de Bogus. Un appel au générateur ajoutera de 5 à 10 entrées par table. 

Pour la table Utilisateur, le mot de passe est toujours **password**.

:::warning Attention
voir les modules ci-bas pour l'assignation des tables pour chacun des membres de l'équipe. 
:::

:::tip
Étant donné que l'insertion originale à l'aide de BOGUS pour les tables Genre, MaisonEdition, et potentiellement Artiste se fera individuellement, vous pouvez insérer UNE entrée par table à l'aide du contexte. 
:::

Les générateurs de Bogus doivent être dans le module WPF. Vous devez ajouter une option dans le menu de navigation permettant de générer de nouvelles entrées à la demande. 


## Authentification et autorisation (en équipe)

Vous devez faire une application sécurisée. 

L’application doit avoir une vue de connexion.

L’algorithme de hachage doit être bcrypt.

Chaque module doit autoriser ou non l’utilisateur en validant le rôle de l’utilisateur.

## Navigation (en équipe et seul)

Vous devez avoir un menu de navigation tel que celui démontré en cours. 

Il doit être possible de naviguer d'une vue à l'autre via ce menu. 



## Modules individuels

Chacun des membres de l'équipe s'occupera d'une partie du projet. 

La première étape consiste à introduire des données dans une table à l'aide de **BOGUS**. Notez que cette information ne dépend d'aucune autre table, mais elle est nécessaire pour la création des autres tables que vous devez faire en équipe. Je vous recommande donc de faire cette partie en premier. 

Vous devez générer de 5 à 10 entrées pour chaque appel à votre générateur. 

Vous devez ajouter votre générateur dans le projet WPF, et permettre à l'aide du menu de navigation de générer de nouvelles entrées. 

Vous devez ensuite faire l'**affichage** d'une table afin de sélectionner une ligne, ce qui affichera les informations associées à cette ligne. 

Vous devez avoir une interface multilangues pour cet écran d'affichage. 

Vous devez faire le **CRUD** complet pour une table simple (n'ayant aucune FK)

Pour la partie entrée de données du CRUD, vous devez faire la validation des données à l'aide de validateurs. Ces validateurs doivent être en commun (c.à.d. si chacun de vous à besoin d'un validateur pour les entiers, il ne doit pas y avoir 2 validateurs à la fin.)

:::tip 
 Si nécessaire, développez les validateurs sur une branche séparée que vous pourrez introduire dans vos branches de développement personnelles.
:::



### Modules pour le membre #1

* Création des données initiales des MaisonEdition à l'aide de **BOGUS**
  * insertion dans le menu principal
* **Affichage** des Utilisateurs
  * incluant l'information de UtilisateurMusique et Musique
  * l'affichage doit s'afficher dans 2 langues (localisation)
* **CRUD** des MaisonEdition
* Seul l'administrateur peut voir cette liste. 

Le module doit donc afficher la liste des Utilisateurs et lorsqu'on en sélectionne un, un tableau secondaire s'ouvre avec l'information sur sa Musique. (Ne pas afficher les Genres, Artistes, et MaisonEdition)
  
### Modules pour le membre #2

* Création des données initiales des Genres à l'aide de **BOGUS**
  * insertion dans le menu principal

* **Affichage** des Genres
  * incluant les Musiques et leur Artiste et MaisonEdition associée  
  * l'affichage doit s'afficher dans 2 langues (localisation)
* **CRUD** des Genres
* Seules les Musiques appartenant à l'utilisateur connecté sont affichées

Le module doit donc afficher la liste des Genres, et lorsqu'on en sélectionne un, un tableau secondaire s'ouvre avec l'information sur les Musiques de ce genre appartenant à l'usager connecté. 

Si c'est l'administrateur qui est connecté, alors lister toutes les Musiques 

### Modules pour le membre #3
* Création des données initiales des Artistes à l'aide de **BOGUS**
  * insertion dans le menu principal
* **Affichage** des Artistes 
  * incluant les Musiques et leur Artiste et MaisonEdition associée 
  * l'affichage doit s'afficher dans 2 langues (localisation)

* **CRUD** des Artistes
* Seules les Musiques appartenant à l'utilisateur connecté sont affichées

Le module doit donc afficher la liste des Artistes, et lorsqu'on en sélectionne un, un tableau secondaire s'ouvre avec l'information sur les Musiques de cet Artite appartenant à l'usager connecté. 

Si c'est l'administrateur qui est connecté, alors lister toutes les Musiques 


### Tests automatisés (individuel)

Vous devez effectuer un test unitaire pour une fonctionnalité pour chacun des types de classes ci-dessous pour la table pour laquelle vous avez fait le CRUD.
- ~~Repository~~
- Service
- Validation
- ViewModel
  
Vous devez également effectuer 1 tests d’intégration pour la table pour laquelle vous avez fait le CRUD. (Du ViewModel à la base de données).

Vous devez utiliser la technique et la librairie présentées en classe.

## Documentation du code

Vous devez respecter les bonnes pratiques de documentation. 

Vous serez évalué individuellement pour la documentation. Si la partie commune est mal documentée, tout le monde perd des points. 

Vous devez documenter les classes, les fonctions et les propriétés, ainsi que tout code obscur ou complex. 


## Présentation

À la semaine 15, vous devrez présenter votre projet à l'enseignant (pas devant la classe). 

Vous aurez 20 minutes pour présenter ce qui a été fait. 

La présentation se fait en équipe. 

Chaque membre de l'équipe devra présenter sa partie. Veuillez donc préparer un scénario de présentation. Si une fonctionnalité n'est pas fait ou ne fonctionne pas correctement, vous devez me le dire avant d'essayer de la présenter. 

La présentation de la partie commune peut se faire par un ou plusieurs membres de l'équipe. À vous de décider. 

Vous devrez justifier le choix de vos tests. 

