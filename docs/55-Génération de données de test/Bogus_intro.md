---
sidebar_position : 10
---

# Bogus

Pour générer une grosse quantité de données, il n'est pas réaliste de le faire manuellement.

Les données créées manuellement n'auront pas de grandes variabilités et seront peu crédibles pour un utilisateur.

Il existe des librairies de génération de données. Elles sont appelées **Faker** dans la plupart des cas.

Une librairie populaire pour **CSHARP** est **Bogus**.

Pour plus d'information sur la librairie : https://github.com/bchavez/Bogus

La librairie contient une banque de données pour générer des noms de personnes, nom de villes, nom de compagnies, des numéros de téléphone, des phrases...

Il est toujours préférable d'utiliser une valeur proche de la réalité.


## Code Source de l'exemple

Le code source de cet exemple est dans ce fichier [code source](GenerateurBDGestionLivre.zip)

## Base de données exemple

Pour ce document, une nouvelle base de données sera utilisée. La base de données est pour la gestion de livres dans des magasins. Elle contient tous les cas nécessaires pour le **TP 2**.

:::info
Pour cet exemple, nous allons utiliser la méthode **Database first** afin de générer le modèle à partir de la base de données. 
:::

Voici le DEA.

<img src="/4N1_2024/img/11_DEA_Livre.jpg" />

Voici le script pour créer une base de données.

```sql
--IMPORTANT, ne pas oublier de mettre votre eDA après le nom de la BD

IF DB_ID('eDA_4N1_GestionLivre') IS NULL ----Mettre votre eDA
	CREATE DATABASE eDA_4N1_GestionLivre ----Mettre votre eDA
GO

USE eDA_4N1_GestionLivre
GO


IF OBJECT_ID('LivreAuteur', 'U') IS NOT NULL DROP TABLE LivreAuteur
IF OBJECT_ID('Inventaire', 'U') IS NOT NULL DROP TABLE Inventaire
IF OBJECT_ID('Auteur', 'U') IS NOT NULL DROP TABLE Auteur
IF OBJECT_ID('Magasin', 'U') IS NOT NULL DROP TABLE Magasin
IF OBJECT_ID('Livre', 'U') IS NOT NULL DROP TABLE Livre
IF OBJECT_ID('Editeur', 'U') IS NOT NULL DROP TABLE Editeur
IF OBJECT_ID('Collection', 'U') IS NOT NULL DROP TABLE [Collection]
GO

CREATE TABLE [Collection]
(
	CollectionId INT NOT NULL CONSTRAINT PK_Collection PRIMARY KEY IDENTITY,
	NomCollection VARCHAR(50) NOT NULL,
	[Description] VARCHAR(250) NULL
);

CREATE TABLE Editeur
(
	EditeurId INT NOT NULL CONSTRAINT PK_Editeur PRIMARY KEY IDENTITY,
	Nom VARCHAR(150) NOT NULL,
	SiteWeb VARCHAR(3000) NOT NULL,
	Telephone VARCHAR(15) NOT NULL
);

CREATE TABLE Livre
(
	LivreId INT NOT NULL CONSTRAINT PK_Livre PRIMARY KEY IDENTITY,
	Titre VARCHAR(100) NOT NULL,
	[Resume] VARCHAR(5000) NOT NULL,
	DatePublication DATE NOT NULL,
	Prix DECIMAL(5,2) NOT NULL,
	NbPage SMALLINT NOT NULL,
	Categorie VARCHAR(30) NOT NULL CONSTRAINT CK_Livre_Categorie CHECK(Categorie IN ('Jeunesse', 'Biographie', 'Policier')),
	CollectionId INT NOT NULL CONSTRAINT FK_Livre_CollectionId FOREIGN KEY REFERENCES [Collection](CollectionId),
	EditeurId INT NOT NULL CONSTRAINT FK_Livre_EditeurId FOREIGN KEY REFERENCES Editeur(EditeurId)
);

CREATE TABLE Magasin
(
	MagasinId INT NOT NULL CONSTRAINT PK_MAgasin PRIMARY KEY IDENTITY,
	Nom VARCHAR(150) NOT NULL,
	Adresse VARCHAR(100) NOT NULL,
	Ville  VARCHAR(100) NOT NULL,
	CodePostal CHAR(7) NOT NULL
);

CREATE TABLE Auteur
(
	AuteurId INT NOT NULL CONSTRAINT PK_Auteur PRIMARY KEY IDENTITY,
	Prenom VARCHAR(50) NOT NULL,
	Nom VARCHAR(50) NOT NULL,
	Biographie VARCHAR(5000) NULL,
	DateNaissance DATE NOT NULL,
	DateDeces DATE NULL
);

CREATE TABLE Inventaire
(
	LivreId INT NOT NULL CONSTRAINT FK_Inventaire_LivreId FOREIGN KEY REFERENCES Livre(LivreId),
	MagasinId INT NOT NULL CONSTRAINT FK_Inventaire_MagasinId FOREIGN KEY REFERENCES Magasin(MagasinId),
	Quantite SMALLINT NOT NULL,
	CONSTRAINT PK_Inventaire PRIMARY KEY(LivreId, MagasinId)
);

CREATE TABLE LivreAuteur
(
	LivreId INT NOT NULL CONSTRAINT FK_LivreAuteur_LivreId FOREIGN KEY REFERENCES Livre(LivreId),
	AuteurId INT NOT NULL CONSTRAINT FK_LivreAuteur_AuteurId FOREIGN KEY REFERENCES Auteur(AuteurId),
	CONSTRAINT PK_LivreAuteur PRIMARY KEY(LivreId, AuteurId)
);
```

## Nouvelle application console

Créez une application console.

Nommez cette application **GenerateurBDGestionLivre**.

Cette application utilisera directement le contexte et les générateurs.


### Génération du contexte

Installez les 2 librairies ci-dessous.

```powershell
Install-Package Microsoft.EntityFrameworkCore.SqlServer
Install-Package Microsoft.EntityFrameworkCore.Tools
```

Ensuite, générez le contexte avec **Scaffold-Dbcontext**.

Voici la commande sans l'erreur du **SSL**. Pensez à utiliser votre DA.

```powershell
Scaffold-DbContext "Server=localhost\SQLExpress;Database=eDA_4N1_GestionLivre;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -Context GestionLivreContext -OutputDir Data -ContextDir Data\Context -NoPluralize -Force
```

Voici  la commande si vous avez l'erreur du **SSL**.

```powershell
Scaffold-DbContext "Server=localhost\SQLExpress;Database=eDA_4N1_GestionLivre;Trusted_Connection=True;Trust Server Certificate=true;" Microsoft.EntityFrameworkCore.SqlServer -Context GestionLivreContext -OutputDir Data -ContextDir Data\Context -NoPluralize -Force
```

Cette commande va générer le contexte ainsi que les classes pour représenter la bd dans le sous-répertoire **Data** du projet. 


### Fichier Program.cs

Modifiez le fichier **Program.cs** pour celui-ci.

```csharp
using GenerateurBDGestionLivre.Data.Context;

using (GestionLivreContext db = new GestionLivreContext())
{
    //Logique
}
```

## Bogus

Lorsqu'un générateur de données est utilisé, il est important d'avoir des données réalistes. Si les données n'ont aucun sens, il sera difficile à l'utilisateur de comprendre les différents champs des formulaires et des listes de l'application.

La librairie **Bogus** contient plusieurs modules pour générer des données en fonction d'un thème. En voici quelques-uns.

