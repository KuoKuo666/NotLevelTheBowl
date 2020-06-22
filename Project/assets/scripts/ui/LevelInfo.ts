import UIBase from "./UIBase"
import UIManager from "../UIManager"

const {ccclass, property} = cc._decorator

@ccclass
export default class LevelInfo extends UIBase {

    @property({
        type: cc.Node,
        displayName: '当前关卡数'
    })
    nowLevelLabel: cc.Label | undefined = undefined

    @property({
        type: cc.Node,
        displayName: '当前物品数'
    })
    nowItembLabel: cc.Node | undefined = undefined

    onLoad() {
        super.onLoad()
    }

    /** 初始化按钮监听事件，注入管理实例 */
    init(uiManager: UIManager) {
        
    }

}
