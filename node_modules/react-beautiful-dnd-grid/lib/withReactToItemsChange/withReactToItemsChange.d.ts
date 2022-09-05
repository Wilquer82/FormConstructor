import React from "react";
export interface Props {
    items: any[];
}
export declare const withReactToItemsChange: <P extends Props>(Component: React.ComponentType<P>) => React.ComponentType<P>;
