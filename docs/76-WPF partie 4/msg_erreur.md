---
sidebar_position: 420
draft: false
---


# Message d'erreur

Le formulaire de connexion n'affiche pas de message lorsque le compte n'est pas valide. Pour ce faire, il faut ajouter de la validation au formulaire.

Par contre, pour cette vue, ce ne sera pas un validateur qui s'occupera de la validation. Le **ViewModel** ajoutera un message d'erreur si l'authentification n'est pas valide.

:::tip
Il est conseillé de ne pas indiquer quel champs est en erreur. Il faut simplement indiquer que l'union de ce compte et mot de passe ne fonctionne pas. Il ne faut pas indiquer que c'est l'utilisateur qui est inexistant, ou que ce mot de passe n'est pas bon pour cet utilisateur. Il faut donner le moins d'indices possibles.
:::

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

Modifiez la méthode **AuthentifierAsync()** par celle-ci.

À la ligne 15, l'erreur est ajoutée manuellement pour la propriété **MotPasse**. L'utilisation du mot-clé **nameof** permet de convertir en **string** le nom d'une propriété. Il serait possible de faire **AjouterErreur("MotPasse", "Erreur...")**, mais le compilateur ne serait pas en mesure de voir si la propriété **MotPasse** existe réellement, car c'est une **string**. Il pourrait donc y avoir une erreur à l'exécution, alors qu'avec nameof, l'erreur est à la compilation. 

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
    //highlight-start
    else
    {
        AjouterErreur(nameof(MotPasse), "La combinaison du nom d'utilisateur et du mot de passe n'est pas valide.");
    }
//highlight-end

    EstEnTravail = false;
    ChampsModifiables = true;
}
```

:::info
Le message d'erreur n'est pas localisé. 
:::

## Test

La vue **UcConnexion** a déjà le **Validation.ErrorTemplate="
\{StaticResource erreurTemplate}"** pour les composants.

Essayez avec ce compte.

- fsthilaire
- 1234

Le message d'erreur s'affiche.

Essayez avec ce compte.

- fsthilaire
- Native3!

La vue **Liste des cartes** est affichée.

