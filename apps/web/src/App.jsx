import { AuthProvider } from "./context/AuthContext.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { LandingPage } from "./pages/LandingPage.jsx";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-clash-bg text-clash-text">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <LandingPage />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
