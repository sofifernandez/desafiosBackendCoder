import express  from 'express';
import { fork } from "child_process";

const routerRandom = express.Router();
let computo = fork('./utils/randoms.utils.js');

routerRandom.get("/", (req, res) => {
    const {cant=100000} = req.query; //http://localhost:8080/api/randoms?cant=2000
    computo.on("message", (rsdo) => {
        console.log(rsdo)
        res.status(200).send({ rsdo });
        computo.kill();
        computo = fork('./utils/randoms.utils.js');
    });
    computo.send(cant);
});

export default routerRandom