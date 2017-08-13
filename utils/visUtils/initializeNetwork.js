import {fetchNodeByWord} from './wordNodeTools.js'

var network

export default (startWord) => {
    // create an array with nodes
    window.previousGeneration = [fetchNodeByWord(startWord)]
    window.nodes = new vis.DataSet([fetchNodeByWord(startWord)])
    // create an array with edges
    window.edges = new vis.DataSet([])
    window.idsSoFar = {[window.previousGeneration[0].id]: true}
    // create a network
    var container = document.getElementById('mynetwork');

    // provide the data in the vis format
    var data = {
        nodes: window.nodes,
        edges: window.edges
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
    network = new vis.Network(container, data, options)
}

// initialize your network!
// export var network = new vis.Network(container, data, options)
