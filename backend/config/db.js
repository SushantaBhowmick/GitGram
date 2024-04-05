const mongoose  = require("mongoose");

exports.ConnectDB=()=>{
    mongoose.connect(process.env.MONGO_URI).then((data)=>{
        console.log(`mongodb connected with server ${data.connection.host}`)
    }).catch((err)=>{
        console.log("DBError:",err)
    })
}
