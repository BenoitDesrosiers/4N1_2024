---
sidebar_position: 1
---

# Installation des logiciels requis

## Visual Studio Community

Le cours de développement d'application Native III utilisera l'**IDE** Visual Studio. 

L'édition **Community** est une édition complète sans aucune limitation au niveau logiciel.

Cette édition est gratuite sous certaines conditions. Veuillez vous référer aux termes du contrat pour vérifier si vous pouvez l'utiliser dans votre contexte de travail en entreprise. Pour voir les termes du contrat : https://visualstudio.microsoft.com/fr/license-terms/vs2022-ga-community/

En résumé, pour les particuliers, il n'y a aucune restriction tant que vous travaillez sur des applications qui vous appartiennent.

Il faut utiliser la version 2022. Cette version supporte les versions **.Net Framework 4.8**, **.Net 6**, **.Net 7** et **.NET 8**.

Pour télécharger l'application : https://visualstudio.microsoft.com/fr/thank-you-downloading-visual-studio/?sku=Community&rel=17

Dans l'onglet **Charges de travai**l, sélectionnez **Développement web et ASP.Net** et **Développement .NET Desktop**.

<img src="/4N1_2024/img/Installation_Visual_ Studio_1.jpg"  />

Dans l'onglet "**Composants individuels**", gardez la sélection par défaut et assurez-vous que l'élément  **.Net 8.0 Runtime** est sélectionné.

Ensuite, appuyez sur le bouton **Installer** en bas à droite pour débuter l'installation.

Pour être en mesure d'utiliser Visual Studio, il faut avoir un compte **Microsoft**. Vous pouvez utiliser votre compte **Hotmail** ou **Outlook** personnel, ou **celui du cégep**. Si vous n’en avez pas, vous pouvez créer un compte à partir de la fenêtre de connexion.

## SQL Server Management Studio (SSMS)

Pour gérer un serveur de base de données, il faut utiliser un logiciel de gestion. La base de données qui sera utilisée pour ce cours est **SQL Server**.

Son logiciel de gestion est **SSMS**. Ce logiciel permet d'avoir des fenêtres pour effectuer plusieurs configurations dans l'environnement serveur.

Ce logiciel permet également d'exécuter des requêtes et de faire de manipulation de données en **T-SQL**.

**DERNIERE VERSION 19.2, 13 nov 2023**

https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16

Il n'y a pas de configuration particulière pendant l'installation de ce logiciel.

Par contre, ce logiciel est uniquement pour **Windows**.

