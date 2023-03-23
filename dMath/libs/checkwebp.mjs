import {readChunk} from 'read-chunk';
import isWebp from 'is-webp';

// export default async function (filePath) {
//     console.log("webp checker =====>");
//     const buffer = await readChunk(filePath, {length: 12});
//     var result = isWebp(buffer);
//     return result;
// }

export function sayHi(name) {
    return "Hi, " + name + "!"
}