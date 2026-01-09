import { FEATURE_STATUS } from '../constants.js';

/**
 * StatusSelector component - Dropdown for selecting feature status
 * 
 * @param {string} value - Current status value
 * @param {Function} onChange - Callback when status changes
 * @param {string} id - HTML id for the select element
 */
export default function StatusSelector({ value, onChange, id }) {
  return (
    <select 
      id={id}
      value={value} 
      onChange={(e) => onChange(e.target.value)}
      className="status-selector"
    >
      {Object.values(FEATURE_STATUS).map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}

