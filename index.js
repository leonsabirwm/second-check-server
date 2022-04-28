const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
require('dotenv').config()

//middlewares
app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bxlow.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      console.log('db connected')
      const productCollection = client.db("productHub").collection("product");

    app.post('/product',async(req,res)=>{
        const product = req.body.product;
        console.log(product);
        const result = await productCollection.insertOne(product);
        res.send(result);
    })
    app.delete('/product/:id',async(req,res)=>{
        const id = req.params.id;
        console.log(id);
        const query = {_id:ObjectId(id)}
        const result = await productCollection.deleteOne(query);
        res.send(result);
    })
    app.get('/products',async(req,res)=>{
        const query = {};
        const cursor = productCollection.find(query);
        const result = await cursor.toArray();
        res.send(result);


    })
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('server is running');
})

app.listen(port,()=>{
    console.log('listening to port',port);
})