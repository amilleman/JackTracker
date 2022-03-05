const express = require('express');
const router = express.Router() 
const FeedType = require('../models/feedType')

//GETTING ALL
router.get('/', async (req, res) => {
  try {
    const feedTypes = await FeedType.find().sort({ Type: 'asc' });
    res.json(feedTypes);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//creating one
router.post('/',  async (req, res) => {
  const feedType = new FeedType({
    Type: req.body.Type
  });  
  try {
    const newFeedType = await feedType.save()
    res.status(201).json(newFeedType);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//DELETING ONE
// router.delete('/:id', getSubscriberById, async (req, res) => {
//   try {
//     await res.subscriber.remove()
//     res.json({message: 'Deleted subscriber'})
//   } catch (err) {
//     res.status(500).json({message: err.message})
//   }
// })

module.exports = router