import Link from "next/link";
import Layout from "../components/layout";

export default function NotFound() {
  return (
    <Layout>
      <main
        className={"container mx-auto my-40 flex flex-col items-center gap-5"}
      >
        <h2 className={"font-bold text-4xl drop-shadow"}>404 Page not found</h2>
        <p>Sorry, the requested page wasn’t found on the server.</p>
        <Link
          href="/"
          className={
            "text-orange-500 hover:underline focus:underline active:underline"
          }
        >
          Go back home 🏠
        </Link>
      </main>
    </Layout>
  );
}
