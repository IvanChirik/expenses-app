import { FC, PropsWithChildren } from 'react';
import styles from './Label.module.css';
import { LabelProps } from './Label.props';
import cn from 'classnames';
import HTag from '../HTag/HTag';

const Label: FC<PropsWithChildren<LabelProps>> = ({ children, className, ...props }) => {
    return <label className={cn(styles.label, className)} {...props}><HTag>{children}</HTag></label>
};

export default Label;