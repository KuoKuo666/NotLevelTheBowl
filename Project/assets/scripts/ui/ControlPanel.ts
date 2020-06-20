import UIBase from "./UIBase"
import UIManager from "../UIManager"

const {ccclass, property} = cc._decorator

@ccclass
export default class ControlPanel extends UIBase {

    @property({
        type: cc.Node,
        displayName: '点击下落按钮'
    })
    clickDownButton: cc.Node | undefined = undefined

    @property({
        type: cc.Node,
        displayName: '点击左移按钮'
    })
    clickLeftButton: cc.Node | undefined = undefined

    @property({
        type: cc.Node,
        displayName: '点击右移按钮'
    })
    clickRightButton: cc.Node | undefined = undefined

    @property({
        type: cc.Node,
        displayName: '轮盘背景节点'
    })
    panelBkNode: cc.Node | undefined = undefined

    @property({
        type: cc.Node,
        displayName: '轮盘中心节点'
    })
    panelMidNode: cc.Node | undefined = undefined

    /** 初始化按钮监听事件，注入管理实例 */
    init(context: UIManager) {
        
    }

}
