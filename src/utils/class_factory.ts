import { getCustomRepository } from "typeorm";
import { CategorieController } from "../controller/categorie.controller";
import { StateApiController } from "../controller/state_api.controller";
import { UserController } from "../controller/user.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserValidator } from "../middlewares/validators/user";
import { AchievementRepositorie } from "../repositories/achievement.repositorie";
import { CategorieRepositorie } from "../repositories/categorie.repositorie";
import { LinkRepositorie } from "../repositories/link.repositorie";
import { UserRepositorie } from "../repositories/user.repositorie";
import { AchievementService } from "../services/achievement.service";
import { AuthService } from "../services/auth.service";
import { CategorieService } from "../services/categorie.service";
import { HashingService } from "../services/hashing.service";
import { LinkService } from "../services/link.service";
import { StateApiService } from "../services/state_api.service";
import { UserService } from "../services/user.service";


function getCategorieRepositorie() {
    return getCustomRepository(CategorieRepositorie)
}

export function getCategorieService() {
    const categorieRepositorie = getCategorieRepositorie()
    return new CategorieService(categorieRepositorie)
}

export function getCategorieController() {
    const categorieService = getCategorieService()
    return new CategorieController(categorieService)
}

function getUserRepositorie() {
    return getCustomRepository(UserRepositorie)
}

export function getHashingService() {
    return new HashingService()
}

export function getAuthService() {
    return new AuthService()
}

function getAchievementRepositorie() {
    return getCustomRepository(AchievementRepositorie)
}

function getAchievementService() {
    const achievementRepositorie = getAchievementRepositorie()
    return new AchievementService(achievementRepositorie);
}


function getLinkRepositorie(){
    return getCustomRepository(LinkRepositorie)
}
function getLinkService(){
    const linkRepositorie = getLinkRepositorie()
    return new LinkService(linkRepositorie)
}

export function getUserService() {
    const userRepositorie = getUserRepositorie()
    const categorieService = getCategorieService()
    const linkService = getLinkService()
    const achievementService = getAchievementService();
    const hashingService = getHashingService()
    const authService = getAuthService()
    return new UserService(
        userRepositorie,
        categorieService,
        achievementService,
        linkService,
        hashingService,
        authService
    )
}

export function getUserValidator() {
    const userService = getUserService()
    const categorieService = getCategorieService()
    return new UserValidator(userService, categorieService)
}

export function getUserController() {
    const userService = getUserService()
    return new UserController(userService)
}

export function getAuthMidlleware() {
    const authService = getAuthService()
    return new AuthMiddleware(authService)
}

function getStateApiService() {
    return new StateApiService()
}

export function getStateApiController() {
    const stateApiService = getStateApiService()
    return new StateApiController(stateApiService)
}