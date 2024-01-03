---
sidebar_position: 3
---

# Exercices requêtes en LINQ

## Création du projet

Pour faire vos exercices, créez une application console en **.NET 7**

Créez un projet.
<img src="/4N1_2024/img/04_projet_1.png" />


Sélectionnez le type **Application Console** en **C#**. Important, il ne faut pas avoir la mention **(.NET Framework)**.

<img src="/4N1_2024/img/04_projet_2.png" />

Nommez le projet **ConsoleLINQ**.
<img src="/4N1_2024/img/04_projet_3.png" />


Sélectionnez l'infrastructure **.NET 7.0** et décochez **N'utilisez pas d'instructions de niveau supérieur.**
<img src="/4N1_2024/img/04_projet_4.png" />


## Exercices

Créez l'enum **TypeAnimal**.

```csharp
namespace ConsoleLINQ;

public enum TypeAnimal
{
    Mammifere,
    Reptile,
    Oiseau,
    Amphibien,
    Poisson,
    Crustace,
    Insecte
}
```

Créez la classe **Animal** et copiez le code ci-dessous. 

```csharp
namespace ConsoleLINQ;

public class Animal
{
    public int AnimalId { get; set; }
    public string Nom { get; set; }
    public string Espece { get; set; }
    public decimal Poids { get; set; }
    public bool Male { get; set; }
    public string Proprietaire { get; set; }
    public DateTime Naissance { get; set; }
    public TypeAnimal TypeAnimal { get; set; }
}
```

Créez la classe **GenerateurListeAnimal**.

