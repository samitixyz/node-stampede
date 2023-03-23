const exe = require('@angablue/exe');

const build = exe({
    entry: './app.js',
    out: './build/decodingmachine.exe',
    target: 'latest-win-x64',
    properties: {
        FileDescription: 'Help Chocobot to decoding images.',
        ProductName: 'decodingmachine',
        LegalCopyright: 'samiti3d',
        OriginalFilename: 'Decoding Machine'
    }
});

build.then(() => console.log('Build completed!'));