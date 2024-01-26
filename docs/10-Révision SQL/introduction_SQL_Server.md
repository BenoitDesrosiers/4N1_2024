---
sidebar_position: 2
---

# Introduction à SQL Server

**Microsoft SQL Server** est un système de gestion de base de données relationnelle créé par **Microsoft**. Son utilisation est très similaire aux autres **SGBDR**.

La plupart des commandes présentées lors du cours de base de données **420-3N3-DM** sont fonctionnelles. 

Ce document présentera certaines différences par rapport à la BD utilisée précédemment et les nouvelles notions à apprendre.

# Nomenclature

Chaque cours utilise sa propre nomenclature. Il sera important de respecter la nomenclature de ce cours.

Chaque organisation utilise un standard dans leur nomenclature. Il existe des nomenclatures qui sont acceptées par la majorité de la communauté. Dans le cadre de ce cours, nous allons utiliser cette nomenclature.

## Table

Pour ce cours, le nom d'une table doit être au **singulier**. 

Le nom doit être en **PascalCase**

Pour les tables de relation plusieurs à plusieurs il peut avoir 2 situations.

- Il n'y a pas de nom significatif, nous utilisons le nom de toutes les tables. 
  - La relation entre les tables **Commande** et **Produit**. La table sera **CommandeProduit**.

- Le concept d'unification peut avoir un nom significatif, donc on l'utilise ce nom significatif.
  - La même relation entre les tables **Commande** et **Produit** pourrait s'appeler **CommandeDetail**.


## Colonne

Le nom d'une colonne doit être en **PascalCase**.

## Vue

Les vues doivent utiliser le préfixe **v**.

Exemple **vFacturationDetail**.

## Clé primaire

La clé primaire doit avoir le nom de la table et du suffixe **Id**. 

```sql
CREATE TABLE Client
(
	ClientId INT NOT NULL PRIMARY KEY
);
```

## Type de données

Les types de données utilisés par SQL Server sont similaires à MariaDB ou PostGres. Par contre. il existe quelques différences.

Pour accéder au document de références sur le site **Learn** de Microsoft : 

https://learn.microsoft.com/fr-ca/sql/t-sql/data-types/data-types-transact-sql?view=sql-server-ver15

### Entier

**SQL Server** utilise 4 types de données pour les nombres entiers. Le plus utilisé pour les clés primaires est le type **INT**.

| Type     | Plage                                                  | Taille   |
| -------- | ------------------------------------------------------ | -------- |
| TINYINT  | 0 à 255                                                | 1 octet  |
| SMALLINT | -32 768 à 32 767                                       | 2 octets |
| INT      | -2 147 483 648 à 2 147 483 647                         | 4 octets |
| BIGINT   | -9 223 372 036 854 775 808 à 9 223 372 036 854 775 807 | 8 octets |

Pour plus d'information : https://learn.microsoft.com/fr-ca/sql/t-sql/data-types/int-bigint-smallint-and-tinyint-transact-sql?view=sql-server-ver15

### Chaine de caractères

Il existe plusieurs types de chaine de caractères.

**CHAR(n)** et **VARCHAR(n)**. Le caractère est encodé en utilisant 1 octet. La valeur **n** désigne la longueur de la chaine de caractères (entre 1 et 8000). 

**NCHAR(n)** et **NVARCHAR(n)**.  Le caractère est encodé en utilisant 2 octets (parfois 4). Le préfixe **N** est pour Unicode. La valeur **n** désigne la longueur de la chaine de caractères (entre 1 et 4000). 

**CHAR** et **NCHAR** ont une longueur fixe. Donc un **CHAR(25)** utilisera toujours 25 caractères en mémoire.

**VARCHAR** et **NVARCHAR** ont une longueur variable. SQL Server utilisera le minimum d’espace + 2 octets.

**Microsoft** ne recommande plus l'utilisation des types **TEXT** et **NTEXT**. Pour utiliser leur équivalent, il faut utiliser un **VARCHAR(MAX)** ou **NVARCHAR(MAX)**. L'espace maximum utilisable pour le stockage des caractères sera de 2 Go.

