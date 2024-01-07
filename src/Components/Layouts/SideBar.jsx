import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SideBar = ({ children, posisi }) => {
  const navigate = useNavigate();

  const localStorage = window.localStorage;
  let sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);
  if (Session == undefined) {
    navigate("/");
  }
  const [open, setOpen] = useState(true);
  let Menus = false;
  if (Session?.role == "Staf") {
    Menus = [
      { title: "Dashboard", src: "Chart_fill", to: "/dashboard" },
      { title: "Stok Gudang", src: "Search", gap: true, to: "/stokgudang" },
      { title: "Penerimaan Barang", src: "Folder", to: "/PenerimaanBarang" },
      {
        title: "Pengeluaran Barang",
        src: "Calendar",
        to: "/PengeluaranBarang",
      },
      { title: "Laporan", src: "Chart", to: "/Laporan" },
      { title: "Profile", src: "User", gap: true, to: "/Profile" },
    ];
  } else if (Session?.role == "Admin") {
    Menus = [
      { title: "Dashboard", src: "Chart_fill", to: "/dashboard" },
      { title: "Stok Gudang", src: "Search", gap: true, to: "/stokgudang" },
      { title: "Laporan", src: "Chart", to: "/Laporan" },
      {
        title: "Manajemen Barang",
        src: "Search",
        gap: true,
        to: "/manajemenbarang",
      },
      { title: "Manajemen User", src: "Search", to: "/ManajemenUser" },
      { title: "Manajemen Pemasok", src: "Search", to: "/manajemenpemasok" },
      { title: "Profile", src: "User", gap: true, to: "/Profile" },
    ];
  }

  return Menus ? (
    <div className="flex bg-light-white">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-blue-900 h-screen p-5 pt-8 relative duration-300`}
      >
        <img
          src="/src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="/src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Gudang
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li key={index}>
              <Link
                to={Menu.to}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  Menu.title === posisi && "bg-light-white"
                } `}
              >
                <img src={`/src/assets/${Menu.src}.png`} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </Link>
            </li>
          ))}
          <li key={99}>
            <button
              to="/"
              onClick={() => {
                localStorage.removeItem("Login");
                navigate("/", { state: false });
              }}
              className={`flex w-full mt-2 rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
            >
              <img src={`/src/assets/Setting.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </button>
          </li>
        </ul>
      </div>
      <div className="h-screen flex-1 p-7 overflow-y-auto">{children}</div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      404 Not Found
    </div>
  );
};
export default SideBar;
