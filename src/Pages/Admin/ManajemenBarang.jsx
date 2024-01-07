import React, { useEffect } from "react";
import SideBar from "../../Components/Layouts/SideBar";
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

const TABLE_HEAD = [
  "No",
  "Tanggal dibuat",
  "Kode",
  "Barang",
  "stok",
  "Kategori",
  "",
];

const ManajemenBarang = () => {
  const [detail, setDetail] = React.useState(null);
  const [datadetail, setDataDetail] = React.useState(null);
  const [ubah, setUbah] = React.useState(null);
  const [hapus, setHapus] = React.useState(null);
  const [tambah, setTambah] = React.useState(null);
  const [TABLE_ROWS, setTABLE_ROWS] = React.useState([]);
  const [statusCreate, setStatusCreate] = React.useState("");
  const [dialogSukses, setDialogSukses] = React.useState("");
  const handleOpen = async (value) => {
    const response = await getBarangID(value);
    setDataDetail(response);
    setUbah(value);
  };
  const handleOpen2 = async (value) => {
    const response = await getBarangID(value);
    console.log(response);
    setDataDetail(response);
    setHapus(value);
  };
  const handleOpen3 = async (value) => {
    const response = await getBarangID(value);
    setDataDetail(response);
    setDetail(value);
  };
  const handleOpen4 = (value) => setTambah(value);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataDetail({ ...datadetail, [name]: value });
  };

  useEffect(() => {
    getBarang();
  }, []);

  const getBarang = async () => {
    const response = await axios.get(
      "https://gudang-backend-production.up.railway.app/Barang"
    );
    console.log(response.data);
    setTABLE_ROWS(response.data);
  };

  const getBarangID = async (value) => {
    const response = await axios.get(
      "https://gudang-backend-production.up.railway.app/Barang/" + value
    );
    return response.data;
  };

  const tambahBarang = async (value) => {
    const response = await axios.post(
      "https://gudang-backend-production.up.railway.app/Barang/",
      value
    );
    console.log(response.data);
    setStatusCreate("Berhasil menambah data");
    setDialogSukses("md");
    return response.data;
  };
  const deleteBarangID = async (value) => {
    const response = await axios.delete(
      "https://gudang-backend-production.up.railway.app/Barang/" + value
    );
    setStatusCreate("Berhasil menghapus data");
    setDialogSukses("md");
    console.log(response.data);
    return response.data;
  };

  const editBarangID = async (value, data) => {
    const response = await axios.patch(
      "https://gudang-backend-production.up.railway.app/Barang/" + value,
      data
    );
    setStatusCreate("Berhasil mengedit data");
    setDialogSukses("md");
    console.log(response.data);
    return response.data;
  };

  return (
    <SideBar posisi="Manajemen Barang">
      <div className="space-y-12 ">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Manajemen Barang
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Informasi Manajemen Barang
              </p>
            </div>
            <div className="mr-5">
              <button onClick={() => handleOpen4(true)}>Tambah</button>
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
                    { id, namabarang, createdAt, kodebarang, kategori, stok },
                    index
                  ) => (
                    <tr key={name} className="even:bg-blue-50/50">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {createdAt.split("T")[0]}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {kodebarang}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {namabarang}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {stok}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {kategori}
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
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          onClick={() => handleOpen(id)}
                        >
                          Ubah
                        </Typography>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                          onClick={() => handleOpen2(id)}
                        >
                          Hapus
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

      <Dialog
        open={ubah}
        handler={handleOpen}
        className="h-3/4 overflow-y-auto scrollable-content"
      >
        <DialogHeader>Ubah Barang</DialogHeader>
        <DialogBody>
          {datadetail && (
            <div class="max-w-screen-lg mb-2 ">
              <div class="flex flex-col gap-6">
                <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  kodebarang
                </h6>
                <div class="relative h-11 w-full min-w-[200px]">
                  <input
                    placeholder={datadetail.kodebarang}
                    value={datadetail.kodebarang}
                    name="kodebarang"
                    onChange={handleInputChange}
                    class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                </div>

                <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  namabarang
                </h6>
                <div class="relative h-11 w-full min-w-[200px]">
                  <input
                    placeholder={datadetail.namabarang}
                    value={datadetail.namabarang}
                    name="namabarang"
                    onChange={handleInputChange}
                    class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                </div>

                <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  kategori
                </h6>
                <div class="relative h-11 w-full min-w-[200px]">
                  <input
                    placeholder={datadetail.kategori}
                    value={datadetail.kategori}
                    name="kategori"
                    onChange={handleInputChange}
                    class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                </div>

                <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  deskripsi
                </h6>
                <div class="relative h-11 w-full min-w-[200px]">
                  <input
                    placeholder={datadetail.deskripsi}
                    value={datadetail.deskripsi}
                    name="deskripsi"
                    onChange={handleInputChange}
                    class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                </div>

                <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                  stok
                </h6>
                <div class="relative h-11 w-full min-w-[200px]">
                  <input
                    placeholder={datadetail.stok}
                    value={datadetail.stok}
                    name="stok"
                    onChange={handleInputChange}
                    class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  />
                  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
                </div>
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="black"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Batal</span>
          </Button>
          <Button
            variant="gradient"
            color="blue"
            onClick={() => {
              handleOpen(null);
              editBarangID(datadetail.id, {
                kodebarang: datadetail.kodebarang,
                namabarang: datadetail.namabarang,
                kategori: datadetail.kategori,
                deskripsi: datadetail.deskripsi,
                stok: datadetail.stok,
              });
            }}
          >
            <span>Ubah</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={hapus} handler={handleOpen2}>
        <DialogHeader>Hapus Barang</DialogHeader>
        <DialogBody>
          apakah anda yakin akan menghapus {datadetail && datadetail.namabarang}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="black"
            onClick={() => handleOpen2(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="blue"
            onClick={() => {
              handleOpen2(null);
              deleteBarangID(datadetail.id);
            }}
          >
            <span>Konfirmasi</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={detail} handler={handleOpen3}>
        <DialogHeader>Detail Barang</DialogHeader>
        <DialogBody>
          {datadetail && (
            <table className="w-full min-w-max table-auto text-left">
              <tbody>
                {Object.keys(datadetail).map((key) => {
                  return (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{datadetail[key]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </DialogBody>
        <DialogFooter>
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

      <Dialog
        open={tambah}
        handler={handleOpen4}
        className="h-3/4 overflow-y-auto scrollable-content"
      >
        <DialogHeader>Tambah Barang</DialogHeader>
        <DialogBody>
          <div class="max-w-screen-lg mb-2 ">
            <div class="flex flex-col gap-6">
              <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                kodebarang
              </h6>
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  placeholder={"kodebarang"}
                  name="kodebarang"
                  onChange={handleInputChange}
                  class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
              </div>

              <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                namabarang
              </h6>
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  placeholder={"namabarang"}
                  name="namabarang"
                  onChange={handleInputChange}
                  class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
              </div>

              <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                kategori
              </h6>
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  placeholder={"kategori"}
                  name="kategori"
                  onChange={handleInputChange}
                  class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
              </div>

              <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                deskripsi
              </h6>
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  placeholder={"deskripsi"}
                  name="deskripsi"
                  onChange={handleInputChange}
                  class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
              </div>

              <h6 class="block -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                stok
              </h6>
              <div class="relative h-11 w-full min-w-[200px]">
                <input
                  placeholder={"stok"}
                  name="stok"
                  onChange={handleInputChange}
                  class="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all before:content-none after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all after:content-none peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="black"
            onClick={() => handleOpen4(null)}
            className="mr-1"
          >
            <span>Batal</span>
          </Button>
          <Button
            variant="gradient"
            color="blue"
            onClick={() => {
              handleOpen4(null);
              tambahBarang({
                kodebarang: datadetail.kodebarang,
                namabarang: datadetail.namabarang,
                kategori: datadetail.kategori,
                deskripsi: datadetail.deskripsi,
                stok: datadetail.stok,
              });
            }}
          >
            <span>Tambah</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog open={dialogSukses} handler={dialogSukses}>
        <DialogHeader>{statusCreate}</DialogHeader>
        <DialogFooter>
          <Button
            variant="gradient"
            color="blue"
            onClick={() => {
              setDialogSukses(null);
            }}
          >
            <span>Oke</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </SideBar>
  );
};

export default ManajemenBarang;
