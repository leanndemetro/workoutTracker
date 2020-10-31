const router = require("express").Router();
const Workout = require("../models/workout.js");

// Create a new workout
router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Add a new exercise to an existing workout
router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    // Make sure the new exercise meets the schema requirements
    { new: true, runValidators: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get all of the workouts stored in the db
router.get("/api/workouts", (req, res) => {
  Workout.find()
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Combine the workouts to display the stats
router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .limit(7)
    .then((dbWorkouts) => {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Delete a workout
router.delete("/api/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;