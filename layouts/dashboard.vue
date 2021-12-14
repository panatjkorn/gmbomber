<template>
<!-- bg-gradient-to-b from-black via-black to-red-400 -->
  <div class="font-kanit">
    <div class="backgroundImage font-kanit">
      <Navbar />
      <div class="wrapper px-8">
        <div class="wrapper-box">
          <div class="content p-8">
            <nuxt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return { formattedMenu: '' };
  },
  // watch: {
  //   $route() {
  //     this.formattedMenu = $h.toRaw(this.sideMenu());
  //   },
  // },
  mounted() {
    // document.body.classList.add('main');
    // document.body.classList.remove('error-page');
    // document.body.classList.remove('login');
    // this.formattedMenu = $h.toRaw(this.sideMenu());
  },
  methods: {
    // sideMenu() {
    //   return nestedMenu(this.$store.state.menu.menu, this.$router.currentRoute);
    // },
    // linkTo,
    // enter(el, done) {
    //   return this.$velocity(
    //     el,
    //     'slideDown',
    //     { duration: 300 },
    //     { complete: done }
    //   );
    // },
    // leave(el, done) {
    //   return this.$velocity(
    //     el,
    //     'slideUp',
    //     { duration: 300 },
    //     { complete: done }
    //   );
    // },
    // router() {
    //   return this.$nuxt.$router;
    // },
  },
};
</script>

<style></style>
