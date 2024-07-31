import Footer from "./footer";
import Meta from "./meta";
import Navbar from "./navbar";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <Navbar />
      <>{children}</>
      <Footer />
    </>
  );
};

export default Layout;
