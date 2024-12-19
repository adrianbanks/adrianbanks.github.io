---
layout: post
title: Cambridge Alexa Devs Meetup
categories: [alexa, sketchnotes]
tags: [alexa]
fullview: true
---

I recently attended the inaugural meetup of the [Cambridge Alexa Developers Group](https://www.meetup.com/Cambridge-Alexa-Developers-Meetup/) held at Amazon's Cambridge office. The group was set up by [Bob Harris](https://x.com/bobharrisuk) and [Rich Merrett](https://x.com/richmerrett815), who both gave talks on building Alexa skills and SSML.

[David Low](https://x.com/daviddlow), Amazon's Head of Solutions Architects, also gave a talk about how to best create a skill by working out its user value:

[![Working Backwards by David Low][1]][1]

One particlarly interesting thing covered was a formula for working out whether a skill will be a "killer skill":

<style>
  #alexa-killer-formula td {
    padding: 15px;
    text-align: center;
    cursor: help;
  }

  #alexa-killer-formula td.numerator {
    border-bottom: 1px solid black;
  }
</style>

<section id="alexa-killer-formula">
  <table>
    <tr><td class="numerator" title="Derived from customer research. Leap of faith assumption.">
      Cusomter value
    </td><td class="numerator">
      &times;
    </td><td class="numerator" title="Where voice adds higher value. Hands free situations, for example.">
      Contexts
    </td><td rowspan="2">
      &times;
    </td><td rowspan="2" title="Likely repeat use.">
      Frequency
    </td><td rowspan="2">
      &times;
    </td><td rowspan="2" title="Potential marketing activity. Reach of the skill.">
      Multipliers
    </td></tr>    
    <tr><td title="How difficult is the skill to navigate? Is it complicated, slow, lengthy?">
      Complexity
    </td><td>
      &times;
    </td><td title="Is there any technical friction? Variation in automatic speech recognition (ASR) vs natural language understanding (NLU)?">
      Friction
    </td></tr>
  </table>
</section>

The higher the output of this formula, the higher the likelihood that a skill will be succesful.

While this talk wasn't recorded, he has given a [similar talk](https://skillsmatter.com/skillscasts/10450-a-masterclass-in-building-amazon-alexa-skills-with-david-low) before that was.

  [1]: /assets/media/images/2018/04/working-backwards-david-low.jpg#img-sketchnote
