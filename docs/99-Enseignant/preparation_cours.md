---
draft: true
---

# Preparation 

Voir les instructions dans les commentaires de la page source 

<!---


## Installation du serveur SQL-Serveur du département

Les scripts se trouvent dans le répertoire *Script Gestion SQL* des notes de cours. 


### Ménage des comptes de l'année précédente

Exécuter le script SuppressionComptesEtudiantsEtBdsAW2019.sql
afin d'enlever toutes les bds et les comptes des étudiants de l'an dernier. 


### Création des comptes pour cette année

Vider la table EtudiantBD2/Etudiant. 

Inscrire la liste des étudiants dans le script 2-InsertionEtudiantsH2022.sql

Il suffit de mettre les info dans VALUES. 

Le champs traite doit être mis à 0 (une valeur autre que 1 indique qu'il ne faut pas traiter cet étudiant dans un script)

Il y a aussi le script 1-CreationBDEtudiantBDS.sql qui peut être utilisé si la BD n'existe pas. Le script crée la bd et la table.  

### Création des comptes et des BD pour le cours

Exécuter le script 3-CreationComptesEtudiantsEtBDs.sql. 

Ce script crée un compte pour chaque étudiant se trouvant dans la table Etudiant, ainsi qu'une copie de AdventureWorks2019. 





## À revoir

-enlever la partie purement linq (le deuxieme tp.). La remplacer par un tp de construction d'interface sans BD. Faire afficher des structures avec Linq
    -ca permettra d'aller plus a fond dans l'interface
    -la partie bd sera couverte dans le tp3 anyway
    - faire faire un crud en console, ca se fait plus. Donc les notions apprises ne servent pas vraiment. 
    - 
-->