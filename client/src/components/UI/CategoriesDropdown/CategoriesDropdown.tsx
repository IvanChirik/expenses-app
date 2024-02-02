'use client';

import { FC, useEffect, useState } from 'react';
import styles from './CategoriesDropdown.module.css';
import { IDropdownProps } from './CategoriesDropdown.props';
import { MdKeyboardArrowDown } from "react-icons/md";
import cn from 'classnames';
import { FiPlus } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import Input from '../Input/Input';
import Button from '../Button/Button';
import { COLOR, colorSchema } from '@/helpers/colorSchema';
import { ICategoryData } from '@/interfaces/category.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import categoryService from '@/services/categoryService';

const CategoriesDropdown: FC<IDropdownProps> = ({ className, onSelectId, defaultCategory, options, ...props }) => {
    const [selectedItem, setSelectedItem] = useState<ICategoryData | null>(null);
    const [selectedEditId, setSelectedEditId] = useState<number>(NaN)
    const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [newCategoryVisible, setNewCategoryVisible] = useState<boolean>(false);
    const [selectedColor, setSelectedColor] = useState<COLOR>();
    const [newCategoryTitle, setNewCategoryTitle] = useState<string>();
    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: async () => {
            if (newCategoryTitle && selectedColor) {
                if (selectedEditId)
                    return await categoryService.updateCategory(selectedEditId, newCategoryTitle, selectedColor)
                return await categoryService.createCategory(newCategoryTitle, selectedColor);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            setNewCategoryVisible(prev => !prev);
            setSelectedEditId(NaN);
        },
        onError: () => {

        }
    });
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            return await categoryService.deleteCategory(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            setNewCategoryVisible(false);
        },
    })
    useEffect(() => {
        if (!newCategoryVisible || !isDropdownOpen) {
            setNewCategoryTitle(undefined);
            setSelectedColor(undefined);
            setSelectedEditId(NaN);
        }
    }, [newCategoryVisible, isDropdownOpen]);
    const handleItemClick = (category: ICategoryData) => {
        onSelectId(category.id)
        setSelectedItem(category);
        setDropdownOpen(false);
    };
    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };
    const editCategory = (category: ICategoryData) => {
        setSelectedEditId(category.id)
        setNewCategoryVisible(true);
        setNewCategoryTitle(category.title);
        setSelectedColor(category.color);
    }
    return (
        <div className={styles.dropdown}
            style={{ backgroundColor: `${selectedItem?.color}` }}
            {...props}>
            <div
                className={styles['dropdown-title']}
                onClick={toggleDropdown}>
                {selectedItem?.title || defaultCategory || "Выберите категорию"}&nbsp;<MdKeyboardArrowDown className={cn(styles.arrow, {
                    [styles.active]: isDropdownOpen
                })} />
            </div>
            {isDropdownOpen && (
                <div className={cn(styles['dropdown-content'], {
                    [styles.visible]: isDropdownOpen
                }
                )}>
                    {Array.isArray(options) && options.map(item =>
                        <div
                            className={styles['dropdown-item']}
                            key={item.id}
                            style={{ backgroundColor: `${item.color}` }}
                        >
                            <FiEdit3 onClick={() => editCategory(item)} />
                            <div
                                onClick={() => handleItemClick(item)}
                            >{item.title}</div>
                            <FaTrash onClick={() => deleteMutation.mutate(item.id)} />
                        </div>
                    )}
                    <div className={styles['add-button']}>
                        <div style={{ width: '50px', fontSize: '25px' }}
                            className={cn(styles['dropdown-item'])}
                            onClick={() => setNewCategoryVisible(prev => !prev)}>
                            <FiPlus className={cn({
                                [styles.plus]: newCategoryVisible
                            })} />
                        </div>
                    </div>
                    {newCategoryVisible && <div className={styles['new-category']}>
                        <Input
                            className={styles.input}
                            placeholder='Название категории'
                            onChange={(e) => setNewCategoryTitle(e.target.value)}
                            value={newCategoryTitle}
                        />
                        <span className={styles['select-label']}>Выберите цвет</span>
                        <div className={styles['color-selector']}>
                            {colorSchema.map(color => <div
                                className={cn(styles.color, {
                                    [styles['active-color']]: selectedColor === color
                                })}
                                style={{ backgroundColor: `${color}` }}
                                onClick={() => setSelectedColor(color)}
                            ></div>)}
                        </div>
                        <Button
                            onClick={() => createMutation.mutate()}
                            className={styles.submit}
                            disabled={!selectedColor || !newCategoryTitle}
                            type='button'>{selectedEditId ? 'Обновить категорию' : 'Добавить категорию'}</Button>
                    </div>}
                </div>
            )}
        </div>
    );
};


export default CategoriesDropdown;