---
sidebar_position: 2
---

# Introduction à LINQ

**LINQ** ou Language Integrated Query dans sa forme longue est un langage de requêtes créé par Microsoft.

**LINQ** est souvent associé à l'**ORM Entity Framework**. **LINQ** est bien le langage de requêtes utilisé pour interroger une base de données via **Entity Framework**, mais il ne se limite pas seulement à cette technologie.

Il faut voir **LINQ** comme un langage de requêtes qui permet d'interagir avec des **objets**. Une base de données n'est aucunement nécessaire pour son utilisation. **Entity Framework** modélise la base de données en objets.



# LINQ

Pour être en mesure d'avoir accès aux requêtes LINQ, il faut ajouter la référence **System.Linq** à la classe.

```csharp
using System.Data.Linq;
```

**LINQ** utilise l'extension de méthodes pour ajouter des méthodes additionnelles à certaines collections. Ce concept sera étudié plus tard dans la session. 

La collection la plus utilisée sous **LINQ** est la **`List<T>`**.

Il existe 2 types de syntaxes pour effectuer des requêtes LINQ.

- **Syntaxe de requête (Query syntax)**

  ```csharp
  Personne personne = (from lqPersonne in list
                       where
                           lqPersonne.Id == 2
                       select
                           lqPersonne).FirstOrDefault();					 	
  ```

  En **SQL**, la syntaxe serait comme ceci

  ```sql
  SELECT TOP 1 * FROM list WHERE Id = 2
  ```

  Il faut lire la **syntaxe Query** comme ceci.

  **`from lqPersonne in list`** => Pour chacun des éléments de **`list`**, met l'item dans la variable **`lqPersonne`**.

  **`where lqPersonne.Id == 2`** => Qui ont le **Id** égale à **2**.

  **`select lqPersonne` ** => Ajoute l'objet **lqPersonne** dans les items à retourner.

  Il ne faut pas confondre le **`from`** de **LINQ** du **`from`** de **SQL**.

  Dans la documentation, la variable du **`from`** est souvent une seule lettre.

  Il est préférable d'avoir un nom significatif, car pour les requêtes complexes, le mélange des variables deviendra incompréhensible.

  Le préfixe **lq** sera utilisé pour indiquer que c'est une variable dans une requête **LINQ**.

- **Syntaxe Lambda**

  ```csharp
  Personne personne = list.Where(lqPersonne => lqPersonne.Id == 2).FirstOrDefault();
  ```

Les deux bouts de code ci-dessus sont équivalents. 

La **syntaxe Query** ressemble plus à **SQL** et elle est un peu plus intuitive et plus simple à faire lorsqu'elles sont complexes.

La **Syntaxe Lambda** est plus compacte et elle est parfois plus simple pour les requêtes simples.

## Sélection unique `FirstOrDefault()` et `LastOrDefault()`

La méthode **`FirstOrDefault`** permet de retourner le premier élément en fonction de la recherche demandée. 

La méthode **`LastOrDefault`** permet de retourner le premier élément en fonction de la recherche demandée. 

Si aucun élément n’est trouvé, ce sera la valeur par défaut qui sera retournée. 

Dans le cas d'un objet, ce sera **null**. Dans le cas d'un type primitif, ce sera la valeur par défaut du type.

```csharp
List<int> listInt = new List<int>();
listInt.Add(13);
listInt.Add(6);
listInt.Add(9);

//Lambda
int premierLambda = listInt.FirstOrDefault(); //13
int dernierLambda = listInt.LastOrDefault(); //9

//Query
int premierQuery = (from lqInt in listInt select lqInt).FirstOrDefault(); //13
int dernierQuery = (from lqInt in listInt select lqInt).LastOrDefault(); //9
```

Il est possible de forcer une valeur par défaut en mettant la valeur en paramètre.

```csharp
List<int> listInt = new List<int>();
int default = listInt.FirstOrDefault(); //0
int defaultSpecifique = listInt.FirstOrDefault(9); //9
```

La clause **`where`** permet de spécifier les conditions de sélection.

```csharp
Personne personne1 = new Personne();
personne1.Id = 1;
personne1.Prenom = "François";
personne1.Nom = "St-Hilaire";

Personne personne2 = new Personne();
personne2.Id = 2;
personne2.Prenom = "Stéphane";
personne2.Nom = "Janvier";

Personne personne3 = new Personne();
personne3.Id = 3;
personne3.Prenom = "François";
personne3.Nom = "Morin";

List<Personne> list = new List<Personne>(); 
list.Add(personne1);
list.Add(personne2);
list.Add(personne3);

//Query
Personne premierQuery = (from lqPersonne in list
	                     where
     	                    lqPersonne.Prenom == "François"
         	             select
              	            lqPersonne).FirstOrDefault(); //Retourne François St-Hilaire

//Lambda
Personne premierLambda = list.where(lqPersonne.Prenom == "François").FirstOrDefault();
```

