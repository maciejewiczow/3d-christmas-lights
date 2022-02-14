export const objHasOwnProperties = (obj: object, propNames: Array<string | number | symbol>): boolean => (
    propNames.every(prop => prop in obj)
);
