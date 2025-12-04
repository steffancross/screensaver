import React from 'react';
export declare type DvdScreensaverProps = {
    children: React.ReactNode;
    className?: string;
    freezeOnHover?: boolean;
    freezeOnBool?: boolean;
    height?: string;
    width?: string;
    hoverCallback?: () => void;
    impactCallback?: (count: number) => void;
    speed?: number;
    styles?: HTMLStyleElement;
};
export declare function DvdScreensaver(props: DvdScreensaverProps): JSX.Element;
