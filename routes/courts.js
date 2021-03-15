const express = require("express");
const router = express.Router();
const Court = require("../models/Court");
const { courtAddValidation } = require("../user-validation/courtValidation.js");
router.get("/", async (req, res) => {
    try {
      res.status(200);
      const courts = await Court.find();
      if (!courts.length) { 
        res.status(404);
      } else {
        res.json(courts);
      }
    } catch (err) {
      res.status(400);
      res.json({ message: err });
    }
  });

  router.post("/", async (req, res) => {
    const {error} = courtAddValidation(req.body)
    if(error){
    return res.status(400).json({Message:error.details[0].message})
    }
    const court = new Court({
      type: req.body.type,
      ammountOfCourts: req.body.ammountOfCourts,
      price: req.body.price,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      photo: req.body.photo,
    });
    try {
      res.status(201);
      const savedCourt = await court.save();
      res.json({message: "Court added"});
    } catch (err) {
      res.status(400);
      res.json({ message: err });
    }
  });
  router.get("/:courtId", async (req, res) => {
	try {
	  res.status(200);
	  const court = await Court.findById(req.params.courtId);
	  if (court === null) {
		res.status(404);
		res.json({Message:"There is no court with given ID"});
	  } else {
		res.json(court);
	  }
	} catch (err) {
	  res.status(404);
	  res.json({ message: err });
	}})
  module.exports = router;