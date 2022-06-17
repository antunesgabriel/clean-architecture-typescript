import { CreateRouteUseCase } from "application/create-route.usecase";
import { FindAllRouteUseCase } from "application/findall-route.usecase";
import express from "express";

export class Server {
  private readonly _api: express.Express;

  constructor(
    private readonly _port: number,
    private readonly _findAllRoutesUseCase: FindAllRouteUseCase,
    private readonly _createRouteUseCase: CreateRouteUseCase
  ) {
    this._api = express();
  }

  start() {
    this._api.use(express.json());

    this._startRoutes();

    this._api.listen(this._port, "localhost", () => {
      console.log(`Api listen in port: ${this._port}`);
    });
  }

  private _startRoutes() {
    this._api.get("/routes", async (_req, res) => {
      const output = await this._findAllRoutesUseCase.execute();

      res.json(output);
    });

    this._api.post("/routes", async (req, res) => {
      const output = await this._createRouteUseCase.execute(req.body);

      res.json(output);
    });
  }
}
