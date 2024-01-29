---
sidebar_position: 8
---

#  Clé auto incrémentée

Réinitialisez la base de données.

```sql
EXEC initialiserBD; 
```

Pour créer des scripts d'importation de données, il faut s'assurer de bien gérer les clés des tables auto incrémentées. 

Il existe plusieurs techniques qui permettent de gérer les clés.

Par défaut, lorsque la clé est auto-incrémentée, il n'est pas possible de la spécifier.

Insérez la ligne ci-dessous dans la table.

```sql
INSERT INTO Univers(UniversId, Nom) 
VALUES (1, 'Marvel');

--Cannot insert explicit value for identity column in table 'Univers' when IDENTITY_INSERT is set to OFF.
```

Le serveur retourne une erreur, car il n'est pas possible de gérer la clé manuellement.

Dans le premier exemple d'insertion, lors de la création des Personnages, l'id de l'univers était présumé être 1 et 2. Par contre, il n'est pas possible de présumer ceci, car les scripts d'importations doivent être fonctionnels en tout temps.

Assurez-vous d'avoir **2 enregistrements** dans la table **Univers**.

**Supprimez** les 2 enregistrements et **ajoutez** de nouveau vos 2 enregistrements.

Est-ce que la clé recommence à 1 si la table est vide ? Malheureusement **non**. La BD se souvient du dernier id utilisé. Tant que la table n'est pas recréée, le dernier id sera conservé afin de calculer le nouveau lors d'une insertion même si ce dernier id a été effacé de la table. 

C'est pour cette raison qu'il faut s'assurer d'avoir des scripts qui gèrent correctement les clés.

## Désactivation de l'identité

Il est possible de désactiver l'auto-incrémentation d'une table temporairement avec la propriété **IDENTITY_INSERT**.

```SQL
SET IDENTITY_INSERT Univers ON; -- Indique que la table Univers accepte l'insertion de valeur dans le champ IDENTITY
INSERT INTO Univers(UniversId, Nom) 
VALUES (19898989, 'Teenage mutant ninja turtles');

SET IDENTITY_INSERT Univers OFF; -- Indique que la table Univers n'accepte pas l'insertion de valeur dans le champ IDENTITY
```

Pour être en mesure de connaitre la dernière identité utilisée, il faut utiliser la fonction **IDENT_CURRENT( 'table' )**.

Exécutez le script ci-dessous.

```sql
EXEC initialiserBD; 

SELECT IDENT_CURRENT('Univers'); -- Affiche 1

INSERT INTO Univers(Nom) 
VALUES ('Marvel');

SELECT IDENT_CURRENT('Univers'); -- Affiche 1

INSERT INTO Univers(Nom) 
VALUES ('DC');

SELECT IDENT_CURRENT('Univers'); -- Affiche 2
```

Lorsque la table n'a jamais eu d'insertion, **IDENT_CURRENT** retourne le premier élément possible.

Dans le cas d'une table avec une **identité par défaut**, soit **débute à 1 et incrément de 1**, il est possible d'utiliser cette requête pour déterminer le suivant.

```sql
DECLARE @universId INT;
--Vérifie si la table est vide et que la clé courante correspond à 1. La prochaine clé doit être 1
--Sinon, on prend la dernière clé et on ajoute 1

SET	@universId = 
	CASE WHEN IDENT_CURRENT('Univers') = 1 AND (SELECT COUNT(1) FROM Univers) = 0 
		THEN 1
		ELSE IDENT_CURRENT('Univers') + 1
	END;

SELECT @universId;
```

Donc pour l'ajout de valeur, il faut prendre la variable **@UniversId** et l'incrémenter de 1 par enregistrement.

