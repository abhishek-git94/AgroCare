import VoiceWidget from "../components/VoiceWidget";

export default function CentralDashboard() {
  return (
    <section>
      <div className="card">
        <h2>Central Dashboard</h2>
        <p>Monitor village-level crop health, weather conditions, and government support at a glance.</p>
      </div>
      <div className="card">
        <h3>Summary</h3>
        <ul>
          <li>Crop status: Stable</li>
          <li>Next weather alert: None</li>
          <li>Available schemes: 3</li>
        </ul>
      </div>
      <VoiceWidget />
    </section>
  );
}
