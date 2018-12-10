import { List, ArrowKeyStepper, AutoSizer } from 'react-virtualized'

export default class MyArrowKeyStepper extends ArrowKeyStepper {
  _onKeyDown = event => {
    const { columnCount, disabled, mode, rowCount, onKeyDown } = this.props

    if (disabled) {
      return
    }

    const {
      scrollToColumn: scrollToColumnPrevious,
      scrollToRow: scrollToRowPrevious
    } = this._getScrollState()

    let { scrollToColumn, scrollToRow } = this._getScrollState()

    // The above cases all prevent default event event behavior.
    // This is to keep the grid from scrolling after the snap-to update.
    switch (event.key) {
      case 'ArrowDown':
        scrollToRow =
          mode === 'cells'
            ? Math.min(scrollToRow + 1, rowCount - 1)
            : Math.min(this._rowStopIndex + 1, rowCount - 1)
        break
      case 'ArrowLeft':
        scrollToColumn =
          mode === 'cells'
            ? Math.max(scrollToColumn - 1, 0)
            : Math.max(this._columnStartIndex - 1, 0)
        break
      case 'ArrowRight':
        scrollToColumn =
          mode === 'cells'
            ? Math.min(scrollToColumn + 1, columnCount - 1)
            : Math.min(this._columnStopIndex + 1, columnCount - 1)
        break
      case 'ArrowUp':
        scrollToRow =
          mode === 'cells'
            ? Math.max(scrollToRow - 1, 0)
            : Math.max(this._rowStartIndex - 1, 0)
        break
    }

    if (
      scrollToColumn !== scrollToColumnPrevious ||
      scrollToRow !== scrollToRowPrevious
    ) {
      event.preventDefault()

      this._updateScrollState({ scrollToColumn, scrollToRow })
    }

    onKeyDown({ event, scrollToColumn, scrollToRow })
  }
}
