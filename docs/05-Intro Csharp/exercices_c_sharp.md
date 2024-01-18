---
sidebar_position: 2
---

# Exercices

Créez une nouvelle application console .NET avec le framework .Net 7.0.

## Exercice 1

#### Classe BaseDocument

1. La classe doit être **abstraite**.
2. Constructeurs
   - Par défaut
   - et avec paramètres
3. Propriété **public** en get et set
   - Auteur (string)
   - Titre (string)
   - Publication (DateTime)
4. Méthode **AfficherInfo()**
   - **Abstraite**
   - Retourne une string
5. Méthode **AfficherPublication()**
   - **Virtuelle**
   - Retourne un string
   - Utilisez la notation **$**
   - La date doit avoir le format suivant **d MMMM yyyy**
   - Le message pour la date **2022/01/18** doit être **"La date de publication est le 18 janvier 2022."**

#### Interface ILivre

1. Interface **public**
2. Propriété en get et set
   - NombrePage (int)

#### Interface IDisque

1. Interface **public**
2. Propriété en get et set
   - TailleMo (decimal)

#### Interface INoteCours

1. Interface **public**
2. Propriété en get et set
   - Matiere (string)
   - Session (string)

#### Classe Livre

1. Hérite de **ILivre** et **BaseDocument**
2. Constructeurs
   - Par défaut
   - et avec paramètres
3. Méthode **AfficherInfo()**
   - Utilisez la notation **$**
   - Le message doit être **"L'auteur du livre intitulé ABC est François St-Hilaire. Le livre a 18 page(s)."** pour les données ci-dessous :
     - Titre : **ABC**
     - Auteur : **François St-Hilaire**
     - NombrePage : **18**

#### Classe Disque

1. Hérite de **IDisque** et **BaseDocument**
2. Constructeurs
   - Par défaut
   - et avec paramètres
3. Méthode **AfficherInfo()**
   - Utilisez la notation **string.format**
   - Le message doit être **"L'auteur du disque intitulé Data123 est François St-Hilaire. Le disque a une taille de 63,3 Mo."** pour les données ci-dessous :
     - Titre : **Data123**
     - Auteur : **François St-Hilaire**
     - TailleMo: **64.3**

#### Classe NoteCours

1. Hérite de **INoteCours** et **BaseDocument**
2. Constructeurs
   - Par défaut
   - et avec paramètres

3. Méthode **AfficherInfo()**
   - Utilisez la notation **$**
   - Le message doit être **"L'auteur des notes intitulées Web IV est François St-Hilaire. La matière est Informatique."** pour les données ci-dessous :
     - Titre : **Web IV**
     - Auteur : **François St-Hilaire**
     - Matiere : **Informatique**
4. Méthode **AfficherPublication()**
   1. Utilisez la notation **$**
   2. Le message doit être **"Les notes ont été publiées le 18 janvier 2022 pour la session H22."** pour les données ci-dessous :
      - Publication : **2022/01/18**
      - Session : **H22**


### solution

<details>
  <summary>Solution</summary>

<details>
  <summary>BaseDocument</summary>



```csharp

namespace ExercicesCours1;

/// <summary>
/// Classe abstraite contenant l'information de base d'un document
/// </summary>
public abstract class BaseDocument
{
    #region Constructeurs
    /// <summary>
    /// Constructeur par défaut
    /// </summary>
    public BaseDocument()
    {

    }

    /// <summary>
    /// Constructeur avec paramètres
    /// </summary>
    /// <param name="auteur">L'auteur du document</param>
    /// <param name="titre">Le titre du document</param>
    /// <param name="publication">La date de publication du document</param>
    public BaseDocument(string auteur, string titre, DateTime publication)
    {
        Auteur = auteur;
        Titre = titre;
        Publication = publication;
    }
    #endregion

    #region Méthodes
    /// <summary>
    /// Génère la phrase pour afficher le message contenant l'information du document (Auteur et Titre)
    /// </summary>
    /// <returns>La phrase</returns>
    public abstract string AfficherInfo();

    /// <summary>
    /// Génère la phrase pour afficher le message de la date de publication
    /// </summary>
    /// <returns>La phrase</returns>
    public virtual string AfficherPublication()
    {
        return $"La date de publication est le {Publication:d MMMM yyyy}.";
    }
    #endregion

    #region Propriétés 
    public string Auteur { get; set; }
        
    public string Titre { get; set; }
        
    public DateTime Publication { get; set; }
    #endregion
}
```



