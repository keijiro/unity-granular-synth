#pragma strict

var clip : AudioClip;

var step = 2;
var grain = 100;
var grainStep = 20;

private var tick = 0;
private var samples : float[];
private var interval = 0;

function Awake() {
	samples = new float[clip.samples * clip.channels];
	clip.GetData(samples, 0);
}

function OnAudioFilterRead(data : float[], channels : int) {
    for (var i = 0; i < data.Length; i += 2) {
        data[i] = samples[tick];
        data[i + 1] = samples[tick + 1];
        interval--;
        if (interval <= 0) {
	        interval = grain;
	        tick += 2 * grainStep;
        } else {
	        tick += 2 * step;
        }
        while (tick >= samples.Length) {
        	tick -= samples.Length;
        }
        while (tick < 0) {
        	tick += samples.Length;
        }
    }
}
