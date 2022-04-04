<template>
  <div class="min-h-screen flex flex-col items-center">
    <div class="flex flex-col justify-center items-center w-full">
      <h1 class="text-3xl text-center text-gray-500 font-nunito mx-4 my-6">
        Transcations Journals
      </h1>

      <div class="flex gap-2 justify-around bg-gray-200 p-2 rounded">
        <input type="date" class="bg-gray-200" v-model="date" />
        <button @click="fetchTranscationDetailsByDate()">
          Load Transaction Details
        </button>
      </div>

      <div class="w-11/12">
        <table
          class="border-l border-r divide-y divide-gray-200 table-auto w-full"
        >
          <thead class="">
            <tr>
              <td
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                Amount
              </td>
              <td
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                Deposit Bank
              </td>
              <td
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                Journal Number
              </td>
              <td
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                Contact
              </td>

              <td
                class="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
              >
                Entered By
              </td>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="journal in journals" :key="journal">
              <td
                class="
                  px-6
                  py-3
                  whitespace-nowrap
                  break-words
                  font-light
                  text-sm
                "
              >
                <p class="text-sm text-center">Nu {{ journal.amount }}</p>
              </td>
              <td class="px-6 py-3 whitespace-nowrap font-light text-sm">
                <p class="text-sm text-center">
                  {{ journal.depositBank }}
                </p>
              </td>
              <td class="px-6 py-3 whitespace-nowrap font-light text-sm">
                <p class="text-sm text-center">
                  {{ journal.depositJournal }}
                </p>
              </td>
              <td class="px-6 py-3 whitespace-nowrap font-light text-sm">
                <p class="text-sm text-center">
                  {{ journal.depositContact }}
                </p>
              </td>
              <td class="px-6 py-3 whitespace-nowrap font-light text-sm">
                {{ journal.user.name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>




<script>
import { getAllJournalsToday } from "../../services/journalService";

export default {
  created() {
    this.fetchData();
    let date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day;
    this.date = today;

    
  },
  data() {
    return {
      journals: [],
      date: new Date(),
    };
  },
  methods: {
    fetchData() {
      getAllJournalsToday().then((res) => {
        this.journals = res.data;
      });
    },
    fetchTranscationDetailsByDate() {
      console.log(this.date);
    },
  },
};
</script>