- Company : En lien avec des compagnies
- Address : En lien avec les adresses.
- Name : En lien avec des personnes.
- Lorem : En lien avec de la génération de mots ou de textes.
- Finance : En lien avec des achats.
- Date : En lien avec les dates

Pour avoir les **modules disponibles** pour avoir des données réalistes, veuillez consulter la liste : https://github.com/bchavez/Bogus#bogus-api-support

Il est donc important de choisir la bonne librairie pour générer des valeurs en fonction du champ.

Il est possible d'ajouter de la logique au générateur pour avoir des données plus réalistes encore.

La librairie **Bogus** génère des valeurs pour des objets et non directement pour une base de données. Lorsqu'une application utilise un **ORM**, il est possible d'utiliser un générateur d'objet sur les classes du modèle. Ces objets peuvent être ensuite ajoutés à la base de données.

## Installation de la librairie

Dans la **Console du Gestionnaire de package**, inscrivez ceci.

```powershell
Install-Package Bogus
```

## Classe Generateur

Dans ce document, les générateurs seront créés par héritage de la classe **Faker\<T>**. Le **\<T>** correspond à la classe du générateur.

Dans la documentation de **Bogus**, il existe plusieurs techniques. Par contre, celle par héritage permet de créer une classe qui contient toute la logique de génération de données.

La classe est séparée en 3 sections.

- **Constructeurs**

  Le constructeur permet d'associer une propriété à une méthode de génération.

  La méthode **RuleFor(i => i.[Propriete], Gen[Propriete])** permet de faire le lien.

- **Méthode de génération**

  La méthode de génération contient la logique pour générer une valeur pour une propriété.

  La méthode aura cette signature **[Type Propriete] Gen[Propriete](Faker f)** .

- **Méthode d'assignation des dépendances (clé étrangère) - facultatif**

  Une méthode d'assignation des dépendances permet d'indiquer les dépendances disponibles pour cette classe.

## Validation

Il est important que le données générées soient valides pour la base de données.

Il faut que les contraintes de type et spécifiques soient respectées.

Il est possible d'utiliser des librairies spécialisées pour ceci.

### Extension de string - Tronquer

Pour la longueur maximale des chaines de caractères, il faudra **tronquer** la chaine si elle est trop grande.

Créez la classe d'extension **StringExtensions** directement dans le projet.

```csharp
namespace GenerateurBDGestionLivre;

/// <summary>
/// Classe qui contient les extensions pour les données de type string
/// </summary>
public static class StringExtensions
{
    /// <summary>
    /// Permet de tronquer une string
    /// </summary>
    /// <param name="s">string à tronquer</param>
    /// <param name="maxLongueur">Longueur maximum de la chaine</param>
    /// <returns>string tronqué</returns>
    public static string? Tronquer(this string? s, int maxLongueur)
    {
        //Verifie si la chaine est plus grande que la longueur maximale
        if (s?.Length > maxLongueur)
        {
            //La chaine est plus grande que la longueur maximamle
            //Retourne uniquement la partie de la longueur maximale
            return s.Substring(0, maxLongueur);
        }
        else
        {
            //La chaine est plus petite que la longueur maximale
            //Retourne la chaine originale
            return s;
        }
    }
}
```

## Table Collection

La table **Collection** consiste aux collections de livres. Généralement, un livre fait partie d'une collection de livres.

La table possède 2 champs.

- **NomCollection**

  Le meilleur générateur pour le nom d'une collection serait un générateur de mots dans le module **Random**.

- **Description**

  Le meilleur générateur pour la description serait un générateur de phrase dans le module **Lorem**.



Créez la classe **CollectionGenerateur**.

```csharp
using Bogus;
using GenerateurBDGestionLivre.Data;

namespace GenerateurBDGestionLivre;

public class CollectionGenerateur : Faker<Collection>
{
	public CollectionGenerateur()
	{
		//Pour faire l'association entre une propriété et une méthode de génération, il faut utiliser la méthode RuleFor
		RuleFor(i => i.NomCollection, GenNomCollection);
		RuleFor(i => i.Description, GenDescription);
	}

	public Collection Generer()
	{
		return base.Generate();
	}

	private string GenNomCollection(Faker f)
	{
		//La méthode Words permet de générer des mots.
		//Si aucun paramètre n'est spécifié, il y aura entre 1 et 3 mots.
		//Le type est VARCHAR(50)
		return f.Random.Words().Tronquer(50)!;
	}

	private string? GenDescription(Faker f)
	{
        //La méthode Sentence permet de générer une phrase de quelques mots.
        //Le type est VARCHAR(250)
		//La probabilité du null est de 20%
        return f.Lorem.Sentence().Tronquer(250).OrNull(f, 0.2f);
	}
}

```

La table **Collection** n'a aucune dépendance. Elle a donc seulement le constructeur et les méthodes de génération.

Ce générateur est assez simple, car les modules de **Bogus** sont suffisants pour créer des données.

Voici le constructeur.

```csharp title="NE PAS COPIER, C'EST DÉJÀ DANS LE CODE"
public CollectionGenerateur()
{
	//Pour faire l'association entre une propriété et une méthode de génération, il faut utiliser la méthode RuleFor
	RuleFor(i => i.NomCollection, GenNomCollection);
	RuleFor(i => i.Description, GenDescription);
}
```

Il y a 2 propriétés à générer pour la classe **Collection**. Si la clé primaire est **autogénérée** par la base de données, il est important de ne pas la générer avec **Bogus**. Il faut générer uniquement les propriétés qu'un utilisateur spécifierait normalement.

Pour la propriété **NomCollection**, ce sera un générateur de mots.

Il est important que les mots ne dépassent pas le 50 caractères, car le type **SQL** est **VARCHAR(50)**.

```csharp title="NE PAS COPIER, C'EST DÉJÀ DANS LE CODE"
private string GenNomCollection(Faker f)
{
	//La méthode Words permet de générer des mots.
	//Si aucun paramètre n'est spécifié, il y aura entre 1 et 3 mots.
	//Le type est VARCHAR(50)
	return f.Random.Words().Tronquer(50)!;
}
```

Pour la propriété **Description**, ce sera une phrase. 

Il est important que la phrase ne dépasse pas le 250 caractères, car le type **SQL** est **VARCHAR(250)**.

Une autre particularité est que le champ peut être **null** dans la base de données. Il faut que le générateur en tienne compte pour avoir une variabilité dans les données.

La méthode **OrNull(f, [probabilite])** permet d'indiquer la probabilité d'obtenir une valeur nulle. Il faut envoyer dans la méthode le **Faker** de la méthode.

```csharp title="NE PAS COPIER, C'EST DÉJÀ DANS LE CODE"
private string? GenDescription(Faker f)
{
    //La méthode Sentence permet de générer une phrase de quelques mots.
    //Le type est VARCHAR(250)
	//La probabilité du null est de 20%
    return f.Lorem.Sentence().Tronquer(250).OrNull(f, 0.2f);
}
```

### Test

Modifiez le fichier **Program.cs** pour ceci.

```csharp
using GenerateurBDGestionLivre;
using GenerateurBDGestionLivre.Data;
using GenerateurBDGestionLivre.Data.Context;

using (GestionLivreContext db = new GestionLivreContext())
{
    CollectionGenerateur generateur = new CollectionGenerateur();

    for(int i = 0; i < 10; i++)
    {
        Collection collection = generateur.Generer();        

        Console.WriteLine($"NomCollection : {collection.NomCollection}");
        Console.WriteLine($"Description : {collection.Description}");
        Console.WriteLine();

        //Ajoute dans la base de données
        db.Add(collection);
        //Enregistre dans la base de données
        db.SaveChanges();
    }
}
```

