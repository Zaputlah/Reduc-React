// src/features/barangSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataBarang: [],
};

const barangSlice = createSlice({
    name: "barang",
    initialState,
    reducers: {
        addBarang: (state, action) => {
            state.dataBarang.push(action.payload);
        },
        updateBarang: (state, action) => {
            const { id, foto, nama, hargaBeli, hargaJual, stok } = action.payload;
            const existingBarang = state.dataBarang.find((barang) => barang.id === id);
            if (existingBarang) {
                existingBarang.foto = foto;
                existingBarang.nama = nama;
                existingBarang.hargaBeli = hargaBeli;
                existingBarang.hargaJual = hargaJual;
                existingBarang.stok = stok;
            }
        },
        deleteBarang: (state, action) => {
            const id = action.payload;
            state.dataBarang = state.dataBarang.filter((barang) => barang.id !== id);
        },
    },
});

export const { addBarang, updateBarang, deleteBarang } = barangSlice.actions;

export default barangSlice.reducer;
