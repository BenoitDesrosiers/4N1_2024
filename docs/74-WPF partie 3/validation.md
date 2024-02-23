---
sidebar_position: 340
draft: true
---

# Validation

Avant d'ajouter ou de modifier un élément dans la base de données, il faut vérifier si les valeurs sont valides.

La validation est un service spécialisé. Le service principal utilisera le service de validation avant d'effectuer une création ou une modification.

Pour faire la validation, la librairie **FluentValidation** sera utilisée.

Chaque propriété peut avoir une seule erreur. Dès qu'une erreur est rencontrée pour une propriété, il faut arrêter la validation de cette propriété. **WPF** permet la gestion de plusieurs erreurs par propriété, mais son affichage est complexe.

Pour plus d'information sur la librairie : https://docs.fluentvalidation.net/en/latest/

## SuperCarte.Core

### Installation de la librairie

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. Il est important que le **Projet par défaut** **.Core** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.Core**.

```
Install-Package FluentValidation
```

### Création du modèle de validation - ValidationModel

Il faut une classe pour contenir le résultat d'une validation. Il serait possible de prendre celle de **FluentValidation**, mais l'application aurait une dépendance directe avec la librairie. En créant une classe propre au programme, il est possible d'avoir une façade entre la validation et les autres couches de l'application.

Créez la classe **ValidationModel** dans le dossier **Models**.

```csharp showLineNumbers
namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient l'information de la validation
/// </summary>
public class ValidationModel
{
    public ValidationModel()
    {
        ErreurParPropriete = new Dictionary<string, string>();
    }

    /// <summary>
    /// Assigner une erreur pour une propriété du modèle
    /// </summary>
    /// <param name="propriete">Nom de la propriété</param>
    /// <param name="erreur">Message d'erreur</param>
    public void AssignerErreur(string propriete, string erreur)
    {
        if(ErreurParPropriete.ContainsKey(propriete) == false)
        {
            ErreurParPropriete.Add(propriete, erreur);
        }
        else
        {
            ErreurParPropriete[propriete] = erreur;
        }
    } 
    
    public Dictionary<string, string> ErreurParPropriete { get; private set; }

    public bool EstValide
    {
        get
        {
            return !ErreurParPropriete.Any();
        }
    }
}
```

### Méthode d'extension - ValidationModelExtension

Il faut créer une méthode d'extension pour passer de **ValidationResult** qui provient de la librairie **FluentValidation** à **ValidationModel**.

Attention, la classe **ValidationResult** se retrouve dans plusieurs **namespace**. Assurez-vous d'utiliser celle de **FluentValidation.Results;**

Créez la classe **ValidationModelExtension** dans le dossier **Extensions**.

```csharp showLineNumbers
using FluentValidation.Results;
using SuperCarte.Core.Models;

namespace SuperCarte.Core.Extensions;

/// <summary>
/// Classe statique qui regroupe les méthodes d'extension pour la conversion (mapping) du modèle ValidationModel
/// </summary>
public static class ValidationModelExtension
{
    /// <summary>
    /// Convertir un objet ValidationResult vers un objet ValidationModel
    /// </summary>
    /// <param name="validationResult">Objet à convertir</param>
    /// <returns>Objet converti</returns>
    public static ValidationModel VersValidationModel(this ValidationResult validationResult)
    {
        ValidationModel validationModel = new ValidationModel();

        if (validationResult.IsValid == false)
        {
            foreach(var erreur in validationResult.Errors)
            {
                validationModel.AssignerErreur(erreur.PropertyName, erreur.ErrorMessage);
            }
        }
        return validationModel;
    }
}
```

### Création du validateur - CategorieValidateur

Créez l'interface **IValidateur.cs** dans le dossier **Validateurs**.

L'interface est générique. Les validateurs auront tous la même interface, il est donc possible de la généraliser en fonction du modèle à valider.

```csharp showLineNumbers
using SuperCarte.Core.Models;
namespace SuperCarte.Core.Validateurs;

/// <summary>
/// Interface qui valide un modèle du domaine
/// </summary>
/// <typeparam name="TModele">Type du modèle du domaine à valider</typeparam>
public interface IValidateur<TModele> where TModele : class
{
    /// <summary>
    /// Valider un objet du modèle du domaine
    /// </summary>
    /// <param name="modele">Modèle à valider</param>
    /// <returns>Résultat de la validation</returns>
    Task<ValidationModel> ValiderAsync(TModele modele);
}
```

Créez la classe **CategorieValidateur.cs**.

À la ligne 11, la classe implémente l'interface **IValidateur** en spécifiant le modèle à valider. À la ligne 25, la méthode à implémenter est spécifiquement pour **CategorieModel**.

La classe doit également hériter de la classe **AbstractValidator** qui provient de la librairie **FluentValidation**.

Dans le constructeur, il faut appliquer les règles de validation pour chacune des propriétés du modèle.

**FluentValidation** utilise un **API Fluent** par des méthodes chainées.

```csharp showLineNumbers
using FluentValidation;
using FluentValidation.Results;
using SuperCarte.Core.Extensions;
using SuperCarte.Core.Models;

namespace SuperCarte.Core.Validateurs;

/// <summary>
/// Classe qui valide le modèle CategorieModel
/// </summary>
public class CategorieValidateur : AbstractValidator<CategorieModel>, IValidateur<CategorieModel>
{
    public CategorieValidateur()
    {
        RuleFor(i => i.Nom).Cascade(CascadeMode.Stop)
            .NotNull().WithMessage("Le nom est obligatoire.")
            .NotEmpty().WithMessage("Le nom est obligatoire.")
            .MaximumLength(35).WithMessage("Le nom doit avoir 35 caractères au maximum.");


        RuleFor(i => i.Description).Cascade(CascadeMode.Stop)
            .MaximumLength(50).WithMessage("La description doit avoir 50 caractères au maximum.");
    }

    public async Task<ValidationModel> ValiderAsync(CategorieModel modele)
    {
        ValidationResult validationResult = await base.ValidateAsync(modele);

        return validationResult.VersValidationModel();
    }
}
```

Voici le fonctionnement.

La première étape consiste à indiquer la propriété dans la méthode **RuleFor**. Ensuite, il faut indiquer la règle de **Cascase**. Lorsque la valeur est **CascadeMode.Stop**, la validation s'arrête dès qu'il y a une erreur.

```csharp showLineNumbers
RuleFor(i => i.Nom).Cascade(CascadeMode.Stop)
```

Ensuite il faut appliquer chacune des règles. Il existe plusieurs méthodes internes. Lisez la documentation pour voir les différentes méthodes disponibles. Dans ce cas-ci, la méthode de validation est **NotNull()**. La méthode **WithMessage()** permet de spécifier le message d'erreur. Si ce n'est pas spécifié, ce sera un message générique et en anglais.

```csharp showLineNumbers
.NotNull().WithMessage("Le nom est obligatoire.") //Pas null
.NotEmpty().WithMessage("Le nom est obligatoire.") //Pas vide
.MaximumLength(35).WithMessage("Le nom doit avoir 35 caractères au maximum."); //Maximum 35 caractères
```

Il est possible que la validation à effectuer soit personnalisée.

Prenez par exemple qu'il faut également vérifier que les champs obligatoires ne contiennent pas uniquement des espaces.

Il faut utiliser la méthode de validation **Must()** et indiquer la méthode de validation. La méthode de validation doit recevoir un paramètre du type de la propriété et doit retourner un booléen.

```csharp showLineNumbers
public CategorieValidateur()
{
    RuleFor(i => i.Nom).Cascade(CascadeMode.Stop)
        .Must(ValiderStringObligatoire).WithMessage("Le nom est obligatoire.")                        
        .MaximumLength(35).WithMessage("Le nom doit avoir 35 caractères au maximum.");

    RuleFor(i => i.Description).Cascade(CascadeMode.Stop)
        .MaximumLength(50).WithMessage("La description doit avoir 50 caractères au maximum.");
}

/// <summary>
/// Valider une chaine de caractère qui est obligatoire
/// </summary>
/// <param name="valeur">Chaine à valider</param>
/// <returns>Vrai si valide, faux si non valide</returns>
private bool ValiderStringObligatoire(string valeur)
{
	return !string.IsNullOrWhiteSpace(valeur);
}
```

La méthode **ValiderObligatoire()** est une méthode qui risque d'être réutilisée souvent. Il serait intéressant de créer une classe **BaseValidateur** et y intégrer les méthodes réutilisables.

### Modification du service - CategorieService

Il faut modifier le service pour être en mesure de faire une validation et d'améliorer les méthodes pour ajouter et modifier afin de faire une validation au préalable.

Dans l'interface **ICategorieService**, ajoutez la signature de méthode ci-dessous.

```csharp showLineNumbers
/// <summary>
/// Valider le modèle
/// </summary>
/// <param name="categorieModel">CategorieModel à valider</param>
/// <returns>Résultat de validation</returns>
Task<ValidationModel> ValiderAsync(CategorieModel categorieModel);
```

Dans la classe **CategorieService**, il faut injecter le validateur. La classe complète sera à la fin de la section.

```csharp showLineNumbers
private readonly ICategorieRepo _categorieRepo;
private readonly IValidateur<CategorieModel> _validateur;

/// <summary>
/// Constructeur
/// </summary>
/// <param name="categorieRepo">Repository Categorie</param>
/// <param name="validateur">Validateur Categorie</param>
public CategorieService(ICategorieRepo categorieRepo, IValidateur<CategorieModel> validateur)
{
    _categorieRepo = categorieRepo;
    _validateur = validateur;
}
```

Ensuite, il faut ajouter la méthode **ValiderAsync()**.

```csharp showLineNumbers
public async Task<ValidationModel> ValiderAsync(CategorieModel categorieModel)
{
    return await _categorieValidateur.ValiderAsync(categorieModel);
}
```

Pour la méthode **AjouterAsync()**, il faut valider avant de faire l'enregistrement (ligne 3). Il faut éviter les exceptions inutiles.

