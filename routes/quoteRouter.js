const { Router } = require('express');
const quoteRouter = Router({ mergeParams: true });
const { Quote, Speaker } = require('../models.js')

// index
quoteRouter.get('/', async (req, res) => {
  const speakerId = req.params.speakerId
  const quotes = await Quote.findAll({ where: { speakerId } })
  res.json({ quotes })
})

// show
quoteRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const quote = await Quote.findByPk(id)
  res.json({ quote })
})

// create
quoteRouter.post('/', async (req, res) => {
  const speakerId = req.params.speakerId
  const data = req.body
  const speaker = await Speaker.findByPk(speakerId)
  const quote = await Quote.create(data)
  await quote.setSpeaker(speaker)
  res.json({ quote })
})

// update
quoteRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const data = req.body
  const quote = await Quote.findByPk(id);
  await quote.update(data)
  res.json({ quote })
})

// delete
quoteRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  const quote = await Quote.findByPk(id);
  await quote.destroy()
  res.json({ quote })
})

module.exports = quoteRouter;