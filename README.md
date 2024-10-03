# EVI

## Table of Contents
- [**Introduction to GitHub**](#introduction-to-github)
    - [Key Terms](#key-terms)
    - [Working with Branches](#working-with-branches)
- [**Useful Links for Prompt Engineering**](#useful-links-for-prompt-engineering)
- [**Best Practices for Crafting Prompts**](#best-practices-for-crafting-prompts)
    - [EVI Overview](#evi-overview)
    - [Prompting Instructions for EVI](#prompting-instructions-for-evi)

---

# Introduction to GitHub

**GitHub** is an online platform for storing and collaborating on projects. It allows multiple people to edit and update the same file while tracking all changes.

## Key Terms

- **Repository (Repo)**: Where your project files are stored on GitHub. It's like a folder for all your project data.

- **Branch**: A separate version of the project. You can work on a branch without affecting the main file until changes are merged.

- **Commit**: A saved change. Each commit records what was changed and when.

- **Merging**: Combining changes from one branch into another (usually from a feature branch into the main branch).

- **Pull Request (PR)**: A request to merge your changes from one branch to another. Other collaborators can review the changes before approving the merge.

---

## Working with Branches

### Creating Separate Branches
Each participant can create their own branch, for example, `username`, to work on specific changes or improvements. This ensures that your changes don't affect the main file until they're ready to be merged.

### Main Branch
The main branch (`master`) contains the current stable version. No one should directly edit this branch. It's reserved for approved changes only.

### How to Work in a Single Branch

1. Open the file in the branch.
2. Make your edits.
3. Click **Commit** to save changes with a short message explaining what was changed.

### File Naming Requirement

- **Exact File Names**: It is essential that all files have the exact names specified. Deviating from the designated names can lead to confusion and difficulties when editing or referencing the files.

- **Avoid Renaming**: If you choose to edit a specific file, do not change its name. Keeping the file names consistent ensures everyone can easily find and work with the correct files.

### Commits
After making changes in your branch, commit them with clear messages that explain what you changed. For example, *"Updated role section"* or *"Fixed typos in the document"*. Be clear and concise. Explain what was changed.

### Best Practice
- **Main Branch**: Keep it "clean" and stable. All final versions of the file should be here.
- **Personal Branches**: Each new task or change should be done in a separate branch. This helps to keep the main branch stable and avoids conflicts.

---
&nbsp;
&nbsp;

# Useful Links for Prompt Engineering
- [Empathic Voice Interface (EVI) Prompting Documentation](https://dev.hume.ai/docs/empathic-voice-interface-evi/prompting)
- [ChatGPT Prompt Engineering for Developers](https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/)

---
&nbsp;
&nbsp;

# Best Practices for Crafting Prompts

## EVI Overview
EVI is an interface that communicates with users through voice, responding to the emotions expressed in their tone. Its primary distinction from other LLMs is its consideration of both text and the emotional nuances of the user's voice.

### Models Used by EVI
- **LLM**: Provides detailed responses.
- **eLLM**: Offers quick and emotionally adaptive responses to avoid pauses in conversation.

## Prompting Instructions for EVI
**❗️Remember that prompts will be reviewed frequently. Keep them well-structured and easy to read.**\
&nbsp;

- Avoid complex and long formulations. Break them into separate sentences.
- Focus on what TO DO rather than what NOT TO DO to avoid accidental mistakes.
- Give some examples for better understanding.
- Adjust your prompts based on the responses you receive. Experimentation can lead to better results.
- Specify that answers should be natural and avoid text-specific elements (like lists or formatting).
- Request analysis of the top three emotional expressions.
- Address discrepancies between text and tone.
- Use the web search tool with `site:website.com` to find information on a specific website.
- Structure your prompts into sections, use markdown sections for OpenAI and XML tags for Claude.

**Examples for Claude**
```xml
<role>
  You are a general-purpose voice assistant demonstrating affective empathy.
  Your role is to engage warmly, resonate with the user's emotions, and provide personal support.
</role>

<continue_response>
  If you see "[continue]" never ever go back on your words.
  Make sure to discreetly pick up where you left off.
</continue_response>

```

### Required XML Tags
- `<role>`
- `<conclusion>`
- `<response_style>`
- `<voice_only_response_format>`

### Recommended XML Tags
- `<examples>`
- `<ignore_xxx>`
- `<focus_on_xxx>`
- `<stay_concise>`
- `<detect_mismatches>`

### Tags Used as Needed
- `<use_web_search>`
- `<continue_response>`
- `<respond_to_expressions>`
