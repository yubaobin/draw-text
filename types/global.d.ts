import { ComponentPublicInstance, FunctionalComponent } from 'vue'

declare global {
    declare type Recordable<T = any> = Record<string, T>;
    declare type ReadonlyRecordable<T = any> = {
        readonly [key: string]: T;
    }
    declare interface ViteEnv {
        VITE_publicpath: string;
        VITE_outputdir: string;
        VITE_port: number;
        VITE_proxy: [string, string][];
        VITE_drop_console: boolean;
        VITE_apipath: string;
    }
    namespace JSX {
		interface IntrinsicElements {
			[elem: string]: any;
		}
	}

    interface Window {
        rem: number;
        dpr: number;
    }
}

declare module 'vue' {
    export type JSXComponent<Props = any> =
      | { new (): ComponentPublicInstance<Props> }
      | FunctionalComponent<Props>;
}