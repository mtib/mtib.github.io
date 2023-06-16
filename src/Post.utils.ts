export const parseFilename = (filename: string) => {
    const date = (/(^(\d{4})-(\d{2})-(\d{2}))/).exec(filename)?.[1]
    if (date === undefined) {
        throw new Error(`Cannot parse date from ${filename}`);
    }
    const title = filename.slice(11, -3).replace(/-/g, ' ');
    const parsedDate = new Date(date);
    return {
        date: { d: parsedDate.getDate(), m: parsedDate.getMonth() + 1, y: parsedDate.getFullYear(), t: parsedDate.getTime() },
        title,
    }
}
