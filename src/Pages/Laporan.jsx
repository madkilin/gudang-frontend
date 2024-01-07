import React, { useEffect } from "react";
import SideBar from "../Components/Layouts/SideBar";
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { CSVLink } from "react-csv";
import { createPDF } from "./Staf/PenerimaanBarang";

const TABLE_HEAD = [
  "No",
  "Tanggal dibuat",
  "Jenis Laporan",
  "Kode Barang",
  "Nama",
  "Jumlah",
  "",
];

const Laporan = () => {
  const [detail, setDetail] = React.useState(null);
  const [datadetail, setDataDetail] = React.useState(null);
  const [TABLE_ROWS, setTABLE_ROWS] = React.useState([]);
  const [Csv, setCsv] = React.useState([]);
  const handleOpen3 = async (value) => {
    const response = await getBarangID(value);
    setDataDetail(response);
    setDetail(value);
  };

  useEffect(() => {
    getBarang();
  }, []);

  const getBarang = async () => {
    const response = await axios.get("http://localhost:3000/Laporan");
    console.log(response.data);
    const sortedData = [...response.data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const csvData = [
      [
        "No",
        "Tanggal dibuat",
        "Id",
        "Jenis Laporan",
        "Jenis",
        "Kode Barang",
        "Nama Barang",
        "Keterangan",
        "Kondisi Barang",
        "Jumlah",
        "Staff",
        "Pemasok",
      ],
      ...response.data.map(
        (
          {
            id,
            JenisLaporan,
            Jenis,
            Nama,
            KodeBarang,
            NamaBarang,
            Jumlah,
            KondisiBarang,
            Keterangan,
            Staf,
            createdAt,
          },
          index
        ) => [
          index,
          createdAt,
          id,
          JenisLaporan,
          Jenis,
          KodeBarang,
          NamaBarang,
          Keterangan,
          KondisiBarang,
          Jumlah,
          Staf,
          Nama,
        ]
      ),
    ];

    setCsv(csvData);

    console.log(sortedData);
    setTABLE_ROWS(sortedData);
  };

  const getBarangID = async (value) => {
    const response = await axios.get("http://localhost:3000/Laporan/" + value);
    console.log(response.data);
    if (response.data?.JenisLaporan === "Pengeluaran") {
      const response2 = await axios.get(
        "http://localhost:3000/LaporanPengeluaran/" + response.data.id
      );
      console.log(response2.data);
      return ["Pengeluaran", response2.data, response.data];
    } else if (response.data?.JenisLaporan === "Penerimaan") {
      const response2 = await axios.get(
        "http://localhost:3000/LaporanPenerimaan/" + response.data.id
      );
      console.log(response2.data);
      return ["Penerimaan", response2.data, response.data];
    }
  };

  return (
    <SideBar posisi="Laporan">
      <div className="space-y-12 ">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Laporan
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Informasi Laporan
              </p>
            </div>
            <div>
              <Button>
                <CSVLink filename="Laporan-Gudang.csv" data={Csv}>
                  Export to CSV
                </CSVLink>
              </Button>
            </div>
          </div>
          <Card className="h-full w-full mt-10">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-100 bg-blue-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(
                  (
                    { id, KodeBarang, updatedAt, JenisLaporan, Jumlah, Nama },
                    index
                  ) => (
                    <tr key={name} className="even:bg-blue-50/50">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {TABLE_ROWS.length - index}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {updatedAt.split("T")[0]}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {JenisLaporan}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {KodeBarang}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Nama}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {Jumlah}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          onClick={() => handleOpen3(id)}
                        >
                          Detail
                        </Typography>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </div>

      <Dialog open={detail} handler={handleOpen3} size="lg">
        <DialogHeader className="bg-blue-gray-50 rounded-xl text-black">
          Detail Laporan
        </DialogHeader>
        <DialogBody className="bg-blue-gray-50">
          {datadetail && (
            <div class=" mx-auto ">
              <div class="shadow-none md:shadow-md md:rounded-md overflow-hidden">
                <div id="pdf" class="md:rounded-b-md  bg-white">
                  <div class="p-9 border-b border-gray-200">
                    <div class="space-y-6">
                      <div class="flex justify-between items-top">
                        <div class="space-y-4">
                          {datadetail[0] === "Pengeluaran" && (
                            <>
                              <div>
                                <p class="font-bold text-lg text-black">
                                  {datadetail[2].JenisLaporan}#
                                  {datadetail[2].id}
                                </p>
                                <p class="text-gray-600">
                                  {datadetail[1].JenisPengeluaran}#
                                  {datadetail[1].id}
                                </p>
                              </div>
                              <div>
                                <p class="font-medium text-sm text-gray-400">
                                  Oleh
                                </p>
                                <p className="text-gray-600">
                                  {datadetail[1].Nama}
                                </p>
                              </div>
                              <div>
                                <p class="font-medium text-sm text-gray-400">
                                  Tujuan
                                </p>
                                <p className="text-gray-600">
                                  {datadetail[1].Tujuan}
                                </p>
                              </div>
                            </>
                          )}
                          {datadetail[0] === "Penerimaan" && (
                            <>
                              <div>
                                <p class="font-bold text-lg text-black">
                                  {datadetail[2].JenisLaporan}#
                                  {datadetail[2].id}
                                </p>
                                <p class="text-gray-600">
                                  {datadetail[1].JenisPenerimaan}#
                                  {datadetail[1].id}
                                </p>
                              </div>
                              <div>
                                <p class="font-medium text-sm text-gray-400">
                                  Perusahaan
                                </p>
                                <p className="text-gray-600">
                                  {datadetail[1].Perusahaan}
                                </p>
                              </div>
                              <div>
                                <p class="font-medium text-sm text-gray-400">
                                  Oleh
                                </p>
                                <p className="text-gray-600">
                                  {datadetail[1].Nama}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                        <div class="space-y-2 text-right">
                          <div>
                            <p class="font-bold text-lg text-black">Gudang</p>
                            <p className="max-w-[280px] text-md text-gray-600">
                              Jl. Mayor Syamsu No.1, Jayaraga, Kec. Tarogong
                              Kidul, Kabupaten Garut, Jawa Barat, INDONESIA
                              44151
                            </p>
                          </div>
                          <div>
                            <p class="font-medium text-sm text-gray-400">
                              Tanggal Laporan
                            </p>
                            <p className="text-gray-600">
                              {datadetail[1].createdAt.split("T")[0]}
                            </p>
                          </div>
                          <div>
                            <p class="font-medium text-sm text-gray-400">
                              Petugas
                            </p>
                            <p className="text-gray-600">
                              {datadetail[1].Staf}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <table class="w-full divide-y divide-gray-200 text-sm">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          class="px-9 py-4 text-left font-semibold text-gray-400"
                        >
                          Kode Barang
                        </th>
                        <th
                          scope="col"
                          class="py-3 text-left font-semibold text-gray-400"
                        >
                          Nama Barang
                        </th>
                        <th
                          scope="col"
                          class="py-3 text-left font-semibold text-gray-400"
                        >
                          Jumlah Barang
                        </th>
                        <th
                          scope="col"
                          class="py-3 text-left font-semibold text-gray-400"
                        >
                          Kondisi Barang
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="pl-9 py-5 whitespace-nowrap items-center text-gray-600">
                          {datadetail[1].KodeBarang}
                        </td>
                        <td class="whitespace-nowrap text-gray-600 truncate">
                          {datadetail[1].NamaBarang}
                        </td>
                        <td class="whitespace-nowrap text-gray-600 truncate">
                          {datadetail[1].Jumlah}
                        </td>
                        <td class="whitespace-nowrap text-gray-600 truncate">
                          {datadetail[1].KondisiBarang}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="p-9 border-b border-gray-200">
                    <div>
                      <p class="font-medium text-sm text-gray-400">
                        Keterangan
                      </p>
                      <p className="text-gray-600">
                        {datadetail[1].Keterangan}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter className="bg-blue-gray-50 rounded-xl text-black flex gap-5">
          <Button
            className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-black dark:hover:text-white dark:focus:ring-offset-gray-800"
            onClick={() => createPDF()}
          >
            <svg
              className="flex-shrink-0 w-4 h-4"
              xmlns="https://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download PDF
          </Button>
          <Button
            variant="gradient"
            color="blue"
            onClick={() => {
              handleOpen3(null);
            }}
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </SideBar>
  );
};

export default Laporan;
