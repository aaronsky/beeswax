abstract class PluginModel<T> {
    constructor(model?: T) { }
    abstract toModel(): T;
}
export default PluginModel;