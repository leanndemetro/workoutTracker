//requires mongoose, and mongoose schema,
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// then sets a variable call workoutSchema's value to a new schema format
const workoutSchema = new Schema(
    { // takes in the day(date) and exercise (type, name, duration, weight, reps, sets, or distance) of a new wuser workout input
        day: {
            type: Date,
            default: () => new Date(),
        },
        exercises: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: "Enter an exercise type",
                },
                name: {
                    type: String,
                    trim: true,
                    required: "Enter an exercise name",
                },
                duration: {
                    type: Number,
                    required: "Enter an exercise duration in minutes",
                },
                weight: {
                    type: Number,
                },
                reps: {
                    type: Number,
                },
                sets: {
                    type: Number,
                },
                distance: {
                    type: Number,
                },
            },
        ],
    },
    {
        toJSON: {
            // include any virtual properties when data is requested
            virtuals: true,
        },
    }
);
// adds a dynamically-created schema property that will be the total duration of workouts
workoutSchema.virtual("totalDuration").get(function () {
    // "reduce" array of exercises down to just the sum of their durations
    return this.exercises.reduce((total, exercise) => {
        //return total sum plus the excersize's duration
        return total + exercise.duration;
    }, 0);
}); //sets a variable equal to a model created via mongoose called workout
const Workout = mongoose.model("Workout", workoutSchema);
//exports that value/variable
module.exports = Workout;