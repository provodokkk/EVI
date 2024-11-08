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
