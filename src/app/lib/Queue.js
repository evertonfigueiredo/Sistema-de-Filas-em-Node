import Queue from 'bull'
import redisConfig from '../../config/redis.js'

import * as jobs from "../jobs/index.js"

const queues = Object.values(jobs).map(job => ({
    bull: new Queue(job.key, redisConfig),
    name: job.key,
    handle: job.handle,
    options: job.options
}))

export default {
    queues,
    add(name, data) {
        const queue = this.queues.find(queue => queue.name === name)

        return queue.bull.add(data, queue.options)
    },
    process() {
        return this.queues.forEach(queue => {
            queue.bull.process(queue.handle)

            queue.bull.on('failed', (job, err) => {
                console.log('Job Failed', queue.name, job.data);
                console.log(err);
            })
        })
    }
}

// const mailQueue = new Queue(RegistrationMail.key, redisConfig)

// mailQueue.on('failed', (job, err) => {
//     console.log('Job Failed', job.name, job.data);
//     console.error(err);
// })

// export default mailQueue