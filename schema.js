// const MongoClient = require('mongodb').MongoClient;
// import MongoClient from 'mongodb'
import { MongoClient } from 'mongodb';


const uri = 'mongodb+srv://Arthurobo:123456Admin@cluster0.uyqawi5.mongodb.net/'

const client = new MongoClient(uri);

client.connect(async (err) => {
    if (err) {
        console.error("Error connecting to MongoDB: ", err);
        return;
    }

    try {
        const db = client.db();

        await db.collection('postmessages').updateMany(
            { title: { $exists: false } },
            {
                $set: {
                    title: '',
                    message: '',
                    creator: '',
                    tags: '',
                    selectedFile: '',
                    likeCount: 0,
                },
            }
        );

        console.log("Documents updated successfully!!!");
    } catch (error) {
        console.error("Error updating documents: ", error);
    } finally {
        client.close();
    }
})