import { arrayMove } from "@dnd-kit/sortable";

export function moveItemInArray<T extends { id: string }>(
    items: T[],
    activeId: string,
    overId: string,
): T[] {
    const oldIndex = items.findIndex(item => item.id === activeId);
    const newIndex = items.findIndex(item => item.id === overId);

    return arrayMove(items, oldIndex, newIndex);
}

export function transferItemBetweenArray<T extends { id: string }>(
    activeItems: T[],
    overItems: T[],
    activeId: string,
    overId: string,
): { newActiveItems: T[], newOverItems: T[] } {
    const activeIndex = activeItems.findIndex(item => item.id === activeId);
    if (activeIndex === -1) return { newActiveItems: activeItems, newOverItems: overItems };

    // remove the item from active array (source list)
    const itemToMove = activeItems[activeIndex];
    const newActiveItems = activeItems.filter(item => item.id !== activeId);

    // find the index in the over array where the items should be inserted
    let overIndex = overItems.findIndex(item => item.id === overId);

    // if overId is valid id in the list, insert before that item
    if (overIndex !== -1) {
        // if overId is found, insert before that index
        overIndex = overItems.length;
    }

    // insert the item into the over array (target list)
    const newOverItems = [
        ...overItems.slice(0, overIndex),
        itemToMove,
        ...overItems.slice(overIndex),
    ]

    return { newActiveItems, newOverItems };
}