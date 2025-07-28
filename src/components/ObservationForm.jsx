import { useState, useRef } from 'react';

const ObservationForm = ({ onSubmit, onClose, isMobile = false }) => {
  const [formData, setFormData] = useState({
    speciesName: '',
    scientificName: '',
    location: '',
    latitude: '',
    longitude: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    habitat: '',
    behavior: '',
    weather: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.speciesName.trim()) {
      newErrors.speciesName = 'The species name is required.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location required';
    }

    if (formData.latitude && (isNaN(formData.latitude) || formData.latitude < -90 || formData.latitude > 90)) {
      newErrors.latitude = 'Enter a valid latitude (-90 to 90)';
    }

    if (formData.longitude && (isNaN(formData.longitude) || formData.longitude < -180 || formData.longitude > 180)) {
      newErrors.longitude = 'Enter a valid longitude (between -180 and 180)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const observation = {
        id: Date.now(),
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'pending',
        photos: fileInputRef.current?.files ? Array.from(fileInputRef.current.files) : []
      };

      onSubmit(observation);
      onClose();
    } catch (error) {
      console.error('Observation submission error:', error);
      setErrors({ submit: 'An error occurred while sending the observation.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formStyle = {
    backgroundColor: '#1e1e1e',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: isMobile ? '16px' : '24px',
    maxWidth: isMobile ? '100%' : '500px',
    margin: '0 auto',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  };

  const titleStyle = {
    margin: 0,
    fontSize: '20px',
    color: '#fff',
    fontWeight: '600'
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#888',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const fieldGroupStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    color: '#ccc',
    marginBottom: '6px',
    fontWeight: '500'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: '#2a2a2a',
    border: '1px solid #444',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '80px',
    resize: 'vertical'
  };

  const errorStyle = {
    color: '#ff6b6b',
    fontSize: '12px',
    marginTop: '4px'
  };

  const coordinatesGroupStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '12px',
    marginTop: '24px'
  };

  const submitButtonStyle = {
    backgroundColor: '#4ea8de',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    flex: 1,
    transition: 'background-color 0.2s'
  };

  const cancelButtonStyle = {
    backgroundColor: '#666',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    flex: 1,
    transition: 'background-color 0.2s'
  };

  const fileInputStyle = {
    display: 'none'
  };

  const fileButtonStyle = {
    backgroundColor: '#2ecc71',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    marginTop: '8px'
  };

  return (
    <div style={formStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>📝 Add New Observation</h2>
        <button 
          style={closeButtonStyle}
          onClick={onClose}
          onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Tür Bilgileri */}
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Species Name *</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.speciesName}
            onChange={(e) => handleInputChange('speciesName', e.target.value)}
            placeholder="Example: Red fox"
          />
          {errors.speciesName && <div style={errorStyle}>{errors.speciesName}</div>}
        </div>

        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Scientific Name</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.scientificName}
            onChange={(e) => handleInputChange('scientificName', e.target.value)}
            placeholder="Example: Vulpes vulpes"
          />
        </div>

        {/* Konum Bilgileri */}
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Location *</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Example: Ankara, Turkiye"
          />
          {errors.location && <div style={errorStyle}>{errors.location}</div>}
        </div>

        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Coordinates</label>
          <div style={coordinatesGroupStyle}>
            <div>
              <input
                type="number"
                step="any"
                style={inputStyle}
                value={formData.latitude}
                onChange={(e) => handleInputChange('latitude', e.target.value)}
                placeholder="Latitude"
              />
              {errors.latitude && <div style={errorStyle}>{errors.latitude}</div>}
            </div>
            <div>
              <input
                type="number"
                step="any"
                style={inputStyle}
                value={formData.longitude}
                onChange={(e) => handleInputChange('longitude', e.target.value)}
                placeholder="Longitude"
              />
              {errors.longitude && <div style={errorStyle}>{errors.longitude}</div>}
            </div>
          </div>
        </div>

        {/* Gözlem Detayları */}
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Observation Date</label>
          <input
            type="date"
            style={inputStyle}
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
          />
        </div>

        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Habitat</label>
          <input
            type="text"
            style={inputStyle}
            value={formData.habitat}
            onChange={(e) => handleInputChange('habitat', e.target.value)}
            placeholder="Example: Forest, meadow, lake shore"
          />
        </div>

        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Description</label>
          <textarea
            style={textareaStyle}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Detailed information about the observation..."
          />
        </div>

        {/* Fotoğraf Yükleme */}
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Photos</label>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            style={fileInputStyle}
            id="photo-upload"
          />
          <label htmlFor="photo-upload" style={fileButtonStyle}>
            📷 Select Photo
          </label>
        </div>

        {errors.submit && <div style={errorStyle}>{errors.submit}</div>}

        {/* Butonlar */}
        <div style={buttonGroupStyle}>
          <button
            type="button"
            style={cancelButtonStyle}
            onClick={onClose}
            onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#666'}
          >
            İptal
          </button>
          <button
            type="submit"
            style={submitButtonStyle}
            disabled={isSubmitting}
            onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#3d8bc7')}
            onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = '#4ea8de')}
          >
            {isSubmitting ? 'Sending...' : 'Send Observation'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ObservationForm; 