#pragma strict

var position = 0.0;
var width = 1.0;

function Update () {
	transform.localPosition.x = 3.4 * (position + width / 2) - 1.7;
	transform.localScale.x = 3.4 * width;
}