import { MuiscResUrl } from "../Enum"

/** 工具类 */
export class Util {

    static clickDownTween(node: cc.Node | undefined, callback?: () => void) {
        if (!node) {
            console.error('[Util] clickDownTween node is undefined')
            return
        }
        cc.tween(node).to(0.1, { scale: 0.9 }).call(() => {
            callback && callback()
        }).start()
    }

    static clickUpTween(node: cc.Node | undefined, callback?: () => void) {
        if (!node) {
            console.error('[Util] clickDownTween node is undefined')
            return
        }
        cc.tween(node).to(0.1, { scale: 1 }).call(() => {
            callback && callback()
        }).start()
    }

    static loadMusic(url: MuiscResUrl): Promise<cc.AudioClip | undefined> {
        return new Promise((resolve, reject) => {
            cc.loader.loadRes(url, cc.AudioClip, (error, audioClip) => {
                if (error) {
                    console.error('[Util] loadMusic error')
                    resolve(undefined)
                }
                resolve(audioClip)
            })
        })
    }

}