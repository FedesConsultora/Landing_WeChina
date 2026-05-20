import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { CareersFormData } from '../layouts/MainLayout';

interface CareersFormProps {
  isOpen: boolean;
  onClose: () => void;
  formData: CareersFormData;
  setFormData: React.Dispatch<React.SetStateAction<CareersFormData>>;
}

const CareersForm: React.FC<CareersFormProps> = ({ isOpen, onClose, formData, setFormData }) => {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Keyboard navigation: Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }
    return () => {
      document.body.classList.remove('drawer-open');
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
<<<<<<< HEAD

      // Nuevo límite: 5MB (5242880 bytes)
=======
>>>>>>> 2ed61d0 (add: pasado el formulario al header y desplegable lateral)
      if (file.size > 5242880) {
        alert(t.careers.form.fileTooBig);
        e.target.value = '';
        return;
      }
      setFormData(prev => ({ ...prev, cv: file }));
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

<<<<<<< HEAD
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const TEMPLATE_CONFIRM_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRM_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const NOTIFY_EMAIL = import.meta.env.VITE_NOTIFY_EMAIL;
    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
=======
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwghDX2DgyU6RsgZesltIm5YmPSVZIIH1M3wbU5hQW4A9-1jGymuVsZZjKEF0ENQOfp/exec';
>>>>>>> 2ed61d0 (add: pasado el formulario al header y desplegable lateral)

    try {
      let cvBase64 = "";
      if (formData.cv) {
        cvBase64 = await fileToBase64(formData.cv);
      }

<<<<<<< HEAD
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
=======
      const payload = {
>>>>>>> 2ed61d0 (add: pasado el formulario al header y desplegable lateral)
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        to_email: NOTIFY_EMAIL,
        phone: formData.phone,
        address: formData.address,
        experience: formData.experience,
        references: formData.references,
<<<<<<< HEAD
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

=======
        cvData: cvBase64,
        cvName: formData.cv?.name || "",
        cvType: formData.cv?.type || "",
      };

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload)
      });

      // Show success screen and clear form data (as it was sent successfully)
