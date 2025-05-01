const checkRole = (allowedRoles) =>{
    return (req,res,next)=>{
    if(!req.userInfo || !allowedRoles.includes(req.userInfo.role) ){
        return res.status(403).json({error:true,message:"Access Denied: Unauthorized role"});
    }
    next();

    }
}

module.exports = {checkRole}