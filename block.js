const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.post('/log', (req, res) => {
    const logEntry = [
        req.body.timestamp,
        req.body.ip,
        req.body.country,
        req.body.region,
        req.body.city,
        req.body.isp,
        req.body.reason,
    ].join(',') + '\n';

    fs.appendFile('visitors.log', logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
            res.status(500).send('Error writing to log file');
        } else {
            res.sendStatus(200);
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
