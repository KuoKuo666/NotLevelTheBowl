import UIBase from "./UIBase"
import UIManager from "../UIManager"
import { MusicManager } from "../MusicManager"
import { MusicType } from "../Enum"
import { Util } from "../utils/Util"

const {ccclass, property} = cc._decorator

@ccclass
export default class ControlPanel extends UIBase {

    @property(cc.Node) clickDownButton: cc.Node = undefined
    @property(cc.Node) clickLeftButton: cc.Node = undefined
    @property(cc.Node) clickRightButton: cc.Node = undefined
    @property(cc.Node) panelBkNode: cc.Node = undefined
    @property(cc.Node) panelMidNode: cc.Node = undefined

    // 左移与右移
    leftOpen: boolean = false
    rightOpen: boolean = false
    // 记录管理实例
    uiManager: UIManager

    onLoad() {
        super.onLoad()
    }

    /** 初始化按钮监听事件，注入管理实例 */
    init(uiManager: UIManager) {
        const { TOUCH_START, TOUCH_MOVE, TOUCH_END, TOUCH_CANCEL } = cc.Node.EventType
        this.uiManager = uiManager

        // 轮盘事件
        this.panelBkNode.on(TOUCH_START, (event: cc.Event.EventTouch) => {
            MusicManager.getInstance().play(MusicType.Click)
            const pos = this.panelBkNode.convertToNodeSpaceAR(event.getLocation())
            this.panelMidNode.setPosition(this.limitMidNodePos(pos))
            const angle = cc.misc.radiansToDegrees(Math.atan2(pos.y, pos.x)) - 90
            uiManager.onRotateFood(angle)
        }, this)

        this.panelBkNode.on(TOUCH_MOVE, (event: cc.Event.EventTouch) => {
            const pos = this.panelBkNode.convertToNodeSpaceAR(event.getLocation())
            this.panelMidNode.setPosition(this.limitMidNodePos(pos))
            const angle = cc.misc.radiansToDegrees(Math.atan2(pos.y, pos.x)) - 90
            uiManager.onRotateFood(angle)
        }, this)

        this.panelBkNode.on(TOUCH_END, () => this.panelMidNode.setPosition(0, 0), this)
        this.panelBkNode.on(TOUCH_CANCEL, () => this.panelMidNode.setPosition(0, 0), this)

        // 左向按钮
        this.clickLeftButton.on(TOUCH_START, () => {
            MusicManager.getInstance().play(MusicType.Click)
            Util.clickDownTween(this.clickLeftButton)
            this.leftOpen = true
        }, this)

        this.clickLeftButton.on(TOUCH_END, () => {
            Util.clickUpTween(this.clickLeftButton)
            this.leftOpen = false
        }, this)

        this.clickLeftButton.on(TOUCH_CANCEL, () => {
            Util.clickUpTween(this.clickLeftButton)
            this.leftOpen = false
        }, this)

        // 右向按钮
        this.clickRightButton.on(TOUCH_START, () => {
            MusicManager.getInstance().play(MusicType.Click)
            Util.clickDownTween(this.clickRightButton)
            this.rightOpen = true
        }, this)

        this.clickRightButton.on(TOUCH_END, () => {
            Util.clickUpTween(this.clickRightButton)
            this.rightOpen = false
        }, this)

        this.clickRightButton.on(TOUCH_CANCEL, () => {
            Util.clickUpTween(this.clickRightButton)
            this.rightOpen = false
        }, this)

        // 下落按钮
        this.clickDownButton.on(TOUCH_START, () => {
            MusicManager.getInstance().play(MusicType.Click)
            Util.clickDownTween(this.clickDownButton)
        }, this)

        this.clickDownButton.on(TOUCH_END, () => {
            Util.clickUpTween(this.clickDownButton)
            uiManager.onClickDownFood()
        }, this)

        this.clickDownButton.on(TOUCH_CANCEL, () => Util.clickUpTween(this.clickDownButton), this)
    }

    limitMidNodePos(pos: cc.Vec2): cc.Vec2 {
        const R = 130
        const len = pos.mag()
        const ratio = len > R ? R / len : 1
        return cc.v2(pos.x * ratio, pos.y * ratio)
    }

    update(dt: number) {
        this.leftOpen && this.uiManager.onClickLeftFood(dt)
        this.rightOpen && this.uiManager.onClickRightFood(dt)
    }

}
