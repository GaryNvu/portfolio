"use client";

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await emailjs.send(
        'service_pzp3z9p',
        'template_91gl9ng',
        {
          to_email: 'garyneveu14@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'i7h64O7NDJfHRRhxC'
      );
      setStatus('Message envoyé avec succès !');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          {t('contact.name')}
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full p-3 rounded-lg bg-background border-2 border-primary focus:border-primary-light outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          {t('contact.email')}
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full p-3 rounded-lg bg-background border-2 border-primary focus:border-primary-light outline-none transition-colors"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {t('contact.message')}
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          rows={5}
          className="w-full p-3 rounded-lg bg-background border-2 border-primary focus:border-primary-light outline-none transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full button-primary-light py-3 rounded-lg hover:bg-primary transition-colors"
      >
        {t('contact.send')}
      </button>

      {status && (
        <p className={`text-center ${status.includes('succès') ? 'text-green-500' : 'text-red-500'}`}>
          {status}
        </p>
      )}
    </form>
  );
}