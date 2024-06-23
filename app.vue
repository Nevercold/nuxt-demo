<template>
  <div>
    <button @click="test()">Send Event</button>

    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
<script setup lang="ts">
import requestService from "~/utils/request.service";

const test = () => {
  setInterval(() => {
    requestService.makeRequest<any>('/','GET').then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error);
      alert('Error');
    });
  }, 1000);
}

</script>