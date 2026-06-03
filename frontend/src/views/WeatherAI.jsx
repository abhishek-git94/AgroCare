export default function WeatherAI() {
  return (
    <section>
      <div className="card">
        <h2>Weather AI</h2>
        <p>Generate localized farming alerts based on weather forecasts and risk conditions.</p>
      </div>
      <div className="card">
        <label>
          Location
          <input type="text" placeholder="Enter district or village" style={{ width: "100%", marginTop: 8, padding: 8 }} />
        </label>
      </div>
    </section>
  );
}
