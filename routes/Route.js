const express = require("express");
const router = express.Router();
const Note = require("../Models/allnotes");
const User = require("../Models/users");

const cors = require("cors");

router.use(express.json());
router.use(cors());

const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // replace this with your preferred storage method

router.post("/signup", upload.single("profilePicture"), async (req, res) => {
  try {
    console.log(req.body);
    const user = new User({
      ...req.body,
      profilePicture: req.file.path, // use file storage URL here
    });
    await user.save();

    res.status(201).json({ message: "New user created successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password }).exec();
    if (user) {
      res.json({ status: 200, userId: user._id });
    } else {
      res.json({ status: 400 });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.post("/notes", async (req, res) => {
  try {
    const { userId, title, text } = req.body;
    const newNote = {
      userId,
      title,
      text,
      lastModified: new Date().toLocaleString(),
    };

    const note = new Note(newNote);
    await note.save();

    res.status(201).json({ message: "Note created successfully!", note });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.delete("/notes/:noteId", async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const deletedNote = await Note.findByIdAndDelete(noteId).exec();

    if (deletedNote) {
      res.status(200).json({ message: "Note deleted successfully!" });
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/notes/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userNotes = await Note.find({ userId }).exec();
    res.status(200).json(userNotes);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

router.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = router;
