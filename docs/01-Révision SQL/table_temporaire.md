---
sidebar_position: 7
---

# Table temporaire

Il existe 2 types de tables temporaires dans Sql Server. Il y a les tables **temporaires** et **temporaires globales**.

Une table temporaire a un **#** comme préfixe et une globale a un double **##** comme préfixe.

```sql
SELECT * FROM #T1 -- #T1 est une table temporaire
SELECT * FROM ##T2 --##T2 est une table temporaire globale
```

Une table temporaire est accessible uniquement par la session qui l'a créée.

Une table temporaire globale est accessible par tous.

La particularité des tables temporaires, c'est que leur durée de vie est limitée. Lorsque la session qui a créé la table est terminée, la table est supprimée. Il est tout de même préférable de les supprimer directement à la fin d'un script.

Faites les scripts ci-dessous dans des onglets différents.

**Onglet 1**

```sql
DROP TABLE IF EXISTS #Temporaire
DROP TABLE IF EXISTS ##TemporaireGlobale

CREATE TABLE #Temporaire
(
	Id INT NOT NULL,
	Nom VARCHAR(100) NOT NULL
)

CREATE TABLE ##TemporaireGlobale
(
	Id INT NOT NULL,
	Nom VARCHAR(100) NOT NULL
)

INSERT INTO #Temporaire
VALUES (1, 'Test temporaire 1')

INSERT INTO ##TemporaireGlobale
VALUES (1, 'Test temporaire globale 1')

SELECT * FROM #Temporaire
SELECT * FROM ##TemporaireGlobale
```

Dans cet onglet, le résultat des tables temporaires est affiché.

**Onglet 2**

```sql
SELECT * FROM #Temporaire
```

L'onglet 2 est considéré comme une autre session. Donc il n'est pas possible d'accéder à la table temporaire.

**Onglet 3**

```sql
SELECT * FROM ##TemporaireGlobale
```

L'onglet 3 est considéré comme une autre session. La table temporaire globale est disponible pour tous.

Fermez l'**onglet 1** et refaites l'exécution de l'**onglet 3**. La table n'est plus accessible, car la session s'est terminée avec la fermeture de l'onglet.

Il est préférable de les supprimer à la fin des scripts si les tables ne sont plus nécessaires.

```sql
DROP TABLE #Temporaire
DROP TABLE ##TemporaireGlobale
```

