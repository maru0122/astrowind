---
title: "Avoiding Ban Risks in Chrome Extension Automation: Smart DOM Monitoring with MutationObserver (Part 3)"
publishDate: 2026-07-24
author: Shin
excerpt: "Taking on the challenge of fully automating the Gemini chat log saver (Part 3). I detail the process of avoiding the risks of periodic execution every 1.5 seconds, and building a smart DOM monitoring process (MutationObserver) that doesn't burden the other party's server. I'll share the thinking process of having the human point out risks and making the AI come up with safe alternatives."
image: ~/assets/images/blog/20260727en_gemini-chat-saver-3.png
category: chrome-extension
tags:
  - Chrome Extension
metadata:
  canonical: https://e-shikumi-labo.com/blog/
lang: "en"
---
Hello, I'm Shin from e-Shikumi-Labo.

This is Part 3 of "Systematized Thinking," where we use AI to build our own tools and independently maintain them.

Last time, I talked about creating a system to automatically output Markdown (.md) files to Google Drive simultaneously with appending to a spreadsheet.

With list management in a spreadsheet and a comfortable viewing environment in Obsidian established, it was getting very close to completion as a tool.

However, as I continued to use it practically, new challenges emerged on the operational front. This time, I will share the **risks I faced while transitioning from a "manual button" to "full automation," and the process of evolving into safe code.**

## 1. I Want to Eliminate the "Hassle of Pressing a Button"

During the prototype stage, the system was designed so that logs were saved by pressing a button placed on the screen.

However, as long as a human operates it manually, there are inevitably limitations.

- If you are concentrating on the conversation, you might forget to press the save button and close the screen.
    
- If the conversation gets long, you might miss past utterances that are no longer displayed on the screen.
    

"If I have the screen open and am conversing, I want it to automatically save in the background without bothering human hands."

Thinking this, I asked the AI to write the code for full automation.

## 2. The Code the AI Produced: "Patrolling the Screen Every 1.5 Seconds"

When I consulted the AI, it immediately presented code for full automation.

The mechanism was, "Start a timer every 1.5 seconds, check the entire screen in the background, and send any new utterances."

When I actually tried it, the logs accumulated automatically as soon as I conversed without pressing the button, and at first glance, it looked like exceptionally well-done full automation.

However, I felt something was slightly off regarding this "monitoring on a 1.5-second cycle."

## 3. The Ban Risk Hidden in "It Should Be Fine Because It's Inside the Browser"

Initially, I thought, "It's just watching the screen on my own browser (local processing), so it should be fine."

However, drawing from my past experience with web data extraction (scraping), a sensation crossed my mind: "Showing unnatural behavior to the other party's server is dangerous."

So, just to be sure, I decided to check with the AI: "Is there any risk in this 1.5-second monitoring code?" Then, I received an unexpected response from the AI.

> **AI:**
> 
> "Actually, there are risks.
> 
> 1. **External transmission (GAS) speed is too fast.**
>     
>     If you monitor on a 1.5-second cycle, data is transmitted externally every single time at a speed impossible for a human (within a mere 1.5 seconds) the moment Gemini's response finishes. From the other server's perspective, it can easily determine in one shot that 'logs are being forwarded at precise intervals immediately after a response = an automated tool is running.'
>     
> 2. **Monitoring programs exist even within the same browser.**
>     
>     Within the Gemini tab, Google's security scripts are also running in real-time on your own browser. If you monitor and manipulate the screen at an ultra-high frequency, there's a risk of triggering flags for mechanical detection."
>     

Hidden behind the assumption that "it's safe because it's inside the browser" was a serious risk that could lead to Google account restrictions (ban).

The AI, focused on building the instructed functionality, hadn't considered things that far. It was a moment when I acutely realized that **while AI can build "working code," it won't spontaneously calculate "account risks or consideration for the other party."**

## 4. Encountering a Smart Mechanism by Making AI Think of Alternatives

To stop the dangerous 1.5-second patrol processing, I issued the following instruction to the AI:

> **"Please stop the periodic execution (timer processing) every 1.5 seconds. Please think of another safe method that does not burden the other party's server and has no account risks."**

The human side doesn't need to know the "safe technology." Just point out the risk and throw it back, saying, "Do it a different way," and the AI will think of technical alternatives.

What the AI proposed was the browser's standard feature, **`MutationObserver` (a feature that monitors screen changes)**.

I myself didn't even know such a convenient mechanism existed that could pinpoint and detect the exact moment a change occurred in the screen's HTML structure.

Furthermore, to prevent data from being sent multiple times while Gemini is in the middle of a long response, the AI also incorporated a contrivance into the code: "Wait 3 seconds after the screen movement stops, and send only once at the timing generation is complete (debounce processing)."

JavaScript

```
// Conceptual code inside content.js (Detect screen changes, send 3 seconds after coming to a rest)
const observer = new MutationObserver((mutations) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    scanAndAutoSave(); // Execute send processing after screen movement stops
  }, 3000);
});
```

"Point out the risky method and make the AI think of another way."

Through this exchange, I was able to evolve it into a safe, efficient, fully automated saving tool that doesn't burden the other party's server.

## Next Time Preview

Having successfully balanced full automation and safety, "Chat Saver for Gemini" was completed as a practical tool.

However, as long as you deal with tools that extract data from other people's websites, there is an unavoidable fate.

That is the problem of "it suddenly stops working one day due to changes in the other party's site design or specifications (updates)."

Next time, I will share calm coping strategies when the tool breaks, maintenance procedures using `parser.js`, and the core of the "self-reliance" humans should possess in the AI era. Look forward to it!
