const mongoose = require('mongoose');

const mongouri = "mongodb://localhost:27017/inotebook";

const connectmongo = () => {
    mongoose.connect(mongouri, () => {
        console.log("coonected to mongo")
    })
}

module.exports=connectmongo
