// see https://webpack.js.org/guides/typescript/#basic-setup for info
//
// webpack types that allow this:
// import dogImageUrl from 'images/dog.jpg';
// testImage.src = dogImageUrl;

declare module "*.png" {
    const url: string;
    export default url;
}

declare module "*.jpg" {
    const url: string;
    export default url;
}

declare module "*.svg" {
    const url: string;
    export default url;
}

declare module "*.gif" {
    const url: string;
    export default url;
}

declare module "*.styl" {
    const something: {}
    export default something;
}

declare module "*.css" {
    const something: {};
    export default something;
}
