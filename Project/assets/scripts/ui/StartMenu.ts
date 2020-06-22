import UIBase from "./UIBase"
import UIManager from "../UIManager"
import { Util } from "../utils/Util"
import { DataStorage } from "../utils/DataStorage"
import { MusicType } from "../Enum"
import { MusicManager } from "../MusicManager"

const {ccclass, property} = cc._decorator

@ccclass
export default class StartMenu extends UIBase {

    @property({
        type: cc.Node,
        displayName: '开始游戏按钮'
    })
    startButton: cc.Node | undefined = undefined

    @property({
        type: cc.Node,
        displayName: '关卡选择按钮'
    })
    levelSelectButton: cc.Node | undefined = undefined

    onLoad() {
        super.onLoad()
    }

    show() {
        super.show()
        // 摇摆动画
        if (!this.startButton) { return }
        const node = this.startButton.children[0]
        if (node) {
            node.stopAllActions()
            node.angle = 0
            cc.tween(node)
                .repeatForever(
                    cc.tween()
                        .to(1, { angle: 10 })
                        .to(1, { angle: 0 })
                )
                .start()
        }
    }

    /** 初始化按钮监听事件，注入管理实例 */
    init(uiManager: UIManager) {
        const { TOUCH_START, TOUCH_END, TOUCH_CANCEL } = cc.Node.EventType
        // 开始游戏按钮
        if (this.startButton) {
            this.startButton.on(TOUCH_START, () => {
                MusicManager.getInstance().play(MusicType.Click)
                Util.clickDownTween(this.startButton)
            }, this)

            this.startButton.on(TOUCH_END, () => {
                Util.clickUpTween(this.startButton, () => {
                    uiManager.gameStart(DataStorage.unLockLevel)
                })
            }, this)

            this.startButton.on(TOUCH_CANCEL, () => {
                Util.clickUpTween(this.startButton)
            }, this)
        }
        // 关卡选择按钮
        if (this.levelSelectButton) {
            this.levelSelectButton.on(TOUCH_START, () => {
                MusicManager.getInstance().play(MusicType.Click)
                Util.clickDownTween(this.levelSelectButton)
            }, this)

            this.levelSelectButton.on(TOUCH_END, () => {
                Util.clickUpTween(this.levelSelectButton, () => {
                    uiManager.toLevelSelect()
                })
            }, this)

            this.levelSelectButton.on(TOUCH_CANCEL, () => {
                Util.clickUpTween(this.levelSelectButton)
            }, this)
        }
    }

}
