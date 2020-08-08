/** 数据存储模块 */
export class DataStorage {

    static getMaxLevel(): number {
        const value = cc.sys.localStorage.getItem('maxLevel')
        if (!value) {
            // 默认取个 6
            console.warn('[DataStorage] getMaxLevel is undefined, set 6')
            DataStorage.saveMaxLevel(6)
            return 6
        }
        console.log('[DataStorage] getMaxLevel is ' + value)
        return JSON.parse(value)
    }

    static getUnLockLevel(): number {
        const value = cc.sys.localStorage.getItem('unLockLevel')
        if (!value) {
            // 默认取个 1
            console.warn('[DataStorage] getUnLockLevel is undefined, set 1')
            DataStorage.saveUnLockLevel(1)
            return 1
        }
        console.log('[DataStorage] getUnLockLevel is ' + value)
        return JSON.parse(value)
    }

    static saveMaxLevel(level: number) {
        console.log(`[DataStorage] saveMaxLevel ${level}`)
        cc.sys.localStorage.setItem('maxLevel', JSON.stringify(level))
    }

    static saveUnLockLevel(level: number) {
        console.log(`[DataStorage] saveUnLockLevel ${level}`)
        cc.sys.localStorage.setItem('unLockLevel', JSON.stringify(level))
    }

}