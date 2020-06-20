import { MuiscResUrl, PrefabUrl } from "../Enum"

/** 函数工具类 */
export class Util {

    static loadMusic(url: MuiscResUrl): Promise<cc.AudioClip | undefined> {
        return new Promise((resolve, reject) => {
            cc.loader.loadRes(url, cc.AudioClip, (error, audioClip) => {
                if (error) {
                    resolve(undefined)
                }
                resolve(audioClip)
            })
        })
    }

    static loadPrefab(url: PrefabUrl): Promise<cc.Prefab | undefined> {
        return new Promise((resolve, reject) => {
            cc.loader.loadRes(url, cc.Prefab, (error, prefab) => {
                if (error) {
                    resolve(undefined)
                }
                resolve(prefab)
            })
        })
    }

}