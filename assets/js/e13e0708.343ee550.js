"use strict";(self.webpackChunknotes_de_cours_4_n_1_2024=self.webpackChunknotes_de_cours_4_n_1_2024||[]).push([[9788],{1630:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>a,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>u});var r=s(5893),n=s(1151);const i={sidebar_position:815,draft:!1},l="Structure d'un test",o={id:"Tests Unitaires/structure_test",title:"Structure d'un test",description:"Simulacres Mock, Stub et Fake",source:"@site/docs/80-Tests Unitaires/structure_test.md",sourceDirName:"80-Tests Unitaires",slug:"/Tests Unitaires/structure_test",permalink:"/4N1_2024/docs/Tests Unitaires/structure_test",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:815,frontMatter:{sidebar_position:815,draft:!1},sidebar:"NotesSidebar",previous:{title:"Introduction",permalink:"/4N1_2024/docs/Tests Unitaires/introduction"},next:{title:"Tests unitaires",permalink:"/4N1_2024/docs/Tests Unitaires/test_unitaire"}},a={},u=[{value:"Simulacres Mock, Stub et Fake",id:"simulacres-mock-stub-et-fake",level:2},{value:"Pr\xe9paration du test - arrangement",id:"pr\xe9paration-du-test---arrangement",level:2},{value:"Ex\xe9cution - action",id:"ex\xe9cution---action",level:2},{value:"R\xe9sultat du test - assertion",id:"r\xe9sultat-du-test---assertion",level:2},{value:"Structure du fichier de test",id:"structure-du-fichier-de-test",level:2}];function c(e){const t={a:"a",blockquote:"blockquote",code:"code",del:"del",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,n.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{id:"structure-dun-test",children:"Structure d'un test"}),"\n",(0,r.jsx)(t.h2,{id:"simulacres-mock-stub-et-fake",children:"Simulacres Mock, Stub et Fake"}),"\n",(0,r.jsxs)(t.p,{children:["Le simulacre est une partie essentielle dans les tests. Il permet de cr\xe9er un faux objet et d'indiquer ce que ses fonctionnalit\xe9s retourneront comme valeur. Il existe les ",(0,r.jsx)(t.strong,{children:"Mock"})," et ",(0,r.jsx)(t.strong,{children:"Stub"}),"."]}),"\n",(0,r.jsx)(t.p,{children:"Les simulacres sont tr\xe8s pratiques pour les tests unitaires, car il faut pr\xe9dire le r\xe9sultat des d\xe9pendances de la fonctionnalit\xe9 \xe0 tester."}),"\n",(0,r.jsx)(t.p,{children:"Voici la diff\xe9rence entre les 2 selon Microsoft."}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"Mock"})," - Il s\u2019agit d\u2019un objet fictif du syst\xe8me qui d\xe9termine la r\xe9ussite ou l\u2019\xe9chec d\u2019un test unitaire. Un simulacre commence comme un faux jusqu\u2019\xe0 ce qu\u2019il soit affirm\xe9 contre."]}),"\n"]}),"\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:"Stub"})," - Un stub permet de remplacer de mani\xe8re contr\xf4l\xe9e une d\xe9pendance existante (ou collaborateur) dans le syst\xe8me. \xc0 l\u2019aide d\u2019un stub, vous pouvez tester votre code sans avoir \xe0 g\xe9rer directement la d\xe9pendance. Par d\xe9faut, un stub commence comme un faux."]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(t.blockquote,{children:["\n",(0,r.jsxs)(t.p,{children:["Source : ",(0,r.jsx)(t.a,{href:"https://learn.microsoft.com/fr-ca/dotnet/core/testing/unit-testing-best-practices#lets-speak-the-same-language",children:"https://learn.microsoft.com/fr-ca/dotnet/core/testing/unit-testing-best-practices#lets-speak-the-same-language"})]}),"\n"]}),"\n",(0,r.jsxs)(t.p,{children:["Dans la pratique, le simulacre peut faire les 2 r\xf4les en m\xeame temps. Il est possible qu'un comportement soit programm\xe9 dans le simulacre (",(0,r.jsx)(t.strong,{children:"stub"}),") et de devoir valider (",(0,r.jsx)(t.strong,{children:"mock"}),") des appels de m\xe9thodes pour d\xe9terminer si le test est un succ\xe8s ou non. Le terme ",(0,r.jsx)(t.strong,{children:"Fake"})," permet d'indiquer que c'est un simulacre, soit un ",(0,r.jsx)(t.strong,{children:"mock"}),", soit un ",(0,r.jsx)(t.strong,{children:"stub"})," ou les 2 en m\xeame temps."]}),"\n",(0,r.jsx)(t.p,{children:"Pour faciliter la cr\xe9ation d'un simulacre, il est conseill\xe9 d'utiliser des librairies. Sinon, il faudrait cr\xe9er soi-m\xeame des classes simulacres."}),"\n",(0,r.jsx)(t.p,{children:"Voici des librairies qui sont utiles pour cr\xe9er des simulacres et v\xe9rifier."}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:"Moq"})}),"\n",(0,r.jsxs)(t.p,{children:["Cette librairie est l'une des plus populaires pour les projets ",(0,r.jsx)(t.strong,{children:".NET"}),". Elle permet facilement de cr\xe9er des simulacres. Elle permet de cr\xe9er rapidement un objet \xe0 partir d'une interface. Dans le cas que l'objet soit cr\xe9\xe9 \xe0 partir d'une classe, il faut que la classe soit con\xe7ue pour faciliter la r\xe9\xe9criture des m\xe9thodes \xe0 simuler. C\u2019est l'une des raisons que les injections des d\xe9pendances sont faites \xe0 partir d'une interface la majorit\xe9 du temps. M\xeame si la librairie s'appelle ",(0,r.jsx)(t.strong,{children:"Moq"})," et que l'objet est ",(0,r.jsx)(t.strong,{children:"Mock<T>"}),", elle permet de faire un ",(0,r.jsx)(t.strong,{children:"stub"})," et un ",(0,r.jsx)(t.strong,{children:"mock"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["Pour plus d'information : ",(0,r.jsx)(t.a,{href:"https://github.com/moq/moq4",children:"https://github.com/moq/moq4"})]}),"\n"]}),"\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:"AutoFixture"})}),"\n",(0,r.jsxs)(t.p,{children:["Lorsqu'il faut cr\xe9er des objets du mod\xe8le, il peut \xeatre pratique d'utiliser une librairie d'assignation automatique des valeurs al\xe9atoires pour \xe9viter les valeurs par d\xe9faut. La librairie ",(0,r.jsx)(t.strong,{children:"AutoFixture"})," permet de faire cette t\xe2che pour nous. Cette librairie ne doit pas \xeatre utilis\xe9e pour de la validation ou pour les tests d'int\xe9gration, car il n'est pas possible de s'assurer que l'objet r\xe9pondra aux crit\xe8res d'exactitudes des donn\xe9es ou de la non-exactitude. Mais elle est pratique pour tester les m\xe9thodes de ",(0,r.jsx)(t.strong,{children:"mappage"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["Pour plus d'information : ",(0,r.jsx)(t.a,{href:"https://github.com/AutoFixture/AutoFixture/",children:"https://github.com/AutoFixture/AutoFixture/"})]}),"\n"]}),"\n",(0,r.jsxs)(t.li,{children:["\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:(0,r.jsx)(t.del,{children:"MockQueryable"})})}),"\n",(0,r.jsxs)(t.p,{children:["Pour \xeatre en mesure de simuler le ",(0,r.jsx)(t.strong,{children:"contexte"})," de ",(0,r.jsx)(t.strong,{children:"Entity Framework"}),", il faut cr\xe9er la m\xe9canique de construction des requ\xeates pour que ce soit \t\t",(0,r.jsx)(t.strong,{children:"queryable"}),". Dans le cas d'une requ\xeate asynchrone, il n'est pas possible de le faire directement avec ",(0,r.jsx)(t.strong,{children:"Moq"}),". Il faut utiliser une librairie additionnelle. \tPour faciliter la cr\xe9ation d'un objet ",(0,r.jsx)(t.strong,{children:"queryable"}),". La librairie ",(0,r.jsx)(t.strong,{children:"MockQueryable"})," est un compl\xe9ment \xe0 la librairie ",(0,r.jsx)(t.strong,{children:"Moq"}),". Cette librairie ne sera pas utilis\xe9e pour le ",(0,r.jsx)(t.strong,{children:"TP 3"}),", car il n'est plus n\xe9cessaire de faire le test unitaire du ",(0,r.jsx)(t.strong,{children:"repository"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["Pour plus d'information : ",(0,r.jsx)(t.a,{href:"https://github.com/romantitov/MockQueryable",children:"https://github.com/romantitov/MockQueryable"})]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(t.h2,{id:"pr\xe9paration-du-test---arrangement",children:"Pr\xe9paration du test - arrangement"}),"\n",(0,r.jsxs)(t.p,{children:["La phase de pr\xe9paration du test est souvent appel\xe9e ",(0,r.jsx)(t.strong,{children:"arrangement"})," ou ",(0,r.jsx)(t.strong,{children:"arrange"})," en anglais."]}),"\n",(0,r.jsx)(t.p,{children:"Cette phase permet de cr\xe9er les donn\xe9es de test et les simulacres."}),"\n",(0,r.jsx)(t.p,{children:"Les simulacres sont \xe9galement configur\xe9s pour simuler le comportement des m\xe9thodes."}),"\n",(0,r.jsx)(t.p,{children:"Dans cette phase, il faut \xe9galement cr\xe9er les objets des r\xe9sultats attendus si c'est n\xe9cessaire."}),"\n",(0,r.jsx)(t.p,{children:"Pour les \xe9l\xe9ments r\xe9p\xe9titifs, il peut \xeatre int\xe9ressant d'utiliser des m\xe9thodes configur\xe9es."}),"\n",(0,r.jsx)(t.h2,{id:"ex\xe9cution---action",children:"Ex\xe9cution - action"}),"\n",(0,r.jsxs)(t.p,{children:["La phase d'ex\xe9cution consiste \xe0 ex\xe9cuter les m\xe9thodes du test. Cette phase est souvent appel\xe9e ",(0,r.jsx)(t.strong,{children:"action"})," ou ",(0,r.jsx)(t.strong,{children:"act"})," en anglais."]}),"\n",(0,r.jsx)(t.p,{children:"Pour un test unitaire, il y a g\xe9n\xe9ralement un seul appel de m\xe9thode dans un test unitaire, car c'est la m\xe9thode \xe0 tester."}),"\n",(0,r.jsx)(t.p,{children:"Pour un test d'int\xe9gration, il est possible d'avoir plusieurs appels de m\xe9thode. Par exemple, avant de supprimer un item d'une liste, il faut obtenir la liste, ensuite le s\xe9lectionner et finalement le supprimer."}),"\n",(0,r.jsx)(t.h2,{id:"r\xe9sultat-du-test---assertion",children:"R\xe9sultat du test - assertion"}),"\n",(0,r.jsxs)(t.p,{children:["La phase du r\xe9sultat du test consiste \xe0 la logique qui d\xe9termine si le test est valide. Cette phase est souvent appel\xe9e ",(0,r.jsx)(t.strong,{children:"assertion"})," ou ",(0,r.jsx)(t.strong,{children:"assert"})," en anglais."]}),"\n",(0,r.jsx)(t.p,{children:"Dans cette phase, le r\xe9sultat obtenu sera compar\xe9 avec le r\xe9sultat attendu."}),"\n",(0,r.jsxs)(t.p,{children:["Avec ",(0,r.jsx)(t.strong,{children:"xUnit"}),", il faut utiliser la classe ",(0,r.jsx)(t.strong,{children:"Assert"})," pour faire une assertion. Pour avoir la liste compl\xe8te des m\xe9thodes d'assertion de ",(0,r.jsx)(t.strong,{children:"xUnit"})," : ",(0,r.jsx)(t.a,{href:"https://xunit.net/docs/comparisons#assertions",children:"https://xunit.net/docs/comparisons#assertions"})]}),"\n",(0,r.jsxs)(t.p,{children:["Il est possible de comparer un comportement avec ",(0,r.jsx)(t.strong,{children:"Moq"}),". La m\xe9thode ",(0,r.jsx)(t.strong,{children:"Verify()"})," de l'objet ",(0,r.jsx)(t.strong,{children:"Mock<T>"})," permet de d\xe9terminer si une m\xe9thode a \xe9t\xe9 ex\xe9cut\xe9e ou non. Pour plus d'information : ",(0,r.jsx)(t.a,{href:"https://github.com/Moq/moq4/wiki/Quickstart#verification",children:"https://github.com/Moq/moq4/wiki/Quickstart#verification"})]}),"\n",(0,r.jsxs)(t.p,{children:["Pour faciliter la comparaison des objets, la librairie ",(0,r.jsx)(t.strong,{children:"FluentAssertions"})," sera utilis\xe9e. Cette librairie permet de comparer tout le contenu automatiquement d'un objet et non seulement les adresses des objets. Il manque des m\xe9thodes d'assertion utiles dans ",(0,r.jsx)(t.strong,{children:"xUnit"}),". Cette librairie permet d'augmenter les capacit\xe9s d'assertion des tests. Pour plus d'information : ",(0,r.jsx)(t.a,{href:"https://fluentassertions.com/",children:"https://fluentassertions.com/"})]}),"\n",(0,r.jsx)(t.h2,{id:"structure-du-fichier-de-test",children:"Structure du fichier de test"}),"\n",(0,r.jsxs)(t.p,{children:["La librairie ",(0,r.jsx)(t.strong,{children:"xUnit"})," n'a pas besoin de mettre une ",(0,r.jsx)(t.strong,{children:"Annotation"})," sur la classe pour indiquer que c'est une classe de test."]}),"\n",(0,r.jsxs)(t.p,{children:["Il faut nommer la classe avec le nom de la classe \xe0 tester et en ajoutant le suffixe ",(0,r.jsx)(t.strong,{children:"Test"}),"."]}),"\n",(0,r.jsxs)(t.p,{children:["Par contre, il faut mettre l'annotation ",(0,r.jsx)(t.strong,{children:"[Fact]"})," sur une m\xe9thode pour indiquer que c'est un test. Il existe d'autres annotations pour indiquer que la m\xe9thode est une m\xe9thode de tests. Elles seront pr\xe9sent\xe9es lors de la cr\xe9ation des premiers tests."]}),"\n",(0,r.jsx)(t.p,{children:"Le nom de la m\xe9thode doit \xeatre s\xe9par\xe9 en 3 parties."}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Nom de la m\xe9thode \xe0 tester"}),"\n",(0,r.jsx)(t.li,{children:"Nom du cas de test"}),"\n",(0,r.jsx)(t.li,{children:"R\xe9sultat attendu"}),"\n"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-c#",children:"public class NomClasseTest\r\n{\r\n    [Fact]\r\n    public void NomMethode_NomCas_Resultat()\r\n    {\r\n\t\t//Arrangement (Arrange)\r\n        /*Ici il faut cr\xe9er les simulacres et pr\xe9parer les donn\xe9es de tests*/\r\n        \r\n        //Action (Act)\r\n        /*Ici on ex\xe9cute la m\xe9thode \xe0 tester*/\r\n        \r\n        //Assertion (Assert)\r\n        /*Ici on effectue les assertions pour d\xe9terminer si le test est un succ\xe8s*/\r\n    }\r\n}\n"})})]})}function d(e={}){const{wrapper:t}={...(0,n.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},1151:(e,t,s)=>{s.d(t,{Z:()=>o,a:()=>l});var r=s(7294);const n={},i=r.createContext(n);function l(e){const t=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:l(e.components),r.createElement(i.Provider,{value:t},e.children)}}}]);