import { PropsWithChildren } from "react";
import Header from "../components/header";

function DefaultLayout({ children }: PropsWithChildren<{}>): JSX.Element {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default DefaultLayout;


