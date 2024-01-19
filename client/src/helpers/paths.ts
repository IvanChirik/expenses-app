

export interface IPath {
    url: string;
    name: string;
    key: 'private' | 'open'
}

export const PATHS: IPath[] = [
    { url: '/', name: 'Главная', key: 'private' },
    { url: '/expense', name: 'Расходы', key: 'private' },
    { url: '/income', name: 'Доходы', key: 'private' },
    { url: '/auth/login', name: 'Выход', key: 'private' },
];