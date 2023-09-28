import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import storage from '../config/firebaseStorage.js';

const UploadRouter = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

UploadRouter.post('/', upload.single('file'), async (req, res) => {
    try {
        // Kiểm tra xem có file không
        const file = req.file;
        if (!file) {
            return res.status(400).json('Please upload a file');
        }

        // Tạo tên file mới (sử dụng uuidv4() hoặc một cách khác)
        const fileName = `${uuidv4()}${path.extname(file.originalname)}`;

        // Tạo blob và blobStream
        const blob = storage.file(fileName);
        const blobStream = blob.createWriteStream({
            resumable: false,
            metadata: {
                contentType: file.mimetype,
            },
        });

        // Xử lý lỗi
        blobStream.on('error', (error) => {
            console.error('Upload error:', error);
            return res.status(500).json({ message: 'Upload error' });
        });

        // Khi hoàn thành tải lên
        blobStream.on('finish', () => {
            // Nhận public URL của file tải lên
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${fileName}?alt=media`;
            // Trả về file name và public URL của nó
            res.status(200).json(publicUrl);
        });

        // Ghi nội dung file vào blobStream
        blobStream.end(file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default UploadRouter;
