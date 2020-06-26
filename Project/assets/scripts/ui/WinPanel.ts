import UIBase from "./UIBase"
import UIManager from "../UIManager"
import { Util } from "../utils/Util"
import { MusicType } from "../Enum"
import { MusicManager } from "../MusicManager"

const {ccclass, property} = cc._decorator

@ccclass
export default class WinPanel extends UIBase {

    @property({
        type: cc.Node,
        displayName: '下一关按钮'
    })
    nextLevelButton: cc.Node | undefined = undefined

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
        this.nextLevelButton && (this.nextLevelButton.active = true)
        this.backToMenuButton && (this.backToMenuButton.active = true)
    }

    hideNextLevelButton() {
        this.nextLevelButton && (this.nextLevelButton.active = false)
    }

    /** 初始化 */
    init(uiManager: UIManager) {
        const { TOUCH_START, TOUCH_END, TOUCH_CANCEL } = cc.Node.EventType
        if (this.nextLevelButton) {
            this.nextLevelButton.on(TOUCH_START, () => {
                MusicManager.getInstance().play(MusicType.Click)
                Util.clickDownTween(this.nextLevelButton)
            }, this)

            this.nextLevelButton.on(TOUCH_END, () => {
                Util.clickUpTween(this.nextLevelButton, () => {
                    uiManager.onClickNextLevel()
                })
            }, this)

            this.nextLevelButton.on(TOUCH_CANCEL, () => {
                Util.clickUpTween(this.nextLevelButton)
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
