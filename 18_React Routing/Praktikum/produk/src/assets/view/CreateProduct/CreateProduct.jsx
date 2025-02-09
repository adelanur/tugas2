import { useEffect, useState } from "react";
import "./CreateProduct.css";

import { Form, Header, Tabel } from "../../molekul";
import article from "../../../Artikel";
import Navbar from "../../organism/Navbar/Navbar";

const CreateProduct = ({ data, setData }) => {
  const [id, setId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("choose");
  const [foto, setFoto] = useState("");
  const [freshness, setFreshness] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [price, setPrice] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedProduct = [...data].map((product) => {
      if (product.id == id) {
        return {
          id: id,
          nama: nama,
          kategori: kategori,
          foto: foto,
          freshness: freshness,
          deskripsi: deskripsi,
          price: price,
        };
      }
      return product;
    });

    setData(updatedProduct);
    setNama("");
    setKategori("");
    setFoto("");
    setFreshness("");
    setDeskripsi("");
    setPrice("");
    setId("");
    setIsEdit(false);
  };

  const handleDelete = (id) => {
    const konfirmasiDelete = window.confirm("Apakah yakin hapus?");
    if (konfirmasiDelete == true) {
      const newData = [...data].filter((item) => item.id != id);
      setData(newData);
    }
  };
  const handleEdit = (item) => {
    setNama(item.nama);
    setKategori(item.kategori);
    setFreshness(item.freshness);
    setFoto(item.foto);
    setDeskripsi(item.deskripsi);
    setPrice(item.price);
    setId(item.id);
    setIsEdit(true);
  };

  // useEffect(()=> {
  //     alert ("WELCOME")
  //   },[]);

  return (
    <div className="App">
      <Navbar />
      <Header />
      <Form
        data={data}
        setData={setData}
        nama={nama}
        setNama={setNama}
        kategori={kategori}
        setKategori={setKategori}
        foto={foto}
        setFoto={setFoto}
        freshness={freshness}
        setFreshness={setFreshness}
        deskripsi={deskripsi}
        setDeskripsi={setDeskripsi}
        price={price}
        setPrice={setPrice}
        isEdit={isEdit}
        handleUpdate={handleUpdate}
      />
      {/* <Button/> */}
      <Tabel produk={data} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default CreateProduct;
