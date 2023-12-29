CREATE DATABASE EtudiantBD2
GO

USE EtudiantBD2
GO

CREATE TABLE Etudiant
(
	[DA] VARCHAR(10) PRIMARY KEY NOT NULL,
	[Nom] VARCHAR(100) NOT NULL,
	[Traite] BIT NOT NULL
)
GO

INSERT INTO [dbo].[Etudiant]
           ([da]
           ,[nom]
           ,[traite])
VALUES
	('eFSTH','François St-Hilaire',0)
GO

