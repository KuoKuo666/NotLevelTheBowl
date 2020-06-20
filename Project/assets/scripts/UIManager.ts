import { StaticInstance } from "./global/StaticInstance"
import { PrefabType, PrefabUrl } from "./Enum"
import UIBase from "./ui/UIBase"
import ControlPanel from "./ui/ControlPanel"
import { Util } from "./utils/Util"
import LevelInfo from "./ui/LevelInfo"
import LevelSelect from "./ui/LevelSelect"
import StartMenu from "./ui/StartMenu"

const {ccclass, property} = cc._decorator

@ccclass
export default class UIManager extends cc.Component {

    /** ui实例 Map */
    uiMap: Map<PrefabType, UIBase> = new Map()

    onLoad() {
        StaticInstance.setUIManager(this)
        this.initControlPanel()
        this.initLevelInfo()
        this.initLevelSelect()
        this.initStartMenu()
    }

    onClickStartButton() {
        console.log('GameStart')
    }

    onClickLevelSelectButton() {
        console.log('LevelSelect')
    }

    async initControlPanel() {
        const prefab = await Util.loadPrefab(PrefabUrl.ControlPanel)
        if (!prefab) { return }
        const node = cc.instantiate(prefab)
        this.node.addChild(node)
        const comp = node.getComponent(ControlPanel)
        comp.init(this)
        this.uiMap.set(PrefabType.ControlPanel, comp)
    }

    async initLevelInfo() {
        const prefab = await Util.loadPrefab(PrefabUrl.LevelInfo)
        if (!prefab) { return }
        const node = cc.instantiate(prefab)
        this.node.addChild(node)
        const comp = node.getComponent(LevelInfo)
        comp.init(this)
        this.uiMap.set(PrefabType.LevelInfo, comp)
    }

    async initLevelSelect() {
        const prefab = await Util.loadPrefab(PrefabUrl.LevelSelect)
        if (!prefab) { return }
        const node = cc.instantiate(prefab)
        this.node.addChild(node)
        const comp = node.getComponent(LevelSelect)
        comp.init(this)
        this.uiMap.set(PrefabType.LevelSelect, comp)
    }

    async initStartMenu() {
        const prefab = await Util.loadPrefab(PrefabUrl.StartMenu)
        if (!prefab) { return }
        const node = cc.instantiate(prefab)
        this.node.addChild(node)
        const comp = node.getComponent(StartMenu)
        comp.init(this)
        this.uiMap.set(PrefabType.StartMenu, comp)
    }

}
