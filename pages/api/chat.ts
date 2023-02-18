import { NextApiRequest, NextApiResponse } from "next";
type Data = {
    message : String,
    aiResp? : any
}
export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse<Data>) {
        if(req.method !== "POST"){
            return res.status(405).send({message : "Only POST request are allowed"})
        }

        const headers = {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${process.env.GET_API_KEY}`
        }

        const response = await fetch("https://api.openai.com/v1/completions",{
            method : "POST",
            headers,
            body : JSON.stringify({
                "model" : "text-davinci-003",
                "prompt" : `Act like an experienced Chef who knows everything about cuisine in the world. Give me step-by-step instructions to prepare ${req.body.dish}. If that is not a cuisine then tell me that is not a cuisine and don’t give any further explanation.`,
                "temperature" : 0.5,
                "max_tokens" : 550
            })
        })
        const aiResp = await response.json()
        res.json({
            message : "Success",
            aiResp
        })
    
}

//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
//org-RQBbmAoWYOmfkV9E7pJKzxfs