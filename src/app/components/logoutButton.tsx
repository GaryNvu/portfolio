'use client';

import { useState } from 'react';

export default function LogoutButton() {
  const [pending, setPending] = useState(false);

  async function logout() {
    setPending(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.assign('/login');
  }

  return (
    <button
      className="logout-button"
      disabled={pending}
      onClick={logout}
      type="button"
    >
      {pending ? '...' : 'Déconnexion'}
    </button>
  );
}