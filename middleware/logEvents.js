const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, fileName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..','logs'))) {
            await fsPromises.mkdir(path.join(__dirname,'..','logs'));
        }

        await fsPromises.appendFile(path.join(__dirname,'..','logs', fileName), logItem);
    } catch (err) {
        console.log(err);
    }

    
}

const logger = (req, res, next) => {
  console.log(`${req.url} ${req.method}`);
  logEvents(`${req.url}\t${req.headers.origin}\t${req.method}`, "reqLog.txt");
  next();
};

module.exports = {logger,logEvents};
