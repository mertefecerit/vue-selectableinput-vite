import SelectableInput from "./components/SelectableInput.vue";

export default{
    install:(app, options) => {
        app.component("SelectableInput", SelectableInput);
    }
}