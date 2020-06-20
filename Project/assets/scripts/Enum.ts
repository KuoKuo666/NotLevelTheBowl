/**
 * 项目的所有枚举在该脚本下声明
 */

 /** 音乐类型 */
export enum MusicType {
    Bgm,
    Click,
    Loss,
    Win
}

/** 音乐资源路径 */
export enum MuiscResUrl {
    Bgm = 'music/musicBgm',
    Click = 'music/musicClick',
    Loss = 'music/musicLoss',
    Win = 'music/musicWin'
}

/** 预制资源路径 */
export enum PrefabUrl {
    ControlPanel = 'prefab/ControlPanel',
    LevelInfo = 'prefab/LevelInfo',
    LevelSelect = 'prefab/Select',
    StartMenu = 'prefab/StartMenu'
}

/** 预制体类型 */
export enum PrefabType {
    ControlPanel,
    LevelInfo,
    LevelSelect,
    StartMenu
}