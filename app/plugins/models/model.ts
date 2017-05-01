abstract class BumblePluginModel<T> {
    constructor(model?: T) { }
    abstract toModel(): T;
}
export default BumblePluginModel;