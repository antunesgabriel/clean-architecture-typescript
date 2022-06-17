import { faker } from "@faker-js/faker";

import { RouteEntity } from "domain/route.entity";
import { RouteRepository } from "domain/route.repository";
import { CreateRouteUseCase } from "./create-route.usecase";

class MockRouteRepository implements RouteRepository {
  async insert(_: RouteEntity): Promise<void> {}

  async findAll(): Promise<RouteEntity[]> {
    return [];
  }
}

const FORCE_ID = faker.random.alphaNumeric();

const classSpy = jest.spyOn(RouteEntity, "new").mockImplementation(
  (
    title: string,
    startPosition: LatLog,
    endPosition: LatLog,
    points: LatLog[] = [],
    _?: string
  ) =>
    ({
      title,
      startPosition,
      endPosition,
      points,
      id: FORCE_ID,
    } as RouteEntity)
);

const _generateLatLog = (): LatLog => {
  return {
    lat: Number(faker.random.numeric()),
    log: Number(faker.random.numeric()),
  };
};

describe("CreateRouteUseCase", () => {
  it("should receive input and call repository with correct payload", async () => {
    const repository = new MockRouteRepository();

    const spy = jest.spyOn(repository, "insert");

    const usecase = new CreateRouteUseCase(repository);

    const startPosition = _generateLatLog();
    const endPosition = _generateLatLog();
    const title = faker.random.word();
    const points = [_generateLatLog(), _generateLatLog()];

    await usecase.execute({ title, startPosition, endPosition, points });

    expect(classSpy).toBeCalledWith(title, startPosition, endPosition, points);
    expect(spy).toBeCalledWith({
      title,
      startPosition,
      endPosition,
      points,
      id: FORCE_ID,
    });
  });
});