Dans le cas qu'il y a plusieurs conditions, il faut utiliser le **`&&`** et le **`||`** comme pour un **`if`**

```csharp
//Query
Personne premierQuery = (from lqPersonne in list
       		             where
            		          lqPersonne.Prenom == "François" &&
		                      lqPersonne.Id > 1
        	              select
		                      lqPersonne).FirstOrDefault(); //François
//Lambda
Personne premierLambda = list.where(lqPersonne.Prenom == "François" && lqPersonne.Id > 1).FirstOrDefault();
```

## Sélection multiple **`ToList()`**

La méthode **`ToList()`** permet de détourner tous les items qui correspondent aux critères de la requête dans une **`List<T>`**.

```csharp
//Query
List<Personne> lstQuery = (from lqPersonne in list
	                       where
      	                      lqPersonne.Prenom == "François"
           	               select
              	              lqPersonne).ToList(); //Retourne François St-Hilaire et François Morin

//Lambda
List<Personne> lstLambda = list.where(lqPersonne.Prenom == "François").ToList();
```

Dans le cas que la requête retourne uniquement 1 seul item, la liste contiendra 1 seul item.

```csharp
//Query
List<Personne> lstQuery = (from lqPersonne in list
	                       where
      	                      lqPersonne.Prenom == "Stéphane"
           	               select
              	              lqPersonne).ToList(); //Retourne Stéphane Janvier

//Lambda
List<Personne> lstLambda = list.where(lqPersonne.Prenom == "Stéphane").ToList();

Console.WriteLine(lstQuery.Count); //Retoune 1
```

Dans le cas que la requête ne retourne aucun item, la liste sera vide. **LINQ** ne retourne pas de liste **`null`**.

```csharp
//Query
List<Personne> lstQuery = (from lqPersonne in list
	                       where
      	                      lqPersonne.Prenom == "Benoit" ||
	                          lqPersonne.Prenom == "Louis" ||
   	                          lqPersonne.Prenom == "Frederic" ||
           	               select
              	              lqPersonne).ToList(); //Retourne rien

//Lambda
List<Personne> lstLambda = list.where(lqPersonne.Prenom == "Benoit" || lqPersonne.Prenom == "Louis" || lqPersonne.Prenom == "Frederic").ToList();

Console.WriteLine(lstQuery.Count); //Retoune 0
```

## Tri `OrderBy`

Pour effectuer un tri sur une requête, il est plus facile d'utiliser la **syntaxe Query** que la **syntaxe Lambda**.

Pour trier la liste de **Personne** en fonction du **nom** en ordre **croissant**.

```csharp
//Query
List<Personne> lstTriQuery = (from lqPersonne in list
                              orderby
                                lqPersonne.Nom 
                              select
                                lqPersonne).ToList();

//Lambda
 List<Personne> lstTriLambda = list.OrderBy(lqPersonne => lqPersonne.Nom).ToList();
```

Pour trier la liste de **Personne** en fonction du **nom** en ordre **décroissant**.

```
//Query
List<Personne> lstTriQuery = (from lqPersonne in list
                              orderby
                                lqPersonne.Nom descending
                              select
                                lqPersonne).ToList();

//Lambda
 List<Personne> lstTriLambda = list.OrderByDescending(lqPersonne => lqPersonne.Nom).ToList();
```

Pour un seul item, ce n'est pas très compliqué le **Lambda**. Mais pour plusieurs critères voici la syntaxe. 

Le tri sera fait en ordre croissant pour le **Prenom** et ensuite le **Nom**.

```csharp
List<Personne> lstTriQuery = (from lqPersonne in list
                              orderby
                                lqPersonne.Prenom,
                                lqPersonne.Nom
                              select
                                lqPersonne).ToList();

List<Personne> lstTriLambda = list.OrderBy(lqPersonne => lqPersonne.Prenom).ThenBy(lqPersonne => lqPersonne.Nom).ToList();
```

Il n'est pas possible de les regrouper tous les champs dans la méthode **`OrderBy`** ou **`OrderByDescending`**. Il faut ajouter la méthode **`ThenBy`** ou **`ThenByDescending`** pour chacun des champs additionnels.

```csharp
List<Personne> lstTriQuery = (from lqPersonne in list
                              orderby
                                lqPersonne.Prenom,
                                lqPersonne.Nom descending
                              select
                                lqPersonne).ToList();

List<Personne> lstTriLambda = list.OrderBy(lqPersonne => lqPersonne.Prenom).ThenByDescending(lqPersonne => lqPersonne.Nom).ToList();
```

