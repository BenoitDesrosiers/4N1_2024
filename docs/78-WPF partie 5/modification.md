---
sidebar_position: 520
draft: true
---

# Modification

Il faut régler le problème pour le **ComboBox** de la modification.

Pour y arriver, il faut créer une nouvelle classe du modèle du domaine pour contenir le détail de la carte et d'ajouter la requête dans le **Repository** et la méthode dans le service.

Il serait possible de faire une vue dynamique, c'est-à-dire que si c'est en mode modification, c'est un **TextBlock** qui affiche l'information de la carte. Mais ceci ajoute beaucoup plus de logique. Pour ce projet et le **TP 3**, il faudra conserver le **ComboxBox** et lui assigner un item correspondant à la carte à modifier. Dans le **ViewModel**, il faudra créer un item dans la liste du **ComboBox** à partir du modèle détaillé. 

## SuperCarte.Core

### Création du modèle - UtilisateurCarteDetailModel

Créez la classe **UtilisateurCarteDetailModel** dans le dossier **Models**.

```csharp showLineNumbers
namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient l'information d'une carte d'un utilisateur avec le détail de ses clés étrangères
/// </summary>
public class UtilisateurCarteDetailModel : UtilisateurCarteModel
{
    public string UtilisateurNom { get; set; } = null!;

    public string UtilisateurPrenom { get; set; } = null!;

    public string CarteNom { get; set; } = null!;

    public string CategorieNom { get; set; } = null!;

    public string EnsembleNom { get; set; } = null!;
}
```

La classe hérite de la classe **UtilisateurCarteModel**. L'information de l'utilisateur est tout de même ajoutée dans le modèle, même si ce n'est pas nécessaire pour la vue. Si la vue inversée est créée, il sera pertinent d'avoir l'information de l'utilisateur.

### Requête ObtenirDetailParCle - UtilisateurCarteRepo

Dans l'interface **IUtilisateurCarteRepo**, ajoutez la méthode ci-dessous.

```csharp showLineNumbers
/// <summary>
/// Obtenir un UtilisateurCarteDetailModel spécifique en fonction de sa clé primaire.
/// </summary>
/// <param name="utilisateurId">Clé primaire de l'utilisateur</param>
/// <param name="carteId">Clé primaire de la carte</param>
/// <returns>L'objet UtilisateurCarteDetailModel ou null si non trouvé</returns>
UtilisateurCarteDetailModel? ObtenirDetailParCle(int utilisateurId, int carteId);
```

Dans la classe **UtilisateurCarteRepo**, ajoutez la méthode ci-dessous.

```csharp showLineNumbers
public UtilisateurCarteDetailModel? ObtenirDetailParCle(int utilisateurId, int carteId)
{
    return (from lqUtilisateurCarte in _bd.UtilisateurCarteTb
            where
                 lqUtilisateurCarte.UtilisateurId == utilisateurId &&
                 lqUtilisateurCarte.CarteId == carteId
            select
              new UtilisateurCarteDetailModel()
              {
                  UtilisateurId = lqUtilisateurCarte.UtilisateurId,
                  CarteId = lqUtilisateurCarte.CarteId,
                  Quantite = lqUtilisateurCarte.Quantite,
                  UtilisateurNom = lqUtilisateurCarte.Utilisateur.Nom,
                  UtilisateurPrenom = lqUtilisateurCarte.Utilisateur.Nom,
                  CarteNom = lqUtilisateurCarte.Carte.Nom,
                  EnsembleNom = lqUtilisateurCarte.Carte.Ensemble.Nom,
                  CategorieNom = lqUtilisateurCarte.Carte.Categorie.Nom
              }).FirstOrDefault();
}
```

La méthode asynchrone n'est pas nécessaire.

### Ajout de ObtenirDetail dans le service - UtilisateurCarteService

Dans l'interface **IUtilisateurCarteService**, ajoutez la méthode ci-dessous.

```csharp showLineNumbers
/// <summary>
/// Obtenir un UtilisateurCarteDetailModel spécifique en fonction de sa clé primaire.
/// </summary>
/// <param name="utilisateurId">Clé primaire de l'utilisateur</param>
/// <param name="carteId">Clé primaire de la carte</param>
/// <returns>L'objet UtilisateurCarteDetailModel ou null si non trouvé</returns>
UtilisateurCarteDetailModel? ObtenirDetail(int utilisateurId, int carteId);
```

Dans la classe **UtilisateurCarteService**, ajoutez la méthode ci-dessous.

```csharp showLineNumbers
public UtilisateurCarteDetailModel? ObtenirDetail(int utilisateurId, int carteId)
{
    return _utilisateurCarteRepo.ObtenirDetailParCle(utilisateurId, carteId);        
}
```

## SuperCarte.WPF

### Modification du ViewModel - GestionMesCartesVM

Il faut modifier la méthode **`AssignerParametre`** dans la classe **GestionMesCartesVM**.

Si c'est un nouvel item, il faut appeler la méthode **`ObtenirListeCartesDisponibles()`** pour peupler le **ComboBox** (ligne 10).

Par contre, si c'est un item existant, il faut créer manuellement l'item dans la liste des cartes disponibles (ligne 23).

La méthode utilise maintenant un objet de type **`UtilisateurCarteDetailModel`** pour avoir l'information de la carte (ligne 15).

```csharp showLineNumbers
public override void AssignerParametre(int parametre)
{
    if (_authentificateur.EstAutorise(_rolesAutorises))
    {
        //Le paramètre est CarteIdCle
        CarteIdCle = parametre;                        

        if (CarteIdCle == 0)
        {
            ObtenirListeCartesDisponibles();
            VersVM(null);
        }
        else
        {
            UtilisateurCarteDetailModel? utilisateurCarteDetailModel =
                _utilisateurCarteService.ObtenirDetail(_authentificateur.UtilisateurAuthentifie!.UtilisateurId,
                                                       CarteIdCle);

            ListeCartesDisponibles.Clear();
            ListeCartesDisponibles.Add(new ListeItem<int>()
            {
                Valeur = utilisateurCarteDetailModel.CarteId,
                Texte = $"{utilisateurCarteDetailModel.CarteNom} ({utilisateurCarteDetailModel.CategorieNom}) ({utilisateurCarteDetailModel.EnsembleNom})"
            });

            VersVM(utilisateurCarteDetailModel);
        }                        
    }
}
```

## Test

Testez de nouveau pour éditer un item de la liste. Le **ComboBox** aura le texte pour la carte.

