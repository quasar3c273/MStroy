import { describe, expect, it } from "vitest"
import TreeStore from "../treeStore/TreeStore"
import type { TTreeItemsData } from "../types/types"

const createItems = (count: number): TTreeItemsData[] => {
    const items: TTreeItemsData[] = [
        {
            id: 1,
            parent: null,
            label: "Root",
        },
    ]

    for (let i = 2; i <= count; i++) {
        items.push({
            id: i,
            parent: Math.floor(i / 2),
            label: `Item ${i}`,
        })
    }

    return items
}

describe("TreeStore performance", () => {
    it("создание хранилища из 10 000 элементов", () => {
        const items = createItems(10000)

        const start = performance.now()

        const store = new TreeStore(items)

        const duration = performance.now() - start

        console.log(
            `TreeStore: 10 000 элементов создан за ${duration.toFixed(2)} ms`
        )

        expect(store.getAll()).toHaveLength(10000)
    })

    it("создание хранилища из 100 000 элементов", () => {
        const items = createItems(100000)

        const start = performance.now()

        const store = new TreeStore(items)

        const duration = performance.now() - start

        console.log(
            `TreeStore: 100 000 элементов создан за ${duration.toFixed(2)} ms`
        )

        expect(store.getAll()).toHaveLength(100000)
    })

    it("getItem() на 100 000 элементах", () => {
        const store = new TreeStore(createItems(100000))

        const start = performance.now()

        for (let i = 0; i < 10000; i++) {
            store.getItem(50000)
        }

        const duration = performance.now() - start

        console.log(
            `getItem(): 10 000 операций за ${duration.toFixed(2)} ms`
        )

        expect(store.getItem(50000)).toBeDefined()
    })

    it("getChildren() на 100 000 элементах", () => {
        const store = new TreeStore(createItems(100000))

        const start = performance.now()

        for (let i = 0; i < 10000; i++) {
            store.getChildren(1)
        }

        const duration = performance.now() - start

        console.log(
            `getChildren(): 10 000 операций за ${duration.toFixed(2)} ms`
        )

        expect(store.getChildren(1).length).toBeGreaterThan(0)
    })

    it("getAllChildren() на 100 000 элементах", () => {
        const store = new TreeStore(createItems(100000))

        const start = performance.now()

        const result = store.getAllChildren(1)

        const duration = performance.now() - start

        console.log(
            `getAllChildren(): ${result.length} элементов получено за ${duration.toFixed(2)} ms`
        )

        expect(result).toHaveLength(99999)
    })

    it("getAllParents() на 100 000 элементах", () => {
        const store = new TreeStore(createItems(100000))

        const start = performance.now()

        const result = store.getAllParents(100000)

        const duration = performance.now() - start

        console.log(
            `getAllParents(): ${result.length} элементов в цепочке за ${duration.toFixed(2)} ms`
        )

        expect(result[0]?.id).toBe(100000)
        expect(result.at(-1)?.id).toBe(1)
    })
})