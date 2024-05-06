import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        chainName: {
            type: String,
            required: true
        },
        contractCode: {
            type: String,
        },
        contractAddress: {
            type: String,
        },
        

    },
    { timestamps: { createdAt: "created_at" } }
);

const Course = mongoose.model("Course", CourseSchema);
export default Course;
