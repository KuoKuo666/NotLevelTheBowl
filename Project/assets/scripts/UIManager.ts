import { StaticInstance } from "./global/StaticInstance"

const {ccclass, property} = cc._decorator

@ccclass
export default class UIManager extends cc.Component {

    onLoad() {
        StaticInstance.setUIManager(this)
    }

}
