import Image from "next/image";
import Nav from "./nav";

export default function Header() {
  return (
    <div className="w-full font-sans bg-black">
      <header className="mx-auto w-full max-w-3xl bg-black">
        <Image
          className="block h-auto w-full"
          src="/header.png"
          alt="GW Consulting banner"
          width={1024}
          height={376}
          priority
        />

        <Nav location="PRIMARY" />
      </header>
    </div>
  );
}
