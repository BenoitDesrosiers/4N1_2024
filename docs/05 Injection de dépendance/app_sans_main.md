---
sidebar_position: 1
---

# Niveau supérieur

Les applications consoles que vous avez fait jusqu'à maintenant dans vos autres cours utilisaient l'approche classique. Lors de l'exécution du programme, une instance de la classe principale est créée et la méthode de démarrage (généralement **`Main`**) est appelée. La logique du programme débute dans le **`Main`**.

Certains environnements de travail, comme **.NET 6** et plus, ne nécessitent pas de classe de démarrage. Le code dans le fichier est exécuté automatiquement. L'environnement de travail s'occupe de générer automatiquement l'encapsulation du code. En **.NET**, cette approche s'appelle **Instructions de niveau supérieur**. 

Pour plus d'information : https://learn.microsoft.com/fr-ca/dotnet/csharp/fundamentals/program-structure/top-level-statements

La nouvelle approche permet de gérer plus facilement les nouveaux concepts introduits dans **.NET Core**. 

## Exemple de l'approche classique

Créez un nouveau projet dans Visual Studio. Sélectionnez le modèle **Application console (.NET Framework)**. Prenez celui avec la mention **c#**.

Nommez votre projet **DemoC4_Classique**. Sélectionnez l'infrastructure **.Net Framework 4.8**.

La classe **Program.cs** contient le code de démarrage.

À l'intérieur de la méthode  **`Main`**, ce sera le code du programme.

```csharp
namespace DemoC4_Classique
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Appuyez sur ENTER pour quitter.");
			
            //Demande une touche à l'utilisateur tant que ce n'est pas la touche ENTER
            while (Console.ReadKey().Key != ConsoleKey.Enter)
            {
                Console.Clear();
                Console.WriteLine("Mauvaise touche. Appuyez sur ENTER pour quitter.");
            }

            Console.WriteLine("Aurevoir !");
        }
    }
}
```

## Exemple de l'approche sans classe

Créez un nouveau projet dans Visual Studio. Sélectionnez le modèle **Application console**. Prenez celui avec la mention **csharp**.

Nommez votre projet **DemoC4**. Sélectionnez l'infrastructure **.NET 7.0**.

Le fichier **Program.cs** est vide.

Il est possible de reproduire le même programme directement.

```csharp
Console.WriteLine("Appuyez sur ENTER pour quitter.");
			
//Demande une touche à l'utilisateur tant que ce n'est pas la touche ENTER
while (Console.ReadKey().Key != ConsoleKey.Enter)
{
    Console.Clear();
    Console.WriteLine("Mauvaise touche. Appuyez sur ENTER pour quitter.");
}

Console.WriteLine("Aurevoir !");
```