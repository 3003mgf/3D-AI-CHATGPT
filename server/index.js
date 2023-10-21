import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;



app
  .use(cors())
  .use(express.json({limit: "50mb"}))
  .use(morgan("dev"))


app.use("/api/03/dalle", router);


app.listen(port, ()=>{
  console.log(`Server running at port ${port}`);
})