Si l'objet n'est pas valide, il faut retourner **false** pour indiquer que l'ajout n'a pas été fait.

```csharp showLineNumbers
public async Task<bool> AjouterAsync(CategorieModel categorieModel)
{
    if ((await _validateur.ValiderAsync(categorieModel)).EstValide == true)
    {
        //Transformation de l'objet du modèle du domaine en objet du modèle de données
        Categorie categorie = categorieModel.VersCategorie();

        //Ajout dans repository avec enregistrement immédiat
        await _categorieRepo.AjouterAsync(categorie, true);

        //Assigne les valeurs de la base de données dans l'objet du modèle
        categorieModel.Copie(categorie, true);

        return true;
    }
    else
    {
        return false;
    }
}
```

Pour la méthode **ModifierAsync()**, il faut valider avant de faire l'enregistrement (ligne 3). Il faut éviter les exceptions inutiles.

Si l'objet n'est pas valide, il faut retourner **false** pour indiquer que l'ajout n'a pas été fait.

```csharp showLineNumbers
public async Task<bool> ModifierAsync(CategorieModel categorieModel)
{
    if ((await _validateur.ValiderAsync(categorieModel)).EstValide == true)
    {
        Categorie? categorie = await _categorieRepo.ObtenirParCleAsync(categorieModel.CategorieId);

        if (categorie != null)
        {
            //Assigner les valeurs dans la catégorie
            categorie.Copie(categorieModel);

            await _categorieRepo.EnregistrerAsync();

            //Assigne les valeurs de la base de données dans l'objet du modèle
            categorieModel.Copie(categorie, false);
        }
        else
        {
            throw new Exception("Impossible de modifier la catégorie. Aucune catégorie trouvée avec la clé primaire.");
        }

        return true;
    }
    else
    {
        return false;
    }
}
```

Voici la classe au complet.

```csharp showLineNumbers
using SuperCarte.Core.Extensions;
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;
using SuperCarte.Core.Validateurs;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Services;

/// <summary>
/// Classe qui contient les services du modèle Categorie
/// </summary>
public class CategorieService : ICategorieService
{
    private readonly ICategorieRepo _categorieRepo;
    private readonly IValidateur<CategorieModel> _validateur;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="categorieRepo">Repository Categorie</param>
    /// <param name="validateur">Validateur Categorie</param>
    public CategorieService(ICategorieRepo categorieRepo, IValidateur<CategorieModel> validateur)
    {
        _categorieRepo = categorieRepo;
        _validateur = validateur;
    }

    public async Task<List<CategorieModel>> ObtenirListeAsync()
    {
        return (await _categorieRepo.ObtenirListeAsync()).VersCategorieModel();
    }

    public CategorieDependance? ObtenirDependance(int categorieId)
    {
        return _categorieRepo.ObtenirDependance(categorieId);
    }    

    public async Task SupprimerAsync(int categorieId)
    {
        CategorieDependance? categorieDependance = await _categorieRepo.ObtenirDependanceAsync(categorieId);

        if(categorieDependance != null)
        {
            if(categorieDependance.NbCartes == 0)
            {
                await _categorieRepo.SupprimerParCleAsync(categorieId, true);
            }
            else
            {
                throw new Exception("La catégorie a des dépendances. Impossible à supprimer.");
            }
        }
        else
        {
            throw new Exception("La catégorie n'existe pas dans la base de données.");
        }
    }

    public async Task<bool> AjouterAsync(CategorieModel categorieModel)
    {
        if ((await _validateur.ValiderAsync(categorieModel)).EstValide == true)
        {
            //Transformation de l'objet du modèle du domaine en objet du modèle de données
            Categorie categorie = categorieModel.VersCategorie();

            //Ajout dans repository avec enregistrement immédiat
            await _categorieRepo.AjouterAsync(categorie, true);

            //Assigne les valeurs de la base de données dans l'objet du modèle
            categorieModel.Copie(categorie, true);

            return true;
        }
        else
        {
            return false;
        }
    }

    public async Task<CategorieModel?> ObtenirAsync(int categorieId)
    {
        Categorie? categorie = await _categorieRepo.ObtenirParCleAsync(categorieId);
      
        //Le ?. est important, car si la catégorie n'est pas trouvée, l'objet sera null
        return categorie?.VersCategorieModel();
    }

    public CategorieModel? Obtenir(int categorieId)
    {
        Categorie? categorie = _categorieRepo.ObtenirParCle(categorieId);

        //Le ?. est important, car si la catégorie n'est pas trouvée, l'objet sera null
        return categorie?.VersCategorieModel();
    }

    public async Task<bool> ModifierAsync(CategorieModel categorieModel)
    {
        if ((await _validateur.ValiderAsync(categorieModel)).EstValide == true)
        {
            Categorie? categorie = await _categorieRepo.ObtenirParCleAsync(categorieModel.CategorieId);

            if (categorie != null)
            {
                //Assigner les valeurs dans la catégorie
                categorie.Copie(categorieModel);

                await _categorieRepo.EnregistrerAsync();

                //Assigne les valeurs de la base de données dans l'objet du modèle
                categorieModel.Copie(categorie, false);
            }
            else
            {
                throw new Exception("Impossible de modifier la catégorie. Aucune catégorie trouvée avec la clé primaire.");
            }

            return true;
        }
        else
        {
            return false;
        }
    }

    public async Task<ValidationModel> ValiderAsync(CategorieModel categorieModel)
    {
        return await _validateur.ValiderAsync(categorieModel);
    }
}
```

## SuperCarte.WPF

### Enregistrement du validateur - SCValidateurExtensions

Dans la classe **SCValidateurExtensions**, il faut enregistrer le validateur.

Remarquez que l'interface utilisée est la générique. Dans ce cas-ci il est possible de le faire, car le validateur n'aura pas d'autres méthodes publiques que celles de l'interface.

```csharp showLineNumbers
using Microsoft.Extensions.DependencyInjection;
using SuperCarte.Core.Validateurs;

namespace SuperCarte.WPF.Extensions.ServiceCollections;

/// <summary>
/// Classe d'extension qui permet d'enregistrer les classes de la catégorie Validateur
/// </summary>
public static class SCValidateurExtensions
{
    /// <summary>
    /// Méthode qui permet d'enregistrer les validateurs de l'application
    /// </summary>
    /// <param name="services">La collection de services</param>
    public static void EnregistrerValidateurs(this IServiceCollection services)
    {
        services.AddScoped<IValidateur<CategorieModel>, CategorieValidateur>();
    }
}
```

### Modification du BaseVM - Ajouter l'interface INotifyDataErrorInfo

Pour être en mesure d'indiquer à la vue qu'il y a des erreurs, il faut implémenter l'interface **INotifyDataErrorInfo**. La librairie **MVVM Toolkit** possède une classe **ValidationObject** qui implémente cette interface, mais il est difficile d'y intégrer **FluentValidation**.

Pour cette raison, il faut implémenter cette interface dans la classe **BaseVM**.

Modifiez la classe **BaseVM** par le code ci-dessous.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.ComponentModel;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SuperCarte.Core.Models;
using System;
using System.Collections;
using System.ComponentModel;
using System.Linq;

namespace SuperCarte.WPF.ViewModels.Bases;

/// <summary>
/// Classe abstraite pour du View Models
/// </summary>
public abstract class BaseVM : ObservableObject, INotifyDataErrorInfo
{
    private readonly Dictionary<string, List<string>> _lstErreursParPropriete = new Dictionary<string, List<string>>();
   
    public event EventHandler<DataErrorsChangedEventArgs>? ErrorsChanged;
    
    private void OnErrorsChanged(string propertyName)
    {
        ErrorsChanged?.Invoke(this, new DataErrorsChangedEventArgs(propertyName));
    }

    public IEnumerable GetErrors(string? propertyName)
    {
        return _lstErreursParPropriete.GetValueOrDefault(propertyName, null);
    }

    /// <summary>
    /// Effacer les erreurs de la vue
    /// </summary>
    protected void EffacerErreurs()
    {
        foreach (string propriete in _lstErreursParPropriete.Keys)
        {
            _lstErreursParPropriete.Remove(propriete);
            OnErrorsChanged(propriete);
        }
    }

    /// <summary>
    /// Assigner les erreurs à la vue à partir de la validation
    /// </summary>
    /// <param name="validationModel">Objet de validation</param>
    protected void AssignerValidation(ValidationModel validationModel)
    {
        EffacerErreurs();

        foreach (string propriete in validationModel.ErreurParPropriete.Keys)
        {
            if (!_lstErreursParPropriete.ContainsKey(propriete))
            {
                _lstErreursParPropriete.Add(propriete, new List<string>());
            }

            _lstErreursParPropriete[propriete].Add(validationModel.ErreurParPropriete[propriete]);
            OnErrorsChanged(propriete);
        }
    }    

    public bool HasErrors
    {
        get
        {
            return _lstErreursParPropriete.Any();
        }
    }
}
```

Premièrement, il y a un dictionnaire de type ** \<string,List \<string>> ** . La clé du dictionnaire est le nom de la propriété et pour chaque propriété, il est possible d'avoir une liste d'erreurs. Par contre, la validation retourne uniquement une erreur par propriété à la fois. Il faut tout de même respecter l'implémentation de l'interface **INotifyDataErrorInfo** qui supporte plusieurs erreurs.

```csharp showLineNumbers
private readonly Dictionary<string, List<string>> _lstErreursParPropriete = new Dictionary<string, List<string>>();
```

Ensuite, il y a un événement **ErrorsChanged**. Lorsqu'un composant est lié, il écoute cet événement pour voir si sa propriété a une erreur. Le composant appelle la méthode **GetErrors()** pour obtenir la liste d'erreurs.

La propriété **HasErrors** indique s'il y a au moins une propriété en erreur dans le **ViewModel**.

```csharp showLineNumbers
public event EventHandler<DataErrorsChangedEventArgs>? ErrorsChanged;

