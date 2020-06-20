import UIBase from "./UIBase"
import UIManager from "../UIManager"

const {ccclass, property} = cc._decorator

@ccclass
export default class StartClass extends UIBase {

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

    /** 初始化按钮监听事件，注入管理实例 */
    init(context: UIManager) {
        
    }

}
