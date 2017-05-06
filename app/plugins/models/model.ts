abstract class BeeswaxPluginModel<T> {
    constructor(model?: T) { }
    abstract toModel(): T;
}
export default BeeswaxPluginModel;