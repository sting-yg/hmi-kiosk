<template>
    <v-container fluid class="h-100 w-100 pa-0 ma-0 bg-blue-grey-lighten-4">           
        <v-row no-gutters class="pa-5 pb-0 ma-0" style="height: 70%;">         
            <v-col cols="12" class="">
                <span class="label" style="font-size: 20vh;">{{ lineStation }}</span>
            </v-col>     
        </v-row>
        <v-row no-gutters class="pa-5 pt-0 ma-0" style="height: 30%;">        
            <v-col cols="12" class="w-100 h-100 px-5 pb-5 d-flex justify-space-around align-center bg-white">
                <v-btn elevation="24" rounded="xl" color="primary" width="25%" height="70%" text="공급" style="font-size: 6vh;"
                @click="submitRequest('공급')">            
                </v-btn>
                <v-btn elevation="24" rounded="xl" color="primary" width="25%" height="70%" text="회수" style="font-size: 6vh;"
                @click="submitRequest('회수')">            
                </v-btn>
            </v-col>      
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
import customDialog from '../dialog/customDialog.vue';

export default defineComponent({

    components:{
        customDialog
    },

    data: () => ({  
        lineStation: localStorage.getItem("lineStation"),
        dialogVisible: false,
        dialogTitle: "", // success warning alarm
        dialogMessage: "", 
        dialogIcon: "",  // success : mdi-check-circle-outline ; warning: mdi-alert-outline
        dialogColor: "", // success : #339900 ; warning: #FF6D00
        currentDateFormat: "",
        monitoringTimer : null as number | null,
        selectedCodeName: null as string | string[] | null,        
    }),

    computed: {

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

        submitRequest(command: string){
            if(this.lineStation != null){
                switch(command){
                    case '공급':
                        this.dialogTitle = 'SUCCESS'
                        this.dialogMessage = '공급 요청!'  
                        this.dialogIcon = 'mdi-check-circle-outline'
                        this.dialogColor = '#339900'                      
                        this.dialogVisible = true       
                    break;
                    case '회수':
                        this.dialogTitle = 'SUCCESS'
                        this.dialogMessage = '회수 요청!'    
                        this.dialogIcon = 'mdi-check-circle-outline'
                        this.dialogColor = '#339900'
                        this.dialogVisible = true
                    break;
                }
            }else{
                this.dialogTitle = 'WARNING'
                this.dialogMessage = '라인/공정 선택 하세요!'
                this.dialogIcon = 'mdi-alert-outline'
                this.dialogColor = '#FF6D00'
                this.dialogVisible = true
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
.label {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: black;
    font-size: 50px;
    background-color: white;
    width: 100%;
    height: 100%;
}
</style>