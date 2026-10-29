# Validation initiale de la démonstration

Vérifications réalisées dans Chromium sur la version de production, en affichage mobile (390 × 844) et ordinateur (1440 × 1000).

- Compilation de production et vérification TypeScript réussies.
- Installation reproductible par `npm ci` réussie.
- Navigation des cinq onglets sans rechargement.
- Absence de débordement horizontal sur les deux tailles d’écran.
- Modification d’un petit mot et persistance après rechargement.
- Action marquée comme terminée.
- Ajout d’un témoin, mission et choix de partage du planning.
- Ajout d’une dépense prévisionnelle.
- Réponse de démonstration de l’assistant.
- Filtrage des couples par ville.
- Publication et commentaire dans la tribu.
- Favori et participation à une offre fictive.
- Portefeuille : 0 € confirmé, 240 € potentiel après participation au scénario By Monsieur.
- Modification des prénoms et réponse à la question quotidienne.
- Création d’un groupe local.
- Discussion entre couples conservée séparément des publications communautaires.
- Fermeture d’une fenêtre de dialogue avec Échap.
- Activation du compte à rebours automatique.
- Aucune erreur JavaScript détectée pendant ces scénarios.

Limite réseau constatée : images.unsplash.com est refusé par le proxy cloud actuel. L’affichage des photos n’est pas validé ; le domaine a été ajouté au brouillon réseau. Une illustration locale de secours est prévue. Les vraies photos nécessitent l’application de la configuration réseau, ou un navigateur local disposant de l’accès à Unsplash.

Aucun paiement, API d’IA, message à un tiers ou réservation réelle n’est déclenché. Les données ne sont pas synchronisées entre appareils et ne constituent pas une infrastructure de production.

## Refonte visuelle du 29 octobre 2026

La compilation de production et la vérification TypeScript passent avec la nouvelle interface. Les contrôles TypeScript du build sont conservés, via l’API officielle du compilateur. La nouvelle vérification navigateur et l’envoi distant dépendent de la revue d’autorisation de l’environnement, actuellement indisponible (saturation ou expiration). Les résultats navigateur ci-dessus concernent la version initiale ; ils ne constituent pas une validation visuelle de cette refonte.
