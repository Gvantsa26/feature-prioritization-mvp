import { useState, useEffect } from "react";
import FeatureForm from "./components/FeatureForm.jsx";
import FeatureList from "./components/FeatureList.jsx";
import { createFeature } from "./featureModel.js";
import { saveFeatures, loadFeatures } from "./storage.js";
import "./App.css";

function App() {
  // Initialize features state by loading from localStorage on first render
  const [features, setFeatures] = useState(() => loadFeatures());

  // Persist features to localStorage whenever features state changes
  useEffect(() => {
    saveFeatures(features);
  }, [features]);

  // Handle adding a new feature
  const handleAddFeature = (featureData) => {
    const newFeature = createFeature(featureData);
    setFeatures((prev) => [...prev, newFeature]);
  };

  // Handle status change
  const handleStatusChange = (featureId, newStatus) => {
    setFeatures((prev) =>
      prev.map((feature) =>
        feature.id === featureId ? { ...feature, status: newStatus } : feature
      )
    );
  };

  // Handle feature deletion
  const handleDeleteFeature = (featureId) => {
    if (window.confirm("Are you sure you want to delete this feature?")) {
      setFeatures((prev) => prev.filter((feature) => feature.id !== featureId));
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Feature Prioritization Tool</h1>
        <p className="subtitle">Manage and prioritize your feature requests</p>
      </header>

      <main className="app-main">
        <FeatureForm onSubmit={handleAddFeature} />
        <FeatureList
          features={features}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteFeature}
        />
      </main>
    </div>
  );
}

export default App;