La liste peut devenir longue si le nombre de champs pour le tri est énorme.

## CountIf **`Count()`**

Il est possible de faire un **CountIf** avec **LINQ**. Il faut utiliser la méthode **Count()**.

Pour le **CountIf** il est plus efficace d'utiliser la **syntaxe Lamba**.

Par exemple, il faut obtenir le nombre de **Personne** avec le **prénom** François.

```csharp
//Query
int nbFrancoisQuery = (from lqPersonne in list
                       where
                            lqPersonne.Prenom == "François"
                       select
                            lqPersonne).Count(); //Retourne 2

//Lambda
int nbFrancoisLambda = lstTriLambda.Count(lqPersonne => lqPersonne.Prenom == "François"); //Retourne 2
```

Avec la syntaxe **Lambda**, il est possible de mettre la condition directement dans la méthode **`Count()`**.

## Objet dynamique

Il est possible de créer des objets **dynamiquement** avec C#. Pour **LINQ**, cette fonctionnalité peut être très pratique, car il permet d'éviter de créer un objet pour tous les types de requêtes.

Par contre, l'utilisation d'objets dynamiques fonctionne uniquement si celui-ci est utilisé uniquement dans le bloc de code. S'il doit être retourné dans une méthode ou utilisé comme paramètre, son utilisation ne fonctionne plus.

Pour créer un objet dynamique, il faut utiliser le type **`var`**.

```csharp
var personne = new
{
    NomComplet = "François St-Hilaire",
    Age = 22
};
//var est un type anonyme string, int
```

Dans le cas de la liste de Personne, s'il faut retourner un objet contenant le nom complet dans une seule propriété, il est possible de le faire avec un objet dynamique.

```csharp
//Query
var lstDynQuery = (from lqPersonne in list
                   select new
                   {
                       Id = lqPersonne.Id,
                       Nom = $"{lqPersonne.Prenom} {lqPersonne.Nom}"
                   }).ToList();

//Lambda
var lstDynLambda = list.Select(lqPersonne => new { Id = lqPersonne.Id, Nom = $"{lqPersonne.Prenom} {lqPersonne.Nom}" }).ToList();
```

Le type **`var`** dans ce contexte est une **`List<>`** d'un objet dynamique **`int`**, **`string`**.

## Éléments distincts

Avec les listes, il est possible d'obtenir les éléments distincts s'il y a des doublons.

```csharp
List<int> liste = new List<int> { 1, 1, 3, 4, 6, 7, 3, 6 };
List<int> listeDistinct = liste.Distinct().ToList(); // 1, 3, 4, 6, 7
```

Pour les classes, il faut ajouter implémenter les méthodes **`Equals`** et **`GetHashCode`** pour être en mesure d'utiliser le **`Distinct`**.

## Théorie des ensembles - Intersection

Il est possible de trouver les éléments communs dans les 2 listes grâce à la théorique des ensembles.

La méthode **`Intersect`** permet de voir l'intersection des 2 listes.

```csharp
List<int> liste1 = new List<int> { 1, 3, 4, 6, 7 };
List<int> liste2 = new List<int> { 1, 2, 4, 5, 8, 9 };

List<int> listeIntersect = liste1.Intersect(liste2).ToList(); //1, 4 => liste1 ∩ liste2
```

## Théorie des ensembles - Union

Il est possible de regrouper tous les éléments des 2 listes grâce à la théorique des ensembles.

La méthode **`Union`** permet de voir l'intersection des 2 listes.

```csharp
List<int> liste1 = new List<int> { 1, 3, 4, 6, 7 };
List<int> liste2 = new List<int> { 1, 2, 4, 5, 8, 9 };

List<int> listeUnion = liste1.Union(liste2).ToList(); //1, 2, 3, 4, 5, 6, 7, 8, 9 => liste1 ∪ liste2
```

## Théorie des ensembles - Différence

Il est possible de trouver les éléments différents dans les 2 listes grâce à la théorique des ensembles.

La méthode **`Except`** permet de voir la différence entre les 2 listes.

```csharp
List<int> liste1 = new List<int> { 1, 3, 4, 6, 7 };
List<int> liste2 = new List<int> { 1, 2, 4, 5, 8, 9 };

List<int> listeDiff1 = liste1.Except(liste2).ToList(); //3, 6, 7 => liste1 \ liste2
List<int> listeDiff2 = liste2.Except(liste1).ToList(); //2, 5, 8, 9 =>  liste2 \ liste1
```