```sql showLineNumbers
EXEC initialiserBD; 

SET XACT_ABORT ON;
GO
BEGIN TRANSACTION;
	--Déterminer la clé de départ pour la table Univers
	DECLARE @universIdDepart INT;
	SET @universIdDepart = 
		CASE WHEN IDENT_CURRENT('Univers') = 1 AND (SELECT COUNT(1) FROM Univers) = 0 
			THEN 1
			ELSE IDENT_CURRENT('Univers') + 1
		END;

    --Début des insertions pour la table Univers
    SET IDENTITY_INSERT Univers ON; -- Permet d'activer l'insertion manuelle d'une clé auto-incrémentée
    INSERT INTO Univers(UniversId, Nom) 
    VALUES
        (0 + @universIdDepart, 'Marvel'),
        (1 + @universIdDepart, 'DC Comics'),
        (2 + @universIdDepart, 'Teenage mutant ninja turtles');
    SET IDENTITY_INSERT Univers OFF; -- Remet l'auto-incrément automatique sur la table

	--Déterminer la clé de départ pour la table Personnage
	DECLARE @personnageIdDepart INT
	SET	@personnageIdDepart = 
		CASE WHEN IDENT_CURRENT('Personnage') = 1 AND (SELECT COUNT(1) FROM Personnage) = 0 
			THEN 1
			ELSE IDENT_CURRENT('Personnage') + 1
		END;
			
    --Début des insertions de la table
    SET IDENTITY_INSERT Personnage ON;
    --Ajout des héros pour Marvel -> 0 + @universIdDepart
    INSERT INTO Personnage(PersonnageId, Nom, IdentiteReelle, DateNaissance, EstVilain, UniversId) 
    VALUES
		(0 + @personnageIdDepart, 'Spiderman', 'Peter Parker', null, 0, 0 + @universIdDepart),
		(1 + @personnageIdDepart, 'Iron Man', 'Tony Stark', null, 0, 0 + @universIdDepart),
		(2 + @personnageIdDepart, 'Thor', 'Thor', null, 0, 0 + @universIdDepart);

	--Ajout des héros pour DC -> 1 + @universIdDepart
	INSERT INTO Personnage(PersonnageId, Nom, IdentiteReelle, DateNaissance, EstVilain, UniversId)
	VALUES
		(3 + @personnageIdDepart, 'Joker', null, null, 1, 1 + @universIdDepart),
		(4 + @personnageIdDepart, 'Batman', 'Bruce Wayne', null, 0, 1 + @universIdDepart);
    SET IDENTITY_INSERT Personnage OFF;
COMMIT TRANSACTION;
GO
SET XACT_ABORT OFF;
GO
```

### Problématique

En utilisant cette technique, il y a un risque que votre script ne fonctionne pas, car il est possible qu'un enregistrement soit ajouté dans la table entre le calcul de la prochaine clé et l'insertion du premier enregistrement.

La transaction bloque la table dès qu'il y a une écriture, mais pas lors de la lecture. Dans l'exemple ci-dessus, il pourrait avoir une insertion par un autre processus à la ligne 11 et la prochaine valeur ne serait plus valide.

La cohérence des données serait intacte, car la transaction annulera le tout et rien ne sera fait dans la BD.

### Amélioration

Lorsqu'une table a une identité particulière, c'est-à-dire que la première valeur et/ou l'incrément n'est pas 1. 

:::warning IMPORTANT
Ne pas utiliser cette technique pour le TP. Utilisez celle avec SCOPE_IDENTITY().
:::
La propriété **IDENT_SEED** permet de connaitre la première valeur.

La propriété **IDENT_INCR** permet de connaitre l'incrément.

Pour être en mesure de connaitre le prochain, il faut faire cette logique.

```sql title="NE PAS UTILISER"
DECLARE @universIdDepart INT;
--Vérifie si la table est vide et que la clé courante correspond à la valeur de départ (SEED). La prochaine clé doit être la valeur de départ (SEED)
--Sinon, on prend la dernière clé et on ajoute la valeur d'incrément (INCR) '

SET	@universIdDepart = 
	CASE WHEN IDENT_CURRENT('Univers') = IDENT_SEED('Univers') AND (SELECT COUNT(*) FROM Univers) = 0 
		THEN IDENT_SEED('Univers')
    	ELSE IDENT_CURRENT('Univers') + IDENT_INCR('Univers')
	END;	
```

Pour faire le script d'insertion. Le premier élément doit être 12 et le suivant 16, 20...

