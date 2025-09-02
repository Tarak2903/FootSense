const express = require('express');
const pschema = require('../models/Patient_Data');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');


if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
router.get('/g', async (req, res) => {
    const Email = req.query.Email;

    const result = await pschema.find({ Email });

    res.json(result);
});
router.post("/lg", async (req, res) => {
    const { Name, Age, Height, Weight, Email } = req.body;
    const existing = await pschema.findOne({ Email })
    if (existing) {
        res.send({ success: false , message:"User already exists"});
    }
    else {
        const newuser = new pschema({
            Name, Age, Height, Weight, Email
        });

        await newuser.save();
        res.send({ success: true });
    }
});

router.post("/l", upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const Email = req.query.name;
        const data = await fs.promises.readFile(filePath, 'utf-8');

        const lines = data.split('\n');
        const linesToRemove = new Set([0, 1, 2, 4]);
        const filteredLines = lines.filter((line, index) => !linesToRemove.has(index));

        if (filteredLines.length < 2) {
            return res.status(400).json({ success: false, message: "File format invalid or file empty." });
        }

        const headers = filteredLines[0].trim().split(/\s+/);
        const datao = filteredLines.slice(1);
        const dataLines = datao.map(line => {
            const col = line.trim().split(/\s+/);
            const num = col.map(Number);
            return num;
        });

        const final = dataLines.map(row => row.slice(1));
        const numCols = 10;
        const maxValues = Array(numCols).fill(-Infinity);
        for (let row of final) {
            for (let i = 0; i < numCols; i++) {
                if (row[i] > maxValues[i]) {
                    maxValues[i] = row[i];
                }
            }
        }

        const norm = [
            1559.9401, 1554.3851, 1549.3752, 1545.2885, 1542.5413,
            1559.7816, 1553.9641, 1549.3252, 1546.7133, 1542.9034
        ];

        for (let i = 0; i < 10; i++) {
            maxValues[i] = norm[i] - maxValues[i];
            maxValues[i] = 6.4474 * maxValues[i] * 98.0665;
        }

        let lmean = 0, rmean = 0;
        for (let i = 0; i < 5; i++) lmean += maxValues[i];
        lmean /= 5;
        for (let i = 5; i < 10; i++) rmean += maxValues[i];
        rmean /= 5;

        const avg = (lmean + rmean) / 2;
        const existing = await pschema.findOne({ Email });

        if (existing) {
            existing.lmean=lmean;
             existing.rmean=rmean;
              existing.avg=avg;
            existing.maxValues=maxValues;
            await existing.save();
            res.send({ success: true, message: "File read and data updated successfully" });
        }
        else {
            res.status(404).json({ success: false, message: "Patient not found" });

        }
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Internal Server Error", error: err.message });
    }
});



module.exports = router;
