---
layout: post
title: Tracking the unmeasurable with OKRs
categories: [ddd-events, okrs]
tags: [fermi, okrs]
fullview: true
---

Back in May 2022, the team I work on was tasked with handing over the products we're responsible for to another team so that we could move to another area of the business. This list of products is a fairly big (one main product, then eight smaller peripheral ones), so it was quite a daunting prospect when we were presented with it. As part of the handover, we didn’t want the commercial value of the products to diminish, as they currently bring in a lot of revenue for the company. 

Before we started the work, we set out to create some [OKRs](https://en.wikipedia.org/wiki/OKR) (Objectives and Key Results) to ensure that we knew what we were trying to achieve. The objective part was fairly straightforward as we had a clear goal, and we came up with the following team objective:

> "Successfully hand over the products to the other team, while maintaining the commercial value of the products.”

When we came to create the key results, we found ourselves stuck. Normally, key results are a measurable outcome required to achieve an objective, and track the current progress towards the objective. If our objective was to successfully hand over the products, we would need to measure if the handover was actually successful. This is obviously something that is impossible to know beforehand, so how could we measure something that we can’t possibly know?

# Fermi questions and the Highways Agency

In June 2022, I was attending the [DDD South West](https://dddsouthwest.com) software conference in Bristol. At this conference, I attended a talk by Gary Short entitled [“Data Scientists: Making Shit Up Since 1974”](/2022/07/04/dddsw-10.html#data-scientists-making-shit-up-since-1974).

[![Data Scientists: Making Shit Up Since 1974  by Gary Short][1]][1]

Gary talked about his time working as a data scientist at the Highways Agency. He had been tasked with calculating “the monetary value for the inherent risk associated with highway assets”. In simple terms, what is the minimum cost per year to maintain the road networks before things go wrong? This is a tough problem, with no real data to work from to come up with an answer.

Enter [Fermi questions](https://en.wikipedia.org/wiki/Fermi_problem): these are questions with no real correct answers, named after physicist [Enrico Fermi](https://en.wikipedia.org/wiki/Enrico_Fermi) who figured out how to approximate the strength of an atomic bomb with little data. You might have come across these types of questions before as they are often used in interviews as thought exercises to see how a candidate approaches a problem (well-used ones are “how many piano tuners are there in Chicago?”, or “how many ping pong balls fit into a Boeing 747?”). In an interview setting, these questions aren’t meant to get an accurate answer, but instead to gauge whether you can create a simple model of a system that is unknown to you, but for which you are familiar with the fundamental rules that govern it. Perhaps the most well-known of these is the [Drake equation](https://en.wikipedia.org/wiki/Drake_equation), used to estimate how many communicative civilizations there are in the Milky Way.

Gary showed how he used this technique to gather information that helped him to calculate the monetary cost.

## Elicitation of data

So how do you come up with an answer to a problem if there is no data to base an answer on? This assumption isn't really true - typically there is data, but you just don't know what it is. As a result, you need to elicit that data out of the people who know the relevant area well.

Part of the cost associated with the road network is how often roadway drainage gullies get cleaned out. If you were to ask someone who knows this work well what the minimum cost to do this is, they could not give you an answer. What you can do instead is elicit the data from them by asking the right things. If you were to ask “could the gullies be cleaned out only once per year?”, you would probably get a response of “oh no, they have to be done at least once before winter and once before spring”. Equally, if you were to suggest doing it every month, they would say that would be far too often. This shows that there is data to go on, and that it is possible to narrow down something that could be accurate.

## Plausible limits and quartiles

https://youtu.be/qIdr8o37NTo?t=1049

set plausible limits. 



Don’t try to score how often we should clean the gullies, but instead given that we clean them twice per year, what is the confidence that they will remain clear?

Car example - will the car start each morning? How confident are you based on what you know?


We couldn’t check with the other team about their confidence as they were too busy doing other stuff to even start to understand our things.





A good technique for getting this data out of people is to first work out the plausible limits of the data, and then use that to estimate the actual values. You start by working out what the possible lower and upper bounds are for the thing you are interested in.







The range isn't how often, it's the probablility of failure given those circumstances.


A good technique for this is to use the method of quartiles to elicit an estimate without asking for a numberical value directly. You first need to work out the lower and upper bounds for the possible answer, then add in the median and the quartiles. Sometimes the median and quartiles may not be evenly spaced, and that is ok.

[![Quartiles][2]][2]

You can then use this range to place an estimate. In the case of roadway gully cleaning, let's assume that the lower frequency is once per year, and the upper frequency is every month. This gives the possible range, and means that the minimum that the gullies need to be cleaned out without getting blocked lies somewhere between the two values. You can then ask the people who know this job well whether the correct frequency is in the bottom or top half. Let's say they choose the bottom half.



Based on this, you can figure out the correct cadence for cleaning out the gullies, and therefore the annual cost associated with it. Scale this up across all departments and assets and you can get a fairly accurate figure for the whole cost of the Highways Agency assets.












# Back to the handover

On returning from this conference, it struck me that a similar technique could be employed to figure out our key results problem. Since we couldn’t know if the handing the products over would be a success before actually doing so, could we instead figure out our confidence that the handing over would be a success and use that as a measure?

The team got together to brainstorm ideas that we could use to show what criteria would count towards success, and therefore what success would look like overall.

[![Working out the statement of success][3]][3]

Once we had these, we summarised them into a statement of success:

> “Given that we have a two week handover period with the other team, we will be contacted fewer than four times in the subsequent next four weeks.”

We felt that if we were confident that we could meet this goal, then the handover could be considered a success. Note that this wasn’t our key result, as we still couldn’t measure this until after the fact. Instead, we had to figure out how to measure our confidence that we could meet this goal.

It's also worth noting that this statement isn't necessarily what we would eventually be doing, but is more to aid framing the estimation of our confidence.

## Measuring our confidence

To track our confidence, we had to come up with a measurable value. To do this, we worked out what things we thought would have an effect on our confidence.

[![Estimation of baseline][4]][4]

Once we had these, !!!!!!!!!!EXPAND ON THIS TO INCLUDE THE MATHS!!!!!!!!!!! we then assigned a weighting to each based on how much its effect was. These weightings, combined with our confidence scores each week, would be used to work out our overall confidence levels.

We also decided that an 80% confidence would be high enough as a target for this work, so we now had something to aim for. We were now all set to estimate a starting baseline.

# The handover process

As we were handing over the main product and several smaller peripheral products, we decided to split them up into two stages, doing the smaller peripheral products first before doing the main product separately.

## Handing over the smaller peripheral products

[![Initial confidence estimate][5]][5]

By assigning our best confidence estimates to each item we thought had an effect on success, multiplying by its respective weighting, then doing some simple maths, we came up with an initial starting confidence of 56%. That is, before starting any handover work on the peripheral products, we were 56% confident that the handover would be successful.

This was a really useful figure, as we were now able to focus on the things that would increase this measure. Each week we would do the same estimation process after doing more work to prepare for handover, allowing us to track our progress towards the 80% confidence.

At the start of each week, we re-evaluated our confidence of success based on the work we had done in the past.

[![Our weekly confidence estimates for the smaller peripheral products][6]][6]

(the high bar on the right was a final estimation after we had fully completed all handover work, hence the gap in the dates)

## Handing over the main product

Once we had done the handover of the smaller peripheral products, we did the same process for the handover of the main product. We did tweak the process, as we felt that one of the properties we were measuring was redundant (investment of our effort, as we were fully focused on this work and so this figure was irrelevant).

[![Our weekly confidence estimates for the main product][7]][7]

After a few months of work, we reached our target. When we evaluated whether we were ready for handover at this point, we felt that we needed a higher target confidence than for the peripheral products, so we raised the target threshold. Notice also that there was a dip in confidence part-way through the process. This was due to us finding some unexpected complexity and realising that we needed to do more work to be ready for handover.

# So how did we do?

After hitting the confidence targets for the peripheral products, we felt that we were ready to start the actual handover, so we scheduled a handover week with the other team and set about handing them over. The handover went smoothly, with us demonstrating each product to the other team and showing how they were built and released. That other team have now been responsible for the peripheral products since mid-November, and we have had no follow-up questions from them (there have been a few questions about the build system and support processes, but nothing about the actual products).

As for the main product, we handed it over at the beginning of December, but my team have continued to work on it to improve the last feature that we released before handing over. To date, we have had one product related question back from the other team.

# Summary

With the benefit of hindsight, I feel that applying the Fermi estimation technique for our key results worked well, and that at the point of starting the actual handover work to the other team, we were confident that it would be a success. It's a technique I'd certainly use again if similar circumstances arose.


  [1]: /assets/media/images/2023/01/data-scientists-making-shit-up-since-1974-gary-short.jpg#img-sketchnote
  [2]: /assets/media/images/2023/01/quartiles.png
  [3]: /assets/media/images/2023/01/statement-of-success.png
  [4]: /assets/media/images/2023/01/estimation-of-baseline.png
  [5]: /assets/media/images/2023/01/initial-confidence-estimate.png
  [6]: /assets/media/images/2023/01/peripheral-products-confidences.png
  [7]: /assets/media/images/2023/01/main-product-confidences.png
