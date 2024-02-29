<template>
    <v-container fluid class="h-100 w-100 ma-0 pa-0 bg-blue-grey-lighten-4">      
        <v-row no-gutters class="py-5 px-0 ma-0 bg-blue-grey-lighten-4 d-flex justify-space-around align-center" style="height: 20%;">           
            <!-- <span class="label" style="width: 75%; height: 90%; border-radius: 5px;">{{ selectedRowData? selectedRowData.codeName : selectedCodeName || '변경할 라인/공정을 선택하세요 !'}}</span>   -->
            <span class="label" style="width: 75%; height: 90%; border-radius: 5px;">{{ lineStation? lineStation : '변경할 라인/공정 선택 하세요!' }}</span>            
            <v-btn style="width: 20%; height: 90%; font-size: 6vh; border-radius: 5px;" elevation="24" color="primary" @click="goToMaterialRequest()">확인</v-btn> 
        </v-row>    
            
        <v-row no-gutters class="h-80 pa-5 pt-0 ma-0 bg-blue-grey-lighten-4">  
            <v-card class="h-100 w-100 pa-0 ma-0">                    
                <v-table fixed-header  style="height: 69.5vh;">                  
                    <thead>
                        <tr >
                            <th class="text-center">No.</th>
                            <th class="text-center">라인/공정</th>           
                        </tr>
                    </thead>                           
                    <tbody >
                        <!-- <tr v-for="(item, index) in data" :key="index" :class="{ 'selected-row': data[index] === selectedRowData, 'hovered-row': index === hoveredRowIndex }" @click="selectRow(data[index])" @mouseover="setHoveredRow(index)" @mouseleave="clearHoveredRow"> -->
                        <tr v-for="(item, index) in data" :key="index" :class="{ 'selected-row': data[index] === selectedRowData,}" @click="selectRow(data[index])">
                            <td class="text-center">{{ data[index].codeNo }}</td>
                            <td class="text-center">{{ data[index].codeName }}</td>
                        </tr>
                    </tbody>
                </v-table>                 
            </v-card> 
        </v-row>  
    </v-container>
    <template>
        <customDialog 
        v-if="dialogVisible"
        v-model:dialog-visible="dialogVisible"
                :dialog-title="dialogTitle" 
                :dialog-message="dialogMessage" 
                :dialog-icon="dialogIcon" 
                :dialog-color="dialogColor"
        @close="handleCloseDialog"/>
    </template>
      
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import customDialog from '../dialog/customDialog.vue'

export default defineComponent({

    components:{
        customDialog,
    },
    data: () => ({
        lineStation: localStorage.getItem("lineStation"),
        dialogVisible: false,
        dialogTitle: "", // success warning alarm
        dialogMessage: "", 
        dialogIcon: "",  // success : mdi-check-circle-outline ; warning: mdi-alert-outline
        dialogColor: "", // success : #339900 ; warning: #FF6D00
        selectedRowData: null as { codeNo: string, codeName: string } | null,
        currentDateFormat: "",
        monitoringTimer : null as number | null,
        data: [
            { codeNo: '1', codeName: '1라인1공정'},
            { codeNo: '2', codeName: '2라인2공정'},
            { codeNo: '3', codeName: '3라인3공정'},
            { codeNo: '4', codeName: '4라인4공정'},
            { codeNo: '5', codeName: '5라인5공정'},
            { codeNo: '6', codeName: '6라인6공정'},
            { codeNo: '1', codeName: '1라인1공정'},
            { codeNo: '2', codeName: '2라인2공정'},
            { codeNo: '3', codeName: '3라인3공정'},
            { codeNo: '4', codeName: '4라인4공정'},
            { codeNo: '5', codeName: '5라인5공정'},
            { codeNo: '6', codeName: '6라인6공정'},
            { codeNo: '7', codeName: '7라인5공정'},
            { codeNo: '8', codeName: '8라인6공정'},
        ], 
    }),
    computed:{
    },
    methods: {
        handleCloseDialog() {
            this.dialogVisible = false;
        },
        updateCurrentTime() {
            const today = new Date();
            const year = today.getFullYear();
            const month = ('0' + (today.getMonth() + 1)).slice(-2);
            const day = ('0' + today.getDate()).slice(-2);
            const hours = ('0' + today.getHours()).slice(-2); 
            const minutes = ('0' + today.getMinutes()).slice(-2);
            const seconds = ('0' + today.getSeconds()).slice(-2); 
            var _date = year + '-' + month  + '-' + day;
            var _time = hours + ':' + minutes  + ':' + seconds;
            this.currentDateFormat = _date + " " + _time;
        },
        selectRow(rowData: { codeNo: string, codeName: string }) {
            this.selectedRowData = rowData;
            this.lineStation = this.selectedRowData.codeName
            //set lineStation
            localStorage.setItem("lineStation", this.selectedRowData.codeName);
        },
        goToMaterialRequest() {
            console.log(this.lineStation)
            if (this.lineStation != null) {
                this.$router.push({
                    path: '/materialRequest',
                });
            } else {
                this.dialogTitle = 'WARNING'
                this.dialogMessage = '라인/공정 선택 하세요!'
                this.dialogIcon = 'mdi-alert-outline'
                this.dialogColor = '#FF6D00'
                this.dialogVisible = true
                console.log(this.lineStation)
            }
        }
    },
    mounted() {
        this.monitoringTimer = setInterval(() =>{
            this.updateCurrentTime();
        }, 1000);

        // get lineStation
        // this.lineStation = localStorage.getItem("lineStation");
        
    },
    beforeUnmount() {
        if(this.monitoringTimer) {
            clearInterval(this.monitoringTimer);
        }
    },
})
</script>
<style scoped>
@import "../../../public/assets/scss/commonHmi.scss";
#virtual-scroll-table {
  max-height: 400px;
  overflow: auto;
}
th {
    font-size: 5vh;
    font-weight: bold;
    color: white;
    background-color: #0091EA !important;
}
td {
    font-size: 3.5vh;
    font-weight: bold;
}
.v-table--density-default{
    --v-table-header-height: 10vh;
    --v-table-row-height: 10vh;
}
.label {
    display: flex;
    align-items: center;
    justify-content: center ;
    text-align: center;
    color: black ;
    font-size: 6vh ;
    background-color: white  ;
    width: 100%;
    height: 100%;
}
.selected-row {
    background-color: #42a5f5; 
    color: white; 
}
.hovered-row {
    background-color: #f0f0f0; 
}
</style>