const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide name'],
        trim: true,
        maxlength: [20, 'name cannot be more than 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;