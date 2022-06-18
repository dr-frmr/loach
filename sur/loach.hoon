|%
+$  state-0
  $:  %0
      mine=feed
      frens=(map @p feed)
      trust=(set @p)
      pending=(set @p)
  ==
::
+$  feed  (map @da poast)
+$  poast
  $:  pic=@t
      label=(unit @t)
      loc=(unit [lat=@rs lon=@rs])
  ==
::
::  pokes
::
+$  action
  $%  [%let-me-in ~]          ::  add to pending
      [%allow f=(list @p)]    ::  remove from pending, add to trust
      [%welcome ~]            ::  notification of trust
      [%find-my f=(list @p)]  ::  add to frens
      [%goodbye f=(list @p)]  ::  remove from frens
      [%banish f=(list @p)]   ::  remove from frens, trust, pending
      [%make-poast =poast]
  ==
::
::  subs
::
+$  update
  $%  [%poast =poast]
      [%all-poasts =feed]
  ==
+$  frontend-update  [%frontend state-0]
--
