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

const TABLE_HEAD = [
  "No",
  "Tanggal diubah",
  "Kode",
  "Barang",
  "stok",
  "Kategori",
  "",
];

const StokGudang = () => {
  const [detail, setDetail] = React.useState(null);
  const [datadetail, setDataDetail] = React.useState(null);
  const [TABLE_ROWS, setTABLE_ROWS] = React.useState([]);
  const handleOpen3 = async (value) => {
    const response = await getBarangID(value);
    setDataDetail(response);
    setDetail(value);
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

  return (
    <SideBar posisi="Stok Gudang">
      <div className="space-y-12 ">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Stok Gudang
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Informasi Stok Gudang
              </p>
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
                    { id, namabarang, updatedAt, kodebarang, kategori, stok },
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
                          {updatedAt.split("T")[0]}
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
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Card>
        </div>
      </div>

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
    </SideBar>
  );
};

export default StokGudang;
