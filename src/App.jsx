import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import StokGudang from "./Pages/StokGudang";
import PenerimaanBarang from "./Pages/Staf/PenerimaanBarang";
import PengeluaranBarang from "./Pages/Staf/PengeluaranBarang";
import Laporan from "./Pages/Laporan";
import Profile from "./Pages/Profile";
import Setting from "./Pages/Setting";
import ManajemenUser from "./Pages/Admin/ManajemenUser";
import ManajemenBarang from "./Pages/Admin/ManajemenBarang";
import ManajemenPemasok from "./Pages/Admin/ManajemenPemasok";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/StokGudang" element={<StokGudang />} />
        <Route path="/PenerimaanBarang" element={<PenerimaanBarang />} />
        <Route path="/PengeluaranBarang" element={<PengeluaranBarang />} />
        <Route path="/Laporan" element={<Laporan />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/ManajemenUser" element={<ManajemenUser />} />
        <Route path="/ManajemenBarang" element={<ManajemenBarang />} />
        <Route path="/ManajemenPemasok" element={<ManajemenPemasok />} />
      </Routes>
    </BrowserRouter>
  );
}
