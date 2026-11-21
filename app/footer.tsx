import Nav from "./nav";

export default function Footer() {
  return (
    <div className="w-full  bg-gray-700 md:bg-black py-12">
      <footer className="mx-auto w-full max-w-3xl">
        <Nav location="FOOTER" />
        <Nav location="SECRET" />
      </footer>
    </div>
  );
}
