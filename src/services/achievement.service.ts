import { Achievement } from "../models/achievement.model";
import { User } from "../models/user.model";
import { AchievementRepositorie } from "../repositories/achievement.repositorie";

export class AchievementService {
    constructor(achievementRepositorie: AchievementRepositorie) {
        this.repositorie = achievementRepositorie
    }

    private repositorie: AchievementRepositorie

    async createAchievements(achivements: Achievement[],user:User){
        for (const achivement of achivements) {
                achivement.user = user
                await this.repositorie.save(achivement)
        }
    }
    
}