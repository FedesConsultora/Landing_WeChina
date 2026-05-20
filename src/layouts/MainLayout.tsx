import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CareersForm from '../components/CareersForm';

export interface CareersFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  experience: string;
  references: string;
  cv: File | null;
}

const MainLayout: React.FC = () => {
  const [isCareersOpen, setIsCareersOpen] = useState(false);
  const [formData, setFormData] = useState<CareersFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    references: '',
    cv: null,
  });

  return (
    <>
      <Navbar onOpenCareers={() => setIsCareersOpen(true)} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CareersForm 
        isOpen={isCareersOpen} 
        onClose={() => setIsCareersOpen(false)} 
        formData={formData} 
        setFormData={setFormData}
      />
    </>
  );
};

export default MainLayout;
