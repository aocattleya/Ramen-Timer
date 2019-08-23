const vm = new Vue({
  el: "#app",
  data: {
    show: false,
    isLeft: false,
    isRight: true,

    formatTime: null, //ok?
    timerOn: false,
    timerObj: null,
    min: 59,
    sec: 59
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
      if (this.sec <= 0 && this.min >= 1) {
        this.min--;
        this.sec = 59;
      } else if (this.sec <= 0 && this.min <= 0) {
        this.complete();
      } else {
        this.sec--;
      }
    },
    start: function() {
      let self = this;
      this.timerObj = setInterval(function() {
        self.count();
      }, 1000);
      this.timerOn = true; //timerがOFFであることを状態として保持
    },
    stop: function() {
      clearInterval(this.timerObj);
      this.timerOn = false;
    },
    complete: function() {
      clearInterval(this.timerObj);
    },

    computed: {
      formatTime: function() {
        let timeStrings = [this.min.toString(), this.sec.toString()].map(
          function(str) {
            if (str.length < 2) {
              return "0" + str;
            } else {
              return str;
            }
          }
        );
        return timeStrings[0] + ":" + timeStrings[1];
      }
    }
  }
});
