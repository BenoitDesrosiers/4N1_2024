---
sidebar_position: 520
draft: true
---

# Validation

Pour cette vue, il faut valider le champ **Quantite** et le champ **CarteId**. Il y a également le champ **UtilisateurId** à valider. L'utilisateur est celui qui est connecté, donc il ne serait pas nécessaire de le valider d'un point de vue **UI**, mais le service ne le sait pas. Il est important de le valider quand même, car si la vue se fait à partir d'une carte, le service ne sera plus fonctionnel.

Il faut également valider les clés uniquement si c'est un nouvel élément. Il faut donc faire un validateur qui sera en mesure de valider certains champs selon le cas.

Ce validateur utilisera des **Repositories**.

## Création de l'interface - IValidateurPropriete

**FluentValidation** inclut une méthode d'extension qui permet de valider uniquement les propriétés spécifiées. 

Il faut créer une nouvelle interface qui aura la méthode de validation avec les propriétés à valider. Il serait possible d'inclure cette méthode dans l'interface existante **IValidateur**, mais il faudrait mettre à jour tous les validateurs. De plus, ce n'est pas tous les validateurs qui doivent avoir cette option. Il s'agit uniquement d'un cas particulier. Si l'application effectue de la validation active, c'est-à-dire que dès que l'utilisateur change de champ et qu'il se valide instantanément sans soumettre le formulaire, il faudrait implémenter cette méthode à tous les validateurs.

Créez l'interface **IValidateurPropriete** dans le dossier **Validateurs** du projet **SuperCarte.Core**.

L'interface est générique. Il faut spécifier le type du modèle à valider.

Le paramètre **`string[] proprietesAValider`** a le mot-clé **`params`**. Il est possible de spécifier chacune des propriétés à valider comme un paramètre distinct. Ceci évite de créer un tableau qui contient la liste des valeurs.

```csharp showLineNumbers
using SuperCarte.Core.Models;

namespace SuperCarte.Core.Validateurs;

/// <summary>
/// Interface qui valide un modèle du domaine avec la possibilité de spécifier des propriétés spécifiques
/// </summary>
/// <typeparam name="TModele">Type du modèle du domaine à valider</typeparam>
public interface IValidateurPropriete<TModele>  where TModele : class
{
    /// <summary>
    /// Valider un objet du modèle du domaine pour des propriétés spécifiques
    /// </summary>
    /// <param name="modele">Modèle à valider</param>
    /// <param name="proprietesAValider">Propriété</param>
    /// <returns>Résultat de la validation</returns>
    Task<ValidationModel> ValiderAsync(TModele modele, params string[] proprietesAValider);
}
```

## Création du validateur - UtilisateurCarteValidateur

Créez la classe **UtilisateurCarteValidateur** dans le dossier **Validateurs** du projet **SuperCarte.Core**.

Le code de la classe complète se retrouvera à la fin de la section.

Voici la coquille de la classe.

La classe hérite de **`AbstractValidator<UtilisateurCarteModel>`** en spécifiant le type du modèle à valider (ligne 12).

La classe implémente de **`IValidateurPropriete<UtilisateurCarteModel>`** en spécifiant le type du modèle à valider (ligne 12).

La classe doit implémenter les 2 méthodes **`ValiderAsync`** qui proviennent de **`IValidateurPropriete<UtilisateurCarteModel>`** et de **`IValidateur<UtilisateurCarteModel>`**.

À la ligne 14, c'est la méthode qui valide seulement les propriétés spécifiées. Il s'agit d'une méthode d'extension qui provient de la classe **FluentValidation.DefaultValidatorExtensions**. 

À la ligne 21, il est important d'utiliser **`this.`** et non **`base.`**, car la méthode d'extension est disponible sur l'intense en cours et non par ses méthodes internes. Les autres validateurs utilisaient **`base.`**, car la méthode de validation standard est dans les méthodes internes. 

Si aucune propriété n'est spécifiée, toutes les propriétés sont validées (ligne 26).

