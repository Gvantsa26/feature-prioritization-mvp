import { useState } from 'react';
import { USER_IMPACT, MIN_EFFORT, MAX_EFFORT, MIN_BUSINESS_VALUE, MAX_BUSINESS_VALUE } from '../constants.js';
import { validateFeature } from '../featureModel.js';

/**
 * FeatureForm component - Form for adding new features
 * 
 * @param {Function} onSubmit - Callback when form is submitted with valid data
 */
export default function FeatureForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    userImpact: USER_IMPACT.MEDIUM,
    effort: 3,
    businessValue: 3
  });
  
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'effort' || name === 'businessValue' ? Number(value) : value
    }));
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    const validation = validateFeature(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Submit valid feature
    onSubmit(formData);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      userImpact: USER_IMPACT.MEDIUM,
      effort: 3,
      businessValue: 3
    });
    setErrors([]);
  };

  return (
    <form onSubmit={handleSubmit} className="feature-form">
      <h2>Add New Feature</h2>
      
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, index) => (
            <div key={index} className="error-message">{error}</div>
          ))}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter feature title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the feature"
          rows="3"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="userImpact">User Impact *</label>
          {/* Helper text: Explains what user impact means to guide users */}
          <span className="helper-text">
            How much this feature affects users (Low/Medium/High)
          </span>
          <select
            id="userImpact"
            name="userImpact"
            value={formData.userImpact}
            onChange={handleChange}
          >
            <option value={USER_IMPACT.LOW}>Low</option>
            <option value={USER_IMPACT.MEDIUM}>Medium</option>
            <option value={USER_IMPACT.HIGH}>High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="effort">Effort (1-5) *</label>
          {/* Helper text: Explains effort scale - lower number = less effort = higher priority */}
          <span className="helper-text">
            1 = Quick win, 5 = Major project (lower is better for priority)
          </span>
          <input
            type="number"
            id="effort"
            name="effort"
            value={formData.effort}
            onChange={handleChange}
            min={MIN_EFFORT}
            max={MAX_EFFORT}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="businessValue">Business Value (1-5) *</label>
          {/* Helper text: Explains business value - higher number = more value = higher priority */}
          <span className="helper-text">
            1 = Low value, 5 = Critical (higher is better for priority)
          </span>
          <input
            type="number"
            id="businessValue"
            name="businessValue"
            value={formData.businessValue}
            onChange={handleChange}
            min={MIN_BUSINESS_VALUE}
            max={MAX_BUSINESS_VALUE}
            required
          />
        </div>
      </div>

      <button type="submit" className="submit-button">
        Add Feature
      </button>
    </form>
  );
}

