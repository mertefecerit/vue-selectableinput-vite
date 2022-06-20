import { ref, onMounted, watch, watchEffect, openBlock, createElementBlock, withDirectives, createElementVNode, withModifiers, vModelText, createCommentVNode, Fragment, renderList, toDisplayString } from "vue";
const _hoisted_1 = ["onClick", "placeholder"];
const _hoisted_2 = {
  key: 1,
  class: "absolute top-0 left-0 w-full rounded p-2 border bg-gray-50"
};
const _hoisted_3 = ["onKeyup"];
const _hoisted_4 = {
  key: 0,
  class: "h-[200px] overflow-auto mt-2"
};
const _hoisted_5 = ["onClick"];
const _sfc_main = {
  __name: "SelectableInput",
  props: {
    dataSet: {
      required: true,
      type: Array
    },
    columnName: {
      required: true,
      type: String
    },
    selectedDataId: {
      required: false,
      type: Number
    },
    placeholder: {
      default: "Type here...",
      type: String
    }
  },
  emits: ["getRecord"],
  setup(__props, { emit }) {
    const props = __props;
    const showStatus = ref(false);
    const inputValue = ref();
    const innerInput = ref();
    const selectableInput = ref();
    const data = ref([]);
    const checkOutsideClick = (e) => {
      if (!selectableInput.value.contains(e.target)) {
        showStatus.value = false;
        document.removeEventListener("click", checkOutsideClick);
      }
    };
    const showMenu = () => {
      showStatus.value = true;
      data.value = props.dataSet;
      document.addEventListener("click", checkOutsideClick);
    };
    onMounted(() => {
      data.value = props.dataSet;
      const value = props.dataSet.find((item) => item.id === props.selectedDataId);
      if (value) {
        inputValue.value = value[props.columnName];
      }
      emit("getRecord", value);
    });
    watch(props, () => {
      data.value = props.dataSet;
      const value = props.dataSet.find((item) => item.id === props.selectedDataId);
      if (value) {
        inputValue.value = value[props.columnName];
      }
      emit("getRecord", value);
    });
    watchEffect(() => {
      if (innerInput.value) {
        innerInput.value.focus();
      }
    });
    const filter = () => {
      if (!inputValue.value) {
        emit("getRecord", null);
      }
      data.value = props.dataSet.filter((item) => {
        return item[props.columnName].toLocaleLowerCase().indexOf(inputValue.value.toLocaleLowerCase()) > -1;
      });
    };
    const setAndEmit = (record) => {
      inputValue.value = record[props.columnName];
      emit("getRecord", record);
      showStatus.value = false;
      document.removeEventListener("click", checkOutsideClick);
    };
    const reset = () => {
      inputValue.value = null;
      emit("getRecord", null);
      data.value = props.dataSet;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "selectableInput",
        ref: selectableInput,
        class: "relative w-full"
      }, [
        withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => inputValue.value = $event),
          onClick: withModifiers(showMenu, ["prevent"]),
          type: "text",
          class: "focus:outline-none border p-2 rounded w-full relative",
          placeholder: __props.placeholder
        }, null, 8, _hoisted_1), [
          [vModelText, inputValue.value]
        ]),
        inputValue.value ? (openBlock(), createElementBlock("button", {
          key: 0,
          onClick: reset,
          class: "absolute right-1 top-2 rounded px-2 py-1 text-[0.8rem] bg-gray-200 text-gray-500"
        }, "X")) : createCommentVNode("", true),
        showStatus.value ? (openBlock(), createElementBlock("div", _hoisted_2, [
          withDirectives(createElementVNode("input", {
            onKeyup: withModifiers(filter, ["prevent"]),
            ref_key: "innerInput",
            ref: innerInput,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => inputValue.value = $event),
            type: "text",
            class: "focus:outline-none border p-2 rounded w-full"
          }, null, 40, _hoisted_3), [
            [vModelText, inputValue.value]
          ]),
          data.value.length > 0 ? (openBlock(), createElementBlock("ul", _hoisted_4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(data.value, (record) => {
              return openBlock(), createElementBlock("li", {
                key: record.id
              }, [
                createElementVNode("a", {
                  onClick: withModifiers(($event) => setAndEmit(record), ["prevent"]),
                  href: "#",
                  class: "inline-block w-full rounded hover:bg-sky-500 p-1 hover:text-white"
                }, toDisplayString(record[__props.columnName]), 9, _hoisted_5)
              ]);
            }), 128))
          ])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ], 512);
    };
  }
};
var index = {
  install: (app, options) => {
    app.component("SelectableInput", _sfc_main);
  }
};
export { index as default };
