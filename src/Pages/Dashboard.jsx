import React from "react";
import SideBar from "../Components/Layouts/SideBar";

const Dashboard = () => {
  const [dataBarang, setDataBarang] = React.useState([]);
  const [dataAdmin, setDataAdmin] = React.useState([]);
  const getBarang = async () => {
    const response = await axios.get(
      "https://gudang-backend-production.up.railway.app/Barang"
    );
    console.log(response.data);
    setDataBarang(response.data);
  };

  const getDataAdmin = async () => {
    const response = await axios.get(
      "https://gudang-backend-production.up.railway.app/Users"
    );
    console.log(response.data);
    const response2 = await axios.get(
      "https://gudang-backend-production.up.railway.app/Pemasok"
    );
    console.log(response2.data);
    setDataAdmin([response.data.length, response2.data.length]);
  };

  let totalStok = 0;
  dataBarang.map((item) => (totalStok += parseInt(item.stok)));

  const localStorage = window.localStorage;
  let sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);
  React.useEffect(() => {
    getBarang();
    getDataAdmin();
  }, []);

  return (
    <SideBar posisi="Dashboard">
      <div
        className={
          `grid gap-4 ` +
          (Session.role === "Admin" ? ` grid-cols-4` : ` grid-cols-2`)
        }
      >
        <DashboardCard
          angka={dataBarang.length}
          title={"Jumlah Barang"}
          button={"Detail"}
          to={"/stokgudang"}
        />
        <DashboardCard
          angka={totalStok}
          title={"Total Barang"}
          button={"Detail"}
          to={"/stokgudang"}
        />
        {Session.role == "Admin" && (
          <>
            <DashboardCard
              angka={dataAdmin[0]}
              title={"Total User"}
              button={"Detail"}
              to={"/ManajemenUser"}
            />
            <DashboardCard
              angka={dataAdmin[1]}
              title={"Total Pemasok"}
              button={"Detail"}
              to={"/ManajemenPemasok"}
            />
          </>
        )}
        {Session.role == "Staf" && (
          <>
            <CardWithLink
              title={"Penerimaan Barang"}
              button={"Buat"}
              desk={"Membuat penerimaan barang untuk menambah stok"}
              to={"/PenerimaanBarang"}
            />
            <CardWithLink
              title={"Pengeluaran Barang"}
              desk={"Membuat pengeluaran barang untuk laporan barang keluar"}
              button={"Buat"}
              to={"/PengeluaranBarang"}
            />
          </>
        )}
      </div>
      <div>
        {Session.role == "Admin" && (
          <>
            <CardWithLink
              title={"Manajemen Barang"}
              desk={"Manajemen Barang untuk menambah Barang"}
              button={"Buat"}
              to={"/ManajemenBarang"}
            />
            <CardWithLink
              title={"Manajemen User"}
              button={"Buat"}
              desk={"Manajemen User untuk menambah User"}
              to={"/ManajemenUser"}
            />
            <CardWithLink
              title={"Manajemen Pemasok"}
              desk={"Manajemen Pemasok untuk menambah pemasok"}
              button={"Buat"}
              to={"/ManajemenPemasok"}
            />
          </>
        )}
      </div>
    </SideBar>
  );
};

export default Dashboard;

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { Link } from "react-router-dom";

function CheckIcon() {
  return (
    <svg
      xmlns="https://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

function DashboardCard({ angka, title, to, button }) {
  return (
    <Card variant="gradient" className=" bg-blue-800 w-full p-8">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <Typography
          variant="small"
          color="white"
          className="font-normal uppercase"
        >
          {title}
        </Typography>
        <Typography
          variant="h1"
          color="white"
          className="mt-6 flex justify-center gap-1 text-7xl font-normal"
        >
          {angka}
        </Typography>
      </CardHeader>
      <Link
        className="bg-white/20 text-white rounded-md p-4 text-center  hover:bg-white/30 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
        to={to}
      >
        {button}
      </Link>
    </Card>
  );
}

function CardWithLink({ to, title, desk, button }) {
  return (
    <Card className="mt-6">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>{desk}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <a href="#" className="inline-block">
          <Link
            to={to}
            size="sm"
            variant="text"
            className="flex items-center gap-2"
          >
            {button}
            <svg
              xmlns="https://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </a>
      </CardFooter>
    </Card>
  );
}
