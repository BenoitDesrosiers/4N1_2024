---
sidebar_position: 3
---

# Exercices de création BD - Univers

Pour ces exercices, vous pouvez utiliser SSMS

## Exercice 1

Créez la base de données **e*DA*_BDExercice** dans le **SQL Server Express** de **votre ordinateur** .

N'oubliez pas d'inclure la vérification si la base de données existe avant la création.

Créez les 4 tables ci-dessous. Veuillez mettre la vérification si la table n'existe pas avant de créer la table.

<img src="/4N1_2024/img/02_DEA_SuperHeros.jpg"  />



Pour la table **Film**, le champ **Etoile** a une contrainte. Le champ accepte uniquement les valeurs de 1 à 5.

<details>
  <summary>Solution</summary>

```sql

IF DB_ID('e1234_BDExercice') IS NULL
	CREATE DATABASE e1234_BDExercice;
GO

USE e1234_BDExercice;
GO

IF OBJECT_ID('Univers', 'U') IS NULL
	CREATE TABLE Univers
	(
		UniversId INT NOT NULL CONSTRAINT PK_Univers PRIMARY KEY,
		Nom VARCHAR(100) NOT NULL,
		AnneeCreation SMALLINT NOT NULL,
		SiteWeb VARCHAR(2000) NOT NULL,
		Proprietaire VARCHAR(250) NOT NULL
	);

IF OBJECT_ID('Film', 'U') IS NULL
	CREATE TABLE Film
	(
		FilmId INT NOT NULL CONSTRAINT PK_Film PRIMARY KEY,
		Titre VARCHAR(100) NOT NULL,
		DateSortie DATE NOT NULL,
		Etoile TINYINT NOT NULL CONSTRAINT CK_Film_Etoile CHECK(Etoile >= 1 AND Etoile <= 5),
		Duree SMALLINT NOT NULL
	);

IF OBJECT_ID('Personnage', 'U') IS NULL
	CREATE TABLE Personnage
	(
		PersonnageId INT NOT NULL CONSTRAINT PK_Personnage PRIMARY KEY,
		Nom VARCHAR(100) NOT NULL,
		IdentiteReelle VARCHAR(100) NULL,
		DateNaissance DATE NULL,
		EstVilain BIT NOT NULL,
		UniversId INT NOT NULL CONSTRAINT FK_Personnage_UniversId FOREIGN KEY REFERENCES Univers(UniversId)
			ON DELETE NO ACTION
			ON UPDATE CASCADE
	);

IF OBJECT_ID('Distribution', 'U') IS NULL
	CREATE TABLE [Distribution]
	(
		PersonnageId INT NOT NULL CONSTRAINT FK_Distribution_PersonnageId FOREIGN KEY REFERENCES Personnage(PersonnageId)
			ON DELETE NO ACTION
			ON UPDATE CASCADE,
		FilmId INT NOT NULL CONSTRAINT FK_Distribution_FilmId FOREIGN KEY REFERENCES Film(FilmId)
			ON DELETE NO ACTION
			ON UPDATE CASCADE,
		Acteur VARCHAR(100) NOT NULL,
		CONSTRAINT PK_Distribution PRIMARY KEY (PersonnageId, FilmId)
	);
GO
```

</details>


## Exercice 2

Faites le script d'insertion pour les données ci-dessous. Pour la clé étrangère, vous devez mettre la clé dans votre script en fonction de la valeur.

**Table Univers**

| UniversId | Nom       | AnneCreation | SiteWeb                | Proprietaire |
|-----------|-----------|--------------|------------------------|--------------|
| 1         | Marvel    | 1939         | https://www.marvel.com | Disney       |
| 2         | DC Comics | 1934         | https://www.dc.com     | Warner Bros  |
|           |           |              |                        |              |


