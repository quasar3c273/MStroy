import type { TTreeItemsData } from "../tree/types/types"

export default class TreeStore {
    private readonly items = new Map<number | string, TTreeItemsData>()
    private readonly children = new Map<
        number | string,
        Set<number | string>
    >()

    constructor(items: TTreeItemsData[]) {
        for (const item of items) {
            this.addItem(item)
        }
    }

    getAll(): TTreeItemsData[] {
        return Array.from(this.items.values())
    }

    getItem(id: number | string): TTreeItemsData | undefined {
        return this.items.get(id)
    }

    addItem(item: TTreeItemsData): void {
        if (this.items.has(item.id)) {
            throw new Error(
                `Элемент с ID "${item.id}" существует`
            )
        }

        this.items.set(item.id, item)
    }

    updateItem(item: TTreeItemsData): void {
        if (!this.items.has(item.id)) {
            throw new Error(
                `Элемента с ID "${item.id}" не существует`
            )
        }

        this.items.set(item.id, item)
    }

    getChildren(id: number | string): TTreeItemsData[] {
        const childIds = this.children.get(id)

        if (!childIds) {
            return []
        }

        return Array.from(childIds)
            .map(childId => this.items.get(childId))
            .filter((item): item is TTreeItemsData => item !== undefined)
    }

    getAllChildren(id: number | string): TTreeItemsData[] {
        const result: TTreeItemsData[] = []

        const traverse = (parentId: number | string): void => {
            const childIds = this.children.get(parentId)

            if (!childIds) {
                return
            }

            for (const childId of childIds) {
                const child = this.items.get(childId)

                if (!child) {
                    continue
                }

                result.push(child)
                traverse(childId)
            }
        }

        traverse(id)

        return result
    }

    getAllParents(id: number | string): TTreeItemsData[] {
        const result: TTreeItemsData[] = []

        let current = this.items.get(id)

        while (current) {
            result.push(current)

            if (current.parent === null) {
                break
            }

            current = this.items.get(current.parent)
        }

        return result
    }
}