</details>

<details>
  <summary>ILivre</summary>

```csharp
namespace ExercicesCours1;

/// <summary>
/// Interface qui représente le concept d'un livre
/// </summary>
public interface ILivre
{
    int NombrePage { get; set; }
}

```

</details>
<details>
  <summary>IDisque</summary>

```csharp
namespace ExercicesCours1;

/// <summary>
/// Interface qui représente le concept d'un disque compact
/// </summary>
public interface IDisque
{
    decimal TailleMo { get; set; }
}

```

</details>
<details>
  <summary>INoteCours</summary>

```csharp
namespace ExercicesCours1;

/// <summary>
/// Interface qui représente le concept d'un recueil de notes de cours
/// </summary>
public interface INoteCours
{
    string Matiere { get; set; }
    string Session { get; set; }
}

```

</details>
<details>
  <summary>Livre</summary>

```csharp
namespace ExercicesCours1;

/// <summary>
/// Classe qui contient l'information d'un livre
/// </summary>
public class Livre : BaseDocument, ILivre
{
    #region Constructeurs
    /// <summary>
    /// Constructeur par défaut
    /// </summary>
    public Livre() : base()
    {

    }

    /// <summary>
    /// Constructeur avec paramètres
    /// </summary>
    /// <param name="auteur">L'auteur du livre</param>
    /// <param name="titre">Le titre du livre</param>
    /// <param name="publication">La date de publication du livre</param>
    /// <param name="nombrePage">Nombre de page du livre</param>
    public Livre(string auteur, string titre, DateTime publication, int nombrePage) : base(auteur, titre, publication)
    {
        NombrePage = nombrePage;
    }
    #endregion

    #region Méthodes
    /// <summary>
    /// Génère la phrase pour afficher le message contenant l'information du livre (Auteur, Titre et NombrePage)
    /// </summary>
    /// <returns>La phrase</returns>
    public override string AfficherInfo()
    {
        return $"L'auteur du livre intitulé {Titre} est {Auteur}. Le livre a {NombrePage} page(s).";
    }
    #endregion

    #region Propriétés
    public int NombrePage { get; set; }
    #endregion
}


```

</details>
<details>
  <summary>Disque</summary>

```csharp
namespace ExercicesCours1;

/// <summary>
/// Classe qui contient l'information d'un disque compact
/// </summary>
public class Disque : BaseDocument, IDisque
{
    #region Constructeurs
    /// <summary>
    /// Constructeur par défaut
    /// </summary>
    public Disque() : base()
    {
    }

    /// <summary>
    /// Constructeur avec paramètres
    /// </summary>
    /// <param name="auteur">L'auteur du disque</param>
    /// <param name="titre">Le titre du disque</param>
    /// <param name="publication">La date de publication du disque</param>
    /// <param name="tailleMo">La taille en méga octet du disque</param>
    public Disque(string auteur, string titre, DateTime publication, decimal tailleMo) : base(auteur, titre, publication)
    {
        TailleMo = tailleMo;
    }
    #endregion

    #region Méthodes
    /// <summary>
    /// Génère la phrase pour afficher le message contenant l'information du disque (Auteur, Titre et NombreMinute)
    /// </summary>
    /// <returns>La phrase</returns>
    public override string AfficherInfo()
    {
        return String.Format("L'auteur du disque intitulé {0} est {1}. Le disque a une taille de {2} Mo.", Titre, Auteur, TailleMo);
    }
    #endregion

    #region Propriétés
    public decimal TailleMo { get; set; }
    #endregion
}


```