```csharp showLineNumbers
using FluentValidation;
using FluentValidation.Results;
using SuperCarte.Core.Extensions;
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;

namespace SuperCarte.Core.Validateurs;

/// <summary>
/// Classe qui valide le modèle UtilisateurCarteModel
/// </summary>
public class UtilisateurCarteValidateur : AbstractValidator<UtilisateurCarteModel>, IValidateurPropriete<UtilisateurCarteModel>
{
    public async Task<ValidationModel> ValiderAsync(UtilisateurCarteModel modele, params string[] proprietesAValider)
    {
        ValidationResult validationResult;

        if (proprietesAValider?.Length > 0)
        {
            //Il y a des propriétés à valider
            validationResult = await this.ValidateAsync(modele, o => o.IncludeProperties(proprietesAValider));            
        }
        else
        {
            //Il n'y a aucune propriété à valider
            validationResult = await base.ValidateAsync(modele);
        }

        return validationResult.VersValidationModel();
    }
}
```

Ensuite, il faut ajouter les dépendances. Ce validateur doit s'assurer que l'utilisateur et la carte existent dans la base de données. Il faut également valider si le couple (utilisateurId et carteId) n'existe pas dans la base de données. Il faut injecter les **Repositories** dans le constructeur.

```csharp showLineNumbers
private readonly IUtilisateurCarteRepo _utilisateurCarteRepo;
private readonly IUtilisateurRepo _utilisateurRepo;
private readonly ICarteRepo _carteRepo;

/// <summary>
/// Constructeur
/// </summary>
/// <param name="utilisateurCarteRepo">Repository de UtilisateurCarte</param>
/// <param name="utilisateurRepo">Repository de Utilisateur</param>
/// <param name="carteRepo">Repository de Carte</param>
public UtilisateurCarteValidateur(IUtilisateurCarteRepo utilisateurCarteRepo, 
    IUtilisateurRepo utilisateurRepo, ICarteRepo carteRepo)
{
    _utilisateurCarteRepo = utilisateurCarteRepo;
    _utilisateurRepo = utilisateurRepo;
    _carteRepo = carteRepo;    
}
```

Voici la méthode pour valider si l'utilisateur existe. Si le **Repository** retourne un utilisateur en fonction de la clé spécifiée, c'est qu'il existe.

```csharp showLineNumbers
/// <summary>
/// Valider la clé primaire de l'utilisateur si elle existe
/// </summary>
/// <param name="utilisateurId">Clé primaire de l'utilisateur</param>
/// <returns>Vrai si valide, faux si non valide</returns>
private bool ValiderUtilisateurIdExiste(int utilisateurId)
{
    return _utilisateurRepo.ObtenirParCle(utilisateurId) != null;
}
```

Voici la méthode pour valider si la carte existe. Si le **Repository** retourne une carte en fonction de la clé spécifiée, c'est qu'il existe.

```csharp showLineNumbers
/// <summary>
/// Valider la clé primaire de la carte si elle existe
/// </summary>
/// <param name="utilisateurId">Clé primaire de la carte</param>
/// <returns>Vrai si valide, faux si non valide</returns>
private bool ValiderCarteIdExiste(int carteId)
{
    return _carteRepo.ObtenirParCle(carteId) != null;
}
```

Voici la méthode pour valider si la carte est disponible pour un utilisateur. Dans ce cas-ci, il ne doit pas avoir d'enregistrement **UtilisateurCarte** pour que ce soit valide.

```csharp showLineNumbers
/// <summary>
/// Valider si la combinaison CarteId et UtilisateurId n'est pas déjà utilisée
/// </summary>    
/// <param name="utilisateurId">Clé primaire de l'utilisateur</param>
/// <param name="carteId">Clé primaire de la carte</param>
/// <returns>Vrai si valide, faux si non valide</returns>
private bool ValiderDoublon(int utilisateurId, int carteId)
{
    return _utilisateurCarteRepo.ObtenirParCle(utilisateurId, carteId) == null;
}
```

Il faut ajouter les règles dans le constructeur.

