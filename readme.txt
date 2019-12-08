But :

Vous êtes donc un élève de l'ENSG. Vous avez émis le souhait de réaliser un semestre à l'étranger, à l'université Laval, au Québec. L'école a accepte. Il faut désormais effectuer vos démarches d'immigration.
Vous avez 3 documents a récupérer : votre passeport, le Certificat d'Acceptation du Québec, et votre Permis d'Etude. Le premier est nécessaire pour obtenir le second, qui est lui-même nécessaire pour obtenir le troisième.


Installation :

Pour créer ma base de données, je me suis servi de phpmyadmin. J'ai ensuite exporter les données en format texte. Ce fichier est le fichier 'escapeGame.sql'. Pour installer la base de donnée, il suffit donc d'importer ce fichier dans phpmyadmin ou tout autre logiciel équivalent.

Ensuite pour lancer le jeu, mettez l'ensemble du dossier dans le dossier du localhost. Puis, exécutez le fichier index.html.

Solutions :

Pour trouver la mairie et l'ambassade, vous pouvez chercher sur maps. J'aurais aimé implémenter une barre de recherche de lieu dans le jeu. Cependant, faute de temps, je n'ai pu le faire.
Dans l'ordre, vous devez :
	- Cliquer sur le marqueur de la maison (le seul qui apparait au chargement de la page). Vous pouvez alors récupérer le code qui y sera donné.
	- Allez à la mairie de Noisy-Champ, zoomez et cliquez sur le marqueur. Un formulaire aparait en haut à droite de l'écran. Rentrez le code '1234' donné précédemment. Vous recevez alors le passeport.
	- Allez à l'ouest de Paris sur le faubourg St Honoré, zoomer et cliquez sur le marqueur. Si vous possédez le passeport, vous recevez alors automatiquement le Certificat d'Acceptation du Québec (CAQ).
	- Cliquez à nouveau sur ce marqueur. Maintenant que vous possédez le CAQ, vous recevez le permis d'étude.
	- Revenez à la maison. Cliquez sur le marqueur. Maintenant que vous avez les 3 documents, cela vous redirige vers une seconde page web. Bravo, vous avez réussi !
