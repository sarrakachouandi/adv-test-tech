This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More
# Documentation du Projet

## Vue d'ensemble

Ce projet utilise **MongoDB** pour le stockage des données et **Google Cloud** pour l'authentification via OAuth. Il est essentiel de configurer correctement votre environnement local pour vous connecter au cluster MongoDB et authentifier à l'aide des services Google.

## Connexion à MongoDB

L'application se connecte à un cluster MongoDB hébergé sur MongoDB Atlas. Pour configurer votre connexion, suivez ces étapes :

1. **Créer un compte MongoDB Atlas** : Si vous ne l'avez pas déjà fait, inscrivez-vous pour un compte sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2. **Créer un cluster** : Une fois connecté, créez un nouveau cluster et configurez-le selon vos besoins.

3. **Obtenir la chaîne de connexion** : 
   - Après avoir configuré votre cluster, accédez à l'onglet "Base de données".
   - Cliquez sur "Connecter" et sélectionnez "Connecter votre application".
   - Copiez la chaîne de connexion fournie, qui ressemblera à ceci :

     ```
     mongodb+srv://<username>:<password>@<cluster-url>/test?retryWrites=true&w=majority
     ```

4. **Remplacer le nom d'utilisateur et le mot de passe** : Remplacez `<username>` et `<password>` par vos identifiants MongoDB Atlas.

## Configuration de Google Cloud

Le projet utilise **Google Cloud** pour l'authentification OAuth. Suivez ces étapes pour configurer vos identifiants Google Cloud :

1. **Créer un projet Google Cloud** : Visitez la [Console Google Cloud](https://console.cloud.google.com/) et créez un nouveau projet.

2. **Activer l'écran de consentement OAuth** : Accédez à la section "APIs & Services" et configurez l'écran de consentement OAuth.

3. **Créer des identifiants OAuth 2.0** :
   - Allez dans "Identifiants" et cliquez sur "Créer des identifiants".
   - Sélectionnez "ID client OAuth 2.0" et configurez-le pour votre type d'application (Application web).
   - Ajoutez les URI de redirection de votre application. Pour ce projet, l'URI de redirection est :

     ```
     http://localhost:3000/api/auth/callback/google
     ```

4. **Obtenir vos identifiants** : Copiez l'`ID client` et le `Secret client` fournis après la création des identifiants.

## Variables d'environnement

Pour garder vos informations sensibles sécurisées, vous devrez créer un fichier `.env.local` à la racine de votre projet. Le fichier `.env.local` doit contenir le format suivant :

MONGO_URI=mongodb+srv://<username>:<password>@testtech.kfapa.mongodb.net/ 
GOOGLE_CLIENT_ID=<votre_id_client_google>
GOOGLE_CLIENT_SECRET=<votre_secret_client_google>
NEXTAUTH_SECRET=<votre_secret_nextauth> 
NEXTAUTH_URL=http://localhost:3000

> **Important** : Assurez-vous d'ajouter `.env.local` à votre fichier `.gitignore` pour éviter qu'il soit suivi par Git. Cela est crucial pour garder vos identifiants privés.

## Conclusion

En suivant ces étapes, vous devriez être en mesure de vous connecter avec succès au cluster MongoDB et de configurer l'authentification Google Cloud pour votre application. Si vous rencontrez des problèmes, veuillez vous référer à la documentation respective de [MongoDB](https://docs.mongodb.com/) et de [Google Cloud](https://cloud.google.com/docs) pour obtenir une assistance supplémentaire.
