# Origami Design

Vitrine française pour les créations Second Life de Manege et Denzel. HTML, CSS et JavaScript, sans installation de dépendances.

## Publication

La publication directe fonctionne avec **Pages → Source → Deploy from a branch → main → / (root)**. Dans GitHub Desktop, enregistrer les changements puis cliquer sur **Push origin**. L'adresse attendue est https://origamidesign.github.io/Origami-Design/ après une publication réussie. Un workflow alternatif est fourni pour une configuration GitHub Actions ; il n'est pas nécessaire pour la publication directe depuis la branche.

## Direction visuelle

La feuille `atelier.css` complète `style.css` : ambiance sombre, accents dorés, origami animé en CSS et grille en perspective. Le mouvement est désactivé lorsque la préférence système de réduction des animations est active. Aucun moteur 3D ni dépendance supplémentaire n'est nécessaire.

## Catalogue

Les 129 articles de `products.json` ont été importés depuis les deux pages HTML fournies par le propriétaire le 1 novembre 2026 (96 + 33 articles). Les prix et disponibilités ne sont pas synchronisés automatiquement ; la fiche Marketplace fait référence. Modifier ce fichier pour ajouter des articles ou corriger leurs catégories. Chaque entrée contient `name`, `price`, `category`, `url` et `image`.

Les images sont celles de la boutique, hébergées sur le CDN Second Life. Les polices Google Fonts disposent de polices de repli. L'adresse de la boutique en monde provient du profil Marketplace et reste à vérifier dans Second Life.

Pour importer plusieurs pages HTML enregistrées depuis Marketplace : lancer `node prepare-catalog.cjs "page1.html" "page2.html"`. Le script fusionne les articles avec le catalogue existant, met à jour les articles présents dans les fichiers et évite les doublons par lien Marketplace. Sans argument, il lit `marketplace-source.html`. Les fichiers HTML sources restent locaux et ne doivent pas être publiés : ils peuvent contenir des informations de session.

## Aperçu local

Servir ce dossier avec un serveur HTTP statique, par exemple `python -m http.server 8000`, puis ouvrir http://localhost:8000. L'ouverture directe en `file://` ne permet pas le chargement du catalogue JSON.
