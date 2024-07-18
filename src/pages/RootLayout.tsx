import { Navigate, Outlet } from "react-router";
import HeaderMainNav from "../components/HeaderMainNav/HeaderMainNav";

function RootLayout({ authentificated }: { authentificated: boolean }) {
  if (!authentificated) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <>
      <HeaderMainNav />
      <main className="w-[99vw]">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
