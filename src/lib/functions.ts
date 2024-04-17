

export const stringToId = (str: string) => {
    return str
        .replaceAll("ä", "a")
        .replaceAll("ö", "o")
        .replaceAll("å", "a")
        .replaceAll(" ", "_");
}