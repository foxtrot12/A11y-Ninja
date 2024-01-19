export interface cell {
  row: number;
  col: number;
}

export function initTableKeyboardNavigationLogic(table: HTMLTableElement): {
  handleKeyDown: (evt: KeyboardEvent) => HTMLTableCellElement;
  onTableFocus: (evt: FocusEvent) => void;
} {
  const _allCells = getAllCells(table);
  let _focusedEl: cell;

  const focusCell = (cellToFocus: cell) => {
    if (!_allCells) {
      return;
    }
    const row = cellToFocus.row;
    const col = cellToFocus.col;
    const tableCell = _allCells[row][col];
    tableCell?.focus();
  };

  const handleKeyDown = (evt: KeyboardEvent) => {
    _focusedEl = handleTableKeyboardNavigation(evt, _allCells, _focusedEl);
    _focusedEl ? focusCell(_focusedEl) : null;
    return _allCells[_focusedEl.row][_focusedEl.col];
  };

  const onTableFocus = (ev: FocusEvent) => {
    if (ev.target === table) {
      _focusedEl = { row: 0, col: 0 };
      focusCell(_focusedEl);
    }
  };

  return {
    handleKeyDown,
    onTableFocus,
  };
}

function handleTableKeyboardNavigation(
  event: KeyboardEvent,
  allCells: Array<Array<HTMLTableCellElement>>,
  focusedElIndices?: { row: number; col: number }
): cell {
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
    event.preventDefault();
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

  return { row, col };
}

function getAllCells(
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

function isSet(val: any) {
  return val !== null && val !== undefined;
}
