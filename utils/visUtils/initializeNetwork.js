import {fetchNodeByWord} from './wordNodeTools.js'


export const initializeNetworkOnWord = (startWord) => {
    // create an array with nodes
    window.previousGeneration = [fetchNodeByWord(startWord)]
    window.nodes = new vis.DataSet([fetchNodeByWord(startWord)],{queue: {max: 100}})
    // create an array with edges
    window.edges = new vis.DataSet([],{queue: {max: 100}})
    window.idsSoFar = {[window.previousGeneration[0].id]: true}
    // create a network
    var container = document.getElementById('mynetwork');

    // provide the data in the vis format
    var data = {
        nodes: window.nodes,
        edges: window.edges
    };
    var options = {
        configure: {
            enabled: true,
            showButton: true
        },
        physics: {
            enabled: true,
            stabilization: {
                iterations: 10,
                updateInterval: 2
            },
            barnesHut: {
                gravitationalConstant: -10000,
                centralGravity: 0.1,
                springLength: 120,
                springConstant: 0.02,
                damping: 0.09,
                avoidOverlap: 0.1
            },
            timestep: 0.5,
            adaptiveTimestep: true
        }
    };
    window.network = new vis.Network(container, data, options)
}


export const initializeNetwork = (nodesArr,edgesArr) => {
    // create an array with nodes
    window.previousGeneration = nodesArr
    window.nodes = new vis.DataSet(nodesArr)
    // create an array with edges
    window.edges = new vis.DataSet(edgesArr)
    window.idsSoFar = {}
    nodesArr.forEach(node => window.idsSoFar[node.id]=true)
        // create a network
    var container = document.getElementById('mynetwork');

    // provide the data in the vis format
    var data = {
        nodes: window.nodes,
        edges: window.edges
    };
    var options = {
        configure: {
            enabled: true,
            showButton: true
        },
        physics: {
            enabled: true,
            stabilization: {
                iterations: 10,
                updateInterval: 2
            },
            barnesHut: {
                gravitationalConstant: -10000,
                centralGravity: 0.1,
                springLength: 120,
                springConstant: 0.02,
                damping: 0.09,
                avoidOverlap: 0.2
            },
            timestep: 0.5,
            adaptiveTimestep: true
        }
    };
    window.network = new vis.Network(container, data, options)
}

// initialize your network!
// export var network = new vis.Network(container, data, options)
