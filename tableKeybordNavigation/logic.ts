export interface cell {
  row: number;
  col: number;
}

/**
 * Handles keyboard navigation within an HTML table and returns the focused element after navigation.
 *
 * @param {KeyboardEvent} event - The keyboard event triggering the navigation.
 * @param {HTMLTableElement} table - The HTML table element to navigate within.
 * @returns {HTMLTableCellElement | null} The newly focused HTML table cell element after navigation.
 */
export function handleTableKeyboardNavigation(
  event: KeyboardEvent,
  allCells: Array<Array<HTMLTableCellElement>>,
  focusedElIndices?: { row: number; col: number }
): { row: number; col: number } {
  if (!focusedElIndices) {
    return { row: 0, col: 0 };
  }

  const numRows = allCells.length;
  const numCols = allCells[0].length;

  const handleWrap = (
    row: number,
    col: number
  ): { row: number; col: number } => {
    if (row < 0) {
      row = numRows - 1;
    } else if (row >= numRows) {
      row = 0;
    }

    if (col < 0) {
      col = numCols - 1;
    } else if (col >= numCols) {
      col = 0;
    }

    return { row, col };
  };

  const handleArrow = (
    row: number,
    col: number,
    key: string
  ): { row: number; col: number } => {
    switch (key) {
      case "ArrowUp":
        row--;
        break;
      case "ArrowDown":
        row++;
        break;
      case "ArrowLeft":
        col--;
        break;
      case "ArrowRight":
        col++;
        break;
    }
    return handleWrap(row, col);
  };

  let { row, col } = focusedElIndices;

  switch (event.key) {
    case "ArrowUp":
    case "ArrowDown":
    case "ArrowLeft":
    case "ArrowRight":
      do {
        ({ row, col } = handleArrow(row, col, event.key));
      } while (
        !(isSet(allCells[row]) && isSet(allCells[row][col])) ||
        allCells[row][col].textContent === ""
      ); // Skip empty cells
      break;
  }

  function isSet(value: any): boolean {
    return value !== null && value !== undefined;
  }

  return { row, col };
}

export function getAllCells(
  table: HTMLTableElement
): Array<Array<HTMLTableCellElement>> {
  const rows = Array.from(table.querySelectorAll("tr"));
  const cellsArray: Array<Array<HTMLTableCellElement>> = [];

  for (const row of rows) {
    const cells = Array.from(
      row.querySelectorAll("th, td")
    ) as Array<HTMLTableCellElement>;
    cellsArray.push(cells);
  }

  return cellsArray;
}
