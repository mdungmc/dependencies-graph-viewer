import './App.css';
import { AppShell, Button, FileInput, Flex } from '@mantine/core';
import { Header } from './components/header';
import { useState } from 'react';
import Papa from 'papaparse';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<string[][]>([]);

  const handleChangeFile = () => {
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

  return (
    <AppShell className="mt-8" header={<Header />}>
      <Flex gap={8} align="end">
        <FileInput
          accept=".csv"
          onChange={setFile}
          label="Import file"
          placeholder="Pick file"
        />
        <Button onClick={handleChangeFile} disabled={!file}>
          Show Graph Viewer
        </Button>
      </Flex>
    </AppShell>
  );
}

export default App;
