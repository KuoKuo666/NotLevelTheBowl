export interface IDataConfig {
    maxLevel: number
    unLockLevel: number
}

/** 数据存储模块 */
export class DataStorage {

    private static data: IDataConfig | undefined = undefined

    static get maxLevel(): number {
        if (DataStorage.data) {
            return DataStorage.data.maxLevel
        }
        const data = this.getData()
        return data ? data.maxLevel : 6
    }

    static get unLockLevel(): number {
        if (DataStorage.data) {
            return DataStorage.data.unLockLevel
        }
        const data = this.getData()
        return data ? data.unLockLevel : 1
    }

    static getData(): IDataConfig | undefined {
        const value = cc.sys.localStorage.getItem('level')
        if (!value) {
            console.warn('[DataStorage] getData data is undefined')
            DataStorage.saveData({
                maxLevel: 6,
                unLockLevel: 1
            })
            return
        }
        DataStorage.data = JSON.parse(value)
        return DataStorage.data
    }

    static saveData(data: IDataConfig) {
        console.log(`[DataStorage] saveData ${JSON.stringify(data)}`)
        DataStorage.data = data
        cc.sys.localStorage.setItem('level', JSON.stringify(data))
    }

}