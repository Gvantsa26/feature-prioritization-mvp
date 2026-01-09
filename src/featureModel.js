import { USER_IMPACT, FEATURE_STATUS, MIN_EFFORT, MAX_EFFORT, MIN_BUSINESS_VALUE, MAX_BUSINESS_VALUE } from './constants.js';
import { calculatePriorityScore } from './priorityCalculator.js';

/**
 * Creates a new feature object with all required fields
 * 
 * @param {Object} featureData - Feature data from form
 * @param {string} featureData.title - Feature title
 * @param {string} featureData.description - Feature description
 * @param {string} featureData.userImpact - User impact level
 * @param {number} featureData.effort - Effort required (1-5)
 * @param {number} featureData.businessValue - Business value (1-5)
 * @returns {Object} Complete feature object with calculated priority
 */
export function createFeature({ title, description, userImpact, effort, businessValue }) {
  // Generate unique ID using timestamp
  const id = `feature-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Calculate priority score
  const priorityScore = calculatePriorityScore(businessValue, userImpact, effort);
  
  // Return complete feature object
  return {
    id,
    title: title.trim(),
    description: description.trim(),
    userImpact,
    effort: Number(effort),
    businessValue: Number(businessValue),
    status: FEATURE_STATUS.BACKLOG, // Default status
    priorityScore,
    createdAt: Date.now()
  };
}

/**
 * Validates feature data before creation
 * 
 * @param {Object} featureData - Feature data to validate
 * @returns {Object} Validation result with isValid and errors
 */
export function validateFeature(featureData) {
  const errors = [];
  
  // Validate title
  if (!featureData.title || featureData.title.trim().length === 0) {
    errors.push('Title is required');
  }
  
  // Validate description
  if (!featureData.description || featureData.description.trim().length === 0) {
    errors.push('Description is required');
  }
  
  // Validate user impact
  if (!Object.values(USER_IMPACT).includes(featureData.userImpact)) {
    errors.push('User impact must be Low, Medium, or High');
  }
  
  // Validate effort
  const effort = Number(featureData.effort);
  if (isNaN(effort) || effort < MIN_EFFORT || effort > MAX_EFFORT) {
    errors.push(`Effort must be between ${MIN_EFFORT} and ${MAX_EFFORT}`);
  }
  
  // Validate business value
  const businessValue = Number(featureData.businessValue);
  if (isNaN(businessValue) || businessValue < MIN_BUSINESS_VALUE || businessValue > MAX_BUSINESS_VALUE) {
    errors.push(`Business value must be between ${MIN_BUSINESS_VALUE} and ${MAX_BUSINESS_VALUE}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Sorts features by priority score (highest first)
 * 
 * @param {Array} features - Array of feature objects
 * @returns {Array} Sorted array of features
 */
export function sortFeaturesByPriority(features) {
  return [...features].sort((a, b) => {
    // Sort by priority score descending (highest first)
    // If scores are equal, sort by creation date (newest first)
    if (b.priorityScore !== a.priorityScore) {
      return b.priorityScore - a.priorityScore;
    }
    return b.createdAt - a.createdAt;
  });
}