```sql
IF OBJECT_ID('Personnage','U') IS NOT NULL 
	DROP TABLE Personnage;
IF OBJECT_ID('Univers','U') IS NOT NULL 
	DROP TABLE Univers;

CREATE TABLE Univers
(
    --highlight-next-line
	UniversId INT NOT NULL CONSTRAINT PK_Univers PRIMARY KEY IDENTITY(12,4), --Débute à 12 avec des incréments de 4
	Nom VARCHAR(100) NOT NULL
);

CREATE TABLE Personnage
(
	PersonnageId INT NOT NULL CONSTRAINT PK_Personnage PRIMARY KEY IDENTITY,
	Nom VARCHAR(100) NOT NULL,
	IdentiteReelle VARCHAR(100) NULL,
	DateNaissance DATE NULL,
    EstVilain BIT NOT NULL,
	UniversId INT NOT NULL CONSTRAINT FK_Personnage_UniversId FOREIGN KEY REFERENCES Univers(UniversId)
);
```

Si on désire ajouter un personnage de l'univers **DC Comics**, la clé étrangère doit être **1 * IDENT_INCR('Univers') + @UniversId**.

```sql
SET XACT_ABORT ON;
GO
BEGIN TRANSACTION;

    DECLARE @universIdDepart INT;
    SET @universIdDepart = 
    	CASE
        	WHEN IDENT_CURRENT('Univers') = IDENT_SEED('Univers') AND (SELECT COUNT(*) FROM Univers) = 0
        	THEN IDENT_SEED('Univers')
	        ELSE IDENT_CURRENT('Univers') + IDENT_INCR('Univers')
        END;

    DECLARE @personnageIdDepart INT;
    SET @personnageIdDepart = CASE
        WHEN IDENT_CURRENT('Personnage') = IDENT_SEED('Personnage') AND (SELECT COUNT(*) FROM Personnage) = 0 
        THEN IDENT_SEED('Personnage')
        ELSE IDENT_CURRENT('Personnage') + IDENT_INCR('Personnage')
        END;

    --Insertion. La clé sera générée par Index * IDENT_INCR('Univers') + @universIdDepart
    SET IDENTITY_INSERT Univers ON;
    INSERT INTO Univers(UniversId, Nom) VALUES
        (0 * IDENT_INCR('Univers') + @universIdDepart, 'Marvel'), --Id = 12
        (1 * IDENT_INCR('Univers') + @universIdDepart, 'DC Comics'), --Id = 16
        (2 * IDENT_INCR('Univers') + @universIdDepart, 'Teenage mutant ninja turtles'); --Id = 20
    SET IDENTITY_INSERT Univers OFF;

    SET IDENTITY_INSERT Personnage ON;
    INSERT INTO Personnage(PersonnageId, Nom, IdentiteReelle, DateNaissance, EstVilain, UniversId)
	VALUES
		(0 * IDENT_INCR('Personnage') + @personnageIdDepart, 'Joker', null, null, 1, 1 * IDENT_INCR('Univers') + @universIdDepart),
        (1 * IDENT_INCR('Personnage') + @personnageIdDepart, 'Batman', 'Bruce Wayne', null, 0, 1 * IDENT_INCR('Univers') + @universIdDepart);		
    SET IDENTITY_INSERT Personnage OFF;
COMMIT TRANSACTION;
GO
SET XACT_ABORT OFF;
GO
```

## SCOPE_IDENTITY()

:::tip
Cette technique est recommandée
:::

La fonction **SCOPE_IDENTITY()** retourne la dernière valeur de l'identité en fonction de la connexion.

Recréez les tables comme ci-dessous.

```sql
EXEC initialiserBD;
```

Ouvrez deux nouveaux onglets de requête dans SSMS.

**Onglet 1**

```sql
INSERT INTO Univers(Nom) 
VALUES ('Marvel');
```

**Onglet 2**

```sql
INSERT INTO Univers(Nom) 
VALUES ('DC Comics');
```

L'univers Marvel devrait avoir comme clé primaire 1 et pour **DC Comics** la clé sera à 2.

Exécutez dans chacun des onglets la commande ci-dessous.

```sql
SELECT SCOPE_IDENTITY();
```

Dans l'onglet 1, la valeur retournée sera 1 et dans l'onglet 2, la valeur sera 2.

Avec le **SCOPE_IDENTITY**, même s'il y a une insertion dans la table pendant la préparation du script, le **SCOPE_IDENTITY()** retournera la clé de la connexion en cours.

Ouvrez un 3e onglet.

```sql
INSERT INTO Univers(Nom) VALUES('Teenage mutant ninja turtles');
INSERT INTO Univers(Nom) VALUES('Power Rangers');
SELECT SCOPE_IDENTITY();
```

