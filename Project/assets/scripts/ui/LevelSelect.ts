import UIBase from "./UIBase"
import UIManager from "../UIManager"

const {ccclass, property} = cc._decorator

@ccclass
export default class LevelSelect extends UIBase {

    @property({
        type: cc.Node,
        displayName: '返回开始菜单按钮'
    })
    backStartButton: cc.Node | undefined = undefined

    @property({
        type: cc.Node,
        displayName: '关卡列表根节点'
    })
    levelsRoot: cc.Node | undefined = undefined

    onLoad() {
        super.onLoad()
    }

    /** 初始化按钮监听事件，注入管理实例 */
    init(context: UIManager) {
        
    }

}