**Table Personnage**
| PersonnageId 	| Nom         	| IdentiteReelle    	| DateNaissance 	| EstVilain 	| Univers 	|
|--------------	|-------------	|-------------------	|---------------	|-----------	|---------	|
| 1            	| Spiderman   	| Peter Parker      	| null          	| 0         	| Marvel  	|
| 2            	| Iron Man    	| Tony Stark        	| 1970-11-12    	| 0         	| Marvel  	|
| 3            	| Batman      	| Bruce Wayne       	| 1966-03-04    	| 0         	| DC      	|
| 4            	| Joker       	| null              	| null          	| 1         	| DC      	|
| 5            	| Thor        	| Thor              	| null          	| 0         	| Marvel  	|
| 6            	| Black Widow 	| Nathasha Romanoff 	| 1985-08-31    	| 0         	| Marvel  	|

**Table Film**
| FilmId 	| Titre              	| DateSortie 	| Etoile 	| Duree 	|
|--------	|--------------------	|------------	|--------	|-------	|
| 1      	| Black Widow        	| 2021-07-09 	| 3      	| 121   	|
| 2      	| The Avengers       	| 2012-05-04 	| 5      	| 98    	|
| 3      	| Spiderman          	| 2003-05-03 	| 5      	| 110   	|
| 4      	| The Dark Knight    	| 2008-07-18 	| 5      	| 142   	|
| 5      	| Avengers : Endgame 	| 2019-04-26 	| 4      	| 132   	|
| 6      	| Iron Man           	| 2008-05-02 	| 4      	| 96    	|
| 7      	| Joker              	| 2019-10-04 	| 4      	| 99    	|


**Table Distribution**
| Personnage  	| Film               	| Acteur             	|
|-------------	|--------------------	|--------------------	|
| Spiderman   	| Spiderman          	| Tobey Maguire      	|
| Spiderman   	| Avengers : Endgame 	| Tom Holland        	|
| Iron Man    	| Iron Man           	| Robert Downey Jr   	|
| Iron Man    	| The Avengers       	| Robert Downey Jr   	|
| Iron Man    	| Avengers : Endgame 	| Robert Downey Jr   	|
| Batman      	| The Dark Knight    	| Christian Bale     	|
| Joker       	| The Dark Knight    	| Heath Ledger       	|
| Joker       	| Joker              	| Joaquin Phoenix    	|
| Thor        	| The Avengers       	| Chris Hemsworth    	|
| Thor        	| Avengers : Endgame 	| Chris Hemsworth    	|
| Black Widow 	| The Avengers       	| Scarlett Johansson 	|
| Black Widow 	| Avengers : Endgame 	| Scarlett Johansson 	|
| Black Widow 	| Black Widow        	| Scarlett Johansson 	|



<details>
  <summary>Solution</summary>

```sql
USE e1234_BDExercice;
GO

INSERT INTO Univers(UniversId, Nom, AnneeCreation, SiteWeb, Proprietaire) 
VALUES				
	(1, 'Marvel', 1939, 'https://www.marvel.com', 'Disney'),
	(2, 'DC Comics', 1934, 'https://dc.com', 'Warner Bros');
GO

INSERT INTO Personnage(PersonnageId, Nom, IdentiteReelle, DateNaissance, EstVilain, UniversId)
VALUES
	(1, 'Spiderman', 'Peter Parker', null, 0, 1),
	(2, 'Iron Man', 'Tony Stark', '1970-11-12',0, 1),
	(3, 'Batman', 'Bruce Wayne', '1966-03-04', 0, 2),
	(4, 'Joker', null, null, 0, 2),
	(5, 'Thor', 'Thor', null, 0, 1),
	(6, 'Black Widow', 'Nathasha Romanoff', '1985-08-31', 0, 1);
GO

INSERT INTO Film(FilmId, Titre, DateSortie, Etoile, Duree)
VALUES
	(1,'Black Widow', '2021-07-09', 3, 121),
	(2,'The Avengers', '2012-05-04', 5, 98),
	(3,'Spideman', '2003-05-03', 5, 110),
	(4,'The Dark Knight', '2008-07-18', 5, 142),
	(5,'Avengers : Endgames', '2019-04-26', 4, 132),
	(6,'Iron Man', '2008-05-02', 4, 96),
	(7,'Joker', '2019-10-04', 4, 99)
GO

INSERT INTO [Distribution](PersonnageId, FilmId, Acteur)
VALUES
	(1,3,'Tobey Maguire'),
	(1,5,'Tom Holland'),
	(2,6,'Robert Downey Jr'),
	(2,2,'Robert Downey Jr'),
	(2,5,'Robert Downey Jr'),
	(3,4,'Christian Bale'),
	(4,4,'Heath Ledger'),
	(4,7,'Joaquin Phoenix'),
	(5,2,'Chris Hemsworth'),
	(5,5,'Chris Hemsworth'),
	(6,2,'Scarlett Johansson'),
	(6,5,'Scarlett Johansson'),
	(6,1,'Scarlett Johansson')
GO
```

