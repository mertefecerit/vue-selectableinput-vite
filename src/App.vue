<script setup>
import {onMounted, ref} from 'vue';
import SelectableInput from "./components/SelectableInput/index.vue";
import staticJson from "./assets/static.json";

const dataSet = ref([]);
const selectedData = ref();
const selectedUser = ref();
onMounted(async() => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    dataSet.value = await response.json();
});

const getRecord = (e) =>{
    selectedData.value = e;
}
</script>

<template>
    <div class="bg-gray-200 min-h-screen flex gap-4 justify-center items-center">
        <div class="w-80 bg-white rounded p-2">
            <span class="font-bold">User List</span>
            <hr>
            <ul class="flex flex-col gap-1">
                <li v-for="user in dataSet" :key="user">
                    <label :for="user.id" 
                    class="hover:bg-sky-500 hover:text-white cursor-pointer w-full p-2 inline-block rounded" 
                    :class="{'bg-sky-500 text-white': user.id === selectedUser }">
                        <input :id="user.id" type="radio" name="selectUser" @click="selectedUser = user.id">
                        {{user.name}}
                    </label>
                </li>
            </ul>
        </div>
        <div class="w-80 flex flex-col gap-2">
            <div class="w-full">
                <SelectableInput
                    placeholder="Kayıt Ara"
                    :selected-data-id="selectedUser" 
                    :data-set="staticJson" 
                    column-name="name" 
                    @getRecord="getRecord">
                </SelectableInput>
            </div>
            <div v-if="selectedData" class="w-full bg-white rounded p-2 overflow-auto text-[0.8rem]">
                <span class="font-bold">Selected Data Raw</span>
                <hr>
                <pre>{{selectedData}}</pre>
            </div>
        </div>
    </div>
</template>