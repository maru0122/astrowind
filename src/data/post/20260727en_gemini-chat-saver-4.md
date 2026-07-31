---
title: "Part 4: When It Breaks, Just Fix the 'Raw Parts'. The Self-Reliance to Maintain Tools Yourself by Commanding AI"
publishDate: 2026-07-27
author: Shin
excerpt: "The final installment on gaining the self-reliance to remain unfazed even when 'the tool that worked yesterday suddenly stops'! I'll teach you the independent design of parser.js (assuming it will break) and the steps to give precise fix instructions to AI when the UI changes. Here's a summary of the thinking process to safely maintain and operate tools without completely leaving everything to AI."
image: ~/assets/images/blog/20260727en_gemini-chat-saver-4.png
category: chrome-extension
tags:
  - Chrome Extension
metadata:
  canonical: https://e-shikumi-labo.com/blog/
lang: "en"
---
Hello, I'm Shin from e-Shikumi-Labo.

This is the final installment (Part 4) of "Systematized Thinking," where we use AI to build our own tools and independently maintain them.

So far, we have discussed creating a prototype that automatically saves Gemini chat logs, converting them to Markdown for Obsidian integration, and elevating it to a safe, fully automated system.

In this final installment, we will cover the **"countermeasures for downtime due to screen specification changes,"** an unavoidable issue when operating tools that handle web data, and the core of the **"self-reliance"** humans should possess in the AI era.

## 1. The Web Data Extraction Compromise: "You Can't Extract What Isn't on the Screen"

During development, there was a time when I thought, "I also want to record the exact date and time (timestamp) when the chat was sent."

However, no matter how much I analyzed Gemini's screen structure, the exact timestamp of each utterance did not exist in the HTML.

The fundamental rule of web data extraction is: "You cannot extract data that does not exist on the browser screen."

As long as you are extracting data from the screen (DOM) rather than via an API, forcing the extraction of something that isn't there will require complex guesswork processes and will instead become a cause of trouble.

Understanding this "technical limit," gracefully giving up on what cannot be done, and judging to maintain simplicity is also an important element of tool building.

## 2. Specification Changes Are Not Defects, But "Fate"

As long as you deal with tools that extract data from other people's websites, the time will inevitably come when the tool suddenly stops working one day due to design changes or updates on Google's side.

"It was working fine until yesterday, but suddenly it stopped saving."

This is not a defect in the tool, but an unavoidable "fate" as long as you depend on someone else's platform.

The important thing is not to seek an "absolutely unbreakable, perfect tool." It is to accept the premise that it will break, **grasp "where and how to fix it when it breaks," and create a state where you can quickly restore it yourself.**

## 3. Isolated Design with "parser.js" and Repair Using AI

In the "Chat Saver for Gemini" created this time, the process of reading data from the screen (DOM parsing) is separated into an independent file called `parser.js`.

By separating the communication processing (`content.js`) and the parsing processing (`parser.js`) like this, even if Gemini's screen design changes, **you only need to modify designated places (like CSS selectors) inside `parser.js`.**

### Recovery Steps When UI Updates Break Things

If it stops working due to a screen change, the tasks humans need to perform are as follows:

1. **Check the new elements with DevTools (Inspect Tool)**
    
    Open Gemini in Chrome, press the `F12` key (or right-click > "Inspect"), and check and copy the new HTML structure of the prompt area and response area.
    
2. **Request the AI to fix it**
    
    There is no need to rewrite the code directly yourself. Pass the copied latest HTML elements and the current `parser.js` you have to the AI and instruct it to make corrections.
    

> **Prompt Example:**
> 
> "The `parser.js` stopped working due to a Gemini UI update. I have attached the current `parser.js` code, along with the latest HTML elements for the prompt area and response area. Based on this information, please modify the selector parts."

Even if you don't decipher the code yourself, simply presenting the parts that changed (input information) will prompt the AI to spit out the corrected code in seconds.

## 4. [Conclusion] What It Means to Be "Self-Reliant" by Controlling AI

What I wanted to convey throughout these four parts was not just how to build a tool.

- **Part 1:** Even if you don't perfectly understand code syntax, you can build a tool if you leave it to AI.
    
- **Part 2:** Expanding the mechanism to fit your own business challenges (like readability issues).
    
- **Part 3:** Noticing the risks (like account bans) in the code the AI produced and pulling the reins.
    
- **Part 4:** Preparing a structure on the premise that it will break, and maintaining it yourself using AI.
    

There is no need to memorize JavaScript syntax or detailed coding methods.

What humans really need to understand is the map of the overall system structure—"Input (extract from screen)" -> "Process (filter duplicates)" -> "Output (send to GAS)"—and a perspective of consideration for the data extraction source.

As long as this structural map is in your head, you can notice dangerous code produced by AI and order corrections, and even if the screen changes, you can give precise instructions to continue safely controlling the tool.

From being on the side used by tools, to being on the side that operates systems while commanding AI.

I hope you all will also learn the right way to interact with AI and acquire the "self-reliance" to build and maintain safe systems tailored to yourselves.
