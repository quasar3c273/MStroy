import { describe, expect, it } from "vitest"
import TreeStore from "../treeStore/TreeStore"
import { items } from "../data/fakeData"

describe("TreeStore", () => {
    describe("getAll", () => {
        it("вернуть всё", () => {
            const store = new TreeStore(items)

            expect(store.getAll()).toEqual(items)
        })
    })

    describe("getItem", () => {
        it("вернуть элемент по ID", () => {
            const store = new TreeStore(items)

            expect(store.getItem(4)).toEqual({
                id: 4,
                parent: "91064cee",
                label: "Айтем 4",
            })

            expect(store.getItem("91064cee")).toEqual({
                id: "91064cee",
                parent: 1,
                label: "Айтем 2",
            })
        })

        it("ошибка, если нет элемента с ID", () => {
            const store = new TreeStore(items)

            expect(store.getItem(999)).toBeUndefined()
        })
    })

    describe("getChildren", () => {
        it("вернуть 1 уровень детей", () => {
            const store = new TreeStore(items)

            expect(
                store.getChildren(1).map(item => item.id)
            ).toEqual([
                "91064cee",
                3,
            ])

            expect(
                store.getChildren("91064cee").map(item => item.id)
            ).toEqual([
                4,
                5,
                6,
            ])

            expect(
                store.getChildren(4).map(item => item.id)
            ).toEqual([
                7,
                8,
            ])
        })

        it("вернуть пустой массив, если нет детей", () => {
            const store = new TreeStore(items)

            expect(store.getChildren(7)).toEqual([])
        })
    })

    describe("getAllChildren", () => {
        it("вернуть всех детей", () => {
            const store = new TreeStore(items)

            expect(
                store.getAllChildren(1).map(item => item.id)
            ).toEqual([
                "91064cee",
                4,
                7,
                8,
                5,
                6,
                3,
            ])
        })

        it("вернуть пустой массив, если нет детей", () => {
            const store = new TreeStore(items)

            expect(store.getAllChildren(7)).toEqual([])
        })
    })

    describe("getAllParents", () => {
        it("вернуть путь от элемента до корня", () => {
            const store = new TreeStore(items)

            expect(
                store.getAllParents(7).map(item => item.id)
            ).toEqual([
                7,
                4,
                "91064cee",
                1,
            ])
        })

        it("для корневого элемента возвращает только его", () => {
            const store = new TreeStore(items)

            expect(
                store.getAllParents(1).map(item => item.id)
            ).toEqual([1])
        })
    })

    describe("addItem", () => {
        it("добавить новый элемент", () => {
            const store = new TreeStore(items)

            store.addItem({
                id: 9,
                parent: 3,
                label: "Айтем 9",
            })

            expect(store.getItem(9)).toEqual({
                id: 9,
                parent: 3,
                label: "Айтем 9",
            })

            expect(
                store.getChildren(3).map(item => item.id)
            ).toEqual([9])
        })

        it("ошибка, если ID уже есть в списке", () => {
            const store = new TreeStore(items)

            expect(() => {
                store.addItem({
                    id: 4,
                    parent: 1,
                    label: "Новый элемент",
                })
            }).toThrow(
                'Элемент с ID "4" существует'
            )
        })

        it("ошибка, если parent не существует", () => {
            const store = new TreeStore(items)

            expect(() => {
                store.addItem({
                    id: 9,
                    parent: 999,
                    label: "Айтем 9",
                })
            }).toThrow(
                'Родителя с ID "999" не существует'
            )
        })
    })

    describe("updateItem", () => {
        it("обновить запись", () => {
            const store = new TreeStore(items)

            store.updateItem({
                id: 5,
                parent: "91064cee",
                label: "Обновлённый айтем",
            })

            expect(store.getItem(5)).toEqual({
                id: 5,
                parent: "91064cee",
                label: "Обновлённый айтем",
            })
        })

        it("изменить родителя элемента", () => {
            const store = new TreeStore(items)

            store.updateItem({
                id: 5,
                parent: 3,
                label: "Айтем 5",
            })

            expect(
                store.getChildren("91064cee").map(item => item.id)
            ).toEqual([
                4,
                6,
            ])

            expect(
                store.getChildren(3).map(item => item.id)
            ).toEqual([
                5,
            ])
        })

        it("ошибка, если нет элемента", () => {
            const store = new TreeStore(items)

            expect(() => {
                store.updateItem({
                    id: 999,
                    parent: 1,
                    label: "Айтем 999",
                })
            }).toThrow(
                'Элемент с ID "999" не существует'
            )
        })

        it("ошибка, если нет родителя", () => {
            const store = new TreeStore(items)

            expect(() => {
                store.updateItem({
                    id: 5,
                    parent: 999,
                    label: "Айтем 5",
                })
            }).toThrow(
                'Родителя с ID "999" не существует'
            )
        })
    })

    describe("removeItem", () => {
        it("удалить элемент", () => {
            const store = new TreeStore(items)

            store.removeItem(8)

            expect(store.getItem(8)).toBeUndefined()

            expect(
                store.getChildren(4).map(item => item.id)
            ).toEqual([
                7,
            ])
        })

        it("удалить элемент и всё дочернее", () => {
            const store = new TreeStore(items)

            store.removeItem(4)

            expect(store.getItem(4)).toBeUndefined()
            expect(store.getItem(7)).toBeUndefined()
            expect(store.getItem(8)).toBeUndefined()

            expect(
                store.getChildren("91064cee").map(item => item.id)
            ).toEqual([
                5,
                6,
            ])
        })

        it("ничего не делать, если несуществующий id", () => {
            const store = new TreeStore(items)

            expect(() => {
                store.removeItem(999)
            }).not.toThrow()

            expect(store.getAll()).toEqual(items)
        })
    })
})
