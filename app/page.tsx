import LangingPage from "./components/LandingPage";
import NavBar from "./components/Navbar";
import AdminLogin from "./components/AdminLogin";

export default function Home() {
  return (
    <main className="">
      <NavBar />
      <LangingPage />
      {/* <AdminLogin /> */}
    </main>
  );
}