Pour plus d'information : https://learn.microsoft.com/fr-ca/sql/t-sql/data-types/char-and-varchar-transact-sql?view=sql-server-ver15

### Date et temps

Le format **DATETIME** est le plus populaire, car il était le type de base avant 2008 avec le **SMALLDATETIME**. Par la suite, il y a eu d'autres types pour gérer les dates et le temps.

Le format **DATETIME** et **SMALLDATETIME** contiennent la date et l'heure. Ce type devrait uniquement utiliser lorsque les 2 concepts doivent être regroupés ensemble, comme pour la création d'un élément. 

Le **DATETIME** peut avoir des valeurs entre 1753-01-01 à 9999-12-31 et a une précision de 0,00333 seconde.

Le **SMALLDATETIME** peut avoir des valeurs entre 1900-01-01 à 2079-06-06 et à une précision à la minute. 

Le **DATETIME2** peut avoir des valeurs entre 0001-01-01 à 9999-12-31 et à une précision à la minute. Il a comme précision jusqu'à 100 nanosecondes.

Le format **DATE** contient uniquement la date. Il peut contenir des dates entre 0001-01-01 et 9999-12-31.

Le format **TIME** contient uniquement l'heure. Il a comme précision jusqu'à 100 nanosecondes. Il peut contenir l'heure entre 00:00:00.0000000 et 23:59:59.9999999.

Le **DATETIMEOFFSET** est comme le **DATETIME2**, mais il inclut l'information du fuseau horaire en UTC.

Plus le type est précis ou contient une plage plus variée, il demande plus d'espace dans la base de données.

Pour plus d'information : https://docs.microsoft.com/fr-ca/sql/t-sql/functions/date-and-time-data-types-and-functions-transact-sql?redirectedfrom=MSDN&view=sql-server-ver15

**SQL Server** n'offre pas directement des champs de type **TIMESTAMP** pour enregistrer des moments sur des actions de la table. Il est possible de simuler le comportement similaire à MariaDB pour la modification avec des **triggers**. L'approche **MariaDB** est plus conviviale. Dans ce cours, ce comportement sera géré avec **Entity Framework** et non en pur **SQL**.

### Nombre numérique avec précision

Le type **DECIMAL** permet d'enregistrer avec précision un chiffre avec une virgule.

Sa syntaxe de déclaration est particulière, car il faut indiquer sa longueur et sa précision.

Par exemple **DECIMAL(4,2)** indique qu'il peut avoir 4 chiffres au total avec 2 décimales. Donc, il peut contenir une valeur entre -99,99 et 99,99.

Si nous ajoutons une plus grande précision lors de l'insertion, exemple **99.986**, SQL Server fera un arrondi, donc **99.99**.

Et **99.085** retournera **99.08**.


Essayez pour la valeur **99.996**. Le système vous retourne une erreur, car l'arrondi correspond à **100.00** et la valeur n'est plus dans la plage permise.

```sql
CREATE TABLE TestDecimal
(
	Valeur DECIMAL(4,2)
);

INSERT INTO TestDecimal(Valeur) VALUES (99.986); -- Valeur enregistrée : 99.99

INSERT INTO TestDecimal(Valeur) VALUES (99.996) -- Erreur, car SQL essaie d'enregistrer 100.00
```

## Commandes de base

### CREATE DATABASE

Voici la syntaxe de création d'une base de données.

```sql
CREATE DATABASE Demo4N1;
```

### DROP DATABASE

Voici la syntaxe de destruction d'une base de données.

```sql
DROP DATABASE Demo4N1;
```

### USE

La commande **USE** permet de sélectionner une base de données par programmation. Donc, si vous êtes dans une autre base de données dans la barre d'outils, il est possible de changer la base de données au préalable dans votre script. 

La majorité des scripts débute par le **USE** pour s'assurer que l'exécution se fait au bon endroit.

```sql
USE Demo4N1;
GO
```

