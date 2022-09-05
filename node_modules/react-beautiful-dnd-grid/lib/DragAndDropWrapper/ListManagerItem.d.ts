import React, { ReactElement } from "react";
export interface ListManagerItemProps {
    item: any;
    index: number;
    render(item: any): ReactElement<{}>;
}
export declare const ListManagerItem: React.StatelessComponent<ListManagerItemProps>;
