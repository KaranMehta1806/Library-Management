const booksController = {};
const { BookModel } = require("../model/BookModel");

booksController.addNewBook = async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      isbn,
      availableCopies,
      totalCopies,
      addedBy,
      coverImage,
      price,
    } = req.body;

    const existingBook = await BookModel.findOne({ isbn });
    if (existingBook) {
      return res
        .status(400)
        .json({ message: "Book with this ISBN already exists" });
    }

    const newBook = new BookModel({
      title,
      author,
      category,
      isbn,
      availableCopies: totalCopies,
      totalCopies,
      addedBy,
      coverImage,
      price,
    });

    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

booksController.getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.find().populate("addedBy", "name email role").sort({ createdAt: -1 }) ;
    const totalBooks = books.length;
    if(!books || books.length === 0){
      return res.json({error:true,message:"No Books Found"});
    }


    res.status(200).json({error:false,message:"Books fetched Successfully",books,totalBooks});
  } catch (error) {
    res.status(500).json({error:true,  message: "Internal Server Error",
      details: error.message, });
  }
};

booksController.getParticularBook = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await BookModel.findById(id).populate(
      "addedBy",
      "name email role"
    );
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
};

booksController.updateBook = async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      isbn,
      availableCopies,
      totalCopies,
      addedBy,
      coverImage,
      price,
    } = req.body;

    const bookUpdate = await BookModel.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        category,
        availableCopies,
        totalCopies,
        // coverImage,
        price,
      },
      { new: true }
    );
    if (!bookUpdate) {
      return res.status(404).json({ message: "Book not found" });
    }
    res
      .status(200)
      .json({ message: "Book updated successfully", book: bookUpdate });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

booksController.deleteBook = async (req, res) => {
  try {
    const deletedBook = await BookModel.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book Not Found" });
    }

    res.status(200).json({ message: "Book Deleted Successfully" });
  } catch (error) {
    // console.log(deletedBook)
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = { booksController };