### CREATE TABLE

Voici la syntaxe pour la création d'une table.

```sql
CREATE TABLE MaTable
(
	MaTableId INT NOT NULL PRIMARY KEY IDENTITY,
	Description VARCHAR(30) NOT NULL,
    Detail VARCHAR(500) NOT NULL,
);
```

### DROP TABLE

Voici la syntaxe pour la destruction d'une table.

```sql
DROP TABLE MaTable;
```

### NOT NULL et NULL

Par défaut, si aucune spécification n'est indiquée, le champ sera considéré comme optionnel ou pouvant contenir la valeur **NULL**.

Pour s'assurer qu'une valeur soit entrer dans une colonne, il faut indiquer **NOT NULL**
```sql
CREATE TABLE MaTable
(
	MaTableId INT NOT NULL PRIMARY KEY IDENTITY, --Champ obligatoire
	Description VARCHAR(30) NULL, --Champ optionnel
	Detail VARCHAR(500), --Champ optionnel
);
```

Par convention, il est préférable d'être constant pour la déclaration des champs optionnels. 

### IDENTITY

Pour avoir un identifiant qui s'autoincrémente, il faut lui donner l'attribut **IDENTITY**

Voici un script de création d'une table.

```sql
CREATE TABLE Client
(
	ClientId INT NOT NULL PRIMARY KEY IDENTITY,
	Nom VARCHAR(100) NOT NULL
);
```

La clé primaire a le mot clé **IDENTITY** qui indique que la clé de la table sera auto incrémentée. Il s'agit donc d'une clé artificielle.

Par défaut, l'incrémentation débute à 1 et augmente de 1.

Il est possible de modifier la valeur de départ et l'augmentation par cette syntaxe.

```sql
IDENTITY(départ, incrément)
```

Donc pour la table ci-dessous, la clé débutera à 1000 et la suivante sera 1005

```sql
CREATE TABLE Client
(
	ClientId INT NOT NULL PRIMARY KEY IDENTITY(1000,5),
	Nom VARCHAR(100) NOT NULL
);
```

La propriété **IDENTITY** est généralement utilisée avec une clé primaire, mais elle peut être utilisée pour un champ qui n'est pas une clé. Il est important de ne pas oublier la contrainte de clé primaire. Par contre, il peut avoir uniquement un champ **IDENTITY**.

### Concaténation de string  +

**SQL Server** utilise le symbole **+** pour faire la concaténation de chaine de caractères.

```sql
SELECT 
	Description + ': ' + Detail
FROM MaTable;
```

### Commentaires

Le **--** est pour une seule ligne.

Le **/*** et ***/** est pour un bloc de commentaires.

```sql
--Mon commentaire sur une seule ligne

/*
Un bloc de commentaire
2e ligne...
*/
```

## Contraintes

Pour faciliter la gestion, il est fortement recommandé de nommer les contraintes en **SQL Server**. Il est possible de modifier le comportement d'une contrainte sans recréer une table en utilisant son nom.

Si aucun nom n'est spécifié, **SQL Server** génère automatiquement un nom, mais il n'aura aucune signification.

### Clé primaire

Le nom de la contrainte doit utiliser le préfixe **PK_** et le nom de la table.

**PK_Table**

Voici un exemple.

```sql
CREATE TABLE Client
(
	ClientId INT NOT NULL CONSTRAINT PK_Client PRIMARY KEY IDENTITY
);
```

### Clé étrangère

Le champ de la clé étrangère doit avoir le même nom que celle utilisée dans la table parent.

Le nom de la contrainte doit utiliser le préfixe **FK_**, le nom de la table,  une barre, le nom du champ.

**FK_TableEnfant_Champ**

Ici, le client appartient à une compagnie.

Avec **SQL Server**, il est possible de mettre la contrainte directement sur la déclaration de la colonne.

