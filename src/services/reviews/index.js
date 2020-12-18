const express = require("express")
const {
  getMedias,
  getReviews,
  writeMedias,
  writeReviews,
} = require("../../fsUtilities")
const uniqid = require("uniqid")
const routers = express.Router()

routers.get("/", async (req, res, next) => {
  try {
    const reviewsDB = await getReviews()
    res.send(reviewsDB)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
routers.post("/", async (req, res, next) => {
  try {
    const reviewsDB = await getReviews()

    const reqMedia = { ...req.body, createdAt: new Date(), _id: uniqid() }
    console.log(reviewsDB)
    reviewsDB.push(reqMedia)
    await writeReviews(reviewsDB)
    res.status(201).send("Created")
  } catch (error) {
    console.log(error)
    next(error)
  }
})
routers.delete("/:reviewId", async (req, res, next) => {
  try {
    const reviewsDB = await getReviews()
    const newreviewsDB = reviewsDB.filter(
      (review) => review._id !== req.params.reviewId
    )
    if (reviewsDB.length === newreviewsDB.length) {
      res.status(404).send("Invalid ID")
    } else {
      await writeReviews(newreviewsDB)
      res.send("Deleted").status(204)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

routers.put("/:reviewId", async (req, res, next) => {
  try {
    const reviewsDB = await getReviews()
    reviewsDB.forEach((review) => {
      if (review._id === req.params.reviewId) {
        console.log(review._id === req.params.reviewId)
        console.log(review)
        if (req.body.comment) {
          review.comment = req.body.comment
          console.log(review.comment)
        }
        if (req.body.rate) {
          review.rate = req.body.rate
        }
      }
    })
    await writeReviews(reviewsDB)
    res.send("Accepted").status(204)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = routers
