<template>
  <ul class="server-list">
    <li v-for="server in servers" :key="server.customer_id">
      <div class="server-info">
        <strong>{{ server.customer_id }}</strong> - {{ server.server_name }} ({{
          server.server_type
        }})
      </div>
      <div class="server-controls">
        <button class="edit-button" @click="editServer(server)">
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button class="remove-button" @click="removeServer(server)">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import '@fortawesome/fontawesome-free/css/all.min.css'

type Server = {
  customer_id: string
  server_name: string
  server_type: string
}

export default defineComponent({
  props: {
    servers: {
      type: Array as PropType<Server[]>,
      required: true,
    },
  },
  emits: ['remove-server', 'edit-server'],
  methods: {
    removeServer(server: Server) {
      this.$emit('remove-server', server)
    },
    editServer(server: Server) {
      this.$emit('edit-server', server)
    },
  },
})
</script>

<style lang="scss" scoped>
.server-list {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.server-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
  background-color: #ffffff;
  border-radius: 8px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #e9ecef;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .server-info {
    flex-grow: 1;
    font-size: 16px;
    color: #212529;
    font-weight: 500;
  }

  .server-controls {
    display: flex;
    gap: 10px;

    button {
      border: none;
      border-radius: 5px;
      padding: 8px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s ease, transform 0.3s ease;

      &:hover {
        transform: scale(1.05);
      }

      &.edit-button {
        background-color: #007bff;
        color: #ffffff;

        &:hover {
          background-color: #0056b3;
        }
      }

      &.remove-button {
        background-color: #dc3545;
        color: #ffffff;

        &:hover {
          background-color: #c82333;
        }
      }

      i {
        font-size: 16px;
      }
    }
  }
}
</style>
