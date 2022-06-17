import { Server } from "./adapters/http/express/server";
import { CreateRouteUseCase } from "./application/create-route.usecase";
import { FindAllRouteUseCase } from "./application/findall-route.usecase";
import { RouteEntity } from "./domain/route.entity";
import { RouteRepository } from "./domain/route.repository";

// for test
class RouteRepositoryInMemory implements RouteRepository {
  private _routes: RouteEntity[];

  constructor() {
    this._routes = [];
  }

  async insert(route: RouteEntity): Promise<void> {
    this._routes.push(route);
  }

  async findAll(): Promise<RouteEntity[]> {
    return this._routes;
  }
}

const repository = new RouteRepositoryInMemory();

const createRouteUseCase = new CreateRouteUseCase(repository);
const findAllRoutesUseCase = new FindAllRouteUseCase(repository);

const server = new Server(4200, findAllRoutesUseCase, createRouteUseCase);

// start example server
server.start();
