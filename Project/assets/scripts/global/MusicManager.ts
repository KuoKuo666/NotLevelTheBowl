import { MusicType, MuiscResUrl } from "../Enum"
import { Util } from "../utils/Util"

/** 音乐播放模块 */
export class MusicManager {

    private static instance: MusicManager

    /** 构造函数私有化 */
    private constructor () { 
    }

    static getInstance (): MusicManager {
        if (!this.instance) {
            this.instance = new MusicManager()
        }
        return this.instance
    }

    play(type: MusicType) {
        switch(type) {
            case MusicType.Bgm: this.playBGM()
                break
            case MusicType.Click: this.playClickEffect()
                break
            case MusicType.Loss: this.playLossEffect()
                break
            case MusicType.Win: this.playWinEffect()
                break
        }
    }

    async playBGM() {
        const audioClip = await Util.loadMusic(MuiscResUrl.Bgm)
        audioClip && cc.audioEngine.playMusic(audioClip, true)
    }

    async playClickEffect() {
        const audioClip = await Util.loadMusic(MuiscResUrl.Click)
        audioClip && cc.audioEngine.playEffect(audioClip, false)
    }

    async playLossEffect() {
        const audioClip = await Util.loadMusic(MuiscResUrl.Loss)
        audioClip && cc.audioEngine.playEffect(audioClip, false)
    }

    async playWinEffect() {
        const audioClip = await Util.loadMusic(MuiscResUrl.Win)
        audioClip && cc.audioEngine.playEffect(audioClip, false)
    }

}
