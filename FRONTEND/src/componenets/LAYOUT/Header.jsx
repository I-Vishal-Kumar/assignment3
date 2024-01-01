import LOGO from "../HOME/HomeAssets/LOGO.png";
function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-1 h-18 bg-header_background ">
      <div
        style={{
          background: `url(${LOGO}) center no-repeat`,
          backgroundSize: "contain",
        }}
        className="rounded-full bg-forgroundColor h-full aspect-square"
      ></div>
    </header>
  );
}

export default Header;
