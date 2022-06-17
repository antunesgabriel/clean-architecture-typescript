import { faker } from "@faker-js/faker";

import { RouteEntity } from "domain/route.entity";
import { RouteRepository } from "domain/route.repository";
import { FindAllRouteUseCase } from "./findall-route.usecase";

const _generateLatLog = (): LatLog => {
  return {
    lat: Number(faker.random.numeric()),
    log: Number(faker.random.numeric()),
  };
};

const startPosition = _generateLatLog();
const endPosition = _generateLatLog();
const title = faker.random.word();
const points = [_generateLatLog(), _generateLatLog()];
const id = faker.random.alphaNumeric();

class MockRouteRepository implements RouteRepository {
  async insert(_: RouteEntity): Promise<void> {}

  async findAll(): Promise<RouteEntity[]> {
    return [{ startPosition, endPosition, title, points, id }] as RouteEntity[];
  }
}

describe("FindAllRouteUseCase", () => {
  it("should called repository and return correct output", async () => {
    const repository = new MockRouteRepository();

    const spy = jest.spyOn(repository, "findAll");

    const usecase = new FindAllRouteUseCase(repository);

    const routes = await usecase.execute();

    expect(spy).toBeCalledTimes(1);
    expect(routes).toStrictEqual([
      {
        startPosition,
        endPosition,
        title,
        points,
        id,
      },
    ]);
  });
});
