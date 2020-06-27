import UIBase from "./UIBase"

const {ccclass, property} = cc._decorator

@ccclass
export default class LevelInfo extends UIBase {

    @property(cc.Label) nowLevelLabel: cc.Label = undefined
    @property(cc.Label) nowItemsLabel: cc.Label = undefined

    onLoad() {
        super.onLoad()
    }

    setLevelLabel(level: number) {
        this.nowLevelLabel.string = `第${level}关`
    }

    setItemsLabel(nowNum: number, allNum: number) {
        this.nowItemsLabel.string = `${nowNum}/${allNum}`
    }

}
