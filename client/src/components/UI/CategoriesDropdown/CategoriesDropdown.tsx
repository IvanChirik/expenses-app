'use client';

import { FC, useState } from 'react';
import styles from './CategoriesDropdown.module.css';
import { IDropdownProps } from './CategoriesDropdown.props';
import { MdKeyboardArrowDown } from "react-icons/md";
import cn from 'classnames';

const CategoriesDropdown: FC<IDropdownProps> = ({ className, onSelectId, defaultCategory, options, ...props }) => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const handleItemClick = (item: string, id: number) => {
        onSelectId(id)
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
                {selectedItem || defaultCategory || "Выберите элемент"}&nbsp;<MdKeyboardArrowDown className={cn(styles.arrow, {
                    [styles.active]: isDropdownOpen
                })} />
            </div>
            {isDropdownOpen && (
                <div className={styles['dropdown-content']}>
                    {Array.isArray(options) && options.map(item =>
                        <div className={styles['dropdown-item']} key={item.id} onClick={() => handleItemClick(item.title, item.id)}>
                            {item.title}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


export default CategoriesDropdown;