La première règle est pour la propriété **Quantite** (ligne 8). La propriété est de type **`short` **, mais il faut la convertir en **`int`** **`(i => (int)i.Quantite)`** pour avoir accès à la méthode  **`InclusiveBetween`**. Cette méthode n'a pas d'implémentation pour le type **`short`**.

À la ligne 12, c'est la validation si l'utilisateur existe. Il faut utiliser la méthode **`Must`** pour être en mesure d'utiliser une méthode interne. 

À la ligne 16, c'est la validation si la carte existe. Il faut utiliser la méthode **`Must`** pour être en mesure d'utiliser une méthode interne. 

Aux lignes 13 et 17, il y a la validation du doublon. La validation se fait pour les 2 propriétés. Au niveau de la validation, il n'est pas possible de savoir si la vue utilise un utilisateur en paramètre comme c'est le cas de ce projet ou une carte en paramètre. Il serait possible qui faut spécifier par deux **ComboBox** la carte et l'utilisateur. Le validateur n'a aucune idée comment la gère ce cas, il faut donc le valider pour les 2 propriétés.  

**FluentValidation** permet de créer des propriétés dynamiques pour ce genre de cas pour appeler seulement une fois le validateur. Étant donné que cette propriété dynamique n'existe pas dans le **ViewModel**, il faudrait programmer une correspondance. Ceci ajouterait beaucoup de code, mais cette approche éviterait d'appeler 2 fois la même validation pour une propriété. Ce serait une amélioration à cette structure applicative.

```csharp showLineNumbers
public UtilisateurCarteValidateur(IUtilisateurCarteRepo utilisateurCarteRepo, 
        IUtilisateurRepo utilisateurRepo, ICarteRepo carteRepo)
{
    _utilisateurCarteRepo = utilisateurCarteRepo;
    _utilisateurRepo = utilisateurRepo;
    _carteRepo = carteRepo;

    RuleFor(i => (int)i.Quantite).Cascade(CascadeMode.Stop)
        .InclusiveBetween(1, short.MaxValue).WithMessage($"La quantité doit être entre 1 et {short.MaxValue:N0}");

    RuleFor(i => i.UtilisateurId).Cascade(CascadeMode.Stop)
        .Must(ValiderUtilisateurIdExiste).WithMessage("L'utilisateur sélectionné n'est pas valide.")
        .Must((i, p) => ValiderDoublon(p, i.CarteId)).WithMessage("L'utilisateur existe déjà pour cette carte.");

    RuleFor(i => i.CarteId).Cascade(CascadeMode.Stop)
        .Must(ValiderCarteIdExiste).WithMessage("La carte sélectionnée n'est pas valide.")
        .Must((i, p) => ValiderDoublon(i.UtilisateurId, p)).WithMessage("La carte existe déjà pour cet utilisateur.");        
}
```

Voici le code complet de la classe.