```sql
CREATE TABLE Client
(
	ClientId INT NOT NULL CONSTRAINT PK_Client PRIMARY KEY,
	CompagnieId INT NOT NULL 
    	CONSTRAINT FK_Client_CompagnieId FOREIGN KEY REFERENCES Compagnie(CompagnieId)
    		ON DELETE NO ACTION	
    		ON UPDATE CASCADE,
    EstValide BIT NOT NULL
);
```

Il est également possible de faire la déclaration en fin de table.

```sql
CREATE TABLE Client
(
	ClientId INT NOT NULL CONSTRAINT PK_Client PRIMARY KEY,
	CompagnieId INT NOT NULL,     	
    EstValide BIT NOT NULL,
    CONSTRAINT FK_Client_CompagnieId FOREIGN KEY(CompagnieId) REFERENCES Compagnie(CompagnieId)
    	ON DELETE NO ACTION 
    	ON UPDATE CASCADE
);
```

Le comportement des actions par défaut est **NO ACTION** s'il n'est pas spécifié.

### Table pivot - Clé primaire composée avec clé étrangère

Lorsqu'on a une relation n-m il faut utiliser une table pivot qui entreposera la clé des 2 tables. 

Par exemple, si nous avons un table contenant les produits, et une contenant les commandes, il est possible d'avoir plusieurs produits sur une commande et qu'un produit se retrouve sur plusieurs commandes. 

L'approche recommandée pour la table pivot est celle-ci :

```sql
CREATE TABLE CommandeProduit
(
	CommandeId INT NOT NULL CONSTRAINT FK_CommandeProduit_CommandeId 
		FOREIGN KEY REFERENCES Commande(CommandeId),
    		ON DELETE NO ACTION	
    		ON UPDATE CASCADE
	ProduitId INT NOT NULL CONSTRAINT FK_CommandeProduit_ProduitId FOREIGN 
		KEY REFERENCES Produit(ProduitId),
       		ON DELETE NO ACTION	
    		ON UPDATE CASCADE
	--highlight-next-line
    CONSTRAINT PK_CommandeProduit PRIMARY KEY(ComandeId, ProduitId)
);
```

Notez la contrainte de clé primaire à la fin. 

### Contrainte de vérification 

La contrainte de vérification est d'accepter uniquement des valeurs précises pour une colonne. Il s'agit d'un **CHECK**.

Le nom de la contrainte doit utiliser le préfixe **CK_** , le nom de la table, une barre et le nom du champ.

**CK_Table_Champ**

Voici un exemple.

```sql
CREATE TABLE Client
(
	ClientId INT NOT NULL CONSTRAINT PK_Client PRIMARY KEY,
	CompagnieId INT NOT NULL CONSTRAINT FK_Client_CompagnieId FOREIGN KEY REFERENCES Compagnie(CompagnieId)
    	ON DELETE NO ACTION	
    	ON UPDATE CASCADE,
			--highlight-next-line
	Type CHAR(1) NOT NULL CONSTRAINT CK_Client_Type CHECK(Type IN ('A', 'D', 'X'))
);
```

### Valeur par défaut

Le nom de la contrainte doit utiliser le préfixe **DF_**,  le nom de la table, une barre et le nom du champ.

**DF_Table_Champ**

Voici un exemple.

```sql
CREATE TABLE Client
(
	ClientId INT NOT NULL CONSTRAINT PK_Client PRIMARY KEY,
	CompagnieId INT NOT NULL CONSTRAINT FK_Client_CompagnieId FOREIGN KEY REFERENCES Compagnie(CompagnieId)
    	ON DELETE NO ACTION	
    	ON UPDATE CASCADE,
			--highlight-next-line
	DateCreation DATETIME NOT NULL CONSTRAINT DF_Client_DateCreation DEFAULT GetDate(),
		--highlight-next-line
	EstActif BIT NOT NULL CONSTRAINT DF_Client_EstActif DEFAULT 1
);
```

### Contrainte d'unicité

Le nom de la contrainte doit utiliser le préfixe **UQ_**,  le nom de la table, une barre et le nom du champ.

**UQ_Table_Champ**

