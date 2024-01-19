'use client'
import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import { MenuLayoutProps } from "./MainLayout.props";
import styles from './MainLayout.module.css';
import { usePathname, useRouter } from "next/navigation";
import cn from 'classnames';
import { PATHS } from "@/helpers/paths";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserState } from "@/stores/user.store";
import { RiLogoutBoxLine } from "react-icons/ri";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
});

const MainLayout: FC<PropsWithChildren<MenuLayoutProps>> = ({ children }) => {
    const token: boolean = !!localStorage.getItem('token');
    const { deleteUserData } = useUserState();
    const pathname = usePathname();
    const { replace } = useRouter();
    const logout = () => {
        deleteUserData();
        localStorage.removeItem('token');
    }
    if (pathname !== '/auth/login' && pathname !== '/auth/registration' && !token) {
        replace('/auth/login');
        return;
    }
    return <QueryClientProvider client={queryClient}>
        {token && (<nav className={styles.navigate}>
            {PATHS.map(path => (path.url === '/auth/login' ? <Link onClick={logout}
                key={path.name}
                className={cn(styles.link, {
                    [styles.active]: path.url === pathname
                })}
                href={path.url}><RiLogoutBoxLine className={styles.exit} />{path.name}</Link> :
                <Link key={path.name}
                    className={cn(styles.link, {
                        [styles.active]: path.url === pathname
                    })}
                    href={path.url}>{path.name}</Link>
            ))}
        </nav>)}
        <main className={styles.main}>{children}</main>
    </QueryClientProvider>
};

export default MainLayout;