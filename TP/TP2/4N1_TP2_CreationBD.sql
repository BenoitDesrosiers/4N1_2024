IF DB_ID('eDA_H23_4N1_TP2') IS NULL--Mettez votre DA
	CREATE DATABASE eDA_H23_4N1_TP2; --Mettez votre DA
GO

USE eDA_H23_4N1_TP2;--Mettez votre DA
GO

IF OBJECT_ID('ApplicationLangue', 'U') IS NOT NULL
	DROP TABLE ApplicationLangue;

IF OBJECT_ID('Achat', 'U') IS NOT NULL
	DROP TABLE Achat;

IF OBJECT_ID('Application', 'U') IS NOT NULL
	DROP TABLE [Application];

IF OBJECT_ID('Client', 'U') IS NOT NULL
	DROP TABLE Client;

IF OBJECT_ID('Developpeur', 'U') IS NOT NULL
	DROP TABLE Developpeur;

IF OBJECT_ID('Langue', 'U') IS NOT NULL
	DROP TABLE Langue;

IF OBJECT_ID('Pays', 'U') IS NOT NULL
	DROP TABLE Pays;

IF OBJECT_ID('Categorie', 'U') IS NOT NULL
	DROP TABLE Categorie;

IF OBJECT_ID('ModePaiement', 'U') IS NOT NULL
	DROP TABLE ModePaiement;

CREATE TABLE ModePaiement
(
    ModePaiementId INT NOT NULL CONSTRAINT PK_ModePaiement PRIMARY KEY IDENTITY,
    NomMode VARCHAR(15) NOT NULL
);

CREATE TABLE Categorie
(
    CategorieId INT NOT NULL CONSTRAINT PK_Categorie PRIMARY KEY IDENTITY,
    NomCategorie VARCHAR(25) NOT NULL,
	[Description] VARCHAR(500) NULL
);

CREATE TABLE Pays
(
    PaysId INT NOT NULL CONSTRAINT PK_Pays PRIMARY KEY IDENTITY,
    CodeISO CHAR(2) NOT NULL UNIQUE CHECK(LEN(CodeISO) = 2),
    NomPays VARCHAR(50) NOT NULL
);

CREATE TABLE Langue
(
    LangueId INT NOT NULL CONSTRAINT PK_Langue PRIMARY KEY IDENTITY,
    CodeISO CHAR(2) NOT NULL UNIQUE CHECK(LEN(CodeISO) = 2),
    NomLangue VARCHAR(40) NOT NULL
);

CREATE TABLE Developpeur
(
    DeveloppeurId INT NOT NULL CONSTRAINT PK_Developpeur PRIMARY KEY IDENTITY,
    Nom VARCHAR(50) NOT NULL,	
    Adresse VARCHAR(100) NOT NULL,
    Ville  VARCHAR(100) NOT NULL,
    PaysId INT NOT NULL CONSTRAINT FK_Developpeur_PaysId FOREIGN KEY REFERENCES Pays(PaysId),
	SiteWeb VARCHAR(1000) NOT NULL,
	Courriel VARCHAR(320) NOT NULL
);

CREATE TABLE Client
(
    ClientId INT NOT NULL CONSTRAINT PK_Client PRIMARY KEY IDENTITY,
    Prenom VARCHAR(50) NOT NULL,
    Nom VARCHAR(50) NOT NULL,
    Adresse VARCHAR(100) NOT NULL,
    Ville  VARCHAR(100) NOT NULL,
    PaysId INT NOT NULL CONSTRAINT FK_Client_PaysId FOREIGN KEY REFERENCES Pays(PaysId),
    DateCreation DATETIME NOT NULL
);


CREATE TABLE [Application]
(
    ApplicationId INT NOT NULL CONSTRAINT PK_Application PRIMARY KEY IDENTITY,	
    Titre VARCHAR(500) NOT NULL,
	[Description] VARCHAR(500) NOT NULL,
    Taille DECIMAL(7,1) NOT NULL,
    Prix DECIMAL(6,2) NOT NULL,
	Age VARCHAR(3) NOT NULL CONSTRAINT CK_Application_Age CHECK(Age IN ('4+', '9+', '12+', '17+')),
    DeveloppeurId INT NOT NULL CONSTRAINT FK_Application_DeveloppeurId FOREIGN KEY REFERENCES Developpeur(DeveloppeurId),
    CategorieId INT NOT NULL CONSTRAINT FK_Application_CategorieId FOREIGN KEY REFERENCES Categorie(CategorieId),
    DatePublication DATE NOT NULL
);

CREATE TABLE Achat
(
    ClientId INT NOT NULL CONSTRAINT FK_Achat_CliendId FOREIGN KEY REFERENCES Client(ClientId),
    ApplicationId INT NOT NULL CONSTRAINT FK_Achat_ApplicationId FOREIGN KEY REFERENCES Application(ApplicationId),
    PrixPaye DECIMAL(6,2) NOT NULL,
    ModePaiementId INT NOT NULL CONSTRAINT FK_Achat_ModePaiementId FOREIGN KEY REFERENCES ModePaiement(ModePaiementId),
    DateAchat DATETIME NOT NULL,
    Note TINYINT NULL CONSTRAINT CK_Achat_Note CHECK(Note >= 0 AND Note <= 10),
	Commentaire VARCHAR(1000) NULL
    CONSTRAINT PK_Achat PRIMARY KEY(ClientId, ApplicationId)
);

CREATE TABLE ApplicationLangue
(
    ApplicationId INT NOT NULL CONSTRAINT FK_ApplicationLangue_ApplicationId FOREIGN KEY REFERENCES [Application](ApplicationId),
    LangueId INT NOT NULL CONSTRAINT FK_ApplicationLangue_LangueId FOREIGN KEY REFERENCES Langue(LangueId),
    CONSTRAINT PK_ApplicationLangue PRIMARY KEY (ApplicationId, LangueId),    
);