</details>
<details>
  <summary>NoteCours</summary>

```csharp
namespace ExercicesCours1;

/// <summary>
/// Classe qui contient l'information des notes de cours
/// </summary>
public class NoteCours : BaseDocument, INoteCours
{
    #region Constructeurs
    /// <summary>
    /// Constructeur par défaut
    /// </summary>
    public NoteCours() : base()
    {
    }

    /// <summary>
    /// Constructeur avec paramètres
    /// </summary>
    /// <param name="auteur">L'auteur des notes de cours</param>
    /// <param name="titre">Le titre des notes de cours</param>
    /// <param name="publication">La date de publication des notes de cours</param>
    /// <param name="matiere">La matière des notes de cours</param>
    /// <param name="session">La session d'utilisation des notes de cours</param>
    public NoteCours(string auteur, string titre, DateTime publication, string matiere, string session) : base(auteur, titre, publication)
    {
        Matiere = matiere;
        Session = session;
    }
    #endregion

    #region Méthodes
    /// <summary>
    /// Génère la phrase pour afficher le message contenant l'information des notes de cours (Auteur, Titre et Matière)
    /// </summary>
    /// <returns>La phrase</returns>
    public override string AfficherInfo()
    {
        return $"L'auteur des notes intitulés {Titre} est {Auteur}. La matière est {Matiere}.";
    }

    /// <summary>
    /// Génère la phrase pour afficher le message de la date de publication des notes de cours et la session d'utilisation
    /// </summary>
    /// <returns>La phrase</returns>
    public override string AfficherPublication()
    {
        return $"Les notes ont été publiées le {Publication:d MMMM yyyy} pour la session {Session}.";
    }
    #endregion

    #region Propriétés
    public string Matiere { get; set; }

    public string Session { get; set; }
    #endregion
}


```

</details>

</details>

## Exercice 2

#### Instance Livre

1. Créez une instance **Livre** et utilisez le constructeur avec paramètres.
2. Affichez le retour des méthodes **AfficheInfo()** et **AfficherPublication()** dans la console.

#### Instance Disque

1. Créez une instance **Disque** et utilisez le constructeur avec paramètres.
2. Affichez le retour des méthodes **AfficheInfo()** et **AfficherPublication()** dans la console.

#### Instance NoteCours

1. Créez une instance NoteCours et utilisez le constructeur avec paramètres.
2. Affichez le retour des méthodes **AfficheInfo()** et **AfficherPublication()** dans la console.

### solution

<details>
  <summary>Solution</summary>

```csharp
#region Livre ex 2
//Assignation avec le constructeur
Livre livre1 = new Livre("François St-Hilaire", "L'ABC du C#", new DateTime(2022, 01, 18), 14);

Console.WriteLine("Livre 1");
Console.WriteLine(livre1.AfficherPublication());
Console.WriteLine(livre1.AfficherInfo());
#endregion

#region Disques ex 2
Disque disque1 = new Disque("Blizzard", "StarCraft", new DateTime(1998, 12, 18), 266.31M);

Console.WriteLine("Disque 1");
Console.WriteLine(disque1.AfficherPublication());
Console.WriteLine(disque1.AfficherInfo());
#endregion

#region NoteCours ex 2
//Assignation avec le constructeur
NoteCours note1 = new NoteCours("Benoit Desrosiers", "Conception d'un projet Web", new DateTime(2021, 09, 01), "Web", "A21");

Console.WriteLine("Note 1");
Console.WriteLine(note1.AfficherPublication());
Console.WriteLine(note1.AfficherInfo());
#endregion

```

</details>

## Exercice 3

1. Refaites l'exercice #2, mais utilisez le constructeur par défaut.

