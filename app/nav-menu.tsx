"use client";

import { useState } from "react";

export type MenuItem = {
  id: string;
  label: string;
  path: string;
  connectedNode: { node: { __typename: string; id: string } } | null;
};

type MenuLocation = "PRIMARY" | "FOOTER" | "SECRET";

export default function NavMenu({
  items,
  location,
}: {
  items: MenuItem[];
  location: MenuLocation;
}) {
  const [open, setOpen] = useState(false);
  const menuId = `menu-${location.toLowerCase()}`;
  const hiddenMob = location === "FOOTER" ? "" : "hidden";

  return (
    <nav
      id={"nav-" + menuId}
      className={`mx-auto w-full max-w-3xl bg-neutral-primary w-full z-20 top-0 start-0 ${
        open ? "nav-open" : "nav-closed"
      }`}
    >
      {location === "PRIMARY" && (
        <button
          type="button"
          className="rounded p-2 text-gray-700 hover:bg-gray-700 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((currentOpen) => !currentOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="white"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {open ? (
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      )}
      <ul
        id={menuId}
        className={`${open ? "" : hiddenMob} gap-6 text-sm md:flex`}
      >
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.connectedNode ? "/page" + item.path : item.path}
              className="block py-2 px-3 text-white bg-brand rounded hover:bg-gray-700 md:bg-transparent md:text-fg-brand"
              aria-label={item.label}
              target={item.path.startsWith("http") ? "_blank" : "_self"}
            >
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

    </nav>
  );
}
