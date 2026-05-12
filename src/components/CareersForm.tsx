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
      
      // Validamos tamaño (500Kb = 512000 bytes aprox)
      if (file.size > 512000) {
        alert(t.careers.form.fileTooBig);
        e.target.value = ''; // Limpiamos el input visualmente
        setFormData(prev => ({ ...prev, cv: null }));
        return;
      }

      setFormData(prev => ({ ...prev, cv: file }));
      setIsDirty(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Doble chequeo de seguridad por si acaso
    if (formData.cv && formData.cv.size > 512000) {
      alert(t.careers.form.fileTooBig);
      return;
    }

    setLoading(true);

    // IDs REALES DE EMAILJS
    const SERVICE_ID = 'service_vyoabbh'; 
    const TEMPLATE_ID = 'template_15fdjsd'; 
    const PUBLIC_KEY = '1cPAuly2SnGuUMv4g';
    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbza_rnNzeGBTUk2a3dW_HBCOc8cWw6IUriTF5geO_LfvmSsImvIvYjZEsMjb5If_fJB/exec';

    if (formRef.current) {
      // Preparamos datos para Google Sheets EXCLUYENDO el archivo CV (que no se puede mandar por JSON así)
      const { cv, ...sheetData } = formData;

      // Enviamos a Google Sheets y EmailJS en paralelo
      Promise.all([
        // 1. Google Sheets (Solo texto)
        fetch(GOOGLE_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors', // Importante para Apps Script
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetData)
        }),
        // 2. EmailJS (Envía todo el formulario, incluyendo el archivo adjunto)
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      ])
      .then(() => {
        setIsSubmitted(true);
        setLoading(false);
        setIsDirty(false);
      })
      .catch((error) => {
        console.error('Submission failed:', error);
        alert('Hubo un problema al enviar. Por favor intenta de nuevo.');
        setLoading(false);
      });
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
                {/* Name & Last Name */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">{t.careers.form.firstName} *</label>
                    <input 
                      type="text" name="firstName" id="firstName" required 
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={t.careers.form.firstName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">{t.careers.form.lastName} *</label>
                    <input 
                      type="text" name="lastName" id="lastName" required 
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={t.careers.form.lastName}
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">{t.careers.form.email} *</label>
                    <input 
                      type="email" name="email" id="email" required 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@ejemplo.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">{t.careers.form.phone} *</label>
                    <input 
                      type="tel" name="phone" id="phone" required 
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+54 11 ..."
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="form-group">
                  <label htmlFor="address">{t.careers.form.address} *</label>
                  <input 
                    type="text" name="address" id="address" required 
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Calle, Ciudad, Provincia"
                  />
                </div>

                {/* Experience */}
                <div className="form-group">
                  <label htmlFor="experience">{t.careers.form.experience} *</label>
                  <textarea 
                    name="experience" id="experience" required 
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder={t.careers.form.experiencePlaceholder}
                    rows={4}
                  />
                </div>

                {/* References */}
                <div className="form-group">
                  <label htmlFor="references">{t.careers.form.references} *</label>
                  <textarea 
                    name="references" id="references" required 
                    value={formData.references}
                    onChange={handleChange}
                    placeholder={t.careers.form.referencesPlaceholder}
                    rows={3}
                  />
                </div>

                {/* CV File */}
                <div className="form-group">
                  <label htmlFor="cv">{t.careers.form.cv} *</label>
                  <div className="file-input-wrapper">
                    <input 
                      type="file" name="cv" id="cv" required 
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                    <div className="file-custom">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
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
