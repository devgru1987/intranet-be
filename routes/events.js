const express = require('express')
const router = express.Router()
const CalenderEvent = require('../model/event')

router.post('/',  async (req, res) => {
    if(!req.body.calenderEvent) return res.status(400).json({"message": "No event submited"})
    const { title, allday, start, end } =  req.body.calenderEvent
    try {
        const NewCalenderEvent = await CalenderEvent.create ({
            title,
            allday,
            start,
            end,
            isDeleted: false,
            creationDate: Date()
        })

        if(!NewCalenderEvent) return res.status(500).json({"message":"Event cpuld not be save, Please try again"})
        return res.status(200).json({"message": NewCalenderEvent})
    }catch(err){
        return res.status(500).json({message: `Error: ${err}`})
    }
})

router.get('/', async (req, res) => {
  try{
    const events =  await CalenderEvent.find({isDeleted:false});
    if(events) return res.status(200).json({events})
  }catch(err){
    res.status(200).json({"message":`Error: ${err}`})
  }
})

router.delete('/delete/:id', async (req, res) => {
  if(!req.params.id) return res.status(400).json({"message": "Please select an item to delete"})
  const _id = req.params.id
  try{
    const deletedEvent = await CalenderEvent.deleteOne({ _id})
    if(!deletedEvent) res.status(500).json({"message": "internal server error"}) /*revise it to checkk before deleting*/
    return res.status(200).json({deletedEvent})
  }catch(err){
    return res.status(500).json({"message": "Internal server error"})
  }
})

module.exports = router