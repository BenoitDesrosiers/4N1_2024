---
sidebar_position: 1
---

# Introduction à C#

La plateforme de développement de Microsoft .NET existe depuis 2002. Elle était connue sous le nom de Microsoft .NET Framework. Son but était d'offrir une plateforme unifiée pour le développement d'application native Windows et Web. 

Les technologies Web ont beaucoup évoluées depuis sa sortie initiale en 2001.

1. ASP.NET ou WebForm
2. ASP.NET MVC
3. ASP.NET Web API
4. Blazor Server-Side
5. Blazor Web Assembly

Même chose pour les technologies natives.

1. WinForm
1. WPF
1. Xamarin
1. MAUI

En 2016, Microsoft a sorti une nouvelle plateforme Microsoft .NET Core. Cette plateforme permet de faire des applications Linux, macOS et Windows.

La plateforme .NET Core et .NET Framework ont évolué indépendamment jusqu'en 2019. En 2020, Microsoft a sorti le .NET 5 qui consiste à l'évolution de la plateforme .NET Core et le .NET Framework a été abandonné. Il est toujours possible de développer avec le .NET Framework. Certaines technologies ont été republiées en .NET Core, comme pour le ASP.NET MVC et le WPF, mais d'autres ont été abandonnées comme pour les WebForm.

La dernière version en date d'aujourd'hui est **.NET 8** qui est disponible depuis novembre 2023. **Nous utiliserons cette version en classe.**

Microsoft supporte également plusieurs langages de programmation. Le plus populaire est le c#, mais il était possible de programmer une application WinForm en c# ou en Visual Basic .NET. Les 2 langages offrent les mêmes possibilités. Un autre but de Microsoft .NET était de le rendre multi-langage et de les faire coexister facilement ensemble.

