export const formatDate = (date) => {
    const currentDate = new Date(date)
    return currentDate.toLocaleDateString();
}

export const formatDateISO = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};