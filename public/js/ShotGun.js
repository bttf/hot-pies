function ShotGun() {
  this.cock = new Audio('audio/cock.ogg');
  this.cock.preload = "auto";

  this.blast = new Audio('audio/blast.ogg');
  this.blast.preload = "auto";

  this.isCocked = false;
}

ShotGun.prototype.key_down = function(e) {
  switch(e.keyCode) {
    case 32:
      if (!this.isCocked) {
        if (!this.cock.paused) {
          this.cock.pause();
          this.cock.currentTime = 0;
        }
        this.cock.play();
        this.isCocked = true;
      }
      break;
  }
};

ShotGun.prototype.mouse_down = function(e) {
  if (this.isCocked) {
    if (!this.blast.paused) {
      this.blast.pause();
      this.blast.currentTime = 0;
    }
    this.blast.play();
    this.isCocked = false;
  }
};