```csharp
namespace ConsoleLINQ;

public class GenerateurListeAnimal
{
    public static List<Animal> ObtenirListe()
    {
        List<Animal> listeAnimal = new List<Animal>();

        listeAnimal.Add(new Animal() { AnimalId = 1, Nom = "Peanut", Espece = "Chat", Poids = 6.5m, Male = true, Proprietaire = "Martin Simard", Naissance = new DateTime(2018, 12, 17), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 2, Nom = "Poppey", Espece = "Chien", Poids = 9.5m, Male = true, Proprietaire = "Simon Turcotte", Naissance = new DateTime(2011, 05, 28), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 3, Nom = "Pincette", Espece = "Homard", Poids = 3.1m, Male = false, Proprietaire = "Homer Simpson", Naissance = new DateTime(2011, 06, 02), TypeAnimal = TypeAnimal.Crustace });
        listeAnimal.Add(new Animal() { AnimalId = 4, Nom = "Doris", Espece = "Poisson-chirurgien", Poids = 0.1m, Male = false, Proprietaire = "Pascal Tanguay", Naissance = new DateTime(2021, 08, 31), TypeAnimal = TypeAnimal.Poisson });
        listeAnimal.Add(new Animal() { AnimalId = 5, Nom = "Serge", Espece = "Chat", Poids = 2.3m, Male = true, Proprietaire = "Michel Simard", Naissance = new DateTime(2021, 07, 06), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 6, Nom = "Snape", Espece = "Serpent", Poids = 1.1m, Male = false, Proprietaire = "Martin Morin", Naissance = new DateTime(2019, 03, 30), TypeAnimal = TypeAnimal.Reptile });
        listeAnimal.Add(new Animal() { AnimalId = 7, Nom = "Pitpit", Espece = "Rossignol", Poids = 0.4m, Male = true, Proprietaire = "Sylvain Bernier", Naissance = new DateTime(2016, 12, 19), TypeAnimal = TypeAnimal.Oiseau });
        listeAnimal.Add(new Animal() { AnimalId = 8, Nom = "Croco", Espece = "Crocodile", Poids = 25.4m, Male = false, Proprietaire = "Jean-François Turcotte", Naissance = new DateTime(2010, 11, 21), TypeAnimal = TypeAnimal.Reptile });
        listeAnimal.Add(new Animal() { AnimalId = 9, Nom = "Prince", Espece = "Grenouille", Poids = 0.2m, Male = false, Proprietaire = "Pascal Bernier", Naissance = new DateTime(2022, 01, 01), TypeAnimal = TypeAnimal.Amphibien });
        listeAnimal.Add(new Animal() { AnimalId = 10, Nom = "Bob", Espece = "Rat", Poids = 0.7m, Male = false, Proprietaire = "Simon Turcotte", Naissance = new DateTime(2015, 07, 15), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 11, Nom = "Arnold", Espece = "Fourmis", Poids = 0.00001m, Male = false, Proprietaire = "Jean-Michel Chabot", Naissance = new DateTime(2021, 11, 15), TypeAnimal = TypeAnimal.Insecte });
        listeAnimal.Add(new Animal() { AnimalId = 12, Nom = "Crispie", Espece = "Salamande", Poids = 0.5m, Male = true, Proprietaire = "Michel St-Pierre", Naissance = new DateTime(2019, 09, 14), TypeAnimal = TypeAnimal.Reptile });
        listeAnimal.Add(new Animal() { AnimalId = 13, Nom = "Hot-dog", Espece = "Chien", Poids = 3.3m, Male = true, Proprietaire = "François Turcotte", Naissance = new DateTime(2016, 11, 09), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 14, Nom = "Poppey", Espece = "Chien", Poids = 4.3m, Male = false, Proprietaire = "Véronique Morin", Naissance = new DateTime(2014, 07, 11), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 15, Nom = "Luigi", Espece = "Chien", Poids = 7.5m, Male = true, Proprietaire = "Michel St-Pierre", Naissance = new DateTime(2020, 02, 15), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 16, Nom = "Mario", Espece = "Chat", Poids = 4.5m, Male = true, Proprietaire = "Michel St-Pierre", Naissance = new DateTime(2020, 10, 30), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 17, Nom = "Steak", Espece = "Chat", Poids = 2.6m, Male = false, Proprietaire = "Marge Simpson", Naissance = new DateTime(2019, 05, 05), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 18, Nom = "Minette", Espece = "Chat", Poids = 2.7m, Male = true, Proprietaire = "Bertrand Drouin", Naissance = new DateTime(2017, 04, 12), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 19, Nom = "Nemo", Espece = "Poisson-clown", Poids = 0.2m, Male = true, Proprietaire = "Bertrand Bernier", Naissance = new DateTime(2020, 04, 15), TypeAnimal = TypeAnimal.Poisson });
        listeAnimal.Add(new Animal() { AnimalId = 20, Nom = "Cricri", Espece = "Criquet", Poids = 0.00002m, Male = true, Proprietaire = "Michel Simard", Naissance = new DateTime(2021, 10, 15), TypeAnimal = TypeAnimal.Insecte });
        listeAnimal.Add(new Animal() { AnimalId = 21, Nom = "Ciel", Espece = "Pigeon", Poids = 0.9m, Male = false, Proprietaire = "Michel Simard", Naissance = new DateTime(2019, 07, 22), TypeAnimal = TypeAnimal.Oiseau });
        listeAnimal.Add(new Animal() { AnimalId = 22, Nom = "Pirate", Espece = "Perroquet", Poids = 1.1m, Male = false, Proprietaire = "Michel Simard", Naissance = new DateTime(2016, 09, 09), TypeAnimal = TypeAnimal.Oiseau });
        listeAnimal.Add(new Animal() { AnimalId = 23, Nom = "Labo", Espece = "Rat", Poids = 0.9m, Male = true, Proprietaire = "Jean-Michel Turcotte", Naissance = new DateTime(2017, 06, 12), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 24, Nom = "Doris", Espece = "Cochon d'Inde", Poids = 1.2m, Male = true, Proprietaire = "François Turcotte", Naissance = new DateTime(2019, 09, 14), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 25, Nom = "Prince", Espece = "Chat", Poids = 5.2m, Male = true, Proprietaire = "Bertrand Drouin", Naissance = new DateTime(2009, 07, 07), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 26, Nom = "Arnold", Espece = "Chien", Poids = 6.4m, Male = true, Proprietaire = "Véronique St-Pierre", Naissance = new DateTime(2008, 02, 25), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 27, Nom = "Simba", Espece = "Lion", Poids = 62.3m, Male = true, Proprietaire = "Pascal Lassonde", Naissance = new DateTime(2005, 09, 12), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 28, Nom = "Lapinette", Espece = "Lapin", Poids = 1.7m, Male = false, Proprietaire = "Simon Martel", Naissance = new DateTime(2021, 04, 18), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 29, Nom = "Boule-de-poils", Espece = "Lapin", Poids = 1.5m, Male = false, Proprietaire = "Simon Martel", Naissance = new DateTime(2021, 04, 18), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 30, Nom = "Terreur", Espece = "Serpent", Poids = 1.4m, Male = false, Proprietaire = "Pascal Tanguay", Naissance = new DateTime(2018, 11, 30), TypeAnimal = TypeAnimal.Reptile });
        listeAnimal.Add(new Animal() { AnimalId = 31, Nom = "Piquette", Espece = "Chèvre", Poids = 9.5m, Male = false, Proprietaire = "Véronique St-Pierre", Naissance = new DateTime(2019, 06, 25), TypeAnimal = TypeAnimal.Mammifere });
        listeAnimal.Add(new Animal() { AnimalId = 32, Nom = "Biquette", Espece = "Chèvre", Poids = 9.8m, Male = false, Proprietaire = "Véronique St-Pierre", Naissance = new DateTime(2018, 09, 25), TypeAnimal = TypeAnimal.Mammifere });


        return listeAnimal;

    }
}
```

