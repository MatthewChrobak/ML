function Init()
{
    POPULATION_SIZE = document.getElementById("populationcount").value * 1;
    mutationProbability = document.getElementById("mutationprobability").value * 1;
    NODE_COUNT = document.getElementById("nodecount").value * 1;
    generation = 0;

    if (NODE_COUNT < 5) {
        POPULATION_SIZE = 2;
    }
    

    nodes = [];
    for (var i = 0; i < NODE_COUNT; i++) {
        nodes[i] = CreateRandomNode();
    }

    data = [['Generation', 'Best', 'Average', 'Worst']];

    for (var i = 0; i < POPULATION_SIZE; i++) {
       
        population[i] = CreateRandomPath();
    }

    KeepLearning();
}

function UpdateMutation()
{
    mutationProbability = document.getElementById("mutationprobability").value * 1;
}