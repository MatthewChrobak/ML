function Init()
{
    POPULATION_SIZE = document.getElementById("populationcount").value * 1;
    mutationProbability = document.getElementById("mutationprobability").value * 1;
    NODE_COUNT = document.getElementById("nodecount").value * 1;
    generation = 0;
    
    for (var i = 0; i < NODE_COUNT; i++) {
        nodes[i] = CreateRandomNode();
    }

    data = [['Generation', 'Best', 'Average', 'Worst']];

    for (var i = 0; i < POPULATION_SIZE; i++) {
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
        population[i] = newMember;
    }

    KeepLearning();
}

function UpdateMutation()
{
    mutationProbability = document.getElementById("mutationprobability").value * 1;
}