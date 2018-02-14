const mongoose = require('mongoose')

// Connect to Mongoose
mongoose.connect('mongodb://localhost/tesdt')
var db = mongoose.connection
