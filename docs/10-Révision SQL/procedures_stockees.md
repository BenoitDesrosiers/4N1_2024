---
sidebar_position: 5
---

# Procédure stockée

Une procédure stockée est un bloc de code qui contient une série d'instructions en **T-SQL** ou **SQL**.

Elle est enregistrée dans la base de données.

Elle permet d'avoir accès à des scripts en tout temps dans la base de données.

Une procédure stockée peut modifier la base de données.

Une procédure stockée peut recevoir des paramètres d'entrée et elle peut retourner des valeurs.

:::info
Pour en savoir plus: https://sql.sh/cours/procedure-stockee
:::






## Création d'une procédure stockée


```sql
CREATE PROCEDURE nomProcédure
	@parametre1 type = valeur par défaut,
	@parametre2 type
AS
	SET NOCOUNT ON
	--Votre code
GO
```

Par défaut, une procédure stockée retourne le nombre de lignes traitées dans son exécution. La commande **SET NOCOUNT ON;** permet de désactiver ceci.

Le nom de la procédure doit être significatif à son utilité. Elle doit être en **camelCase**.

:::danger[ATTENTION]
Le préfixe **sp_** ne doit pas être utilisé, car ce sont les procédures intégrées à SQL Server qui commencent par ce préfixe.
:::

## Exécution

Pour exécuter une procédure stockée, il faut utiliser la syntaxe ci-dessous.

```sql
exec nomProcedure parametre1, parametre2
```

### Exemple

Dans la base de données **AdventureWorks2019**, créez une procédure stockée qui supprime tous les logs de la BD qui appartient au schéma demandé en paramètre, et qui ajoute un log pour indiquer la suppression.

```sql
IF OBJECT_ID('supprimeDatabaseLog', 'P') IS NOT NULL 
	DROP PROCEDURE supprimeDatabaseLog;
GO

CREATE PROCEDURE supprimeDatabaseLog
	@schema VARCHAR(20)
AS
	DELETE DatabaseLog WHERE [Schema] = @schema;

	INSERT INTO DatabaseLog(PostTime, DatabaseUser, [Event], [Schema], [Object], [TSQL], XmlEvent)
	VALUES (GetDate(), 'dbo', Concat('Suppression des logs du schéma ', @schema), '', 'DatabaseLog', '', '');
GO
```

