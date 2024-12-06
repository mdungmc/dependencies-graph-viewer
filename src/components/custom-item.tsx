import { Text } from '@mantine/core';
import { Handle, Position } from '@xyflow/react';
import { memo } from 'react';

type Item = {
  id: string;
  dataType: string;
  sourceHandles: string[];
  targetHandles: string[];
};

interface CustomItemProps {
  data: Item;
}

export default memo(({ data }: CustomItemProps) => {
  return (
    <>
      {data.sourceHandles.map((handleId: string) => (
        <Handle
          key={handleId}
          type="source"
          position={Position.Right}
          id={handleId}
        />
      ))}
      {data.targetHandles.map((handleId: string) => (
        <Handle
          key={handleId}
          type="target"
          position={Position.Left}
          id={handleId}
        />
      ))}
      <div className="rounded-lg bg-white px-2 py-2 shadow">
        <Text size={8}>{data.id}</Text>
        <Text size={6} className="italic text-gray-600">
          {data.dataType}
        </Text>
      </div>
    </>
  );
});
