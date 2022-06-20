import create from "zustand"
import { SubscriptionRequestInterface } from "@urbit/http-api";
import api from "../api";
import { Poast } from "../types/Poast";
import { FeedPoast } from "../types/FeedPoast"

interface FrontendUpdate {
  mine: {[key: string]: Poast},
  frens: {[key: string]: {[key: string]: Poast}},
  trust: string[],
  pending: string[],
}

export interface FeedStore {
  //  mine: {[key: string]: Poast},
  //  frens: {[key: string]: {[key: string]: Poast}},
  feed: Array<FeedPoast>,
  trust: string[],
  pending: string[],
  init: () => Promise<void>,
  makePoast: (poast: Poast) => Promise<void>,
  allow: (frens: string[]) => Promise<void>,
  findMy: (frens: string[]) => Promise<void>,
}

export function createSubscription(app: string, path: string, e: (data: any) => void): SubscriptionRequestInterface {
  const request = {
    app,
    path,
    event: e,
    err: () => console.warn('SUBSCRIPTION ERROR'),
    quit: () => {
      throw new Error('subscription clogged');
    }
  };
  return request;
}

// '~2022.4.4..22.45.04..b1b8'
// const d = new Date("2015-03-25T12:00:00Z");
const parseDate = (eA: string) => eA
  .replace('~', '')
  .replace(/\.[0-9]+?/, m => `-${m.length === 2 ? `0${m[1]}` : m.slice(0)}`)
  .replace(/\.[0-9]+?/, m => `-${m.length === 2 ? `0${m[1]}` : m.slice(0)}`)
  .replace('..', 'T')
  .replace('.', ':')
  .replace('.', ':')
  .replace(/\.\..*$/, 'Z')

const useFeedStore = create<FeedStore>((set, get) => ({
  feed: [],
  trust: [],
  pending: [],
  init: async () => {
    const handleFrontendUpdate = (data: FrontendUpdate) => {
      const trust: string[] = data.trust
      const pending: string[] = data.pending
      //  blend all feeds into one
      const feed: FeedPoast[] = Object.entries(data.mine).map((p: [string, Poast]) => {
        console.log("date: ", p[0])
        console.log("parsed: ", parseDate(p[0]))
        return {poast: p[1], author: window.ship, date: new Date(parseDate(p[0]))}
      })
      Object.entries(data.frens).forEach((v: [string, {[key: string]: Poast}]) => {
        Object.entries(v[1]).forEach((p: [string, Poast]) => {
          feed.push({poast: p[1], author: v[0], date: new Date(parseDate(p[0]))})
        })
      })
      feed.sort((a: FeedPoast, b: FeedPoast) => {
        if (a.date < b.date) {
          return 1
        } if (a.date === b.date) {
          return 0
        } return -1
      })
      set({ feed, trust, pending })
    }
    api.subscribe(createSubscription('loach', '/frontend', handleFrontendUpdate))
  },
  allow: async (frens: string[]) => {
    await api.poke({
      app: 'loach',
      mark: 'action',
      json: { 'allow': frens }
    })
  },
  findMy: async (frens: string[]) => {
    await api.poke({
      app: 'loach',
      mark: 'action',
      json: { 'find-my': frens }
    })
  },
  goodbye: async (frens: string[]) => {
    await api.poke({
      app: 'loach',
      mark: 'action',
      json: { 'goodbye': frens }
    })
  },
  banish: async (frens: string[]) => {
    await api.poke({
      app: 'loach',
      mark: 'action',
      json: { 'banish': frens }
    })
  },
  makePoast: async (poast: Poast) => {
    console.log("making poast: ", {'make-poast': poast})
    await api.poke({
      app: 'loach',
      mark: 'action',
      json: {'make-poast': poast}
    })
  },
}));

export default useFeedStore;