Exécutez le programme.

Voici un exemple de génération.

```
NomCollection : Checking Account
Description : In aliquam quasi quisquam molestiae.

NomCollection : Ouguiya Garden Savings Account
Description : Ab dolor non ullam hic sunt sit.

NomCollection : Mountain
Description :

NomCollection : payment
Description : 

NomCollection : capability
Description : Repellat quas qui omnis rerum.

NomCollection : Wooden
Description :

NomCollection : SAS
Description : Non ipsum iure autem corporis.

NomCollection : dynamic Global navigate
Description : Suscipit consequatur delectus.

NomCollection : Indonesia productivity California
Description : Laudantium architecto sit deserunt necessitatibus quae.

NomCollection : white
Description : Sapiente quo magni repellendus natus qui voluptates.
```

Des mots aux hasards et des phrases en **Lorem**, ce n'est peut-être pas le plus **réaliste**, mais ça permet d'avoir des données **vraisemblables** pour la base de données.

Ouvrez **SSMS** et effectuez la requête ci-dessous pour voir les données.

```sql
SELECT * FROM [Collection];
```

## Table Editeur

La table **Editeur** consiste aux éditeurs de livres.

La table possède 3 champs.

- **Nom**

  Le meilleur générateur pour le nom d'une collection serait un générateur de nom de compagnie dans le module **Company**.

- **SiteWeb**

  Le meilleur générateur pour le site web serait un générateur de Url dans le module **Internet**.

- **Telephone**

  Le meilleur générateur pour le téléphone serait un générateur de téléphone dans le module **Phone**.



Créez la classe **EditeurGenerateur**.

```csharp
using Bogus;
using GenerateurBDGestionLivre.Data;

namespace GenerateurBDGestionLivre;

public class EditeurGenerateur : Faker<Editeur>
{
	public EditeurGenerateur()
	{
		RuleFor(i => i.Nom, GenNom);
		RuleFor(i => i.SiteWeb, GenSiteWeb);
		RuleFor(i => i.Telephone, GenTelephone);
	}

	public Editeur Generer()
	{
		return base.Generate();
	}

	private string GenNom(Faker f)
	{
		//La méthode CompanyName permet de générer un nom de compagnie
		//Le type est VARCHAR(150)
		return f.Company.CompanyName().Tronquer(150)!;
	}

	private string GenSiteWeb(Faker f)
	{
		//La méthode Url permet de générer une adresse internet
		//Le type est VARCHAR(3000)
		return f.Internet.Url().Tronquer(3000)!;
	}

	private string GenTelephone(Faker f)
	{
		//La méthode PhoneNumber peut avoir un format en paramètre.
		return f.Phone.PhoneNumber("###-###-####");
	}
}

```

La plupart des méthodes ont la possibilité de mettre des paramètres.

Par exemple, **CompanyName()** peut avoir 3 formats différents. Si aucun paramètre n'est spécifié, les 3 formats de nom de compagnie seront utilisés.

Pour le téléphone, il aurait été possible d'utiliser le format **(###) ###-####**. 

### Test

Modifiez le fichier **Program.cs**.

```csharp
using GenerateurBDGestionLivre;
using GenerateurBDGestionLivre.Data;
using GenerateurBDGestionLivre.Data.Context;

using (GestionLivreContext db = new GestionLivreContext())
{
    EditeurGenerateur generateur = new EditeurGenerateur();

    for(int i = 0; i < 10; i++)
    {
        Editeur editeur = generateur.Generer();        

        Console.WriteLine($"Nom : {editeur.Nom}");
        Console.WriteLine($"Site Web : {editeur.SiteWeb}");
        Console.WriteLine($"Téléphone : {editeur.Telephone}");
        Console.WriteLine();

        //Ajoute dans la base de données
        db.Add(editeur);
        //Enregistre dans la base de données
        db.SaveChanges();
    }
}
```

Voici un exemple de données générées.

```
Nom : Langosh and Sons
Site Web : http://milton.org
Téléphone : 730-694-1027

Nom : Boyle, Osinski and Nikolaus
Site Web : https://mayra.org
Téléphone : 453-503-9297

Nom : Muller, Green and Harvey
Site Web : https://erin.info
Téléphone : 464-434-7270

Nom : Farrell, Ortiz and Kiehn
Site Web : https://savanna.net
Téléphone : 997-180-1888

Nom : Cronin, Kovacek and Stoltenberg
Site Web : https://maverick.info
Téléphone : 388-588-0080

Nom : Mohr - Krajcik
Site Web : http://joesph.org
Téléphone : 161-910-4126

Nom : Kris - Gleichner
Site Web : https://ramona.info
Téléphone : 006-236-8048

Nom : Homenick LLC
Site Web : http://kirsten.biz
Téléphone : 445-092-6921

Nom : O'Reiley Group
Site Web : http://connor.biz
Téléphone : 159-528-4460

Nom : Paucek - Abernathy
Site Web : https://kaley.net
Téléphone : 133-806-2671
```

### Amélioration - Utilisation d'une propriété de référence

Le site web n'a aucun lien avec le nom de la compagnie. Il serait intéressant que le nom de la compagnie soit dans le **Url**.

Il y a 3 options. 

1- On transforme le nom de la compagnie pour le mettre en domaine. 

Il faut s'assurer d'éliminer tous les caractères problématiques. 

Dans l'exemple ci-dessus, il y a : **, \`  -** et l'espace. 

2- On génère une adresse internet et la portion domaine devient le nom de la compagnie.

3- On génère le nom de la compagnie à partir de mots de domaine.

Le module **Internet** permet de générer des mots de domaine. Il serait ensuite possible d'appliquer l'option 1 à partir de ces mots sans se soucier d'éliminer les caractères.

Les 3 approches dépendent d'une autre propriété pour se générer.

Pour cet exemple, l'option 3 sera utilisée.

L'ordre des **RuleFor** est important dans ce cas-ci, car il faut générer le nom de la compagnie avant le domaine.

Voici la nouvelle méthode **GenNom()**.

```csharp
private string GenNom(Faker f)
{
	//Le nombre de mots sera aléatoire (entre 1 et 4)
	//Il faut mettre la première lettre du nom en majuscule

	int nbMot = f.Random.Number(1, 4);
	string[] mots = new string[nbMot];

	for(int i = 0; i < nbMot; i++)
	{
		mots[i] = f.Internet.DomainWord();
	}						

	string nom = string.Join(" ", mots);

	//Le type est VARCHAR(150)
	return (nom.Substring(0, 1).ToUpper() + nom.Substring(1)).Tronquer(150)!;
}
```

Voici la nouvelle méthode **GenSiteWeb()**.

```csharp
private string GenSiteWeb(Faker f, Editeur editeur)
{
	//Le type est VARCHAR(3000)

	//Les espaces du nom de l'éditeur peuvent être éliminés ou remplacés par des tirets.
	//Il est possible de données des choix et de choisir en fonction d'une probabilité.

	//Il est important que les 2 tableaux soient de la même longueur.
	string[] choixRemplacement = { string.Empty, "-" };
	//La somme des probabilités doit être 1.
	//60% de retirer l'espace et 40% de mettre un tiret.
	float[] probabiliteRemplacement = { 0.6f, 0.4f };

    //La méthode WeightedRandom permet de faire un choix dans une liste en fonction de probabilité pour chacun des items.
	string valeurRemplacement = f.Random.WeightedRandom(choixRemplacement, probabiliteRemplacement);

    //La longueur maximale d'un domaine est de 63
	string domaine = editeur.Nom.ToLower().Replace(" ", valeurRemplacement).Tronquer(63)!;

    //Ajoute à la fin un suffixe de domaine.
    return ("https://www." + domaine + "." + f.Internet.DomainSuffix()).Tronquer(3000)!;
}
```

