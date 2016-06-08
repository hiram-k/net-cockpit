
type Updator<T> = (prev: T) => T;

export const enum WidgetType {
    Status,
    LineGraph,
}

export abstract class WidgetState {

    constructor(private _key: number, private _type: WidgetType) {
    }

    get type(): WidgetType {
        return this._type;
    }
    get key(): number {
        return this._key;
    }

}

interface IStatusWidgetProps {
    title: string;
    watchID: number;
    positiveColor: string;
    negativeColor: string;
}

export class StatusWidgetState extends WidgetState {
    private _title: string;
    private _watchID: number;
    private _positiveColor: string;
    private _negativeColor: string;

    constructor(key: number, props: IStatusWidgetProps) {
        super(key, WidgetType.Status);
        this._watchID = props.watchID;
        this._positiveColor = props.positiveColor;
        this._negativeColor = props.negativeColor;
    }

    update(updator: Updator<IStatusWidgetProps>): StatusWidgetState {
        return new StatusWidgetState(this.key, updator({
            title: this._title,
            watchID: this._watchID,
            positiveColor: this._positiveColor,
            negativeColor: this._negativeColor,
        }));
    }

    get title(): string {
        return this._title;
    }
    get watchID(): number {
        return this._watchID;
    }
    get negativeColor(): string {
        return this._negativeColor
    }
    get positiveColor(): string {
        return this._positiveColor;
    }

}

interface ILineGraphProps {
    caption: string;
    watchID: number;
    color: string;
}

interface ILineGraphWidgetProps {
    title: string;
    lineProps: Immutable.List<ILineGraphProps>;
}

export class LineGraphWidgetState extends WidgetState {
    private _title: string;
    private _linesProps: Immutable.List<ILineGraphProps>;

    constructor(key: number, props: ILineGraphWidgetProps) {
        super(key, WidgetType.LineGraph);
    }

    update(updator: Updator<ILineGraphWidgetProps>): ILineGraphWidgetProps {
        return new LineGraphWidgetState(this.key, updator({
            title: this._title,
            lineProps: this._linesProps,
        }));
    }

    get title(): string {
        return this._title;
    }
    get lineProps(): Immutable.List<ILineGraphProps> {
        return this._linesProps;
    }

}
