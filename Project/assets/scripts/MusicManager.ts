import { StaticInstance } from "./global/StaticInstance"

const {ccclass, property} = cc._decorator

@ccclass
export default class MusicManager extends cc.Component {

    onLoad() {
        StaticInstance.setMusicManager(this)
    }

}
