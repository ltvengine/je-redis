import {variousSchemas} from '../validators';

function validateData(data: Record<string, any>) {
    Object.entries(data).map(([key, value]) => {
        const schema = variousSchemas[key];
        const validationError = schema.validate(value).error;
        if (validationError) {
            throw new Error(validationError.details[0].message);
        }
    });
}

export {validateData};