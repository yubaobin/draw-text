interface NavItem {
    NavName: string;
}
/**
 * 配置
 */
interface YbNavConfig {
    navItem?: string;
    bounce?: boolean;
    clickItem?(e: EventListener, index: number): void,
    space?: number;
}

interface NormalItem {
    icon?: string
    name?: string
    cover?: string
    fileurl?: string
    code?: string
}

declare class YbNav {
    constructor(el: string | Element, options: YbNavConfig);
    addNav (nav: string): void;
    removeNav (index: number): void;
    setActive (index: number): void;
    scrollTo (index: number): void;
    refresh (): void;
    /**
     * 销毁
     */
    destroy (): void;
}
declare module 'ybnav' {
    export default YbNav
}