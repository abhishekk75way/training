import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Authentication</h2>
      {children}
    </div>
  );
};

export default AuthLayout;
