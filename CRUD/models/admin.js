const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    logo_restoran: {
        data: Buffer,
        contentType: String,
    },

    alamat_restoran: {
        type: String,
        required: true,
    },

    rating_restoran: {
        type: String,
    },

    kategori_restoran: {
        type: String,
        required: true,
    },

    produk: {
        type: String,
        required: true,
    },

   // produk ambil dari id produk
   // tes input manual dulu

    berkas_restoran: {
        data: Buffer,
        contentType: String,
    },

    fasilitas_restoran: {
        type: Array,
        required: true,
    },

    status_restoran: {
        type: String,
        required: true,
    },

    jam_buka_restoran: {
        type: Number,
        required: true,
    },

    jam_tutup_restoran: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Admin', adminSchema);