private void OnErrorsChanged(string propertyName)
{
    ErrorsChanged?.Invoke(this, new DataErrorsChangedEventArgs(propertyName));
}

public IEnumerable GetErrors(string? propertyName)
{
    return _lstErreursParPropriete.GetValueOrDefault(propertyName, null);
}

public bool HasErrors
{
    get
    {
        return _lstErreursParPropriete.Any();
    }
}
```

Ensuite, Il faut assigner les erreurs du **ValidationModel** dans le dictionnaire. Avant de faire l'assignation, il faut effacer la liste au complet.

À la ligne 13, l'événement est appelé pour indiquer que la propriété a une erreur.

```csharp showLineNumbers
protected void AssignerValidation(ValidationModel validationModel)
{
    EffacerErreurs();

    foreach (string propriete in validationModel.ErreurParPropriete.Keys)
    {
        if (!_lstErreursParPropriete.ContainsKey(propriete))
        {
            _lstErreursParPropriete.Add(propriete, new List<string>());
        }

        _lstErreursParPropriete[propriete].Add(validationModel.ErreurParPropriete[propriete]);
        OnErrorsChanged(propriete);
    }
}
```

La méthode **EffacerErreurs()** permet d'enlever les erreurs. À la ligne 6, l'événement est appelé pour indiquer que la propriété n'a plus d'erreur.

```csharp showLineNumbers
protected void EffacerErreurs()
{
    foreach (string propriete in _lstErreursParPropriete.Keys)
    {
        _lstErreursParPropriete.Remove(propriete);
        OnErrorsChanged(propriete);
    }
}
```

### Modification du ViewModel - GestionCategorieVM

Il faut modifier la méthode **EnregistrerAsync()** pour y inclure la validation.

À la ligne 3, il faut effacer les erreurs, car il est possible que des erreurs soient corrigées par l'utilisateur.

Avant d'enregistrer, il faut appeler le service pour effectuer une validation(ligne 11). 

Si l'objet est valide, l'enregistrement s'effectue(ligne 13).

Par contre, si l'objet n'est pas valide, il faut assigner la validation et notifier les erreurs(ligne 38).

```csharp showLineNumbers
private async Task EnregistrerAsync()
{
    EffacerErreurs();

    ChampsModifiables = false;
    EstEnTravail = true;
    bool estEnregistre;

    CategorieModel categorieModel = VersModele();
    
    ValidationModel validationModel = await _categorieService.ValiderAsync(categorieModel);

    if (validationModel.EstValide == true)
    {
        if (categorieModel.CategorieId == 0)
        {
            //La clé primaire est zéro, donc c'est une nouvelle catégorie
            estEnregistre = await _categorieService.AjouterAsync(categorieModel);
        }
        else
        {
            //La clé primaire n'est pas zéro, donc c'est une catégorie existante
            estEnregistre = await _categorieService.ModifierAsync(categorieModel);
        }

        if (estEnregistre == true)
        {
            VersVM(categorieModel);
        }
        else
        {
            //Envoyer un message d'erreur à la vue
            throw new Exception("Erreur. Impossible d'enregistrer");
        }
    }
    else
    {
        AssignerValidation(validationModel);
    }

    EstEnTravail = false;
    ChampsModifiables = true;
}
```

Démarrez l'application et testez l'ajout d'une nouvelle catégorie sans inscrire de nom.

Le **\<Textbox>** sera rouge, mais il n'y aura aucun message.

### Ajout d'un template dans les ressources

Pour être en mesure de voir le message d'erreur d'un composant, il faut ajouter le **\<Validation.ErrorTemplate>` **. Cette propriété du composant permet d'indiquer comment le composant s'affiche lorsqu'il y a une erreur.

Il est possible de le faire composant par composant, mais l'idéal est d'utiliser un modèle **(template)** global dans les ressources de l'application.

Créez le dossier **Styles** dans le projet **SuperCarte.WPF**.

Créez le fichier **ErreurTemplate.xaml**. Le fichier doit être du type **Dictionaire de ressources (WPF)**.

```xaml
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
    <ControlTemplate x:Key="erreurTemplate">
        <StackPanel Orientation="Vertical">
            <AdornedElementPlaceholder>
                <Border BorderBrush="Red" BorderThickness="2"/>
            </AdornedElementPlaceholder>
            <ItemsControl ItemsSource="{Binding}">
                <ItemsControl.ItemTemplate>
                    <DataTemplate>
                        <TextBlock Text="{Binding ErrorContent}" Foreground="Red"/>
                    </DataTemplate>
                </ItemsControl.ItemTemplate>
            </ItemsControl>
        </StackPanel>
    </ControlTemplate>
</ResourceDictionary>
```

Un dictionnaire de ressources permet de configurer des éléments de l'application et de les réutiliser. Il est possible de faire la parallèle avec les fichiers **CSS**.

Dans l'exemple ci-dessous, il y a un modèle **erreurTemplate** qui permet de gérer l'affichage des erreurs. Le nom **erreurTemplate** peut être considéré comme une classe **CSS**. Les contrôles qui utilisent le modèle **erreurTemplate** pour les erreurs auront le même comportement.

À la ligne 5, le contrôle **\<AdornedElementPlaceholder>** représente le contrôle utilisateur normal. Si le contrôle est un **\<TextBox`>**, **\<AdornedElementPlaceholder>** correspond au  **\<TextBox`>**.

À la ligne 6, une bordure rouge est ajoutée à l'intérieur du contrôle. C'est le comportement par défaut, mais en spécifiant un **template**, il faut le reproduire.

À la ligne 8, c'est un contrôle de répétition. Il est lié à la liste des erreurs. 

À la ligne 11, un **\<TextBlock>** est créé avec le contenu de l'erreur pour chaque erreur de la liste d'erreur. Le message d'erreur est dans la propriété **Text="\{Binding ErrorContent}"**. Le texte est en rouge.

Dans le fichier **App.xaml**, il faut importer le dictionnaire.

À la ligne 8, il y a le dictionnaire de ressources à inclure. Il serait possible d'en inclure plusieurs.

```xaml
<Application x:Class="SuperCarte.WPF.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:SuperCarte.WPF">
    <Application.Resources>        
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                 <ResourceDictionary Source="Styles\ErreurTemplate.xaml"/>
            </ResourceDictionary.MergedDictionaries>
        </ResourceDictionary>        
    </Application.Resources>
</Application>
```

Modifiez le fichier **UcGestionCategorie.xaml**.

Dans le **contrôle utilisateur**, il faut assigner le template avec cette propriété sur le composant **Validation.ErrorTemplate="\{StaticResource erreurTemplate}"** (lignes 59 et 71).

```xaml
<UserControl x:Class="SuperCarte.WPF.Views.UcGestionCategorie"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"              
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"             
             d:DataContext="{d:DesignInstance vm:GestionCategorieVM}"
             mc:Ignorable="d" 
             d:DesignHeight="450" d:DesignWidth="800">    
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="auto"/>
            <RowDefinition Height="auto" />
            <RowDefinition Height="*" />
            <RowDefinition Height="20" />
        </Grid.RowDefinitions>

        <!--Rangée 0-->
        <TextBlock 
            Grid.Row="0" 
            VerticalAlignment="Center" HorizontalAlignment="Center"
            FontSize="16" FontWeight="Bold"
            Text="Gestion d'une catégorie"/>

        <!--Rangée 1-->
        <WrapPanel Grid.Row="1" 
                    Orientation="Horizontal" VerticalAlignment="Center">

            <Button Content="N" ToolTip="Nouveau"
                    Margin="5" Width="32" Height="32" 
                    Command="{Binding NouveauCommande}"/>
            <Button Content="E" ToolTip="Enregistrer"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding EnregistrerCommande}"/>
            <Button Content="R" ToolTip="Rafraichir"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding ObtenirCommande}"/>
        </WrapPanel>

        <!--Rangée 2-->
        <!-- Formulaire -->
        <Grid Grid.Row="2" IsEnabled="{Binding ChampsModifiables}">
            <Grid.RowDefinitions>
                <RowDefinition Height="auto"></RowDefinition>
                <RowDefinition Height="auto"></RowDefinition>
            </Grid.RowDefinitions>
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="auto"/>
                <ColumnDefinition Width="*" />
            </Grid.ColumnDefinitions>
            
            <!-- Nom -->
            <Label Grid.Row="0" Grid.Column="0" 
                   Content="Nom : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="0" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding Nom}" 
                     Padding="2 4 0 0"
                     Margin="0 10 5 10" />

            <!-- Description -->
            <Label Grid.Row="1" Grid.Column="0" 
                   Content="Description : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="1" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding Description}"
                     Padding="2 4 0 0"
                     Margin="0 10 5 10" />
        </Grid>
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />

    </Grid>
</UserControl>
```

Démarrez le programme et testez la validation. Le message d'erreur s'affichera en dessous du contrôle.

### Propriété MaxLength - UcGestionCategorie.xaml

Il est possible de limiter le nombre de caractères dans un **\<TextBox>** avec la propriété **MaxLength**. 

Il est préférable de l'utiliser dans la vue (lignes 61 et 74).

Avec cette propriété, il n'y aura plus de message d'erreur pour la longueur, mais il faut tout de même que le validateur s'en assure, car le **Service** n'a aucune idée si la **Vue** s'en occupe.

Pensez à utiliser cette propriété pour le **TP 3**.

