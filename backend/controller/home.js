const homeController = {};
const { BookModel } = require("../model/BookModel");
const {BorrowModel} = require("../model/BorrowModel")
// const cloudinary = require("cloudinary").v2;
// const calculateFine = require("../utils/fineCalculator")


homeController.getHomeData =  async (req, res) => {
  try {
    // 1. Total Books & Categories
    const totalBooks = await BookModel.countDocuments();
    const categories = await BookModel.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 }, coverImage: { $first: "$coverImage" } } },
      { $sort: { count: -1 } },
      { $limit: 4 } // only top 4 categories
    ]).then(data =>
  data.map(item => ({
    category: item._id,
    count: item.count,
    coverImage: item.coverImage || "/images/default-subject.jpg"
  }))
);

    const totalCategories = await BookModel.distinct("category").then(c => c.length);

    // 2. Latest 4 books (no need to populate addedBy for homepage speed)
    const newArrivals = await BookModel.find()
      .sort({ createdAt: -1 })
      .limit(4)
      .select("title author category coverImage");

    // 3. Active Students (unique)
    const issuedBooks = await BorrowModel.find({ status: "Issued" }).select("userId");
    const activeStudents = new Set(issuedBooks.map(issue => issue.userId.toString()));
    const totalActiveStudents = activeStudents.size;

    res.status(200).json({
      error: false,
      message: "Homepage data fetched successfully",
      stats: {
        totalBooks,
        totalCategories,
        totalActiveStudents
      },
      categories,
      newArrivals
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
      details: error.message
    });
  }
};


module.exports = { homeController };

// status:"Issued"