Premièrement, la méthode a un 2e paramètre. Il s'agit de l'instance **Editeur** en cours de création.

Ensuite, il est possible de remplacer les espaces du nom par des tirets ou de les retirer. Afin de varier le plus possible le domaine, l'utilisation de la méthode **WeightedRandom()** permet de mettre une probabilité sur chaque possibilité.  Il y a donc 60% plus de chance de retirer l'espace.

Finalement, la méthode **DomainSuffix()** permet de générer un **.xyz** valide.

:::warning Attention
Avant de générer 10 nouveaux Editeurs, veuillez vider la table Editeur dans la bd. 
:::
Voici un exemple de génération.

```
Nom : Graciela
Site Web : https://www.graciela.net
Téléphone : 126-633-0627

Nom : Nola eden buck elnora
Site Web : https://www.nola-eden-buck-elnora.org
Téléphone : 170-125-8822

Nom : Helen
Site Web : https://www.helen.name
Téléphone : 008-494-5413

Nom : Torrance earl
Site Web : https://www.torranceearl.net
Téléphone : 340-024-2604

Nom : Pearl
Site Web : https://www.pearl.info
Téléphone : 336-317-2160

Nom : Thelma delores cassidy randal
Site Web : https://www.thelmadelorescassidyrandal.biz
Téléphone : 892-446-1812
```


## Table Auteur

La table **Auteur** contient l'information d'un auteur d'un livre.

La table possède 5 champs.

- **Nom** et **Prenom**

  Le module **Name** a des générateurs de noms de personne.

- **Biographie**

  Le module **Lorem** peut générer des paragraphes.

- **DateNaissance** et **DateDeces**

  Le module **Date** peut générer des dates. 

  La génération de la date de décès dépend de la date de naissance.

  Il faut s'assurer que la date de décès est plus récente que la date de naissance. 

  Il ne peut avoir aucune date dans le futur.

  Il faudrait également s'assurer que si l'auteur est toujours en vie, que son âge soit vraisemblable.

  Si l'auteur est décédé, il faut que son âge soit vraisemblable également.

Créez la classe **AuteurGenerateur**.

```csharp
using Bogus;
using GenerateurBDGestionLivre.Data;

namespace GenerateurBDGestionLivre;

public class AuteurGenerateur : Faker<Auteur>
{
    public AuteurGenerateur()
    {
        RuleFor(i => i.Prenom, GenPrenom);
        RuleFor(i => i.Nom, GenNom);
        RuleFor(i => i.Biographie, GenBiographie);
        RuleFor(i => i.DateNaissance,  GenDateNaissance);
        RuleFor(i => i.DateDeces, GenDateDeces);
    }

    public Auteur Generer()
    {
        return base.Generate();
    }

    private string GenPrenom(Faker f)
    {
        //VARCHAR(50)
        return f.Name.FirstName().Tronquer(50)!;
    }

    private string GenNom(Faker f)
    {
        //VARCHAR(50)
        return f.Name.LastName().Tronquer(50)!;
    }

    private string? GenBiographie(Faker f)
    {
        //VARCHAR(5000)
        //30% d'obtenir un null
        return f.Lorem.Paragraphs(1, 3).OrNull(f, 0.3f).Tronquer(5000)!;
    }

    private DateOnly GenDateNaissance(Faker f)
    {
        //La date peut être entre 1800-01-01 et 15 ans dans le passé.
        return f.Date.BetweenDateOnly(new DateOnly(1800, 1, 1), DateOnly.FromDateTime(DateTime.Now).AddYears(-15));
    }

    private DateOnly? GenDateDeces(Faker f, Auteur auteur)
    {
        //Vérifie si la date de naissance est il y a plus de 95 ans
        if (DateTime.Now.Date.Year - auteur.DateNaissance.Year > 95)
        {
            //La date de naissance est il y a plus de 95 ans
            //Il faut obligatoirement générer une date de décès.
            //L'auteur peut être mort entre 15 et 95 ans
            return f.Date.BetweenDateOnly(auteur.DateNaissance.AddYears(15), auteur.DateNaissance.AddYears(95));
        }
        else
        {
            //La date de naissance est il y a 95 ans et moins.
            //Il y a seulement 5% de chance qu'il soit décédé.

            return f.Date.BetweenDateOnly(auteur.DateNaissance.AddYears(15), DateOnly.FromDateTime(DateTime.Now).AddDays(-5)).OrNull(f, 0.95f);
        }
    }
}
```

Pour la méthode **GenDateNaissance()** le générateur ne peut pas générer des auteurs de moins de 15 ans. 

Il serait possible d'optimiser les auteurs récents en ajoutant beaucoup plus de logique. Il faut toujours se demander si les ajouts de logiques ont réellement de la valeur. Dans ce cas-ci, il n'est pas nécessaire d'optimiser les auteurs récents.

Pour la méthode **GenDateDeces()**,  il est plus pertinent pour la date de décès d'avoir plus de logique. Il est impossible d'avoir un auteur de 200 ans. Il faut avoir des dates de décès réaliste en fonction de la date de naissance. Pour cet outil, tous les auteurs qui ont plus de 95 ans doivent avoir une date de décès. Il faut également que l'auteur ait vécu un nombre d'années minimal. L'âge minimal est 15 ans.

Dans le cas que l'auteur a moins de 95 ans, il y a 5% de chance qu'il soit décédé. Il doit avoir au moins 14 ans à la date de son décès. 

### Test

Modifiez le fichier **Program.cs**.

```csharp
using GenerateurBDGestionLivre;
using GenerateurBDGestionLivre.Data;
using GenerateurBDGestionLivre.Data.Context;

using (GestionLivreContext db = new GestionLivreContext())
{
    AuteurGenerateur generateur = new AuteurGenerateur();

    for(int i = 0; i < 1000; i++)
    {
        Auteur auteur = generateur.Generer();        

        Console.WriteLine($"Prenom : {auteur.Prenom}");
        Console.WriteLine($"Nom : {auteur.Nom}");
        Console.WriteLine($"Date naissance : {auteur.DateNaissance}");
        Console.WriteLine($"Date décès : {auteur.DateDeces}");
        Console.WriteLine($"Biographie : {auteur.Biographie}");
        Console.WriteLine();

        //Ajoute dans la base de données
        db.Add(auteur);
        //Enregistre dans la base de données
        db.SaveChanges();
    }
}
```

Voici un exemple.

```
Prenom : Darryl
Nom : Satterfield
Date naissance : 1938-09-16 00:00:00
Date décès :
Biographie : Magni inventore est sequi cum suscipit omnis autem debitis perspiciatis. Non cumque enim modi nulla et. Quisquam quos sequi vel.

Quisquam neque sed quidem. Voluptas asperiores blanditiis ratione exercitationem rerum sit fuga. Voluptatem quia voluptas fuga harum aut alias quod et. Et laboriosam delectus odit est eligendi itaque dolore.

Eos quidem minima enim. A et et sit sapiente dolor reiciendis et qui sit. Corporis animi voluptatem quia sequi nihil qui eum ipsa perferendis.

Prenom : Linnea
Nom : Herzog
Date naissance : 1950-08-30 00:00:00
Date décès : 2022-05-08 00:00:00
Biographie : Qui molestiae aliquid qui dolores praesentium. Corporis repellendus iste quis. Voluptas sequi omnis illo in architecto deleniti voluptates dolor. Ut cupiditate sed.

Prenom : Arnulfo
Nom : Ruecker
Date naissance : 1826-04-24 00:00:00
Date décès : 1865-05-10 00:00:00
Biographie :
```

