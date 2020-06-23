/** 物理系统管理类 */
export class PhysicsManager {

    static openPhysicsSystem() {
        cc.director.getPhysicsManager().enabled = true
    }

    static closePhysicsSystem() {
        cc.director.getPhysicsManager().enabled = false
    }

    static setRigidBoyStatic(node: cc.Node) {
        const body = node.getComponent(cc.RigidBody)
        body.type = cc.RigidBodyType.Static
    }

    static setRigidBoyDynamic(node: cc.Node) {
        const body = node.getComponent(cc.RigidBody)
        body.type = cc.RigidBodyType.Dynamic
    }

}