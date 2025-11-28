import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Voorraad",
  description: "De online voorraad van huize van Zanten",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col lg:w-[34%] gap-2 sm:w-[80%]">
      <header className="text-center text-4xl">Voorraad Beheer</header>
      <nav className="flex gap-2 list-none justify-between pb-12 pt-4">
        <Link href="/admin/add_storage" className="cursor-pointer">
          Voorraad
        </Link>
        <Link href="/admin/add_product" className="cursor-pointer">
          Product
        </Link>
        <Link href="/admin/add_location" className="cursor-pointer">
          Opbergplaats
        </Link>
      </nav>
      {children}
    </div>
  );
}
