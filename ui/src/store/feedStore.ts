import create from "zustand"
import { SubscriptionRequestInterface } from "@urbit/http-api";
import api from "../api";
import { Poast } from "../types/Poast";

interface FrontendUpdate {
  mine: Map<string, Poast>,
  frens: Map<string, Map<string, Poast>>,
  trust: string[],
  pending: string[],
}

export interface FeedStore {
  mine: Map<string, Poast>,
  feeds: Map<string, Map<string, Poast>>,
  init: () => Promise<void>,
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
  mine: new Map<string, Poast>,
  feeds: new Map<string, Map<string, Poast>>,
  init: async () => {
    const handleFrontendUpdate = (data: any) => {
      console.log("YO!", data)
      set({ })
    }

    api.subscribe(createSubscription('loach', '/frontend', handleFrontendUpdate))
    console.log("hi")
  },
  letMeIn: async () => {
    await api.poke({
      app: 'loach',
      mark: 'action',
      json: { 'let-me-in': null }
    })
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
    await api.poke({
      app: 'loach',
      mark: 'action',
      json: { 'make-poast': JSON.stringify(poast) }
    })
  },
}));

export default useFeedStore;