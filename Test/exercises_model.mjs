import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const exercisesSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required: true},
    date: {type: String, required: true}
});

const Exercise = mongoose.model('Exercise', exercisesSchema);

/*
* @param {String} title
* @param {number} year
* @param {String} language
* @returns
*/
const createExercise = async(name, reps, weight, unit, date) => {
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
};

const findExercise = async(filter) => {
    const query = Exercise.find(filter);
    return query.exec();
};

const updateExercise = async(filter, update) => {
    const results = await Exercise.updateOne(filter, update);
    return results;
};

const replaceExercise = async(_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({_id: _id}, {name: name, reps: reps, weight: weight, unit: unit, date: date});
    return result;
};

const deleteExercise = async(_id) => {
    const results = await Exercise.deleteOne({_id: _id});
    return results.deletedCount;
};

export {createExercise, findExercise, deleteExercise, replaceExercise};