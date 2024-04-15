import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section style={{ fontFamily: 'Roboto' }}>
        {children}
    </section>
  );
}