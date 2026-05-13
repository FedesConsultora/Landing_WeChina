import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import emailjs from '@emailjs/browser';

const CareersForm: React.FC = () => {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    references: '',
    cv: null as File | null,
  });

  // Prevent accidental navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty && !isSubmitted) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty, isSubmitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsDirty(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Nuevo límite: 5MB (5242880 bytes)
      if (file.size > 5242880) {
        alert(t.careers.form.fileTooBig);
        e.target.value = '';
        setFormData(prev => ({ ...prev, cv: null }));
        return;
      }

      setFormData(prev => ({ ...prev, cv: file }));
      setIsDirty(true);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const TEMPLATE_CONFIRM_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRM_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const NOTIFY_EMAIL = import.meta.env.VITE_NOTIFY_EMAIL;
    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    try {
      let cvUrl = "No cargado";
      let cvBase64 = "";

      // 1. Convertimos el archivo si existe
      if (formData.cv) {
        cvBase64 = await fileToBase64(formData.cv);
      }

      // 2. Enviamos a Google Sheets + Drive primero
      const sheetPayload = {
        ...formData,
        cvData: cvBase64,
        cvName: formData.cv?.name || "",
        cvType: formData.cv?.type || "",
        cv: undefined // Quitamos el objeto File original
      };

      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: JSON.stringify(sheetPayload),
          redirect: 'follow',
        });
        const result = await response.json();
        cvUrl = result.cvUrl || cvUrl;
      } catch (sheetError) {
        console.error('Google Sheets/Drive error:', sheetError);
        // Continuamos con los emails aunque falle Sheets
      }

      // 3. Parámetros compartidos para ambos emails
      const emailParams = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        to_email: NOTIFY_EMAIL,
        phone: formData.phone,
        address: formData.address,
        experience: formData.experience,
        references: formData.references,
        cvUrl: cvUrl,
      };

      // 4. Email de notificación a la empresa
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams, PUBLIC_KEY);

      // 5. Email de confirmación al postulante
      const confirmParams = {
        to_name: formData.firstName,
        to_email: formData.email,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };
      await emailjs.send(SERVICE_ID, TEMPLATE_CONFIRM_ID, confirmParams, PUBLIC_KEY);

      setIsSubmitted(true);
      setIsDirty(false);
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Hubo un problema al enviar. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="careers-form-section">
      <div className="container">
        <motion.div
          className="careers-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="careers-title">{t.careers.title}</h2>
          <p className="careers-subtitle">{t.careers.subtitle}</p>
        </motion.div>

        <div className="careers-form-container">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                ref={formRef}
                key="form"
                className="careers-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">{t.careers.form.firstName} *</label>
                    <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} placeholder={t.careers.form.firstName} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">{t.careers.form.lastName} *</label>
                    <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} placeholder={t.careers.form.lastName} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">{t.careers.form.email} *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="email@ejemplo.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">{t.careers.form.phone} *</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+54 11 ..." />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">{t.careers.form.address} *</label>
                  <input type="text" name="address" required value={formData.address} onChange={handleChange} placeholder="Calle, Ciudad, Provincia" />
                </div>

                <div className="form-group">
                  <label htmlFor="experience">{t.careers.form.experience} *</label>
                  <textarea name="experience" required value={formData.experience} onChange={handleChange} placeholder={t.careers.form.experiencePlaceholder} rows={4} />
                </div>

                <div className="form-group">
                  <label htmlFor="references">{t.careers.form.references} *</label>
                  <textarea name="references" required value={formData.references} onChange={handleChange} placeholder={t.careers.form.referencesPlaceholder} rows={3} />
                </div>

                <div className="form-group">
                  <label htmlFor="cv">{t.careers.form.cv} *</label>
                  <div className="file-input-wrapper">
                    <input type="file" name="cv" required accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                    <div className="file-custom">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                      <span>{formData.cv ? formData.cv.name : t.careers.form.cv}</span>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                  {loading ? 'Enviando...' : t.careers.form.submit}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="careers-success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
              >
                <div className="success-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3>{t.careers.form.success}</h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CareersForm;
