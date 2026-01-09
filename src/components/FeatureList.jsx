import { sortFeaturesByPriority } from '../featureModel.js';
import FeatureCard from './FeatureCard.jsx';

/**
 * FeatureList component - Displays all features sorted by priority
 * 
 * @param {Array} features - Array of feature objects
 * @param {Function} onStatusChange - Callback when a feature's status changes
 * @param {Function} onDelete - Callback when a feature is deleted
 */
export default function FeatureList({ features, onStatusChange, onDelete }) {
  // Sort features by priority (highest first)
  const sortedFeatures = sortFeaturesByPriority(features);

  // Empty state: Provides clear guidance when no features exist
  // Better UX than showing an empty list - helps users understand what to do next
  if (sortedFeatures.length === 0) {
    return (
      <div className="feature-list empty">
        <div className="empty-state-content">
          <div className="empty-state-icon">📋</div>
          <h3>No features yet</h3>
          <p>Start by adding your first feature request above.</p>
          <p className="empty-state-hint">
            Fill in the form to create a feature, and it will be automatically prioritized based on impact, effort, and business value.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="feature-list">
      <h2>Features (Sorted by Priority)</h2>
      <div className="features-container">
        {sortedFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            onStatusChange={(newStatus) => onStatusChange(feature.id, newStatus)}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

