import StatusSelector from './StatusSelector.jsx';

/**
 * FeatureCard component - Displays a single feature with all details
 * 
 * @param {Object} feature - Feature object
 * @param {Function} onStatusChange - Callback when status changes
 * @param {Function} onDelete - Callback when feature is deleted
 */
export default function FeatureCard({ feature, onStatusChange, onDelete }) {
  const getPriorityColor = (score) => {
    if (score >= 6) return 'priority-high';
    if (score >= 3) return 'priority-medium';
    return 'priority-low';
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(' ', '-');
  };

  return (
    <div className="feature-card">
      <div className="feature-header">
        <h3 className="feature-title">{feature.title}</h3>
        <div className="feature-actions">
          <StatusSelector
            value={feature.status}
            onChange={onStatusChange}
            id={`status-${feature.id}`}
          />
          <button 
            onClick={() => onDelete(feature.id)}
            className="delete-button"
            aria-label="Delete feature"
          >
            ×
          </button>
        </div>
      </div>

      <p className="feature-description">{feature.description}</p>

      <div className="feature-details">
        <div className="detail-item">
          <span className="detail-label">User Impact:</span>
          <span className={`impact-badge impact-${feature.userImpact.toLowerCase()}`}>
            {feature.userImpact}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Effort:</span>
          <span className="effort-value">{feature.effort}/5</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Business Value:</span>
          <span className="business-value">{feature.businessValue}/5</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Priority Score:</span>
          <span className={`priority-score ${getPriorityColor(feature.priorityScore)}`}>
            {feature.priorityScore.toFixed(2)}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Status:</span>
          <span className={`status-badge status-${getStatusClass(feature.status)}`}>
            {feature.status}
          </span>
        </div>
      </div>
    </div>
  );
}

