import Joi from 'joi';

export const splitInfo_schema = Joi.array().unique('SplitEntityId').items(
    Joi.object({
        SplitType : Joi.string().valid('FLAT', 'RATIO', 'PERCENTAGE').required(),
        SplitValue : Joi.number().required(),
        SplitEntityId : Joi.string().required()
    })
).required();

export const schema = Joi.object({
    ID : Joi.number().required(),
    Amount: Joi.number().min(0).required(),
    Currency: Joi.string().required(),
    CustomerEmail: Joi.string().email().required(),
    SplitInfo : splitInfo_schema.min(1).max(20)
});