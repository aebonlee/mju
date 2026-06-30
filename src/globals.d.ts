import "react";
declare module "react" {
  interface CSSProperties {
    [key: string]: unknown;
  }
}
declare module "html2canvas" {
  export default function html2canvas(el: HTMLElement, opts?: Record<string,unknown>): Promise<HTMLCanvasElement>;
}
