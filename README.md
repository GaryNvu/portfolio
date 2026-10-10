# Cap. — Objectifs d’épargne

Application privée pour créer et suivre des objectifs d’épargne. Les objectifs peuvent être triés et visualisés en barres ou en camembert; leur titre, leur image et leurs montants sont modifiables depuis leur carte.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentification privée

L'application est protégée par un compte unique. Configurez ces variables dans `.env.local` pour le développement et dans les variables d'environnement de Vercel pour le déploiement :

- `DATABASE_URL` : chaîne de connexion PostgreSQL utilisée par Prisma
- `PRISMA_DATABASE_URL` : connexion directe fournie par Prisma Postgres et utilisée par les migrations
- `AUTH_USERNAME` : identifiant privé
- `AUTH_PASSWORD` : mot de passe long et unique
- `SESSION_SECRET` : secret aléatoire d'au moins 32 caractères

`SESSION_SECRET` peut être généré avec `openssl rand -base64 32`. Ne commitez jamais `.env.local`. Les sessions sont signées, stockées dans un cookie HTTP-only et expirent après sept jours.

Pour connecter une base Prisma Postgres Vercel, configurez les valeurs `DATABASE_URL` et `PRISMA_DATABASE_URL` fournies par Vercel. La première sert aux requêtes de l'application et la seconde aux migrations. Les valeurs restent dans les variables d'environnement, jamais dans le dépôt. Une fois les deux variables configurées, lancez `npm run db:deploy`; le script `vercel-build` applique automatiquement les migrations en déploiement.

Les objectifs sont lus et écrits dans PostgreSQL par des routes API protégées par la session. Les montants sont conservés en centimes et les images compressées sont stockées dans la base. Les objectifs de l'ancienne version présents dans le navigateur sont importés une seule fois au premier chargement si la base est vide.

La limitation intégrée des tentatives est locale au processus et ne constitue pas une limite partagée entre les instances serverless. En production, activez aussi une règle de limitation de débit sur le chemin `/api/auth/login` dans Vercel Firewall.