import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useStore, useAction } from 'easy-peasy'
import { List, ArrowKeyStepper, AutoSizer } from 'react-virtualized'
import MyArrowStepper from '../lib/MyArrowKeyStepper'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import styled from 'styled-components'
import { timeDisplay } from '../lib/utilities'

const renderer = ({
  index,
  key,
  style,
  isVisible,
  isScrolling,
  focused,
  selected,
  item,
  onClick,
  callback
}) => {
  const baseStyle = {
    height: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 1em'
  }

  const durationStyle = {
    flexShrink: '0',
    width: '2em'
  }

  const titleStyle = {
    flex: '1 1',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '0 1em'
  }

  const artistStyle = {
    flexShrink: '0'
  }

  let itemStyle = focused
    ? { backgroundColor: '#CBE86B', ...baseStyle }
    : { backgroundColor: '#f2e9e1', ...baseStyle }
  itemStyle = selected
    ? { fontWeight: 'bold', ...itemStyle }
    : { fontWeight: 'normal', ...itemStyle }

  return (
    <div
      key={key}
      style={style}
      onClick={onClick}
      onDoubleClick={() => callback(item.id)}
      onKeyDown={e => console.log(e.key)}
    >
      <div style={itemStyle}>
        {selected && isVisible && !isScrolling ? (
          <DynamicDuration />
        ) : (
          <span style={durationStyle}>{timeDisplay(item.duration)}</span>
        )}
        <span style={titleStyle}>{item.title}</span>
        <span style={artistStyle}>{item.artist}</span>
      </div>
    </div>
  )
}

const onKeyDown = ({ e, scrollToRow, scrollToColumn }) => {}

export default () => {
  const [scrollToIndex, setScrollToIndex] = useState(0)
  useEffect(() => {
    const ps = new PerfectScrollbar('.outerScroll')
  }, [])

  const { play, skipTo } = useAction(dispatch => dispatch.player)

  const { queue: list, queuePos } = useStore(state => state.queue)

  const onKeyDown = ({ event, scrollToRow, scrollToColumn }) => {
    if (event.key === 'Enter') {
      skipTo(list[scrollToRow].id)
    }
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
                    key,
                    style,
                    focused: index === scrollToIndex,
                    selected: index === queuePos,
                    isVisible,
                    isScrolling,
                    item: list[index],
                    onClick: () => setScrollToIndex(index),
                    callback: skipTo
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

const ListOLD = ({ queue, queuePos, selectPos, setSelectPos, skipTo }) => (
  <ul>
    {queue.map((item, idx) => (
      <Item
        key={item.id}
        item={item}
        idx={idx}
        setSelectPos={useCallback(
          e => {
            setSelectPos(idx)
          },
          [idx]
        )}
        skipTo={useCallback(() => skipTo(item.id), [item.id])}
        current={idx === queuePos}
        select={idx === selectPos}
      />
    ))}
  </ul>
)

const Item = ({ item, idx, setSelectPos, skipTo, current, select }) => {
  const child = useMemo(
    () => (
      <QueueItem
        onDoubleClick={skipTo}
        onClick={setSelectPos}
        current={current}
        select={select}
      >
        {current ? (
          <DynamicDuration />
        ) : (
          <StaticDuration durationDisplay={item.durationDisplay} />
        )}
        <Title>{item.title}</Title> <Artist>{item.artist}</Artist>
      </QueueItem>
    ),
    [item, idx, setSelectPos, skipTo, current, select]
  )

  return <>{child}</>
}

const DynamicDuration = () => {
  const { remaining } = useStore(state => state.seekbar)
  return <DurationStyle>{timeDisplay(remaining)}</DurationStyle>
}

const StaticDuration = ({ durationDisplay }) => (
  <DurationStyle>{durationDisplay}</DurationStyle>
)

const QueueWrapper = styled.div`
  flex-grow: 1;
  flex-basis: 50px;
  align-items: center;
  background-color: #f2e9e1;
  .keyStepper {
    height: 100%;
  }
  .ps__rail-y,
  .ps__rail-x {
    z-index: 5;
  }
`

const QueueWrapperOld = styled.div`
  flex-shrink: 1;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #f2e9e1;
  ul {
    margin: 0;
  }
`

const QueueItem = styled.li`
  font-weight: ${({ current }) => (current ? 'bold' : 'normal')};
  background-color: ${({ select }) => (select ? '#CBE86B' : 'none')};
  display: flex;
  justify-content: space-between;
  padding: 0 1em;
`

const Title = styled.span`
  flex: 1 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 1em;
`

const Artist = styled.span`
  flex-shrink: 0;
`

const DurationStyle = styled.span`
  flex-shrink: 0;
  width: 2em;
`

const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
