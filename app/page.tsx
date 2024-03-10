import LangingPage from "./components/LandingPage";
import NavBar from "./components/Navbar";
import AdminLogin from "./components/AdminLogin";
import AdminInfoCards from "./components/AdminInfoCards";

export default function Home() {
  return (
    <main className="">
      <NavBar />
      <LangingPage />
      {/* <AdminLogin /> */}
      <AdminInfoCards />
    </main>
  );
}
