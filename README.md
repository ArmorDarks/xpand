xpand
=====

> jQuery pluging for accordions and expanding blocks

Displays target on `this` click and hides on another.

How to use
----------

Define `js-expand` class on element, which will control toggling of blocks:

``` js
import $ from 'jquery'
import 'expand'

$(() => {
  $('.js-expand').expand()
})
```

It's recommended to use `<button>` as controlling elements, since it will keep
everything accessible for keyboards out of box.

With default settings, set `js-expand__target` on element, which should be expanded.
If scoping enabled, with default settings set `js-expand__scope` on any parent, to define
scope, within which `js-expand` should search for targets to expand.

Note, that it's possible to control single target with few buttons, but
current plugin _will not_ propagate target changes to another button.
So it's up to end user to be accurate with scopes.

Settings
--------

Defaults can be changed by passing options as an object to `xpand` call. See `index.js` for list of possible settings.

On-the-fly adjustment
----------------------

Individual expander behaviour can be altered by setting following attributes
on html element, bearing `js-expand`:

- `class='is-active'` — to make target expanded by default.

- `data-expand='{{ your query }}'`:
  - `false` or unspecified - toggles targets, defined by `userOptions.defaultTargetQuery` query.
  - `your query` — query of a container, which should be expanded on this click.

- `data-expand-scope='{{ next || true || your query }}'`:
  - `false` or unspecified — selects absolutely all targets defined by `data-expand` query
  - `next` — selects all next siblings with defined in `data-expand` query.
  - `true` — selects all targets defined by `data-expand` query within scope, defined by closest
             container, which defined by `userOptions.defaultScopeQuery` query.
  - `your query` — same as `true`, but you can specify specific query of defining scope container.

Usage examples
--------------

``` html
<div>
  <button class='js-expand' data-expand='.js-expand__target1'>Togle 1</button>
  <p class='js-expand__target1'>Content 1</p>
</div>

<div class='js-expand__scope11'>
  <button class='js-expand is-active' data-expand-scope='.js-expand__scope11'>Togle scope 11</button>
  <p class='js-expand__target'>Togle 1</p>
</div>
```