<template>
    <article>
        <section class="section">
            <div class="container">
                <div class="columns">
                  <div class="column is-8 is-primary has-text-dark m1">
                    <h1 class="h1">SEE ART LIVE 🎨</h1>
                        <p class="p"><a href=""><img src="https://steemit-production-imageproxy-thumbnail.s3.amazonaws.com/DQmdnnCcukhq9CAri1LaY9NGERrCNdexdwahAnLo8YFZ52K_1680x8400" style="height:18px;"/> Donate ETH</a><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><a href=""><img src="https://steemit-production-imageproxy-thumbnail.s3.amazonaws.com/DQmc8NTQJp8vubgKHs2DgFiRx9ie2BZRrpzfj99Nh6PnUn9_1680x8400" style="height:18px;"/> Donate BTC</a></p>

                  </div>
                </div>
                <div class="columns">
                  <div class="column is-primary has-text-dark m1">
                         <GmapMap style="width: 100%; height:50vh; margin-bottom:20px;" :zoom="19" :center="{lat: this.currentLocation.lat, lng: this.currentLocation.lng}" ref="map">
                            <GmapMarker v-for="(marker, index) in markers" :key="index" :position="marker.latLng"/>
                         </GmapMap>
                  </div>
                </div>
                <div class="columns">
                  <div class="column is-8 is-primary has-text-dark m1">
                    <h3 class="h3"><span class="date">wHATS oN nOW</span><span class="time"></span></h3>
                    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
                  </div>
                  <div class="column is-primary has-text-dark m1">
                     <h2 class="h2">Name of Location/Gallery</h2>
                     <h3 class="h3">221 S Grand Ave, Los Angeles, CA 90012</h3>
                     <h3 class="h3">Additional Location Info:</h3>
                     <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
                     <div class="background-image" style="background-image:url(https://via.placeholder.com/1920x1920/a5s/000000?text=location-image);"></div>
                     <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
                  </div>
                </div>
            </div>
        </section>
    </article>
</template>

<script>
// import store from '../store'
import { gmapApi } from "vue2-google-maps";
import { loaded } from "vue2-google-maps";

export default {
  name: "Homepage",
  props: ["arr"],
  computed: {
    google: gmapApi
  },
  data() {
    return {
      markers: [],
      currentLocation: {
        lat: 0,
        lng: 0
      },
      place: null
    };
  },
  description: `
  In which a random set of points are generated, and
  the bounds of the map are changed to fit the points
  `,
  watch: {
    markers(markers) {
      if (markers.length > 2) {
        const bounds = new google.maps.LatLngBounds();
        for (let m of markers) {
          bounds.extend(m.latLng);
        }
        this.$refs.map.fitBounds(bounds);
      }
    }
  },
  methods: {
    codeAddress: function(address) {
      var geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          this.currentLocation.lat = results[0].geometry.location.lat();
          this.currentLocation.lng = results[0].geometry.location.lng();
        }
      });
    },
    getRandomArbitrary: function(min, max) {
      return Math.random() * (max - min) + min;
    },
    color: function() {
      return (
        "#" +
        Math.random()
          .toString(16)
          .slice(2, 8)
          .toUpperCase()
      );
    },
    block: function(ele) {
      const e = document.getElementById(ele);
      const r = this.getRandomArbitrary(1.3432, 70.6546);
      e.style.transform = "rotate3d(1, 1, 1, " + r + "deg)";
      e.style.webkitTransform = "rotate3d(1, 1, 1, " + r + "deg)";
      e.style.backgroundColor = this.color();
    },
    generate() {
      const spread = Math.random() + 0.001;
      this.center = {
        lat: 1.38 + (Math.random() - 0.5) * spread,
        lng: 103.8 + (Math.random() - 0.5) * spread
      };
      this.markers = _.range(30).map(m => ({
        latLng: {
          lat: this.center.lat + (Math.random() - 0.5) * spread,
          lng: this.center.lng + (Math.random() - 0.5) * spread
        }
      }));
    }
  },
  mounted() {
    // this.block('block')
    loaded.then(() => {
      this.codeAddress("221 S Grand Ave, Los Angeles, CA 90012");
    });
  }
};
</script>

<style lang="scss" scoped>
.background-image {
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  padding-bottom: 56.7%;
  width: 100%;
  margin-bottom: 20px;
}
div {
  position: relative;
  .content-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  overflow: hidden;
  #wrap {
    #block {
    }
  }
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>