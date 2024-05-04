import 'dotenv/config'

import mailQueue from "./app/lib/Queue.js";

mailQueue.process()