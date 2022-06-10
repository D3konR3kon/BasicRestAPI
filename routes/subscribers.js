const express = require('express')
const res = require('express/lib/response')
const router = express.Router()
const Subscriber = require('../model/subcriber')

//Get all
router.get('/', async(req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers) 
    } catch (error) {
       res.status(500).json({message: err.message}) 
    }
})
//Get one
router.get('/:id', getSubscriber, (req, res) => {
    res.send(req.subscriber.name)
})

//Create one
router.post('/', async(req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber) 
    } catch (error) {
       res.status(400).json({message: err.message}) 
    }

})

//Update one
router.patch('/:id', getSubscriber, (req, res) => {

})

//Delete
router.delete('/:id',getSubscriber, (req, res) => {

})

async function getSubscriber(req,res,next){
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json({ message : "Cannot find subscriber"})
        }
    } catch (error) {
        return res.status(500).json({message: err.message}) 
    }

    res.subscriber = subscriber 
    next()
}

module.exports = router