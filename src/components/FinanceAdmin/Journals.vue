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

      <div class="w-11/12 p-2" v-if="journals.length !==0">
        <table
          class=" divide-y divide-gray-200 table-auto w-full mt-6"
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
                  text-left
                "
              >
                <p class="text-sm text-left">Nu {{ journal.amount }}</p>
              </td>
              <td class="px-6 py-3 whitespace-nowrap font-light text-sm text-left" >
                <p class="text-sm text-left">
                  {{ journal.depositBank }}
                </p>
              </td>
              <td class="px-6 py-3 whitespace-nowrap font-light text-sm text-left">
                <p class="text-sm text-left">
                  {{ journal.depositJournal }}
                </p>
              </td>
              <td class="px-6 py-3 whitespace-nowrap font-light text-sm text-left">
                <p class="text-sm text-left">
                  {{ journal.depositContact }}
                </p>
              </td>
              <td class="px-6 py-3 whitespace-nowrap font-light text-sm text-left">
                {{ journal.user.name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="w-11/12">
        <p class="text-center my-10">
          No Transaction Journals for {{date  }}
        </p>
      </div>
    </div>
  </div>
</template>




<script>
import {
  getJournalsByDate,
} from "../../services/journalService";

export default {
  created() {
    let date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day;
    this.date = today;

    getJournalsByDate(this.date).then(res=>{
      this.journals = res.data
    })
  },
  data() {
    return {
      journals: [],
      date: new Date(),
    };
  },
  methods: {
 
    fetchTranscationDetailsByDate() {
      getJournalsByDate(this.date).then((res) => {
        this.journals = res.data
      });
    },
  },
};
</script>