>>>>>>> 2ed61d0 (add: pasado el formulario al header y desplegable lateral)
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        experience: '',
        references: '',
        cv: null,
      });

    } catch (error) {
      console.error('Submission failed:', error);
      alert('Hubo un problema al enviar tu postulación. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
<<<<<<< HEAD
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
=======
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            className="careers-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            className="careers-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header Fijo */}
            <div className="drawer-header">
              <div className="drawer-header-info">
                <span className="drawer-tag">WeChina Careers</span>
                <h2 className="drawer-title">{t.careers.title}</h2>
                <p className="drawer-subtitle">{t.careers.subtitle}</p>
              </div>
              <button className="drawer-close-btn" onClick={onClose} aria-label="Cerrar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Cuerpo Scrollable */}
            <div className="drawer-body">
              <AnimatePresence mode="wait">
                {!loading && !isSubmitted ? (
                  <motion.form
                    key="careers-form"
                    className="careers-drawer-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                  >
                    <div className="form-row">
                      <div className="form-group">
                        <label>{t.careers.form.firstName} *</label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Juan"
                        />
                      </div>
                      <div className="form-group">
                        <label>{t.careers.form.lastName} *</label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Pérez"
                        />
                      </div>
>>>>>>> 2ed61d0 (add: pasado el formulario al header y desplegable lateral)
                    </div>

<<<<<<< HEAD
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
=======
                    <div className="form-row">
                      <div className="form-group">
                        <label>{t.careers.form.email} *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="juanperez@ejemplo.com"
                        />
                      </div>
                      <div className="form-group">
                        <label>{t.careers.form.phone} *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+54 9 11 1234 5678"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>{t.careers.form.address} *</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Av. del Libertador 1500, CABA"
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.careers.form.experience} *</label>
                      <textarea
                        name="experience"
                        required
                        value={formData.experience}
                        onChange={handleChange}
                        rows={4}
                        placeholder={t.careers.form.experiencePlaceholder || "Contanos brevemente sobre tus roles y responsabilidades..."}
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.careers.form.references} *</label>
                      <textarea
                        name="references"
                        required
                        value={formData.references}
                        onChange={handleChange}
                        rows={3}
                        placeholder={t.careers.form.referencesPlaceholder || "Mencioná dos personas que puedan hablarnos sobre vos..."}
                      />
                    </div>

                    <div className="form-group">
                      <label>{t.careers.form.cv} *</label>
                      <div className="file-input-wrapper">
                        <input
                          type="file"
                          name="cv"
                          required={!formData.cv} // Solo obligatorio si no hay uno ya cargado en el estado persistido
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                        <div className={`file-custom ${formData.cv ? 'has-file' : ''}`}>
                          <svg className="upload-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          <span className="file-text">
                            {formData.cv ? formData.cv.name : t.careers.form.cv}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Fijo del Formulario */}
                    <div className="drawer-footer">
                      <button type="submit" className="btn btn-primary submit-btn">
                        {t.careers.form.submit}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  /* Pantalla de Carga y Éxito de Logística de Contenedor */
                  <motion.div
                    key="logistics-animation"
                    className="logistics-screen"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Escena Dinámica de Puerto Logístico WeChina */}
                    <div className={`harbor-scene ${loading ? 'is-loading' : 'is-success'}`}>
                      {/* Fondo del puerto (grúa fija) */}
                      <svg className="harbor-svg" viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          {/* Gradiente del cielo del puerto */}
                          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#0a0a0c" />
                            <stop offset="100%" stopColor="#1a1215" />
                          </linearGradient>
                          {/* Brillo del mar */}
                          <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#0f1f2e" />
                            <stop offset="100%" stopColor="#081017" />
                          </linearGradient>
                        </defs>

                        {/* Cielo */}
                        <rect width="240" height="120" fill="url(#skyGrad)" />
                        
                        {/* Estrellas decorativas */}
                        <circle cx="30" cy="25" r="0.8" fill="#fff" opacity="0.8" />
                        <circle cx="80" cy="15" r="0.5" fill="#fff" opacity="0.5" />
                        <circle cx="140" cy="30" r="0.8" fill="#fff" opacity="0.6" />
                        <circle cx="210" cy="20" r="0.5" fill="#fff" opacity="0.7" />

                        {/* Silueta de Puerto de Fondo */}
                        <path d="M0,105 L20,105 L25,95 L35,95 L40,105 L70,105 L80,85 L95,85 L105,105 L150,105 L155,98 L165,98 L170,105 L240,105 L240,120 L0,120 Z" fill="#0d0d0f" />

                        {/* Grúa de Puerto Fija */}
                        <g className="port-crane" stroke="#222" strokeWidth="2.5" fill="none">
                          {/* Estructura A */}
                          <line x1="45" y1="105" x2="60" y2="50" />
                          <line x1="75" y1="105" x2="60" y2="50" />
                          {/* Brazo horizontal */}
                          <line x1="30" y1="50" x2="115" y2="50" strokeWidth="2" />
                          {/* Tirante de grúa */}
                          <line x1="60" y1="50" x2="40" y2="35" strokeWidth="1.5" />
                          <line x1="60" y1="50" x2="90" y2="50" />
                        </g>

                        {/* Cables de la Grúa (Bajan dinámicamente) */}
                        <line 
                          className="crane-cables" 
                          x1="90" 
                          y1="50" 
                          x2="90" 
                          y2="82" 
                          stroke="#777" 
                          strokeWidth="0.8" 
                          strokeDasharray="2,2" 
                        />

                        {/* Contenedor Rojo de WeChina */}
                        <g className="cargo-container">
                          {/* Caja del contenedor con aspecto 3D/relieve */}
                          <rect x="75" y="82" width="30" height="16" rx="1.5" fill="#CE261D" stroke="#a1150f" strokeWidth="0.8" />
                          {/* Estriado del contenedor (Líneas verticales) */}
                          <line x1="80" y1="83" x2="80" y2="97" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
                          <line x1="85" y1="83" x2="85" y2="97" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
                          <line x1="90" y1="83" x2="90" y2="97" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
                          <line x1="95" y1="83" x2="95" y2="97" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
                          <line x1="100" y1="83" x2="100" y2="97" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
                          {/* Texto / Isotipo WeChina simplificado (W en blanco) */}
                          <path d="M87,87 L90,93 L93,87 L94.5,91 L96,87" stroke="#fff" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </g>

                        {/* Barco de Carga (Buque portacontenedores) */}
                        <g className="cargo-ship">
                          {/* Casco del barco */}
                          <path d="M50,118 L130,118 L140,105 L155,105 L160,112 L165,118 L155,124 L52,124 Z" fill="#1b1c22" stroke="#2b2d35" strokeWidth="0.8" />
                          {/* Cabina/Puente de mando blanca */}
                          <rect x="135" y="93" width="16" height="12" rx="0.5" fill="#e5e5e5" />
                          <rect x="138" y="95" width="10" height="3" fill="#222" />
                          {/* Chimenea roja */}
                          <rect x="146" y="87" width="3" height="6" fill="#CE261D" />
                          <line x1="147.5" y1="87" x2="147.5" y2="85" stroke="#444" strokeWidth="0.6" />
                          {/* Contenedores pre-cargados (Gris/Azul) */}
                          <rect x="58" y="105" width="22" height="13" rx="0.5" fill="#324050" />
                          <rect x="108" y="105" width="22" height="13" rx="0.5" fill="#3c4044" />
                          <line x1="63" y1="105" x2="63" y2="118" stroke="#000" strokeWidth="0.5" opacity="0.2" />
                          <line x1="69" y1="105" x2="69" y2="118" stroke="#000" strokeWidth="0.5" opacity="0.2" />
                          <line x1="113" y1="105" x2="113" y2="118" stroke="#000" strokeWidth="0.5" opacity="0.2" />
                          <line x1="119" y1="105" x2="119" y2="118" stroke="#000" strokeWidth="0.5" opacity="0.2" />
                        </g>

                        {/* Mar / Olas dinámicas */}
                        <rect y="120" width="240" height="40" fill="url(#seaGrad)" />
                        
                        {/* Olas animadas (SVG path) */}
                        <g className="sea-waves" stroke="#1d3448" strokeWidth="1.2" fill="none">
                          <path className="wave-layer wave-back" d="M0,120 Q15,117 30,120 T60,120 T90,120 T120,120 T150,120 T180,120 T210,120 T240,120" strokeWidth="1" opacity="0.6" />
                          <path className="wave-layer wave-middle" d="M0,123 Q20,119 40,123 T80,123 T120,123 T160,123 T200,123 T240,123" strokeWidth="1.5" opacity="0.8" />
                          <path className="wave-layer wave-front" d="M0,127 Q25,124 50,127 T100,127 T150,127 T200,127 T240,127" strokeWidth="2" />
                        </g>
                      </svg>

                      {/* Éxito - Checkmark SVG y ondas de expansión */}
                      {isSubmitted && (
                        <div className="checkmark-wrapper">
                          <svg className="checkmark-svg" viewBox="0 0 52 52">
                            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Información textual de la carga */}
                    <div className="logistics-info">
                      {loading ? (
                        <>
                          <h3 className="logistics-status-title">Cargando Postulación...</h3>
                          <p className="logistics-status-desc">
                            Cargando contenedor en el buque portacontenedores de WeChina. Asegurando documentación y adjuntos.
                          </p>
                          <div className="loading-bar-wrapper">
                            <div className="loading-bar-fill"></div>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="logistics-status-title success-text">
                            {t.careers.form.success || "¡Postulación recibida en puerto!"}
                          </h3>
                          <p className="logistics-status-desc">
                            El contenedor con tu postulación ha sido cargado con éxito. Nuestro equipo de expertos en origen y destino lo revisará a la brevedad. ¡Gracias por postularte!
                          </p>
                          <button className="btn btn-primary list-btn" onClick={handleReset}>
                            Cerrar Panel
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
>>>>>>> 2ed61d0 (add: pasado el formulario al header y desplegable lateral)
  );
};

export default CareersForm;
