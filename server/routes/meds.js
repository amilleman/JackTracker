const express = require('express');
const router = express.Router() 
const MedVit = require('../models/med')

//GETTING ALL
router.get('/', async (req, res) => {
  try {
    const medVits = await MedVit.find().sort({ CreatedModifiedAt: 'desc' });
    res.json(medVits);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//GETTING TODAY
router.get('/today', async (req, res) => {
  try {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const medVits = await MedVit.find({CreatedModifiedAt: {$gte: startOfToday}}).sort({ CreatedModifiedAt: 'desc' });
    res.json(medVits);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//GETTING ONE
router.get('/:id', getMedVitById, (req, res) => {
  res.json(res.medVit);
})

//creating one
router.post('/',  async (req, res) => {
  const medVit = new MedVit({
    Type: req.body.Type,
    Amount: req.body.Amount,
    Details: req.body.Details == null ? "" : req.body.Details
  });  
  try {
    const newMedVit = await medVit.save()
    res.status(201).json(newMedVit);
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

async function getMedVitById(req, res, next){
  let medVit
  try {
    medVit = await MedVit.findById(req.params.id)
    if(medVit == null){
      return res.status(404).json({ message: 'Could not find medVit with given id'})
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.medVit = medVit
  next()
}

module.exports = router