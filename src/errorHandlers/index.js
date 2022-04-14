
export const validateMedia = (err, req,res,next)=>{

    if(err.status===400) {
        console.log("erro 400");
        res.status(400).send("your request has erro 400"
         + err.message)}


}

export const genericError = (err, req,res,next)=>{
 
    res.status(500).send("your messed up 500", err.message)

}