import Logo from "~/assets/redblue.svg";

export default function NavigateGeneral() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-gray-400">
      <div className="w-full xl:max-w-7xl flex justify-between items-center mx-auto">
        <img src={Logo} alt="Logo" width={84} />
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
