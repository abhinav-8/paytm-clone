const mongoose = reuqire("mongoose");
const {MONGO_URI} = require("./serverConfig")

const connect  = async ()=> {
    await mongoose.connect(`${MONGO_URI}`);
}

module.exports = connect;