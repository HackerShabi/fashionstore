import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import HomepageSettingsForm from '../components/HomepageSettingsForm';
import HomepagePreview from '../components/HomepagePreview';
import { useAdminData } from '../context/AdminDataContext';

const HomepageSettings = () => {
  const { homepageSettings } = useAdminData();
  const [previewSettings, setPreviewSettings] = useState(homepageSettings);
  
  // Update preview settings when form data changes
  const handleFormDataChange = (formData) => {
    setPreviewSettings(formData);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Homepage Settings" />
      
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <p className="text-gray-600 mb-6">
          Customize the content and appearance of your homepage. Changes will be reflected immediately on the website.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <HomepageSettingsForm onFormDataChange={handleFormDataChange} />
          </div>
          <div className="lg:col-span-1">
            <HomepagePreview settings={previewSettings} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageSettings; 