Dans le fichier **Program.cs**, débutez avec cette ligne pour récupérer la liste d'objets de type **Animal**.

```csharp
using ConsoleLINQ;

List<Animal> lstAnimal = GenerateurListeAnimal.ObtenirListe();
```

Pour chacun des exercices, nommez votre objet de retour comme indiqué ci-dessous. Inscrivez directement les requêtes dans le fichier **Program.cs**.

Pour chacun des exercices, effectuez la requête en syntaxe **Lamba** et **Query**.

```csharp
//Pour l'exercice 1.
//Si un seul objet
Animal ex1Lambda = ...
Animal ex1Query = ...

//Si liste
List<Animal> ex1Lambda = ...
List<Animal> ex1Query = ...

//Si count
int ex1Lambda = ...
int ex1Query = ...
```

### Exercice 1

Trouvez tous les animaux ayant pour nom **Arnold**.

<details>
  <summary>Solution</summary>

```csharp
List<Animal> ex1Lamba = listeAnimal.Where(lqAnimal => lqAnimal.Nom == "Arnold").ToList();
List<Animal> ex1Query = (from lqAnimal in listeAnimal
                         where
                              lqAnimal.Nom == "Arnold"
                         select
                              lqAnimal).ToList();

```

</details>


### Exercice 2

Triez les animaux par **Nom** et retournez le premier.

<details>
  <summary>Solution</summary>

```csharp
Animal ex2Lambda = listeAnimal.OrderBy(lqAnimal => lqAnimal.Nom).First();
Animal ex2Query = (from lqAnimal in listeAnimal
                   orderby
                        lqAnimal.Nom
                   select
                        lqAnimal).First();
```

</details>

### Exercice 3

Retournez une liste triée par **Nom** de propriétaire en ordre **croissant** et par **Date de naissance** en ordre **décroissant**.

<details>
  <summary>Solution</summary>

```csharp
List<Animal> ex3Lambda = listeAnimal.OrderBy(lqAnimal => lqAnimal.Nom).ThenByDescending(lqAnimal => lqAnimal.Naissance).ToList();
List<Animal> ex3Query = (from lqAnimal in listeAnimal
                         orderby
                            lqAnimal.Nom,
                            lqAnimal.Naissance descending
                         select
                            lqAnimal).ToList();
```

</details>

### Exercice 4

Retournez l'animal le plus âgé.

<details>
  <summary>Solution</summary>

```csharp
Animal ex4Lambda = listeAnimal.OrderBy(lqAnimal => lqAnimal.Naissance).First();
Animal ex4Query = (from lqAnimal in listeAnimal
                   orderby
                        lqAnimal.Naissance
                   select
                        lqAnimal).First();

```