```xaml
<UserControl x:Class="SuperCarte.WPF.Views.UcGestionCategorie"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008"              
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"             
             d:DataContext="{d:DesignInstance vm:GestionCategorieVM}"
             mc:Ignorable="d" 
             d:DesignHeight="450" d:DesignWidth="800">    
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="auto"/>
            <RowDefinition Height="auto" />
            <RowDefinition Height="*" />
            <RowDefinition Height="20" />
        </Grid.RowDefinitions>

        <!--Rangée 0-->
        <TextBlock 
            Grid.Row="0" 
            VerticalAlignment="Center" HorizontalAlignment="Center"
            FontSize="16" FontWeight="Bold"
            Text="Gestion d'une catégorie"/>

        <!--Rangée 1-->
        <WrapPanel Grid.Row="1" 
                    Orientation="Horizontal" VerticalAlignment="Center">

            <Button Content="N" ToolTip="Nouveau"
                    Margin="5" Width="32" Height="32" 
                    Command="{Binding NouveauCommande}"/>
            <Button Content="E" ToolTip="Enregistrer"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding EnregistrerCommande}"/>
            <Button Content="R" ToolTip="Rafraichir"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding ObtenirCommande}"/>
        </WrapPanel>

        <!--Rangée 2-->
        <!-- Formulaire -->
        <Grid Grid.Row="2" IsEnabled="{Binding ChampsModifiables}">
            <Grid.RowDefinitions>
                <RowDefinition Height="auto"></RowDefinition>
                <RowDefinition Height="auto"></RowDefinition>
            </Grid.RowDefinitions>
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="auto"/>
                <ColumnDefinition Width="*" />
            </Grid.ColumnDefinitions>
            
            <!-- Nom -->
            <Label Grid.Row="0" Grid.Column="0" 
                   Content="Nom : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="0" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding Nom}" 
                     MaxLength="35"
                     Padding="2 4 0 0"
                     Margin="0 10 5 10" />

            <!-- Description -->
            <Label Grid.Row="1" Grid.Column="0" 
                   Content="Description : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="1" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding Description}"
                     MaxLength="50"
                     Padding="2 4 0 0"
                     Margin="0 10 5 10" />
        </Grid>
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />

    </Grid>
</UserControl>
```

# Localisation dans le code - VM, Service et Validateur

Pour faire la localisation dans le code, il faut utiliser la librairie de localisation de **.NET**.

Cette librairie donne accès à la classe **IStringLocalizer\<T>** qui est possible d'injecter dans une classe.

Il faut également utiliser les fichiers ressources avec cette technique. Le type générique du **IStringLocalizer\<T>** correspond au fichier ressource.

Il existe plusieurs visions pour la gestion des fichiers ressources. Il est possible d'en faire un par classe qui l'utilise et d'utiliser des fichiers globaux pour les éléments généraux qui sont utilisés par plusieurs classes.

L'exemple ci-dessous est pour la validation du **CategorieModel**.

## Installation de la librairie

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. Il est important que le **Projet par défaut** **.Core** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.Core**.

```csharp showLineNumbers
Install-Package Microsoft.Extensions.Localization
```

## Enregistrement du service - App.xaml.cs

Dans le fichier **App.xaml.cs**, il faut enregistrer le service de pour la localisation.

Modifiez le constructeur par le code ci-dessous.

L'enregistrement se fait à la ligne 13. **services.AddLocalization();**

```csharp showLineNumbers
public App()
{
    //Modification de la langue dans l'extension et du thread principal
    CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("fr-CA");
    WPFLocalizeExtension.Engine.LocalizeDictionary.Instance.SetCurrentThreadCulture = true;
    WPFLocalizeExtension.Engine.LocalizeDictionary.Instance.Culture = CultureInfo.DefaultThreadCurrentCulture;
    
    var builder = Host.CreateDefaultBuilder();

    //Enregistrement des services
    builder.ConfigureServices((context, services) =>
    {
        services.AddLocalization();
        services.AddSingleton<MainWindow>(); //Fenêtre principale

        //Enregistrement du contexte    
        services.AddDbContext<SuperCarteContext>(options => options.UseSqlServer(context.Configuration.GetConnectionString("DefaultConnection")));

        //Enregistrement des classes d'assistance
        services.AddSingleton<INavigateur, Navigateur>();

        //Appel des méthodes d'extension                        
        services.EnregistrerRepositories();
        services.EnregistrerServices();
        services.EnregistrerValidateurs();
        services.EnregistrerViewModels();
    });

    _host = builder.Build();
}
```

## Création du fichier ressource - ResCategorieValidateur

Dans le projet **SuperCarte.Core**, créez un dossier **Resx**.

Créez le fichier ressource **ResCategorieValidateur.resx** dans le dossier **Resx**. 

Il est important que le **Modificateur d'accès** du fichier ressource soit **Public**. Si le fichier ressource n'et pas **Public**, il ne sera pas utilisable par le **IStringLocalizer**.

| Nom                     | Valeur                                              |
| ----------------------- | --------------------------------------------------- |
| Nom_Obligatoire         | Le nom est obligatoire.                             |
| Nom_LongueurMax         | Le nom doit avoir 35 caractères au maximum.          |
| Description_LongueurMax | La description doit avoir 50 caractères au maximum. |

Créez le fichier ressource anglais **ResCategorieValidateur.en.resx**. Pour les fichiers des autres langues, **il ne faut pas changer le Modificateur d'accès**. Il faut le laisser à **Pas de génération de code**.

| Nom                     | Valeur                                                   |
| ----------------------- | -------------------------------------------------------- |
| Nom_Obligatoire         | The name is mandatory.                                   |
| Nom_LongueurMax         | The maximum length for the name is 35 characters.        |
| Description_LongueurMax | The maximum length for the description is 50 characters. |

## Injection du IStringLocalizer - CategorieValidateur

Le service **AddLocalization** qui a été ajouté dans le fichier **App.xaml.cs** permet d'avoir accès au service **IStringLocalizer**.

Ce service permet d'avoir accès au fichier ressource demandé en fonction de la culture en cours du programme.

**IStringLocalizer** a besoin d'un type lors de son injection. Le type est le nom du fichier ressource.

Il faut mettre le **IStringLocalizer** dans les paramètres du constructeur pour toutes classes qui a besoin d'un accès à des fichiers ressources. Il faut un **IStringLocalizer** par fichier ressource.

Modifiez la classe **CategorieValidateur** par le code ci-dessous.

```csharp showLineNumbers
using FluentValidation;
using FluentValidation.Results;
using Microsoft.Extensions.Localization;
using SuperCarte.Core.Extensions;
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;
using SuperCarte.Core.Resx;

namespace SuperCarte.Core.Validateurs;

/// <summary>
/// Classe qui valide le modèle CategorieModel
/// </summary>
public class CategorieValidateur : AbstractValidator<CategorieModel>, IValidateur<CategorieModel>
{    
    private readonly IStringLocalizer<ResCategorieValidateur> _resCategorieValidateur;

    /// <summary>
    /// Constructeur
    /// </summary>    
    /// <param name="resCategorieValidateur">Fichier ressource ResCategorieValidateur</param>
    public CategorieValidateur(IStringLocalizer<ResCategorieValidateur> resCategorieValidateur)
    {        
        _resCategorieValidateur = resCategorieValidateur;

        RuleFor(i => i.Nom).Cascade(CascadeMode.Stop)
            .Must(ValiderStringObligatoire).WithMessage(_resCategorieValidateur["Nom_Obligatoire"])
            .MaximumLength(35).WithMessage(_resCategorieValidateur["Nom_LongueurMax"]);

        RuleFor(i => i.Description).Cascade(CascadeMode.Stop)
            .MaximumLength(50).WithMessage(_resCategorieValidateur["Description_LongueurMax"]);
    }

    public async Task<ValidationModel> ValiderAsync(CategorieModel modele)
    {
        ValidationResult validationResult = await base.ValidateAsync(modele);

        return validationResult.VersValidationModel();
    }

    /// <summary>
    /// Valider une chaine de caractère qui est obligatoire
    /// </summary>
    /// <param name="valeur">Chaine à valider</param>
    /// <returns>Vrai si valide, faux si non valide</returns>
    private bool ValiderStringObligatoire(string valeur)
    {
        return !string.IsNullOrWhiteSpace(valeur);
    }
}
```

Pour être en mesure de récupérer une valeur du fichier ressource, il faut spécifier le nom de la clé dans l'index.

Par exemple, **_resCategorieValidateur["Nom_Obligatoire"]** permet d'obtenir la valeur de la clé **Nom_Obligatoire**.

Démarrez le programme et testez en français et en anglais la validation.

# Gestion d'un utilisateur

Pour l'utilisateur, le validateur devra s'assurer que le nom d'utilisateur n'est pas déjà utilisé.

Également, il faut mettre une mécanique pour le mot de passe. Il doit être **haché** avec l'algorithme **bcrypt**.

Dans une fenêtre de gestion utilisateur, généralement, il est seulement possible de mettre un mot de passe lors de la création. S'il l'administrateur doit réinitialiser le mot de passe, il s'agit d'une action distincte. Donc pour cette gestion, il ne sera pas possible de modifier le mot de passe en mode **modification**. 

Pour la sélection du rôle, il est préférable d'utiliser un **combobox** pour faire la sélection dans une liste. Il faut obtenir les éléments disponibles de la liste.

## SuperCarte.Core - Combobox

Cette section explique comment avoir les éléments nécessaires dans la logique d'affaires pour faire fonctionner une **ComboBox**.

### Création du modèle - ListeItem

Le modèle **ListeItem** permet de créer un item simple avec une valeur et un texte. La valeur est généralement la clé et le texte est libellé qui représente bien la valeur. Le **Combobox** utilisera cette classe.

Créez la classe **ListeItem.cs** dans le dossier **Model** du projet **SuperCarte.Core**.

```csharp showLineNumbers
namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient un couple Valeur et Texte pour les items génériques
/// </summary>
/// <typeparam name="TValeur"></typeparam>
public class ListeItem<TValeur>
{
    public TValeur Valeur { get; set; }

    public string Texte { get; set; }
}
```

La classe utilise un type générique pour la valeur.

### Ajout de ObtenirListeItem dans le Repository - RoleRepo

Le **Repository** s'occupera de créer une liste de **ListeItem**.

Modifiez l'interface **IRoleRepo.cs** pour le code ci-dessous.

