<template>
  <div class="edit-form-container">
    <h3>Edit Server</h3>
    <form @submit.prevent="save">
      <input
        v-model="localServer.customer_id"
        placeholder="Customer ID"
        required
      />
      <input
        v-model="localServer.server_name"
        placeholder="Server Name"
        required
      />
      <select v-model="localServer.server_type" required>
        <option value="" disabled>Select Server Type</option>
        <option value="vds">VDS</option>
        <option value="dedicated">Dedicated</option>
        <option value="hosting">Hosting</option>
      </select>
      <button type="submit">Save Server</button>
      <button type="button" @click="close">Cancel</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { PropType } from 'vue'

type Server = {
  customer_id: string
  server_name: string
  server_type: string
}

export default defineComponent({
  props: {
    server: {
      type: Object as PropType<Server>,
      required: true,
    },
  },
  emits: ['save-server', 'close-form'],
  setup(props, { emit }) {
    const localServer = ref<Server>({ ...props.server })

    watch(
      () => props.server,
      (newServer) => {
        localServer.value = { ...newServer }
      }
    )

    const save = () => {
      emit('save-server', localServer.value)
    }

    const close = () => {
      emit('close-form')
    }

    return {
      localServer,
      save,
      close,
    }
  },
})
</script>

<style lang="scss" scoped>
.edit-form-container {
  border: 1px solid #ccc;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  form {
    display: flex;
    flex-direction: column;
    input,
    select {
      margin-bottom: 10px;
      padding: 8px;
    }
    button {
      padding: 10px;
      margin-top: 10px;
      border: none;
      cursor: pointer;
    }
    button[type='submit'] {
      background-color: #007bff;
      color: white;
      &:hover {
        background-color: #0056b3;
      }
    }
    button[type='button'] {
      background-color: #6c757d;
      color: white;
      &:hover {
        background-color: #5a6268;
      }
    }
  }
}
</style>
