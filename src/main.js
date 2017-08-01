import {nodesArr, filteredNodes} from './nodes.js'
import edgesArr from './edges.js'
import addNextGeneration from './addNextGeneration.js'

// create an array with nodes
var nodes = new vis.DataSet(filteredNodes);

// create an array with edges
var edges = new vis.DataSet(edgesArr);

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    physics: {
        adaptiveTimestep: true,
        timestep: 0.3
    },
    manipulation: {
        addNode: function(nodeData, callback){
            callback(nodeData)
        }
    }
};

// initialize your network!
var network = new vis.Network(container, data, options);


document.getElementById('bubbleOut').onclick = function(event){
  network.addNodeMode()
  addNextGeneration(nodes,edges)
  network.disableEditMode()
}
