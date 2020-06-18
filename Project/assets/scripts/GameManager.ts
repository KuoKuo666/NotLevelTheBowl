import { StaticInstance } from "./global/StaticInstance"

const {ccclass, property} = cc._decorator

@ccclass
export default class GameManager extends cc.Component {

    onLoad() {
        StaticInstance.setGameManager(this)
    }

}