## Table Livre

La table **Livre** contient l'information d'un livre.

La table a 2 clés étrangères. Il est important de ne pas pendre des nombres au hasard, mais des clés étrangères qui existent réellement dans la base de données. Si la clé étrangère n'existe pas, l'enregistrement sera refusé dans la base de données. 

Créez la classe **LivreGenerateur**.

```csharp
using Bogus;
using GenerateurBDGestionLivre.Data;

namespace GenerateurBDGestionLivre;

public class LivreGenerateur : Faker<Livre>
{
    private List<int> _lstCollectionId = new List<int>();
    private List<int> _lstEditeurId = new List<int>();

    public LivreGenerateur()
    {
        RuleFor(i => i.Titre, GenTitre);
        RuleFor(i => i.Resume, GenResume);
        RuleFor(i => i.DatePublication, GenDatePublication);
        RuleFor(i => i.Prix, GenPrix);
        RuleFor(i => i.NbPage, GenNbPage);
        RuleFor(i => i.Categorie, GenCategorie);
        RuleFor(i => i.CollectionId, GenCollectionId);
        RuleFor(i => i.EditeurId, GenEditeurId);
    }

    public Livre Generer()
    {
        return base.Generate();
    }

    public void AssignerListeCollectionId(List<int> lstCollectionId)
    {
        _lstCollectionId.Clear();
        _lstCollectionId.AddRange(lstCollectionId);
    }

    public void AssignerListeEditeurId(List<int> lstEditeurId)
    {
        _lstEditeurId.Clear();
        _lstEditeurId.AddRange(lstEditeurId);
    }

    private string GenTitre(Faker f)
    {
        //Génère une série de mots
        //VARCHAR(100)
        return f.Random.Words().Tronquer(100)!;
    }

    private string GenResume(Faker f)
    {
        //Génère entre 1 et 4 paragraphes
        //VARCHAR(5000)
        return f.Lorem.Paragraphs(1, 4).Tronquer(5000)!;
    }

    private DateOnly GenDatePublication(Faker f)
    {
        //Retourne une date dans les 25 dernières années
        return f.Date.PastDateOnly(25);
    }

    private decimal GenPrix(Faker f)
    {
        //DECIMAL(5,2) => 0.00 et 999.99
        return f.Finance.Amount(0, 999.99m);
    }

    private short GenNbPage(Faker f)
    {
        //Génère entre 20 et 5123 pages
        //TINYINT
        return f.Random.Short(20, 5123);
    }

    private string GenCategorie(Faker f)
    {
        //La liste des valeurs possibles dans la contrainte CHECK
        string[] categories = { "Jeunesse", "Biographie", "Policier" };

        //Selectionne une valeur dans la liste
        return f.PickRandom(categories);
    }

    private int GenCollectionId(Faker f)
    {
        //Sélectionne un EditeurId dans la liste des CollectionId disponibles
        return f.PickRandom(_lstCollectionId);
    }

    private int GenEditeurId(Faker f)
    {
        //Sélectionne un EditeurId dans la liste des EditeurId disponibles
        return f.PickRandom(_lstEditeurId);
    }
}
```

La classe a 2 attributs pour contenir les listes des clés étrangères.

Elle a également les 2 méthodes d'assignation des dépendances.

Avant de débuter une génération, il est important que ces listes soient assignées. Toutes les tables qui utilisent des clés étrangères doivent avoir cette approche.

```csharp title="NE PAS COPIER"
/***/
private List<int> _lstCollectionId= new List<int>();
private List<int> _lstEditeurId = new List<int>();

/***/
public void AssignerListeCollectionId(List<int> lstCollectionId)
{
    _lstCollectionId.Clear();
    _lstCollectionId.AddRange(lstCollectionId);
}

public void AssignerListeEditeurId(List<int> lstEditeurId)
{
    _lstEditeurId.Clear();
    _lstEditeurId.AddRange(lstEditeurId);
}
```

Les méthodes **GenCollectionId()** et **GenEditeurId()** utilisent la fonctionnalité **PickRandom()** de **Bogus**. Cette fonctionnalité permet de choisir au hasard un item dans un tableau ou une collection.

```csharp title="NE PAS COPIER"
private int GenCollectionId(Faker f)
{
    //Sélectionne un EditeurId dans la liste des CollectionId disponibles
    return f.PickRandom(_lstCollectionId);
}

private int GenEditeurId(Faker f)
{
    //Sélectionne un EditeurId dans la liste des EditeurId disponibles
    return f.PickRandom(_lstEditeurId);
}
```

Une autre particularité pour ce générateur est pour le champ **Categorie**. Ce champ a une contrainte **CHECK** et permet seulement 3 valeurs.

Les 3 valeurs de la contrainte **CHECK** sont dans l'attribut **_categories** de la classe.

```csharp title="NE PAS COPIER"
//La liste des valeurs possibles de la contrainte CK_Livre_Categorie
private string[] _categories = { "Jeunesse", "Biographie", "Policier" };

/***/

private string GenCategorie(Faker f)
{
    //Selectionne une valeur dans la liste
    return f.PickRandom(categories);
}
```

Pour la propriété **Prix**, le module **Finance** est utilisé. Elle permet de générer des montants avec 2 décimales.

Il est important de respecter la précision du **DECIMAL SQL**.

```csharp title="NE PAS COPIER"
private decimal GenPrix(Faker f) 
{
    //DECIMAL(5,2) => 0.00 et 999.99
    return f.Finance.Amount(0, 999.99m);
}
```

Pour la propriété **DatePublication**, la méthode **`Past()`** du module **Date** permet de générer une date dans le passée. 

```csharp title="NE PAS COPIER"
private DateTime GenDatePublication(Faker f) 
{
    //Retourne une date dans les 25 dernières année
    return f.Date.Past(25).Date;
}
```

Les autres méthodes de génération utilisent des concepts similaires des autres tables.

### Test

Modifiez le fichier **Program.cs**.

```csharp showLineNumbers
using GenerateurBDGestionLivre;
using GenerateurBDGestionLivre.Data;
using GenerateurBDGestionLivre.Data.Context;

using (GestionLivreContext db = new GestionLivreContext())
{
    LivreGenerateur generateur = new LivreGenerateur();

    //Obtenir la liste des clés EditeurId dans la base de de données
    List<int> lstEditeurId = db.Editeur.Select(e => e.EditeurId).ToList();
    //Obtenir la liste des clés CollectionId dans la base de de données
    List<int> lstCollectionId = db.Collection.Select(c => c.CollectionId).ToList();
    
    //Assigner la liste dans le générateur
    generateur.AssignerListeEditeurId(lstEditeurId);
    //Assigner la liste dans le générateur    
    generateur.AssignerListeCollectionId(lstCollectionId);

    for (int i = 0; i < 5; i++)
    {
        Livre livre = generateur.Generer();        

        Console.WriteLine($"Titre : {livre.Titre}");
        Console.WriteLine($"Résumé : {livre.Resume}");
        Console.WriteLine($"Date publication : {livre.DatePublication}");
        Console.WriteLine($"Prix : {livre.Prix}");
        Console.WriteLine($"Nombre de pages : {livre.NbPage}");
        Console.WriteLine($"Catégories : {livre.Categorie}");
        Console.WriteLine($"CollectionId : {livre.CollectionId}");
        Console.WriteLine($"EditeurId : {livre.EditeurId}");

        Console.WriteLine();

        //Ajoute dans la base de données
        db.Add(livre);
        //Enregistre dans la base de données
        db.SaveChanges();
    }
}
```

