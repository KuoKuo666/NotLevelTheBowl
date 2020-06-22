import UIBase from "./UIBase"
import UIManager from "../UIManager"
import { Util } from "../utils/Util"
import { DataStorage } from "../utils/DataStorage"
import { MusicType } from "../Enum"
import { MusicManager } from "../MusicManager"

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

    /** 列表显示时要根据已有数据显示解锁关卡 */
    show() {
        super.show()
        if (this.levelsRoot) {
            this.levelsRoot.children.forEach((node, index) => {
                const labelNode = node.children[1]
                const labelComp = labelNode.getComponent(cc.Label)
                const level = index + 1
                labelComp.string = level <= DataStorage.unLockLevel ? '已解锁' : '未解锁'
            })
        }
    }

    /** 初始化按钮监听事件，注入管理实例 */
    init(uiManager: UIManager) {
        const { TOUCH_START, TOUCH_END, TOUCH_CANCEL } = cc.Node.EventType
        // 返回开始菜单按钮
        if (this.backStartButton) {
            this.backStartButton.on(TOUCH_START, () => {
                MusicManager.getInstance().play(MusicType.Click)
                Util.clickDownTween(this.backStartButton)
            }, this)

            this.backStartButton.on(TOUCH_END, () => {
                Util.clickUpTween(this.backStartButton, () => {
                    uiManager.backToStartMenu()
                })
            }, this)

            this.backStartButton.on(TOUCH_CANCEL, () => Util.clickUpTween(this.backStartButton), this)
        }
        // 关卡列表
        if (this.levelsRoot) {
            this.levelsRoot.children.forEach((node, index) => {
                const button = node.children[0]
                button.on(TOUCH_START, () => {
                    MusicManager.getInstance().play(MusicType.Click)
                    Util.clickDownTween(button)
                }, this)

                button.on(TOUCH_END, () => {
                    Util.clickUpTween(button, () => {
                        const level = index + 1
                        if (level <= DataStorage.unLockLevel) {
                            uiManager.gameStart(level)
                        }
                    })
                }, this)

                button.on(TOUCH_CANCEL, () => Util.clickUpTween(button), this)
            })
        }
    }

}
