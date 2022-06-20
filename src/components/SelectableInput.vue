<template>
    <div ref="selectableInput" class="relative w-full">
        <input v-model="inputValue" @click.prevent="showMenu" type="text" class="focus:outline-none border p-2 rounded w-full relative" :placeholder="placeholder">
        <button @click="reset" v-if="inputValue" class="absolute right-1 top-2 rounded px-2 py-1 text-[0.8rem] bg-gray-200 text-gray-500">X</button>
        <div v-if="showStatus" class="absolute top-0 left-0 w-full rounded p-2 border bg-gray-50">
            <input @keyup.prevent="filter" ref="innerInput" v-model="inputValue" type="text" class="focus:outline-none border p-2 rounded w-full">
            <ul class="h-[200px] overflow-auto mt-2" v-if="data.length > 0">
                <li v-for="record in data" :key="record.id"><a @click.prevent="setAndEmit(record)" href="#" class="inline-block w-full rounded hover:bg-sky-500 p-1 hover:text-white">{{record[columnName]}}</a></li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    // Imports, defines and init reactive, object or primite variables
    import {onMounted, ref, watch, watchEffect} from "vue";
    //Handle show dropdown area
    const showStatus = ref(false);
    //Store inputValue ref. value
    const inputValue = ref();
    //ref innerInput for filter
    const innerInput = ref();
    //ref selectableInput for handle clickoutside event
    const selectableInput = ref();
    //ref data for modifiable reactive variable
    const data = ref([]);
    //define props
    const props = defineProps({
        dataSet:{
            required:true,
            type: Array
        },
        columnName:{
            required:true,
            type:String
        },
        selectedDataId:{
            required:false,
            type: Number
        },
        placeholder:{
            default: "Type here...",
            type: String
        }
    });
    //define emit
    const emit = defineEmits(['getRecord']);
    // Imports and init reactive, object or primite variables


    // outside click event
    const checkOutsideClick = (e) => {
        if (!selectableInput.value.contains(e.target)){
            showStatus.value = false;
            document.removeEventListener("click",checkOutsideClick)
        }
    }
    // outside click event

    
    // click first input method
    const showMenu = () => {
        showStatus.value = true
        data.value = props.dataSet;
        document.addEventListener("click",checkOutsideClick)
    }
    // click first input method


    // if this comp. receive static data-set modifiable data-set and set inputValue if selected any data
    onMounted(() => {
        data.value = props.dataSet;
        const value = props.dataSet.find(item => item.id === props.selectedDataId);
        if(value){
            inputValue.value = value[props.columnName]
        }
        emit('getRecord',value);
    })
    // if this comp. receive static data-set modifiable data-set and set inputValue if selected any data


    // watch props for anychanges set modifiable data-set and set inputValue if selected any data
    watch(props, () => {
        data.value = props.dataSet;
        const value = props.dataSet.find(item => item.id === props.selectedDataId);
        if(value){
            inputValue.value = value[props.columnName]
        }
        emit('getRecord',value);
    })
    // watch props for anychanges set modifiable data-set and set inputValue if selected any data


    // watchEffect if component have innerInput named ref element focus on this
    watchEffect(() => {
        if(innerInput.value){
            innerInput.value.focus();
        }
    });
    // watchEffect if component have innerInput named ref element focus on this


    // inputValue filter method if inputValue is emtpy emit parent comp. record is null
    const filter = () => {
        if(!inputValue.value){
            emit('getRecord',null);
        }
        data.value = props.dataSet.filter(item => {
            return item[props.columnName].toLocaleLowerCase().indexOf(inputValue.value.toLocaleLowerCase()) > -1;
        })
    }
    // inputValue filter method if inputValue is emtpy emit parent comp. record is null


    // click result list element and set and emit event
    const setAndEmit = (record) => {
        inputValue.value = record[props.columnName];
        emit('getRecord',record);
        showStatus.value = false;
        document.removeEventListener("click",checkOutsideClick)
    }
    // click result list element and set and emit event


    // reset function
    const reset = () => {
        inputValue.value = null
        emit('getRecord',null);
        data.value = props.dataSet;
    }
    // reset function
</script>