</details>

### Exercice 5

Retournez le nombre d'animaux qui ont 4 ans et plus.

<details>
  <summary>Solution</summary>

```csharp
int ex5Lambda = listeAnimal.Count(lqAnimal => lqAnimal.Naissance <= DateTime.Now.Date.AddYears(-4));
int ex5Query = (from lqAnimal in listeAnimal
                where
                    lqAnimal.Naissance <= DateTime.Now.Date.AddYears(-4)
                select
                    lqAnimal).Count();
```

</details>

### Exercice 6

Retournez tous les animaux qui sont des  **mâles** et qui sont des **mammifères**.

Utilisez l'**`enum`** pour faire la sélection du type d'animal.

<details>
  <summary>Solution</summary>

```csharp
List<Animal> ex6Lamda = listeAnimal.Where(lqAnimal => lqAnimal.Male == true && lqAnimal.TypeAnimal == TypeAnimal.Mammifere).ToList();
List<Animal> ex6Query = (from lqAnimal in listeAnimal
                         where
                            lqAnimal.Male == true &&
                            lqAnimal.TypeAnimal == TypeAnimal.Mammifere
                         select
                            lqAnimal).ToList();
```

</details>

### Exercice 7

Retournez le nombre d'animaux de type **Reptile**.

<details>
  <summary>Solution</summary>

```csharp
int ex7Lambda = listeAnimal.Count(lqAnimal => lqAnimal.TypeAnimal == TypeAnimal.Reptile);
int ex7Query = (from lqAnimal in listeAnimal
                where
                    lqAnimal.TypeAnimal == TypeAnimal.Reptile
                select
                    lqAnimal).Count();

```

</details>

### Exercice 8

Retournez tous les animaux que leur **nom** commence par **P** ou **L**.

<details>
  <summary>Solution</summary>

```csharp
List<Animal> ex8Lambda = listeAnimal.Where(lqAnimal => lqAnimal.Nom.StartsWith("P") || lqAnimal.Nom.StartsWith("L")).ToList();
List<Animal> ex8Query = (from lqAnimal in listeAnimal
                         where
                            lqAnimal.Nom.StartsWith("P") ||
                            lqAnimal.Nom.StartsWith("L")
                         select
                            lqAnimal).ToList();
```

</details>

### Exercice 9

Retournez un objet qui contient le **nom** de l'animal,  **l'espèce** et le **type**.

Utilisez un type **var **pour l'objet de retour.

<details>
  <summary>Solution</summary>

```csharp
var ex9Lambda = listeAnimal.Select(lqAnimal => new { Nom = lqAnimal.Nom, Espece = lqAnimal.Espece, TypeAnimal = lqAnimal.TypeAnimal }).ToList();
var ex9Query = (from lqAnimal in listeAnimal
                select new
                {
                    Nom = lqAnimal.Nom,
                    Espece = lqAnimal.Espece,
                    TypeAnimal = lqAnimal.TypeAnimal
                }).ToList();

```

</details>

### Exercice 10

Retournez un objet qui contient le **nom** de l'animal, **l'espèce** et le **type**.

Le nom de l'animal doit contenir le **nom de famille** du propriétaire. Utilisez un **split** pour séparer le prénom du nom.

Utilisez un type **var** pour l'objet de retour.

<details>
  <summary>Solution</summary>

```csharp
var ex10Lambda = listeAnimal.Select(lqAnimal => new { Nom = $"{lqAnimal.Nom} {lqAnimal.Proprietaire.Split(' ')[1]}", Espece = lqAnimal.Espece, TypeAnimal = lqAnimal.TypeAnimal }).ToList();
var ex10Query = (from lqAnimal in listeAnimal
                 select new
                 {
                     Nom = $"{lqAnimal.Nom} {lqAnimal.Proprietaire.Split(' ')[1]}",
                     Espece = lqAnimal.Espece,
                     TypeAnimal = lqAnimal.TypeAnimal
                 }).ToList();

```

</details>

### Exercice 11

Retournez l'animal qui a le grand nom (plus de lettres).

Utilisez un **`LastOrDefault()`**.

