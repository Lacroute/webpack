```
                                                                       ``--:/+ysssyyo++:``
                                                                      `-/+yh:/+ohdhysmNNdhy/`       
                                                                  ``-/+oo`.`+hy/+syddysyNNMmmo`     
                                                                  -   `.+md/`::/hmdo++dNMmsdNMm/    
              `sddddddddh-    /ddddddddddddddd+   +dddddddddhy+-     -s+..``dMMo.-:mMMs-+NMMMMMMs`  
             -dMMMMMMMMMN:    +MMMMMMMMMMMMMm/  -dMMMMMMMMMMMMMMd-   :o-:ss-`.`sNMNs--+NMMNNMmMMMy`
            +NMMMMNMMMMMN:    +MMMMMNhhhhhho.  +NMMMMmsssshNMMMMMm.     yNd/:+::sdhsso+yNMNyNMMMMN+
          .hMMMMMh.NMMMMN:    +MMMMMd.        `sMMMMMs     /NMMMMN+        oMMM+  .dMMN-`/dMMMNdMMm.
    `````:mMMMMNs.`NMMMMN/````oMMMMMd-`````````sMMMMMs    `+NMMMMN+     :ys:+s/+hmdyos+smNMMMMMNMMM:
  :dmmmmmMMMMMMMmmmMMMMMMNmmmmNMMMMMMmmmmmmmmmmNMMMMMNddddNMMMMMMd`    `dMM+  `yMMMm` :mMMMMMMMMMMN+
`sNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNy`      `:-/hmy//o/+hmhoyhNMMMMmMMM-
+yyyhNMMMMMNyyyyyyyMMMMMMhyyyydMMMMMNhyyyyyyyyymMMMMMNyyyyyso/-`        `-./mMN/ ``hMMN/:omMMMMNMMy`
   .hMMMMMm-       NMMMMN:    +MMMMMd.        `sMMMMMd                 `hMMo`` +mMNs::+mMMdsMMMMMd:
  /mMMMMMy.        NMMMMN:    +MMMMMd.        `sMMMMMd               +h/.:/.:+/+dmdsooohdNMMMmMMN:  
 :syyyyy/          yyyyys-    :yyyyyo`         /yyyyyo               `/::+/-ymm+`.:dNms+oNmNMMMd-   
                                                                  -` `.++sy:`..+mNm+-/mNMmhhNmo`    
                                                                    -+/:/`:-odh//oymmdsydmNmo.      
                                                                      `:+/+s+ooohhysyhddyo:`        
                                                                         `.-:-///+o+:--`
```
# Model pour les projets AFP
============================


## Installation

1. Cloner ce repo sur le poste local
  * vous pouvez cloner un projet en nommant le dossier de destination à votre convenance en utilisant ```git clone https://... <nomPréféréDuDossier>```

2. installer les modules npm
  * ```npm install```

3. Lancer le serveur de dev avec une commande ```gulp --lang xx-XX``` (où xx-XX est la langue choisie, par ex: fr-FR)

4. **S'il y a un problème d'affichage au lancement ou que vous ne voyez pas vos changements, coupez le process (ctrl + c) et lancer un 'gulp clean'**

5. Lancer une commande ```gulp build --lang xx-XX``` pour faire un builds

6. Pour déployer en prod : ```gulp deploy --lang xx-XX```
  * le déploiement se nourrit essentiellement des infos contnues dans le fichier "lang.json" du répertoire "data" : les champs importants sont *keywords*, *language* et *id*
  * la datesera la date d'indexation
  * l'infographie sera ensuite automatiquement ajoutée dans phraseanet ou s'il s'agit d'une màj, il faudra passer par le volet upload > quarantaine


## Structure

* En développant, vous modifier uniquement ***les fichiers du répertoire "src"***
* Vous pouvez afficher la liste des styles de base disponibles via ***styles.html***
* Les fichiers du répertoire "dest" sont ceux affichés dans votre navigateur
* Les fichiers du répertoire "build" sont le produit de la commande ```gulp build --lang xx-XX```
* Les fichiers copiés sur le serveur et indexés sont ceux pris du répertoire "build"
* Il ne peut il y a voir de build si vous n'avez pas lancé un dev au moins une fois.
* il ne peut pas il y avoir de déploiement si vous n'avez pas buildé au moins une fois.

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

2. Arrêtez le serveur avec la combinaison 'ctrl + c' et faites un build du langage : ```gulp build --lang fr-FR``` par exemple.

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

## deploying

### How-to:

