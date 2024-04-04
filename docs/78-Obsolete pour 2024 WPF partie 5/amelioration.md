---
sidebar_position: 530
draft: true
---

# Amélioration du Navigateur

Avez-vous remarqué que lorsque vous sélectionnez dans le menu la vue qui est actuellement en cours d'utilisateur, la liste se vide ?

Pourquoi ce comportement arrive-t-il ? 

La raison est que le **ViewModel** de la vue est de nouveau créé. Le **ViewModel** est donc réinitialisé et la liste est donc vide.

Par contre, le contrôle utilisateur reste le même. **WPF** n'a pas besoin de recréer le contrôle utilisateur. Il met tout simplement à jour son **DataContext** avec la nouvelle instance du **ViewModel**. Ce qui fait que l'événement **Loaded** n'est pas exécuté, car la vue est déjà affichée. Donc l'obtention de la liste automatique ne se fait pas.

Pour régler ce problème, il faut ajouter une vérification dans le **Navigateur**. Il faut créer uniquement une nouvelle instance si le type du **ViewModel** actif est différent que celui demandé.

Modifiez les 2 méthodes **Naviguer** de la classe **Navigateur** par celles-ci.

La condition **`if (VMActif is not TViewModel)`** permet de déterminer si la classe n'est pas une instance du type demandé.

```csharp showLineNumbers
public void Naviguer<TViewModel>() where TViewModel : BaseVM
{
    if (VMActif is not TViewModel)
    {
        VMActif = _serviceProvider.GetRequiredService<TViewModel>();
    }
}

public void Naviguer<TViewModel, TParameter>(TParameter parametre) where TViewModel : BaseParametreVM<TParameter>
{
    if (VMActif is not TViewModel)
    {
        BaseParametreVM<TParameter> baseParametreVM = _serviceProvider.GetRequiredService<TViewModel>();

        baseParametreVM.AssignerParametre(parametre);

        VMActif = baseParametreVM;
    }
    else
    {
        (VMActif as BaseParametreVM<TParameter>).AssignerParametre(parametre);
    }
}
```

