import type { ReactNode } from 'react';

type TitleTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TitleSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
type TitleWeight = 'normal' | 'medium' | 'semibold' | 'bold';

const sizeClasses: Record<TitleSize, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
};

const weightClasses: Record<TitleWeight, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
};

interface TitleProps {
    children: ReactNode;
    as?: TitleTag;
    size?: TitleSize;
    weight?: TitleWeight;
    color?: string;
    className?: string;
}

export const Title = ({
    children,
    as: Tag = 'h1',
    size = '4xl',
    weight = 'bold',
    color = 'text-gray-800',
    className,
}: TitleProps) => {
    const classes = [
        sizeClasses[size],
        weightClasses[weight],
        color,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return <Tag className={classes}>{children}</Tag>;
};
