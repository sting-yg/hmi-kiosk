<template>
    <v-container fluid class="h-100 w-100 ma-0 pa-0 bg-blue-grey-lighten-4">      
        <v-row no-gutters class="py-5 px-0 ma-0 bg-blue-grey-lighten-4 d-flex justify-space-around align-center" style="height: 20%;">           
            <span class="label" style="width: 75%; height: 90%; border-radius: 5px;">{{ selectedRowData? selectedRowData.codeName : selectedCodeName || '변경할 라인/공정을 선택하세요 !'}}</span>          
            <v-btn style="width: 20%; height: 90%; font-size: 6vh; border-radius: 5px;" elevation="24" color="primary" @click="goToMaterialRequest()">확인</v-btn> 
        </v-row>        
        <v-row no-gutters class="h-80 pa-5 pt-0 ma-0 bg-blue-grey-lighten-4">  
            <v-card class="h-100 w-100 pa-5 pb-0 ma-0">                    
                <v-table fixed-header  style="height: 60vh;" id="custom-scrollbar">                  
                    <thead>
                        <tr >
                            <th class="text-center">No.</th>
                            <th class="text-center">라인/공정</th>           
                        </tr>
                    </thead>                           
                    <tbody >
                        <tr v-for="(item, index) in data" :key="index" :class="{ 'selected-row': data[index] === selectedRowData, 'hovered-row': index === hoveredRowIndex }" @click="selectRow(data[index])" @mouseover="setHoveredRow(index)" @mouseleave="clearHoveredRow">
                            <td class="text-center">{{ data[index].codeNo }}</td>
                            <td class="text-center">{{ data[index].codeName }}</td>
                        </tr>
                    </tbody>
                </v-table>                 
            </v-card> 
        </v-row>  
    </v-container>
    <v-dialog width="800" height="500" v-model="dialogVisible">    
        <v-card class="h-100 w-100 pa-0 ma-0" rounded="xl">
            <v-card-title  style="height: 30%; background-color: #FF6D00;" class="pa-0 ma-0 d-flex justify-center align-center">
                <v-icon class="" size="80" color="white" icon="mdi-alert-outline"></v-icon>
                <span style="color: white; font-size: 8vh; font-weight: bold;">WARNING</span>
            </v-card-title>
            <v-card-text class="pa-0 ma-0 d-flex justify-center align-center" style="height: 40%; color: #FF6D00; font-size: 7vh;">
                라인/공정 선택하세요!
            </v-card-text>
            <v-card-actions class="pa-0 ma-0 d-flex justify-center align-center" style="height: 30%;">
                <v-btn rounded variant="outlined" style="height: 70%; width: 30%; color:#FF6D00 ; font-size: 4vh; font-weight: bold;" text="Close" @click="dialogVisible = false"></v-btn>
            </v-card-actions>
        </v-card>   
    </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useKioskStore } from '../../stores/KioskStore'

export default defineComponent({
    setup() {
    const store = useKioskStore() 

    return {
      selectedCodeName: store.selectedCodeName
    }
  },
    data: () => ({
        isActive: false,
        dialogVisible: false,
        hoveredRowIndex: -1, 
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
    methods: {
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
            this.selectedCodeName = this.selectedRowData.codeName
        },
        setHoveredRow(index: number) {
            this.hoveredRowIndex = index; 
        },
        clearHoveredRow() {
            this.hoveredRowIndex = -1; 
        },
        goToMaterialRequest() {
            console.log("222")
            useKioskStore().setSelectedCodeName(this.selectedCodeName)
            if (this.selectedRowData !== null || (this.selectedCodeName !== null && this.selectedCodeName.trim().length != 0)) {
                this.$router.push({
                    path: '/materialRequest',
                    query: {
                        selectedCodeName: this.selectedCodeName
                    }
                });
            } else {
                this.dialogVisible = true;
            }
        }
    },
    mounted() {
        this.monitoringTimer = setInterval(() =>{
            this.updateCurrentTime();
        }, 1000);
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