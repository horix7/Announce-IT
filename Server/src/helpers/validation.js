import Joi from 'joi';

module.exports={
    
    schemas:{ authSchema:Joi.object().keys({
                            email: Joi.string().required(),
                            first_name : Joi.string().min(3).max(8).required(), 
                            last_name : Joi.string().min(3).max(8).required(),
                            address: Joi.string(),
                            phoneNumber: Joi.string(),
                            password: Joi.string(),
                            is_admin: Joi.boolean()
                        }).options({abortEarly : false})
                        },
    validateInput:(schema)=>{
                return (req,res,next)=>{
                const result= Joi.validate(req.body,schema);
                if(result.error){
                    return res.status(400).json({
                        message : result.error.details
                      })
                }
                else{
                      next();
                }}
                }
}
