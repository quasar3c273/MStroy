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

    removeItem(id: number | string): void {
        const item = this.items.get(id)

        if (!item) {
            return
        }

        const descendants = this.getAllChildren(id)

        for (const descendant of descendants) {
            this.removeFromParentIndex(descendant)

            this.items.delete(descendant.id)
            this.children.delete(descendant.id)
        }

        this.removeFromParentIndex(item)

        this.items.delete(id)
        this.children.delete(id)
    }

    private addChildReference(
        parentId: number | string,
        childId: number | string,
    ): void {
        let childIds = this.children.get(parentId)

        if (!childIds) {
            childIds = new Set<number | string>()
            this.children.set(parentId, childIds)
        }

        childIds.add(childId)
    }

    private removeFromParentIndex(
        item: TTreeItemsData,
    ): void {
        if (item.parent === null) {
            return
        }

        const childIds = this.children.get(item.parent)

        if (!childIds) {
            return
        }

        childIds.delete(item.id)

        if (childIds.size === 0) {
            this.children.delete(item.parent)
        }
    }
}