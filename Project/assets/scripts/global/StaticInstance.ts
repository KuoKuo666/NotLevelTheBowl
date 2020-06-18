import GameManager from '../GameManager'
import UIManager from '../UIManager'
import MusicManager from '../MusicManager'

/** 静态单例模式进行管理 */
export class StaticInstance {

    static gameManager: GameManager | undefined = undefined
    static uiManager: UIManager | undefined = undefined
    static musicManager: MusicManager | undefined = undefined

    static setGameManager(context: GameManager) {
        StaticInstance.gameManager = context
    }

    static setUIManager(context: UIManager) {
        StaticInstance.uiManager = context
    }

    static setMusicManager(context: MusicManager) {
        StaticInstance.musicManager = context
    }

}