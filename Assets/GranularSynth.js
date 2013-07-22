#pragma strict

var clip : AudioClip;

var playbackSpeed = 1;
var grainSize = 1000;
var grainStep = 1;

var guiPlaybackSpeed = 1.0;
var guiGrainSize = 1000.0;
var guiGrainStep = 1.0;

private var sampleLength : int;
private var samples : float[];

private var position = 0;
private var interval = 0;

function Awake() {
	sampleLength = clip.samples;
	samples = new float[clip.samples * clip.channels];
	clip.GetData(samples, 0);
}

function Update() {
	var cursor : PositionView = FindObjectOfType(PositionView);
	cursor.position = 1.0 / sampleLength * position;
	cursor.width = 1.0 / sampleLength * interval * playbackSpeed;
}

function OnGUI() {
	GUILayout.BeginArea(Rect(16, 16, Screen.width - 32, Screen.height - 32));
	GUILayout.FlexibleSpace();
	GUILayout.Label("Playback Speed: " + playbackSpeed);
	guiPlaybackSpeed = GUILayout.HorizontalSlider(guiPlaybackSpeed, -4.0, 4.0);
	GUILayout.FlexibleSpace();
	GUILayout.Label("Grain Size: " + grainSize);
	guiGrainSize = GUILayout.HorizontalSlider(guiGrainSize, 2.0, 10000.0);
	GUILayout.FlexibleSpace();
	GUILayout.Label("Grain Step: " + grainStep);
	guiGrainStep = GUILayout.HorizontalSlider(guiGrainStep, -3000.0, 3000.0);
	GUILayout.FlexibleSpace();
	if (GUILayout.Button("RANDOMIZE!")) {
		guiPlaybackSpeed = Random.Range(-2.0, 2.0);
		guiGrainSize = Random.Range(200.0, 1000.0);
		guiGrainStep = Random.Range(-1500.0, 1500.0);
	}
	GUILayout.FlexibleSpace();
	GUILayout.EndArea();
	
	playbackSpeed = Mathf.RoundToInt(guiPlaybackSpeed);
	if (playbackSpeed == 0) playbackSpeed = 1;
	grainSize = Mathf.RoundToInt(guiGrainSize);
	grainStep = Mathf.RoundToInt(guiGrainStep);
}

function OnAudioFilterRead(data : float[], channels : int) {
    for (var i = 0; i < data.Length; i += 2) {
        data[i] = samples[position * 2];
        data[i + 1] = samples[position * 2 + 1];
        
        if (--interval <= 0) {
	        interval = grainSize;
	        position += grainStep;
        } else {
        	position += playbackSpeed;
        }
        
        while (position >= sampleLength) {
        	position -= sampleLength;
        }
        while (position < 0) {
        	position += sampleLength;
        }
    }
}