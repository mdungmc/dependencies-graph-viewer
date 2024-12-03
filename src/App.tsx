import './App.css';
import { AppShell, Button, FileInput, Flex } from '@mantine/core';
import { Header } from './components/header';
import { useState } from 'react';
import Papa from 'papaparse';

type ObjectValue = {
  type: string;
  targetIds: string[];
};

type Objects = Record<string, ObjectValue>;

function App() {
  const [data, setData] = useState<string[][]>([]);
  // @ts-ignore
  const [objs, setObjs] = useState<Objects>({});

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
        if (index === 0) return; // Bỏ qua hàng tiêu đề

        const [key1, type1, targetId, type2] = row;

        if (!newObjs[key1]) {
          newObjs[key1] = { type: type1, targetIds: [] };
        }
        if (!newObjs[key1].targetIds.includes(targetId)) {
          newObjs[key1].targetIds.push(targetId);
        }

        if (!newObjs[targetId]) {
          newObjs[targetId] = { type: type2, targetIds: [] };
        }
      });

      console.log(newObjs);

      return newObjs;
    });
  };

  return (
    <AppShell className="mt-8" header={<Header />}>
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
    </AppShell>
  );
}

export default App;
