---
sidebar_position: 312
draft: false
---

# Bogus pour le tp3

Afin d'intégrer Bogus dans la navigation pour le TP3, voici quelques pointeurs qui vous aideront.

## Nouveau projet .Bogus

Dans la section introduisant Bogus, tout était fait dans un projet contenant la bd et le générateur. 

Ici, nous avons le projet EF contenant la connexion à la BD, le projet Core contenant les repositories, et WPF contenant l'interface. 

La génération se fera dans un nouveau projet (TP3.Bogus). Ce projet aura EF comme dépendance afin de se connecter directement sur la bd. 

:::info
Il serait possible, et même recommandé, de passer par les services de Core afin de faire la validation des données et de séparer Bogus de la BD. Mais afin de simplifier la tâche, nous utiliserons une connexion directe à la BD. 
:::

Les générateurs vont dans ce le projet .Bogus. 


## Navigateur

Dans le projet WPF, vous devez ajouter les fonctions pour faire le seed dans le Navigateur. 

La première chose à faire est d'ajouter le projet .Bogus comme dépendance de .WPF. 

Étant donné qu'il n'y a pas d'interface liée à la génération, vous pouvez ajouter les fonctions nécessaires directement dans Navigateur. (Ici aussi, il serait recommandé de mettre ces fonctionnalité dans une autre classe d'aide que Navigateur. Vous pouvez le faire si vous le désirez. Il faudra alors l'enregistrer dans les services, l'injecter dans MainWindowVM...)

Vous devez injecter le context (la bd) dans le constructeur de Navigateur. 

Vous devez avoir une fonction par classe (SeedGenre(), SeedUtilisateur ... ). Cette fonction appel le générateur afin de produir un certain nombre (5-10) d'objets. Ensuite, elle ajoute les éléments directement dans la bd (add et savechanges)

## Interface

Il reste à connecter ces fonctions à l'interface.

Vous devez ajouter les commandes dans MainWindowVM.cs et ensuite les options de menu dans MainWindow.xaml