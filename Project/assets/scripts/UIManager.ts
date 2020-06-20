import { StaticInstance } from "./global/StaticInstance"
import { PrefabType } from "./Enum"
import UIBase from "./ui/UIBase"
import ControlPanel from "./ui/ControlPanel"

const {ccclass, property} = cc._decorator

@ccclass
export default class UIManager extends cc.Component {

    /** ui实例 Map */
    uiMap: Map<PrefabType, UIBase> = new Map()

    onLoad() {
        StaticInstance.setUIManager(this)
    }

    initAllUI() {
        
    }

}
