---
sidebar_position: 360
draft: false
---


<!-- ****** est-ce pertinent???  ***** -->
# Modèle de données pour Gestion d'une carte - Explication

Le modèle **CarteDetailModel** a été utilisé pour la liste des cartes.

```csharp showLineNumbers title="NE PAS COPIER"
public class CarteDetailModel
{
    public int CarteId { get; set; }

    public string Nom { get; set; } = null!;

    public short Vie { get; set; }

    public short Armure { get; set; }

    public short Attaque { get; set; }

    public bool EstRare { get; set; }

    public decimal PrixRevente { get; set; }

    public int CategorieId { get; set; }

    public string CategorieNom { get; set; } = null!;

    public int EnsembleId { get; set; }

    public string EnsembleNom { get; set; } = null!;
}
```

Par contre, pour la gestion d'une seule carte, l'information des clés étrangères n'est pas nécessaire. 

Il y a des programmeurs qui utilisent la même classe. La propriété **public string EnsembleNom** n'accepte pas les **null** par sa définition. En laissant le champ vide, ça indique tout de même au programmeur qu'il devrait avoir une valeur. C'est le même principe que le modèle de données et les propriétés de navigation de **Entity Framework**. Ça évite de créer plusieurs classes dans un projet.

Il y a des programmeurs qui préfèrent avoir des modèles de données qui ont seulement les données nécessaires pour diminuer la taille des objets en mémoire, le temps de transfert et d'éviter d'avoir une **méga-classe** avec une bonne proportion des champs inutilisés selon le cas d'utilisation. Il faut donc une 2e classe pour respecter cette vision.

Les 2 visions ont leurs avantages et leurs inconvénients, mais pour ce projet et le **TP 3**, il faudra avoir 2 classes différentes.

Voici la classe **CarteModel** qu'il faudrait utiliser sans le détail de la clé étrangère.

```csharp showLineNumbers
public class CarteModel
{
    public int CarteId { get; set; }

    public string Nom { get; set; } = null!;

    public short Vie { get; set; }

    public short Armure { get; set; }

    public short Attaque { get; set; }

    public bool EstRare { get; set; }

    public decimal PrixRevente { get; set; }

    public int CategorieId { get; set; }

    public int EnsembleId { get; set; }
}
```

C'est pratiquement la même classe. Il y a beaucoup de répétition et ce n'est pas très **DRY**.

Ce sont des classes, donc il est possible d'utiliser l'héritage pour éviter la répétition des propriétés. Si une nouvelle propriété de base est ajoutée, il ne sera pas nécessaire de l'ajouter dans les autres classes.

Donc la classe **CarteDetailModel** devrait être ceci.

```csharp showLineNumbers
public class CarteDetailModel : CarteModel
{    
    public string CategorieNom { get; set; } = null!;
    
    public string EnsembleNom { get; set; } = null!;
}
```

Pour le **TP 3**, vous devez appliquer cette approche pour les modules qui utilisent des clés étrangères.
