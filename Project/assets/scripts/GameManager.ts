import { PhysicsManager } from "./utils/PhysicsManager"
import { MusicType } from "./Enum"
import { StaticInstance } from "./StaticInstance"
import { MusicManager } from "./MusicManager"
import GameConfig = require("./config/GameConfig")

const {ccclass, property} = cc._decorator

@ccclass
export default class GameManager extends cc.Component {

    @property({
        type: [cc.Prefab],
        displayName: '食物预制体'
    })
    foodPrefabs: cc.Prefab[] = []

    // 当前中心位置的物体第几个
    nowMidItemNumber: number = 0

    onLoad() {
        StaticInstance.setGameManager(this)
        PhysicsManager.openPhysicsSystem()
        MusicManager.getInstance().play(MusicType.Bgm)
    }

    gameStart(level: number) {
        this.showBowl()
        // 开始新建下落物
        const type = this.getFoodType(level)
        this.addFood(type)
    }

    getFoodType(level: number): number {
        return GameConfig[level][this.nowMidItemNumber]
    }

    addFood(type: number): cc.Node {
        const pos = cc.v2(0, 450)
        const food = cc.instantiate(this.foodPrefabs[type])
        this.node.addChild(food)
        food.setPosition(pos)
        PhysicsManager.setRigidBoyStatic(food)
        return food
    }

    showBowl() {
        const bowl = this.node.getChildByName('bowl')
        bowl.active = true
    }

    hideBowl() {
        const bowl = this.node.getChildByName('bowl')
        bowl.active = false
    }

}
