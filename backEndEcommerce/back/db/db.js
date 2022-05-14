import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); //con esto queda conectado al .env, que tiene el MONGO_URI

mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) {
      console.log("❌ Error al conectarse a MongoDB");
    } else {
      console.log("🔥 Conectados a MongoDB");
    }
  });

export default mongoose;