import { schema } from '../models/index.js'
import { transactionCalculation } from '../helpers/index.js'

export const postTransaction = (req, res) => {
    const data = schema.validate(req.body);
    if (data.error) return res.status(400).send(data.error.details[0].message);
    const response = transactionCalculation(req.body)
    return res.status(200).send(response);
    
}