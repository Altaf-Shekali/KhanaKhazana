import kitchen from "../model/kitchen.model.js";

export const getkitchen= async(req,res)=>{
  try{
    const Kitchen= await kitchen.find();
    res.status(200).json(Kitchen);
  } catch(error){
     console.log("Error:",error);
     res.status(500).json(error);
  }

};