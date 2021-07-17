<template>
  <div class="min-h-screen flex flex-row">
    <div class="bg-blue-200 w-1/4 min-h-full p-3">
      <div class="m-1 p-4">
        <router-link to="/admin">
          <h2>Meto Transport</h2>
          <p>Admin Dashboard</p>
        </router-link>
      </div>
      <ol class="mt-3 gap-2">
        <router-link to="/admin/manage-buses">
          <li route>Manage Buses</li>
        </router-link>

         <router-link to="/admin/manage-routes">
          <li route>Manage Routes</li>
        </router-link>
           <router-link to="/admin/schedules">
          <li route> Bus Schedule</li>
        </router-link>
           <router-link to="/admin/ticket-cancellations">
          <li route>cancellations</li>
        </router-link>

      </ol>
    </div>
    <div class="bg-red-200 w-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
</script>