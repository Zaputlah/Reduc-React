import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addBarang, updateBarang, deleteBarang } from "../../features/barangSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form } from "react-bootstrap";
import "../../css/Barang.css"; // Import file CSS khusus untuk komponen Barang

const Dashboard = () => {
    const [formData, setFormData] = useState({
        id: "",
        foto: "",
        nama: "",
        hargaBeli: "",
        hargaJual: "",
        stok: "",
    });

    const [showTambahModal, setShowTambahModal] = useState(false); // State untuk mengontrol tampilan pop-up form tambah
    const [showEditModal, setShowEditModal] = useState(false); // State untuk mengontrol tampilan pop-up form edit
    const [currentPage, setCurrentPage] = useState(1);
    const dataPerPage = 5; // Jumlah data yang ingin ditampilkan per halaman

    const paginationStyle = {
        margin: "20px 0", // Add your desired margin values here
    };

    const dispatch = useDispatch();
    const dataBarang = useSelector((state) => state.barang.dataBarang);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(dataBarang);


    const maxFileSizeInBytes = 100 * 1024; // 100KB

    const isImageFileValid = (file) => {
        const allowedFormats = ["image/jpeg", "image/png"];
        return allowedFormats.includes(file.type) && file.size <= maxFileSizeInBytes;
    };

    const isNamaBarangUnique = (nama) => {
        return !dataBarang.some((barang) => barang.nama === nama);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0],
        });
    };

    const handleTambah = () => {
        setFormData({
            id: "",
            foto: "",
            nama: "",
            hargaBeli: "",
            hargaJual: "",
            stok: "",
        });
        setShowTambahModal(true); // Tampilkan pop-up form untuk menambah data
        setShowEditModal(false); // Pastikan pop-up form edit tertutup jika sedang terbuka
    };

    const handleEdit = (id) => {
        const barang = dataBarang.find((barang) => barang.id === id);
        if (barang) {
            setFormData(barang);
            setShowEditModal(true); // Tampilkan pop-up form untuk mengedit data
            setShowTambahModal(false); // Pastikan pop-up form tambah tertutup jika sedang terbuka
        }
    };

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus data ini?");
        if (isConfirmed) {
            dispatch(deleteBarang(id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.foto || !isImageFileValid(formData.foto)) {
            alert("Mohon pilih file gambar dengan format JPG atau PNG dan ukuran maksimal 100KB.");
            return;
        }

        if (showTambahModal && !isNamaBarangUnique(formData.nama)) {
            alert("Nama barang harus unik. Barang dengan nama tersebut sudah ada.");
            return;
        }

        if (formData.id) {
            dispatch(updateBarang(formData));
        } else {
            dispatch(addBarang({ ...formData, id: uuidv4() }));
        }
        setFormData({
            id: "",
            foto: "",
            nama: "",
            hargaBeli: "",
            hargaJual: "",
            stok: "",
        });
        setShowTambahModal(false); // Tutup pop-up form setelah data ditambahkan
        setShowEditModal(false); // Tutup pop-up form setelah data diubah
    };

    // Menghitung index data awal dan akhir untuk tampilan pagination
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;
    const currentData = dataBarang.slice(indexOfFirstData, indexOfLastData);

    // Calculate the total number of pages
    const totalPages = Math.ceil(dataBarang.length / dataPerPage);

    // Generate an array of page numbers [1, 2, 3, ..., totalPages]
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter the data based on the search query
        const filtered = dataBarang.filter((barang) =>
            barang.nama.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filtered); // Perbarui nilai filteredData untuk mencerminkan hasil pencarian
    };

    // Function to set the current page when a page number is clicked
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mt-5">
            <h2>Daftar Barang</h2>
            <Form.Control
                type="text"
                placeholder="Cari nama barang..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            // {filteredData.map((barang) => (
                <ul className="list-group">
                    {currentData.map((barang) => (
                        <li key={barang.id} className="list-group-item">
                            <div>
                                <strong>Nama Barang:</strong> {barang.nama}
                            </div>
                            <div>
                                <strong>Harga Beli:</strong> {barang.hargaBeli}
                            </div>
                            <div>
                                <strong>Harga Jual:</strong> {barang.hargaJual}
                            </div>
                            <div>
                                <strong>Stok:</strong> {barang.stok}
                            </div>
                            <div>
                                <Button
                                    variant="primary"
                                    className="mr-4"
                                    onClick={() => handleEdit(barang.id)}
                                    style={{ margin: "4px" }}
                                >
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(barang.id)}
                                >
                                    Hapus
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            // ))}

            <div className="pagination mr-4" style={paginationStyle}>
                {pageNumbers.map((pageNumber) => (
                    <Button
                        key={pageNumber}
                        variant="secondary"
                        className={currentPage === pageNumber ? "active" : ""}
                        onClick={() => handlePageClick(pageNumber)}
                        style={{ margin: "3px" }}
                    >
                        {pageNumber}
                    </Button>
                ))}
            </div>

            {/* Tombol untuk menambahkan data */}
            <Button variant="success" className="mt-3 centered-btn" onClick={handleTambah}>
                Tambah Data
            </Button>

            {/* Pop-up form untuk menambahkan atau mengedit data barang */}
            <Modal
                show={showTambahModal || showEditModal}
                onHide={() => {
                    setShowTambahModal(false);
                    setShowEditModal(false);
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{formData.id ? "Edit Barang" : "Tambah Barang"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>
                                Foto Barang (Format JPG atau PNG, maksimum 100KB)
                            </Form.Label>
                            <Form.Control
                                type="file"
                                name="foto"
                                accept="image/jpeg, image/png"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Nama Barang</Form.Label>
                            <Form.Control
                                type="text"
                                name="nama"
                                value={formData.nama}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Harga Beli</Form.Label>
                            <Form.Control
                                type="number"
                                name="hargaBeli"
                                value={formData.hargaBeli}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Harga Jual</Form.Label>
                            <Form.Control
                                type="number"
                                name="hargaJual"
                                value={formData.hargaJual}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Stok</Form.Label>
                            <Form.Control
                                type="number"
                                name="stok"
                                value={formData.stok}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" style={{ margin: "10px" }}>
                            {formData.id ? "Update" : "Tambah"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Dashboard;