Une alternative multiplateforme pour faire des requêtes est **Azure Data Studio** ([téléchargement](https://learn.microsoft.com/en-us/azure-data-studio/download-azure-data-studio?tabs=win-install%2Cwin-user-install%2Credhat-install%2Cwindows-uninstall%2Credhat-uninstall#download-azure-data-studio)) . 


La gestion du serveur se fera principalement avec des commandes et des requêtes textes.

## SQL Server Express 2019

Pour les TPs de ce cours, nous utiliserons le serveur SQL du cégep. Pour être en mesure de vous connecter, vous devez utiliser le **VPN** du cégep. 

:::warning[ATTENTION]
Tous les travaux pratiques devront être remis sur le **SQL Server** du département.
:::

Pour les exercices, vous devez avoir un environnement 100% autonome sur votre ordinateur. Il est donc nécessaire d'installer la version **Express de SQL Server 2019**. Cette version est gratuite, mais elle a plusieurs limitations. Il est important de prendre la version **2019** pour avoir la même version que celle utilisée par le serveur départemental.

Pour voir les différentes différences entre les éditions, veuillez consulter cette page : https://docs.microsoft.com/en-us/sql/sql-server/editions-and-components-of-sql-server-version-15?view=sql-server-ver15.

En résumé, les limitations pour la version 2019 sont :

- Taille de la BD : 10 Go;
- Mémoire ram : 4 Go;
- Processeur : 1 processeur et 4 coeurs.

Donc, si votre ordinateur à 16 Go et 8 coeurs, **SQL Server Express 2019** utilisera au maximum 4 coeurs et 4 Go.

Pour télécharger l'application : https://go.microsoft.com/fwlink/?linkid=866658

Dans la fenêtre d'installation, sélectionnez l'option **Personnalisé**. 

<img src="/4N1_2024/img/Installation_SQLExpress_1.jpg"  />

Si vous avez se message, appuyez sur **Oui**.

<img src="/4N1_2024/img/Installation_SQLExpress_5.jpg"  />

Sélectionnez la langue **Anglais **et appuyez sur le bouton **Installer**.

<img src="/4N1_2024/img/Installation_SQLExpress_6.jpg"  />

Lorsque le téléchargement sera terminé, sélectionnez l'option **New SQL Server stand-alone installation or add features to an existing installation**.

<img src="/4N1_2024/img/Installation_SQLExpress_2.jpg" />

Acceptez les conditions d'utilisation et utilisez les options par défaut pour la prochaine section.  À la section **Feature Selection**, décochez l'option **Machine Learning Services and Language**.

<img src="/4N1_2024/img/Installation_SQLExpress_3.jpg" />

Utilisez les options par défaut pour les prochaines sections. À la section **Database Engine Configuration**, sélectionnez le mode d'authentification **Mixed Mode**. Ce mode vous permettra de créer des utilisateurs directement dans le serveur SQL et d'utiliser les comptes Windows. Le mode **Windows authentification**, utilise uniquement des comptes Windows de l'ordinateur ou du domaine s'il y a lieu.

Vous devez également inscrire un mot de passe du compte **sa**. Ce compte est l'administrateur du serveur SQL. **Prenez-le en note.**

<img src="/4N1_2024/img/Installation_SQLExpress_4.jpg"  />



## Connexion au serveur de données

### Avec l'outil SSMS

Lorsque vous démarrez **SSMS**, vous avez la fenêtre de connexion ci-dessous.

<img src="/4N1_2024/img/01_SSMS1.png"  />



- **Nom du serveur** 

  Ce champ consiste à l'adresse de connexion de votre serveur **MS SQL Server**. Pour l'adresse, il est possible d'utiliser une adresse IP ou un nom DNS.

  Il est possible de spécifier une adresse d'instance pour **SQL Server**. Ceci permet d'avoir plusieurs instances indépendantes de **SQL Server** sur la même installation de Windows. 

  Il est important de ne pas confondre instance et base de données, car il est possible d'avoir plusieurs bases de données dans une instance.

  La syntaxe de connexion est **`adresse/instance,port`**. Il s'agit bien d'une **virgule** pour séparer l'adresse et le port.

  Le port par défaut est le **1433**. Il n'est pas nécessaire de l'inscrire lorsque c'est le port par défaut.

  Pour SQL **Server Express**, l'adresse de connexion est : **`localhost\SQLExpress`**

  

  > **IMPORTANT : ** **SQL Server Express** n'active pas la connexion TCP/IP. L'accès doit se faire obligatoirement avec **`localhost`** ou le nom de l'ordinateur.

>Le serveur utilise également un port dynamique. Il peut changer après un redémarrage du service.  
>
>Dans le cas d'une utilisation sur un serveur de production, il faut activer la connexion TCP/IP et d'utiliser un port fixe.
>
>Pour plus d'information : https://learn.microsoft.com/fr-fr/sql/database-engine/configure-windows/configure-a-server-to-listen-on-a-specific-tcp-port?view=sql-server-ver16

- **Authentification**

  Ce champ consiste au protocole d'authentification utilisé. 

  - **Authentification Windows**

    Le serveur SQL utilise les comptes Windows pour autoriser l'accès. Ça peut être un compte local ou un compte d'un domaine.

  - **Authentification SQL Server**

    Le serveur SQL utilise ses propres comptes pour donner l'accès. 

    Pour avoir accès à ce mode, il faut l'avoir activé lors de l'installation.

- **Connexion**

  Ce champ consiste au nom de l'utilisateur.

  Il n'est pas disponible en mode **Authentification Windows**, car il prend automatiquement l'information de la session en cours. 

- **Mot de passe**

  Ce champ consiste au mot de passe. 

  Il n'est pas disponible en mode **Authentification Windows**, car il prend automatiquement l'information de la session en cours.

 



## Information de connexion

### Votre SQL Server Express

| Champ            | Valeur                   |
| ---------------- | ------------------------ |
| Nom du serveur   | localhost\SQLExpress     |
| Authentification | Windows Authentification |


### Serveur MS SQL Server du département

| Champ                   | Valeur                            |
| ----------------------- | --------------------------------- |
| Nom du serveur          | info420.cegepdrummond.ca          |
| Authentification        | SQL Server                        |
| Utilisateur             | e*VotreDA*    -> Exemple e3512345 |
| Mot de passe temporaire | usager@db2      (vous aurez à le changer lors de la première connexion)                  |

:::danger[IMPORTANT]
Vous devez utiliser le **VPN** si vous êtes à l'extérieur du cégep.
:::

## Utilisation de SSMS

<img src="/4N1_2024/img/SSMS_2.jpg" />

### Explorateur d'objets

L'explorateur d'objets permet de voir tous les objets du serveur dans un environnement graphique.

Les deux éléments que nous utilisons le plus sont le dossier **Base de données** et **Sécurité**.

Il est possible de faire plusieurs tâches ou requêtes avec un outil graphique.

### Barre d'outils

<img src="/4N1_2024/img/SSMS_3.jpg" />

La barre d'outils est liée à la zone de requêtes. 

En **jaune**, c'est la liste des bases de données. La zone de requêtes utilisera celle qui est sélectionnée dans la barre d'outils.

En **vert**, c'est le bouton qui permet d'exécuter les requêtes dans la zone des requêtes. La touche **F5** permet d'exécuter les requêtes.

En **rose**, c'est le bouton qui permet de créer une nouvelle page de requêtes.

### Zone des requêtes

C'est l'endroit qu'on inscrit les requêtes en T-SQL.

:::warning[ATTENTION]
 La base de données en cours d'utilisation est celle sélectionnée dans la barre d'outils et non celle de l'explorateur d'objets.
:::

### Zone des résultats

C'est l'endroit qui affiche les résultats des requêtes.

Il est possible d'exporter les données en **CSV**.

### Astuces

Voici un vidéo qui montre quelques astuces de **SSMS** : https://www.youtube.com/watch?v=ixstJijky6U.

## Configuration de Visual Studio

Ouvrez **Visual Studio** et sélectionnez l'option **Continuer sans code** en bas à droite.

<img src="/4N1_2024/img/Installation_Visual_ Studio_2.jpg"  />


### Connexion à SQL server dans VS

Il est possible d'utiliser **Visual Studio** pour faire des requêtes à la base de données. **SSMS** sert à gérer le serveur et faire des requêtes. **Visual Studio** permet de faire des requêtes à la base de données.

Dans le cours, **SSMS** sera principalement utilisé, mais certains programmeurs préfèrent gérer le tout avec un même outil.

À partir de la fenêtre **Explorateur de serveur** (**CTRL+ALT+S** pour l'afficher).

1. Effectuez un clic droit sur **Connexions de données** et sélectionnez l'item **Ajouter une connexion...**

<img src="/4N1_2024/img/01_Connexion_BD_VS_1.png"  />
  

   

1. Dans la fenêtre de connexion, entrez l'information de connexion comme avec **SSMS**.

<img src="/4N1_2024/img/01_Connexion_BD_VS_2.png"  />




1. Pour le champ **Sélectionner ou entrer un nom de base de données**, il faut spécifier le nom de la base de données.
### NuGet

**NuGet** est le gestionnaire de paquets pour la plateforme .NET. C'est un incontournable pour être en mesure de télécharger des librairies additionnelles dans vos logiciels. Pour en s'avoir davantage sur la plateforme : https://docs.microsoft.com/fr-ca/nuget/what-is-nuget

Il arrive parfois que la plateforme ne soit pas correctement configurée lors de l'installation.

Dans le menu de recherche dans la barre de menu, inscrivez **nuget**. Sélectionnez l'item **Gestionnaire de package NuGet > Sources de package** dans les éléments de recherche.

<img src="/4N1_2024/img/Installation_Visual_ Studio_3.jpg"  />

Ensuite, assurez-vous d'avoir **nuget.org** dans la liste. Sinon, ajoutez-le avec l'information ci-dessous.

<img src="/4N1_2024/img/Installation_Visual_ Studio_4.jpg" alt="image-20220113153643393"  />

### Affectation de noms

Visual Studio permet de générer des attributs automatiquement à partir des paramètres d'un constructeur. Par contre le modèle par défaut n'utilise pas la convention **_attribut** qui est la plus utilisée dans la convention C#.

Dans le menu de recherche dans la barre de menu, inscrivez **affectation des noms**. Sélectionnez l'item **Style de nom | Éditeur de texte > C# > Style de code > Affectation de noms** dans les éléments de recherche.

<img src="/4N1_2024/img/Installation_Visual_ Studio_5.jpg"  />

Dans la fenêtre d'option, appuyez sur le bouton **Gérer les styles de nommage**.

<img src="/4N1_2024/img/Installation_Visual_ Studio_6.jpg"  />

Appuyez sur le bouton "**+**" pour en créer un nouveau.

<img src="/4N1_2024/img/Installation_Visual_ Studio_7.jpg"  />

Ensuite, remplissez les champs comme dans l'image ci-dessous. Le terme **nom en casse mixte** consiste à **camelCase**. Appuyez sur le bouton **OK** pour confirmer.

<img src="/4N1_2024/img/Installation_Visual_ Studio_8.jpg"  />

Retournez à la fenêtre d'option et appuyez sur le bouton "**+**" pour ajouter une nouvelle ligne. Sélectionnez les éléments comme dans l'image ci-dessous.

<img src="/4N1_2024/img/Installation_Visual_ Studio_9.jpg"  />

### Déclaration d'espaces de noms

Depuis **.Net 6**, il est possible de déclarer les **namespace** en étendue de fichier. Pour rendre cette notation par défaut, il faut modifier le style de code.

Dans le menu de recherche dans la barre de menu, inscrivez **Style de code général**. Sélectionnez l'item **Style de code| Éditeur de texte > C# > Style de code > Général** dans les éléments de recherche.

<img src="/4N1_2024/img/Installation_Visual_ Studio_10.jpg"  />

Ensuite, trouvez l'élément **Déclarations d'espaces de noms** dans la section **Préférences en matière de blocs de code**. Choisissez l'option **Fichier inclus dans l'étendue**.

<img src="/4N1_2024/img/Installation_Visual_ Studio_11.png"  />

### Fichier modèle classe par défaut

Pour la génération du modèle de base pour les classe, il faut modifier le fichier modèle par défaut.

Si votre installation est en français, utilisez le dossier suivant : **C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\ItemTemplates\CSharp\Code\1036\Class**.

Si votre installation est en anglais, utilisez le dossier suivant : **C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\ItemTemplates\CSharp\Code\1033\Class**.

Modifiez le contenu du fichier **Class.cs** par le code ci-dessous.

```csharp
namespace $rootnamespace$
{
    public class $safeitemrootname$
    {
    }
}
```

### Fichier modèle interface par défaut

Pour la génération du modèle de base pour les interfaces, il faut modifier le fichier modèle par défaut.

Si votre installation est en français, utilisez le dossier suivant : **C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\ItemTemplates\CSharp\Code\1036\Interface**.

Si votre installation est en anglais, utilisez le dossier suivant : **C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\ItemTemplates\CSharp\Code\1033\Interface**.

Modifiez le contenu du fichier **Interface.cs** par le code ci-dessous.

```csharp
namespace $rootnamespace$
{
    public interface $safeitemrootname$
    {
    }
}
```


