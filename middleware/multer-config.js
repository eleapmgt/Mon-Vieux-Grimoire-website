const multer = require('multer');
const sharp = require('sharp');

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

module.exports = (req, res, next) => {
  upload(req, res, () => {
      const { buffer, originalname } = req.file;
      const timestamp = new Date().toISOString();
      const ref = `${timestamp}-${originalname}.webp`;
      const path = "./images/" + ref;
      sharp(buffer)
        .webp({ quality: 20 })
        .toFile(path);
      req.file.filename = ref;
      next();
  });
};