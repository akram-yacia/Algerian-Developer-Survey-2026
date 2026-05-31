function Header() {
  return (
    <header className="w-full rounded-b-2xl bg-stone-950 p-4 text-center">
      <a
        href="#"
        className="showcase-font-primary cursor-pointer text-3xl text-stone-50 no-underline"
      >
        StateOfDev<span className="text-stone-300">_DZ</span>
      </a>
      <input
        type="search"
        placeholder="Quick Search..."
        className="mt-4 w-full rounded-md border-2 border-stone-700 bg-stone-900 p-2 text-stone-50 focus:border-blue-500 focus:outline-none"
      >
</p>
      </input>
    </header>
  );
}

export default Header;
