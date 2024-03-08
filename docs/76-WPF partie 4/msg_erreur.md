---
sidebar_position: 420
draft: true
---


# Message d'erreur

Le formulaire de connexion n'affiche pas de message lorsque le compte n'est pas valide. Pour ce faire, il faut ajouter de la validation au formulaire.

Par contre, pour cette vue, ce ne sera pas un validateur qui s'occupera de la validation. Le **ViewModel** ajoutera un message d'erreur si l'authentification n'est pas valide.

Il est souvent conseillé de ne pas indiquer si c'est un utilisateur inexistant ou que le mot de passe est invalide. Il faut donner le moins d'indices pour ceci.

## Modification du BaseVM

Ajoutez cette méthode dans la classe **BaseVM**.

Cette méthode permet d'ajouter une erreur directement pour une propriété. La ligne 15 génère l'événement pour indiquer au composant qui est lié à la propriété qu'il y a maintenant une erreur.

```csharp showLineNumbers
/// <summary>
/// Ajouter une erreur pour une propriété
/// </summary>
/// <param name="propriete">Nom de la propriété</param>
/// <param name="erreur">Message d'erreur</param>
protected void AjouterErreur(string propriete, string erreur)
{
    if (!_lstErreursParPropriete.ContainsKey(propriete))
    {
        _lstErreursParPropriete.Add(propriete, new List<string>());
    }

    _lstErreursParPropriete[propriete].Add(erreur);

    OnErrorsChanged(propriete);
}
```

## Ajout du message - ConnexionVM

Modifiez la méthode **`AuthentifierAsync()`** par celle-ci.

À la ligne 15, l'erreur est ajoutée manuellement pour la propriété **MotPasse**. L'utilisation du mot-clé **`nameof`** permet de convertir en **string** le nom d'une propriété. Il serait possible de faire **`AjouterErreur("MotPasse", "Erreur...")`**, mais le compilateur ne sera pas en mesure de voir si la propriété **MotPasse** existe réellement, car c'est une **string**.

Le message s'affichera pour le mot de passe, même si le nom d'utilisateur est invalide, car l'erreur est assignée à la propriété **MotPasse**.

```csharp showLineNumbers
private async Task AuthentifierAsync()
{
    ChampsModifiables = false;
    EstEnTravail = true;
    EffacerErreurs();

    bool authentifier = await _authentificateur.AuthentifierUtilisateurAsync(NomUtilisateur, MotPasse);

    if (authentifier == true)
    {
        _navigateur.Naviguer<ListeCategoriesVM>();
    }
    else
    {
        AjouterErreur(nameof(MotPasse), "La combinaison du nom d'utilisateur et du mot de passe n'est pas valide.");
    }

    EstEnTravail = false;
    ChampsModifiables = true;
}
```

## Test

La vue **UcConnexion** a déjà le **`Validation.ErrorTemplate="{StaticResource erreurTemplate}"`** pour les composants.

Essayez avec ce compte.

- fsthilaire
- 1234

Le message d'erreur s'affiche.

Essayez avec ce compte.

- fsthilaire
- Native3!

La vue **Liste des cartes** est affichée.

