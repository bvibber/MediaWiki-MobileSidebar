MediaWiki-MobileSidebar
=======================

Mobile sidebar proto-gadget adds the ability to open the mobile view (same as on *.m.wikipedia.org) of any viewed page in a right-aligned sidebar; when opened it remains persistent across page navigations.

This is intended to help editors identify problematic page and template rendering -- such as tables that do not fit on a 320px screen -- without having to dig out a separate browser or device for side-by-side testing.


To test with the github copy add to your common.js:

```
mw.loader.load('https://rawgit.com/brion/MediaWiki-MobileSidebar/master/mobile-sidebar.js', 'text/javascript');
mw.loader.load('https://rawgit.com/brion/MediaWiki-MobileSidebar/master/mobile-sidebar.css', 'text/css');
```
