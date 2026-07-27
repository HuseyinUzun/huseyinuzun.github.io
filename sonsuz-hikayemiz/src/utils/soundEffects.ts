/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class SoundEffectsEngine {
  private audioCtx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {}

  private initCtx() {
    if (this.audioCtx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.audioCtx = new AudioContextClass();
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
  }

  // Play a soft magic chime sweep (ideal for stars, heart constellation, or releasing sky lanterns)
  public playMagic() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50]; // C5 to C6 chord

    notes.forEach((freq, idx) => {
      const osc = this.audioCtx!.createOscillator();
      const gain = this.audioCtx!.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.04, now + idx * 0.08 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.8);

      osc.connect(gain);
      gain.connect(this.audioCtx!.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.95);
    });
  }

  // Play a magical warm train whistle for the Memory train
  public playTrainWhistle() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;

    // A train whistle is composed of multiple close harmonizing frequencies (usually minor chord: like 330Hz and 370Hz)
    const frequencies = [329.63, 349.23, 440.00]; 

    frequencies.forEach((freq) => {
      const osc = this.audioCtx!.createOscillator();
      const gain = this.audioCtx!.createGain();

      osc.type = "sawtooth"; // Gives a richer brassy tone
      osc.frequency.setValueAtTime(freq, now);

      // Lowpass filter to make it soft and warm, not harsh
      const filter = this.audioCtx!.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(600, now);

      gain.gain.setValueAtTime(0, now);
      // Soft start
      gain.gain.linearRampToValueAtTime(0.03, now + 0.15);
      gain.gain.setValueAtTime(0.03, now + 0.6);
      // Soft end
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx!.destination);

      osc.start(now);
      osc.stop(now + 1.3);
    });
  }

  // Play a beautiful bird chirping sound (gorgeous for the Sakura Garden scene)
  public playBirdChirp() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;

    const playSingleChirp = (delay: number) => {
      const osc = this.audioCtx!.createOscillator();
      const gain = this.audioCtx!.createGain();

      osc.type = "sine";
      
      // Chirp is a rapid exponential pitch sweep upward
      osc.frequency.setValueAtTime(1200, now + delay);
      osc.frequency.exponentialRampToValueAtTime(2800, now + delay + 0.12);

      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.015, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.12);

      osc.connect(gain);
      gain.connect(this.audioCtx!.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.13);
    };

    // Staggered double chirp "twit-twit"
    playSingleChirp(0);
    playSingleChirp(0.14);
  }

  // Play a soft wind blow sound (ideal for changing scenes or sky lanterns)
  public playWindBreeze() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    
    // Create custom noise buffer for a beautiful wind sweep
    const bufferSize = this.audioCtx.sampleRate * 2.0; // 2 seconds
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = this.audioCtx.createBufferSource();
    noiseNode.buffer = buffer;

    const filter = this.audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.setValueAtTime(5.0, now);
    
    // Modulate filter frequency to sound like blowing wind
    filter.frequency.setValueAtTime(350, now);
    filter.frequency.exponentialRampToValueAtTime(750, now + 0.8);
    filter.frequency.exponentialRampToValueAtTime(300, now + 1.8);

    const gain = this.audioCtx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.02, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    noiseNode.start(now);
    noiseNode.stop(now + 2.0);
  }

  // Play a cute classic car horn beep-beep "düt düt!"
  public playCarHorn() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const playBeep = (delay: number, duration: number) => {
      const frequencies = [400, 480]; // Dual-tone classic horn chord
      frequencies.forEach((freq) => {
        const osc = this.audioCtx!.createOscillator();
        const gain = this.audioCtx!.createGain();

        osc.type = "triangle"; // Warm brassy horn tone
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0, now + delay);
        gain.gain.linearRampToValueAtTime(0.04, now + delay + 0.02);
        gain.gain.setValueAtTime(0.04, now + delay + duration - 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);

        osc.connect(gain);
        gain.connect(this.audioCtx!.destination);

        osc.start(now + delay);
        osc.stop(now + delay + duration + 0.05);
      });
    };

    // "Düt düt!" double beep
    playBeep(0, 0.12);
    playBeep(0.18, 0.12);
  }
}

export const sfx = new SoundEffectsEngine();
