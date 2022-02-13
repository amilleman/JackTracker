const express = require('express');
const router = express.Router() 
const Diaper = require('../models/diaper')

//GETTING ALL
router.get('/', async (req, res) => {
  try {
    const diapers = await Diaper.find().sort({ CreatedModifiedAt: 'desc' });
    res.json(diapers);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//GETTING TODAY

router.get('/today', async (req, res) => {
  try {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diapers = await Diaper.find({CreatedModifiedAt: {$gte: startOfToday}}).sort({ CreatedModifiedAt: 'desc' });
    res.json(diapers);
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
  const diaper = new Diaper({
    Type: req.body.Type,
    Details: req.body.Details == null ? "" : req.body.Details
  });  
  try {
    const newDiaper = await diaper.save()
    res.status(201).json(newDiaper);
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