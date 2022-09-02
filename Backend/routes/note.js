const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");

//creating a note route
router.post(
  "/createnote",
  fetchuser,
  [
    body("Title", "enter a valid title").isLength({ min: 5 }),
    body("Description", "enter a valid description").isLength({ min: 10 }),
    body("Tag", "enter a valid tag").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let mynotes = await Notes.create({
        myimportuser: req.myolduser.id,
        title: req.body.Title,
        description: req.body.Description,
        tag: req.body.Tag,
      });

      res.json(mynotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

//fetching a note route
router.get("/fetchnote", fetchuser, async (req, res) => {
  try {
    let myfetchnotes = await Notes.find({ myimportuser: req.myolduser.id });
    res.json(myfetchnotes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

//upadate a note route
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    let myexistnote = await Notes.findById(req.params.id);

    if (!myexistnote) {
      return res.status(404).send("sorry note does not exist");
    }

    let myusersame = await Notes.find({ myimportuser: req.myolduser.id });
    if (!myusersame) {
      return res.status(401).send("sorry not allowed");
    }

    const mynewnotes = {};
    const { Title, Description, Tag } = req.body;
    if (Title) {
      mynewnotes.title = Title;
    }
    if (Description) {
      mynewnotes.description = Description;
    }
    if (Tag) {
      mynewnotes.tag = Tag;
    }

    let myupdatednotes = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: mynewnotes },
      { new: true }
    );

    res.status(200).json(myupdatednotes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

//delete a note route
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let myexistnote = await Notes.findById(req.params.id);

    if (!myexistnote) {
      return res.status(404).send("sorry note does not exist");
    }

    let myusersame = await Notes.find({ myimportuser: req.myolduser.id });
    if (!myusersame) {
      return res.status(401).send("sorry not allowed");
    }

    let myupdatednotes = await Notes.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .send({ message: "Successfully deleted", notes: myupdatednotes });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});
module.exports = router;
