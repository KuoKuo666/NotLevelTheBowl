import UIBase from "./UIBase"
import UIManager from "../UIManager"
import { Util } from "../utils/Util"
import { DataStorage } from "../utils/DataStorage"
import { MusicManager } from "../global/MusicManager"
import { MusicType } from "../Enum"

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

    /** 初始化按钮监听事件，注入管理实例 */
    init(context: UIManager) {
        if (this.startButton) {
            this.startButton.on(cc.Node.EventType.TOUCH_START, () => {
                MusicManager.getInstance().play(MusicType.Click)
                Util.clickDownTween(this.startButton)
            }, this)

            this.startButton.on(cc.Node.EventType.TOUCH_END, () => {
                Util.clickUpTween(this.startButton, () => {
                    context.gameStart(DataStorage.unLockLevel)
                })
            }, this)

            this.startButton.on(cc.Node.EventType.TOUCH_CANCEL, () => {
                Util.clickUpTween(this.startButton)
            }, this)
        }

        if (this.levelSelectButton) {
            this.levelSelectButton.on(cc.Node.EventType.TOUCH_START, () => {
                MusicManager.getInstance().play(MusicType.Click)
                Util.clickDownTween(this.levelSelectButton)
            }, this)

            this.levelSelectButton.on(cc.Node.EventType.TOUCH_END, () => {
                Util.clickUpTween(this.levelSelectButton, () => {
                    context.toLevelSelect()
                })
            }, this)

            this.levelSelectButton.on(cc.Node.EventType.TOUCH_CANCEL, () => {
                Util.clickUpTween(this.levelSelectButton)
            }, this)
        }
    }

}
