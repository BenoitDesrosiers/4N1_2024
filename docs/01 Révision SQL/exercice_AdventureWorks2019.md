---
sidebar_position: 4
---

# Exercices AdventureWorks2019

**AdventureWorks** est une base de données fictives distribuée par **Microsoft**. Malheureusement, il est difficile d'obtenir de la documentation à jour.

- Diagramme complet - Adventure Works - 2008

  Version 2008 du diagramme complet de la base de données. Certains correctifs ont été mis à la main.

<img src="/4N1_2024/img/adventureworks2008_schema-1.gif"  />


- Diagramme - Schéma Person - 2019

Diagramme généré par SQL Server pour la version 2019. Le diagramme contient uniquement les tables du schéma Person.

<img src="/4N1_2024/img/person.png"  />

  

- [Dictionnaire de données 2014](/4N1_2024/img/AdventureWorks_DataDictionary.pdf)

  Document qui contient l'explication de chacune des tables et des champs pour la version 2014.

Pour avoir une explication de sa conception : https://docs.microsoft.com/fr-ca/previous-versions/sql/sql-server-2008/ms124825(v=sql.100)?redirectedfrom=MSDN

Notez que l'article date de 2010, il est possible que certains éléments ne soient pas identiques.

## Installation sur SQL Express sur votre ordinateur (optionnel)

Téléchargez le fichier de la base de données : https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorks2019.bak

Copiez le fichier dans ce dossier **`C:\Backup\AdventureWorks2019.bak`**

Pour faire la restauration, faites l'une des procédures ci-dessous

- Interface graphique : https://docs.microsoft.com/fr-ca/sql/samples/adventureworks-install-configure?view=sql-server-ver15&tabs=ssms#tabpanel_1_ssms

- Script T-SQL

  ```sql
  USE [master]
  RESTORE DATABASE [AdventureWorks2019] 
  FROM  DISK = N'C:\Backup\AdventureWorks2019.bak'
  WITH  FILE = 1,  NOUNLOAD,  STATS = 5
  GO
  ```

## SSMS

Pour ces exercices, vous pouvez utiliser SSMS

## Serveur départemental

Vous devriez avoir accès à une base de données nommée **e*DA*_AdventureWorks2019**. Si votre DA est 1234567, la base de données sera **e1234567_AdventureWorks2019**.


## Schéma

```sql
SELECT * FROM Person.Person
```

Le nom de la table **Person** était répété… pourquoi?

En réalité, ce n’est pas le nom de la table qui est répété, c’est le nom du schéma qui est préfixé au nom de la table. Un schéma est simplement un regroupement d’objets. Chacune des tables est dans un schéma, indiqué entre parenthèses après le nom de la table dans l’explorateur de serveurs. Un schéma est similaire à un **namespace** dans un langage de programmation. Il permet de grouper des tables afin d’éliminer les conflits de noms. Il permet aussi de mettre des protections groupées.

Lorsqu'aucun **schéma** n'est spécifié lors de la création d'une table, le **schéma** par défaut est **dbo**.

Pour en savoir plus : https://www.youtube.com/watch?v=bbpxxnEMda4

## Exercices sur `SELECT`

Utilisez la base de données **AdventureWorks** pour tous les exercices de **`SELECT`**. 

Nous allons utiliser seulement les tables du schéma **Person**.


### Exercice 1

Sélectionnez toutes les personnes que leur type de personne est **SP**. 

Affichez uniquement  la **clé primaire**, le **prénom** et **nom**.

Vous devriez avoir 17 lignes.

<details>
  <summary>Solution</summary>

```sql
SELECT
	BusinessEntityID, 
	FirstName, 
	LastName  
FROM Person.Person 
WHERE PersonType = 'SP';
```

</details>


### Exercice 2

Modifiez la requête 1.

Affichez également le **type de personne**.

Ajoutez un tri en ordre **croissant** avec le **nom** et ensuite le **prénom**.

Sélectionnez ceux qui ont le type de personne est **SP** ou **EM**. 

Vous devriez avoir 290 lignes.

<details>
  <summary>Solution</summary>

