import React, { ReactElement } from "react";
interface Location {
    id: string;
    index: number;
}
export interface DragAndDropResult {
    source: Location;
    destination: Location;
}
export interface Chunk {
    id: string;
    items: any[];
}
export interface Props {
    chunks: Chunk[];
    direction: "horizontal" | "vertical";
    render(item: any): ReactElement<{}>;
    onDragEnd(result: DragAndDropResult): void;
}
export declare const DragAndDropWrapper: React.StatelessComponent<Props>;
export {};
