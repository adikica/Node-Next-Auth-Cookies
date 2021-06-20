const router = require("express").Router();
const multer = require("multer");

// ngarkojme foto galerine e produktit
router.post(
  "/products/gallery/:id",
  upload.array("gallery", 5),
  async (req, res) => {
    //req.files
    const fotot = req.files;
    const galleryImage = await fotot.map((foto) => {
      return foto.filename;
    });

    //gallery:galleryImage
  }
);

module.exports = router;
