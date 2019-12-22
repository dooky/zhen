<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <div>
      <el-input v-model="plain" class="search-input" />
    </div>
    <div>
      <div v-for="item in result" :key="item">
        <span>{{item}}</span>
        <span>{{dictionary[item]}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ipcRenderer as ipc } from "electron";

@Component
export default class Home extends Vue {
  plain: string = "";
  dictionary: any = {};

  get result() {
    let keys = Object.keys(this.dictionary);
    let nk = keys.filter(i => i.indexOf(this.plain) > 0);
    return nk;
  }

  created() {
    ipc.send("load");
    ipc.on("load", (event, data: any) => {
      this.dictionary = data;
    });
  }
}
</script>

<style lang="scss" scoped>
.home {
  .search-input {
    max-width: 20em;
  }
}
</style>