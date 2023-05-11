import jwt from "jsonwebtoken"

export const verifyToken =async(req,res,next)=>{
    try {
        let token=req.header("Authorization");
        !token && res.status(403).send("access denied");
        if(token.startsWith("Bearer ")){
            token=token.slice(7,token.length).trimLeft();
            
        }
        const verify=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;
        next();
      
    } catch (error) {
        res.status(500).json({err:error})
    }
}