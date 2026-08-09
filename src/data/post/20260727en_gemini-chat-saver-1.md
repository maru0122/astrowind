---
title: "Building a Chrome Extension to Auto-Save Gemini Chat Logs using AI (Part 1)"
publishDate: 2026-07-20
author: Shin
excerpt: "Avoid the trap of 'I made the AI write the code, but it doesn't match the actual screen and won't work'! I'm revealing the development process behind a tool that automatically saves Gemini chat logs. In Part 1, I'll show you how to effectively control AI through understanding system structure and giving precise instructions using DevTools."
image: ~/assets/images/blog/20260727en_gemini-chat-saver-1.png
category: chrome-extension
tags:
  - Chrome Extension
metadata:
  canonical: https://e-shikumi-labo.com/blog/
lang: "en"
---
Hello, I'm Shin from e-Shikumi-Labo.

How do you all manage your conversations with Gemini? When you manage to extract a useful response from the AI, have you ever thought, "I want to keep this somewhere"?

It all started from a simple, practical desire in my daily work: "I want to automatically save useful conversations from Gemini to a spreadsheet before they fade away." So, borrowing the power of Generative AI (Gemini), I tried making my own personal Chrome extension.

Over this four-part series, I will write about "systematized thinking"—the process of utilizing AI to build tools and independently maintaining them.

In Part 1, I'll share the developmental dialogue process: "How did I instruct the AI, what information did I provide, and how did we complete the prototype?"

## 1. A Prompt That Says: "Don't Guess, Ask for the Information You Need"

As the very first step in development, I threw this prompt directly at Gemini itself.

> **"I want to save Gemini's responses to a spreadsheet using a Chrome extension. Tell me how to build it without using your imagination. If you need any specific information, please point it out."**

The key here lies in two constraints: **"without using your imagination"** and **"point out if you need information."**

When you try to build a web data extraction tool using AI, the AI often tends to "guess" the internal structure of the webpage (like HTML tags and class names) on its own and write the code. And even when you test this supposedly completed code, you fall into the trap of it not working because it doesn't align with the actual screen structure.

To avoid this trap, I explicitly communicated, "Don't guess on your own. If there's missing information, I want you to demand it from the human side."

## 2. A Game of Catch with AI Using DevTools

When I threw this prompt, the AI returned the following response:

> **AI:**
> 
> "Understood. To create code that works reliably while eliminating guesswork, please retrieve and paste the following two HTML elements (code snippets) from your current Gemini screen.
> 
> 1. The element surrounding the user's (your) prompt text.
>     
> 2. The element surrounding Gemini's response text."
>     

The AI specifically requested the "materials necessary to write working code."

From here on, it's human work. I opened Gemini in the Chrome browser, pressed the `F12` key (or right-clicked > "Inspect"), and launched the Developer Tools (DevTools).

I selected the HTML code for my prompt area and Gemini's response area, copied it, and pasted it into the chat window with the AI.

```
[Human]
Here is the HTML for the prompt area: <div class="query-text">...</div>
Here is the HTML for the response area: <div class="markdown-main-panel">...</div>
```

## 3. Completing the Prototype and Reflecting on My Past Self

Receiving this information, the AI wrote the data extraction logic (JavaScript) that precisely targeted those elements, along with the program to send that data to a spreadsheet.

When I prepared the files as instructed, loaded the extension into Chrome, and conversed with Gemini, the data I typed on the screen was automatically written to the spreadsheet in the background.

When I confirmed it was working, I felt a deep sense of emotion.

Actually, in the past, I had a period where I was painstakingly and clumsily trying to build a tool to scrape data from a domestic flea market site, checking the HTML elements of complex screens one by one.

As someone who knows the difficulty of web data extraction, seeing the sheer skill with which the AI analyzed the HTML elements I provided, assembled accurate code, and made it work made me truly feel the evolution of our times. Thinking about my past struggles, the difference in development speed is obvious.

Here, I gained one important "realization."

In today's age, humans don't need to memorize the JavaScript syntax for Chrome extensions. You can leave the actual coding to the AI without any issues.

The reason I was still able to build the tool was because **I understood the overall system structure of "Input (extract from screen)" -> "Process (filter duplicates)" -> "Output (send to GAS)", and I knew how to pass accurate, on-the-ground information (HTML elements) to the AI.**

I realized that the real initiative in tool-building lies not in knowing the grammar, but in "grasping the overall mechanism and how to control the AI."

## 4. About the Finished Tool: "Chat Saver for Gemini" (Lite & Pro)

Building upon this prototype, I layered on robust error handling, duplicate prevention processing, and file export options. To accommodate different workflows, I split the tool into two editions: **Lite** and **Pro**.

### 📄 Free Edition: Chat Saver for Gemini (Lite)
For users who want a **zero-setup, 1-second solution** without configuring backend scripts or Google Apps Script (GAS), I created the **Lite version**.

- **Instant Local Export:** Export your current Gemini chat directly to a Markdown (`.md`) file with 1 click.
- **Zero Configuration:** Works right out of the box—no GAS web apps, spreadsheet links, or API keys required.
- **100% Private:** Runs entirely inside your local browser without sending data to any external server.

If you just want to quickly save your chat logs into local files or note-taking apps like Obsidian, you can grab the Lite version source code for free on GitHub:

🔗 **[Chat Saver for Gemini - Lite (Free & Open Source on GitHub)](https://github.com/maru0122/chat-saver-for-gemini-lite)**

---

### 🚀 Full Auto-Sync Edition: Chat Saver for Gemini (Pro)
For those who think, "Rather than manual exports, I want continuous, real-time background syncing to Google Sheets and Google Drive," the **Pro version** provides the complete automated pipeline.

It automatically detects new responses as you chat (`MutationObserver`) and pushes diffs seamlessly to your cloud storage without duplicate entries.

🔗 **[Chat Saver for Gemini - Pro (View the complete code package on Gumroad)](https://maru0122.gumroad.com/l/chatsaverforgemini)**
> ⚠️ **Things You Should Know as a Prerequisite**
> 
> Since the counterpart is Google (Gemini), there is a possibility that it will stop working due to UI specification changes. It is not a product with a guarantee of permanent operation; please use it simply as a "tool to experience the mechanism and make practical work more convenient."

## 5. Limitations in Practical Use (Not Bugs)

To prevent misunderstandings after introduction, I am also clearly stating the technical limitations (prerequisites).

- ⚠️ **Conversations from the smartphone app cannot be saved.**
    
    Because it utilizes the mechanism of a PC Chrome extension, it will not work from a smartphone.
    
- ⚠️ **There is no bulk sync feature for past logs.**
    
    However, even for past threads, if you simply open them once in a PC browser, it will automatically detect and save the most recent conversation.
    

## Next Time Preview

We successfully achieved automatic saving to a spreadsheet. However, when I actually started using it heavily in my work, I ran into a new challenge.

**"When long texts or source code go into a single cell in a spreadsheet, it's hard to read and difficult to reuse."**

Next time, I'll cover the mechanism of not only saving to a spreadsheet but also automatically generating "Markdown (.md) files" directly to Google Drive simultaneously, allowing you to comfortably build a knowledge base in your local note-taking app (like Obsidian).
