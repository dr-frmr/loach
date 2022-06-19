/-  *loach
=,  enjs:format
|_  upd=frontend-update
++  grab
  |%
  ++  noun  frontend-update
  --
++  grow
  |%
  ++  noun  upd
  ++  json
    ^-  ^json
    |^
    (process upd)
    ++  process
      |=  upd=frontend-update
      %-  pairs
      :~  ['mine' (make-feed mine.upd)]
          ['frens' (make-feeds frens.upd)]
          ['trust' (make-set trust.upd)]
          ['pending' (make-set pending.upd)]
      ==
    ::
    ++  make-set
      |=  s=(set @p)
      :-  %a
      %+  turn  ~(tap in s)
      |=(p=@p [%s (scot %p p)])
    ::
    ++  make-feeds
      |=  frens=(map @p feed)
      %-  pairs
      %+  turn  ~(tap by frens)
      |=  [p=@p =feed]
      :-  (scot %p p)
      (make-feed feed)
    ::
    ++  make-feed
      |=  =feed
      %-  pairs
      %+  turn  ~(tap by feed)
      |=  [t=@da =poast]
      :-  (scot %da t)
      (make-poast poast)
    ::
    ++  make-poast
      |=  =poast
      %-  pairs
      :~  ['pic' [%s pic.poast]]
          ['label' ?~(label.poast ~ [%s u.label.poast])]
          ['loc' ?~(loc.poast ~ (make-loc u.loc.poast))]
      ==
    ::
    ++  make-loc
      |=  [lat=@rs lon=@rs]
      %-  pairs
      :~  ['lat' [%s (scot %rs lat)]]
          ['lon' [%s (scot %rs lon)]]
      ==
    --
  --
++  grad  %noun
--
