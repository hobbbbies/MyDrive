const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const pathApi = require('path');

async function uploadPost(req, res) {
    console.log(req.body.folder);
    try{
        if (!req.file) {
            return res.status(400).send("No file uploaded!");
        }

        const { 
            originalname,  
            size, 
            path 
        } = req.file;

        const extension = pathApi.extname(path);
        const folder = JSON.parse(req.body.folder);

        const file = await prisma.file.create({
            data: {
                name: originalname,
                size: size,
                extension: extension,
                storagePath: path,
                folderId: folder.id
            },
            include: {
                folder: true
            }
        });
        console.log(file);
        res.redirect("/upload");
    } catch(err) {
        console.error("Error saving file:", err);
        res.status(500).send(`Error uploading file: ${err.message}`);
    }
}

async function uploadGet(req, res) {
    try {
        const folders = await prisma.folder.findMany({
            select: {
                id: true,
                name: true
            },
            orderBy: {
                name: 'asc'
            }
        });
        res.render('uploadView', { folders });
    } catch (error) {
        console.error("Error fetching folders:", error);
        res.render('uploadView', { folders: [] });
    }
}

module.exports = { uploadGet, uploadPost };