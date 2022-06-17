import { RouteEntity } from "domain/route.entity";
import { RouteRepository } from "domain/route.repository";

export class FindAllRouteUseCase {
  constructor(private readonly _routeRepository: RouteRepository) {}

  async execute(): Promise<FindAllRouteOutput> {
    const routes = await this._routeRepository.findAll();

    return this._makeOutput(routes);
  }

  private _makeOutput(routes: RouteEntity[]) {
    return routes.map(({ title, endPosition, startPosition, id, points }) => ({
      title,
      endPosition,
      startPosition,
      id,
      points,
    }));
  }
}
