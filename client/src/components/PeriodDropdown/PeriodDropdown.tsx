import { FC, useState } from 'react';
import styles from './PeriodDropdown.module.css';
import { IPeriodDropdown } from './PeriodDropdown.props';
import { MdKeyboardArrowDown } from 'react-icons/md';
import cn from 'classnames';
import { TransactionPeriodOptions, useTransactionState } from '@/stores/transaction.store';

const PERIOD_ITEMS = [
    {
        title: 'Неделя',
        flag: TransactionPeriodOptions.Week
    },
    {
        title: 'Месяц',
        flag: TransactionPeriodOptions.Month
    },
    {
        title: 'Год',
        flag: TransactionPeriodOptions.Year
    }] as const;
type Period = typeof PERIOD_ITEMS[number];

const PeriodDropdown: FC<IPeriodDropdown> = ({ className, ...props }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [dropdownItem, setDropdownItem] = useState<Period['title']>('Месяц');
    const { setTransactionPeriod } = useTransactionState();

    const changeHandler = (period: Period) => {
        setDropdownItem(period.title);
        setIsDropdownOpen(false);
        setTransactionPeriod(period.flag);
    }
    return <div
        className={cn(className, styles.dropdown)}
        {...props}>
        <div
            className={styles['dropdown-title']}
            onClick={() => setIsDropdownOpen(prev => !prev)}>
            <span>{dropdownItem}</span>&nbsp;<MdKeyboardArrowDown className={cn(styles.arrow, {
                [styles.active]: isDropdownOpen
            })} />
        </div>
        {isDropdownOpen && (
            <div className={cn(styles['dropdown-content'], {
                [styles.visible]: isDropdownOpen
            }
            )}>
                {PERIOD_ITEMS.map(period => <div className={cn(styles['dropdown-item'], {
                    [styles.changed]: period.title === dropdownItem
                })}
                    onClick={() => changeHandler(period)}>
                    <span>{period.title}</span>
                </div>)}
            </div>
        )}
    </div>
};

export default PeriodDropdown;