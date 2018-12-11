import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useStore, useAction } from 'easy-peasy'
import { List, ArrowKeyStepper, AutoSizer } from 'react-virtualized'
import MyArrowStepper from '../lib/MyArrowKeyStepper'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import styled from 'styled-components'

export default ({ list, listPos, renderer, callback, onKeyDown }) => {
  const [scrollToIndex, setScrollToIndex] = useState(0)
  useEffect(() => {
    const ps = new PerfectScrollbar('.outerScroll')
  }, [])

  if (!list) {
    return (
      <QueueWrapper>
        <div>No items in list!</div>
      </QueueWrapper>
    )
  }

  return (
    <QueueWrapper>
      <MyArrowStepper
        isControlled
        columnCount={1}
        rowCount={list.length}
        mode={'cells'}
        className={'keyStepper'}
        onScrollToChange={({ scrollToRow }) => setScrollToIndex(scrollToRow)}
        scrollToRow={scrollToIndex}
        onKeyDown={onKeyDown}
      >
        {({ onSectionRendered, scrollToRow }) => (
          <AutoSizer>
            {({ height, width }) => (
              <List
                className={'outerScroll'}
                rowCount={list.length}
                height={height}
                width={width}
                rowHeight={30}
                onSectionRendered={onSectionRendered}
                scrollToIndex={scrollToRow}
                rowRenderer={({
                  index,
                  key,
                  style,
                  isScrolling,
                  isVisible,
                  parent
                }) =>
                  renderer({
                    index,
                    key,
                    style,
                    focused: index === scrollToIndex,
                    selected: index === listPos,
                    isVisible,
                    isScrolling,
                    item: list[index],
                    onClick: () => setScrollToIndex(index),
                    callback
                  })
                }
              />
            )}
          </AutoSizer>
        )}
      </MyArrowStepper>
    </QueueWrapper>
  )
}

const QueueWrapper = styled.div`
  flex-grow: 1;
  flex-basis: 50px;
  align-items: center;
  .keyStepper {
    height: 100%;
  }
  .ps__rail-y,
  .ps__rail-x {
    z-index: 5;
  }
`
