/-  *loach
=,  dejs:format
|_  act=action
++  grab
  |%
  ++  noun  action
  ++  json
    |=  jon=^json
    |^
    ^-  action
    ~&  >  jon
    %.  jon
    %-  of
    :~  [%let-me-in ul]          ::  add to pending
        [%allow parse-frens]    ::  remove from pending, add to trust
        [%find-my parse-frens]  ::  add to frens
        [%goodbye parse-frens]  ::  remove from frens
        [%banish parse-frens]   ::  remove from frens, trust, pending
        [%make-poast parse-poast]
    ==
    ::
    ++  parse-frens  (ar (se %p))
    ::
    ++  parse-poast
      %-  ot
      :~  [%pic so]
          [%label (mu so)]
          [%loc (mu (ot ~[[%lat (se %rs)] [%lon (se %rs)]]))]
      ==
    --
  --
++  grow
  |%
  ++  noun  act
  --
++  grad  %noun
--
