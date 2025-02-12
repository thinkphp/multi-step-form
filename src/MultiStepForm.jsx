
import React, { useState } from 'react';

// Enhanced Styles with animations and modern design
const styles = {
  formContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '30px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    borderRadius: '16px',
    background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  stepIndicator: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '40px',
    position: 'relative',
  },
  stepLine: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '2px',
    background: '#e0e0e0',
    width: '60%',
    zIndex: 0,
  },
  step: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#f8f9fa',
    border: '2px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 20px',
    color: '#666',
    position: 'relative',
    zIndex: 1,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  activeStep: {
    backgroundColor: '#4A90E2',
    border: '2px solid #4A90E2',
    color: 'white',
    transform: 'scale(1.1)',
    boxShadow: '0 4px 10px rgba(74, 144, 226, 0.3)',
  },
  completedStep: {
    backgroundColor: '#2ECC71',
    border: '2px solid #2ECC71',
    color: 'white',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    position: 'relative',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    transition: 'all 0.3s ease',
  },
  label: {
    fontWeight: '600',
    color: '#2c3e50',
    fontSize: '14px',
    marginBottom: '5px',
    transition: 'all 0.3s ease',
  },
  input: {
    padding: '12px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    backgroundColor: 'white',
    '&:focus': {
      outline: 'none',
      borderColor: '#4A90E2',
      boxShadow: '0 0 0 3px rgba(74, 144, 226, 0.2)',
    },
    '&:hover': {
      borderColor: '#4A90E2',
    },
  },
  error: {
    color: '#E74C3C',
    fontSize: '13px',
    marginTop: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    animation: 'slideIn 0.3s ease',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px',
    gap: '15px',
  },
  button: {
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    color: 'white',
    '&:hover': {
      backgroundColor: '#357ABD',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 10px rgba(74, 144, 226, 0.3)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },
  secondaryButton: {
    backgroundColor: '#95A5A6',
    color: 'white',
    '&:hover': {
      backgroundColor: '#7F8C8D',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 10px rgba(149, 165, 166, 0.3)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },
  // Add keyframe animations
  '@keyframes slideIn': {
    from: {
      opacity: 0,
      transform: 'translateY(-10px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  // Add input focus styles
  focusedInput: {
    borderColor: '#4A90E2',
    boxShadow: '0 0 0 3px rgba(74, 144, 226, 0.2)',
  },
  // Add hover styles for form groups
  formGroupHover: {
    transform: 'translateX(5px)',
  },
};

// ... Rest of the component code remains the same ...
const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    // Address Information
    street: '',
    city: '',
    state: '',
    zipCode: '',
    // Account Information
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    let stepErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.firstName) stepErrors.firstName = 'First name is required';
        if (!formData.lastName) stepErrors.lastName = 'Last name is required';
        if (!formData.email) stepErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) stepErrors.email = 'Email is invalid';
        break;
      case 2:
        if (!formData.street) stepErrors.street = 'Street address is required';
        if (!formData.city) stepErrors.city = 'City is required';
        if (!formData.state) stepErrors.state = 'State is required';
        if (!formData.zipCode) stepErrors.zipCode = 'ZIP code is required';
        break;
      case 3:
        if (!formData.username) stepErrors.username = 'Username is required';
        if (!formData.password) stepErrors.password = 'Password is required';
        if (!formData.confirmPassword) stepErrors.confirmPassword = 'Please confirm password';
        else if (formData.password !== formData.confirmPassword) {
          stepErrors.confirmPassword = 'Passwords do not match';
        }
        break;
      default:
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      // Handle form submission
      console.log('Form submitted:', formData);
      // Reset form
      setFormData({
        firstName: '', lastName: '', email: '',
        street: '', city: '', state: '', zipCode: '',
        username: '', password: '', confirmPassword: ''
      });
      setCurrentStep(1);
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.firstName && <span style={styles.error}>{errors.firstName}</span>}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.lastName && <span style={styles.error}>{errors.lastName}</span>}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.email && <span style={styles.error}>{errors.email}</span>}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Street Address</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.street && <span style={styles.error}>{errors.street}</span>}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.city && <span style={styles.error}>{errors.city}</span>}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.state && <span style={styles.error}>{errors.state}</span>}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.zipCode && <span style={styles.error}>{errors.zipCode}</span>}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.username && <span style={styles.error}>{errors.username}</span>}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.password && <span style={styles.error}>{errors.password}</span>}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.formContainer}>
      <div style={styles.stepIndicator}>
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            style={{
              ...styles.step,
              ...(currentStep === step ? styles.activeStep : {})
            }}
          >
            {step}
          </div>
        ))}
      </div>
      
      <form style={styles.form} onSubmit={handleSubmit}>
        {renderStep()}
        
        <div style={styles.buttonGroup}>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              style={{...styles.button, ...styles.secondaryButton}}
            >
              Previous
            </button>
          )}
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              style={{...styles.button, ...styles.primaryButton}}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              style={{...styles.button, ...styles.primaryButton}}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
