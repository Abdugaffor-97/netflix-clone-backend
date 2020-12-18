const express = require("express")
const {
  getMedias,
  getReviews,
  writeMedias,
  writeReviews,
} = require("../../fsUtilities")

const cloudinary = require("../../cloudinary")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")

const routers = express.Router()

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Netflix Clone",
  },
})
const cloudinaryMulter = multer({ storage: storage })

routers.post(
  "/:mediaId/upload",
  cloudinaryMulter.single("image"),
  async (req, res, next) => {
    try {
      const mediasDB = await getMedias()
      mediasDB.forEach((media) => {
        if (media.imdbID === req.params.mediaId) {
          media.Poster = "url"
          res.send(201).send("Image uploaded")
        }
      })
    } catch (error) {
      next(error)
    }
  }
)

routers.get("/", async (req, res, next) => {
  try {
    const mediasDB = await getMedias()
    res.send(mediasDB)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
routers.post("/", async (req, res, next) => {
  try {
    const mediasDB = await getMedias()

    const reqMedia = { ...req.body, createdAt: new Date() }
    console.log(mediasDB)
    mediasDB.push(reqMedia)
    await writeMedias(mediasDB)
    res.status(201).send("Created")
  } catch (error) {
    console.log(error)
    next(error)
  }
})
routers.delete("/:mediaId", async (req, res, next) => {
  try {
    const mediasDB = await getMedias()
    const newMediasDB = mediasDB.filter(
      (media) => media.imdbID !== req.params.mediaId
    )
    if (mediasDB.length === newMediasDB.length) {
      res.status(404).send("Invalid ID")
    } else {
      await writeMedias(newMediasDB)
      res.status(204).send("Deleted")
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

routers.put("/:mediaId", async (req, res, next) => {
  try {
    const mediasDB = await getMedias()
    mediasDB.forEach((media) => {
      if (media.imdbID === req.params.mediaId) {
        console.log(media.imdbID === req.params.mediaId)
        console.log(media)
        if (req.body.Title) {
          media.Title = req.body.Title
          console.log(media.Title)
        }
        if (req.body.Year) {
          media.Year = req.body.Year
        }
        if (req.body.Type) {
          media.Type = req.body.Type
        }
        if (req.body.Poster) {
          media.Year = req.body.Poster
        }
      }
    })
    await writeMedias(mediasDB)
    res.status(202).send("Accepted")
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = routers
