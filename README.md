# React DVD Screensaver

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

Modified version of original found [here](https://github.com/samuelweckstrom/react-dvd-screensaver#readme)

[Demo](https://codesandbox.io/s/react-dvd-screensaver-demo-mp563)

<br>

```
yarn add stffn-react-dvd-screensaver
npm i stffn-react-dvd-screensaver
```

<br>

## Changes

<br>

This is the same as the original package with two changes.

<br>

1. DvdScreensaver now takes an additional prop.

<br>

| Props                    |
| ------------------------ |
| `freezeOnBool?: boolean` |

<br>

This acts just like 'freezeOnHover' but the freezing is a toggle, works for one or many.

<br>

2. The intial movement is randomized, before it was always +X, +Y. Now it can be any of the four possibilities.

<br>

## License

[MIT](LICENSE)
