/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Procedural Ambient Romantic Synth Engine using Web Audio API
class AmbientSynthEngine {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: any = null;
  private delayNode: DelayNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private masterGain: GainNode | null = null;
  private chordIndex: number = 0;

  // Cinematic chords (frequency lists for notes)
  // Fmaj7, Cmaj7, Am7, G6/Em7
  private chords = [
    [174.61, 220.00, 261.63, 329.63, 440.00], // F3, A3, C4, E4, A4 (Fmaj7/9)
    [130.81, 196.00, 246.94, 329.63, 392.00], // C3, G3, B3, E4, G4 (Cmaj7)
    [110.00, 164.81, 220.00, 261.63, 329.63], // A2, E3, A3, C4, E4 (Am7)
    [98.00,  146.83, 196.00, 246.94, 293.66]  // G2, D3, G3, B3, D4 (G6)
  ];

  constructor() {}

  public init() {
    if (this.audioCtx) return;
    
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    this.audioCtx = new AudioContextClass();
    
    // Create master volume node
    this.masterGain = this.audioCtx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.45, this.audioCtx.currentTime + 1.5);

    // Create a beautiful lowpass filter to keep it warm and deep (cinematic feel)
    this.filterNode = this.audioCtx.createBiquadFilter();
    this.filterNode.type = "lowpass";
    this.filterNode.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    this.filterNode.Q.setValueAtTime(1, this.audioCtx.currentTime);

    // Create delay line for space and depth (reverb simulation)
    this.delayNode = this.audioCtx.createDelay(2.0);
    this.delayNode.delayTime.setValueAtTime(0.6, this.audioCtx.currentTime);

    const feedbackGain = this.audioCtx.createGain();
    feedbackGain.gain.setValueAtTime(0.5, this.audioCtx.currentTime);

    // Wire up delay feedback loop
    this.delayNode.connect(feedbackGain);
    feedbackGain.connect(this.delayNode);

    // Connect nodes: masterGain -> filter -> delay & direct -> destination
    this.masterGain.connect(this.filterNode);
    this.filterNode.connect(this.audioCtx.destination);
    this.filterNode.connect(this.delayNode);
    this.delayNode.connect(this.audioCtx.destination);
  }

  // Play a single soft, bell-like plucking note
  private playNote(frequency: number, startTime: number, duration: number) {
    if (!this.audioCtx || !this.masterGain) return;

    // Create oscillator (warm triangle wave)
    const osc = this.audioCtx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(frequency, startTime);

    // Add a tiny bit of sine detune to make it richer
    const oscDetune = this.audioCtx.createOscillator();
    const detuneGain = this.audioCtx.createGain();
    oscDetune.type = "sine";
    oscDetune.frequency.setValueAtTime(0.12, startTime); // ultra-slow LFO
    detuneGain.gain.setValueAtTime(3.5, startTime);
    oscDetune.connect(detuneGain);
    detuneGain.connect(osc.detune);

    // Individual note envelope generator
    const noteGain = this.audioCtx.createGain();
    noteGain.gain.setValueAtTime(0, startTime);
    // Slow luxurious attack
    noteGain.gain.linearRampToValueAtTime(0.08, startTime + 0.4);
    // Slow exponential decay
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Connect oscillator
    osc.connect(noteGain);
    noteGain.connect(this.masterGain);

    oscDetune.start(startTime);
    osc.start(startTime);

    oscDetune.stop(startTime + duration);
    osc.stop(startTime + duration);
  }

  // Start the infinite automatic arpeggiation generator loop
  private startScheduler() {
    if (!this.audioCtx) return;

    let nextChordTime = this.audioCtx.currentTime;

    const scheduleLoop = () => {
      if (!this.isPlaying || !this.audioCtx) return;

      const chord = this.chords[this.chordIndex];
      // Randomize velocity a tiny bit for organic human feel
      const playStagger = 0.18; // Seconds between notes of the chord

      chord.forEach((freq, index) => {
        // Slow bell-like chime triggers slightly staggered
        const startTime = nextChordTime + index * playStagger + (Math.random() * 0.05);
        const duration = 6.0 + Math.random() * 2.0;
        this.playNote(freq, startTime, duration);
      });

      // Slowly sweep the filter frequency up and down for ocean-wave synth breath
      const sweepFrequency = 600 + Math.sin(this.audioCtx.currentTime * 0.05) * 300;
      this.filterNode?.frequency.setValueAtTime(sweepFrequency, nextChordTime);

      // Advance chord
      this.chordIndex = (this.chordIndex + 1) % this.chords.length;

      // Plan next chord in 7.5 seconds
      nextChordTime += 7.5;
      
      const delayMs = (nextChordTime - this.audioCtx.currentTime) * 1000;
      this.timerId = setTimeout(scheduleLoop, Math.max(100, delayMs));
    };

    scheduleLoop();
  }

  public play() {
    this.init();
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    
    if (this.isPlaying) return;
    this.isPlaying = true;
    
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.audioCtx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.45, this.audioCtx.currentTime + 2.0);
    }
    
    this.startScheduler();
  }

  public pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.cancelScheduledValues(this.audioCtx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.audioCtx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 1.5);
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const ambientAudio = new AmbientSynthEngine();
