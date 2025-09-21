export default function FooterGeneral() {
  return (
    <footer>
      <nav className="flex space-x-4" aria-label="Main navigation">
        <a href="/" className="hover:underline">
          首页
        </a>
        <a href="/about" className="hover:underline">
          关于区块链
        </a>
      </nav>{" "}
    </footer>
  );
}
