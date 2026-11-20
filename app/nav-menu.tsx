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

  return (
    <nav
      id={"nav-" + menuId}
      className={`mx-auto w-full max-w-3xl bg-neutral-primary w-full z-20 top-0 start-0 border-b border-default ${
        open ? "nav-open" : "nav-closed"
      }`}
    >
      <ul
        id={menuId}
        className={`${open ? "flex" : "hidden"} gap-6 text-sm md:flex`}
      >
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.connectedNode ? "/page" + item.path : item.path}
              className="block py-2 px-3 text-white bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
              aria-label={item.label}
            >
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      {location === "PRIMARY" && (
        <button
          type="button"
          className="rounded p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((currentOpen) => !currentOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
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
    </nav>
  );
}
