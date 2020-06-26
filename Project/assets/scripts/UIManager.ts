import { UIType } from "./Enum"
import UIBase from "./ui/UIBase"
import ControlPanel from "./ui/ControlPanel"
import LevelInfo from "./ui/LevelInfo"
import LevelSelect from "./ui/LevelSelect"
import StartMenu from "./ui/StartMenu"
import { StaticInstance } from "./StaticInstance"
import GameConfig = require("./config/GameConfig")

const {ccclass, property} = cc._decorator

@ccclass
export default class UIManager extends cc.Component {

    @property(cc.Prefab) controlPanelPrefab: cc.Prefab | undefined = undefined
    @property(cc.Prefab) startMenuPrefab: cc.Prefab | undefined = undefined
    @property(cc.Prefab) levelInfoPrefab: cc.Prefab | undefined = undefined
    @property(cc.Prefab) levelSelectPrefab: cc.Prefab | undefined = undefined

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
        StaticInstance.gameManager!.gameStart(level)
    }

    onClickDownFood() {
        StaticInstance.gameManager!.onClickDownFood()
    }

    onRotateFood(angle: number) {
        StaticInstance.gameManager!.onRotateFood(angle)
    }

    onClickLeftFood(dt: number) {
        StaticInstance.gameManager!.onClickLeftFood(dt)
    }

    onClickRightFood(dt: number) {
        StaticInstance.gameManager!.onClickRightFood(dt)
    }

    toLevelSelect() {
        this.showUI([UIType.LevelSelect])
    }

    backToStartMenu() {
        this.showUI([UIType.StartMenu])
    }

    setLevelInfo(level: number, nowItem: number) {
        const levelInfo = this.uiMap.get(UIType.LevelInfo) as LevelInfo
        levelInfo.setLevelLabel(level)
        const max = GameConfig[level].length
        levelInfo.setItemsLabel(nowItem, max)
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

    initControlPanel() {
        const prefab = cc.instantiate(this.controlPanelPrefab)
        if (!prefab) { return }
        const node = cc.instantiate(prefab)
        this.node.addChild(node)
        const comp = node.getComponent(ControlPanel)
        comp.init(this)
        this.uiMap.set(UIType.ControlPanel, comp)
    }

    initLevelInfo() {
        const prefab = cc.instantiate(this.levelInfoPrefab)
        if (!prefab) { return }
        const node = cc.instantiate(prefab)
        this.node.addChild(node)
        const comp = node.getComponent(LevelInfo)
        comp.init(this)
        this.uiMap.set(UIType.LevelInfo, comp)
    }

    initLevelSelect() {
        const prefab = cc.instantiate(this.levelSelectPrefab)
        if (!prefab) { return }
        const node = cc.instantiate(prefab)
        this.node.addChild(node)
        const comp = node.getComponent(LevelSelect)
        comp.init(this)
        this.uiMap.set(UIType.LevelSelect, comp)
    }

    initStartMenu() {
        const prefab = cc.instantiate(this.startMenuPrefab)
        if (!prefab) { return }
        const node = cc.instantiate(prefab)
        this.node.addChild(node)
        const comp = node.getComponent(StartMenu)
        comp.init(this)
        this.uiMap.set(UIType.StartMenu, comp)
    }

}
