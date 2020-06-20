import UIBase from "./UIBase"
import UIManager from "../UIManager"
import { Util } from "../utils/Util"

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
                Util.clickDownTween(this.startButton)
            }, this)

            this.startButton.on(cc.Node.EventType.TOUCH_END, () => {
                Util.clickUpTween(this.startButton)
                context.onClickStartButton()
            }, this)

            this.startButton.on(cc.Node.EventType.TOUCH_CANCEL, () => {
                Util.clickUpTween(this.startButton)
                context.onClickStartButton()
            }, this)
        }

        if (this.levelSelectButton) {
            this.levelSelectButton.on(cc.Node.EventType.TOUCH_START, () => {
                Util.clickDownTween(this.levelSelectButton)
            }, this)

            this.levelSelectButton.on(cc.Node.EventType.TOUCH_END, () => {
                Util.clickUpTween(this.levelSelectButton)
                context.onClickLevelSelectButton()
            }, this)

            this.levelSelectButton.on(cc.Node.EventType.TOUCH_CANCEL, () => {
                Util.clickUpTween(this.levelSelectButton)
                context.onClickLevelSelectButton()
            }, this)
        }
    }

}
