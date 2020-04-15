import React from "react";
import classes from "./Table.module.scss";

interface TableProps {
  table: TableValues<number | string | TableCell>;
}

export type TableCell = {
  value: string | number;
  rowspan: number | undefined;
  colspan: number | undefined;
  align: "CENTER" | "RIGHT" | "LEFT";
};

export interface TableValues<T extends number | string | TableCell> {
  caption: string;
  th: T[][] | T[][];
  td: T[][] | T[][];
}

const Table = ({ table }: TableProps) => {
  const getThClasses = (th: number | string | TableCell, index: number) => {
    if (typeof th === "string" || typeof th === "number") {
      return index === 0
        ? [classes.MainTh, classes.TextAlignLeft].join(" ")
        : classes.MainTh;
    } else {
      switch (th.align) {
        case "CENTER":
          return [classes.MainTh, classes.TextAlignCenter].join(" ");
        case "LEFT":
          return [classes.MainTh, classes.TextAlignLeft].join(" ");
        case "RIGHT":
          return [classes.MainTh, classes.TextAlignRight].join(" ");
        default:
          throw new Error("Unknown align type th.align");
      }
    }
  };

  const getThByTableCell = (
    value: TableCell,
    index: number,
    thClasses: string
  ) => (
    <th
      key={classes.Table + "_th_" + index}
      className={thClasses}
      rowSpan={value.rowspan ? value.rowspan : undefined}
      colSpan={value.colspan ? value.colspan : undefined}
    >
      {value.value}
    </th>
  );

  const thElements = table.th.map((ths, index) => {
    return (
      <tr key={classes.Table + "_tr_" + index} className={classes.Tr}>
        {ths.map((value, index) => {
          const thClasses = getThClasses(value, index);

          if (typeof value !== "string" && typeof value !== "number") {
            return getThByTableCell(value, index, thClasses);
          }

          return (
            <th key={classes.Table + "_th_" + index} className={thClasses}>
              {value}
            </th>
          );
        })}
      </tr>
    );

    /* const thClasses =
      index === 0
        ? [classes.MainTh, classes["MainTh--AlignLeft"]].join(" ")
        : classes.MainTh;
    return (
      <th key={classes.Table + "_th_" + index} className={thClasses}>
        {value}
      </th>
    ); */
  });

  const tdElements = table.td.map((tds, index) => {
    return (
      <tr key={classes.Table + "_tr_" + index} className={classes.Tr}>
        {tds.map((value, index) => {
          const tdClasses = index === 0 ? classes.LeftTh : classes.Td;

          return (
            <td key={classes.Table + "_td_" + index} className={tdClasses}>
              {value}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <table className={classes.Table}>
      {table.caption && (
        <caption className={classes.Caption}>{table.caption}</caption>
      )}

      <thead>{thElements}</thead>

      <tbody>{tdElements}</tbody>
    </table>
  );
};

export default Table;
