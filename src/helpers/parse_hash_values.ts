function parseHashValues(result: Record<string, any>, idName?: string): Record<string, any> {
    Object.entries(result).map(([key, val]) => {
        result[key] = {
            ...JSON.parse(val), ...(idName ? {[idName]: key} : {}),
        };
    });
    
    return result;
}

export {parseHashValues};