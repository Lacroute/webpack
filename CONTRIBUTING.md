# Workflow idéaux pour git selon votre rôle :

### Vous êtes développeur :

- Vous clonez un repo et créez une branche de développement pour commencer

```git checkout -b <nomDeLaNouvelleBranche>```

- Vous développez sur cette nouvelle branche et pouvez faire des push sur cette branche pour journaliser vos modifications

```git add -a
git commit -am « message »
git push origin  <nomDeLaNouvelleBranche>```

- A l’issue de vos modifications et après le dernier push, vous pouvez créer un « merge request »

(le formulaire est assez simple à comprendre)

Le merge request consiste à demander à un administrateur du projet de procéder à un merge entre votre branche de développement et la branche master.

### Vous êtes Master :

- Vous pouvez créer ou cloner un projet

- De la même manière qu’un développeur, je vous conseille de créer une branche pour développer.

- Contrairement au développeur, vous pouvez merger vous-même les modifications en procédant comme suit : sur votre branche de dev, vous merger le master, puis si tout va bien, vous vous placez sur le master pour merger la branches de modifs.