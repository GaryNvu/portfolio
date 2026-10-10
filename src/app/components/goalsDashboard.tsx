'use client';

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { FiArrowDown, FiArrowUp, FiCheck, FiEdit2, FiImage, FiPlus, FiTarget, FiTrendingUp, FiX } from 'react-icons/fi';
import LogoutButton from './logoutButton';

type Goal = {
  id: string;
  title: string;
  target: number;
  saved: number;
  image: string;
  updatedAt: number;
};

type GoalForm = Omit<Goal, 'id' | 'updatedAt'>;
type SortMode = 'recent' | 'name' | 'progress' | 'target';

const STORAGE_KEY = 'cap-goals-v1';
const currency = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

function formatAmount(amount: number) {
  return currency.format(amount);
}

function percent(goal: Goal) {
  return goal.target > 0 ? Math.min(100, Math.round((goal.saved / goal.target) * 100)) : 0;
}

function resizeImage(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Lecture de l’image impossible.'));
    reader.onload = () => {
      const image = new window.Image();
      image.onerror = () => reject(new Error('Image invalide.'));
      image.onload = () => {
        const scale = Math.min(1, 1200 / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        const context = canvas.getContext('2d');
        if (!context) return reject(new Error('Traitement de l’image impossible.'));
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

function ProgressVisual({ goal, mode }: { goal: Goal; mode: 'bar' | 'donut' }) {
  const value = percent(goal);

  if (mode === 'donut') {
    return (
      <div className="goal-pie" style={{ '--progress': `${value}%` } as React.CSSProperties} role="img" aria-label={`${value} % atteint`}>
      </div>
    );
  }

  return (
    <div className="progress-block">
      <div className="progress-track" role="progressbar" aria-label={`Progression de ${goal.title}`} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <span style={{ width: `${value}%` }} />
      </div>
      <span className="progress-percent">{value}%</span>
    </div>
  );
}

function GoalDialog({
  initialGoal,
  onClose,
  onSave,
}: {
  initialGoal: Goal | null;
  onClose: () => void;
  onSave: (form: GoalForm) => Promise<void>;
}) {
  const [title, setTitle] = useState(initialGoal?.title ?? '');
  const [target, setTarget] = useState(initialGoal ? String(initialGoal.target) : '');
  const [saved, setSaved] = useState(initialGoal ? String(initialGoal.saved) : '0');
  const [image, setImage] = useState(initialGoal?.image ?? '');
  const [imageError, setImageError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageError('');
    try {
      setImage(await resizeImage(file));
    } catch {
      setImageError('Cette image n’a pas pu être chargée.');
    }
    event.target.value = '';
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setSaveError('');
    try {
      await onSave({ title: title.trim(), target: Number(target), saved: Number(saved), image });
    } catch {
      setSaveError('Enregistrement impossible. Vérifiez la connexion à la base puis réessayez.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section aria-labelledby="goal-dialog-title" aria-modal="true" className="goal-dialog" role="dialog">
        <div className="dialog-heading">
          <div>
            <p className="eyebrow">OBJECTIF D’ÉPARGNE</p>
            <h2 id="goal-dialog-title">{initialGoal ? 'Modifier l’objectif' : 'Nouvel objectif'}</h2>
          </div>
          <button aria-label="Fermer" className="icon-button dialog-close" onClick={onClose} type="button"><FiX /></button>
        </div>

        <form className="goal-form" onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="goal-title">Nom de l’objectif</label>
          <input autoFocus className="text-input" id="goal-title" maxLength={70} onChange={(event) => setTitle(event.target.value)} placeholder="Ex. Voyage au Japon" required value={title} />

          <div className="amount-fields">
            <label className="field-label" htmlFor="goal-target">Montant final (€)
              <input className="text-input" id="goal-target" min="1" onChange={(event) => setTarget(event.target.value)} placeholder="3 000" required step="0.01" type="number" value={target} />
            </label>
            <label className="field-label" htmlFor="goal-saved">Déjà épargné (€)
              <input className="text-input" id="goal-saved" min="0" onChange={(event) => setSaved(event.target.value)} placeholder="0" required step="0.01" type="number" value={saved} />
            </label>
          </div>

          <div className="image-field">
            <span className="field-label">Image de l’objectif <span className="field-optional">(facultatif)</span></span>
            <label className="image-picker">
              {image ? <img alt="Aperçu de l’objectif" className="image-preview" src={image} /> : <span className="image-placeholder"><FiImage /><span>Ajouter une image</span></span>}
              <input accept="image/*" onChange={handleImageChange} type="file" />
              {image && <span className="image-change">Changer</span>}
            </label>
            {imageError && <p className="form-error" role="alert">{imageError}</p>}
            {image && <button className="text-action" onClick={() => setImage('')} type="button">Retirer l’image</button>}
          </div>

          <div className="dialog-actions">
            <button className="button-secondary" onClick={onClose} type="button">Annuler</button>
            <button className="button-primary" disabled={saving} type="submit"><FiCheck />{saving ? 'Enregistrement...' : initialGoal ? 'Enregistrer' : 'Créer l’objectif'}</button>
          </div>
          {saveError && <p className="form-error" role="alert">{saveError}</p>}
        </form>
      </section>
    </div>
  );
}

export default function GoalsDashboard() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [dialogGoal, setDialogGoal] = useState<Goal | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [view, setView] = useState<'bar' | 'donut'>('bar');
  const [sort, setSort] = useState<SortMode>('recent');

  useEffect(() => {
    let active = true;

    async function loadGoals() {
      try {
        const response = await fetch('/api/goals');
        if (!response.ok) throw new Error('Database request failed');
        let loadedGoals = await response.json() as Goal[];

        if (loadedGoals.length === 0) {
          const stored = window.localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const legacyGoals: unknown = JSON.parse(stored);
            if (Array.isArray(legacyGoals)) {
              const importedGoals: Goal[] = [];
              for (const legacyGoal of legacyGoals) {
                if (!legacyGoal || typeof legacyGoal.title !== 'string') continue;
                const importResponse = await fetch('/api/goals', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    title: legacyGoal.title,
                    target: legacyGoal.target,
                    saved: legacyGoal.saved,
                    image: legacyGoal.image ?? '',
                  }),
                });
                if (!importResponse.ok) throw new Error('Legacy data import failed');
                importedGoals.push(await importResponse.json() as Goal);
              }
              if (importedGoals.length > 0) {
                loadedGoals = importedGoals;
                window.localStorage.removeItem(STORAGE_KEY);
              }
            }
          }
        }

        if (active) {
          setGoals(loadedGoals);
          setLoadError('');
        }
      } catch {
        if (active) setLoadError('Impossible de charger les objectifs. Vérifiez la configuration DATABASE_URL et les migrations Prisma.');
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void loadGoals();
    return () => { active = false; };
  }, []);

  const sortedGoals = useMemo(() => [...goals].sort((first, second) => {
    if (sort === 'name') return first.title.localeCompare(second.title, 'fr');
    if (sort === 'progress') return percent(second) - percent(first);
    if (sort === 'target') return second.target - first.target;
    return second.updatedAt - first.updatedAt;
  }), [goals, sort]);

  const totals = useMemo(() => {
    const saved = goals.reduce((sum, goal) => sum + goal.saved, 0);
    const target = goals.reduce((sum, goal) => sum + goal.target, 0);
    return { saved, target, percent: target ? Math.min(100, Math.round((saved / target) * 100)) : 0 };
  }, [goals]);

  async function saveGoal(form: GoalForm) {
    const response = await fetch(dialogGoal ? `/api/goals/${encodeURIComponent(dialogGoal.id)}` : '/api/goals', {
      method: dialogGoal ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!response.ok) throw new Error('Unable to save savings goal');

    const savedGoal = await response.json() as Goal;
    setGoals((current) => dialogGoal
      ? current.map((goal) => goal.id === savedGoal.id ? savedGoal : goal)
      : [savedGoal, ...current]);
    setDialogGoal(null);
    setIsCreating(false);
  }

  const showDialog = isCreating || Boolean(dialogGoal);

  return (
    <main className="dashboard-shell">
      <header className="app-header">
        <a aria-label="Cap, accueil" className="brand" href="/">
          <span className="brand-mark"><FiTarget /></span>
          <span>cap<span className="brand-period">.</span></span>
        </a>
        <div className="header-right">
          <span className="private-indicator"><span />ESPACE PRIVÉ</span>
          <LogoutButton />
        </div>
      </header>

      <div className="dashboard-content">
        <section className="dashboard-heading">
          <div>
            <p className="eyebrow">VOTRE ÉPARGNE, EN CLAIR</p>
            <h1>Mes objectifs</h1>
            <p className="heading-description">Chaque projet avance à son rythme. Voici où vous en êtes.</p>
          </div>
          <button className="button-primary add-goal-button" onClick={() => setIsCreating(true)} type="button"><FiPlus /><span>Nouvel objectif</span></button>
        </section>

        <section aria-label="Résumé de l’épargne" className="summary-grid">
          <article className="summary-item">
            <span className="summary-icon"><FiTarget /></span>
            <div><p className="summary-label">Objectifs actifs</p><p className="summary-value">{goals.length}<span> projet{goals.length > 1 ? 's' : ''}</span></p></div>
          </article>
          <article className="summary-item">
            <span className="summary-icon"><FiTrendingUp /></span>
            <div><p className="summary-label">Déjà mis de côté</p><p className="summary-value">{formatAmount(totals.saved)}</p></div>
          </article>
          <article className="summary-item summary-total">
            <span className="summary-icon"><FiCheck /></span>
            <div><p className="summary-label">Progression globale</p><p className="summary-value">{totals.percent}<span> %</span></p></div>
            <div aria-hidden="true" className="summary-track"><span style={{ width: `${totals.percent}%` }} /></div>
          </article>
        </section>

        <section className="goals-section">
          <div className="section-toolbar">
            <div className="section-title-group"><h2>Tous les objectifs</h2><span className="goal-count">{goals.length}</span></div>
            <div className="toolbar-controls">
              <div aria-label="Type de visualisation" className="view-switch" role="group">
                <button aria-pressed={view === 'bar'} className={view === 'bar' ? 'selected' : ''} onClick={() => setView('bar')} type="button"><span className="bar-glyph" />Barres</button>
                <button aria-pressed={view === 'donut'} className={view === 'donut' ? 'selected' : ''} onClick={() => setView('donut')} type="button"><span className="donut-glyph" />Camembert</button>
              </div>
              <label className="sort-control">
                <span className="sort-label">Trier par</span>
                <select aria-label="Trier les objectifs" onChange={(event) => setSort(event.target.value as SortMode)} value={sort}>
                  <option value="recent">Récemment modifiés</option>
                  <option value="name">Nom</option>
                  <option value="progress">Progression</option>
                  <option value="target">Montant cible</option>
                </select>
                {sort === 'name' || sort === 'target' ? <FiArrowUp className="sort-arrow" /> : <FiArrowDown className="sort-arrow" />}
              </label>
            </div>
          </div>

          {isLoading ? (
            <div className="empty-state" role="status"><p className="eyebrow">CHARGEMENT</p><h3>Vos objectifs arrivent.</h3></div>
          ) : loadError ? (
            <div className="empty-state" role="alert"><p className="eyebrow">CONNEXION À LA BASE</p><h3>Les objectifs ne sont pas accessibles.</h3><p>{loadError}</p><button className="button-secondary" onClick={() => window.location.reload()} type="button">Réessayer</button></div>
          ) : sortedGoals.length === 0 ? (
            <div className="empty-state">
              <div aria-hidden="true" className="empty-mark"><FiTarget /></div>
              <p className="eyebrow">TOUT COMMENCE ICI</p>
              <h3>Un projet en tête ?</h3>
              <p>Créez votre premier objectif et donnez une forme concrète à votre épargne.</p>
              <button className="button-primary" onClick={() => setIsCreating(true)} type="button"><FiPlus />Créer mon premier objectif</button>
            </div>
          ) : (
            <div className="goal-grid">
              {sortedGoals.map((goal, index) => {
                const progress = percent(goal);
                return (
                  <article className="goal-card" key={goal.id} style={{ animationDelay: `${Math.min(index * 55, 330)}ms` }}>
                    <div className="goal-image-wrap">
                      {goal.image ? <img alt="" className="goal-image" src={goal.image} /> : <div className="goal-image-empty"><FiTarget /><span>OBJECTIF</span></div>}
                      {progress === 100 && <span className="complete-tag"><FiCheck /> Atteint</span>}
                      <button aria-label={`Modifier ${goal.title}`} className="icon-button card-edit" onClick={() => setDialogGoal(goal)} title="Modifier l’objectif" type="button"><FiEdit2 /></button>
                    </div>
                    <div className="goal-card-content">
                      <div className="goal-title-row"><h3>{goal.title}</h3><span className="goal-percent">{progress}<small>%</small></span></div>
                      <ProgressVisual goal={goal} mode={view} />
                      <div className="goal-amounts"><span>{formatAmount(goal.saved)} <small>épargnés</small></span><span>sur {formatAmount(goal.target)}</span></div>
                      <button className="edit-link" onClick={() => setDialogGoal(goal)} type="button"><FiEdit2 />Modifier les montants</button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <footer className="dashboard-footer"><span>CAP<span className="brand-period">.</span></span><span>Vos projets, votre rythme.</span></footer>
      </div>

      {showDialog && <GoalDialog initialGoal={dialogGoal} onClose={() => { setDialogGoal(null); setIsCreating(false); }} onSave={saveGoal} />}
    </main>
  );
}