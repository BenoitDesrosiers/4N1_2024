---
sidebar_position: 540
draft: true
---


<!-- pas pour 2024 
# Air Table

**Air Table** (https://airtable.com) est une plateforme qui permet de créer des tables et des formulaires pour contenir des données.

La plateforme fournit un **API Rest** pour importer et exporter des données à partir d'un autre système.

Pour ce projet, il faut exporter la liste "Mes Cartes" dans **Air Table**. À chaque exportation, il faut créer une nouvelle table.

Il existe une librairie **.Net** qui permet l'exportation et l'importation des données. Par contre, cette librairie ne permet pas de créer des tables.

Le projet utilisera une librairie **maison** pour faire la communication. Cette librairie peut être utilisée dans tous les projets qui nécessitent de communiquer avec **Air Table**. Cette librairie **maison** aura uniquement les fonctionnalités de créer une table et d'exporter des données.

Il est possible de créer un jeton lié à un compte **Air Table**. 

## Configuration

### Création d'un compte

Premièrement, il faut créer un compte. https://airtable.com/signup

Vous pouvez utiliser la connexion de votre choix.

### Création d'une base

Il faut créer une base pour être en mesure de créer des tables par l'**API**.

Allez à la page https://airtable.com/workspaces

Ensuite, appuyez sur le bouton **Create a base**.

![](./image/17_airtable_1.png)

Appuyez sur **Untitled Base** pour avoir le menu de la base.

![](./image/17_airtable_2.png)

Renommez la base avec un nom significatif.

![](./image/17_airtable_3.png)



Pour obtenir l'identifiant de la base, il faut regarder l'URL.

C'est la première partie après **`airtable.com/`**. Dans l'image ci-dessous, c'est **apptZoczndTWLbJy4**.

![](./image/17_airtable_4.png)

Pour le **TP 3**, c'est cette valeur qu'il faut mettre dans le champ **AirTableBaseId** pour l'utilisateur. Chaque utilisateur à sa propre base et son propre jeton.

### Configuration du jeton Air Table

Il faut créer un jeton pour être en mesure de se connecter à son compte par l'API Rest. 

Allez à la page https://airtable.com/create/tokens/new

Dans le champ **Name**, il faut donner un nom au jeton. Dans l'exemple ci-dessous, le nom est **API Native 3**.

![](./image/17_airtable_5.png)

Dans la section **Scopes**, il faut ajouter les 4 scopes ci-dessous. Appuyez sur le bouton **Add a scope** pour le sélectionner dans la liste.

- data.records.read
- data.records.write
- schema.bases.read
- schema.bases.write

![](./image/17_airtable_6.png)

Dans la section **Access**, il faut sélectionner la base que vous avez créée à la section 7.2.

![](./image/17_airtable_7.png)

Appuyez sur le bouton **Create Token**.

Dans la fenêtre, le code du jeton sera affiché. Appuyez sur le bouton **copier** pour le conserver. Il n'est pas possible de le récupérer. Il faut le régénérer en cas de perte.

![](./Image/17_airtable_8.png)

Pour le **TP 3**, c'est cette valeur qu'il faut mettre dans le champ **AirTableJeton** pour l'utilisateur. Chaque utilisateur à sa propre base et son propre jeton.

## Projet AirTableAPIClient

Le projet **AirTableAPIClient** est disponible sur **LÉA** dans la section **Fichiers pour TP**.

### Ajout dans la solution

Vous devez extraire le projet et le déposer dans le dossier de votre solution. Pour accéder rapidement au dossier de la solution à partir de **Visual Studio**, faites un clic-droit sur la solution et sélectionnez l'item **Ouvrir le dossier dans l'Explorateur de fichiers**.

Lorsque le dossier est **AirTableAPIClient** est copié dans le dossier, faites un clic-droit sur la solution et sélectionner l'item **Ajouter -> Projet existant..**. 

![](./Image/17_airtable_9.png)

Dans l'Explorateur de fichiers, allez dans le dossier **AirTableAPIClient** et sélectionnez le fichier **AirTableApiClient.csproj**.

![](./Image/17_airtable_10.png)

### Ajout de la dépendance dans le projet SuperCarte.Core et SuperCarte.WPF

Dans le projet **SuperCarte.Core**, faites un clic-droit sur le dossier **Dépendances** et sélectionnez **Ajouter une référence de projets...**. 

![](./Image/17_airtable_11.png)

Cochez le projet **AirTableAPIClient**.

![](./Image/17_airtable_12.png)

Effectuez la même chose pour le projet **SuperCarte.WPF**. Il faut également le faire pour ce projet pour être en mesure d'enregistrer la dépendance.

### Explication du client

Le client communique en utilisant des requêtes **http** avec du **json**.

Les classes ci-dessous représentent un **DTO** entre l'application et **AirTable**. Le projet effectue une sérialisation **classe à json** et vice-versa pour faciliter la communication avec un **API Rest**.

- **TableDefinition**
  - La classe qui représente une table
- **ColonneDefinition**
  - La classe qui représente une colonne de la table
- **Enregistrement**
  - La classe qui représente un enregistrement de la table

La classe **AirTableClient** contient le client **http** et les méthodes de communication avec **AirTable**.

Le client possède uniquement 2 méthodes.

- **CreerTableAsync**
  - Permet de créer une table
- **CreerEnregistrementAsync**
  - Permet de créer un enregistrement dans une table

## Service spécialisé

Dans le projet **SuperCarte.Core**, créez le dossier **AirTable** dans le dossier **Services**.

Créez l'interface **IExportAirTableService** dans le dossier **Services\AirTable**.

```csharp showLineNumbers
namespace SuperCarte.Core.Services.AirTable;

/// <summary>
/// Interface qui contient les services d'exportation vers AirTable
/// </summary>
public interface IExportAirTableService
{
    /// <summary>
    /// Exporter les enregistrements QuantiteCarteDetailModel d'un utilisateur vers Air Table
    /// </summary>
    /// <param name="utilisateurId">Utilisateur</param>
    /// <returns>Le nom autogénéré de la table ou vide s'il y a eu un problème</returns>
    Task<string> ExporterQuantiteCarteDetailModelAsync(int utilisateurId);
}
```

Créez la classe **ExportAirTableService.cs** dans le dossier **Services\AirTable**.

```csharp showLineNumbers
using AirTableApiClient;
using SuperCarte.Core.Models;
using SuperCarte.Core.Services.AirTable;

namespace SuperCarte.Core.Services;

/// <summary>
/// Classe qui contient les services d'exportation vers AirTable
/// </summary>
public class ExportAirTableService : IExportAirTableService
{
    private readonly IAirTableClient _airTableClient;
    private readonly IUtilisateurCarteService _utilisateurCarteService;

    /// <summary>
    /// Constructeur
    /// </summary>
    /// <param name="airTableClient">Client pour l'API AirTable</param>
    /// <param name="utilisateurCarteService">Service du modèle UtilisateurCarte</param>
    public ExportAirTableService(IAirTableClient airTableClient, IUtilisateurCarteService utilisateurCarteService)
    {
        _airTableClient = airTableClient;
        _utilisateurCarteService = utilisateurCarteService;
    }

    public async Task<string> ExporterQuantiteCarteDetailModelAsync(int utilisateurId)
    {
        try
        {
            //Doit l'obtenir de l'utilisateur
            string apiJeton = "un jeton";
            string baseId = "un indentidiant de base";

            if (string.IsNullOrWhiteSpace(apiJeton) == false && string.IsNullOrWhiteSpace(baseId) == false)
            {
                List<QuantiteCarteDetailModel> lstQuantiteCarteDetailModel =
                    await _utilisateurCarteService.ObtenirCartesUtilisateurAsync(utilisateurId);

                //Création du nom de la table par le Ticks
                string tableNom = DateTime.Now.Ticks.ToString();

                //Création de la table
                string tableId = await _airTableClient.CreerTableAsync(apiJeton, baseId, tableNom,
                    ColonneDefinition.CreerNumber(nameof(QuantiteCarteDetailModel.CarteId), 0),
                    ColonneDefinition.CreerSingleLineText(nameof(QuantiteCarteDetailModel.Nom)),
                    ColonneDefinition.CreerNumber(nameof(QuantiteCarteDetailModel.Quantite), 0),
                    ColonneDefinition.CreerNumber(nameof(QuantiteCarteDetailModel.Vie), 0),
                    ColonneDefinition.CreerNumber(nameof(QuantiteCarteDetailModel.Armure), 0),
                    ColonneDefinition.CreerNumber(nameof(QuantiteCarteDetailModel.Attaque), 0),
                    ColonneDefinition.CreerCheckbox(nameof(QuantiteCarteDetailModel.EstRare)),
                    ColonneDefinition.CreerNumber(nameof(QuantiteCarteDetailModel.PrixRevente), 2),
                    ColonneDefinition.CreerNumber(nameof(QuantiteCarteDetailModel.CategorieId), 0),
                    ColonneDefinition.CreerSingleLineText(nameof(QuantiteCarteDetailModel.CategorieNom)),
                    ColonneDefinition.CreerNumber(nameof(QuantiteCarteDetailModel.EnsembleId), 0),
                    ColonneDefinition.CreerSingleLineText(nameof(QuantiteCarteDetailModel.EnsembleNom)));

                //Ajout de chacun des enregistrements
                foreach (QuantiteCarteDetailModel quantiteCarteDetailModel in lstQuantiteCarteDetailModel)
                {
                    Enregistrement enregistrement = new Enregistrement();

                    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.CarteId), quantiteCarteDetailModel.CarteId);
                    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.Nom), quantiteCarteDetailModel.Nom);
                    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.Quantite), quantiteCarteDetailModel.Quantite);
                    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.Vie), quantiteCarteDetailModel.Vie);
                    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.Armure), quantiteCarteDetailModel.Armure);
                    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.Attaque), quantiteCarteDetailModel.Attaque);
                    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.EstRare), quantiteCarteDetailModel.EstRare);
                    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.PrixRevente), quantiteCarteDetailModel.PrixRevente);
                    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.CategorieId), quantiteCarteDetailModel.CategorieId);
                    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.CategorieNom), quantiteCarteDetailModel.CategorieNom);
                    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.EnsembleId), quantiteCarteDetailModel.EnsembleId);
                    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.EnsembleNom), quantiteCarteDetailModel.EnsembleNom);

                    string enregistrementId = await _airTableClient.CreerEnregistrementAsync(apiJeton, baseId, tableId, enregistrement);
                }

                //Retourne le nom de la table
                return tableNom;
            }
            else
            {
                throw new Exception("Il faut un jeton et un identifiant de base pour l'utilisateur.");
            }
        }
        catch
        {
            //Il y a eu un problème, il n'y a pas de nom.
            return string.Empty;
        }
    }
}
```

À cet endroit, il faut spécifier la clé de l'API et l'identifiant de la base. Il faut obtenir ces 2 valeurs par la table de l'utilisateur pour le **TP 3**. Pour le projet **SuperCarte**, les valeurs doivent être **hardcoded**.

```csharp showLineNumbers
//Doit l'obtenir de l'utilisateur
string apiJeton = "un jeton";
string baseId = "un indentidiant de base";

if (string.IsNullOrWhiteSpace(apiJeton) == false && string.IsNullOrWhiteSpace(baseId) == false)
{
    //Fait l'exportation
}
else
{
    throw new Exception("Il faut un jeton et un identifiant de base pour l'utilisateur.");
}
```

La classe **ColonneDefinition** possède des méthodes statiques pour la création d'une colonne pour chacun des types supportés.

Selon le type spécifié, il faut ajouter des options dans la déclaration du champ. Les méthodes statiques permettent de s'occuper de ces options.

Il existe 4 types qui sont nécessaires pour ce projet et le **TP 3**.

- **CreerNumber**

  Cette méthode permet de créer une colonne pour les entiers (**int**, **short**). Il faut spécifier une précision de **0**, car il n'y a pas de virgule.

  Pour un nombre décimal, il faut indiquer la précision permise, c'est-à-dire le nombre de chiffres après la virgule.

- **CreerSingleLineText**

  Cette méthode permet de créer une colonne pour le texte.

- **CreerCheckbox**

  Cette méthode permet de créer une colonne pour un booléen.

- **CreerDate**

  Cette méthode permet de créer une colonne pour les dates. Supporte uniquement le format **yyyy-MM-dd**.

Le premier paramètre de ces méthodes est pour spécifier le nom de la colonne. L'utilisation de **`nameof`** permet d'obtenir le nom de la propriété.

```csharp showLineNumbers
string tableId = await _airTableClient.CreerTableAsync(apiJeton, baseId, tableNom,
                ColonneDefinition.CreerNumber(nameof(QuantiteCarteDetailModel.CarteId), 0),
                ColonneDefinition.CreerSingleLineText(nameof(QuantiteCarteDetailModel.Nom)),
                ColonneDefinition.CreerNumber(nameof(QuantiteCarteDetailModel.Quantite), 0),
                ColonneDefinition.CreerNumber(nameof(QuantiteCarteDetailModel.Vie), 0),
                ColonneDefinition.CreerNumber(nameof(QuantiteCarteDetailModel.Armure), 0),
                ColonneDefinition.CreerNumber(nameof(QuantiteCarteDetailModel.Attaque), 0),
                ColonneDefinition.CreerCheckbox(nameof(QuantiteCarteDetailModel.EstRare)),
                ColonneDefinition.CreerNumber(nameof(QuantiteCarteDetailModel.PrixRevente), 2),
                ColonneDefinition.CreerNumber(nameof(QuantiteCarteDetailModel.CategorieId), 0),
                ColonneDefinition.CreerSingleLineText(nameof(QuantiteCarteDetailModel.CategorieNom)),
                ColonneDefinition.CreerNumber(nameof(QuantiteCarteDetailModel.EnsembleId), 0),
                ColonneDefinition.CreerSingleLineText(nameof(QuantiteCarteDetailModel.EnsembleNom)));
```

Pour créer un enregistrement dans **AirTable**, il faut le faire 1 par 1. Selon la documentation de l'API permet, il est possible d'en créer 10 à la fois, mais pour simplifier le projet, ce sera 1 enregistrement à la fois. L'exportation sera plus lente dans ce projet.

Pour chacun des champs, il faut spécifier la valeur dans l'enregistrement. 

À la ligne 19, il faut spécifier l'identifiant de la table obtenu avec la méthode de création de la table.

```csharp showLineNumbers
//Ajout de chacun des enregistrements
foreach (QuantiteCarteDetailModel quantiteCarteDetailModel in lstQuantiteCarteDetailModel)
{
    Enregistrement enregistrement = new Enregistrement();

    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.CarteId), quantiteCarteDetailModel.CarteId);
    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.Nom), quantiteCarteDetailModel.Nom);
    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.Quantite), quantiteCarteDetailModel.Quantite);
    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.Vie), quantiteCarteDetailModel.Vie);
    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.Armure), quantiteCarteDetailModel.Armure);
    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.Attaque), quantiteCarteDetailModel.Attaque);
    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.EstRare), quantiteCarteDetailModel.EstRare);
    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.PrixRevente), quantiteCarteDetailModel.PrixRevente);
    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.CategorieId), quantiteCarteDetailModel.CategorieId);
    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.CategorieNom), quantiteCarteDetailModel.CategorieNom);
    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.EnsembleId), quantiteCarteDetailModel.EnsembleId);
    enregistrement.AjouterChamp(nameof(QuantiteCarteDetailModel.EnsembleNom), quantiteCarteDetailModel.EnsembleNom);

    string enregistrementId = await _airTableClient.CreerEnregistrementAsync(apiJeton, baseId, tableId, enregistrement);
}
```

## Enregistrement des dépendances

Il faut enregistrer le service spécialisé ainsi que le client **AirTable**.

Modifiez la classe **SCServiceExtensions** du projet **SuperCarte.WPF**.

```csharp showLineNumbers
public static void EnregistrerServices(this IServiceCollection services)
{
    services.AddScoped<ICategorieService, CategorieService>();
    services.AddScoped<ICarteService, CarteService>();
    services.AddScoped<IRoleService, RoleService>();
    services.AddScoped<IUtilisateurService, UtilisateurService>();
    services.AddScoped<IUtilisateurCarteService, UtilisateurCarteService>();
    services.AddScoped<IExportAirTableService, ExportAirTableService>();
    services.AddScoped<IAirTableClient, AirTableClient>();
}
```

## Pour le TP 3

Pour le TP 3, vous devez inclure le projet **AirTableAPIClient** dans votre solution.

Dans le service spécialisé, vous devez récupérer l'identifiant de la base et le jeton à partir de l'utilisateur. Vous devez injecter les dépendances manquantes pour obtenir cette information.

Pour le nom de la table, conservez le **Ticks**. Ceci permet d'avoir un identifiant "unique" comme nom de table facilement. Le **Ticks** n'est peut-être pas le meilleur moyen pour obtenir un identifiant unique, mais le programme ne devrait pas générer 2 fois la même table en même temps pour le même utilisateur. 

Dans le **ViewModel** de la liste des jeux de l'utilisateur, il faut créer une commande pour l'exportation. Cette commande peut uniquement s'exécuter (**CanExecute**) si l'utilisateur possède un **BaseId** et un **Jeton**. 

Lorsque la commande est terminée, il faut indiquer à l'utilisateur le **Ticks** de la table par une notification. Utilisez un **MessageBox** de type **Information**.





-->