```sql
SELECT
	BusinessEntityID, 
	FirstName, 
	LastName  
FROM Person.Person 
WHERE 
	PersonType = 'SP' OR 
	PersonType = 'EM'
ORDER BY
	LastName,
	FirstName;
```

</details>

### Exercice 3

Modifiez la requête 2 et utilisez l'alias **p** pour la table **Person**.

Les colonnes du **`SELECT`** doivent utiliser cet alias.

Sélectionnez ceux qui ont le type de personne est **SP** ou **EM** et que leur prénom commence par la lettre **A** ou **C**.

Vous devriez avoir 28 lignes.

<details>
  <summary>Solution</summary>

```sql
SELECT
	p.BusinessEntityID, 
	p.FirstName, 
	p.LastName  
FROM Person.Person p
WHERE 
	(
		p.PersonType = 'SP' OR 
		p.PersonType = 'EM'
	) AND
	(
		p.FirstName LIKE 'A%' OR
		p.FirstName LIKE 'C%'
	)
ORDER BY
	p.LastName,
    p.FirstName;
```

</details>

### Exercice 4

Affichez le prénom, nom et l'adresse courriel d'une personne.

Vous devez faire une jointure entre 2 tables: Person et EmailAddress.

Utilisez **`sp_help`** pour connaitre les clés pour la jointure entre EmailAddress et Person.

<details>
  <summary>Solution pour sp_help</summary>
  ```sql
  sp_help 'Person.EmailAddress'
  ```

Dans la section **constraint_type** vous y trouverez les **FOREIGN KEY**
</details>
Vous devriez avoir 19 972 lignes.

<details>
  <summary>Solution</summary>

```sql
SELECT 
	p.BusinessEntityID,
	p.FirstName, 
	p.LastName, 
	e.EmailAddress
FROM Person.Person p
INNER JOIN Person.EmailAddress e ON P.BusinessEntityID = e.BusinessEntityID;

```

</details>

### Exercice 5

Affichez le prénom, nom et le type de contact de la personne.

Utilisez l'alias **ContactTypeName** pour le nom du type contact.

Vous devez faire une jointure entre 3 tables.

Vous devriez avoir 909 lignes.

<details>
  <summary>Solution</summary>

```sql
SELECT 
	p.BusinessEntityID, 
	p.FirstName, 
	p.LastName, 
	c.Name AS ContactName
FROM Person.Person p
INNER JOIN Person.BusinessEntityContact b ON p.BusinessEntityID = b.PersonID
INNER JOIN Person.ContactType c ON b.ContactTypeID = c.ContactTypeID;

```

</details>

### Exercice 6

Refaites l'exercice précédent, mais si la personne n'a pas de type de contact, il faut tout de même afficher la ligne.

:::tip

 relire sur LEFT OUTER JOIN si nécessaire

 https://sql.sh/cours/jointures/left-join

:::

Pour le nom du type de contact, affichez **Aucun type** lorsque la valeur est **null**.

:::tip

 Utilisez ce site pour vous aider pour le **null** : https://sql.sh/fonctions/isnull

:::



Vous devriez avoir 19 972 lignes.

<details>
  <summary>Solution</summary>

```sql
SELECT 
	p.BusinessEntityID, 
	p.FirstName, 
	p.LastName, 
	ISNULL(c.Name, 'Aucun type') AS ContactName
FROM Person.Person p
LEFT OUTER JOIN Person.BusinessEntityContact b ON p.BusinessEntityID = b.PersonID
LEFT OUTER JOIN Person.ContactType c ON b.ContactTypeID = c.ContactTypeID;

```

</details>

### Exercice 7

Fusionnez la requête 4 et 6 pour afficher le prénom, nom, courriel et le type de contact de la personne.

Vous devriez avoir 19 972 lignes.

<details>
  <summary>Solution</summary>

```sql
SELECT 
	p.BusinessEntityID, 
	p.FirstName, 
	p.LastName, 
	e.EmailAddress,
	ISNULL(c.Name, 'Aucun type') AS ContactName
FROM Person.Person p
INNER JOIN Person.EmailAddress e ON P.BusinessEntityID = e.BusinessEntityID
LEFT OUTER JOIN Person.BusinessEntityContact b ON p.BusinessEntityID = b.PersonID
LEFT OUTER JOIN Person.ContactType c ON b.ContactTypeID = c.ContactTypeID;

```

