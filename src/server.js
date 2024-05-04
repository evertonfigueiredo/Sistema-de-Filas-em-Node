import 'dotenv/config';
import express from 'express';
import UserController from './app/controllers/UserController.js';
import QueueList from './app/lib/Queue.js';
import {BullAdapter} from "@bull-board/api/bullAdapter.js"
import {ExpressAdapter } from "@bull-board/express"
import Queue from 'bull'
import { createBullBoard } from "@bull-board/api"


const redisOptions = {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT // if no password, omit this field
    },
};

const queuesList = await QueueList.queues.map(queue => queue.name)

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const queues = queuesList
    .map((qs) => new Queue(qs, redisOptions))
    .map((q) => new BullAdapter(q));
  const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues,
    serverAdapter: serverAdapter,
  });


const app = express();


app.use(express.json());
app.post('/users', UserController.store);


app.use("/admin/queues", serverAdapter.getRouter());

app.listen(3333, () => {
    console.log('Server running on localhost:3333');
});


// --------- Monitoro ------

// import Queue from './app/lib/Queue.js';
// import monitoro from 'monitoro'

// let QueueList = await Queue.queues.map(queue => {
//     return {
//         "name": queue.name,
//         "hostId": "redis",
//         "url": "redis://localhost:6379"
//     }
// });

// app.locals.MonitoroQueues = QueueList

// app.use('/admin/queues', monitoro)