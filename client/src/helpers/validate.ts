export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]{3,}\.[^\s@]{2,}/;
    return emailRegex.test(email);
};
export const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;
    return passwordRegex.test(password);
};
export const validateName = (name: string) => {
    return name.length > 1;
}
export const validateTransactionTitle = (title: string) => {
    return title.length > 3;
}
export const validateTransactionAmount = (amount: number) => {
    return amount < 0;
}