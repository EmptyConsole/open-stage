export default function Sidebar({ content }) {
  return (
    <aside style={{
      width: '330px',
      height: '100vh',
      backgroundColor: '#e0e0e0',
      boxShadow: '2px 0 5px rgba(0,0,0,0.05)',
      position: 'relative'
    }}>
      <div style={{ padding: "65px 0px" }}>
        <div style={{textAlign: "center",
            fontSize: "20px",
            textJustify: "center",
            color: "black"
        }}>{content}</div>
      </div>
    </aside>
  );
}