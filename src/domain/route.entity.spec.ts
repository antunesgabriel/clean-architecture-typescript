import { faker } from "@faker-js/faker";

import { RouteEntity } from "./route.entity";

const _generateLatLog = (): LatLog => {
  return {
    lat: Number(faker.random.numeric()),
    log: Number(faker.random.numeric()),
  };
};

describe("RouteEntity", () => {
  it("should instance RouteEntity", () => {
    const startPosition = _generateLatLog();
    const endPostion = _generateLatLog();
    const title = faker.random.word();
    const points = [_generateLatLog(), _generateLatLog()];
    const id = faker.random.alphaNumeric();

    const route = RouteEntity.new(title, startPosition, endPostion);

    expect(route.title).toBe(title);
    expect(route.startPosition).toEqual(startPosition);
    expect(route.endPosition).toEqual(endPostion);
    expect(route.points).toStrictEqual([]);
    expect(route.id).toBeDefined();

    const routeRecovery = RouteEntity.new(
      title,
      startPosition,
      endPostion,
      points,
      id
    );

    expect(routeRecovery.title).toBe(title);
    expect(routeRecovery.startPosition).toEqual(startPosition);
    expect(routeRecovery.endPosition).toEqual(endPostion);
    expect(routeRecovery.points).toStrictEqual(points);
    expect(routeRecovery.id).toBe(id);
  });

  it("should update title", () => {
    const startPosition = _generateLatLog();
    const endPostion = _generateLatLog();
    const title = faker.random.word();
    const points = [_generateLatLog(), _generateLatLog()];

    const route = RouteEntity.new(title, startPosition, endPostion, points);

    const title2 = faker.random.words();

    route.updateTitle(title2);

    expect(route.title).toBe(title2);
  });

  it("should update points", () => {
    const startPosition = _generateLatLog();
    const endPostion = _generateLatLog();
    const title = faker.random.word();

    const route = RouteEntity.new(title, startPosition, endPostion);

    const points = [_generateLatLog(), _generateLatLog()];

    route.updatePoints(points);

    expect(route.points).toStrictEqual(points);
  });
});
