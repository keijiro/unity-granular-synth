#pragma strict

var clip : AudioClip;
var resolution = 256;

private var meshFilter : MeshFilter;

function Awake () {
	meshFilter = GetComponent.<MeshFilter>();
	meshFilter.mesh = new Mesh();
}

function Start () {
	var samples = new float[clip.channels * clip.samples];
	clip.GetData(samples, 0);

	var vertices = new Vector3[resolution];
	for (var i = 0; i < resolution; i++) {
		var level = samples[samples.Length * i / resolution];
		vertices[i] = Vector3(3.4 / resolution * i - 1.7, level / 2, 0);
	}
	meshFilter.mesh.vertices = vertices;
	
	var indices = new int[resolution];
	for (i = 0; i < resolution; i++) {
		indices[i] = i;
	}
	meshFilter.mesh.SetIndices(indices, MeshTopology.LineStrip, 0);
}
