import Nav from "./headers/Nav";

export default function Layout({ children }) {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
}
