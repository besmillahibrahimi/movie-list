import { PropsWithChildren } from "react";

function AuthLayout({ children }: Readonly<PropsWithChildren>) {
  return <div className="container flex justify-center items-center h-screen  ">{children}</div>;
}

export default AuthLayout;