Le **SCOPE_IDENTITY** retourne seulement la dernière valeur. Il faut donc faire les scripts en conséquence.

Ouvrez un 4e onglet.

```sql
INSERT INTO Univers(Nom) 
VALUES ('Star Wars'); -- Sera la clé #5
-- Les autres champs peuvent être null, donc il n'est pas nécessaire de les mettre dans l'insertion
INSERT INTO Personnage(Nom, EstVilain, UniversId) 
VALUES ('Dark Vador', 1, 5);
SELECT SCOPE_IDENTITY(); --Retourne 1, car c'est la clé de Dark Vador
```

Il n'est pas possible de spécifier la table pour la fonction **SCOPE_IDENTITY()**. Elle retourne la dernière clé primaire qui a été créée. Il faut donc faire les scripts en conséquence.

Pour faire le script, il faut mettre la valeur du **SCOPE_IDENTITY()** dans une variable à des endroits spécifiques.

Recréez vos tables pour les vider et repartir de 0.
```sql
EXEC initialiserBD;
```

```sql
--Déclaration des variables pour enregistrer la clé primaire
DECLARE @universId1 INT
DECLARE @universId2 INT
DECLARE @universId3 INT

INSERT INTO Univers(Nom) VALUES('Marvel')
--Enregistre la clé pour Marvel
SELECT @universId1 = SCOPE_IDENTITY()

INSERT INTO Univers(Nom) VALUES('DC Comics')
--Enregistre la clé pour DC
SELECT @universId2 = SCOPE_IDENTITY()

INSERT INTO Univers(Nom) VALUES('Teenage mutant ninja turtles')
--Enregistre la clé pour TMNT
SELECT @universId3 = SCOPE_IDENTITY()

--Pour afficher le contenu des variables
SELECT 
	@universId1 AS Univers1,
	@universId2 AS Univers2,
	@universId3 AS Univers3
	
--Afichage
--Univers1	Univers2	Univers3
--1			2			3
```

Donc pour faire l'insertion dans la table **Personnage**, la clé étrangère doit être la variable.

Voici un script complet avec la transaction.

```sql
EXEC initialiserBD;

SET XACT_ABORT ON
GO
BEGIN TRANSACTION
	--Insertion dans la table Univers
	DECLARE @universId1 INT
	DECLARE @universId2 INT	
	DECLARE @universId3 INT
	
	INSERT INTO Univers(Nom) VALUES('Marvel')
	SELECT @universId1 = SCOPE_IDENTITY()
	
	
	INSERT INTO Univers(Nom) VALUES('DC Comics')
	SELECT @universId2 = SCOPE_IDENTITY()
		
	
	INSERT INTO Univers(Nom) VALUES('Teenage mutant ninja turtles')
	SELECT @universId3 = SCOPE_IDENTITY()

	--Insertion dans la table Personnage	
	DECLARE @personnage1 INT
	DECLARE @personnage2 INT
	DECLARE @personnage3 INT
	DECLARE @personnage4 INT

	--Insertion pour Marvel - @universId1
	INSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Spiderman', 0, @universId1)
	SELECT @personnage1 = SCOPE_IDENTITY()
	
	INSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Ironman', 0, @universId1)
	SELECT @personnage2 = SCOPE_IDENTITY()

	--Insertion pour DC - @universId2
	INSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Batman', 0, @universId2) 
	SELECT @personnage3 = SCOPE_IDENTITY()

	--Insertion pour TMNT - @universId3
	INSERT INTO Personnage(Nom, EstVilain, UniversId) VALUES('Leonardo', 0, @universId3)
	SELECT @personnage4 = SCOPE_IDENTITY()

	-- Suite pour les autres tables...
COMMIT TRANSACTION
SET XACT_ABORT OFF
GO
```

Cette technique demande énormément de variables. 

## Utilisation de clé naturelle

Lorsque l'enregistrement a une clé naturelle, il est possible de récupérer la clé primaire par la clé naturelle.

Cette technique simplifie énormément les importations de données lorsque c'est possible.

Par exemple, nous avons une base de données avec une table **Pays** et **Ville**. 

