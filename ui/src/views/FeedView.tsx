import React, { useEffect, useState } from 'react'
import useFeedStore from '../store/feedStore';
import { Poast } from '../types/Poast';
import './FeedView.scss'

const FeedView = () => {
  const { mine, feeds } = useFeedStore()

  return (
    <div id="feed">
      <h2>~{window.ship}</h2>
      <div>{mine.size}</div>
    </div>

  );
}

export default FeedView
