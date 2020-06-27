import UIBase from "./UIBase"
import UIManager from "../UIManager"

const {ccclass, property} = cc._decorator

@ccclass
export default class LevelInfo extends UIBase {

    @property({
        type: cc.Label,
        displayName: '当前关卡数'
    })
    nowLevelLabel: cc.Label | undefined = undefined

    @property({
        type: cc.Label,
        displayName: '当前物品数'
    })
    nowItemsLabel: cc.Label | undefined = undefined

    onLoad() {
        super.onLoad()
    }

    setLevelLabel(level: number) {
        if (this.nowLevelLabel) {
            this.nowLevelLabel.string = `第${level}关`
        }
    }

    setItemsLabel(nowNum: number, allNum: number) {
        if (this.nowItemsLabel) {
            this.nowItemsLabel.string = `${nowNum}/${allNum}`
        }
    }

}