Le principe de déploiement a changé !

En ajoutant un tag à la branche master de votre projet, vous pouvez d'ors et déjà bénéficier du déploiement automatique de vos builds.

Cela implique :

- le déploiement d'un build généré au dernier commit sur la branche

- son indexation au choix (3 scénarios) dans Phraseanet, incrémentale dans Phraseanet ou une mise à jour d'un build existant

#### Préambule

Au préalable, je dois rappeler quelques principes pour que le système fonctionne sans accroc.

Le fichier lang.json de la langue choisie devient une pièce maîtresse du dispositif. Il comporte trois nouveaux champs, tout à la fin, qui servent à déterminer les scénarios de déploiement.

La branche choisie pour développer est aussi très importante : elle est nommée dans le fichier ".gitlab-ci.yml" à la racine du projet et doit correspondre à la branche choisie au paramètre "only" (l'explication suit).

- "id" : doit toujours être renseigné par le nom du projet, sous sa forme sans espace et sans caractères exotiques (accents, etc.)

Ce nom devra rester immuable dès qu'il est indexé pour la première fois dans Phraseanet.

- "record_id" : sert uniquement au scénario dans lequel vous souhaitez mettre à jour l'url un build indexé auparavant. Les champs contenant l'url seront modifiés, et uniquement ces champs.

- "url_to_update" : si vous voulez mettre à jour le contenu d'un répertoire existant et déjà indexé dans Phraseanet, il vous suffit de renseigner ce champ avec le nom du dossier cible sur graphics (celui qui se trouve dans "builds")

#### EXEMPLE DE LANG.JSON
```
...
"language": "fr",
  "id": "model",
  "record_id": "",
  "url_to_update": ""
}
```

#### EXEMPLE DE .GITLAB-CI.YML
```variables:
  CI_BUILD_TARGET: "$CI_PROJECT_ID"
cache:
  untracked: true
  paths:
    - node_modules/
build:
  stage: build
  script:
- npm install && gulp build --lang fr-FR >> vérifiez s'il s'agit de la langue désirée
    - mkdir $HOME/deploy/$CI_BUILD_TARGET && cp -R ./build/* $HOME/deploy/$CI_BUILD_TARGET
only:
 - master << choix de la branche
tags:
 - deployBuild << choix du nom du tag
deploying:
  stage: deploy
  script:
    - curl --data "toclean=$CI_PROJECT_DIR&build=$HOME/deploy/$CI_BUILD_TARGET&scenario=create" http://vspar-infodyn-p-db-01.afp.com:8666
  when: on_success
only:
 - master << choix de la branche
  tags:
    - deployBuild```

### Scénarios de déploiement

- Je veux déployer pour la première fois :

  * je tag ma branche avec le tag "deployBuild"

  ```git tag -a deploybuild -m "la raison de ce tag"```

  * je vérifie que les champs "record_id" et "url_to_update" sont vides dans le fichier "lang.json" de la langue choisie

  * je vérifie que le fichier ".gitlab-ci.yml" à la racine est conforme et que la commande de build est correcte

  * je commit et je push et je vérifie sur gitlab que tout est ok

  * je vérifie sur interactive.afp.com que mon build apparaît

- Je veux déployer et modifier une entrée déjà indexée :

  * Ma branche est déjà tagguée "deployBuild"

  * je me connecte à Phraseanet back pour récupérer le record_id de mon projet

  * je renseigne le champs "record_id" dans le fichier lang.json de la langue choisie

  * je vérifie que les fichiers "lang.json" et ".gitlab-ci.yml" sont conformes à ce que je veux faire

  * je commit et push mon changement

  * je vérifie dans gitlab que tout se passe bien

  * je vérifie que les urls ont été mises à jours dans Phraseanet back ou sur interactive.afp.com

- Je veux mettre à jour un build existant dans changer son indexation :

  * ma branche est déjà tagguée "deploybuild"

  * je renseigne le champ "url_to_update" avec le nom du répertoire existant sur graphics (je peux récupérer ce nom via un logiciel de ftp au besoin)

  * je vérifie que les fichiers "lang.json" et ".gitlab-ci.yml" sont conformes à ce que je veux faire

  * je commit et push

  * je vérifie dans gitlab que le build est un succès

  * je vérifie l'affichage de mon infographie qui doit être à jour

**Et dans tous les cas, je reste dispo pour du debug, car je sais qu'au début ça ne va pas être facile, nous allons essayer d'améliorer la prise en main au fil de vos bugs**
