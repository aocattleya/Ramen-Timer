const vm = new Vue({
  el: "#app",
  data: {
    show: false,
    isLeft: false,
    isRight: true,
    timerOn: false,
    timerObj: null,
    sec: 0
  },
  methods: {
    reload: function(event) {
      window.location.reload();
    },
    rotate_left: function() {
      this.isLeft = true;
      this.isRight = false;
    },
    rotate_right: function() {
      this.isLeft = false;
      this.isRight = true;
    },
    count: function() {
      this.sec -= 1;
      if (this.sec <= 0) {
        this.complete();
      }
    },
    start: function() {
      let self = this;
      this.sec = 10;
      this.timerObj = setInterval(function() {
        self.count();
      }, 1000);
      this.timerOn = true;
    },
    stop: function() {
      clearInterval(this.timerObj);
      this.timerOn = false;
    },
    complete: function() {
      clearInterval(this.timerObj);
      this.timerOn = false;
      this.sec = "complete";
    }
  }
});
