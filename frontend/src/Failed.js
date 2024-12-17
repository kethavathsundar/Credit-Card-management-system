import { useLocation } from 'react-router-dom';

function Failed() {
  const location = useLocation();
  const error = location.state?.error || "Unknown error"; // Default to "Unknown error" if no error is passed

  return (
    <div className="failed-page">
      <h2>Login Failed</h2>
      <p>{error}</p>
    </div>
  );
}

export default Failed;
