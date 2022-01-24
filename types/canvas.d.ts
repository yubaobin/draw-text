export interface ICanvasState {
    strokeColor: string;
    savePath: Array<Array<IPoint>>;
    isOpr: boolean
}

export interface CanvasEvent {
    [index: EventList]: (...arg: Array<any>) => void
}

/**
 * 画布配置
 * @property width
 * @property height
 * @property on
 */
export interface CanvasConfig {
    width?: number;
    height?: number;
    on?: CanvasEvent
}

/**
 * 事件配置
 */
export interface CanvasEventConfig {
    event: Event;
    savePath: Array<Array<IPoint>>;
    recordPath: Array<IPoint>;
    isOpr: boolean;
}

/**
 * 画布大小
 * @property width
 * @property height
 */
export interface CanvasSize {
    width: number;
    height: number;
}

/**
 * 一个点
 * @property x
 * @property y
 */
export interface IPoint {
    x: number;
    y: number
}

/**
 * 事件类型
 */
export type EventList = 'click' | 'start' | 'move' | 'end'