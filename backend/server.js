const app = require("./app");
const { ConnectDB } = require("./config/db");


// handling uncaught error
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server handling uncaught expception`)
})

const port = process.env.PORT || 8080;

//db connection
ConnectDB();


const server = app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

// unhandled Promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Shutting down the server for ${err.message}`)
    console.log(`shutting down the`)

    server.close(()=>{
        process.exit(1)
    })
})