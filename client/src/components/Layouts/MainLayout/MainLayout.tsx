'use client'
import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import { MenuLayoutProps } from "./MainLayout.props";
import styles from './MainLayout.module.css';
import { usePathname } from "next/navigation";
import cn from 'classnames';
import { IPath, PATHS } from "@/helpers/paths";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
});

const MainLayout: FC<PropsWithChildren<MenuLayoutProps>> = ({ children }) => {
    const token: boolean = true;
    let paths: IPath[];
    if (token)
        paths = PATHS.filter(path => path.key == 'private');
    else
        paths = PATHS.filter(path => path.key == 'open');
    const pathname = usePathname();
    return <QueryClientProvider client={queryClient}>
        <nav className={styles.navigate}>
            {paths.map(path => <Link key={path.name} className={cn(styles.link, {
                [styles.active]: path.url === pathname
            })} href={path.url}>{path.name}</Link>)}
        </nav>
        <main className={styles.main}>{children}</main>
    </QueryClientProvider>
};

export default MainLayout;