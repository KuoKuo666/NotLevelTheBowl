import { MuiscResUrl, PrefabUrl } from "../Enum"

/** 工具类 */
export class Util {

    static clickDownTween(node: cc.Node | undefined, s: number = 0.9) {
        if (!node) {
            console.error('[Util] clickDownTween node is undefined')
            return
        }
        cc.tween(node).to(0.1, { scale: s }).start()
    }

    static clickUpTween(node: cc.Node | undefined, s: number = 1) {
        if (!node) {
            console.error('[Util] clickDownTween node is undefined')
            return
        }
        cc.tween(node).to(0.1, { scale: s }).start()
    }

    static loadMusic(url: MuiscResUrl): Promise<cc.AudioClip | undefined> {
        return new Promise((resolve, reject) => {
            cc.loader.loadRes(url, cc.AudioClip, (error, audioClip) => {
                if (error) {
                    console.error('[Util] loadMusic error')
                    resolve(undefined)
                }
                console.log('[Util] loadPrefab success')
                resolve(audioClip)
            })
        })
    }

    static loadPrefab(url: PrefabUrl): Promise<cc.Prefab | undefined> {
        return new Promise((resolve, reject) => {
            cc.loader.loadRes(url, cc.Prefab, (error, prefab) => {
                if (error) {
                    console.error('[Util] loadPrefab error')
                    resolve(undefined)
                }
                console.log('[Util] loadPrefab success')
                resolve(prefab)
            })
        })
    }

}