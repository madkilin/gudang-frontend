import React from "react";
import SideBar from "../../Components/Layouts/SideBar";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { createPDF } from "./PenerimaanBarang";

const PengeluaranBarang = () => {
  let sessionData = localStorage["Login"];
  const Session = sessionData && JSON.parse(sessionData);
  const [pengeluaran, setPengeluaran] = React.useState({
    JenisPengeluaran: "Return",
    Nama: "",
    Tujuan: "",
    KodeBarang: "",
    NamaBarang: "",
    Jumlah: "",
    KondisiBarang: "",
    Keterangan: "",
    Staf: Session.name,
  });

  console.log(pengeluaran);

  const [size, setSize] = React.useState(null);
  const [size2, setSize2] = React.useState(null);
  const handleOpen = (value) => setSize(value);
  const handleOpen2 = (value) => setSize2(value);

  const [statusCreate, setStatusCreate] = React.useState("");
  const [HasilAdd, setHasilAdd] = React.useState("");
  const createPengeluaran = async (value) => {
    const response = await axios.post(
      "https://gudang-backend-production.up.railway.app/Pengeluaran/",
      value
    );
    if (response.data) {
      setHasilAdd(response.data);
      setStatusCreate("Berhasil menambah data");
      handleOpen2("lg");
      console.log(response);
      return response.data;
    } else {
      setStatusCreate("Gagal menambah data");
      handleOpen2("md");
      return false;
    }
  };

  const [idBarang, setidBarang] = React.useState("");
  const [Barang, setBarang] = React.useState("");
  const handleChangeBarang = async (e) => {
    const { name, value } = e.target;
    console.log(value);
    setidBarang(value);
    const respown = await getBarangKode(value);
    console.log(respown);
    setBarang(respown.namabarang ?? "");
    setPengeluaran({
      ...pengeluaran,
      KodeBarang: value,
      NamaBarang: respown.namabarang ?? "",
    });
  };
  const getBarangKode = async (value) => {
    const response = await axios.get(
      "https://gudang-backend-production.up.railway.app/BarangKode/" + value
    );
    if (response.data) {
      return response.data;
    } else {
      return false;
    }
  };

  return (
    <SideBar posisi="Pengeluaran Barang">
      <div>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Pengeluaran Barang
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Formulir Pengeluaran barang kedalam gudang
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="jenisPengeluaran"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Jenis Pengeluaran
                </label>
                <div className="mt-2">
                  <select
                    id="jenisPengeluaran"
                    name="jenisPengeluaran"
                    onChange={(e) => {
                      setPengeluaran({
                        ...pengeluaran,
                        JenisPengeluaran: e.target.value,
                      });
                    }}
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>Return</option>
                    <option>Service</option>
                    <option>Stok Toko</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nama Pengambil Barang
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="nama"
                      id="nama"
                      onChange={(e) => {
                        setPengeluaran({
                          ...pengeluaran,
                          Nama: e.target.value,
                        });
                      }}
                      autoComplete="nama"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="janesmith"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="tujuan-pengeluaran"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tujuan Pengeluaran Barang
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="tujuan-pengeluaran"
                    id="tujuan-pengeluaran"
                    onChange={(e) => {
                      setPengeluaran({
                        ...pengeluaran,
                        Tujuan: e.target.value,
                      });
                    }}
                    autoComplete="tujuan-pengeluaran"
                    placeholder="Tujuan"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Informasi Barang
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Isi untuk melengkapi informasi barang.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="kodebarang"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Kode Barang
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="kodebarang"
                      id="kodebarang"
                      value={idBarang}
                      onChange={handleChangeBarang}
                      autoComplete="kodebarang"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="E002"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="namabarang"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nama Barang
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="namabarang"
                      id="namabarang"
                      autoComplete="namabarang"
                      value={Barang}
                      disabled={true}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Silahkan isi kode barang"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="jumlahbarang"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Jumlah Barang
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="jumlahbarang"
                      id="jumlahbarang"
                      onChange={(e) => {
                        setPengeluaran({
                          ...pengeluaran,
                          Jumlah: e.target.value,
                        });
                      }}
                      autoComplete="jumlahbarang"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="1"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="kondisibarang"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Kondisi Barang
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="kondisibarang"
                      id="kondisibarang"
                      onChange={(e) => {
                        setPengeluaran({
                          ...pengeluaran,
                          KondisiBarang: e.target.value,
                        });
                      }}
                      autoComplete="kondisibarang"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Bagus"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Keterangan
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    onChange={(e) => {
                      setPengeluaran({
                        ...pengeluaran,
                        Keterangan: e.target.value,
                      });
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Tulisankan keterangan jika perlu.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={() => handleOpen("lg")}
            variant="gradient"
            className="rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        size={size || "lg"}
        handler={handleOpen}
      >
        <DialogHeader className="bg-blue-gray-50 rounded-xl text-black">
          Konfirmasi pengeluaran Barang.
        </DialogHeader>
        <DialogBody className="bg-blue-gray-50">
          {pengeluaran && (
            <div class=" mx-auto ">
              <div class="shadow-none md:shadow-md md:rounded-md overflow-hidden">
                <div class="md:rounded-b-md  bg-white">
                  <div class="p-9 border-b border-gray-200">
                    <div class="space-y-6">
                      <div class="flex justify-between items-top">
                        <div class="space-y-4">
                          <div>
                            <p class="font-bold text-lg text-black">
                              Draft Pengeluaran#{pengeluaran.id}
                            </p>
                            <p class="text-gray-600">
                              Draft {pengeluaran.JenisPengeluaran}#
                              {pengeluaran.id}
                            </p>
                          </div>
                          <div>
                            <p class="font-medium text-sm text-black">Oleh</p>
                            <p className="text-gray-600">{pengeluaran.Nama}</p>
                          </div>
                          <div>
                            <p class="font-medium text-sm text-black">Tujuan</p>
                            <p className="text-gray-600">
                              {pengeluaran.Tujuan}
                            </p>
                          </div>
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
                            <p class="font-medium text-sm text-black">
                              Tanggal Laporan
                            </p>
                            <p className="text-gray-600">-</p>
                          </div>
                          <div>
                            <p class="font-medium text-sm text-black">
                              Petugas
                            </p>
                            <p className="text-gray-600">{pengeluaran.Staf}</p>
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
                          class="px-9 py-4 text-left font-semibold text-black"
                        >
                          Kode Barang
                        </th>
                        <th
                          scope="col"
                          class="py-3 text-left font-semibold text-black"
                        >
                          Nama Barang
                        </th>
                        <th
                          scope="col"
                          class="py-3 text-left font-semibold text-black"
                        >
                          Jumlah Barang
                        </th>
                        <th
                          scope="col"
                          class="py-3 text-left font-semibold text-black"
                        >
                          Kondisi Barang
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="pl-9 py-5 whitespace-nowrap items-center text-gray-600">
                          {pengeluaran.KodeBarang}
                        </td>
                        <td class="whitespace-nowrap text-gray-600 truncate">
                          {pengeluaran.NamaBarang}
                        </td>
                        <td class="whitespace-nowrap text-gray-600 truncate">
                          {pengeluaran.Jumlah}
                        </td>
                        <td class="whitespace-nowrap text-gray-600 truncate">
                          {pengeluaran.KondisiBarang}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="p-9 border-b border-gray-200">
                    <div>
                      <p class="font-medium text-sm text-black">Keterangan</p>
                      <p className="text-gray-600">{pengeluaran.Keterangan}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter className="bg-blue-gray-50 rounded-xl text-black">
          <Button
            variant="text"
            color="black"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="blue"
            onClick={() => {
              handleOpen(null);
              createPengeluaran(pengeluaran);
            }}
          >
            <span>Konfirmasi</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog
        open={
          size2 === "xs" ||
          size2 === "sm" ||
          size2 === "md" ||
          size2 === "lg" ||
          size2 === "xl" ||
          size2 === "xxl"
        }
        size={size2 || "lg"}
        handler={handleOpen2}
      >
        <DialogHeader className="bg-blue-gray-50 rounded-xl text-black">
          {statusCreate}
        </DialogHeader>
        <DialogBody className="bg-blue-gray-50">
          {console.log(HasilAdd.data)}
          {pengeluaran && (
            <div class=" mx-auto ">
              <div class="shadow-none md:shadow-md md:rounded-md overflow-hidden">
                <div id="pdf" class="md:rounded-b-md  bg-white">
                  <div class="p-9 border-b border-gray-200">
                    <div class="space-y-6">
                      <div class="flex justify-between items-top">
                        <div class="space-y-4">
                          <div>
                            <p class="font-bold text-lg text-black">
                              Pengeluaran#
                              {HasilAdd && HasilAdd.data.Laporan?.id}
                            </p>
                            <p class="text-gray-600">
                              {pengeluaran.JenisPengeluaran}#
                              {HasilAdd && HasilAdd.data.Pengeluaran?.id}
                            </p>
                          </div>
                          <div>
                            <p class="font-medium text-sm text-black">Oleh</p>
                            <p className="text-gray-600">{pengeluaran.Nama}</p>
                          </div>
                          <div>
                            <p class="font-medium text-sm text-black">Tujuan</p>
                            <p className="text-gray-600">
                              {pengeluaran.Tujuan}
                            </p>
                          </div>
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
                            <p class="font-medium text-sm text-black">
                              Tanggal Laporan
                            </p>
                            <p className="text-gray-600">
                              {HasilAdd &&
                                HasilAdd.data.Laporan?.createdAt.split("T")[0]}
                            </p>
                          </div>
                          <div>
                            <p class="font-medium text-sm text-black">
                              Petugas
                            </p>
                            <p className="text-gray-600">{pengeluaran.Staf}</p>
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
                          class="px-9 py-4 text-left font-semibold text-black"
                        >
                          Kode Barang
                        </th>
                        <th
                          scope="col"
                          class="py-3 text-left font-semibold text-black"
                        >
                          Nama Barang
                        </th>
                        <th
                          scope="col"
                          class="py-3 text-left font-semibold text-black"
                        >
                          Jumlah Barang
                        </th>
                        <th
                          scope="col"
                          class="py-3 text-left font-semibold text-black"
                        >
                          Kondisi Barang
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr>
                        <td class="pl-9 py-5 whitespace-nowrap items-center text-gray-600">
                          {pengeluaran.KodeBarang}
                        </td>
                        <td class="whitespace-nowrap text-gray-600 truncate">
                          {pengeluaran.NamaBarang}
                        </td>
                        <td class="whitespace-nowrap text-gray-600 truncate">
                          {pengeluaran.Jumlah}
                        </td>
                        <td class="whitespace-nowrap text-gray-600 truncate">
                          {pengeluaran.KondisiBarang}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="p-9 border-b border-gray-200">
                    <div>
                      <p class="font-medium text-sm text-black">Keterangan</p>
                      <p className="text-gray-600">{pengeluaran.Keterangan}</p>
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
              handleOpen2(null);
            }}
          >
            <span>Oke</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </SideBar>
  );
};

export default PengeluaranBarang;
