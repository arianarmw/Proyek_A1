const express = require('express');
const router = express.Router();
const Admin = require("../models/admin");
const multer = require('multer');

const Storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        console.log(file);
        cb(null, file.fieldname +"_"+ Date.now() +"_"+ file.originalname);
    },
});

const upload = multer({
    storage: Storage
});


//Insert Mitra ke dalam database
router.post('/addMitra', upload.fields([{
    logo_restoran: 'logo', maxCount: 1
    }, {
    berkas_restoran: 'berkas', maxCount:1
}]),
    (req, res) => {
    const admin = new Admin({
        logo_restoran: req.body.filename,
        alamat_restoran: req.body.alamat_restoran,
        produk: req.body.produk,
        rating_restoran: req.body.rating_restoran,
        kategori_restoran: req.body.kategori_restoran,
        berkas_restoran: req.body.filename,
        fasilitas_restoran: req.body.fasilitas_restoran,
        status_restoran: req.body.status_restoran,
        jam_buka_restoran: req.body.jam_buka_restoran,
        jam_tutup_restoran: req.body.jam_tutup_restoran,
    });
    admin.save((err) => {
        if(err) {
            res.json({message: err.message, type: 'danger'});
        } else {
            req.session.message = {
                type: 'success',
                message: 'Mitra Added Successfully!'
            };
            res.redirect("/admin"); 
        }
    });
});


/*
router.post('/addMitra', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            const newAdmin = new Admin({
                logo_restoran: {
                    data: req.file.filename,
                    contentType: "image/png",
                },
                alamat_restoran: req.body.alamat_restoran,
                produk: req.body.produk,
                rating_restoran: req.body.rating_restoran,
                kategori_restoran: req.body.kategori_restoran,
                //  berkas_restoran: req.files.berkas_restoran[0],
                fasilitas_restoran: req.body.fasilitas_restoran,
                status_restoran: req.body.status_restoran,
                jam_buka_restoran: req.body.jam_buka_restoran,
                jam_tutup_restoran: req.body.jam_tutup_restoran,
            });
            newAdmin.save().then(() => res.send("data successfully added!")).catch((err)=> console.log(err));
        }
    });
});
*/

router.get("/admin", (req, res) => {
    res.render("index", {title : 'Data Mitra'});
});

router.get("/addMitra", (req, res) => {
    res.render("add_mitra", {title: "Add Mitra"})
})

module.exports = router;