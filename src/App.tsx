import './App.css';
import { AppShell, Button, FileInput, Flex } from '@mantine/core';
import { Header } from './components/header';
import { useState } from 'react';
import Papa from 'papaparse';
import type { Objects } from './types/objects';
import { Graph } from './components/graph';

function App() {
  const [data, setData] = useState<string[][]>([]);
  // @ts-ignore
  const [objs, setObjs] = useState<Objects>({});
  const [showGraph, setShowGraph] = useState<boolean>(false);

  const handleChangeFile = (file: File | null) => {
    if (!file) return;

    Papa.parse(file, {
      complete: (result) => {
        setData(result.data as string[][]);
        console.log(result);
      },
      error: (error) => {
        console.error('Error reading CSV file:', error);
      }
    });
  };

  const handleShowGraph = () => {
    setObjs((prevObjs) => {
      const newObjs = { ...prevObjs };

      data.forEach((row, index) => {
        if (index === 0) return;

        const [key1, type1, targetId, type2] = row;

        if (!newObjs[key1]) {
          newObjs[key1] = { dataType: type1, targetIds: [], sourceIds: [] };
        }

        if (!newObjs[key1].targetIds.includes(targetId)) {
          newObjs[key1].targetIds.push(targetId);
        }

        if (!newObjs[targetId]) {
          newObjs[targetId] = { dataType: type2, targetIds: [], sourceIds: [] };
        }

        if (!newObjs[targetId].sourceIds.includes(key1)) {
          newObjs[targetId].sourceIds.push(key1);
        }
      });

      console.log(newObjs);

      return newObjs;
    });

    setShowGraph(true);
  };

  return (
    <AppShell className="mt-8" header={<Header />}>
      <div>
        <Flex gap={8} align="end">
          <FileInput
            accept=".csv"
            onChange={(file) => handleChangeFile(file)}
            label="Import file"
            // @ts-ignore
            placeholder="Pick file"
          />
          <Button disabled={!data} onClick={handleShowGraph}>
            Show Graph Viewer
          </Button>
        </Flex>
        {showGraph && <Graph objs={objs} />}
      </div>
    </AppShell>
  );
}

export default App;
