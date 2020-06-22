import { UIType, PrefabUrl } from "./Enum"
import UIBase from "./ui/UIBase"
import ControlPanel from "./ui/ControlPanel"
import { Util } from "./utils/Util"
import LevelInfo from "./ui/LevelInfo"
import LevelSelect from "./ui/LevelSelect"
import StartMenu from "./ui/StartMenu"
import { StaticInstance } from "./StaticInstance"

const {ccclass, property} = cc._decorator

@ccclass
export default class UIManager extends cc.Component {

    /** ui实例 Map */
    uiMap: Map<UIType, UIBase> = new Map()

    onLoad() {
        StaticInstance.setUIManager(this)
        this.initControlPanel()
        this.initLevelInfo()
        this.initLevelSelect()
        this.initStartMenu()
    }

    gameStart(level: number) {
        console.log(`[UIManager] gameStart level ${level}`)
        this.showUI([UIType.ControlPanel, UIType.LevelInfo])
    }

    toLevelSelect() {
        this.showUI([UIType.LevelSelect])
    }

    backToStartMenu() {
        this.showUI([UIType.StartMenu])
    }

    showUI(showTypes: UIType[]) {
        this.uiMap.forEach((ui, type) => {
            if (showTypes.includes(type)) {
                ui.show()
            } else {
                ui.hide()
            }
        })
    }

    async initControlPanel() {
        const prefab = await Util.loadPrefab(PrefabUrl.ControlPanel)
        if (!prefab) { return }
        const node = cc.instantiate(prefab)
        this.node.addChild(node)
        const comp = node.getComponent(ControlPanel)
        comp.init(this)
        this.uiMap.set(UIType.ControlPanel, comp)
    }

    async initLevelInfo() {
        const prefab = await Util.loadPrefab(PrefabUrl.LevelInfo)
        if (!prefab) { return }
        const node = cc.instantiate(prefab)
        this.node.addChild(node)
        const comp = node.getComponent(LevelInfo)
        comp.init(this)
        this.uiMap.set(UIType.LevelInfo, comp)
    }

    async initLevelSelect() {
        const prefab = await Util.loadPrefab(PrefabUrl.LevelSelect)
        if (!prefab) { return }
        const node = cc.instantiate(prefab)
        this.node.addChild(node)
        const comp = node.getComponent(LevelSelect)
        comp.init(this)
        this.uiMap.set(UIType.LevelSelect, comp)
    }

    async initStartMenu() {
        const prefab = await Util.loadPrefab(PrefabUrl.StartMenu)
        if (!prefab) { return }
        const node = cc.instantiate(prefab)
        this.node.addChild(node)
        const comp = node.getComponent(StartMenu)
        comp.init(this)
        this.uiMap.set(UIType.StartMenu, comp)
    }

}
