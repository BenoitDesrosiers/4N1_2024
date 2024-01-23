---
sidebar_position: 6
---
# Transaction


## DEA

Ce DEA sera utilisé pour cette section des notes de cours.

<img src="/4N1_2024/img/04_DEA.jpg" />

La table **Univers** correspond à l'univers des personnages. Par exemple Marvel, DC Comics, Teenage Mutant Ninja Turtles...


## Procédure de réinitialisation

Dans ce document, les tables devront être détruites et recréez plusieurs fois pour présenter les concepts.

Afin d'accélérer la tâche, une procédure stockée sera créée dans la base de données.

En premier lieu, il faut créer la base de données.

```sql
IF DB_ID('Demo4N1_C2') IS NULL
	CREATE DATABASE Demo4N1_C2;
GO

USE Demo4N1_C2;
GO
```

Le code ci-dessous permet de détruire les tables et de les recréer.

```sql
CREATE PROCEDURE initialiserBD
AS

--Vérifie si la table Personnage existe avant de la détruire
IF OBJECT_ID('Personnage','U') IS NOT NULL 
	DROP TABLE Personnage;
	
--Vérifie si la table Univers existe avant de la détruire
IF OBJECT_ID('Univers','U') IS NOT NULL 
	DROP TABLE Univers;

--Création de la table Univers
CREATE TABLE Univers
(
	UniversId INT NOT NULL CONSTRAINT PK_Univers PRIMARY KEY IDENTITY,
	Nom VARCHAR(100) NOT NULL
);

--Création de la table Personnage
CREATE TABLE Personnage
(
	PersonnageId INT NOT NULL CONSTRAINT PK_Personnage PRIMARY KEY IDENTITY,
	Nom VARCHAR(100) NOT NULL,
	IdentiteReelle VARCHAR(100) NULL,
	DateNaissance DATE NULL,
	EstVilain BIT NOT NULL,
	UniversId INT NOT NULL CONSTRAINT FK_Personnage_UniversId 
		FOREIGN KEY REFERENCES Univers(UniversId)
);
GO
```

Donc, pour détruire et recréer les tables, il suffit de faire cette ligne.

```sql
EXEC initialiserBD;
```

## Transaction

Une transaction est une unité de travail pouvant inclure plusieurs activités qui modifient et interrogent les données et qui peuvent aussi en modifier la définition.

On peut définir explicitement une transaction à l’aide de **BEGIN TRANSACTION** et la terminer avec **COMMIT TRANSACTION** ou **ROLLBACK TRANSACTION**.

Si on ne définit pas la transaction explicitement, elle est alors définie implicitement pour chaque expression (chaque commande).

Les transactions ont quatre propriétés: atomicité, consistance/cohérence, isolation, et durabilité; abrégés par l’acronyme **ACID**. 

- **Atomicité:** une transaction est une unité de travail indivisible. Soit tous les changements sont effectués, ou alors aucun ne l’est. Si le système « plante » avant la fin d’une transaction, les changements sont enlevés au redémarrage de SQL Server. Aussi, si une erreur se produit durant une transaction, alors cette transaction sera annulée et la base de données reviendra à un état initial. 
- **Consistance ou Cohérence**: Le terme consistance ou cohérence réfère à l’état des données que la BD retourne lors d’accès durant des transactions concurrentes. Toutes les structures de données internes, comme les index, doivent être cohérentes à la fin de la transaction.
- **Isolation**: un mécanisme utilisé pour contrôler l’accès aux données et s’assurer que la transaction accède aux données seulement si celles-ci sont dans le niveau de consistance auquel s’attend la transaction. Une transaction reconnaît les données dans l’état où elles se trouvaient avant d’être modifiées par une transaction simultanée, ou les reconnaît une fois que la deuxième transaction est terminée, mais ne reconnaît jamais un état intermédiaire. Cette propriété est nommée mise en série, car elle permet de recharger les données de départ et de répéter une suite de transactions dont le résultat sur les données sera identique à celui des transactions d’origine. En d’autres mots: le système verrouille la transaction tant que les données ne sont pas dans le bon état.
- **Durabilité**: Lorsqu’une transaction est terminée, ses effets sur le système sont permanents. Les modifications sont conservées même en cas de défaillance du système. Les données sont toujours écrites dans un journal de transactions avant d’être écrites dans les tables de données. Lorsque la commande commit est enregistrée dans le journal, la transaction est considérée « durable » même si les données ne sont pas encore enregistrées dans les tables. Si le système « plante » avant que les données soient dans les tables, elles seront transférées au redémarrage du serveur.

