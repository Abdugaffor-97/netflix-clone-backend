const { readJSON, writeJSON } = require("fs-extra")
const { join } = require("path")

const mediasPath = join(__dirname, "./services/media/medias.json")
const reviewsPath = join(__dirname, "./services/reviews/reviews.json")

const readDB = async (filePath) => {
  try {
    const fileJson = await readJSON(filePath)
    return fileJson
  } catch (error) {
    throw new Error(error)
  }
}

const writeDB = async (filePath, fileContent) => {
  try {
    await writeJSON(filePath, fileContent)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getMedias: async () => readDB(mediasPath),
  getReviews: async () => readDB(reviewsPath),
  writeMedias: async (mediasData) => writeDB(mediasPath, mediasData),
  writeReviews: async (reviewsData) => writeDB(reviewsPath, reviewsData),
}
