<template>
    <v-container fluid class="h-100 w-100 pa-0 ma-0 bg-blue-grey-lighten-4">           
        <v-row no-gutters class="pa-5 pb-0 ma-0" style="height: 70%;">         
            <v-col cols="12" class="">
                <span class="label" style="font-size: 20vh;">{{ $route.query.selectedCodeName }}</span>
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
    <v-dialog width="800" height="500" v-model="dialogVisible">       
        <v-card class="h-100 w-100 pa-0 ma-0 bg-white" rounded="xl">
            <v-card-title style="height: 30%; background-color: #339900;" class="d-flex justify-center align-center" >
                <v-icon class="" size="80" color="white" icon="mdi-check-circle-outline"></v-icon>
                <span style="color: white; font-size: 8vh;font-weight: bold;">SUCCESS</span>
            </v-card-title>
            <v-card-text class="pa-0 ma-0 d-flex justify-center align-center" style="height: 40%; color: #339900; font-size: 7vh;">
                {{ dialogMessage }}
            </v-card-text>
            <v-card-actions class="pa-0 ma-0 d-flex justify-center align-center" style="height: 30%;">
                <v-btn rounded variant="outlined" style="height: 70%; width: 30%; color: #339900; font-size: 4vh; font-weight: bold;" text="Close" @click="dialogVisible = false"></v-btn>
            </v-card-actions>
        </v-card>           
    </v-dialog> 
</template>              
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({

    data: () => ({
        dialogVisible: false,
        dialogMessage: "",      
        currentDateFormat: "",
        monitoringTimer : null as number | null,
        selectedCodeName: null as string | string[] | null,        
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
        submitRequest(command: string){
            switch(command){
                case '공급':
                    this.dialogMessage = '공급 요청!'
                    this.dialogVisible = true       
                break;
                case '회수':
                    this.dialogMessage = '회수 요청!'
                    this.dialogVisible = true
                break;
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