Afin d’assurer ces propriétés, le moteur de base de données offre les éléments suivants:

- Des fonctionnalités de verrouillage permettant d’assurer l’isolement des transactions.
- Des fonctionnalités de consignation assurant la durabilité des transactions. En cas de défaillance du matériel serveur, du système d’exploitation ou d’une instance du Moteur de base de données lui-même, l’instance utilise au redémarrage les journaux des transactions pour restaurer automatiquement toutes les transactions incomplètes jusqu’au moment de la défaillance du système.
- Des fonctionnalités de gestion des transactions qui assurent l’atomicité et la cohérence des transactions. Lorsqu’une transaction a débuté, elle doit se dérouler correctement jusqu’à la fin, sans quoi l’instance du Moteur de base de données annule toutes les modifications effectuées sur les données depuis le début de la transaction.

Lorsqu'une transaction est exécutée, une table devient verrouillée dès qu'elle reçoit une écriture (insertion, suppression ou mise à jour). La table se déverrouille uniquement lorsque la transaction est terminée. 

### Exemple

Initialisez la base de données et exécutez le script ci-dessous.

```sql
EXEC initialiserBD; 

SET IDENTITY_INSERT Univers ON;
INSERT INTO Univers(UniversId, Nom) VALUES
	(1, 'Marvel'),
    (2, 'DC');
SET IDENTITY_INSERT Univers OFF;
```

Par exemple, insérez ces données dans la table **Personnage**.

```sql
INSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Spiderman', 0, 1);
INSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Leonardo', 0, 3); --Erreur, l'univers 3 n'existe pas
INSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Batman', 0, 2); 
```

Dans la table, il aura seulement la première ligne dans la table.

Pour empêcher l'insertion des 3 éléments en cas d'erreur, il faut utiliser la transaction.

Exécutez ce script.

```sql
--Vide la table
DELETE FROM Personnage;

--Début de la transaction
BEGIN TRANSACTION;
INSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Spiderman', 0, 1);
INSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Leonardo', 0, 3); --Erreur
INSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Batman', 0, 2); 
COMMIT TRANSACTION;
```

Le terminal indique qu'il y a eu 2 insertions, mais la table est vide. Le 2e élément de la table en erreur, mais la transaction s'est tout de même exécuté, car il s'est terminé avec un **`COMMIT`**.

Exécutez ce script.

```sql
--Vide la table
DELETE FROM Personnage;

SET XACT_ABORT ON;
GO
BEGIN TRANSACTION;
    INSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Spiderman', 0, 1);
    INSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Leonardo', 0, 3); --Erreur
    INSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Batman', 0, 2); 
COMMIT TRANSACTION;
GO
SET XACT_ABORT OFF;
GO
```

La propriété **`XACT_ABORT`** permet d'interrompre la transaction et de faire un **rollback** automatiquement. La propriété est disponible uniquement depuis SQL Server 2016. Avant, il fallait utiliser un **try/catch** et gérer la fermeture des transactions.

Maintenant, ajoutez des **`GO`** entre les insertions.

```sql
SET XACT_ABORT ON;
GO
BEGIN TRANSACTION;
    INSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Spiderman', 0, 1);
    GO
    INSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Leonardo', 0, 3); --Erreur
    GO
    INSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Batman', 0, 2); 
    GO
COMMIT TRANSACTION;
GO
SET XACT_ABORT OFF;
```

L'item 1 est dans la base de données, car son lot a fonctionné.

:::danger[ATTENTION]
Il est important de ne jamais utiliser un **`GO`** dans la transaction, car une transaction doit avoir un lot unique.
:::

