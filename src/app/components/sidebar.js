export default function Sidebar({ items = [], onSelect, selectedId }) {
  return (
    <aside
      style={{
        width: "330px",
        height: "100vh",
        backgroundColor: "#e0e0e0",
        boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
        position: "relative",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div style={{ padding: "65px 16px" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
            color: "black",
          }}>
          <h2 style={{ fontWeight: 'bold', marginBottom: 24 }}>Concerts</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map(item => (
              <li key={item.id} style={{ marginBottom: 12 }}>
                <button
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: item.id === selectedId ? '#36a2eb' : '#fff',
                    color: item.id === selectedId ? '#fff' : '#333',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: item.id === selectedId ? 'bold' : 'normal',
                  }}
                  onClick={() => onSelect && onSelect(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
