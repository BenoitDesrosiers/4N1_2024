---
sidebar_position: 1
---

# Les Collections

Avant d'aborder LINQ, nous allons introduire un type de données qui est fréquemment utilisée avec LINQ: Les collections. 

## Création du projet

Pour faire les exercices, il faut créer une application console en **.NET 7**

Créez un projet.

<img src="/4N1_2024/img/04_projet_1.png" />


Sélectionnez le type **Application Console** en **C#**. Important, il ne faut pas avoir la mention **(.NET Framework)**.

<img src="/4N1_2024/img/S04_projet_2.png" />


Nommez le projet **ConsoleLINQ**.
<img src="/4N1_2024/img/04_projet_3.png" />


Sélectionnez l'infrastructure **.NET 7.0** et décochez **N'utilisez pas d'instructions de niveau supérieur.**
<img src="/4N1_2024/img/04_projet_4.png" />


## Collection en C#

Il existe plusieurs collections en C#. Nous allons en prendre quelques-unes pour les expliquer.

Pour plus d'information : https://docs.microsoft.com/fr-ca/dotnet/csharp/programming-guide/concepts/collections

### ArrayList

Un **ArrayList** est un tableau de **taille dynamique**. 

Elle peut contenir tous les types d'objets.

```csharp
ArrayList al = new ArrayList();
al.Add(100);
al.Add(200);
al.Add(300);
```

La signature de la méthode **Add** est **int Add(object? value)**. Cette collection est en mesure de contenir n'importe quoi.

```csharp
ArrayList al = new ArrayList();
al.Add(1);
al.Add("Bonjour");
al.Add(true);
```

Au niveau cohérence des données, ceci peut être un problème. 

Par exemple, il faut un tableau dynamique qui contient des entiers. Il y a un problème dans la méthode d'insertion et la donnée entrée en **string** par l'utilisateur n'a pas été transformée en **int**. La donnée sera tout de même dans la liste.

Il est possible d'accéder à un item de la collection en utilisant son index comme un tableau.

```csharp
ArrayList al = new ArrayList();
al.Add(100);
al.Add(200);
al.Add(300);

Console.WriteLine(al[1]); //200 est affiché dans la console
```

Il est possible de faire des recherches avec la méthode **IndexOf**.

```csharp
ArrayList al = new ArrayList();
al.Add(100);
al.Add(200);
al.Add(300);
al.Add(100);

int indexPremier = al.IndexOf(100); //Part du début
int indexDeuxieme = al.IndexOf(100, indexPremier + 1); //Commence après le premier trouvé

Console.WriteLine(indexPremier); //Affiche 0
Console.WriteLine(indexDeuxieme); //Affiche 3
```

Il peut être difficile de faire des recherches sur le contenu d'un objet.

Créez la classe **Personne**

Menu Projet/ajouter une classe. 


```csharp
public class Personne
{
    public int Id { get; set; }
    public string Prenom { get; set; }
    public string Nom { get; set; }
}
```

Ensuite, créez 2 personnes et ajoutez les dans la liste.

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
personne2.Id = 3;
personne2.Prenom = "François";
personne2.Nom = "Morin";

ArrayList al = new ArrayList();
al.Add(personne1);
al.Add(personne2);
al.Add(personne3);
```



Un **ArrayList** fonctionne comme un tableau, il est possible de récupérer un élément par un **index**. Étant donné que l'ArrayList peut contenir n'importe quel type d'objet, un **cast** doit être fait afin de ressortir une **Personne**. 

```csharp
Personne p = (Personne)al[0];
```

Pour obtenir le nombre d'éléments dans la collection , la propriété **Count** permet d'obtenir la quantité.

```csharp
int nb = al.Count;
```

Pour retrouver les personnes **François**, il n'y a pas de moyen efficace, à part de parcourir le **ArrayList** et de faire une vérification sur chacun des éléments.

Mais il existe d'autres types de listes que nous allons voir ci-bas.

## List\<T\>

La plus populaire est la **List\<T\>**. 

C# est en mesure d'utiliser des types génériques pour avoir un meilleur contrôle dans la cohérence des données internes.

La liste peut accepter uniquement des objets types **T**. Il s'agit d'un type générique.

Un type générique permet de faire abstraction du type dans le fonctionnement d'une classe.

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

// Notez ici que la liste porte le nom du type au pluriel car elle contient DES personneS.
// D'autres noms qui seraient intéressants: groupe, classe, employes ... 
List<Personne> personnes = new List<Personne\>(); 
personnes.Add(personne1);
personnes.Add(personne2);
personnes.Add(personne3);
```

La liste ci-dessus peut accepter uniquement des objets de type **Personne**, car **T** = **Personne**.

**List\<T\>** permet de faire des recherches avec des critères grace aux fonctions **Find**, **FindAll** etc.

```csharp
List<Personne> lesFrancois = personnes.FindAll(p => p.Prenom == "François");
```

:::note
Ici, le paramètre de FindAll est un **prédicat** utilisant une fonction lambda. Nous y reviendrons plus en détails. 
Il faut le lire de la facon suivante:  
Dans personnes, trouve toutes les personnes p dont le Prenom est Francois, et mets chacun de ces p dans la listes lesFrancois. 

Pour en savoir plus: https://learn.microsoft.com/en-us/dotnet/api/system.predicate-1?view=net-8.0
:::


Un **List\<T\>** fonctionne comme un tableau, il est possible de récupérer un élément par un **index**.

```csharp
Personne p = personnes[0];
```

Notez ici que le cast n'est pas nécessaire comme avec ArrayList car personnes ne contient que des Personne. 


