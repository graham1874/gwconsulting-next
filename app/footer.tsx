import Nav from "./nav";

export default function Footer() {
  return (
    <div className="w-full bg-zinc-50 font-sans dark:bg-black">
      <footer className="mx-auto w-full max-w-3xl bg-white dark:bg-black">
        <Nav location="FOOTER" />
        <Nav location="SECRET" />
      </footer>
    </div>
  );
}
