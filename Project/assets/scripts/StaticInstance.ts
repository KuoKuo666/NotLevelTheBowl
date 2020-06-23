import GameManager from './GameManager'
import UIManager from './UIManager'

/** 静态单例模式进行管理 */
export class StaticInstance {

    static gameManager: GameManager | undefined = undefined
    static uiManager: UIManager | undefined = undefined

    static setGameManager(context: GameManager) {
        StaticInstance.gameManager = context
    }

    static setUIManager(context: UIManager) {
        StaticInstance.uiManager = context
    }

}