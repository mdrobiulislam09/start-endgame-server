const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');

const app = express();

app.use(cors())
app.use(express.json());

app.get('/', async (req, res) => {
    res.send(' running on ok')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.jm7v6w9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const productCollection = client.db('twelveserver').collection('medias');
        
        app.get('/medias', async(req, res) => {
            const query = {};
            const products = await productCollection.find(query).toArray();
            res.send(products);
        })
        // app.post('/medias', async(req, res) => {
        //     // console.log(req.file.path)
        //     console.log(req.body.text)
        //     const booking = req.body;
        //     const result = await productCollection.insertOne(booking);
        //     // console.log(result)
        //     res.send(result)
        // })
        app.post('/medias', upload.single('image'), async(req, res) => {
            
            const book = req.file;
            
            const resul = await productCollection.insertOne(book);
           
            console.log(resul)
            
            res.send(resul)
        })

        // app.put('/medias/:id', async (req, res) => {
        //     console.log(req.body)
        //     const id = req.params.id;
        //     const filter = { _id: ObjectId(id) };
        //     const option = { upsert: true};
        //     const updatedDoc = {
        //         $set: {
        //             comment: req.body
        //         }
        //     }
        //     const  result = await productCollection.updateOne(filter, updatedDoc, option);
        //     res.send(result)
        // })
    }
    finally {

    }
}
run().catch(console.log)
app.listen(port, () => console.log(` running on ${port}`))