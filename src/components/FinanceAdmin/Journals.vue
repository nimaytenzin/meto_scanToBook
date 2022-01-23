<template>
  <div class="min-h-screen flex flex-col items-center">
    <div class="flex flex-col justify-center items-center w-full">
      <h1 class="text-3xl text-center text-gray-500 font-nunito mx-4 my-6">
        Jounral Transcations Today
      </h1>

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
                <p class="text-sm text-center">
                  Nu {{ journal.amount }}
                </p>
              
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

import { getAllJournalsToday } from "../../services/journalService"

export default {
  created() {
    this.fetchData();
  },
  data() {
    return {
      journals:[]
    };
  },
  methods: {
    fetchData() {
      getAllJournalsToday().then(res=>{
        this.journals = res.data
      })
    },
  },
};
</script>