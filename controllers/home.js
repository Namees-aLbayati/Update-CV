const path = require('path');
const router = require('express').Router();
const fs = require("fs");
const PdfReader = require('pdfreader').PdfReader;
router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"))
})
router.get('/about', async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/about.html"))
})

router.get('/projects', async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/projects.html"))
})

router.get('/contact', async (req, res) => {
    res.sendFile(path.join(__dirname, "../views/contactme.html"))
})

router.get('/pdf', async (req, res) => {
        res.sendFile(path.join(__dirname,'../public/pdf/namees.pdf'))

 


})

module.exports = router