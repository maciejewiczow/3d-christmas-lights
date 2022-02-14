export const withDefault = <T, U = T>(arr: T[], def: U) => (arr.length > 0 ? arr : def);
