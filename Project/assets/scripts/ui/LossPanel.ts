import UIBase from "./UIBase"
import UIManager from "../UIManager"
import { MusicType } from "../Enum"
import { MusicManager } from "../MusicManager"
import { Util } from "../utils/Util"

const {ccclass, property} = cc._decorator

@ccclass
export default class LossPanel extends UIBase {

    @property(cc.Node) playAgainButton: cc.Node
    @property(cc.Node) backToMenuButton: cc.Node

    onLoad() {
        super.onLoad()
    }

    show() {
        super.show()
        this.playAgainButton.active = true
        this.backToMenuButton.active = true
    }

    /** 初始化 */
    init(uiManager: UIManager) {
        const { TOUCH_START, TOUCH_END, TOUCH_CANCEL } = cc.Node.EventType

        // 再玩一次按钮
        this.playAgainButton.on(TOUCH_START, () => {
            MusicManager.getInstance().play(MusicType.Click)
            Util.clickDownTween(this.playAgainButton)
        }, this)

        this.playAgainButton.on(TOUCH_END, () => {
            Util.clickUpTween(this.playAgainButton, () => {
                uiManager.onClickPlayAgain()
            })
        }, this)

        this.playAgainButton.on(TOUCH_CANCEL, () => {
            Util.clickUpTween(this.playAgainButton)
        }, this)

        // 返回菜单按钮
        this.backToMenuButton.on(TOUCH_START, () => {
            MusicManager.getInstance().play(MusicType.Click)
            Util.clickDownTween(this.backToMenuButton)
        }, this)

        this.backToMenuButton.on(TOUCH_END, () => {
            Util.clickUpTween(this.backToMenuButton, () => {
                uiManager.backToStartMenu()
            })
        }, this)

        this.backToMenuButton.on(TOUCH_CANCEL, () => {
            Util.clickUpTween(this.backToMenuButton)
        }, this)
    }

}
