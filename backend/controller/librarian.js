const { UserModel } = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "12345@abcd12";
const jwt = require("jsonwebtoken");
const { BorrowModel } = require("../model/BorrowModel");
const { BookModel } = require("../model/BookModel");
const calculateFine = require("../utils/fineCalculator");
const { clearCache } = require("../utils/cache");
const librarianController = {};

librarianController.bookIssued = async (req, res) => {
  try {
    const requests = await BorrowModel.find({ status: "Issued" })
      .populate("userId", "name email")
      .populate("bookId", "title")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json({ message: "Requested books fetched successfully", requests });
  } catch (err) {
    console.error("Error fetching requests", err);
    res.status(500).json({ error: "Server error" });
  }
};

librarianController.issueRequest = async (req, res) => {
  try {
    const requests = await BorrowModel.find({ status: "Requested" })
      .populate("userId", "name email")
      .populate("bookId", "title")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json({ message: "Requested books fetched successfully", requests });
  } catch (err) {
    console.error("Error fetching requests", err);
    res.status(500).json({ error: "Server error" });
  }
};

librarianController.approveRequest = async (req, res) => {
  const requestId = req.params.id;

  try {
    const borrowRequest = await BorrowModel.findById(requestId);
    if (!borrowRequest) {
      return res.status(404).json({ error: "Borrow request not found" });
    }

    const issuedCount = await BorrowModel.countDocuments({
      userId: borrowRequest.userId,
      status: "Issued",
    });

    if (issuedCount >= 4) {
      return res.status(400).json({ error: "User already has 4 issued books" });
    }

    const book = await BookModel.findById(borrowRequest.bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (book.availableCopies < 1) {
      return res.status(400).json({ error: "No copies available" });
    }

    book.availableCopies -= 1;
    await book.save();

    borrowRequest.status = "Issued";
    borrowRequest.approvedBy = req.userInfo.id;
    await borrowRequest.save();
    clearCache("homeData");
    res.json({ message: "Book issued successfully", borrow: borrowRequest });
  } catch (err) {
    console.error("Error approving request", err);
    res.status(500).json({ error: "Server error" });
  }
};

librarianController.returnRequest = async (req, res) => {
  try {
    const requests = await BorrowModel.find({ status: "Requested Return" })
      .populate("userId", "name email")
      .populate("bookId", "title")
      .sort({ createdAt: -1 });

    const requestsWithFine = requests.map((req) => {
      const fine = calculateFine(req.dueDate, req.returnDate);
      return { ...req.toObject(), fine };
    });

    res.status(200).json({
      message: "Requested books fetched successfully",
      requests: requestsWithFine,
    });
  } catch (err) {
    console.error("Error fetching requests", err);
    res.status(500).json({ error: "Server error" });
  }
};

librarianController.approveReturnRequest = async (req, res) => {
  try {
    const borrowId = req.params.id;

    const borrow = await BorrowModel.findById(borrowId);
    if (!borrow)
      return res.status(404).json({ message: "Borrow record not found" });

    if (borrow.status !== "Requested Return") {
      return res
        .status(400)
        .json({ message: "Book return not requested or already processed" });
    }

    const book = await BookModel.findById(borrow.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.availableCopies < book.totalCopies) {
      book.availableCopies += 1;
      await book.save();
    }

    borrow.status = "Returned";
    borrow.returnDate = new Date();
    borrow.approvedBy = req.userInfo.id;

    await borrow.save();
    clearCache("homeData");
    res
      .status(200)
      .json({ message: "Book return approved and updated successfully" });
  } catch (error) {
    console.error("Error approving return request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { librarianController };
