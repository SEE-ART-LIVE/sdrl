<template>
<div></div>
</template>

<script>
// import store from '../store'
import { gmapApi } from "vue2-google-maps";
import { loaded } from "vue2-google-maps";

export default {
  name: "EventCard",
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