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

La compilation de production et la vérification TypeScript passent avec la nouvelle interface. Les contrôles TypeScript du build sont conservés, via l’API officielle du compilateur. La refonte a été envoyée sur GitHub. La nouvelle vérification navigateur a confirmé le chargement mobile et la persistance des messages, puis détecté une étiquette d’action terminée masquée par le nouveau style. Cette étiquette a été rétablie. Le contrôle TypeScript et le build passent après correction ; la relance navigateur a été empêchée par l’expiration de la revue automatique. Les autres résultats navigateur ci-dessus concernent la version initiale.

## Logo, grandes cartes et espaces essentiels — 29 octobre 2026

Validation sur la version compilée avec Chromium :

- Logo PNG transparent chargé depuis le projet.
- Aucun débordement horizontal aux largeurs 320, 390, 430, 768 et 1440 pixels.
- Quatre cartes de couples, cinq catégories de prestataires et quatre espaces essentiels présents.
- Likes des couples persistants après rechargement, favoris et commentaires fonctionnels.
- État « Terminée » visible après validation de la prochaine action.
- Enregistrement et relecture de la direction artistique ; ajout d’un témoin ; sauvegarde du planning EVG / EVJF et du brouillon de discours.
- Filtrage du catalogue depuis la catégorie Photo, ouverture de l’offre mise en avant et participation de démonstration.
- Navigation vers la tribu et réponse de l’assistant de démonstration vérifiées.
- Aucune erreur JavaScript détectée. Compilation de production et TypeScript réussis.

Les requêtes Unsplash ont été délibérément bloquées dans ce test pour exercer l’illustration locale de secours. Le chargement des véritables photos sur le déploiement Vercel reste distinct de ce test. Le programme de validation a terminé avec le code de sortie 0.
