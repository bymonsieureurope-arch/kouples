# Kouples.

Application de démonstration pour futurs mariés et couples, avec Next.js, TypeScript, Tailwind CSS et Lucide.

## Ouvrir l’application sur votre ordinateur

1. Installez Node.js 24 (version LTS).
2. Ouvrez un terminal dans le dossier du projet.
3. Lancez `npm ci`, puis `npm run dev`.
4. Ouvrez http://localhost:3000 dans votre navigateur.

Dans un environnement cloud, le serveur écoute sur le port 3000. Utilisez la fonction de transfert de port de votre outil si elle est disponible. Une adresse localhost n’est accessible que sur la machine où tourne le serveur.

## Vérifications

- `npm run typecheck` : vérification TypeScript.
- `npm run build` : compilation de production.
- `npm start` : lancement de la version compilée.

## Ce que contient la démonstration

Cinq onglets : Accueil, Couple, IA, Tribu et Offres. Petits mots modifiables, checklist, budget prévisionnel, souvenirs, question quotidienne, témoins et missions, filtres de couples, publications/commentaires/likes, groupes, favoris, participations et portefeuille. Le compte à rebours J−184 est illustratif ; activez son calcul automatique en modifiant la date du mariage.

Les modifications sont enregistrées dans le stockage local du navigateur, uniquement sur cet appareil. Elles ne sont pas synchronisées entre membres. La suppression des données du navigateur les efface. Les témoins et autorisations sont simulés : aucun lien d’invitation ni accès externe n’est créé. Les échanges communautaires ne sont pas transmis à de vraies personnes. L’assistant produit des réponses prédéfinies et n’utilise aucune API. Aucun abonnement, paiement, réservation ou économie réelle n’est enregistré.

Toutes les offres, avis et participations sont fictifs. Les économies potentielles sont des estimations de démonstration, séparées des économies confirmées (0 €). Les images d’illustration sont chargées depuis Unsplash et nécessitent une connexion à images.unsplash.com. Le mot-symbole dans l’interface est une interprétation typographique du logo fourni, pas son fichier original.

Le nom des membres Sarah et Julien est celui du scénario de démonstration.

Si les photos sont bloquées par le réseau, une illustration locale prend le relais. Dans le cloud, l’ajout de `images.unsplash.com` à la politique réseau est proposé dans le brouillon de configuration ; il doit être enregistré puis publié pour être activé.

## Direction artistique

Interface blanche, noire et orange inspirée de la référence mobile fournie : couverture immersive, cartes de petits mots compactes, profils ronds et prestataires en liste avec bandeaux collectifs. Les polices DM Serif Display et DM Sans sont hébergées dans le projet avec leurs licences SIL OFL. Les photos restent des illustrations Unsplash ; une image décorative locale prend le relais si le réseau les bloque.
