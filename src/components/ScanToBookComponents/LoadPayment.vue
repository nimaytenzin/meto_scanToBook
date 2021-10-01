<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div>
      <img src="../../assets/meto.png" alt="" width="100" />
    </div>
    <div>
      <h1 class="text-3xl text-gray-500 text-center">
        Loading Payment Gateway
      </h1>
    </div>
    <div
      class="
        p-6
        mx-auto
        bg-white
        rounded-xl
        shadow-md
        min-w-6/12
        mt-7
        text-lg
        items-center
        space-x-4
      "
    >
      <table>
        <tr>
          <td class="pr-2">Booking ID</td>
          <td>{{ booking.id }}</td>
        </tr>

        <tr>
          <td class="pr-2">Amount</td>
          <td>{{ booking.amount }}</td>
        </tr>
      </table>

      <form
        method="post"
        action=" http://uatbfssecure.rma.org.bt/BFSSecure/makePayment"
      >
        <input type="hidden" name="bfs_msgType" value="AR" />
        <input
          type="hidden"
          name="bfs_benfTxnTime"
          v-model="hiddenFormVal.bfs_msgType"
        />
        <input
          type="hidden"
          name="bfs_orderNo"
          v-model="hiddenFormVal.bfs_orderNo"
        />
        <input
          type="hidden"
          name="bfs_benfId"
          v-model="hiddenFormVal.bfs_benfId"
        />
        <input
          type="hidden"
          name="bfs_benfBankCode"
          v-model="hiddenFormVal.bfs_benfBankCode"
        />
        <input
          type="hidden"
          name="bfs_txnCurrency"
          v-model="hiddenFormVal.bfs_txnCurrency"
        />
        <input
          type="hidden"
          name="bfs_txnAmount"
          v-model="hiddenFormVal.bfs_txnAmount"
        />
        <input
          type="hidden"
          name="bfs_remitterEmail"
          v-model="hiddenFormVal.bfs_remitterEmail"
        />
        <input
          type="hidden"
          name="bfs_paymentDesc"
          v-model="hiddenFormVal.bfs_paymentDesc"
        />
        <input
          type="hidden"
          name="bfs_version"
          v-model="hiddenFormVal.bfs_version"
        />
        <input
          type="hidden"
          name="bfs_checkSum"
          v-model="hiddenFormVal.bfs_checkSum"
        />

        <button id="submitBtn" type="submit"></button>
      </form>
    </div>

    <div class="inline-flex mt-8">
      <button
        class="
          bg-gray-100
          hover:bg-gray-400
          text-gray-500
          hover:text-white
          font-bold
          py-2
          px-4
          rounded-l
        "
        @click="previous()"
      >
        Prev
      </button>

      <button
        class="
          bg-gray-100
          hover:bg-gray-400
          text-gray-500
          hover:text-white
          font-bold
          py-2
          px-4
          rounded-r
        "
        @click="next()"
      >
        Confirm Payment >
      </button>
    </div>
  </div>
</template>

<script>
import { getChecksum } from "../../services/bookingServices";
import { confirmPayment } from "../../services/paymentServices";
export default {
  created() {
    if (this.$store.state.origin === "") {
      this.$router.push("/book");
    }
    getChecksum(this.$store.state.scanBookingId).then((res) => {
      if (res.status === 200) {
        this.booking = res.data.booking;
        this.hiddenFormVal.bfs_msgType = "AR";
        this.hiddenFormVal.bfs_debitAuthCode = "00";
        this.hiddenFormVal.bfs_benfTxnTime = res.data.bfsTxnTime;
        this.hiddenFormVal.bfs_orderNo = res.data.booking.id.toString();
        this.hiddenFormVal.bfs_benfId = res.data.benBankDetails.bfs_benfId;
        this.hiddenFormVal.bfs_benfBankCode =res.data.benBankDetails.bfs_benfBankCode;
        this.hiddenFormVal.bfs_txnCurrency = res.data.benBankDetails.bfs_txnCurrency;
        this.hiddenFormVal.bfs_txnAmount = res.data.booking.amount.toFixed(2).toString();
        this.hiddenFormVal.bfs_remitterEmail = "customer@gmail.com";
        this.hiddenFormVal.bfs_paymentDesc = "SeatBooking";
        this.hiddenFormVal.bfs_version = "1.0";
        this.hiddenFormVal.bfs_checkSum = res.data.checksum;
        console.log(this.hiddenFormVal, "form data");

          setTimeout(() => {
          // this.$router.push(`/book/eticket/${this.hiddenFormVal.bfs_orderNo}`)
          document.getElementById("submitBtn").click();
        }, 1000);
      } else {
        this.$toast.show("Network Error", {
          position: "top",
          type: "error",
        });
      }
    });
  },
  data() {
    return {
      booking: {},
      hiddenFormVal: {
        bfs_msgType: null,
        bfs_benfTxnTime: null,
        bfs_orderNo: null,
        bfs_benfId: null,
        bfs_benfBankCode: null,
        bfs_txnCurrency: null,
        bfs_txnAmount: null,
        bfs_remitterEmail: null,
        bfs_paymentDesc: null,
        bfs_version: null,
        bfs_checkSum: null,
      },
    };
  },

  // mounted() {
  //   console.log(this.hiddenFormVal, "TO BE SENT TO PG");
  //   this.sendForm()
  // },

  methods: {
    previous() {
      this.$router.push(`/book/Bookings`);
    },
    next() {
      // confirmPayment(this.hiddenFormVal).then((res) => {
      //   if (res.status === 200) {
      //     this.$router.push(`/book/eticket/${this.hiddenFormVal.bfs_orderNo}`);
      //   } else {
      //     this.$toast.show("Network error try again", {
      //       position: "top",
      //       type: "error",
      //     });
      //   }
      // });
    },

    sendForm() {
      setTimeout(() => {
        // this.$router.push(`/book/eticket/${this.hiddenFormVal.bfs_orderNo}`)
        document.getElementById("submitBtn").click();
      }, 1000);
    },
  },
};
</script>