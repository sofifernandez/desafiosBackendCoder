import autocannon from "autocannon"
import { PassThrough } from "stream";

function run(url) {
  const buf = [];
  const outputStream = new PassThrough();

  //configuracion de autocannon
  const inst = autocannon({
    url,
    connections: 100, //numero de conexiones
    duration: 20, //duracion (creo que son segundos)
  });

  autocannon.track(inst, { outputStream });
  outputStream.on("data", (data) => buf.push(data));
  inst.on("done", () => {
    process.stdout.write(Buffer.concat(buf));
  });
}

console.log("Running all tests");

run('http://localhost:8080/api/info');