[Pour en savoir plus](https://en.wikipedia.org/wiki/.NET#.NET_Core)

## Les bases de c#

Le langage c# est celui qui est utilisé pour faire la programmation logique dans ASP.NET MVC, Blazor et WPF. Ce langage est très proche de Java, TypeScript et de C++. Il est assez simple pour un programmeur Java de comprendre du code en c# et vice-versa.

Les 3 sites ci-dessous expliquent les bases en c# :

- Microsoft Learn (français disponible)

  - https://learn.microsoft.com/fr-ca/dotnet/csharp/
- DevStory (français disponible)

  - Tutoriel rapide : https://devstory.NET/10333/apprenez-rapidement-a-developper-en-csharp-pour-debutant#a312015
  - Liste des tutoriels : https://devstory.NET/10999/csharp
- W3Schools (anglais uniquement) : https://www.w3schools.com/cs/index.php 

Le c# est un langage orienté objet. Il est très proche du Java. Au tout début, la communauté disait souvent que c# était une version Microsoft de Java.

c# utilise un **Garbage Collector** pour sa gestion de mémoire.

Le langage c# a beaucoup évolué depuis sa création. Pour **.NET 7**, le c# **version 11** est utilisée. Certaines syntaxes peuvent ne pas fonctionner si vous utilisez une version plus ancienne.

Ce site illustre bien la version de c# avec la version du .NET : https://www.tutorialsteacher.com/csharp/csharp-version-history



### Les commentaires

Pour faire des commentaires en c#, il fait utiliser le **//** pour écrire le commentaire sur une seule ligne.

Pour écrire un commentaire sur plusieurs lignes, il faut utiliser **/* */`.**

Pour générer automatiquement des blocs de documentation pour les classes, méthodes, propriétés..., il faut faire **///** pour générer le bloc.

```csharp
/// <summary>
/// Ma première classe
/// </summary>
public class MaClasse
{
    /// <summary>
    /// Addition
    /// </summary>
    /// <param name="x">Premier terme</param>
    /// <param name="y">Deuxième terme</param>
    /// <returns>Total de l'addition</returns>
    public int Addition(int x, int y)
    {
        /* Ma première ligne.
           Ma deuxième ligne. */       

        //Une seule ligne            
        return x + y;
    }
}
```

### Les régions

En c#, il est possible de faire du regroupement de code en utilisant les régions. Ceci permet de masquer rapidement une portion du code. Il est possible de l'utiliser partout dans un fichier c#. 

Par exemple, on peut regrouper tous les constructeurs, les champs... pour masquer une portion du code.

```csharp
#region Constructeurs
public MaClasse()
{
    //Je suis le constructeur par défaut
}

public MaClasse(int a)
{
    //Je suis un 2e constructeur.
}
#endregion
    
```

Il est possible de fermer la région pour voir uniquement le titre de la région. En appuyant sur le plus, on voit tout le code.

<img src="/4N1_2024/img/regionc.jpg"  />


Il est possible de mettre des régions dans la classe et dans des méthodes.

### Les variables

c# est un langage typé. Chaque variable correspond à un type défini.

```csharp
//Ceci est un entier 32 bits
int monEntier = 0;

//Ceci est une chaine de caractère
string maChaine = "Bonjour !";
    
//Ceci est un booléen
bool monBooleen = false;
    
```

### Le type var

Par contre, dans beaucoup de documentation, le type **var** est utilisé. Par contre, il ne faut pas le considérer comme celui en **JavaScript**. Il est considéré comme un type implicite en c#. 

```csharp
int x = 10; //Type explicite
var y = 12; //Type implicite. Le var est en réalité un int.
```

Le **var** peut être utilisé uniquement en tant que variable locale.  Il n'est pas possible d'utiliser **var** en tant que champs, propriété, paramètre ou de retour de méthode.

Il n'est pas recommandé de toujours utiliser le **var** et d'ignorer les types explicites, car le **var** va devenir le type de sa première assignation.

```csharp
//Le code ci-dessous ne compilera pas.
var x = 1; //var est considéré comme un Int par le compilateur.

//Le 1.1M consiste à indiquer au compilateur que la valeur est un décimal
//Il n'est pas possible de le convertir en décimal. 
//Erreur CS0266 : Impossible de convertir implicitement le type 'decimal' en 'int'.
x = 1.1M; 

//En utilisant une notation explicite, le code ci-dessous fonctionnera.
decimal y = 1; //Assignation de la valeur en notation Int, mais considérée comme un décimal.
y = 1.1M; //Assignation d'une nouvelle valeur en décimal.

//Pour être en mesure de compiler avec une notation implicite.
var z = 1M; //Assignation de la valeur en notation décimale, donc var est un décimal.
z = 1.1M; //Cette assignation fonctionnera
```

La plus grande utilité du type **var** est pour créer des types anonymes dynamiquement. Ce concept sera expliqué plus tard dans la session.

Pour en apprendre davantage : https://docs.microsoft.com/fr-ca/dotnet/csharp/language-reference/keywords/var

### Le *nullable* pour les types non nullable

Par définition, les types primitifs ne peuvent pas avoir une valeur **null**. Par exemple, un booléen doit obligatoirement avoir **True** ou **False** pour être en mesure de l'utiliser.

Dans certains cas, il peut être intéressant d'être en mesure d'avoir la valeur **null** pour un type primitif. c# est en mesure d'accepter la valeur **null** pour tous les types ***non nullable***.

```csharp
//Booléen standard
bool b1; //Accepte uniquement true ou false.
b1 = true; 
b1 = false;
b1 = null; //Erreur CS0037 : Impossible de convertir une valeur null en 'type', car il s’agit d’un type valeur qui n’autorise pas les valeurs null
```

Pour rendre un type **nullable**, il faut ajouter un **?** à la fin du type. 

```csharp
//Booléen standard
bool? b1; //Accepte true, false et null grâce au "bool?".
b1 = true; 
b1 = false;
b1 = null; //Le compilateur le permet.

DateTime? naissance = null; //Pourrait servir pour une date inconnue
```

### Le *nullable* pour les types nullables et classe

Une variable de type **string** peut être **null** par définition.

Il est possible de compiler le code ci-dessous sans problème. Par contre, le compilateur donnera un avertissement.

```csharp
string nom = null;
//CS8600 - Conversion d’un littéral null ou d’une valeur null possible en type non nullable.
```

Pour indiquer au compilateur que la valeur null est acceptée, il faut ajouter le **?** après le type ou la classe.

```csharp
string? nom = null;
```

Également, lors de l'utilisation d'API créé en .NET, le cadriciel refusera les valeurs **null** pour les propriétés qui n'auront pas le **?**. Il sera important de l'ajouter.

### Séparateur de nombre - _

Il est possible de rendre les gros nombres plus facilement lisibles avec le séparateur **_**.

```csharp
double nombre1 = 45412974585674;
double nombre2 = 45_412_974_585_674;
```

## Manipulation de string

Il faut faire à l'occasion de la concaténation de string avec des variables et du texte fixe.

Par exemple la méthode **NomComplet()** permet de concaténer le prénom et le nom.

```csharp
Console.WriteLine(NomComplet("Benoit", "Desrosiers"));

static string NomComplet(string Prenom, string Nom)
{
    return "Mon nom est " + Prenom + " " + Nom + ".";
}
```

La concaténation avec des **+** n'est pas la plus optimale. Il existe plusieurs façons de le faire.

L'utilisation de la fonction **String.Format**. Le **{0}** correspond au premier argument **{1}** au deuxième argument et ainsi de suite.

```csharp
    return String.Format("Mon nom est {0} {1}.", Prenom, Nom);
```

Il est possible d'utiliser l'interpolation **$**. Il faut mettre le nom de la variable/champs/propriété/logique... entre **\{ \}**.

```csharp
    return $"Mon nom est {Prenom} {Nom}.";
```

```csharp
static string NomComplet2Lignes(string Prenom, string Nom)
{
    return $"Mon prénom est {Prenom}.{Environment.NewLine}Mon nom est {Nom}.";
}
```

Il est possible de formater une valeur dans un format spécifique. L'exemple ci-dessous va afficher la date d'anniversaire selon le format spécifier dans votre système d'exploitation. Généralement en Français Canada, la date s'affiche en **yyy/MM/dd**.

```csharp
string anniversaire1 = $"Mon anniversaire est le {DateNaissance}"; //Mon anniversaire est le 1980-02-20 00:00:00
string anniversaire2 = $"Mon anniversaire est le {DateNaissance:dd/MM/yyyy}"; //Mon anniversaire est le 20-02-1980
```

S'il faut inscrire réellement les caractères **\{** et **\}**, il faut le faire double.

```csharp
string phrase = $"Mon nom est {Prenom} {Nom}. {{123}}"; 
//La valeur de phrase est : Mon nom est François St-Hilaire. {123}

```

Il existe l'indicateur **@**. Il sert à ignorer le **\\**  comme étant un caractère d'échappement et de permettre de faire une chaine de caractère sur plusieurs lignes. Le retour dans le texte sera considéré comme un **\r\n**.

```csharp
string phrase = @"Mon prénom est François.
Mon nom est St-Hilaire";
//La valeur de phrase est : Mon nom est François\r\n.Mon nom est St-Hilaire.
```

Il peut devenir difficile de gérer ce genre de string. Personnellement, j'utilise uniquement le **@** pour les chemins.

```csharp
string path1 = "C:\\Test\\Fichier.txt"; //On doit utiliser le double \ pour faire un \ en caractère écrit.
string path2 = @"C:\Test\Fichier.txt"; //Plus facile à lire.
```

Pour les requêtes SQL, le **@** est très utile pour appliquer une mise en forme à la SQL.

```csharp
string sql = @"SELECT
					Nom,
					Prenom,
					Cours
				FROM Etudiants
				WHERE
					Etudiant = 1;";
```

Il est possible de combiner le **$** et le **@**.

https://docs.microsoft.com/fr-ca/dotnet/csharp/language-reference/tokens/interpolated

https://docs.microsoft.com/fr-ca/dotnet/csharp/language-reference/tokens/verbatim

## Les classes

Voici une classe en c#. Cette classe a été créée dans un projet qui se nomme **DemoCours1**. Cette classe sera utilisée pour illustrer plusieurs concepts en c#.

```csharp
namespace DemoCours1.Modeles;

/// <summary>
/// Classe qui contient l'information d'une personne
/// </summary>
public class Personne
{
    private string _prenom;
    private string _nom;
    private DateTime _dateNaissance;

    /// <summary>
    /// Constructeur par défaut sans arguments
    /// </summary>
    public Personne()
    {
        
    }

    /// <summary>
    /// Constructeur avec paramètres
    /// </summary>
    /// <param name="prenom">Le prénom de la personne</param>
    /// <param name="nom">Le nom de la personne</param>
    /// <param name="dateNaissance">La date de naissance de la personne</param>
    public Personne(string prenom, string nom, DateTime dateNaissance)
    {
        _prenom = prenom;
        _nom = nom; 
        _dateNaissance = dateNaissance;
    }

    /// <summary>
    /// Créer la phrase "Mon nom est " avec l'information de la personne.
    /// </summary>
    /// <returns>La phrase "Mon nom est"</returns>
    public string NomComplet()
    {
        return "Mon nom est " + _prenom + " " + _nom + ".";
    }

    /// <summary>
    /// Calcule l'âge de la personne en date d'aujourd'hui.
    /// </summary>
    /// <returns>Âge de la personne</returns>
    public int CalculAge()
    {
        DateTime aujourdhui = DateTime.Now.Date;
        
        int age = aujourdhui.Year - _dateNaissance.Year;

        if(aujourdhui.DayOfYear < _dateNaissance.DayOfYear)
        {
            age--;
        }

        return age;
    }

    /// <summary>
    /// Assigne ou obtient le prénom de la personne
    /// </summary>
    public string Prenom
    {
        get
        {
            return _prenom;
        }
        set
        {
            _prenom = value;
        }
    }

    /// <summary>
    /// Assigne ou obtient le nom de la personne
    /// </summary>
    public string Nom
    {
        get
        {
            return _nom;
        }
        set
        {
            _nom = value;
        }
    }

    /// <summary>
    /// Assigne ou obtient la date de naissance de la personne
    /// </summary>
    public DateTime DateNaissance
    {
        get
        {
            return _dateNaissance;
        }
        set
        {
            _dateNaissance = value;
        }
    }
}
```

### namespace

Le **namespace** en c# consiste à une organisation logique de vos classes.  Lorsqu'une classe est créée dans un projet, le **namespace** se crée automatiquement en fonction de la structure physique du fichier.

Pour la structure de fichier ci-dessous, le **namespace** est **DemoCours1.Modeles**

```
DemoCours1/
├── Modeles/
|	├── Personne.cs
```

**ATTENTION** : Si une classe est déplacée dans un nouveau dossier ou si le dossier est renommé, le **namespace** ne sera pas mis à jour automatiquement. Il est important de le modifier afin d'avoir une structure logique et physique cohérente.

En réalité, le nom complet d'une classe consiste au **namespace** et au nom de la classe. Dans notre exemple, le nom complet de la classe est **DemoCours1.Personne** au niveau du projet. Il est possible d'avoir plusieurs classes **Personne** dans le même projet tant que leur **namespace** est différent.

```
DemoCours1/
├── Modeles1/
|	├── Personne.cs  -- Le nom complet de la classe est DemoCours1.Modeles1.Personne
├── Modeles2/
|	├── Personne.cs  -- Le nom complet de la classe est DemoCours1.Modeles2.Personne
```

Depuis **.Net 6**, il est possible d'utiliser la notation **étendue de fichier** pour la déclaration du **namespace**. Cette mise en forme est plus compacte et elle sera utilisé dans les cours. Le **namespace** est déclaré sur une seule ligne et se termine par un point-virgule **;**. La classe doit être déclarée à la suite du **namespace**. Cette notation n'est pas configuré par défaut dans Visual Studio 2022. Référez-vous au document d'installation et de configuration pour effectuer le changement.

```csharp
//Déclaration en étendue de fichier
namespace DemoCours1.Modeles;

public class Personne
{
	//Contenu de la classe
}
```

L'ancienne notation est le **bloc** de code.  La classe est déclarée à l'intéreur du bloc de code du **namespace**.

```csharp
//Déclaration en bloc de code
namespace DemoCours1.Modeles
{
	public class Personne
    {
        //Contenu de la classe
    }
}
```



### Champs

Aussi appelé **attribut**
:::info
En anglais, utilisé le terme **field** et non attribut car attribut réfère à autre chose en c# en anglais
:::

En c#, la convention la plus acceptée pour les champs est d'utiliser le préfix **_** (*underscore*) au début de son nom.

```csharp
private string _prenom;
private string _nom;
private DateTime _dateNaissance;
```

:::tip
Pour avoir accès rapidement à tous les champs, il suffit de taper le **_** et l'intellisense s'occupe du reste.
:::

Les champs sont également en haut de la classe.

### Constructeur

Il n'est pas obligatoire de mettre le constructeur par défaut dans une classe lorsqu'il y a uniquement un constructeur. La classe ci-dessous est entièrement fonctionnelle.

```csharp
namespace DemoCours1.Modeles;

/// <summary>
/// Classe qui contient l'information d'une personne
/// </summary>
public class Personne
{
    private string _prenom;
    private string _nom;
    private DateTime _dateNaissance;           

    /// <summary>
    /// Assigne ou obtient le prénom de la personne
    /// </summary>
    public string Prenom
    {
        get
        {
            return _prenom;
        }
        set
        {
            _prenom = value;
        }
    }

    /// <summary>
    /// Assigne ou obtient le nom de la personne
    /// </summary>
    public string Nom
    {
        get
        {
            return _nom;
        }
        set
        {
            _nom = value;
        }
    }

    /// <summary>
    /// Assigne ou obtient la date de naissance de la personne
    /// </summary>
    public DateTime DateNaissance
    {
        get
        {
            return _dateNaissance;
        }
        set
        {
            _dateNaissance = value;
        }
    }
}
```

Par contre, aussitôt qu'il existe une surcharge de constructeur, il est obligatoire de mettre le constructeur par défaut s'il est nécessaire.

```csharp
namespace DemoCours1.Modeles;

/// <summary>
/// Classe qui contient l'information d'une personne
/// </summary>
public class Personne
{
    private string _prenom;
    private string _nom;
    private DateTime _dateNaissance;           

    /// <summary>
    /// Constructeur avec paramètres
    /// </summary>
    /// <param name="prenom">Le prénom de la personne</param>
    /// <param name="nom">Le nom de la personne</param>
    /// <param name="dateNaissance">La date de naissance de la personne</param>
    public Personne(string prenom, string nom, DateTime dateNaissance)
    {
        _prenom = prenom;
        _nom = nom; 
        _dateNaissance = dateNaissance;
    }
    
    /// <summary>
    /// Assigne ou obtient le prénom de la personne
    /// </summary>
    public string Prenom
    {
        get
        {
            return _prenom;
        }
        set
        {
            _prenom = value;
        }
    }

    /// <summary>
    /// Assigne ou obtient le nom de la personne
    /// </summary>
    public string Nom
    {
        get
        {
            return _nom;
        }
        set
        {
            _nom = value;
        }
    }

    /// <summary>
    /// Assigne ou obtient la date de naissance de la personne
    /// </summary>
    public DateTime DateNaissance
    {
        get
        {
            return _dateNaissance;
        }
        set
        {
            _dateNaissance = value;
        }
    }
}
```

Il ne sera pas possible de créer un objet comme ci-dessous.

```csharp
Personne p = new Personne(); //Erreur compilateur CS7036

Personne p = new Personne("François", "St-Hilaire", new DateTime(1980, 2, 20))
```

### Propriété

En c#, les propriétés sont principalement utilisées comme **getter/setter**. La propriété commence toujours par une majuscule. 

```csharp
public class Personne
{
	private string _prenom;
    
    /// <summary>
    /// Assigne ou obtient le prénom de la personne
    /// </summary>
    public string Prenom
    {
    	get
        {
            return _prenom;
        }
        set
        {
            _prenom = value;
        }
    }
}
```

Il est possible d'ajouter de la logique dans un **get** ou un **set**, mais elle doit être minimale. Il faut voir les propriétés comme étant des **getter/setter**.

Il est possible de faire plus simple encore en utilisant la notation ci-dessous.

```csharp
public class Personne
{
	private string _prenom;
    
    /// <summary>
    /// Assigne ou obtient le prénom de la personne
    /// </summary>
    public string Prenom
    {
        get => _prenom;
        set => _prenom = value;
    }
}
```

En c#, les champs sont rarement utilisés lorsqu'ils sont assignés par des propriétés sans aucune modification. La propriété devient donc un **champ** de la classe. C'est la notation la plus utilisée. 

:::info
La déclaration de le champs **_prenom** n'est plus là. 
:::

```csharp
public class Personne
{
    public class Personne
	{  
        /// <summary>
        /// Assigne ou obtient le prénom de la personne
        /// </summary>
        public string Prenom { get; set; }
    }
}
```

Qu'est-ce qu'il faut faire dans le cas d'une classe immuable, c'est-à-dire qu'il n'est pas possible de modifier le contenu de ses champs une fois l'objet créé ?

En notation plus classique, on enlève le bloc du **set** de la propriété.

```csharp
public class Personne
{
	private string _prenom;
    
    public Personne(string prenom)
    {
        _prenom = prenom;
    }
    
    /// <summary>
    /// Assigne ou obtient le prénom de la personne
    /// </summary>
    public string Prenom
    {
    	get
        {
            return _prenom;
        }
        //Aucune logique pour le SET
    }
}
```

Dans la notation avec des propriétés uniquement, il faut mettre un **private set**. Le **private set** indique que l'assignation est disponible uniquement à l'intérieur de la classe, mais de l'extérieur, il ne sera pas possible de mettre à jour le champ.

```csharp
public class Personne
{
    public Personne(string prenom)
    {
       Prenom = prenom;
    }
    
    /// <summary>
    /// Assigne ou obtient le prénom de la personne
    /// </summary>
    public string Prenom { get; private set; }
}
```

Il peut être utile de mettre des valeurs par défaut à une propriété. Une technique classique est de mettre les valeurs initiales dans le constructeur par défaut.

```csharp
public class Personne
{
    public Personne()
    {
       Prenom = "Bob"; //Valeur par défaut
    }
    
    /// <summary>
    /// Assigne ou obtient le prénom de la personne
    /// </summary>
    public string Prenom { get; set; }
}
```

Mais il est possible de mettre la valeur par défaut directement au niveau de la propriété.

```csharp
public class Personne
{
    /// <summary>
    /// Assigne ou obtient le prénom de la personne
    /// </summary>
    public string Prenom { get; set; } = "Bob" //Valeur par défaut
}
```

### using

Il est possible d'utiliser une classe directement si elle est située dans le même **namespace**. Mais dans la majorité des cas, les classes ne sont pas dans le même **namespace**.

Il y a 2 façons d'utiliser les classes. 

- En utilisant un **using**

  ```csharp
  using DemoCours1.Modeles;
  
  namespace DemoCours1;
  
  public class Program
  {
      static void Main(string[] args)
      {
          //La classe personne est dans le namespace DemoCours1.Modeles
          Personne p = new Personne();
      }
  }
  ```

  Dans le haut d'un fichier .cs, il est possible de mettre un using pour indiquer que le fichier en cours est en mesure d'utiliser les classes directement.

  > **ASTUCES Visual Studio**
  >
  > **ASTUCE #1** : Il est possible d'ajouter automatiquement le **using** en effectuant **ALT+Enter**,  **ALT+SHIFT+F10** ou **CTRL+.** pour afficher le menu contextuel lorsque le curseur est sur la classe à utiliser.
  >
  > **ASTUCE #2** : Il est possible de trier les **using** en ordre alphabétique et retirer ceux qui sont inutiles en effectuant **CTRL+R+G**.

  

- En utilisant le nom complet de la classe. 

  ```csharp
  DemoCours1.Modeles.Personne personne = new Personne();
  ```

  Cette notation est très rarement utilisée. Le seul cas où il est obligatoire de l'utiliser est lorsqu'il y a une ambiguïté avec le nom, c'est-à-dire qu'il y a 2 classes de disponibles avec le même nom et le compilateur n'est pas en mesure de savoir laquelle il doit utiliser.

### global using

Le **global using** permet de déclarer des **using** qui peuvent être nécessaire pour la majorité des classes d'un projet.
Il faut déclarer les **global using** dans un fichier nommé **Usings.cs** à la racine du projet.

Si la solution contient plusieurs projets, le **global using** est accessible uniquement dans le projet dans lequel il a été déclaré.

```csharp
global using System;
global using System.Collections.Generic;
global using System.Linq;
```

### Assignation de propriétés et création d'un objet.

Dans le cas de notre classe **Personne**, avec un constructeur par défaut et uniquement des propriétés comme ci-dessous.

```csharp
public class Personne
{
    /// <summary>
    /// Assigne ou obtient le prénom de la personne
    /// </summary>
    public string Prenom { get; set; }
    
    /// <summary>
    /// Assigne ou obtient le nom de la personne
    /// </summary>
    public string Nom { get; set; }
    
    /// <summary>
    /// Assigne ou obtient la date de naissance de la personne
    /// </summary>
    public DateTime DateNaissance
}
```

Pour assigner les valeurs aux propriétés, il est possible de le faire comme ci-dessous. C'est une notation classique.

```csharp
Personne enseignant = new Personne();
enseignant.Prenom = "François";
enseignant.Nom = "St-Hilaire";
enseignant.DateNaissance = new DateTime(1980, 2, 20);
```

Avec c#, il est possible de le faire directement lors de la construction de l'objet.

```csharp
Personne enseignant = new Personne()
{
    Prenom = "François",
    Nom = "St-Hilaire",
    DateNaissance = new DateTime(1980, 2, 20)        
};
```



### this

Le terme **this** permet d'utiliser un élément appartenant à une classe. Par exemple, une classe a un champs qui se nomme **nom** et une méthode utilise une variable **nom** également. Est-ce que le nom affiché sera **Bart Simpson** ou **François St-Hilaire** pour chacun des exemples ?

```csharp


Exemple exemple1 = new Exemple();
exemple1.AfficheNom("Bart Simpson");

Exemple exemple2 = new Exemple();
exemple2.AssigneNom("Bart Simpson");
exemple2.AfficheNom();

public class Exemple
{
	private string nom = "François St-Hilaire";
	
    public void AssigneNom(string nom)
    {
        nom = nom;
    }
    
    public void AfficheNom(string nom)
	{
		Console.WriteLine(nom);
	}
    
	public void AfficheNom()
	{
		Console.WriteLine(nom);
	}
}

```

La réponse est **Bart Simpson** pour l'exemple 1 et **François St-Hilaire** pour l'exemple 2.

Si un nom de variable est utilisé sans le **this**, le compilateur utilisera la variable qui a été déclarée le plus près de son bloc de code. Dans ce cas-ci, c'est le paramètre qui est le plus près. Il s'agit d'une assignation sur lui-même. Le compilateur donnera un avertissement pour ce code.

```csharp
public void AssigneNom(string nom)
{
        nom = nom;
}
```

Pour assigner le contenu du paramètre **nom** dans de le champs **nom**, il faut inscrire le code comme ci-dessous. 

```csharp
public void AssigneNom(string nom)
{
        this.nom = nom;
}
```

Pour éviter toute ambiguïté, la méthode **AfficheNom()** sans paramètre devrait être comme ci-dessous, même si elle fonctionne avec le code original.

```csharp
public void AfficheNom()
{
	Console.WriteLine(this.nom);
}
```

Il est préférable d'utiliser des champs avec le préfixe **_** pour éviter ces problèmes.

## Interface, classe abstraite et héritage

Le c# est un langage orienté objet, donc il est possible d'hériter d'une interface, d'une classe ordinaire ou d'une classe abstraite.

### Interface

La convention en c# est de nommer une interface avec le préfixe **I** (Lettre i en majuscule) suivi du nom de l'interface.

Une interface peut avoir comme élément :

- Méthode;
- Propriété;
- Événement;
- Indexeur.

À partir de la version 8 de c#, il est possible d'implémenter des constantes et des éléments statiques.

Pour plus d'information sur les possibilités avancées des interfaces : https://docs.microsoft.com/fr-ca/dotnet/csharp/language-reference/keywords/interface

Voici un exemple d'interface qui représente la classe Personne créée au début de la leçon.

```csharp
namespace DemoCours1.Modeles;

public interface IPersonne
{
    string NomComplet();
    void CalculAge();        

    string Prenom { get; set; }
    string Nom { get; set; }
    DateTime DateNaissance { get; set; }
}
```

La visibilité de l'interface va déterminer la visibilité de ses membres. Il n'est pas nécessaire d'ajouter **public** à la méthode **NomComplet()**. Elle sera **public** dans l'implémentation de la classe.

Une interface utilise le même principe du **namespace** que les classes.

### Classe abstraite

Une classe abstraite est une classe qui ne peut pas être instanciée. Elle est peut-être héritée par une classe uniquement.

Il n'existe pas de convention officielle pour nommer une classe abstraite en c#. Il y a 3 options selon la communauté.

- Avoir un nom significatif, sans aucun préfixe/suffixe;
- Utiliser le préfixe **Base** suivi du nom de la classe;
- Utiliser le préfixe **A** suivit du nom de la classe.

Dans le cadre du cours, nous utiliserons le préfixe **Base**.

Voici un exemple d'une classe abstraite.

```csharp
namespace DemoCours1.Modeles;

/// <summary>
/// Classe de base représentant une personne
/// </summary>
public abstract class BasePersonne
{
    /// <summary>
    /// Constructeur d'initialisation des valeurs
    /// </summary>
    /// <param name="prenom">Le prénom de la personne</param>
    /// <param name="nom">Le nom de la personne</param>
    /// <param name="dateNaissance">La date de naissance de la personne</param>
    public BasePersonne(string prenom, string nom, DateTime dateNaissance)
    {
        Prenom = prenom;
        Nom = nom;
        DateNaissance = dateNaissance;
    }

    /// <summary>
    /// Calcule l'âge de la personne en date d'aujourd'hui.
    /// </summary>
    /// <returns>Âge de la personne</returns>
    public int CalculAge()
    {
        DateTime aujourdhui = DateTime.Now.Date;

        int age = aujourdhui.Year - DateNaissance.Year;

        if (aujourdhui.DayOfYear < DateNaissance.DayOfYear)
        {
            age--;
        }

        return age;
    }
    
    /// <summary>
    /// Créer la phrase "Mon nom est " avec l'information de la personne.
    /// </summary>
    /// <returns>La phrase "Mon nom est"</returns>
    public virtual string NomComplet()
    {
        return $"Mon nom est {Prenom} {Nom}.";
    }

    /// <summary>
    /// Créer la phrase de salutation pour la personne.
    /// </summary>
    /// <returns>Phrase de salutation</returns>
    public abstract string Salutation();

    public string Prenom { get; protected set; }
    public string Nom { get; protected set; }
    public DateTime DateNaissance { get; protected set; }
}
```

Une classe abstraite respecte les mêmes conditions pour le constructeur pour une classe ordinaire. 

La méthode **CalculeAge()** est **public** et possède une implémentation. Elle sera la même pour tous les types de personnes.

La méthode **NomComplet()** est **virtual**. Une méthode virtuelle consiste à l'implémentation générale de la méthode, mais il est possible pour une sous-classe d'avoir sa propre implémentation. Par exemple, une sous-classe **Medecin**, le résultat de cette méthode pourrait être **"Mon nom est Dr ..."**.

La méthode **Salutation()** est **abstract**. Ce qui signifie qu'elle doit obligatoirement avoir une implémentation spécifique dans la sous-classe.

Pour les propriétés, le **set** est **protected**. Ce qui signifie que l'assignation est possible uniquement pour la classe abstraite et ses sous-classes. 

Il est possible de mettre **abstract** et **virtual** pour des propriétés également.

### Héritage

Pour ajouter de l'héritage à une classe, il faut ajouter les deux points **:** après le nom de la classe. 

Dans l'exemple ci-dessous, la classe **Personne** hérite de l'interface **IPersonne**. La syntaxe est la même pour l'héritage d'une interface ou d'une classe.

```csharp
/// <summary>
/// Classe qui contient l'information d'une personne
/// </summary>
public class Personne : IPersonne
{
}
```

Le c# ne supporte pas l'héritage multiple. Il est possible d'hériter d'une seule classe à la fois. Mais il est possible d'hériter de plusieurs interfaces.

Pour être en mesure d'hériter de plusieurs éléments, il faut ajouter **,** (virgule) entre chacun des éléments. 

```csharp
/// <summary>
/// Classe qui contient l'information d'un étudiant
/// </summary>
public class Etudiant : Personne, IEtudiant
{
}
```

**IMPORTANT** : Si la classe hérite d'une classe et aussi d'interfaces, la classe doit être obligatoirement le premier élément après les **:**. Le compilateur va générer l'erreur **CS1722**.

```csharp
/// <summary>
/// Classe qui contient l'information d'un étudiant
/// </summary>
public class Etudiant : IEtudiant, Personne //Erreur CS1722 
{

}
```

> **ASTUCES Visual Studio**
>
> **ASTUCE #1**  : Il est possible d'implémenter tous les membres en effectuant **ALT+Enter**,  **ALT+SHIFT+F10** ou **CTRL+.** pour afficher le menu contextuel lorsque le curseur est sur le mot de l'interface ou de la classe à hériter.
>
> **ASTUCE #2** : Pour accéder directement à la définition d'une classe ou d'une interface, il suffit de faire **F12** lorsque le curseur est sur le mot.
>
> **ASTUCE #3** : Pour accéder directement à la l'implémentation d'une méthode, il suffit de faire **CTRL+F12** lorsque le curseur est sur le mot.

### Héritage d'une classe abstraite

Voici l'implémentation d'une classe **Professionnel** qui hérite de la classe abstraite **BasePersonne**.

```csharp
namespace DemoCours1.Modeles;

public class Professionnel : BasePersonne
{
    /// <summary>
    /// Constructeur d'initialisation des valeurs
    /// </summary>
    /// <param name="titre">Le titre de la profession</param>
    /// <param name="prenom">Le prénom de la personne</param>
    /// <param name="nom">Le nom de la personne</param>
    /// <param name="dateNaissance">La date de naissance de la personne</param>
    public Professionnel(string titre, string prenom, string nom, DateTime dateNaissance)
             : base(prenom, nom, dateNaissance)
    {
        Titre = titre;
    }

    /// <summary>
    /// Créer la phrase de salutation pour le profesionnel.
    /// </summary>
    /// <returns>Phrase de salutation</returns>
    public override string Salutation()
    {
        return $"Bonjour {Titre} {Prenom} {Nom}.";
    }        

    public string Titre { get; private set; }        
}
```

Au niveau du constructeur, il y a le **: base(...)**. Le terme **base** fait référence au parent d'une classe. 

> **ASTUCE Visual Studio**
>
> **ASTUCE #1** : Il est possible de gérer automatiquement les constructeurs obligatoires en effectuant **ALT+Enter**,  **ALT+SHIFT+F10** ou **CTRL+.** pour afficher le menu contextuel lorsque le curseur est sur le nom de la classe. Par contre, seulement les paramètres obligatoires seront générés.
>
> La méthode **Salutation()** est obligatoire, car elle est **abstract** dans la classe **BasePersonne**. Pour être en mesure d'implémenter la méthode, il faut utiliser le terme **override**. 
>
> **ASTUCE #2** : Visual Studio propose tous les éléments disponibles lorsqu'on inscrit uniquement **override**. Il est donc possible de générer rapidement la méthode. 

La méthode **NomComplet()** n'est pas obligatoire, car elle est **virtual**. Mais si on désire de l'implémenter dans la classe enfant, il faut également utiliser le terme **override**. 

Pour une méthode, la méthode autogénérée sera comme ci-dessous.

```csharp
public override string NomComplet()
{
    return base.NomComplet();
}
```

Le terme **base** permet également de spécifier l'utilisation d'un élément appartenant à la classe parent dans le cas d'une ambiguïté avec un élément de la classe enfant. Dans des méthodes liées à un cycle de vie, il est possible que nous désirions toujours appeler l'implémentation de la classe parent.

```csharp
public override string NomComplet()
{
    return $"Mon nom est {Titre} {Prenom} {Nom}.";
}
```

## Les opérateurs

Il existe plusieurs opérateurs en c#. En voici des particuliers à c# que vous risquez de voir dans la documentation.

### Opération conditionnelle ou ternaire (? :)

L'opération ternaire consiste à faire un **if/else** sur une seule ligne.

```csharp
public string Salutation()
{
	if(CalculAge() > 50)
	{
		return "Bonjour le vieux.";
	}
	else    
	{
 	   return "Bonjour le jeune !".
	}
}

public string SalutationTernaire()
{
	return $"Bonjour le {(CalculAge() > 50 ? "vieux" : "jeune")}.";
}
```

### Le ??

Le **??** permet de prendre action si une valeur est **null**. Elle est utilisée dans un contexte de vérification.

```csharp
public string Prenom
{
    get => _prenom;
    set => _prenom = value ?? throw new Exception("Le prénom ne peut pas être assigné à null.");
}
```

https://docs.microsoft.com/fr-ca/dotnet/csharp/language-reference/operators/null-coalescing-operator 

### Le ??=

Le **??=** permet d'assigner une valeur par défaut lorsque la valeur est **null**. 

```csharp
if(Prenom is null)
{
	Prenom = "Bob";
}

//Peut être remplacé par
Prenom ??= "Bob";
```

https://docs.microsoft.com/fr-ca/dotnet/csharp/language-reference/operators/null-coalescing-operator

### Le ?.

Le **?.** permet d'accéder à des éléments d'un objet sans générer une exception **null** si on y accède directement.

Par exemple, une personne a un animal de compagnie. Nous voulons vérifier si c'est l'anniversaire de son animal aujourd'hui.

```csharp
//La personne a un animal de compagnie
if(DateTime.Now.Day == personne.animal.DateNaissance.Day   
&& DateTime.Now.Month == personne.animal.DateNaissance.Month)
{
	//C'est l'anniversaire de l'animal de compagnie
}
```

Le code ci-dessus peut générer une exception, si aucun animal de compagnie n’a été créé pour cette personne.

Pour éviter de générer une exception, il faut ajouter une vérification avant d'accéder à la propriété DateNaissance de l'animal.

```csharp
//Vérifie si la personne a un animal de compagnie.
if(personne.animal != null)
{
	//La personne a un animal de compagnie
	if(DateTime.Now.Day == personne.animal.DateNaissance.Day   
       && DateTime.Now.Month == personne.animal.DateNaissance.Month)
	{
		//C'est l'anniversaire de l'animal de compagnie
	}
}
```

Il est possible d'alléger le code en utilisant le **?.** comme ci-dessous. Le **?.** indique que nous acceptons que l'animal puisse être **null** et la vérification sera en fait une vérification entre **int** et **null**, ce qui donne toujours faux.

```csharp
if(DateTime.Now.Day == personne?.animal.DateNaissance.Day 
&& DateTime.Now.Month == personne?.animal.DateNaissance.Month)
{
	//C'est l'anniversaire de l'animal de compagnie
}
```


## Classe et méthode générique

Pour plus d'information : https://learn.microsoft.com/fr-fr/dotnet/csharp/fundamentals/types/generics

L'utilisation de classe générique permet de généraliser les classes afin d'éviter de créer plusieurs classes spécifiques et de méthodes spécifiques.

Les classes et les méthodes génériques ont à la fin de leur nom le **\<\>**. Le **\<\>** permet d'indiquer le type réel qui doit être utilisé pour l'instance de la classe ou pour l'utilisation de la méthode.

La classe générique la plus populaire en **C#** est **List\<T\>**. La lettre **T** est la norme pour indiquer que le type est générique.

Prenez par exemple qu'il faut avoir une collection de la classe **Personne**.

```csharp
public class Personne
{
    public string Prenom { get; set; }
    public string Nom { get; set; }
    public int Age { get; set; }
}
```

Avant d'avoir une collection de type **List\<T\>**, il avait 2 options.

- **Créer une collection d'objets**

  Par exemple, en **C#**, il y a la collection **ArrayList**. Voici la signature de la méthode **Add(objet? value)**. Cette collection permet d'ajouter des classes du type **objet**, donc tous les types de classes.

  Il est possible d'ajouter plusieurs types de données dans la même collection. C'est rarement un comportement désiré dans une liste.

  ```csharp
  ArrayList listePersonne = new ArrayList();
  liste.Add(1); //Un entier
  liste.Add("une string"); //Une string
  liste.Add(3.04m); //Un decimal
  liste.Add(new DateTime(2011,11,11)); //Un objet DateTime
  liste.Add(new Personne() {Prenom = "Francois", Nom = "St-Hilaire", Age = 21}); //Un objet de type personne
  
  ```

- **Créer une classe Collection spécifique à un type.**

  Cette approche permet de créer une classe qui s'occupera d'ajouter des objets d'un seul type. Cette classe permet d'encapsuler la mécanique interne pour ajouter, pour enlever et pour obtenir uniquement pour le type **Personne**. Le gros désavantage est qu'il faut créer une classe **Collection** spécifique pour toutes les classes de l'application qui nécessite une collection.
  
  ```csharp
  public class CollectionPersonne
  {
      private ArrayList _arrPersonne = new ArrayList();
  
      public void Ajouter(Personne personne)
      {
          _arrPersonne.Add(personne);
      }
  
      public Personne Obtenir(int index)
      {
          if (index < _arrPersonne.Count)
          {
              return (Personne)_arrPersonne[index];
          }
          else
          {
              throw new Exception($"La liste a {_arrPersonne.Count} élément(s)");
          }
      }
  }
  ```
  
  Voici comment l'utiliser.
  
  ```csharp
  CollectionPersonne liste = new CollectionPersonne();
  
  liste.Ajouter(new Personne() { Prenom = "Francois", Nom = "St-Hilaire", Age = 21 });
  liste.Ajouter(new Personne() { Prenom = "Stéphane", Nom = "Janvier", Age = 61 });
  
  Personne p2 = liste.Obtenir(1);
  
  Console.WriteLine($"La personne est {p2.Prenom} { p2.Nom }.");
  
  liste.Ajouter(4); //Erreur du compilateur. Seulement le type **Personne** qui est accepté.
  ```

Maintenant, avec les classes génériques, il est possible de généraliser un comportement et de spécifier un type à une instance précise.

  Voici une simplification de la classe **List\<T\>**. 
	
```csharp
public class ListeGenerique<T>
{
    private ArrayList _arr = new ArrayList();

    public void Ajouter(T valeur)
    {
        _arr.Add(valeur);
    }

    public T Obtenir(int index)
    {
        if (index < _arr.Count)
        {
            return (T)_arr[index];
        }
        else
        {
            throw new Exception($"La liste a {_arr.Count} élément(s)");
        }
    }
}
```
	
	Dans la déclaration de la classe, il y a le **\<T\>** qui indique qu'il faut obligatoirement spécifier un type lors de la création d'un objet.
	
	Le type générique **T** est utilisé comme type pour le paramètre de la méthode **void Ajouter(T valeur)**.
	
	Le type générique **T** est utilisé comme type de retour de la méthode **T Obtenir(int index)**.
	
	Donc, si une liste est créé avec le type **Personne** **new ListeGenerique\<Personne\>()** , le compilateur va générer **void Ajouter(Personne valeur)** et  **Personne Obtenir(int index)**.
	
	Voici comment l'utiliser.
	
	```csharp
	ListeGenerique<Personne> liste = new ListeGenerique<Personne>();
	
	liste.Ajouter(new Personne() { Prenom = "Francois", Nom = "St-Hilaire", Age = 21 });
	liste.Ajouter(new Personne() { Prenom = "Stéphane", Nom = "Janvier", Age = 61 });
	
	Personne p2 = liste.Obtenir(1);
	
	Console.WriteLine($"La personne est {p2.Prenom} { p2.Nom }.");
	
	liste.Ajouter(4); //Erreur du compilateur
	```
	
	Avec la même liste, il est possible de faire des ajouts de **DateTime** par exemple.
	
	```csharp
	ListeGenerique<DateTime> listeDate = new ListeGenerique<DateTime>();
	
	listeDate.Ajouter(new DateTime(1967, 2, 1));
	listeDate.Ajouter(new DateTime(1957, 6, 29));
	
	DateTime d2 = listeDate.Obtenir(1);
	
	Console.WriteLine($"La date est {d2}.");
	
	listeDate.Ajouter(4); //Erreur du compilateur
	```
	