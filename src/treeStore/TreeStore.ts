import TTreeItemsData from "../tree/types/types"

export default class TreeStore {
    private readonly items: TTreeItemsData[]

    constructor(items: TTreeItemsData[]) {
        this.items = items
    }

    getAll(): TTreeItemsData[] {
        return this.items
    }

    getItem(id: number | string): TTreeItemsData | undefined {
        return this.items.find(item => item.id === id)
    }
}