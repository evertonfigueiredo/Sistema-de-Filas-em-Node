import 'dotenv/config';
import express from 'express';
import UserController from './app/controllers/UserController.js';
import Queue from './app/lib/Queue.js';
import monitoro from 'monitoro'

const app = express();


app.use(express.json());
app.post('/users', UserController.store);


let QueueList = await Queue.queues.map(queue => {
    return {
        "name": queue.name,
        "hostId": "redis",
        "url": "redis://localhost:6379"
    }
});

app.locals.MonitoroQueues = QueueList

app.use('/admin/queues', monitoro)

app.listen(3333, () => {
    console.log('Server running on localhost:3333');
});