# Scrolly
Scrolly est une bibliothèque Javascript permettant d'ajouter des scrollbars personnalisées à vos pages HTML !

## Intégration
Pour intégrer Scrolly dans vos pages HTML ajoutez les deux lignes suivantes dans la balise Head :
```
<script type="text/javascript" src="Scrolly.js"></script>
<link rel="stylesheet" href="Scrolly.css"/>
```
C'est tout vous pouvez maintenant commencer !

## Démarrer
Pour ajouter une scrollbar sur un élément, il faut ajouter l'attribut **scrolly**.

C'est tout !

#### Attention
Pour que tout fonctionne correctement, l'élément cible doit avoir une position différentes de **static**, avoir un overflow hidden et posséder un seul enfant.

## Personnaliser vos ScrollBars
Vous pouvez personnaliser vos scrollbars en ajoutant des attributs.

Tout d'abord, par défaut, scrolly n'affiche que la barre verticale, si vous souhaitez aussi la barre horizontale ajoutez l'attribut scrolly-hor.

Ensuite, scrolly affiche les barres à droite et en bas, vous pouvez changer la position avec les attributs **scrolly-left** et **scrolly-top**.

Vous pouvez ensuite afficher les flèches pour le défilement avec l'attribut **scrolly-arrow**

Vous pouvez définir le style de vos scrollbars avec l'attribut **scrolly-class** il existe deux style prédéfinis :
* default
* normal
mais rien ne vous empêche de créer vos propres styles en éditant le fichier **Scrolly.css** en respectant la logique du fichier.

