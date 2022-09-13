const has_undirected_path = (edges, nodeA, nodeB) => {
    const graph = build_graph(edges)
    return has_path(graph, nodeA, nodeB, new Set());
}

const has_path = (graph, src, dst, visited) => {
    if (src === dst) return true;
    if (visited.has(src)) return false;

    visited.add(src)

    for (let neighbor of graph[src]) {
        if (has_path(graph, neighbor, dst, visited) === true) {
            return true;
        }
    }

    return false;
}

const build_graph = (edges) => {
    const graph = {};

    for (let edge of edges) {
        const [node1, node2] = edge;
        if (!(node1 in graph)) graph[node1] = [];
        if (!(node2 in graph)) graph[node2] = [];

        graph[node1].push(node2);
        graph[node2].push(node1);
    }

    return graph;
}

edges = [
    ['i', 'j'],
    ['k', 'i'],
    ['m', 'k'],
    ['k', 'l'],
    ['o', 'n'],
]

console.log(has_undirected_path(edges, 'j', 'n'))
