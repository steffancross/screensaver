import React from 'react';
export declare type useDvdScreensaverParams = {
    freezeOnHover?: boolean;
    hoverCallback?: () => void;
    speed?: number;
};
export declare type UseDvdScreensaver = {
    containerRef: React.RefObject<HTMLElement | HTMLDivElement | React.ReactElement>;
    elementRef: React.RefObject<HTMLElement | HTMLDivElement | React.ReactElement>;
    hovered: boolean;
    impactCount: number;
};
export declare function useDvdScreensaver(params: useDvdScreensaverParams): UseDvdScreensaver;
