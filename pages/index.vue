<template>
  <div class="container">
    <div class="server-list">
      <ServerList
        :servers="servers"
        @edit-server="selectServer"
        @remove-server="removeServer"
      />
      <button class="add-server-button" @click="showAddForm = !showAddForm">
        {{ showAddForm ? 'Cancel' : 'Add New Server' }}
      </button>
      <div class="add-server-form" v-if="showAddForm">
        <h3 class="form-title">Add New Server</h3>
        <form @submit.prevent="addServer" class="server-form">
          <input
            v-model="newServer.customer_id"
            placeholder="Customer ID"
            class="form-input"
            required
          />
          <input
            v-model="newServer.server_name"
            placeholder="Server Name"
            class="form-input"
            required
          />
          <select v-model="newServer.server_type" class="form-select" required>
            <option value="" disabled>Select Server Type</option>
            <option value="vds">VDS</option>
            <option value="dedicated">Dedicated</option>
            <option value="hosting">Hosting</option>
          </select>
          <button type="submit" class="submit-button">Add Server</button>
        </form>
      </div>
    </div>
    <div class="edit-form">
      <ServerEditForm
        v-if="selectedServer"
        :server="selectedServer"
        @save-server="saveServer"
        @close-form="closeForm"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import ServerList from '../components/ServerList.vue'
import ServerEditForm from '../components/ServerEditForm.vue'

type Server = {
  customer_id: string
  server_name: string
  server_type: string
}

export default defineComponent({
  components: { ServerList, ServerEditForm },
  setup() {
    const defaultServers: Server[] = [
      { customer_id: 'user1', server_name: 'server7', server_type: 'vds' },
      {
        customer_id: 'user5',
        server_name: 'server2',
        server_type: 'dedicated',
      },
      { customer_id: 'user3', server_name: 'server4', server_type: 'hosting' },
    ]

    const servers = ref<Server[]>([])
    const selectedServer = ref<Server | null>(null)
    const newServer = ref<Server>({
      customer_id: '',
      server_name: '',
      server_type: '',
    })
    const showAddForm = ref(false)

    onMounted(() => {
      const savedServers = localStorage.getItem('servers')
      if (savedServers) {
        servers.value = JSON.parse(savedServers)
      } else {
        servers.value = defaultServers
        localStorage.setItem('servers', JSON.stringify(defaultServers))
      }
    })

    watch(
      servers,
      (newServers) => {
        localStorage.setItem('servers', JSON.stringify(newServers))
      },
      { deep: true }
    )

    const selectServer = (server: Server) => {
      selectedServer.value = { ...server }
    }

    const saveServer = (updatedServer: Server) => {
      const index = servers.value.findIndex(
        (s) => s.customer_id === selectedServer.value?.customer_id
      )
      if (index !== -1) {
        servers.value[index] = { ...updatedServer }
        selectedServer.value = null
      }
    }

    const addServer = () => {
      if (
        !newServer.value.customer_id ||
        !newServer.value.server_name ||
        !newServer.value.server_type
      ) {
        return
      }
      servers.value.push({ ...newServer.value })
      newServer.value = { customer_id: '', server_name: '', server_type: '' }
      showAddForm.value = false
    }

    const removeServer = (server: Server) => {
      servers.value = servers.value.filter(
        (s) => s.customer_id !== server.customer_id
      )
    }

    const closeForm = () => {
      selectedServer.value = null
    }

    return {
      servers,
      selectedServer,
      newServer,
      showAddForm,
      selectServer,
      saveServer,
      addServer,
      removeServer,
      closeForm,
    }
  },
})
</script>

<style lang="scss" scoped>
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f0f4f8;
  color: #333;
  margin: 0;
  padding: 0;
}
.container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.server-list {
  width: 40%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

ul.server-list {
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #d1e9ff;
  border-radius: 5px;
  background-color: #f7fbff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e6f4ff;
  }

  .server-info {
    font-size: 16px;
    font-weight: bold;
    color: #004085;
    flex-grow: 1;
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
      font-size: 14px;
      transition: background-color 0.3s ease;

      &:hover {
        opacity: 0.9;
      }

      &.edit-button {
        background-color: #007bff;
        color: #ffffff;

        &:hover {
          background-color: #0056b3;
        }
      }

      &.remove-button {
        background-color: #ff4d4d;
        color: #ffffff;

        &:hover {
          background-color: #cc0000;
        }
      }

      i {
        font-size: 16px;
      }
    }
  }
}

.add-server-form {
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

h3.form-title {
  font-size: 18px;
  color: #007bff;
  margin-bottom: 15px;
}

.server-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

input.form-input,
select.form-select {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 95%;
  max-width: 500px;
  font-size: 14px;
  box-sizing: border-box;
}

.submit-button {
  background-color: #28a745;
  width: 95%;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
}

.add-server-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 12px 20px;
  font-size: 16px;
  text-align: center;
  width: 100%;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
}

.edit-form {
  width: 55%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
