declare module '*.png'
declare module '*.tsx'
declare module JSX {
  type Element = string;
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
