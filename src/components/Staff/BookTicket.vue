<template>
  <div class="min-h-full flex flex-col items-center justify-center">
    <router-view> </router-view>
  </div>
</template>
<style scoped>
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  min-width: max-content;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
.modal__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
</style>

<style scoped>
.dark-mode div::v-deep .modal-content {
  border-color: #2d3748;
  background-color: #1a202c;
}
</style>


<script>
import { Calendar, DatePicker } from "v-calendar";
import { getAllStops } from "../../services/stopServices";
import { getScheduleByDate } from "../../services/scheduleServices";
import { getRoutesByOriginDestination } from "../../services/routeServices";

export default {
  data() {
    return {
      stops: [],
      originSelected: {},
      destinationSelected: {},
      customer: {
        customerName: "",
        customerContact: "",
        customerCid: "",
      },
      date: "",
      searchBusModal: false,
      schedules: [],
    };
  },
  created() {
    getAllStops()
      .then((res) => {
        this.stops = res;
      })
      .catch((err) => console.log(err));
  },
  components: {
    Calendar,
    DatePicker,
  },
  methods: {
    onDayClick(e) {
      this.date = e.id;
    },
    searchBus() {
      if (
        // this.customer.customerName &&
        // this.customer.customerContact &&
        // this.customer.customerContact &&
        this.originSelected &&
        this.destinationSelected
        // this.date
      ) {
        let formattedDate = this.date + +" 00:00:00";
        getRoutesByOriginDestination(
          this.originSelected.id,
          this.destinationSelected.id
        ).then((res) => {
          console.log(res, "Matched route id");
        });
        getScheduleByDate(formattedDate).then((res) => {
          this.schedules = res;
        });

        this.$toast.show(
          "Searching bus on the day and listing it below on the table",
          {
            type: "info",
            position: "top",
          }
        );
        // this.searchBusModal = true;
      } else {
        this.$toast.show("All fields are required", {
          type: "error",
          position: "top",
        });
      }
    },
  },
};
</script>