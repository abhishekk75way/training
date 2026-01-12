import type { ReactNode } from "react";
import { logout } from "../utils/auth";

interface Props {
  children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <div>
      <header style={{ padding: 20, borderBottom: "1px solid #ddd" }}>
        <span>Dashboard</span>

        <button style={{ float: "right" }} onClick={logout}>
          Logout
        </button>
      </header>

      <main style={{ padding: 20 }}>{children}</main>
    </div>
  );
};

export default AppLayout;
