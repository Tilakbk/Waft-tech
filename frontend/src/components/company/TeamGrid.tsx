const leaders = [
  { name: "James Wilson", role: "Founder CEO", image: "/images/company/team-james.jpg" },
  { name: "Sonam Sherpa", role: "Chief Operating Officer", image: "/images/company/team-sonam.jpg" },
  { name: "Niraj Shakya", role: "Director of Design", image: "/images/company/team-niraj.jpg" },
  { name: "Manish Ojha", role: "Head of Design", image: "/images/company/team-sakya.jpg" },
];

export default function TeamGrid() {
  return (
    <section style={{ backgroundColor: "var(--color-white)", paddingTop: "5rem", paddingBottom: "7rem" }}>
      <div className="container-custom">
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 700, color: "var(--color-black)", textAlign: "center", marginBottom: "3.5rem" }}>
          Meet our leaders
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.5rem" }}>
          {leaders.map((member) => (
            <div key={member.name}>
              <div style={{ width: "100%", aspectRatio: "3/4", borderRadius: "var(--radius-md)", overflow: "hidden", backgroundColor: "var(--color-gray-bg)", marginBottom: "1rem", filter: "grayscale(100%)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={member.image} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-black)", marginBottom: "0.25rem" }}>{member.name}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--color-brand-teal)" }}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}