</details>

### Exercice 8

Affichez toutes les personnes qui désirent recevoir des courriels de promotion.

Référez-vous au document **AdventureWorks_DataDictionary.pdf** pour avoir la description des champs de la table **Person** afin de savoir quelles valeurs sont utilisées pour indiquer qu'une personne désire recevoir des courriels de promotion.

Vous devriez obtenir 8 814 lignes.

<details>
  <summary>Solution</summary>

```sql
SELECT 
	p.BusinessEntityID, 
	p.FirstName, 
	p.LastName,  
	p.EmailPromotion
FROM Person.Person p
WHERE 
	p.EmailPromotion = 1 OR 
	p.EmailPromotion = 2;
```

</details>

### Exercice 9

Affichez le nombre de personnes pour chacun des choix des courriels de promotion.

La requête doit afficher le choix dans une colonne et le nombre de personnes dans la 2e. 

Utilisez un alias pour renommer la colonne du nombre de personnes par **NbPersonne**.

Triez par le nombre de personnes, en ordre croissant.

<details>
  <summary>Solution</summary>

```sql
SELECT
	p.EmailPromotion,
	COUNT(p.BusinessEntityID) AS NbPersonne
FROM Person.Person p
GROUP BY p.EmailPromotion
ORDER BY COUNT(p.BusinessEntityID);
```

</details>

### Exercice 10

Refaites la requête 9, mais au lieu d'afficher uniquement le chiffre du choix, nous allons mettre un descriptif.

:::tip

Il faudra utiliser un **`CASE`** dans le **`SELECT`**. 

Voir le site : https://sql.sh/cours/case

:::

La colonne de description doit avoir comme alias **ChoixPromotion**.

Le résultat doit sortir comme ci-dessous.

| EmailPromotion | ChoixPromotion                | NbPersonne |
| -------------- | ----------------------------- | ---------- |
| 0              | Aucune                        |            |
| 1              | AdventureWorks seulement      |            |
| 2              | AdventureWorks et partenaires |            |

<details>
  <summary>Solution</summary>

```sql
SELECT
	p.EmailPromotion,
	CASE 
		WHEN p.EmailPromotion = 0 THEN 'Aucune'
		WHEN p.EmailPromotion = 2 THEN 'AdventureWorks seulement'
		ELSE 'AdventureWorks et partenaires'
	END AS ChoixPromotion,
	COUNT(p.BusinessEntityID) AS NbPersonne
FROM Person.Person p
GROUP BY p.EmailPromotion
ORDER BY COUNT(p.BusinessEntityID);

```

</details>

### Exercice 11

Affichez la clé, le prénom, le nom, l'adresse, la province, le pays et le code postal de toutes les personnes.

Vous devez afficher uniquement les personnes qui répondent à l'un des 3 critères ci-dessous :

- La province est **Québec** et Code postal commence par **J4Z**
- L'état est **Californie** et leur nom de famille se termine par **S**
- Leur pays est **Australie**

Vous devriez avoir 4 522 lignes.

<details>
  <summary>Solution</summary>

```sql
SELECT 
	p.BusinessEntityID,
	p.FirstName,
	p.LastName,
	a.AddressLine1,
	a.PostalCode,
	s.Name AS Province,
	c.Name AS Pays
FROM Person.Person P
INNER JOIN Person.BusinessEntity be ON p.BusinessEntityID = be.BusinessEntityID
INNER JOIN Person.BusinessEntityAddress bea ON be.BusinessEntityID = bea.BusinessEntityID
INNER JOIN Person.Address a ON bea.AddressID = a.AddressID
INNER JOIN Person.StateProvince s ON a.StateProvinceID = s.StateProvinceID
INNER JOIN Person.CountryRegion c ON c.CountryRegionCode = s.CountryRegionCode
WHERE
	(
		a.PostalCode like 'J4Z%' AND
		s.StateProvinceCode = 'QC'
	) OR
	(
		p.LastName like '%s' AND
		s.StateProvinceCode = 'CA'
	) OR
	c.CountryRegionCode = 'AU';
```

</details>
