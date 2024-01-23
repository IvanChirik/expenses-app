

export const formatDate = (date: Date): string => {
    const formatDate = new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    })
    return formatDate.format(new Date(date));
}