const {ccclass, property} = cc._decorator

@ccclass
export default class UIBase extends cc.Component {

    @property({
        displayName: '初始显隐状态'
    })
    isShowInit: boolean = false

    show() {
        this.node.active = true
    }

    hide() {
        this.node.active = false
    }

}
