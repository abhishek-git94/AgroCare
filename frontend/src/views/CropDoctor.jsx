export default function CropDoctor() {
  return (
    <section>
      <div className="card">
        <h2>Crop Doctor</h2>
        <p>Upload crop images to detect pests, diseases, and provide treatment recommendations.</p>
      </div>
      <div className="card">
        <input type="file" accept="image/*" />
      </div>
    </section>
  );
}