Les lignes 10 et 12 récupèrent de la base de données toutes les clés disponibles pour chacune des tables parents.

Les lignes 15 et 17 permettent d'ajouter les clés étrangères dans le générateur.

Voici un exemple.

Les prix sont assez élevés. Il serait plus réaliste de réduire la plage à moins de 50$, même si la base de données permet jusqu'à 999.99.

```
Titre : Mobility
Résumé : Sunt dolor corrupti hic. Et ipsa a omnis consequatur. Ipsa tempore officia quod voluptatem et laborum incidunt deleniti. Voluptatem consequatur quis doloremque nobis corporis maiores suscipit optio non. Ducimus consequatur debitis.
Date publication : 2000-07-17 00:00:00
Prix : 795,39
Nombre de pages : 3378
Catégories : Jeunesse
CollectionId : 11
EditeurId : 14

Titre : USB Money Market Account installation
Résumé : Ut aut repudiandae placeat voluptatem fugiat eum. Nesciunt eveniet itaque nihil non quas neque natus qui deserunt. Officiis magnam et ut quaerat sunt sequi. Reprehenderit ad nemo possimus deserunt vitae consequatur aliquam. Veniam aut fugiat at eum quis corporis. Culpa nam laboriosam culpa quam eveniet quam quia autem voluptatum.

Vel deleniti et nesciunt eos et placeat repudiandae praesentium deleniti. Aut temporibus qui consequatur porro. Commodi sed itaque nesciunt est et doloribus at reprehenderit itaque. Totam reprehenderit et. Ut sint est rerum consequuntur id est totam. Debitis ut quasi.

Mollitia veritatis aut perferendis id aut sed nisi. Nostrum minus voluptatem. Deleniti enim voluptas sed recusandae enim ut nihil omnis iusto. Quod reiciendis dolorem ipsum. Beatae dolorum eius illum.

Fugiat sed et voluptatem nulla adipisci. Aut sed reiciendis modi voluptatum est enim. Autem et quo.
Date publication : 2016-12-03 00:00:00
Prix : 946,61
Nombre de pages : 562
Catégories : Jeunesse
CollectionId : 19
EditeurId : 13

Titre : Handcrafted Wooden Tasty Metal Table
Résumé : Suscipit fugiat est beatae. Perferendis aut quas iste. Porro dolores qui consectetur alias sint laboriosam voluptatem voluptates. Nihil quis explicabo rerum aut et provident delectus ad. Adipisci velit sint et quidem quibusdam necessitatibus odit praesentium quo.
Date publication : 2004-04-08 00:00:00
Prix : 707,16
Nombre de pages : 1652
Catégories : Jeunesse
CollectionId : 2
EditeurId : 5
```

## La table LivreAuteur

La table **LivreAuteur** est une table pivot. Elle permet d'indiquer les auteurs d'un livre.

Au niveau du **contexte**, il n'y a pas de classe, car il s'agit d'une table pivot **"pure"**.

Pour être en mesure de créer des enregistrements dans une table pivot **"pure"**, il faut l'ajouter à partir d'une des tables parents.

Donc, pour **LivreAuteur**, ce sont les classes **Livre** et **Auteur**.

Dans la classe **Livre**, il y a une collection de type **Auteur**.

```csharp
public virtual ICollection<Auteur> Auteur { get; } = new List<Auteur>();
```

Dans la classe **Auteur**, il y a une collection de type **Livre**.

```csharp
public virtual ICollection<Livre> Livre { get; } = new List<Livre>();
```

Dans la classe **GestionLivreContext**,  dans la méthode **onModelCreating()**, il y a l'explication de la table **LivreAuteur**.

Il n'est pas nécessaire de comprendre à cette étape la relation, mais **Entity** est en mesure de créer les enregistrements dans la table **LivreAuteur** à partir des propriétés de navigation.

```csharp
modelBuilder.Entity<Livre>(entity =>
{
    /***/

    entity.HasMany(d => d.Auteur).WithMany(p => p.Livre)
        .UsingEntity<Dictionary<string, object>>(
            "LivreAuteur",
            r => r.HasOne<Auteur>().WithMany()
                .HasForeignKey("AuteurId")
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LivreAuteur_AuteurId"),
            l => l.HasOne<Livre>().WithMany()
                .HasForeignKey("LivreId")
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LivreAuteur_LivreId"),
            j =>
            {
                j.HasKey("LivreId", "AuteurId");
                    });
        });
```

Donc pour générer des données, il faut le faire à partir des générateurs  **AuteurGenerateur** ou **LivreGenerateur**.

Pour cet exemple, le générateur **LivreGenerateur** sera utilisé.

### Modification de LivreGenerateur

Voici la nouvelle classe **LivreGenerateur**.

```csharp
using Bogus;
using GenerateurBDGestionLivre.Data;

namespace GenerateurBDGestionLivre;

public class LivreGenerateur : Faker<Livre>
{
    private List<int> _lstCollectionId= new List<int>();
    private List<int> _lstEditeurId = new List<int>();
    //highlight-next-line
    private List<Auteur> _lstAuteur = new List<Auteur>();

//highlight-start
    //La liste des valeurs possibles de la contrainte CK_Livre_Categorie
    private string[] _categories = { "Jeunesse", "Biographie", "Policier" };
//highlight-end

    public LivreGenerateur()
    {
        RuleFor(i => i.Titre, GenTitre);
        RuleFor(i => i.Resume, GenResume);
        RuleFor(i => i.DatePublication, GenDatePublication);
        RuleFor(i => i.Prix, GenPrix);
        RuleFor(i => i.NbPage, GenNbPage);
        RuleFor(i => i.Categorie, GenCategorie);
        RuleFor(i => i.CollectionId, GenCollectionId);
        RuleFor(i => i.EditeurId, GenEditeurId);
    }

    public Livre Generer()
    {
        //highlight-start
        Livre livre =  base.Generate();
        GenAuteurs(livre);
        return livre;
        //highlight-end
    }

    public void AssignerListeCollectionId(List<int> lstCollectionId)
    {
        _lstCollectionId.Clear();
        _lstCollectionId.AddRange(lstCollectionId);
    }

    public void AssignerListeEditeurId(List<int> lstEditeurId)
    {
        _lstEditeurId.Clear();
        _lstEditeurId.AddRange(lstEditeurId);
    }

//highlight-start
    public void AssignerListeAuteur(List<Auteur> lstAuteur)
    {
        //Ce n'est pas des Id, mais une liste des enregistrements Auteur.
        _lstAuteur.Clear();
        _lstAuteur.AddRange(lstAuteur);
    }
    //highlight-end

    private string GenTitre(Faker f)
    {
        //Génère une série de mots
        //VARCHAR(100)
        return f.Random.Words().Tronquer(100)!;
    }

    private string GenResume(Faker f)
    {
        //Génère entre 1 et 4 paragraphes
        //VARCHAR(5000)
        return f.Lorem.Paragraphs(1, 4).Tronquer(5000)!;
    }

   private DateOnly GenDatePublication(Faker f)
    {
        //Retourne une date dans les 25 dernières années
        return f.Date.PastDateOnly(25);
    }

    private decimal GenPrix(Faker f) 
    {
        //DECIMAL(5,2) => 0.00 et 999.99
        return f.Finance.Amount(0, 999.99m);
    }

    private short GenNbPage(Faker f) 
    {
        //Génère entre 20 et 5123 pages
        //TINYINT
        return f.Random.Short(20, 5123);
    }

    private string GenCategorie(Faker f)
    {
        //Selectionne une valeur dans la liste
        //highlight-next-line
        return f.PickRandom(_categories);
    }

    private int GenCollectionId(Faker f)
    {
        //Sélectionne un EditeurId dans la liste des CollectionId disponibles
        return f.PickRandom(_lstCollectionId);
    }

    private int GenEditeurId(Faker f)
    {
        //Sélectionne un EditeurId dans la liste des EditeurId disponibles
        return f.PickRandom(_lstEditeurId);
    }

//highlight-start
    private void GenAuteurs(Livre livre)
    {
        //Vérifie si la liste d'auteur n'est pas vide
        if (_lstAuteur.Count > 0)
        {
            //La liste d'auteur n'est pas vide

            //Créer un Faker pour avoir un générateur de nombre
            Faker f = new Faker();
            //Permet de choisir entre 1 et 3 auteurs. S'il y a moins que 3 auteurs, le nombre maximum sera le nombre d'auteurs.
            int nbAuteur = f.Random.Number(1, Math.Min(_lstAuteur.Count, 3));
            
            //Le code ci-dessous permet de s'assurer que le même auteur n'est pas pigé plusieurs fois.
            do
            {
                Auteur auteurSelectionne = f.PickRandom(_lstAuteur);

                if (livre.Auteur.Contains(auteurSelectionne) == false)
                {
                    //L'auteur sélectionné est un nouvel auteur                
                    livre.Auteur.Add(auteurSelectionne);
                    nbAuteur--;
                }

            } while (nbAuteur > 0);            
        }
    }
    //highlight-end
}
```

