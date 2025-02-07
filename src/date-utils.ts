export const todayStringAdjusted = (days: number) => {

    // Days can be negative
    let dateObj: Date = new Date();
    dateObj.setDate(dateObj.getDate() + days)
    return dateObj.toISOString().slice(0, 10)
}

export const dateStringAdjusted = (date: string, days: number) => {

    // Days can be negative
    let dateObj: Date = new Date(date);
    dateObj.setDate(dateObj.getDate() + days)
    return dateObj.toISOString().slice(0, 10)
}

export const todayString = () => {
    return new Date().toISOString().slice(0, 10);
}

