---
sidebar_position: 15
---


# Annexe - Remove-Migration

Pour être en mesure de supprimer des migrations, il faut remettre la base de données à l'état correct.

Par exemple, voici 4 migrations.

```
CreationBD
AjoutTableUtilisateur
AjoutTableEnsemble -- Problématique
AjoutTableCategorie -- Correct

```

Il faut remettre la base de données à un état valide. Le dernier état valide est **AjoutTableUtilisateur**.

```powershell
Update-Database -StartupProject SuperCarte.EF -Migration AjoutTableUtilisateur
```

Ensuite, il faut utiliser la commande **Remove-Migration**. Cette commande enlève seulement la dernière migration. Il faudra l'exécuter 2 fois pour retirer la migration problématique.

Pour effacer **AjoutTableCategorie**

```
Remove-Migration -StartupProject SuperCarte.EF 
```

Pour effacer **AjoutTableEnsemble**

```
Remove-Migration -StartupProject SuperCarte.EF 
```

Malheureusement, la partie de **AjoutTableCategorie** doit être effacée, même si elle est valide.