Il y a maintenant un attribut **List\<Auteur> _lstAuteur** qui contient les auteurs disponibles et sa méthode d'assignation.

Dans ce cas, il est important que ce soit l'objet **Auteur** et non seulement les **Id**, car **Entity Framework** ne peut pas ajouter directement des enregistrements à partir de la clé, mais à partir de l'objet.

```csharp title="Ne pas copier, c'est déjà dans le code"
private List<Auteur> _lstAuteur = new List<Auteur>();

/***/
public void AssignerListeAuteur(List<Auteur> lstAuteur)
{
    //Ce n'est pas des Id, mais une liste des enregistrements Auteur.
    _lstAuteur.Clear();
    _lstAuteur.AddRange(lstAuteur);
}
```

Ensuite, il y a la méthode **GenAuteurs()** qui permet de choisir la liste des auteurs de ce livre.

La méthode reçoit en paramètre l'objet **Livre** en cours de génération.

À la ligne 11, le nombre d'auteurs pour ce livre est choisi au hasard. Il serait intéressant de favoriser 1 auteur seulement par rapport à 2 ou 3. Mais pour simplifier, chaque nombre aura la même probabilité.

Il y a une protection pour éviter de sélectionner 2 fois le même auteur. La méthode **PickRandom()** peut choisir le même élément plus d'une fois. Entre les lignes 14 et 25, c'est la boucle de sélection. La vérification se fait à la ligne 18.

```csharp showLineNumbers title="Ne pas copier, c'est déjà dans le code"
private void GenAuteurs(Livre livre)
{
    //Vérifie si la liste d'auteur n'est pas vide
    if (_lstAuteur.Count > 0)
    {
        //La liste d'auteur n'est pas vide

        //Créer un Faker pour avoir un générateur de nombre
        Faker f = new Faker();
        //Permet de choisir entre 1 et 3 auteurs. S'il y a moins que 3 auteurs, le nombre maximum sera le nombre d'auteurs.
        int nbAuteur = f.Random.Number(1, Math.Min(_lstAuteur.Count, 3));
        
        //Le code ci-dessous permet de s'assurer que le même auteur n'est pas pigé plusieurs fois.
        do
        {
            Auteur auteurSelectionne = f.PickRandom(_lstAuteur);

            if (livre.Auteur.Contains(auteurSelectionne) == false)
            {
                //L'auteur sélectionné est un nouvel auteur                
                livre.Auteur.Add(auteurSelectionne);
                nbAuteur--;
            }

        } while (nbAuteur > 0);            
    }
}
```

La méthode **Generer()** est modifiée. Il n'est pas possible de mettre dans le constructeur une règle **RuleFor** pour l'ajout dans une collection. La méthode **RuleFor** permet de faire des assignations uniquement.

Il faut donc générer un objet **Livre** et ensuite ajouter les auteurs avant de le retourner.

```csharp title="Ne pas copier, c'est déjà dans le code"
public Livre Generer()
{
    //Génère un livre
    Livre livre =  base.Generate();

    //Assigne des auteurs
    GenAuteurs(livre);

    //Retourne l'objet livre complet
    return livre;
}
```

## Test

:::warning Attention
Avant d'exécuter ce code, vider la table Livre
:::

Modifiez le fichier **Program.cs**.

```csharp
using GenerateurBDGestionLivre;
using GenerateurBDGestionLivre.Data;
using GenerateurBDGestionLivre.Data.Context;

using (GestionLivreContext db = new GestionLivreContext())
{
    LivreGenerateur generateur = new LivreGenerateur();

    //Obtenir la liste des clés EditeurId dans la base de de données
    List<int> lstEditeurId = db.Editeur.Select(e => e.EditeurId).ToList();
    //Assigner la liste dans le générateur
    generateur.AssignerListeEditeurId(lstEditeurId);

    //Obtenir la liste des clés CollectionId dans la base de de données
    List<int> lstCollectionId = db.Collection.Select(c => c.CollectionId).ToList();
    //Assigner la liste dans le générateur    
    generateur.AssignerListeCollectionId(lstCollectionId);

    //Obtenir la liste des auteurs
    List<Auteur> lstAuteur = db.Auteur.ToList();
    //Assigner la liste dans le générateur    
    generateur.AssignerListeAuteur(lstAuteur);


    for (int i = 0; i < 5; i++)
    {
        Livre livre = generateur.Generer();        

        Console.WriteLine($"Titre : {livre.Titre}");
        Console.WriteLine($"Résumé : {livre.Resume}");
        Console.WriteLine($"Date publication : {livre.DatePublication}");
        Console.WriteLine($"Prix : {livre.Prix}");
        Console.WriteLine($"Nombre de pages : {livre.NbPage}");
        Console.WriteLine($"Catégories : {livre.Categorie}");
        Console.WriteLine($"CollectionId : {livre.CollectionId}");
        Console.WriteLine($"EditeurId : {livre.EditeurId}");

        Console.WriteLine();

        //Ajoute dans la base de données
        db.Add(livre);
        //Enregistre dans la base de données
        db.SaveChanges();
    }
}
```

Dans **SSMS**, effectuez cette requête. Vous devriez voir des enregistrements.

```sql
SELECT * FROM LivreAuteur;
```

:::info

Le générateur peut générer des livres après la mort d'un auteur. Ce n'est pas très logique. Il serait possible de régler ce problème, mais le générateur serait un peu plus complexe. Il faudrait faire de la vérification intertable. 
:::

