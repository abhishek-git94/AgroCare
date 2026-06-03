import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/crop-doctor", label: "Crop Doctor" },
  { to: "/weather-ai", label: "Weather AI" },
  { to: "/market-schemes", label: "Market & Schemes" },
];

export default function Sidebar() {
  return (
    <aside className="card" style={{ width: 260, padding: 24 }}>
      <h2>AgroSentinel</h2>
      <nav>
        {links.map((link) => (
          <div key={link.to} style={{ marginBottom: 12 }}>
            <NavLink
              to={link.to}
              style={({ isActive }) => ({
                color: isActive ? "#2563eb" : "#111827",
                textDecoration: "none",
                fontWeight: isActive ? 700 : 500,
              })}
            >
              {link.label}
            </NavLink>
          </div>
        ))}
      </nav>
    </aside>
  );
}