<details>
  <summary>Solution</summary>

```csharp
Animal? ex11Lambda = listeAnimal.OrderBy(lqAnimal => lqAnimal.Nom.Length).LastOrDefault();
Animal? ex11Query = (from lqAnimal in listeAnimal
                    orderby
                        lqAnimal.Nom.Length
                    select lqAnimal).LastOrDefault();
```

</details>

### Exercice 12

Retournez tous les **mammifères** qui sont des **femelles**. 

Triez par le **propriétaire** de l'animal en ordre **croissant** et par la **date de naissance** en ordre **décroissant**.

<details>
  <summary>Solution</summary>

```csharp
List<Animal> ex12Lambda = listeAnimal.Where(lqAnimal => lqAnimal.Male == false && lqAnimal.TypeAnimal == TypeAnimal.Mammifere)
                                     .OrderBy(lqAnimal => lqAnimal.Proprietaire)
                                     .ThenByDescending(lqAnimal => lqAnimal.Naissance).ToList();

List<Animal> ex12Query = (from lqAnimal in listeAnimal
                          where
                            lqAnimal.Male == false &&
                            lqAnimal.TypeAnimal == TypeAnimal.Mammifere
                          orderby
                            lqAnimal.Proprietaire,
                            lqAnimal.Naissance descending
                          select
                            lqAnimal).ToList();

```

</details>

### Exercice 13

Retournez une liste d'objet. Il doit avoir le **Id**, le **Nom** de l'animal, **PoidsLbs**, **PoidsKg**, et le **Sexe**.

Retournez un objet qui contient le poids en **livre**. Le poids actuel dans l'objet est en **kilogramme**. La formule est **Lbs = Kg * 2,2**

Il faut écrire **Mâle** si c'est Male = true et **Femelle** si Male = false pour la propriété **Sexe**.

<details>
  <summary>Solution</summary>

```csharp
var ex13Lambda = listeAnimal.Select(lqAnimal => new
{
    Id = lqAnimal.AnimalId,
    Nom = lqAnimal.Nom,
    PoidsLbs = lqAnimal.Poids * 2.2m,
    PoidsKg = lqAnimal.Poids,
    Sexe = (lqAnimal.Male == true ? "Mâle" : "Femelle")
}).ToList();

var ex13Query = (from lqAnimal in listeAnimal
                 select
                    new
                    {
                        Id = lqAnimal.AnimalId,
                        Nom = lqAnimal.Nom,
                        PoidsLbs = lqAnimal.Poids * 2.2m,
                        PoidsKg = lqAnimal.Poids,
                        Sexe = (lqAnimal.Male == true ? "Mâle" : "Femelle")
                    }).ToList();
```

</details>

### Exercice 14

Retournez tous les animaux nés en décembre.

Triez le résultat du plus vieux au plus jeune.

<details>
  <summary>Solution</summary>

```csharp
var ex14Lambda = listeAnimal.Where(lqAnimal => lqAnimal.Naissance.Month == 12 || lqAnimal.Naissance.Month == 5)
                            .OrderByDescending(lqAnimal => lqAnimal.Naissance).ToList();

var ex14Query = (from lqAnimal in listeAnimal
                 where
                    lqAnimal.Naissance.Month == 12 ||
                    lqAnimal.Naissance.Month == 5
                 orderby
                    lqAnimal.Naissance descending
                 select
                    lqAnimal).ToList();
```

</details>

### Exercice 15

Retournez la liste des noms des animaux. Il faut éliminer les doublons.

Triez la liste en ordre alphabétique.

Utilisez la méthode **`Distinct()`** avant de faire le **`.ToList()`**.

Retournez une liste de **string**.

<details>
  <summary>Solution</summary>

```csharp
List<string> ex15Lambda = listeAnimal.OrderBy(lqAnimal => lqAnimal.Nom).Select(lqAnimal => lqAnimal.Nom).Distinct().ToList();
List<string> ex15Query = (from lqAnimal in listeAnimal
                          orderby
                               lqAnimal.Nom
                          select
                               lqAnimal.Nom).Distinct().ToList();
```

</details>

