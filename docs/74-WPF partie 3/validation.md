---
sidebar_position: 340
draft: true
---

# Validation

Avant d'ajouter ou de modifier un élément dans la base de données, il faut vérifier si les valeurs sont valides.

La validation est un service spécialisé. Le service principal utilisera le service de validation avant d'effectuer une création ou une modification.

Pour faire la validation, la librairie **[FluentValidation](https://docs.fluentvalidation.net/en/latest/)** sera utilisée.

Chaque propriété peut avoir une seule erreur. Dès qu'une erreur est rencontrée pour une propriété, il faut arrêter la validation de cette propriété. **WPF** permet la gestion de plusieurs erreurs par propriété, mais son affichage est complexe.

Pour plus d'information sur la librairie : https://docs.fluentvalidation.net/en/latest/

## SuperCarte.Core

### Installation de la librairie

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. Il est important que le **Projet par défaut** **.Core** soit sélectionné dans la console. Pour ce projet, ce doit être **SuperCarte.Core**.

```
Install-Package FluentValidation
```

### Création du modèle de validation - ValidationModel

Il faut une classe pour contenir le résultat d'une validation. Il serait possible de prendre celle de **FluentValidation**, mais l'application aurait une dépendance directe avec la librairie. En créant une classe propre au programme, il est possible d'avoir une **[façade](https://en.wikipedia.org/wiki/Facade_pattern)** entre la validation et les autres couches de l'application.

Créez la classe **ValidationModel** dans le dossier **Core/Models**.

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

:::warning Attention
La classe **ValidationResult** se retrouve dans plusieurs **namespace**. Assurez-vous d'utiliser celle de **FluentValidation.Results;**
:::

Créez la classe **ValidationModelExtension** dans le dossier **Core/Extensions**.

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

Voici le fonctionnement:

* La première étape consiste à indiquer la propriété dans la méthode **RuleFor** (ligne 15).

* Ensuite, il faut indiquer la règle de **Cascase**. Lorsque la valeur est **CascadeMode.Stop**, la validation s'arrête dès qu'il y a une erreur.

* Ensuite il faut appliquer chacune des règles. Il existe plusieurs méthodes internes. Lisez la documentation pour voir les différentes méthodes disponibles. Le première règle est la validation **NotNull()** (ligne 16). La méthode **WithMessage()** permet de spécifier le message d'erreur. Si ce n'est pas spécifié, ce sera un message générique et en anglais.


Il est aussi possible d'ajouter des validations personnalisée.

Par exemple, la validation pour Null et Empty se fait sur 2 lignes qui retourne la même erreur. Il serait mieux de faire cette double validation en une seule fois. Nous allons donc créer une validation personnalisée qui fait les 2 choses en même temps. 

Pour faire une validation personnalisée, il faut utiliser la méthode de validation **Must()** et indiquer la méthode de validation. La méthode de validation doit recevoir un paramètre du type de la propriété et doit retourner un booléen.

Ici, nous ajoutons **ValiderStringObligatoire** et l'appelons à la ligne 4. 

Changer la méthode pour celle-ci:
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

:::tip
La méthode **ValiderObligatoire()** est une méthode qui risque d'être réutilisée souvent. Il serait intéressant de créer une classe **BaseValidateur** et y intégrer les méthodes réutilisables.
:::

### Modification du service - CategorieService

Il faut modifier le service pour être en mesure de faire une validation et d'améliorer les méthodes ajouter et modifier afin de faire une validation au préalable.

Dans l'interface **ICategorieService**, ajoutez la signature de méthode ci-dessous.

```csharp showLineNumbers
/// <summary>
/// Valider le modèle
/// </summary>
/// <param name="categorieModel">CategorieModel à valider</param>
/// <returns>Résultat de validation</returns>
Task<ValidationModel> ValiderAsync(CategorieModel categorieModel);
```

Dans la classe **CategorieService**, il faut injecter le validateur (ligne 15, 22, et 25). 

Ensuite, il faut ajouter la méthode **ValiderAsync()** (ligne 122).

Pour la méthode **AjouterAsync()**, il faut valider avant de faire l'enregistrement (ligne 61 ) afin d'éviter les exceptions inutiles. Si l'objet n'est pas valide, il faut retourner **false** pour indiquer que l'ajout n'a pas été fait (ligne 74-77).

Pour la méthode **ModifierAsync()**, il faut aussi valider avant de faire l'enregistrement (ligne 98). afin d'éviter les exceptions inutiles. Si l'objet n'est pas valide, il faut retourner **false** pour indiquer que l'ajout n'a pas été fait (ligne 114-119).

Remplacez **CategoriService.cs** par ce code:

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
    //highlight-next-line
    private readonly IValidateur<CategorieModel> _validateur;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="categorieRepo">Repository Categorie</param>
    //highlight-next-line
    /// <param name="validateur">Validateur Categorie</param>
    //highlight-next-line
    public CategorieService(ICategorieRepo categorieRepo, IValidateur<CategorieModel> validateur)
    {
        _categorieRepo = categorieRepo;
        //highlight-next-line
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
        //highlight-next-line
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
        //highlight-start
        else
        {
            return false;
        }
        //highlight-end
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
        //highlight-next-line
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
//highlight-start
            return true;
        }
        else
        {
            return false;
        }
//highlight-end
    }

