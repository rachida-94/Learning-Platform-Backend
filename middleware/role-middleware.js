function checkrole(req,res,next) { 
const userRole= req.user.role
    if(!allowedRoles.includes(userRole)){
        return res.status(400).json({error: 'Access denied.Teachres only'})
    }

    next()
}

module.exports = checkrole