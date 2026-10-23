# Béjaïa Tour Guide

> Un guide touristique moderne et interactif pour **Béjaïa** — la perle de la Méditerranée.
> Explorez l'histoire de la ville, découvrez ses plus beaux lieux, sauvegardez vos favoris, planifiez votre voyage et partagez votre expérience avec la communauté.

![Version](https://img.shields.io/badge/version-2.1.0-009afa?style=for-the-badge)
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-42b883?style=for-the-badge&logo=vue.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

---

## Table des matières

- [À propos du projet](#à-propos-du-projet)
- [Version 2.1 — Nouveautés](#version-21--nouveautés)
- [Fonctionnalités existantes](#fonctionnalités-existantes)
- [Stack technique](#stack-technique)
- [Structure du projet](#structure-du-projet)
- [Démarrage](#démarrage)
- [Variables d'environnement](#variables-denvironnement)
- [Feuille de route](#feuille-de-route)
- [Auteur](#auteur)
- [Remerciements](#remerciements)
- [Licence](#licence)

---

## À propos du projet

**Béjaïa Tour Guide** est un projet personnel, gratuit et à but non lucratif, réalisé par un étudiant en informatique passionné par sa ville. Il vise à aider les visiteurs à découvrir la beauté, l'histoire et la culture de Béjaïa à travers une expérience web moderne, immersive et intuitive.

Le site repose sur trois piliers :

1. **Découvrir** — une sélection soignée des lieux les plus emblématiques de Béjaïa.
2. **Apprendre** — une section dédiée à l'histoire, retraçant plus de 2000 ans de civilisation.
3. **Partager** — comptes utilisateurs, likes, sauvegardes, commentaires et profils personnalisés.

---

## Version 2.1 — Nouveautés

La V2.1 est la plus grande refonte du projet. Chaque écran a été reconstruit avec une esthétique sombre moderne, des animations fluides et une expérience utilisateur premium.

**Design**
Thème sombre premium (`#0d1117`) avec accent bleu océan (`#009afa`), effets de glassmorphism, typographie cohérente (`Smooch Sans` / `Inter`) et micro-animations fluides.

**Carte interactive**
Marqueur animé personnalisé, basculement Plan / Satellite, bouton "Itinéraire" vers Google Maps, popups et contrôles de zoom au thème sombre, zoom par défaut plus élevé.

**Page de détail d'un lieu**
Image hero cinématique avec bascule vers la carte, outils flottants (télécharger, copier, carte), barre d'actions élégante (J'aime, Commenter, Panier), description éditoriale, visionneuse d'image modale sans décalage de mise en page.

**Page Histoire**
Mise en page magazine avec alternance texte/image, apparitions au scroll, numéros en filigrane, ligne de temps verticale lumineuse.

**Profil**
Bannière cinématique avec fondu, avatar en chevauchement, statistiques en direct, carrousels style Netflix pour les lieux aimés et sauvegardés.

**Commentaires**
Champ de saisie style chat avec avatar, bouton d'envoi désactivé quand vide, cartes de messages élégantes, bouton supprimer contextuel.

**Filtres et navigation**
Barre de filtres en pilules sur desktop, overlay bottom-sheet sur mobile (`< 780px`), bouton unique affichant le filtre actif.

**Responsive mobile-first**
Chaque composant repensé pour téléphones, tablettes et ordinateurs. Cartes pleine largeur sur mobile, gestes optimisés, défilement naturel.

**Header et Footer**
Footer éditorial en 4 colonnes, soulignements animés au survol, logo en pastille arrondie, header sticky en verre avec état actif animé.
---

## Fonctionnalités existantes

Fonctionnalités déjà présentes avant la V2.1 :

- Base de données des lieux alimentée par Firebase (collection `places`)
- Lieux catégorisés — Plages, Historique, Villes, Cascades, Nature
- Authentification — inscription, connexion, persistance de session
- Système de likes — un like par utilisateur stocké dans Firestore
- Sauvegarde dans le panier — planifier ses futures visites
- Commentaires — fils de discussion par lieu avec données utilisateur
- Intégration de la carte Leaflet avec marqueurs et zones circulaires
- Téléchargement et partage d'images sur les pages de lieux
- Section Histoire avec contenu éditorial riche
- Page À propos avec mission, portfolio et remerciements
- Licence MIT et mention de conformité au droit d'auteur

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Vue 3 (Composition API + `<script setup>`) |
| Routeur | Vue Router 4 |
| Backend | Firebase Firestore |
| Authentification | Firebase Authentication |
| Cartes | Leaflet + OpenStreetMap + Esri Satellite |
| Icônes | @kalimahapps/vue-icons |
| Polices | Google Fonts — Smooch Sans, Inter, Playfair Display |
| Styles | CSS scoped + variables CSS |
| Build | Vite |
| Hébergement | Netlify |



