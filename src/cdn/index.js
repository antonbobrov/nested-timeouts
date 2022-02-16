/* eslint-disable no-console */
import NestedTimeouts from '../ts/index';

window.NestedTimeouts = NestedTimeouts;

const timeouts = new NestedTimeouts();
const time = +new Date();

timeouts.add(() => {
    console.log(`add ${+new Date() - time}`);
}, 100).then(() => {
    console.log(`then ${+new Date() - time}`);
}, 200).then(() => {
    console.log(`then ${+new Date() - time}`);
}, 400);

timeouts.add(() => {
    console.log(`add ${+new Date() - time}`);
}, 1000);