2. Effectuez l'assignation par les propriétés après la création.

   ```csharp
   Object obj = new Object();
   obj.Prop1 = "asd";
   ```

### solution

<details>
  <summary>Solution</summary>

```csharp
#region Livres ex 3

//Assignation directement lors de la construction
Livre livre2 = new Livre();
livre2.Auteur = "Stéphane Janvier";
livre2.Titre = "L'analyse en informatique";
livre2.Publication = new DateTime(2021, 11, 03);
livre2.NombrePage = 1;

Console.WriteLine("Livre 2");
Console.WriteLine(livre2.AfficherInfo());
Console.WriteLine(livre2.AfficherPublication());
#endregion
 
#region Disques ex 3

Disque disque2 = new Disque();
disque2.Auteur = "id Software";
disque2.Titre =  "Doom";
disque2.Publication = new DateTime(1993, 12, 10);
disque2.TailleMo =46.3184M;

Console.WriteLine("Disque 2");
Console.WriteLine(disque2.AfficherPublication());
Console.WriteLine(disque2.AfficherInfo()); 
#endregion

#region NoteCours ex 3
NoteCours note2 = new NoteCours();
note2.Auteur = "Fredéric Montembault";
note2.Titre = "Les bases de la réseautique";
note2.Publication = new DateTime(2021, 08, 22);
note2.Matiere = "Réseau";
note2.Session = "A21";

Console.WriteLine("Note 2");
Console.WriteLine(note2.AfficherPublication());
Console.WriteLine(note2.AfficherInfo());
#endregion
```

</details>

## Exercice 4

1. Refaites l'exercice #2, mais utilisez le constructeur par défaut.

2. Effectuez l'assignation directement lors de la construction de l'objet. (Point 3.6)

   ```csharp
   Object obj = new Object()
   {
       Prop1 = "asd"
   };
   ```

### solution

<details>
  <summary>Solution</summary>

```csharp
#region Livres ex 4

//Assignation directement lors de la construction
Livre livre3 = new Livre()
{
    Auteur = "Stéphane Janvier",
    Titre = "L'analyse en informatique",
    Publication = new DateTime(2021, 11, 03),
    NombrePage = 1};

Console.WriteLine("Livre 3");
Console.WriteLine(livre3.AfficherInfo());
Console.WriteLine(livre3.AfficherPublication());
#endregion
 
#region Disques ex 4

Disque disque3 = new Disque()
{
    Auteur = "id Software",
    Titre =  "Doom",
    Publication = new DateTime(1993, 12, 10),
    TailleMo =46.3184M};

Console.WriteLine("Disque 3");
Console.WriteLine(disque3.AfficherPublication());
Console.WriteLine(disque3.AfficherInfo()); 
#endregion

#region NoteCours ex 4
NoteCours note3 = new NoteCours()
{
    Auteur = "Fredéric Montembault",
    Titre = "Les bases de la réseautique",
    Publication = new DateTime(2021, 08, 22),
    Matiere = "Réseau",
    Session = "A21"};

Console.WriteLine("Note 3");
Console.WriteLine(note3.AfficherPublication());
Console.WriteLine(note3.AfficherInfo());
#endregion
```

</details>

## Exercice 5

#### Classe Livre

Modifiez la méthode **AfficheInfo()** pour remplacer page(s). Utilisez une opération ternaire pour déterminer si "page" doit être au singulier ou au pluriel.

Exemples 
   - **"L'auteur du livre intitulé ABC est François St-Hilaire. Le livre a 18 pages."**
   - **"L'auteur du livre intitulé ABC est François St-Hilaire. Le livre a 1 page."**

### solution

<details>
  <summary>Solution</summary>

remplacez le return de AfficherInfo() de Livre.cs par:

```csharp
        return $"L'auteur du livre intitulé {Titre} est {Auteur}. Le livre a {NombrePage} {(NombrePage > 1 ? "pages" : "page")}.";

```