```sql
CREATE TABLE Client
(
	ClientId INT NOT NULL CONSTRAINT PK_Client PRIMARY KEY,
	CompagnieId INT NOT NULL CONSTRAINT FK_Client_CompagnieId FOREIGN KEY REFERENCES Compagnie(CompagnieId)
    	ON DELETE NO ACTION	
    	ON UPDATE CASCADE,
	Type VARCHAR(1) CONSTRAINT CK_Client_Type CHECK(Type IN ('A', 'D', 'X')),
	Actif BIT NOT NULL CONSTRAINT DF_Client_Actif DEFAULT 1,
		--highlight-next-line
	Code VARCHAR(10) NOT NULL CONSTRAINT UQ_Client_Code UNIQUE
);
```

## ALTER TABLE

Il est possible de modifier une table une fois qu'elle a été créée. Pour ce faire, on utilise la commande **ALTER TABLE**. 

On ne peut pas directement modifier une contrainte, il faut premièrement l'enlever à l'aide de **DROP CONSTRAINT** , et ensuite ajouter la contrainte redéfinie à l'aide de **ADD CONSTRAINT**. 

Pour les tables ci-dessous, voici quelques exemples de modification.

```sql
CREATE TABLE Compagnie
(
	CompagnieId INT NOT NULL CONSTRAINT PK_Compagnie PRIMARY KEY IDENTITY,
	Nom VARCHAR(50) NOT NULL
);

CREATE TABLE Client
(
	ClientId INT NOT NULL CONSTRAINT PK_Client PRIMARY KEY,
	CompagnieId INT NOT NULL CONSTRAINT FK_Client_CompagnieId FOREIGN KEY REFERENCES Compagnie(CompagnieId)
    	ON DELETE NO ACTION	
    	ON UPDATE CASCADE,
	Type VARCHAR(1) CONSTRAINT CK_Client_Type CHECK(Type IN ('A', 'D', 'X')),
	Actif BIT NOT NULL CONSTRAINT DF_Client_Actif DEFAULT 1,
	Code VARCHAR(10) NOT NULL CONSTRAINT UQ_Client_Code UNIQUE
);
```

### Clé étrangère

Pour modifier les actions d'une clé étrangère il faut commencer par l'enlever et ensuite en créer une nouvelle selon nos besoin

Ici on change **ON DELETE NO ACTION ON UPDATE CASCADE** par  **ON DELETE CASCADE ON UPDATE CASCADE**
```sql
ALTER TABLE Client
DROP CONSTRAINT FK_Client_CompagnieId;

ALTER TABLE Client
ADD CONSTRAINT FK_Client_CompagnieId FOREIGN KEY(CompagnieId) REFERENCES Compagnie(CompagnieId) 
	ON DELETE CASCADE ON UPDATE CASCADE;
```

### Contrainte de vérification

Pour ajouter une contrainte, il faut commencer par l'enlever et ensuite en créer une nouvelle selon nos besoins. 

Ici on ajoute **Z**

```sql
ALTER TABLE Client
DROP CONSTRAINT CK_Client_Type;

ALTER TABLE Client
ADD CONSTRAINT CK_Client_Type CHECK(Type IN ('A', 'D', 'X', 'Z'));
```

## T-SQL

Le langage de requêtes pour accéder à **SQL Server** s’appelle **T-SQL**, ou encore **Transact-SQL**. **T-SQL** est une extension du langage SQL.

C'est-à-dire que les commandes SQL sont pratiquement identiques, mais il y a des ajouts pour faire de la programmation procédurale.

Comme pour le SQL, le **T-SQL** n'est pas sensible à la casse.

Pour plus d'information : https://en.wikipedia.org/wiki/Transact-SQL

### DB_ID()

:::info
**SQL Server** n'utilise pas le **IF EXISTS** et le **IF NOT EXISTS** comme avec **SQLite** et **MariaDB**.
:::

Pour vérifier l'existence d'une base de données, il faut utiliser la fonction **DB_ID(nombd)**.

