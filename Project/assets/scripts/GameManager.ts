import { PhysicsManager } from "./utils/PhysicsManager"
import { MusicType } from "./Enum"
import { StaticInstance } from "./StaticInstance"
import { MusicManager } from "./MusicManager"
import GameConfig = require("./config/GameConfig")
import { DataStorage, IDataConfig } from "./utils/DataStorage"

const {ccclass, property} = cc._decorator

interface IMidConfig {
    level: number,
    count: number,
    node: cc.Node | undefined
}

@ccclass
export default class GameManager extends cc.Component {

    @property({
        type: [cc.Prefab],
        displayName: '食物预制体'
    })
    foodPrefabs: cc.Prefab[] = []

    @property({
        type: cc.SpriteFrame,
        displayName: '闭眼的碗'
    })
    closeEyeBowl: cc.SpriteFrame | undefined = undefined

    @property({
        type: cc.SpriteFrame,
        displayName: '挣眼的碗'
    })
    openEyeBowl: cc.SpriteFrame | undefined = undefined

    @property({
        type: cc.Node
    })
    bowl: cc.Node | undefined = undefined

    @property({
        type: cc.Node
    })
    foods: cc.Node | undefined = undefined

    midConfig: IMidConfig = {
        level: 0,
        count: 0,
        node: undefined
    }

    // 时间累积与检测频率
    time: number = 0
    checkCD: number = 0.2

    // 进入游戏关卡
    isPlaying: boolean = false

    get allBodyStop(): boolean {
        for (let i = 0; i < this.foods!.childrenCount; i++) {
            const node = this.foods!.children[i]
            const body = node.getComponent(cc.RigidBody)
            if (!body.linearVelocity.fuzzyEquals(cc.v2(0, 0), 0.1)) {
                return false
            }
        }
        return true
    }

    get someBodyStatic(): boolean {
        for (let i = 0; i < this.foods!.childrenCount; i++) {
            const node = this.foods!.children[i]
            const body = node.getComponent(cc.RigidBody)
            if (body.type === cc.RigidBodyType.Static) {
                return true
            }
        }
        return false
    }

    get nowFoodType(): number {
        return GameConfig[this.midConfig.level][this.midConfig.count]
    }

    get canAddFood(): boolean {
        const max = GameConfig[this.midConfig.level].length
        if (this.midConfig.count >= max) {
            return false
        }
        return true
    }

    onLoad() {
        StaticInstance.setGameManager(this)
        PhysicsManager.openPhysicsSystem()
        MusicManager.getInstance().play(MusicType.Bgm)
    }

    gameStart(level: number) {
        console.log(`[GameManager] gameStart level ${level}`)
        this.showBowl()
        this.midConfig.level = level
        this.midConfig.count = 0
        this.midConfig.node = this.addFood(this.nowFoodType)
        this.isPlaying = true
    }

    gameWin() {
        MusicManager.getInstance().play(MusicType.Win)
        StaticInstance.uiManager!.showGameWinUI()
        // 最后一关不显示“下一关”
        if (this.midConfig.level >= DataStorage.maxLevel) {
            StaticInstance.uiManager!.hideNextLevelButton()
            return
        }
        // 玩之前关不存
        if (this.midConfig.level < DataStorage.unLockLevel) {
            return
        }
        const data: IDataConfig = {
            maxLevel: DataStorage.maxLevel,
            unLockLevel: this.midConfig.level + 1
        } 
        DataStorage.saveData(data)
    }

    gameLoss() {
        MusicManager.getInstance().play(MusicType.Loss)
        StaticInstance.uiManager!.showGameLossUI()
    }

    clearAllFood() {
        this.foods!.removeAllChildren()
    }

    onClickNextLevel() {
        this.midConfig.level += 1
        this.clearAllFood()
        StaticInstance.uiManager!.gameStart(this.midConfig.level)
    }

    onClickPlayAgain() {
        this.clearAllFood()
        StaticInstance.uiManager!.gameStart(this.midConfig.level)
    }

    onClickDownFood() {
        if (!this.midConfig.node) { return }
        PhysicsManager.setRigidBoyDynamic(this.midConfig.node)
        PhysicsManager.setRigidBoyLinearVelocity(this.midConfig.node, cc.v2(0, -5))
        this.midConfig.node = undefined
    }

    onRotateFood(angle: number) {
        if (!this.midConfig.node) { return }
        this.midConfig.node.angle = angle
    }

    onClickLeftFood(dt: number) {
        if (!this.midConfig.node) { return }
        const speed = 100
        this.midConfig.node.x -= speed * dt
    }

    onClickRightFood(dt: number) {
        if (!this.midConfig.node) { return }
        const speed = 100
        this.midConfig.node.x += speed * dt
    }

    addFood(type: number): cc.Node {
        const pos = cc.v2(0, 450)
        const food = cc.instantiate(this.foodPrefabs[type])
        this.foods!.addChild(food)
        food.setPosition(pos)
        PhysicsManager.setRigidBoyStatic(food)
        this.midConfig.count++
        this.updateFoodCountUi()
        return food
    }

    updateFoodCountUi() {
        StaticInstance.uiManager!.setLevelInfo(this.midConfig.level, this.midConfig.count)
    }

    showBowl() {
        this.bowl!.active = true
        // 眨眼动作
        this.bowl!.stopAllActions()
        cc.tween(this.bowl).repeatForever(
            cc.tween()
                .delay(2)
                .call(() => {
                    this.closeEyeBowl && (this.bowl!.getComponent(cc.Sprite).spriteFrame = this.closeEyeBowl)
                })
                .delay(0.3)
                .call(() => {
                    this.openEyeBowl && (this.bowl!.getComponent(cc.Sprite).spriteFrame = this.openEyeBowl)
                })
        ).start()
    }

    hideBowl() {
        this.bowl!.active = false
    }

    checkAllBody() {
        if (!this.isPlaying || this.someBodyStatic || !this.allBodyStop ) { return }
        if (!this.canAddFood) {
            this.isPlaying = false
            this.gameWin()
            return
        }
        this.midConfig.node = this.addFood(this.nowFoodType)
    }

    checkFall() {
        let hasFall: boolean = false
        for (let i = 0; i < this.foods!.childrenCount; i++) {
            const node = this.foods!.children[i]
            if (node.y < -800) {
                node.destroy()
                hasFall = true
                break
            }
        }
        if (hasFall) {
            this.isPlaying = false
            this.gameLoss()
        }
    }

    update(dt: number) {
        this.time += dt
        if (this.time > this.checkCD) {
            this.time = 0
            this.checkAllBody()
            this.checkFall()
        }
    }

}