```csharp showLineNumbers
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Interface qui contient les méthodes de communication avec la base de données pour la table Role
/// </summary>
public interface IRoleRepo : IBasePKUniqueRepo<Role,int>
{
    /// <summary>
    /// Obtenir la liste des rôles dans un objet listeItem
    /// </summary>
    /// <returns>Liste de rôles dans un ListItem</returns>
    List<ListeItem<int>> ObtenirListeItem();
}
```

Modifiez la classe **RoleRepo.cs** pour le code ci-dessous.

```csharp showLineNumbers
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories.Bases;
using SuperCarte.EF.Data;
using SuperCarte.EF.Data.Context;

namespace SuperCarte.Core.Repositories;

/// <summary>
/// Classe qui contient les méthodes de communication avec la base de données pour la table Role
/// </summary>
public class RoleRepo : BasePKUniqueRepo<Role,int>, IRoleRepo
{
    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="bd">Contexte de la base de données</param>
    public RoleRepo(SuperCarteContext bd) : base(bd)
	{
        //Vide, il sert uniquement a recevoir le contexte et à l'envoyer à la classe parent.
    }

    public List<ListeItem<int>> ObtenirListeItem()
    {
        return (from lqRole in _bd.RoleTb
                select
                    new ListeItem<int>()
                    {
                        Valeur = lqRole.RoleId,
                        Texte = lqRole.Nom
                    }).ToList();
    }
}
```

### Création du service - RoleService

Le service doit avoir une méthode qui obtient la liste de **ListeItem** pour les rôles.

Il est également possible de considérer ceci comme une logique d'affaires, car le comportement doit être le même, peu importe la vue. Pour ce projet et le **TP 3**, ce sera cette approche.

Créez l'interface **IRoleService.cs** dans le dossier **Services**.

La méthode est synchrone, car elle sera utilisée lors de la création du **ViewModel**.

```csharp showLineNumbers
using SuperCarte.Core.Models;

namespace SuperCarte.Core.Services;

/// <summary>
/// Interface qui contient les services du modèle Role
/// </summary>
public interface IRoleService
{
    /// <summary>
    /// Obtenir la liste des rôles dans un objet listeItem
    /// </summary>    
    /// <returns>Liste de rôles dans un ListItem</returns>
    List<ListeItem<int>> ObtenirListeItem();
}
```

Créez la classe **RoleService.cs**  dans le dossier **Services**.

```csharp showLineNumbers
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;

namespace SuperCarte.Core.Services;

/// <summary>
/// Classe qui contient les services du modèle Role
/// </summary>
public class RoleService : IRoleService
{
    private readonly IRoleRepo _roleRepo;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="roleRepo">Repository Role</param>
    public RoleService(IRoleRepo roleRepo)
    {
        _roleRepo = roleRepo;
    }

    public List<ListeItem<int>> ObtenirListeItem()
    {
        return _roleRepo.ObtenirListeItem();
    }
}
```

## SuperCarte.Core - Gestion

Cette section explique comment avoir les éléments nécessaires dans la logique d'affaires pour faire fonctionner la mécanique de gestion.

La mécanique est identique à cette de la catégorie. Par contre, le mot de passe de l'utilisateur doit être géré différemment, car il n'est pas possible de le modifier par ce formulaire.

### Création du modèle - UtilisateurModel

Créez la classe **UtilisateurModel** dans le dossier **Models**.

```csharp showLineNumbers
namespace SuperCarte.Core.Models;

/// <summary>
/// Classe qui contient l'information d'un utilisateur
/// </summary>
public class UtilisateurModel
{
    public int UtilisateurId { get; set; }

    public string Prenom { get; set; } = null!;

    public string Nom { get; set; } = null!;

    public string NomUtilisateur { get; set; } = null!;    

    public int RoleId { get; set; }
}
```

La classe ne contient pas de propriété pour le mot de passe.

### Méthode d'extension - UtilisateurMapExtension

Créez la classe **UtilisateurMapExtension.cs** dans le dossier **Extensions**.

La classe contient les méthodes d'extension pour convertir ou copier le modèle de données vers le modèle du domaine et vice-versa. Le champ **MotPassHash** n'est pas traité.

```csharp showLineNumbers
using SuperCarte.Core.Models;
using SuperCarte.EF.Data;

namespace SuperCarte.Core.Extensions;

/// <summary>
/// Classe statique qui regroupe les méthodes d'extension pour la conversion (mapping) du modèle Utilisateur
/// </summary>
public static class UtilisateurMapExtension
{
    /// <summary>
    /// Convertir un objet Utilisateur vers un objet UtilisateurModel
    /// </summary>
    /// <param name="item">Objet à convertir</param>
    /// <returns>Objet converti</returns>
    public static UtilisateurModel VersUtilisateurModel(this Utilisateur item)
    {
        return new UtilisateurModel()
        {
            UtilisateurId = item.UtilisateurId,
            Prenom = item.Prenom,
            Nom = item.Nom,
            NomUtilisateur = item.NomUtilisateur,            
            RoleId = item.RoleId
        };
    }

    /// <summary>
    /// Convertir un objet UtilisateurModel vers un objet Utilisateur
    /// </summary>
    /// <param name="item">Objet à convertir</param>
    /// <returns>Objet converti</returns>
    public static Utilisateur VersUtilisateur(this UtilisateurModel item)
    {
        return new Utilisateur()
        {
            UtilisateurId = item.UtilisateurId,
            Prenom = item.Prenom,
            Nom = item.Nom,
            NomUtilisateur = item.NomUtilisateur,                      
            RoleId = item.RoleId
        };
    }    

    /// <summary>
    /// Méthode qui copie les valeurs des propriétés de l'objet de donnée Utilisateur dans l'objet du modèle UtilisateurModel
    /// </summary>
    /// <param name="itemDestination">UtilisateurModel à recevoir la copie (destination)</param>
    /// <param name="utilisateurSource">L'objet Utilisateurde référence pour la copie (source)</param>
    /// <param name="copierClePrimaire">Copier de la clé primaire</param>
    public static void Copie(this UtilisateurModel itemDestination, Utilisateur utilisateurSource, bool copierClePrimaire)
    {
        if (copierClePrimaire == true)
        {
            itemDestination.UtilisateurId = utilisateurSource.UtilisateurId;
        }

        itemDestination.Prenom = utilisateurSource.Prenom;
        itemDestination.Nom = utilisateurSource.Nom;
        itemDestination.NomUtilisateur = utilisateurSource.NomUtilisateur;        
        itemDestination.RoleId = utilisateurSource.RoleId;
    }

    /// <summary>
    /// Méthode qui copie les valeurs des propriétés du UtilisateurModel dans l'objet de donnée Utilisateur
    /// </summary>
    /// <param name="itemDestination">Utilisateur à recevoir la copie (destination)</param>
    /// <param name="utilisateurModelSource">L'objet UtilisateurModel de référence pour la copie (source)</param>
    /// <param name="ignoreClePrimaire">Ignore la copie de la clé primaire</param>
    public static void Copie(this Utilisateur itemDestination, UtilisateurModel utilisateurModelSource, bool ignoreClePrimaire = true)
    {
        if (ignoreClePrimaire == false)
        {
            itemDestination.UtilisateurId = utilisateurModelSource.UtilisateurId;
        }

        itemDestination.Prenom = utilisateurModelSource.Prenom;
        itemDestination.Nom = utilisateurModelSource.Nom;
        itemDestination.NomUtilisateur = utilisateurModelSource.NomUtilisateur;        
        itemDestination.RoleId = utilisateurModelSource.RoleId;
    }
}
```

### Installation de la librairie BCrpyt.Net

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. Il est important que le **Projet par défaut** de **Entity Framework** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.Core**.

```powershell
Install-Package BCrypt.Net-Next
```

Pour être en mesure d'utiliser la librairie dans une classe, il faut mettre ce **using**.

```csharp showLineNumbers
using BC = BCrypt.Net.BCrypt;
```

La classe a le même nom qu'une partie du **namespace**. Il n'est pas possible d'utiliser la classe directement, car il y a ambiguïté entre la classe et le **namespace**. La syntaxe indique que la classe **BCrypt** dans ce fichier sera renommée sous le nom **BC**.

### Création du service - UtilisateurService

Il faut avoir les 4 méthodes pour la gestion, **Obtenir (sync et async)**, **Ajouter** et **Modifier**.

Créez l'interface **IUtilisateurService.cs** dans le dossier **Services**.

```csharp showLineNumbers
using SuperCarte.Core.Models;

namespace SuperCarte.Core.Services;

/// <summary>
/// Interface qui contient les services du modèle Utilisateur
/// </summary>
public interface IUtilisateurService
{
    /// <summary>
    /// Obtenir un utilisateur à partir de sa clé primaire en asynchrone.
    /// </summary>
    /// <param name="utilisateurId">Clé primaire de l'utilisateur</param>
    /// <returns>L'utilisateur ou null si l'utilisateur n'est pas trouvé</returns>
    Task<UtilisateurModel?> ObtenirAsync(int utilisateurId);

    /// <summary>
    /// Obtenir un utilisateur à partir de sa clé primaire.
    /// </summary>
    /// <param name="utilisateurId">Clé primaire de l'utilisateur</param>
    /// <returns>L'utilisateur ou null si l'utilisateur n'est pas trouvé</returns>
    UtilisateurModel? Obtenir(int utilisateurId);

    /// <summary>
    /// Ajouter un utilisateur en asynchrone.
    /// </summary>
    /// <param name="utilisateurModel">Utilisateur à ajouter</param>        
    /// <param name="motPasse">Mot de passe</param>
    /// <returns>Vrai si ajouté, faux si non ajouté</returns>
    Task<bool> AjouterAsync(UtilisateurModel utilisateurModel, string motPasse);

    /// <summary>
    /// Modifier un utilisateur en asynchrone.
    /// </summary>
    /// <param name="utilisateurModel">Utilisateur à modifier</param>
    /// <returns>Vrai si ajouté, faux si non ajouté</returns>
    Task<bool> ModifierAsync(UtilisateurModel utilisateurModel);
}
```