```SQL
CREATE TABLE Pays
(
	PaysId INT NOT NULL CONSTRAINT PK_Pays PRIMARY KEY IDENTITY,
	Nom VARCHAR(100) NOT NULL,
	Code CHAR(2) NOT NULL CONSTRAINT UQ_Code UNIQUE CONSTRAINT CK_Code CHECK (LEN(Code) = 2)
);

CREATE TABLE Ville
(
	VilleId INT NOT NULL CONSTRAINT PK_Ville PRIMARY KEY IDENTITY,
	Nom VARCHAR(100) NOT NULL,
	PaysId INT NOT NULL CONSTRAINT FK_Ville_Pays FOREIGN KEY REFERENCES Pays(PaysId)
);
```

Créez les 3 pays ci-dessous.

```sql
INSERT INTO Pays(Nom, Code) 
VALUES
	('Canada', 'CA'),
	('France', 'FR'),
	('Italie', 'IT');
```

Il faut ajouter les villes suivantes.

- Drummondville dans le Canada
- Montréal dans le Canada
- Paris pour la France
- Rome pour l'Italie

Il est possible de faire l'insertion sans connaitre la clé primaire, car il y a une clé naturelle, soit le **code ISO** du pays.

Pour obtenir la clé primaire, il faut faire un **SELECT** **imbriqué** dans le **INSERTION**.

```sql
INSERT INTO Ville(Nom, PaysId) 
VALUES
	('Drummondville', (SELECT PaysId FROM Pays WHERE Pays.Code = 'CA')),
	('Montréal', (SELECT PaysId FROM Pays WHERE Pays.Code = 'CA')),
	('Paris', (SELECT PaysId FROM Pays WHERE Pays.Code = 'FR')),
	('Rome', (SELECT PaysId FROM Pays WHERE Pays.Code = 'IT'));
```

Par contre, il est assez rare d'avoir des clés naturelles dans toutes nos tables.

## INSERTION et OUTPUT

La technique du **INSERTION** et **OUTPUT** est similaire au **SCOPE_IDENTITY**. La clause **OUTPUT** permet de retourner la valeur des colonnes de l'enregistrement qui vient d'être inséré. Cette clause est très pratique pour récupérer une clé primaire généré automatiquement. L'équivalent en **PostGreSQL** et **MariaBD v10.5+** est la clause **RETURNING**.

Exécutez le script ci-dessous pour recréer les tables.

```sql
EXEC initialiserBD;
```

Il est possible d'enregistrer des valeurs d'une insertion dans une variable de type **TABLE**. Ce type est l'équivalent d'une collection d'une structure de données. Une variable de type **TABLE** existe uniquement dans le contexte d'exécution, mais il est possible de faire des **SELECT** avec des **WHERE**. 

Exécutez le script ci-dessous.

```sql
INSERT INTO Univers(Nom) 
VALUES('Teenage mutant ninja turtles'); -- UniversId = 1

DECLARE @tblUniversId TABLE(RowId INT IDENTITY, UniversId INT);

INSERT INTO Univers(Nom)
--highlight-next-line
OUTPUT INSERTED.UniversId INTO @tblUniversId
VALUES
	('Marvel'), --RowId = 1, UniversId = 2
	('DC Comics');		--RowId = 2, UniversId = 3

SELECT UniversId FROM @tblUniversId WHERE RowId = 1; -- Pour Marvel
SELECT UniversId FROM @tblUniversId WHERE RowId = 2; -- Pour DC
```

La ligne **OUTPUT INSERTED** permet de récupérer la valeur de tous les champs de l'enregistrement. La partie **INTO** permet d'enregistrer le contenu dans la variable de type **TABLE**. Le type **TABLE** est similaire à une structure de données.

La variable **@TblUniversId** contient 2 enregistrements.

```
RowId		UniversId
-----		---------
1			2
2			3
```

Pour récupérer la clé primaire, il faut faire un **SELECT** en fonction de son **RowId**.

Après chaque exécution, la variable de type **TABLE** est recréée et son **RowId** va recommencer à 1. Il est important d'exécuter tout le script en même temps et non section par section.

### Exemple

Réinitialisez la table et voici un exemple de script.

