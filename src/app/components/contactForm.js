"use client";

import { FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_email: 'garyneveu14@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'YOUR_PUBLIC_KEY'
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
          Nom
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
          Email
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
          Message
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
        Envoyer
      </button>

      {status && (
        <p className={`text-center ${status.includes('succès') ? 'text-green-500' : 'text-red-500'}`}>
          {status}
        </p>
      )}
    </form>
  );
}