import "tailwindcss/tailwind.css";
import Layout from "../components/_layout";

export default function MyApp({ Component, pageProps }: any) {
  return (
    <Layout>
        <Component {...pageProps}/>
    </Layout>
  );
}