Créez la classe **UtilisateurService.cs** dans le dossier **Services**.

Voici le code complet. Les méthodes seront expliquées séparément.

```csharp showLineNumbers
using SuperCarte.Core.Extensions;
using SuperCarte.Core.Models;
using SuperCarte.Core.Repositories;
using SuperCarte.EF.Data;
using BC = BCrypt.Net.BCrypt; //La classe a le même nom qu'une partie du namespace. Cette nomenclature permet de renommer la classe.

namespace SuperCarte.Core.Services;

/// <summary>
/// Classe qui contient les services du modèle Utilisateur
/// </summary>
public class UtilisateurService : IUtilisateurService
{
    private readonly IUtilisateurRepo _utilisateurRepo;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="utilisateurRepo">Repository Utilisateur</param>
    public UtilisateurService(IUtilisateurRepo utilisateurRepo)
    {
        _utilisateurRepo = utilisateurRepo;
    }

    public async Task<bool> AjouterAsync(UtilisateurModel utilisateurModel, string motPasse)
    {
        //Transformation de l'objet du modèle du domaine en objet du modèle de données
        Utilisateur utilisateur = utilisateurModel.VersUtilisateur();

        //Le mot de passe n'est pas copié, il faut le convertir avec BCrypt
        utilisateur.MotPasseHash = BC.HashPassword(motPasse);

        //Ajout dans repository avec enregistrement immédiat
        await _utilisateurRepo.AjouterAsync(utilisateur, true);

        //Assigne les valeurs de la base de données dans l'objet du modèle
        utilisateurModel.Copie(utilisateur, true);

        return true;
    }

    public async Task<bool> ModifierAsync(UtilisateurModel utilisateurModel)
    {
        //Il n'y a aucune référence au mot de passe.
        Utilisateur? utilisateur = await _utilisateurRepo.ObtenirParCleAsync(utilisateurModel.UtilisateurId);

        if (utilisateur != null)
        {
            //Assigner les valeurs dans la catégorie
            utilisateur.Copie(utilisateurModel);

            await _utilisateurRepo.EnregistrerAsync();

            //Assigne les valeurs de la base de données dans l'objet du modèle
            utilisateurModel.Copie(utilisateur, false);

            return true;
        }
        else
        {
            throw new Exception("Impossible de modifier l'utilisateur. Aucun utilisateur trouvé avec la clé primaire.");
        }
    }

    public async Task<UtilisateurModel?> ObtenirAsync(int utilisateurId)
    {
        Utilisateur? utilisateur = await _utilisateurRepo.ObtenirParCleAsync(utilisateurId);
        
        return utilisateur?.VersUtilisateurModel();
    }

    public UtilisateurModel? Obtenir(int utilisateurId)
    {
        Utilisateur? utilisateur = _utilisateurRepo.ObtenirParCle(utilisateurId);

        return utilisateur?.VersUtilisateurModel();
    }
}
```

Premièrement, la méthode **AjouterAsync()**  a 2 paramètres. Le premier est le modèle et le 2e est le mot de passe en texte. Le mot de passe ne fait pas partie du modèle du domaine, il doit être envoyé comme un 2e paramètre.

Le mot de passe en texte est **haché** avec **BCrypt** et le **hash** est assigné dans le modèle de données.

```csharp showLineNumbers
public async Task<bool> AjouterAsync(UtilisateurModel utilisateurModel, string motPasse)
{
    //Transformation de l'objet du modèle du domaine en objet du modèle de données
    Utilisateur utilisateur = utilisateurModel.VersUtilisateur();

    //Le mot de passe n'est pas copié, il faut le convertir avec BCrypt
    utilisateur.MotPasseHash = BC.HashPassword(motPasse);

    //Ajout dans repository avec enregistrement immédiat
    await _utilisateurRepo.AjouterAsync(utilisateur, true);

    //Assigne les valeurs de la base de données dans l'objet du modèle
    utilisateurModel.Copie(utilisateur, true);

    return true;
}
```

Pour la modification, la mécanique est la même, sauf que l'extension **.Copie** ne s'occupe pas du mot de passe.

```csharp showLineNumbers
public async Task<bool> ModifierAsync(UtilisateurModel utilisateurModel)
{
    //Il n'y a aucune référence au mot de passe.
    Utilisateur? utilisateur = await _utilisateurRepo.ObtenirParCleAsync(utilisateurModel.UtilisateurId);

    if (utilisateur != null)
    {
        //Assigner les valeurs dans l'utilisateur, sauf pour le mot de passe.
        utilisateur.Copie(utilisateurModel);

        await _utilisateurRepo.EnregistrerAsync();

        //Assigne les valeurs de la base de données dans l'objet du modèle
        utilisateurModel.Copie(utilisateur, false);

        return true;
    }
    else
    {
        throw new Exception("Impossible de modifier l'utilisateur. Aucun utilisateur trouvé avec la clé primaire.");
    }
}
```

## SuperCarte.WPF

### Enregistrer les services - SCServiceExtensions

Dans la classe **SCServiceExtensions**, il faut enregistrer les 2 nouveaux services.

```csharp showLineNumbers
using Microsoft.Extensions.DependencyInjection;
using SuperCarte.Core.Services;

namespace SuperCarte.WPF.Extensions.ServiceCollections;

/// <summary>
/// Classe d'extension qui permet d'enregistrer les classes de la catégorie Service
/// </summary>
public static class SCServiceExtensions
{
    /// <summary>
    /// Méthode qui permet d'enregistrer les services de l'application
    /// </summary>
    /// <param name="services">La collection de services</param>
    public static void EnregistrerServices(this IServiceCollection services)
    {
        services.AddScoped<ICategorieService, CategorieService>();
        services.AddScoped<ICarteService, CarteService>();
        services.AddScoped<IRoleService, RoleService>();
        services.AddScoped<IUtilisateurService, UtilisateurService>();
    }
}
```

### Création du ViewModel - GestionUtilisateurVM

Créez la classe **GestionUtilisateurVM.cs** dans le dossier **ViewModels**.

Le **ViewModel** est très similaire à celui de la catégorie. Les différences sont expliquées après le bout de code.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.Input;
using SuperCarte.EF.Data;

namespace SuperCarte.WPF.ViewModels;

public class GestionUtilisateurVM : BaseParametreVM<int>
{
    #region Dépendances
    private readonly IUtilisateurService _utilisateurService;
    private readonly IRoleService _roleService;
    #endregion

    #region Attributs des propriétés
    private int _utilisateurId;
    private string _prenom;
    private string _nom;
    private string _nomUtilisateur;
    private string? _motPasse;
    private int _roleId;
    private List<ListeItem<int>> _lstRole;
    private bool _estEnTravail = false;
    private bool _champsModifiables = true;
    #endregion

    public GestionUtilisateurVM(IUtilisateurService utilisateurService, IRoleService roleService)
    {
        _utilisateurService = utilisateurService;
        _roleService = roleService;

        ListeRoles = _roleService.ObtenirListeItem();
        ListeRoles.Insert(0, new ListeItem<int>() { Valeur = 0, Texte = "Veuillez sélectionner un rôle..."});

        EnregistrerCommande = new AsyncRelayCommand(EnregistrerAsync, () => !EstEnTravail);
        ObtenirCommande = new AsyncRelayCommand(ObtenirAsync, () => !EstEnTravail);
        NouveauCommande = new RelayCommand(Nouveau, () => !EstEnTravail);
    }

    #region Méthodes d'assignation
    /// <summary>
    /// Assigner les propriétés liées du ViewModel vers les propriétés du modèle
    /// </summary>
    /// <returns>Objet du modèle</returns>
    private UtilisateurModel VersModele()
    {
        return new UtilisateurModel
        {
            UtilisateurId = this.UtilisateurId,
            Prenom = this.Prenom,
            Nom = this.Nom,
            NomUtilisateur = this.NomUtilisateur,
            RoleId= this.RoleId
        };
    }

    /// <summary>
    /// Assigner les propriétés du modèle vers les propriétés liées du ViewModel
    /// </summary>
    /// <param name="categorieModel">Modèle</param>
    private void VersVM(UtilisateurModel? utilisateurModel)
    {
        if (utilisateurModel != null)
        {
            UtilisateurId = utilisateurModel.UtilisateurId;
            Prenom = utilisateurModel.Prenom;
            Nom = utilisateurModel.Nom;
            NomUtilisateur = utilisateurModel.NomUtilisateur;
            RoleId = utilisateurModel.RoleId;            
        }
        else
        {
            UtilisateurId = 0;
            Prenom = string.Empty;
            Nom = string.Empty;
            NomUtilisateur = string.Empty;
            RoleId = 0;
        }
        
        MotPasse = string.Empty;
    }

    public override void AssignerParametre(int parametre)
    {
        UtilisateurId = parametre;

        UtilisateurModel? utilisateurModel = _utilisateurService.Obtenir(UtilisateurId);

        VersVM(utilisateurModel);
    }
    #endregion

    #region Méthodes des commandes
    /// <summary>
    /// Enregistrer la catégorie
    /// </summary>    
    private async Task EnregistrerAsync()
    {
        ChampsModifiables = false;
        EstEnTravail = true;

        UtilisateurModel utilisateurModel = VersModele();

        if (utilisateurModel.UtilisateurId == 0)
        {
            //La clé primaire est zéro, donc c'est un nouvel utilisateur
            await _utilisateurService.AjouterAsync(utilisateurModel, MotPasse!);
        }
        else
        {
            //La clé primaire n'est pas zéro, donc c'est un utilisateur existant
            await _utilisateurService.ModifierAsync(utilisateurModel);
        }        

        VersVM(utilisateurModel);

        EstEnTravail = false;
        ChampsModifiables = true;
    }

    /// <summary>
    /// Obtenir l'utilisateur
    /// </summary>
    /// <returns></returns>
    private async Task ObtenirAsync()
    {
        EstEnTravail = true;

        UtilisateurModel? utilisateurModel = await _utilisateurService.ObtenirAsync(UtilisateurId);

        VersVM(utilisateurModel);

        EstEnTravail = false;
    }

