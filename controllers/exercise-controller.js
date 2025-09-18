const Exercise = require("../models/Exercise");

async function createExercise(req, res) {
  try {
    //Only teachers can create the exercise so we need to check the role first
    if (req.user.role !== "teacher")
      return res
        .satus(403)
        .json({ error: "Only teachers can create exercise" });
    const { title, description } = req.body;
    //create new user
    const exercise = new Exercise({
      title,
      description,
      teacher: req.user._id,
    });
    const savedExercise= await exercise.save();
    res.status(201).json(savedExercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// student or teacher get all exercises

async function getExercises(req, res) {
  try {
    const exercises = await Exercise.find().populate("teacher","username email"); // we use populate so we can get the teacher that created the exercise
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get single exercise by ID

async function getExerciseById(req, res) {
  try {
    const exercise = await Exercise.findById(req.params.id).populate("teacher","username email");
    if (!exercise) return res.status(404).json({ error: "Exercise not found" });
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// Update an exercise only by teacher who created it

async function updateExercise(req, res) {
  try {
    const exercise = await Exercise.findById(req.params.id); // We need to find the exercise first

    if (!exercise)
      return res.status(400).json({ error: "Exercise not found with this ID" });

    if (req.user.role !== "teacher" || !exercise.teacher.equals(req.user._id))
      // first check  the user role and then if the user created this exercise before making any changes.
      return res
        .status(403)
        .json({ error: "Not authorized to update this exercise" });
    const updatedExercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, description: req.body.description },
      { new: true }
    );
    res.json(updatedExercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// delete an exercise only by teacher who created it

async function deleteExercise(req, res) {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise)
      return res.status(400).json({ error: "Exercise not found with this ID" });
    if (req.user.role !== "teacher" || !exercise.teacher.equals(req.user._id))
      return res
        .status(403)
        .json({ error: "Not authorized to delete this exercise" });
    await exercise.deleteOne();
    res.json({ message: "exercise deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createExercise,
  updateExercise,
  deleteExercise,
  getExerciseById,
  getExercises,
};
