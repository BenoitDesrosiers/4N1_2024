---
sidebar_position: 350
draft: false
---

# Localisation du code .cs

Précédemment, nous avons fait la localisation du code de la partie **xaml** des vues. Nous allons maintenant faire la localisation du code dans les fichiers **.cs** des vues. Pour faire la localisation dans le code, il faut utiliser la librairie de localisation de **.NET**.

Cette librairie donne accès à la classe **IStringLocalizer\<T>** qu'il est possible d'injecter dans une classe.

Il faut également utiliser les fichiers ressources avec cette technique. Le type générique du **IStringLocalizer\<T>** correspond au fichier ressource.

Il existe plusieurs visions pour la gestion des fichiers ressources. Il est possible d'en faire un par classe qui l'utilise et d'utiliser des fichiers globaux pour les éléments généraux qui sont utilisés par plusieurs classes.

L'exemple ci-dessous est pour la validation du **CategorieModel**.

## Installation de la librairie

Dans la **Console du Gestionnaire de package**, inscrivez la commande ci-dessous. 

:::warning Important
Il est important que le **Projet par défaut** soit **SuperCarte.Core**.
:::

```csharp showLineNumbers
Install-Package Microsoft.Extensions.Localization
```

## Enregistrement du service - App.xaml.cs

Dans le fichier **App.xaml.cs**, il faut enregistrer le service pour la localisation.

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
        //highlight-next-line
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

:::tip
Le type **fichier de ressources** se trouve dans Éléments C#/Général
:::

Créez le fichier de ressources **ResCategorieValidateur.resx** dans le dossier **Resx**. 

:::warning Important
Lors de l'ouverture de l'éditeur de ressource, il faut changer le **Modificateur d'accès** en haut de l'éditeur afin de mettre le fichier **Public**. Si le fichier ressource n'est pas **Public**, il ne sera pas utilisable par le **IStringLocalizer**.
:::

| Nom                     | Valeur                                              |
| ----------------------- | --------------------------------------------------- |
| Nom_Obligatoire         | Le nom est obligatoire.                             |
| Nom_LongueurMax         | Le nom doit avoir 35 caractères au maximum.          |
| Description_LongueurMax | La description doit avoir 50 caractères au maximum. |

Créez le fichier ressource anglais **ResCategorieValidateur.en.resx**. 

Pour les fichiers des autres langues, **il ne faut pas changer le Modificateur d'accès**. Il faut le laisser à **Pas de génération de code**.

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

Notez que le texte des validateurs (ex: Le nom est obligatoire) est remplacé par les valeurs du fichier de ressources. Pour être en mesure de récupérer une valeur du fichier ressource, il faut spécifier le nom de la clé dans l'index.

Par exemple, **_resCategorieValidateur["Nom_Obligatoire"]** permet d'obtenir la valeur de la clé **Nom_Obligatoire**.

Modifiez la classe **SuperCarte.Core/Validateurs/CategorieValidateur** par le code ci-dessous.


```csharp showLineNumbers
using FluentValidation;
using FluentValidation.Results;
//highlight-next-line
using Microsoft.Extensions.Localization;
using SuperCarte.Core.Extensions;
using SuperCarte.Core.Models;
//highlight-next-line
using SuperCarte.Core.Repositories;
//highlight-next-line
using SuperCarte.Core.Resx;

namespace SuperCarte.Core.Validateurs;

/// <summary>
/// Classe qui valide le modèle CategorieModel
/// </summary>
public class CategorieValidateur : AbstractValidator<CategorieModel>, IValidateur<CategorieModel>
{    
    //highlight-next-line
    private readonly IStringLocalizer<ResCategorieValidateur> _resCategorieValidateur;

//highlight-start
    /// <summary>
    /// Constructeur
    /// </summary>    
    /// <param name="resCategorieValidateur">Fichier ressource ResCategorieValidateur</param>
    public CategorieValidateur(IStringLocalizer<ResCategorieValidateur> resCategorieValidateur)
    {        
        _resCategorieValidateur = resCategorieValidateur;
//highlight-end

        RuleFor(i => i.Nom).Cascade(CascadeMode.Stop)
        //highlight-next-line
            .Must(ValiderStringObligatoire).WithMessage(_resCategorieValidateur["Nom_Obligatoire"])
        //highlight-next-line
            .MaximumLength(35).WithMessage(_resCategorieValidateur["Nom_LongueurMax"]);

        RuleFor(i => i.Description).Cascade(CascadeMode.Stop)
        //highlight-next-line
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

:::info
Étant donné que l'interface fait aussi une validation de la longueur du champ (rappelez-vous que nous avons ajouté MaxLenght dans le fichier UcGestionCategorie.xaml ), il est présentement impossible de voir le message d'erreur autre que celui pour le nom obligatoire. Si vous voulez le voir en action, changez **.MaximumLength** pour une valeur plus petite.

Il est toujours bon de valider les données à l'aide d'un validateur même si l'interface fait aussi une validation. De cette facon, si le responsable de l'interface oublie une validation, l'information erronée ne se rendra pas à la bd. 
::: 

Démarrez le programme et testez en français et en anglais la validation.

:::tip
Pour passer de l'anglais au francais, changez la valeur de **CultureInfo** dans **App.xaml.cs**

en-CA pour l'anglais

fr-CA pour le francais.

