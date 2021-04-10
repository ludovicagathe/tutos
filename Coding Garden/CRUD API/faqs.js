const express = require('express');
const router = express.Router();
const monk = require('monk');
const joi = require('joi');
const bodyParser = require('body-parser');

const db = monk(process.env.MONGO_URI);
const faqs = db.get('faqs');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const schema = joi.object({
  question: joi.string().trim().required(),
  answer: joi.string().trim(),
  video_url: joi.string().uri()
});

// Read all
router.get('/', async (req,res, next) => {
  try {
    const items = await faqs.find({});
    res.json(items);
  } catch(error) {
    next(error);
  }
});

// Read one
router.get('/:id', async (req,res, next) => {
  try {
    const { id } = req.params;
    const retrieved = await faqs.find({ "_id" : id });
    if(!retrieved) next();
    res.json(retrieved);
  } catch(error) {
    next(error);
  }
});

// Create new one
router.post('/add', async (req,res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    const inserted = await faqs.insert(value);
    res.json(inserted);
  } catch(error) {
    next(error);
  }
});

// Delete one
router.delete('/:id', (req,res, next) => {
  res.json({
    message: "delete one"
  });
});

// Update one
router.patch('/:id', async (req,res, next) => {
  try {
    const { id } = req.params;
    const existing = await faqs.find({ "_id" : id });
    if(existing.length > 1) throw { "message": "DuplicateEntries", "name": "DataException" }
    if(existing.length == 0) throw { "message": "EntryNotFound", "name": "DataException" }
    const value = await schema.validateAsync(req.body);
    const modified = await faqs.update({ _id: id} , { $set: value }, { upsert: true});
    res.json(modified);
  } catch(error) {
    next(error);
  }
});

module.exports = router;