//highlight-start
    public async Task<ValidationModel> ValiderAsync(CategorieModel categorieModel)
    {
        return await _validateur.ValiderAsync(categorieModel);
    }
//highlight-end
}
```

## SuperCarte.WPF

### Enregistrement du validateur - SCValidateurExtensions

Dans la classe **Extensions/ServiceCollections/SCValidateurExtensions**, il faut enregistrer le validateur.

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
        //highlight-next-line
        services.AddScoped<IValidateur<CategorieModel>, CategorieValidateur>();
    }
}
```

### Modification du BaseVM - Ajouter l'interface INotifyDataErrorInfo

Pour être en mesure d'indiquer à la vue qu'il y a des erreurs, il faut implémenter l'interface **INotifyDataErrorInfo**. La librairie **MVVM Toolkit** possède une classe **ValidationObject** qui implémente cette interface, mais il est difficile d'y intégrer **FluentValidation**.

Pour cette raison, il faut implémenter cette interface dans la classe **ViewModels/Base/BaseVM**.

Premièrement, il y a un dictionnaire de type **\<string,List \<string>>** (ligne 16). La clé du dictionnaire est le nom de la propriété et pour chaque propriété, il est possible d'avoir une liste d'erreurs. Par contre, la validation retourne uniquement une erreur par propriété à la fois. Il faut tout de même respecter l'implémentation de l'interface **INotifyDataErrorInfo** qui supporte plusieurs erreurs.

Ensuite, il y a un événement **ErrorsChanged** ((ligne 15)). Lorsqu'un composant est lié, il écoute cet événement pour voir si sa propriété a une erreur. Le composant appelle la méthode **GetErrors()** (ligne 22) pour obtenir la liste d'erreurs.

La propriété **HasErrors** (ligne 59) indique s'il y a au moins une propriété en erreur dans le **ViewModel**.

Ensuite, la fonction **AssignerValidation** (ligne 43) assigne les erreurs du **ValidationModel** dans le dictionnaire. Avant de faire l'assignation, il faut effacer la liste au complet.

À la ligne 55, l'événement **OnErrorsChanged** est appelé pour indiquer que la propriété a une erreur.

La méthode **EffacerErreurs()** (ligne 30) permet d'enlever les erreurs. À la ligne 35, l'événement est appelé pour indiquer que la propriété n'a plus d'erreur.

Modifiez la classe **BaseVM** par le code ci-dessous.

```csharp showLineNumbers
using CommunityToolkit.Mvvm.ComponentModel;
using System.Collections;
using System.ComponentModel;
using System.Linq;

namespace SuperCarte.WPF.ViewModels.Bases;

/// <summary>
/// Classe abstraite pour du View Models
/// </summary>
public abstract class BaseVM : ObservableObject, INotifyDataErrorInfo
{
    //highlight-next-line
    private readonly Dictionary<string, List<string>> _lstErreursParPropriete = new Dictionary<string, List<string>>();
   
    //highlight-next-line
    public event EventHandler<DataErrorsChangedEventArgs>? ErrorsChanged;
    
    private void OnErrorsChanged(string propertyName)
    {
        ErrorsChanged?.Invoke(this, new DataErrorsChangedEventArgs(propertyName));
    }

    public IEnumerable GetErrors(string? propertyName)
    {
        return _lstErreursParPropriete.GetValueOrDefault(propertyName, null);
    }

//highlight-start
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
//highlight-end


//highlight-start
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
//highlight-end


//highlight-start
    public bool HasErrors
    {
        get
        {
            return _lstErreursParPropriete.Any();
        }
    }
//highlight-end
}
```

### Modification du ViewModel - GestionCategorieVM

Il faut modifier la méthode **EnregistrerAsync()** pour y inclure la validation.

À la ligne 3, il faut effacer les erreurs, car il est possible que des erreurs soient corrigées par l'utilisateur.

Avant d'enregistrer, il faut appeler le service pour effectuer une validation (ligne 11). 

Si l'objet est valide, l'enregistrement s'effectue (ligne 13).

Par contre, si l'objet n'est pas valide, il faut assigner la validation et notifier les erreurs (ligne 38).

```csharp showLineNumbers
private async Task EnregistrerAsync()
{
    //highlight-next-line
    EffacerErreurs();

    ChampsModifiables = false;
    EstEnTravail = true;
    bool estEnregistre;

    CategorieModel categorieModel = VersModele();
    
    //highlight-next-line
    ValidationModel validationModel = await _categorieService.ValiderAsync(categorieModel);

//highlight-next-line
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
    //highlight-start
    else
    {
        AssignerValidation(validationModel);
    }
//highlight-end

    EstEnTravail = false;
    ChampsModifiables = true;
}
```

