const vm = new Vue({
  el: "#app",
  data: {
    show: false,
    times: [],
    animateFrame: 0,
    nowTime: 0,
    diffTime: 0,
    startTime: 0,
    isRunning: false
  },
  methods: {
    reload: function(event) {
      window.location.reload();
    },
    // 現在時刻から引数に渡した数値を startTime に代入
    setSubtractStartTime: function(time) {
      var time = typeof time !== "undefined" ? time : 0;
      this.startTime = Math.floor(performance.now() - time);
    },
    // タイマーをスタートさせる
    startTimer: function() {
      // loop()内で this の値が変更されるので退避
      var vm = this;
      vm.setSubtractStartTime(vm.diffTime);
      // ループ処理
      (function loop() {
        vm.nowTime = Math.floor(performance.now());
        vm.diffTime = vm.nowTime - vm.startTime;
        vm.animateFrame = requestAnimationFrame(loop);
      })();
      vm.isRunning = true;
    }
  },
  computed: {
    // 分数を計算 (60分になったら0分に戻る)
    minutes: function() {
      return Math.floor(this.diffTime / 1000 / 60) % 60;
    },
    // 秒数を計算 (60秒になったら0秒に戻る)
    seconds: function() {
      return Math.floor(this.diffTime / 1000) % 60;
    }
  },
  filters: {
    // ゼロ埋めフィルタ 引数に桁数を入力する
    // ※ String.prototype.padStart() は IEじゃ使えない
    zeroPad: function(value, num) {
      var num = typeof num !== "undefined" ? num : 2;
      return value.toString().padStart(num, "0");
    }
  }
});

$(".left_timer").hover(
  function() {
    $(".main_img").addClass("main_img_a");
  },
  function() {
    $(".main_img").removeClass("main_img");
  }
);

$(".right_timer").hover(
  function() {
    $(".main_img_a").addClass("main_img");
  },
  function() {
    $(".main_img_a").removeClass("main_img_a");
  }
);
