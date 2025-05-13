import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Importation des fichiers de traduction
import home_fr from './locales/fr/HomePage.json'
import home_en from './locales/en/HomePage.json'
import form_fr from './locales/fr/form.json'
import form_en from './locales/en/form.json'
import payment_fr from './locales/fr/payment.json'
import payment_en from './locales/en/payment.json'
import fr_auth from './locales/fr/fr.auth.json'
import en_auth from './locales/en/en.auth.json'
import about_fr from './locales/fr/fr.about.json' // ✅ Ajouté
import about_en from './locales/en/en.about.json' // ✅ Ajouté
import cleaning_fr from './locales/fr/fr.cleaning.json'
import cleaning_en from './locales/en/en.cleaning.json'
import cooking_fr from './locales/fr/fr.cooking.json'
import cooking_en from './locales/en/en.cooking.json'
import repairs_fr from './locales/fr/fr.repairs.json'
import repairs_en from './locales/en/en.repairs.json'
import fr_header from './locales/fr/fr.header.json'
import en_header from './locales/en/en.header.json'
import contact_fr from './locales/fr/fr.contact.json'
import contact_en from './locales/en/en.contact.json'

i18n.use(initReactI18next).init({
  resources: {
    fr: {
      home: home_fr,
      form: form_fr,
      payment: payment_fr,
      authForm: fr_auth,
      about: about_fr, // ✅ Ajouté
      cleaning: cleaning_fr,
      cooking: cooking_fr,
      repairs: repairs_fr,
      header: fr_header,
      contact: contact_fr,
    },
    en: {
      home: home_en,
      form: form_en,
      payment: payment_en,
      authForm: en_auth,
      about: about_en, // ✅ Ajouté
      cleaning: cleaning_en,
      cooking: cooking_en,
      repairs: repairs_en,
      header: en_header,
      contact: contact_en,
    },
  },
  lng: 'fr', // Langue par défaut
  fallbackLng: 'fr',
  ns: [
    'home',
    'form',
    'payment',
    'authForm',
    'about',
    'cleaning',
    'cooking',
    'repairs',
    'header',
    'contact',
  ], // ✅ Ajouté "about"
  defaultNS: 'home',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
