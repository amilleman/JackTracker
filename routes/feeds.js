const express = require('express');
const router = express.Router() 
const Feed = require('../models/feed')

//GETTING ALL
router.get('/', async (req, res) => {
  try {
    const feeds = await Feed.find().sort({ CreatedModifiedAt: 'desc' });
    res.json(feeds);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//GETTING TODAY
router.get('/today', async (req, res) => {
  try {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const feeds = await Feed.find({CreatedModifiedAt: {$gte: startOfToday}}).sort({ CreatedModifiedAt: 'desc' });
    res.json(feeds);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//GETTING ONE
// router.get('/:id', getSubscriberById, (req, res) => {
//   res.json(res.subscriber);
// })

//creating one
router.post('/',  async (req, res) => {
  const feed = new Feed({
    Type: req.body.Type,
    Amount: req.body.Amount,
    Details: req.body.Details == null ? "" : req.body.Details
  });  
  try {
    const newFeed = await feed.save()
    res.status(201).json(newFeed);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//UPDATING ONE
// router.patch('/:id', getSubscriberById, async (req, res) => {
//   if(req.body.name != null){
//     res.subscriber.name = req.body.name;
//   }
  
//   if(req.body.subscribedToChannel != null){
//     res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
//   }

//   try {
//     const updatedSubscriber = await res.subscriber.save()
//     res.json(updatedSubscriber)
//   } catch (error) {
//     res.status(500).json({message: error.message})    
//   }
// })

//DELETING ONE
// router.delete('/:id', getSubscriberById, async (req, res) => {
//   try {
//     await res.subscriber.remove()
//     res.json({message: 'Deleted subscriber'})
//   } catch (err) {
//     res.status(500).json({message: err.message})
//   }
// })

// async function getDiaperById(req, res, next){
//   let diaper
//   try {
//     diaper = await Diaper.findById(req.params.id)
//     if(diaper == null){
//       return res.status(404).json({ message: 'Could not find diaper with given id'})
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message })
//   }
//   res.diaper = diaper
//   next()
// }

module.exports = router