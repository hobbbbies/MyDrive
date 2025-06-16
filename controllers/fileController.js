const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function fileGet(req, res) {
    res.render('fileView')
}

module.exports = { fileGet };