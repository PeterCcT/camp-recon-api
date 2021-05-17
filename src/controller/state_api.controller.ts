import { Request, Response } from "express";
import { StateApiService } from "../services/state_api.service";

export class StateApiController {
    constructor(stateApiService: StateApiService) {
        this.service = stateApiService
    }

    private service: StateApiService

    async getAllUfs(req: Request, res: Response) {
        const ufs = await this.service.getAllUfs()
        res.send(ufs)
    }

    async getAllCitiesFromUf(req: Request, res: Response) {
        const { uf } = req.params
        const cities = await this.service.getAllCitiesFromUf(uf)
        res.send(cities)

    }
}