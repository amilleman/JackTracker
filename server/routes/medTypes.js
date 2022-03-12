const express = require('express');
const router = express.Router() 
const MedVitType = require('../models/medType')

//GETTING ALL
router.get('/', async (req, res) => {
  try {
    const medVitTypes = await MedVitType.find().sort({ Type: 'asc' });
    res.json(medVitTypes);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//creating one
router.post('/',  async (req, res) => {
  const medVitType = new MedVitType({
    Type: req.body.Type
  });  
  try {
    const newMedVitType = await medVitType.save()
    res.status(201).json(newMedVitType);
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