```sql
EXEC initialiserBD;

SET XACT_ABORT ON;
GO
BEGIN TRANSACTION;
	
    DECLARE @tblUniversId TABLE(RowId INT IDENTITY, UniversId INT);

    INSERT INTO Univers(Nom)
    OUTPUT INSERTED.UniversId INTO @tblUniversId
    VALUES
        ('Marvel'), --RowId sera 1
        ('DC Comics'); --Row Id sera 2

    DECLARE @tblPersonnageId TABLE(RowId INT IDENTITY, PersonnageId INT)

    INSERT INTO Personnage(Nom, EstVilain, UniversId)
    OUTPUT INSERTED.PersonnageId INTO @tblPersonnageId
    VALUES
        ('Spiderman', 0, (SELECT UniversId FROM @tblUniversId WHERE RowId = 1)), --Marvel
        ('Ironman', 0, (SELECT UniversId FROM @tblUniversId WHERE RowId = 1)), --Marvel
        ('Batman', 0, (SELECT UniversId FROM @tblUniversId WHERE RowId = 2)), --DC
        ('Superman', 0, (SELECT UniversId FROM @tblUniversId WHERE RowId = 2)); --DC

COMMIT TRANSACTION;
SET XACT_ABORT OFF;
GO
```

## Table temporaire

La technique de création par table temporaire consiste à enregistrer des clés **naturelles temporaires** en lien avec les clés primaires. La clé naturelle n'a pas réellement de signification, mais elle en aura une dans le script.

Pour être optimal, cette technique est un mixte des techniques ci-dessus. L'avantage d'avoir des procédures stockées, c'est qu'il est possible de les conserver dans la BD et de faire de nouvelles insertions à tout moment.

Il faut créer les tables temporaires, ensuite faire les procédures stockées d'insertions et les insertions par les procédures stockées.

Pour la procédure stockée, il est possible de faire l'insertion avec un **SCOPE IDENTITY** ou le **OUTPUT**.

:::info
Pour le TP 1, il est demandé d'utiliser le **OUTPUT**, donc nous allons faire les exemples avec le **OUTPUT**.
:::

Réinitialisez les tables.

```sql
EXEC initialiserBD;
```

Premièrement, il faut créer les procédures stockées pour les insertions.

La procédure stockée doit avoir en paramètre tous les champs de la table à l'exception de la clé primaire. Il faut ajouter un paramètre pour la clé naturelle temporaire qui servira de référence. 

```sql
--Procédure pour l'insertion d'un univers
IF OBJECT_ID('insererUnivers', 'P') IS NOT NULL 
	DROP PROCEDURE insererUnivers;
GO

CREATE PROCEDURE insererUnivers
	@nom NVARCHAR(100),
	@cleNatTemp VARCHAR(100) --Clé naturelle temporaire
AS
	SET NOCOUNT ON;
	--Vérifie si la table temporaire globale n'existe pas, il faut la créer
	IF OBJECT_ID('tempdb..##UniversCleNat') IS NULL 
		CREATE TABLE ##UniversCleNat 
		(
			UniversId INT NOT NULL UNIQUE, 
			CleNatTemp VARCHAR(100) NOT NULL UNIQUE
		);

	--Insertion dans la table
	INSERT INTO Univers(Nom)
	VALUES (@nom);

	--Insertion dans la table temporaire
	INSERT INTO ##UniversCleNat(UniversId, CleNatTemp) 
	VALUES
		(SCOPE_IDENTITY(), @cleNatTemp);
GO
```

Il est important d'utiliser des tables **temporaires globales** pour les procédures stockées, car une temporaire normale sera accessible uniquement dans l'exécution de la procédure.

La procédure effectue l'enregistrement dans la table, récupère la clé primaire et associe la clé primaire à la clé naturelle temporaire.

Pour la table **Personnage**, c'est un peu différent.

