/**
 * Constants for feature prioritization tool
 */

// User impact levels
export const USER_IMPACT = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High'
};

// Feature status options
export const FEATURE_STATUS = {
  BACKLOG: 'Backlog',
  PLANNED: 'Planned',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done'
};

// Impact multipliers for priority calculation
// Higher impact = higher multiplier
export const IMPACT_MULTIPLIERS = {
  [USER_IMPACT.LOW]: 1,
  [USER_IMPACT.MEDIUM]: 2,
  [USER_IMPACT.HIGH]: 3
};

// Min and max values for effort and business value
export const MIN_EFFORT = 1;
export const MAX_EFFORT = 5;
export const MIN_BUSINESS_VALUE = 1;
export const MAX_BUSINESS_VALUE = 5;

// LocalStorage key for persisting features
export const STORAGE_KEY = 'featurePrioritizationData';