</details>

#### Classe NoteCours

1. Modifiez la méthode **AfficheInfo()** pour afficher **"non disponible"** lorsque la valeur de la propriété Auteur est **null**.
2. Utilisez le **??**.
3. Exemples
   1. **"L'auteur des notes intitulées ABC est François St-Hilaire. La matière est Informatique."**
   2. **"L'auteur des notes intitulées ABC est non disponible. La matière est Informatique."**

### solution

<details>
  <summary>Solution</summary>

remplacez le return de AfficheInfo() de NoteCours par:
```csharp
        return $"L'auteur des notes intitulés {Titre} est {Auteur ?? "non disponible"}. La matière est {Matiere}.";
```

</details>

#### Classe Disque

1. Modifiez la méthode **AfficheInfo()** pour formater la taille avec 3 décimaux en tout temps.
2. La valeur **701.1** doit afficher **701.100**.
3. La valeur **701.12** doit afficher **701.120**.
4. La valeur **701.123** doit afficher **701.123**.

### solution

<details>
  <summary>Solution</summary>

ramplacez le return de AfficheInfo() de Disque.cs par:

```csharp
        return String.Format("L'auteur du disque intitulé {0} est {1}. Le disque a une taille de {2:N3} Mo.", Titre, Auteur, TailleMo);

```

</details>


## Exercice 6 

#### Testez les méthodes

1. Créez une instance de **Livre** avec 1 page et une autre instance avec 2 pages. Est-ce que le nombre de page s'affiche correctement ?
2. Créez une instance **NoteCours** avec une valeur dans la propriété Auteur et une autre instance avec la valeur **null** dans la propriété Auteur. Est-ce "non disponible" est affiché correctement?
3. Créez une instance de **Disque ** avec la valeur 46.3189. Est-ce que l'arrondissement est fait correctement?
4. Créez une instance de **Disque ** avec la valeur 46.3184. Est-ce que l'arrondissement est fait correctement?

### solution

<details>
  <summary>Solution</summary>

```csharp
#region Exercice 6
Livre livreEx6_1 = new Livre("François St-Hilaire", "L'ABC du C#", new DateTime(2022, 01, 18), 1);
Livre livreEx6_2 = new Livre("François St-Hilaire", "L'ABC du C#", new DateTime(2022, 01, 18), 2);

Console.WriteLine("Livre une page");
Console.WriteLine(livreEx6_1.AfficherInfo());
Console.WriteLine("Livre deux pages");
Console.WriteLine(livreEx6_2.AfficherInfo());

NoteCours noteEx6_1 = new NoteCours(null, "Conception d'un projet Web", new DateTime(2021, 09, 01), "Web", "A21");
NoteCours noteEx6_2 = new NoteCours() 
{
    // auteur non spécifié
    Titre = "Les bases de la réseautique",
    Publication = new DateTime(2021, 08, 22),
    Matiere = "Réseau",
    Session = "A21"
};

Console.WriteLine("Note sans auteur 1 ");
Console.WriteLine(noteEx6_1.AfficherInfo());
Console.WriteLine("Note sans auteur 12 ");
Console.WriteLine(noteEx6_2.AfficherInfo());

Disque disqueEx6_9 = new Disque()
{
    Auteur = "id Software",
    Titre =  "Doom",
    Publication = new DateTime(1993, 12, 10),
    TailleMo =46.3189M
};

Console.WriteLine("Disque 9");
Console.WriteLine(disqueEx6_9.AfficherInfo()); 

Disque disqueEx6_4 = new Disque()
{
    Auteur = "id Software",
    Titre =  "Doom",
    Publication = new DateTime(1993, 12, 10),
    TailleMo =46.3184M
};
Console.WriteLine("Disque 4");
Console.WriteLine(disqueEx6_4.AfficherInfo()); 
#endregion
```

</details>