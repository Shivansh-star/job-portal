import mongoose from "mongoose";
import { User } from "./models/user.model.js";
import { Job } from "./models/job.model.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const users = await User.find().limit(1);
        if (users.length === 0) {
            console.log("No users found");
            return;
        }
        const user = users[0];
        console.log("User:", user.email, "Saved Jobs:", user.profile?.savedJobs);

        const jobs = await Job.find().limit(1);
        if (jobs.length === 0) {
            console.log("No jobs found");
            return;
        }
        const job = jobs[0];

        // Simulate toggle logic
        if (!user.profile) user.profile = {};
        if (!user.profile.savedJobs) user.profile.savedJobs = [];

        const isSaved = user.profile.savedJobs.includes(job._id.toString());
        console.log("isSaved natively?", isSaved);

        const includesWithMongoose = user.profile.savedJobs.includes(job._id);
        console.log("isSaved with ObjectId?", includesWithMongoose);

        console.log("Done");
    } catch (e) {
        console.error(e);
    } finally {
        mongoose.disconnect();
    }
}
run();
