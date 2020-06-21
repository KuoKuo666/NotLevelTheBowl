import { StaticInstance } from "./global/StaticInstance"
import { PhysicsManager } from "./utils/PhysicsManager"
import { DataStorage, IDataConfig } from "./utils/DataStorage"
import { MusicManager } from "./global/MusicManager"
import { MusicType } from "./Enum"

const {ccclass, property} = cc._decorator

@ccclass
export default class GameManager extends cc.Component {

    onLoad() {
        StaticInstance.setGameManager(this)
        PhysicsManager.openPhysicsSystem()
        MusicManager.getInstance().play(MusicType.Bgm)
    }

}
