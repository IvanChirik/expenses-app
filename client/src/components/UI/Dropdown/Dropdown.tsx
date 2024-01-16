'use client';

import { FC, ReactNode, useState } from 'react';
import styles from './Dropdown.module.css';
import { IDropdownProps } from './Dropdown.props';
import { MdKeyboardArrowDown } from "react-icons/md";
import cn from 'classnames';

const Dropdown: FC<IDropdownProps> = ({ className, options, ...props }) => {
    const [selectedItem, setSelectedItem] = useState<ReactNode>(null);
    const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const handleItemClick = (item: ReactNode) => {
        setSelectedItem(item);
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    return (
        <div className={styles.dropdown} {...props}>
            <div
                className={styles['dropdown-title']}
                onClick={toggleDropdown}>
                {selectedItem || "Выберите элемент"}&nbsp;<MdKeyboardArrowDown className={cn(styles.arrow, {
                    [styles.active]: isDropdownOpen
                })} />
            </div>
            {isDropdownOpen && (
                <div className={styles['dropdown-content']}>
                    {Array.isArray(options) && options.map(item =>
                        <div className={styles['dropdown-item']} key={item} onClick={() => handleItemClick(item)}>
                            {item}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


export default Dropdown;