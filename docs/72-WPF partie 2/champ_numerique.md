---
sidebar_position: 227
draft: true
---

# Champ texte numérique

Il n'existe pas de contrôle qui accepte seulement les nombres avec **WPF**. Les développeurs peuvent acheter des librairies de composants comme **DevExpress** et **Telerik** pour avoir des composants avancés. Il est possible de faire une version simple soi-même, mais elle est limitée.

Ajoutez la propriété **int Nombre** dans **HelloWorldVM.cs**. 
```csharp
    private int _nombre;
```

et 

```csharp
public int Nombre
{
    get
    {
        return _nombre;
    }
    set
    {
        SetProperty(ref _nombre, value);
    }
}
```

Liez la propriété **Nombre** à un **\<Textbox\>** dans **UcHelloWorld.xaml**.

```xaml
<TextBox Text="{Binding Nombre}" />
```

Démarrez le programme. Si vous essayez d'inscrire une lettre, elle s'affichera, mais le contrôle sera en rouge pour indiquer que la valeur n'est pas compatible avec le type de la propriété de liaison.

Pour permettre seulement les chiffres, il faut modifier des événements sur le  **\<Textbox\>** pour être en mesure de le faire. L'exemple provient d'une suggestion de **StackOverflow**. https://stackoverflow.com/questions/1268552/how-do-i-get-a-textbox-to-only-accept-numeric-input-in-wpf

L'événement **PreviewTextInput** permet d'analyser la valeur des caractères qui sont inscrits dans le composant. Généralement, c'est un seul caractère, mais il est possible d'en recevoir plusieurs d'un coup.

Il faut également intercepter l'action **coller**. L'événement **DataObject.Pasting** permet d'intercepter l'action **coller**.

Dans le **xaml**, il faut créer les 2 événements.

Changez le TextBox dans **UcHelloWorld.xaml**

```xaml
<TextBox Text="{Binding Nombre}" PreviewTextInput="TextBox_PreviewTextInput" DataObject.Pasting="TextBox_Pasting"  />
```

Dans le **xaml.cs**, il faut faire l'implémentation de l'événement. L'implémentation ne se fait pas dans le **ViewModel**, car c'est un comportement directement lié à la vue. Le **ViewModel** veut recevoir un nombre, il ne s'intéresse pas comment la vue s'en occupe.

Pour l'événement **PreviewTextInput**, il est possible d'utiliser une règle **[Regex](https://learn.microsoft.com/en-us/dotnet/standard/base-types/regular-expressions)** (ou [regex sur wikipedia](https://fr.wikipedia.org/wiki/Expression_r%C3%A9guli%C3%A8re)) pour déterminer si la chaine contient uniquement des chiffres.

La propriété **e.Handled == false**  indique que l'événement peut continuer son exécution. Si **e.Handled == true**, l'événement est annulé.

Donc si la chaine n'a pas de chiffre, elle fait annuler l'événement.

Ajoutez cette fonction dans **UcHelloWorld.xaml.cs**

```csharp
private void TextBox_PreviewTextInput(object sender, TextCompositionEventArgs e)
{
    e.Handled = !Regex.IsMatch(e.Text, "^[0-9]");
}
```

Pour l'événement **DataObject.Pasting**, il y a un peu plus d'étapes.

Il faut valider si le contenu du **coller** est du texte. Si c'est le cas, il faut valider à l'aide d'une règle **Regex** si ce sont que des chiffres. Si ce n'est pas le cas, il faut annuler le **coller**.

Ajoutez cette fonction dans **UcHelloWorld.xaml.cs**

```csharp
private void TextBox_Pasting(object sender, DataObjectPastingEventArgs e)
{
    if (e.DataObject.GetDataPresent(typeof(String)))
    {
        String text = (String)e.DataObject.GetData(typeof(String));
        if (!Regex.IsMatch(text, "^[0-9]"))
        {
            e.CancelCommand();
        }
    }
    else
    {
        e.CancelCommand();
    }
}
```

Si la propriété liée est de type **int?**, donc elle est **nullable**. Le **\<textbox\>** n'acceptera pas le champ vide comme valeur **null**. Il faut ajouter la propriété **TargetNullValue=''** dans le **Binding**. Donc la valeur **null**  de la liaison équivaut à une chaine vide du **\<Textbox\>**.

```xaml
<TextBox Text="{Binding Nombre, TargetNullValue=''}" PreviewTextInput="TextBox_PreviewTextInput" DataObject.Pasting="TextBox_Pasting"  />
```

Si le nombre est un **decimal**, il faut utiliser la **Regex** ci-dessous. L'événement **PreviewTextInput** valide uniquement le caractère inscrit et non l'entièreté du nombre. Il est donc possible d'inscrire **12,,,,564,10**. Les composants payants n'ont pas ce genre de problème.

```csharp
"^[0-9.]+" //Anglais, car le séparateur est un point
"^[0-9,]+" //Français, car le séparateur est une virgule
```

Pour le rendre indépendant de la culture, il faut déterminer quel est le séparateur de la culture en cours d'exécution.

```csharp
string separateur = NumberFormatInfo.CurrentInfo.NumberDecimalSeparator;
string regex = $"^[0-9{separateur}]+");
```

S'il faut avoir un nombre négatif.

```csharp
string separateur = NumberFormatInfo.CurrentInfo.NumberDecimalSeparator;
string decregex = $"^[0-9{separateur}-]+"); //decimal négatif
string intregex = "^[0-9-]"; //int négatif
```

## Sélection d'une date

Le composant **\<DatePicker\>** permet d'avoir un contrôle de sélection d'une date.

```xaml
<DatePicker SelectedDate="{Binding MaDate}" />
```