Pour obtenir le nombre d'éléments dans la collection , la propriété **Count** permet d'obtenir la quantité.

```csharp
int nb = personnes.Count;
```

## Dictionary\<TKey,TValue\>

Le dictionnaire permet d'enregistrer une valeur en fonction d'une clé.

**TKey** et **TValue** sont génériques, donc il est possible de mettre le type désiré.

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

Dictionary<int, Personne> dic = new Dictionary<int, Personne>();
dic.Add(personne1.Id, personne1);
dic.Add(personne2.Id, personne2);
dic.Add(personne3.Id, personne3);
```

Ci-dessus, la clé est un **int** et la valeur est **Personne**. La clé doit être unique. Il n'est pas possible d'insérer 2 fois la même valeur pour une clé.

```csharp
Dictionary<int, Personne> dic = new Dictionary<int, Personne>();
dic.Add(1, personne1);
dic.Add(2, personne2);
dic.Add(1, personne3); //System.ArgumentException : 'Un élément avec la même clé a déjà été ajouté.'
```

Le dictionnaire peut utiliser la clé pour accéder directement à un élément.

```csharp
//Retourne la personne à la clé 2 et non l'index 2
Personne p = dic[2];
```

L'accès par les **[]** indique la valeur de la clé et non une position.

La valeur peut également être une collection. 

```csharp
Dictionary<string, List<Personne> dicNom = new Dictionary<string, List<Personne>();

dicNom.Add("François", new List<Personne>());
//le .Add est le .Add de List et non le .Add du Dictionary, car dicNom[""] retourne la valeur.
//ce code ajoute donc personne1 dans une liste de Personne, qui se trouve à l'entré "Francois" du dictionnaire. 
dicNom["François"].Add(personne1);
dicNom["François"].Add(personne2);

dicNom.Add("Stéphane", new List<Personne>());
dicNom["Stéphane"].Add(personne2);
```

Dans le cas-ci dessus, l'accès se fait par **[]** et à l'intérieur c'est une **string**. 

Également **dicNom["François"]** retourne une **List\<Personne\>**.

```csharp
List<Personne> lesFrancois = dicNom["François"];
```

Les propriétés **Keys** et **Values** retournent une collection spécifique contenant toutes les clés.

```csharp
foreach(int key in dic.Keys)
{
    Console.WriteLine(key);
}

foreach (Personne personne in dic.Values)
{
    Console.WriteLine($" Id : {personne.Id} Prénom : {personne.Prenom} Nom : {personne.Nom}");
}
```

Pour obtenir le nombre d'éléments dans la collection , la propriété **Count** permet d'obtenir la quantité.

```csharp
int nb = dic.Count;
```

## Queue et Queue\<T\>

Le type **Queue** et **Queue\<T\>** sont des collections de type file (FIFO), c'est-à-dire le premier élément entré est le premier retiré.

**Queue** reçoit des objets de type **objet**. Il est comme le **ArrayList**.

**Queue\<T\>** est générique. La file reçoit uniquement des objets du type spécifié.

La méthode **Enqueue** permet d'ajouter un élément et la méthode **Dequeue** permet de le retirer de la file.

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

Queue<Personne> queue = new Queue<Personne>();
queue.Enqueue(personne1);
queue.Enqueue(personne2);
queue.Enqueue(personne3);

Personne p1 = queue.Dequeue(); //François St-Hilaire
Personne p2 = queue.Dequeue(); //Stéphane Janvier
Personne p3 = queue.Dequeue(); //François Morin
Personne p4 = queue.Dequeue(); //Retoure un null exception
```

La méthode **Peek** permet d'obtenir le prochain item sans le retirer de la liste.

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

Queue<Personne> queue = new Queue<Personne>();
queue.Enqueue(personne1);
queue.Enqueue(personne2);
queue.Enqueue(personne3);

Personne p1 = queue.Peek(); //François St-Hilaire
Personne p2 = queue.Peek(); //François St-Hilaire
Personne p3 = queue.Peek(); //François St-Hilaire
Personne p4 = queue.Peek(); //François St-Hilaire
```

Pour obtenir le nombre d'éléments dans la collection , la propriété **Count** permet d'obtenir la quantité.

```csharp
int nb = queue.Count;
```

## Stack et Stack\<T\>

Le type **Stack** et **Stack\<T\>** sont des collections de type pile (LIFO), c'est-à-dire que le dernier élément entré est le premier retiré.

**Stack** reçoit des objets de type **objet**. Il est comme le **ArrayList**.

**Stack\<T\>** est générique. La file reçoit uniquement des objets du type spécifié.

La méthode **Push** permet d'ajouter un élément et la méthode **Pop** permet de le retirer de la pile.

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

Stack<Personne> stack = new Stack<Personne>();
stack.Push(personne1);
stack.Push(personne2);
stack.Push(personne3);

Personne p1 = stack.Pop(); //François Morin            
Personne p2 = stack.Pop(); //Stéphane Janvier
Personne p3 = stack.Pop(); //François St-Hilaire
Personne p4 = stack.Pop(); //Retoure un null exception
```

La méthode **Peek** permet d'obtenir le prochain item sans le retirer de la liste.

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

Stack<Personne> stack = new Stack<Personne>();
stack.Push(personne1);
stack.Push(personne2);
stack.Push(personne3);

Personne p1 = stack.Peek(); //François Morin
Personne p2 = stack.Peek(); //François Morin
Personne p3 = stack.Peek(); //François Morin
Personne p4 = stack.Peek(); //François Morin
```

Pour obtenir le nombre d'éléments dans la collection , la propriété **Count** permet d'obtenir la quantité.

```csharp
int nb = stack.Count;
```