const mongoose = require("mongoose");
require('dotenv').config()


// Import models
const User = require("./models/User");
const Exercise = require("./models/Exercise");
const Submission = require("./models/Submission");



mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected for seeding"))
.catch(err => console.error(err));

const seed = async () => {
try {
// 1. Clear old data
await User.deleteMany();
await Exercise.deleteMany();
await Submission.deleteMany();

// 2. Create admin
const admin = new User({
username: "Admin User",
email: "admin@example.com",
password: "12345678",
role: "admin",
});
await admin.save();

// 3. Create teacher
const teacher = new User({
username: "Teacher One",
email: "teacher@example.com",
password: "12345678",
role: "teacher",
isApproved:true,
});
await teacher.save();

// 4. Create students
const student1 = new User({
username: "Alice Student",
email: "alice@example.com",
password: "12345678",
role: "student",
});
const student2 = new User({
username: "Bob Student",
email: "bob@example.com",
password: "12345678",
role: "student",
});
await student1.save();
await student2.save();

// 5. Create exercises
const exercise1 = new Exercise({
title: "Math Problem 1",
description: "Solve 5 + 7",
teacher: teacher._id,
});
const exercise2 = new Exercise({
title: "English Task 1",
description: "Write a short paragraph about your favorite animal",
teacher: teacher._id,
});
await exercise1.save();
await exercise2.save();

// 6. Create submissions
const submission1 = new Submission({
student: student1._id,
exercise: exercise1._id,
answer: "5 + 7 = 12",
});
const submission2 = new Submission({
student: student2._id,
exercise: exercise2._id,
answer: "My favorite animal is a dog because it is loyal.",
});
await submission1.save();
await submission2.save();

console.log("✅ Seed data created successfully!");
process.exit();
} catch (err) {
console.error("❌ Error seeding data:", err);
process.exit(1);
}
};

seed();