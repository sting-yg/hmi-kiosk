<template>
    <v-dialog width="800" height="500" v-model="dialogVisibleProp">       
        <v-card class="h-100 w-100 pa-0 ma-0 bg-white" rounded="xl">
            <v-card-title :style="{height: '30%', backgroundColor: dialogColor}" class="d-flex justify-center align-center" >
                <v-icon size="80" color="white" :icon="dialogIcon"></v-icon>
                <span style="color: white; font-size: 8vh;font-weight: bold;">{{dialogTitle}}</span>
            </v-card-title>
            <v-card-text class="pa-0 ma-0 d-flex justify-center align-center" :style="{height: '40%', color: dialogColor, fontSize: '5vh'}">
                {{ dialogMessage }}
            </v-card-text>
            <v-card-actions class="pa-0 ma-0 d-flex justify-center align-center" style="height: 30%;">
                <v-btn rounded variant="tonal" elevation="24" :style="{height: '70%', width: '30%', backgroundColor: dialogColor, color: 'white', fontSize: '4vh', fontWeight: 'bold'}" text="Close" @click="closeDialog"></v-btn>
            </v-card-actions>
        </v-card>           
    </v-dialog> 
</template>

<script lang="ts">
import { defineComponent , ref} from 'vue'
export default defineComponent({

    props:{
        dialogTitle: String,
        dialogMessage: String,    
        dialogIcon: String, 
        dialogColor: String, 
        dialogVisible: Boolean,    
    },  

    setup(props, { emit } ) {
        const dialogVisibleProp = ref(props.dialogVisible)  
        const closeDialog = () => {
            dialogVisibleProp.value = false
            emit('close')
        }
        return {
            dialogVisibleProp,
            closeDialog,
        }
    },
})
</script>

