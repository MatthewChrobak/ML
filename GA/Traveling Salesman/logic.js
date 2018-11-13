var nodes = [];
var SCREEN_WIDTH = 1000;
var SCREEN_HEIGHT = 750;
var NODE_COUNT = 0;

function rand(lb, ub) {
    return lb + (ub - lb) * Math.random();
}

function randInt(lb, ub) {
    return Math.floor(rand(lb, ub));
}

function CreateRandomNode()
{
    var x = rand(0, SCREEN_WIDTH);
    var y = rand(0, SCREEN_HEIGHT);

    return [x, y];
}

function CreateRandomPath()
{
    var allIndexes = [];
    for (var ii = 0; ii < nodes.length; ii++) {
        allIndexes[ii] = ii;
    }
    var newMember = [];
    while (allIndexes.length != 0) {
        var randomIndex = randInt(0, allIndexes.length - 1);
        newMember[newMember.length] = allIndexes[randomIndex];
        allIndexes.splice(randomIndex, 1);
    }
    return newMember;
}

function GetDistance(node1, node2)
{
    var xDif = node1[0] - node2[0];
    var yDif = node1[1] - node2[1];
    return Math.sqrt(xDif*xDif + yDif*yDif);
}

function Fitness(sequence = [])
{
    var totalDistance = 0;
    for (var i = 0; i < sequence.length; i++) {
        var index1 = i;
        var index2 = (i + 1) % sequence.length;

        totalDistance += GetDistance(nodes[sequence[index1]], nodes[sequence[index2]]);
    }
    return totalDistance;
}

function Update(order)
{
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.beginPath();
    for (var i = 0; i < order.length; i++) {
        var nextId = (i + 1) % order.length;
        ctx.moveTo(nodes[order[i]][0], nodes[order[i]][1]);
        ctx.lineTo(nodes[order[nextId]][0], nodes[order[nextId]][1]);
        ctx.stroke();
    }

    ctx.fillStyle = "rgb(11, 150, 201)";
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var x = node[0];
        var y = node[1];
        var radius = 7;
        ctx.fillRect(x - radius, y - radius, 2 * radius, 2 * radius);
    }
}