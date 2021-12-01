function parseArrayValues(result: Record<string, any>,  idName?: string): Record<string, any>[]{
    return Object.entries(result).map(([key, val]) => {
        return {
            ...JSON.parse(val),
            ...(idName ? {[idName]: key} : {})
        }
        
    });
    
 }

export {parseArrayValues};