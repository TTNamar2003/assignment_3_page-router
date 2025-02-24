import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 ">
      <nav className="flex flex-row gap-4">
        <Link href="/">Home</Link> | 
        <Link href="/recipesCSR">CSR</Link> | 
        <Link href="/productSSR">SSR</Link> | 
        <Link href="/postsISR">SSG + ISR</Link>
      </nav>
    </header>
  );
}