    /// <summary>
    /// Mettre le ViewModel en mode ajouter
    /// </summary>
    private void Nouveau()
    {
        UtilisateurId = 0;
        Prenom = string.Empty;
        Nom = string.Empty;
        NomUtilisateur = string.Empty;
        MotPasse = string.Empty;
        RoleId = 0;
    }
    #endregion

    #region Commandes
    public IAsyncRelayCommand EnregistrerCommande { get; private set; }

    public IAsyncRelayCommand ObtenirCommande { get; private set; }

    public IRelayCommand NouveauCommande { get; private set; }
    #endregion   

    #region Propriétés liées
    public bool EstEnTravail
    {
        get
        {
            return _estEnTravail;
        }
        set
        {
            if (SetProperty(ref _estEnTravail, value))
            {
                ObtenirCommande.NotifyCanExecuteChanged();
                EnregistrerCommande.NotifyCanExecuteChanged();
                NouveauCommande.NotifyCanExecuteChanged();
            }
        }
    }

    public bool ChampsModifiables
    {
        get
        {
            return _champsModifiables;
        }
        set
        {
            SetProperty(ref _champsModifiables, value);
        }
    }

    public bool MotPasseModifiable
    {
        get
        {
            return UtilisateurId == 0;
        }
    }

    public int UtilisateurId 
    { 
        get
        {
            return _utilisateurId;
        }
        set
        {
            if(SetProperty(ref _utilisateurId, value))
            {
                OnPropertyChanged(nameof(MotPasseModifiable));
            }
        }
    }

    public string Prenom
    {
        get
        {
            return _prenom;
        }
        set
        {
            SetProperty(ref _prenom, value);
        }
    }

    public string Nom
    {
        get
        {
            return _nom;
        }
        set
        {
            SetProperty(ref _nom, value);
        }
    }

    public string NomUtilisateur
    {
        get
        {
            return _nomUtilisateur;
        }
        set
        {
            SetProperty(ref _nomUtilisateur, value);
        }
    }

    public string? MotPasse
    {
        get
        {
            return _motPasse;
        }
        set
        {
            SetProperty(ref _motPasse, value);
        }
    }

    public int RoleId
    {
        get
        {
            return _roleId;
        }
        set
        {
            SetProperty(ref _roleId, value);
        }
    }

    public List<ListeItem<int>> ListeRoles
    {
        get
        {
            return _lstRole;
        }

        private set
        {
            SetProperty(ref _lstRole, value);
        }
    }
    #endregion
}
```

Pour débuter, le **ViewModel** a besoin de 2 services. Il doit avoir accès aux méthodes de gestion de l'utilisateur et également au service du **Role** pour obtenir la liste de **ListeItem**.

À la ligne 10 du code ci-dessous, la propriété **ListeRoles** contient la liste des rôles disponibles pour la vue. L'assignation se fait dans le constructeur, car il s'agit d'une dépendance de la vue. La liste doit exister avant d'afficher l'utilisateur.

À la ligne 11, il faut ajouter l'élément par défaut. Il est plus intéressant de mettre du texte pour indiquer qu'il faut choisir un élément dans la liste.

```csharp showLineNumbers
/***/
private List<ListeItem<int>> _lstRole;
/***/

public GestionUtilisateurVM(IUtilisateurService utilisateurService, IRoleService roleService)
{
    _utilisateurService = utilisateurService;
    _roleService = roleService;

    ListeRoles = _roleService.ObtenirListeItem();
    ListeRoles.Insert(0, new ListeItem<int>() { Valeur = 0, Texte = "Veuillez sélectionner un rôle..."});

    /***/
}

/***/
public List<ListeItem<int>> ListeRoles
{
    get
    {
        return _lstRole;
    }

    private set
    {
        SetProperty(ref _lstRole, value);
    }
}
/***/
```

Il faut également indiquer à la **Vue** si le champ **MotPasse** est modifiable ou non. Le champ peut être modifié uniquement lorsque c'est un nouvel utilisateur. Cette propriété n'utilise pas un attribut et elle a une logique en fonction d'une autre propriété.

Il est important que lorsque la propriété **UtilisateurId** est modifiée, il faut également indiquer que la propriété **MotPasseModifiable** est modifiée. À la ligne 19 de la méthode ci-dessous, la méthode **OnPropertyChanged()** indique aux composants qui sont liés à la propriété **MotPasseModifiable** de se mettre à jour. La méthode **OnPropertyChanged** provient de la classe **ObservableObject** du **MVVM Toolkit**.

```csharp showLineNumbers
public bool MotPasseModifiable
{
    get
    {
        return UtilisateurId == 0;
    }
}

public int UtilisateurId 
{ 
    get
    {
        return _utilisateurId;
    }
    set
    {
        if(SetProperty(ref _utilisateurId, value))
        {
            OnPropertyChanged(nameof(MotPasseModifiable));
        }
    }
}
```

### Enregistrement du ViewModel - SCViewModelExtensions

Dans la classe **SCServiceVideModels**, il faut enregistrer le nouveau **ViewModel**.

```csharp showLineNumbers
using Microsoft.Extensions.DependencyInjection;

namespace SuperCarte.WPF.Extensions.ServiceCollections;

/// <summary>
/// Classe d'extension qui permet d'enregistrer les classes de la catégorie Service
/// </summary>
public static class SCViewModelExtensions
{
    /// <summary>
    /// Méthode qui permet d'enregistrer les ViewModels de l'application
    /// </summary>
    /// <param name="services">La collection de services</param>
    public static void EnregistrerViewModels(this IServiceCollection services)
    {
        services.AddSingleton<MainWindowVM>();
        services.AddTransient<HelloWorldVM>(); //À retirer
        services.AddTransient<ListeCategoriesVM>();
        services.AddTransient<ListeCartesVM>();
        services.AddTransient<GestionCategorieVM>();
        services.AddTransient<GestionUtilisateurVM>();
    }
}
```

### Création de la vue - UcGestionUtilisateur.xaml

Créez le fichier **UcGestionUtilisateur.xaml** dans le dossier **Views**.

Aux lignes 7 et 8, il y a l'indicateur du **ViewModel** pour faciliter la liaison.

```xaml
<UserControl x:Class="SuperCarte.WPF.Views.UcGestionUtilisateur"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
             xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
             xmlns:local="clr-namespace:SuperCarte.WPF.Views"
             xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
             xmlns:aide="clr-namespace:SuperCarte.WPF.Aides"
             d:DataContext="{d:DesignInstance vm:GestionUtilisateurVM}"
             mc:Ignorable="d" 
             d:DesignHeight="450" d:DesignWidth="800">
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="auto"/>
            <RowDefinition Height="auto" />
            <RowDefinition Height="*" />
            <RowDefinition Height="20" />
        </Grid.RowDefinitions>

        <!--Rangée 0-->
        <TextBlock 
            Grid.Row="0" 
            VerticalAlignment="Center" HorizontalAlignment="Center"
            FontSize="16" FontWeight="Bold"
            Text="Gestion d'un utilisateur"/>

        <!--Rangée 1-->
        <WrapPanel Grid.Row="1" 
                    Orientation="Horizontal" VerticalAlignment="Center">

            <Button Content="N" ToolTip="Nouveau"
                    Margin="5" Width="32" Height="32" 
                    Command="{Binding NouveauCommande}"/>
            <Button Content="E" ToolTip="Enregistrer"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding EnregistrerCommande}"/>
            <Button Content="R" ToolTip="Rafraichir"
                    Margin="5" Width="32" Height="32"
                    Command="{Binding ObtenirCommande}"/>
        </WrapPanel>

        <!--Rangée 2-->
        <!-- Formulaire -->
        <Grid Grid.Row="2" IsEnabled="{Binding ChampsModifiables}">
            <Grid.RowDefinitions>
                <RowDefinition Height="auto"></RowDefinition>
                <RowDefinition Height="auto"></RowDefinition>
                <RowDefinition Height="auto"></RowDefinition>
                <RowDefinition Height="auto"></RowDefinition>
                <RowDefinition Height="auto"></RowDefinition>
            </Grid.RowDefinitions>
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="auto"/>
                <ColumnDefinition Width="*" />
            </Grid.ColumnDefinitions>

            <!-- Prenom -->
            <Label Grid.Row="0" Grid.Column="0" 
                   Content="Prénom : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="0" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding Prenom}" 
                     Padding="2 4 0 0"
                     Margin="0 10 5 10"/>

            <!-- Nom -->
            <Label Grid.Row="1" Grid.Column="0" 
                   Content="Nom : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="1" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding Nom}" 
                     Padding="2 4 0 0"
                     Margin="0 10 5 10"/>

            <!-- Nom utilisateur -->
            <Label Grid.Row="2" Grid.Column="0" 
                   Content="Nom d'utilisateur : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="2" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding NomUtilisateur}"
                     Padding="2 4 0 0"
                     Margin="0 10 5 10"/>

            <!-- Mot de passe -->
            <Label Grid.Row="3" Grid.Column="0" 
                   Content="Mot de passe : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <TextBox Grid.Row="3" Grid.Column="1" 
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding MotPasse}"
                     IsEnabled="{Binding MotPasseModifiable}"
                     Padding="2 4 0 0"
                     Margin="0 10 5 10"/>
            
            <!-- Rôle -->
            <Label Grid.Row="4" Grid.Column="0" 
                   Content="Role : "
                   Margin="5 10 5 10" 
                   FontWeight="Bold"/>
            <ComboBox Grid.Row="4" Grid.Column="1" 
                      Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                      ItemsSource="{Binding ListeRoles}"
                      SelectedValue="{Binding RoleId}"
                      DisplayMemberPath="Texte"
                      SelectedValuePath="Valeur"                      
                      Padding="2 4 0 0"
                      Margin="0 10 5 10"/>

        </Grid>
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />

    </Grid>   
    