## Table Magasin et Inventaire

La table **Inventaire** est une table pivot entre **Magasin** et **Livre**, mais elle a une propriété **Quantite**.

La classe **Inventaire** existe dans le **contexte**.

Il serait possible de générer **Inventaire** en recevant la liste de **MagasinId** et de **LivreId**. Par contre, il serait possible que le couple **MagasinId, LivreId** soit généré au hasard plus d'une fois. Donc l'enregistrement serait refusé par la base de données.

Il faut donc générer **Inventaire** à partir de **Magasin** ou de **Livre**. Étant donné que **Livre** s'occupe des auteurs, ce sera **Magasin** qui s'en occupera pour cet exemple.

La table **Inventaire** a ses propres champs. Il faut donc créer une classe **InventaireGenerateur** également. 

### MagaginGenerateur

La table possède 4 champs.

- **Nom**

  Le module **Company** permet de générer un nom de compagnie.

- **Adresse**

  Le module **Adresse** permet de générer une adresse pour une rue.

- **Ville**

  Le module **Adresse** permet de générer un nom de ville.

- **CodePostal**

  Le module **Adresse** permet de générer un code postal selon un format.

Créez la classe **MagasinGenerateur**.

```csharp
using Bogus;
using GenerateurBDGestionLivre.Data;

namespace GenerateurBDGestionLivre;

public class MagasinGenerateur : Faker<Magasin>
{
	public MagasinGenerateur()
	{
		RuleFor(i => i.Nom, GenNom);
        RuleFor(i => i.Adresse, GenAdresse);
        RuleFor(i => i.Ville, GenVille);
        RuleFor(i => i.CodePostal, GenPostalCode);
    }

	public Magasin Generer()
	{
		return base.Generate();
	}

	private string GenNom(Faker f)
	{
        //VARCHAR(150)
        return f.Company.CompanyName().Tronquer(150)!;
	}

	private string GenAdresse(Faker f)
	{
		//VARCHAR(100)
		return f.Address.StreetAddress().Tronquer(100)!;
	}

	private string GenVille(Faker f)
	{
		//VARCAHR(100)
		return f.Address.City().Tronquer(100)!;
	}

	private string GenPostalCode(Faker f)
	{
		//Format A0A 0A0
		//? = Lettre
		//# = Chiffre
		return f.Address.ZipCode("?#? #?#");
	}

}
```

### InventaireGenerateur

La table **Inventaire** possède 3 champs.

- **LivreId**

  La clé étrangère sera sélectionnée à partir des clés qui auront été assignées au générateur.

- **MagasinId**

  La référence avec la table **Magasin** se fera par la propriété de navigation. Le générateur s'occupera de générer les inventaires pour un magasin.

- **Quantite**

  Un générateur de nombre permettra de créer une quantité.

Créez la classe **InventaireGenerateur**.

```csharp
using Bogus;
using GenerateurBDGestionLivre.Data;

namespace GenerateurBDGestionLivre;

public class InventaireGenerateur : Faker<Inventaire>
{
	private List<int> _lstLivreId = new List<int>();

	public InventaireGenerateur()
	{
        RuleFor(i => i.Quantite, GenQuantite);
        RuleFor(i => i.LivreId, GenLivreId);
	}

    public void Generer(Magasin magasin, int min, int max)
    {
        Faker f = new Faker();

        //Détermine le nombre d'inventaires à générer pour ce magasin
        int nbInventaire = f.Random.Number(min, max);

        //Le code ci-dessous permet de s'assurer que le même LivreId n'est pas pigé plusieurs fois.
        List<int> lstLivreIdUtilise = new List<int>();
        do
        {
            Inventaire inventaire = base.Generate();

            //Vérifie s'il y a un inventaire pour ce magasin qui a déjà ce livre
            if (magasin.Inventaire.Count(i => i.LivreId == inventaire.LivreId) == 0)
            {
                //Le livre n'a jamais été utilisé pour un inventaire de ce magasin
                //L'inventaire est ajouté à la base de données, en assignant le MagasinId du magasin en cours
                magasin.Inventaire.Add(inventaire);

                nbInventaire--;
            }

        } while (nbInventaire > 0);
    }

    public void AssignerListeLivreId(List<int> lstLivreId)
    {
        _lstLivreId.Clear();
        _lstLivreId.AddRange(lstLivreId);
    }

    private short GenQuantite(Faker f)
    {
        return f.Random.Short(0, 453);
    }

    private int GenLivreId(Faker f)
    {
        return f.PickRandom(_lstLivreId);
    }
}
```

En gros, il s'agit d'un générateur comme les autres avec une assignation de dépendances.

Par contre, la méthode **Generer()** est différente.

La méthode reçoit en paramètre un **Magasin**, une quantité minimum et maximum à générer.

Les inventaires sont créés en sélectionnant un livre dans la liste des clés disponibles et en créant une quantité.

Avant d'ajouter l'inventaire à la liste des inventaires de ce magasin, il faut s'assurer que le livre en question n'est pas déjà dans un inventaire du magasin.

L'inventaire est ajouté à la collection **Inventaire** de l'objet **Magasin**. Cette étape permet d'assigner le champ **MagasinId** à l'enregistrement **Inventaire**.


### Test

La mécanique est différente pour le **Program.cs**.

```csharp showLineNumbers
using GenerateurBDGestionLivre;
using GenerateurBDGestionLivre.Data;
using GenerateurBDGestionLivre.Data.Context;

using (GestionLivreContext db = new GestionLivreContext())
{
    MagasinGenerateur magasinGenerateur = new MagasinGenerateur();
    
    //Obtenir la liste des clés EditeurId dans la base de de données
    List<int> lstLivreId = db.Livre.Select(l => l.LivreId).ToList();

    InventaireGenerateur inventaireGenerateur = new InventaireGenerateur();
    inventaireGenerateur.AssignerListeLivreId(lstLivreId);


    for (int i = 0; i < 50; i++)
    {
        //Génère un magasin
        Magasin magasin = magasinGenerateur.Generer();

        //Génère les inventaires pour ce magasin
        //Il peut avoir entre 1 et tous les livres en inventaire pour ce magasin.
        inventaireGenerateur.Generer(magasin, 1, lstLivreId.Count);

        Console.WriteLine($"Nom : {magasin.Nom}");
        Console.WriteLine($"Adresse : {magasin.Adresse}");
        Console.WriteLine($"Ville : {magasin.Ville}");
        Console.WriteLine($"Code Postal : {magasin.CodePostal}");

        Console.WriteLine();

        //Ajoute dans la base de données
        //Les inventaires associés à ce magasin seront également ajoutés
        db.Add(magasin);
        //Enregistre dans la base de données
        db.SaveChanges();
    }
}
```

Il faut créer les 2 générateurs.

Dans le générateur **InventaireGenerateur**, il faut assigner la liste des livres qui existent déjà dans la base de données.

À la ligne 19, un magasin est généré à partir du générateur **MagasinGenerateur**.

Ensuite, à la ligne 23, les inventaires pour ce magasin sont générés.

Finalement, aux lignes 34 et 36, le magasin est ajouté dans le contexte et ensuite enregistré dans la base de données. Les inventaires qui ont été ajoutés dans la propriété **Magasin.Inventaire** sont également ajoutés. **Entity Framework** est en mesure d'assigner le **MagasinId** autogéréné à tous les enregistrements de la table **Inventaire**.
