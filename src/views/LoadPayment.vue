<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    
    <div
      class="
        p-6
        bg-metoPrimary-600
        text-gray-100
        rounded-xl
        shadow-md
        min-w-6/12
       
        text-lg
        items-center
       
        md:max-w-xs
      "
    >
    <div>
      <h1 class="text-sm text-gray-50 text-center">
        Redirecting to RMA Secured Payment Gateway
      </h1>
    </div>
      <div class="text-sm my-1">
        <p>
        Your Booking ID: {{ booking.id }}
      </p>
      <p>
        Total: Nu. {{booking.amount  }}
      </p>
      </div>

        <div class="w-full flex-col pt-2 border-t mt-4">
            <p class=" text-sm ">
              Meto Transport Service
            </p>
            <p class=" text-sm ">
              Ensuring Safety, Reliability and Comfort till your Destination
            </p>
           
          </div>
    

      <form
        method="post"
        action="https://bfssecure.rma.org.bt/BFSSecure/makePayment"
      >
        <input type="hidden" name="bfs_msgType" value="AR" />
        <input
          type="hidden"
          name="bfs_benfTxnTime"
          v-model="hiddenFormVal.bfs_benfTxnTime"
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

 
  </div>
</template>

<script>
import { getChecksum } from "../services/bookingServices";
export default {
  created() {
    if(!this.$store.state.origin){
      this.$router.push("/")
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
        this.hiddenFormVal.bfs_txnAmount = res.data.booking.amount;
        this.hiddenFormVal.bfs_remitterEmail = "customer@gmail.com";
        this.hiddenFormVal.bfs_paymentDesc = "SeatBooking";
        this.hiddenFormVal.bfs_version = "1.0";
        this.hiddenFormVal.bfs_checkSum = res.data.checksum;
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
   
};
</script>