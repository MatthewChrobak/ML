var population = []
var POPULATION_SIZE = 100;
var mutationProbability = 0;
var generation = 0;

var data;
var options = {
    title: '',
    curveType: 'function',
    legend: { position: 'bottom' },
    series: {
        0: {
          dataLabel: "Generation"
        }
      }
};

function FastLearn() {
    for (var i = 0; i < 999; i++) {
        KeepLearning(false);
    }
    KeepLearning();
}

function KeepLearning(draw)
{
    generation++;
    var potentialPopulation = Crossover(population);
    var mutatedGroup = [];


    // Mutations
    for (var i = 0; i < potentialPopulation.length; i++) {
        var mutated = false;
        var mutatedMember = []
        for (var ii = 0; ii < NODE_COUNT; ii++) {
            mutatedMember[ii] = potentialPopulation[i][ii];
        }
        for (var ii = 0; ii < NODE_COUNT; ii++) {
            if (Math.random() <= mutationProbability) {
                var index = i + randInt(0, (NODE_COUNT - 1) - i);
                var temp = mutatedMember[index];
                mutatedMember[index] = mutatedMember[ii];
                mutatedMember[ii] = temp;
                mutated = true;
            }
        }
        if (mutated) {
            mutatedGroup.push(mutatedMember);
        }
    }
    for (var i = 0; i < mutatedGroup; i++) {
        potentialPopulation.push(mutatedGroup[i]);
    }

    // Reshuffle.
    mutatedGroup = [];
    for (var i = 0; i < potentialPopulation.length; i++) {
        if (Math.random() <= mutationProbability) {
            var randomStart = randInt(1, NODE_COUNT - 1);
            var newMember = [];
            for (var ii = randomStart; ii < NODE_COUNT; ii++) {
                newMember.push(potentialPopulation[i][ii]);
            }
            for (var ii = 0; ii < randomStart; ii++) {
                newMember.push(potentialPopulation[i][ii]);
            }
            mutatedGroup.push(newMember);
        }
    }
    for (var i = 0; i < mutatedGroup.length; i++) {
        potentialPopulation.push(mutatedGroup[i]);
    }

    // Purify
    var duplicatesRemoved = {};
    for (var i = 0; i < potentialPopulation.length; i++) {
        duplicatesRemoved[potentialPopulation[i] + ""] = potentialPopulation[i];
    }
    potentialPopulation = Object.keys(duplicatesRemoved).map(function(key) { return duplicatesRemoved[key]; });


    // Order them all.
    var fitnessPopulation = [];
    for (var i = 0; i < potentialPopulation.length; i++) {
        fitnessPopulation.push([potentialPopulation[i], Fitness(potentialPopulation[i])]);
    }
    fitnessPopulation.sort(function(a, b) {
        return a[1] - b[1];
    });

    // Extract stats.
    var best = fitnessPopulation[0][1];
    var worst = fitnessPopulation[POPULATION_SIZE - 1][1];
    var total = 0;
    for (var i = 0; i < POPULATION_SIZE; i++) {
        total += fitnessPopulation[i][1];
    }
    var average = total / POPULATION_SIZE;
    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    data.push([generation + '', best, average, worst]);
    if (draw == undefined) {
        chart.draw(google.visualization.arrayToDataTable(data), options);
    }
    // 
    population = fitnessPopulation.map(function(val) { return val[0] }).splice(0, POPULATION_SIZE);
    
    if (draw == undefined) {
        Update(population[0]);
    }
}

function FillWithParent(child, parent)
{
    var usedNumbers = {};
    var parentIndex = 0;
    var newChild = []

    for (var i = 0; i < child.length; i++) {
        usedNumbers[child[i] + ""] = true;
    }

    for (var i = 0; i < parent.length; i++) {
        if (child[i] == null) {

            while (usedNumbers[parent[parentIndex] + ""]) {
                parentIndex++;
            }
            newChild[i] = parent[parentIndex++];
        }
        else {
            newChild[i] = child[i];
        }
    }

    return newChild;
}

function Crossover(oldPopulation)
{
    var newPopulation = [];

    for (var i = 0; i < oldPopulation.length; i++) {
        newPopulation[newPopulation.length] = oldPopulation[i];
    }

    while (oldPopulation.length - 2 >= 0) {
        var parent1 = oldPopulation.splice(randInt(0, oldPopulation.length - 1), 1)[0];
        var parent2 = oldPopulation.splice(randInt(0, oldPopulation.length - 1), 1)[0];

        var cutoff = randInt(1, NODE_COUNT - 1);
        var cutoff_end = randInt(cutoff + 1, NODE_COUNT - 1);
        var child1 = []
        var child2 = []

        for (var i = cutoff; i < cutoff_end; i++) {
            child1[i] = parent2[i];
            child2[i] = parent1[i];
        }

        child1 = FillWithParent(child1, parent1);
        child2 = FillWithParent(child2, parent2);

        newPopulation.push(child1);
        newPopulation.push(child2);
    }

    return newPopulation;
}