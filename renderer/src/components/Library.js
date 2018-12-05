import React from 'react'
import { useStore, useAction } from 'easy-peasy'

export default () => {
  const { artistView } = useStore(state => state.library)
  const { replaceQueue } = useAction(dispatch => dispatch.queue)
  return (
    <>
      <h3>Library</h3>
      <ul>
        {artistView.map(([title, items], idx) => (
          <li key={title}>
            <h5 onDoubleClick={() => replaceQueue([['Artist', title]])}>
              {title}
            </h5>
            <ul>
              {items.map((item, idx) => (
                <li
                  key={item}
                  onDoubleClick={() => replaceQueue([['Album', item]])}
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  )
}
