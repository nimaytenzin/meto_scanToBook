<template>
  <div
    class="min-h-screen flex flex-col items-center justify-start sm:ml2 sm:mr2"
  >
    <div>
      <img src="../../assets/meto.png" alt="Meto Transport" width="100" />
    </div>
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-3xl text-gray-500 text-center font-nunito">
        Admin Dashboard
      </h1>
      <h1 class="text-3xl text-gray-500 text-center mt-3">
        ༅༅ ། མེ་ཏོག སྐྱེལ་འདྲེན ཞབས་ཏོག།
      </h1>
    </div>

   
    <div
      class="
        p-7
        
        font-light
        mx-auto
        bg-white
        text-gray-800
        rounded-xl
        shadow-md
        min-w-6/12
        mt-7
        items-center
        break-words
        mr-4
        ml-4
        
        space-x-4
      "
    >
     Meto Transport Service, initially popularly known as Karma Transport Service
     was established in the 2003 with two (2) unit of Japanese make Coaster Bus between Thimphu – Phuentsholing 
     route. The late proponent/Managing Director (Late Mr. Pema Thinley), with his sheer hard work, dedication 
     and commitment has enhanced the growth of the Company within the short period of time.

By the year 2010, Meto Transport Service became as one of the biggest passenger bus transport company with
 best services as certified many a times by the Road Safety & Transport Authority. Another big milestone for 
 Meto Transport Service was introduction of Bhutan Transport Service on Phuentsholing – Kolkata (India) route 
 in the year 2009. Indeed a big success and a proud moment for a private company “Meto Transport Service” for
  having being approved on the route beyond our border to one of the state India. As of 2021, Meto Transport 
  Service still stands big with one of the highest numbers of fleets operating to varied region throughout 
  and beyond the country. Meto Transport Company aims to grow furthermore bigger with high quality buses,
   premium and professional services and customer care.
    </div>


    
  </div>

 
</template>

<script>
export default {
  data() {
    return {
      origins: [
        {
          dzo:"ཐིམ་ཕུ",
          eng:'Thimphu'
        },
        {
          dzo:'སྤ་རོ',
          eng:'Paro'
        }],
      originSelected: {
          dzo:"ཐིམ་ཕུ",
          eng:'Thimphu'
        },
    };
  },
  methods: {
    addOrigin(val) {

      this.$store.commit("addOrigin", val);
      this.$router.push('/book/destination')
    }
  },
};
</script>