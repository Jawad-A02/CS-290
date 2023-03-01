import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

/**
 * Create a new movie with the title, year and language provided in the body
 */

app.post("/exercises", (req, res) =>{
    const name = req.body.name;
    const reps = req.body.reps;
    const weight = req.body.weight;
    const unit = req.body.unit;
    const date = req.body.date;
//    res.status(201).json(result)
    exercises.createExercise(name, reps, weight, unit, date)
        .then(exercise => {
            res.status(201).json(exercise)
        })
        .catch(error => {
            res.status(404).send(error)
        });
});

app.get("/exercises/:_id", (req, res) => {
    const filter = {_id: req.params._id};
    exercises.findExercise(filter)
        .then(exercise => {
            if(exercise !== null){
                res.status(200).json(exercise);
            } else {
            res.status(404).json({Error: "Not found"});
            }
        })
        .catch(error => {
            res.status(400). json({Error: "Request failed"});
        })
});

app.get("/exercises", (req, res) => {
    const filter = {};
    exercises.findExercise(filter)
        .then(exercise => {
            res.status(200).json(exercise);
        })
        .catch(error => {
            res.send({Error: "request failed"});
        });
});

app.put("/exercises/:_id", (req, res) => {
    const name = req.body.name;
    const reps = req.body.reps;
    const weight = req.body.weight;
    const unit = req.body.unit;
    const date = req.body.date;
    exercises.replaceExercise(req.params._id, name, reps, weight, unit, date)
        .then(result => {
            res.status(200).json({_id: req.params._id, name: name, reps: reps, weight:weight, unit: unit, date: date});
        }) 
        .catch(error => {
            res.status(404).json({Error: "Request Failed"});
        })
});

app.delete("/exercises/:_id", (req, res) => {
    exercises.deleteExercise(req.params._id)
        .then(deletedCount => {
            if(deletedCount === 1){
                res.status(204).send()
            } else {
                res.status(404).json({Error: "Not Found"})
            }
        })
        .catch(error => {
            res.send({Error: "Request Failed"})
        })
});



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});