const express = require("express")
const {jobs} = require("../models/jobs.js")
const router = new express.Router()

router.get("/jobs", async (req, res) => {

    try {
        const jobs = await jobs.find({})
        res.send(jobs)
    } catch (e) {
        res.status(500).send()
    }

})

router.post("/jobs", async (req, res) => {

    try {
        const job = await jobs(req.body).save()
        res.status(201).send(job)
    } catch (e){
        res.status(400).send(e)
    }

})

router.get("/jobs/:id", async (req, res) => {


    try {
        console.log(req.params.id)
        const job = await jobs.findById(req.params.id)
        if (!job) {
            return res.status(404).send()
        }
        res.send(job)
    } catch (e) {
        res.status(500).send()
    }

})

router.get("/jobs/text/:job_id", async (req, res) => {

    try {
        const job = await jobs.findOne(
            {job_id: req.params.job_id})
        res.send(job)
    } catch (e) {
        res.status(500).send()
    }

})

router.get("/jobs/available/:available", async (req, res) => {

    try {
        const jobs = await jobs.find(
            {available: req.params.available},
            "job_id available"
            )
        res.send(jobs)
    } catch (e) {
        res.status(500).send()
    }

})

router.patch("/jobs/available/:job_id", async (req, res) => {
    try {
        const job = await jobs.updateOne(
            {job_id: req.params.job_id},
            {available: req.body.available, link: req.body.link},
            {new: true, runValidators: true})
        res.send(job)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router
