import crypto from "crypto";

export class RouteEntity {
  private constructor(
    private _id: string,
    private _title: string,
    private _startPosition: LatLog,
    private _endPosition: LatLog,
    private _points: LatLog[] = []
  ) {}

  static new(
    title: string,
    startPosition: LatLog,
    endPosition: LatLog,
    points: LatLog[] = [],
    id?: string
  ) {
    return new RouteEntity(
      id || crypto.randomUUID(),
      title,
      startPosition,
      endPosition,
      points
    );
  }

  get title(): string {
    return this._title;
  }

  private set title(value: string) {
    this._title = value;
  }

  get id(): string {
    return this._id;
  }

  get startPosition(): LatLog {
    return this._startPosition;
  }

  private set startPosition(value: LatLog) {
    this._startPosition = value;
  }

  get endPosition(): LatLog {
    return this._endPosition;
  }

  private set endPosition(value: LatLog) {
    this._endPosition = value;
  }

  get points(): LatLog[] {
    return this._points;
  }

  private set points(value: LatLog[]) {
    this._points = value;
  }

  public updateTitle(title: string) {
    this.title = title;
  }

  public updatePoints(points: LatLog[]) {
    this.points = points;
  }
}
