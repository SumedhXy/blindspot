import type { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T, index: number) => ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField?: keyof T | ((item: T, index: number) => string | number);
  emptyMessage?: string;
  className?: string;
  caption?: string;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  keyField = "id",
  emptyMessage = "No records found.",
  className = "",
  caption,
}: TableProps<T>) {
  const getKey = (item: T, index: number): string | number => {
    if (typeof keyField === "function") return keyField(item, index);
    if (item && item[keyField] !== undefined) return String(item[keyField]);
    return index;
  };

  return (
    <div className={`ui-table-wrapper ${className}`.trim()}>
      <table className="ui-table">
        {caption && <caption className="ui-table__caption">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={{
                  textAlign: col.align || "left",
                  width: col.width,
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="ui-table__empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, rowIdx) => (
              <tr key={getKey(item, rowIdx)}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{ textAlign: col.align || "left" }}
                  >
                    {col.render
                      ? col.render(item, rowIdx)
                      : String(item[col.key] ?? "-")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