```csharp showLineNumbers
using FluentValidation;
using FluentValidation.Results;
using SuperCarte.Core.Extensions;
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;

namespace SuperCarte.Core.Validateurs;

/// <summary>
/// Classe qui valide le modèle UtilisateurCarteModel
/// </summary>
public class UtilisateurCarteValidateur : AbstractValidator<UtilisateurCarteModel>, IValidateurPropriete<UtilisateurCarteModel>
{
    private readonly IUtilisateurCarteRepo _utilisateurCarteRepo;
    private readonly IUtilisateurRepo _utilisateurRepo;
    private readonly ICarteRepo _carteRepo;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="utilisateurCarteRepo">Repository de UtilisateurCarte</param>
    /// <param name="utilisateurRepo">Repository de Utilisateur</param>
    /// <param name="carteRepo">Repository de Carte</param>
    public UtilisateurCarteValidateur(IUtilisateurCarteRepo utilisateurCarteRepo, 
        IUtilisateurRepo utilisateurRepo, ICarteRepo carteRepo)
    {
        _utilisateurCarteRepo = utilisateurCarteRepo;
        _utilisateurRepo = utilisateurRepo;
        _carteRepo = carteRepo;

        RuleFor(i => (int)i.Quantite).Cascade(CascadeMode.Stop)
            .InclusiveBetween(1, short.MaxValue).WithMessage($"La quantité doit être entre 1 et {short.MaxValue:N0}");

        RuleFor(i => i.UtilisateurId).Cascade(CascadeMode.Stop)
            .Must(ValiderUtilisateurIdExiste).WithMessage("L'utilisateur sélectionné n'est pas valide.")
            .Must((i, p) => ValiderDoublon(p, i.CarteId)).WithMessage("L'utilisateur existe déjà pour cette carte.");

        RuleFor(i => i.CarteId).Cascade(CascadeMode.Stop)
            .Must(ValiderCarteIdExiste).WithMessage("La carte sélectionnée n'est pas valide.")
            .Must((i, p) => ValiderDoublon(i.UtilisateurId, p)).WithMessage("La carte existe déjà pour cet utilisateur.");        
    }

    public async Task<ValidationModel> ValiderAsync(UtilisateurCarteModel modele, params string[] proprietesAValider)
    {
        ValidationResult validationResult;

        if (proprietesAValider?.Length > 0)
        {
            //Il y a des propriétés à valider
            validationResult = await this.ValidateAsync(modele, o => o.IncludeProperties(proprietesAValider));            
        }
        else
        {
            //Il n'y a aucune propriété à valider
            validationResult = await base.ValidateAsync(modele);
        }

        return validationResult.VersValidationModel();
    }

    /// <summary>
    /// Valider la clé primaire de l'utilisateur si elle existe
    /// </summary>
    /// <param name="utilisateurId">Clé primaire de l'utilisateur</param>
    /// <returns>Vrai si valide, faux si non valide</returns>
    private bool ValiderUtilisateurIdExiste(int utilisateurId)
    {
        return _utilisateurRepo.ObtenirParCle(utilisateurId) != null;
    }

    /// <summary>
    /// Valider la clé primaire de la carte si elle existe
    /// </summary>
    /// <param name="utilisateurId">Clé primaire de la carte</param>
    /// <returns>Vrai si valide, faux si non valide</returns>
    private bool ValiderCarteIdExiste(int carteId)
    {
        return _carteRepo.ObtenirParCle(carteId) != null;
    }

    /// <summary>
    /// Valider si la combinaison CarteId et UtilisateurId n'est pas déjà utilisée
    /// </summary>    
    /// <param name="utilisateurId">Clé primaire de l'utilisateur</param>
    /// <param name="carteId">Clé primaire de la carte</param>
    /// <returns>Vrai si valide, faux si non valide</returns>
    private bool ValiderDoublon(int utilisateurId, int carteId)
    {
        return _utilisateurCarteRepo.ObtenirParCle(utilisateurId, carteId) == null;
    }
}
```

## Modification du service - UtilisateurCarteService

Il faut mettre du code dans la méthode **`ValiderAsync`** de la classe **UtilisateurCarteService**.

Si c'est pour un ajout, il faut valider toutes les propriétés. Sinon, il faut valider uniquement la quantité.

Il serait possible de spécifier le nom de la propriété directement en **`string`**, mais la fonction **`nameof`** permet au compilateur de s'assurer que la propriété existe.

```csharp showLineNumbers
public async Task<ValidationModel> ValiderAsync(UtilisateurCarteModel utilisateurCarteModel, bool validerPourAjout)
{
    if (validerPourAjout == true)
    {
        return await _utilisateurCarteValidateur.ValiderAsync(utilisateurCarteModel);
    }
    else
    {
        return await _utilisateurCarteValidateur.ValiderAsync(utilisateurCarteModel,
            nameof(utilisateurCarteModel.Quantite));
    }
}
```

## Test

Démarrez l'application. Testez l'ajout et la modification en mettant des valeurs invalides.

Il ne sera pas possible de tester le doublon par la conception de la vue, car il n'est pas possible de modifier la carte lors d'une modification. Ce sera possible de l'expérimenter lors des tests unitaires.

# Pour le TP 3

N'oubliez pas d'ajouter la suppression et la notification de l'enregistrement dans la vue de gestion également.

Il faut également ajouter la suppression dans la vue liste.

