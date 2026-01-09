import { IMPACT_MULTIPLIERS } from './constants.js';

/**
 * Calculates priority score for a feature
 * 
 * Formula: (Business Value × Impact Multiplier) / Effort
 * 
 * This favors features with:
 * - High business value
 * - High user impact
 * - Low effort (quick wins)
 * 
 * @param {number} businessValue - Business value (1-5)
 * @param {string} userImpact - User impact level ('Low', 'Medium', 'High')
 * @param {number} effort - Effort required (1-5)
 * @returns {number} Priority score (higher = more priority)
 */
export function calculatePriorityScore(businessValue, userImpact, effort) {
  // Get the impact multiplier (Low=1, Medium=2, High=3)
  const impactMultiplier = IMPACT_MULTIPLIERS[userImpact] || 1;
  
  // Calculate: (Business Value × Impact) / Effort
  // Higher business value and impact increase the score
  // Lower effort increases the score (division by smaller number)
  const score = (businessValue * impactMultiplier) / effort;
  
  // Round to 2 decimal places for readability
  return Math.round(score * 100) / 100;
}

/**
 * Recalculates priority score for a feature object
 * 
 * @param {Object} feature - Feature object
 * @returns {Object} Feature object with updated priorityScore
 */
export function updateFeaturePriority(feature) {
  return {
    ...feature,
    priorityScore: calculatePriorityScore(
      feature.businessValue,
      feature.userImpact,
      feature.effort
    )
  };
}

