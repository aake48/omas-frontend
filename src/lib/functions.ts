
/**
 * Replaces äöå and whitespace with aoa and _.
 * Useful when converting club and competition names to ids that the api urls accept.
 * @returns string
 */
export const stringToId = (str: string) => {
    return str
        .replaceAll("ä", "a")
        .replaceAll("ö", "o")
        .replaceAll("å", "a")
        .replaceAll(" ", "_");
}