```sql
--Procédure pour l'insertion d'un personnage
IF OBJECT_ID('insererPersonnage', 'P') IS NOT NULL 
	DROP PROCEDURE insererPersonnage;
GO

CREATE PROCEDURE insererPersonnage
	@nom VARCHAR(100),
	@identiteReelle VARCHAR(100),
	@dateNaissance DATE,
	@estVilain BIT,
	@universIdCleNatTemp VARCHAR(100),
	@cleNatTemp VARCHAR(100)
AS
	SET NOCOUNT ON;
	--Vérifie si la table temporaire globale n'existe pas, il faut la créer
	IF OBJECT_ID('tempdb..##PersonnageCleNat') IS NULL 
		CREATE TABLE ##PersonnageCleNat 
		(
			PersonnageId INT NOT NULL UNIQUE, 
			CleNatTemp VARCHAR(100) NOT NULL UNIQUE
		);

	--Récupération de la clé UniversId à partir de la clé naturelle temporaire
	DECLARE @universId INT;
    -- highlight-start
	SET @universId = (SELECT ##UniversCleNat.UniversId 
					  FROM ##UniversCleNat 
					  WHERE ##UniversCleNat.CleNatTemp = @UniversIdCleNatTemp);
    -- highlight-end
	--Insertion dans la table	
	INSERT INTO Personnage(Nom, IdentiteReelle, DateNaissance, EstVilain, UniversId)	
	VALUES (@nom, @identiteReelle, @dateNaissance, @estVilain, @universId)

	--Insertion dans la table temporaire
	INSERT INTO ##PersonnageCleNat(PersonnageId, CleNatTemp) 
	VALUES
		(SCOPE_IDENTITY(), @cleNatTemp);

GO
```

L'enregistrement de la table **Personnage** a besoin de la clé étrangère de la table **Univers**. Il faut spécifier la clé **UniversId**. La clé sera récupérée par l'utilisation de la clé naturelle temporaire spécifiée lors de l'insertion des enregistrements de la table **Univers** (voir les lignes surlignées ci-haut).



Pour insérer un personnage, il faut appeler la procédure.

```sql
EXEC insererPersonnage 'Spiderman', 'Peter Parker', null, 0, 'MCU', 'P1';
--MCU est la clé naturelle temporaire pour Marvel
--P1 est la clé naturelle temporaire pour le personnage
```

Il est aussi important de supprimer les tables temporaires, car il ne faut pas avoir de vieilles références pour les clés naturelles. 

L'utilisation d'une procédure stockée est idéale, car il est plus facile de la réutiliser.

```sql
-- Procédure pour supprimer les tables temporaires
IF OBJECT_ID('nettoyageTableTemporaireInsertion', 'P') IS NOT NULL 
	DROP PROCEDURE nettoyageTableTemporaireInsertion;
GO

CREATE PROCEDURE nettoyageTableTemporaireInsertion
AS
	IF OBJECT_ID('tempdb..##UniversCleNat') IS NOT NULL 
		DROP TABLE ##UniversCleNat;
	IF OBJECT_ID('tempdb..##PersonnageCleNat') IS NOT NULL 
		DROP TABLE ##PersonnageCleNat;
GO
```

Pour faire l'insertion des données, il suffit d'appeler les procédures stockées.

```sql
SET XACT_ABORT ON;
GO
BEGIN TRANSACTION;
    --Nettoyage des tables temporaires pour les insertions
    EXEC nettoyageTableTemporaireInsertion

    --Insertion pour la table Univers
    EXEC insererUnivers 'Marvel', 'MCU';
    EXEC insererUnivers 'DC Comics', 'DC';
    EXEC insererUnivers 'Teenage mutant ninja turtles', 'TMNT';

    --Insertion pour la table Personnage
    --La clé étrangère est la clé naturelle temporaire spécifiée avant
    EXEC insererPersonnage 'Spiderman', 'Peter Parker', null, 0, 'MCU', 'P1';
    EXEC insererPersonnage 'Batman', 'Bruce Wayne', null, 0, 'DC', 'P2';
    EXEC insererPersonnage 'Leonardo', null, null, 0, 'TMNT', 'P3';
    EXEC insererPersonnage 'Joker', null, null, 1, 'DC', 'P4';

    --Nettoyage des tables temporaires pour les insertions pour ne pas les conserver en mémoire inutilement
    EXEC nettoyageTableTemporaireInsertion;

COMMIT TRANSACTION;
SET XACT_ABORT OFF;
GO
```

:::info
Ici la clé naturelle temporaire pour les personnages ne sert à rien. 
Mais il est facile d'imaginer qu'on voudrait associer des superpouvoirs aux  personnages. Dans ce cas, cette clé temporaire servirait. 
:::
## Considération

Pour chacune des techniques, il y a une considération à prendre en compte.

Ces techniques fonctionnent uniquement pour de nouvelles données.

Par exemple, s'il faut ajouter de nouveaux enregistrements dans la table **Personnage** pour des univers existants, il faut être en mesure de récupérer la clé étrangère existante. 

Si la clé est préalablement connue et fixe dans le temps, il est possible de l'ajouter directement dans l'insertion.





