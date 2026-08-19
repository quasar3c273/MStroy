import { items } from "../data/fakeData";
import TreeStore from "./TreeStore";

const store = new TreeStore(items);

console.log(store.getAll())