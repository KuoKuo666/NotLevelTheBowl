import UIBase from "./UIBase"
import UIManager from "../UIManager"
import { MusicType } from "../Enum"
import { MusicManager } from "../MusicManager"
import { Util } from "../utils/Util"

const {ccclass, property} = cc._decorator

@ccclass
export default class LossPanel extends UIBase {

    @property({
        type: cc.Node,
        displayName: '再来一次按钮'
    })
    playAgainButton: cc.Node | undefined = undefined

    @property({
        type: cc.Node,
        displayName: '回首页按钮'
    })
    backToMenuButton: cc.Node | undefined = undefined

    onLoad() {
        super.onLoad()
    }

    show() {
        super.show()
        this.playAgainButton && (this.playAgainButton.active = true)
        this.backToMenuButton && (this.backToMenuButton.active = true)
    }

    /** 初始化 */
    init(uiManager: UIManager) {
        const { TOUCH_START, TOUCH_END, TOUCH_CANCEL } = cc.Node.EventType
        if (this.playAgainButton) {
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
        }
        // 返回菜单
        if (this.backToMenuButton) {
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

}
