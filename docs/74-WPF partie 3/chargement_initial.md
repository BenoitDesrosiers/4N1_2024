---
sidebar_position: 330
draft: true
---

# Chargement automatique

Pour une vue de gestion, il arrive souvent que le chargement initial s'effectue en **synchrone**.

Si le chargement synchrone est long, il ne faut pas avoir un formulaire vide pendant ce chargement. Il est préférable d'attendre le chargement initial avant d'afficher la vue. 

Il serait aussi possible de faire le chargement en asynchrone et de de verrouiller le formulaire au départ afin d'éviter la modification. Mais même si le délai n'est pas énorme, il est possible de voir un **clignotement** entre champ vide et l'affichage des valeurs.

:::note
Pour ce projet et le **TP 3**, le chargement automatique se fera en **synchrone**. Également, il est idéal que ce soit le **ViewModel** qui gère le chargement automatique lorsqu'il reçoit le paramètre de la clé primaire.
:::

Le chargement se fera lors de l'assignation des paramètres du **ViewModel** dans **AssignerParametre**.

## SuperCarte.Core

### Ajout de la méthode Obtenir en synchrone dans le service - CategorieService

Dans **CategorieService**, il y a déjà une méthode pour charger de facon asynchrone (**ObtenirAsync()** ). Nous allons ici ajouter son équivalent synchrone. 

Dans l'interface **ICategorieService**, il faut ajouter la signature de la méthode ci-dessous. Ajouter ce code à la fin. 

```csharp showLineNumbers
/// <summary>
/// Obtenir une catégorie à partir de sa clé primaire.
/// </summary>
/// <param name="categorieId">Clé primaire de la catégorie</param>
/// <returns>La catégorie ou null si la catégorie n'est pas trouvée</returns>
CategorieModel? Obtenir(int categorieId);
```

Dans la classe **CategorieService**, il faut ajouter l'implémentation de la méthode.

```csharp showLineNumbers
public CategorieModel? Obtenir(int categorieId)
{
    Categorie? categorie = _categorieRepo.ObtenirParCle(categorieId);

    //Le ?. est important, car si la catégorie n'est pas trouvée, l'objet sera null
    return categorie?.VersCategorieModel();
}
```

:::note
Cette nouvelle méthode est une copie de sa version asynchrone, à part le fait qu'elle appel **ObtenirParCle** au lieu de **ObtenirParCleAsync**.
:::


## SuperCarte.WPF

### Modification du ViewModel - GestionCategorieVM 

Il faut mettre à jour la méthode **AssignerParametre** dans la classe **GestionCategorieVM** pour appeler la méthode **synchrone** pour obtenir la catégorie.

```csharp showLineNumbers
public override void AssignerParametre(int parametre)
{
    CategorieId = parametre;

    CategorieModel? categorieModel = _categorieService.Obtenir(CategorieId);

    VersVM(categorieModel);
}
```

Si vous réessayer d'éditer, cette fois-ci la catégorie s'affichera automatiquement. 

