::  loach: image feeds from friends
::
/-  *loach
/+  default-agent, dbug, verb
|%
+$  card  card:agent:gall
+$  state-0
  $:  %0
      mine=feed
      frens=(map @p feed)
      trust=(set @p)
      pending=(set @p)
  ==
::
::  helpers
::
++  frontend-card
  |=  =state-0
  ^-  card
  [%give %fact ~[/frontend] %frontend-update !>([%frontend state-0])]
::
++  welcome-cards
  |=  l=(list @p)
  ^-  (list card)
  %+  turn  l
  |=  p=@p
  [%pass /poke %agent [p %loach] %poke %action !>([%welcome ~])]
::
++  leave-cards
  |=  l=(list @p)
  ^-  (list card)
  %+  turn  l
  |=  p=@p
  [%pass /follow %agent [p %loach] %leave ~]
::
++  follow-cards
  |=  l=(list @p)
  ^-  (list card)
  %+  turn  l
  |=  p=@p
  [%pass /follow %agent [p %loach] %watch /feed]
::
++  kick-cards
  |=  l=(list @p)
  ^-  (list card)
  %+  turn  l
  |=  p=@p
  [%give %kick ~[/feed] `p]
--
::
=|  state-0
=*  state  -
%-  agent:dbug
%+  verb  |
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %|) bowl)
::
++  on-init  `this(state [%0 ~ ~ ~ ~])
++  on-save  !>(state)
++  on-load  |=(=old=vase `this(state !<(state-0 old-vase)))
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ~&  >  "got watch on {<path>}"
  ?+    path  !!
      [%feed ~]
    ?>  (~(has in trust) src.bowl)
    [%give %fact ~ %update !>([%all-poasts mine])]~^this
  ::
      [%frontend ~]
    ?>  =(src.bowl our.bowl)
    [(frontend-card state)^~ this]
  ==
::
++  on-poke
  |=  [=mark =vase]
  ~&  >>>  "poak recieved: {<vase>}"
  ^-  (quip card _this)
  ?.  ?=(%action mark)  !!
  =/  act  !<(action vase)
  ?-    -.act
      %let-me-in
    =.  pending  (~(put in pending) src.bowl)
    [(frontend-card state)^~ this]
  ::
      %allow
    ?>  =(src.bowl our.bowl)
    =+  (silt +.act)
    =.  trust    (~(uni in trust) -)
    =.  pending  (~(dif in pending) -)
    [(snoc (welcome-cards +.act) (frontend-card state)) this]
  ::
      %welcome
    ?.  (~(has by frens) src.bowl)  `this
    [(snoc (follow-cards src.bowl^~) (frontend-card state)) this]
  ::
      %find-my
    ?>  =(src.bowl our.bowl)
    =+  (malt (turn +.act |=(p=@p [p *feed])))
    =.  frens  (~(uni by frens) -)
    [(snoc (follow-cards +.act) (frontend-card state)) this]
  ::
      %goodbye
    ?>  =(src.bowl our.bowl)
    =+  (malt (turn +.act |=(p=@p [p ~])))
    =.  frens  (~(dif by frens) -)
    [(snoc (leave-cards +.act) (frontend-card state)) this]
  ::
      %banish
    ?>  =(src.bowl our.bowl)
    =+  (malt (turn +.act |=(p=@p [p ~])))
    =.  frens    (~(dif by frens) -)
    =+  (silt +.act)
    =.  trust    (~(dif in trust) -)
    =.  pending  (~(dif in pending) -)
    [(snoc (kick-cards +.act) (frontend-card state)) this]
  ::
      %make-poast
    ?>  =(src.bowl our.bowl)
    =.  mine  (~(put by mine) now.bowl `poast`+.act)
    :_  this
    :~  (frontend-card state)
        [%give %fact ~[/feed] %update !>([%poast `poast`+.act])]
    ==
  ==
::
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ~&  >>  "got {<sign>} on {<wire>}"
  ?.  ?=([%follow ~] wire)  (on-agent:def wire sign)
  ?:  ?=(%watch-ack -.sign)
    ?~  p.sign  `this
    ::  not allowed to follow, try poke
    ~&  >>  "follow rejected, attempting let-me-in"
    :_  this
    [%pass /poke %agent [src.bowl %loach] %poke %action !>([%let-me-in ~])]~
  ?:  ?=(%kick -.sign)
    :_  this  ::  attempt to re-sub
    [%pass wire %agent [src.bowl %loach] %watch (snip `path`wire)]~
  ?.  ?=(%fact -.sign)  `this
  =/  upd  !<(update q.cage.sign)
  ?-    -.upd
      %poast
    ?~  feed=(~(get by frens) src.bowl)  `this
    =.  frens  (~(put by frens) src.bowl (~(put by u.feed) now.bowl poast.upd))
    [(frontend-card state)^~ this]
  ::
      %all-poasts
    ?~  feed=(~(get by frens) src.bowl)  `this
    =.  frens (~(put by frens) src.bowl feed.upd)
    [(frontend-card state)^~ this]
  ==
::
++  on-arvo  on-arvo:def
++  on-peek  on-peek:def
++  on-leave  on-leave:def
++  on-fail   on-fail:def
--
