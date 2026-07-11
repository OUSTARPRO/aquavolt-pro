# 🍕 Démo Pizzeria — Guide de personnalisation

Site vitrine **one-page** pour pizzeria, avec **panier interactif** et **commande envoyée directement sur WhatsApp**. Un seul fichier (`index.html`), aucune installation, aucun hébergement complexe : parfait pour une démo client.

## Comment envoyer la démo au client

1. Envoyez simplement le fichier `index.html` (ou hébergez-le gratuitement sur Netlify Drop / GitHub Pages / Vercel).
2. Le client l'ouvre dans son navigateur : tout fonctionne, même sans internet (sauf les images et polices).

## Personnalisation en 2 minutes

Tout se configure en haut du `<script>` à la fin du fichier :

```js
const CONFIG = {
  nom: "Bella Napoli",        // Nom de la pizzeria
  whatsapp: "212600000000",   // Numéro WhatsApp (format international, sans + ni espaces)
  devise: "DH",               // Devise affichée
};
```

### Modifier la carte (pizzas, prix, photos)

Juste en dessous, le tableau `MENU` : chaque ligne = un plat.

```js
{ id:1, cat:"Classiques", nom:"Margherita", desc:"...", prix:55, img:"https://...", tag:"top" },
```

- `cat` : catégorie (les onglets se créent automatiquement)
- `prix` : nombre uniquement
- `img` : lien vers une photo (Unsplash utilisé pour la démo — remplacer par les vraies photos du client)
- `tag` (optionnel) : `"top"` (⭐ best-seller), `"hot"` (🌶 épicé), `"veg"` (🌿 végé)

### Autres textes à adapter

- Nom, adresse, téléphone et horaires : sections **Contact** et **footer** dans le HTML
- Bandeau promo en haut de page : `<div class="topbar">`
- Avis clients : section `#avis`

## Fonctionnalités incluses (arguments de vente)

- ✅ Panier interactif avec quantités et total automatique
- ✅ Commande envoyée sur WhatsApp, formatée et prête (plats, quantités, total)
- ✅ Bouton WhatsApp flottant sur toute la page
- ✅ Design premium sombre « feu de bois », animations au scroll, hero animé
- ✅ 100% responsive (mobile, tablette, desktop)
- ✅ SEO de base (title, description, favicon)
- ✅ Zéro dépendance, zéro frais mensuel de serveur

## Idées d'upsell après la démo

- Vraies photos professionnelles des pizzas
- Nom de domaine + hébergement (ex. `bellanapoli.ma`)
- Google Maps intégré + fiche Google Business
- Version arabe / multilingue
- Programme de fidélité ou codes promo
