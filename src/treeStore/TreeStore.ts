import TTreeItemsData from "../tree/types/types"

export default class TreeStore {
    private readonly items = new Map<number | string, TTreeItemsData>()

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
}