'use client';

import { FormEvent, useState } from 'react';
import { FiTarget } from 'react-icons/fi';

export default function LoginForm() {
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setPending(true);

    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.get('username'),
          password: formData.get('password'),
        }),
      });

      if (response.status === 401) {
        setError('Identifiant ou mot de passe incorrect. Vérifiez les valeurs AUTH_USERNAME et AUTH_PASSWORD de votre fichier .env.local.');
        setPending(false);
        return;
      }
      if (response.status === 429) {
        setError('Trop de tentatives. Réessayez dans 15 minutes.');
        setPending(false);
        return;
      }
      if (response.status === 503) {
        setError('Configuration d’authentification manquante. Vérifiez AUTH_USERNAME, AUTH_PASSWORD et SESSION_SECRET, puis redémarrez le serveur.');
        setPending(false);
        return;
      }
      if (!response.ok) throw new Error('Login failed');
      window.location.assign('/');
    } catch {
      setError('Serveur inaccessible. Vérifiez que npm run dev est toujours actif.');
      setPending(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <span className="login-mark"><FiTarget /></span>
        <p className="eyebrow">ESPACE PRIVÉ · CAP.</p>
        <h1>Bon retour.</h1>
        <p>Connectez-vous pour accéder à vos objectifs.</p>

        <form onSubmit={handleSubmit}>
          <label className="field-label">
            <span>Identifiant</span>
            <input
              autoComplete="username"
              className="text-input"
              name="username"
              required
            />
          </label>
          <label className="field-label">
            <span>Mot de passe</span>
            <input
              autoComplete="current-password"
              className="text-input"
              name="password"
              required
              type="password"
            />
          </label>
          {error && <p className="login-error" role="alert">{error}</p>}
          <button
            className="button-primary"
            disabled={pending}
            type="submit"
          >
            {pending ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </section>
    </main>
  );
}