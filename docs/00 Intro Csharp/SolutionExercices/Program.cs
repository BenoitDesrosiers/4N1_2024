using ExercicesCours1;     


#region Livres
//Assignation avec le constructeur
Livre livre1 = new Livre("François St-Hilaire", "L'ABC du C#", new DateTime(2022, 01, 18), 14);

Console.WriteLine("Livre 1");
Console.WriteLine(livre1.AfficherPublication());
Console.WriteLine(livre1.AfficherInfo());

//Assignation directement lors de la construction
Livre livre2 = new Livre()
{
    Auteur = "Stéphane Janvier",
    Titre = "L'analyse en informatique",
    Publication = new DateTime(2021, 11, 03),
    NombrePage = 1
};

Console.WriteLine("Livre 2");
Console.WriteLine(livre2.AfficherInfo());
Console.WriteLine(livre2.AfficherPublication());
#endregion

#region Notes de cours
//Assignation avec le constructeur
NoteCours note1 = new NoteCours("Benoit Desrosiers", "Conception d'un projet Web", new DateTime(2021, 09, 01), "Web", "A21");

Console.WriteLine("Note 1");
Console.WriteLine(note1.AfficherPublication());
Console.WriteLine(note1.AfficherInfo());

//Assignation classique
NoteCours note2 = new NoteCours();
//Auteur est volontairement exclu pour faire un null
note2.Titre = "Les bases de la réseautique";
note2.Publication = new DateTime(2021, 08, 22);
note2.Matiere = "Réseau";
note2.Session = "A21";

Console.WriteLine("Note 2");
Console.WriteLine(note2.AfficherPublication());
Console.WriteLine(note2.AfficherInfo());
#endregion

#region Disques
Disque disque1 = new Disque("Blizzard", "StarCraft", new DateTime(1998, 12, 18), 266.31M);

Console.WriteLine("Disque 1");
Console.WriteLine(disque1.AfficherPublication());
Console.WriteLine(disque1.AfficherInfo());


Disque disque2 = new Disque("id Software", "Doom", new DateTime(1993, 12, 10), 46.3184M);

Console.WriteLine("Disque 2");
Console.WriteLine(disque2.AfficherPublication());
Console.WriteLine(disque2.AfficherInfo()); //Affichera 46.318, car on a limité à 3 décimales et un arrondi est effectué

Disque disque3 = new Disque("id Software", "Doom 2", new DateTime(1994, 10, 10), 46.3189M);

Console.WriteLine("Disque 3");
Console.WriteLine(disque3.AfficherPublication());
Console.WriteLine(disque3.AfficherInfo()); //Affichera 46.319, car on a limité à 3 décimales et un arrondi est effectué

#endregion


Console.WriteLine("Terminé !");