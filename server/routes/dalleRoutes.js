import express from "express";
import * as dotenv from "dotenv";
import OpenAI from 'openai';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "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"
});



export const router = express.Router();



router.route("/").post(async(req, res)=>{

  const { prompt } = req.body;

  try{
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json"
    });

    const image = response.data[0].b64_json;

    res.status(200).json({image})
  }catch(error){
    console.log("ERROR IS >>>", error);
  }
});