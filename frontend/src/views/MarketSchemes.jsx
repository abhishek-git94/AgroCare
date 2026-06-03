export default function MarketSchemes() {
  return (
    <section>
      <div className="card">
        <h2>Market Schemes</h2>
        <p>Review current mandi rates and apply for government agriculture schemes.</p>
      </div>
      <div className="card">
        <label>
          Crop
          <input type="text" placeholder="Enter crop name" style={{ width: "100%", marginTop: 8, padding: 8 }} />
        </label>
      </div>
    </section>
  );
}
