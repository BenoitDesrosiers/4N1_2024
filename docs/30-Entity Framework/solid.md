---
sidebar_position: 2
---

# Principes SOLID

Les principes **SOLID** sont 5 principes qui permettent d'avoir une meilleure conception des logiciels.

Voici l'explication résumée des principes selon la page Wikipédia : https://fr.wikipedia.org/wiki/SOLID_(informatique)

- **Responsabilité unique (Single responsibility principle)**
  Une classe, une fonction ou une méthode doit avoir une et une seule responsabilité.
- **Ouvert/fermé (Open/closed principle)**
  Une entité applicative (classe, fonction, module ...) doit être fermée à la modification directe, mais ouverte à l'extension.
- **Substitution de Liskov (Liskov substitution principle)**
  Une instance de type T doit pouvoir être remplacée par une instance de type G, tel que G sous-type de T, sans que cela ne modifie la cohérence du programme.
- **Ségrégation des interfaces (Interface segregation principle)**
  Préférer plusieurs interfaces spécifiques pour chaque client plutôt qu'une seule interface générale.
- **Inversion des dépendances (Dependency inversion principle)**
  Il faut dépendre des abstractions, pas des implémentations

Certaines techniques présentées dans ce cours réfèreront à l'un des principes **SOLID**.


## Parenthèse sur la substitution de Liskov

Est-ce qu'un carré est une sous-classe de rectangle ?

Si oui, alors on pourrait utiliser un carré partout où un rectangle est requis. 

Mais imaginons le scénario suivant:

La classe Rectangle défini les méthodes setLargeur(int) et setHauteur(int)

Alors je peux écrire

Rectangle r = new Rectangle();

r.setLargeur(3);

r.setHauteur(5);

int aire  = r.getLargeur() * r.getHauteur();

et m'attendre que aire sera 15. 

Mais pour un carré, si je set la hauteur ou la largeur, je dois changer l'autre dimension aussi, sinon ce n'est plus un carré. 
Si je remplace r par un carré, alors getLargeur * getHauteur  donnera 25 car le setHauteur aura changer la largeur aussi. 

Donc définir carré comme une sous-classe de rectangle ne respecte pas Liskov. 