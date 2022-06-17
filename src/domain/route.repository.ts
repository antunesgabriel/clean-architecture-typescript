import { RouteEntity } from "./route.entity";

export interface RouteRepository {
  insert(route: RouteEntity): Promise<void>;

  findAll(): Promise<RouteEntity[]>;
}
