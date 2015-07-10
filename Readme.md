# Model pour les projets AFP
============================

## Installation

1. Cloner ce repo sur le poste local
  * vous pouvez cloner un projet en nommant le dossier de destination à votre convenance en utilisant ```git clone https://... <nomPréféréDuDossier>```
2. installer les modules npm
  * ```npm install```
3. S'il y a un fichier "bower.json", faites un ```bower install```
4. Lancer le serveur de dev avec une commande ```gulp --lang xx-XX``` (où xx-XX est la langue choisie, par ex: fr-FR)
5. **S'il y a un problème d'affichage au lancement ou que vous ne voyez pas vos changements, coupez le process (ctrl + c) et lancer un 'gulp clean'**

## Structure

* En développant, vous modifier uniquement ***les fichiers du répertoire "src"***
* Les fichiers du répertoire "dest" sont ceux affichés dans votre navigateur
* Les fichiers du répertoire "build" sont le produit de la commande ```gulp build --lang <langue>```

Dev : **Il faut d'ailleurs penser à modifier le fichier Gulp/tasks/build.js pour qu'il pointe sur les bons fichiers data : quand j'ai fait ce modèle, les noms des fichiers correspondaient au répertoire france-unemployment.**

### Dossier "src"
Le dossier **src** contient généralement les répertoires traditionnels :
* data : pour stocker les fichiers de trad et de data dans leurs répertoires de lang respectifs
* html : pour les fichiers html et le fichier graphics.json pour les metadatas
* images
* scripts : pour toutes les librairies javascript
* styles : pour la css et les polices dans leurs répertoires de lang respectifs

### Traductions

1. Lancer le serveur avec une commande qui spécifie la langue ```gulp --lang fr-FR```, par exemple.

2. Arrêtez le serveur avec la combinaison 'ctrl + c' et faites un build du langage : ```gulp build --lang <lesDeuxLettresDuLangage>```, ces deux lettres en minuscule, cette fois.

### Troubleshootings

### Issue tracking

je propose qu'on procède comme suit :
* attribution d'une plage pour les issues par catégories:

    - display : ce qui a trait à l'affichage (plage de 0 à 99)
    - features : ce qui a trait aux fonctionnalités (plage de 100 à 199)
    - lang : ce qui a trait aux traductions (plge de 200 à 299)
    - scaffolder : ce qui a trait aux outils de dev et déploiement (plage de 300 à 399)

* former les titres d'issue dans gitlab comme suit
    > "001 : display : bouton - le bouton x ne fonctionne pas

* et commentez bien sûr, avec des screenshots si possible
* Un aspect plus pratique serait de créer des labels ! D'ailleurs ne vous en privez pas, créez des labels, vos issues laisseront une trace indélébile dans les mémoires...
