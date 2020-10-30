//sets a variable called API 
const API = {
  //and calls the last workout data

  async getLastWorkout() {
    let res;
    try {

      //at this url location
      res = await fetch("/api/workouts");

      //unless an error occurs
    } catch (err) {
      console.log(err)
    }
    //if no error, json the result data and set it eqal ro json variable
    const json = await res.json();

    //then return each data value within json
    return json[json.length - 1];
  },
  // a new function called addExercise
  async addExercise(data) {
    //search for all within the paramaters and display the first 
    const id = location.search.split("=")[1];
    //set a variable in which the workoutout location is added to the id, then the returned data from above
    //gets stringified onto the page via a put method
    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  //function that stringifies the workout data and returns it 
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },
//gets all workouts within the requried parameters 
  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