### Exercice 16

Retournez dans un objet la liste des **ids** qui sont des **mâles** et une liste des **ids** qui sont  des **femelles**.

Il faut créez l'objet dynamique et ses propriétés utilisent du **Lambda** ou du **Query**.

L'objet doit avoir comme propriété **IdMale** et **IdFemelle**.

<details>
  <summary>Solution</summary>

```csharp
var ex16Lambda = new
{
    IdMale = listeAnimal.Where(lqAnimal => lqAnimal.Male == true).Select(lqAnimal => lqAnimal.AnimalId).ToList(),
    IdFemelle = listeAnimal.Where(lqAnimal => lqAnimal.Male == false).Select(lqAnimal => lqAnimal.AnimalId).ToList()
};

var ex16Query = new
{
    IdMale = (from lqAnimal in listeAnimal
              where
                  lqAnimal.Male == true
              select
                  lqAnimal.AnimalId).ToList(),
    IdFemelle = (from lqAnimal in listeAnimal
                 where
                     lqAnimal.Male == false
                 select
                     lqAnimal.AnimalId).ToList()
};

```

</details>

### Exercice 17

Retournez la liste des animaux que leur propriétaire on un **prénom composé**. Utilisez un **split** et un **contains**.

Triez la liste par le nom du propriétaire.

<details>
  <summary>Solution</summary>

```csharp
List<Animal> ex17Lambda = listeAnimal.Where(lqAnimal => lqAnimal.Proprietaire.Split(' ')[0].Contains("-") == true)
                                     .OrderBy(lqAnimal => lqAnimal.Proprietaire).ToList();

List<Animal> ex18Query = (from lqAnimal in listeAnimal
                          where
                               lqAnimal.Proprietaire.Split(' ')[0].Contains("-") == true
                          orderby
                               lqAnimal.Proprietaire
                          select
                                lqAnimal).ToList();
```

</details>

### Exercice 18

Retournez la liste des **propriétaires** qui ont des **chiens**. La liste doit avoir seulement des éléments **distincts**. Utilisez la syntaxe **Lambda**.

Retournez la liste des **propriétaires** qui ont des **chats**. La liste doit avoir seulement des éléments **distincts**. Utilisez la syntaxe **Query**.

Utilisez 2 listes différentes. Exemple : **`List<string> ex18ChienLambda`** et **`List<string> ex18ChatQuery`** . 

Retournez la liste des propriétaires qui ont des chats et des chiens. Utilisez la méthode **`Intersect`** (intersection).

Retournez la liste des propriétaires qui ont soit un chat ou un chien, mais pas les 2. Utilisez la méthode **`Union`** et **`Except`** (différence) et le résultat de l'intersection. 

<details>
  <summary>Solution</summary>

```csharp
List<string> ex18ChienLambda = listeAnimal.Where(lqAnimal => lqAnimal.Espece == "Chien")
                                          .Select(lqAnimal => lqAnimal.Proprietaire).Distinct().ToList();

List<string> ex18ChatQuery = (from lqAnimal in listeAnimal
                              where
                                   lqAnimal.Espece == "Chat"
                              select
                                   lqAnimal.Proprietaire).Distinct().ToList();

List<string> ex18ChatEtChien = ex18ChatQuery.Intersect(ex18ChienLambda).ToList();

List<string> ex18ChatOuChien = ex18ChatQuery.Union(ex18ChienLambda).Except(ex18ChatEtChien).ToList();


```

</details>

### Exercice 19

Créez un dictionnaire de type **`Dictionary<int, Animal> ex20dicAnimal`**, où la clé est le **AnimalId**.

Effectuez une boucle **foreach **et non par **LINQ**, car ce n'est pas possible directement.

Au prochain cours, nous utiliserons l'extension de classe pour être en mesure de le faire avec **LINQ**.

<details>
  <summary>Solution</summary>

```csharp
Dictionary<int, Animal> ex19dicAnimal = new Dictionary<int, Animal>();

foreach (Animal animal in listeAnimal)
{
    ex19dicAnimal.Add(animal.AnimalId, animal);
}
```

</details>


