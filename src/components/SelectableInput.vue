<template>
    <div ref="selectableInput" class="relative w-full">
        <input v-model="inputValue" @click.prevent="showMenu" type="text" class="focus:outline-none border p-2 rounded w-full" placeholder="Please Typing...">
        <div v-if="showStatus" class="absolute top-0 left-0 w-full bg-white p-2">
            <input @keyup.prevent="filter" ref="innerInput" v-model="inputValue" type="text" class="focus:outline-none border p-2 rounded w-full">
            <ul class="h-[200px] overflow-auto mt-2" v-if="data.length > 0">
                <li v-for="record in data" :key="record.id"><a @click.prevent="setAndEmit(record)" href="#">{{record[columnName]}}</a></li>
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
        document.addEventListener("click",checkOutsideClick)
    }
    // click first input method


    // if this comp. receive static data-set modifiable data-set
    onMounted(() => {
        data.value = props.dataSet;
    })
    // if this comp. receive static data-set modifiable data-set


    // watch props for anychanges set modifiable data-set 
    watch(props, () => {
        data.value = props.dataSet;
    })
    // watch props for anychanges set modifiable data-set 


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
</script>