</UserControl>
```

Pour le mot de passe, idéalement, il faut utiliser le composant **\<PasswordBox>**. Ce composant ne peut pas être lié à une propriété du **ViewModel** pour des raisons de sécurité par sa conception. Ce composant n'est pas très **MVVM**. Pour l'instant, ce sera un **\<TextBox>**. Dans le cours sur l'intégration, il faudra modifier le **\<PasswordBox>** pour qu'il soit **liable**. Il faudra penser de le corriger ici.

Également, la propriété **IsEnabled** est liée à la propriété **MotPasseModifiable** du **ViewModel**. Le composant sera disponible uniquement lors de l'ajout.

```xaml
<!-- Mot de passe -->
<Label Grid.Row="3" Grid.Column="0" 
       Content="Mot de passe : "
       Margin="5 10 5 10" 
       FontWeight="Bold"/>            

<TextBox Grid.Row="3" Grid.Column="1" 
         Validation.ErrorTemplate="{StaticResource erreurTemplate}"
         Text="{Binding MotPasse}"
         IsEnabled="{Binding MotPasseModifiable}"
         Padding="2 4 0 0"
         Margin="0 10 5 10"/>
```

Ensuite, le composant **\<ComboBox>** doit avoir les propriétés **ItemsSource** et **SelectedValue** associées au **ViewModel**. 

**ItemsSource** correspond à la liste des éléments et la propriété **SelectedValue** à l'item sélectionné dans la liste.

La propriété **SelectedValuePath** permet d'indiquer la propriété du **ListeItem\<int>** qui sera utilisée pour la valeur. C'est la valeur de cette propriété qui sera envoyée dans la propriété **SelectedValue**. Il est important que leur type soit le même.

La propriété **DisplayMemberPath** permet d'indiquer la propriété du **ListeItem\<int>** qui sera utilisée pour l'affichage.

```xaml
 <!-- Rôle -->
<Label Grid.Row="4" Grid.Column="0" 
       Content="Role : "
       Margin="5 10 5 10" 
       FontWeight="Bold"/>
<ComboBox Grid.Row="4" Grid.Column="1" 
          Validation.ErrorTemplate="{StaticResource erreurTemplate}"
          ItemsSource="{Binding ListeRoles}"
          SelectedValue="{Binding RoleId}"
          DisplayMemberPath="Texte"
          SelectedValuePath="Valeur"                      
          Padding="2 4 0 0"
          Margin="0 10 5 10"/>
```

### Ajout de la ressource pour créer le lien entre ViewModel et Vue - MainWindow.xaml

Il faut ajouter dans les ressources le lien entre le **ViewModel** et la **Vue**.

Les lignes 28 à 30 contiennent le lien entre **UcGestionUtilisateur** et **GestionUtilisateurVM**.

```xaml
<Window x:Class="SuperCarte.WPF.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:SuperCarte.WPF"  
        xmlns:vm="clr-namespace:SuperCarte.WPF.ViewModels"
        xmlns:v="clr-namespace:SuperCarte.WPF.Views"                
        mc:Ignorable="d"         
        d:DataContext="{d:DesignInstance Type=vm:MainWindowVM}"
        Title="Super Carte App" 
        Height="450" Width="800" WindowState="Maximized">
    <Window.Resources>
        <!--Assignation du ViewModel à Vue-->
        <DataTemplate DataType="{x:Type TypeName=vm:HelloWorldVM}">
            <!--À retirer éventuellement-->
            <v:UcHelloWorld />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:ListeCategoriesVM}">
            <v:UcListeCategories />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:ListeCartesVM}">
            <v:UcListeCartes />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:GestionCategorieVM}">
            <v:UcGestionCategorie />
        </DataTemplate>
        <DataTemplate DataType="{x:Type TypeName=vm:GestionUtilisateurVM}">
            <v:UcGestionUtilisateur />
        </DataTemplate>
    </Window.Resources>
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="auto"/>
            <RowDefinition Height="*"/>
        </Grid.RowDefinitions>
        <Menu Grid.Row="0" HorizontalContentAlignment="Stretch" VerticalAlignment="Stretch">
            <MenuItem Header="_Fichier">
                <MenuItem Header="_Quitter" />
            </MenuItem>
            <MenuItem Header="_Administration">
                <MenuItem Header="Liste des _cartes" Command="{Binding NaviguerListeCartesVMCommande}"/>
                <MenuItem Header="Liste des c_atégories" Command="{Binding NaviguerListeCategoriesVMCommande}"/>
            </MenuItem>            
        </Menu>

        <ContentControl Grid.Row="1"  Content="{Binding Navigateur.VMActif}" />                
    </Grid>
</Window>
```

## Test - MainWindowVM

Pour tester directement, il faut modifier le **VMActif** pour celui de **GestionUtilisateurVM**.

Il faut envoyer le paramètre 0 pour un nouveau, sinon la clé de l'utilisateur pour le modifier.

```csharp showLineNumbers
public MainWindowVM(INavigateur navigateur)
{   
    //Sélectionner le ViewModel de démarrage        
    _navigateur = navigateur;

    //Création des commandes
    NaviguerListeCartesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCartesVM>);
    NaviguerListeCategoriesVMCommande = new RelayCommand(_navigateur.Naviguer<ListeCategoriesVM>);

    //Vue initiale
    _navigateur.Naviguer<GestionUtilisateurVM, int>(0); //Pour un nouveau
    //_navigateur.Naviguer<GestionUtilisateurVM, int>(1);//Pour modifier François St-Hilaire
    
}
```

Créez un nouvel utilisateur. Le champ **Mot de passe** sera disponible. Une fois enregistré, il ne sera plus modifiable.

## Validation de l'utilisateur - Avec Repository

Il manque la validation pour la gestion de l'utilisateur.

L'utilisateur doit valider des éléments dans la base de données pour 2 champs.

- RoleId -> Doit être un RoleId qui existe dans la table **Role**.
- NomUtilisateur -> Ne doit pas avoir d'utilisateur qui a déjà le même nom d'utilisateur. Le validateur doit exclure l'utilisateur en cours.

Il est possible d'injecter un **Repository** dans le **Validateur**.

Il faut créer une règle avec la fonction **Must**.

Voici une coquille de **UtilisateurValidateur** pour le rôle et le nom d'utilisateur. Cette coquille est incomplète et donne uniquement un alignement pour faire de la validation avec un **Repository**.

À la ligne 12, le méthode **Must()** utilise une fonction **lambda** **(i,p)**. 

La variable **i** représente l'item en cours de validation. Dans ce cas-ci, c'est un objet de type **UtilisateurModel**. 

La variable **p** représente la valeur de la propriété en cours de validation. Dans ce cas-ci, c'est la valeur de **NomUtilisateur**. 

La méthode de validation doit avoir la signature **bool Methode(string p, UtilisateurModel i)** pour répondre à la fonction attendue par la méthode **Must()**.

```csharp showLineNumbers
/****/

public UtilisateurValidateur(IRoleService roleRepo, IUtilisateurRepo utilisateurRepo)
{
	_roleRepo = roleRepo;
    _utilisateurRepo = utilisateurRepo;
	
	RuleFor(i => i.RoleId).Cascade(CascadeMode.Stop)
		.Must(ValiderRoleId).WithMessage("Le rôle n'est pas valide.");
        
    RuleFor(i => i.NomUtilisateur).Cascade(CascadeMode.Stop)
        .NotEmpty().WithMessage("Le nom d'utilisateur est obligatoire.")
      	.Must((i, p) => ValiderDoublonNomUtilisateur(p, i.UtilisateurId)).WithMessage("Le nom d'utilisateur est déjà utilisé.");
}

private bool ValiderRoleId(int roldeId)
{   
    //Si la liste contient la valeur en paramètre, c'est valide.
    //Si la liste ne contient pas la valeur en paramètre, ce n'est pas valide.
    
    /*Requête SQL à reproduire dans le repo.
    	SELECT Count(*) FROM Role
    	WHERE RoleId = valeur;
    */
}

private bool ValiderDoublonNomUtilisateur(string nomUtilisateur, int utilisateurId)
{
    //Si aucun utilisateur a le même nom d'utilisateur avec un utilisateurId différent que le mien, c'est valide.
    //Si un utilisateur a le même nom d'utilisateur avec un utilisateurId différent que le mien, ce n'est pas valide.
    
    /*Requête SQL à reproduire dans le repo. Retourne 0 si l'utilisateur n'est pas utilisé par une autre personne. Retourne 1 ou plus si l'utilisateur est déjà utilisé
    	SELECT Count(*) FROM Utilisateur
    	WHERE 
    		NomUtilisateur = nomUtilisateur AND
    		UtilisateurId <> utilisateurId;
    */
}


/***/
```

## Validation du mot de passe 

Le mot de passe doit être robuste. La définition d'un mot de passe robuste peut varier, mais généralement il faut ces critères.

- 8 caractères et plus
- Au moins 3 des 4 éléments ci-dessous
  - 1 majuscule
  - 1 minuscule
  - 1 chiffre
  - 1 caractère spécial


Pour le **TP 3**, il faut faire une méthode de validation spécifique que la méthode **.Must()** utilisera pour sa validation.

Pour vous aider à déterminer les critères du contenu, il est possible d'utiliser des 4 **Regex**. Il faut que 3 des 4 **Regex** soit à **true** et que la longueur soit plus grand que 8.

```
bool minuscule = Regex.Match(motPasse,"[a-z]") //Contient une minuscule
bool majuscule = Regex.Match(motPasse,"[A-Z]") //Contient une majuscule
bool chiffre = Regex.Match(motPasse,"\\d") //Contient un chiffre
bool special = Regex.Match(motPasse,"\\W") //Contient une caractère qui n'est pas une lettre ou chiffre
```



# Modèle de données pour Gestion d'une carte - Explication

Le modèle **CarteDetailModel** a été utilisé pour la liste des cartes.

```csharp showLineNumbers
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
