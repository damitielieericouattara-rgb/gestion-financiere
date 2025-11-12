# 📊 Application de Gestion Financière - Documentation Front-End

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Structure du projet](#structure-du-projet)
3. [Pages et fonctionnalités](#pages-et-fonctionnalités)
4. [Installation et déploiement](#installation-et-déploiement)
5. [Intégration avec le back-end PHP](#intégration-avec-le-back-end-php)
6. [Guide d'utilisation](#guide-dutilisation)
7. [Personnalisation](#personnalisation)

---

## 🎯 Vue d'ensemble

Cette application web permet de gérer les mouvements financiers (entrées et sorties) d'une entreprise avec :
- **Deux rôles** : Utilisateur et Administrateur
- **Interface responsive** adaptée mobile, tablette et desktop
- **Design moderne** avec TailwindCSS
- **JavaScript vanilla** (pas de framework)
- **Prêt pour l'intégration PHP/MySQL**

### ✨ Fonctionnalités principales

#### Pour les utilisateurs :
- ✅ Soumettre des demandes de transactions
- 📊 Consulter l'historique de leurs transactions
- 📥 Télécharger les reçus validés
- 👤 Gérer leur profil

#### Pour les administrateurs :
- ✅ Valider ou refuser les transactions
- 💰 Suivre le solde global
- 📈 Visualiser les statistiques (tableaux de bord)
- 👥 Gérer les utilisateurs
- 📜 Consulter l'historique complet
- 📄 Générer des reçus

---

## 📁 Structure du projet

```
/frontend
├── assets/
│   ├── css/
│   │   ├── tailwind.css (via CDN)
│   │   └── style.css (styles personnalisés)
│   ├── js/
│   │   └── main.js (logique JavaScript)
│   └── img/
│       └── logo.png (logo de l'entreprise)
├── login.html (page de connexion)
├── profil.html (gestion du profil)
├── transaction_form.html (nouvelle transaction)
├── mes_transactions.html (liste des transactions utilisateur)
├── dashboard_admin.html (tableau de bord admin)
├── validation_admin.html (validation des transactions)
├── historique.html (historique complet)
├── gestion_utilisateurs.html (gestion des utilisateurs)
├── recu.html (reçu imprimable)
└── README.md (ce fichier)
```

---

## 📄 Pages et fonctionnalités

### 1. **login.html** - Page de connexion
- Formulaire de connexion (login + mot de passe)
- Redirection automatique selon le rôle
- Message d'erreur en cas d'échec
- Design centré et minimaliste

**À intégrer avec PHP :**
```javascript
// Remplacer la simulation par :
fetch('api/login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password })
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        sessionStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = data.user.role === 'admin' 
            ? 'dashboard_admin.html' 
            : 'mes_transactions.html';
    }
});
```

### 2. **profil.html** - Gestion du profil
- Affichage et modification des informations personnelles
- Changement de mot de passe
- Validation côté client

### 3. **transaction_form.html** - Nouvelle transaction
- Formulaire avec choix du type (entrée/sortie)
- Saisie du montant et du motif
- Validation avant soumission
- Message de confirmation

### 4. **mes_transactions.html** - Transactions utilisateur
- Liste des transactions avec statut coloré
- Statistiques rapides (en attente, validées, refusées)
- Téléchargement des reçus validés
- Filtrage par statut

### 5. **dashboard_admin.html** - Tableau de bord administrateur
- Affichage du solde global
- Statistiques du jour et du mois
- Graphique d'évolution (Chart.js)
- Liens rapides vers les actions principales

### 6. **validation_admin.html** - Validation des transactions
- Liste des transactions en attente
- Boutons Valider/Refuser avec confirmation
- Mise à jour en temps réel
- Messages de succès/erreur

### 7. **historique.html** - Historique complet
- Filtres avancés (date, type, statut, utilisateur)
- Statistiques filtrées
- Export PDF (à implémenter en PHP)
- Tableau paginé

### 8. **gestion_utilisateurs.html** - Gestion des utilisateurs
- Liste complète des utilisateurs
- Ajout, modification, suppression
- Gestion des rôles
- Modal pour l'édition

### 9. **recu.html** - Reçu officiel
- Design professionnel imprimable
- Toutes les informations de la transaction
- Boutons Imprimer/Télécharger PDF
- Signature et cachet

---

## 🚀 Installation et déploiement

### Étape 1 : Copier les fichiers
```bash
# Créer la structure
mkdir -p frontend/assets/css frontend/assets/js frontend/assets/img

# Copier tous les fichiers HTML à la racine de frontend/
# Copier style.css dans assets/css/
# Copier main.js dans assets/js/
# Ajouter votre logo dans assets/img/logo.png
```

### Étape 2 : Ouvrir dans un navigateur
```bash
# Méthode 1 : Ouvrir directement
open frontend/login.html

# Méthode 2 : Utiliser un serveur local
cd frontend
python -m http.server 8000
# Puis ouvrir http://localhost:8000/login.html

# Méthode 3 : Avec PHP
php -S localhost:8000
```

### Étape 3 : Tester les pages
1. **login.html** - Entrer n'importe quel login/mot de passe
2. Si le login contient "admin" → redirection vers dashboard_admin.html
3. Sinon → redirection vers mes_transactions.html

---

## 🔌 Intégration avec le back-end PHP

### Structure PHP recommandée

```
/backend
├── api/
│   ├── login.php
│   ├── transactions.php
│   ├── users.php
│   └── validation.php
├── config/
│   └── database.php
├── models/
│   ├── User.php
│   └── Transaction.php
└── utils/
    └── auth.php
```

### Exemple d'intégration : Soumission de transaction

**Front-end (transaction_form.html) :**
```javascript
document.getElementById('transactionForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        type: document.querySelector('input[name="type"]:checked').value,
        montant: document.getElementById('montant').value,
        motif: document.getElementById('motif').value
    };
    
    try {
        const response = await fetch('api/transactions.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage('Transaction soumise avec succès !', 'success');
            setTimeout(() => window.location.href = 'mes_transactions.html', 2000);
        } else {
            showMessage(data.message, 'error');
        }
    } catch (error) {
        showMessage('Erreur de connexion au serveur', 'error');
    }
});
```

**Back-end (api/transactions.php) :**
```php
<?php
header('Content-Type: application/json');
require_once '../config/database.php';
require_once '../utils/auth.php';

// Vérifier l'authentification
$user = checkAuth();
if (!$user) {
    echo json_encode(['success' => false, 'message' => 'Non authentifié']);
    exit;
}

// Récupérer les données
$data = json_decode(file_get_contents('php://input'), true);

// Valider les données
if (!isset($data['type']) || !isset($data['montant']) || !isset($data['motif'])) {
    echo json_encode(['success' => false, 'message' => 'Données manquantes']);
    exit;
}

// Insérer dans la base de données
$stmt = $pdo->prepare("
    INSERT INTO transactions (user_id, type, montant, motif, statut, date_creation) 
    VALUES (?, ?, ?, ?, 'en attente', NOW())
");

if ($stmt->execute([$user['id'], $data['type'], $data['montant'], $data['motif']])) {
    echo json_encode(['success' => true, 'message' => 'Transaction créée']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erreur de base de données']);
}
?>
```

### Points d'intégration clés

| Page | Endpoint PHP | Méthode | Données |
|------|-------------|---------|---------|
| login.html | api/login.php | POST | login, password |
| transaction_form.html | api/transactions.php | POST | type, montant, motif |
| mes_transactions.html | api/transactions.php?user_id=X | GET | - |
| validation_admin.html | api/validation.php | POST | transaction_id, action |
| historique.html | api/transactions.php?filters | GET | date, type, statut |
| gestion_utilisateurs.html | api/users.php | GET/POST/PUT/DELETE | user data |

---

## 📖 Guide d'utilisation

### Pour les utilisateurs

1. **Se connecter**
   - Ouvrir login.html
   - Entrer identifiant et mot de passe
   - Cliquer sur "Se connecter"

2. **Soumettre une transaction**
   - Cliquer sur "Nouvelle Transaction"
   - Choisir le type (Entrée ou Sortie)
   - Saisir le montant et le motif
   - Cliquer sur "Soumettre"

3. **Consulter ses transactions**
   - Aller sur "Mes Transactions"
   - Voir le statut de chaque transaction
   - Télécharger les reçus validés

### Pour les administrateurs

1. **Accéder au tableau de bord**
   - Se connecter avec un compte admin
   - Voir le solde global et les statistiques
   - Consulter le graphique d'évolution

2. **Valider une transaction**
   - Aller sur "Validation"
   - Voir la liste des transactions en attente
   - Cliquer sur "Valider" ou "Refuser"
   - Confirmer l'action

3. **Gérer les utilisateurs**
   - Aller sur "Utilisateurs"
   - Cliquer sur "Ajouter un utilisateur"
   - Remplir le formulaire
   - Enregistrer

---

## 🎨 Personnalisation

### Modifier les couleurs

Dans **style.css**, changez les variables de couleur :

```css
/* Remplacer le vert par une autre couleur */
.bg-green-500 { background-color: #votre-couleur; }
.text-green-600 { color: #votre-couleur; }
```

Ou utilisez les utilitaires Tailwind avec d'autres couleurs :
- `bg-blue-500`, `bg-purple-500`, `bg-indigo-500`, etc.

### Ajouter un logo

Remplacez **assets/img/logo.png** par votre logo d'entreprise (recommandé : 200x80px, PNG avec fond transparent).

### Modifier les statistiques du tableau de bord

Dans **dashboard_admin.html**, modifiez les données du graphique Chart.js :

```javascript
datasets: [{
    label: 'Entrées',
    data: [400000, 350000, ...], // Vos données
    borderColor: 'rgb(34, 197, 94)',
    ...
}]
```

### Changer la devise

Dans **main.js**, modifiez la fonction `formatCurrency` :

```javascript
function formatCurrency(amount) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR', // Changer en EUR, USD, etc.
        minimumFractionDigits: 2
    });
}
```

---

## 🐛 Résolution de problèmes

### Le logo ne s'affiche pas
- Vérifier que le fichier existe : `assets/img/logo.png`
- Vérifier les permissions du fichier
- Utiliser le chemin relatif correct

### Les styles ne s'appliquent pas
- Vérifier que TailwindCSS est bien chargé (CDN)
- Vérifier le chemin vers `style.css`
- Ouvrir la console développeur (F12)

### Les graphiques ne s'affichent pas
- Vérifier que Chart.js est bien chargé
- Ouvrir la console pour voir les erreurs JavaScript

### Déconnexion automatique
- Le timer d'inactivité est réglé sur 30 minutes
- Modifier `INACTIVITY_TIMEOUT` dans `main.js`

---

## 📝 Notes importantes

1. **Sécurité** : Cette version est un front-end de démonstration. En production :
   - Implémenter l'authentification JWT ou sessions PHP
   - Valider toutes les données côté serveur
   - Utiliser HTTPS
   - Hacher les mots de passe (bcrypt)

2. **Données simulées** : Toutes les données sont actuellement simulées en JavaScript. Remplacez-les par des appels PHP réels.

3. **Responsive** : L'application est entièrement responsive, testée sur :
   - Desktop (1920x1080)
   - Tablette (768x1024)
   - Mobile (375x667)

4. **Navigateurs supportés** :
   - Chrome/Edge (version récente)
   - Firefox (version récente)
   - Safari (version récente)

---

## 📞 Support

Pour toute question ou problème :
1. Consulter cette documentation
2. Vérifier la console développeur (F12)
3. Contacter l'équipe de développement

---

**Version** : 1.0  
**Date** : Novembre 2025  
**Technologies** : HTML5, CSS3 (TailwindCSS), JavaScript (ES6+), Chart.js