import { ReactNode } from "react";
import { Nav } from "./nav/menu";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-white">
      <Nav />
      <section>{children}</section>
    </main>
  );
}
