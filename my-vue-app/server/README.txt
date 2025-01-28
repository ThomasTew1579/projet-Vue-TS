
# API Documentation - AuthUser

Ce fichier contient les commandes pour tester les fonctionnalités de l'API `AuthUser`. Utilisez `curl` pour exécuter les commandes depuis votre terminal.

---

## 1. Inscription (Signup)

Créez un nouvel utilisateur avec un nom d'utilisateur, un mot de passe, un nom, une adresse e-mail et un rôle (par défaut : `user`).

### Commande :
curl -X POST -H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "password123", "name": "John Doe", "email": "johndoe@example.com"}' \
http://localhost:3000/auth/signup

### Réponses possibles :
- **Succès** : `User registered successfully`
- **Erreur** : `Username already exists`

---

## 2. Connexion (Login)

Connectez un utilisateur existant pour recevoir un token JWT.

### Commande :
curl -X POST -H "Content-Type: application/json" \
-d '{"username": "testuser", "password": "password123"}' \
http://localhost:3000/auth/login

### Réponses possibles :
- **Succès** : Un token JWT (par exemple, `"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`)
- **Erreur** : `Invalid credentials`

---

## 3. Liste des utilisateurs

Récupérez la liste de tous les utilisateurs. Cette route est protégée et nécessite un token JWT.

### Commande :
curl -X GET -H "Authorization: Bearer <TOKEN>" \
http://localhost:3000/auth/users

### Réponses possibles :
- **Succès** : Une liste d'utilisateurs (exemple) :
  ```
  [
      {
          "id": 1,
          "username": "testuser",
          "name": "John Doe",
          "email": "johndoe@example.com",
          "role": "user"
      }
  ]
  ```
- **Erreur** : `Access denied. No token provided.`

---

## 4. Détail d’un utilisateur

Récupérez les informations d’un utilisateur spécifique par son ID.

### Commande :
curl -X GET -H "Authorization: Bearer <TOKEN>" \
http://localhost:3000/auth/users/1

### Réponses possibles :
- **Succès** : 
  ```
  {
      "id": 1,
      "username": "testuser",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "role": "user"
  }
  ```
- **Erreur** : `User not found`

---

## 5. Supprimer un utilisateur (admin uniquement)

Supprimez un utilisateur par son ID. Cette route est protégée par un rôle : seul un utilisateur `admin` peut effectuer cette action.

### Commande :
curl -X DELETE -H "Authorization: Bearer <TOKEN>" \
http://localhost:3000/auth/users/1

### Réponses possibles :
- **Succès** : `User deleted`
- **Erreur** : 
  - `User not found` si l'utilisateur n'existe pas.
  - `Access denied. Insufficient permissions.` si l'utilisateur connecté n'est pas un admin.

---

## Notes

1. Remplacez `<TOKEN>` par le token JWT obtenu via la commande de connexion.
2. Les routes protégées nécessitent un token JWT valide.
3. Les rôles disponibles sont `admin` et `user`.

---

Bonne utilisation de l'API !
