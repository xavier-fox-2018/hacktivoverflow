<template>
<div>
   <LoginRegister></LoginRegister>
   <Coder></Coder>
   <Footer></Footer>
</div>   
</template>

<script>
// @ is an alias to /src
import LoginRegister from '@/components/LoginRegister'
import Coder from '@/components/Coder'
import Footer from '@/components/Footer'

export default {
  components: {
    LoginRegister,
    Coder
  }
}
</script>
