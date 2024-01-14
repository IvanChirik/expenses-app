import { FC } from 'react';
import Card from '../../UI/Card/Card';
import styles from './GraphCard.module.css';
import { IGraphCard } from './GraphCard.props';
import cn from 'classnames';


const GraphCard: FC<IGraphCard> = ({ className, ...props }) => {
    return <Card className={cn(className, styles['graph-wrapper'])} {...props}> Graph</Card>
};

export default GraphCard;