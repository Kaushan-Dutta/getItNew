const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const http=require('http');
const cors=require('cors');

const app=express();
const server=http.createServer(app);

const schema=require('./schema/index')

app.use(cors(
    {origin:true,credentials:true}
))
app.use(express.json());
app.use("/graphql",graphqlHTTP({
      schema:schema,
      graphiql:true //for testing enviorment
    })
)
app.use('/',(req,res)=>{
    return res.status(200).json({message:true})
})
server.listen(3030,()=>{
    console.log("Server Started");
})