</details>
  
## Exercice 3

Effectuez une requête pour afficher les champs suivant :

- Univers.Nom alias UniversNom
- Film.Titre alias FilmTitre
- Film.DateSortie
- Personnage.Nom alias PersonnageNom
- Distribution.Acteur

Effectuez le tri par :

- Univers.Nom
- Film.DateSortie
- Film.Titre
- Personnage.Nom

<details>
  <summary>Solution</summary>

```sql

USE e1234_BDExercice;
GO

SELECT
	Univers.Nom AS UniversNom,
	Film.Titre AS FilmTitre,
	Film.DateSortie,
	Personnage.Nom AS PersonnageNom,	
	[Distribution].Acteur	
FROM [Distribution]
INNER JOIN Personnage ON [Distribution].PersonnageId = Personnage.PersonnageId
INNER JOIN Univers ON Personnage.UniversId = Univers.UniversId
INNER JOIN Film ON [Distribution].FilmId = Film.FilmId
ORDER BY
	Univers.Nom,
	Film.DateSortie,
	Film.Titre,
	Personnage.Nom,
	[Distribution].Acteur

```

</details>

## Exercice 4

Modifiez la contrainte du champ **Etoile** de la table **Film** pour accepter une valeur entre 1 et 10 inclusivement.

<details>
  <summary>Solution</summary>

  ```sql
  USE e1234_BDExercice;
ALTER TABLE Film
DROP CONSTRAINT CK_Film_Etoile

ALTER TABLE Film
ADD CONSTRAINT CK_Film_Etoile CHECK(Etoile >= 1 AND Etoile <= 10)
```

</details>

## Exercice 5

Effectuez une sauvegarde de votre base de données. Assurez-vous d'avoir le dossier **C:\Backup** dans votre ordinateur.


<details>
  <summary>Solution</summary>

```sql
USE e1234_BDExercice;
GO

DECLARE @nomBD NVARCHAR(256) -- Nom base de donn�es
DECLARE @dossierBck NVARCHAR(512) -- Chemin dossier backup. 
DECLARE @date NVARCHAR(40) -- Date du jour
DECLARE @fichierBck NVARCHAR(512) -- Nom du fichier

SET @dossierBck = 'C:\Backup\'
SELECT @nomBD = DB_NAME() 
SELECT @date = CONVERT(NVARCHAR(20),GETDATE(),112) 
SET @fichierBck = @dossierBck + @nomBD + '_' + @date + '.BAK' 
BACKUP DATABASE @nomBD TO DISK = @fichierBck
```

</details>

## Exercice 6

Effectuez le script de suppression des tables. Assurez-vous de mettre la suppression dans le bon ordre.

Ajoutez la vérification que la table existe avant la suppression.

<details>

  <summary>Solution</summary>

  ```sql
  USE BDExercice
GO

IF OBJECT_ID('Distribution', 'U') IS NOT NULL 
	DROP TABLE [Distribution];
IF OBJECT_ID('Personnage', 'U') IS NOT NULL 
	DROP TABLE Personnage;
IF OBJECT_ID('Univers', 'U') IS NOT NULL
	DROP TABLE Univers;
IF OBJECT_ID('Film', 'U') IS NOT NULL 
	DROP TABLE Film;
GO
  ```
</details>

## Exercice 7

Restaurer la base de données en utilisant l'explorateur d'objet. 


<details>
  <summary>Solution</summary>

  Clic droit sur la BD-> Tâches -> Restaurer -> Base de données.

</details>