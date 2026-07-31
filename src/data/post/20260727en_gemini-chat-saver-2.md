---
title: "Part 2: Spreadsheets Are Hard to Read. Building a System to Auto-Generate Markdown Files Simultaneously via GAS"
publishDate: 2026-07-22
author: Shin
excerpt: "Solved the 'long texts and code are hard to read' issue in spreadsheet saves! I expanded GAS to build a system that auto-generates Markdown (.md) files to Google Drive. I'll explain the process of fixing a line-break bug with AI, and the ingenuity behind a 'robust design' resistant to UI changes."
image: ~/assets/images/blog/20260727en_gemini-chat-saver-2.png
category: chrome-extension
tags:
  - GAS
  - Chrome Extension
metadata:
  canonical: https://e-shikumi-labo.com/blog/
lang: "en"
---
Hello, I'm Shin from e-Shikumi-Labo.

This is Part 2 of "Systematized Thinking," where we use AI to build our own tools and independently maintain them.

Last time, I talked about creating a Chrome extension that automatically saves Gemini chat logs to a spreadsheet.

Data successfully started accumulating in the spreadsheet, and I was satisfied for the time being. However, as I used it heavily in my actual work, a new desire emerged.

This time, I'll share the **process of expanding the system from saving to a spreadsheet to 'auto-generating Markdown (.md) files'.**

## 1. The Catalyst: Discovering "Obsidian"

Saving to a spreadsheet itself was convenient, but as the logs increased, I ran into a single problem.

When long responses or programming code are crammed into a single cell, they inevitably become hard to read and difficult to reuse.

Around that time, I started using the knowledge management app "Obsidian."

Obsidian is a tool that allows you to comfortably view and organize Markdown text files locally. The catalyst for everything was when I started thinking, "It would be convenient if I could accumulate useful conversations with Gemini here as Markdown files, too."

## 2. "If GAS Can Create Text, It Must Be Able to Do .md Too"

What came to mind then was the specification of Google Apps Script (GAS).

"If I use GAS, I can create and save text files in Google Drive. In that case, it should be able to output Markdown files with a `.md` extension, too."

With that inspiration, I immediately decided to consult the AI.

I wanted to avoid inefficient processes like sending data twice from the Chrome extension (the sender side), so I asked the AI to expand the code of the receiver side, GAS.

> **"I want to modify the current GAS code that saves to the spreadsheet. When data is received, please add a process to simultaneously append it to the spreadsheet and output a Markdown (.md) file to a specified folder in Google Drive."**

GAS excels at integrating Google services with each other. In no time, a code was completed that, triggered by a single data reception, flawlessly executed both "writing to the spreadsheet" and "generating a .md file to Google Drive" simultaneously.

## 3. "The Line Breaks Disappeared?" Fixing a Bug with AI

However, when I conducted actual output testing, trouble occurred.

Although headings and bold text included in Gemini's responses were converted to Markdown syntax (`#` or `**`), **for some reason, all line breaks in the text disappeared, resulting in one continuous line of text.**

Since I couldn't understand the cause even by looking at the code, I communicated the phenomenon occurring on the screen exactly as it was to the AI.

Plaintext

```
[Human]
The text looks somewhat like Markdown, but all the line breaks have disappeared, turning it into a single continuous line. Please fix it so the line breaks are preserved.
```

Then, the AI gave this response:

> **AI:**
> 
> "I apologize. When duplicating (`cloneNode`) the element on the screen in the background to extract text information, the line break rules were being ignored due to browser processing constraints. I will modify the logic to correctly supplement line feed codes based on the HTML structure."

It's sufficient to leave technical specification talk to the AI. Even if you can't decipher the code, simply communicating "the weird situation happening on the screen" exactly as it is allows the AI to identify the cause and fix it for you.

## 4. Ingenuity in "Title Extraction" Resistant to UI Updates

One more thing I contrived for practical application was the "method for acquiring the file name (chat title)."

If you try to parse and extract the HTML element containing the "title text" displayed on the Gemini screen, the tool will break immediately just by Google making a slight change to the screen design.

Therefore, I adopted a simple and robust approach.

It's the method of "acquiring the browser's tab name (`document.title`) and trimming unnecessary text (like `- Google Gemini`) from it to use as the file name."

JavaScript

```
// Conceptual code inside parser.js (Removing unnecessary text from the tab name)
let chatTitle = document.title
  .replace(' - Google Gemini', '')
  .replace(' - Google', '')
  .replace(' - Gemini', '')
  .trim();
```

While the internal structure of a webpage (HTML) changes frequently, the format of the title displayed in the browser tab tends to be less susceptible to change. When extracting data from someone else's site, this kind of design ingenuity—"taking data from places that are unlikely to break"—becomes crucial.

## Next Time Preview

In addition to list management in a spreadsheet, we have achieved the automatic output of Markdown files to Google Drive, making it comfortable to view them in Obsidian.

I was satisfied, thinking, "I've made the perfect tool with this," but humans are creatures of desire.

"I wonder if it could auto-save completely without me having to manually think about it every time, as long as I have the screen open?"

As a result of asking the AI for full automation with that thought, I end up stepping into an **unbelievable trap** that threatens the security of my account...

Next time, I will deliver a piece on the dangers of the code the AI produced, and the "etiquette of not burdening the other party's server" that I've learned from years of web data extraction experience.
