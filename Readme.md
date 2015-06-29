# Model pour les projets AFP
============================

## Installation

1. Cloner ce repo sur le poste local
..1 vous pouvez cloner un projet en nommant le dossier de destination à votre convenance en utilisant ```git clone https://... <nomPréféréDuDossier>```
2. installer les modules npm
..1 ```npm install```
3. S'il y a un fichier "bower.json", faites un ```bower install```
4. Lancer le serveur de dev avec uen commande ```gulp```

## Structure

* En développant, vous modifier uniquement les fichiers du répertoire "src"
* Les fichiers du répertoire "dest" sont ceux affichés dans votre navigateur
* Les fichiers du répertoire "build" sont le produit de la commande ```gulp build --lang <langue>```

### Dossier "src"
Le dossier **src** contient généralement les répertoires traditionnels :
* data : pour stocker les fichiers de trad et de data
* html : pour les fichiers html et le fichier graphics.json pour les metadatas
* images
* scripts : pour toutes les librairies javascript
* styles : pour la css

### Traductions

1. Modifiez les fichiers contenus **à la racine de** "src/data/" pour visualiser vos Traductions

2. Une fois cette opération terminé, **toujours avec le serveur gulp activé**, faites une copie de ces fichiers dans le répertoire de la langue correspondante
..1 *par exemple : copier et écraser les fichiers dans "src/data/fr-FR/" tout en gardant une copie à la racine de "src/data/"*

3. Arrêtez le serveur avec la combinaison 'ctrl + c' et faites un build du langage : ```gulp build --lang <lesDeuxLettresDuLangage>```

### Troubleshootings
