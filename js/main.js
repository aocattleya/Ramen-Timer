const vm = new Vue({
  el: "#app",
  data: {
    show: false,
    isLeft: false,
    isRight: true,
    timer: null,
    pickTime: null,
    totalTime: null,
    resetButton: false
  },
  methods: {
    rotate_left: function() {
      this.isLeft = true;
      this.isRight = false;
    },
    rotate_right: function() {
      this.isLeft = false;
      this.isRight = true;
    },
    reload: function(event) {
      window.location.reload();
    },
    treeMin: function() {
      this.pickTime = 3 * 60;
      this.totalTime = this.pickTime;
    },
    fiveMin: function() {
      this.pickTime = 5 * 60;
      this.totalTime = this.pickTime;
    },
    startTimer: function() {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
    },
    stopTimer: function() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
    },
    resetTimer: function() {
      this.totalTime = this.pickTime;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
    },
    padTime: function(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countdown: function() {
      if (this.totalTime >= 1) {
        this.totalTime--;
      } else {
        this.totalTime = 0;
        this.resetTimer();
        swal("Complete!!", "", "success");
      }
    }
  },
  computed: {
    minutes: function() {
      const minutes = Math.floor(this.totalTime / 60);
      return minutes;
    },
    seconds: function() {
      const seconds = this.totalTime - this.minutes * 60;
      return this.padTime(seconds);
    }
  }
});
