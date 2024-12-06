import { Objects } from '../types/objects';
import {
  useNodesState,
  useEdgesState,
  ReactFlow,
  ReactFlowProvider,
  Node,
  Edge,
  addEdge,
  Connection
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { useCallback, useEffect } from 'react';
import CustomItem from './custom-item';
import React from 'react';

interface GraphProps {
  objs: Objects;
}

export const Graph = ({ objs }: GraphProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

  const nodeTypes = {
    node: CustomItem
  };

  useEffect(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    Object.keys(objs).forEach((key) => {
      newNodes.push({
        id: key,
        type: 'node',
        data: {
          id: key,
          dataType: objs[key].dataType,
          sourceHandles: objs[key].targetIds.map(
            (target) => `handle-${key}-${target}`
          ),
          targetHandles: objs[key].sourceIds.map(
            (source) => `handle-${key}-${source}`
          )
        },
        position: { x: Math.random() * 500, y: Math.random() * 300 }
      });

      objs[key].targetIds.forEach((target) => {
        newEdges.push({
          id: `${key} - ${target}`,
          source: key,
          target: target,
          animated: true,
          sourceHandle: `handle-${key}-${target}`,
          targetHandle: `handle-${target}-${key}`
        });
      });
    });
    setNodes(newNodes);
    setEdges(newEdges);
    console.log(newNodes);
    console.log(newEdges);
  }, [objs]);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  return (
    <React.Fragment>
      <ReactFlowProvider>
        <div style={{ height: 800, width: 1100 }}>
          <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            defaultViewport={defaultViewport}
            onConnect={onConnect}
          ></ReactFlow>
        </div>
      </ReactFlowProvider>
    </React.Fragment>
  );
};
