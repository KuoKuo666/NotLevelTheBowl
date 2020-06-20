import { StaticInstance } from "./global/StaticInstance"
import { PhysicsManager } from "./utils/PhysicsManager"

const {ccclass, property} = cc._decorator

@ccclass
export default class GameManager extends cc.Component {

    onLoad() {
        StaticInstance.setGameManager(this)
        PhysicsManager.openPhysicsSystem()
    }

}
