import mongoose from 'mongoose';
import gradesModel from './gradesModels.js';

const db = {};

db.mongoose = mongoose;
db.grades = gradesModel(mongoose);
db.url = process.env.MONGODB;



export { db };
