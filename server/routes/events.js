const express = require('express');
const router = express.Router() 
const Event = require('../models/event')

//GETTING ALL
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ When: 'desc' });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//GETTING TODAY
router.get('/today', async (req, res) => {
  try {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const events = await Event.find({When: {$gte: startOfToday}}).sort({ When: 'desc' });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//GETTING THIS WEEK
router.get('/weekly', async (req, res) => {
  try {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var weekFromToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
    const events = await Event.find({When: {$gte: startOfToday, $lte: weekFromToday}}).sort({ When: 'asc' });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//GETTING ONE
router.get('/:id', getEventById, (req, res) => {
  res.json(res.event);
})

//creating one
router.post('/',  async (req, res) => {
  const event = new Event({
    What: req.body.What,
    When: req.body.When
  });  
  try {
    const newEvent = await event.save()
    res.status(201).json(newEvent);
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

async function getEventById(req, res, next){
  let event
  try {
    event = await Event.findById(req.params.id)
    if(event == null){
      return res.status(404).json({ message: 'Could not find event with given id'})
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.event = event
  next()
}

module.exports = router