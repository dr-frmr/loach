import React, { useEffect, useState } from 'react'
import useFeedStore from '../store/feedStore';
import Input from '../components/form/Input'
import { Poast } from '../types/Poast';
import './FeedView.scss'

const FeedView = () => {
  const { feed, pending, makePoast, allow, findMy } = useFeedStore()
  const [inputPic, setInputPic] = useState('')
  const [inputLabel, setInputLabel] = useState('')
  const [toFollow, setToFollow] = useState('')

  return (
    <div id="feed">
      <div id="to-follow">
        <Input
              value={toFollow}
              onChange={(e: any) => setToFollow(e.target.value)}
              placeholder="~zod"
              style={{ padding: '4px 8px' }}
            />
        <button onClick={() => findMy([toFollow])}>
          follow
        </button>
      </div>
      {pending.length == 0
       ? <span></span>
       : <div id="follow-requests">
          <p>these people want to follow you:</p>
            {pending.map((ship: string) => (
              <li key={ship}>
                {ship}
                <button onClick={() => allow([ship])}>
                  allow
                </button>
              </li>
            ))}
         </div>
      }
      <Input
            value={inputPic}
            onChange={(e: any) => setInputPic(e.target.value)}
            placeholder="image URL"
            style={{ padding: '4px 8px' }}
          />
      <Input
            value={inputLabel}
            onChange={(e: any) => setInputLabel(e.target.value)}
            placeholder="image title (optional)"
            style={{ padding: '4px 8px' }}
          />
      <button onClick={() => makePoast({pic: inputPic, label: inputLabel, loc: null})}>
        poast
      </button>
      <div id="pics">
      {feed.map(FeedPoast => {
          return (
            <div id="poast">
              <img src={FeedPoast.poast.pic} />
              <p>{FeedPoast.author} | {FeedPoast.date.toString()}</p>
              <i>{FeedPoast.poast.label}</i>
            </div>
          );
        }
      )}
      </div>
    </div>

  );
}

export default FeedView
