import { RouteEntity } from "domain/route.entity";
import { RouteRepository } from "domain/route.repository";

export class CreateRouteUseCase {
  constructor(private readonly _routeRepository: RouteRepository) {}

  async execute({
    title,
    startPosition,
    endPosition,
    points,
  }: CreateRouteInput): Promise<CreateRouteOutput> {
    const route = RouteEntity.new(title, startPosition, endPosition, points);

    await this._routeRepository.insert(route);

    return {
      id: route.id,
      title: route.title,
      startPosition: route.startPosition,
      endPosition: route.endPosition,
      points: route.points,
    };
  }
}
