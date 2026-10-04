import BlindSpotApp from "./pages/BlindSpotApp";

export default function App() {
  return (
    <div
      className="blindspot-root-container"
      style={{
        minHeight: "100vh",
        background: "#0B0F19",
        color: "#F3F4F6",
      }}
    >
      <BlindSpotApp />
    </div>
  );
}
