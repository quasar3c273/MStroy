import { items } from "../data/fakeData";
import TreeStore from "./TreeStore";

const store = new TreeStore(items);

// console.log('=== getAll ===');
// console.log(store.getAll());

// console.log('=== getItem ===');
// console.log(store.getItem(4));
// console.log(store.getItem('91064cee'));

// console.log('=== addItem ===');
// console.log(store.getAll());
// store.addItem({
//     id: 9,
//     parent: 3,
//     label: 'Айтем 9',
// });
// console.log(store.getAll());

console.log('=== updateItem ===');
console.log(store.getItem(5));
store.updateItem({ id: 5, parent: '91064cee', label: '!!!! Айтем 5' });

console.log(store.getItem(5));