```sql
--Vérifie si la base de données est inexistante dans le SGBD
IF DB_ID('Demo4N1') IS NULL 
	CREATE DATABASE Demo4N1;

--Vérifie si la base de données existe dans le SGBD
IF DB_ID('Demo4N1') IS NOT NULL 
	DROP DATABASE Demo4N1;
```

### OBJECT_ID()

:::info
**SQL Server** n'utilise pas le **IF EXISTS** et le **IF NOT EXISTS** comme avec **SQLite** et **MariaDB**.
:::

Il faut utiliser la fonction **OBJECT_ID(nom, type)** pour déterminer l'existence ou non d'un élément dans une base de données. Il faut spécifier le nom de l'élément et ensuite son type.

Voici la liste des types.

- **AF** = Fonction d'agrégation (CLR)
- **C** = contrainte CHECK
- **D** = DEFAULT (contrainte ou autonome)
- **F** = Contrainte FOREIGN KEY
- **FN** = Fonction scalaire SQL
- **FS** = Fonction scalaire d'assembly (CLR)
- **FT** = Fonction table d'assembly (CLR)
- **IF** = Fonction table en ligne SQL
- **IT** = Table interne
- **P** = Procédure stockée SQL
- **PC** = Assembly (CLR) procédure stockée
- **PG** = Repère de plan
- **PK** = Contrainte PRIMARY KEY
- **R** = Règle (ancienne, autonome)
- **RF** = Procédure de filtre de réplication
- **S** = Table de base système
- **SN** = Synonyme
- **SO** = Objet séquence
- **U** = Table (définie par l'utilisateur)
- **V** = Vue

Pour les tables, il faut utiliser le type **U**.

```sql
--Vérifie si la table est inexistante dans la base de données 
--Le type U est pour User Table
IF OBJECT_ID('Matable', 'U') IS NULL 
	CREATE TABLE MaTable
	(
		MaTableId INT NOT NULL PRIMARY KEY IDENTITY,
		Description VARCHAR(30) NOT NULL,
		Detail VARCHAR(500) NOT NULL,
	);
	
--Vérifie si la table existe dans la base de données
IF OBJECT_ID('Matable', 'U') IS NOT NULL 
	DROP TABLE MaTable;
```

## GO

La commande **GO** permet d'exécuter tout le code au-dessus en lot.

Lorsqu'on veut séparer un script en plusieurs lots d'exécution, on met un **GO** après chacune des sections.

Certaines commandes, comme un **CREATE VIEW** doit être obligatoirement en début de lot.

```sql
CREATE TABLE Produit
(
	ProduitId INT NOT NULL PRIMARY KEY IDENTITY,
	Nom VARCHAR(500) NOT NULL
);

CREATE VIEW ListeProduit 
AS
SELECT * FROM Produit;

--Message d'erreur
--Msg 111, Niveau 15, État 1, Ligne 8
--'CREATE VIEW' must be the first statement in a query batch.
```

Malgré l'erreur, la table **Produit** a été créée. L'erreur s'applique uniquement à la vue.

Il n'est pas possible d'inverser les commandes, car il faut que la table existe pour créer la vue. L'utilisation du **GO** permet de corriger le problème.

```sql
CREATE TABLE Produit
(
	ProduitId INT NOT NULL PRIMARY KEY IDENTITY,
	Nom VARCHAR(500) NOT NULL
);
GO
CREATE VIEW ListeProduit 
AS
SELECT * FROM Produit;
GO
```

## sp_help

La commande **sp_help** permet de générer un rapport détaillé sur un objet de la base de données. C'est très pratique pour avoir le détail d'une table par exemple. Il est possible d'avoir cette information en utilisant l'explorateur d'objets. 

La syntaxe est **sp_help 'nom de l'objet'**

Pour avoir accès à l'information de la table **Person.Person** dans la base de données **AdventureWorks**

```sql
sp_help 'Person.Person'
```

Voici le résultat.

<img src="/4N1_2024/img/sp_help_result_1.jpg" alt="sp_help_result_1" />

    

En sélectionnant du texte et en effectuant le raccourci **ALT+F1**, la commande **sp_help** s'effectuera sur le texte sélectionné.

## Variable

Il est possible d'utiliser des variables pour faire des scripts plus complexes.

Le nom de la variable débute toujours par un **@**. Par convention, le nom de la variable est en **camelCase**.

Il faut utiliser la clause **DECLARE @nomVar TYPE** pour la créer.

```sql
DECLARE @nom VARCHAR(10); --Déclaration sans assignation de valeur
DECLARE @prenom NVARCHAR(10) = 'François'; --Déclaration avec assignation de valeur
```

La clause **SET** permet d'assigner une valeur à la variable après sa déclaration

```sql
SET @nom = 'St-Hilaire';
```

Pour afficher une variable, il faut utiliser un **SELECT**.

```sql
SELECT @da;
```

## Exemple de script complexe

Voici un exemple de script qui permet de créer les utilisateurs et une base de données **AdventureWork2019** pour une liste d'étudiant.

```sql
USE EtudiantBD2
GO

DECLARE @da NVARCHAR(10);
DECLARE @nom NVARCHAR(50);
DECLARE @traite INT;
DECLARE @etudiant CURSOR;
DECLARE @sqlstmt NVARCHAR(1000);
DECLARE @sqlstmt_use NVARCHAR(1000);
 
SET @etudiant = CURSOR FOR
	SELECT da,nom,traite
	FROM dbo.Etudiant WHERE Traite = 0;

OPEN @etudiant
FETCH NEXT
FROM @etudiant INTO @da, @nom, @traite

WHILE @@FETCH_STATUS = 0
BEGIN
  IF(@traite = 0) 
  BEGIN
	  print @da+'  '+ @nom

	  print 'Copie de la bd'
	  SET @sqlstmt = 'RESTORE DATABASE [e' + @da + '_AdventureWorks2019] ';
	  SET @sqlstmt = @sqlstmt + 'FROM  DISK = N''/var/opt/mssql/backups/AdventureWorks2019.bak''';
	  SET @sqlstmt = @sqlstmt + 'WITH  FILE = 1,'; 
	  SET @sqlstmt = @sqlstmt + 'MOVE N''AdventureWorks2017'' TO N''/var/opt/mssql/data/e' + @da + '_AdventureWorks2019_Data.mdf'',';  
	  SET @sqlstmt = @sqlstmt + 'MOVE N''AdventureWorks2017_log'' TO N''/var/opt/mssql/data/e' + @da + '_AdventureWorks2019_Log.ldf'',';
	  SET @sqlstmt = @sqlstmt + 'NOUNLOAD,  STATS = 5';
	  print @sqlstmt;
	  exec(@sqlstmt);

	  print 'Création de l''usager'
	  SET @sqlstmt_use = 'USE [e' + @da + '_AdventureWorks2019];'

	  SET @sqlstmt = @sqlstmt_use + 'CREATE LOGIN [e' + @da + '] WITH PASSWORD=N''usager@db2'' MUST_CHANGE, DEFAULT_DATABASE=[e' + @da + '_AdventureWorks2019], CHECK_EXPIRATION=ON, CHECK_POLICY=ON;'

	  SET @sqlstmt = @sqlstmt +'CREATE USER [e'+ @da +'] FOR LOGIN [e' + @da + '];'
	  SET @sqlstmt = @sqlstmt +'ALTER ROLE [db_owner] ADD MEMBER [e' + @da + '];'

	  SET @sqlstmt = @sqlstmt +'ALTER SERVER ROLE [dbcreator] ADD MEMBER [e' + @da +'];' /* l'étudiant pourra créer des BDs.*/
	  exec(@sqlstmt);
	  
	  UPDATE Etudiant SET traite = 1 WHERE DA = @da;
  END
  FETCH NEXT 
  FROM @etudiant INTO @da, @nom, @traite
END

CLOSE @etudiant
DEALLOCATE @etudiant
```

