typewriter = require('typewriter')

NAME = 'Pete van Wesep'

reveal = ->
  document.querySelectorAll('.navbar, .role, .content, .site-footer').forEach (el) ->
    el.classList.add('active')
  return

syncActiveNav = ->
  current = (window.location.hash || '').replace('#', '')
  current = 'me' if current == '' or current == 'default'
  document.querySelectorAll('.navbar a').forEach (link) ->
    if link.getAttribute('data-react-copy') == current
      link.classList.add('is-active')
    else
      link.classList.remove('is-active')
  return

window.onbeforeunload = ->
  window.scrollTo 0, 0

document.addEventListener 'DOMContentLoaded', ->
  logo = document.querySelector('.logo')
  return unless logo

  syncActiveNav()
  window.addEventListener 'hashchange', syncActiveNav

  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if reducedMotion
    logo.textContent = NAME
    reveal()
    return

  tw = typewriter(logo).withAccuracy(100).withMinimumSpeed(18).withMaximumSpeed(26).build()
  tw.wait(200).type(NAME, -> reveal())
  return
