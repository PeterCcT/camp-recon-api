import { EntityRepository, Repository } from "typeorm";
import { Achievement } from "../models/achievement.model";
@EntityRepository(Achievement)
export class AchievementRepositorie extends Repository<Achievement>{ }