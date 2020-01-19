import Joi from 'joi';

module.exports={
    
    schemas:{ authSchema:Joi.object().keys({
                            id:Joi.number().integer().required(),
                            email: Joi.string().required().email(),
                            first_name : Joi.string().min(3).max(8), 
                            last_name : Joi.string().min(3).max(8),
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
