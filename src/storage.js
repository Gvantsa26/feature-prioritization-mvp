// storage.js

export const STORAGE_KEY = 'featurePrioritizationData';

/**
 * Save features array directly to localStorage
 */
export function saveFeatures(features) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(features));
  } catch (error) {
    console.error('Error saving features to localStorage:', error);
  }
}

/**
 * Load features array directly from localStorage
 */
export function loadFeatures() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading features from localStorage:', error);
    return [];
  }
}
