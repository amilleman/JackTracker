const express = require('express');
const router = express.Router() 
const Temperature = require('../models/temperature')

//GETTING ALL
router.get('/', async (req, res) => {
  try {
    const temperatureReadings = await Temperature.find().sort({ CreatedModifiedAt: 'desc' });
    res.json(temperatureReadings);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//GETTING TODAY
router.get('/today', async (req, res) => {
  try {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const temperatureReadings = await Temperature.find({CreatedModifiedAt: {$gte: startOfToday}}).sort({ CreatedModifiedAt: 'desc' });
    res.json(temperatureReadings);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//GETTING ONE
router.get('/:id', getTemperatureReadingById, (req, res) => {
  res.json(res.temperatureReading);
})

//creating one
router.post('/',  async (req, res) => {
  const temperatureReading = new Temperature({
    Temperature: req.body.Temperature,
    Details: req.body.Details == null ? "" : req.body.Details
  });  
  try {
    const newTemperatureReading = await temperatureReading.save()
    res.status(201).json(newTemperatureReading);
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

async function getTemperatureReadingById(req, res, next){
  let temperatureReading
  try {
    temperatureReading = await Temperature.findById(req.params.id)
    if(temperatureReading == null){
      return res.status(404).json({ message: 'Could not find temperatureReading with given id'})
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.temperatureReading = temperatureReading
  next()
}

module.exports = router