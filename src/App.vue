<template>
  <nav>
    <div class="nav-item-wrapper">
      <router-link to="/">Home</router-link> |
      <router-link to="/posts">Posts</router-link> 
    </div>
  </nav>
  <router-view/>
</template>

<script>
import { provide } from 'vue'
import store from '@/store'

export default {
  setup() {
    provide('store', store)
  },
}
</script>


<style lang="scss">
$tablet-width: 768px;
$desktop-width: 1024px;
$large-desktop-width: 1296px;

@mixin phone {
  @media (max-width: #{$tablet-width}) {
    @content;
  }
}

@mixin tablet {
  @media (min-width: #{$tablet-width}) and (max-width: #{$desktop-width}) {
    @content;
  }
}

@mixin desktop {
  @media (min-width: #{$desktop-width}) and (max-width: #{$large-desktop-width}) {
    @content;
  }
}

@mixin largeDesktop {
  @media (min-width: #{$large-desktop-width}) {
    @content;
  }
}

@include phone {
  #post-wrapper,
  .getPosts .posts .post-preview-wrapper {
    width: 90vw
  }
}

@include tablet {
  #post-wrapper,
  #app .posts .post-preview-wrapper  {
    width: 80vw
  }
}

@include desktop {
  #post-wrapper,
  .posts .post-preview-wrapper  {
    width: 65vw;
  }
}

@include largeDesktop {
  #post-wrapper,
  .post-preview-wrapper {
    width: 45vw;
  }
}


#app {
  font-family: 'Roboto';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 90px;
}

body {
  margin: 0;
}

nav {
  padding: 30px 0;
  background-color: #34495E;
  position: fixed;
  width: 100vw;
  top: 0;
  text-align: center;
  border-bottom: 2px solid aliceblue;
  z-index: 999;
  .nav-item-wrapper {
    display: flex;
    justify-content: center;
    a {
      font-size: 16px;
      font-weight: bold;
      color: #949da7;
      text-decoration: none;
      text-align: center;
      margin-right: 8px;
  
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
