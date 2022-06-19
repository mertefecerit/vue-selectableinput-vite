<script setup>
import {onMounted, ref} from 'vue';
import SelectableInput from "./components/SelectableInput.vue";
import staticJson from "./assets/static.json";

const dataSet = ref([]);
const selectedData = ref();

onMounted(async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    dataSet.value = await response.json();
});

const getRecord = (e) =>{
    selectedData.value = e;
}
</script>

<template>
    <div class="bg-gray-200 min-h-screen flex flex-col gap-2 justify-center items-center">
        <div class="w-1/6">
            <SelectableInput :data-set="staticJson" column-name="name" @getRecord="getRecord"></SelectableInput>
        </div>
        <div class="w-1/6 bg-white rounded p-2 overflow-auto text-[0.8rem]">
            <pre>{{selectedData}}</pre>
        </div>
    </div>
</template>