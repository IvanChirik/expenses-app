import { FC } from 'react';
import styles from './Loader.module.css';
import { LoaderProps } from './Loader.props';

const Loader: FC<LoaderProps> = () => {
    return <div className={styles.wrapper}><span className={styles.loader}></span></div>
};

export default Loader;