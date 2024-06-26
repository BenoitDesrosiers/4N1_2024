---
draft: true
---

# Ressources

## Liens {#ressources_liens}



Voici tous les liens vers des ressoures utilisées dans le cours

[Bogus](https://stenbrinke.nl/blog/taking-ef-core-data-seeding-to-the-next-level-with-bogus/)

[Classe et méthode générique]( https://learn.microsoft.com/fr-fr/dotnet/csharp/fundamentals/types/generics)

[Contrainte where pour les types génériques](https://learn.microsoft.com/fr-ca/dotnet/csharp/language-reference/keywords/where-generic-type-constraint)

[DataAnnotation](https://www.entityframeworktutorial.net/code-first/dataannotation-in-code-first.aspx)

[Entity Framework](https://www.entityframeworktutorial.net/efcore/entity-framework-core.aspx)

https://en.wikipedia.org/wiki/Facade_pattern

[FluentAPI](https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx)

[FluentValidation](https://docs.fluentvalidation.net/en/latest/)

[Format des composants XAML](https://learn.microsoft.com/fr-ca/dotnet/api/system.string.format?view=net-7.0) (formatage des dates, des champs numériques...)

[hosting](https://learn.microsoft.com/fr-fr/dotnet/core/extensions/generic-host?tabs=appbuilder)

[Injection de dépendance (vidéo)](https://youtu.be/Hhpq7oYcpGE?si=uyluJ3V_JQtpRzX8)

[Méthode d'extension](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods)

[Migrations](https://www.learnentityframeworkcore.com/migrations)

[Migrations](https://learn.microsoft.com/en-us/ef/core/managing-schemas/)

[params](https://learn.microsoft.com/fr-ca/dotnet/csharp/language-reference/keywords/params)

[Prédicats (lambda)](https://learn.microsoft.com/en-us/dotnet/api/system.predicate-1?view=net-8.0)

[Propriétés](https://learn.microsoft.com/en-us/dotnet/csharp/properties)

[Repository pattern](https://www.umlboard.com/design-patterns/repository.html)

[SQL type vs C# type](https://learn.microsoft.com/en-us/sql/relational-databases/clr-integration-database-objects-types-net-framework/mapping-clr-parameter-data?view=sql-server-ver16&viewFallbackFrom=sql-server-2014&redirectedfrom=MSDN)

[StackPanel ](https://learn.microsoft.com/en-us/uwp/api/windows.ui.xaml.controls.stackpanel?view=winrt-22621) (composant XAML)

[TextBlock](https://learn.microsoft.com/en-us/uwp/api/windows.ui.xaml.controls.textblock?view=winrt-22621) (composant XAML)


## Termes

- Attribut
- Commande: fonction (AsyncRelayCommand) qui fait le pont entre une action (d'un bouton) et une fonction du VM.
- eager loading
- facade
- interface
- Migration
- Repository
- Seed
- Service
- ViewModel (VM) 
- View
- xaml

## Commandes

Add-Migration [nom migration] -StartupProject [Nom Projet Entity Framework]

Update-Database -StartupProject [Nom Projet Entity Framework] -Migration [Nom migration]

Remove-Migration -StartupProject [Nom Projet Entity Framework]

## Propriétés

[Pour en savoir plus sur les propriétés](https://learn.microsoft.com/en-us/dotnet/csharp/properties)

Propriété ayant un getter et un setter public

* public type Nom \{get; set;} 

Propriété ayant un getter public, mais dont le setter ne peut être appelé après la construction de l'objet

* public type Nom \{get; init} // [voir init](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/init)

Propriété ne pouvant être modifié que par sa classe. 

* public type Nom \{get; private set}

Propriété en lecture seulement

* public type Nom \{get; }