Démarrez l'application et testez l'ajout d'une nouvelle catégorie sans inscrire de nom.

Le **\<Textbox>** sera rouge, mais il n'y aura aucun message.

### Ajout d'un template dans les ressources

Pour être en mesure de voir le message d'erreur d'un composant, il faut ajouter le **\<Validation.ErrorTemplate>**. Cette propriété du composant permet d'indiquer comment le composant s'affiche lorsqu'il y a une erreur.

Il est possible de le faire composant par composant, mais l'idéal est d'utiliser un modèle **(template)** global dans les ressources de l'application.

Créez le dossier **Styles** dans le projet **SuperCarte.WPF**.

Choisissez le type de fichier **Dictionaire de ressources (WPF)** et créez le fichier **ErreurTemplate.xaml**

Un dictionnaire de ressources permet de configurer des éléments de l'application et de les réutiliser. Il est possible de faire le parallèle avec les fichiers **CSS**.

Dans l'exemple ci-dessous, il y a un modèle **erreurTemplate** qui permet de gérer l'affichage des erreurs. Le nom **erreurTemplate** peut être considéré comme une classe **CSS**. Les contrôles qui utilisent le modèle **erreurTemplate** pour les erreurs auront le même comportement.

À la ligne 5, le contrôle **\<AdornedElementPlaceholder>** représente le contrôle utilisateur normal. Si le contrôle est un **\<TextBox>**, **\<AdornedElementPlaceholder>** correspond au  **\<TextBox>**.

À la ligne 6, une bordure rouge est ajoutée à l'intérieur du contrôle. C'est le comportement par défaut, mais en spécifiant un **template**, il faut le reproduire.

À la ligne 8, c'est un contrôle de répétition. Il est lié à la liste des erreurs. 

À la ligne 11, un **\<TextBlock>** est créé avec le contenu de l'erreur pour chaque erreur de la liste d'erreur. Le message d'erreur est dans la propriété **Text="\{Binding ErrorContent}"**. Le texte est en rouge.


```xaml  showLineNumbers 
<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">
//highlight-next-line
    <ControlTemplate x:Key="erreurTemplate">
        <StackPanel Orientation="Vertical">
//highlight-next-line
            <AdornedElementPlaceholder>
//highlight-next-line
                <Border BorderBrush="Red" BorderThickness="2"/>
            </AdornedElementPlaceholder>
//highlight-next-line
            <ItemsControl ItemsSource="{Binding}">
                <ItemsControl.ItemTemplate>
                    <DataTemplate>
//highlight-next-line
                        <TextBlock Text="{Binding ErrorContent}" Foreground="Red"/>
                    </DataTemplate>
                </ItemsControl.ItemTemplate>
            </ItemsControl>
        </StackPanel>
    </ControlTemplate>
</ResourceDictionary>
```


Dans le fichier **App.xaml**, il faut importer le dictionnaire.

À la ligne 8, il y a le dictionnaire de ressources à inclure. Il serait possible d'en inclure plusieurs.

```xaml  showLineNumbers 
<Application x:Class="SuperCarte.WPF.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:local="clr-namespace:SuperCarte.WPF">
    <Application.Resources>     
//highlight-start   
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                 <ResourceDictionary Source="Styles\ErreurTemplate.xaml"/>
            </ResourceDictionary.MergedDictionaries>
        </ResourceDictionary>    
//highlight-end    
    </Application.Resources>
</Application>
```

Modifiez le fichier **UcGestionCategorie.xaml**.

Dans le **contrôle utilisateur**, il faut assigner le template avec cette propriété sur le composant **Validation.ErrorTemplate="\{StaticResource erreurTemplate}"** (lignes 19 et 30).

Remplacez la section de la rangée 2 (ou ajoutez les 2 lignes)
```xaml  showLineNumbers 
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
//highlight-next-line
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
//highlight-next-line
                     Validation.ErrorTemplate="{StaticResource erreurTemplate}"
                     Text="{Binding Description}"
                     Padding="2 4 0 0"
                     Margin="0 10 5 10" />
        </Grid>
 
```

Démarrez le programme et testez la validation. Le message d'erreur s'affichera en dessous du contrôle.

### Propriété MaxLength - UcGestionCategorie.xaml

Il est possible de limiter le nombre de caractères dans un **\<TextBox>** avec la propriété **MaxLength**. 

Il est préférable de l'utiliser dans la vue (lignes 21 et 33).

Avec cette propriété, il n'y aura plus de message d'erreur pour la longueur, mais il faut tout de même que le validateur s'en assure, car le **Service** n'a aucune idée si la **Vue** s'en occupe.

Pensez à utiliser cette propriété pour le **TP 3**.

```xaml  showLineNumbers 
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
//highlight-next-line
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
//highlight-next-line
                     MaxLength="50"
                     Padding="2 4 0 0"
                     Margin="0 10 5 10" />
        </Grid>
        <!--Rangée 3-->
        <ProgressBar Grid.Row="3" Height="10" IsIndeterminate="{Binding EstEnTravail}" />

    </Grid>
</UserControl>
```

