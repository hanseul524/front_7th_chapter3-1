// 테이블 + 액션 버튼 컴포넌트
import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/index';
import type { Post } from '@/services/postService';
import type { User } from '@/services/userService';
import type { ColumnConfig } from '../constants/columns';

type EntityType = 'user' | 'post';
type Entity = User | Post;

type ManagementTableProps = {
  columns: ColumnConfig[];
  data: Entity[];
  entityType: EntityType;
  onEdit?: (item: Entity) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
};

const renderValue = (entity: Entity, key: string) => {
  const value = (entity as unknown as Record<string, unknown>)[key];
  if (value === undefined || value === null) return '-';
  if (typeof value === 'number') return value.toLocaleString();
  return String(value);
};

export const ManagementTable: React.FC<ManagementTableProps> = ({
  columns,
  data,
  entityType,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  const renderActions = (item: Entity) => {
    if (entityType === 'user') {
      return (
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={() => onEdit?.(item)}>
            수정
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete?.(item.id)}
          >
            삭제
          </Button>
        </div>
      );
    }

    const post = item as Post;
    return (
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={() => onEdit?.(item)}>
          수정
        </Button>
        {post.status === 'draft' && (
          <Button variant="default" size="sm" onClick={() => onPublish?.(post.id)}>
            게시
          </Button>
        )}
        {post.status === 'published' && (
          <Button variant="outline" size="sm" onClick={() => onArchive?.(post.id)}>
            보관
          </Button>
        )}
        {post.status === 'archived' && (
          <Button variant="default" size="sm" onClick={() => onRestore?.(post.id)}>
            복원
          </Button>
        )}
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete?.(post.id)}
        >
          삭제
        </Button>
      </div>
    );
  };

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {column.key === 'actions'
                    ? renderActions(item)
                    : renderValue(item, column.key)}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center text-sm text-muted-foreground">
                데이터가 없습니다.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
