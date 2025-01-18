import React from "react";

type Props<Item> = {
    items: Item[];
    renderItem: (item: Item) => React.ReactNode;
}

export function List<Item>({items, renderItem}: Props<Item>) {
    return <ul>{items.map(renderItem)}</ul>;
}
