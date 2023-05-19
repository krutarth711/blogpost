import { connect, createConnection } from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@ac-9v6kfna-shard-00-00.htaswbk.mongodb.net:27017,ac-9v6kfna-shard-00-01.htaswbk.mongodb.net:27017,ac-9v6kfna-shard-00-02.htaswbk.mongodb.net:27017/?ssl=true&replicaSet=atlas-i41f74-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try {
        await connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected');
    } catch (error) {
        console.log("Error while connecting to db:", error);
    }
}

export default Connection;