const mongoose = require("mongoose");
const NoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  title: { type: String, required: true },
  text: { type: String },
}, { timestamps: true });

const Note = mongoose.model('notes', NoteSchema);
module.exports = Note;
