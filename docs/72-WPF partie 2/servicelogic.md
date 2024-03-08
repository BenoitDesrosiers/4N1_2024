---
sidebar_position: 235
draft: true
---

# Lien entre les couches

* EF 
    * dbset : lien entre les classes de données et les tables
    * classes de données: entité représentant les tables de la bd

* Core
    * repository : logique d'accès à la bd, utilise les classes de données
    * mapExtension : conversion du modèle du domaine vers le modèle de données 
    * service : logique du domaine, converti les objets du domaine en objet de donnée grace au mapExtension, et enregistre dans la bd grace au repository (et vice-versa)
    * classes modèle du domaine : représente ce que le domaine a besoin

* WPF
  * VM : logique de l'application, converti les propriétés liées à la vue en objet du domaine (et vice-versa) et appel les services pour les enregistrer (ou charger)
  * vue : affichage, liée aux propriétés du VMs 