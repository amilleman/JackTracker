const express = require('express');
const router = express.Router() 
const Sleep = require('../models/sleep')

//GETTING ALL
router.get('/', async (req, res) => {
  try {
    const sleeps = await Sleep.find().sort({ CreatedModifiedAt: 'desc' });
    res.json(sleeps);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//GETTING CURRENT SLEEP
router.get('/current', async (req, res) => {
  try {
    const sleeps = await Sleep.findOne({EndedAt: null}).sort({ StartedAt: 'desc' });
    res.json(sleeps);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//GETTING TODAY

router.get('/today', async (req, res) => {
  try {
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sleeps = await Sleep.find({StartedAt: {$gte: startOfToday}}).sort({ StartedAt: 'desc' });
    res.json(sleeps);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//GETTING ONE
router.get('/:id', getSleepById, (req, res) => {
  res.json(res.sleep);
})

//creating one
router.post('/',  async (req, res) => {
  const sleep = new Sleep({
    Details: req.body.Details == null ? "" : req.body.Details
  });  
  if(req.body.StartedAt != null){
    sleep.StartedAt = req.body.StartedAt;
  }
  if(req.body.EndedAt != null){
    sleep.EndedAt = req.body.EndedAt;
    //sleep.Length = difference of started and ended
  }
  try {
    const newSleep = await sleep.save()
    res.status(201).json(newSleep);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//UPDATING ONE
router.patch('/:id', getSleepById, async (req, res) => {
  if(req.body.EndedAt != null){
    res.sleep.EndedAt = req.body.EndedAt;
  }
  
  if(req.body.Details != null){
    res.sleep.Details = req.body.Details;
  }
  console.log(res.sleep);
  try {
    const updatedSleep = await res.sleep.save()
    res.json(updatedSleep)
  } catch (error) {
    res.status(500).json({message: error.message})    
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

async function getSleepById(req, res, next){
  let sleep
  try {
    sleep = await Sleep.findById(req.params.id)
    if(sleep == null){
      return res.status(404).json({ message: 'Could not find sleep with given id'})
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.sleep = sleep
  next()
}

module.exports = router