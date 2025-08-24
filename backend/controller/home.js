const homeController = {};
const { BookModel } = require("../model/BookModel");
const { BorrowModel } = require("../model/BorrowModel");
const { setCache, getCache } = require("../utils/cache");

homeController.getHomeData = async (req, res) => {
  try {
  
    const cachedData = getCache("homeData");
    if (cachedData) {
      return res.status(200).json({
        error: false,
        message: "Homepage data fetched from cache",
        ...cachedData
      });
    }


    const totalBooks = await BookModel.countDocuments();
    const categories = await BookModel.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 }, coverImage: { $first: "$coverImage" } } },
      { $sort: { count: -1 } },
      { $limit: 4 }
    ]).then(data =>
      data.map(item => ({
        category: item._id,
        count: item.count,
        // coverImage: item.coverImage || "/images/default-subject.jpg"
        coverImage: item.coverImage
      }))
    );

    const totalCategories = await BookModel.distinct("category").then(c => c.length);

    const newArrivals = await BookModel.find()
      .sort({ createdAt: -1 })
      .limit(4)
      .select("title author category coverImage");

    const issuedBooks = await BorrowModel.find({ status: "Issued" }).select("userId");
    const activeStudents = new Set(issuedBooks.map(issue => issue.userId.toString()));
    const totalActiveStudents = activeStudents.size;

    const responseData = {
      stats: {
        totalBooks,
        totalCategories,
        totalActiveStudents
      },
      categories,
      newArrivals
    };

    
    setCache("homeData", responseData);

    res.status(200).json({
      error: false,
      message: "Homepage data fetched successfully",
      ...responseData
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
