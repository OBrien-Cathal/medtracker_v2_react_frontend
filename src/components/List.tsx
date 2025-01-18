import React from "react";

type Props<Item> = {
    items: Item[];
    renderItem: (item: Item) => React.ReactNode;
}
//   HOW TO USE!!!
//   <section className={"RoleChanges"}>
//                 <br/>
//                 <List items={roleChanges} renderItem={(roleChange) => (
//                     <li>
//                         <RoleChange roleChangeStatus={roleChange} makeRoleRequest={requestRoleChange}/>
//                     </li>
//                 )}/>
//             </section>

export function List<Item>({items, renderItem}: Props<Item>) {
    return <ul>{items.map(renderItem)}</ul>;
}
