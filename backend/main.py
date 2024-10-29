from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

class Edge(BaseModel):
    animated: bool
    id: str
    source: str
    target:str

class Node(BaseModel):
     id:str
     type: str

class Pipeline(BaseModel):
    edges:List[Edge]
    nodes:List[Node]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    is_dag = not(not_dag(pipeline.edges))

    print(len(pipeline.edges), len(pipeline.nodes))
    return {'status': 'parsed', 'num_nodes': len(pipeline.nodes), 'num_edges': len(pipeline.edges), 'is_dag': is_dag}


def build_graph(edges):
    graph = {}

    for edge in edges:
        source, target = dict(edge)["source"], dict(edge)["target"]
        if source not in graph:
            graph[source] = []
        graph[source].append(target)

        if target not in graph:
            graph[target] = []

    return graph

def not_dag(edges):
    graph = build_graph(edges)  
    visited = set()
    rec_stack = set()

    def dfs(node):
        if node in rec_stack:
            return True
        if node in visited:
           
            return False

        visited.add(node)
        rec_stack.add(node)

        
        for neighbor in graph[node]:
            if dfs(neighbor):
                return True

        
        rec_stack.remove(node)
        return False

  
    for node in graph:
        if node not in visited:
            if dfs(node):
                return True  

    return False 
