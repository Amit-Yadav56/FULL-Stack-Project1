const express=require('express');
const app=express();
// cross origin resource sharing
const cors=require('cors');

app.use(cors());
app.get('/',(req,res)=>{
    return res.json("Hey there");
})


app.listen(4000,()=>{
    console.log("listening to port 4000")
})
